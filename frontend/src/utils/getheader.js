export const getHeaders = (data) => {
    if (!data || data.length === 0) return []; // Return an empty array if no data
    const headers = new Set();
  
    // Process only the first row to get unique keys
    const extractHeaders = (obj, prefix = "") => {
      for (const key in obj) {
        if (typeof obj[key] === "object" && !Array.isArray(obj[key]) && obj[key] !== null) {
          extractHeaders(obj[key], `${prefix}${key}.`);
        } else {
          headers.add(prefix + key);
        }
      }
    };
  
    extractHeaders(data[0]);
    return Array.from(headers); // Convert Set to Array
  };
  