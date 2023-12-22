// Carousel
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__carousel';
    var PluginCarousel = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginCarousel.defaults = {
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            479: {
                items: 1
            },
            768: {
                items: 2
            },
            979: {
                items: 3
            },
            1199: {
                items: 4
            }
        },
        navText: []
    };
    PluginCarousel.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this
                .setData()
                .setOptions(opts)
                .build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginCarousel.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.owlCarousel))) {
                return this;
            }
            var self = this,
                $el = this.options.wrapper;
            var isCarouselModule = $el.closest('section').hasClass('s123-module-carousel');
            $el.addClass('owl-theme');
            if ($('html').attr('dir') == 'rtl') {
                this.options = $.extend(true, {}, this.options, {
                    rtl: true
                });
            }
            if (this.options.items == 1) {
                this.options.responsive = {}
            }
            if (this.options.items > 4) {
                this.options = $.extend(true, {}, this.options, {
                    responsive: {
                        1199: {
                            items: this.options.items
                        }
                    }
                });
            }
            if (isCarouselModule && this.options.items > 2) {
                this.options = $.extend(true, {}, this.options, {
                    responsive: {
                        768: {
                            items: 3
                        },
                        1199: {
                            items: this.options.items
                        }
                    }
                });
            }
            if (this.options.autoHeight) {
                $(window).afterResize(function() {
                    $el.find('.owl-stage-outer').height($el.find('.owl-item.active').height());
                });
                $(window).load(function() {
                    $el.find('.owl-stage-outer').height($el.find('.owl-item.active').height());
                });
            }
            $el.on('initialized.owl.carousel', function(event) {
                OwlCarousel_FixRenderIssuer($el);
            });
            $el.owlCarousel(this.options).addClass("owl-carousel-init");
            return this;
        }
    };
    $.extend(theme, {
        PluginCarousel: PluginCarousel
    });
    $.fn.themePluginCarousel = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginCarousel($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function($) {
    'use strict';
    if ($.isFunction($.fn['themePluginCarousel'])) {
        $(function() {
            $('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
                var $this = $(this),
                    opts;
                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions)
                    opts = pluginOptions;
                $this.themePluginCarousel(opts);
            });
        });
    }
}).apply(this, [jQuery]);
(function($) {
    $.fn.countTo = function(options) {
        options = options || {};
        return $(this).each(function() {
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from: $(this).data('from'),
                to: $(this).data('to'),
                speed: $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals: $(this).data('decimals')
            }, options);
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};
            $self.data('countTo', data);
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;
                render(value);
                if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }
                if (loopCount >= loops) {
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;
                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };
    $.fn.countTo.defaults = {
        from: 0, // the number the element should start at
        to: 0, // the number the element should end at
        speed: 1000, // how long it should take to count between the target numbers
        refreshInterval: 100, // how often the element should be updated
        decimals: 0, // the number of decimal places to show
        formatter: formatter, // handler for formatting the value before rendering
        onUpdate: null, // callback method for every time the element is updated
        onComplete: null // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }
}(jQuery));
(function(theme, $) {
    theme = theme || {};
    var instanceName = '__counter';
    var PluginCounter = function($el, opts) {
        return this.initialize($el, opts);
    };
    PluginCounter.defaults = {
        accX: 0,
        accY: 0,
        speed: 3000,
        refreshInterval: 100,
        decimals: 0,
        onUpdate: null,
        onComplete: null
    };
    PluginCounter.prototype = {
        initialize: function($el, opts) {
            if ($el.data(instanceName)) {
                return this;
            }
            this.$el = $el;
            this
                .setData()
                .setOptions(opts)
                .build();
            return this;
        },
        setData: function() {
            this.$el.data(instanceName, this);
            return this;
        },
        setOptions: function(opts) {
            this.options = $.extend(true, {}, PluginCounter.defaults, opts, {
                wrapper: this.$el
            });
            return this;
        },
        build: function() {
            if (!($.isFunction($.fn.countTo))) {
                return this;
            }
            var self = this,
                $el = this.options.wrapper;
            $.extend(self.options, {
                onComplete: function() {
                    if ($el.data('append')) {
                        $el.html($el.html() + $el.data('append'));
                    }
                    if ($el.data('prepend')) {
                        $el.html($el.data('prepend') + $el.html());
                    }
                }
            });
            $el.appear(function() {
                $el.countTo(self.options);
            }, {
                accX: self.options.accX,
                accY: self.options.accY
            });
            return this;
        }
    };
    $.extend(theme, {
        PluginCounter: PluginCounter
    });
    $.fn.themePluginCounter = function(opts) {
        return this.map(function() {
            var $this = $(this);
            if ($this.data(instanceName)) {
                return $this.data(instanceName);
            } else {
                return new PluginCounter($this, opts);
            }
        });
    }
}).apply(this, [window.theme, jQuery]);
(function($) {
    'use strict';
    if ($.isFunction($.fn['themePluginCounter'])) {
        $(function() {
            $('[data-plugin-counter]:not(.manual), .counters [data-to]').each(function() {
                var $this = $(this),
                    opts;
                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions)
                    opts = pluginOptions;
                $this.themePluginCounter(opts);
            });
        });
    }
}).apply(this, [jQuery]);
jQuery(function($) {
    $(document).on('s123.page.ready', function(event) {
        var layoutNUM = $('#layoutNUM').val();
        if (layoutNUM != '2' && layoutNUM != '15' && layoutNUM != '3' && layoutNUM != '11' && layoutNUM != '4' && layoutNUM != '20') {
            if ($('.home_page:not(.rich_page)').length > 0) {
                var fixedMenuAfterFirstScroll = parseInt($('body').css('margin-top'), 10) + parseInt($('body').css('padding-top'), 10);
                if (layoutNUM == '13') {
                    fixedMenuAfterFirstScroll += parseInt($('#mainNav').css('margin-top'), 10);
                }
                if (fixedMenuAfterFirstScroll == 0) {
                    fixedMenuAfterFirstScroll = 1;
                }
            } else {
                var fixedMenuAfterFirstScroll = parseInt($('body').css('margin-top'), 10);
            }
            setStickyMenuHandler.init({
                $mainNav: $('#mainNav'),
                offSetTop: fixedMenuAfterFirstScroll
            });
            if ($('.inside_page').length == 0) {
                var HighlightMenuOnScrollOffset = $('#mainNav').height() + parseInt($('body').css('margin-top'), 10);
            } else {
                var HighlightMenuOnScrollOffset = parseInt($('body').css('margin-top'), 10);
            }
            $('body').scrollspy({
                target: '#mainNav',
                offset: HighlightMenuOnScrollOffset
            });
            if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
                setTimeout(function() {
                    ReduseMenuSizeWhenWeDontHavePlace();
                }, 150);
            } else {
                document.fonts.ready.then(function() {
                    ReduseMenuSizeWhenWeDontHavePlace();
                });
            }
            $('#mainNav').off('escm.size.changed').on('escm.size.changed', function() {
                if (!IsWizard()) {
                    ResetMoreButton();
                } else {
                    ReduseMenuSizeWhenWeDontHavePlace();
                }
            });
            S123.ElementSizeChangeManager.escm_observe('mainNav', ['width']);
        }
    });
});
jQuery(function($) {
    $(document).on('s123.page.ready', function(event) {
        var layoutNUM = $('#layoutNUM').val();
        if (layoutNUM == '2') {
            var beforeScrollMenuHeight = $('#mainNav .navbar-header').height() + parseInt($('body').css('margin-top'), 10);
            $('body').scrollspy({
                target: '#mainNav #top-menu',
                offset: beforeScrollMenuHeight
            });
            setStickyMenuHandler.init({
                $mainNav: $('#mainNav #top-menu'),
                offSetTop: beforeScrollMenuHeight
            });
            if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
                setTimeout(function() {
                    ReduseMenuSizeWhenWeDontHavePlace();
                }, 150);
            } else {
                document.fonts.ready.then(function() {
                    ReduseMenuSizeWhenWeDontHavePlace();
                });
            }
            $('#mainNav').off('escm.size.changed').on('escm.size.changed', function() {
                if (!IsWizard()) {
                    ResetMoreButton();
                } else {
                    ReduseMenuSizeWhenWeDontHavePlace();
                }
            });
            S123.ElementSizeChangeManager.escm_observe('mainNav', ['width']);
        }
    });
});
jQuery(function($) {
    $(document).on('s123.page.ready', function(event) {
        var layoutNUM = $('#layoutNUM').val();
        if (layoutNUM == '15') {
            if ($('.home_page:not(.rich_page)').length > 0) {
                var fixedMenuAfterFirstScroll = $(window).height() - $('#mainNav').height();
            } else {
                var fixedMenuAfterFirstScroll = 0;
            }
            setStickyMenuHandler.init({
                $mainNav: $('#mainNav'),
                offSetTop: fixedMenuAfterFirstScroll
            });
            if ($('.home_page:not(.rich_page)').length > 0) {
                $('#mainNav').off('affix.bs.affix').on('affix.bs.affix', function() {
                    $('.navbar-fixed-top').css({
                        position: 'fixed',
                        bottom: 'auto',
                        top: '0'
                    });
                });
                $('#mainNav').off('affix-top.bs.affix').on('affix-top.bs.affix', function() {
                    $('.navbar-fixed-top').css({
                        position: 'absolute',
                        bottom: '0',
                        top: 'auto'
                    });
                });
            } else {
                $('.navbar-fixed-top').css({
                    position: '',
                    bottom: '',
                    top: ''
                });
            }
            $('body').scrollspy({
                target: '#mainNav',
                offset: $('#mainNav').height()
            });
            if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
                setTimeout(function() {
                    ReduseMenuSizeWhenWeDontHavePlace();
                }, 150);
            } else {
                document.fonts.ready.then(function() {
                    ReduseMenuSizeWhenWeDontHavePlace();
                });
            }
            $('#mainNav').off('escm.size.changed').on('escm.size.changed', function() {
                if (!IsWizard()) {
                    ResetMoreButton();
                } else {
                    ReduseMenuSizeWhenWeDontHavePlace();
                }
            });
            S123.ElementSizeChangeManager.escm_observe('mainNav', ['width']);
        }
    });
});
jQuery(function($) {
    $(document).on('s123.page.ready', function(event) {
        var layoutNUM = $('#layoutNUM').val();
        if (layoutNUM == '20') {
            if (!window.layout20_topMenuHeight) {
                window.layout20_topMenuHeight = $('#mainNav').outerHeight();
            }
            if ($('.home_page:not(.rich_page)').length > 0) {
                var beforeScrollMenuHeight = $(window).height();
            } else {
                var beforeScrollMenuHeight = 0;
            }
            $('body').scrollspy({
                target: '#mainNav',
                offset: 0 //Must be 0 so the second page (if he is short) will be show
            });
            setStickyMenuHandler.init({
                $mainNav: $('#mainNav'),
                offSetTop: beforeScrollMenuHeight
            });
            if ($('.home_page:not(.rich_page)').length > 0) {
                $('#mainNav').off('affix.bs.affix').on('affix.bs.affix', function() {
                    $('.navbar-fixed-top').css({
                        position: 'fixed',
                        bottom: 'auto',
                        top: '0'
                    });
                });
                $('#mainNav').off('affix-top.bs.affix').on('affix-top.bs.affix', function() {
                    $('.navbar-fixed-top').css({
                        position: 'absolute',
                        bottom: -Math.abs(window.layout20_topMenuHeight),
                        top: 'auto'
                    });
                });
            } else {
                $('.navbar-fixed-top').css({
                    'position': '',
                    'bottom': '',
                    'top': ''
                });
            }
            if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
                setTimeout(function() {
                    ReduseMenuSizeWhenWeDontHavePlace();
                }, 150);
            } else {
                document.fonts.ready.then(function() {
                    ReduseMenuSizeWhenWeDontHavePlace();
                });
            }
            $('#mainNav').off('escm.size.changed').on('escm.size.changed', function() {
                if (!IsWizard()) {
                    ResetMoreButton();
                } else {
                    ReduseMenuSizeWhenWeDontHavePlace();
                }
            });
            S123.ElementSizeChangeManager.escm_observe('mainNav', ['width']);
        }
    });
});
jQuery(function($) {
    $(document).on('s123.page.ready', function(event) {
        var layoutNUM = $('#layoutNUM').val();
        if (layoutNUM == '3' || layoutNUM == '11') {
            if (layoutNUM == '3') {
                $("#header").toggleClass('side-menu-slide');
            }
            $("#menu-toggle,#smallSidebar").off('click').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $("#header").toggleClass("active");
                layout3_changeBarsIcon();
            });
            $("#top-section,.s123-modules-container,.s123-pages-container,footer").off('click.bodyCloseMenu').on('click.bodyCloseMenu', function(e) {
                $("#header").removeClass("active");
                layout3_changeBarsIcon();
            });
            $('body').scrollspy({
                target: '#header'
            });
            $('#header #top-menu li').not('.dropdown-submenu').find('a').off('click').click(function() {
                $("#menu-toggle").click();
            });
            if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
                setTimeout(function() {
                    ReduseMenuSizeWhenWeDontHavePlaceHeight();
                }, 150);
            } else {
                document.fonts.ready.then(function() {
                    ReduseMenuSizeWhenWeDontHavePlaceHeight();
                });
            }
            $('#header').off('escm.size.changed').on('escm.size.changed', function() {
                if (!IsWizard()) {
                    ResetMoreButton();
                } else {
                    ReduseMenuSizeWhenWeDontHavePlaceHeight();
                }
            });
            S123.ElementSizeChangeManager.escm_observe('header', ['height']);
        }
    });
});

function layout3_changeBarsIcon() {
    if ($("#header").hasClass('active')) {
        $("#menu-toggle").find('.fa').removeClass('fa-bars').addClass('fa-close');
    } else {
        $("#menu-toggle").find('.fa').removeClass('fa-close').addClass('fa-bars');
    }
}
jQuery(function($) {
    $(document).on('s123.page.ready', function(event) {
        var layoutNUM = $('#layoutNUM').val();
        if (layoutNUM == '4') {
            $('body').scrollspy({
                target: '#top-menu'
            });
            if (typeof document.fonts === 'undefined' || typeof document.fonts.ready === 'undefined' || typeof document.fonts.ready.then === 'undefined') {
                setTimeout(function() {
                    ReduseMenuSizeWhenWeDontHavePlaceHeight();
                }, 150);
            } else {
                document.fonts.ready.then(function() {
                    ReduseMenuSizeWhenWeDontHavePlaceHeight();
                });
            }
            $('#header').off('escm.size.changed').on('escm.size.changed', function() {
                if (!IsWizard()) {
                    ResetMoreButton();
                } else {
                    ReduseMenuSizeWhenWeDontHavePlaceHeight();
                }
            });
            S123.ElementSizeChangeManager.escm_observe('header', ['height']);
        }
    });
});
jQuery(function($) {
    CarouselModuleInitialize();
});

function CarouselModuleInitialize() {
    $(document).on('s123.page.ready', function(event) {
        var $sections = $('.s123-module-carousel');
        $sections.each(function(index) {
            var $s = $(this);
            var categories = new ModuleLayoutCategories({
                $items: $s.find('.carousel-category'),
                $categoriesContainer: $s.find('.categories-panel'),
                $filterButton: $s.find('.items-responsive-filter'),
                $categories: $s.find('.items-categories-container li')
            });
        });
        if ($.isFunction($.fn['themePluginCarousel'])) {
            $sections.find('.owl-carousel.manual').each(function() {
                var $this = $(this);
                var opts;
                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions) {
                    opts = pluginOptions;
                }
                $this.themePluginCarousel(opts);
                if (!$this.is(':visible')) {
                    $this.addClass('owl-hidden');
                }
            });
        }
    });
}

function OwlCarousel_FixRenderIssuer($el) {
    setTimeout(function() {
        $el.css({
            visibility: 'visible'
        });
    }, 600);
}! function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, o, a) {
        function h(t, e, n) {
            var s, o = "$()." + i + '("' + e + '")';
            return t.each(function(t, h) {
                var l = a.data(h, i);
                if (!l) return void r(i + " not initialized. Cannot call methods, i.e. " + o);
                var c = l[e];
                if (!c || "_" == e.charAt(0)) return void r(o + " is not a valid method");
                var d = c.apply(l, n);
                s = void 0 === s ? d : s
            }), void 0 !== s ? s : t
        }

        function l(t, e) {
            t.each(function(t, n) {
                var s = a.data(n, i);
                s ? (s.option(e), s._init()) : (s = new o(n, e), a.data(n, i, s))
            })
        }
        a = a || e || t.jQuery, a && (o.prototype.option || (o.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = s.call(arguments, 1);
                return h(this, t, e)
            }
            return l(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var s = Array.prototype.slice,
        o = t.console,
        r = "undefined" == typeof o ? function() {} : function(t) {
            o.error(t)
        };
    return n(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return n.indexOf(e) == -1 && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return n != -1 && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
                var o = i[s],
                    r = n && n[o];
                r && (this.off(t, o), delete n[o]), o.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() {
        delete this._events, delete this._onceEvents
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < l; e++) {
            var i = h[e];
            t[i] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function s() {
        if (!c) {
            c = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var s = n(e);
            o.isBoxSizeOuter = r = 200 == t(s.width), i.removeChild(e)
        }
    }

    function o(e) {
        if (s(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var o = n(e);
            if ("none" == o.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var c = a.isBorderBox = "border-box" == o.boxSizing, d = 0; d < l; d++) {
                var u = h[d],
                    f = o[u],
                    p = parseFloat(f);
                a[u] = isNaN(p) ? 0 : p
            }
            var v = a.paddingLeft + a.paddingRight,
                g = a.paddingTop + a.paddingBottom,
                m = a.marginLeft + a.marginRight,
                y = a.marginTop + a.marginBottom,
                E = a.borderLeftWidth + a.borderRightWidth,
                S = a.borderTopWidth + a.borderBottomWidth,
                b = c && r,
                x = t(o.width);
            x !== !1 && (a.width = x + (b ? 0 : v + E));
            var C = t(o.height);
            return C !== !1 && (a.height = C + (b ? 0 : g + S)), a.innerWidth = a.width - (v + E), a.innerHeight = a.height - (g + S), a.outerWidth = a.width + m, a.outerHeight = a.height + y, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        l = h.length,
        c = !1;
    return o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i],
                s = n + "MatchesSelector";
            if (t[s]) return s
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function(t, e) {
        return (t % e + e) % e
    }, i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "object" == typeof t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var s = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!n) return void s.push(t);
                e(t, n) && s.push(t);
                for (var i = t.querySelectorAll(n), o = 0; o < i.length; o++) s.push(i[o])
            }
        }), s
    }, i.debounceMethod = function(t, e, i) {
        var n = t.prototype[e],
            s = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[s];
            t && clearTimeout(t);
            var e = arguments,
                o = this;
            this[s] = setTimeout(function() {
                n.apply(o, e), delete o[s]
            }, i || 100)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function(e, s) {
        i.docReady(function() {
            var o = i.toDashed(s),
                r = "data-" + o,
                a = document.querySelectorAll("[" + r + "]"),
                h = document.querySelectorAll(".js-" + o),
                l = i.makeArray(a).concat(i.makeArray(h)),
                c = r + "-options",
                d = t.jQuery;
            l.forEach(function(t) {
                var i, o = t.getAttribute(r) || t.getAttribute(c);
                try {
                    i = o && JSON.parse(o)
                } catch (a) {
                    return void(n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var h = new e(t, i);
                d && d.data(t, s, h)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {}, t.Flickity.Cell = e(t, t.getSize))
}(window, function(t, e) {
    function i(t, e) {
        this.element = t, this.parent = e, this.create()
    }
    var n = i.prototype;
    return n.create = function() {
        this.element.style.position = "absolute", this.x = 0, this.shift = 0
    }, n.destroy = function() {
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.style[t] = ""
    }, n.getSize = function() {
        this.size = e(this.element)
    }, n.setPosition = function(t) {
        this.x = t, this.updateTarget(), this.renderPosition(t)
    }, n.updateTarget = n.setDefaultTarget = function() {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    }, n.renderPosition = function(t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t)
    }, n.wrapShift = function(t) {
        this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t)
    }, n.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {}, t.Flickity.Slide = e())
}(window, function() {
    "use strict";

    function t(t) {
        this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
    }
    var e = t.prototype;
    return e.addCell = function(t) {
        if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
            this.x = t.x;
            var e = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = t.size[e]
        }
    }, e.updateTarget = function() {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft",
            e = this.getLastCell(),
            i = e ? e.size[t] : 0,
            n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign
    }, e.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }, e.select = function() {
        this.changeSelectedClass("add")
    }, e.unselect = function() {
        this.changeSelectedClass("remove")
    }, e.changeSelectedClass = function(t) {
        this.cells.forEach(function(e) {
            e.element.classList[t]("is-selected")
        })
    }, e.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }, t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.animatePrototype = e(t, t.fizzyUIUtils))
}(window, function(t, e) {
    var i = t.requestAnimationFrame || t.webkitRequestAnimationFrame,
        n = 0;
    i || (i = function(t) {
        var e = (new Date).getTime(),
            i = Math.max(0, 16 - (e - n)),
            s = setTimeout(t, i);
        return n = e + i, s
    });
    var s = {};
    s.startAnimation = function() {
        this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
    }, s.animate = function() {
        this.applyDragForce(), this.applySelectedAttraction();
        var t = this.x;
        if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
            var e = this;
            i(function() {
                e.animate()
            })
        }
    };
    var o = function() {
        var t = document.documentElement.style;
        return "string" == typeof t.transform ? "transform" : "WebkitTransform"
    }();
    return s.positionSlider = function() {
        var t = this.x;
        this.options.wrapAround && this.cells.length > 1 && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), t += this.cursorPosition, t = this.options.rightToLeft && o ? -t : t;
        var i = this.getPositionValue(t);
        this.slider.style[o] = this.isAnimating ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
        var n = this.slides[0];
        if (n) {
            var s = -this.x - n.target,
                r = s / this.slidesWidth;
            this.dispatchEvent("scroll", null, [r, s])
        }
    }, s.positionSliderAtSelected = function() {
        this.cells.length && (this.x = -this.selectedSlide.target, this.positionSlider())
    }, s.getPositionValue = function(t) {
        return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
    }, s.settle = function(t) {
        this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle"))
    }, s.shiftWrapCells = function(t) {
        var e = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, e, -1);
        var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1)
    }, s._shiftCells = function(t, e, i) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n],
                o = e > 0 ? i : 0;
            s.wrapShift(o), e -= s.size.outerWidth
        }
    }, s._unshiftCells = function(t) {
        if (t && t.length)
            for (var e = 0; e < t.length; e++) t[e].wrapShift(0)
    }, s.integratePhysics = function() {
        this.x += this.velocity, this.velocity *= this.getFrictionFactor()
    }, s.applyForce = function(t) {
        this.velocity += t
    }, s.getFrictionFactor = function() {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    }, s.getRestingPosition = function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor())
    }, s.applyDragForce = function() {
        if (this.isPointerDown) {
            var t = this.dragX - this.x,
                e = t - this.velocity;
            this.applyForce(e)
        }
    }, s.applySelectedAttraction = function() {
        if (!this.isPointerDown && !this.isFreeScrolling && this.cells.length) {
            var t = this.selectedSlide.target * -1 - this.x,
                e = t * this.options.selectedAttraction;
            this.applyForce(e)
        }
    }, s
}),
function(t, e) {
    if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(i, n, s, o, r, a) {
        return e(t, i, n, s, o, r, a)
    });
    else if ("object" == typeof module && module.exports) module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var i = t.Flickity;
        t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
    }
}(window, function(t, e, i, n, s, o, r) {
    function a(t, e) {
        for (t = n.makeArray(t); t.length;) e.appendChild(t.shift())
    }

    function h(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void(d && d.error("Bad element for Flickity: " + (i || t)));
        if (this.element = i, this.element.flickityGUID) {
            var s = f[this.element.flickityGUID];
            return s.option(e), s
        }
        l && (this.$element = l(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e), this._create()
    }
    var l = t.jQuery,
        c = t.getComputedStyle,
        d = t.console,
        u = 0,
        f = {};
    h.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    }, h.createMethods = [];
    var p = h.prototype;
    n.extend(p, e.prototype), p._create = function() {
        var e = this.guid = ++u;
        this.element.flickityGUID = e, f[e] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this), h.createMethods.forEach(function(t) {
            this[t]()
        }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
    }, p.option = function(t) {
        n.extend(this.options, t)
    }, p.activate = function() {
        if (!this.isActive) {
            this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize();
            var t = this._filterFindCellElements(this.element.children);
            a(t, this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate");
            var e, i = this.options.initialIndex;
            e = this.isInitActivated ? this.selectedIndex : void 0 !== i && this.cells[i] ? i : 0, this.select(e, !1, !0), this.isInitActivated = !0
        }
    }, p._createSlider = function() {
        var t = document.createElement("div");
        t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t
    }, p._filterFindCellElements = function(t) {
        return n.filterFindElements(t, this.options.cellSelector)
    }, p.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
    }, p._makeCells = function(t) {
        var e = this._filterFindCellElements(t),
            i = e.map(function(t) {
                return new s(t, this)
            }, this);
        return i
    }, p.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }, p.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }, p.positionCells = function() {
        this._sizeCells(this.cells), this._positionCells(0)
    }, p._positionCells = function(t) {
        t = t || 0, this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
        var e = 0;
        if (t > 0) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        for (var n = this.cells.length, s = t; s < n; s++) {
            var o = this.cells[s];
            o.setPosition(e), e += o.size.outerWidth, this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
    }, p._sizeCells = function(t) {
        t.forEach(function(t) {
            t.getSize()
        })
    }, p.updateSlides = function() {
        if (this.slides = [], this.cells.length) {
            var t = new o(this);
            this.slides.push(t);
            var e = "left" == this.originSide,
                i = e ? "marginRight" : "marginLeft",
                n = this._getCanCellFit();
            this.cells.forEach(function(e, s) {
                if (!t.cells.length) return void t.addCell(e);
                var r = t.outerWidth - t.firstMargin + (e.size.outerWidth - e.size[i]);
                n.call(this, s, r) ? t.addCell(e) : (t.updateTarget(), t = new o(this), this.slides.push(t), t.addCell(e))
            }, this), t.updateTarget(), this.updateSelectedSlide()
        }
    }, p._getCanCellFit = function() {
        var t = this.options.groupCells;
        if (!t) return function() {
            return !1
        };
        if ("number" == typeof t) {
            var e = parseInt(t, 10);
            return function(t) {
                return t % e !== 0
            }
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/),
            n = i ? parseInt(i[1], 10) / 100 : 1;
        return function(t, e) {
            return e <= (this.size.innerWidth + 1) * n
        }
    }, p._init = p.reposition = function() {
        this.positionCells(), this.positionSliderAtSelected()
    }, p.getSize = function() {
        this.size = i(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
    };
    var v = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return p.setCellAlign = function() {
        var t = v[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    }, p.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = t + "px"
        }
    }, p._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
            var t = this.cursorPosition,
                e = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1)
        }
    }, p._getGapCells = function(t, e, i) {
        for (var n = []; t > 0;) {
            var s = this.cells[e];
            if (!s) break;
            n.push(s), e += i, t -= s.size.outerWidth
        }
        return n
    }, p._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var t = this.options.rightToLeft,
                e = t ? "marginRight" : "marginLeft",
                i = t ? "marginLeft" : "marginRight",
                n = this.slideableWidth - this.getLastCell().size[i],
                s = n < this.size.innerWidth,
                o = this.cursorPosition + this.cells[0].size[e],
                r = n - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(t) {
                s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o), t.target = Math.min(t.target, r))
            }, this)
        }
    }, p.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), l && this.$element) {
            t += this.options.namespaceJQueryEvents ? ".flickity" : "";
            var s = t;
            if (e) {
                var o = l.Event(e);
                o.type = t, s = o
            }
            this.$element.trigger(s, i)
        }
    }, p.select = function(t, e, i) {
        this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)), this.slides[t] && (this.selectedIndex = t, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select"), this.dispatchEvent("cellSelect")))
    }, p._wrapSelect = function(t) {
        var e = this.slides.length,
            i = this.options.wrapAround && e > 1;
        if (!i) return t;
        var s = n.modulo(t, e),
            o = Math.abs(s - this.selectedIndex),
            r = Math.abs(s + e - this.selectedIndex),
            a = Math.abs(s - e - this.selectedIndex);
        !this.isDragSelect && r < o ? t += e : !this.isDragSelect && a < o && (t -= e), t < 0 ? this.x -= this.slideableWidth : t >= e && (this.x += this.slideableWidth)
    }, p.previous = function(t, e) {
        this.select(this.selectedIndex - 1, t, e)
    }, p.next = function(t, e) {
        this.select(this.selectedIndex + 1, t, e)
    }, p.updateSelectedSlide = function() {
        var t = this.slides[this.selectedIndex];
        t && (this.unselectSelectedSlide(), this.selectedSlide = t, t.select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0])
    }, p.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }, p.selectCell = function(t, e, i) {
        var n;
        "number" == typeof t ? n = this.cells[t] : ("string" == typeof t && (t = this.element.querySelector(t)), n = this.getCell(t));
        for (var s = 0; n && s < this.slides.length; s++) {
            var o = this.slides[s],
                r = o.cells.indexOf(n);
            if (r != -1) return void this.select(s, e, i)
        }
    }, p.getCell = function(t) {
        for (var e = 0; e < this.cells.length; e++) {
            var i = this.cells[e];
            if (i.element == t) return i
        }
    }, p.getCells = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getCell(t);
            i && e.push(i)
        }, this), e
    }, p.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }, p.getParentCell = function(t) {
        var e = this.getCell(t);
        return e ? e : (t = n.getParent(t, ".flickity-slider > *"), this.getCell(t))
    }, p.getAdjacentCellElements = function(t, e) {
        if (!t) return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (1 + 2 * t >= i) return this.getCellElements();
        for (var s = [], o = e - t; o <= e + t; o++) {
            var r = this.options.wrapAround ? n.modulo(o, i) : o,
                a = this.slides[r];
            a && (s = s.concat(a.getCellElements()))
        }
        return s
    }, p.uiChange = function() {
        this.emitEvent("uiChange")
    }, p.childUIPointerDown = function(t) {
        this.emitEvent("childUIPointerDown", [t])
    }, p.onresize = function() {
        this.watchCSS(), this.resize()
    }, n.debounceMethod(h, "onresize", 150), p.resize = function() {
        if (this.isActive) {
            this.getSize(), this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
            var t = this.selectedElements && this.selectedElements[0];
            this.selectCell(t, !1, !0)
        }
    }, p.watchCSS = function() {
        var t = this.options.watchCSS;
        if (t) {
            var e = c(this.element, ":after").content;
            e.indexOf("flickity") != -1 ? this.activate() : this.deactivate()
        }
    }, p.onkeydown = function(t) {
        if (this.options.accessibility && (!document.activeElement || document.activeElement == this.element))
            if (37 == t.keyCode) {
                var e = this.options.rightToLeft ? "next" : "previous";
                this.uiChange(), this[e]()
            } else if (39 == t.keyCode) {
            var i = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(), this[i]()
        }
    }, p.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.cells.forEach(function(t) {
            t.destroy()
        }), this.unselectSelectedSlide(), this.element.removeChild(this.viewport), a(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
    }, p.destroy = function() {
        this.deactivate(), t.removeEventListener("resize", this), this.emitEvent("destroy"), l && this.$element && l.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete f[this.guid]
    }, n.extend(p, r), h.data = function(t) {
        t = n.getQueryElement(t);
        var e = t && t.flickityGUID;
        return e && f[e]
    }, n.htmlInit(h, "flickity"), l && l.bridget && l.bridget("flickity", h), h.setJQuery = function(t) {
        l = t
    }, h.Cell = s, h
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.Unipointer = e(t, t.EvEmitter)
}(window, function(t, e) {
    function i() {}

    function n() {}
    var s = n.prototype = Object.create(e.prototype);
    s.bindStartEvent = function(t) {
        this._bindStartEvent(t, !0)
    }, s.unbindStartEvent = function(t) {
        this._bindStartEvent(t, !1)
    }, s._bindStartEvent = function(e, i) {
        i = void 0 === i || !!i;
        var n = i ? "addEventListener" : "removeEventListener";
        t.PointerEvent ? e[n]("pointerdown", this) : (e[n]("mousedown", this), e[n]("touchstart", this))
    }, s.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, s.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier) return i
        }
    }, s.onmousedown = function(t) {
        var e = t.button;
        e && 0 !== e && 1 !== e || this._pointerDown(t, t)
    }, s.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    }, s.onpointerdown = function(t) {
        this._pointerDown(t, t)
    }, s._pointerDown = function(t, e) {
        this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e))
    }, s.pointerDown = function(t, e) {
        this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
    };
    var o = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return s._bindPostStartEvents = function(e) {
        if (e) {
            var i = o[e.type];
            i.forEach(function(e) {
                t.addEventListener(e, this)
            }, this), this._boundPointerEvents = i
        }
    }, s._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(e) {
            t.removeEventListener(e, this)
        }, this), delete this._boundPointerEvents)
    }, s.onmousemove = function(t) {
        this._pointerMove(t, t)
    }, s.onpointermove = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }, s.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e)
    }, s._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    }, s.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    }, s.onmouseup = function(t) {
        this._pointerUp(t, t)
    }, s.onpointerup = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }, s.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e)
    }, s._pointerUp = function(t, e) {
        this._pointerDone(), this.pointerUp(t, e)
    }, s.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    }, s._pointerDone = function() {
        this.isPointerDown = !1, delete this.pointerIdentifier, this._unbindPostStartEvents(), this.pointerDone()
    }, s.pointerDone = i, s.onpointercancel = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }, s.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e)
    }, s._pointerCancel = function(t, e) {
        this._pointerDone(), this.pointerCancel(t, e)
    }, s.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }, n.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    }, n
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.Unidragger = e(t, t.Unipointer)
}(window, function(t, e) {
    function i() {}
    var n = i.prototype = Object.create(e.prototype);
    return n.bindHandles = function() {
        this._bindHandles(!0)
    }, n.unbindHandles = function() {
        this._bindHandles(!1)
    }, n._bindHandles = function(e) {
        e = void 0 === e || !!e;
        for (var i = e ? "addEventListener" : "removeEventListener", n = 0; n < this.handles.length; n++) {
            var s = this.handles[n];
            this._bindStartEvent(s, e), s[i]("click", this), t.PointerEvent && (s.style.touchAction = e ? this._touchActionValue : "")
        }
    }, n._touchActionValue = "none", n.pointerDown = function(t, e) {
        if ("INPUT" == t.target.nodeName && "range" == t.target.type) return this.isPointerDown = !1, void delete this.pointerIdentifier;
        this._dragPointerDown(t, e);
        var i = document.activeElement;
        i && i.blur && i.blur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
    }, n._dragPointerDown = function(t, i) {
        this.pointerDownPoint = e.getPointerPoint(i);
        var n = this.canPreventDefaultOnPointerDown(t, i);
        n && t.preventDefault()
    }, n.canPreventDefaultOnPointerDown = function(t) {
        return "SELECT" != t.target.nodeName
    }, n.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i)
    }, n._dragPointerMove = function(t, i) {
        var n = e.getPointerPoint(i),
            s = {
                x: n.x - this.pointerDownPoint.x,
                y: n.y - this.pointerDownPoint.y
            };
        return !this.isDragging && this.hasDragStarted(s) && this._dragStart(t, i), s
    }, n.hasDragStarted = function(t) {
        return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
    }, n.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e)
    }, n._dragPointerUp = function(t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
    }, n._dragStart = function(t, i) {
        this.isDragging = !0, this.dragStartPoint = e.getPointerPoint(i), this.isPreventingClicks = !0, this.dragStart(t, i)
    }, n.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    }, n._dragMove = function(t, e, i) {
        this.isDragging && this.dragMove(t, e, i)
    }, n.dragMove = function(t, e, i) {
        t.preventDefault(), this.emitEvent("dragMove", [t, e, i])
    }, n._dragEnd = function(t, e) {
        this.isDragging = !1, setTimeout(function() {
            delete this.isPreventingClicks
        }.bind(this)), this.dragEnd(t, e)
    }, n.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    }, n.onclick = function(t) {
        this.isPreventingClicks && t.preventDefault()
    }, n._staticClick = function(t, e) {
        if (!this.isIgnoringMouseUp || "mouseup" != t.type) {
            var i = t.target.nodeName;
            "INPUT" != i && "TEXTAREA" != i || t.target.focus(), this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function() {
                delete this.isIgnoringMouseUp
            }.bind(this), 400))
        }
    }, n.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    }, i.getPointerPoint = e.getPointerPoint, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function s(t) {
        var e = "touchstart" == t.type,
            i = "touch" == t.pointerType,
            n = d[t.target.nodeName];
        return e || i || n
    }

    function o() {
        return {
            x: t.pageXOffset,
            y: t.pageYOffset
        }
    }
    n.extend(e.defaults, {
        draggable: !0,
        dragThreshold: 3
    }), e.createMethods.push("_createDrag");
    var r = e.prototype;
    n.extend(r, i.prototype), r._touchActionValue = "pan-y";
    var a = "createTouch" in document,
        h = !1;
    r._createDrag = function() {
        this.on("activate", this.bindDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.unbindDrag), a && !h && (t.addEventListener("touchmove", function() {}), h = !0)
    }, r.bindDrag = function() {
        this.options.draggable && !this.isDragBound && (this.element.classList.add("is-draggable"), this.handles = [this.viewport], this.bindHandles(), this.isDragBound = !0)
    }, r.unbindDrag = function() {
        this.isDragBound && (this.element.classList.remove("is-draggable"), this.unbindHandles(), delete this.isDragBound)
    }, r._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }, r._childUIPointerDownDrag = function(t) {
        t.preventDefault(), this.pointerDownFocus(t)
    };
    var l = {
            TEXTAREA: !0,
            INPUT: !0,
            OPTION: !0
        },
        c = {
            radio: !0,
            checkbox: !0,
            button: !0,
            submit: !0,
            image: !0,
            file: !0
        };
    r.pointerDown = function(e, i) {
        var n = l[e.target.nodeName] && !c[e.target.type];
        if (n) return this.isPointerDown = !1, void delete this.pointerIdentifier;
        this._dragPointerDown(e, i);
        var s = document.activeElement;
        s && s.blur && s != this.element && s != document.body && s.blur(), this.pointerDownFocus(e), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this._bindPostStartEvents(e), this.pointerDownScroll = o(), t.addEventListener("scroll", this), this.dispatchEvent("pointerDown", e, [i])
    }, r.pointerDownFocus = function(e) {
        var i = s(e);
        if (this.options.accessibility && !i) {
            var n = t.pageYOffset;
            this.element.focus(), t.pageYOffset != n && t.scrollTo(t.pageXOffset, n)
        }
    };
    var d = {
        INPUT: !0,
        SELECT: !0
    };
    return r.canPreventDefaultOnPointerDown = function(t) {
        var e = s(t);
        return !e
    }, r.hasDragStarted = function(t) {
        return Math.abs(t.x) > this.options.dragThreshold
    }, r.pointerUp = function(t, e) {
        delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e)
    }, r.pointerDone = function() {
        t.removeEventListener("scroll", this), delete this.pointerDownScroll
    }, r.dragStart = function(e, i) {
        this.dragStartPosition = this.x, this.startAnimation(), t.removeEventListener("scroll", this), this.dispatchEvent("dragStart", e, [i])
    }, r.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i)
    }, r.dragMove = function(t, e, i) {
        t.preventDefault(), this.previousDragX = this.dragX;
        var n = this.options.rightToLeft ? -1 : 1,
            s = this.dragStartPosition + i.x * n;
        if (!this.options.wrapAround && this.slides.length) {
            var o = Math.max(-this.slides[0].target, this.dragStartPosition);
            s = s > o ? .5 * (s + o) : s;
            var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
            s = s < r ? .5 * (s + r) : s
        }
        this.dragX = s, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", t, [e, i])
    }, r.dragEnd = function(t, e) {
        this.options.freeScroll && (this.isFreeScrolling = !0);
        var i = this.dragEndRestingSelect();
        if (this.options.freeScroll && !this.options.wrapAround) {
            var n = this.getRestingPosition();
            this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
        } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
        delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e])
    }, r.dragEndRestingSelect = function() {
        var t = this.getRestingPosition(),
            e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
            i = this._getClosestResting(t, e, 1),
            n = this._getClosestResting(t, e, -1),
            s = i.distance < n.distance ? i.index : n.index;
        return s
    }, r._getClosestResting = function(t, e, i) {
        for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function(t, e) {
                return t <= e
            } : function(t, e) {
                return t < e
            }; o(e, s) && (n += i, s = e, e = this.getSlideDistance(-t, n), null !== e);) e = Math.abs(e);
        return {
            distance: s,
            index: n - i
        }
    }, r.getSlideDistance = function(t, e) {
        var i = this.slides.length,
            s = this.options.wrapAround && i > 1,
            o = s ? n.modulo(e, i) : e,
            r = this.slides[o];
        if (!r) return null;
        var a = s ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (r.target + a)
    }, r.dragEndBoostSelect = function() {
        if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
            e = this.previousDragX - this.dragX;
        return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0
    }, r.staticClick = function(t, e) {
        var i = this.getParentCell(t.target),
            n = i && i.element,
            s = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, s])
    }, r.onscroll = function() {
        var t = o(),
            e = this.pointerDownScroll.x - t.x,
            i = this.pointerDownScroll.y - t.y;
        (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone()
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.TapListener = e(t, t.Unipointer)
}(window, function(t, e) {
    function i(t) {
        this.bindTap(t)
    }
    var n = i.prototype = Object.create(e.prototype);
    return n.bindTap = function(t) {
        t && (this.unbindTap(), this.tapElement = t, this._bindStartEvent(t, !0))
    }, n.unbindTap = function() {
        this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
    }, n.pointerUp = function(i, n) {
        if (!this.isIgnoringMouseUp || "mouseup" != i.type) {
            var s = e.getPointerPoint(n),
                o = this.tapElement.getBoundingClientRect(),
                r = t.pageXOffset,
                a = t.pageYOffset,
                h = s.x >= o.left + r && s.x <= o.right + r && s.y >= o.top + a && s.y <= o.bottom + a;
            if (h && this.emitEvent("tap", [i, n]), "mouseup" != i.type) {
                this.isIgnoringMouseUp = !0;
                var l = this;
                setTimeout(function() {
                    delete l.isIgnoringMouseUp
                }, 400)
            }
        }
    }, n.destroy = function() {
        this.pointerDone(), this.unbindTap()
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    "use strict";

    function s(t, e) {
        this.direction = t, this.parent = e, this._create()
    }

    function o(t) {
        return "string" == typeof t ? t : "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
    }
    var r = "http://www.w3.org/2000/svg";
    s.prototype = new i, s.prototype._create = function() {
        this.isEnabled = !0, this.isPrevious = this.direction == -1;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = this.element = document.createElement("button");
        e.className = "flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "previous" : "next");
        var i = this.createSVG();
        e.appendChild(i), this.on("tap", this.onTap), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, s.prototype.activate = function() {
        this.bindTap(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
    }, s.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element), i.prototype.destroy.call(this), this.element.removeEventListener("click", this)
    }, s.prototype.createSVG = function() {
        var t = document.createElementNS(r, "svg");
        t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(r, "path"),
            i = o(this.parent.options.arrowShape);
        return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t
    }, s.prototype.onTap = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var t = this.isPrevious ? "previous" : "next";
            this.parent[t]()
        }
    }, s.prototype.handleEvent = n.handleEvent, s.prototype.onclick = function() {
        var t = document.activeElement;
        t && t == this.element && this.onTap()
    }, s.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
    }, s.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
    }, s.prototype.update = function() {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && t.length > 1) return void this.enable();
        var e = t.length ? t.length - 1 : 0,
            i = this.isPrevious ? 0 : e,
            n = this.parent.selectedIndex == i ? "disable" : "enable";
        this[n]()
    }, s.prototype.destroy = function() {
        this.deactivate()
    }, n.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }), e.createMethods.push("_createPrevNextButtons");
    var a = e.prototype;
    return a._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new s((-1), this), this.nextButton = new s(1, this), this.on("activate", this.activatePrevNextButtons))
    }, a.activatePrevNextButtons = function() {
        this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
    }, a.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
    }, e.PrevNextButton = s, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, s) {
        return e(t, i, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function s(t) {
        this.parent = t, this._create()
    }
    s.prototype = new i, s.prototype._create = function() {
        this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.on("tap", this.onTap), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, s.prototype.activate = function() {
        this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
    }, s.prototype.deactivate = function() {
        this.parent.element.removeChild(this.holder), i.prototype.destroy.call(this)
    }, s.prototype.setDots = function() {
        var t = this.parent.slides.length - this.dots.length;
        t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t)
    }, s.prototype.addDots = function(t) {
        for (var e = document.createDocumentFragment(), i = []; t;) {
            var n = document.createElement("li");
            n.className = "dot", e.appendChild(n), i.push(n), t--
        }
        this.holder.appendChild(e), this.dots = this.dots.concat(i)
    }, s.prototype.removeDots = function(t) {
        var e = this.dots.splice(this.dots.length - t, t);
        e.forEach(function(t) {
            this.holder.removeChild(t)
        }, this)
    }, s.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot"), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected")
    }, s.prototype.onTap = function(t) {
        var e = t.target;
        if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i)
        }
    }, s.prototype.destroy = function() {
        this.deactivate()
    }, e.PageDots = s, n.extend(e.defaults, {
        pageDots: !0
    }), e.createMethods.push("_createPageDots");
    var o = e.prototype;
    return o._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new s(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
    }, o.activatePageDots = function() {
        this.pageDots.activate()
    }, o.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }, o.updatePageDots = function() {
        this.pageDots.setDots()
    }, o.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }, e.PageDots = s, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(t, i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
}(window, function(t, e, i) {
    function n(t) {
        this.parent = t, this.state = "stopped", o && (this.onVisibilityChange = function() {
            this.visibilityChange()
        }.bind(this), this.onVisibilityPlay = function() {
            this.visibilityPlay()
        }.bind(this))
    }
    var s, o;
    "hidden" in document ? (s = "hidden", o = "visibilitychange") : "webkitHidden" in document && (s = "webkitHidden", o = "webkitvisibilitychange"), n.prototype = Object.create(t.prototype), n.prototype.play = function() {
        if ("playing" != this.state) {
            var t = document[s];
            if (o && t) return void document.addEventListener(o, this.onVisibilityPlay);
            this.state = "playing", o && document.addEventListener(o, this.onVisibilityChange), this.tick()
        }
    }, n.prototype.tick = function() {
        if ("playing" == this.state) {
            var t = this.parent.options.autoPlay;
            t = "number" == typeof t ? t : 3e3;
            var e = this;
            this.clear(), this.timeout = setTimeout(function() {
                e.parent.next(!0), e.tick()
            }, t)
        }
    }, n.prototype.stop = function() {
        this.state = "stopped", this.clear(), o && document.removeEventListener(o, this.onVisibilityChange)
    }, n.prototype.clear = function() {
        clearTimeout(this.timeout)
    }, n.prototype.pause = function() {
        "playing" == this.state && (this.state = "paused", this.clear())
    }, n.prototype.unpause = function() {
        "paused" == this.state && this.play()
    }, n.prototype.visibilityChange = function() {
        var t = document[s];
        this[t ? "pause" : "unpause"]()
    }, n.prototype.visibilityPlay = function() {
        this.play(), document.removeEventListener(o, this.onVisibilityPlay)
    }, e.extend(i.defaults, {
        pauseAutoPlayOnHover: !0
    }), i.createMethods.push("_createPlayer");
    var r = i.prototype;
    return r._createPlayer = function() {
        this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
    }, r.activatePlayer = function() {
        this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
    }, r.playPlayer = function() {
        this.player.play()
    }, r.stopPlayer = function() {
        this.player.stop()
    }, r.pausePlayer = function() {
        this.player.pause()
    }, r.unpausePlayer = function() {
        this.player.unpause()
    }, r.deactivatePlayer = function() {
        this.player.stop(), this.element.removeEventListener("mouseenter", this)
    }, r.onmouseenter = function() {
        this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
    }, r.onmouseleave = function() {
        this.player.unpause(), this.element.removeEventListener("mouseleave", this)
    }, i.Player = n, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function(t, e, i) {
    function n(t) {
        var e = document.createDocumentFragment();
        return t.forEach(function(t) {
            e.appendChild(t.element)
        }), e
    }
    var s = e.prototype;
    return s.insert = function(t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
            var s = this.cells.length;
            e = void 0 === e ? s : e;
            var o = n(i),
                r = e == s;
            if (r) this.slider.appendChild(o);
            else {
                var a = this.cells[e].element;
                this.slider.insertBefore(o, a)
            }
            if (0 === e) this.cells = i.concat(this.cells);
            else if (r) this.cells = this.cells.concat(i);
            else {
                var h = this.cells.splice(e, s - e);
                this.cells = this.cells.concat(i).concat(h)
            }
            this._sizeCells(i);
            var l = e > this.selectedIndex ? 0 : i.length;
            this._cellAddedRemoved(e, l)
        }
    }, s.append = function(t) {
        this.insert(t, this.cells.length)
    }, s.prepend = function(t) {
        this.insert(t, 0)
    }, s.remove = function(t) {
        var e, n, s = this.getCells(t),
            o = 0,
            r = s.length;
        for (e = 0; e < r; e++) {
            n = s[e];
            var a = this.cells.indexOf(n) < this.selectedIndex;
            o -= a ? 1 : 0
        }
        for (e = 0; e < r; e++) n = s[e], n.remove(), i.removeFrom(this.cells, n);
        s.length && this._cellAddedRemoved(0, o)
    }, s._cellAddedRemoved = function(t, e) {
        e = e || 0, this.selectedIndex += e, this.selectedIndex = Math.max(0, Math.min(this.slides.length - 1, this.selectedIndex)), this.cellChange(t, !0), this.emitEvent("cellAddedRemoved", [t, e])
    }, s.cellSizeChange = function(t) {
        var e = this.getCell(t);
        if (e) {
            e.getSize();
            var i = this.cells.indexOf(e);
            this.cellChange(i)
        }
    }, s.cellChange = function(t, e) {
        var i = this.slideableWidth;
        if (this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("cellChange", [t]), this.options.freeScroll) {
            var n = i - this.slideableWidth;
            this.x += n * this.cellAlign, this.positionSlider()
        } else e && this.positionSliderAtSelected(), this.select(this.selectedIndex)
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function(t, e, i) {
    "use strict";

    function n(t) {
        if ("IMG" == t.nodeName && t.getAttribute("data-flickity-lazyload")) return [t];
        var e = t.querySelectorAll("img[data-flickity-lazyload]");
        return i.makeArray(e)
    }

    function s(t, e) {
        this.img = t, this.flickity = e, this.load()
    }
    e.createMethods.push("_createLazyload");
    var o = e.prototype;
    return o._createLazyload = function() {
        this.on("select", this.lazyLoad)
    }, o.lazyLoad = function() {
        var t = this.options.lazyLoad;
        if (t) {
            var e = "number" == typeof t ? t : 0,
                i = this.getAdjacentCellElements(e),
                o = [];
            i.forEach(function(t) {
                var e = n(t);
                o = o.concat(e)
            }), o.forEach(function(t) {
                new s(t, this)
            }, this)
        }
    }, s.prototype.handleEvent = i.handleEvent, s.prototype.load = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.img.getAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload")
    }, s.prototype.onload = function(t) {
        this.complete(t, "flickity-lazyloaded")
    }, s.prototype.onerror = function(t) {
        this.complete(t, "flickity-lazyerror")
    }, s.prototype.complete = function(t, e) {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img),
            n = i && i.element;
        this.flickity.cellSizeChange(n), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, n)
    }, e.LazyLoader = s, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function(t) {
    return t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
}(window, function(t, e) {
    function i(t, e, i) {
        return (e - t) * i + t
    }
    t.createMethods.push("_createAsNavFor");
    var n = t.prototype;
    return n._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
            var e = this;
            setTimeout(function() {
                e.setNavCompanion(t)
            })
        }
    }, n.setNavCompanion = function(i) {
        i = e.getQueryElement(i);
        var n = t.data(i);
        if (n && n != this) {
            this.navCompanion = n;
            var s = this;
            this.onNavCompanionSelect = function() {
                s.navCompanionSelect()
            }, n.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
        }
    }, n.navCompanionSelect = function(t) {
        if (this.navCompanion) {
            var e = this.navCompanion.selectedCells[0],
                n = this.navCompanion.cells.indexOf(e),
                s = n + this.navCompanion.selectedCells.length - 1,
                o = Math.floor(i(n, s, this.navCompanion.cellAlign));
            if (this.selectCell(o, !1, t), this.removeNavSelectedElements(), !(o >= this.cells.length)) {
                var r = this.cells.slice(n, s + 1);
                this.navSelectedElements = r.map(function(t) {
                    return t.element
                }), this.changeNavSelectedClass("add")
            }
        }
    }, n.changeNavSelectedClass = function(t) {
        this.navSelectedElements.forEach(function(e) {
            e.classList[t]("is-nav-selected")
        })
    }, n.activateAsNavFor = function() {
        this.navCompanionSelect(!0)
    }, n.removeNavSelectedElements = function() {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
    }, n.onNavStaticClick = function(t, e, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n)
    }, n.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    }, n.destroyAsNavFor = function() {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function n(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if ("number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }

    function s(t, e, o) {
        return this instanceof s ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? o = e : i(this.options, e), o && this.on("always", o), this.getImages(), a && (this.jqDeferred = new a.Deferred), void setTimeout(function() {
            this.check()
        }.bind(this))) : new s(t, e, o)
    }

    function o(t) {
        this.img = t
    }

    function r(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var a = t.jQuery,
        h = t.console;
    s.prototype = Object.create(e.prototype), s.prototype.options = {}, s.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, s.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && l[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var s = i[n];
                this.addImage(s)
            }
            if ("string" == typeof this.options.background) {
                var o = t.querySelectorAll(this.options.background);
                for (n = 0; n < o.length; n++) {
                    var r = o[n];
                    this.addElementBackgroundImages(r)
                }
            }
        }
    };
    var l = {
        1: !0,
        9: !0,
        11: !0
    };
    return s.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var s = n && n[2];
                s && this.addBackground(s, t), n = i.exec(e.backgroundImage)
            }
    }, s.prototype.addImage = function(t) {
        var e = new o(t);
        this.images.push(e)
    }, s.prototype.addBackground = function(t, e) {
        var i = new r(t, e);
        this.images.push(i)
    }, s.prototype.check = function() {
        function t(t, i, n) {
            setTimeout(function() {
                e.progress(t, i, n)
            })
        }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
            e.once("progress", t), e.check()
        }) : void this.complete()
    }, s.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && h && h.log("progress: " + i, t, e)
    }, s.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, o.prototype = Object.create(e.prototype), o.prototype.check = function() {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, o.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, o.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, o.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, o.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, o.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, o.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype = Object.create(o.prototype), r.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, r.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, r.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, s.makeJQueryPlugin = function(e) {
        e = e || t.jQuery, e && (a = e, a.fn.imagesLoaded = function(t, e) {
            var i = new s(this, t, e);
            return i.jqDeferred.promise(a(this))
        })
    }, s.makeJQueryPlugin(), s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("flickity"), require("imagesloaded")) : t.Flickity = e(t, t.Flickity, t.imagesLoaded)
}(window, function(t, e, i) {
    "use strict";
    e.createMethods.push("_createImagesLoaded");
    var n = e.prototype;
    return n._createImagesLoaded = function() {
        this.on("activate", this.imagesLoaded)
    }, n.imagesLoaded = function() {
        function t(t, i) {
            var n = e.getParentCell(i.img);
            e.cellSizeChange(n && n.element), e.options.freeScroll || e.positionSliderAtSelected()
        }
        if (this.options.imagesLoaded) {
            var e = this;
            i(this.slider).on("progress", t)
        }
    }, e
});
jQuery(function($) {
    AboutModuleInitialize_Layout2_4_14();
});

function AboutModuleInitialize_Layout2_4_14() {
    $(document).on('s123.page.ready', function(event) {
        var $section = $('section.s123-module-about.layout-2,section.s123-module-about.layout-4,section.s123-module-about.layout-14');
        $section.each(function(index) {
            var $sectionThis = $(this);
            var $flickityContainer = $sectionThis.find('.carousel');
            var originalFirstImageSize = {};
            if ($flickityContainer.length === 0) return;
            $flickityContainer.find('.carousel-cell').imagesLoaded({
                background: true
            }, function(imgLoad) {
                var $img = null;
                for (var i = 0; i < imgLoad.images.length; i++) {
                    var $imgParent = $(imgLoad.images[i].element);
                    if ($flickityContainer.find('.carousel-cell').index($imgParent) == 0) {
                        $img = $(imgLoad.images[0].img);
                        break;
                    }
                }
                $img.css({
                    visibility: 'hidden',
                    position: 'absolute',
                    top: 0
                });
                $('body').prepend($img);
                originalFirstImageSize.width = $img.width();
                originalFirstImageSize.height = $img.height();
                $img.remove();
                resizeGalleryImages(originalFirstImageSize, $flickityContainer.width(), $flickityContainer.find('.carousel-cell'));
                $flickityContainer.flickity({
                    imagesLoaded: true,
                    lazyLoad: 2,
                    pageDots: false,
                    wrapAround: true,
                    percentPosition: false
                });
            });
            $(window).on('resize.about_gallery.' + $sectionThis.get(0).id, function(event) {
                setTimeout(function() {
                    resizeGalleryImages(originalFirstImageSize, $flickityContainer.width(), $flickityContainer.find('.carousel-cell'));
                    $flickityContainer.flickity('resize');
                }, 500);
            });
        });
    });

    function resizeGalleryImages(originalImageSize, containerWidth, $galleryItems) {
        if (originalImageSize.width > originalImageSize.height) {
            var ratio = originalImageSize.width / originalImageSize.height;
        } else {
            var ratio = originalImageSize.height / originalImageSize.width;
        }
        $galleryItems.css({
            width: containerWidth,
            height: containerWidth / ratio
        });
    }
}
jQuery(function($) {
    AboutModuleInitialize_Layout9();
});

function AboutModuleInitialize_Layout9() {
    $(document).on('s123.page.ready', function(event) {
        var $section = $('section.s123-module-about.layout-9');
        $section.each(function(index) {
            var $sectionThis = $(this);
            var $flickityContainer = $sectionThis.find('.carousel');
            var originalFirstImageSize = {};
            if ($flickityContainer.length === 0) return;
            $flickityContainer.flickity({
                imagesLoaded: true,
                lazyLoad: 2,
                pageDots: false,
                wrapAround: true,
                percentPosition: false
            });
        });
    });
}
jQuery(function($) {
    aboutModuleInitialize_Layout10();
});

function aboutModuleInitialize_Layout10() {
    $(document).on("s123.page.ready", function(event) {
        var $sections = $('section.s123-module-about.layout-10,section.s123-module-about.layout-15,section.s123-module-about.layout-17,section.s123-module-about.layout-19,section.s123-module-about.layout-21,section.s123-module-about.layout-23');
        $sections.each(function(index) {
            var $s = $(this);
            var $carousel = $s.find('[data-ride="carousel"]');
            $carousel.carousel({
                interval: 5000
            });
        });
    });
}
jQuery(function($) {
    ContactModuleInitialize();
});

function ContactModuleInitialize() {
    $(document).on('s123.page.ready', function(event) {
        var $section = $('section.s123-module-contact');
        $section.each(function(index) {
            var $sectionThis = $(this);
            if (false) {
                buisnessHoursTemplate.init({
                    $buisnessHourContainer: $sectionThis.find('#businessWorkingDays'),
                    buisnessHourJSON: $sectionThis.find("#businessHours")
                });
            }
            $sectionThis.find('.contactUsForm').each(function(index) {
                var $form = $(this);
                var customFormMultiSteps = new CustomFormMultiSteps();
                customFormMultiSteps.init({
                    $form: $form,
                    $nextButton: $form.find('.next-form-btn'),
                    $submitButton: $form.find('.submit-form-btn'),
                    $previousButton: $form.find('.previous-form-btn'),
                    totalSteps: $form.find('.custom-form-steps').data('total-steps')
                });
                var forms_GoogleRecaptcha = new Forms_GoogleRecaptcha();
                forms_GoogleRecaptcha.init($form);
                $form.validate({
                    errorElement: 'div',
                    errorClass: 'help-block',
                    focusInvalid: true,
                    ignore: ':hidden:not(.custom-form-step:visible input[name^="datePicker-"])',
                    highlight: function(e) {
                        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
                    },
                    success: function(e) {
                        $(e).closest('.form-group').removeClass('has-error');
                        $(e).remove();
                    },
                    errorPlacement: function(error, element) {
                        if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
                            var controls = element.closest('div[class*="col-"]');
                            if (controls.find(':checkbox,:radio').length > 0) element.closest('.form-group').append(error);
                            else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                        } else if (element.is('.select2')) {
                            error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
                        } else if (element.is('.chosen-select')) {
                            error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
                        } else {
                            error.appendTo(element.closest('.form-group'));
                        }
                    },
                    submitHandler: function(form) {
                        var $form = $(form);
                        var clickAction = $form.data('click-action');
                        $form.append($('<div class="conv-code-container"></div>'));
                        var $convCodeContainer = $form.find('.conv-code-container');
                        var thankYouMessage = translations.ThankYouAfterSubmmit;
                        if ($form.data('thanks-msg')) {
                            thankYouMessage = $form.data('thanks-msg');
                        }
                        $form.find('button:submit').prop('disabled', true);
                        S123.ButtonLoading.start($form.find('button:submit'));
                        var url = "/versions/" + $('#versionNUM').val() + "/include/contactO.php";
                        if ($form.hasClass('custom-form') || $form.hasClass('horizontal-custom-form')) {
                            if (!CustomForm_IsLastStep($form)) {
                                $form.find('.next-form-btn:visible').trigger('click');
                                S123.ButtonLoading.stop($form.find('button:submit'));
                                $form.find('button:submit').prop('disabled', false);
                                return false;
                            }
                            if (!CustomForm_IsFillOutAtLeastOneField($form)) {
                                bootbox.alert(translations.fillOutAtLeastOneField);
                                S123.ButtonLoading.stop($form.find('button:submit'));
                                $form.find('button:submit').prop('disabled', false);
                                return false;
                            }
                            url = "/versions/" + $('#versionNUM').val() + "/include/customFormO.php";
                        }
                        if (forms_GoogleRecaptcha.isActive && !forms_GoogleRecaptcha.isGotToken) {
                            forms_GoogleRecaptcha.getToken();
                            return false;
                        }
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: $form.serialize(),
                            success: function(data) {
                                var dataObj = jQuery.parseJSON(data);
                                $form.trigger("reset");
                                if (clickAction == 'thankYouMessage' || clickAction == '') {
                                    bootbox.alert({
                                        title: translations.sent,
                                        message: thankYouMessage + '<iframe src="/versions/' + $('#versionNUM').val() + '/include/contactSentO.php?w=' + $('#w').val() + '&websiteID=' + dataObj.websiteID + '&moduleID=' + dataObj.moduleID + '" style="width:100%;height:30px;" frameborder="0"></iframe>',
                                        className: 'contactUsConfirm',
                                        buttons: {
                                            ok: {
                                                label: translations.Ok
                                            }
                                        },
                                        backdrop: true
                                    });
                                } else {
                                    if (dataObj.conv_code.length > 0) {
                                        var $convCode = $('<div>' + dataObj.conv_code + '</div>');
                                        $convCodeContainer.html($convCode.text());
                                    }
                                    if (top.$('#websitePreviewIframe').length) {
                                        bootbox.alert({
                                            title: translations.previewExternalLinkTitle,
                                            message: translations.previewExternalLinkMsg.replace('{{externalLink}}', '<b>' + dataObj.action.url + '</b>'),
                                            className: 'externalAlert'
                                        });
                                    } else {
                                        window.open(dataObj.action.url, '_self');
                                    }
                                }
                                customFormMultiSteps.reset();
                                forms_GoogleRecaptcha.reset();
                                S123.ButtonLoading.stop($form.find('button:submit'));
                                $form.find('button:submit').prop('disabled', false);
                                WizardNotificationUpdate();
                            }
                        });
                        return false;
                    }
                });
                $form.find('.f-b-date-timePicker').each(function() {
                    var $option = $(this);
                    var $datePicker = $option.find('.fake-input.date-time-picker');
                    var $hiddenInput = $option.find('[data-id="' + $datePicker.data('related-id') + '"]');
                    var $datePickerIcon = $option.find('.f-b-date-timePicker-icon');
                    var formBuilderCalendar = new calendar_handler();
                    $datePicker.data('date-format', $form.data('date-format'));
                    formBuilderCalendar.init({
                        $fakeInput: $datePicker,
                        $hiddenInput: $hiddenInput,
                        $fakeInputIcon: $datePickerIcon,
                        type: 'datePicker',
                        title: translations.chooseDate,
                        calendarSettings: {
                            format: $datePicker.data('date-format'),
                            weekStart: 0,
                            todayBtn: "linked",
                            clearBtn: false,
                            language: languageCode,
                            todayHighlight: true
                        },
                        onSubmit: function(selectedDate) {
                            $datePicker.html(selectedDate);
                            $hiddenInput.val(selectedDate);
                        }
                    });
                });
                CustomForm_DisableTwoColumns($form);
            });
        });
    });
}

function ModuleLayoutCategories(settings) {
    var MC = this;
    MC.addClickEvent = function() {
        MC.$categories.off('click').on('click', function(event, initialize) {
            var $category = $(this);
            MC.$categories.removeClass('active');
            $category.addClass('active');
            $category.closest('section').trigger('module_layout_categories.click', [$category.data('categories-filter')]);
            var $filtered = MC.$items.filter('[data-categories-filter=' + $category.data('categories-filter') + ']');
            if (initialize) {
                MC.$items.hide();
                $filtered.show();
                $category.closest('section').trigger('module_layout_categories.shown', [$category.data('categories-filter')]);
                $category.closest('section').trigger('module_layout_categories.show', [$category.data('categories-filter')]);
            } else {
                MC.$items.fadeOut(200).promise().done(function() {
                    $filtered.fadeIn(200, function() {
                        $category.closest('section').trigger('module_layout_categories.shown', [$category.data('categories-filter')]);
                    });
                    $category.closest('section').trigger('module_layout_categories.show', [$category.data('categories-filter')]);
                    $(window).trigger('scroll');
                });
            }
            return false;
        });
    }
    MC.addFilterButton = function() {
        MC.$filterButton.off('click').on('click', function() {
            var $category = $(this);
            MC.$categoriesContainer.slideToggle('slow');
            $category.toggleClass('active');
            return false;
        });
    }
    if (settings.length === 0) return;
    MC.$categories = settings.$categories;
    MC.$items = settings.$items;
    MC.$filterButton = settings.$filterButton;
    MC.$categoriesContainer = settings.$categoriesContainer;
    MC.addClickEvent();
    MC.$categories.first().trigger('click', true);
    if (MC.$filterButton) MC.addFilterButton();
};
jQuery(function($) {
    TimelineModuleInitialize();
});

function TimelineModuleInitialize() {
    $(document).on('s123.page.ready', function(event) {
        var timelineBlocks = $('.cd-timeline-block'),
            offset = 0.8;
        if (timelineBlocks.length == 0) return;
        hideBlocks(timelineBlocks, offset);
        $(window).off('scroll.timelineAnimate').on('scroll.timelineAnimate', function() {
            (!window.requestAnimationFrame) ?
            setTimeout(function() {
                showBlocks(timelineBlocks, offset);
            }, 100): window.requestAnimationFrame(function() {
                showBlocks(timelineBlocks, offset);
            });
        });

        function hideBlocks(blocks, offset) {
            blocks.each(function() {
                ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
            });
        }

        function showBlocks(blocks, offset) {
            blocks.each(function() {
                ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            });
        }
        var $section = $('section.s123-module-timeline');
        $section.each(function(index) {
            var $sectionThis = $(this);
            var categories = new ModuleLayoutCategories({
                $items: $sectionThis.find('.timeline-category'),
                $categoriesContainer: $sectionThis.find('.categories-panel'),
                $filterButton: $sectionThis.find('.items-responsive-filter'),
                $categories: $sectionThis.find('.items-categories-container li')
            });
            categories.$categories.on('click', function() {
                $sectionThis.find('.cd-timeline-block').find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden').removeClass('bounce-in');
                hideBlocks(timelineBlocks, offset);
            });
        });
    });
}
var Base = function() {};
Base.extend = function(a, b) {
    "use strict";
    var c = Base.prototype.extend;
    Base._prototyping = !0;
    var d = new this;
    c.call(d, a), d.base = function() {}, delete Base._prototyping;
    var e = d.constructor,
        f = d.constructor = function() {
            if (!Base._prototyping)
                if (this._constructing || this.constructor == f) this._constructing = !0, e.apply(this, arguments), delete this._constructing;
                else if (null !== arguments[0]) return (arguments[0].extend || c).call(arguments[0], d)
        };
    return f.ancestor = this, f.extend = this.extend, f.forEach = this.forEach, f.implement = this.implement, f.prototype = d, f.toString = this.toString, f.valueOf = function(a) {
        return "object" == a ? f : e.valueOf()
    }, c.call(f, b), "function" == typeof f.init && f.init(), f
}, Base.prototype = {
    extend: function(a, b) {
        if (arguments.length > 1) {
            var c = this[a];
            if (c && "function" == typeof b && (!c.valueOf || c.valueOf() != b.valueOf()) && /\bbase\b/.test(b)) {
                var d = b.valueOf();
                b = function() {
                    var a = this.base || Base.prototype.base;
                    this.base = c;
                    var b = d.apply(this, arguments);
                    return this.base = a, b
                }, b.valueOf = function(a) {
                    return "object" == a ? b : d
                }, b.toString = Base.toString
            }
            this[a] = b
        } else if (a) {
            var e = Base.prototype.extend;
            Base._prototyping || "function" == typeof this || (e = this.extend || e);
            for (var f = {
                    toSource: null
                }, g = ["constructor", "toString", "valueOf"], h = Base._prototyping ? 0 : 1; i = g[h++];) a[i] != f[i] && e.call(this, i, a[i]);
            for (var i in a) f[i] || e.call(this, i, a[i])
        }
        return this
    }
}, Base = Base.extend({
    constructor: function() {
        this.extend(arguments[0])
    }
}, {
    ancestor: Object,
    version: "1.1",
    forEach: function(a, b, c) {
        for (var d in a) void 0 === this.prototype[d] && b.call(c, a[d], d, a)
    },
    implement: function() {
        for (var a = 0; a < arguments.length; a++) "function" == typeof arguments[a] ? arguments[a](this.prototype) : this.prototype.extend(arguments[a]);
        return this
    },
    toString: function() {
        return String(this.valueOf())
    }
});
var FlipClock;
! function(a) {
    "use strict";
    FlipClock = function(a, b, c) {
        return b instanceof Object && b instanceof Date == !1 && (c = b, b = 0), new FlipClock.Factory(a, b, c)
    }, FlipClock.Lang = {}, FlipClock.Base = Base.extend({
        buildDate: "2014-12-12",
        version: "0.7.7",
        constructor: function(b, c) {
            "object" != typeof b && (b = {}), "object" != typeof c && (c = {}), this.setOptions(a.extend(!0, {}, b, c))
        },
        callback: function(a) {
            if ("function" == typeof a) {
                for (var b = [], c = 1; c <= arguments.length; c++) arguments[c] && b.push(arguments[c]);
                a.apply(this, b)
            }
        },
        log: function(a) {
            window.console && console.log && console.log(a)
        },
        getOption: function(a) {
            return this[a] ? this[a] : !1
        },
        getOptions: function() {
            return this
        },
        setOption: function(a, b) {
            this[a] = b
        },
        setOptions: function(a) {
            for (var b in a) "undefined" != typeof a[b] && this.setOption(b, a[b])
        }
    })
}(jQuery),
function(a) {
    "use strict";
    FlipClock.Face = FlipClock.Base.extend({
        autoStart: !0,
        dividers: [],
        factory: !1,
        lists: [],
        constructor: function(a, b) {
            this.dividers = [], this.lists = [], this.base(b), this.factory = a
        },
        build: function() {
            this.autoStart && this.start()
        },
        createDivider: function(b, c, d) {
            "boolean" != typeof c && c || (d = c, c = b);
            var e = ['<span class="' + this.factory.classes.dot + ' top"></span>', '<span class="' + this.factory.classes.dot + ' bottom"></span>'].join("");
            d && (e = ""), b = this.factory.localize(b);
            var f = ['<span class="' + this.factory.classes.divider + " " + (c ? c : "").toLowerCase() + '">', '<span class="' + this.factory.classes.label + '">' + (b ? b : "") + "</span>", e, "</span>"],
                g = a(f.join(""));
            return this.dividers.push(g), g
        },
        createList: function(a, b) {
            "object" == typeof a && (b = a, a = 0);
            var c = new FlipClock.List(this.factory, a, b);
            return this.lists.push(c), c
        },
        reset: function() {
            this.factory.time = new FlipClock.Time(this.factory, this.factory.original ? Math.round(this.factory.original) : 0, {
                minimumDigits: this.factory.minimumDigits
            }), this.flip(this.factory.original, !1)
        },
        appendDigitToClock: function(a) {
            a.$el.append(!1)
        },
        addDigit: function(a) {
            var b = this.createList(a, {
                classes: {
                    active: this.factory.classes.active,
                    before: this.factory.classes.before,
                    flip: this.factory.classes.flip
                }
            });
            this.appendDigitToClock(b)
        },
        start: function() {},
        stop: function() {},
        autoIncrement: function() {
            this.factory.countdown ? this.decrement() : this.increment()
        },
        increment: function() {
            this.factory.time.addSecond()
        },
        decrement: function() {
            0 == this.factory.time.getTimeSeconds() ? this.factory.stop() : this.factory.time.subSecond()
        },
        flip: function(b, c) {
            var d = this;
            a.each(b, function(a, b) {
                var e = d.lists[a];
                e ? (c || b == e.digit || e.play(), e.select(b)) : d.addDigit(b)
            })
        }
    })
}(jQuery),
function(a) {
    "use strict";
    FlipClock.Factory = FlipClock.Base.extend({
        animationRate: 1e3,
        autoStart: !0,
        callbacks: {
            destroy: !1,
            create: !1,
            init: !1,
            interval: !1,
            start: !1,
            stop: !1,
            reset: !1
        },
        classes: {
            active: "flip-clock-active",
            before: "flip-clock-before",
            divider: "flip-clock-divider",
            dot: "flip-clock-dot",
            label: "flip-clock-label",
            flip: "flip",
            play: "play",
            wrapper: "flip-clock-wrapper"
        },
        clockFace: "HourlyCounter",
        countdown: !1,
        defaultClockFace: "HourlyCounter",
        defaultLanguage: "english",
        $el: !1,
        face: !0,
        lang: !1,
        language: "english",
        minimumDigits: 0,
        original: !1,
        running: !1,
        time: !1,
        timer: !1,
        $wrapper: !1,
        constructor: function(b, c, d) {
            d || (d = {}), this.lists = [], this.running = !1, this.base(d), this.$el = a(b).addClass(this.classes.wrapper), this.$wrapper = this.$el, this.original = c instanceof Date ? c : c ? Math.round(c) : 0, this.time = new FlipClock.Time(this, this.original, {
                minimumDigits: this.minimumDigits,
                animationRate: this.animationRate
            }), this.timer = new FlipClock.Timer(this, d), this.loadLanguage(this.language), this.loadClockFace(this.clockFace, d), this.autoStart && this.start()
        },
        loadClockFace: function(a, b) {
            var c, d = "Face",
                e = !1;
            return a = a.ucfirst() + d, this.face.stop && (this.stop(), e = !0), this.$el.html(""), this.time.minimumDigits = this.minimumDigits, c = FlipClock[a] ? new FlipClock[a](this, b) : new FlipClock[this.defaultClockFace + d](this, b), c.build(), this.face = c, e && this.start(), this.face
        },
        loadLanguage: function(a) {
            var b;
            return b = FlipClock.Lang[a.ucfirst()] ? FlipClock.Lang[a.ucfirst()] : FlipClock.Lang[a] ? FlipClock.Lang[a] : FlipClock.Lang[this.defaultLanguage], this.lang = b
        },
        localize: function(a, b) {
            var c = this.lang;
            if (!a) return null;
            var d = a.toLowerCase();
            return "object" == typeof b && (c = b), c && c[d] ? c[d] : a
        },
        start: function(a) {
            var b = this;
            b.running || b.countdown && !(b.countdown && b.time.time > 0) ? b.log("Trying to start timer when countdown already at 0") : (b.face.start(b.time), b.timer.start(function() {
                b.flip(), "function" == typeof a && a()
            }))
        },
        stop: function(a) {
            this.face.stop(), this.timer.stop(a);
            for (var b in this.lists) this.lists.hasOwnProperty(b) && this.lists[b].stop()
        },
        reset: function(a) {
            this.timer.reset(a), this.face.reset()
        },
        setTime: function(a) {
            this.time.time = a, this.flip(!0)
        },
        getTime: function() {
            return this.time
        },
        setCountdown: function(a) {
            var b = this.running;
            this.countdown = a ? !0 : !1, b && (this.stop(), this.start())
        },
        flip: function(a) {
            this.face.flip(!1, a)
        }
    })
}(jQuery),
function(a) {
    "use strict";
    FlipClock.List = FlipClock.Base.extend({
        digit: 0,
        classes: {
            active: "flip-clock-active",
            before: "flip-clock-before",
            flip: "flip"
        },
        factory: !1,
        $el: !1,
        $obj: !1,
        items: [],
        lastDigit: 0,
        constructor: function(a, b) {
            this.factory = a, this.digit = b, this.lastDigit = b, this.$el = this.createList(), this.$obj = this.$el, b > 0 && this.select(b), this.factory.$el.append(this.$el)
        },
        select: function(a) {
            if ("undefined" == typeof a ? a = this.digit : this.digit = a, this.digit != this.lastDigit) {
                var b = this.$el.find("." + this.classes.before).removeClass(this.classes.before);
                this.$el.find("." + this.classes.active).removeClass(this.classes.active).addClass(this.classes.before), this.appendListItem(this.classes.active, this.digit), b.remove(), this.lastDigit = this.digit
            }
        },
        play: function() {
            this.$el.addClass(this.factory.classes.play)
        },
        stop: function() {
            var a = this;
            setTimeout(function() {
                a.$el.removeClass(a.factory.classes.play)
            }, this.factory.timer.interval)
        },
        createListItem: function(a, b) {
            return ['<li class="' + (a ? a : "") + '">', '<a href="#">', '<div class="up">', '<div class="shadow"></div>', '<div class="inn">' + (b ? b : "") + "</div>", "</div>", '<div class="down">', '<div class="shadow"></div>', '<div class="inn">' + (b ? b : "") + "</div>", "</div>", "</a>", "</li>"].join("")
        },
        appendListItem: function(a, b) {
            var c = this.createListItem(a, b);
            this.$el.append(c)
        },
        createList: function() {
            var b = this.getPrevDigit() ? this.getPrevDigit() : this.digit,
                c = a(['<ul class="' + this.classes.flip + " " + (this.factory.running ? this.factory.classes.play : "") + '">', this.createListItem(this.classes.before, b), this.createListItem(this.classes.active, this.digit), "</ul>"].join(""));
            return c
        },
        getNextDigit: function() {
            return 9 == this.digit ? 0 : this.digit + 1
        },
        getPrevDigit: function() {
            return 0 == this.digit ? 9 : this.digit - 1
        }
    })
}(jQuery),
function(a) {
    "use strict";
    String.prototype.ucfirst = function() {
        return this.substr(0, 1).toUpperCase() + this.substr(1)
    }, a.fn.FlipClock = function(b, c) {
        return new FlipClock(a(this), b, c)
    }, a.fn.flipClock = function(b, c) {
        return a.fn.FlipClock(b, c)
    }
}(jQuery),
function(a) {
    "use strict";
    FlipClock.Time = FlipClock.Base.extend({
        time: 0,
        factory: !1,
        minimumDigits: 0,
        constructor: function(a, b, c) {
            "object" != typeof c && (c = {}), c.minimumDigits || (c.minimumDigits = a.minimumDigits), this.base(c), this.factory = a, b && (this.time = b)
        },
        convertDigitsToArray: function(a) {
            var b = [];
            a = a.toString();
            for (var c = 0; c < a.length; c++) a[c].match(/^\d*$/g) && b.push(a[c]);
            return b
        },
        digit: function(a) {
            var b = this.toString(),
                c = b.length;
            return b[c - a] ? b[c - a] : !1
        },
        digitize: function(b) {
            var c = [];
            if (a.each(b, function(a, b) {
                    b = b.toString(), 1 == b.length && (b = "0" + b);
                    for (var d = 0; d < b.length; d++) c.push(b.charAt(d))
                }), c.length > this.minimumDigits && (this.minimumDigits = c.length), this.minimumDigits > c.length)
                for (var d = c.length; d < this.minimumDigits; d++) c.unshift("0");
            return c
        },
        getDateObject: function() {
            return this.time instanceof Date ? this.time : new Date((new Date).getTime() + 1e3 * this.getTimeSeconds())
        },
        getDayCounter: function(a) {
            var b = [this.getDays(), this.getHours(!0), this.getMinutes(!0)];
            return a && b.push(this.getSeconds(!0)), this.digitize(b)
        },
        getDays: function(a) {
            var b = this.getTimeSeconds() / 60 / 60 / 24;
            return a && (b %= 7), Math.floor(b)
        },
        getHourCounter: function() {
            var a = this.digitize([this.getHours(), this.getMinutes(!0), this.getSeconds(!0)]);
            return a
        },
        getHourly: function() {
            return this.getHourCounter()
        },
        getHours: function(a) {
            var b = this.getTimeSeconds() / 60 / 60;
            return a && (b %= 24), Math.floor(b)
        },
        getMilitaryTime: function(a, b) {
            "undefined" == typeof b && (b = !0), a || (a = this.getDateObject());
            var c = [a.getHours(), a.getMinutes()];
            return b === !0 && c.push(a.getSeconds()), this.digitize(c)
        },
        getMinutes: function(a) {
            var b = this.getTimeSeconds() / 60;
            return a && (b %= 60), Math.floor(b)
        },
        getMinuteCounter: function() {
            var a = this.digitize([this.getMinutes(), this.getSeconds(!0)]);
            return a
        },
        getTimeSeconds: function(a) {
            return a || (a = new Date), this.time instanceof Date ? this.factory.countdown ? Math.max(this.time.getTime() / 1e3 - a.getTime() / 1e3, 0) : a.getTime() / 1e3 - this.time.getTime() / 1e3 : this.time
        },
        getTime: function(a, b) {
            "undefined" == typeof b && (b = !0), a || (a = this.getDateObject()), console.log(a);
            var c = a.getHours(),
                d = [c > 12 ? c - 12 : 0 === c ? 12 : c, a.getMinutes()];
            return b === !0 && d.push(a.getSeconds()), this.digitize(d)
        },
        getSeconds: function(a) {
            var b = this.getTimeSeconds();
            return a && (60 == b ? b = 0 : b %= 60), Math.ceil(b)
        },
        getWeeks: function(a) {
            var b = this.getTimeSeconds() / 60 / 60 / 24 / 7;
            return a && (b %= 52), Math.floor(b)
        },
        removeLeadingZeros: function(b, c) {
            var d = 0,
                e = [];
            return a.each(c, function(a) {
                b > a ? d += parseInt(c[a], 10) : e.push(c[a])
            }), 0 === d ? e : c
        },
        addSeconds: function(a) {
            this.time instanceof Date ? this.time.setSeconds(this.time.getSeconds() + a) : this.time += a
        },
        addSecond: function() {
            this.addSeconds(1)
        },
        subSeconds: function(a) {
            this.time instanceof Date ? this.time.setSeconds(this.time.getSeconds() - a) : this.time -= a
        },
        subSecond: function() {
            this.subSeconds(1)
        },
        toString: function() {
            return this.getTimeSeconds().toString()
        }
    })
}(jQuery),
function() {
    "use strict";
    FlipClock.Timer = FlipClock.Base.extend({
        callbacks: {
            destroy: !1,
            create: !1,
            init: !1,
            interval: !1,
            start: !1,
            stop: !1,
            reset: !1
        },
        count: 0,
        factory: !1,
        interval: 1e3,
        animationRate: 1e3,
        constructor: function(a, b) {
            this.base(b), this.factory = a, this.callback(this.callbacks.init), this.callback(this.callbacks.create)
        },
        getElapsed: function() {
            return this.count * this.interval
        },
        getElapsedTime: function() {
            return new Date(this.time + this.getElapsed())
        },
        reset: function(a) {
            clearInterval(this.timer), this.count = 0, this._setInterval(a), this.callback(this.callbacks.reset)
        },
        start: function(a) {
            this.factory.running = !0, this._createTimer(a), this.callback(this.callbacks.start)
        },
        stop: function(a) {
            this.factory.running = !1, this._clearInterval(a), this.callback(this.callbacks.stop), this.callback(a)
        },
        _clearInterval: function() {
            clearInterval(this.timer)
        },
        _createTimer: function(a) {
            this._setInterval(a)
        },
        _destroyTimer: function(a) {
            this._clearInterval(), this.timer = !1, this.callback(a), this.callback(this.callbacks.destroy)
        },
        _interval: function(a) {
            this.callback(this.callbacks.interval), this.callback(a), this.count++
        },
        _setInterval: function(a) {
            var b = this;
            b._interval(a), b.timer = setInterval(function() {
                b._interval(a)
            }, this.interval)
        }
    })
}(jQuery),
function(a) {
    FlipClock.TwentyFourHourClockFace = FlipClock.Face.extend({
        constructor: function(a, b) {
            this.base(a, b)
        },
        build: function(b) {
            var c = this,
                d = this.factory.$el.find("ul");
            this.factory.time.time || (this.factory.original = new Date, this.factory.time = new FlipClock.Time(this.factory, this.factory.original));
            var b = b ? b : this.factory.time.getMilitaryTime(!1, this.showSeconds);
            b.length > d.length && a.each(b, function(a, b) {
                c.createList(b)
            }), this.createDivider(), this.createDivider(), a(this.dividers[0]).insertBefore(this.lists[this.lists.length - 2].$el), a(this.dividers[1]).insertBefore(this.lists[this.lists.length - 4].$el), this.base()
        },
        flip: function(a, b) {
            this.autoIncrement(), a = a ? a : this.factory.time.getMilitaryTime(!1, this.showSeconds), this.base(a, b)
        }
    })
}(jQuery),
function(a) {
    FlipClock.CounterFace = FlipClock.Face.extend({
        shouldAutoIncrement: !1,
        constructor: function(a, b) {
            "object" != typeof b && (b = {}), a.autoStart = b.autoStart ? !0 : !1, b.autoStart && (this.shouldAutoIncrement = !0), a.increment = function() {
                a.countdown = !1, a.setTime(a.getTime().getTimeSeconds() + 1)
            }, a.decrement = function() {
                a.countdown = !0;
                var b = a.getTime().getTimeSeconds();
                b > 0 && a.setTime(b - 1)
            }, a.setValue = function(b) {
                a.setTime(b)
            }, a.setCounter = function(b) {
                a.setTime(b)
            }, this.base(a, b)
        },
        build: function() {
            var b = this,
                c = this.factory.$el.find("ul"),
                d = this.factory.getTime().digitize([this.factory.getTime().time]);
            d.length > c.length && a.each(d, function(a, c) {
                var d = b.createList(c);
                d.select(c)
            }), a.each(this.lists, function(a, b) {
                b.play()
            }), this.base()
        },
        flip: function(a, b) {
            this.shouldAutoIncrement && this.autoIncrement(), a || (a = this.factory.getTime().digitize([this.factory.getTime().time])), this.base(a, b)
        },
        reset: function() {
            this.factory.time = new FlipClock.Time(this.factory, this.factory.original ? Math.round(this.factory.original) : 0), this.flip()
        }
    })
}(jQuery),
function(a) {
    FlipClock.DailyCounterFace = FlipClock.Face.extend({
        showSeconds: !0,
        constructor: function(a, b) {
            this.base(a, b)
        },
        build: function(b) {
            var c = this,
                d = this.factory.$el.find("ul"),
                e = 0;
            b = b ? b : this.factory.time.getDayCounter(this.showSeconds), b.length > d.length && a.each(b, function(a, b) {
                c.createList(b)
            }), this.showSeconds ? a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length - 2].$el) : e = 2, a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length - 4 + e].$el), a(this.createDivider("Hours")).insertBefore(this.lists[this.lists.length - 6 + e].$el), a(this.createDivider("Days", !0)).insertBefore(this.lists[0].$el), this.base()
        },
        flip: function(a, b) {
            a || (a = this.factory.time.getDayCounter(this.showSeconds)), this.autoIncrement(), this.base(a, b)
        }
    })
}(jQuery),
function(a) {
    FlipClock.HourlyCounterFace = FlipClock.Face.extend({
        constructor: function(a, b) {
            this.base(a, b)
        },
        build: function(b, c) {
            var d = this,
                e = this.factory.$el.find("ul");
            c = c ? c : this.factory.time.getHourCounter(), c.length > e.length && a.each(c, function(a, b) {
                d.createList(b)
            }), a(this.createDivider("Seconds")).insertBefore(this.lists[this.lists.length - 2].$el), a(this.createDivider("Minutes")).insertBefore(this.lists[this.lists.length - 4].$el), b || a(this.createDivider("Hours", !0)).insertBefore(this.lists[0].$el), this.base()
        },
        flip: function(a, b) {
            a || (a = this.factory.time.getHourCounter()), this.autoIncrement(), this.base(a, b)
        },
        appendDigitToClock: function(a) {
            this.base(a), this.dividers[0].insertAfter(this.dividers[0].next())
        }
    })
}(jQuery),
function() {
    FlipClock.MinuteCounterFace = FlipClock.HourlyCounterFace.extend({
        clearExcessDigits: !1,
        constructor: function(a, b) {
            this.base(a, b)
        },
        build: function() {
            this.base(!0, this.factory.time.getMinuteCounter())
        },
        flip: function(a, b) {
            a || (a = this.factory.time.getMinuteCounter()), this.base(a, b)
        }
    })
}(jQuery),
function(a) {
    FlipClock.TwelveHourClockFace = FlipClock.TwentyFourHourClockFace.extend({
        meridium: !1,
        meridiumText: "AM",
        build: function() {
            var b = this.factory.time.getTime(!1, this.showSeconds);
            this.base(b), this.meridiumText = this.getMeridium(), this.meridium = a(['<ul class="flip-clock-meridium">', "<li>", '<a href="#">' + this.meridiumText + "</a>", "</li>", "</ul>"].join("")), this.meridium.insertAfter(this.lists[this.lists.length - 1].$el)
        },
        flip: function(a, b) {
            this.meridiumText != this.getMeridium() && (this.meridiumText = this.getMeridium(), this.meridium.find("a").html(this.meridiumText)), this.base(this.factory.time.getTime(!1, this.showSeconds), b)
        },
        getMeridium: function() {
            return (new Date).getHours() >= 12 ? "PM" : "AM"
        },
        isPM: function() {
            return "PM" == this.getMeridium() ? !0 : !1
        },
        isAM: function() {
            return "AM" == this.getMeridium() ? !0 : !1
        }
    })
}(jQuery),
function() {
    FlipClock.Lang.Arabic = {
        years: "سنوات",
        months: "شهور",
        days: "أيام",
        hours: "ساعات",
        minutes: "دقائق",
        seconds: "ثواني"
    }, FlipClock.Lang.ar = FlipClock.Lang.Arabic, FlipClock.Lang["ar-ar"] = FlipClock.Lang.Arabic, FlipClock.Lang.arabic = FlipClock.Lang.Arabic
}(jQuery),
function() {
    FlipClock.Lang.Danish = {
        years: "År",
        months: "Måneder",
        days: "Dage",
        hours: "Timer",
        minutes: "Minutter",
        seconds: "Sekunder"
    }, FlipClock.Lang.da = FlipClock.Lang.Danish, FlipClock.Lang["da-dk"] = FlipClock.Lang.Danish, FlipClock.Lang.danish = FlipClock.Lang.Danish
}(jQuery),
function() {
    FlipClock.Lang.German = {
        years: "Jahre",
        months: "Monate",
        days: "Tage",
        hours: "Stunden",
        minutes: "Minuten",
        seconds: "Sekunden"
    }, FlipClock.Lang.de = FlipClock.Lang.German, FlipClock.Lang["de-de"] = FlipClock.Lang.German, FlipClock.Lang.german = FlipClock.Lang.German
}(jQuery),
function() {
    FlipClock.Lang.English = {
        years: "Years",
        months: "Months",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds"
    }, FlipClock.Lang.en = FlipClock.Lang.English, FlipClock.Lang["en-us"] = FlipClock.Lang.English, FlipClock.Lang.english = FlipClock.Lang.English
}(jQuery),
function() {
    FlipClock.Lang.Spanish = {
        years: "A&#241;os",
        months: "Meses",
        days: "D&#205;as",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundo"
    }, FlipClock.Lang.es = FlipClock.Lang.Spanish, FlipClock.Lang["es-es"] = FlipClock.Lang.Spanish, FlipClock.Lang.spanish = FlipClock.Lang.Spanish
}(jQuery),
function() {
    FlipClock.Lang.Finnish = {
        years: "Vuotta",
        months: "Kuukautta",
        days: "Päivää",
        hours: "Tuntia",
        minutes: "Minuuttia",
        seconds: "Sekuntia"
    }, FlipClock.Lang.fi = FlipClock.Lang.Finnish, FlipClock.Lang["fi-fi"] = FlipClock.Lang.Finnish, FlipClock.Lang.finnish = FlipClock.Lang.Finnish
}(jQuery),
function() {
    FlipClock.Lang.French = {
        years: "Ans",
        months: "Mois",
        days: "Jours",
        hours: "Heures",
        minutes: "Minutes",
        seconds: "Secondes"
    }, FlipClock.Lang.fr = FlipClock.Lang.French, FlipClock.Lang["fr-ca"] = FlipClock.Lang.French, FlipClock.Lang.french = FlipClock.Lang.French
}(jQuery),
function() {
    FlipClock.Lang.Italian = {
        years: "Anni",
        months: "Mesi",
        days: "Giorni",
        hours: "Ore",
        minutes: "Minuti",
        seconds: "Secondi"
    }, FlipClock.Lang.it = FlipClock.Lang.Italian, FlipClock.Lang["it-it"] = FlipClock.Lang.Italian, FlipClock.Lang.italian = FlipClock.Lang.Italian
}(jQuery),
function() {
    FlipClock.Lang.Latvian = {
        years: "Gadi",
        months: "Mēneši",
        days: "Dienas",
        hours: "Stundas",
        minutes: "Minūtes",
        seconds: "Sekundes"
    }, FlipClock.Lang.lv = FlipClock.Lang.Latvian, FlipClock.Lang["lv-lv"] = FlipClock.Lang.Latvian, FlipClock.Lang.latvian = FlipClock.Lang.Latvian
}(jQuery),
function() {
    FlipClock.Lang.Dutch = {
        years: "Jaren",
        months: "Maanden",
        days: "Dagen",
        hours: "Uren",
        minutes: "Minuten",
        seconds: "Seconden"
    }, FlipClock.Lang.nl = FlipClock.Lang.Dutch, FlipClock.Lang["nl-be"] = FlipClock.Lang.Dutch, FlipClock.Lang.dutch = FlipClock.Lang.Dutch
}(jQuery),
function() {
    FlipClock.Lang.Norwegian = {
        years: "År",
        months: "Måneder",
        days: "Dager",
        hours: "Timer",
        minutes: "Minutter",
        seconds: "Sekunder"
    }, FlipClock.Lang.no = FlipClock.Lang.Norwegian, FlipClock.Lang.nb = FlipClock.Lang.Norwegian, FlipClock.Lang["no-nb"] = FlipClock.Lang.Norwegian, FlipClock.Lang.norwegian = FlipClock.Lang.Norwegian
}(jQuery),
function() {
    FlipClock.Lang.Portuguese = {
        years: "Anos",
        months: "Meses",
        days: "Dias",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos"
    }, FlipClock.Lang.pt = FlipClock.Lang.Portuguese, FlipClock.Lang["pt-br"] = FlipClock.Lang.Portuguese, FlipClock.Lang.portuguese = FlipClock.Lang.Portuguese
}(jQuery),
function() {
    FlipClock.Lang.Russian = {
        years: "лет",
        months: "месяцев",
        days: "дней",
        hours: "часов",
        minutes: "минут",
        seconds: "секунд"
    }, FlipClock.Lang.ru = FlipClock.Lang.Russian, FlipClock.Lang["ru-ru"] = FlipClock.Lang.Russian, FlipClock.Lang.russian = FlipClock.Lang.Russian
}(jQuery),
function() {
    FlipClock.Lang.Swedish = {
        years: "År",
        months: "Månader",
        days: "Dagar",
        hours: "Timmar",
        minutes: "Minuter",
        seconds: "Sekunder"
    }, FlipClock.Lang.sv = FlipClock.Lang.Swedish, FlipClock.Lang["sv-se"] = FlipClock.Lang.Swedish, FlipClock.Lang.swedish = FlipClock.Lang.Swedish
}(jQuery),
function() {
    FlipClock.Lang.Chinese = {
        years: "年",
        months: "月",
        days: "日",
        hours: "时",
        minutes: "分",
        seconds: "秒"
    }, FlipClock.Lang.zh = FlipClock.Lang.Chinese, FlipClock.Lang["zh-cn"] = FlipClock.Lang.Chinese, FlipClock.Lang.chinese = FlipClock.Lang.Chinese
}(jQuery);
jQuery(function($) {
    PromoModuleInitialize();
});

function PromoModuleInitialize() {
    $(document).on('s123.page.ready', function(event) {
        var $section = $('section.s123-promo-module-v2');
        $($section).each(function(index) {
            var $sectionThis = $(this);
            var $promoContainer = $sectionThis.find('.promo-container');
            var $shapeTop = $sectionThis.find('.shapeTop');
            var $shapeBottom = $sectionThis.find('.shapeBottom');
            if ($shapeTop.length > 0) {
                var topShapeSize = $promoContainer.data('top-shape-size');
                var topShapeHideFromMobile = $promoContainer.data('top-shape-hide-from-mobile');
                var topShapeColor = $promoContainer.data('top-shape-color');
                if ($.isNumeric(topShapeSize)) {
                    $sectionThis.find('.shapeTop').css('height', 'calc(' + topShapeSize + '% + 5px)');
                }
                if (topShapeHideFromMobile == 'on') {
                    $sectionThis.find('.shapeTop').attr('class', $sectionThis.find('.shapeTop').attr('class') + ' hideFromMobile');
                }
                if (topShapeColor.length > 0) {
                    $sectionThis.find('.shapeTop').css('fill', topShapeColor);
                } else {
                    $sectionThis.find('.shapeTop').css('fill', GetShapeColor('top', $sectionThis.attr('id')));
                    $(document).on('s123.page.ready.refreshPageOrder', function(event) {
                        $sectionThis.find('.shapeTop').css('fill', GetShapeColor('top', $sectionThis.attr('id')));
                    });
                }
            }
            if ($shapeBottom.length > 0) {
                var bottomShapeSize = $promoContainer.data('bottom-shape-size');
                var bottomShapeHideFromMobile = $promoContainer.data('bottom-shape-hide-from-mobile');
                var bottomShapeColor = $promoContainer.data('bottom-shape-color');
                if ($.isNumeric(bottomShapeSize)) {
                    $sectionThis.find('.shapeBottom').css('height', 'calc(' + bottomShapeSize + '% + 5px)');
                }
                if (bottomShapeHideFromMobile == 'on') {
                    $sectionThis.find('.shapeBottom').attr('class', $sectionThis.find('.shapeBottom').attr('class') + ' hideFromMobile');
                }
                if (bottomShapeColor.length > 0) {
                    $sectionThis.find('.shapeBottom').css('fill', bottomShapeColor);
                } else {
                    $sectionThis.find('.shapeBottom').css('fill', GetShapeColor('bottom', $sectionThis.attr('id')));
                    $(document).on('s123.page.ready.refreshPageOrder', function(event) {
                        $sectionThis.find('.shapeBottom').css('fill', GetShapeColor('bottom', $sectionThis.attr('id')));
                    });
                }
            }
            $sectionThis.find('.carousel').carousel();
            $sectionThis.find('.promoForm').each(function(index) {
                var $form = $(this);
                var clickAction = $form.data('click-action');
                $form.append($('<div class="conv-code-container"></div>'));
                var $convCodeContainer = $form.find('.conv-code-container');
                var customFormMultiSteps = new CustomFormMultiSteps();
                customFormMultiSteps.init({
                    $form: $form,
                    $nextButton: $form.find('.next-form-btn'),
                    $submitButton: $form.find('.submit-form-btn'),
                    $previousButton: $form.find('.previous-form-btn'),
                    totalSteps: $form.find('.custom-form-steps').data('total-steps')
                });
                var forms_GoogleRecaptcha = new Forms_GoogleRecaptcha();
                forms_GoogleRecaptcha.init($form);
                $form.validate({
                    errorElement: 'div',
                    errorClass: 'help-block',
                    focusInvalid: true,
                    ignore: ':hidden:not(.custom-form-step:visible input[name^="datePicker-"])',
                    highlight: function(e) {
                        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
                    },
                    success: function(e) {
                        $(e).closest('.form-group').removeClass('has-error');
                        $(e).remove();
                    },
                    errorPlacement: function(error, element) {
                        if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
                            var controls = element.closest('div[class*="col-"]');
                            if (controls.find(':checkbox,:radio').length > 0) element.closest('.form-group').append(error);
                            else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                        } else if (element.is('.select2')) {
                            error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
                        } else if (element.is('.chosen-select')) {
                            error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
                        } else {
                            error.appendTo(element.closest('.form-group'));
                        }
                    },
                    submitHandler: function(form) {
                        var $form = $(form);
                        $form.find('button:submit').prop('disabled', true);
                        S123.ButtonLoading.start($form.find('button:submit'));
                        var url = "/versions/" + $('#versionNUM').val() + "/include/contactO.php";
                        if ($form.hasClass('custom-form')) {
                            if (!CustomForm_IsLastStep($form)) {
                                $form.find('.next-form-btn:visible').trigger('click');
                                S123.ButtonLoading.stop($form.find('button:submit'));
                                $form.find('button:submit').prop('disabled', false);
                                return false;
                            }
                            if (!CustomForm_IsFillOutAtLeastOneField($form)) {
                                bootbox.alert(translations.fillOutAtLeastOneField);
                                S123.ButtonLoading.stop($form.find('button:submit'));
                                $form.find('button:submit').prop('disabled', false);
                                return false;
                            }
                            url = "/versions/" + $('#versionNUM').val() + "/include/customFormO.php";
                        }
                        if (forms_GoogleRecaptcha.isActive && !forms_GoogleRecaptcha.isGotToken) {
                            forms_GoogleRecaptcha.getToken();
                            return false;
                        }
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: $form.serialize(),
                            success: function(data) {
                                var dataObj = jQuery.parseJSON(data);
                                $form.trigger("reset");
                                if (clickAction == 'thankYouMessage' || clickAction == '') {
                                    bootbox.alert({
                                        title: translations.sent,
                                        message: translations.ThankYouAfterSubmmit + '<iframe src="/versions/' + $('#versionNUM').val() + '/include/contactSentO.php?w=' + $('#w').val() + '&websiteID=' + dataObj.websiteID + '&moduleID=' + dataObj.moduleID + '" style="width:100%;height:30px;" frameborder="0"></iframe>',
                                        className: 'contactUsConfirm',
                                        buttons: {
                                            ok: {
                                                label: translations.Ok
                                            }
                                        },
                                        backdrop: true
                                    });
                                } else {
                                    if (dataObj.conv_code.length > 0) {
                                        var $convCode = $('<div>' + dataObj.conv_code + '</div>');
                                        $convCodeContainer.html($convCode.text());
                                    }
                                    if (top.$('#websitePreviewIframe').length) {
                                        bootbox.alert({
                                            title: translations.previewExternalLinkTitle,
                                            message: translations.previewExternalLinkMsg.replace('{{externalLink}}', '<b>' + dataObj.action.url + '</b>'),
                                            className: 'externalAlert'
                                        });
                                    } else {
                                        window.open(dataObj.action.url, '_self');
                                    }
                                }
                                customFormMultiSteps.reset();
                                forms_GoogleRecaptcha.reset();
                                S123.ButtonLoading.stop($form.find('button:submit'));
                                $form.find('button:submit').prop('disabled', false);
                            }
                        });
                        return false;
                    }
                });
                $form.find('.f-b-date-timePicker').each(function() {
                    var $option = $(this);
                    var $datePicker = $option.find('.fake-input.date-time-picker');
                    var $hiddenInput = $option.find('[data-id="' + $datePicker.data('related-id') + '"]');
                    var $datePickerIcon = $option.find('.f-b-date-timePicker-icon');
                    var formBuilderCalendar = new calendar_handler();
                    $datePicker.data('date-format', $form.data('date-format'));
                    formBuilderCalendar.init({
                        $fakeInput: $datePicker,
                        $hiddenInput: $hiddenInput,
                        $fakeInputIcon: $datePickerIcon,
                        type: 'datePicker',
                        title: translations.chooseDate,
                        calendarSettings: {
                            format: $datePicker.data('date-format'),
                            weekStart: 0,
                            todayBtn: "linked",
                            clearBtn: false,
                            language: languageCode,
                            todayHighlight: true
                        },
                        onSubmit: function(selectedDate) {
                            $datePicker.html(selectedDate);
                            $hiddenInput.val(selectedDate);
                        }
                    });
                });
                CustomForm_DisableTwoColumns($form);
            });
            var promoScreenChangeHandler = new PromoScreenChangeHandler({
                sectionID: $sectionThis.data('module-id'),
                $section: $sectionThis,
            });
        });
    });

    function PromoScreenChangeHandler(settings) {
        var _ = {
            sectionID: settings.sectionID,
            $section: settings.$section,
            $texts: {}
        };
        _.init = function() {
            _.$section.find('#' + _.sectionID + '-promoText1, #' + _.sectionID + '-promoText2, #' + _.sectionID + '-promoText3').each(function(index, promoText) {
                var $promoText = $(promoText);
                _.$texts[$promoText.get(0).id] = {
                    $el: $promoText,
                    orignialFontSize: $promoText.css('font-size')
                };
                _.fitFontSize($promoText);
            });
            if (IsWizard()) {
                $(document).off('wizard.preview.device.changed.promoScreenChangeHandler_' + _.sectionID).on('wizard.preview.device.changed.promoScreenChangeHandler_' + _.sectionID, function(event) {
                    $.each(_.$texts, function(index, $text) {
                        _.fitFontSize($text.$el);
                    });
                });
                _.$section.off('resizableText.end.promoScreenChangeHandler').on('resizableText.end.promoScreenChangeHandler', function(event, $el, newFontSize) {
                    _.updateOriginalFontSize($el.get(0).id, newFontSize + 'px');
                });
            }
        };
        _.fitFontSize = function($el) {
            if ($el.data('font-size-fitted')) return;
            if ($(window).width() >= 1) {
                $el.css('font-size', (parseFloat(_.$texts[$el.get(0).id].orignialFontSize) * $(window).width() / 1170 + 8) + 'px');
            }
            if ($(window).width() >= 480) {
                $el.css('font-size', (parseFloat(_.$texts[$el.get(0).id].orignialFontSize) * $(window).width() / 1170 + 8) + 'px');
            }
            if ($(window).width() >= 768) {
                $el.css('font-size', (parseFloat(_.$texts[$el.get(0).id].orignialFontSize) * $(window).width() / 1170) + 'px');
            }
            if ($(window).width() >= 992) {
                $el.css('font-size', (parseFloat(_.$texts[$el.get(0).id].orignialFontSize) * $(window).width() / 1170) + 'px');
            }
            if ($(window).width() >= 1200) {
                $el.css('font-size', _.$texts[$el.get(0).id].orignialFontSize);
            }
            $el.data('font-size-fitted', 1);
        };
        _.updateOriginalFontSize = function(elemetID, newFontSize) {
            _.$texts[elemetID].orignialFontSize = newFontSize;
        };
        _.init();
        return _;
    }

    function GetShapeColor(position, id) {
        var $promo = $('section#' + id);
        if ($promo.length == 0) return;
        var sectionPlace = $promo.get(0).style.order;
        var $websiteSections = $('#s123ModulesContainer section:not(.s123-module-rich-page)');
        if (sectionPlace.length == 0) {
            $websiteSections.each(function(index, value) {
                if ($(value).attr('id') == id) {
                    sectionPlace = index;
                    return;
                }
            });
        }
        sectionPlace = parseInt(sectionPlace) + 1;
        if (position == 'bottom') {
            if (sectionPlace == $websiteSections.length) {
                return 'var(--footer_back)';
            } else if (sectionPlace % 2 == 1) {
                return 'var(--modules_color_second)';
            } else {
                return 'var(--modules_color)';
            }
        } else {
            if (sectionPlace == 1) {
                var $homepageShapeDesign = $('section#top-section #homepageShapeDesign');
                if ($homepageShapeDesign.length > 0) {
                    return $homepageShapeDesign.css('fill');
                } else {
                    return 'var(--home_background_color)';
                }
            } else if (sectionPlace % 2 == 1) {
                return 'var(--modules_color_second)';
            } else {
                return 'var(--modules_color)';
            }
        }
    }
}
jQuery(function($) {
    PromoOldV1ModuleInitialize();
});

function PromoOldV1ModuleInitialize() {
    $(document).on('s123.page.ready', function(event) {
        var $section = $('section.s123-module-promo');
        $($section).each(function(index) {
            var $sectionThis = $(this);
            $sectionThis.find('.carousel').carousel();
        });
    });
}

function CountdownWidget() {
    var CW = {
        translate: {
            days: 'Days',
            hours: 'Hours',
            minutes: 'Minutes',
            seconds: 'Seconds'
        }
    };
    CW.init = function(settings) {
        CW.$countdown = settings.$countdown;
        CW.dateInfo = settings.dateInfo.length > 0 ? settings.dateInfo : Date(Date.now());
        CW.type = settings.type;
        CW.dateInfo = new Date(CW.dateInfo);
        if (settings.translate) {
            $.each(settings.translate, function(index, value) {
                CW.translate[index] = value;
            });
        }
        if (settings.onStop) {
            CW.onStop = settings.onStop;
        }
        var $html = CW.generateHTML();
        CW.items = {
            days: $html.find('.days .countdown-digits'),
            hours: $html.find('.hours .countdown-digits'),
            minutes: $html.find('.minutes .countdown-digits'),
            seconds: $html.find('.seconds .countdown-digits')
        };
        CW.$countdown.html('').append($html);
        CW.updateClock();
        CW.timer = setInterval(CW.updateClock, 1000);
    }
    CW.generateHTML = function() {
        var html = '<div class="countdown-items">';
        html += '<div class="countdown-item days box-primary">';
        html += '<div class="countdown-digits box-text-primary"></div>';
        html += '<span class="countdown-label">' + CW.translate.days + '</span>';
        html += '</div>';
        html += '<div class="countdown-item hours box-primary">';
        html += '<div class="countdown-digits box-text-primary"></div>';
        html += '<span class="countdown-label">' + CW.translate.hours + '</span>';
        html += '</div>';
        html += '<div class="countdown-item minutes box-primary">';
        html += '<div class="countdown-digits box-text-primary"></div>';
        html += '<span class="countdown-label">' + CW.translate.minutes + '</span>';
        html += '</div>';
        html += '<div class="countdown-item seconds box-primary">';
        html += '<div class="countdown-digits box-text-primary"></div>';
        html += '<span class="countdown-label">' + CW.translate.seconds + '</span>';
        html += '</div>';
        html += '</div>';
        var $html = $(html);
        if (CW.type == '2') {
            $html.find('.countdown-item.days').remove();
        } else if (CW.type == '3') {
            $html.find('.countdown-item.days').remove();
            $html.find('.countdown-item.hours').remove();
        }
        return $html;
    };
    CW.updateClock = function() {
        if (!CW.dateInfo) return;
        var timer = CW.getTimeRemaining(CW.dateInfo);
        $.each(timer.parts, function(index, value) {
            if (CW.items[index].length) CW.items[index].html(value);
        });
        if (timer.total <= 0) {
            if (CW.onStop) CW.onStop();
            clearInterval(CW.timer);
        }
    }
    CW.getTimeRemaining = function(dateInfo) {
        var date = dateInfo - new Date;
        var seconds = Math.floor(date / 1000 % 60);
        var minutes = Math.floor(date / 1000 / 60 % 60);
        var hours = Math.floor(date / 3600000 % 24);
        var days = Math.floor(date / 86400000);
        if (days < 0 || hours < 0 || minutes < 0) {
            seconds = 0;
            minutes = 0;
            hours = 0;
            days = 0;
        }
        if (CW.type == '2') {
            hours = (days * 24) + hours;
            days = 0;
        } else if (CW.type == '3') {
            hours = (days * 24) + hours;
            minutes = (hours * 60) + minutes;
            hours = 0;
            days = 0;
        }
        return {
            total: date,
            parts: {
                days: CW.splitNum(days),
                hours: CW.splitNum(hours),
                minutes: CW.splitNum(minutes),
                seconds: CW.splitNum(seconds)
            }
        }
    }
    CW.splitNum = function(num) {
        var countdownDigits = '';
        num = num.toString();
        if (num.length === 1) {
            num = 0 + num;
        }
        var digits = num.match(/\d{1}/g);
        $.each(digits, function(index, value) {
            countdownDigits += '<span class="countdown-digit">' + value + "</span>"
        });
        return countdownDigits
    }
    return CW;
}
jQuery(function($) {
    CountdownModuleInitialize();
});

function CountdownModuleInitialize() {
    $(document).on('s123.page.ready', function(event) {
        $('.s123-module-countdown-container').each(function() {
            var $this = $(this);
            var $clock = $this.find('.clock');
            var $message = $this.find('.message');
            var datetime = $clock.data('datetime');
            var type = $clock.data('type');
            var futureDate = new Date(datetime);
            var currentDate = new Date();
            var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
            if (diff <= 0) {
                diff = 0;
                $message.css('visibility', 'visible');
            }
            switch (type) {
                case 1:
                    var clockFace = 'DailyCounter';
                    var daysDiff = parseInt((futureDate - currentDate) / (1000 * 60 * 60 * 24), 10);
                    $clock.addClass('days-digits-number-' + daysDiff.toString().length)
                    break;
                case 2:
                    var clockFace = 'HourlyCounter';
                    var hoursDiff = parseInt((futureDate - currentDate) / (1000 * 60 * 60), 10);
                    $clock.addClass('hours-digits-number-' + hoursDiff.toString().length)
                    break;
                case 3:
                    var clockFace = 'MinuteCounter';
                    break;
                default:
                    var clockFace = 'DailyCounter';
            }
            $clock.addClass(clockFace);
            FlipClock.Lang['manually'] = {
                'years': translations.flipClock.years,
                'months': translations.flipClock.months,
                'days': translations.flipClock.days,
                'hours': translations.flipClock.hours,
                'minutes': translations.flipClock.minutes,
                'seconds': translations.flipClock.seconds
            };
            $clock = $clock.FlipClock(diff, {
                clockFace: clockFace,
                autoStart: true,
                countdown: true,
                callbacks: {
                    stop: function() {
                        $message.css('visibility', 'visible');
                    }
                },
                language: 'manually',
            });
        });
    });
}
jQuery(function($) {
    CountdownModuleInitialize_Layout3()
});

function CountdownModuleInitialize_Layout3() {
    $(document).on('s123.page.ready', function(event) {
        var $sections = $('.s123-module-countdown.layout-3');
        $sections.each(function(index) {
            var $s = $(this);
            var $countdown = $s.find('#countdown');
            var countdownWidget = new CountdownWidget();
            countdownWidget.init({
                $countdown: $s.find('#countdown'),
                dateInfo: $countdown.data('date-info'),
                type: $countdown.data('type'),
                translate: {
                    days: $countdown.data('days'),
                    hours: $countdown.data('hours'),
                    minutes: $countdown.data('minutes'),
                    seconds: $countdown.data('seconds')
                },
                onStop: function() {
                    $s.find('.message').fadeIn(350);
                }
            });
        });
    });
}
jQuery(function($) {
    PercentageModuleInitialize_Layout1();
});

function PercentageModuleInitialize_Layout1() {
    $(document).on('s123.page.ready', function(event) {
        $('.s123-module-percentage.layout-1').each(function() {
            var $this = $(this);
            $this.find('.easy-pie-chart').each(function() {
                $(this).appear(function() {
                    var chartSize = 115;
                    $(this).attr('data-is-visible', true);
                    if (parseFloat($(this).data('percent')) <= 0) {
                        $(this).css({
                            width: chartSize,
                            height: chartSize
                        });
                    } else {
                        $(this).easyPieChart({
                            barColor: $(this).data('custom-bar-color'),
                            trackColor: false,
                            scaleColor: false,
                            lineWidth: 5,
                            animate: 2000,
                            size: chartSize
                        });
                    }
                });
            });
        });
    });
    if (IsWizard() && !IsIE11()) {
        $(document).on('s123.css.reloaded', function(event) {
            updateBarWithDefColor(getComputedStyle(document.documentElement).getPropertyValue('--global_main_color'));
        });
        $(document).on('site123.colorPicker.change', function(event, id, newColor) {
            if (id != 'global_main_color') return;
            updateBarWithDefColor(newColor);
        });

        function updateBarWithDefColor(cssVarColor) {
            $('.s123-module-percentage.layout-1').each(function() {
                var $this = $(this);
                $this.find('.easy-pie-chart[data-is-default-color="1"]').each(function() {
                    if (!$(this).data('easyPieChart')) return;
                    $(this).data('easyPieChart').options['barColor'] = cssVarColor;
                    $(this).data('easyPieChart').update($(this).data('percent'));
                });
            });
        }
    }
}! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, function() {
    return function(e) {
        function t(n) {
            if (o[n]) return o[n].exports;
            var i = o[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
        }
        var o = {};
        return t.m = e, t.c = o, t.p = "dist/", t(0)
    }([function(e, t, o) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var o = arguments[t];
                    for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n])
                }
                return e
            },
            a = o(1),
            r = (n(a), o(5)),
            c = n(r),
            u = o(6),
            s = n(u),
            d = o(7),
            f = n(d),
            l = o(8),
            m = n(l),
            p = o(9),
            b = n(p),
            v = o(10),
            g = n(v),
            y = o(13),
            w = n(y),
            h = [],
            k = !1,
            x = document.all && !window.atob,
            j = {
                offset: 120,
                delay: 0,
                easing: "ease",
                duration: 400,
                disable: !1,
                once: !1,
                startEvent: "DOMContentLoaded"
            },
            O = function() {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? !1 : arguments[0];
                return e && (k = !0), k ? (h = (0, g["default"])(h, j), (0, b["default"])(h, j.once), h) : void 0
            },
            _ = function() {
                h = (0, w["default"])(), O()
            },
            z = function() {
                h.forEach(function(e, t) {
                    e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
                })
            },
            A = function(e) {
                return e === !0 || "mobile" === e && m["default"].mobile() || "phone" === e && m["default"].phone() || "tablet" === e && m["default"].tablet() || "function" == typeof e && e() === !0
            },
            E = function(e) {
                return j = i(j, e), h = (0, w["default"])(), A(j.disable) || x ? z() : (document.querySelector("body").setAttribute("data-aos-easing", j.easing), document.querySelector("body").setAttribute("data-aos-duration", j.duration), document.querySelector("body").setAttribute("data-aos-delay", j.delay), "DOMContentLoaded" === j.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? O(!0) : "load" === j.startEvent ? window.addEventListener(j.startEvent, function() {
                    O(!0)
                }) : document.addEventListener(j.startEvent, function() {
                    O(!0)
                }), window.addEventListener("resize", (0, s["default"])(O, 50, !0)), window.addEventListener("orientationchange", (0, s["default"])(O, 50, !0)), window.addEventListener("scroll", (0, c["default"])(function() {
                    (0, b["default"])(h, j.once)
                }, 99)), document.addEventListener("DOMNodeRemoved", function(e) {
                    var t = e.target;
                    t && 1 === t.nodeType && t.hasAttribute && t.hasAttribute("data-aos") && (0, s["default"])(_, 50, !0)
                }), (0, f["default"])("[data-aos]", _), h)
            };
        e.exports = {
            init: E,
            refresh: O,
            refreshHard: _
        }
    }, function(e, t) {}, , , , function(e, t, o) {
        "use strict";

        function n(e, t, o) {
            var n = !0,
                a = !0;
            if ("function" != typeof e) throw new TypeError(c);
            return i(o) && (n = "leading" in o ? !!o.leading : n, a = "trailing" in o ? !!o.trailing : a), r(e, t, {
                leading: n,
                maxWait: t,
                trailing: a
            })
        }

        function i(e) {
            var t = "undefined" == typeof e ? "undefined" : a(e);
            return !!e && ("object" == t || "function" == t)
        }
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
            },
            r = o(6),
            c = "Expected a function";
        e.exports = n
    }, function(e, t) {
        "use strict";

        function o(e, t, o) {
            function n(t) {
                var o = b,
                    n = v;
                return b = v = void 0, O = t, y = e.apply(n, o)
            }

            function a(e) {
                return O = e, w = setTimeout(d, t), _ ? n(e) : y
            }

            function r(e) {
                var o = e - h,
                    n = e - O,
                    i = t - o;
                return z ? x(i, g - n) : i
            }

            function u(e) {
                var o = e - h,
                    n = e - O;
                return !h || o >= t || 0 > o || z && n >= g
            }

            function d() {
                var e = j();
                return u(e) ? f(e) : void(w = setTimeout(d, r(e)))
            }

            function f(e) {
                return clearTimeout(w), w = void 0, A && b ? n(e) : (b = v = void 0, y)
            }

            function l() {
                void 0 !== w && clearTimeout(w), h = O = 0, b = v = w = void 0
            }

            function m() {
                return void 0 === w ? y : f(j())
            }

            function p() {
                var e = j(),
                    o = u(e);
                if (b = arguments, v = this, h = e, o) {
                    if (void 0 === w) return a(h);
                    if (z) return clearTimeout(w), w = setTimeout(d, t), n(h)
                }
                return void 0 === w && (w = setTimeout(d, t)), y
            }
            var b, v, g, y, w, h = 0,
                O = 0,
                _ = !1,
                z = !1,
                A = !0;
            if ("function" != typeof e) throw new TypeError(s);
            return t = c(t) || 0, i(o) && (_ = !!o.leading, z = "maxWait" in o, g = z ? k(c(o.maxWait) || 0, t) : g, A = "trailing" in o ? !!o.trailing : A), p.cancel = l, p.flush = m, p
        }

        function n(e) {
            var t = i(e) ? h.call(e) : "";
            return t == f || t == l
        }

        function i(e) {
            var t = "undefined" == typeof e ? "undefined" : u(e);
            return !!e && ("object" == t || "function" == t)
        }

        function a(e) {
            return !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
        }

        function r(e) {
            return "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) || a(e) && h.call(e) == m
        }

        function c(e) {
            if ("number" == typeof e) return e;
            if (r(e)) return d;
            if (i(e)) {
                var t = n(e.valueOf) ? e.valueOf() : e;
                e = i(t) ? t + "" : t
            }
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = e.replace(p, "");
            var o = v.test(e);
            return o || g.test(e) ? y(e.slice(2), o ? 2 : 8) : b.test(e) ? d : +e
        }
        var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
            },
            s = "Expected a function",
            d = NaN,
            f = "[object Function]",
            l = "[object GeneratorFunction]",
            m = "[object Symbol]",
            p = /^\s+|\s+$/g,
            b = /^[-+]0x[0-9a-f]+$/i,
            v = /^0b[01]+$/i,
            g = /^0o[0-7]+$/i,
            y = parseInt,
            w = Object.prototype,
            h = w.toString,
            k = Math.max,
            x = Math.min,
            j = Date.now;
        e.exports = o
    }, function(e, t) {
        "use strict";

        function o(e, t) {
            r.push({
                selector: e,
                fn: t
            }), !c && a && (c = new a(n), c.observe(i.documentElement, {
                childList: !0,
                subtree: !0,
                removedNodes: !0
            })), n()
        }

        function n() {
            for (var e, t, o = 0, n = r.length; n > o; o++) {
                e = r[o], t = i.querySelectorAll(e.selector);
                for (var a, c = 0, u = t.length; u > c; c++) a = t[c], a.ready || (a.ready = !0, e.fn.call(a, a))
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = window.document,
            a = window.MutationObserver || window.WebKitMutationObserver,
            r = [],
            c = void 0;
        t["default"] = o
    }, function(e, t) {
        "use strict";

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function() {
                function e(e, t) {
                    for (var o = 0; o < t.length; o++) {
                        var n = t[o];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, o, n) {
                    return o && e(t.prototype, o), n && e(t, n), t
                }
            }(),
            i = function() {
                function e() {
                    o(this, e)
                }
                return n(e, [{
                    key: "phone",
                    value: function() {
                        var e = !1;
                        return function(t) {
                            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
                        }(navigator.userAgent || navigator.vendor || window.opera), e
                    }
                }, {
                    key: "mobile",
                    value: function() {
                        var e = !1;
                        return function(t) {
                            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
                        }(navigator.userAgent || navigator.vendor || window.opera), e
                    }
                }, {
                    key: "tablet",
                    value: function() {
                        return this.mobile() && !this.phone()
                    }
                }]), e
            }();
        t["default"] = new i
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function(e, t, o) {
                var n = e.node.getAttribute("data-aos-once");
                t > e.position ? e.node.classList.add("aos-animate") : "undefined" != typeof n && ("false" === n || !o && "true" !== n) && e.node.classList.remove("aos-animate")
            },
            n = function(e, t) {
                var n = window.pageYOffset,
                    i = window.innerHeight;
                e.forEach(function(e, a) {
                    o(e, i + n, t)
                })
            };
        t["default"] = n
    }, function(e, t, o) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = o(11),
            a = n(i),
            r = function(e, t) {
                return e.forEach(function(e, o) {
                    e.node.classList.add("aos-init"), e.position = (0, a["default"])(e.node, t.offset)
                }), e
            };
        t["default"] = r
    }, function(e, t, o) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = o(12),
            a = n(i),
            r = function(e, t) {
                var o = 0,
                    n = 0,
                    i = window.innerHeight,
                    r = {
                        offset: e.getAttribute("data-aos-offset"),
                        anchor: e.getAttribute("data-aos-anchor"),
                        anchorPlacement: e.getAttribute("data-aos-anchor-placement")
                    };
                switch (r.offset && !isNaN(r.offset) && (n = parseInt(r.offset)), r.anchor && document.querySelectorAll(r.anchor) && (e = document.querySelectorAll(r.anchor)[0]), o = (0, a["default"])(e).top, r.anchorPlacement) {
                    case "top-bottom":
                        break;
                    case "center-bottom":
                        o += e.offsetHeight / 2;
                        break;
                    case "bottom-bottom":
                        o += e.offsetHeight;
                        break;
                    case "top-center":
                        o += i / 2;
                        break;
                    case "bottom-center":
                        o += i / 2 + e.offsetHeight;
                        break;
                    case "center-center":
                        o += i / 2 + e.offsetHeight / 2;
                        break;
                    case "top-top":
                        o += i;
                        break;
                    case "bottom-top":
                        o += e.offsetHeight + i;
                        break;
                    case "center-top":
                        o += e.offsetHeight / 2 + i
                }
                return r.anchorPlacement || r.offset || isNaN(t) || (n = t), o + n
            };
        t["default"] = r
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function(e) {
            for (var t = 0, o = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), o += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
            return {
                top: o,
                left: t
            }
        };
        t["default"] = o
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function(e) {
            e = e || document.querySelectorAll("[data-aos]");
            var t = [];
            return [].forEach.call(e, function(e, o) {
                t.push({
                    node: e
                })
            }), t
        };
        t["default"] = o
    }])
});
jQuery(function($) {
    JobsModuleInitialize();
});

function JobsModuleInitialize() {
    $(document).on('s123.page.ready', function(event) {
        var $section = $('section.s123-module-jobs, section.s123-page-data-job');
        if ($section.length === 0) return;
        $section.each(function(index) {
            var $sectionThis = $(this);
            if (is_touch_device()) {
                $sectionThis.addClass('touch-device');
            }
            $sectionThis.find('.jobsApplyBtn').click(function() {
                var $applyBtn = $(this);
                var websiteID = $applyBtn.data('website-id');
                var moduleID = $applyBtn.data('module-id');
                var uniqueID = $applyBtn.data('unique-id');
                var applicationID = $applyBtn.data('application-id');
                var uploadFile = $applyBtn.data('upload-file');
                var customForm = $applyBtn.data('custom-form');
                var customApplicationForm = applicationID ? $sectionThis.find(`#customApplicationForm-${applicationID}`) : $sectionThis.find('#customApplicationForm');
                var w = $('#w').val();
                var customClasses = customForm == '1' ? 'jobs-custom-form' : '';
                buildPopup('popupJobs', '', buildForm(websiteID, moduleID, uniqueID, w, uploadFile, customForm, customApplicationForm), '', true, false, true, '', customClasses);
                $('#popupJobs').find('.jobsForm').each(function(index) {
                    var $form = $(this);
                    var forms_GoogleRecaptcha = new Forms_GoogleRecaptcha();
                    forms_GoogleRecaptcha.init($form);
                    $form.find('.f-b-date-timePicker').each(function() {
                        var $option = $(this);
                        var $datePicker = $option.find('.fake-input.date-time-picker');
                        var $hiddenInput = $option.find('[data-id="' + $datePicker.data('related-id') + '"]');
                        var $datePickerIcon = $option.find('.f-b-date-timePicker-icon');
                        var formBuilderCalendar = new calendar_handler();
                        $datePicker.data('date-format', $form.data('date-format'));
                        formBuilderCalendar.init({
                            $fakeInput: $datePicker,
                            $hiddenInput: $hiddenInput,
                            $fakeInputIcon: $datePickerIcon,
                            type: 'datePicker',
                            title: translations.chooseDate,
                            calendarSettings: {
                                format: $datePicker.data('date-format'),
                                weekStart: 0,
                                todayBtn: "linked",
                                clearBtn: false,
                                language: languageCode,
                                todayHighlight: true
                            },
                            customClass: 'jobs-module-calendar',
                            onSubmit: function(selectedDate) {
                                $datePicker.html(selectedDate);
                                $hiddenInput.val(selectedDate);
                            }
                        });
                    });
                    jQuery.validator.addMethod('jobs-file-size', function(value, element, param) {
                        if (element.files.length === 0) return true;
                        return element.files[0].size <= param;
                    }, translations.uploadFileLimitSize);
                    $form.validate({
                        errorElement: 'div',
                        errorClass: 'help-block',
                        focusInvalid: true,
                        ignore: "",
                        highlight: function(e) {
                            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
                        },
                        success: function(e) {
                            $(e).closest('.form-group').removeClass('has-error');
                            $(e).remove();
                        },
                        submitHandler: function(form) {
                            var $form = $(form);
                            if (forms_GoogleRecaptcha.isActive && !forms_GoogleRecaptcha.isGotToken) {
                                forms_GoogleRecaptcha.getToken();
                                return false;
                            }
                            $form.find('button:submit').prop('disabled', true);
                            var $jobsLoadingMessage = $('<div id="jobsLoadingMessage">' + translations.loading + '</div>');
                            var bootboxDialog = bootbox.alert({
                                title: translations.sending,
                                message: $jobsLoadingMessage,
                                className: 'jobsConfirm, bootbox-jobs-form',
                                backdrop: true
                            }).on("hidden.bs.modal", function() {
                                buildPopup_CloseAction('popupJobs');
                            });
                            $.ajax({
                                type: "POST",
                                url: "/versions/" + $('#versionNUM').val() + "/include/jobsO.php",
                                data: new FormData($form.get(0)),
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function(data) {
                                    var dataObj = jQuery.parseJSON(data);
                                    $form.trigger("reset");
                                    forms_GoogleRecaptcha.reset();
                                    message = '<span>' + translations.ThankYouAfterSubmmit + '</span>';
                                    var $sentMessage = $(message);
                                    bootboxDialog.find('.modal-title').html(translations.sent);
                                    bootboxDialog.find('.bootbox-body').append($sentMessage.hide());
                                    $jobsLoadingMessage.hide();
                                    $sentMessage.slideDown(200);
                                    $form.find('button:submit').prop('disabled', false);
                                    WizardNotificationUpdate();
                                }
                            });
                            return false;
                        }
                    });
                });
            });
        });
    });
}

function buildForm(websiteID, moduleID, uniqueID, w, uploadFile, customForm, customApplicationForm) {
    var html = '';
    html += '<form class="jobsForm">';
    if (!customForm) {
        html += '<div class="row">';
        html += '<div class="col-sm-6 col-xs-12">';
        html += '<div class="form-group">';
        html += '<label for="first">' + translations.firstName + '</label>';
        html += '<input type="text" name="jobs_first_name" placeholder="' + translations.firstName + '" class="form-control" required data-msg-required="' + translations.jqueryValidMsgRequire + '">';
        html += '</div>';
        html += '</div>';
        html += '<div class="col-sm-6 col-xs-12">';
        html += '<div class="form-group">';
        html += '<label for="jobs_last_name">' + translations.lastName + '</label>';
        html += '<input type="text" name="jobs_last_name" placeholder="' + translations.lastName + '" class="form-control" required data-msg-required="' + translations.jqueryValidMsgRequire + '">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="row">';
        html += '<div class="col-sm-6 col-xs-12">';
        html += '<div class="form-group">';
        html += '<label for="jobs_phone">' + translations.phone + '</label>';
        html += '<input type="text" name="jobs_phone" placeholder="' + translations.phone + '" class="form-control">';
        html += '</div>';
        html += '</div>';
        html += '<div class="col-sm-6 col-xs-12">';
        html += '<div class="form-group">';
        html += '<label for="jobs_email">' + translations.emailAddress + '</label>';
        html += '<input type="text" name="jobs_email" placeholder="' + translations.emailAddress + '" class="form-control" required data-msg-required="' + translations.jqueryValidMsgRequire + '" data-rule-email="true" data-msg-email="' + translations.jqueryValidMsgEmail + '">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        if (!uploadFile) {
            html += '<div class="row">';
            html += '<div class="col-xs-12">';
            html += '<div class="form-group">';
            html += '<label for="">' + translations.fileUpload + '</label>';
            html += '<input type="file" class="form-control" name="jobs_upload_file" data-rule-jobs-file-size="5242880" data-msg-jobs-file-size="' + translations.uploadFileLimitSize.replace('{{mb_in_number}}', '5') + '">';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
    } else {
        html += customApplicationForm.val();
    }
    html += '<button type="submit" class="btn btn-primary btn-block">' + translations.send + '</button>';
    html += '<input type="hidden" name="w" value="' + w + '">';
    html += '<input type="hidden" name="websiteID" value="' + websiteID + '">';
    html += '<input type="hidden" name="moduleID" value="' + moduleID + '">';
    html += '<input type="hidden" name="uniqueID" value="' + uniqueID + '">';
    html += '<input type="hidden" name="recaptchaToken" value="">';
    html += '<input type="hidden" name="customForm" value="' + customForm + '">';
    html += '</form>';
    return html;
}
jQuery(function($) {
    AutoSetProductsImage();
});

function AutoSetProductsImage() {
    $(document).on("s123.page.load", function(event) {
        $('.s123-module-products').each(function() {
            var $thisModule = $(this);
            $thisModule.find('.product-image.autoFitByHeight').first().each(function() {
                var $this = $(this);
                AutoSetProductsImage_onImageReady($this.find('img'), AutoSetProductsImage_autoFitByHeight, $this, $thisModule);
            });
            $thisModule.find('.product-image.autoFitByWidth').first().each(function() {
                var $this = $(this);
                AutoSetProductsImage_onImageReady($this.find('img'), AutoSetProductsImage_autoFitByWidth, $this, $thisModule);
            });
        });
        var $box = $('.s123-page-data .product-container .product-images .main-image, .s123-module .product-container .product-images .main-image');
        if ($box.length > 0) {
            if ($box.closest('.s123-module-eCommerce').length !== 0) return;
            AutoSetProductsImage_onImageReady($('.product-container .main-image .hideImageRatio'), AutoSetProductsImage_autoFitProductPage, $box, '');
        }
    });
}

function AutoSetProductsImage_autoFitByHeight($imgBox, $thisModule) {
    var width = $imgBox.find('img').width();
    var height = $imgBox.find('img').height();
    var boxMagic_ratio = width / height;
    var boxWidth = $imgBox.width();
    $thisModule.find('.product-image.autoFitByHeight').height(boxWidth / boxMagic_ratio);
}

function AutoSetProductsImage_autoFitByWidth($imgBox, $thisModule) {
    var width = $imgBox.find('img').width();
    var height = $imgBox.find('img').height();
    var boxMagic_ratio = width / height;
    var boxHeight = $imgBox.height();
    $thisModule.find('.product-image.autoFitByWidth').width(boxHeight * boxMagic_ratio);
}

function AutoSetProductsImage_autoFitProductPage($imgBox, $thisModule) {
    var boxWidth = $imgBox.width();
    var imgWidth = $('.product-container .main-image .hideImageRatio').width();
    var imgHeight = $('.product-container .main-image .hideImageRatio').height();
    var ratio = imgWidth / imgHeight;
    if (boxWidth > imgWidth) {
        boxWidth = imgWidth;
        $imgBox.width(boxWidth);
    }
    $imgBox.height(boxWidth / ratio);
}

function AutoSetProductsImage_onImageReady(selector, handler, $imgBox, $thisModule) {
    var list;
    list = typeof selector === 'string' ? $(selector) : selector;
    list.each(function(index, element) {
        if (element.complete) {
            setTimeout(function() {
                fireHandler.call(element);
            }, 0); // Won't really be 0, but close
        } else {
            $(element).bind('load', fireHandler);
        }
    });

    function fireHandler(event) {
        $(this).unbind('load', fireHandler);
        handler.call(this, $imgBox, $thisModule);
    }
}