import React from "react";
import A4Page from "./A4Page";

export default function PreviewModal({ show, onClose, pageProps, previewRef }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-[230mm] max-h-[90vh] overflow-auto">
        <button
          className="sticky top-4 right-4 float-right bg-white text-[#2b3437] px-4 py-2 rounded-lg shadow-md hover:bg-[#f8f9fa] transition-colors font-medium z-10 m-4"
          onClick={onClose}
          type="button"
        >
          Close Preview
        </button>

        <A4Page
          ref={previewRef}
          {...pageProps}
          className=""
          style={{ paddingLeft: "10mm", paddingRight: "10mm", paddingTop: "0mm", paddingBottom: "10mm" }}
        />
      </div>
    </div>
  );
}
