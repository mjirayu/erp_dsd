module.exports.getDate = function() {
  today = new Date();
  date = today.getDate();
  month = today.getMonth() + 1;
  year = today.getFullYear();
  today = year + '-' + month + '-' + date;
  return today;
};
