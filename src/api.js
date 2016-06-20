var credentials = require('showtime/store').create('credentials');

var API_BASE_URL = "https://api.vimeo.com";

// please use your own access token
var APP_CLIENT = "NTgwYjFkMmUwMzhiOWRlNDc5ZWM4ZGJmZGUzYjRlY2JmZGUzYzE4MzozYWI2OTU0MTMwMTc0NTFjNmU1M2I0ODRlMThmOThhZDBmMTk2ZjU4";

exports.getAlbumIdFromUri = function(uri) {
    var match = uri.match("/albums/(.*)");
    if (!match) throw "Invalid album URI: " + uri;
    return match[1];
};

exports.getCategoryIdFromUri = function(uri) {
    var match = uri.match("/categories/(.*)/(.*)");
    if (match) return match[2];

    match = uri.match("/categories/(.*)");
    if (!match) throw "Invalid category URI: " + uri;
    return match[1];
};

exports.getChannelIdFromUri = function(uri) {
    var match = uri.match("/channels/(.*)");
    if (!match) throw "Invalid channel URI: " + uri;
    return match[1];
};

exports.getClipIdFromUri = function(uri) {
    var match = uri.match("/videos/([0-9]*)");
    if (!match) throw "Invalid video URI: " + uri;
    return match[1];
};

exports.getGroupIdFromUri = function(uri) {
    var match = uri.match("/groups/([0-9]*)");
    if (!match) throw "Invalid group URI: " + uri;
    return match[1];
};

exports.getUserIdFromUri = function(uri) {
    var match = uri.match("/users/([0-9]*)");
    if (!match) throw "Invalid user URI: " + uri;
    return match[1];
};

exports.category = {
    channels: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"],
                ["videos", "Number of Videos"],
                ["followers", "Number of Followers"]
            ],

            apply: true
        }
    },

    groups: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"],
                ["videos", "Number of Videos"],
                ["members", "Number of Members"]
            ],

            apply: true
        }
    },

    root: {
        options: {}
    },

    videos: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["relevant", "Relevance"],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"],
                ["plays", "Number of Plays"],
                ["likes", "Number of Likes"],
                ["comments", "Number of Comments"],
                ["duration", "Duration"]
            ],

            apply: true
        }
    }
};

exports.categories = {
    root: {
        options: {}
    }
};

exports.channel = {
    videos: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"],
                ["plays", "Number of Plays"],
                ["likes", "Number of Likes"],
                ["comments", "Number of Comments"],
                ["duration", "Duration"],
                ["added", "Publication Date"],
                ["modified_time", "Modifcation Date"],
                ["manual", "Manual"]
            ],

            apply: true
        }
    }
};

exports.channels = {
    root: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"],
                ["videos", "Number of Videos"],
                ["followers", "Number of Followers"]
            ],

            apply: true
        }
    }
};

exports.group = {
    videos: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"],
                ["plays", "Number of Plays"],
                ["likes", "Number of Likes"],
                ["comments", "Number of Comments"],
                ["duration", "Duration"]
            ],

            apply: true
        }
    }
};

exports.groups = {
    root: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"],
                ["videos", "Number of Videos"],
                ["followers", "Number of Followers"]
            ],

            apply: true
        }
    }
};

exports.user = {
    album: {
        videos: {
            options: {
                direction: [
                    ["default", "Default", true],
                    ["asc", "Ascending"],
                    ["desc", "Descending"]
                ],

                sort: [
                    ["default", "Default", true],
                    ["manual", "Manual"],
                    ["date", "Date"],
                    ["alphabetical", "Alphabetical"],
                    ["plays", "Number of Plays"],
                    ["likes", "Number of Likes"],
                    ["comments", "Number of Comments"],
                    ["duration", "Duration"],
                    ["modified_time", "Modification Time"]
                ],

                apply: true
            }
        }
    },

    albums: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"],
                ["videos", "Number of Videos"],
                ["duration", "Duration"]
            ],

            apply: true
        }
    },

    videos: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"],
                ["plays", "Number of Plays"],
                ["likes", "Number of Likes"],
                ["comments", "Number of Comments"],
                ["duration", "Duration"],
                ["modified_time", "Modification Time"]
            ],

            apply: true
        }
    }
};

exports.users = {
    root: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["relevant", "Relevance"],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"]
            ],

            apply: true
        }
    }
};

exports.videos = {
    root: {
        options: {
            direction: [
                ["default", "Default", true],
                ["asc", "Ascending"],
                ["desc", "Descending"]
            ],

            sort: [
                ["default", "Default", true],
                ["relevant", "Relevance"],
                ["date", "Date"],
                ["alphabetical", "Alphabetical"],
                ["plays", "Number of Plays"],
                ["likes", "Number of Likes"],
                ["comments", "Number of Comments"],
                ["duration", "Duration"]
            ],

            apply: true
        }
    }
};

function generatePluginAuth() {
    log.d("Generating an app's access token");

    var token = JSON.parse(http.request("https://api.vimeo.com/oauth/authorize/client", {
        noAuth: true,
        headers: {
            Authorization: "basic " + APP_CLIENT
        },
        postdata: {
            grant_type: "client_credentials"
        }
    }));

    credentials.plugin_auth = token.token_type + ' ' + token.access_token;
    log.d("New plugin access token: " + credentials.plugin_auth);
}

function generateUserAuth() {
    log.d("Generating an user's access token");

    var state = "123";
    var verificationUrl = "TODO";

    // Create a popup
    // this is done manually using properties in order to wait for event asyncronously
    var popupAuth = prop.createRoot();
    popupAuth.type = 'message';
    prop.setRichStr(popupAuth, 'message',
        'To give Movian access to your Vimeo account,\n' +
        'open a web browser on your computer or smartphone and visit:\n\n<font size="6">' +
        verificationUrl +
        '</font>\n\nThis popup will close automatically once the authentication is completed.');
    popupAuth.cancel = true; // Show the cancel button

    // Insert the popup in the global popup tree (this will display it to the user)
    prop.setParent(popupAuth, prop.global.popups);

    var timer = null;
    var interval = 3000;

    // Check if user have accepted in a loop
    function checkToken() {
        var req = http.request("http://localhost:9005/vimeo/code", {
            noFail: true,
            args: {
                state: state
            },
            headers: {
                referer: 'https://movian.tv/'
            }
        });

        if (req.statuscode !== 200) {
            timer = setTimeout(checkToken, interval);
            return;
        }

        // Ok, we're done (in one way or another). Destroy the popup
        prop.destroy(popupAuth);

        var code = JSON.parse(req).code;
        console.log("Code: " + code);

        var token = JSON.parse(http.request("https://api.vimeo.com/oauth/access_token", {
            args: {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: "https://movian.tv/vimeo/callback"
            },
            headers: {
                Authorization: "basic " + APP_CLIENT
            }
        }));
    }

    timer = setTimeout(checkToken, 10000);

    // Subscribe to the popup eventSink to detect if user presses cancel
    prop.subscribe(popupAuth.eventSink, function(event, data) {
        if (event == 'action' && data == 'Cancel') {
            prop.destroy(popupAuth);
            clearTimeout(timer);
            popup.notify('You need to authenticate before using this operation', 5);
        }
    }, {
        // This will make the subscription destroy itself when the popup
        // is destroyed. Without this we will retain references to captured
        // variables indefinitely
        autoDestroy: true
    });
}

exports.call = function(page, method, uri, args, callback, config) {
    if (uri === null) throw "API's URI can't be null";
    args = args || {};
    config = config || {};

    var url = API_BASE_URL + uri;

    for (var i in args) {
        if (!args[i] || args[i] === "") delete args[i];
    }

    var headers = {};
    headers["Content-Type"] = "application/vnd.vimeo.category+json";
    headers.Accept = "application/vnd.vimeo.*+json;version=3.2";

    if (credentials.user_auth)
        headers.Authorization = credentials.user_auth;
    else if (credentials.plugin_auth)
        headers.Authorization = credentials.plugin_auth;

    var opts = {
        method: method,
        args: args,
        noFail: true, // Don't throw on HTTP errors (400- status code)
        compression: true, // Will send 'Accept-Encoding: gzip' in request
        caching: true, // Enables Movian's built-in HTTP cache
        headers: headers
    };

    if (service.debug) opts.debug = true;

    log.d("Requesting " + url);
    http.request(url, opts, function(err, result) {
        if (result) {
            if (result.statuscode === 401 ||
                (result.statuscode == 403 && JSON.parse(result).error === "Your access token does not have the \"interact\" scope")) {
                // auth failed
                log.d("API request (" + url + ") failed due to unauthorized request");

                if (headers.Authorization) {
                    // we used some method of auth

                    if (headers.Authorization === credentials.user_auth) {
                        // this should happen when user revokes access?
                        log.d("User revoked access?");
                        generatePluginAuth();
                        log.d("Have a new plugin auth, trying API request again");
                        api.call(page, method, uri, args, callback, config);
                    } else if (headers.Authorization === credentials.plugin_auth) {
                        // if plugin auth failed then we really need user auth
                        // TODO generate user auth
                        //generateUserAuth();

                        // note: for now if this happens is because app auth is wrong so obtaina new one
                        generatePluginAuth();
                        log.d("Trying API request again");
                        api.call(page, method, uri, args, callback, config);
                    } else {
                        // we just used outdated auth
                        log.d("Just retrying...");
                        api.call(page, method, uri, args, callback, config);
                    }
                } else {
                    // we didn't provide auth at all
                    if ((credentials.user_auth || credentials.plugin_auth) &&
                        headers.Authorization !== credentials.user_auth &&
                        headers.Authorization !== credentials.plugin_auth) {
                        // we have some auth, let's retry with it
                        log.d("API request didn't send Authorization header, " +
                            "but there is some auth method available, retrying...");
                        api.call(page, method, uri, args, callback, config);
                    } else {
                        // we don't have any auth at all
                        // try generate plugin auth
                        generatePluginAuth();
                        log.d("We have now plugin auth, retrying request...");
                        api.call(page, method, uri, args, callback, config);
                    }
                }
            } else {
                if (err) {
                    console.error(err);
                    if (page) page.error(err);
                    else console.error(err);
                } else {
                    try {
                        var json = JSON.parse(result);
                        if (!config.noFail && json.error) {
                            console.error("Request failed: " + url);
                            console.error(json.error);
                            if (page) page.error(json.error);
                            throw (new Error(json.error));
                        } else if (json.error)
                            log.d("API returned error, but discarding it...");
                        callback(json);
                    } catch (e) {
                        if (page) page.error(e);
                        throw e;
                    }
                }
            }
        }
    });
};

exports.me = {};
exports.me.like = function(page, videoId, callback) {
    api.call(page, 'PUT', "/me/likes/" + videoId, {}, callback);
};
