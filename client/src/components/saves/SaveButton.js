import React, { useState } from "react";
import { SaveDialog, DialogHeader, DialogFooter } from "./SaveDialog";

const SaveButton = React.memo(({ handleSave, isSaving }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [memo, setMemo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!password) {
      alert("Enter your password");
      return;
    }
    handleSave(memo, password);
    setIsOpen(false);
    setMemo("");
    setPassword("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={isSaving}
        className={`rounded-lg w-8 h-8 flex items-center justify-center ${
          isSaving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {isSaving ? "..." : "+"}
      </button>

      <SaveDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader>Save Weather Data</DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Memo</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter a memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </DialogFooter>
      </SaveDialog>
    </>
  );
});

export default SaveButton;
