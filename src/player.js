exports.getVideoConfig = function (configUrl) {
  var json = JSON.parse(http.request(configUrl));
  return json;
};

exports.getVideoConfigFromClipId = function (clipId) {
  var json = JSON.parse(http.request('http://player.vimeo.com/video/' + clipId + '/config'));
  return json;
};

exports.getVideoErrorMessage = function (config) {
  return config.message;
};

exports.getVideoIcon = function (config) {
  return config.video.thumbs.base;
};

exports.getVideoPage = function (clipId) {
  var html = http.request('https://vimeo.com/' + clipId).toString();
  return html;
};

exports.getVideoUrl = function (config) {
  var videoUrl = null;

  if (service.useHls) {
    log.d("Using HLS");
    return config.request.files.hls.url;
  }

  var i = 0;
  if (service.maxVideoQuality && service.maxVideoQuality !== 'any') {
    log.d("Maximum video quality filter is enabled: " + service.maxVideoQuality);
    while (i < player.resolutions.length && player.resolutions[i] !== service.maxVideoQuality)
      i++;

    if (i == player.resolutions.length) log.error("Resolution not known");
  }

  for (; i < player.resolutions.length && !videoUrl; i++) {
    var quality = player.resolutions[i];
    log.d("Trying quality: " + quality);

    if (config.request.files && config.request.files.progressive) {
      var videoRef = json.getChild(config.request.files.progressive, "quality", quality);

      if (videoRef) {
        videoUrl = videoRef.url;

        log.d("Found URL for quality: " + quality.toUpperCase());
      } else {
        log.d("No URL found for quality: " + quality.toUpperCase() +
          ". Falling back to next quality.");
      }
    } else {
      throw "This video seems to have a different player behavior...";
    }

  }

  return videoUrl;
};

exports.getSubtitles = function (config) {
  var subtitles = [];
  for (var i in config.request.text_tracks) {
    var subtitle = config.request.text_tracks[i];

    subtitles.push({
      "title": subtitle.label,
      "language": Lang.twoLettertoThreeLetter(subtitle.lang),
      "url": BASE_URL + subtitle.url,
      "source": PLUGIN_NAME
    });
  }

  return subtitles;
};

exports.resolutions = [
  "1080p",
  "720p",
  "540p",
  "480p",
  "360p",
  "270p"
];
