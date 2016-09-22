/*
Vimeo plugin for Movian Media Center Copyright (C) 2016 Fábio Ferreira

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

This program is also available under a commercial proprietary license.
*/

var http = require('showtime/http');
var page = require('showtime/page');
var popup = require('showtime/popup');
var prop = require('showtime/prop');
var service = require('showtime/service');
var settings = require('showtime/settings');

var api = require('./src/api');
var view = require('./src/view').controller;
var json = require('./src/json');
var Lang = require('./src/lang');
var Loader = require('./src/loader').loader;
var log = require('./src/log');
var movian = require('./src/movian');
var player = require('src/player');

var BASE_URL = "https://vimeo.com";
var PLUGIN_NAME = "Vimeo";
var PREFIX = "vimeo";

service.create(PLUGIN_NAME, PREFIX + ":start", "video", true,
    Plugin.path + "logo.png");

settings.globalSettings(PREFIX, PLUGIN_NAME, Plugin.path + "icon.png",
    PLUGIN_NAME + ": Video Sharing service");

settings.createDivider("Video Playback");

// TODO support HLS
/*settings.createInfo("infoHls", Plugin.path + "logo.png",
  "If you use HLS, the setting for \"Maximum video quality\" will be ignored.\n" +
  "Note: This feature is not yet properly supported by movian.");
settings.createBool("useHls", "Use HLS", false, function (v) {
  service.useHls = v;
});*/
service.useHls = false;

var maxVideoQualityOptions = [];
for (var i in player.resolutions) {
    var option = [player.resolutions[i], player.resolutions[i]];
    if (i === "0") option.push(true);
    maxVideoQualityOptions.push(option);
}

settings.createMultiOpt("maxVideoQuality", "Maximum video quality", maxVideoQualityOptions, function(v) {
    service.maxVideoQuality = v;
});

settings.createDivider("Developer");

settings.createBool("debug", "Debug", false, function(v) {
    service.debug = v;
});


new page.Route("vimeo:start", function(page) {
    view.home.root(page);
});

new page.Route(PREFIX + ":categories", function(page) {
    view.categories.root(page);
});

new page.Route(PREFIX + ":category:(.*)", function(page, category) {
    view.category.root(page, category);
});

new page.Route(PREFIX + ":category:(.*):channels", function(page, category) {
    view.category.channels(page, category);
});

new page.Route(PREFIX + ":category:(.*):groups", function(page, category) {
    view.category.groups(page, category);
});

new page.Route(PREFIX + ":category:(.*):videos", function(page, category) {
    view.category.videos(page, category);
});

new page.Route(PREFIX + ":channels", function(page) {
    view.channels.root(page, {
        "sort": "followers",
        "direction": "desc"
    });
});

new page.Route(PREFIX + ":channel:(.*):videos", function(page, channel) {
    view.channel.videos(page, channel);
});

new page.Route(PREFIX + ":groups", function(page) {
    view.groups.root(page, {
        "sort": "followers",
        "direction": "desc"
    });
});

new page.Route(PREFIX + ":group:(.*):videos", function(page, group) {
    view.group.videos(page, group);
});

new page.Route(PREFIX + ":user:(.*)", function(page, user) {
    view.user.root(page, user);
});

new page.Route(PREFIX + ":user:(.*):album:(.*):videos", function(page, user, album) {
    view.user.album.videos(page, user, album);
});

new page.Route(PREFIX + ":user:(.*):albums", function(page, user) {
    view.user.albums(page, user);
});

new page.Route(PREFIX + ":user:(.*):videos", function(page, user) {
    view.user.videos(page, user);
});

new page.Route(PREFIX + ":search:(.*)", function(page, query) {
    view.search.root(page, query);
});

new page.Route(PREFIX + ":search:videos:(.*)", function(page, query) {
    view.videos.root(page, {
        "query": query,
        "sort": "relevant",
        "direction": "desc"
    });
});

new page.Route(PREFIX + ":search:users:(.*)", function(page, query) {
    view.users.root(page, {
        "query": query,
        "sort": "relevant",
        "direction": "desc"
    });
});

new page.Route(PREFIX + ":search:channels:(.*)", function(page, query) {
    view.channels.root(page, {
        "query": query,
        "sort": "followers",
        "direction": "desc"
    });
});

new page.Route(PREFIX + ":search:groups:(.*)", function(page, query) {
    view.groups.root(page, {
        "query": query,
        "sort": "followers",
        "direction": "desc"
    });
});

new page.Route(PREFIX + ":video:([0-9]*)", function(page, clipId) {
    view.video(page, clipId);
});

new page.Route("https?://vimeo\.com/([0-9]*)", function(page, clipId) {
    view.video(page, clipId);
});


/*------------------------------------------------------------------------------
   Searchers
 -----------------------------------------------------------------------------*/
new page.Searcher("Vimeo - Channels", Plugin.path + "logo.png", function(page, query) {
    view.channels.root(page, {
        "query": query,
        "sort": "followers",
        "direction": "desc"
    });
});

new page.Searcher("Vimeo - Groups", Plugin.path + "logo.png", function(page, query) {
    view.groups.root(page, {
        "query": query,
        "sort": "followers",
        "direction": "desc"
    });
});

new page.Searcher("Vimeo - Videos", Plugin.path + "logo.png", function(page, query) {
    view.videos.root(page, {
        "query": query,
        "sort": "relevant",
        "direction": "desc"
    });
});

new page.Searcher("Vimeo - Users", Plugin.path + "logo.png", function(page, query) {
    view.users.root(page, {
        "query": query,
        "sort": "relevant",
        "direction": "desc"
    });
});
