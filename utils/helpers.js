module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_time: (date) => {
    // format large numbers with commas
    return date.toLocaleTimeString();
  },
};
//helper good