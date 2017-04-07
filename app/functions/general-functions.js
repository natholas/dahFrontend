function randomProperty (obj) {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
};

Object.size = function (obj) {
  var size = 0;
  for (var i in obj) size += 1;
  return size;
}
