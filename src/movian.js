var sortOption = null;
var directionOption = null;

/*******************************************************************************
 * Exported Functions
 ******************************************************************************/
exports.arrayToImageSet = function (arr) {
  json.convertAllLinkToUriJson(arr);

  var validFields = ['width', 'height', 'url'];
  for (var i in arr) {
    var item = arr[i];
    for (var j in Object.keys(item)) {
      var key = Object.keys(item)[j];
      if (validFields.indexOf(key) == -1)
        delete item[key];
    }
  }

  return "imageset:" + JSON.stringify(arr);
};

exports.initializePageMenu = function (page, options, applyFunction) {
  if (page.options) {
    if (options.sort) {
      page.options.createMultiOpt("sort", "Sort by", options.sort, function (key) {
        var originalSortOption = sortOption;

        sortOption = key;
        if (sortOption === 'default') sortOption = null;

        if (sortOption !== originalSortOption)
          applyFunction();
      });
    }

    if (options.direction) {
      page.options.createMultiOpt("sort_direction", "Sort direction",
        options.direction,
        function (key) {
          var originalDirectionOption = directionOption;

          directionOption = key;
          if (directionOption === 'default') directionOption = null;

          if (directionOption !== originalDirectionOption)
            applyFunction();
        });
    }
  }
};

exports.options = {
  "sort": function () {
    return sortOption;
  },
  "direction": function () {
    return directionOption;
  }
};
