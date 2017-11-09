function randomProperty (obj) {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
};

Object.size = function (obj) {
  var size = 0;
  for (var i in obj) size += 1;
  return size;
}

function randomizeArray (array) {
  return array.sort(function (a, b) {
    return Math.ceil(Math.random() - 0.5);
  });
}

function objToArray(obj) {
  var array = [];
  for (var i in obj) {
    array.push(obj[i]);
  }
  return array;
};