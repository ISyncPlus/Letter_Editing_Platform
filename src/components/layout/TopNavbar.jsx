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
        <img
          src="/awka_logo.png"
          alt="Awka Logo"
          className="h-17 w-auto object-contain"
        />
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
