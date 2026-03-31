import React from "react";

export default function LetterHeader({ ourRef = "", yourRef = "" }) {
  return (
    <header
      className="mb-8 sm:mb-12 w-full flex flex-col gap-4 sm:gap-6"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      <img
        src="/letterhead-placeholder.png"
        alt="Letterhead placeholder"
        className="w-full object-contain"
        style={{ height: "auto" }}
      />

      <div
        className="flex flex-col sm:flex-row justify-between items-start w-full py-1 gap-4 sm:gap-0"
        style={{ fontSize: "12pt" }}
      >
        <div className="flex flex-col gap-2 sm:gap-3 leading-normal">
          <div className="flex items-center gap-2">
            <span className="italic font-bold text-xs sm:text-sm text-[#586064] whitespace-nowrap">
              Our Ref:
            </span>
            <span className="text-[#2b3437] font-medium leading-normal text-xs sm:text-sm">
              {ourRef || ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="italic font-bold text-xs sm:text-sm text-[#586064] whitespace-nowrap">
              Your Ref:
            </span>
            <span className="text-[#2b3437] font-medium leading-normal text-xs sm:text-sm">
              {yourRef || ""}
            </span>
          </div>
        </div>

        <div className="text-xs sm:text-sm font-medium text-[#586064] leading-normal whitespace-nowrap">
          {new Date().toLocaleDateString("en-UK", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
    </header>
  );
}
