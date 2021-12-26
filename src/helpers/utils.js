exports.generateCode = function (len = 4) {
  var code = "";
  for (var i = 0; i < len; i++) {
    code = code + Math.floor(Math.random() * 10);
  }
  return code;
};
