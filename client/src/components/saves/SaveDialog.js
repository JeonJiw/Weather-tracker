import React from "react";

export const SaveDialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6">
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ children }) => (
  <div className="mb-4">
    <h2 className="text-lg font-semibold">{children}</h2>
  </div>
);

export const DialogFooter = ({ children }) => (
  <div className="mt-6 flex justify-end gap-3">{children}</div>
);
