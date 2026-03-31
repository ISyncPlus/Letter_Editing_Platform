import React, { useState, useRef, useEffect, useCallback, startTransition } from "react";
import { useParams } from "react-router";
import { pdf } from "@react-pdf/renderer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LetterEditor from "./LetterEditor";
import PreviewModal from "./PreviewModal";
import A4Page from "./A4Page";
import { sanitizeFilename } from "../../utils/pdf.jsx";
import MyDocument from "../pdf/MyDocument";


export default function MainEditor() {
  const [title, setTitle] = useState("");
  const [letterTitle, setLetterTitle] = useState("");
  const [ourRef, setOurRef] = useState("");
  const [yourRef, setYourRef] = useState("");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const previewCanvasRef = useRef(null);
  const pdfCanvasRef = useRef(null);
  const assetCacheRef = useRef({});
  const imageCacheRef = useRef({});

  const showToast = useCallback((msg, type = "info", ms = 3000) => {
    const fn = toast[type] || toast;
    fn(msg, { autoClose: ms });
  }, []);

  const getAssetDataUrl = useCallback(async (path) => {
    if (assetCacheRef.current[path]) return assetCacheRef.current[path];

    const response = await fetch(new URL(path, window.location.origin));
    const blob = await response.blob();
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read asset"));
    });
    reader.readAsDataURL(blob);
    const dataUrl = await dataUrlPromise;
    assetCacheRef.current[path] = dataUrl;
    return dataUrl;
  }, []);

  const inlineImagesInHtml = useCallback(async (html) => {
    if (!html) return { html, failed: [] };
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const images = Array.from(doc.images || []);
    const failed = [];
    const tasks = images.map(async (img) => {
      const src = img.getAttribute("src") || "";
      if (!src || src.startsWith("data:")) return;
      try {
        const key = src.startsWith("http") || src.startsWith("blob:") ? src : new URL(src, window.location.origin).href;
        if (imageCacheRef.current[key]) {
          img.setAttribute("src", imageCacheRef.current[key]);
          return;
        }
        const response = await fetch(key);
        const blob = await response.blob();
        const reader = new FileReader();
        const dataUrlPromise = new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Failed to read image"));
        });
        reader.readAsDataURL(blob);
        const dataUrl = await dataUrlPromise;
        imageCacheRef.current[key] = dataUrl;
        img.setAttribute("src", dataUrl);
      } catch (err) {
        console.warn("Could not inline image for PDF", src, err);
        failed.push(src);
      }
    });
    await Promise.all(tasks);
    return { html: doc.body.innerHTML, failed };
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    try {
      const filename = sanitizeFilename(title);
      const [letterheadSrc, stampSrc, signatureSrc] = await Promise.all([
        getAssetDataUrl("/letterhead-placeholder.svg"),
        getAssetDataUrl("/stamp-placeholder.svg"),
        getAssetDataUrl("/signature-placeholder.svg"),
      ]);

      const { html: contentWithInlinedImages, failed: failedImages } = await inlineImagesInHtml(content);
      if (failedImages.length) {
        showToast("Some images could not be embedded in the PDF", "warning");
        console.warn("Images skipped in PDF (failed to inline)", failedImages);
      }

      const doc = (
        <MyDocument
          title={title}
          letterTitle={letterTitle}
          ourRef={ourRef}
          yourRef={yourRef}
          contentHtml={contentWithInlinedImages}
          letterheadSrc={letterheadSrc}
          stampSrc={stampSrc}
          signatureSrc={signatureSrc}
        />
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      showToast("PDF downloaded successfully", "success");
    } catch (err) {
      console.error("PDF export failed:", err);
      showToast("Failed to download PDF", "error");
    }
  }, [title, letterTitle, ourRef, yourRef, content, getAssetDataUrl, inlineImagesInHtml, showToast]);

  // listen for global events: show-toast, new-document, download-pdf
  useEffect(() => {
    const onShow = (e) => {
      const m = e?.detail?.msg || "";
      if (m) showToast(m, "info");
    };
    const onNew = () => {
      setTitle("");
      setLetterTitle("");
      setOurRef("");
      setYourRef("");
      setContent("");
      showToast("New document started", "info");
    };
    const onDownload = async () => {
      await handleDownloadPDF();
    };
    window.addEventListener('show-toast', onShow);
    window.addEventListener('new-document', onNew);
    window.addEventListener('download-pdf', onDownload);
    return () => {
      window.removeEventListener('show-toast', onShow);
      window.removeEventListener('new-document', onNew);
      window.removeEventListener('download-pdf', onDownload);
    };
  }, [handleDownloadPDF, showToast]);

  // load draft when route param present
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    const found = drafts.find((d) => String(d.id) === String(id));
    if (found) {
      startTransition(() => {
        setTitle(found.title || "");
        setLetterTitle(found.letterTitle || "");
        setOurRef(found.ourRef || "");
        setYourRef(found.yourRef || "");
        setContent(found.content || "");
      });
      showToast("Document loaded", "info");
    }
  }, [id, showToast]);

  const handleSaveDraft = () => {
    const finalTitle = title.trim() === "" ? "Untitled Document" : title.trim();
    const finalLetterTitle = letterTitle.trim() === "" ? "Untitled Letter" : letterTitle.trim();
    const finalOurRef = ourRef.trim();
    const finalYourRef = yourRef.trim();

    const draft = {
      id: Date.now(),
      title: finalTitle,
      letterTitle: finalLetterTitle,
      ourRef: finalOurRef,
      yourRef: finalYourRef,
      content,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("drafts") || "[]");
    localStorage.setItem("drafts", JSON.stringify([draft, ...existing]));
    showToast("Document saved", "success");
  };

  const handlePreview = () => {
    const canvas = pdfCanvasRef.current;
    if (canvas && canvas.scrollHeight > canvas.clientHeight) {
      showToast("Content exceeds one A4 page. Please shorten it.", "warning");
      return;
    }
    setShowPreview(true);
  };

  return (
    <main className="pt-20 min-h-screen flex flex-col items-center bg-[#f8f9fa] px-3 sm:px-6 lg:ml-56 py-12">
      <LetterEditor
        title={title}
        setTitle={setTitle}
        letterTitle={letterTitle}
        setLetterTitle={setLetterTitle}
        ourRef={ourRef}
        setOurRef={setOurRef}
        yourRef={yourRef}
        setYourRef={setYourRef}
        content={content}
        setContent={setContent}
        onSave={handleSaveDraft}
        onPreview={handlePreview}
        onLimitWarning={(msg) => showToast(msg, "warning")}
      />

      <PreviewModal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        previewRef={previewCanvasRef}
        pageProps={{ title, letterTitle, ourRef, yourRef, content }}
      />

      {/* Hidden PDF canvas matching preview (single source of truth) */}
      <A4Page
        ref={pdfCanvasRef}
        title={title}
        letterTitle={letterTitle}
        ourRef={ourRef}
        yourRef={yourRef}
        content={content}
        className=""
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          padding: "20mm",
        }}
        aria-hidden="true"
      />
      <ToastContainer
        position="top-right"
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        closeOnClick
        autoClose={3000}
        theme="colored"
      />
    </main>
  );
}
