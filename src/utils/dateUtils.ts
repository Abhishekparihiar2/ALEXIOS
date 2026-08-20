/**
 * Formats a given date string or Date object to MM/DD/YYYY format.
 * If the input is invalid or falsy, it returns the input or a fallback string.
 * It strictly treats "YYYY-MM-DD" as local time to avoid timezone offset bugs.
 */
export function formatDateMMDDYYYY(dateInput: string | Date | undefined | null): string {
  if (!dateInput) return "";
  
  try {
    // If it's already a string in "YYYY-MM-DD" format, we can just split and rearrange
    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
      const [year, month, day] = dateInput.split('-');
      return `${month}/${day}/${year}`;
    }

    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    
    // Check for invalid date
    if (isNaN(d.getTime())) {
      return String(dateInput); 
    }

    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();

    return `${month}/${day}/${year}`;
  } catch (err) {
    return String(dateInput);
  }
}
