import { SavedSearchItem } from "./SavedSearchItem";

export const SavedSearchList = ({ searches, onSelect, onDelete, onUpdate }) => {
  return (
    <div className="p-4 space-y-3">
      <h3 className="text-lg font-semibold mb-4">Saved List</h3>
      {searches.map((search) => (
        <SavedSearchItem
          key={search._id}
          search={search}
          onSelect={onSelect}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
