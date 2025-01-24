const DateRangeSelect = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate,
  maxDate,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Start Date
        </label>
        <input
          type="date"
          value={startDate}
          onChange={onStartDateChange}
          min={minDate}
          max={maxDate}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          End Date
        </label>
        <input
          type="date"
          value={endDate}
          onChange={onEndDateChange}
          min={startDate}
          max={maxDate}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default DateRangeSelect;
