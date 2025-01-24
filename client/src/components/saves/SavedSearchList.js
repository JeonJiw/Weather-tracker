export const SavedSearchList = ({ searches, onSelect, onDelete }) => (
  <div className="p-4 space-y-3">
    <h3 className="text-lg font-semibold mb-4">Saved Searches</h3>
    {searches.map((search) => (
      <div
        key={search.id}
        className="p-3 bg-white rounded-lg shadow hover:shadow-md cursor-pointer"
        onClick={() => onSelect(search)}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{search.location}</p>
            <p className="text-sm text-gray-500">{search.date}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(search.id);
            }}
            className="p-1 hover:bg-red-100 rounded-full"
          ></button>
        </div>
      </div>
    ))}
  </div>
);
