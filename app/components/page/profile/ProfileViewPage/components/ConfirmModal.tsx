import React from 'react';

interface ConfirmModalProps {
  open: boolean;
  type: 'confirm' | 'success' | null;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  type,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open || !type) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm" onClick={onCancel} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="bg-[#181A20] rounded-lg shadow-2xl p-6 min-w-[320px] text-center text-white border border-[#23262F] pointer-events-auto">
          <div className="text-lg font-semibold mb-4">{message}</div>
          {type === 'confirm' ? (
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={onConfirm}
              >
                Delete
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={onCancel}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </>
  );
}
