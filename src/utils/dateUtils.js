/**
 * Date utility functions for resume builder
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Format a date string from "YYYY-MM" to "Month YYYY"
 * @param {string} dateString - Date in format "YYYY-MM"
 * @returns {string} Formatted date like "December 2024"
 */
export const formatMonthYear = (dateString) => {
  if (!dateString) return '';
  
  const [year, month] = dateString.split('-');
  const monthIndex = parseInt(month, 10) - 1;
  
  if (monthIndex < 0 || monthIndex > 11 || !year) return dateString;
  
  return `${MONTH_NAMES[monthIndex]} ${year}`;
};

/**
 * Parse a formatted date "Month YYYY" back to "YYYY-MM"
 * @param {string} monthYear - Date like "December 2024"
 * @returns {string} Date in format "YYYY-MM"
 */
export const parseMonthYear = (monthYear) => {
  if (!monthYear) return '';
  
  const parts = monthYear.trim().split(' ');
  if (parts.length !== 2) return '';
  
  const monthIndex = MONTH_NAMES.findIndex(
    m => m.toLowerCase() === parts[0].toLowerCase()
  );
  
  if (monthIndex === -1) return '';
  
  const month = String(monthIndex + 1).padStart(2, '0');
  return `${parts[1]}-${month}`;
};

/**
 * Calculate duration between two dates
 * @param {string} startDate - Start date in "YYYY-MM" format
 * @param {string} endDate - End date in "YYYY-MM" format or null if current
 * @param {boolean} isCurrent - Whether the position is current
 * @returns {string} Duration like "6 months" or "2 years 3 months"
 */
export const calculateDuration = (startDate, endDate, isCurrent = false) => {
  if (!startDate) return '';
  
  const [startYear, startMonth] = startDate.split('-').map(Number);
  
  let endYear, endMonth;
  if (isCurrent || !endDate) {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  } else {
    [endYear, endMonth] = endDate.split('-').map(Number);
  }
  
  if (!startYear || !startMonth || !endYear || !endMonth) return '';
  
  // Calculate total months
  let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
  
  // Handle same month
  if (totalMonths === 0) return '1 month';
  if (totalMonths < 0) return '';
  
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  if (years === 0) {
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }
  
  if (months === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }
  
  return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'}`;
};

/**
 * Get an array of months for a given year
 * @returns {Array} Array of month objects with name and value
 */
export const getMonths = () => {
  return MONTH_NAMES.map((name, index) => ({
    name,
    value: String(index + 1).padStart(2, '0')
  }));
};

/**
 * Get current year and a range of years
 * @param {number} pastYears - How many years in the past
 * @param {number} futureYears - How many years in the future
 * @returns {Array} Array of years
 */
export const getYearRange = (pastYears = 50, futureYears = 5) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  
  for (let i = currentYear + futureYears; i >= currentYear - pastYears; i--) {
    years.push(i);
  }
  
  return years;
};
