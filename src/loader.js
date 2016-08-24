var cache = require('showtime/store').create('cache');

exports.loader = (function () {
    var template = {
        "handleItem": {
            "album": function (page, title, uri, image, item, config) {
                var item = page.appendItem(PREFIX + ":user:" + api.getUserIdFromUri(item.user.uri) +
                    ":album:" + api.getAlbumIdFromUri(uri) + ":videos", 'directory', {
                        title: title,
                        icon: image
                    });

                if (config.beforeItem) item.moveBefore(config.beforeItem);
            },

            "category": function handleCategoryItem(page, title, uri, image, item, config, metadata) {
                if (!metadata) {
                    metadata = {
                        uri: PREFIX + ":category:" + api.getCategoryIdFromUri(uri),
                        type: 'directory',
                        title: title,
                        icon: image
                    };
                }

                var item = page.appendItem(metadata.uri, metadata.type, metadata);

                if (config.beforeItem) item.moveBefore(config.beforeItem);
            },

            "channel": function (page, title, uri, image, item, config) {
                var item = page.appendItem(PREFIX + ":channel:" + api.getChannelIdFromUri(uri) + ":videos",
                    "directory", {
                        title: title,
                        description: item.description,
                        icon: image
                    });

                if (config.beforeItem) item.moveBefore(config.beforeItem);
            },

            "group": function (page, title, uri, image, item, config) {
                var item = page.appendItem(PREFIX + ":group:" + api.getGroupIdFromUri(uri) + ":videos",
                    "directory", {
                        title: title,
                        description: item.description,
                        icon: image
                    });

                if (config.beforeItem) item.moveBefore(config.beforeItem);
            },

            "user": function (page, title, uri, image, item, config) {
                var item = page.appendItem(PREFIX + ":user:" + api.getUserIdFromUri(uri),
                    "directory", {
                        title: title,
                        description: item.bio,
                        icon: image
                    });

                if (config.beforeItem) item.moveBefore(config.beforeItem);
            },

            "video": function (page, title, uri, image, item, config) {
                var videoId = api.getClipIdFromUri(uri);
                var videoItem = page.appendItem(PREFIX + ":video:" + videoId, 'video', {
                    title: title,
                    description: item.description,
                    icon: image,
                    duration: item.duration,
                    viewCount: item.stats.plays,
                    likeCount: item.metadata.connections.likes.total
                });
                videoItem.videoId = videoId;

                if (config.beforeItem) videoItem.moveBefore(config.beforeItem);

                videoItem.addOptURL("More from " + item.user.name,
                    PREFIX + ":user:" + api.getUserIdFromUri(item.user.uri),
                    "directory");

                // TODO like video
                /*videoItem.addOptAction('Like', function () {
                  api.me.like(page, this.videoId, function (data) {
                    log.d(data);
                  });
                }.bind(videoItem));*/
            }
        },

        "list": function (page, uri, args, handleItem, config) {
            args = args || {};
            config = config || {};
            page.loading = true;

            var pageNum = 1;
            page.entries = 0;
            var processedEntries = 0;
            var totalEntries = 0;

            config.parentUri = uri;

            function loader() {
                args.page = pageNum;
                api.call(page, 'GET', uri, args, function (meta) {
                    page.loading = false;
                    totalEntries = meta.total || 0;

                    if (meta.subcategories) {
                        meta.data = meta.subcategories;
                        totalEntries = meta.data.length;
                    }

                    var i, item;
                    if (meta.data) {
                        for (i = 0; i < meta.data.length; i++) {
                            item = meta.data[i];
                            processedEntries++;

                            if (item.privacy) {
                                if (item.privacy.view === "password") {
                                    log.d("Ignoring item since it is password protected");
                                    continue;
                                }
                            }

                            var image = null;
                            if (item.pictures) image = movian.arrayToImageSet(item.pictures.sizes);

                            handleItem(page, item.name, item.uri, image, item, config);

                            page.entries++;
                        }
                    }

                    page.haveMore(meta.paging !== undefined && meta.paging.next !== undefined);
                    pageNum++;

                    // if there are more pages to follow, then don't fail if vimeo reports any error
                    config.noFail = true;

                    if (totalEntries === 0) {
                        if (config.destroyIfNoElements) {
                            config.destroyIfNoElements.destroy();
                        } else {
                            var item = page.appendPassiveItem("default", null, {
                                "title": "There are no resources available"
                            });

                            if (config.beforeItem) item.moveBefore(config.beforeItem);
                        }
                    }

                    if (config.noPaginator) {
                        if (config.moreItemsUri && processedEntries < totalEntries) {
                            var item = page.appendItem(config.moreItemsUri, "directory", {
                                "title": "See more"
                            });

                            if (config.beforeItem) item.moveBefore(config.beforeItem);
                        }
                    }
                }, config);
            }

            if (!config.noPaginator) page.asyncPaginator = loader;
            loader();
        }
    };

    return {
        "categories": {
            "root": function (page, ignored, args, config) {
                config.cacheTime = 7 * 24 * 60 * 60; // 7 days
                template.list(page, "/categories", args,
                    template.handleItem.category, config);
            }
        },

        "category": {
            "channels": function (page, category, args, config) {
                template.list(page, "/categories/" + category + "/channels", args,
                    template.handleItem.channel, config);
            },

            "groups": function (page, category, args, config) {
                template.list(page, "/categories/" + category + "/groups", args,
                    template.handleItem.group, config);
            },

            "root": function (page, category, args, config) {
                template.list(page, "/categories/" + category, args,
                    template.handleItem.category, config);
            },

            "videos": function (page, category, args, config) {
                template.list(page, "/categories/" + category + "/videos", args,
                    template.handleItem.video, config);
            }
        },

        "channel": {
            "videos": function (page, channel, args, config) {
                template.list(page, "/channels/" + channel + "/videos", args,
                    template.handleItem.video, config);
            }
        },

        "channels": {
            "root": function (page, ignored, args, config) {
                template.list(page, "/channels", args,
                    template.handleItem.channel, config);
            }
        },

        "group": {
            "videos": function (page, group, args, config) {
                template.list(page, "/groups/" + group + "/videos", args,
                    template.handleItem.video, config);
            }
        },

        "groups": {
            "root": function (page, ignored, args, config) {
                template.list(page, "/groups", args,
                    template.handleItem.group, config);
            }
        },

        "user": {
            "album": {
                "videos": function (page, data, args, config) {
                    template.list(page, "/users/" + data.user + "/albums/" + data.album + "/videos",
                        args, template.handleItem.video, config);
                }
            },

            "albums": function (page, user, args, config) {
                template.list(page, "/users/" + user + "/albums", args,
                    template.handleItem.album, config);
            },

            "videos": function (page, user, args, config) {
                template.list(page, "/users/" + user + "/videos", args,
                    template.handleItem.video, config);
            }
        },

        "users": {
            "root": function (page, ignored, args, config) {
                template.list(page, "/users", args,
                    template.handleItem.user, config);
            }
        },

        "videos": {
            "root": function (page, ignored, args, config) {
                template.list(page, "/videos", args,
                    template.handleItem.video, config);
            }
        }
    };
})();
