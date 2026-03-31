import React, { forwardRef } from "react";
import LetterHeader from "./LetterHeader";
import LetterFooter from "./LetterFooter";

const A4Page = forwardRef(function A4Page(
  { title, letterTitle, ourRef, yourRef, content, className = "", style = {}, ...rest },
  ref
) {
  const displayTitle = letterTitle?.trim() ? letterTitle : title?.trim() || "Untitled Letter";

  return (
    <div
      ref={ref}
      className={`w-[210mm] h-[297mm] bg-white mx-auto overflow-hidden flex flex-col ${className}`}
      style={{
        width: "210mm",
        height: "297mm",
        boxSizing: "border-box",
        fontFamily: "Times New Roman, serif",
        ...style,
      }}
      {...rest}
    >
      <LetterHeader ourRef={ourRef} yourRef={yourRef} />

      <p className="mb-4 text-[12pt] leading-normal" style={{ fontFamily: "Times New Roman, serif" }}>
        Msgri. &amp; Frs.,<br />
        Consecrated Men and Women,<br />
        Brothers and Sisters in Christ,
      </p>

      {displayTitle && (
        <h1
          className="text-center font-bold uppercase mb-6 text-2xl text-[#2b3437]"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {displayTitle}
        </h1>
      )}

      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="text-sm text-[#2b3437] leading-normal flex-1 overflow-hidden"
        style={{ fontFamily: "Times New Roman, serif", fontSize: "12pt", lineHeight: "1.5" }}
      />

      <div className="mt-0">
        <LetterFooter />
      </div>
    </div>
  );
});

export default A4Page;
