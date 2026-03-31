import React from "react";
import { useNavigate } from "react-router";
import { LucidePlus, LucideFolderOpen, LucideFileText, LucideSettings, LucideHelpCircle } from "lucide-react";

export default function SideNavBar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();

  const handleNew = () => {
    window.dispatchEvent(new CustomEvent('new-document'));
    navigate('/');
    setIsSidebarOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 flex flex-col w-56 bg-[#f1f4f6] text-[#5d5f65] border-r border-[#e2e2e9] transition-transform duration-300 ease-in-out transform ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0`}>
      <div className="p-5">
        {/* User Panel */}
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#d8e2ff] flex items-center justify-center overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX5oQ2adzvvcetE36S-61Bv0W9E7j2IUqCVg63rMskYsAm_cyBUaHj4DLbaRcXsuEQHe-8hGlvGqecf44xHhwnwFyFeB4EXmEfl8gDERPeUi1BWpq76djZKllb44fEbiHLfhRMFFDy0mqwO_rSSYiESEN2uXBNGx0gVYKD1pGZb08krMxpyTXCEWgyC_edAHJT8cbrF_DeylsGujxKLm_RAMuQGaGzjyirB1C6BiIyc2jN7hiUx9ZXYP7bBMICEa1dLUsfJA2Dwks"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            {/* <h3 className="font-newsreader font-bold text-lg text-[#2b3437] leading-tight">
              Library 
            </h3> */}
            <p className="text-xs text-[#586064] font-medium uppercase tracking-wider">
              Your Manuscripts
            </p>
          </div>
        </div>

        {/* New Document */}
        <button onClick={handleNew} className="cursor-pointer hover:scale-97 active:scale-95 transition-all w-full flex items-center justify-center gap-2 py-3 mb-2 rounded-lg text-sm font-semibold bg-[#005bc0] text-white border border-[#005bc0] hover:opacity-95">
          <LucidePlus size={20} />
          New Document
        </button>

        {/* Navigation */}
        <nav className="space-y-1">
          <div onClick={() => handleNavigation('/drafts')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#005bc0]/5 transition-colors cursor-pointer group">
            <LucideFolderOpen className="text-[#586064] group-hover:text-[#005bc0]" size={20} />
            <span className="font-inter text-sm font-medium tracking-wide text-[#5d5f65]">Saved Document</span>
          </div>
          {/* <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#005bc0]/5 transition-colors cursor-pointer group">
            <LucideFileText className="text-[#586064] group-hover:text-[#005bc0]" size={20} />
            <span className="font-inter text-sm font-medium tracking-wide text-[#5d5f65]">Templates</span>
          </div> */}
        </nav>
      </div>

      {/* Settings / Help */}
      {/* <div className="mt-auto p-6 border-t border-[#e2e2e9]">
        <nav className="space-y-1">
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#005bc0]/5 transition-colors cursor-pointer group">
            <LucideSettings className="text-[#586064] group-hover:text-[#005bc0]" size={20} />
            <span className="font-inter text-sm font-medium tracking-wide text-[#5d5f65]">Settings</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#005bc0]/5 transition-colors cursor-pointer group">
            <LucideHelpCircle className="text-[#586064] group-hover:text-[#005bc0]" size={20} />
            <span className="font-inter text-sm font-medium tracking-wide text-[#5d5f65]">Help</span>
          </div>
        </nav>
      </div> */}
    </aside>
  );
}
