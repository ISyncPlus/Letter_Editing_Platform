import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function LetterEditor({
  title,
  setTitle,
  letterTitle,
  setLetterTitle,
  ourRef,
  setOurRef,
  yourRef,
  setYourRef,
  content,
  setContent,
  onSave,
  onPreview,
}) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4">
      {/* Title Input with label */}
      <div className="mb-8 flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#4a4f55] uppercase tracking-wide">Document Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled document"
          className="w-full text-center font-semibold uppercase text-base text-[#2b3437] bg-white border border-[#d6d9de] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005bc0]/30"
          type="text"
        />
      </div>

      {/* Letter title (inside editor card) */}
      <div className="mb-6 bg-white rounded-lg border border-[#e2e2e9] shadow-sm overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-[#e2e2e9] bg-[#fdfdfd] flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#4a4f55] uppercase tracking-wide">Letter Title</label>
            <input
              value={letterTitle}
              onChange={(e) => setLetterTitle(e.target.value)}
              placeholder="Letter title"
              className="w-full text-center font-semibold uppercase text-sm text-[#2b3437] bg-white border border-[#d6d9de] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005bc0]/30"
              type="text"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-1/2 flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-[#4a4f55] uppercase tracking-wide">Our Ref</label>
              <input
                value={ourRef}
                onChange={(e) => setOurRef(e.target.value)}
                placeholder="Our reference"
                className="w-full text-center text-sm text-[#2b3437] bg-white border border-[#d6d9de] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005bc0]/30"
                type="text"
              />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col gap-1">
              <label className="text-[11px] font-semibold text-[#4a4f55] uppercase tracking-wide">Your Ref</label>
              <input
                value={yourRef}
                onChange={(e) => setYourRef(e.target.value)}
                placeholder="Your reference"
                className="w-full text-center text-sm text-[#2b3437] bg-white border border-[#d6d9de] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#005bc0]/30"
                type="text"
              />
            </div>
          </div>
        </div>

        {/* TinyMCE Editor with Full Rich Text Features */}
        <Editor
          apiKey="78ljds4d5b1enpzgxjpyugdt1i3bbnqvg3rzegrr7tggli84"
          value={content}
          onEditorChange={(newValue) => setContent(newValue)}
          init={{
            height: 500,
            menubar: false,
            branding: false,
            plugins: [
              "lists",
              "link",
              "image",
              "table",
              "wordcount",
              "paste"
            ],
            toolbar:
              "undo redo | bold italic underline strikethrough | alignleft aligncenter alignright link image | bullist numlist | outdent indent |  | table",
            /* Enable image upload and drag-drop */
            file_picker_types: "image",
            images_upload_handler: (blobInfo) => new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = () => reject(new Error("Image upload failed"));
              reader.readAsDataURL(blobInfo.blob());
            }),
            /* Content Style - Times New Roman 12pt */
            content_style: `
              body {
                font-family: "Times New Roman", serif;
                font-size: 12pt;
                line-height: 1.5;
                color: #2b3437;
                padding: 16px;
              }
              p { margin: 0.5em 0; }
              h1, h2, h3, h4, h5, h6 { 
                font-family: "Times New Roman", serif;
              }
              img {
                max-width: 100%;
                height: auto;
              }
            `,
            /* Paste settings for image handling */
            paste_data_images: true,
            automatic_uploads: true,
          }}
        />
      </div>

      {/* Action Buttons - Save & Preview */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-[#005bc0] text-white rounded-lg font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          type="button"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>

        <button
          onClick={onPreview}
          className="px-6 py-2 border border-[#005bc0] text-[#005bc0] rounded-lg font-medium text-sm hover:bg-[#005bc0]/5 transition-colors"
          type="button"
        >
          Preview
        </button>
      </div>
    </div>
  );
}
