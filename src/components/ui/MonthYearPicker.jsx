import { useState, useEffect } from 'react';
import { HiCalendar, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { formatMonthYear, getMonths, getYearRange } from '../../utils/dateUtils';

/**
 * MonthYearPicker - A custom date picker for selecting month and year
 * Displays formatted dates as "December 2024" but stores as "YYYY-MM"
 */
const MonthYearPicker = ({ value, onChange, placeholder = 'Select date', disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(() => {
    if (value) {
      const [year] = value.split('-');
      return parseInt(year, 10);
    }
    return new Date().getFullYear();
  });

  const months = getMonths();
  const years = getYearRange();

  // Update selected year when value changes externally
  useEffect(() => {
    if (value) {
      const [year] = value.split('-');
      setSelectedYear(parseInt(year, 10));
    }
  }, [value]);

  const handleMonthSelect = (monthValue) => {
    const newDate = `${selectedYear}-${monthValue}`;
    onChange(newDate);
    setIsOpen(false);
  };

  const handleYearChange = (direction) => {
    setSelectedYear(prev => prev + direction);
  };

  const getSelectedMonth = () => {
    if (!value) return null;
    const [, month] = value.split('-');
    return month;
  };

  const displayValue = value ? formatMonthYear(value) : '';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <span className={!displayValue ? 'text-gray-600' : ''}>
          {displayValue || placeholder}
        </span>
        <HiCalendar className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute z-20 mt-2 bg-[#0a0a0a] border border-gray-800 rounded-lg shadow-xl p-4 w-72">
            {/* Year selector */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => handleYearChange(-1)}
                className="p-1.5 hover:bg-gray-800 rounded-md transition-all"
              >
                <HiChevronLeft className="w-5 h-5 text-gray-400" />
              </button>
              <span className="font-semibold text-white">
                {selectedYear}
              </span>
              <button
                type="button"
                onClick={() => handleYearChange(1)}
                className="p-1.5 hover:bg-gray-800 rounded-md transition-all"
              >
                <HiChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Month grid */}
            <div className="grid grid-cols-3 gap-2">
              {months.map((month) => {
                const isSelected = getSelectedMonth() === month.value;
                return (
                  <button
                    key={month.value}
                    type="button"
                    onClick={() => handleMonthSelect(month.value)}
                    className={`
                      px-3 py-2 rounded-md text-sm font-medium transition-all
                      ${isSelected 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-800'
                      }
                    `}
                  >
                    {month.name.slice(0, 3)}
                  </button>
                );
              })}
            </div>

            {/* Quick year selection */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
                className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white transition-all"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MonthYearPicker;