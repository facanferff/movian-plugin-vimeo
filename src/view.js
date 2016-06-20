exports.controller = (function() {
    var template = function(page, parentUri, id, options, loader, args, config) {
        if (!args) args = {};
        if (!config) config = {};

        page.loading = true;
        if (!config.noPageMetadata) page.metadata.icon = Plugin.path + "logo.png";

        if (!config.noPageMenu && page.options) {
            movian.initializePageMenu(page, options,
                function() {
                    args.sort = movian.options.sort();
                    args.direction = movian.options.direction();

                    page.flush();
                    loader(page, id, args, config);
                });
        }

        if (!config.noPageMetadata && parentUri) {
            var meta = api.call(page, 'GET', parentUri, {}, function(meta) {
                page.metadata.title = meta.name;
                if (meta.pictures) page.metadata.icon = movian.arrayToImageSet(meta.pictures.sizes);
            });
        }

        loader(page, id, args, config);
    };

    return {
        "categories": {
            "root": function(page, args) {
                page.type = "directory";
                page.metadata.title = "Vimeo - Categories";
                template(page, null, null,
                    api.categories.root.options, Loader.categories.root, args, {
                        "noPaginator": true
                    });
            }
        },

        "category": {
            "root": function(page, category, args) {
                page.type = "directory";
                page.model.contents = 'grid';

                // separators
                var separatorSubcategories = page.appendPassiveItem("separator", null, {
                    title: "Subcategories"
                });
                var separatorVideos = page.appendPassiveItem("separator", null, {
                    title: "Videos"
                });
                var separatorChannels = page.appendPassiveItem("separator", null, {
                    title: "Channels"
                });
                var separatorGroups = page.appendPassiveItem("separator", null, {
                    title: "Groups"
                });

                template(page, "/categories/" + category, category,
                    api.category.root.options, Loader.category.root, args, {
                        "noPaginator": true,
                        "beforeItem": separatorVideos,
                        "destroyIfNoElements": separatorSubcategories
                    });

                template(page, "/categories/" + category, category,
                    api.category.videos.options, Loader.category.videos, {
                        "per_page": 4
                    }, {
                        "noPaginator": true,
                        "noPageMetadata": true,
                        "noPageMenu": true,
                        "moreItemsUri": PREFIX + ":category:" + category + ":videos",
                        "beforeItem": separatorChannels
                    });

                template(page, "/categories/" + category, category,
                    api.category.channels.options, Loader.category.channels, {
                        "per_page": 4
                    }, {
                        "noPaginator": true,
                        "noPageMetadata": true,
                        "noPageMenu": true,
                        "moreItemsUri": PREFIX + ":category:" + category + ":channels",
                        "beforeItem": separatorGroups
                    });

                template(page, "/categories/" + category, category,
                    api.category.groups.options, Loader.category.groups, {
                        "per_page": 4
                    }, {
                        "noPaginator": true,
                        "noPageMetadata": true,
                        "noPageMenu": true,
                        "moreItemsUri": PREFIX + ":category:" + category + ":groups"
                    });
            },

            "channels": function(page, category) {
                page.type = "directory";
                page.model.contents = "grid";
                template(page, "/categories/" + category, category,
                    api.category.channels.options, Loader.category.channels);
            },

            "groups": function(page, category) {
                page.type = "directory";
                page.model.contents = "grid";
                template(page, "/categories/" + category, category,
                    api.category.groups.options, Loader.category.groups);
            },

            "videos": function(page, category) {
                page.type = "directory";
                template(page, "/categories/" + category, category,
                    api.category.videos.options, Loader.category.videos);
            }
        },

        "channel": {
            "videos": function(page, channel) {
                page.type = "directory";
                template(page, "/channels/" + channel, channel,
                    api.channel.videos.options, Loader.channel.videos);
            }
        },

        "channels": {
            "root": function(page, args) {
                page.type = "directory";
                page.model.contents = "grid";
                page.metadata.title = "Vimeo - Channels";
                template(page, null, null,
                    api.channels.root.options, Loader.channels.root, args);
            }
        },

        "group": {
            "videos": function(page, group) {
                page.type = "directory";
                template(page, "/groups/" + group, group,
                    api.group.videos.options, Loader.group.videos);
            }
        },

        "groups": {
            "root": function(page, args) {
                page.type = "directory";
                page.model.contents = "grid";
                page.metadata.title = "Vimeo - Groups";
                template(page, null, null,
                    api.groups.root.options, Loader.groups.root, args);
            }
        },

        "home": {
            "root": function(page) {
                page.type = "directory";
                page.model.contents = "grid";
                page.metadata.icon = Plugin.path + "logo.png";
                page.metadata.title = "Vimeo";

                if (Core.currentVersionInt >= 50000156) {
                    page.appendItem(PREFIX + ":search:", 'search', {
                        title: 'Search ' + PLUGIN_NAME
                    });
                }

                // separators
                var separatorCategories = page.appendPassiveItem("separator", null, {
                    "title": "Categories"
                });
                var separatorChannels = page.appendPassiveItem("separator", null, {
                    "title": "Channels"
                });
                var separatorGroups = page.appendPassiveItem("separator", null, {
                    "title": "Groups"
                });

                // Categories guide
                template(page, null, null, api.categories.root.options, Loader.categories.root, {}, {
                    "noPaginator": true,
                    "noPageMetadata": true,
                    "noPageMenu": true,
                    "moreItemsUri": PREFIX + ":categories",
                    "beforeItem": separatorChannels
                });

                // Channel guide
                template(page, null, null, api.channels.root.options, Loader.channels.root, {
                    "sort": "followers",
                    "direction": "desc",
                    "per_page": 4
                }, {
                    "noPaginator": true,
                    "noPageMetadata": true,
                    "noPageMenu": true,
                    "moreItemsUri": PREFIX + ":channels",
                    "beforeItem": separatorGroups
                });

                // Group guide
                template(page, null, null, api.groups.root.options, Loader.groups.root, {
                    "sort": "followers",
                    "direction": "desc",
                    "per_page": 4
                }, {
                    "noPaginator": true,
                    "noPageMetadata": true,
                    "noPageMenu": true,
                    "moreItemsUri": PREFIX + ":groups"
                });
            }
        },

        "search": {
            "root": function(page, query) {
                page.type = "directory";
                page.metadata.title = "Search";
                page.metadata.icon = Plugin.path + "logo.png";

                // separators
                page.appendPassiveItem("separator", null, {
                    "title": "Videos"
                });
                var separatorUsers = page.appendPassiveItem("separator", null, {
                    "title": "Users"
                });
                var separatorChannels = page.appendPassiveItem("separator", null, {
                    "title": "Channels"
                });
                var separatorGroups = page.appendPassiveItem("separator", null, {
                    "title": "Groups"
                });

                // Videos
                template(page, null, null, api.videos.root.options, Loader.videos.root, {
                    "query": query,
                    "sort": "relevant",
                    "direction": "desc",
                    "per_page": 4
                }, {
                    "noPaginator": true,
                    "noPageMetadata": true,
                    "noPageMenu": true,
                    "moreItemsUri": PREFIX + ":search:videos:" + query,
                    "beforeItem": separatorUsers
                });

                // Users
                template(page, null, null, api.users.root.options, Loader.users.root, {
                    "query": query,
                    "sort": "relevant",
                    "direction": "desc",
                    "per_page": 4
                }, {
                    "noPaginator": true,
                    "noPageMetadata": true,
                    "noPageMenu": true,
                    "moreItemsUri": PREFIX + ":search:users:" + query,
                    "beforeItem": separatorChannels
                });

                // Channels
                template(page, null, null, api.channels.root.options, Loader.channels.root, {
                    "query": query,
                    "sort": "followers",
                    "direction": "desc",
                    "per_page": 4
                }, {
                    "noPaginator": true,
                    "noPageMetadata": true,
                    "noPageMenu": true,
                    "moreItemsUri": PREFIX + ":search:channels:" + query,
                    "beforeItem": separatorGroups
                });

                // Groups
                template(page, null, null, api.groups.root.options, Loader.groups.root, {
                    "query": query,
                    "sort": "followers",
                    "direction": "desc",
                    "per_page": 4
                }, {
                    "noPaginator": true,
                    "noPageMetadata": true,
                    "noPageMenu": true,
                    "moreItemsUri": PREFIX + ":search:groups:" + query
                });
            }
        },

        "user": {
            "album": {
                "videos": function(page, user, album) {
                    page.type = "directory";
                    template(page, "/users/" + user, {
                            "user": user,
                            "album": album
                        },
                        api.user.album.videos.options, Loader.user.album.videos);
                }
            },

            "albums": function(page, user) {
                page.type = "directory";
                template(page, "/users/" + user, user,
                    api.user.albums.options, Loader.user.albums);
            },

            "root": function(page, user) {
                page.type = "directory";
                page.metadata.icon = Plugin.path + "logo.png";

                // separators
                var separatorUploads = page.appendPassiveItem("separator", null, {
                    "title": "Recent Uploads"
                });
                var separatorAlbums = page.appendPassiveItem("separator", null, {
                    "title": "Albums"
                });

                // Recent Uploads
                template(page, "/users/" + user, user, api.user.videos.options, Loader.user.videos, {
                    "sort": "date",
                    "direction": "desc",
                    "per_page": 5
                }, {
                    "noPaginator": true,
                    "noPageMetadata": true,
                    "noPageMenu": true,
                    "beforeItem": separatorAlbums,
                    "moreItemsUri": PREFIX + ":user:" + user + ":videos"
                });

                // Album guide
                template(page, "/users/" + user, user, api.user.albums.options, Loader.user.albums, {
                    "per_page": 5
                }, {
                    "noPaginator": true,
                    "noPageMetadata": false,
                    "noPageMenu": true,
                    "moreItemsUri": PREFIX + ":user:" + user + ":albums",
                    "destroyIfNoElements": separatorAlbums
                });
            },

            "videos": function(page, user) {
                page.type = "directory";
                template(page, "/users/" + user, user,
                    api.user.videos.options, Loader.user.videos);
            }
        },

        "users": {
            "root": function(page, args) {
                page.type = "directory";
                page.metadata.title = "Vimeo - Users";
                template(page, null, null,
                    api.users.root.options, Loader.users.root, args);
            }
        },

        "video": function(page, clipId) {
            page.type = "video";

            var videoPage = player.getVideoPage(clipId);
            var config;

            var match = videoPage.match(/"config_url":"(.+?)"/);
            if (match) {
                var configUrl = match[1].replace(/\\/g, "");
                config = player.getVideoConfig(configUrl);
            } else {
                config = player.getVideoConfigFromClipId(clipId);
            }

            var errorMessage = player.getVideoErrorMessage(config);
            if (errorMessage) {
                page.error(errorMessage);
                return;
            }

            var canonicalUrl = config.video.url;
            var title = config.video.title;
            var icon = player.getVideoIcon(config);
            var url = player.getVideoUrl(config);
            var subtitles = player.getSubtitles(config);

            if (!url) {
                page.error('Failed to obtain video\'s URL');
                return;
            }

            page.loading = false;
            page.source = "videoparams:" + JSON.stringify({
                title: title,
                icon: icon,
                no_fs_scan: true,
                no_subtitle_scan: true,
                canonicalUrl: canonicalUrl,
                sources: [{
                    url: url
                }],
                //subtitles: subtitles
            });
        },

        "videos": {
            "root": function(page, args) {
                page.type = "directory";
                page.metadata.title = "Vimeo - Videos";
                template(page, null, null,
                    api.videos.root.options, Loader.videos.root, args);
            }
        }
    };
})();
