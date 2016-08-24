var API_BASE_URL = "https://www.googleapis.com/urlshortener/v1/";
var API_KEY = "AIzaSyBEVkKFWvJYbxVv8gv_-l_jdKLTdyXT8Dc";

exports.shorten = function (url) {
    var response = http.request(API_BASE_URL + "url", {
        method: "post",
        args: {
            key: API_KEY
        },
        postdata: JSON.stringify({
            longUrl: url
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        debug:true
    });

    if (response) {
        return JSON.parse(response).id;
    }
    else
        throw new Error("Failed to shorten URL");
}