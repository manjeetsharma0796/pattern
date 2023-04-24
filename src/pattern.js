// [5] => *****

const star = function(wide) {
  return "*".repeat(wide);
};

const applyStyle = function(style, lineWidth) {
  return lineWidth.map(style);
};

exports.star = star;
exports.applyStyle = applyStyle;
