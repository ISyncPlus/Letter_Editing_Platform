import React, { useState } from "react";
import TopNavbar from "./components/layout/TopNavbar";
import SideNavBar from "./components/layout/SideNavbar";
import MainEditor from "./components/editor/MainEditor";
import DraftsPage from "./pages/DraftsPage";
import { Routes, Route } from "react-router";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-[#f8f9fa] text-[#2b3437] selection:bg-[#d8e2ff] selection:text-[#2b3437]">
      <TopNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <SideNavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Mobile overlay - closes sidebar when clicked */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Routes>
        <Route path="/" element={<MainEditor />} />
        <Route path="/drafts" element={<DraftsPage />} />
        <Route path="/editor/:id" element={<MainEditor />} />
      </Routes>
    </div>
  );
}