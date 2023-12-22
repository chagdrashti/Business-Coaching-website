/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
    },
    easeInQuad: function(e, f, a, h, g) {
        return h * (f /= g) * f + a
    },
    easeOutQuad: function(e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    },
    easeInOutQuad: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    },
    easeInCubic: function(e, f, a, h, g) {
        return h * (f /= g) * f * f + a
    },
    easeOutCubic: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    },
    easeInOutCubic: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    },
    easeInQuart: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a
    },
    easeOutQuart: function(e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a
    },
    easeInOutQuart: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a
    },
    easeInQuint: function(e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a
    },
    easeOutQuint: function(e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a
    },
    easeInOutQuint: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    },
    easeInSine: function(e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
    },
    easeOutSine: function(e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a
    },
    easeInOutSine: function(e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
    },
    easeInExpo: function(e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
    },
    easeOutExpo: function(e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
    },
    easeInOutExpo: function(e, f, a, h, g) {
        if (f == 0) {
            return a
        }
        if (f == g) {
            return a + h
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
    },
    easeInCirc: function(e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
    },
    easeOutCirc: function(e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    },
    easeInOutCirc: function(e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
    },
    easeInElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
    },
    easeOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
    },
    easeInOutElastic: function(f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k / 2) == 2) {
            return e + l
        }
        if (!j) {
            j = k * (0.3 * 1.5)
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
    },
    easeInBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a
    },
    easeOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    },
    easeInOutBack: function(e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        if ((f /= h / 2) < 1) {
            return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
        }
        return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
    },
    easeInBounce: function(e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
    },
    easeOutBounce: function(e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
                }
            }
        }
    },
    easeInOutBounce: function(e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    }
});
/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 * http://bas2k.ru/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2014 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
! function(a) {
    a.fn.appear = function(b, c) {
        var d = a.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, c);
        return this.each(function() {
            var c = a(this);
            if (c.appeared = !1, !b) return void c.trigger("appear", d.data);
            var e = a(window),
                f = function() {
                    if (!c.is(":visible")) return void(c.appeared = !1);
                    var a = e.scrollLeft(),
                        b = e.scrollTop(),
                        f = c.offset(),
                        g = f.left,
                        h = f.top,
                        i = d.accX,
                        j = d.accY,
                        k = c.height(),
                        l = e.height(),
                        m = c.width(),
                        n = e.width();
                    h + k + j >= b && b + l + j >= h && g + m + i >= a && a + n + i >= g ? c.appeared || c.trigger("appear", d.data) : c.appeared = !1
                },
                g = function() {
                    if (c.appeared = !0, d.one) {
                        e.unbind("scroll", f);
                        var g = a.inArray(f, a.fn.appear.checks);
                        g >= 0 && a.fn.appear.checks.splice(g, 1)
                    }
                    b.apply(this, arguments)
                };
            d.one ? c.one("appear", d.data, g) : c.bind("appear", d.data, g), e.scroll(f), a.fn.appear.checks.push(f), f()
        })
    }, a.extend(a.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var b = a.fn.appear.checks.length;
            if (b > 0)
                for (; b--;) a.fn.appear.checks[b]()
        },
        run: function() {
            a.fn.appear.timeout && clearTimeout(a.fn.appear.timeout), a.fn.appear.timeout = setTimeout(a.fn.appear.checkAll, 20)
        }
    }), a.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(b, c) {
        var d = a.fn[c];
        d && (a.fn[c] = function() {
            var b = d.apply(this, arguments);
            return a.fn.appear.run(), b
        })
    })
}(jQuery);
! function(a, b, c, d) {
    function e(b, c) {
        this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        }, this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        }, a.each(["onResize", "onThrottledResize"], a.proxy(function(b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)), a.each(e.Plugins, a.proxy(function(a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)), a.each(e.Workers, a.proxy(function(b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)), this.setup(), this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    }, e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, e.Type = {
        Event: "event",
        State: "state"
    }, e.Plugins = {}, e.Workers = [{
        filter: ["width", "settings"],
        run: function() {
            this._width = this.$element.width()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            this.$stage.children(".cloned").remove()
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this.settings.margin || "",
                c = !this.settings.autoWidth,
                d = this.settings.rtl,
                e = {
                    width: "auto",
                    "margin-left": d ? b : "",
                    "margin-right": d ? "" : b
                };
            !c && this.$stage.children().css(e), a.css = e
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                c = null,
                d = this._items.length,
                e = !this.settings.autoWidth,
                f = [];
            for (a.items = {
                    merge: !1,
                    width: b
                }; d--;) c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
            this._widths = f
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b = [],
                c = this._items,
                d = this.settings,
                e = Math.max(2 * d.items, 4),
                f = 2 * Math.ceil(c.length / 2),
                g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
                h = "",
                i = "";
            for (g /= 2; g--;) b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i;
            this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
            this._coordinates = f
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var a = this.settings.stagePadding,
                b = this._coordinates,
                c = {
                    width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                    "padding-left": a || "",
                    "padding-right": a || ""
                };
            this.$stage.css(c)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            var b = this._coordinates.length,
                c = !this.settings.autoWidth,
                d = this.$stage.children();
            if (c && a.items.merge)
                for (; b--;) a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
            else c && (a.css.width = a.items.width, d.css(a.css))
        }
    }, {
        filter: ["items"],
        run: function() {
            this._coordinates.length < 1 && this.$stage.removeAttr("style")
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(a) {
            a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current)
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var a, b, c, d, e = this.settings.rtl ? 1 : -1,
                f = 2 * this.settings.stagePadding,
                g = this.coordinates(this.current()) + f,
                h = g + this.width() * e,
                i = [];
            for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
            this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
        }
    }], e.prototype.initialize = function() {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var b, c, e;
            b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e && this.preloadAutoWidthImages(b)
        }
        this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
    }, e.prototype.setup = function() {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c ? (a.each(c, function(a) {
            b >= a && a > d && (d = Number(a))
        }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, e.prototype.optionsLogic = function() {
        this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
        var c = this.trigger("prepare", {
            content: b
        });
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
            content: c.data
        }), c.data
    }, e.prototype.update = function() {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
                return this[a]
            }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
        this._invalidated = {}, !this.is("valid") && this.enter("valid")
    }, e.prototype.width = function(a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, e.prototype.refresh = function() {
        this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
    }, e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.$element.is(":visible") ? (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized"))) : !1 : !1
    }, e.prototype.registerEventHandlers = function() {
        a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1
        })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    }, e.prototype.onDragStart = function(b) {
        var d = null;
        3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
            x: d[16 === d.length ? 12 : 4],
            y: d[16 === d.length ? 13 : 5]
        }) : (d = this.$stage.position(), d = {
            x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
            y: d.top
        }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
        }, this)))
    }, e.prototype.onDragMove = function(a) {
        var b = null,
            c = null,
            d = null,
            e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this._drag.stage.start, e);
        this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), c = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x))
    }, e.prototype.onDragEnd = function(b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)),
            e = this._drag.stage.current,
            f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
        a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
            return !1
        })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    }, e.prototype.closest = function(b, c) {
        var d = -1,
            e = 30,
            f = this.width(),
            g = this.coordinates();
        return this.settings.freeDrag || a.each(g, a.proxy(function(a, h) {
            return b > h - e && h + e > b ? d = a : this.op(b, "<", h) && this.op(b, ">", g[a + 1] || h - f) && (d = "left" === c ? a + 1 : a), -1 === d
        }, this)), this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())), d
    }, e.prototype.animate = function(b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px,0px)",
            transition: this.speed() / 1e3 + "s"
        }) : c ? this.$stage.animate({
            left: b + "px"
        }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
            left: b + "px"
        })
    }, e.prototype.is = function(a) {
        return this._states.current[a] && this._states.current[a] > 0
    }, e.prototype.current = function(a) {
        if (a === d) return this._current;
        if (0 === this._items.length) return d;
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, e.prototype.invalidate = function(b) {
        return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function(a, b) {
            return b
        })
    }, e.prototype.reset = function(a) {
        a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(b, c) {
        var e = this._items.length,
            f = c ? 0 : this._clones.length;
        return !a.isNumeric(b) || 1 > e ? b = d : (0 > b || b >= e + f) && (b = ((b - f / 2) % e + e) % e + f / 2), b
    }, e.prototype.relative = function(a) {
        return a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
        var b, c = this.settings,
            d = this._coordinates.length,
            e = Math.abs(this._coordinates[d - 1]) - this._width,
            f = -1;
        if (c.loop) d = this._clones.length / 2 + this._items.length - 1;
        else if (c.autoWidth || c.merge)
            for (; d - f > 1;) Math.abs(this._coordinates[b = d + f >> 1]) < e ? f = b : d = b;
        else d = c.center ? this._items.length - 1 : this._items.length - c.items;
        return a && (d -= this._clones.length / 2), Math.max(d, 0)
    }, e.prototype.minimum = function(a) {
        return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
        return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
        return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function(a) {
                return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
            };
        return b === d ? a.map(this._clones, function(a, b) {
            return f(b)
        }) : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null
        })
    }, e.prototype.speed = function(a) {
        return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
        var c = null;
        return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
            return this.coordinates(b)
        }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
    }, e.prototype.duration = function(a, b, c) {
        return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(a, b) {
        var c = this.current(),
            d = null,
            e = a - this.relative(c),
            f = (e > 0) - (0 > e),
            g = this._items.length,
            h = this.minimum(),
            i = this.maximum();
        this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, d = ((a - h) % g + g) % g + h, d !== a && i >= d - e && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.$element.is(":visible") && this.update()
    }, e.prototype.next = function(a) {
        a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
        a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.onTransitionEnd = function(a) {
        return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.leave("animating"), void this.trigger("translated"))
    }, e.prototype.viewport = function() {
        var d;
        if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
        else if (b.innerWidth) d = b.innerWidth;
        else {
            if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
            d = c.documentElement.clientWidth
        }
        return d
    }, e.prototype.replace = function(b) {
        this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
            return 1 === this.nodeType
        }).each(a.proxy(function(a, b) {
            b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(b, c) {
        var e = this.relative(this._current);
        c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
            content: b,
            position: c
        }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
            content: b,
            position: c
        })
    }, e.prototype.remove = function(a) {
        a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    }, e.prototype.preloadAutoWidthImages = function(b) {
        b.each(a.proxy(function(b, c) {
            this.enter("pre-loading"), c = a(c), a(new Image).one("load", a.proxy(function(a) {
                c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    }, e.prototype.destroy = function() {
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), this.settings.responsive !== !1 && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) this._plugins[d].destroy();
        this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
    }, e.prototype.op = function(a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d ? a > c : c > a;
            case ">":
                return d ? c > a : a > c;
            case ">=":
                return d ? c >= a : a >= c;
            case "<=":
                return d ? a >= c : c >= a
        }
    }, e.prototype.on = function(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d, f, g) {
        var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            i = a.camelCase(a.grep(["on", b, d], function(a) {
                return a
            }).join("-").toLowerCase()),
            j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, h, c));
        return this._supress[b] || (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({
            type: e.Type.Event,
            name: b
        }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j
    }, e.prototype.enter = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++
        }, this))
    }, e.prototype.leave = function(b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function(a, b) {
            this._states.current[b]--
        }, this))
    }, e.prototype.register = function(b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
                var c = a.event.special[b.name]._default;
                a.event.special[b.name]._default = function(a) {
                    return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments)
                }, a.event.special[b.name].owl = !0
            }
        } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function(c, d) {
            return a.inArray(c, this._states.tags[b.name]) === d
        }, this)))
    }, e.prototype.suppress = function(b) {
        a.each(b, a.proxy(function(a, b) {
            this._supress[b] = !0
        }, this))
    }, e.prototype.release = function(b) {
        a.each(b, a.proxy(function(a, b) {
            delete this._supress[b]
        }, this))
    }, e.prototype.pointer = function(a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c
    }, e.prototype.difference = function(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }, a.fn.owlCarousel = function(b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var d = a(this),
                f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(b, c) {
                f.register({
                    type: e.Type.Event,
                    name: c
                }), f.$element.on(c + ".owl.carousel.core", a.proxy(function(a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    }, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._interval = null, this._visible = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoRefresh && this.watch()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    }, e.prototype.watch = function() {
        this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
    }, e.prototype.refresh = function() {
        this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    }, e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": a.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
                    for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function(a, b) {
                            this.load(b)
                        }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f)), h), f++
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1
    }, e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
            e = d && d.find(".owl-lazy");
        !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
            var e, f = a(d),
                g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
            this._core.trigger("load", {
                element: f,
                url: g
            }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
                f.css("opacity", 1), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
                f.css({
                    "background-image": "url(" + g + ")",
                    opacity: "1"
                }), this._core.trigger("loaded", {
                    element: f,
                    url: g
                }, "lazy")
            }, this), e.src = g)
        }, this)), this._loaded.push(d.get(0)))
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && "position" == a.property.name && this.update()
            }, this),
            "loaded.owl.lazy": a.proxy(function(a) {
                a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    }, e.prototype.update = function() {
        var b = this._core._current,
            c = b + this._core.settings.items,
            d = this._core.$stage.children().toArray().slice(b, c);
        heights = [], maxheight = 0, a.each(d, function(b, c) {
            heights.push(a(c).height())
        }), maxheight = Math.max.apply(null, heights), this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._videos = {}, this._playing = null, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.register({
                    type: "state",
                    name: "playing",
                    tags: ["interacting"]
                })
            }, this),
            "resize.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault()
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" === a.property.name && this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find(".owl-video");
                    c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
            this.play(a)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    }, e.prototype.fetch = function(a, b) {
        var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
            d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
            e = a.attr("data-width") || this._core.settings.videoWidth,
            f = a.attr("data-height") || this._core.settings.videoHeight,
            g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
        else {
            if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            c = "vimeo"
        }
        d = d[6], this._videos[g] = {
            type: c,
            id: d,
            width: e,
            height: f
        }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, e.prototype.thumbnail = function(b, c) {
        var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
            h = b.find("img"),
            i = "src",
            j = "",
            k = this._core.settings,
            l = function(a) {
                e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
            };
        return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(a) {
                f = a[0].thumbnail_large, l(f)
            }
        }))
    }, e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
    }, e.prototype.play = function(b) {
        var c, d = a(b.target),
            e = d.closest("." + this._core.settings.itemClass),
            f = this._videos[e.attr("data-video")],
            g = f.width || "100%",
            h = f.height || this._core.$stage.height();
        this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), "youtube" === f.type ? c = '<iframe width="' + g + '" height="' + h + '" src="http://www.youtube.com/embed/' + f.id + "?autoplay=1&v=" + f.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === f.type && (c = '<iframe src="http://player.vimeo.com/video/' + f.id + '?autoplay=1" width="' + g + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), a('<div class="owl-video-frame">' + c + "</div>").insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"))
    }, e.prototype.isInFullScreen = function() {
        var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame")
    }, e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
            "change.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
                a.namespace && (this.swapping = "translated" == a.type)
            }, this),
            "translate.owl.carousel": a.proxy(function(a) {
                a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    }, e.prototype.swap = function() {
        if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
            this.core.speed(0);
            var b, c = a.proxy(this.clear, this),
                d = this.core.$stage.children().eq(this.previous),
                e = this.core.$stage.children().eq(this.next),
                f = this.core.settings.animateIn,
                g = this.core.settings.animateOut;
            this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f))
        }
    }, e.prototype.clear = function(b) {
        a(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
    }, e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    var e = function(b) {
        this._core = b, this._interval = null, this._paused = !1, this._handlers = {
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "settings" === a.property.name && (this._core.settings.autoplay ? this.play() : this.stop())
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.autoplay && this.play()
            }, this),
            "play.owl.autoplay": a.proxy(function(a, b, c) {
                a.namespace && this.play(b, c)
            }, this),
            "stop.owl.autoplay": a.proxy(function(a) {
                a.namespace && this.stop()
            }, this),
            "mouseover.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
            }, this),
            "mouseleave.owl.autoplay": a.proxy(function() {
                this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
            }, this)
        }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, e.prototype.play = function(d, e) {
        this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._interval = b.setInterval(a.proxy(function() {
            this._paused || this._core.is("busy") || this._core.is("interacting") || c.hidden || this._core.next(e || this._core.settings.autoplaySpeed)
        }, this), d || this._core.settings.autoplayTimeout))
    }, e.prototype.stop = function() {
        this._core.is("rotating") && (b.clearInterval(this._interval), this._core.leave("rotating"))
    }, e.prototype.pause = function() {
        this._core.is("rotating") && (this._paused = !0)
    }, e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(b) {
        this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": a.proxy(function(b) {
                b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot") + "</div>")
            }, this),
            "added.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop())
            }, this),
            "remove.owl.carousel": a.proxy(function(a) {
                a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1)
            }, this),
            "changed.owl.carousel": a.proxy(function(a) {
                a.namespace && "position" == a.property.name && this.draw()
            }, this),
            "initialized.owl.carousel": a.proxy(function(a) {
                a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
            }, this),
            "refreshed.owl.carousel": a.proxy(function(a) {
                a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1
    }, e.prototype.initialize = function() {
        var b, c = this._core.settings;
        this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.prev(c.navSpeed)
        }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function(a) {
            this.next(c.navSpeed)
        }, this)), c.dotsData || (this._templates = [a("<div>").addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", a.proxy(function(b) {
            var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
            b.preventDefault(), this.to(d, c.dotsSpeed)
        }, this));
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this)
    }, e.prototype.destroy = function() {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, e.prototype.update = function() {
        var a, b, c, d = this._core.clones().length / 2,
            e = d + this._core.items().length,
            f = this._core.maximum(!0),
            g = this._core.settings,
            h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy)
            for (this._pages = [], a = d, b = 0, c = 0; e > a; a++) {
                if (b >= h || 0 === b) {
                    if (this._pages.push({
                            start: Math.min(f, a - d),
                            end: a - d + h - 1
                        }), Math.min(f, a - d) === f) break;
                    b = 0, ++c
                }
                b += this._core.mergers(this._core.relative(a))
            }
    }, e.prototype.draw = function() {
        var b, c = this._core.settings,
            d = this._core.items().length <= c.items,
            e = this._core.relative(this._core.current()),
            f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : 0 > b && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"))
    }, e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
            index: a.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        }
    }, e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a.grep(this._pages, a.proxy(function(a, c) {
            return a.start <= b && a.end >= b
        }, this)).pop()
    }, e.prototype.getPosition = function(b) {
        var c, d, e = this._core.settings;
        return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, e.prototype.to = function(b, c, d) {
        var e;
        d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    "use strict";
    var e = function(c) {
        this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": a.proxy(function(c) {
                c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": a.proxy(function(b) {
                if (b.namespace) {
                    var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                    if (!c) return;
                    this._hashes[c] = b.content
                }
            }, this),
            "changed.owl.carousel": a.proxy(function(c) {
                if (c.namespace && "position" === c.property.name) {
                    var d = this._core.items(this._core.relative(this._core.current())),
                        e = a.map(this._hashes, function(a, b) {
                            return a === d ? b : null
                        }).join();
                    if (!e || b.location.hash.slice(1) === e) return;
                    b.location.hash = e
                }
            }, this)
        }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function(a) {
            var c = b.location.hash.substring(1),
                e = this._core.$stage.children(),
                f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    }, e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document),
function(a, b, c, d) {
    function e(b, c) {
        var e = !1,
            f = b.charAt(0).toUpperCase() + b.slice(1);
        return a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
            return g[b] !== d ? (e = c ? b : !0, !1) : void 0
        }), e
    }

    function f(a) {
        return e(a, !0)
    }
    var g = a("<support>").get(0).style,
        h = "Webkit Moz O ms".split(" "),
        i = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        },
        j = {
            csstransforms: function() {
                return !!e("transform")
            },
            csstransforms3d: function() {
                return !!e("perspective")
            },
            csstransitions: function() {
                return !!e("transition")
            },
            cssanimations: function() {
                return !!e("animation")
            }
        };
    j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
}(window.Zepto || window.jQuery, window, document);
(function(b) {
    b.gritter = {};
    b.gritter.options = {
        position: "",
        class_name: "",
        fade_in_speed: "medium",
        fade_out_speed: 1000,
        time: 6000
    };
    b.gritter.add = function(f) {
        try {
            return a.add(f || {})
        } catch (d) {
            var c = "Gritter Error: " + d;
            (typeof(console) != "undefined" && console.error) ? console.error(c, f): alert(c)
        }
    };
    b.gritter.remove = function(d, c) {
        a.removeSpecific(d, c || {})
    };
    b.gritter.removeAll = function(c) {
        a.stop(c || {})
    };
    var a = {
        position: "",
        fade_in_speed: "",
        fade_out_speed: "",
        time: "",
        _custom_timer: 0,
        _item_count: 0,
        _is_setup: 0,
        _tpl_close: '<a class="gritter-close" href="#" tabindex="1">Close Notification</a>',
        _tpl_title: '<span class="gritter-title">[[title]]</span>',
        _tpl_item: '<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',
        _tpl_wrap: '<div id="gritter-notice-wrapper"></div>',
        add: function(g) {
            if (typeof(g) == "string") {
                g = {
                    text: g
                }
            }
            if (g.text === null) {
                throw 'You must supply "text" parameter.'
            }
            if (!this._is_setup) {
                this._runSetup()
            }
            var k = g.title,
                n = g.text,
                e = g.image || "",
                l = g.sticky || false,
                m = g.class_name || b.gritter.options.class_name,
                j = b.gritter.options.position,
                d = g.time || "";
            this._verifyWrapper();
            this._item_count++;
            var f = this._item_count,
                i = this._tpl_item;
            b(["before_open", "after_open", "before_close", "after_close"]).each(function(p, q) {
                a["_" + q + "_" + f] = (b.isFunction(g[q])) ? g[q] : function() {}
            });
            this._custom_timer = 0;
            if (d) {
                this._custom_timer = d
            }
            var c = (e != "") ? '<img src="' + e + '" class="gritter-image" />' : "",
                h = (e != "") ? "gritter-with-image" : "gritter-without-image";
            if (k) {
                k = this._str_replace("[[title]]", k, this._tpl_title)
            } else {
                k = ""
            }
            i = this._str_replace(["[[title]]", "[[text]]", "[[close]]", "[[image]]", "[[number]]", "[[class_name]]", "[[item_class]]"], [k, n, this._tpl_close, c, this._item_count, h, m], i);
            if (this["_before_open_" + f]() === false) {
                return false
            }
            b("#gritter-notice-wrapper").addClass(j).append(i);
            var o = b("#gritter-item-" + this._item_count);
            o.fadeIn(this.fade_in_speed, function() {
                a["_after_open_" + f](b(this))
            });
            if (!l) {
                this._setFadeTimer(o, f)
            }
            b(o).bind("mouseenter mouseleave", function(p) {
                if (p.type == "mouseenter") {
                    if (!l) {
                        a._restoreItemIfFading(b(this), f)
                    }
                } else {
                    if (!l) {
                        a._setFadeTimer(b(this), f)
                    }
                }
                a._hoverState(b(this), p.type)
            });
            b(o).find(".gritter-close").click(function() {
                a.removeSpecific(f, {}, null, true);
                return false;
            });
            return f
        },
        _countRemoveWrapper: function(c, d, f) {
            d.remove();
            this["_after_close_" + c](d, f);
            if (b(".gritter-item-wrapper").length == 0) {
                b("#gritter-notice-wrapper").remove()
            }
        },
        _fade: function(g, d, j, f) {
            var j = j || {},
                i = (typeof(j.fade) != "undefined") ? j.fade : true,
                c = j.speed || this.fade_out_speed,
                h = f;
            this["_before_close_" + d](g, h);
            if (f) {
                g.unbind("mouseenter mouseleave")
            }
            if (i) {
                g.animate({
                    opacity: 0
                }, c, function() {
                    g.animate({
                        height: 0
                    }, 300, function() {
                        a._countRemoveWrapper(d, g, h)
                    })
                })
            } else {
                this._countRemoveWrapper(d, g)
            }
        },
        _hoverState: function(d, c) {
            if (c == "mouseenter") {
                d.addClass("hover");
                d.find(".gritter-close").show()
            } else {
                d.removeClass("hover");
                d.find(".gritter-close").hide()
            }
        },
        removeSpecific: function(c, g, f, d) {
            if (!f) {
                var f = b("#gritter-item-" + c)
            }
            this._fade(f, c, g || {}, d)
        },
        _restoreItemIfFading: function(d, c) {
            clearTimeout(this["_int_id_" + c]);
            d.stop().css({
                opacity: "",
                height: ""
            })
        },
        _runSetup: function() {
            for (opt in b.gritter.options) {
                this[opt] = b.gritter.options[opt]
            }
            this._is_setup = 1
        },
        _setFadeTimer: function(f, d) {
            var c = (this._custom_timer) ? this._custom_timer : this.time;
            this["_int_id_" + d] = setTimeout(function() {
                a._fade(f, d)
            }, c)
        },
        stop: function(e) {
            var c = (b.isFunction(e.before_close)) ? e.before_close : function() {};
            var f = (b.isFunction(e.after_close)) ? e.after_close : function() {};
            var d = b("#gritter-notice-wrapper");
            c(d);
            d.fadeOut(function() {
                b(this).remove();
                f()
            })
        },
        _str_replace: function(v, e, o, n) {
            var k = 0,
                h = 0,
                t = "",
                m = "",
                g = 0,
                q = 0,
                l = [].concat(v),
                c = [].concat(e),
                u = o,
                d = c instanceof Array,
                p = u instanceof Array;
            u = [].concat(u);
            if (n) {
                this.window[n] = 0
            }
            for (k = 0, g = u.length; k < g; k++) {
                if (u[k] === "") {
                    continue
                }
                for (h = 0, q = l.length; h < q; h++) {
                    t = u[k] + "";
                    m = d ? (c[h] !== undefined ? c[h] : "") : c[0];
                    u[k] = (t).split(l[h]).join(m);
                    if (n && u[k] !== t) {
                        this.window[n] += (t.length - u[k].length) / l[h].length
                    }
                }
            }
            return p ? u : u[0]
        },
        _verifyWrapper: function() {
            if (b("#gritter-notice-wrapper").length == 0) {
                b("body").append(this._tpl_wrap)
            }
        }
    }
})(jQuery);
/*! jQuery Validation Plugin - v1.19.2 - 5/23/2020 https://jqueryvalidation.org/ Copyright (c) 2020 Jörn Zaefferer; Licensed MIT */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) {
                c.submitButton = b.currentTarget, a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0)
            }), this.on("submit.validate", function(b) {
                function d() {
                    var d, e;
                    return c.submitButton && (c.settings.submitHandler || c.formSubmitted) && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), !(c.settings.submitHandler && !c.settings.debug) || (e = c.settings.submitHandler.call(c, c.currentForm, b), d && d.remove(), void 0 !== e && e)
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        },
        valid: function() {
            var b, c, d;
            return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() {
                b = c.element(this) && b, b || (d = d.concat(c.errorList))
            }), c.errorList = d), b
        },
        rules: function(b, c) {
            var d, e, f, g, h, i, j = this[0],
                k = "undefined" != typeof this.attr("contenteditable") && "false" !== this.attr("contenteditable");
            if (null != j && (!j.form && k && (j.form = this.closest("form")[0], j.name = this.attr("name")), null != j.form)) {
                if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                        break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(a, b) {
                            i[b] = f[b], delete f[b]
                        }), i) : (delete e[j.name], f)
                }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                    required: h
                }, g)), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                    remote: h
                })), g
            }
        }
    });
    var b = function(a) {
        return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    };
    a.extend(a.expr.pseudos || a.expr[":"], {
        blank: function(c) {
            return !b("" + a(c).val())
        },
        filled: function(c) {
            var d = a(c).val();
            return null !== d && !!b("" + d)
        },
        unchecked: function(b) {
            return !a(b).prop("checked")
        }
    }), a.validator = function(b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function(b, c) {
        return 1 === arguments.length ? function() {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c)
        } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
                return c
            })
        }), b)
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) {
                this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
            },
            onfocusout: function(a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
            },
            onkeyup: function(b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || a.inArray(c.keyCode, d) !== -1 || (b.name in this.submitted || b.name in this.invalid) && this.element(b)
            },
            onclick: function(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            },
            unhighlight: function(b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}."),
            step: a.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function b(b) {
                    var c = "undefined" != typeof a(this).attr("contenteditable") && "false" !== a(this).attr("contenteditable");
                    if (!this.form && c && (this.form = a(this).closest("form")[0], this.name = a(this).attr("name")), d === this.form) {
                        var e = a.data(this.form, "validator"),
                            f = "on" + b.type.replace(/^validate/, ""),
                            g = e.settings;
                        g[f] && !a(this).is(g.ignore) && g[f].call(e, this, b)
                    }
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.currentForm,
                    e = this.groups = {};
                a.each(this.settings.groups, function(b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
                        e[c] = b
                    })
                }), c = this.settings.rules, a.each(c, function(b, d) {
                    c[b] = a.validator.normalizeRule(d)
                }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function(b) {
                var c, d, e = this.clean(b),
                    f = this.validationTargetFor(e),
                    g = this,
                    h = !0;
                return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) {
                    b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = g.check(e) && h))
                }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h
            },
            showErrors: function(b) {
                if (b) {
                    var c = this;
                    a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) {
                        return {
                            message: a,
                            element: c.findByName(b)[0]
                        }
                    }), this.successList = a.grep(this.successList, function(a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(b)
            },
            resetElements: function(a) {
                var b;
                if (this.settings.unhighlight)
                    for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(a) {
                var b, c = 0;
                for (b in a) void 0 !== a[b] && null !== a[b] && a[b] !== !1 && c++;
                return c
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").trigger("focus").trigger("focusin")
                } catch (b) {}
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function(a) {
                    return a.element.name === b.name
                }).length && b
            },
            elements: function() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var d = this.name || a(this).attr("name"),
                        e = "undefined" != typeof a(this).attr("contenteditable") && "false" !== a(this).attr("contenteditable");
                    return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), e && (this.form = a(this).closest("form")[0], this.name = d), this.form === b.currentForm && (!(d in c || !b.objectLength(a(this).rules())) && (c[d] = !0, !0))
                })
            },
            clean: function(b) {
                return a(b)[0]
            },
            errors: function() {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([])
            },
            reset: function() {
                this.resetInternals(), this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(a) {
                this.reset(), this.toHide = this.errorsFor(a)
            },
            elementValue: function(b) {
                var c, d, e = a(b),
                    f = b.type,
                    g = "undefined" != typeof e.attr("contenteditable") && "false" !== e.attr("contenteditable");
                return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = g ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c)
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f, g = a(b).rules(),
                    h = a.map(g, function(a, b) {
                        return b
                    }).length,
                    i = !1,
                    j = this.elementValue(b);
                "function" == typeof g.normalizer ? f = g.normalizer : "function" == typeof this.settings.normalizer && (f = this.settings.normalizer), f && (j = f.call(b, j), delete g.normalizer);
                for (d in g) {
                    e = {
                        method: d,
                        parameters: g[d]
                    };
                    try {
                        if (c = a.validator.methods[d].call(this, j, b, e.parameters), "dependency-mismatch" === c && 1 === h) {
                            i = !0;
                            continue
                        }
                        if (i = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1
                    } catch (k) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", k), k instanceof TypeError && (k.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), k
                    }
                }
                if (!i) return this.objectLength(g) && this.successList.push(b), !0
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
            },
            customMessage: function(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a]
            },
            defaultMessage: function(b, c) {
                "string" == typeof c && (c = {
                    method: c
                });
                var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
                    e = /\$?\{(\d+)\}/g;
                return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d
            },
            formatAndAdd: function(a, b) {
                var c = this.defaultMessage(a, b);
                this.errorList.push({
                    message: c,
                    element: a,
                    method: b.method
                }), this.errorMap[a.name] = c, this.submitted[a.name] = c
            },
            addWrapper: function(a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
            },
            defaultShowErrors: function() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(b, c) {
                var d, e, f, g, h = this.errorsFor(b),
                    i = this.idOrName(b),
                    j = a(b).attr("aria-describedby");
                h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) {
                    c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"))
                })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h)
            },
            errorsFor: function(b) {
                var c = this.escapeCssMeta(this.idOrName(b)),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e)
            },
            escapeCssMeta: function(a) {
                return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function(b) {
                return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0]
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function(b) {
                return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']")
            },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function(a, b) {
                return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b)
            },
            dependTypes: {
                "boolean": function(a) {
                    return a
                },
                string: function(b, c) {
                    return !!a(b, c.form).length
                },
                "function": function(a, b) {
                    return a(b)
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function(b) {
                this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0)
            },
            stopRequest: function(b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.submitButton && a("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(b, c) {
                return c = "string" == typeof c && c || "remote", a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, {
                        method: c
                    })
                })
            },
            destroy: function() {
                this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function() {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            }), c
        },
        normalizeAttributeRule: function(a, b, c, d) {
            /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0)
        },
        attributeRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        },
        dataRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), "" === d && (d = !0), this.normalizeAttributeRule(e, g, c, d);
            return e
        },
        staticRules: function(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 === e.param || e.param : (a.data(c.form, "validator").resetElements(a(c)), delete b[d])
                }
            }), a.each(b, function(d, e) {
                b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e
            }), a.each(["minlength", "maxlength"], function() {
                b[this] && (b[this] = Number(b[this]))
            }), a.each(["rangelength", "range"], function() {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        },
        normalizeRule: function(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function() {
                    c[this] = !0
                }), b = c
            }
            return b
        },
        addMethod: function(b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        },
        methods: {
            required: function(b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : void 0 !== b && null !== b && b.length > 0
            },
            email: function(a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
            },
            url: function(a, b) {
                return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a)
            },
            date: function() {
                var a = !1;
                return function(b, c) {
                    return a || (a = !0, this.settings.debug && window.console && console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")), this.optional(c) || !/Invalid|NaN/.test(new Date(b).toString())
                }
            }(),
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
            },
            number: function(a, b) {
                return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            minlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d
            },
            maxlength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e <= d
            },
            rangelength: function(b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d[0] && e <= d[1]
            },
            min: function(a, b, c) {
                return this.optional(b) || a >= c
            },
            max: function(a, b, c) {
                return this.optional(b) || a <= c
            },
            range: function(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            },
            step: function(b, c, d) {
                var e, f = a(c).attr("type"),
                    g = "Step attribute on input type " + f + " is not supported.",
                    h = ["text", "number", "range"],
                    i = new RegExp("\\b" + f + "\\b"),
                    j = f && !i.test(h.join()),
                    k = function(a) {
                        var b = ("" + a).match(/(?:\.(\d+))?$/);
                        return b && b[1] ? b[1].length : 0
                    },
                    l = function(a) {
                        return Math.round(a * Math.pow(10, e))
                    },
                    m = !0;
                if (j) throw new Error(g);
                return e = k(d), (k(b) > e || l(b) % l(d) !== 0) && (m = !1), this.optional(c) || m
            },
            equalTo: function(b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                    a(c).valid()
                }), b === e.val()
            },
            remote: function(b, c, d, e) {
                if (this.optional(c)) return "dependency-mismatch";
                e = "string" == typeof e && e || "remote";
                var f, g, h, i = this.previousValue(c, e);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && {
                    url: d
                } || d, h = a.param(a.extend({
                    data: b
                }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: g,
                    context: f.currentForm,
                    success: function(a) {
                        var d, g, h, j = a === !0 || "true" === a;
                        f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, {
                            method: e,
                            parameters: b
                        }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    });
    var c, d = {};
    return a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, c) {
        var e = a.port;
        "abort" === a.mode && (d[e] && d[e].abort(), d[e] = c)
    }) : (c = a.ajax, a.ajax = function(b) {
        var e = ("mode" in b ? b : a.ajaxSettings).mode,
            f = ("port" in b ? b : a.ajaxSettings).port;
        return "abort" === e ? (d[f] && d[f].abort(), d[f] = c.apply(this, arguments), d[f]) : c.apply(this, arguments)
    }), a
}); // Magnific Popup v1.0.1 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+retina+imagezoom+fastclick
(function(a) {
    typeof define == "function" && define.amd ? define(["jquery"], a) : typeof exports == "object" ? a(require("jquery")) : a(window.jQuery || window.Zepto)
})(function(a) {
    var b = "Close",
        c = "BeforeClose",
        d = "AfterClose",
        e = "BeforeAppend",
        f = "MarkupParse",
        g = "Open",
        h = "Change",
        i = "mfp",
        j = "." + i,
        k = "mfp-ready",
        l = "mfp-removing",
        m = "mfp-prevent-close",
        n, o = function() {},
        p = !!window.jQuery,
        q, r = a(window),
        s, t, u, v, w = function(a, b) {
            n.ev.on(i + a + j, b)
        },
        x = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        y = function(b, c) {
            n.ev.triggerHandler(i + b, c), n.st.callbacks && (b = b.charAt(0).toLowerCase() + b.slice(1), n.st.callbacks[b] && n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]))
        },
        z = function(b) {
            if (b !== v || !n.currTemplate.closeBtn) n.currTemplate.closeBtn = a(n.st.closeMarkup.replace("%title%", n.st.tClose)), v = b;
            return n.currTemplate.closeBtn
        },
        A = function() {
            a.magnificPopup.instance || (n = new o, n.init(), a.magnificPopup.instance = n)
        },
        B = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (a.transition !== undefined) return !0;
            while (b.length)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    o.prototype = {
        constructor: o,
        init: function() {
            var b = navigator.appVersion;
            n.isIE7 = b.indexOf("MSIE 7.") !== -1, n.isIE8 = b.indexOf("MSIE 8.") !== -1, n.isLowIE = n.isIE7 || n.isIE8, n.isAndroid = /android/gi.test(b), n.isIOS = /iphone|ipad|ipod/gi.test(b), n.supportsTransition = B(), n.probablyMobile = n.isAndroid || n.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), s = a(document), n.popupsCache = {}
        },
        open: function(b) {
            var c;
            if (b.isObj === !1) {
                n.items = b.items.toArray(), n.index = 0;
                var d = b.items,
                    e;
                for (c = 0; c < d.length; c++) {
                    e = d[c], e.parsed && (e = e.el[0]);
                    if (e === b.el[0]) {
                        n.index = c;
                        break
                    }
                }
            } else n.items = a.isArray(b.items) ? b.items : [b.items], n.index = b.index || 0;
            if (n.isOpen) {
                n.updateItemHTML();
                return
            }
            n.types = [], u = "", b.mainEl && b.mainEl.length ? n.ev = b.mainEl.eq(0) : n.ev = s, b.key ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}), n.currTemplate = n.popupsCache[b.key]) : n.currTemplate = {}, n.st = a.extend(!0, {}, a.magnificPopup.defaults, b), n.fixedContentPos = n.st.fixedContentPos === "auto" ? !n.probablyMobile : n.st.fixedContentPos, n.st.modal && (n.st.closeOnContentClick = !1, n.st.closeOnBgClick = !1, n.st.showCloseBtn = !1, n.st.enableEscapeKey = !1), n.bgOverlay || (n.bgOverlay = x("bg").on("click" + j, function() {
                n.close()
            }), n.wrap = x("wrap").attr("tabindex", -1).on("click" + j, function(a) {
                n._checkIfClose(a.target) && n.close()
            }), n.container = x("container", n.wrap)), n.contentContainer = x("content"), n.st.preloader && (n.preloader = x("preloader", n.container, n.st.tLoading));
            var h = a.magnificPopup.modules;
            for (c = 0; c < h.length; c++) {
                var i = h[c];
                i = i.charAt(0).toUpperCase() + i.slice(1), n["init" + i].call(n)
            }
            y("BeforeOpen"), n.st.showCloseBtn && (n.st.closeBtnInside ? (w(f, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), u += " mfp-close-btn-in") : n.wrap.append(z())), n.st.alignTop && (u += " mfp-align-top"), n.fixedContentPos ? n.wrap.css({
                overflow: n.st.overflowY,
                overflowX: "hidden",
                overflowY: n.st.overflowY
            }) : n.wrap.css({
                top: r.scrollTop(),
                position: "absolute"
            }), (n.st.fixedBgPos === !1 || n.st.fixedBgPos === "auto" && !n.fixedContentPos) && n.bgOverlay.css({
                height: s.height(),
                position: "absolute"
            }), n.st.enableEscapeKey && s.on("keyup" + j, function(a) {
                a.keyCode === 27 && n.close()
            }), r.on("resize" + j, function() {
                n.updateSize()
            }), n.st.closeOnContentClick || (u += " mfp-auto-cursor"), u && n.wrap.addClass(u);
            var l = n.wH = r.height(),
                m = {};
            if (n.fixedContentPos && n._hasScrollBar(l)) {
                var o = n._getScrollbarSize();
                o && (m.marginRight = o)
            }
            n.fixedContentPos && (n.isIE7 ? a("body, html").css("overflow", "hidden") : m.overflow = "hidden");
            var p = n.st.mainClass;
            return n.isIE7 && (p += " mfp-ie7"), p && n._addClassToMFP(p), n.updateItemHTML(), y("BuildControls"), a("html").css(m), n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo || a(document.body)), n._lastFocusedEl = document.activeElement, setTimeout(function() {
                n.content ? (n._addClassToMFP(k), n._setFocus()) : n.bgOverlay.addClass(k), s.on("focusin" + j, n._onFocusIn)
            }, 16), n.isOpen = !0, n.updateSize(l), y(g), b
        },
        close: function() {
            if (!n.isOpen) return;
            y(c), n.isOpen = !1, n.st.removalDelay && !n.isLowIE && n.supportsTransition ? (n._addClassToMFP(l), setTimeout(function() {
                n._close()
            }, n.st.removalDelay)) : n._close()
        },
        _close: function() {
            y(b);
            var c = l + " " + k + " ";
            n.bgOverlay.detach(), n.wrap.detach(), n.container.empty(), n.st.mainClass && (c += n.st.mainClass + " "), n._removeClassFromMFP(c);
            if (n.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                n.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            s.off("keyup" + j + " focusin" + j), n.ev.off(j), n.wrap.attr("class", "mfp-wrap").removeAttr("style"), n.bgOverlay.attr("class", "mfp-bg"), n.container.attr("class", "mfp-container"), n.st.showCloseBtn && (!n.st.closeBtnInside || n.currTemplate[n.currItem.type] === !0) && n.currTemplate.closeBtn && n.currTemplate.closeBtn.detach(), n.st.autoFocusLast && n._lastFocusedEl && a(n._lastFocusedEl).focus(), n.currItem = null, n.content = null, n.currTemplate = null, n.prevHeight = 0, y(d)
        },
        updateSize: function(a) {
            if (n.isIOS) {
                var b = document.documentElement.clientWidth / window.innerWidth,
                    c = window.innerHeight * b;
                n.wrap.css("height", c), n.wH = c
            } else n.wH = a || r.height();
            n.fixedContentPos || n.wrap.css("height", n.wH), y("Resize")
        },
        updateItemHTML: function() {
            var b = n.items[n.index];
            n.contentContainer.detach(), n.content && n.content.detach(), b.parsed || (b = n.parseEl(n.index));
            var c = b.type;
            y("BeforeChange", [n.currItem ? n.currItem.type : "", c]), n.currItem = b;
            if (!n.currTemplate[c]) {
                var d = n.st[c] ? n.st[c].markup : !1;
                y("FirstMarkupParse", d), d ? n.currTemplate[c] = a(d) : n.currTemplate[c] = !0
            }
            t && t !== b.type && n.container.removeClass("mfp-" + t + "-holder");
            var e = n["get" + c.charAt(0).toUpperCase() + c.slice(1)](b, n.currTemplate[c]);
            n.appendContent(e, c), b.preloaded = !0, y(h, b), t = b.type, n.container.prepend(n.contentContainer), y("AfterChange")
        },
        appendContent: function(a, b) {
            n.content = a, a ? n.st.showCloseBtn && n.st.closeBtnInside && n.currTemplate[b] === !0 ? n.content.find(".mfp-close").length || n.content.append(z()) : n.content = a : n.content = "", y(e), n.container.addClass("mfp-" + b + "-holder"), n.contentContainer.append(n.content)
        },
        parseEl: function(b) {
            var c = n.items[b],
                d;
            c.tagName ? c = {
                el: a(c)
            } : (d = c.type, c = {
                data: c,
                src: c.src
            });
            if (c.el) {
                var e = n.types;
                for (var f = 0; f < e.length; f++)
                    if (c.el.hasClass("mfp-" + e[f])) {
                        d = e[f];
                        break
                    }
                c.src = c.el.attr("data-mfp-src"), c.src || (c.src = c.el.attr("href"))
            }
            return c.type = d || n.st.type || "inline", c.index = b, c.parsed = !0, n.items[b] = c, y("ElementParse", c), n.items[b]
        },
        addGroup: function(a, b) {
            var c = function(c) {
                c.mfpEl = this, n._openClick(c, a, b)
            };
            b || (b = {});
            var d = "click.magnificPopup";
            b.mainEl = a, b.items ? (b.isObj = !0, a.off(d).on(d, c)) : (b.isObj = !1, b.delegate ? a.off(d).on(d, b.delegate, c) : (b.items = a, a.off(d).on(d, c)))
        },
        _openClick: function(b, c, d) {
            var e = d.midClick !== undefined ? d.midClick : a.magnificPopup.defaults.midClick;
            if (!e && (b.which === 2 || b.ctrlKey || b.metaKey || b.altKey || b.shiftKey)) return;
            var f = d.disableOn !== undefined ? d.disableOn : a.magnificPopup.defaults.disableOn;
            if (f)
                if (a.isFunction(f)) {
                    if (!f.call(n)) return !0
                } else if (r.width() < f) return !0;
            b.type && (b.preventDefault(), n.isOpen && b.stopPropagation()), d.el = a(b.mfpEl), d.delegate && (d.items = c.find(d.delegate)), n.open(d)
        },
        updateStatus: function(a, b) {
            if (n.preloader) {
                q !== a && n.container.removeClass("mfp-s-" + q), !b && a === "loading" && (b = n.st.tLoading);
                var c = {
                    status: a,
                    text: b
                };
                y("UpdateStatus", c), a = c.status, b = c.text, n.preloader.html(b), n.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), n.container.addClass("mfp-s-" + a), q = a
            }
        },
        _checkIfClose: function(b) {
            if (a(b).hasClass(m)) return;
            var c = n.st.closeOnContentClick,
                d = n.st.closeOnBgClick;
            if (c && d) return !0;
            if (!n.content || a(b).hasClass("mfp-close") || n.preloader && b === n.preloader[0]) return !0;
            if (b !== n.content[0] && !a.contains(n.content[0], b)) {
                if (d && a.contains(document, b)) return !0
            } else if (c) return !0;
            return !1
        },
        _addClassToMFP: function(a) {
            n.bgOverlay.addClass(a), n.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), n.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (n.isIE7 ? s.height() : document.body.scrollHeight) > (a || r.height())
        },
        _setFocus: function() {
            (n.st.focus ? n.content.find(n.st.focus).eq(0) : n.wrap).focus()
        },
        _onFocusIn: function(b) {
            if (b.target !== n.wrap[0] && !a.contains(n.wrap[0], b.target)) return n._setFocus(), !1
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(f, [b, c, d]), a.each(c, function(a, c) {
                if (c === undefined || c === !1) return !0;
                e = a.split("_");
                if (e.length > 1) {
                    var d = b.find(j + "-" + e[0]);
                    if (d.length > 0) {
                        var f = e[1];
                        f === "replaceWith" ? d[0] !== c[0] && d.replaceWith(c) : f === "img" ? d.is("img") ? d.attr("src", c) : d.replaceWith('<img src="' + c + '" class="' + d.attr("class") + '" />') : d.attr(e[1], c)
                    }
                } else b.find(j + "-" + a).html(c)
            })
        },
        _getScrollbarSize: function() {
            if (n.scrollbarSize === undefined) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), n.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return n.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: o.prototype,
        modules: [],
        open: function(b, c) {
            return A(), b ? b = a.extend(!0, {}, b) : b = {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function(b) {
        A();
        var c = a(this);
        if (typeof b == "string")
            if (b === "open") {
                var d, e = p ? c.data("magnificPopup") : c[0].magnificPopup,
                    f = parseInt(arguments[1], 10) || 0;
                e.items ? d = e.items[f] : (d = c, e.delegate && (d = d.find(e.delegate)), d = d.eq(f)), n._openClick({
                    mfpEl: d
                }, c, e)
            } else n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1));
        else b = a.extend(!0, {}, b), p ? c.data("magnificPopup", b) : c[0].magnificPopup = b, n.addGroup(c, b);
        return c
    };
    var C = "inline",
        D, E, F, G = function() {
            F && (E.after(F.addClass(D)).detach(), F = null)
        };
    a.magnificPopup.registerModule(C, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                n.types.push(C), w(b + "." + C, function() {
                    G()
                })
            },
            getInline: function(b, c) {
                G();
                if (b.src) {
                    var d = n.st.inline,
                        e = a(b.src);
                    if (e.length) {
                        var f = e[0].parentNode;
                        f && f.tagName && (E || (D = d.hiddenClass, E = x(D), D = "mfp-" + D), F = e.after(E).detach().removeClass(D)), n.updateStatus("ready")
                    } else n.updateStatus("error", d.tNotFound), e = a("<div>");
                    return b.inlineElement = e, e
                }
                return n.updateStatus("ready"), n._parseMarkup(c, {}, b), c
            }
        }
    });
    var H = "ajax",
        I, J = function() {
            I && a(document.body).removeClass(I)
        },
        K = function() {
            J(), n.req && n.req.abort()
        };
    a.magnificPopup.registerModule(H, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                n.types.push(H), I = n.st.ajax.cursor, w(b + "." + H, K), w("BeforeChange." + H, K)
            },
            getAjax: function(b) {
                I && a(document.body).addClass(I), n.updateStatus("loading");
                var c = a.extend({
                    url: b.src,
                    success: function(c, d, e) {
                        var f = {
                            data: c,
                            xhr: e
                        };
                        y("ParseAjax", f), n.appendContent(a(f.data), H), b.finished = !0, J(), n._setFocus(), setTimeout(function() {
                            n.wrap.addClass(k)
                        }, 16), n.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        J(), b.finished = b.loadError = !0, n.updateStatus("error", n.st.ajax.tError.replace("%url%", b.src))
                    }
                }, n.st.ajax.settings);
                return n.req = a.ajax(c), ""
            }
        }
    });
    var L, M = function(b) {
        if (b.data && b.data.title !== undefined) return b.data.title;
        var c = n.st.image.titleSrc;
        if (c) {
            if (a.isFunction(c)) return c.call(n, b);
            if (b.el) return b.el.attr(c) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var c = n.st.image,
                    d = ".image";
                n.types.push("image"), w(g + d, function() {
                    n.currItem.type === "image" && c.cursor && a(document.body).addClass(c.cursor)
                }), w(b + d, function() {
                    c.cursor && a(document.body).removeClass(c.cursor), r.off("resize" + j)
                }), w("Resize" + d, n.resizeImage), n.isLowIE && w("AfterChange", n.resizeImage)
            },
            resizeImage: function() {
                var a = n.currItem;
                if (!a || !a.img) return;
                if (n.st.image.verticalFit) {
                    var b = 0;
                    n.isLowIE && (b = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", n.wH - b)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (n.content && n.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var b = 0,
                    c = a.img[0],
                    d = function(e) {
                        L && clearInterval(L), L = setInterval(function() {
                            if (c.naturalWidth > 0) {
                                n._onImageHasSize(a);
                                return
                            }
                            b > 200 && clearInterval(L), b++, b === 3 ? d(10) : b === 40 ? d(50) : b === 100 && d(500)
                        }, e)
                    };
                d(1)
            },
            getImage: function(b, c) {
                var d = 0,
                    e = function() {
                        b && (b.img[0].complete ? (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("ready")), b.hasSize = !0, b.loaded = !0, y("ImageLoadComplete")) : (d++, d < 200 ? setTimeout(e, 100) : f()))
                    },
                    f = function() {
                        b && (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("error", g.tError.replace("%url%", b.src))), b.hasSize = !0, b.loaded = !0, b.loadError = !0)
                    },
                    g = n.st.image,
                    h = c.find(".mfp-img");
                if (h.length) {
                    var i = document.createElement("img");
                    i.className = "mfp-img", b.el && b.el.find("img").length && (i.alt = b.el.find("img").attr("alt")), b.img = a(i).on("load.mfploader", e).on("error.mfploader", f), i.src = b.src, h.is("img") && (b.img = b.img.clone()), i = b.img[0], i.naturalWidth > 0 ? b.hasSize = !0 : i.width || (b.hasSize = !1)
                }
                return n._parseMarkup(c, {
                    title: M(b),
                    img_replaceWith: b.img
                }, b), n.resizeImage(), b.hasSize ? (L && clearInterval(L), b.loadError ? (c.addClass("mfp-loading"), n.updateStatus("error", g.tError.replace("%url%", b.src))) : (c.removeClass("mfp-loading"), n.updateStatus("ready")), c) : (n.updateStatus("loading"), b.loading = !0, b.hasSize || (b.imgHidden = !0, c.addClass("mfp-loading"), n.findImageSize(b)), c)
            }
        }
    });
    var N, O = function() {
        return N === undefined && (N = document.createElement("p").style.MozTransform !== undefined), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a = n.st.zoom,
                    d = ".zoom",
                    e;
                if (!a.enabled || !n.supportsTransition) return;
                var f = a.duration,
                    g = function(b) {
                        var c = b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            d = "all " + a.duration / 1e3 + "s " + a.easing,
                            e = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            },
                            f = "transition";
                        return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, c.css(e), c
                    },
                    h = function() {
                        n.content.css("visibility", "visible")
                    },
                    i, j;
                w("BuildControls" + d, function() {
                    if (n._allowZoom()) {
                        clearTimeout(i), n.content.css("visibility", "hidden"), e = n._getItemToZoom();
                        if (!e) {
                            h();
                            return
                        }
                        j = g(e), j.css(n._getOffset()), n.wrap.append(j), i = setTimeout(function() {
                            j.css(n._getOffset(!0)), i = setTimeout(function() {
                                h(), setTimeout(function() {
                                    j.remove(), e = j = null, y("ZoomAnimationEnded")
                                }, 16)
                            }, f)
                        }, 16)
                    }
                }), w(c + d, function() {
                    if (n._allowZoom()) {
                        clearTimeout(i), n.st.removalDelay = f;
                        if (!e) {
                            e = n._getItemToZoom();
                            if (!e) return;
                            j = g(e)
                        }
                        j.css(n._getOffset(!0)), n.wrap.append(j), n.content.css("visibility", "hidden"), setTimeout(function() {
                            j.css(n._getOffset())
                        }, 16)
                    }
                }), w(b + d, function() {
                    n._allowZoom() && (h(), j && j.remove(), e = null)
                })
            },
            _allowZoom: function() {
                return n.currItem.type === "image"
            },
            _getItemToZoom: function() {
                return n.currItem.hasSize ? n.currItem.img : !1
            },
            _getOffset: function(b) {
                var c;
                b ? c = n.currItem.img : c = n.st.zoom.opener(n.currItem.el || n.currItem);
                var d = c.offset(),
                    e = parseInt(c.css("padding-top"), 10),
                    f = parseInt(c.css("padding-bottom"), 10);
                d.top -= a(window).scrollTop() - e;
                var g = {
                    width: c.width(),
                    height: (p ? c.innerHeight() : c[0].offsetHeight) - f - e
                };
                return O() ? g["-moz-transform"] = g.transform = "translate(" + d.left + "px," + d.top + "px)" : (g.left = d.left, g.top = d.top), g
            }
        }
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function(a) {
            if (n.currTemplate[P]) {
                var b = n.currTemplate[P].find("iframe");
                b.length && (a || (b[0].src = Q), n.isIE8 && b.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                n.types.push(P), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(b + "." + P, function() {
                    R()
                })
            },
            getIframe: function(b, c) {
                var d = b.src,
                    e = n.st.iframe;
                a.each(e.patterns, function() {
                    if (d.indexOf(this.index) > -1) return this.id && (typeof this.id == "string" ? d = d.substr(d.lastIndexOf(this.id) + this.id.length, d.length) : d = this.id.call(this, d)), d = this.src.replace("%id%", d), !1
                });
                var f = {};
                return e.srcAction && (f[e.srcAction] = d), n._parseMarkup(c, f, b), n.updateStatus("ready"), c
            }
        }
    });
    var S = function(a) {
            var b = n.items.length;
            return a > b - 1 ? a - b : a < 0 ? b + a : a
        },
        T = function(a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = n.st.gallery,
                    d = ".mfp-gallery",
                    e = Boolean(a.fn.mfpFastClick);
                n.direction = !0;
                if (!c || !c.enabled) return !1;
                u += " mfp-gallery", w(g + d, function() {
                    c.navigateByImgClick && n.wrap.on("click" + d, ".mfp-img", function() {
                        if (n.items.length > 1) return n.next(), !1
                    }), s.on("keydown" + d, function(a) {
                        a.keyCode === 37 ? n.prev() : a.keyCode === 39 && n.next()
                    })
                }), w("UpdateStatus" + d, function(a, b) {
                    b.text && (b.text = T(b.text, n.currItem.index, n.items.length))
                }), w(f + d, function(a, b, d, e) {
                    var f = n.items.length;
                    d.counter = f > 1 ? T(c.tCounter, e.index, f) : ""
                }), w("BuildControls" + d, function() {
                    if (n.items.length > 1 && c.arrows && !n.arrowLeft) {
                        var b = c.arrowMarkup,
                            d = n.arrowLeft = a(b.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(m),
                            f = n.arrowRight = a(b.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(m),
                            g = e ? "mfpFastClick" : "click";
                        d[g](function() {
                            n.prev()
                        }), f[g](function() {
                            n.next()
                        }), n.isIE7 && (x("b", d[0], !1, !0), x("a", d[0], !1, !0), x("b", f[0], !1, !0), x("a", f[0], !1, !0)), n.container.append(d.add(f))
                    }
                }), w(h + d, function() {
                    n._preloadTimeout && clearTimeout(n._preloadTimeout), n._preloadTimeout = setTimeout(function() {
                        n.preloadNearbyImages(), n._preloadTimeout = null
                    }, 16)
                }), w(b + d, function() {
                    s.off(d), n.wrap.off("click" + d), n.arrowLeft && e && n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(), n.arrowRight = n.arrowLeft = null
                })
            },
            next: function() {
                n.direction = !0, n.index = S(n.index + 1), n.updateItemHTML()
            },
            prev: function() {
                n.direction = !1, n.index = S(n.index - 1), n.updateItemHTML()
            },
            goTo: function(a) {
                n.direction = a >= n.index, n.index = a, n.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a = n.st.gallery.preload,
                    b = Math.min(a[0], n.items.length),
                    c = Math.min(a[1], n.items.length),
                    d;
                for (d = 1; d <= (n.direction ? c : b); d++) n._preloadItem(n.index + d);
                for (d = 1; d <= (n.direction ? b : c); d++) n._preloadItem(n.index - d)
            },
            _preloadItem: function(b) {
                b = S(b);
                if (n.items[b].preloaded) return;
                var c = n.items[b];
                c.parsed || (c = n.parseEl(b)), y("LazyLoad", c), c.type === "image" && (c.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                    c.hasSize = !0
                }).on("error.mfploader", function() {
                    c.hasSize = !0, c.loadError = !0, y("LazyLoadError", c)
                }).attr("src", c.src)), c.preloaded = !0
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
            options: {
                replaceSrc: function(a) {
                    return a.src.replace(/\.\w+$/, function(a) {
                        return "@2x" + a
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var a = n.st.retina,
                            b = a.ratio;
                        b = isNaN(b) ? b() : b, b > 1 && (w("ImageHasSize." + U, function(a, c) {
                            c.img.css({
                                "max-width": c.img[0].naturalWidth / b,
                                width: "100%"
                            })
                        }), w("ElementParse." + U, function(c, d) {
                            d.src = a.replaceSrc(d, b)
                        }))
                    }
                }
            }
        }),
        function() {
            var b = 1e3,
                c = "ontouchstart" in window,
                d = function() {
                    r.off("touchmove" + f + " touchend" + f)
                },
                e = "mfpFastClick",
                f = "." + e;
            a.fn.mfpFastClick = function(e) {
                return a(this).each(function() {
                    var g = a(this),
                        h;
                    if (c) {
                        var i, j, k, l, m, n;
                        g.on("touchstart" + f, function(a) {
                            l = !1, n = 1, m = a.originalEvent ? a.originalEvent.touches[0] : a.touches[0], j = m.clientX, k = m.clientY, r.on("touchmove" + f, function(a) {
                                m = a.originalEvent ? a.originalEvent.touches : a.touches, n = m.length, m = m[0];
                                if (Math.abs(m.clientX - j) > 10 || Math.abs(m.clientY - k) > 10) l = !0, d()
                            }).on("touchend" + f, function(a) {
                                d();
                                if (l || n > 1) return;
                                h = !0, a.preventDefault(), clearTimeout(i), i = setTimeout(function() {
                                    h = !1
                                }, b), e()
                            })
                        })
                    }
                    g.on("click" + f, function() {
                        h || e()
                    })
                })
            }, a.fn.destroyMfpFastClick = function() {
                a(this).off("touchstart" + f + " click" + f), c && r.off("touchmove" + f + " touchend" + f)
            }
        }(), A()
});
(function(window, document, exportName, undefined) {
    'use strict';
    var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
    var TEST_ELEMENT = document.createElement('div');
    var TYPE_FUNCTION = 'function';
    var round = Math.round;
    var abs = Math.abs;
    var now = Date.now;

    function setTimeoutContext(fn, timeout, context) {
        return setTimeout(bindFn(fn, context), timeout);
    }

    function invokeArrayArg(arg, fn, context) {
        if (Array.isArray(arg)) {
            each(arg, context[fn], context);
            return true;
        }
        return false;
    }

    function each(obj, iterator, context) {
        var i;
        if (!obj) {
            return;
        }
        if (obj.forEach) {
            obj.forEach(iterator, context);
        } else if (obj.length !== undefined) {
            i = 0;
            while (i < obj.length) {
                iterator.call(context, obj[i], i, obj);
                i++;
            }
        } else {
            for (i in obj) {
                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
            }
        }
    }

    function deprecate(method, name, message) {
        var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
        return function() {
            var e = new Error('get-stack-trace');
            var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
                .replace(/^\s+at\s+/gm, '')
                .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
            var log = window.console && (window.console.warn || window.console.log);
            if (log) {
                log.call(window.console, deprecationMessage, stack);
            }
            return method.apply(this, arguments);
        };
    }
    var assign;
    if (typeof Object.assign !== 'function') {
        assign = function assign(target) {
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    } else {
        assign = Object.assign;
    }
    var extend = deprecate(function extend(dest, src, merge) {
        var keys = Object.keys(src);
        var i = 0;
        while (i < keys.length) {
            if (!merge || (merge && dest[keys[i]] === undefined)) {
                dest[keys[i]] = src[keys[i]];
            }
            i++;
        }
        return dest;
    }, 'extend', 'Use `assign`.');
    var merge = deprecate(function merge(dest, src) {
        return extend(dest, src, true);
    }, 'merge', 'Use `assign`.');

    function inherit(child, base, properties) {
        var baseP = base.prototype,
            childP;
        childP = child.prototype = Object.create(baseP);
        childP.constructor = child;
        childP._super = baseP;
        if (properties) {
            assign(childP, properties);
        }
    }

    function bindFn(fn, context) {
        return function boundFn() {
            return fn.apply(context, arguments);
        };
    }

    function boolOrFn(val, args) {
        if (typeof val == TYPE_FUNCTION) {
            return val.apply(args ? args[0] || undefined : undefined, args);
        }
        return val;
    }

    function ifUndefined(val1, val2) {
        return (val1 === undefined) ? val2 : val1;
    }

    function addEventListeners(target, types, handler) {
        each(splitStr(types), function(type) {
            target.addEventListener(type, handler, false);
        });
    }

    function removeEventListeners(target, types, handler) {
        each(splitStr(types), function(type) {
            target.removeEventListener(type, handler, false);
        });
    }

    function hasParent(node, parent) {
        while (node) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    function inStr(str, find) {
        return str.indexOf(find) > -1;
    }

    function splitStr(str) {
        return str.trim().split(/\s+/g);
    }

    function inArray(src, find, findByKey) {
        if (src.indexOf && !findByKey) {
            return src.indexOf(find);
        } else {
            var i = 0;
            while (i < src.length) {
                if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                    return i;
                }
                i++;
            }
            return -1;
        }
    }

    function toArray(obj) {
        return Array.prototype.slice.call(obj, 0);
    }

    function uniqueArray(src, key, sort) {
        var results = [];
        var values = [];
        var i = 0;
        while (i < src.length) {
            var val = key ? src[i][key] : src[i];
            if (inArray(values, val) < 0) {
                results.push(src[i]);
            }
            values[i] = val;
            i++;
        }
        if (sort) {
            if (!key) {
                results = results.sort();
            } else {
                results = results.sort(function sortUniqueArray(a, b) {
                    return a[key] > b[key];
                });
            }
        }
        return results;
    }

    function prefixed(obj, property) {
        var prefix, prop;
        var camelProp = property[0].toUpperCase() + property.slice(1);
        var i = 0;
        while (i < VENDOR_PREFIXES.length) {
            prefix = VENDOR_PREFIXES[i];
            prop = (prefix) ? prefix + camelProp : property;
            if (prop in obj) {
                return prop;
            }
            i++;
        }
        return undefined;
    }
    var _uniqueId = 1;

    function uniqueId() {
        return _uniqueId++;
    }

    function getWindowForElement(element) {
        var doc = element.ownerDocument || element;
        return (doc.defaultView || doc.parentWindow || window);
    }
    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
    var SUPPORT_TOUCH = ('ontouchstart' in window);
    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
    var INPUT_TYPE_TOUCH = 'touch';
    var INPUT_TYPE_PEN = 'pen';
    var INPUT_TYPE_MOUSE = 'mouse';
    var INPUT_TYPE_KINECT = 'kinect';
    var COMPUTE_INTERVAL = 25;
    var INPUT_START = 1;
    var INPUT_MOVE = 2;
    var INPUT_END = 4;
    var INPUT_CANCEL = 8;
    var DIRECTION_NONE = 1;
    var DIRECTION_LEFT = 2;
    var DIRECTION_RIGHT = 4;
    var DIRECTION_UP = 8;
    var DIRECTION_DOWN = 16;
    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
    var PROPS_XY = ['x', 'y'];
    var PROPS_CLIENT_XY = ['clientX', 'clientY'];

    function Input(manager, callback) {
        var self = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget;
        this.domHandler = function(ev) {
            if (boolOrFn(manager.options.enable, [manager])) {
                self.handler(ev);
            }
        };
        this.init();
    }
    Input.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        },
        destroy: function() {
            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
            this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
            this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
        }
    };

    function createInputInstance(manager) {
        var Type;
        var inputClass = manager.options.inputClass;
        if (inputClass) {
            Type = inputClass;
        } else if (SUPPORT_POINTER_EVENTS) {
            Type = PointerEventInput;
        } else if (SUPPORT_ONLY_TOUCH) {
            Type = TouchInput;
        } else if (!SUPPORT_TOUCH) {
            Type = MouseInput;
        } else {
            Type = TouchMouseInput;
        }
        return new(Type)(manager, inputHandler);
    }

    function inputHandler(manager, eventType, input) {
        var pointersLen = input.pointers.length;
        var changedPointersLen = input.changedPointers.length;
        var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
        var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));
        input.isFirst = !!isFirst;
        input.isFinal = !!isFinal;
        if (isFirst) {
            manager.session = {};
        }
        input.eventType = eventType;
        computeInputData(manager, input);
        manager.emit('hammer.input', input);
        manager.recognize(input);
        manager.session.prevInput = input;
    }

    function computeInputData(manager, input) {
        var session = manager.session;
        var pointers = input.pointers;
        var pointersLength = pointers.length;
        if (!session.firstInput) {
            session.firstInput = simpleCloneInputData(input);
        }
        if (pointersLength > 1 && !session.firstMultiple) {
            session.firstMultiple = simpleCloneInputData(input);
        } else if (pointersLength === 1) {
            session.firstMultiple = false;
        }
        var firstInput = session.firstInput;
        var firstMultiple = session.firstMultiple;
        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
        var center = input.center = getCenter(pointers);
        input.timeStamp = now();
        input.deltaTime = input.timeStamp - firstInput.timeStamp;
        input.angle = getAngle(offsetCenter, center);
        input.distance = getDistance(offsetCenter, center);
        computeDeltaXY(session, input);
        input.offsetDirection = getDirection(input.deltaX, input.deltaY);
        var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
        input.overallVelocityX = overallVelocity.x;
        input.overallVelocityY = overallVelocity.y;
        input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;
        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
        input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
            session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);
        computeIntervalInputData(session, input);
        var target = manager.element;
        if (hasParent(input.srcEvent.target, target)) {
            target = input.srcEvent.target;
        }
        input.target = target;
    }

    function computeDeltaXY(session, input) {
        var center = input.center;
        var offset = session.offsetDelta || {};
        var prevDelta = session.prevDelta || {};
        var prevInput = session.prevInput || {};
        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
            prevDelta = session.prevDelta = {
                x: prevInput.deltaX || 0,
                y: prevInput.deltaY || 0
            };
            offset = session.offsetDelta = {
                x: center.x,
                y: center.y
            };
        }
        input.deltaX = prevDelta.x + (center.x - offset.x);
        input.deltaY = prevDelta.y + (center.y - offset.y);
    }

    function computeIntervalInputData(session, input) {
        var last = session.lastInterval || input,
            deltaTime = input.timeStamp - last.timeStamp,
            velocity, velocityX, velocityY, direction;
        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
            var deltaX = input.deltaX - last.deltaX;
            var deltaY = input.deltaY - last.deltaY;
            var v = getVelocity(deltaTime, deltaX, deltaY);
            velocityX = v.x;
            velocityY = v.y;
            velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
            direction = getDirection(deltaX, deltaY);
            session.lastInterval = input;
        } else {
            velocity = last.velocity;
            velocityX = last.velocityX;
            velocityY = last.velocityY;
            direction = last.direction;
        }
        input.velocity = velocity;
        input.velocityX = velocityX;
        input.velocityY = velocityY;
        input.direction = direction;
    }

    function simpleCloneInputData(input) {
        var pointers = [];
        var i = 0;
        while (i < input.pointers.length) {
            pointers[i] = {
                clientX: round(input.pointers[i].clientX),
                clientY: round(input.pointers[i].clientY)
            };
            i++;
        }
        return {
            timeStamp: now(),
            pointers: pointers,
            center: getCenter(pointers),
            deltaX: input.deltaX,
            deltaY: input.deltaY
        };
    }

    function getCenter(pointers) {
        var pointersLength = pointers.length;
        if (pointersLength === 1) {
            return {
                x: round(pointers[0].clientX),
                y: round(pointers[0].clientY)
            };
        }
        var x = 0,
            y = 0,
            i = 0;
        while (i < pointersLength) {
            x += pointers[i].clientX;
            y += pointers[i].clientY;
            i++;
        }
        return {
            x: round(x / pointersLength),
            y: round(y / pointersLength)
        };
    }

    function getVelocity(deltaTime, x, y) {
        return {
            x: x / deltaTime || 0,
            y: y / deltaTime || 0
        };
    }

    function getDirection(x, y) {
        if (x === y) {
            return DIRECTION_NONE;
        }
        if (abs(x) >= abs(y)) {
            return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }

    function getDistance(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];
        return Math.sqrt((x * x) + (y * y));
    }

    function getAngle(p1, p2, props) {
        if (!props) {
            props = PROPS_XY;
        }
        var x = p2[props[0]] - p1[props[0]],
            y = p2[props[1]] - p1[props[1]];
        return Math.atan2(y, x) * 180 / Math.PI;
    }

    function getRotation(start, end) {
        return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
    }

    function getScale(start, end) {
        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
    }
    var MOUSE_INPUT_MAP = {
        mousedown: INPUT_START,
        mousemove: INPUT_MOVE,
        mouseup: INPUT_END
    };
    var MOUSE_ELEMENT_EVENTS = 'mousedown';
    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

    function MouseInput() {
        this.evEl = MOUSE_ELEMENT_EVENTS;
        this.evWin = MOUSE_WINDOW_EVENTS;
        this.pressed = false; // mousedown state
        Input.apply(this, arguments);
    }
    inherit(MouseInput, Input, {
        handler: function MEhandler(ev) {
            var eventType = MOUSE_INPUT_MAP[ev.type];
            if (eventType & INPUT_START && ev.button === 0) {
                this.pressed = true;
            }
            if (eventType & INPUT_MOVE && ev.which !== 1) {
                eventType = INPUT_END;
            }
            if (!this.pressed) {
                return;
            }
            if (eventType & INPUT_END) {
                this.pressed = false;
            }
            this.callback(this.manager, eventType, {
                pointers: [ev],
                changedPointers: [ev],
                pointerType: INPUT_TYPE_MOUSE,
                srcEvent: ev
            });
        }
    });
    var POINTER_INPUT_MAP = {
        pointerdown: INPUT_START,
        pointermove: INPUT_MOVE,
        pointerup: INPUT_END,
        pointercancel: INPUT_CANCEL,
        pointerout: INPUT_CANCEL
    };
    var IE10_POINTER_TYPE_ENUM = {
        2: INPUT_TYPE_TOUCH,
        3: INPUT_TYPE_PEN,
        4: INPUT_TYPE_MOUSE,
        5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
    };
    var POINTER_ELEMENT_EVENTS = 'pointerdown';
    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
    if (window.MSPointerEvent && !window.PointerEvent) {
        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
    }

    function PointerEventInput() {
        this.evEl = POINTER_ELEMENT_EVENTS;
        this.evWin = POINTER_WINDOW_EVENTS;
        Input.apply(this, arguments);
        this.store = (this.manager.session.pointerEvents = []);
    }
    inherit(PointerEventInput, Input, {
        handler: function PEhandler(ev) {
            var store = this.store;
            var removePointer = false;
            var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
            var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
            var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
            var isTouch = (pointerType == INPUT_TYPE_TOUCH);
            var storeIndex = inArray(store, ev.pointerId, 'pointerId');
            if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
                if (storeIndex < 0) {
                    store.push(ev);
                    storeIndex = store.length - 1;
                }
            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                removePointer = true;
            }
            if (storeIndex < 0) {
                return;
            }
            store[storeIndex] = ev;
            this.callback(this.manager, eventType, {
                pointers: store,
                changedPointers: [ev],
                pointerType: pointerType,
                srcEvent: ev
            });
            if (removePointer) {
                store.splice(storeIndex, 1);
            }
        }
    });
    var SINGLE_TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };
    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

    function SingleTouchInput() {
        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
        this.started = false;
        Input.apply(this, arguments);
    }
    inherit(SingleTouchInput, Input, {
        handler: function TEhandler(ev) {
            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
            if (type === INPUT_START) {
                this.started = true;
            }
            if (!this.started) {
                return;
            }
            var touches = normalizeSingleTouches.call(this, ev, type);
            if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
                this.started = false;
            }
            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    function normalizeSingleTouches(ev, type) {
        var all = toArray(ev.touches);
        var changed = toArray(ev.changedTouches);
        if (type & (INPUT_END | INPUT_CANCEL)) {
            all = uniqueArray(all.concat(changed), 'identifier', true);
        }
        return [all, changed];
    }
    var TOUCH_INPUT_MAP = {
        touchstart: INPUT_START,
        touchmove: INPUT_MOVE,
        touchend: INPUT_END,
        touchcancel: INPUT_CANCEL
    };
    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

    function TouchInput() {
        this.evTarget = TOUCH_TARGET_EVENTS;
        this.targetIds = {};
        Input.apply(this, arguments);
    }
    inherit(TouchInput, Input, {
        handler: function MTEhandler(ev) {
            var type = TOUCH_INPUT_MAP[ev.type];
            var touches = getTouches.call(this, ev, type);
            if (!touches) {
                return;
            }
            this.callback(this.manager, type, {
                pointers: touches[0],
                changedPointers: touches[1],
                pointerType: INPUT_TYPE_TOUCH,
                srcEvent: ev
            });
        }
    });

    function getTouches(ev, type) {
        var allTouches = toArray(ev.touches);
        var targetIds = this.targetIds;
        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
            targetIds[allTouches[0].identifier] = true;
            return [allTouches, allTouches];
        }
        var i, targetTouches, changedTouches = toArray(ev.changedTouches),
            changedTargetTouches = [],
            target = this.target;
        targetTouches = allTouches.filter(function(touch) {
            return hasParent(touch.target, target);
        });
        if (type === INPUT_START) {
            i = 0;
            while (i < targetTouches.length) {
                targetIds[targetTouches[i].identifier] = true;
                i++;
            }
        }
        i = 0;
        while (i < changedTouches.length) {
            if (targetIds[changedTouches[i].identifier]) {
                changedTargetTouches.push(changedTouches[i]);
            }
            if (type & (INPUT_END | INPUT_CANCEL)) {
                delete targetIds[changedTouches[i].identifier];
            }
            i++;
        }
        if (!changedTargetTouches.length) {
            return;
        }
        return [uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
    }
    var DEDUP_TIMEOUT = 2500;
    var DEDUP_DISTANCE = 25;

    function TouchMouseInput() {
        Input.apply(this, arguments);
        var handler = bindFn(this.handler, this);
        this.touch = new TouchInput(this.manager, handler);
        this.mouse = new MouseInput(this.manager, handler);
        this.primaryTouch = null;
        this.lastTouches = [];
    }
    inherit(TouchMouseInput, Input, {
        handler: function TMEhandler(manager, inputEvent, inputData) {
            var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
                isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);
            if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
                return;
            }
            if (isTouch) {
                recordTouches.call(this, inputEvent, inputData);
            } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
                return;
            }
            this.callback(manager, inputEvent, inputData);
        },
        destroy: function destroy() {
            this.touch.destroy();
            this.mouse.destroy();
        }
    });

    function recordTouches(eventType, eventData) {
        if (eventType & INPUT_START) {
            this.primaryTouch = eventData.changedPointers[0].identifier;
            setLastTouch.call(this, eventData);
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            setLastTouch.call(this, eventData);
        }
    }

    function setLastTouch(eventData) {
        var touch = eventData.changedPointers[0];
        if (touch.identifier === this.primaryTouch) {
            var lastTouch = {
                x: touch.clientX,
                y: touch.clientY
            };
            this.lastTouches.push(lastTouch);
            var lts = this.lastTouches;
            var removeLastTouch = function() {
                var i = lts.indexOf(lastTouch);
                if (i > -1) {
                    lts.splice(i, 1);
                }
            };
            setTimeout(removeLastTouch, DEDUP_TIMEOUT);
        }
    }

    function isSyntheticEvent(eventData) {
        var x = eventData.srcEvent.clientX,
            y = eventData.srcEvent.clientY;
        for (var i = 0; i < this.lastTouches.length; i++) {
            var t = this.lastTouches[i];
            var dx = Math.abs(x - t.x),
                dy = Math.abs(y - t.y);
            if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
                return true;
            }
        }
        return false;
    }
    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
    var TOUCH_ACTION_COMPUTE = 'compute';
    var TOUCH_ACTION_AUTO = 'auto';
    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
    var TOUCH_ACTION_NONE = 'none';
    var TOUCH_ACTION_PAN_X = 'pan-x';
    var TOUCH_ACTION_PAN_Y = 'pan-y';
    var TOUCH_ACTION_MAP = getTouchActionProps();

    function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value);
    }
    TouchAction.prototype = {
        set: function(value) {
            if (value == TOUCH_ACTION_COMPUTE) {
                value = this.compute();
            }
            if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
                this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
            }
            this.actions = value.toLowerCase().trim();
        },
        update: function() {
            this.set(this.manager.options.touchAction);
        },
        compute: function() {
            var actions = [];
            each(this.manager.recognizers, function(recognizer) {
                if (boolOrFn(recognizer.options.enable, [recognizer])) {
                    actions = actions.concat(recognizer.getTouchAction());
                }
            });
            return cleanTouchActions(actions.join(' '));
        },
        preventDefaults: function(input) {
            var srcEvent = input.srcEvent;
            var direction = input.offsetDirection;
            if (this.manager.session.prevented) {
                srcEvent.preventDefault();
                return;
            }
            var actions = this.actions;
            var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];
            if (hasNone) {
                var isTapPointer = input.pointers.length === 1;
                var isTapMovement = input.distance < 2;
                var isTapTouchTime = input.deltaTime < 250;
                if (isTapPointer && isTapMovement && isTapTouchTime) {
                    return;
                }
            }
            if (hasPanX && hasPanY) {
                return;
            }
            if (hasNone || (hasPanY && direction & DIRECTION_HORIZONTAL) || (hasPanX && direction & DIRECTION_VERTICAL)) {
                return this.preventSrc(srcEvent);
            }
        },
        preventSrc: function(srcEvent) {
            this.manager.session.prevented = true;
            srcEvent.preventDefault();
        }
    };

    function cleanTouchActions(actions) {
        if (inStr(actions, TOUCH_ACTION_NONE)) {
            return TOUCH_ACTION_NONE;
        }
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
        if (hasPanX && hasPanY) {
            return TOUCH_ACTION_NONE;
        }
        if (hasPanX || hasPanY) {
            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
        }
        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
            return TOUCH_ACTION_MANIPULATION;
        }
        return TOUCH_ACTION_AUTO;
    }

    function getTouchActionProps() {
        if (!NATIVE_TOUCH_ACTION) {
            return false;
        }
        var touchMap = {};
        var cssSupports = window.CSS && window.CSS.supports;
        ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {
            touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
        });
        return touchMap;
    }
    var STATE_POSSIBLE = 1;
    var STATE_BEGAN = 2;
    var STATE_CHANGED = 4;
    var STATE_ENDED = 8;
    var STATE_RECOGNIZED = STATE_ENDED;
    var STATE_CANCELLED = 16;
    var STATE_FAILED = 32;

    function Recognizer(options) {
        this.options = assign({}, this.defaults, options || {});
        this.id = uniqueId();
        this.manager = null;
        this.options.enable = ifUndefined(this.options.enable, true);
        this.state = STATE_POSSIBLE;
        this.simultaneous = {};
        this.requireFail = [];
    }
    Recognizer.prototype = {
        defaults: {},
        set: function(options) {
            assign(this.options, options);
            this.manager && this.manager.touchAction.update();
            return this;
        },
        recognizeWith: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
                return this;
            }
            var simultaneous = this.simultaneous;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (!simultaneous[otherRecognizer.id]) {
                simultaneous[otherRecognizer.id] = otherRecognizer;
                otherRecognizer.recognizeWith(this);
            }
            return this;
        },
        dropRecognizeWith: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
                return this;
            }
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            delete this.simultaneous[otherRecognizer.id];
            return this;
        },
        requireFailure: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
                return this;
            }
            var requireFail = this.requireFail;
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            if (inArray(requireFail, otherRecognizer) === -1) {
                requireFail.push(otherRecognizer);
                otherRecognizer.requireFailure(this);
            }
            return this;
        },
        dropRequireFailure: function(otherRecognizer) {
            if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
                return this;
            }
            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
            var index = inArray(this.requireFail, otherRecognizer);
            if (index > -1) {
                this.requireFail.splice(index, 1);
            }
            return this;
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0;
        },
        canRecognizeWith: function(otherRecognizer) {
            return !!this.simultaneous[otherRecognizer.id];
        },
        emit: function(input) {
            var self = this;
            var state = this.state;

            function emit(event) {
                self.manager.emit(event, input);
            }
            if (state < STATE_ENDED) {
                emit(self.options.event + stateStr(state));
            }
            emit(self.options.event); // simple 'eventName' events
            if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
                emit(input.additionalEvent);
            }
            if (state >= STATE_ENDED) {
                emit(self.options.event + stateStr(state));
            }
        },
        tryEmit: function(input) {
            if (this.canEmit()) {
                return this.emit(input);
            }
            this.state = STATE_FAILED;
        },
        canEmit: function() {
            var i = 0;
            while (i < this.requireFail.length) {
                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                    return false;
                }
                i++;
            }
            return true;
        },
        recognize: function(inputData) {
            var inputDataClone = assign({}, inputData);
            if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
                this.reset();
                this.state = STATE_FAILED;
                return;
            }
            if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
                this.state = STATE_POSSIBLE;
            }
            this.state = this.process(inputDataClone);
            if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
                this.tryEmit(inputDataClone);
            }
        },
        process: function(inputData) {}, // jshint ignore:line
        getTouchAction: function() {},
        reset: function() {}
    };

    function stateStr(state) {
        if (state & STATE_CANCELLED) {
            return 'cancel';
        } else if (state & STATE_ENDED) {
            return 'end';
        } else if (state & STATE_CHANGED) {
            return 'move';
        } else if (state & STATE_BEGAN) {
            return 'start';
        }
        return '';
    }

    function directionStr(direction) {
        if (direction == DIRECTION_DOWN) {
            return 'down';
        } else if (direction == DIRECTION_UP) {
            return 'up';
        } else if (direction == DIRECTION_LEFT) {
            return 'left';
        } else if (direction == DIRECTION_RIGHT) {
            return 'right';
        }
        return '';
    }

    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
        var manager = recognizer.manager;
        if (manager) {
            return manager.get(otherRecognizer);
        }
        return otherRecognizer;
    }

    function AttrRecognizer() {
        Recognizer.apply(this, arguments);
    }
    inherit(AttrRecognizer, Recognizer, {
        defaults: {
            pointers: 1
        },
        attrTest: function(input) {
            var optionPointers = this.options.pointers;
            return optionPointers === 0 || input.pointers.length === optionPointers;
        },
        process: function(input) {
            var state = this.state;
            var eventType = input.eventType;
            var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
            var isValid = this.attrTest(input);
            if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
                return state | STATE_CANCELLED;
            } else if (isRecognized || isValid) {
                if (eventType & INPUT_END) {
                    return state | STATE_ENDED;
                } else if (!(state & STATE_BEGAN)) {
                    return STATE_BEGAN;
                }
                return state | STATE_CHANGED;
            }
            return STATE_FAILED;
        }
    });

    function PanRecognizer() {
        AttrRecognizer.apply(this, arguments);
        this.pX = null;
        this.pY = null;
    }
    inherit(PanRecognizer, AttrRecognizer, {
        defaults: {
            event: 'pan',
            threshold: 10,
            pointers: 1,
            direction: DIRECTION_ALL
        },
        getTouchAction: function() {
            var direction = this.options.direction;
            var actions = [];
            if (direction & DIRECTION_HORIZONTAL) {
                actions.push(TOUCH_ACTION_PAN_Y);
            }
            if (direction & DIRECTION_VERTICAL) {
                actions.push(TOUCH_ACTION_PAN_X);
            }
            return actions;
        },
        directionTest: function(input) {
            var options = this.options;
            var hasMoved = true;
            var distance = input.distance;
            var direction = input.direction;
            var x = input.deltaX;
            var y = input.deltaY;
            if (!(direction & options.direction)) {
                if (options.direction & DIRECTION_HORIZONTAL) {
                    direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                    hasMoved = x != this.pX;
                    distance = Math.abs(input.deltaX);
                } else {
                    direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                    hasMoved = y != this.pY;
                    distance = Math.abs(input.deltaY);
                }
            }
            input.direction = direction;
            return hasMoved && distance > options.threshold && direction & options.direction;
        },
        attrTest: function(input) {
            return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
        },
        emit: function(input) {
            this.pX = input.deltaX;
            this.pY = input.deltaY;
            var direction = directionStr(input.direction);
            if (direction) {
                input.additionalEvent = this.options.event + direction;
            }
            this._super.emit.call(this, input);
        }
    });

    function PinchRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }
    inherit(PinchRecognizer, AttrRecognizer, {
        defaults: {
            event: 'pinch',
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [TOUCH_ACTION_NONE];
        },
        attrTest: function(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
        },
        emit: function(input) {
            if (input.scale !== 1) {
                var inOut = input.scale < 1 ? 'in' : 'out';
                input.additionalEvent = this.options.event + inOut;
            }
            this._super.emit.call(this, input);
        }
    });

    function PressRecognizer() {
        Recognizer.apply(this, arguments);
        this._timer = null;
        this._input = null;
    }
    inherit(PressRecognizer, Recognizer, {
        defaults: {
            event: 'press',
            pointers: 1,
            time: 251, // minimal time of the pointer to be pressed
            threshold: 9 // a minimal movement is ok, but keep it low
        },
        getTouchAction: function() {
            return [TOUCH_ACTION_AUTO];
        },
        process: function(input) {
            var options = this.options;
            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTime = input.deltaTime > options.time;
            this._input = input;
            if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
                this.reset();
            } else if (input.eventType & INPUT_START) {
                this.reset();
                this._timer = setTimeoutContext(function() {
                    this.state = STATE_RECOGNIZED;
                    this.tryEmit();
                }, options.time, this);
            } else if (input.eventType & INPUT_END) {
                return STATE_RECOGNIZED;
            }
            return STATE_FAILED;
        },
        reset: function() {
            clearTimeout(this._timer);
        },
        emit: function(input) {
            if (this.state !== STATE_RECOGNIZED) {
                return;
            }
            if (input && (input.eventType & INPUT_END)) {
                this.manager.emit(this.options.event + 'up', input);
            } else {
                this._input.timeStamp = now();
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    function RotateRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }
    inherit(RotateRecognizer, AttrRecognizer, {
        defaults: {
            event: 'rotate',
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [TOUCH_ACTION_NONE];
        },
        attrTest: function(input) {
            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
        }
    });

    function SwipeRecognizer() {
        AttrRecognizer.apply(this, arguments);
    }
    inherit(SwipeRecognizer, AttrRecognizer, {
        defaults: {
            event: 'swipe',
            threshold: 10,
            velocity: 0.3,
            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
            pointers: 1
        },
        getTouchAction: function() {
            return PanRecognizer.prototype.getTouchAction.call(this);
        },
        attrTest: function(input) {
            var direction = this.options.direction;
            var velocity;
            if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
                velocity = input.overallVelocity;
            } else if (direction & DIRECTION_HORIZONTAL) {
                velocity = input.overallVelocityX;
            } else if (direction & DIRECTION_VERTICAL) {
                velocity = input.overallVelocityY;
            }
            return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
        },
        emit: function(input) {
            var direction = directionStr(input.offsetDirection);
            if (direction) {
                this.manager.emit(this.options.event + direction, input);
            }
            this.manager.emit(this.options.event, input);
        }
    });

    function TapRecognizer() {
        Recognizer.apply(this, arguments);
        this.pTime = false;
        this.pCenter = false;
        this._timer = null;
        this._input = null;
        this.count = 0;
    }
    inherit(TapRecognizer, Recognizer, {
        defaults: {
            event: 'tap',
            pointers: 1,
            taps: 1,
            interval: 300, // max time between the multi-tap taps
            time: 250, // max time of the pointer to be down (like finger on the screen)
            threshold: 9, // a minimal movement is ok, but keep it low
            posThreshold: 10 // a multi-tap can be a bit off the initial position
        },
        getTouchAction: function() {
            return [TOUCH_ACTION_MANIPULATION];
        },
        process: function(input) {
            var options = this.options;
            var validPointers = input.pointers.length === options.pointers;
            var validMovement = input.distance < options.threshold;
            var validTouchTime = input.deltaTime < options.time;
            this.reset();
            if ((input.eventType & INPUT_START) && (this.count === 0)) {
                return this.failTimeout();
            }
            if (validMovement && validTouchTime && validPointers) {
                if (input.eventType != INPUT_END) {
                    return this.failTimeout();
                }
                var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
                var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
                this.pTime = input.timeStamp;
                this.pCenter = input.center;
                if (!validMultiTap || !validInterval) {
                    this.count = 1;
                } else {
                    this.count += 1;
                }
                this._input = input;
                var tapCount = this.count % options.taps;
                if (tapCount === 0) {
                    if (!this.hasRequireFailures()) {
                        return STATE_RECOGNIZED;
                    } else {
                        this._timer = setTimeoutContext(function() {
                            this.state = STATE_RECOGNIZED;
                            this.tryEmit();
                        }, options.interval, this);
                        return STATE_BEGAN;
                    }
                }
            }
            return STATE_FAILED;
        },
        failTimeout: function() {
            this._timer = setTimeoutContext(function() {
                this.state = STATE_FAILED;
            }, this.options.interval, this);
            return STATE_FAILED;
        },
        reset: function() {
            clearTimeout(this._timer);
        },
        emit: function() {
            if (this.state == STATE_RECOGNIZED) {
                this._input.tapCount = this.count;
                this.manager.emit(this.options.event, this._input);
            }
        }
    });

    function Hammer(element, options) {
        options = options || {};
        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
        return new Manager(element, options);
    }
    Hammer.VERSION = '2.0.8';
    Hammer.defaults = {
        domEvents: false,
        touchAction: TOUCH_ACTION_COMPUTE,
        enable: true,
        inputTarget: null,
        inputClass: null,
        preset: [
            [RotateRecognizer, {
                enable: false
            }],
            [PinchRecognizer, {
                    enable: false
                },
                ['rotate']
            ],
            [SwipeRecognizer, {
                direction: DIRECTION_HORIZONTAL
            }],
            [PanRecognizer, {
                    direction: DIRECTION_HORIZONTAL
                },
                ['swipe']
            ],
            [TapRecognizer],
            [TapRecognizer, {
                    event: 'doubletap',
                    taps: 2
                },
                ['tap']
            ],
            [PressRecognizer]
        ],
        cssProps: {
            userSelect: 'none',
            touchSelect: 'none',
            touchCallout: 'none',
            contentZooming: 'none',
            userDrag: 'none',
            tapHighlightColor: 'rgba(0,0,0,0)'
        }
    };
    var STOP = 1;
    var FORCED_STOP = 2;

    function Manager(element, options) {
        this.options = assign({}, Hammer.defaults, options || {});
        this.options.inputTarget = this.options.inputTarget || element;
        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};
        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);
        toggleCssProps(this, true);
        each(this.options.recognizers, function(item) {
            var recognizer = this.add(new(item[0])(item[1]));
            item[2] && recognizer.recognizeWith(item[2]);
            item[3] && recognizer.requireFailure(item[3]);
        }, this);
    }
    Manager.prototype = {
        set: function(options) {
            assign(this.options, options);
            if (options.touchAction) {
                this.touchAction.update();
            }
            if (options.inputTarget) {
                this.input.destroy();
                this.input.target = options.inputTarget;
                this.input.init();
            }
            return this;
        },
        stop: function(force) {
            this.session.stopped = force ? FORCED_STOP : STOP;
        },
        recognize: function(inputData) {
            var session = this.session;
            if (session.stopped) {
                return;
            }
            this.touchAction.preventDefaults(inputData);
            var recognizer;
            var recognizers = this.recognizers;
            var curRecognizer = session.curRecognizer;
            if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
                curRecognizer = session.curRecognizer = null;
            }
            var i = 0;
            while (i < recognizers.length) {
                recognizer = recognizers[i];
                if (session.stopped !== FORCED_STOP && ( // 1
                        !curRecognizer || recognizer == curRecognizer || // 2
                        recognizer.canRecognizeWith(curRecognizer))) { // 3
                    recognizer.recognize(inputData);
                } else {
                    recognizer.reset();
                }
                if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                    curRecognizer = session.curRecognizer = recognizer;
                }
                i++;
            }
        },
        get: function(recognizer) {
            if (recognizer instanceof Recognizer) {
                return recognizer;
            }
            var recognizers = this.recognizers;
            for (var i = 0; i < recognizers.length; i++) {
                if (recognizers[i].options.event == recognizer) {
                    return recognizers[i];
                }
            }
            return null;
        },
        add: function(recognizer) {
            if (invokeArrayArg(recognizer, 'add', this)) {
                return this;
            }
            var existing = this.get(recognizer.options.event);
            if (existing) {
                this.remove(existing);
            }
            this.recognizers.push(recognizer);
            recognizer.manager = this;
            this.touchAction.update();
            return recognizer;
        },
        remove: function(recognizer) {
            if (invokeArrayArg(recognizer, 'remove', this)) {
                return this;
            }
            recognizer = this.get(recognizer);
            if (recognizer) {
                var recognizers = this.recognizers;
                var index = inArray(recognizers, recognizer);
                if (index !== -1) {
                    recognizers.splice(index, 1);
                    this.touchAction.update();
                }
            }
            return this;
        },
        on: function(events, handler) {
            if (events === undefined) {
                return;
            }
            if (handler === undefined) {
                return;
            }
            var handlers = this.handlers;
            each(splitStr(events), function(event) {
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler);
            });
            return this;
        },
        off: function(events, handler) {
            if (events === undefined) {
                return;
            }
            var handlers = this.handlers;
            each(splitStr(events), function(event) {
                if (!handler) {
                    delete handlers[event];
                } else {
                    handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
                }
            });
            return this;
        },
        emit: function(event, data) {
            if (this.options.domEvents) {
                triggerDomEvent(event, data);
            }
            var handlers = this.handlers[event] && this.handlers[event].slice();
            if (!handlers || !handlers.length) {
                return;
            }
            data.type = event;
            data.preventDefault = function() {
                data.srcEvent.preventDefault();
            };
            var i = 0;
            while (i < handlers.length) {
                handlers[i](data);
                i++;
            }
        },
        destroy: function() {
            this.element && toggleCssProps(this, false);
            this.handlers = {};
            this.session = {};
            this.input.destroy();
            this.element = null;
        }
    };

    function toggleCssProps(manager, add) {
        var element = manager.element;
        if (!element.style) {
            return;
        }
        var prop;
        each(manager.options.cssProps, function(value, name) {
            prop = prefixed(element.style, name);
            if (add) {
                manager.oldCssProps[prop] = element.style[prop];
                element.style[prop] = value;
            } else {
                element.style[prop] = manager.oldCssProps[prop] || '';
            }
        });
        if (!add) {
            manager.oldCssProps = {};
        }
    }

    function triggerDomEvent(event, data) {
        var gestureEvent = document.createEvent('Event');
        gestureEvent.initEvent(event, true, true);
        gestureEvent.gesture = data;
        data.target.dispatchEvent(gestureEvent);
    }
    assign(Hammer, {
        INPUT_START: INPUT_START,
        INPUT_MOVE: INPUT_MOVE,
        INPUT_END: INPUT_END,
        INPUT_CANCEL: INPUT_CANCEL,
        STATE_POSSIBLE: STATE_POSSIBLE,
        STATE_BEGAN: STATE_BEGAN,
        STATE_CHANGED: STATE_CHANGED,
        STATE_ENDED: STATE_ENDED,
        STATE_RECOGNIZED: STATE_RECOGNIZED,
        STATE_CANCELLED: STATE_CANCELLED,
        STATE_FAILED: STATE_FAILED,
        DIRECTION_NONE: DIRECTION_NONE,
        DIRECTION_LEFT: DIRECTION_LEFT,
        DIRECTION_RIGHT: DIRECTION_RIGHT,
        DIRECTION_UP: DIRECTION_UP,
        DIRECTION_DOWN: DIRECTION_DOWN,
        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
        DIRECTION_ALL: DIRECTION_ALL,
        Manager: Manager,
        Input: Input,
        TouchAction: TouchAction,
        TouchInput: TouchInput,
        MouseInput: MouseInput,
        PointerEventInput: PointerEventInput,
        TouchMouseInput: TouchMouseInput,
        SingleTouchInput: SingleTouchInput,
        Recognizer: Recognizer,
        AttrRecognizer: AttrRecognizer,
        Tap: TapRecognizer,
        Pan: PanRecognizer,
        Swipe: SwipeRecognizer,
        Pinch: PinchRecognizer,
        Rotate: RotateRecognizer,
        Press: PressRecognizer,
        on: addEventListeners,
        off: removeEventListeners,
        each: each,
        merge: merge,
        extend: extend,
        assign: assign,
        inherit: inherit,
        bindFn: bindFn,
        prefixed: prefixed
    });
    var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
    freeGlobal.Hammer = Hammer;
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return Hammer;
        });
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = Hammer;
    } else {
        window[exportName] = Hammer;
    }
})(window, document, 'Hammer');
! function(t, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = t || self).LazyLoad = n()
}(this, (function() {
    "use strict";

    function t() {
        return (t = Object.assign || function(t) {
            for (var n = 1; n < arguments.length; n++) {
                var e = arguments[n];
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            }
            return t
        }).apply(this, arguments)
    }
    var n = "undefined" != typeof window,
        e = n && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
        i = n && "IntersectionObserver" in window,
        o = n && "classList" in document.createElement("p"),
        r = n && window.devicePixelRatio > 1,
        a = {
            elements_selector: ".lazy",
            container: e || n ? document : null,
            threshold: 300,
            thresholds: null,
            data_src: "src",
            data_srcset: "srcset",
            data_sizes: "sizes",
            data_bg: "bg",
            data_bg_hidpi: "bg-hidpi",
            data_bg_multi: "bg-multi",
            data_bg_multi_hidpi: "bg-multi-hidpi",
            data_poster: "poster",
            class_applied: "applied",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            class_entered: "entered",
            class_exited: "exited",
            unobserve_completed: !0,
            unobserve_entered: !1,
            cancel_on_exit: !0,
            callback_enter: null,
            callback_exit: null,
            callback_applied: null,
            callback_loading: null,
            callback_loaded: null,
            callback_error: null,
            callback_finish: null,
            callback_cancel: null,
            use_native: !1
        },
        c = function(n) {
            return t({}, a, n)
        },
        s = function(t, n) {
            var e, i = "LazyLoad::Initialized",
                o = new t(n);
            try {
                e = new CustomEvent(i, {
                    detail: {
                        instance: o
                    }
                })
            } catch (t) {
                (e = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
                    instance: o
                })
            }
            window.dispatchEvent(e)
        },
        l = "loading",
        u = "loaded",
        d = "applied",
        f = "error",
        _ = "native",
        g = "data-",
        v = "ll-status",
        p = function(t, n) {
            return t.getAttribute(g + n)
        },
        b = function(t) {
            return p(t, v)
        },
        h = function(t, n) {
            return function(t, n, e) {
                var i = "data-ll-status";
                null !== e ? t.setAttribute(i, e) : t.removeAttribute(i)
            }(t, 0, n)
        },
        m = function(t) {
            return h(t, null)
        },
        E = function(t) {
            return null === b(t)
        },
        y = function(t) {
            return b(t) === _
        },
        A = [l, u, d, f],
        I = function(t, n, e, i) {
            t && (void 0 === i ? void 0 === e ? t(n) : t(n, e) : t(n, e, i))
        },
        L = function(t, n) {
            o ? t.classList.add(n) : t.className += (t.className ? " " : "") + n
        },
        w = function(t, n) {
            o ? t.classList.remove(n) : t.className = t.className.replace(new RegExp("(^|\\s+)" + n + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
        },
        k = function(t) {
            return t.llTempImage
        },
        O = function(t, n) {
            if (n) {
                var e = n._observer;
                e && e.unobserve(t)
            }
        },
        x = function(t, n) {
            t && (t.loadingCount += n)
        },
        z = function(t, n) {
            t && (t.toLoadCount = n)
        },
        C = function(t) {
            for (var n, e = [], i = 0; n = t.children[i]; i += 1) "SOURCE" === n.tagName && e.push(n);
            return e
        },
        N = function(t, n, e) {
            e && t.setAttribute(n, e)
        },
        M = function(t, n) {
            t.removeAttribute(n)
        },
        R = function(t) {
            return !!t.llOriginalAttrs
        },
        G = function(t) {
            if (!R(t)) {
                var n = {};
                n.src = t.getAttribute("src"), n.srcset = t.getAttribute("srcset"), n.sizes = t.getAttribute("sizes"), t.llOriginalAttrs = n
            }
        },
        T = function(t) {
            if (R(t)) {
                var n = t.llOriginalAttrs;
                N(t, "src", n.src), N(t, "srcset", n.srcset), N(t, "sizes", n.sizes)
            }
        },
        j = function(t, n) {
            N(t, "sizes", p(t, n.data_sizes)), N(t, "srcset", p(t, n.data_srcset)), N(t, "src", p(t, n.data_src))
        },
        D = function(t) {
            M(t, "src"), M(t, "srcset"), M(t, "sizes")
        },
        F = function(t, n) {
            var e = t.parentNode;
            e && "PICTURE" === e.tagName && C(e).forEach(n)
        },
        P = {
            IMG: function(t, n) {
                F(t, (function(t) {
                    G(t), j(t, n)
                })), G(t), j(t, n)
            },
            IFRAME: function(t, n) {
                N(t, "src", p(t, n.data_src))
            },
            VIDEO: function(t, n) {
                ! function(t, e) {
                    C(t).forEach((function(t) {
                        N(t, "src", p(t, n.data_src))
                    }))
                }(t), N(t, "poster", p(t, n.data_poster)), N(t, "src", p(t, n.data_src)), t.load()
            }
        },
        S = function(t, n) {
            var e = P[t.tagName];
            e && e(t, n)
        },
        V = function(t, n, e) {
            x(e, 1), L(t, n.class_loading), h(t, l), I(n.callback_loading, t, e)
        },
        U = ["IMG", "IFRAME", "VIDEO"],
        $ = function(t, n) {
            !n || function(t) {
                return t.loadingCount > 0
            }(n) || function(t) {
                return t.toLoadCount > 0
            }(n) || I(t.callback_finish, n)
        },
        q = function(t, n, e) {
            t.addEventListener(n, e), t.llEvLisnrs[n] = e
        },
        H = function(t, n, e) {
            t.removeEventListener(n, e)
        },
        B = function(t) {
            return !!t.llEvLisnrs
        },
        J = function(t) {
            if (B(t)) {
                var n = t.llEvLisnrs;
                for (var e in n) {
                    var i = n[e];
                    H(t, e, i)
                }
                delete t.llEvLisnrs
            }
        },
        K = function(t, n, e) {
            ! function(t) {
                delete t.llTempImage
            }(t), x(e, -1),
                function(t) {
                    t && (t.toLoadCount -= 1)
                }(e), w(t, n.class_loading), n.unobserve_completed && O(t, e)
        },
        Q = function(t, n, e) {
            var i = k(t) || t;
            B(i) || function(t, n, e) {
                B(t) || (t.llEvLisnrs = {});
                var i = "VIDEO" === t.tagName ? "loadeddata" : "load";
                q(t, i, n), q(t, "error", e)
            }(i, (function(o) {
                ! function(t, n, e, i) {
                    var o = y(n);
                    K(n, e, i), L(n, e.class_loaded), h(n, u), I(e.callback_loaded, n, i), o || $(e, i)
                }(0, t, n, e), J(i)
            }), (function(o) {
                ! function(t, n, e, i) {
                    var o = y(n);
                    K(n, e, i), L(n, e.class_error), h(n, f), I(e.callback_error, n, i), o || $(e, i)
                }(0, t, n, e), J(i)
            }))
        },
        W = function(t, n, e) {
            ! function(t) {
                t.llTempImage = document.createElement("IMG")
            }(t), Q(t, n, e),
                function(t, n, e) {
                    var i = p(t, n.data_bg),
                        o = p(t, n.data_bg_hidpi),
                        a = r && o ? o : i;
                    a && (t.style.backgroundImage = 'url("'.concat(a, '")'), k(t).setAttribute("src", a), V(t, n, e))
                }(t, n, e),
                function(t, n, e) {
                    var i = p(t, n.data_bg_multi),
                        o = p(t, n.data_bg_multi_hidpi),
                        a = r && o ? o : i;
                    a && (t.style.backgroundImage = a, function(t, n, e) {
                        L(t, n.class_applied), h(t, d), n.unobserve_completed && O(t, n), I(n.callback_applied, t, e)
                    }(t, n, e))
                }(t, n, e)
        },
        X = function(t, n, e) {
            ! function(t) {
                return U.indexOf(t.tagName) > -1
            }(t) ? W(t, n, e): function(t, n, e) {
                Q(t, n, e), S(t, n), V(t, n, e)
            }(t, n, e)
        },
        Y = ["IMG", "IFRAME"],
        Z = function(t) {
            return t.use_native && "loading" in HTMLImageElement.prototype
        },
        tt = function(t, n, e) {
            t.forEach((function(t) {
                return function(t) {
                    return t.isIntersecting || t.intersectionRatio > 0
                }(t) ? function(t, n, e, i) {
                    h(t, "entered"), L(t, e.class_entered), w(t, e.class_exited),
                        function(t, n, e) {
                            n.unobserve_entered && O(t, e)
                        }(t, e, i), I(e.callback_enter, t, n, i),
                        function(t) {
                            return A.indexOf(b(t)) >= 0
                        }(t) || X(t, e, i)
                }(t.target, t, n, e) : function(t, n, e, i) {
                    E(t) || (L(t, e.class_exited), function(t, n, e, i) {
                        e.cancel_on_exit && function(t) {
                            return b(t) === l
                        }(t) && "IMG" === t.tagName && (J(t), function(t) {
                            F(t, (function(t) {
                                D(t)
                            })), D(t)
                        }(t), function(t) {
                            F(t, (function(t) {
                                T(t)
                            })), T(t)
                        }(t), w(t, e.class_loading), x(i, -1), m(t), I(e.callback_cancel, t, n, i))
                    }(t, n, e, i), I(e.callback_exit, t, n, i))
                }(t.target, t, n, e)
            }))
        },
        nt = function(t) {
            return Array.prototype.slice.call(t)
        },
        et = function(t) {
            return t.container.querySelectorAll(t.elements_selector)
        },
        it = function(t) {
            return function(t) {
                return b(t) === f
            }(t)
        },
        ot = function(t, n) {
            return function(t) {
                return nt(t).filter(E)
            }(t || et(n))
        },
        rt = function(t, e) {
            var o = c(t);
            this._settings = o, this.loadingCount = 0,
                function(t, n) {
                    i && !Z(t) && (n._observer = new IntersectionObserver((function(e) {
                        tt(e, t, n)
                    }), function(t) {
                        return {
                            root: t.container === document ? null : t.container,
                            rootMargin: t.thresholds || t.threshold + "px"
                        }
                    }(t)))
                }(o, this),
                function(t, e) {
                    n && window.addEventListener("online", (function() {
                        ! function(t, n) {
                            var e;
                            (e = et(t), nt(e).filter(it)).forEach((function(n) {
                                w(n, t.class_error), m(n)
                            })), n.update()
                        }(t, e)
                    }))
                }(o, this), this.update(e)
        };
    return rt.prototype = {
        update: function(t) {
            var n, o, r = this._settings,
                a = ot(t, r);
            z(this, a.length), !e && i ? Z(r) ? function(t, n, e) {
                t.forEach((function(t) {
                    -1 !== Y.indexOf(t.tagName) && (t.setAttribute("loading", "lazy"), function(t, n, e) {
                        Q(t, n, e), S(t, n), h(t, _)
                    }(t, n, e))
                })), z(e, 0)
            }(a, r, this) : (o = a, function(t) {
                t.disconnect()
            }(n = this._observer), function(t, n) {
                n.forEach((function(n) {
                    t.observe(n)
                }))
            }(n, o)) : this.loadAll(a)
        },
        destroy: function() {
            this._observer && this._observer.disconnect(), et(this._settings).forEach((function(t) {
                delete t.llOriginalAttrs
            })), delete this._observer, delete this._settings, delete this.loadingCount, delete this.toLoadCount
        },
        loadAll: function(t) {
            var n = this,
                e = this._settings;
            ot(t, e).forEach((function(t) {
                O(t, n), X(t, e, n)
            }))
        }
    }, rt.load = function(t, n) {
        var e = c(n);
        X(t, e)
    }, rt.resetStatus = function(t) {
        m(t)
    }, n && function(t, n) {
        if (n)
            if (n.length)
                for (var e, i = 0; e = n[i]; i += 1) s(t, e);
            else s(t, n)
    }(rt, window.lazyLoadOptions), rt
}));
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jarallax = factory());
})(this, (function() {
    'use strict';

    function ready(callback) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback, {
                capture: true,
                once: true,
                passive: true
            });
        }
    }
    let win;
    if (typeof window !== 'undefined') {
        win = window;
    } else if (typeof global !== 'undefined') {
        win = global;
    } else if (typeof self !== 'undefined') {
        win = self;
    } else {
        win = {};
    }
    var global$1 = win;
    var jarallaxAction = '';
    var defaults = {
        type: 'scroll',
        speed: 0.5,
        containerClass: 'jarallax-container',
        imgSrc: null,
        imgElement: '.jarallax-img',
        imgSize: 'cover',
        imgPosition: '50% 50%',
        imgRepeat: 'no-repeat',
        keepImg: false,
        elementInViewport: null,
        zIndex: -100,
        disableParallax: false,
        onScroll: null,
        onInit: null,
        onDestroy: null,
        onCoverImage: null,
        videoClass: 'jarallax-video',
        videoSrc: null,
        videoStartTime: 0,
        videoEndTime: 0,
        videoVolume: 0,
        videoLoop: true,
        videoPlayOnlyVisible: true,
        videoLazyLoading: true,
        disableVideo: false,
        onVideoInsert: null,
        onVideoWorkerInit: null
    };

    function css(el, styles) {
        if (typeof styles === 'string') {
            return global$1.getComputedStyle(el).getPropertyValue(styles);
        }
        Object.keys(styles).forEach(key => {
            el.style[key] = styles[key];
        });
        return el;
    }

    function extend(out, ...args) {
        out = out || {};
        Object.keys(args).forEach(i => {
            if (!args[i]) {
                return;
            }
            Object.keys(args[i]).forEach(key => {
                out[key] = args[i][key];
            });
        });
        return out;
    }

    function getParents(elem) {
        const parents = [];
        while (elem.parentElement !== null) {
            elem = elem.parentElement;
            if (elem.nodeType === 1) {
                parents.push(elem);
            }
        }
        return parents;
    }
    const {
        navigator: navigator$1
    } = global$1;
    const mobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator$1.userAgent);

    function isMobile() {
        return mobileAgent;
    }
    let wndW;
    let wndH;
    let $deviceHelper;

    function getDeviceHeight() {
        if (!$deviceHelper && document.body) {
            $deviceHelper = document.createElement('div');
            $deviceHelper.style.cssText = 'position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;';
            document.body.appendChild($deviceHelper);
        }
        return ($deviceHelper ? $deviceHelper.clientHeight : 0) || global$1.innerHeight || document.documentElement.clientHeight;
    }

    function updateWindowHeight() {
        wndW = global$1.innerWidth || document.documentElement.clientWidth;
        if (isMobile()) {
            wndH = getDeviceHeight();
        } else {
            wndH = global$1.innerHeight || document.documentElement.clientHeight;
        }
    }
    updateWindowHeight();
    global$1.addEventListener('resize', function() {
        jarallaxAction = 'isResized';
        updateWindowHeight();
        global$1.requestAnimationFrame(updateParallax);
    });
    global$1.addEventListener('orientationchange', updateWindowHeight);
    global$1.addEventListener('load', updateWindowHeight);
    global$1.addEventListener('scroll', function() {
        jarallaxAction = 'isScrolled';
        global$1.requestAnimationFrame(updateParallax);
    });
    ready(() => {
        updateWindowHeight();
    });

    function getWindowSize() {
        return {
            width: wndW,
            height: wndH
        };
    }
    const jarallaxList = [];

    function updateParallax() {
        if (!jarallaxList.length) {
            return;
        }
        const {
            width: wndW,
            height: wndH
        } = getWindowSize();
        jarallaxList.forEach((data, k) => {
            const {
                instance,
                oldData
            } = data;
            if (!instance.isVisible() && jarallaxAction != 'isResized') {
                return;
            }
            const clientRect = instance.$item.getBoundingClientRect();
            if (jarallaxAction == 'isResized') {
                instance.onResize();
            }
            if (jarallaxAction == 'isScrolled' || jarallaxAction == 'isResized') {
                instance.onScroll(false, clientRect);
            }
        });
    }
    const visibilityObserver = new global$1.IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.jarallax.isElementInViewport = entry.isIntersecting;
        });
    }, {
        rootMargin: '50px'
    });

    function addObserver(instance) {
        jarallaxList.push({
            instance
        });
        if (jarallaxList.length === 1) {
            global$1.requestAnimationFrame(updateParallax);
        }
        visibilityObserver.observe(instance.options.elementInViewport || instance.$item);
    }

    function removeObserver(instance) {
        jarallaxList.forEach((data, key) => {
            if (data.instance.instanceID === instance.instanceID) {
                jarallaxList.splice(key, 1);
            }
        });
        visibilityObserver.unobserve(instance.options.elementInViewport || instance.$item);
    }
    const {
        navigator
    } = global$1;
    let instanceID = 0;
    class Jarallax {
        constructor(item, userOptions) {
            const self = this;
            self.instanceID = instanceID;
            instanceID += 1;
            self.$item = item;
            self.defaults = { ...defaults
            };
            const dataOptions = self.$item.dataset || {};
            const pureDataOptions = {};
            Object.keys(dataOptions).forEach(key => {
                const lowerCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);
                if (lowerCaseOption && typeof self.defaults[lowerCaseOption] !== 'undefined') {
                    pureDataOptions[lowerCaseOption] = dataOptions[key];
                }
            });
            self.options = self.extend({}, self.defaults, pureDataOptions, userOptions);
            self.pureOptions = self.extend({}, self.options);
            Object.keys(self.options).forEach(key => {
                if (self.options[key] === 'true') {
                    self.options[key] = true;
                } else if (self.options[key] === 'false') {
                    self.options[key] = false;
                }
            });
            self.options.speed = Math.min(2, Math.max(-1, parseFloat(self.options.speed)));
            if (typeof self.options.disableParallax === 'string') {
                self.options.disableParallax = new RegExp(self.options.disableParallax);
            }
            if (self.options.disableParallax instanceof RegExp) {
                const disableParallaxRegexp = self.options.disableParallax;
                self.options.disableParallax = () => disableParallaxRegexp.test(navigator.userAgent);
            }
            if (typeof self.options.disableParallax !== 'function') {
                self.options.disableParallax = () => false;
            }
            if (typeof self.options.disableVideo === 'string') {
                self.options.disableVideo = new RegExp(self.options.disableVideo);
            }
            if (self.options.disableVideo instanceof RegExp) {
                const disableVideoRegexp = self.options.disableVideo;
                self.options.disableVideo = () => disableVideoRegexp.test(navigator.userAgent);
            }
            if (typeof self.options.disableVideo !== 'function') {
                self.options.disableVideo = () => false;
            }
            let elementInVP = self.options.elementInViewport;
            if (elementInVP && typeof elementInVP === 'object' && typeof elementInVP.length !== 'undefined') {
                [elementInVP] = elementInVP;
            }
            if (!(elementInVP instanceof Element)) {
                elementInVP = null;
            }
            self.options.elementInViewport = elementInVP;
            self.image = {
                src: self.options.imgSrc || null,
                $container: null,
                useImgTag: false,
                position: 'fixed'
            };
            if (self.initImg() && self.canInitParallax()) {
                self.init();
            }
        }
        css(el, styles) {
            return css(el, styles);
        }
        extend(out, ...args) {
            return extend(out, ...args);
        }
        getWindowData() {
            const {
                width,
                height
            } = getWindowSize();
            return {
                width,
                height,
                y: document.documentElement.scrollTop
            };
        }
        initImg() {
            const self = this;
            let $imgElement = self.options.imgElement;
            if ($imgElement && typeof $imgElement === 'string') {
                $imgElement = self.$item.querySelector($imgElement);
            }
            if (!($imgElement instanceof Element)) {
                if (self.options.imgSrc) {
                    $imgElement = new Image();
                    $imgElement.src = self.options.imgSrc;
                } else {
                    $imgElement = null;
                }
            }
            if ($imgElement) {
                if (self.options.keepImg) {
                    self.image.$item = $imgElement.cloneNode(true);
                } else {
                    self.image.$item = $imgElement;
                    self.image.$itemParent = $imgElement.parentNode;
                }
                self.image.useImgTag = true;
            }
            if (self.image.$item) {
                return true;
            }
            if (self.image.src === null) {
                self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                self.image.bgImage = self.css(self.$item, 'background-image');
            }
            return !(!self.image.bgImage || self.image.bgImage === 'none');
        }
        canInitParallax() {
            return !this.options.disableParallax();
        }
        init() {
            const self = this;
            const containerStyles = {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            };
            let imageStyles = {
                pointerEvents: 'none',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                backfaceVisibility: 'hidden'
            };
            if (!self.options.keepImg) {
                const curStyle = self.$item.getAttribute('style');
                if (curStyle) {
                    self.$item.setAttribute('data-jarallax-original-styles', curStyle);
                }
                if (self.image.useImgTag) {
                    const curImgStyle = self.image.$item.getAttribute('style');
                    if (curImgStyle) {
                        self.image.$item.setAttribute('data-jarallax-original-styles', curImgStyle);
                    }
                }
            }
            if (self.css(self.$item, 'position') === 'static') {
                self.css(self.$item, {
                    position: 'relative'
                });
            }
            if (self.css(self.$item, 'z-index') === 'auto') {
                self.css(self.$item, {
                    zIndex: 0
                });
            }
            self.image.$container = document.createElement('div');
            self.css(self.image.$container, containerStyles);
            self.css(self.image.$container, {
                'z-index': self.options.zIndex
            });
            if (this.image.position === 'fixed') {
                self.css(self.image.$container, {
                    '-webkit-clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                });
            }
            self.image.$container.setAttribute('id', `jarallax-container-${self.instanceID}`);
            if (self.options.containerClass) {
                self.image.$container.setAttribute('class', self.options.containerClass);
            }
            self.$item.appendChild(self.image.$container);
            if (self.image.useImgTag) {
                imageStyles = self.extend({
                    'object-fit': self.options.imgSize,
                    'object-position': self.options.imgPosition,
                    'max-width': 'none'
                }, containerStyles, imageStyles);
            } else {
                self.image.$item = document.createElement('div');
                if (self.image.src) {
                    imageStyles = self.extend({
                        'background-position': self.options.imgPosition,
                        'background-size': self.options.imgSize,
                        'background-repeat': self.options.imgRepeat,
                        'background-image': self.image.bgImage || `url("${self.image.src}")`
                    }, containerStyles, imageStyles);
                }
            }
            if (self.options.type === 'opacity' || self.options.type === 'scale' || self.options.type === 'scale-opacity' || self.options.speed === 1) {
                self.image.position = 'absolute';
            }
            if (self.image.position === 'fixed') {
                const $parents = getParents(self.$item).filter(el => {
                    const styles = global$1.getComputedStyle(el);
                    const parentTransform = styles['-webkit-transform'] || styles['-moz-transform'] || styles.transform;
                    const overflowRegex = /(auto|scroll)/;
                    return parentTransform && parentTransform !== 'none' || overflowRegex.test(styles.overflow + styles['overflow-y'] + styles['overflow-x']);
                });
                self.image.position = $parents.length ? 'absolute' : 'fixed';
            }
            imageStyles.position = self.image.position;
            self.css(self.image.$item, imageStyles);
            self.image.$container.appendChild(self.image.$item);
            self.onResize();
            self.onScroll(true);
            if (self.options.onInit) {
                self.options.onInit.call(self);
            }
            if (self.css(self.$item, 'background-image') !== 'none') {
                self.css(self.$item, {
                    'background-image': 'none'
                });
            }
            addObserver(self);
        }
        destroy() {
            const self = this;
            removeObserver(self);
            const originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');
            self.$item.removeAttribute('data-jarallax-original-styles');
            if (!originalStylesTag) {
                self.$item.removeAttribute('style');
            } else {
                self.$item.setAttribute('style', originalStylesTag);
            }
            if (self.image.useImgTag) {
                const originalStylesImgTag = self.image.$item.getAttribute('data-jarallax-original-styles');
                self.image.$item.removeAttribute('data-jarallax-original-styles');
                if (!originalStylesImgTag) {
                    self.image.$item.removeAttribute('style');
                } else {
                    self.image.$item.setAttribute('style', originalStylesTag);
                }
                if (self.image.$itemParent) {
                    self.image.$itemParent.appendChild(self.image.$item);
                }
            }
            if (self.image.$container) {
                self.image.$container.parentNode.removeChild(self.image.$container);
            }
            if (self.options.onDestroy) {
                self.options.onDestroy.call(self);
            }
            delete self.$item.jarallax;
        }
        coverImage() {
            const self = this;
            const {
                height: wndH
            } = getWindowSize();
            if (!self.image.$container) return;
            const rect = self.image.$container.getBoundingClientRect();
            const contH = rect.height;
            const {
                speed
            } = self.options;
            const isScroll = self.options.type === 'scroll' || self.options.type === 'scroll-opacity';
            let scrollDist = 0;
            let resultH = contH;
            let resultMT = 0;
            if (isScroll) {
                if (speed < 0) {
                    scrollDist = speed * Math.max(contH, wndH);
                    if (wndH < contH) {
                        scrollDist -= speed * (contH - wndH);
                    }
                } else {
                    scrollDist = speed * (contH + wndH);
                }
                if (speed > 1) {
                    resultH = Math.abs(scrollDist - wndH);
                } else if (speed < 0) {
                    resultH = scrollDist / speed + Math.abs(scrollDist);
                } else {
                    resultH += (wndH - contH) * (1 - speed);
                }
                scrollDist /= 2;
            }
            self.parallaxScrollDistance = scrollDist;
            if (isScroll) {
                resultMT = (wndH - resultH) / 2;
            } else {
                resultMT = (contH - resultH) / 2;
            }
            var rect_left = rect.left;
            if (topWindow.Wizard && $('html.in-management').attr('dir') == 'rtl') {
                var scroll_width = getScrollbarWidth();
                if (parseInt(rect.left) >= parseInt(scroll_width)) {
                    rect_left = parseInt(rect.left) - parseInt(scroll_width);
                }
            }
            self.css(self.image.$item, {
                height: `${resultH}px`,
                marginTop: `${resultMT}px`,
                left: self.image.position === 'fixed' ? `${rect_left}px` : '0',
                width: `${rect.width}px`
            });
            if (self.options.onCoverImage) {
                self.options.onCoverImage.call(self);
            }
            return {
                image: {
                    height: resultH,
                    marginTop: resultMT
                },
                container: rect
            };
        }
        isVisible() {
            return this.isElementInViewport || false;
        }
        onScroll(force, clientRect) {
            const self = this;
            const {
                height: wndH
            } = getWindowSize();
            let rect;
            if (typeof clientRect === 'undefined') {
                rect = self.$item.getBoundingClientRect();
            } else {
                rect = clientRect;
            }
            const contT = rect.top;
            const contH = rect.height;
            const styles = {};
            const fromViewportCenter = 1 - 2 * ((wndH - contT) / (wndH + contH));
            if (self.options.type === 'scroll' || self.options.type === 'scroll-opacity') {
                let positionY = self.parallaxScrollDistance * fromViewportCenter;
                if (self.image.position === 'absolute') {
                    positionY -= contT;
                }
                styles.transform = `translate3d(0,${positionY}px,0)`;
            }
            if (self.image.$item) {
                self.image.$item.style['transform'] = styles.transform;
            }
        }
        onResize() {
            this.coverImage();
        }
    }
    const jarallax = function(items, options, ...args) {
        if (typeof HTMLElement === 'object' ? items instanceof HTMLElement : items && typeof items === 'object' && items !== null && items.nodeType === 1 && typeof items.nodeName === 'string') {
            items = [items];
        }
        const len = items.length;
        let k = 0;
        let ret;
        for (k; k < len; k += 1) {
            if (typeof options === 'object' || typeof options === 'undefined') {
                if (!items[k].jarallax) {
                    items[k].jarallax = new Jarallax(items[k], options);
                }
            } else if (items[k].jarallax) {
                ret = items[k].jarallax[options].apply(items[k].jarallax, args);
            }
            if (typeof ret !== 'undefined') {
                return ret;
            }
        }
        return items;
    };
    jarallax.constructor = Jarallax;
    const $ = global$1.jQuery;
    if (typeof $ !== 'undefined') {
        const $Plugin = function(...args) {
            Array.prototype.unshift.call(args, this);
            const res = jarallax.apply(global$1, args);
            return typeof res !== 'object' ? res : this;
        };
        $Plugin.constructor = jarallax.constructor;
        const old$Plugin = $.fn.jarallax;
        $.fn.jarallax = $Plugin;
        $.fn.jarallax.noConflict = function() {
            $.fn.jarallax = old$Plugin;
            return this;
        };
    }
    ready(() => {
        jarallax(document.querySelectorAll('[data-jarallax]'));
    });
    return jarallax;
}));
/*!
	Zoom 1.7.18
	license: MIT
	http://www.jacklmoore.com/zoom
*/
(function(o) {
    var t = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1
    };
    o.zoom = function(t, n, e, i) {
        var u, c, a, r, m, l, s, f = o(t),
            h = f.css("position"),
            d = o(n);
        return t.style.position = /(absolute|fixed)/.test(h) ? h : "relative", t.style.overflow = "hidden", e.style.width = e.style.height = "", o(e).addClass("zoomImg").css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: e.width * i,
            height: e.height * i,
            border: "none",
            maxWidth: "none",
            maxHeight: "none"
        }).appendTo(t), {
            init: function() {
                c = f.outerWidth(), u = f.outerHeight(), n === t ? (r = c, a = u) : (r = d.outerWidth(), a = d.outerHeight()), m = (e.width - c) / r, l = (e.height - u) / a, s = d.offset()
            },
            move: function(o) {
                var t = o.pageX - s.left,
                    n = o.pageY - s.top;
                n = Math.max(Math.min(n, a), 0), t = Math.max(Math.min(t, r), 0), e.style.left = t * -m + "px", e.style.top = n * -l + "px"
            }
        }
    }, o.fn.zoom = function(n) {
        return this.each(function() {
            var e = o.extend({}, t, n || {}),
                i = e.target && o(e.target)[0] || this,
                u = this,
                c = o(u),
                a = document.createElement("img"),
                r = o(a),
                m = "mousemove.zoom",
                l = !1,
                s = !1;
            if (!e.url) {
                var f = u.querySelector("img");
                if (f && (e.url = f.getAttribute("data-src") || f.currentSrc || f.src), !e.url) return
            }
            c.one("zoom.destroy", function(o, t) {
                c.off(".zoom"), i.style.position = o, i.style.overflow = t, a.onload = null, r.remove()
            }.bind(this, i.style.position, i.style.overflow)), a.onload = function() {
                function t(t) {
                    f.init(), f.move(t), r.stop().fadeTo(o.support.opacity ? e.duration : 0, 1, o.isFunction(e.onZoomIn) ? e.onZoomIn.call(a) : !1)
                }

                function n() {
                    r.stop().fadeTo(e.duration, 0, o.isFunction(e.onZoomOut) ? e.onZoomOut.call(a) : !1)
                }
                var f = o.zoom(i, u, a, e.magnify);
                "grab" === e.on ? c.on("mousedown.zoom", function(e) {
                    1 === e.which && (o(document).one("mouseup.zoom", function() {
                        n(), o(document).off(m, f.move)
                    }), t(e), o(document).on(m, f.move), e.preventDefault())
                }) : "click" === e.on ? c.on("click.zoom", function(e) {
                    return l ? void 0 : (l = !0, t(e), o(document).on(m, f.move), o(document).one("click.zoom", function() {
                        n(), l = !1, o(document).off(m, f.move)
                    }), !1)
                }) : "toggle" === e.on ? c.on("click.zoom", function(o) {
                    l ? n() : t(o), l = !l
                }) : "mouseover" === e.on && (f.init(), c.on("mouseenter.zoom", t).on("mouseleave.zoom", n).on(m, f.move)), e.touch && c.on("touchstart.zoom", function(o) {
                    o.preventDefault(), s ? (s = !1, n()) : (s = !0, t(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0]))
                }).on("touchmove.zoom", function(o) {
                    o.preventDefault(), f.move(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0])
                }).on("touchend.zoom", function(o) {
                    o.preventDefault(), s && (s = !1, n())
                }), o.isFunction(e.callback) && e.callback.call(a)
            }, a.src = e.url
        })
    }, o.fn.zoom.defaults = t
})(window.jQuery);
var buisnessHoursTemplate = new function() {
    var buisnessHTemplate = this;
    buisnessHTemplate.init = function(settings) {
        var $buisnessHourContainer = settings.$buisnessHourContainer;
        $buisnessHourContainer.empty();
        var buisnessHourJSON = tryParseJSON(settings.buisnessHourJSON.val());
        if (buisnessHourJSON.availability == 'fullTime') {
            buisnessHTemplate.twentyFourSevenTemplate($buisnessHourContainer);
            return false;
        }
        var workingDaysContainer = {};
        workingDaysContainer.$businessWorkingDays = settings.$buisnessHourContainer;
        workingDaysContainer.weeklyWorkingTime = buisnessHourJSON;
        buisnessHTemplate.showOpeningTime(workingDaysContainer);
    };
    this.firstDayOfTheWeek = function(firstDayOfWeek) {
        var firstDayOfWeek = parseInt(firstDayOfWeek);
        var daysOfWeek = [translations.Sunday, translations.Monday, translations.Tuesday, translations.Wednesday, translations.Thursday, translations.Friday, translations.Saturday];
        for (var i = 0; i < firstDayOfWeek; i++) {
            daysOfWeek.push(daysOfWeek[i]);
        }
        daysOfWeek.splice(0, firstDayOfWeek);
        return daysOfWeek;
    }
    this.showOpeningTime = function(workingDaysContainer) {
        var objtContainer = {};
        objtContainer.daysOfWeek = buisnessHTemplate.firstDayOfTheWeek(workingDaysContainer.weeklyWorkingTime.firstDayOfWeek);
        objtContainer.$label = workingDaysContainer.$businessWorkingDays;
        objtContainer.templateNumber = workingDaysContainer.$businessWorkingDays.data('template');
        objtContainer.dateFormat = workingDaysContainer.weeklyWorkingTime.dateFormat;
        objtContainer.timeFormat = workingDaysContainer.weeklyWorkingTime.timeFormat;
        objtContainer.weeklyDaysArray = workingDaysContainer.weeklyWorkingTime.businessHours;
        switch (objtContainer.templateNumber) {
            case 0:
                objtContainer.days = buisnessHTemplate.sequenceTemplate(objtContainer);
                buisnessHTemplate.generateHTML(objtContainer);
                break;
            case 1:
                buisnessHTemplate.generateHTML(objtContainer);
                break;
        }
    };
    this.twentyFourSevenTemplate = function($label) {
        var html = '<div class="day-hours">24/7</div>';
        $label.append(html);
    }
    this.sequenceTemplate = function(objtContainer) {
        var daysOfWeek = objtContainer.daysOfWeek;
        var weeklyDaysArray = objtContainer.weeklyDaysArray;
        var templateNumber = objtContainer.templateNumber;
        var $label = objtContainer.$label;
        var days = new Array();
        var datesSequence = new Array();
        days.push(datesSequence);
        $.each(weeklyDaysArray, function(index, weeklyDays) {
            if (weeklyDays.isActive) {
                weeklyDays.index = index;
                weeklyDays.name = daysOfWeek[index];
                datesSequence.push(weeklyDays);
                return false;
            }
        });
        var arrayIndex = 0;
        var skipStep = true;
        var compareIndex = 0;
        if (datesSequence.length <= 0) return false;
        $.each(weeklyDaysArray, function(index, weeklyDays) {
            if (skipStep) {
                if (compareIndex < datesSequence[0].index) {
                    compareIndex++;
                    return;
                } else {
                    skipStep = false;
                }
            }
            weeklyDays.name = daysOfWeek[index];
            weeklyDays.index = index;
            if (weeklyDays.isActive) {
                if (weeklyDays.name == datesSequence[arrayIndex].name) return;
                if (weeklyDays.startTime1 == datesSequence[arrayIndex].startTime1 &&
                    weeklyDays.endTime1 == datesSequence[arrayIndex].endTime1 &&
                    weeklyDays.startTime2 == datesSequence[arrayIndex].startTime2 &&
                    weeklyDays.endTime2 == datesSequence[arrayIndex].endTime2 &&
                    weeklyDays.startTime3 == datesSequence[arrayIndex].startTime3 &&
                    weeklyDays.endTime3 == datesSequence[arrayIndex].endTime3) {
                    if (index - datesSequence[arrayIndex].index == 1) {
                        datesSequence.push(weeklyDays);
                        arrayIndex++;
                    } else {
                        datesSequence = new Array();
                        datesSequence.push(weeklyDays);
                        days.push(datesSequence);
                        arrayIndex = 0;
                    }
                } else {
                    datesSequence = new Array();
                    datesSequence.push(weeklyDays);
                    days.push(datesSequence);
                    arrayIndex = 0;
                }
            }
        });
        return days;
    };
    this.changeTimeFormat = function(websiteTimeFormat, time) {
        time = time.split(":");
        var newdate = dayjs();
        newdate = newdate.hour(time[0]);
        newdate = newdate.minute(time[1]);
        var dayObj = dayjs(newdate);
        if (websiteTimeFormat === 'H:i') {
            return dayObj.format('HH:mm');
        } else if (websiteTimeFormat === 'h:i A') {
            return dayObj.format('hh:mm A');
        }
    };
    this.generateHTML = function(objtContainer) {
        var days = objtContainer.days;
        var daysOfWeek = objtContainer.daysOfWeek;
        var weeklyDaysArray = objtContainer.weeklyDaysArray;
        var templateNumber = objtContainer.templateNumber;
        var $label = objtContainer.$label;
        var websiteTimeFormat = objtContainer.timeFormat;
        var html = '';
        switch (templateNumber) {
            case 0:
                $.each(days, function(index, workingDays) {
                    if (workingDays.length == 1) {
                        workingDays[0].startTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, workingDays[0].startTime1);
                        workingDays[0].endTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, workingDays[0].endTime1);
                        html += '<div class="day-name">' + workingDays[0].name + '</div><div class="day-hours">' + workingDays[0].startTime1 + ' - ' + workingDays[0].endTime1 + '</div>';
                    } else {
                        workingDays[0].startTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, workingDays[0].startTime1);
                        workingDays[0].endTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, workingDays[0].endTime1);
                        html += '<div class="day-hours">' + workingDays[0].name + '-' + workingDays[(workingDays.length - 1)].name + '</div><div>' + workingDays[0].startTime1 + ' - ' + workingDays[0].endTime1 + '</div>';
                    }
                    if (workingDays[0].startTime2 != '' && workingDays[0].endTime2 != '') {
                        workingDays[0].startTime2 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, workingDays[0].startTime2);
                        workingDays[0].endTime2 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, workingDays[0].endTime2);
                        html += '<div class="day-hours">' + workingDays[0].startTime2 + '-' + workingDays[0].endTime2 + '</div>';
                    }
                    if (workingDays[0].startTime3 != '' && workingDays[0].endTime3 != '') {
                        workingDays[0].startTime3 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, workingDays[0].startTime3);
                        workingDays[0].endTime3 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, workingDays[0].endTime3);
                        html += '<div class="day-hours">' + workingDays[0].startTime3 + '-' + workingDays[0].endTime3 + '</div>';
                    }
                });
                break;
            case 1:
                $.each(weeklyDaysArray, function(index, weeklyDays) {
                    if (weeklyDays.isActive) {
                        weeklyDays.startTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, weeklyDays.startTime1);
                        weeklyDays.endTime1 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, weeklyDays.endTime1);
                        html += '<div class="day-name">' + daysOfWeek[index] + '</div><div class="day-hours">' + weeklyDays.startTime1 + '-' + weeklyDays.endTime1 + '</div>';
                        if (weeklyDays.startTime2 != '' && weeklyDays.endTime2 != '') {
                            weeklyDays.startTime2 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, weeklyDays.startTime2);
                            weeklyDays.endTime2 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, weeklyDays.endTime2);
                            html += '<div class="day-hours">' + weeklyDays.startTime2 + '-' + weeklyDays.endTime2 + '</div>';
                        }
                        if (weeklyDays.startTime3 != '' && weeklyDays.endTime3 != '') {
                            weeklyDays.startTime3 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, weeklyDays.startTime3);
                            weeklyDays.endTime3 = buisnessHTemplate.changeTimeFormat(websiteTimeFormat, weeklyDays.endTime3);
                            html += '<div class="day-hours">' + weeklyDays.startTime3 + '-' + weeklyDays.endTime3 + '</div>';
                        }
                    }
                });
                break;
        }
        $label.append(html);
    };

    function tryParseJSON(str) {
        try {
            var Obj = JSON.parse(str);
            if (Obj && typeof Obj === "object") {
                return Obj;
            }
        } catch (e) {}
        return false;
    }
};
(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($, undefined) {
    function UTCDate() {
        return new Date(Date.UTC.apply(Date, arguments));
    }

    function UTCToday() {
        var today = new Date();
        return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
    }

    function isUTCEquals(date1, date2) {
        return (date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate());
    }

    function alias(method, deprecationMsg) {
        return function() {
            if (deprecationMsg !== undefined) {
                $.fn.datepicker.deprecated(deprecationMsg);
            }
            return this[method].apply(this, arguments);
        };
    }

    function isValidDate(d) {
        return d && !isNaN(d.getTime());
    }
    var DateArray = (function() {
        var extras = {
            get: function(i) {
                return this.slice(i)[0];
            },
            contains: function(d) {
                var val = d && d.valueOf();
                for (var i = 0, l = this.length; i < l; i++)
                    if (0 <= this[i].valueOf() - val && this[i].valueOf() - val < 1000 * 60 * 60 * 24)
                        return i;
                return -1;
            },
            remove: function(i) {
                this.splice(i, 1);
            },
            replace: function(new_array) {
                if (!new_array)
                    return;
                if (!$.isArray(new_array))
                    new_array = [new_array];
                this.clear();
                this.push.apply(this, new_array);
            },
            clear: function() {
                this.length = 0;
            },
            copy: function() {
                var a = new DateArray();
                a.replace(this);
                return a;
            }
        };
        return function() {
            var a = [];
            a.push.apply(a, arguments);
            $.extend(a, extras);
            return a;
        };
    })();
    var Datepicker = function(element, options) {
        $.data(element, 'datepicker', this);
        this._process_options(options);
        this.dates = new DateArray();
        this.viewDate = this.o.defaultViewDate;
        this.focusDate = null;
        this.element = $(element);
        this.isInput = this.element.is('input');
        this.inputField = this.isInput ? this.element : this.element.find('input');
        this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
        if (this.component && this.component.length === 0)
            this.component = false;
        this.isInline = !this.component && this.element.is('div');
        this.picker = $(DPGlobal.template);
        if (this._check_template(this.o.templates.leftArrow)) {
            this.picker.find('.prev').html(this.o.templates.leftArrow);
        }
        if (this._check_template(this.o.templates.rightArrow)) {
            this.picker.find('.next').html(this.o.templates.rightArrow);
        }
        this._buildEvents();
        this._attachEvents();
        if (this.isInline) {
            this.picker.addClass('datepicker-inline').appendTo(this.element);
        } else {
            this.picker.addClass('datepicker-dropdown dropdown-menu');
        }
        if (this.o.rtl) {
            this.picker.addClass('datepicker-rtl');
        }
        if (this.o.calendarWeeks) {
            this.picker.find('.datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear')
                .attr('colspan', function(i, val) {
                    return Number(val) + 1;
                });
        }
        this._process_options({
            startDate: this._o.startDate,
            endDate: this._o.endDate,
            daysOfWeekDisabled: this.o.daysOfWeekDisabled,
            daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
            datesDisabled: this.o.datesDisabled
        });
        this._allow_update = false;
        this.setViewMode(this.o.startView);
        this._allow_update = true;
        this.fillDow();
        this.fillMonths();
        this.update();
        if (this.isInline) {
            this.show();
        }
    };
    Datepicker.prototype = {
        constructor: Datepicker,
        _resolveViewName: function(view) {
            $.each(DPGlobal.viewModes, function(i, viewMode) {
                if (view === i || $.inArray(view, viewMode.names) !== -1) {
                    view = i;
                    return false;
                }
            });
            return view;
        },
        _resolveDaysOfWeek: function(daysOfWeek) {
            if (!$.isArray(daysOfWeek))
                daysOfWeek = daysOfWeek.split(/[,\s]*/);
            return $.map(daysOfWeek, Number);
        },
        _check_template: function(tmp) {
            try {
                if (tmp === undefined || tmp === "") {
                    return false;
                }
                if ((tmp.match(/[<>]/g) || []).length <= 0) {
                    return true;
                }
                var jDom = $(tmp);
                return jDom.length > 0;
            } catch (ex) {
                return false;
            }
        },
        _process_options: function(opts) {
            this._o = $.extend({}, this._o, opts);
            var o = this.o = $.extend({}, this._o);
            var lang = o.language;
            if (!dates[lang]) {
                lang = lang.split('-')[0];
                if (!dates[lang])
                    lang = defaults.language;
            }
            o.language = lang;
            o.startView = this._resolveViewName(o.startView);
            o.minViewMode = this._resolveViewName(o.minViewMode);
            o.maxViewMode = this._resolveViewName(o.maxViewMode);
            o.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, o.startView));
            if (o.multidate !== true) {
                o.multidate = Number(o.multidate) || false;
                if (o.multidate !== false)
                    o.multidate = Math.max(0, o.multidate);
            }
            o.multidateSeparator = String(o.multidateSeparator);
            o.weekStart %= 7;
            o.weekEnd = (o.weekStart + 6) % 7;
            var format = DPGlobal.parseFormat(o.format);
            if (o.startDate !== -Infinity) {
                if (!!o.startDate) {
                    if (o.startDate instanceof Date)
                        o.startDate = this._local_to_utc(this._zero_time(o.startDate));
                    else
                        o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
                } else {
                    o.startDate = -Infinity;
                }
            }
            if (o.endDate !== Infinity) {
                if (!!o.endDate) {
                    if (o.endDate instanceof Date)
                        o.endDate = this._local_to_utc(this._zero_time(o.endDate));
                    else
                        o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
                } else {
                    o.endDate = Infinity;
                }
            }
            o.daysOfWeekDisabled = this._resolveDaysOfWeek(o.daysOfWeekDisabled || []);
            o.daysOfWeekHighlighted = this._resolveDaysOfWeek(o.daysOfWeekHighlighted || []);
            o.datesDisabled = o.datesDisabled || [];
            if (!$.isArray(o.datesDisabled)) {
                o.datesDisabled = o.datesDisabled.split(',');
            }
            o.datesDisabled = $.map(o.datesDisabled, function(d) {
                return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
            });
            var plc = String(o.orientation).toLowerCase().split(/\s+/g),
                _plc = o.orientation.toLowerCase();
            plc = $.grep(plc, function(word) {
                return /^auto|left|right|top|bottom$/.test(word);
            });
            o.orientation = {
                x: 'auto',
                y: 'auto'
            };
            if (!_plc || _plc === 'auto')
            ; // no action
            else if (plc.length === 1) {
                switch (plc[0]) {
                    case 'top':
                    case 'bottom':
                        o.orientation.y = plc[0];
                        break;
                    case 'left':
                    case 'right':
                        o.orientation.x = plc[0];
                        break;
                }
            } else {
                _plc = $.grep(plc, function(word) {
                    return /^left|right$/.test(word);
                });
                o.orientation.x = _plc[0] || 'auto';
                _plc = $.grep(plc, function(word) {
                    return /^top|bottom$/.test(word);
                });
                o.orientation.y = _plc[0] || 'auto';
            }
            if (o.defaultViewDate instanceof Date || typeof o.defaultViewDate === 'string') {
                o.defaultViewDate = DPGlobal.parseDate(o.defaultViewDate, format, o.language, o.assumeNearbyYear);
            } else if (o.defaultViewDate) {
                var year = o.defaultViewDate.year || new Date().getFullYear();
                var month = o.defaultViewDate.month || 0;
                var day = o.defaultViewDate.day || 1;
                o.defaultViewDate = UTCDate(year, month, day);
            } else {
                o.defaultViewDate = UTCToday();
            }
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(evs) {
            for (var i = 0, el, ch, ev; i < evs.length; i++) {
                el = evs[i][0];
                if (evs[i].length === 2) {
                    ch = undefined;
                    ev = evs[i][1];
                } else if (evs[i].length === 3) {
                    ch = evs[i][1];
                    ev = evs[i][2];
                }
                el.on(ev, ch);
            }
        },
        _unapplyEvents: function(evs) {
            for (var i = 0, el, ev, ch; i < evs.length; i++) {
                el = evs[i][0];
                if (evs[i].length === 2) {
                    ch = undefined;
                    ev = evs[i][1];
                } else if (evs[i].length === 3) {
                    ch = evs[i][1];
                    ev = evs[i][2];
                }
                el.off(ev, ch);
            }
        },
        _buildEvents: function() {
            var events = {
                keyup: $.proxy(function(e) {
                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
                        this.update();
                }, this),
                keydown: $.proxy(this.keydown, this),
                paste: $.proxy(this.paste, this)
            };
            if (this.o.showOnFocus === true) {
                events.focus = $.proxy(this.show, this);
            }
            if (this.isInput) { // single input
                this._events = [
                    [this.element, events]
                ];
            } else if (this.component && this.inputField.length) {
                this._events = [
                    [this.inputField, events],
                    [this.component, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            } else {
                this._events = [
                    [this.element, {
                        click: $.proxy(this.show, this),
                        keydown: $.proxy(this.keydown, this)
                    }]
                ];
            }
            this._events.push([this.element, '*', {
                blur: $.proxy(function(e) {
                    this._focused_from = e.target;
                }, this)
            }], [this.element, {
                blur: $.proxy(function(e) {
                    this._focused_from = e.target;
                }, this)
            }]);
            if (this.o.immediateUpdates) {
                this._events.push([this.element, {
                    'changeYear changeMonth': $.proxy(function(e) {
                        this.update(e.date);
                    }, this)
                }]);
            }
            this._secondaryEvents = [
                [this.picker, {
                    click: $.proxy(this.click, this)
                }],
                [this.picker, '.prev, .next', {
                    click: $.proxy(this.navArrowsClick, this)
                }],
                [this.picker, '.day:not(.disabled)', {
                    click: $.proxy(this.dayCellClick, this)
                }],
                [$(window), {
                    resize: $.proxy(this.place, this)
                }],
                [$(document), {
                    'mousedown touchstart': $.proxy(function(e) {
                        if (!(this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.isInline)) {
                            this.hide();
                        }
                    }, this)
                }]
            ];
        },
        _attachEvents: function() {
            this._detachEvents();
            this._applyEvents(this._events);
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events);
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents();
            this._applyEvents(this._secondaryEvents);
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents);
        },
        _trigger: function(event, altdate) {
            var date = altdate || this.dates.get(-1),
                local_date = this._utc_to_local(date);
            this.element.trigger({
                type: event,
                date: local_date,
                viewMode: this.viewMode,
                dates: $.map(this.dates, this._utc_to_local),
                format: $.proxy(function(ix, format) {
                    if (arguments.length === 0) {
                        ix = this.dates.length - 1;
                        format = this.o.format;
                    } else if (typeof ix === 'string') {
                        format = ix;
                        ix = this.dates.length - 1;
                    }
                    format = format || this.o.format;
                    var date = this.dates.get(ix);
                    return DPGlobal.formatDate(date, format, this.o.language);
                }, this)
            });
        },
        show: function() {
            if (this.inputField.prop('disabled') || (this.inputField.prop('readonly') && this.o.enableOnReadonly === false))
                return;
            if (!this.isInline)
                this.picker.appendTo(this.o.container);
            this.place();
            this.picker.show();
            this._attachSecondaryEvents();
            this._trigger('show');
            if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
                $(this.element).blur();
            }
            return this;
        },
        hide: function() {
            if (this.isInline || !this.picker.is(':visible'))
                return this;
            this.focusDate = null;
            this.picker.hide().detach();
            this._detachSecondaryEvents();
            this.setViewMode(this.o.startView);
            if (this.o.forceParse && this.inputField.val())
                this.setValue();
            this._trigger('hide');
            return this;
        },
        destroy: function() {
            this.hide();
            this._detachEvents();
            this._detachSecondaryEvents();
            this.picker.remove();
            delete this.element.data().datepicker;
            if (!this.isInput) {
                delete this.element.data().date;
            }
            return this;
        },
        paste: function(e) {
            var dateString;
            if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types &&
                $.inArray('text/plain', e.originalEvent.clipboardData.types) !== -1) {
                dateString = e.originalEvent.clipboardData.getData('text/plain');
            } else if (window.clipboardData) {
                dateString = window.clipboardData.getData('Text');
            } else {
                return;
            }
            this.setDate(dateString);
            this.update();
            e.preventDefault();
        },
        _utc_to_local: function(utc) {
            if (!utc) {
                return utc;
            }
            var local = new Date(utc.getTime() + (utc.getTimezoneOffset() * 60000));
            if (local.getTimezoneOffset() !== utc.getTimezoneOffset()) {
                local = new Date(utc.getTime() + (local.getTimezoneOffset() * 60000));
            }
            return local;
        },
        _local_to_utc: function(local) {
            return local && new Date(local.getTime() - (local.getTimezoneOffset() * 60000));
        },
        _zero_time: function(local) {
            return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
        },
        _zero_utc_time: function(utc) {
            return utc && UTCDate(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
        },
        getDates: function() {
            return $.map(this.dates, this._utc_to_local);
        },
        getUTCDates: function() {
            return $.map(this.dates, function(d) {
                return new Date(d);
            });
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate());
        },
        getUTCDate: function() {
            var selected_date = this.dates.get(-1);
            if (selected_date !== undefined) {
                return new Date(selected_date);
            } else {
                return null;
            }
        },
        clearDates: function() {
            this.inputField.val('');
            this.update();
            this._trigger('changeDate');
            if (this.o.autoclose) {
                this.hide();
            }
        },
        setDates: function() {
            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, args);
            this._trigger('changeDate');
            this.setValue();
            return this;
        },
        setUTCDates: function() {
            var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
            this.setDates.apply(this, $.map(args, this._utc_to_local));
            return this;
        },
        setDate: alias('setDates'),
        setUTCDate: alias('setUTCDates'),
        remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead'),
        setValue: function() {
            var formatted = this.getFormattedDate();
            this.inputField.val(formatted);
            return this;
        },
        getFormattedDate: function(format) {
            if (format === undefined)
                format = this.o.format;
            var lang = this.o.language;
            return $.map(this.dates, function(d) {
                return DPGlobal.formatDate(d, format, lang);
            }).join(this.o.multidateSeparator);
        },
        getStartDate: function() {
            return this.o.startDate;
        },
        setStartDate: function(startDate) {
            this._process_options({
                startDate: startDate
            });
            this.update();
            this.updateNavArrows();
            return this;
        },
        getEndDate: function() {
            return this.o.endDate;
        },
        setEndDate: function(endDate) {
            this._process_options({
                endDate: endDate
            });
            this.update();
            this.updateNavArrows();
            return this;
        },
        setDaysOfWeekDisabled: function(daysOfWeekDisabled) {
            this._process_options({
                daysOfWeekDisabled: daysOfWeekDisabled
            });
            this.update();
            return this;
        },
        setDaysOfWeekHighlighted: function(daysOfWeekHighlighted) {
            this._process_options({
                daysOfWeekHighlighted: daysOfWeekHighlighted
            });
            this.update();
            return this;
        },
        setDatesDisabled: function(datesDisabled) {
            this._process_options({
                datesDisabled: datesDisabled
            });
            this.update();
            return this;
        },
        place: function() {
            if (this.isInline)
                return this;
            var calendarWidth = this.picker.outerWidth(),
                calendarHeight = this.picker.outerHeight(),
                visualPadding = 10,
                container = $(this.o.container),
                windowWidth = container.width(),
                scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
                appendOffset = container.offset();
            var parentsZindex = [0];
            this.element.parents().each(function() {
                var itemZIndex = $(this).css('z-index');
                if (itemZIndex !== 'auto' && Number(itemZIndex) !== 0) parentsZindex.push(Number(itemZIndex));
            });
            var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
            var offset = this.component ? this.component.parent().offset() : this.element.offset();
            var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
            var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
            var left = offset.left - appendOffset.left + parseInt($('body').css('margin-left'), 10) + parseInt($('body').css('margin-right'), 10);
            var top = offset.top - appendOffset.top + parseInt($('body').css('margin-top'), 10);
            if (this.o.container !== 'body') {
                top += scrollTop;
            }
            this.picker.removeClass('datepicker-orient-top datepicker-orient-bottom ' + 'datepicker-orient-right datepicker-orient-left');
            if (this.o.orientation.x !== 'auto') {
                this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
                if (this.o.orientation.x === 'right')
                    left -= calendarWidth - width;
            } else {
                if (offset.left < 0) {
                    this.picker.addClass('datepicker-orient-left');
                    left -= offset.left - visualPadding;
                } else if (left + calendarWidth > windowWidth) {
                    this.picker.addClass('datepicker-orient-right');
                    left += width - calendarWidth;
                } else {
                    if (this.o.rtl) {
                        this.picker.addClass('datepicker-orient-right');
                    } else {
                        this.picker.addClass('datepicker-orient-left');
                    }
                }
            }
            var yorient = this.o.orientation.y,
                top_overflow;
            if (yorient === 'auto') {
                top_overflow = -scrollTop + top - calendarHeight;
                yorient = top_overflow < 0 ? 'bottom' : 'top';
            }
            this.picker.addClass('datepicker-orient-' + yorient);
            if (yorient === 'top')
                top -= calendarHeight + parseInt(this.picker.css('padding-top'));
            else
                top += height;
            if (this.o.rtl) {
                var right = windowWidth - (left + width);
                this.picker.css({
                    top: top,
                    right: right,
                    zIndex: zIndex
                });
            } else {
                this.picker.css({
                    top: top,
                    left: left,
                    zIndex: zIndex
                });
            }
            return this;
        },
        _allow_update: true,
        update: function() {
            if (!this._allow_update)
                return this;
            var oldDates = this.dates.copy(),
                dates = [],
                fromArgs = false;
            if (arguments.length) {
                $.each(arguments, $.proxy(function(i, date) {
                    if (date instanceof Date)
                        date = this._local_to_utc(date);
                    dates.push(date);
                }, this));
                fromArgs = true;
            } else {
                dates = this.isInput ?
                    this.element.val() :
                    this.element.data('date') || this.inputField.val();
                if (dates && this.o.multidate)
                    dates = dates.split(this.o.multidateSeparator);
                else
                    dates = [dates];
                delete this.element.data().date;
            }
            dates = $.map(dates, $.proxy(function(date) {
                return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
            }, this));
            dates = $.grep(dates, $.proxy(function(date) {
                return (!this.dateWithinRange(date) || !date);
            }, this), true);
            this.dates.replace(dates);
            if (this.o.updateViewDate) {
                if (this.dates.length)
                    this.viewDate = new Date(this.dates.get(-1));
                else if (this.viewDate < this.o.startDate)
                    this.viewDate = new Date(this.o.startDate);
                else if (this.viewDate > this.o.endDate)
                    this.viewDate = new Date(this.o.endDate);
                else
                    this.viewDate = this.o.defaultViewDate;
            }
            if (fromArgs) {
                this.setValue();
                this.element.change();
            } else if (this.dates.length) {
                if (String(oldDates) !== String(this.dates) && fromArgs) {
                    this._trigger('changeDate');
                    this.element.change();
                }
            }
            if (!this.dates.length && oldDates.length) {
                this._trigger('clearDate');
                this.element.change();
            }
            this.fill();
            return this;
        },
        fillDow: function() {
            if (this.o.showWeekDays) {
                var dowCnt = this.o.weekStart,
                    html = '<tr>';
                if (this.o.calendarWeeks) {
                    html += '<th class="cw">&#160;</th>';
                }
                while (dowCnt < this.o.weekStart + 7) {
                    html += '<th class="dow';
                    if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) !== -1)
                        html += ' disabled';
                    html += '">' + dates[this.o.language].daysMin[(dowCnt++) % 7] + '</th>';
                }
                html += '</tr>';
                this.picker.find('.datepicker-days thead').append(html);
            }
        },
        fillMonths: function() {
            var localDate = this._utc_to_local(this.viewDate);
            var html = '';
            var focused;
            for (var i = 0; i < 12; i++) {
                focused = localDate && localDate.getMonth() === i ? ' focused' : '';
                html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i] + '</span>';
            }
            this.picker.find('.datepicker-months td').html(html);
        },
        setRange: function(range) {
            if (!range || !range.length)
                delete this.range;
            else
                this.range = $.map(range, function(d) {
                    return d.valueOf();
                });
            this.fill();
        },
        getClassNames: function(date) {
            var cls = [],
                year = this.viewDate.getUTCFullYear(),
                month = this.viewDate.getUTCMonth(),
                today = UTCToday();
            if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)) {
                cls.push('old');
            } else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)) {
                cls.push('new');
            }
            if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
                cls.push('focused');
            if (this.o.todayHighlight && isUTCEquals(date, today)) {
                cls.push('today');
            }
            if (this.dates.contains(date) !== -1)
                cls.push('active');
            if (!this.dateWithinRange(date)) {
                cls.push('disabled');
            }
            if (this.dateIsDisabled(date)) {
                cls.push('disabled', 'disabled-date');
            }
            if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1) {
                cls.push('highlighted');
            }
            if (this.range) {
                if (date > this.range[0] && date < this.range[this.range.length - 1]) {
                    cls.push('range');
                }
                if ($.inArray(date.valueOf(), this.range) !== -1) {
                    cls.push('selected');
                }
                if (date.valueOf() === this.range[0]) {
                    cls.push('range-start');
                }
                if (date.valueOf() === this.range[this.range.length - 1]) {
                    cls.push('range-end');
                }
            }
            return cls;
        },
        _fill_yearsView: function(selector, cssClass, factor, year, startYear, endYear, beforeFn) {
            var html = '';
            var step = factor / 10;
            var view = this.picker.find(selector);
            var startVal = Math.floor(year / factor) * factor;
            var endVal = startVal + step * 9;
            var focusedVal = Math.floor(this.viewDate.getFullYear() / step) * step;
            var selected = $.map(this.dates, function(d) {
                return Math.floor(d.getUTCFullYear() / step) * step;
            });
            var classes, tooltip, before;
            for (var currVal = startVal - step; currVal <= endVal + step; currVal += step) {
                classes = [cssClass];
                tooltip = null;
                if (currVal === startVal - step) {
                    classes.push('old');
                } else if (currVal === endVal + step) {
                    classes.push('new');
                }
                if ($.inArray(currVal, selected) !== -1) {
                    classes.push('active');
                }
                if (currVal < startYear || currVal > endYear) {
                    classes.push('disabled');
                }
                if (currVal === focusedVal) {
                    classes.push('focused');
                }
                if (beforeFn !== $.noop) {
                    before = beforeFn(new Date(currVal, 0, 1));
                    if (before === undefined) {
                        before = {};
                    } else if (typeof before === 'boolean') {
                        before = {
                            enabled: before
                        };
                    } else if (typeof before === 'string') {
                        before = {
                            classes: before
                        };
                    }
                    if (before.enabled === false) {
                        classes.push('disabled');
                    }
                    if (before.classes) {
                        classes = classes.concat(before.classes.split(/\s+/));
                    }
                    if (before.tooltip) {
                        tooltip = before.tooltip;
                    }
                }
                html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + currVal + '</span>';
            }
            view.find('.datepicker-switch').text(startVal + '-' + endVal);
            view.find('td').html(html);
        },
        fill: function() {
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
                startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
                endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
                endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
                todaytxt = dates[this.o.language].today || dates['en'].today || '',
                cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
                titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
                tooltip, before;
            if (isNaN(year) || isNaN(month))
                return;
            this.picker.find('.datepicker-days .datepicker-switch')
                .text(DPGlobal.formatDate(d, titleFormat, this.o.language));
            this.picker.find('tfoot .today')
                .text(todaytxt)
                .css('display', this.o.todayBtn === true || this.o.todayBtn === 'linked' ? 'table-cell' : 'none');
            this.picker.find('tfoot .clear')
                .text(cleartxt)
                .css('display', this.o.clearBtn === true ? 'table-cell' : 'none');
            this.picker.find('thead .datepicker-title')
                .text(this.o.title)
                .css('display', typeof this.o.title === 'string' && this.o.title !== '' ? 'table-cell' : 'none');
            this.updateNavArrows();
            this.fillMonths();
            var prevMonth = UTCDate(year, month, 0),
                day = prevMonth.getUTCDate();
            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
            var nextMonth = new Date(prevMonth);
            if (prevMonth.getUTCFullYear() < 100) {
                nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
            }
            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var weekDay, clsName;
            while (prevMonth.valueOf() < nextMonth) {
                weekDay = prevMonth.getUTCDay();
                if (weekDay === this.o.weekStart) {
                    html.push('<tr>');
                    if (this.o.calendarWeeks) {
                        var
                            ws = new Date(+prevMonth + (this.o.weekStart - weekDay - 7) % 7 * 864e5),
                            th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
                            yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5),
                            calWeek = (th - yth) / 864e5 / 7 + 1;
                        html.push('<td class="cw">' + calWeek + '</td>');
                    }
                }
                clsName = this.getClassNames(prevMonth);
                clsName.push('day');
                var content = prevMonth.getUTCDate();
                if (this.o.beforeShowDay !== $.noop) {
                    before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
                    if (before === undefined)
                        before = {};
                    else if (typeof before === 'boolean')
                        before = {
                            enabled: before
                        };
                    else if (typeof before === 'string')
                        before = {
                            classes: before
                        };
                    if (before.enabled === false)
                        clsName.push('disabled');
                    if (before.classes)
                        clsName = clsName.concat(before.classes.split(/\s+/));
                    if (before.tooltip)
                        tooltip = before.tooltip;
                    if (before.content)
                        content = before.content;
                }
                if ($.isFunction($.uniqueSort)) {
                    clsName = $.uniqueSort(clsName);
                } else {
                    clsName = $.unique(clsName);
                }
                html.push('<td class="' + clsName.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + ' data-date="' + prevMonth.getTime().toString() + '">' + content + '</td>');
                tooltip = null;
                if (weekDay === this.o.weekEnd) {
                    html.push('</tr>');
                }
                prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
            }
            this.picker.find('.datepicker-days tbody').html(html.join(''));
            var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
            var months = this.picker.find('.datepicker-months')
                .find('.datepicker-switch')
                .text(this.o.maxViewMode < 2 ? monthsTitle : year)
                .end()
                .find('tbody span').removeClass('active');
            $.each(this.dates, function(i, d) {
                if (d.getUTCFullYear() === year)
                    months.eq(d.getUTCMonth()).addClass('active');
            });
            if (year < startYear || year > endYear) {
                months.addClass('disabled');
            }
            if (year === startYear) {
                months.slice(0, startMonth).addClass('disabled');
            }
            if (year === endYear) {
                months.slice(endMonth + 1).addClass('disabled');
            }
            if (this.o.beforeShowMonth !== $.noop) {
                var that = this;
                $.each(months, function(i, month) {
                    var moDate = new Date(year, i, 1);
                    var before = that.o.beforeShowMonth(moDate);
                    if (before === undefined)
                        before = {};
                    else if (typeof before === 'boolean')
                        before = {
                            enabled: before
                        };
                    else if (typeof before === 'string')
                        before = {
                            classes: before
                        };
                    if (before.enabled === false && !$(month).hasClass('disabled'))
                        $(month).addClass('disabled');
                    if (before.classes)
                        $(month).addClass(before.classes);
                    if (before.tooltip)
                        $(month).prop('title', before.tooltip);
                });
            }
            this._fill_yearsView('.datepicker-years', 'year', 10, year, startYear, endYear, this.o.beforeShowYear);
            this._fill_yearsView('.datepicker-decades', 'decade', 100, year, startYear, endYear, this.o.beforeShowDecade);
            this._fill_yearsView('.datepicker-centuries', 'century', 1000, year, startYear, endYear, this.o.beforeShowCentury);
        },
        updateNavArrows: function() {
            if (!this._allow_update)
                return;
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
                startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
                endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
                endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
                prevIsDisabled, nextIsDisabled, factor = 1;
            switch (this.viewMode) {
                case 0:
                    prevIsDisabled = year <= startYear && month <= startMonth;
                    nextIsDisabled = year >= endYear && month >= endMonth;
                    break;
                case 4:
                    factor *= 10;
                case 3:
                    factor *= 10;
                case 2:
                    factor *= 10;
                case 1:
                    prevIsDisabled = Math.floor(year / factor) * factor <= startYear;
                    nextIsDisabled = Math.floor(year / factor) * factor + factor >= endYear;
                    break;
            }
            this.picker.find('.prev').toggleClass('disabled', prevIsDisabled);
            this.picker.find('.next').toggleClass('disabled', nextIsDisabled);
        },
        click: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var target, dir, day, year, month;
            target = $(e.target);
            if (target.hasClass('datepicker-switch') && this.viewMode !== this.o.maxViewMode) {
                this.setViewMode(this.viewMode + 1);
            }
            if (target.hasClass('today') && !target.hasClass('day')) {
                this.setViewMode(0);
                this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
            }
            if (target.hasClass('clear')) {
                this.clearDates();
            }
            if (!target.hasClass('disabled')) {
                if (target.hasClass('month') ||
                    target.hasClass('year') ||
                    target.hasClass('decade') ||
                    target.hasClass('century')) {
                    this.viewDate.setUTCDate(1);
                    day = 1;
                    if (this.viewMode === 1) {
                        month = target.parent().find('span').index(target);
                        year = this.viewDate.getUTCFullYear();
                        this.viewDate.setUTCMonth(month);
                    } else {
                        month = 0;
                        year = Number(target.text());
                        this.viewDate.setUTCFullYear(year);
                    }
                    this._trigger(DPGlobal.viewModes[this.viewMode - 1].e, this.viewDate);
                    if (this.viewMode === this.o.minViewMode) {
                        this._setDate(UTCDate(year, month, day));
                    } else {
                        this.setViewMode(this.viewMode - 1);
                        this.fill();
                    }
                }
            }
            if (this.picker.is(':visible') && this._focused_from) {
                this._focused_from.focus();
            }
            delete this._focused_from;
        },
        dayCellClick: function(e) {
            var $target = $(e.currentTarget);
            var timestamp = $target.data('date');
            var date = new Date(timestamp);
            if (this.o.updateViewDate) {
                if (date.getUTCFullYear() !== this.viewDate.getUTCFullYear()) {
                    this._trigger('changeYear', this.viewDate);
                }
                if (date.getUTCMonth() !== this.viewDate.getUTCMonth()) {
                    this._trigger('changeMonth', this.viewDate);
                }
            }
            this._setDate(date);
        },
        navArrowsClick: function(e) {
            var $target = $(e.currentTarget);
            var dir = $target.hasClass('prev') ? -1 : 1;
            if (this.viewMode !== 0) {
                dir *= DPGlobal.viewModes[this.viewMode].navStep * 12;
            }
            this.viewDate = this.moveMonth(this.viewDate, dir);
            this._trigger(DPGlobal.viewModes[this.viewMode].e, this.viewDate);
            this.fill();
        },
        _toggle_multidate: function(date) {
            var ix = this.dates.contains(date);
            if (!date) {
                this.dates.clear();
            }
            if (ix !== -1) {
                if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive) {
                    this.dates.remove(ix);
                }
            } else if (this.o.multidate === false) {
                this.dates.clear();
                this.dates.push(date);
            } else {
                this.dates.push(date);
            }
            if (typeof this.o.multidate === 'number')
                while (this.dates.length > this.o.multidate)
                    this.dates.remove(0);
        },
        _setDate: function(date, which) {
            if (!which || which === 'date')
                this._toggle_multidate(date && new Date(date));
            if ((!which && this.o.updateViewDate) || which === 'view')
                this.viewDate = date && new Date(date);
            this.fill();
            this.setValue();
            if (!which || which !== 'view') {
                this._trigger('changeDate');
            }
            this.inputField.trigger('change');
            if (this.o.autoclose && (!which || which === 'date')) {
                this.hide();
            }
        },
        moveDay: function(date, dir) {
            var newDate = new Date(date);
            newDate.setUTCDate(date.getUTCDate() + dir);
            return newDate;
        },
        moveWeek: function(date, dir) {
            return this.moveDay(date, dir * 7);
        },
        moveMonth: function(date, dir) {
            if (!isValidDate(date))
                return this.o.defaultViewDate;
            if (!dir)
                return date;
            var new_date = new Date(date.valueOf()),
                day = new_date.getUTCDate(),
                month = new_date.getUTCMonth(),
                mag = Math.abs(dir),
                new_month, test;
            dir = dir > 0 ? 1 : -1;
            if (mag === 1) {
                test = dir === -1 ?
                    function() {
                        return new_date.getUTCMonth() === month;
                    } :
                    function() {
                        return new_date.getUTCMonth() !== new_month;
                    };
                new_month = month + dir;
                new_date.setUTCMonth(new_month);
                new_month = (new_month + 12) % 12;
            } else {
                for (var i = 0; i < mag; i++)
                    new_date = this.moveMonth(new_date, dir);
                new_month = new_date.getUTCMonth();
                new_date.setUTCDate(day);
                test = function() {
                    return new_month !== new_date.getUTCMonth();
                };
            }
            while (test()) {
                new_date.setUTCDate(--day);
                new_date.setUTCMonth(new_month);
            }
            return new_date;
        },
        moveYear: function(date, dir) {
            return this.moveMonth(date, dir * 12);
        },
        moveAvailableDate: function(date, dir, fn) {
            do {
                date = this[fn](date, dir);
                if (!this.dateWithinRange(date))
                    return false;
                fn = 'moveDay';
            }
            while (this.dateIsDisabled(date));
            return date;
        },
        weekOfDateIsDisabled: function(date) {
            return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
        },
        dateIsDisabled: function(date) {
            return (this.weekOfDateIsDisabled(date) || $.grep(this.o.datesDisabled, function(d) {
                return isUTCEquals(date, d);
            }).length > 0);
        },
        dateWithinRange: function(date) {
            return date >= this.o.startDate && date <= this.o.endDate;
        },
        keydown: function(e) {
            if (!this.picker.is(':visible')) {
                if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker
                    this.show();
                    e.stopPropagation();
                }
                return;
            }
            var dateChanged = false,
                dir, newViewDate, focusDate = this.focusDate || this.viewDate;
            switch (e.keyCode) {
                case 27: // escape
                    if (this.focusDate) {
                        this.focusDate = null;
                        this.viewDate = this.dates.get(-1) || this.viewDate;
                        this.fill();
                    } else
                        this.hide();
                    e.preventDefault();
                    e.stopPropagation();
                    break;
                case 37: // left
                case 38: // up
                case 39: // right
                case 40: // down
                    if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
                        break;
                    dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
                    if (this.viewMode === 0) {
                        if (e.ctrlKey) {
                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
                            if (newViewDate)
                                this._trigger('changeYear', this.viewDate);
                        } else if (e.shiftKey) {
                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
                            if (newViewDate)
                                this._trigger('changeMonth', this.viewDate);
                        } else if (e.keyCode === 37 || e.keyCode === 39) {
                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
                        } else if (!this.weekOfDateIsDisabled(focusDate)) {
                            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
                        }
                    } else if (this.viewMode === 1) {
                        if (e.keyCode === 38 || e.keyCode === 40) {
                            dir = dir * 4;
                        }
                        newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
                    } else if (this.viewMode === 2) {
                        if (e.keyCode === 38 || e.keyCode === 40) {
                            dir = dir * 4;
                        }
                        newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
                    }
                    if (newViewDate) {
                        this.focusDate = this.viewDate = newViewDate;
                        this.setValue();
                        this.fill();
                        e.preventDefault();
                    }
                    break;
                case 13: // enter
                    if (!this.o.forceParse)
                        break;
                    focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
                    if (this.o.keyboardNavigation) {
                        this._toggle_multidate(focusDate);
                        dateChanged = true;
                    }
                    this.focusDate = null;
                    this.viewDate = this.dates.get(-1) || this.viewDate;
                    this.setValue();
                    this.fill();
                    if (this.picker.is(':visible')) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (this.o.autoclose)
                            this.hide();
                    }
                    break;
                case 9: // tab
                    this.focusDate = null;
                    this.viewDate = this.dates.get(-1) || this.viewDate;
                    this.fill();
                    this.hide();
                    break;
            }
            if (dateChanged) {
                if (this.dates.length)
                    this._trigger('changeDate');
                else
                    this._trigger('clearDate');
                this.inputField.trigger('change');
            }
        },
        setViewMode: function(viewMode) {
            this.viewMode = viewMode;
            this.picker
                .children('div')
                .hide()
                .filter('.datepicker-' + DPGlobal.viewModes[this.viewMode].clsName)
                .show();
            this.updateNavArrows();
            this._trigger('changeViewMode', new Date(this.viewDate));
        }
    };
    var DateRangePicker = function(element, options) {
        $.data(element, 'datepicker', this);
        this.element = $(element);
        this.inputs = $.map(options.inputs, function(i) {
            return i.jquery ? i[0] : i;
        });
        delete options.inputs;
        this.keepEmptyValues = options.keepEmptyValues;
        delete options.keepEmptyValues;
        datepickerPlugin.call($(this.inputs), options)
            .on('changeDate', $.proxy(this.dateUpdated, this));
        this.pickers = $.map(this.inputs, function(i) {
            return $.data(i, 'datepicker');
        });
        this.updateDates();
    };
    DateRangePicker.prototype = {
        updateDates: function() {
            this.dates = $.map(this.pickers, function(i) {
                return i.getUTCDate();
            });
            this.updateRanges();
        },
        updateRanges: function() {
            var range = $.map(this.dates, function(d) {
                return d.valueOf();
            });
            $.each(this.pickers, function(i, p) {
                p.setRange(range);
            });
        },
        dateUpdated: function(e) {
            if (this.updating)
                return;
            this.updating = true;
            var dp = $.data(e.target, 'datepicker');
            if (dp === undefined) {
                return;
            }
            var new_date = dp.getUTCDate(),
                keep_empty_values = this.keepEmptyValues,
                i = $.inArray(e.target, this.inputs),
                j = i - 1,
                k = i + 1,
                l = this.inputs.length;
            if (i === -1)
                return;
            $.each(this.pickers, function(i, p) {
                if (!p.getUTCDate() && (p === dp || !keep_empty_values))
                    p.setUTCDate(new_date);
            });
            if (new_date < this.dates[j]) {
                while (j >= 0 && new_date < this.dates[j]) {
                    this.pickers[j--].setUTCDate(new_date);
                }
            } else if (new_date > this.dates[k]) {
                while (k < l && new_date > this.dates[k]) {
                    this.pickers[k++].setUTCDate(new_date);
                }
            }
            this.updateDates();
            delete this.updating;
        },
        destroy: function() {
            $.map(this.pickers, function(p) {
                p.destroy();
            });
            $(this.inputs).off('changeDate', this.dateUpdated);
            delete this.element.data().datepicker;
        },
        remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead')
    };

    function opts_from_el(el, prefix) {
        var data = $(el).data(),
            out = {},
            inkey, replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
        prefix = new RegExp('^' + prefix.toLowerCase());

        function re_lower(_, a) {
            return a.toLowerCase();
        }
        for (var key in data)
            if (prefix.test(key)) {
                inkey = key.replace(replace, re_lower);
                out[inkey] = data[key];
            }
        return out;
    }

    function opts_from_locale(lang) {
        var out = {};
        if (!dates[lang]) {
            lang = lang.split('-')[0];
            if (!dates[lang])
                return;
        }
        var d = dates[lang];
        $.each(locale_opts, function(i, k) {
            if (k in d)
                out[k] = d[k];
        });
        return out;
    }
    var old = $.fn.datepicker;
    var datepickerPlugin = function(option) {
        var args = Array.apply(null, arguments);
        args.shift();
        var internal_return;
        this.each(function() {
            var $this = $(this),
                data = $this.data('datepicker'),
                options = typeof option === 'object' && option;
            if (!data) {
                var elopts = opts_from_el(this, 'date'),
                    xopts = $.extend({}, defaults, elopts, options),
                    locopts = opts_from_locale(xopts.language),
                    opts = $.extend({}, defaults, locopts, elopts, options);
                if ($this.hasClass('input-daterange') || opts.inputs) {
                    $.extend(opts, {
                        inputs: opts.inputs || $this.find('input').toArray()
                    });
                    data = new DateRangePicker(this, opts);
                } else {
                    data = new Datepicker(this, opts);
                }
                $this.data('datepicker', data);
            }
            if (typeof option === 'string' && typeof data[option] === 'function') {
                internal_return = data[option].apply(data, args);
            }
        });
        if (internal_return === undefined || internal_return instanceof Datepicker || internal_return instanceof DateRangePicker)
            return this;
        if (this.length > 1)
            throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
        else
            return internal_return;
    };
    $.fn.datepicker = datepickerPlugin;
    var defaults = $.fn.datepicker.defaults = {
        assumeNearbyYear: false,
        autoclose: false,
        beforeShowDay: $.noop,
        beforeShowMonth: $.noop,
        beforeShowYear: $.noop,
        beforeShowDecade: $.noop,
        beforeShowCentury: $.noop,
        calendarWeeks: false,
        clearBtn: false,
        toggleActive: false,
        daysOfWeekDisabled: [],
        daysOfWeekHighlighted: [],
        datesDisabled: [],
        endDate: Infinity,
        forceParse: true,
        format: 'mm/dd/yyyy',
        keepEmptyValues: false,
        keyboardNavigation: true,
        language: 'en',
        minViewMode: 0,
        maxViewMode: 4,
        multidate: false,
        multidateSeparator: ',',
        orientation: "auto",
        rtl: false,
        startDate: -Infinity,
        startView: 0,
        todayBtn: false,
        todayHighlight: false,
        updateViewDate: true,
        weekStart: 0,
        disableTouchKeyboard: false,
        enableOnReadonly: true,
        showOnFocus: true,
        zIndexOffset: 10,
        container: 'body',
        immediateUpdates: false,
        title: '',
        templates: {
            leftArrow: '&#x00AB;',
            rightArrow: '&#x00BB;'
        },
        showWeekDays: true
    };
    var locale_opts = $.fn.datepicker.locale_opts = ['format', 'rtl', 'weekStart'];
    $.fn.datepicker.Constructor = Datepicker;
    var dates = $.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear",
            titleFormat: "MM yyyy"
        }
    };
    var DPGlobal = {
        viewModes: [{
            names: ['days', 'month'],
            clsName: 'days',
            e: 'changeMonth'
        }, {
            names: ['months', 'year'],
            clsName: 'months',
            e: 'changeYear',
            navStep: 1
        }, {
            names: ['years', 'decade'],
            clsName: 'years',
            e: 'changeDecade',
            navStep: 10
        }, {
            names: ['decades', 'century'],
            clsName: 'decades',
            e: 'changeCentury',
            navStep: 100
        }, {
            names: ['centuries', 'millennium'],
            clsName: 'centuries',
            e: 'changeMillennium',
            navStep: 1000
        }],
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
        parseFormat: function(format) {
            if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
                return format;
            var separators = format.replace(this.validParts, '\0').split('\0'),
                parts = format.match(this.validParts);
            if (!separators || !separators.length || !parts || parts.length === 0) {
                throw new Error("Invalid date format.");
            }
            return {
                separators: separators,
                parts: parts
            };
        },
        parseDate: function(date, format, language, assumeNearby) {
            if (!date)
                return undefined;
            if (date instanceof Date)
                return date;
            if (typeof format === 'string')
                format = DPGlobal.parseFormat(format);
            if (format.toValue)
                return format.toValue(date, format, language);
            var fn_map = {
                    d: 'moveDay',
                    m: 'moveMonth',
                    w: 'moveWeek',
                    y: 'moveYear'
                },
                dateAliases = {
                    yesterday: '-1d',
                    today: '+0d',
                    tomorrow: '+1d'
                },
                parts, part, dir, i, fn;
            if (date in dateAliases) {
                date = dateAliases[date];
            }
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(date)) {
                parts = date.match(/([\-+]\d+)([dmwy])/gi);
                date = new Date();
                for (i = 0; i < parts.length; i++) {
                    part = parts[i].match(/([\-+]\d+)([dmwy])/i);
                    dir = Number(part[1]);
                    fn = fn_map[part[2].toLowerCase()];
                    date = Datepicker.prototype[fn](date, dir);
                }
                return Datepicker.prototype._zero_utc_time(date);
            }
            parts = date && date.match(this.nonpunctuation) || [];

            function applyNearbyYear(year, threshold) {
                if (threshold === true)
                    threshold = 10;
                if (year < 100) {
                    year += 2000;
                    if (year > ((new Date()).getFullYear() + threshold)) {
                        year -= 100;
                    }
                }
                return year;
            }
            var parsed = {},
                setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
                setters_map = {
                    yyyy: function(d, v) {
                        return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
                    },
                    m: function(d, v) {
                        if (isNaN(d))
                            return d;
                        v -= 1;
                        while (v < 0) v += 12;
                        v %= 12;
                        d.setUTCMonth(v);
                        while (d.getUTCMonth() !== v)
                            d.setUTCDate(d.getUTCDate() - 1);
                        return d;
                    },
                    d: function(d, v) {
                        return d.setUTCDate(v);
                    }
                },
                val, filtered;
            setters_map['yy'] = setters_map['yyyy'];
            setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
            setters_map['dd'] = setters_map['d'];
            date = UTCToday();
            var fparts = format.parts.slice();
            if (parts.length !== fparts.length) {
                fparts = $(fparts).filter(function(i, p) {
                    return $.inArray(p, setters_order) !== -1;
                }).toArray();
            }

            function match_part() {
                var m = this.slice(0, parts[i].length),
                    p = parts[i].slice(0, m.length);
                return m.toLowerCase() === p.toLowerCase();
            }
            if (parts.length === fparts.length) {
                var cnt;
                for (i = 0, cnt = fparts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10);
                    part = fparts[i];
                    if (isNaN(val)) {
                        switch (part) {
                            case 'MM':
                                filtered = $(dates[language].months).filter(match_part);
                                val = $.inArray(filtered[0], dates[language].months) + 1;
                                break;
                            case 'M':
                                filtered = $(dates[language].monthsShort).filter(match_part);
                                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                                break;
                        }
                    }
                    parsed[part] = val;
                }
                var _date, s;
                for (i = 0; i < setters_order.length; i++) {
                    s = setters_order[i];
                    if (s in parsed && !isNaN(parsed[s])) {
                        _date = new Date(date);
                        setters_map[s](_date, parsed[s]);
                        if (!isNaN(_date))
                            date = _date;
                    }
                }
            }
            return date;
        },
        formatDate: function(date, format, language) {
            if (!date)
                return '';
            if (typeof format === 'string')
                format = DPGlobal.parseFormat(format);
            if (format.toDisplay)
                return format.toDisplay(date, format, language);
            var val = {
                d: date.getUTCDate(),
                D: dates[language].daysShort[date.getUTCDay()],
                DD: dates[language].days[date.getUTCDay()],
                m: date.getUTCMonth() + 1,
                M: dates[language].monthsShort[date.getUTCMonth()],
                MM: dates[language].months[date.getUTCMonth()],
                yy: date.getUTCFullYear().toString().substring(2),
                yyyy: date.getUTCFullYear()
            };
            val.dd = (val.d < 10 ? '0' : '') + val.d;
            val.mm = (val.m < 10 ? '0' : '') + val.m;
            date = [];
            var seps = $.extend([], format.separators);
            for (var i = 0, cnt = format.parts.length; i <= cnt; i++) {
                if (seps.length)
                    date.push(seps.shift());
                date.push(val[format.parts[i]]);
            }
            return date.join('');
        },
        headTemplate: '<thead>' + '<tr>' + '<th colspan="7" class="datepicker-title"></th>' + '</tr>' + '<tr>' + '<th class="prev">' + defaults.templates.leftArrow + '</th>' + '<th colspan="5" class="datepicker-switch"></th>' + '<th class="next">' + defaults.templates.rightArrow + '</th>' + '</tr>' + '</thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot>' + '<tr>' + '<th colspan="7" class="today"></th>' + '</tr>' + '<tr>' + '<th colspan="7" class="clear"></th>' + '</tr>' + '</tfoot>'
    };
    DPGlobal.template = '<div class="datepicker">' + '<div class="datepicker-days">' + '<table class="table-condensed">' + DPGlobal.headTemplate + '<tbody></tbody>' + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-decades">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '<div class="datepicker-centuries">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table>' + '</div>' + '</div>';
    $.fn.datepicker.DPGlobal = DPGlobal;
    $.fn.datepicker.noConflict = function() {
        $.fn.datepicker = old;
        return this;
    };
    $.fn.datepicker.version = '1.7.1';
    $.fn.datepicker.deprecated = function(msg) {
        var console = window.console;
        if (console && console.warn) {
            console.warn('DEPRECATED: ' + msg);
        }
    };
    $(document).on('focus.datepicker.data-api click.datepicker.data-api', '[data-provide="datepicker"]', function(e) {
        var $this = $(this);
        if ($this.data('datepicker'))
            return;
        e.preventDefault();
        datepickerPlugin.call($this, 'show');
    });
    $(function() {
        datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
    });
}));
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.dayjs = e()
}(this, function() {
    "use strict";
    var t = "millisecond",
        e = "second",
        n = "minute",
        r = "hour",
        i = "day",
        s = "week",
        u = "month",
        a = "quarter",
        o = "year",
        f = "date",
        h = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
        c = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        d = function(t, e, n) {
            var r = String(t);
            return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t
        },
        $ = {
            s: d,
            z: function(t) {
                var e = -t.utcOffset(),
                    n = Math.abs(e),
                    r = Math.floor(n / 60),
                    i = n % 60;
                return (e <= 0 ? "+" : "-") + d(r, 2, "0") + ":" + d(i, 2, "0")
            },
            m: function t(e, n) {
                if (e.date() < n.date()) return -t(n, e);
                var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
                    i = e.add(r, u),
                    s = n - i < 0,
                    a = e.add(r + (s ? -1 : 1), u);
                return +(-(r + (n - i) / (s ? i - a : a - i)) || 0)
            },
            a: function(t) {
                return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
            },
            p: function(h) {
                return {
                    M: u,
                    y: o,
                    w: s,
                    d: i,
                    D: f,
                    h: r,
                    m: n,
                    s: e,
                    ms: t,
                    Q: a
                }[h] || String(h || "").toLowerCase().replace(/s$/, "")
            },
            u: function(t) {
                return void 0 === t
            }
        },
        l = {
            name: "en",
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
        },
        y = "en",
        M = {};
    M[y] = l;
    var m = function(t) {
            return t instanceof S
        },
        D = function(t, e, n) {
            var r;
            if (!t) return y;
            if ("string" == typeof t) M[t] && (r = t), e && (M[t] = e, r = t);
            else {
                var i = t.name;
                M[i] = t, r = i
            }
            return !n && r && (y = r), r || !n && y
        },
        v = function(t, e) {
            if (m(t)) return t.clone();
            var n = "object" == typeof e ? e : {};
            return n.date = t, n.args = arguments, new S(n)
        },
        g = $;
    g.l = D, g.i = m, g.w = function(t, e) {
        return v(t, {
            locale: e.$L,
            utc: e.$u,
            $offset: e.$offset
        })
    };
    var S = function() {
            function d(t) {
                this.$L = this.$L || D(t.locale, null, !0), this.parse(t)
            }
            var $ = d.prototype;
            return $.parse = function(t) {
                this.$d = function(t) {
                    var e = t.date,
                        n = t.utc;
                    if (null === e) return new Date(NaN);
                    if (g.u(e)) return new Date;
                    if (e instanceof Date) return new Date(e);
                    if ("string" == typeof e && !/Z$/i.test(e)) {
                        var r = e.match(h);
                        if (r) {
                            var i = r[2] - 1 || 0;
                            return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, r[7] || 0)
                        }
                    }
                    return new Date(e)
                }(t), this.init()
            }, $.init = function() {
                var t = this.$d;
                this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds()
            }, $.$utils = function() {
                return g
            }, $.isValid = function() {
                return !("Invalid Date" === this.$d.toString())
            }, $.isSame = function(t, e) {
                var n = v(t);
                return this.startOf(e) <= n && n <= this.endOf(e)
            }, $.isAfter = function(t, e) {
                return v(t) < this.startOf(e)
            }, $.isBefore = function(t, e) {
                return this.endOf(e) < v(t)
            }, $.$g = function(t, e, n) {
                return g.u(t) ? this[e] : this.set(n, t)
            }, $.unix = function() {
                return Math.floor(this.valueOf() / 1e3)
            }, $.valueOf = function() {
                return this.$d.getTime()
            }, $.startOf = function(t, a) {
                var h = this,
                    c = !!g.u(a) || a,
                    d = g.p(t),
                    $ = function(t, e) {
                        var n = g.w(h.$u ? Date.UTC(h.$y, e, t) : new Date(h.$y, e, t), h);
                        return c ? n : n.endOf(i)
                    },
                    l = function(t, e) {
                        return g.w(h.toDate()[t].apply(h.toDate("s"), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), h)
                    },
                    y = this.$W,
                    M = this.$M,
                    m = this.$D,
                    D = "set" + (this.$u ? "UTC" : "");
                switch (d) {
                    case o:
                        return c ? $(1, 0) : $(31, 11);
                    case u:
                        return c ? $(1, M) : $(0, M + 1);
                    case s:
                        var v = this.$locale().weekStart || 0,
                            S = (y < v ? y + 7 : y) - v;
                        return $(c ? m - S : m + (6 - S), M);
                    case i:
                    case f:
                        return l(D + "Hours", 0);
                    case r:
                        return l(D + "Minutes", 1);
                    case n:
                        return l(D + "Seconds", 2);
                    case e:
                        return l(D + "Milliseconds", 3);
                    default:
                        return this.clone()
                }
            }, $.endOf = function(t) {
                return this.startOf(t, !1)
            }, $.$set = function(s, a) {
                var h, c = g.p(s),
                    d = "set" + (this.$u ? "UTC" : ""),
                    $ = (h = {}, h[i] = d + "Date", h[f] = d + "Date", h[u] = d + "Month", h[o] = d + "FullYear", h[r] = d + "Hours", h[n] = d + "Minutes", h[e] = d + "Seconds", h[t] = d + "Milliseconds", h)[c],
                    l = c === i ? this.$D + (a - this.$W) : a;
                if (c === u || c === o) {
                    var y = this.clone().set(f, 1);
                    y.$d[$](l), y.init(), this.$d = y.set(f, Math.min(this.$D, y.daysInMonth())).$d
                } else $ && this.$d[$](l);
                return this.init(), this
            }, $.set = function(t, e) {
                return this.clone().$set(t, e)
            }, $.get = function(t) {
                return this[g.p(t)]()
            }, $.add = function(t, a) {
                var f, h = this;
                t = Number(t);
                var c = g.p(a),
                    d = function(e) {
                        var n = v(h);
                        return g.w(n.date(n.date() + Math.round(e * t)), h)
                    };
                if (c === u) return this.set(u, this.$M + t);
                if (c === o) return this.set(o, this.$y + t);
                if (c === i) return d(1);
                if (c === s) return d(7);
                var $ = (f = {}, f[n] = 6e4, f[r] = 36e5, f[e] = 1e3, f)[c] || 1,
                    l = this.$d.getTime() + t * $;
                return g.w(l, this)
            }, $.subtract = function(t, e) {
                return this.add(-1 * t, e)
            }, $.format = function(t) {
                var e = this;
                if (!this.isValid()) return "Invalid Date";
                var n = t || "YYYY-MM-DDTHH:mm:ssZ",
                    r = g.z(this),
                    i = this.$locale(),
                    s = this.$H,
                    u = this.$m,
                    a = this.$M,
                    o = i.weekdays,
                    f = i.months,
                    h = function(t, r, i, s) {
                        return t && (t[r] || t(e, n)) || i[r].substr(0, s)
                    },
                    d = function(t) {
                        return g.s(s % 12 || 12, t, "0")
                    },
                    $ = i.meridiem || function(t, e, n) {
                        var r = t < 12 ? "AM" : "PM";
                        return n ? r.toLowerCase() : r
                    },
                    l = {
                        YY: String(this.$y).slice(-2),
                        YYYY: this.$y,
                        M: a + 1,
                        MM: g.s(a + 1, 2, "0"),
                        MMM: h(i.monthsShort, a, f, 3),
                        MMMM: h(f, a),
                        D: this.$D,
                        DD: g.s(this.$D, 2, "0"),
                        d: String(this.$W),
                        dd: h(i.weekdaysMin, this.$W, o, 2),
                        ddd: h(i.weekdaysShort, this.$W, o, 3),
                        dddd: o[this.$W],
                        H: String(s),
                        HH: g.s(s, 2, "0"),
                        h: d(1),
                        hh: d(2),
                        a: $(s, u, !0),
                        A: $(s, u, !1),
                        m: String(u),
                        mm: g.s(u, 2, "0"),
                        s: String(this.$s),
                        ss: g.s(this.$s, 2, "0"),
                        SSS: g.s(this.$ms, 3, "0"),
                        Z: r
                    };
                return n.replace(c, function(t, e) {
                    return e || l[t] || r.replace(":", "")
                })
            }, $.utcOffset = function() {
                return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
            }, $.diff = function(t, f, h) {
                var c, d = g.p(f),
                    $ = v(t),
                    l = 6e4 * ($.utcOffset() - this.utcOffset()),
                    y = this - $,
                    M = g.m(this, $);
                return M = (c = {}, c[o] = M / 12, c[u] = M, c[a] = M / 3, c[s] = (y - l) / 6048e5, c[i] = (y - l) / 864e5, c[r] = y / 36e5, c[n] = y / 6e4, c[e] = y / 1e3, c)[d] || y, h ? M : g.a(M)
            }, $.daysInMonth = function() {
                return this.endOf(u).$D
            }, $.$locale = function() {
                return M[this.$L]
            }, $.locale = function(t, e) {
                if (!t) return this.$L;
                var n = this.clone(),
                    r = D(t, e, !0);
                return r && (n.$L = r), n
            }, $.clone = function() {
                return g.w(this.$d, this)
            }, $.toDate = function() {
                return new Date(this.valueOf())
            }, $.toJSON = function() {
                return this.isValid() ? this.toISOString() : null
            }, $.toISOString = function() {
                return this.$d.toISOString()
            }, $.toString = function() {
                return this.$d.toUTCString()
            }, d
        }(),
        p = S.prototype;
    return v.prototype = p, [
        ["$ms", t],
        ["$s", e],
        ["$m", n],
        ["$H", r],
        ["$W", i],
        ["$M", u],
        ["$y", o],
        ["$D", f]
    ].forEach(function(t) {
        p[t[1]] = function(e) {
            return this.$g(e, t[0], t[1])
        }
    }), v.extend = function(t, e) {
        return t(e, S, v), v
    }, v.locale = D, v.isDayjs = m, v.unix = function(t) {
        return v(1e3 * t)
    }, v.en = M[y], v.Ls = M, v
});