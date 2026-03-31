import React from "react";
import { LucideMenu } from "lucide-react";

export default function TopNavbar({ isSidebarOpen, setIsSidebarOpen }) {
  const handleDownload = () => {
    // Dispatch custom event to MainEditor to handle download with full A4 layout
    window.dispatchEvent(new Event("download-pdf"));
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-3 sm:px-6 h-16 bg-[#f8f9fa] border-b border-[#e2e2e9]">
      <div className="flex items-center gap-2 sm:gap-8">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 hover:bg-[#005bc0]/5 rounded-md transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          <LucideMenu size={24} className="text-[#005bc0]" />
        </button>

        {/* Neutral placeholder logo */}
        <div className="h-10 w-32 rounded-lg border border-[#d5d9e2] bg-white text-[#2b3437] flex items-center justify-center text-sm font-semibold tracking-wide shadow-sm">
          Your Logo
        </div>
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className="cursor-pointer hover:scale-97 transition-all px-3 sm:px-5 py-2 bg-[#005bc0] text-white rounded-lg font-medium text-xs sm:text-sm shadow-sm active:scale-95 border border-[#005bc0]"
          onClick={handleDownload}
          type="button"
        >
          <span className="hidden sm:inline">Download as PDF</span>
          <span className="sm:hidden">Download</span>
        </button>
      </div>
    </nav>
  );
}
