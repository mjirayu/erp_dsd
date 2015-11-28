module.exports.getMessage = function(err) {
  var message = '';
  for (field in err.errors) {
    message = err.errors[field].message + '\n' + message;
  }

  // var arrayMessageObject = [];
  // for (field in err.errors) {
  //   message = err.errors[field].message;
  //   arrayMessageObject.push({
  //     ErrorMessage: message,
  //   });
  // }

  return message;
};

module.exports.checkFormat = function(value, format) {
  if (value.substring(0, 2) == format) {
    return true;
  }

  return false;
};
