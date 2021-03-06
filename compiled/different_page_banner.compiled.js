"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Different_Page_Banner = function () {
	function Different_Page_Banner() {
		_classCallCheck(this, Different_Page_Banner);
	}

	_createClass(Different_Page_Banner, null, [{
		key: "init",
		value: function init() {
			this.PLUGIN_ID = "pixeldepth_custom_banner";

			this.banners = [];
			this.route = pb.data("route");

			this.patterns = {

				profile_summary: "user",
				profile_activity: "show_user_activity",
				profile_following: "show_user_following",
				profile_friends: "show_user_friends",
				profile_groups: "show_user_groups",
				profile_notifications: "show_user_notifications",
				profile_gifts: "show_user_gift",
				profile_edit: "edit_user_avatar",
				members: "members",
				search: "search",
				search_results: "search_results",
				calendar: /^calendar(_(day|month|list(_default)?))?$/,
				message_inbox: "conversations_inbox",
				message_outbox: "conversations_outbox",
				message_archive: "conversations",
				message_conversation: /^((new_)?conversation|new_message|quote_messages)$/,
				home: "home",
				forum_home: "forum",
				recent_threads: "recent_threads",
				recent_posts: "all_recent_posts",
				participated: "participated_threads",
				monetary_shop: "monetaryshop",
				monetary_bank: "bank",
				monetary_stockmarket: "stockmarket"

			};;

			this.setup();

			$(this.ready.bind(this));
		}
	}, {
		key: "ready",
		value: function ready() {
			if (this.banners.length) {
				var $banner = $("#banner");

				if ($banner.length == 1) {
					for (var a = 0, l = this.banners.length; a < l; ++a) {
						if (this.check_page(this.banners[a])) {
							var css = {};

							css["background-image"] = "url(" + this.banners[a].banner_url + ")";

							if (this.banners[a].background_repeat && this.banners[a].background_repeat) {
								css["background-repeat"] = this.banners[a].background_repeat;
							}

							if (this.banners[a].background_position && this.banners[a].background_position.length) {
								css["background-position"] = this.banners[a].background_position;
							}

							if (this.banners[a].background_color && this.banners[a].background_color.length) {
								css["background-color"] = "#" + this.banners[a].background_color;
							} else if (this.banners[a].background_transparent && this.banners[a].background_transparent == "1") {
								css["background-color"] = "transparent";
							}

							if (this.banners[a].banner_height && this.banners[a].banner_height.length) {
								css["height"] = parseInt(this.banners[a].banner_height) + "px";
							}

							if (this.banners[a].hide_logo && this.banners[a].hide_logo == 1) {
								$("#banner #logo").hide();
							}

							$banner.css(css);
						}
					}
				}
			}
		}
	}, {
		key: "setup",
		value: function setup() {
			var plugin = pb.plugin.get(this.PLUGIN_ID);

			if (plugin && plugin.settings) {
				var settings = plugin.settings;

				if (settings.banners) {
					this.banners = settings.banners;
				}
			}
		}

		// Need to check specific pages, and boards / categories

	}, {
		key: "check_page",
		value: function check_page(banner) {

			// Check specific page version (i.e profile, messages...)
			// This overrules categories and boards
			// Current there is no conflict with cats and boards

			if (this.specific_page_match(banner.show_on_page)) {
				return true;
			}

			if (this.board_match(banner.boards)) {
				return true;
			}

			if (this.category_match(banner.categories)) {
				return true;
			}

			if (this.custom_page_match(banner.custom_pages)) {
				return true;
			}

			return false;
		}
	}, {
		key: "board_match",
		value: function board_match(boards) {
			var page = proboards.data("page");

			if (page.board && page.board.id) {
				if ($.inArrayLoose(page.board.id, boards) > -1) {
					return true;
				}
			}

			return false;
		}
	}, {
		key: "category_match",
		value: function category_match(categories) {
			var page = proboards.data("page");

			if (page.category && page.category.id) {
				if ($.inArrayLoose(page.category.id, categories) > -1) {
					return true;
				}
			}

			return false;
		}
	}, {
		key: "custom_page_match",
		value: function custom_page_match(custom_pages) {
			if (custom_pages && custom_pages.length) {
				var ids = custom_pages.split(",");
				var page_id = this.route && this.route.params && this.route.params.page_id ? this.route.params.page_id : "";

				if ($.inArrayLoose(page_id, ids) > -1) {
					return true;
				}
			}

			return false;
		}
	}, {
		key: "specific_page_match",
		value: function specific_page_match(pages) {
			if (pages && pages.length) {
				for (var m = 0, l = pages.length; m < l; ++m) {
					if (this.patterns[pages[m]]) {
						if (typeof this.patterns[pages[m]] === "string" && this.patterns[pages[m]].match("monetary")) {
							if (location.href.match(new RegExp("\?" + this.patterns[pages[m]], "i"))) {
								return true;
							}
						} else {
							var pattern = typeof this.patterns[pages[m]] === "string" ? this.patterns[pages[m]] : new RegExp(this.patterns[pages[m]], "i");

							if (this.route.name.match(pattern)) {
								return true;
							}
						}
					}
				}
			}

			return false;
		}
	}]);

	return Different_Page_Banner;
}();


Different_Page_Banner.init();