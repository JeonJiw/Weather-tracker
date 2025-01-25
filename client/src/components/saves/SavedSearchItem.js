import { SaveDialog } from "./SaveDialog";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

export const SavedSearchItem = ({ search, onSelect, onDelete, onUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [memo, setMemo] = useState(search.memo || "");
  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    if (!password) return alert("Enter password");
    onUpdate(search._id, memo, password);
    setIsEditMode(false);
    setPassword("");
  };

  const handleDelete = () => {
    if (!password) return alert("Enter password");
    onDelete(search._id, password);
    setIsDeleteMode(false);
    setPassword("");
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow">
      <div className="flex justify-between">
        <div className="cursor-pointer" onClick={() => onSelect(search)}>
          <p className="font-medium">{search.location}</p>
          <p>
            {new Date(search.searchParams.startDate).toLocaleDateString(
              "en-US",
              {
                month: "2-digit",
                day: "2-digit",
              }
            )}{" "}
            -{" "}
            {new Date(search.searchParams.endDate).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
          <p className="text-sm text-gray-500">{search.memo}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsEditMode(true)} className="text-blue-500">
            <Edit size={16} />
          </button>
          <button
            onClick={() => setIsDeleteMode(true)}
            className="text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <SaveDialog isOpen={isEditMode} onClose={() => setIsEditMode(false)}>
        <div className="space-y-4">
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="memo"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="password"
          />
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-500 text-white rounded p-2"
          >
            Update
          </button>
        </div>
      </SaveDialog>

      <SaveDialog isOpen={isDeleteMode} onClose={() => setIsDeleteMode(false)}>
        <div className="space-y-4">
          <p>Delete?</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="password"
          />
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white rounded p-2"
          >
            Delete
          </button>
        </div>
      </SaveDialog>
    </div>
  );
};
