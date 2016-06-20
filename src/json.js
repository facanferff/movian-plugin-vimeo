exports.convertAllLinkToUriJson = function (obj) {
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].link && !obj[i].url) {
      obj[i].url = obj[i].link;
      delete obj[i].link;
    }
  }
};

exports.getChild = function (arr, key, value) {
  for (var i in arr) {
    var entry = arr[i];
    if (entry[key] === value) return entry;
  }

  return null;
};
