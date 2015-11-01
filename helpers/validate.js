module.exports.required = function(err) {
  var message = '';
  for (field in err.errors) {
    message = err.errors[field].message + '\n' + message;
  }

  return message;
};
