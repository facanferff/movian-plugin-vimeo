exports.twoLettertoThreeLetter = function (lang) {
  switch (lang) {
  case "en":
    return "eng";

  case "es":
    return "spa";

  case "fr":
    return "fra";

  case "ko":
    return "kor";

  case "zh-Hant":
    return "zho";

  default:
    log.d("Unknown two letter language: " + lang);
  }
};
