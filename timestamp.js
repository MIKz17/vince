// timestamp.js
export const getCurrentTimestamp = () => {
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString([], options)}`; // Format: MM/DD/YYYY HH:MM:SS AM/PM
  };
  