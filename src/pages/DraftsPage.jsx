import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DraftsPage() {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);
  const [confirm, setConfirm] = useState({ open: false, draft: null });

  const loadDrafts = useCallback(() => {
    const stored = JSON.parse(localStorage.getItem('drafts') || '[]');
    setDrafts(stored);
  }, []);

  useEffect(() => {
    loadDrafts();
  }, [loadDrafts]);

  const requestDelete = useCallback((e, draft) => {
    e.stopPropagation();
    setConfirm({ open: true, draft });
  }, []);

  const confirmDelete = useCallback(() => {
    if (!confirm.draft) return;
    const filtered = drafts.filter((d) => d.id !== confirm.draft.id);
    setDrafts(filtered);
    localStorage.setItem('drafts', JSON.stringify(filtered));
    setConfirm({ open: false, draft: null });
    toast.success('Document deleted');
  }, [confirm.draft, drafts]);

  const cancelDelete = useCallback(() => {
    setConfirm({ open: false, draft: null });
  }, []);

  return (
    <main className="pt-16 min-h-screen flex flex-col items-center bg-[#f8f9fa] px-3 sm:px-6 lg:ml-56">
      <div className="w-full max-w-[850px] mt-8 sm:mt-12 mb-6 px-2 sm:px-4 flex items-center justify-between">
        <h1 className="font-newsreader text-xl sm:text-2xl font-bold text-[#2b3437]">Saved Documents</h1>
        {drafts.length > 0 && (
          <span className="text-xs sm:text-sm text-[#586064]">{drafts.length} saved</span>
        )}
      </div>
      <div className="w-full max-w-[850px] bg-white rounded-lg shadow p-3 sm:p-4">
        {drafts.length === 0 && <p className="text-xs sm:text-sm text-[#586064]">No documents saved.</p>}
        {drafts.map((draft) => (
          <div
            key={draft.id}
            onClick={() => navigate(`/editor/${draft.id}`)}
            className="group cursor-pointer p-3 sm:p-4 border-b last:border-b-0 hover:bg-[#f8f9fa] transition-colors active:bg-[#e8ecf0] flex items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#2b3437]">{draft.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500">{new Date(draft.createdAt).toLocaleString()}</p>
            </div>
            <button
              onClick={(e) => requestDelete(e, draft)}
              className="text-xs sm:text-sm px-3 py-1 rounded-md border border-red-200 text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors"
              aria-label={`Delete ${draft.title}`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {confirm.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4" onClick={cancelDelete}>
          <div
            className="bg-white rounded-lg shadow-lg max-w-sm w-full p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-semibold text-[#2b3437] mb-3">Delete document?</h2>
            <p className="text-sm text-[#586064] mb-4">This will remove the saved document permanently.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-[#2b3437] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" hideProgressBar newestOnTop pauseOnFocusLoss={false} pauseOnHover={false} closeOnClick autoClose={2500} theme="colored" />
    </main>
  );
}
