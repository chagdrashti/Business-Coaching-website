var googleMapPopUp = new function() {
    var gMapPopUp = this;
    this.init = function(settings) {
        gMapPopUp.locationData = settings.locationData;
        gMapPopUp.mapsDisplayDomain = settings.mapsDisplayDomain;
        gMapPopUp.longFreeCustomer = settings.longFreeCustomer;
        gMapPopUp.language = settings.language;
        var location = gMapPopUp.locationData.data('location');
        gMapPopUp.locationData.on('click', function() {
            buildPopup('popupRestaurantReservations', '', '', gMapPopUp.mapsDisplayDomain + '/include/globalMapDisplay.php?cad=1&q=' + encodeURIComponent(location) + '&fl=1&l=' + encodeURIComponent(gMapPopUp.language) + '&ilfc=' + encodeURIComponent(gMapPopUp.longFreeCustomer), true, false, true, '', '');
        });
    };
};
jQuery(function($) {
    AgendaModuleInitialize();
});

function AgendaModuleInitialize() {
    $(document).on("s123.page.ready", function(event) {
        var $sections = $('.s123-module-agenda.layout-2');
        $sections.each(function(index) {
            var $s = $(this);
            var $categories = $s.find('.filter a');
            $categories.off('click').on('click', function(event, initialize) {
                var $category = $(this);
                var $agenda = $s.find('.agenda-category');
                $s.find('.filter li').removeClass('active');
                $category.parent().addClass('active');
                var $filtered = $agenda.filter('[data-filter=' + $category.data('filter') + ']');
                if (initialize) {
                    $agenda.hide();
                    $filtered.show();
                } else {
                    $agenda.fadeOut(200).promise().done(function() {
                        $filtered.fadeIn(200);
                        $(window).trigger('scroll');
                    });
                }
                return false;
            });
            $categories.first().trigger('click', true);
        });
    });
}
jQuery(function($) {
    AgendaModuleInitialize_Layout3();
});

function AgendaModuleInitialize_Layout3() {
    $(document).on("s123.page.ready", function(event) {
        var $sections = $('.s123-module-agenda.layout-3');
        $sections.each(function(index) {
            var $s = $(this);
            var $categories = $s.find('.agenda-categories-container li');
            var $agenda = $s.find('.agenda-category');
            $categories.off('click').on('click', function(event, initialize) {
                var $category = $(this);
                $categories.removeClass('active');
                $category.addClass('active');
                var $filtered = $agenda.filter('[data-filter=' + $category.data('filter') + ']');
                if (initialize) {
                    $agenda.hide();
                    $filtered.show();
                } else {
                    $agenda.fadeOut(200).promise().done(function() {
                        $filtered.fadeIn(200);
                        $(window).trigger('scroll');
                    });
                }
                return false;
            });
            $categories.first().trigger('click', true);
            $s.find('.agenda-responsive-filter').off('click').on('click', function() {
                var $category = $(this);
                $s.find('.categories-panel').slideToggle('slow');
                $category.toggleClass('active');
                return false;
            });
        });
    });
}(function(factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], function($) {
            factory($, window, document);
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"), window, document);
    } else {
        factory(jQuery, window, document);
    }
})(function($, window, document, undefined) {
    "use strict";
    var pluginName = "intlTelInput",
        id = 1, // give each instance it's own id for namespaced event handling
        defaults = {
            allowDropdown: true,
            autoHideDialCode: true,
            autoPlaceholder: true,
            customPlaceholder: null,
            dropdownContainer: "",
            excludeCountries: [],
            formatOnInit: true,
            geoIpLookup: null,
            initialCountry: "",
            nationalMode: true,
            numberType: "MOBILE",
            onlyCountries: [],
            preferredCountries: ["us", "gb"],
            separateDialCode: false,
            utilsScript: ""
        },
        keys = {
            UP: 38,
            DOWN: 40,
            ENTER: 13,
            ESC: 27,
            PLUS: 43,
            A: 65,
            Z: 90,
            SPACE: 32,
            TAB: 9
        };
    $(window).load(function() {
        $.fn[pluginName].windowLoaded = true;
    });

    function Plugin(element, options) {
        this.telInput = $(element);
        this.options = $.extend({}, defaults, options);
        this.ns = "." + pluginName + id++;
        this.isGoodBrowser = Boolean(element.setSelectionRange);
        this.hadInitialPlaceholder = Boolean($(element).attr("placeholder"));
    }
    Plugin.prototype = {
        _init: function() {
            if (this.options.nationalMode) {
                this.options.autoHideDialCode = false;
            }
            if (this.options.separateDialCode) {
                this.options.autoHideDialCode = this.options.nationalMode = false;
                this.options.allowDropdown = true;
            }
            this.isMobile = /Android.+Mobile|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (this.isMobile) {
                $("body").addClass("iti-mobile");
                if (!this.options.dropdownContainer) {
                    this.options.dropdownContainer = "body";
                }
            }
            this.autoCountryDeferred = new $.Deferred();
            this.utilsScriptDeferred = new $.Deferred();
            this._processCountryData();
            this._generateMarkup();
            this._setInitialState();
            this._initListeners();
            this._initRequests();
            return [this.autoCountryDeferred, this.utilsScriptDeferred];
        },
        _processCountryData: function() {
            this._processAllCountries();
            this._processCountryCodes();
            this._processPreferredCountries();
        },
        _addCountryCode: function(iso2, dialCode, priority) {
            if (!(dialCode in this.countryCodes)) {
                this.countryCodes[dialCode] = [];
            }
            var index = priority || 0;
            this.countryCodes[dialCode][index] = iso2;
        },
        _filterCountries: function(countryArray, processFunc) {
            var i;
            for (i = 0; i < countryArray.length; i++) {
                countryArray[i] = countryArray[i].toLowerCase();
            }
            this.countries = [];
            for (i = 0; i < allCountries.length; i++) {
                if (processFunc($.inArray(allCountries[i].iso2, countryArray))) {
                    this.countries.push(allCountries[i]);
                }
            }
        },
        _processAllCountries: function() {
            if (this.options.onlyCountries.length) {
                this._filterCountries(this.options.onlyCountries, function(inArray) {
                    return inArray != -1;
                });
            } else if (this.options.excludeCountries.length) {
                this._filterCountries(this.options.excludeCountries, function(inArray) {
                    return inArray == -1;
                });
            } else {
                this.countries = allCountries;
            }
        },
        _processCountryCodes: function() {
            this.countryCodes = {};
            for (var i = 0; i < this.countries.length; i++) {
                var c = this.countries[i];
                this._addCountryCode(c.iso2, c.dialCode, c.priority);
                if (c.areaCodes) {
                    for (var j = 0; j < c.areaCodes.length; j++) {
                        this._addCountryCode(c.iso2, c.dialCode + c.areaCodes[j]);
                    }
                }
            }
        },
        _processPreferredCountries: function() {
            this.preferredCountries = [];
            for (var i = 0; i < this.options.preferredCountries.length; i++) {
                var countryCode = this.options.preferredCountries[i].toLowerCase(),
                    countryData = this._getCountryData(countryCode, false, true);
                if (countryData) {
                    this.preferredCountries.push(countryData);
                }
            }
        },
        _generateMarkup: function() {
            this.telInput.attr("autocomplete", "off");
            var parentClass = "intl-tel-input";
            if (this.options.allowDropdown) {
                parentClass += " allow-dropdown";
            }
            if (this.options.separateDialCode) {
                parentClass += " separate-dial-code";
            }
            this.telInput.wrap($("<div>", {
                "class": parentClass
            }));
            this.flagsContainer = $("<div>", {
                "class": "flag-container"
            }).insertBefore(this.telInput);
            var selectedFlag = $("<div>", {
                "class": "selected-flag"
            });
            selectedFlag.appendTo(this.flagsContainer);
            this.selectedFlagInner = $("<div>", {
                "class": "iti-flag"
            }).appendTo(selectedFlag);
            if (this.options.separateDialCode) {
                this.selectedDialCode = $("<div>", {
                    "class": "selected-dial-code"
                }).appendTo(selectedFlag);
            }
            if (this.options.allowDropdown) {
                selectedFlag.attr("tabindex", "0");
                $("<div>", {
                    "class": "iti-arrow"
                }).appendTo(selectedFlag);
                this.countryList = $("<ul>", {
                    "class": "country-list hide"
                });
                if (this.preferredCountries.length) {
                    this._appendListItems(this.preferredCountries, "preferred");
                    $("<li>", {
                        "class": "divider"
                    }).appendTo(this.countryList);
                }
                this._appendListItems(this.countries, "");
                this.countryListItems = this.countryList.children(".country");
                if (this.options.dropdownContainer) {
                    this.dropdown = $("<div>", {
                        "class": "intl-tel-input iti-container"
                    }).append(this.countryList);
                } else {
                    this.countryList.appendTo(this.flagsContainer);
                }
            } else {
                this.countryListItems = $();
            }
        },
        _appendListItems: function(countries, className) {
            var tmp = "";
            for (var i = 0; i < countries.length; i++) {
                var c = countries[i];
                tmp += "<li class='country " + className + "' data-dial-code='" + c.dialCode + "' data-country-code='" + c.iso2 + "'>";
                tmp += "<div class='flag-box'><div class='iti-flag " + c.iso2 + "'></div></div>";
                tmp += "<span class='country-name'>" + c.name + "</span>";
                tmp += "<span class='dial-code'>+" + c.dialCode + "</span>";
                tmp += "</li>";
            }
            this.countryList.append(tmp);
        },
        _setInitialState: function() {
            var val = this.telInput.val();
            if (this._getDialCode(val)) {
                this._updateFlagFromNumber(val, true);
            } else if (this.options.initialCountry !== "auto") {
                if (this.options.initialCountry) {
                    this._setFlag(this.options.initialCountry, true);
                } else {
                    this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
                    if (!val) {
                        this._setFlag(this.defaultCountry, true);
                    }
                }
                if (!val && !this.options.nationalMode && !this.options.autoHideDialCode && !this.options.separateDialCode) {
                    this.telInput.val("+" + this.selectedCountryData.dialCode);
                }
            }
            if (val) {
                this._updateValFromNumber(val, this.options.formatOnInit);
            }
        },
        _initListeners: function() {
            this._initKeyListeners();
            if (this.options.autoHideDialCode) {
                this._initFocusListeners();
            }
            if (this.options.allowDropdown) {
                this._initDropdownListeners();
            }
        },
        _initDropdownListeners: function() {
            var that = this;
            var label = this.telInput.closest("label");
            if (label.length) {
                label.on("click" + this.ns, function(e) {
                    if (that.countryList.hasClass("hide")) {
                        that.telInput.focus();
                    } else {
                        e.preventDefault();
                    }
                });
            }
            var selectedFlag = this.selectedFlagInner.parent();
            selectedFlag.on("click" + this.ns, function(e) {
                if (that.countryList.hasClass("hide") && !that.telInput.prop("disabled") && !that.telInput.prop("readonly")) {
                    that._showDropdown();
                }
            });
            this.flagsContainer.on("keydown" + that.ns, function(e) {
                var isDropdownHidden = that.countryList.hasClass("hide");
                if (isDropdownHidden && (e.which == keys.UP || e.which == keys.DOWN || e.which == keys.SPACE || e.which == keys.ENTER)) {
                    e.preventDefault();
                    e.stopPropagation();
                    that._showDropdown();
                }
                if (e.which == keys.TAB) {
                    that._closeDropdown();
                }
            });
        },
        _initRequests: function() {
            var that = this;
            if (this.options.utilsScript) {
                if ($.fn[pluginName].windowLoaded) {
                    $.fn[pluginName].loadUtils(this.options.utilsScript, this.utilsScriptDeferred);
                } else {
                    $(window).load(function() {
                        $.fn[pluginName].loadUtils(that.options.utilsScript, that.utilsScriptDeferred);
                    });
                }
            } else {
                this.utilsScriptDeferred.resolve();
            }
            if (this.options.initialCountry === "auto") {
                this._loadAutoCountry();
            } else {
                this.autoCountryDeferred.resolve();
            }
        },
        _loadAutoCountry: function() {
            var that = this;
            var cookieAutoCountry = window.Cookies ? Cookies.get("itiAutoCountry") : "";
            if (cookieAutoCountry) {
                $.fn[pluginName].autoCountry = cookieAutoCountry;
            }
            if ($.fn[pluginName].autoCountry) {
                this.handleAutoCountry();
            } else if (!$.fn[pluginName].startedLoadingAutoCountry) {
                $.fn[pluginName].startedLoadingAutoCountry = true;
                if (typeof this.options.geoIpLookup === "function") {
                    this.options.geoIpLookup(function(countryCode) {
                        $.fn[pluginName].autoCountry = countryCode.toLowerCase();
                        if (window.Cookies) {
                            Cookies.set("itiAutoCountry", $.fn[pluginName].autoCountry, {
                                path: "/"
                            });
                        }
                        setTimeout(function() {
                            $(".intl-tel-input input").intlTelInput("handleAutoCountry");
                        });
                    });
                }
            }
        },
        _initKeyListeners: function() {
            var that = this;
            this.telInput.on("keyup" + this.ns, function() {
                that._updateFlagFromNumber(that.telInput.val());
            });
            this.telInput.on("cut" + this.ns + " paste" + this.ns + " keyup" + this.ns, function() {
                setTimeout(function() {
                    that._updateFlagFromNumber(that.telInput.val());
                });
            });
        },
        _cap: function(number) {
            var max = this.telInput.attr("maxlength");
            return max && number.length > max ? number.substr(0, max) : number;
        },
        _initFocusListeners: function() {
            var that = this;
            this.telInput.on("mousedown" + this.ns, function(e) {
                if (!that.telInput.is(":focus") && !that.telInput.val()) {
                    e.preventDefault();
                    that.telInput.focus();
                }
            });
            this.telInput.on("focus" + this.ns, function(e) {
                if (!that.telInput.val() && !that.telInput.prop("readonly") && that.selectedCountryData.dialCode) {
                    that.telInput.val("+" + that.selectedCountryData.dialCode);
                    that.telInput.one("keypress.plus" + that.ns, function(e) {
                        if (e.which == keys.PLUS) {
                            that.telInput.val("");
                        }
                    });
                    setTimeout(function() {
                        var input = that.telInput[0];
                        if (that.isGoodBrowser) {
                            var len = that.telInput.val().length;
                            input.setSelectionRange(len, len);
                        }
                    });
                }
            });
            var form = this.telInput.prop("form");
            if (form) {
                $(form).on("submit" + this.ns, function() {
                    that._removeEmptyDialCode();
                });
            }
            this.telInput.on("blur" + this.ns, function() {
                that._removeEmptyDialCode();
            });
        },
        _removeEmptyDialCode: function() {
            var value = this.telInput.val(),
                startsPlus = value.charAt(0) == "+";
            if (startsPlus) {
                var numeric = this._getNumeric(value);
                if (!numeric || this.selectedCountryData.dialCode == numeric) {
                    this.telInput.val("");
                }
            }
            this.telInput.off("keypress.plus" + this.ns);
        },
        _getNumeric: function(s) {
            return s.replace(/\D/g, "");
        },
        _showDropdown: function() {
            this._setDropdownPosition();
            var activeListItem = this.countryList.children(".active");
            if (activeListItem.length) {
                this._highlightListItem(activeListItem);
                this._scrollTo(activeListItem);
            }
            this._bindDropdownListeners();
            this.selectedFlagInner.children(".iti-arrow").addClass("up");
        },
        _setDropdownPosition: function() {
            var that = this;
            if (this.options.dropdownContainer) {
                this.dropdown.appendTo(this.options.dropdownContainer);
            }
            this.dropdownHeight = this.countryList.removeClass("hide").outerHeight();
            if (!this.isMobile) {
                var pos = this.telInput.offset(),
                    inputTop = pos.top,
                    windowTop = $(window).scrollTop(), // dropdownFitsBelow = (dropdownBottom < windowBottom)
                    dropdownFitsBelow = inputTop + this.telInput.outerHeight() + this.dropdownHeight < windowTop + $(window).height(),
                    dropdownFitsAbove = inputTop - this.dropdownHeight > windowTop;
                this.countryList.toggleClass("dropup", !dropdownFitsBelow && dropdownFitsAbove);
                if (this.options.dropdownContainer) {
                    var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.innerHeight();
                    this.dropdown.css({
                        top: inputTop + extraTop,
                        left: pos.left
                    });
                    $(window).on("scroll" + this.ns, function() {
                        that._closeDropdown();
                    });
                }
            }
        },
        _bindDropdownListeners: function() {
            var that = this;
            this.countryList.on("mouseover" + this.ns, ".country", function(e) {
                that._highlightListItem($(this));
            });
            this.countryList.on("click" + this.ns, ".country", function(e) {
                that._selectListItem($(this));
            });
            var isOpening = true;
            $("html").on("click" + this.ns, function(e) {
                if (!isOpening) {
                    that._closeDropdown();
                }
                isOpening = false;
            });
            var query = "",
                queryTimer = null;
            $(document).on("keydown" + this.ns, function(e) {
                e.preventDefault();
                if (e.which == keys.UP || e.which == keys.DOWN) {
                    that._handleUpDownKey(e.which);
                } else if (e.which == keys.ENTER) {
                    that._handleEnterKey();
                } else if (e.which == keys.ESC) {
                    that._closeDropdown();
                } else if (e.which >= keys.A && e.which <= keys.Z || e.which == keys.SPACE) {
                    if (queryTimer) {
                        clearTimeout(queryTimer);
                    }
                    query += String.fromCharCode(e.which);
                    that._searchForCountry(query);
                    queryTimer = setTimeout(function() {
                        query = "";
                    }, 1e3);
                }
            });
        },
        _handleUpDownKey: function(key) {
            var current = this.countryList.children(".highlight").first();
            var next = key == keys.UP ? current.prev() : current.next();
            if (next.length) {
                if (next.hasClass("divider")) {
                    next = key == keys.UP ? next.prev() : next.next();
                }
                this._highlightListItem(next);
                this._scrollTo(next);
            }
        },
        _handleEnterKey: function() {
            var currentCountry = this.countryList.children(".highlight").first();
            if (currentCountry.length) {
                this._selectListItem(currentCountry);
            }
        },
        _searchForCountry: function(query) {
            for (var i = 0; i < this.countries.length; i++) {
                if (this._startsWith(this.countries[i].name, query)) {
                    var listItem = this.countryList.children("[data-country-code=" + this.countries[i].iso2 + "]").not(".preferred");
                    this._highlightListItem(listItem);
                    this._scrollTo(listItem, true);
                    break;
                }
            }
        },
        _startsWith: function(a, b) {
            return a.substr(0, b.length).toUpperCase() == b;
        },
        _updateValFromNumber: function(number, doFormat, format) {
            if (doFormat && window.intlTelInputUtils && this.selectedCountryData) {
                if (!$.isNumeric(format)) {
                    format = !this.options.separateDialCode && (this.options.nationalMode || number.charAt(0) != "+") ? intlTelInputUtils.numberFormat.NATIONAL : intlTelInputUtils.numberFormat.INTERNATIONAL;
                }
                number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
            }
            number = this._beforeSetNumber(number);
            this.telInput.val(number);
        },
        _updateFlagFromNumber: function(number, isInit) {
            if (number && this.options.nationalMode && this.selectedCountryData && this.selectedCountryData.dialCode == "1" && number.charAt(0) != "+") {
                if (number.charAt(0) != "1") {
                    number = "1" + number;
                }
                number = "+" + number;
            }
            var dialCode = this._getDialCode(number),
                countryCode = null;
            if (dialCode) {
                var countryCodes = this.countryCodes[this._getNumeric(dialCode)],
                    alreadySelected = this.selectedCountryData && $.inArray(this.selectedCountryData.iso2, countryCodes) != -1;
                if (!alreadySelected || this._isUnknownNanp(number, dialCode)) {
                    for (var j = 0; j < countryCodes.length; j++) {
                        if (countryCodes[j]) {
                            countryCode = countryCodes[j];
                            break;
                        }
                    }
                }
            } else if (number.charAt(0) == "+" && this._getNumeric(number).length) {
                countryCode = "";
            } else if (!number || number == "+") {
                countryCode = this.defaultCountry;
            }
            if (countryCode !== null) {
                this._setFlag(countryCode, isInit);
            }
        },
        _isUnknownNanp: function(number, dialCode) {
            return dialCode == "+1" && this._getNumeric(number).length >= 4;
        },
        _highlightListItem: function(listItem) {
            this.countryListItems.removeClass("highlight");
            listItem.addClass("highlight");
        },
        _getCountryData: function(countryCode, ignoreOnlyCountriesOption, allowFail) {
            var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
            for (var i = 0; i < countryList.length; i++) {
                if (countryList[i].iso2 == countryCode) {
                    return countryList[i];
                }
            }
            if (allowFail) {
                return null;
            } else {
                throw new Error("No country data for '" + countryCode + "'");
            }
        },
        _setFlag: function(countryCode, isInit) {
            var prevCountry = this.selectedCountryData && this.selectedCountryData.iso2 ? this.selectedCountryData : {};
            this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {};
            if (this.selectedCountryData.iso2) {
                this.defaultCountry = this.selectedCountryData.iso2;
            }
            this.selectedFlagInner.attr("class", "iti-flag " + countryCode);
            var title = countryCode ? this.selectedCountryData.name + ": +" + this.selectedCountryData.dialCode : "Unknown";
            this.selectedFlagInner.parent().attr("title", title);
            if (this.options.separateDialCode) {
                var dialCode = this.selectedCountryData.dialCode ? "+" + this.selectedCountryData.dialCode : "",
                    parent = this.telInput.parent();
                if (prevCountry.dialCode) {
                    parent.removeClass("iti-sdc-" + (prevCountry.dialCode.length + 1));
                }
                if (dialCode) {
                    parent.addClass("iti-sdc-" + dialCode.length);
                }
                this.selectedDialCode.text(dialCode);
            }
            this._updatePlaceholder();
            this.countryListItems.removeClass("active");
            if (countryCode) {
                this.countryListItems.find(".iti-flag." + countryCode).first().closest(".country").addClass("active");
            }
            if (!isInit && prevCountry.iso2 !== countryCode) {
                this.telInput.trigger("countrychange", this.selectedCountryData);
            }
        },
        _updatePlaceholder: function() {
            if (window.intlTelInputUtils && !this.hadInitialPlaceholder && this.options.autoPlaceholder && this.selectedCountryData) {
                var numberType = intlTelInputUtils.numberType[this.options.numberType],
                    placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : "";
                placeholder = this._beforeSetNumber(placeholder);
                if (typeof this.options.customPlaceholder === "function") {
                    placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
                }
                this.telInput.attr("placeholder", placeholder);
            }
        },
        _selectListItem: function(listItem) {
            this._setFlag(listItem.attr("data-country-code"));
            this._closeDropdown();
            this._updateDialCode(listItem.attr("data-dial-code"), true);
            this.telInput.focus();
            if (this.isGoodBrowser) {
                var len = this.telInput.val().length;
                this.telInput[0].setSelectionRange(len, len);
            }
        },
        _closeDropdown: function() {
            this.countryList.addClass("hide");
            this.selectedFlagInner.children(".iti-arrow").removeClass("up");
            $(document).off(this.ns);
            $("html").off(this.ns);
            this.countryList.off(this.ns);
            if (this.options.dropdownContainer) {
                if (!this.isMobile) {
                    $(window).off("scroll" + this.ns);
                }
                this.dropdown.detach();
            }
        },
        _scrollTo: function(element, middle) {
            var container = this.countryList,
                containerHeight = container.height(),
                containerTop = container.offset().top,
                containerBottom = containerTop + containerHeight,
                elementHeight = element.outerHeight(),
                elementTop = element.offset().top,
                elementBottom = elementTop + elementHeight,
                newScrollTop = elementTop - containerTop + container.scrollTop(),
                middleOffset = containerHeight / 2 - elementHeight / 2;
            if (elementTop < containerTop) {
                if (middle) {
                    newScrollTop -= middleOffset;
                }
                container.scrollTop(newScrollTop);
            } else if (elementBottom > containerBottom) {
                if (middle) {
                    newScrollTop += middleOffset;
                }
                var heightDifference = containerHeight - elementHeight;
                container.scrollTop(newScrollTop - heightDifference);
            }
        },
        _updateDialCode: function(newDialCode, hasSelectedListItem) {
            var inputVal = this.telInput.val(),
                newNumber;
            newDialCode = "+" + newDialCode;
            if (inputVal.charAt(0) == "+") {
                var prevDialCode = this._getDialCode(inputVal);
                if (prevDialCode) {
                    newNumber = inputVal.replace(prevDialCode, newDialCode);
                } else {
                    newNumber = newDialCode;
                }
            } else if (this.options.nationalMode || this.options.separateDialCode) {
                return;
            } else {
                if (inputVal) {
                    newNumber = newDialCode + inputVal;
                } else if (hasSelectedListItem || !this.options.autoHideDialCode) {
                    newNumber = newDialCode;
                } else {
                    return;
                }
            }
            this.telInput.val(newNumber);
        },
        _getDialCode: function(number) {
            var dialCode = "";
            if (number.charAt(0) == "+") {
                var numericChars = "";
                for (var i = 0; i < number.length; i++) {
                    var c = number.charAt(i);
                    if ($.isNumeric(c)) {
                        numericChars += c;
                        if (this.countryCodes[numericChars]) {
                            dialCode = number.substr(0, i + 1);
                        }
                        if (numericChars.length == 4) {
                            break;
                        }
                    }
                }
            }
            return dialCode;
        },
        _getFullNumber: function() {
            var prefix = this.options.separateDialCode ? "+" + this.selectedCountryData.dialCode : "";
            return prefix + this.telInput.val();
        },
        _beforeSetNumber: function(number) {
            if (this.options.separateDialCode) {
                var dialCode = this._getDialCode(number);
                if (dialCode) {
                    if (this.selectedCountryData.areaCodes !== null) {
                        dialCode = "+" + this.selectedCountryData.dialCode;
                    }
                    var start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
                    number = number.substr(start);
                }
            }
            return this._cap(number);
        },
        handleAutoCountry: function() {
            if (this.options.initialCountry === "auto") {
                this.defaultCountry = $.fn[pluginName].autoCountry;
                if (!this.telInput.val()) {
                    this.setCountry(this.defaultCountry);
                }
                this.autoCountryDeferred.resolve();
            }
        },
        destroy: function() {
            if (this.allowDropdown) {
                this._closeDropdown();
                this.selectedFlagInner.parent().off(this.ns);
                this.telInput.closest("label").off(this.ns);
            }
            if (this.options.autoHideDialCode) {
                var form = this.telInput.prop("form");
                if (form) {
                    $(form).off(this.ns);
                }
            }
            this.telInput.off(this.ns);
            var container = this.telInput.parent();
            container.before(this.telInput).remove();
        },
        getExtension: function() {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
            }
            return "";
        },
        getNumber: function(format) {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.formatNumber(this._getFullNumber(), this.selectedCountryData.iso2, format);
            }
            return "";
        },
        getNumberType: function() {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
            }
            return -99;
        },
        getSelectedCountryData: function() {
            return this.selectedCountryData || {};
        },
        getValidationError: function() {
            if (window.intlTelInputUtils) {
                return intlTelInputUtils.getValidationError(this._getFullNumber(), this.selectedCountryData.iso2);
            }
            return -99;
        },
        isValidNumber: function() {
            var val = $.trim(this._getFullNumber()),
                countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
            return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null;
        },
        setCountry: function(countryCode) {
            countryCode = countryCode.toLowerCase();
            if (!this.selectedFlagInner.hasClass(countryCode)) {
                this._setFlag(countryCode);
                this._updateDialCode(this.selectedCountryData.dialCode, false);
            }
        },
        setNumber: function(number, format) {
            this._updateFlagFromNumber(number);
            this._updateValFromNumber(number, $.isNumeric(format), format);
        },
        handleUtils: function() {
            if (window.intlTelInputUtils) {
                if (this.telInput.val()) {
                    this._updateValFromNumber(this.telInput.val(), this.options.formatOnInit);
                }
                this._updatePlaceholder();
            }
            this.utilsScriptDeferred.resolve();
        }
    };
    $.fn[pluginName] = function(options) {
        var args = arguments;
        if (options === undefined || typeof options === "object") {
            var deferreds = [];
            this.each(function() {
                if (!$.data(this, "plugin_" + pluginName)) {
                    var instance = new Plugin(this, options);
                    var instanceDeferreds = instance._init();
                    deferreds.push(instanceDeferreds[0]);
                    deferreds.push(instanceDeferreds[1]);
                    $.data(this, "plugin_" + pluginName, instance);
                }
            });
            return $.when.apply(null, deferreds);
        } else if (typeof options === "string" && options[0] !== "_") {
            var returns;
            this.each(function() {
                var instance = $.data(this, "plugin_" + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === "function") {
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
                if (options === "destroy") {
                    $.data(this, "plugin_" + pluginName, null);
                }
            });
            return returns !== undefined ? returns : this;
        }
    };
    $.fn[pluginName].getCountryData = function() {
        return allCountries;
    };
    $.fn[pluginName].loadUtils = function(path, utilsScriptDeferred) {
        if (!$.fn[pluginName].loadedUtilsScript) {
            $.fn[pluginName].loadedUtilsScript = true;
            $.ajax({
                url: path,
                complete: function() {
                    $(".intl-tel-input input").intlTelInput("handleUtils");
                },
                dataType: "script",
                cache: true
            });
        } else if (utilsScriptDeferred) {
            utilsScriptDeferred.resolve();
        }
    };
    $.fn[pluginName].version = "8.5.2";
    var allCountries = [
        ["Afghanistan (‫افغانستان‬‎)", "af", "93"],
        ["Albania (Shqipëri)", "al", "355"],
        ["Algeria (‫الجزائر‬‎)", "dz", "213"],
        ["American Samoa", "as", "1684"],
        ["Andorra", "ad", "376"],
        ["Angola", "ao", "244"],
        ["Anguilla", "ai", "1264"],
        ["Antigua and Barbuda", "ag", "1268"],
        ["Argentina", "ar", "54"],
        ["Armenia (Հայաստան)", "am", "374"],
        ["Aruba", "aw", "297"],
        ["Australia", "au", "61", 0],
        ["Austria (Österreich)", "at", "43"],
        ["Azerbaijan (Azərbaycan)", "az", "994"],
        ["Bahamas", "bs", "1242"],
        ["Bahrain (‫البحرين‬‎)", "bh", "973"],
        ["Bangladesh (বাংলাদেশ)", "bd", "880"],
        ["Barbados", "bb", "1246"],
        ["Belarus (Беларусь)", "by", "375"],
        ["Belgium (België)", "be", "32"],
        ["Belize", "bz", "501"],
        ["Benin (Bénin)", "bj", "229"],
        ["Bermuda", "bm", "1441"],
        ["Bhutan (འབྲུག)", "bt", "975"],
        ["Bolivia", "bo", "591"],
        ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"],
        ["Botswana", "bw", "267"],
        ["Brazil (Brasil)", "br", "55"],
        ["British Indian Ocean Territory", "io", "246"],
        ["British Virgin Islands", "vg", "1284"],
        ["Brunei", "bn", "673"],
        ["Bulgaria (България)", "bg", "359"],
        ["Burkina Faso", "bf", "226"],
        ["Burundi (Uburundi)", "bi", "257"],
        ["Cambodia (កម្ពុជា)", "kh", "855"],
        ["Cameroon (Cameroun)", "cm", "237"],
        ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]],
        ["Cape Verde (Kabu Verdi)", "cv", "238"],
        ["Caribbean Netherlands", "bq", "599", 1],
        ["Cayman Islands", "ky", "1345"],
        ["Central African Republic (République centrafricaine)", "cf", "236"],
        ["Chad (Tchad)", "td", "235"],
        ["Chile", "cl", "56"],
        ["China (中国)", "cn", "86"],
        ["Christmas Island", "cx", "61", 2],
        ["Cocos (Keeling) Islands", "cc", "61", 1],
        ["Colombia", "co", "57"],
        ["Comoros (‫جزر القمر‬‎)", "km", "269"],
        ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
        ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
        ["Cook Islands", "ck", "682"],
        ["Costa Rica", "cr", "506"],
        ["Côte d’Ivoire", "ci", "225"],
        ["Croatia (Hrvatska)", "hr", "385"],
        ["Cuba", "cu", "53"],
        ["Curaçao", "cw", "599", 0],
        ["Cyprus (Κύπρος)", "cy", "357"],
        ["Czech Republic (Česká republika)", "cz", "420"],
        ["Denmark (Danmark)", "dk", "45"],
        ["Djibouti", "dj", "253"],
        ["Dominica", "dm", "1767"],
        ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]],
        ["Ecuador", "ec", "593"],
        ["Egypt (‫مصر‬‎)", "eg", "20"],
        ["El Salvador", "sv", "503"],
        ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
        ["Eritrea", "er", "291"],
        ["Estonia (Eesti)", "ee", "372"],
        ["Ethiopia", "et", "251"],
        ["Falkland Islands (Islas Malvinas)", "fk", "500"],
        ["Faroe Islands (Føroyar)", "fo", "298"],
        ["Fiji", "fj", "679"],
        ["Finland (Suomi)", "fi", "358", 0],
        ["France", "fr", "33"],
        ["French Guiana (Guyane française)", "gf", "594"],
        ["French Polynesia (Polynésie française)", "pf", "689"],
        ["Gabon", "ga", "241"],
        ["Gambia", "gm", "220"],
        ["Georgia (საქართველო)", "ge", "995"],
        ["Germany (Deutschland)", "de", "49"],
        ["Ghana (Gaana)", "gh", "233"],
        ["Gibraltar", "gi", "350"],
        ["Greece (Ελλάδα)", "gr", "30"],
        ["Greenland (Kalaallit Nunaat)", "gl", "299"],
        ["Grenada", "gd", "1473"],
        ["Guadeloupe", "gp", "590", 0],
        ["Guam", "gu", "1671"],
        ["Guatemala", "gt", "502"],
        ["Guernsey", "gg", "44", 1],
        ["Guinea (Guinée)", "gn", "224"],
        ["Guinea-Bissau (Guiné Bissau)", "gw", "245"],
        ["Guyana", "gy", "592"],
        ["Haiti", "ht", "509"],
        ["Honduras", "hn", "504"],
        ["Hong Kong (香港)", "hk", "852"],
        ["Hungary (Magyarország)", "hu", "36"],
        ["Iceland (Ísland)", "is", "354"],
        ["India (भारत)", "in", "91"],
        ["Indonesia", "id", "62"],
        ["Iran (‫ایران‬‎)", "ir", "98"],
        ["Iraq (‫العراق‬‎)", "iq", "964"],
        ["Ireland", "ie", "353"],
        ["Isle of Man", "im", "44", 2],
        ["Israel (‫ישראל‬‎)", "il", "972"],
        ["Italy (Italia)", "it", "39", 0],
        ["Jamaica", "jm", "1876"],
        ["Japan (日本)", "jp", "81"],
        ["Jersey", "je", "44", 3],
        ["Jordan (‫الأردن‬‎)", "jo", "962"],
        ["Kazakhstan (Казахстан)", "kz", "7", 1],
        ["Kenya", "ke", "254"],
        ["Kiribati", "ki", "686"],
        ["Kuwait (‫الكويت‬‎)", "kw", "965"],
        ["Kyrgyzstan (Кыргызстан)", "kg", "996"],
        ["Laos (ລາວ)", "la", "856"],
        ["Latvia (Latvija)", "lv", "371"],
        ["Lebanon (‫لبنان‬‎)", "lb", "961"],
        ["Lesotho", "ls", "266"],
        ["Liberia", "lr", "231"],
        ["Libya (‫ليبيا‬‎)", "ly", "218"],
        ["Liechtenstein", "li", "423"],
        ["Lithuania (Lietuva)", "lt", "370"],
        ["Luxembourg", "lu", "352"],
        ["Macau (澳門)", "mo", "853"],
        ["Macedonia (FYROM) (Македонија)", "mk", "389"],
        ["Madagascar (Madagasikara)", "mg", "261"],
        ["Malawi", "mw", "265"],
        ["Malaysia", "my", "60"],
        ["Maldives", "mv", "960"],
        ["Mali", "ml", "223"],
        ["Malta", "mt", "356"],
        ["Marshall Islands", "mh", "692"],
        ["Martinique", "mq", "596"],
        ["Mauritania (‫موريتانيا‬‎)", "mr", "222"],
        ["Mauritius (Moris)", "mu", "230"],
        ["Mayotte", "yt", "262", 1],
        ["Mexico (México)", "mx", "52"],
        ["Micronesia", "fm", "691"],
        ["Moldova (Republica Moldova)", "md", "373"],
        ["Monaco", "mc", "377"],
        ["Mongolia (Монгол)", "mn", "976"],
        ["Montenegro (Crna Gora)", "me", "382"],
        ["Montserrat", "ms", "1664"],
        ["Morocco (‫المغرب‬‎)", "ma", "212", 0],
        ["Mozambique (Moçambique)", "mz", "258"],
        ["Myanmar (Burma) (မြန်မာ)", "mm", "95"],
        ["Namibia (Namibië)", "na", "264"],
        ["Nauru", "nr", "674"],
        ["Nepal (नेपाल)", "np", "977"],
        ["Netherlands (Nederland)", "nl", "31"],
        ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"],
        ["New Zealand", "nz", "64"],
        ["Nicaragua", "ni", "505"],
        ["Niger (Nijar)", "ne", "227"],
        ["Nigeria", "ng", "234"],
        ["Niue", "nu", "683"],
        ["Norfolk Island", "nf", "672"],
        ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"],
        ["Northern Mariana Islands", "mp", "1670"],
        ["Norway (Norge)", "no", "47", 0],
        ["Oman (‫عُمان‬‎)", "om", "968"],
        ["Pakistan (‫پاکستان‬‎)", "pk", "92"],
        ["Palau", "pw", "680"],
        ["Palestine (‫فلسطين‬‎)", "ps", "970"],
        ["Panama (Panamá)", "pa", "507"],
        ["Papua New Guinea", "pg", "675"],
        ["Paraguay", "py", "595"],
        ["Peru (Perú)", "pe", "51"],
        ["Philippines", "ph", "63"],
        ["Poland (Polska)", "pl", "48"],
        ["Portugal", "pt", "351"],
        ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
        ["Qatar (‫قطر‬‎)", "qa", "974"],
        ["Réunion (La Réunion)", "re", "262", 0],
        ["Romania (România)", "ro", "40"],
        ["Russia (Россия)", "ru", "7", 0],
        ["Rwanda", "rw", "250"],
        ["Saint Barthélemy (Saint-Barthélemy)", "bl", "590", 1],
        ["Saint Helena", "sh", "290"],
        ["Saint Kitts and Nevis", "kn", "1869"],
        ["Saint Lucia", "lc", "1758"],
        ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2],
        ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
        ["Saint Vincent and the Grenadines", "vc", "1784"],
        ["Samoa", "ws", "685"],
        ["San Marino", "sm", "378"],
        ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"],
        ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"],
        ["Senegal (Sénégal)", "sn", "221"],
        ["Serbia (Србија)", "rs", "381"],
        ["Seychelles", "sc", "248"],
        ["Sierra Leone", "sl", "232"],
        ["Singapore", "sg", "65"],
        ["Sint Maarten", "sx", "1721"],
        ["Slovakia (Slovensko)", "sk", "421"],
        ["Slovenia (Slovenija)", "si", "386"],
        ["Solomon Islands", "sb", "677"],
        ["Somalia (Soomaaliya)", "so", "252"],
        ["South Africa", "za", "27"],
        ["South Korea (대한민국)", "kr", "82"],
        ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"],
        ["Spain (España)", "es", "34"],
        ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"],
        ["Sudan (‫السودان‬‎)", "sd", "249"],
        ["Suriname", "sr", "597"],
        ["Svalbard and Jan Mayen", "sj", "47", 1],
        ["Swaziland", "sz", "268"],
        ["Sweden (Sverige)", "se", "46"],
        ["Switzerland (Schweiz)", "ch", "41"],
        ["Syria (‫سوريا‬‎)", "sy", "963"],
        ["Taiwan (台灣)", "tw", "886"],
        ["Tajikistan", "tj", "992"],
        ["Tanzania", "tz", "255"],
        ["Thailand (ไทย)", "th", "66"],
        ["Timor-Leste", "tl", "670"],
        ["Togo", "tg", "228"],
        ["Tokelau", "tk", "690"],
        ["Tonga", "to", "676"],
        ["Trinidad and Tobago", "tt", "1868"],
        ["Tunisia (‫تونس‬‎)", "tn", "216"],
        ["Turkey (Türkiye)", "tr", "90"],
        ["Turkmenistan", "tm", "993"],
        ["Turks and Caicos Islands", "tc", "1649"],
        ["Tuvalu", "tv", "688"],
        ["U.S. Virgin Islands", "vi", "1340"],
        ["Uganda", "ug", "256"],
        ["Ukraine (Україна)", "ua", "380"],
        ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"],
        ["United Kingdom", "gb", "44", 0],
        ["United States", "us", "1", 0],
        ["Uruguay", "uy", "598"],
        ["Uzbekistan (Oʻzbekiston)", "uz", "998"],
        ["Vanuatu", "vu", "678"],
        ["Vatican City (Città del Vaticano)", "va", "39", 1],
        ["Venezuela", "ve", "58"],
        ["Vietnam (Việt Nam)", "vn", "84"],
        ["Wallis and Futuna", "wf", "681"],
        ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1],
        ["Yemen (‫اليمن‬‎)", "ye", "967"],
        ["Zambia", "zm", "260"],
        ["Zimbabwe", "zw", "263"],
        ["Åland Islands", "ax", "358", 1]
    ];
    for (var i = 0; i < allCountries.length; i++) {
        var c = allCountries[i];
        allCountries[i] = {
            name: c[0],
            iso2: c[1],
            dialCode: c[2],
            priority: c[3] || 0,
            areaCodes: c[4] || null
        };
    }
});
! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Clipboard = t()
    }
}(function() {
    var t, e, n;
    return function t(e, n, o) {
        function i(c, a) {
            if (!n[c]) {
                if (!e[c]) {
                    var s = "function" == typeof require && require;
                    if (!a && s) return s(c, !0);
                    if (r) return r(c, !0);
                    var l = new Error("Cannot find module '" + c + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var u = n[c] = {
                    exports: {}
                };
                e[c][0].call(u.exports, function(t) {
                    var n = e[c][1][t];
                    return i(n ? n : t)
                }, u, u.exports, t, e, n, o)
            }
            return n[c].exports
        }
        for (var r = "function" == typeof require && require, c = 0; c < o.length; c++) i(o[c]);
        return i
    }({
        1: [function(t, e, n) {
            var o = t("matches-selector");
            e.exports = function(t, e, n) {
                for (var i = n ? t : t.parentNode; i && i !== document;) {
                    if (o(i, e)) return i;
                    i = i.parentNode
                }
            }
        }, {
            "matches-selector": 5
        }],
        2: [function(t, e, n) {
            function o(t, e, n, o, r) {
                var c = i.apply(this, arguments);
                return t.addEventListener(n, c, r), {
                    destroy: function() {
                        t.removeEventListener(n, c, r)
                    }
                }
            }

            function i(t, e, n, o) {
                return function(n) {
                    n.delegateTarget = r(n.target, e, !0), n.delegateTarget && o.call(t, n)
                }
            }
            var r = t("closest");
            e.exports = o
        }, {
            closest: 1
        }],
        3: [function(t, e, n) {
            n.node = function(t) {
                return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
            }, n.nodeList = function(t) {
                var e = Object.prototype.toString.call(t);
                return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]))
            }, n.string = function(t) {
                return "string" == typeof t || t instanceof String
            }, n.fn = function(t) {
                var e = Object.prototype.toString.call(t);
                return "[object Function]" === e
            }
        }, {}],
        4: [function(t, e, n) {
            function o(t, e, n) {
                if (!t && !e && !n) throw new Error("Missing required arguments");
                if (!a.string(e)) throw new TypeError("Second argument must be a String");
                if (!a.fn(n)) throw new TypeError("Third argument must be a Function");
                if (a.node(t)) return i(t, e, n);
                if (a.nodeList(t)) return r(t, e, n);
                if (a.string(t)) return c(t, e, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }

            function i(t, e, n) {
                return t.addEventListener(e, n), {
                    destroy: function() {
                        t.removeEventListener(e, n)
                    }
                }
            }

            function r(t, e, n) {
                return Array.prototype.forEach.call(t, function(t) {
                    t.addEventListener(e, n)
                }), {
                    destroy: function() {
                        Array.prototype.forEach.call(t, function(t) {
                            t.removeEventListener(e, n)
                        })
                    }
                }
            }

            function c(t, e, n) {
                return s(document.body, t, e, n)
            }
            var a = t("./is"),
                s = t("delegate");
            e.exports = o
        }, {
            "./is": 3,
            delegate: 2
        }],
        5: [function(t, e, n) {
            function o(t, e) {
                if (r) return r.call(t, e);
                for (var n = t.parentNode.querySelectorAll(e), o = 0; o < n.length; ++o)
                    if (n[o] == t) return !0;
                return !1
            }
            var i = Element.prototype,
                r = i.matchesSelector || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector;
            e.exports = o
        }, {}],
        6: [function(t, e, n) {
            function o(t) {
                var e;
                if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) t.focus(), t.setSelectionRange(0, t.value.length), e = t.value;
                else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var n = window.getSelection(),
                        o = document.createRange();
                    o.selectNodeContents(t), n.removeAllRanges(), n.addRange(o), e = n.toString()
                }
                return e
            }
            e.exports = o
        }, {}],
        7: [function(t, e, n) {
            function o() {}
            o.prototype = {
                on: function(t, e, n) {
                    var o = this.e || (this.e = {});
                    return (o[t] || (o[t] = [])).push({
                        fn: e,
                        ctx: n
                    }), this
                },
                once: function(t, e, n) {
                    function o() {
                        i.off(t, o), e.apply(n, arguments)
                    }
                    var i = this;
                    return o._ = e, this.on(t, o, n)
                },
                emit: function(t) {
                    var e = [].slice.call(arguments, 1),
                        n = ((this.e || (this.e = {}))[t] || []).slice(),
                        o = 0,
                        i = n.length;
                    for (o; i > o; o++) n[o].fn.apply(n[o].ctx, e);
                    return this
                },
                off: function(t, e) {
                    var n = this.e || (this.e = {}),
                        o = n[t],
                        i = [];
                    if (o && e)
                        for (var r = 0, c = o.length; c > r; r++) o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
                    return i.length ? n[t] = i : delete n[t], this
                }
            }, e.exports = o
        }, {}],
        8: [function(e, n, o) {
            ! function(i, r) {
                if ("function" == typeof t && t.amd) t(["module", "select"], r);
                else if ("undefined" != typeof o) r(n, e("select"));
                else {
                    var c = {
                        exports: {}
                    };
                    r(c, i.select), i.clipboardAction = c.exports
                }
            }(this, function(t, e) {
                "use strict";

                function n(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                var i = n(e),
                    r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t
                    } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
                    },
                    c = function() {
                        function t(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var o = e[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                            }
                        }
                        return function(e, n, o) {
                            return n && t(e.prototype, n), o && t(e, o), e
                        }
                    }(),
                    a = function() {
                        function t(e) {
                            o(this, t), this.resolveOptions(e), this.initSelection()
                        }
                        return t.prototype.resolveOptions = function t() {
                            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                            this.action = e.action, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = ""
                        }, t.prototype.initSelection = function t() {
                            this.text ? this.selectFake() : this.target && this.selectTarget()
                        }, t.prototype.selectFake = function t() {
                            var e = this,
                                n = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandler = document.body.addEventListener("click", function() {
                                return e.removeFake()
                            }), this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "fixed", this.fakeElem.style[n ? "right" : "left"] = "-9999px", this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, document.body.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText()
                        }, t.prototype.removeFake = function t() {
                            this.fakeHandler && (document.body.removeEventListener("click"), this.fakeHandler = null), this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null)
                        }, t.prototype.selectTarget = function t() {
                            this.selectedText = (0, i.default)(this.target), this.copyText()
                        }, t.prototype.copyText = function t() {
                            var e = void 0;
                            try {
                                e = document.execCommand(this.action)
                            } catch (n) {
                                e = !1
                            }
                            this.handleResult(e)
                        }, t.prototype.handleResult = function t(e) {
                            e ? this.emitter.emit("success", {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            }) : this.emitter.emit("error", {
                                action: this.action,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            })
                        }, t.prototype.clearSelection = function t() {
                            this.target && this.target.blur(), window.getSelection().removeAllRanges()
                        }, t.prototype.destroy = function t() {
                            this.removeFake()
                        }, c(t, [{
                            key: "action",
                            set: function t() {
                                var e = arguments.length <= 0 || void 0 === arguments[0] ? "copy" : arguments[0];
                                if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                            },
                            get: function t() {
                                return this._action
                            }
                        }, {
                            key: "target",
                            set: function t(e) {
                                if (void 0 !== e) {
                                    if (!e || "object" !== ("undefined" == typeof e ? "undefined" : r(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                    if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    this._target = e
                                }
                            },
                            get: function t() {
                                return this._target
                            }
                        }]), t
                    }();
                t.exports = a
            })
        }, {
            select: 6
        }],
        9: [function(e, n, o) {
            ! function(i, r) {
                if ("function" == typeof t && t.amd) t(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r);
                else if ("undefined" != typeof o) r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener"));
                else {
                    var c = {
                        exports: {}
                    };
                    r(c, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = c.exports
                }
            }(this, function(t, e, n, o) {
                "use strict";

                function i(t) {
                    return t && t.__esModule ? t : {
                        "default": t
                    }
                }

                function r(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function c(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }

                function s(t, e) {
                    var n = "data-clipboard-" + t;
                    if (e.hasAttribute(n)) return e.getAttribute(n)
                }
                var l = i(e),
                    u = i(n),
                    f = i(o),
                    d = function(t) {
                        function e(n, o) {
                            r(this, e);
                            var i = c(this, t.call(this));
                            return i.resolveOptions(o), i.listenClick(n), i
                        }
                        return a(e, t), e.prototype.resolveOptions = function t() {
                            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                            this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText
                        }, e.prototype.listenClick = function t(e) {
                            var n = this;
                            this.listener = (0, f.default)(e, "click", function(t) {
                                return n.onClick(t)
                            })
                        }, e.prototype.onClick = function t(e) {
                            var n = e.delegateTarget || e.currentTarget;
                            this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l.default({
                                action: this.action(n),
                                target: this.target(n),
                                text: this.text(n),
                                trigger: n,
                                emitter: this
                            })
                        }, e.prototype.defaultAction = function t(e) {
                            return s("action", e)
                        }, e.prototype.defaultTarget = function t(e) {
                            var n = s("target", e);
                            return n ? document.querySelector(n) : void 0
                        }, e.prototype.defaultText = function t(e) {
                            return s("text", e)
                        }, e.prototype.destroy = function t() {
                            this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                        }, e
                    }(u.default);
                t.exports = d
            })
        }, {
            "./clipboard-action": 8,
            "good-listener": 4,
            "tiny-emitter": 7
        }]
    }, {}, [9])(9)
});
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function(key, value, options) {
        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
            }
            return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''
            ].join(''));
        }
        var result = key ? undefined : {},
            cookies = document.cookie ? document.cookie.split('; ') : [],
            i = 0,
            l = cookies.length;
        for (; i < l; i++) {
            var parts = cookies[i].split('='),
                name = decode(parts.shift()),
                cookie = parts.join('=');
            if (key === name) {
                result = read(cookie, value);
                break;
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        $.cookie(key, '', $.extend({}, options, {
            expires: -1
        }));
        return !$.cookie(key);
    };
}));
! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i]
    }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }), -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }, e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }, r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                }, r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) {
            r.options[i] = e
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                a.postSlide(o)
            }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
            a.postSlide(o)
        }) : a.postSlide(o));
        else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
                a.postSlide(s)
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== t ? a.animateSlide(d, function() {
                a.postSlide(s)
            }) : a.postSlide(s)
        }
    }, e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o
    }
});
(function($) {
    'use strict';
    var methods = {
        init: function(options) {
            return this.each(function() {
                this.self = $(this);
                methods.destroy.call(this.self);
                this.opt = $.extend(true, {}, $.fn.raty.defaults, options, this.self.data());
                methods._adjustCallback.call(this);
                methods._adjustNumber.call(this);
                methods._adjustHints.call(this);
                this.opt.score = methods._adjustedScore.call(this, this.opt.score);
                if (this.opt.starType !== 'img') {
                    methods._adjustStarType.call(this);
                }
                methods._adjustPath.call(this);
                methods._createStars.call(this);
                if (this.opt.cancel) {
                    methods._createCancel.call(this);
                }
                if (this.opt.precision) {
                    methods._adjustPrecision.call(this);
                }
                methods._createScore.call(this);
                methods._apply.call(this, this.opt.score);
                methods._setTitle.call(this, this.opt.score);
                methods._target.call(this, this.opt.score);
                if (this.opt.readOnly) {
                    methods._lock.call(this);
                } else {
                    this.style.cursor = 'pointer';
                    methods._binds.call(this);
                }
            });
        },
        _adjustCallback: function() {
            var options = ['number', 'readOnly', 'score', 'scoreName', 'target', 'path'];
            for (var i = 0; i < options.length; i++) {
                if (typeof this.opt[options[i]] === 'function') {
                    this.opt[options[i]] = this.opt[options[i]].call(this);
                }
            }
        },
        _adjustedScore: function(score) {
            if (!score) {
                return score;
            }
            return methods._between(score, 0, this.opt.number);
        },
        _adjustHints: function() {
            if (!this.opt.hints) {
                this.opt.hints = [];
            }
            if (!this.opt.halfShow && !this.opt.half) {
                return;
            }
            var steps = this.opt.precision ? 10 : 2;
            for (var i = 0; i < this.opt.number; i++) {
                var group = this.opt.hints[i];
                if (Object.prototype.toString.call(group) !== '[object Array]') {
                    group = [group];
                }
                this.opt.hints[i] = [];
                for (var j = 0; j < steps; j++) {
                    var
                        hint = group[j],
                        last = group[group.length - 1];
                    if (last === undefined) {
                        last = null;
                    }
                    this.opt.hints[i][j] = hint === undefined ? last : hint;
                }
            }
        },
        _adjustNumber: function() {
            this.opt.number = methods._between(this.opt.number, 1, this.opt.numberMax);
        },
        _adjustPath: function() {
            this.opt.path = this.opt.path || '';
            if (this.opt.path && this.opt.path.charAt(this.opt.path.length - 1) !== '/') {
                this.opt.path += '/';
            }
        },
        _adjustPrecision: function() {
            this.opt.half = true;
        },
        _adjustStarType: function() {
            var replaces = ['cancelOff', 'cancelOn', 'starHalf', 'starOff', 'starOn'];
            this.opt.path = '';
            for (var i = 0; i < replaces.length; i++) {
                this.opt[replaces[i]] = this.opt[replaces[i]].replace('.', '-');
            }
        },
        _apply: function(score) {
            methods._fill.call(this, score);
            if (score) {
                if (score > 0) {
                    this.score.val(score);
                }
                methods._roundStars.call(this, score);
            }
        },
        _between: function(value, min, max) {
            return Math.min(Math.max(parseFloat(value), min), max);
        },
        _binds: function() {
            if (this.cancel) {
                methods._bindOverCancel.call(this);
                methods._bindClickCancel.call(this);
                methods._bindOutCancel.call(this);
            }
            methods._bindOver.call(this);
            methods._bindClick.call(this);
            methods._bindOut.call(this);
        },
        _bindClick: function() {
            var that = this;
            that.stars.on('click.raty', function(evt) {
                var
                    execute = true,
                    score = (that.opt.half || that.opt.precision) ? that.self.data('score') : (this.alt || $(this).data('alt'));
                if (that.opt.click) {
                    execute = that.opt.click.call(that, +score, evt);
                }
                if (execute || execute === undefined) {
                    if (that.opt.half && !that.opt.precision) {
                        score = methods._roundHalfScore.call(that, score);
                    }
                    methods._apply.call(that, score);
                }
            });
        },
        _bindClickCancel: function() {
            var that = this;
            that.cancel.on('click.raty', function(evt) {
                that.score.removeAttr('value');
                if (that.opt.click) {
                    that.opt.click.call(that, null, evt);
                }
            });
        },
        _bindOut: function() {
            var that = this;
            that.self.on('mouseleave.raty', function(evt) {
                var score = +that.score.val() || undefined;
                methods._apply.call(that, score);
                methods._target.call(that, score, evt);
                methods._resetTitle.call(that);
                if (that.opt.mouseout) {
                    that.opt.mouseout.call(that, score, evt);
                }
            });
        },
        _bindOutCancel: function() {
            var that = this;
            that.cancel.on('mouseleave.raty', function(evt) {
                var icon = that.opt.cancelOff;
                if (that.opt.starType !== 'img') {
                    icon = that.opt.cancelClass + ' ' + icon;
                }
                methods._setIcon.call(that, this, icon);
                if (that.opt.mouseout) {
                    var score = +that.score.val() || undefined;
                    that.opt.mouseout.call(that, score, evt);
                }
            });
        },
        _bindOver: function() {
            var
                that = this,
                action = that.opt.half ? 'mousemove.raty' : 'mouseover.raty';
            that.stars.on(action, function(evt) {
                var score = methods._getScoreByPosition.call(that, evt, this);
                methods._fill.call(that, score);
                if (that.opt.half) {
                    methods._roundStars.call(that, score, evt);
                    methods._setTitle.call(that, score, evt);
                    that.self.data('score', score);
                }
                methods._target.call(that, score, evt);
                if (that.opt.mouseover) {
                    that.opt.mouseover.call(that, score, evt);
                }
            });
        },
        _bindOverCancel: function() {
            var that = this;
            that.cancel.on('mouseover.raty', function(evt) {
                var
                    starOff = that.opt.path + that.opt.starOff,
                    icon = that.opt.cancelOn;
                if (that.opt.starType === 'img') {
                    that.stars.attr('src', starOff);
                } else {
                    icon = that.opt.cancelClass + ' ' + icon;
                    that.stars.attr('class', starOff);
                }
                methods._setIcon.call(that, this, icon);
                methods._target.call(that, null, evt);
                if (that.opt.mouseover) {
                    that.opt.mouseover.call(that, null);
                }
            });
        },
        _buildScoreField: function() {
            return $('<input />', {
                name: this.opt.scoreName,
                type: 'hidden'
            }).appendTo(this);
        },
        _createCancel: function() {
            var
                icon = this.opt.path + this.opt.cancelOff,
                cancel = $('<' + this.opt.starType + ' />', {
                    title: this.opt.cancelHint,
                    'class': this.opt.cancelClass
                });
            if (this.opt.starType === 'img') {
                cancel.attr({
                    src: icon,
                    alt: 'x'
                });
            } else {
                cancel.attr('data-alt', 'x').addClass(icon);
            }
            if (this.opt.cancelPlace === 'left') {
                this.self.prepend('&#160;').prepend(cancel);
            } else {
                this.self.append('&#160;').append(cancel);
            }
            this.cancel = cancel;
        },
        _createScore: function() {
            var score = $(this.opt.targetScore);
            this.score = score.length ? score : methods._buildScoreField.call(this);
        },
        _createStars: function() {
            for (var i = 1; i <= this.opt.number; i++) {
                var
                    name = methods._nameForIndex.call(this, i),
                    attrs = {
                        alt: i,
                        src: this.opt.path + this.opt[name]
                    };
                if (this.opt.starType !== 'img') {
                    attrs = {
                        'data-alt': i,
                        'class': attrs.src
                    }; // TODO: use $.data.
                }
                attrs.title = methods._getHint.call(this, i);
                $('<' + this.opt.starType + ' />', attrs).appendTo(this);
                if (this.opt.space) {
                    this.self.append(i < this.opt.number ? '&#160;' : '');
                }
            }
            this.stars = this.self.children(this.opt.starType);
        },
        _error: function(message) {
            $(this).text(message);
            $.error(message);
        },
        _fill: function(score) {
            var hash = 0;
            for (var i = 1; i <= this.stars.length; i++) {
                var
                    icon, star = this.stars[i - 1],
                    turnOn = methods._turnOn.call(this, i, score);
                if (this.opt.iconRange && this.opt.iconRange.length > hash) {
                    var irange = this.opt.iconRange[hash];
                    icon = methods._getRangeIcon.call(this, irange, turnOn);
                    if (i <= irange.range) {
                        methods._setIcon.call(this, star, icon);
                    }
                    if (i === irange.range) {
                        hash++;
                    }
                } else {
                    icon = this.opt[turnOn ? 'starOn' : 'starOff'];
                    methods._setIcon.call(this, star, icon);
                }
            }
        },
        _getFirstDecimal: function(number) {
            var
                decimal = number.toString().split('.')[1],
                result = 0;
            if (decimal) {
                result = parseInt(decimal.charAt(0), 10);
                if (decimal.slice(1, 5) === '9999') {
                    result++;
                }
            }
            return result;
        },
        _getRangeIcon: function(irange, turnOn) {
            return turnOn ? irange.on || this.opt.starOn : irange.off || this.opt.starOff;
        },
        _getScoreByPosition: function(evt, icon) {
            var score = parseInt(icon.alt || icon.getAttribute('data-alt'), 10);
            if (this.opt.half) {
                var
                    size = methods._getWidth.call(this),
                    percent = parseFloat((evt.pageX - $(icon).offset().left) / size);
                score = score - 1 + percent;
            }
            return score;
        },
        _getHint: function(score, evt) {
            if (score !== 0 && !score) {
                return this.opt.noRatedMsg;
            }
            var
                decimal = methods._getFirstDecimal.call(this, score),
                integer = Math.ceil(score),
                group = this.opt.hints[(integer || 1) - 1],
                hint = group,
                set = !evt || this.move;
            if (this.opt.precision) {
                if (set) {
                    decimal = decimal === 0 ? 9 : decimal - 1;
                }
                hint = group[decimal];
            } else if (this.opt.halfShow || this.opt.half) {
                decimal = set && decimal === 0 ? 1 : decimal > 5 ? 1 : 0;
                hint = group[decimal];
            }
            return hint === '' ? '' : hint || score;
        },
        _getWidth: function() {
            var width = this.stars[0].width || parseFloat(this.stars.eq(0).css('font-size'));
            if (!width) {
                methods._error.call(this, 'Could not get the icon width!');
            }
            return width;
        },
        _lock: function() {
            var hint = methods._getHint.call(this, this.score.val());
            this.style.cursor = '';
            this.title = hint;
            this.score.prop('readonly', true);
            this.stars.prop('title', hint);
            if (this.cancel) {
                this.cancel.hide();
            }
            this.self.data('readonly', true);
        },
        _nameForIndex: function(i) {
            return this.opt.score && this.opt.score >= i ? 'starOn' : 'starOff';
        },
        _resetTitle: function() {
            for (var i = 0; i < this.opt.number; i++) {
                this.stars[i].title = methods._getHint.call(this, i + 1);
            }
        },
        _roundHalfScore: function(score) {
            var
                integer = parseInt(score, 10),
                decimal = methods._getFirstDecimal.call(this, score);
            if (decimal !== 0) {
                decimal = decimal > 5 ? 1 : 0.5;
            }
            return integer + decimal;
        },
        _roundStars: function(score, evt) {
            var
                decimal = (score % 1).toFixed(2),
                name;
            if (evt || this.move) {
                name = decimal > 0.5 ? 'starOn' : 'starHalf';
            } else if (decimal > this.opt.round.down) { // Up: [x.76 .. x.99]
                name = 'starOn';
                if (this.opt.halfShow && decimal < this.opt.round.up) { // Half: [x.26 .. x.75]
                    name = 'starHalf';
                } else if (decimal < this.opt.round.full) { // Down: [x.00 .. x.5]
                    name = 'starOff';
                }
            }
            if (name) {
                var
                    icon = this.opt[name],
                    star = this.stars[Math.ceil(score) - 1];
                methods._setIcon.call(this, star, icon);
            } // Full down: [x.00 .. x.25]
        },
        _setIcon: function(star, icon) {
            star[this.opt.starType === 'img' ? 'src' : 'className'] = this.opt.path + icon;
        },
        _setTarget: function(target, score) {
            if (score) {
                score = this.opt.targetFormat.toString().replace('{score}', score);
            }
            if (target.is(':input')) {
                target.val(score);
            } else {
                target.html(score);
            }
        },
        _setTitle: function(score, evt) {
            if (score) {
                var
                    integer = parseInt(Math.ceil(score), 10),
                    star = this.stars[integer - 1];
                star.title = methods._getHint.call(this, score, evt);
            }
        },
        _target: function(score, evt) {
            if (this.opt.target) {
                var target = $(this.opt.target);
                if (!target.length) {
                    methods._error.call(this, 'Target selector invalid or missing!');
                }
                var mouseover = evt && evt.type === 'mouseover';
                if (score === undefined) {
                    score = this.opt.targetText;
                } else if (score === null) {
                    score = mouseover ? this.opt.cancelHint : this.opt.targetText;
                } else {
                    if (this.opt.targetType === 'hint') {
                        score = methods._getHint.call(this, score, evt);
                    } else if (this.opt.precision) {
                        score = parseFloat(score).toFixed(1);
                    }
                    var mousemove = evt && evt.type === 'mousemove';
                    if (!mouseover && !mousemove && !this.opt.targetKeep) {
                        score = this.opt.targetText;
                    }
                }
                methods._setTarget.call(this, target, score);
            }
        },
        _turnOn: function(i, score) {
            return this.opt.single ? (i === score) : (i <= score);
        },
        _unlock: function() {
            this.style.cursor = 'pointer';
            this.removeAttribute('title');
            this.score.removeAttr('readonly');
            this.self.data('readonly', false);
            for (var i = 0; i < this.opt.number; i++) {
                this.stars[i].title = methods._getHint.call(this, i + 1);
            }
            if (this.cancel) {
                this.cancel.css('display', '');
            }
        },
        cancel: function(click) {
            return this.each(function() {
                var self = $(this);
                if (self.data('readonly') !== true) {
                    methods[click ? 'click' : 'score'].call(self, null);
                    this.score.removeAttr('value');
                }
            });
        },
        click: function(score) {
            return this.each(function() {
                if ($(this).data('readonly') !== true) {
                    score = methods._adjustedScore.call(this, score);
                    methods._apply.call(this, score);
                    if (this.opt.click) {
                        this.opt.click.call(this, score, $.Event('click'));
                    }
                    methods._target.call(this, score);
                }
            });
        },
        destroy: function() {
            return this.each(function() {
                var
                    self = $(this),
                    raw = self.data('raw');
                if (raw) {
                    self.off('.raty').empty().css({
                        cursor: raw.style.cursor
                    }).removeData('readonly');
                } else {
                    self.data('raw', self.clone()[0]);
                }
            });
        },
        getScore: function() {
            var
                score = [],
                value;
            this.each(function() {
                value = this.score.val();
                score.push(value ? +value : undefined);
            });
            return (score.length > 1) ? score : score[0];
        },
        move: function(score) {
            return this.each(function() {
                var
                    integer = parseInt(score, 10),
                    decimal = methods._getFirstDecimal.call(this, score);
                if (integer >= this.opt.number) {
                    integer = this.opt.number - 1;
                    decimal = 10;
                }
                var
                    width = methods._getWidth.call(this),
                    steps = width / 10,
                    star = $(this.stars[integer]),
                    percent = star.offset().left + steps * decimal,
                    evt = $.Event('mousemove', {
                        pageX: percent
                    });
                this.move = true;
                star.trigger(evt);
                this.move = false;
            });
        },
        readOnly: function(readonly) {
            return this.each(function() {
                var self = $(this);
                if (self.data('readonly') !== readonly) {
                    if (readonly) {
                        self.off('.raty').children(this.opt.starType).off('.raty');
                        methods._lock.call(this);
                    } else {
                        methods._binds.call(this);
                        methods._unlock.call(this);
                    }
                    self.data('readonly', readonly);
                }
            });
        },
        reload: function() {
            return methods.set.call(this, {});
        },
        score: function() {
            var self = $(this);
            return arguments.length ? methods.setScore.apply(self, arguments) : methods.getScore.call(self);
        },
        set: function(options) {
            return this.each(function() {
                $(this).raty($.extend({}, this.opt, options));
            });
        },
        setScore: function(score) {
            return this.each(function() {
                if ($(this).data('readonly') !== true) {
                    score = methods._adjustedScore.call(this, score);
                    methods._apply.call(this, score);
                    methods._target.call(this, score);
                }
            });
        }
    };
    $.fn.raty = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };
    $.fn.raty.defaults = {
        cancel: false,
        cancelClass: 'raty-cancel',
        cancelHint: 'Cancel this rating!',
        cancelOff: 'cancel-off.png',
        cancelOn: 'cancel-on.png',
        cancelPlace: 'left',
        click: undefined,
        half: false,
        halfShow: true,
        hints: ['bad', 'poor', 'regular', 'good', 'gorgeous'],
        iconRange: undefined,
        mouseout: undefined,
        mouseover: undefined,
        noRatedMsg: 'Not rated yet!',
        number: 5,
        numberMax: 20,
        path: undefined,
        precision: false,
        readOnly: false,
        round: {
            down: 0.25,
            full: 0.6,
            up: 0.76
        },
        score: undefined,
        scoreName: 'score',
        single: false,
        space: true,
        starHalf: 'star-half.png',
        starOff: 'star-off.png',
        starOn: 'star-on.png',
        starType: 'img',
        target: undefined,
        targetFormat: '{score}',
        targetKeep: false,
        targetScore: undefined,
        targetText: '',
        targetType: 'hint'
    };
})(jQuery);

function calendar_handler() {
    var that = this;
    that.init = function(settings) {
        that.$fakeInput = settings.$fakeInput;
        that.$hiddenInput = settings.$hiddenInput;
        that.$fakeInputIcon = settings.$fakeInputIcon;
        that.type = settings.type;
        that.title = settings.title;
        that.calendarSettings = settings.calendarSettings;
        that.onInit = settings.onInit;
        that.onSubmit = settings.onSubmit;
        that.customClass = settings.customClass ? settings.customClass : '';
        if (that.$fakeInput.length === 0) return;
        that.addPluginAbilityToInput();
        if (that.calendarSettings) {
            that.calendarSettings.format = that.getDatePickerSupportedFormat(settings.calendarSettings.format);
            if (that.calendarSettings.startDate) {
                var dayObj = dayjs(new Date(that.calendarSettings.startDate));
                dayObj = dayObj.format(that.calendarSettings.format);
                that.$fakeInput.html(dayObj);
                that.$hiddenInput.val(dayObj);
            }
        }
        if (that.onInit) {
            that.onInit.call();
        }
    };
    that.setDate = function(date) {
        var dayObj = dayjs(date);
        dayObj = dayObj.format(that.calendarSettings.format);
        that.$fakeInput.html(dayObj);
        that.$hiddenInput.val(dayObj);
    };
    that.addPluginAbilityToInput = function() {
        that.$fakeInput.addClass('s123-calendar-handler-input');
        that.$fakeInput.off('click').on('click', function() {
            that.showPopUp();
        });
        that.$fakeInputIcon.off('click').on('click', function() {
            that.showPopUp();
        });
    };
    that.showPopUp = function() {
        var title = '';
        var $message = that.getMessageBody();
        switch (that.type) {
            case 'datePicker':
                that.$calendar = that.getCalendar();
                $message.find('.date-picker-container').append(that.$calendar);
                break;
            case 'timePicker':
                that.$time = that.getTime();
                $message.find('.time-picker-container').append(that.$time);
                break;
            case 'dateTimePicker':
                that.$calendar = that.getCalendar();
                that.$time = that.getTime();
                $message.find('.date-picker-container').append(that.$calendar);
                $message.find('.time-picker-container').append(that.$time);
                break;
        }
        var buttons = {
            confirm: {
                label: translations.popupButtonSelected,
                className: 'confirm-selection btn btn-success',
                callback: function() {
                    if (!that.onSubmit) return;
                    switch (that.type) {
                        case 'timePicker':
                            that.onSubmit.call($modal, that.$time.val());
                            break;
                        case 'dateTimePicker':
                            var selectedDate = that.$calendar.datepicker('getDate');
                            if (!selectedDate) selectedDate = new Date();
                            var dayObj = dayjs(selectedDate);
                            selectedDate = dayObj.format(that.calendarSettings.format);
                            that.onSubmit.call($modal, selectedDate, that.$time.val());
                            break;
                    }
                }
            }
        }
        if (that.type == 'datePicker') buttons = '';
        var $modal = bootbox.dialog({
                title: that.title,
                message: $message,
                className: `s123-calendar-handler ${that.customClass}`,
                size: that.type == 'timePicker' ? 'small' : 'medium',
                closeButton: true,
                backdrop: true,
                show: false,
                buttons: buttons,
                onEscape: function() {},
                callback: function() {}
            })
            .on('show.bs.modal', function() {
                that.loadDateAndTimeFromInput();
            });
        $modal.find('.modal-header').addClass('background-primary-color btn-primary-text-color');
        $modal.find('.modal-header .bootbox-close-button').addClass('btn-primary-text-color');
        if (that.type == 'datePicker') {
            that.datePickerSubmit(that.$calendar, $modal);
        }
        $modal.modal('show');
    };
    that.loadDateAndTimeFromInput = function() {
        if (that.$hiddenInput.val().length === 0) return;
        switch (that.type) {
            case 'datePicker':
                that.$calendar.datepicker('setDates', new Date(that.getDateAsIso(that.$hiddenInput.val())));
                break;
            case 'timePicker':
                that.$time.val(that.$hiddenInput.val());
                break;
            case 'dateTimePicker':
                var dateAndTime = that.$hiddenInput.val().split(' ');
                that.$calendar.datepicker('setDates', new Date(that.getDateAsIso(dateAndTime[0])));
                that.$time.val(dateAndTime[1]);
                break;
        }
    };
    that.getCalendar = function() {
        var $calendar = $('<div></div>');
        $.fn.datepicker.dates[that.calendarSettings.language] = that.getCalendarTranslations();
        if (that.calendarSettings.language == 'he' || that.calendarSettings.language == 'ar') {
            $.fn.datepicker.dates[that.calendarSettings.language].rtl = true;
        }
        $calendar.datepicker({
            format: that.calendarSettings.format,
            weekStart: that.calendarSettings.weekStart,
            todayBtn: that.calendarSettings.todayBtn,
            clearBtn: that.calendarSettings.clearBtn,
            language: that.calendarSettings.language,
            startDate: that.calendarSettings.startDate,
            daysOfWeekDisabled: that.calendarSettings.daysOfWeekDisabled,
            todayHighlight: that.calendarSettings.todayHighlight
        });
        return $calendar;
    };
    that.getTime = function() {
        var $time = $('<select class="clock form-control"></select>');
        var settings = {
            hours: {
                start: 0,
                end: 23,
                steps: 1
            },
            minutes: {
                start: 0,
                end: 59,
                steps: 15
            }
        }
        for (var hours = settings.hours.start; hours <= settings.hours.end; hours += settings.hours.steps) {
            for (var minutes = settings.minutes.start; minutes <= settings.minutes.end; minutes += settings.minutes.steps) {
                var tmpH = hours < 10 ? '0' + hours : hours;
                var tmpM = minutes < 10 ? '0' + minutes : minutes;
                var selected = (hours == 8 && minutes == 0) ? 'selected' : '';
                $time.append('<option ' + selected + ' value="' + tmpH + ':' + tmpM + '">' + tmpH + ':' + tmpM + '</option>');
            }
        }
        return $time;
    };
    that.getMessageBody = function() {
        var html = '';
        html += '<div class="row calendar-handler-container">';
        switch (that.type) {
            case 'datePicker':
                html += '<div class="col-xs-12 date-picker-container"></div>';
                break;
            case 'timePicker':
                html += '<div class="col-xs-12 set-item-to-center">';
                html += '<div class="time-picker-container"></div>';
                html += '</div>';
                break;
            case 'dateTimePicker':
                html += '<div class="col-xs-12 calendar-handler-time">';
                html += '<div class="row">';
                html += '<div class="col-xs-12 time-picker-title">';
                html += '<label>' + translations.chooseTime + '</label>';
                html += '</div>';
                html += '<div class="col-xs-12 time-picker-container"></div>';
                html += '</div>';
                html += '</div>';
                html += '<div class="col-xs-12 calendar-handler-date">';
                html += '<div class="row">';
                html += '<div class="col-xs-12 date-picker-container"></div>';
                html += '</div>';
                html += '</div>';
                break;
        }
        html += '</div>';
        return $(html);
    };
    that.getDatePickerSupportedFormat = function(format) {
        return format == 'd/m/Y' ? 'DD/MM/YYYY' : 'MM/DD/YYYY';
    };
    that.getDateAsIso = function(date) {
        switch (that.calendarSettings.format) {
            case 'MM/DD/YYYY':
                date = dayjs(date).format("YYYY-MM-DD");
                break;
            case 'DD/MM/YYYY':
                var newdate = date.split("/").reverse().join("-");
                date = dayjs(newdate).format("YYYY-MM-DD");
                break;
        }
        return date;
    };
    that.datePickerSubmit = function(calendar, modal) {
        calendar.off('changeDate').on('changeDate', function(ev) {
            if (!that.onSubmit) return;
            var selectedDate = calendar.datepicker('getDate');
            if (!selectedDate) selectedDate = new Date();
            var dayObj = dayjs(selectedDate);
            selectedDate = dayObj.format(that.calendarSettings.format);
            that.onSubmit.call(modal, selectedDate);
            modal.modal('hide');
        });
    };
    that.getCalendarTranslations = function() {
        return {
            days: [translations.calendarHandler.days.sunday, translations.calendarHandler.days.monday, translations.calendarHandler.days.tuesday, translations.calendarHandler.days.wednesday, translations.calendarHandler.days.thursday, translations.calendarHandler.days.friday, translations.calendarHandler.days.saturday],
            daysShort: [translations.calendarHandler.daysShort.sun, translations.calendarHandler.daysShort.mon, translations.calendarHandler.daysShort.tue, translations.calendarHandler.daysShort.wed, translations.calendarHandler.daysShort.thu, translations.calendarHandler.daysShort.fri, translations.calendarHandler.daysShort.sat, ],
            daysMin: [translations.calendarHandler.daysMin.su, translations.calendarHandler.daysMin.mo, translations.calendarHandler.daysMin.tu, translations.calendarHandler.daysMin.we, translations.calendarHandler.daysMin.th, translations.calendarHandler.daysMin.fr, translations.calendarHandler.daysMin.sa, ],
            months: [translations.calendarHandler.months.january, translations.calendarHandler.months.february, translations.calendarHandler.months.march, translations.calendarHandler.months.april, translations.calendarHandler.months.may, translations.calendarHandler.months.june, translations.calendarHandler.months.july, translations.calendarHandler.months.august, translations.calendarHandler.months.september, translations.calendarHandler.months.october, translations.calendarHandler.months.november, translations.calendarHandler.months.december],
            monthsShort: [translations.calendarHandler.monthsShort.jan, translations.calendarHandler.monthsShort.feb, translations.calendarHandler.monthsShort.mar, translations.calendarHandler.monthsShort.apr, translations.calendarHandler.monthsShort.may, translations.calendarHandler.monthsShort.jun, translations.calendarHandler.monthsShort.jul, translations.calendarHandler.monthsShort.aug, translations.calendarHandler.monthsShort.sep, translations.calendarHandler.monthsShort.oct, translations.calendarHandler.monthsShort.nov, translations.calendarHandler.monthsShort.dec],
            today: translations.calendarHandler.today,
            clear: translations.calendarHandler.clear,
            titleFormat: 'MM yyyy',
        };
    };
}

function CalendarWidget(settings) {
    var that = this;
    that.init = function() {
        that.maxShiftsAmount = settings.maxShiftsAmount ? settings.maxShiftsAmount : 3;
        that.$fakeInput = settings.$fakeInput;
        that.$hiddenInput = settings.$hiddenInput;
        that.$fakeInputIcon = settings.$fakeInputIcon;
        that.type = settings.type;
        that.title = settings.title;
        that.calendarSettings = settings.calendarSettings;
        that.onInit = settings.onInit;
        that.onSubmit = settings.onSubmit;
        that.customClass = settings.customClass ? settings.customClass : '';
        that.hoursInputSettings = settings.hoursInputSettings ? settings.hoursInputSettings : false;
        that.moduleID = settings.moduleID ? settings.moduleID : false;
        that.moduleTypeNUM = settings.moduleTypeNUM ? settings.moduleTypeNUM : false;
        that.isAdmin = settings.isAdmin ? settings.isAdmin : false;
        that.$rootContainer = $('#ch-' + that.moduleID);
        that.calendarModalParent = settings.calendarModalParent ? settings.calendarModalParent : window;
        if (that.$fakeInput.length === 0) return;
        that.addPluginAbilityToInput();
        if (that.calendarSettings) {
            if (that.calendarSettings.businessHours) {
                initializeBusinessHours();
            }
            that.calendarSettings.originalFormat = that.calendarSettings.format;
            that.calendarSettings.format = that.getDatePickerSupportedFormat(settings.calendarSettings.format);
            if (that.calendarSettings.startDate) {
                var dayObj = dayjs(new Date(that.calendarSettings.startDate));
                dayObj = dayObj.format(that.calendarSettings.format);
                that.$fakeInput.html(dayObj);
                that.$hiddenInput.val(dayObj);
            }
            if (that.hoursInputSettings) {
                that.HoursInput.init({
                    calendarSettings: that.calendarSettings,
                    hoursInputSettings: that.hoursInputSettings,
                    moduleID: that.moduleID,
                    moduleTypeNUM: that.moduleTypeNUM,
                    onInit: function() {
                        if (that.onInit) that.onInit.call(this);
                    }
                });
            } else {
                if (that.onInit) that.onInit.call(this);
            }
        } else {
            if (that.onInit) that.onInit.call(this);
        }
        that.$rootContainer.find('.c-h-widget').removeClass('hidden');
    };
    that.setDate = function(date) {
        var dayObj = dayjs(date);
        dayObj = dayObj.format(that.calendarSettings.format);
        that.$fakeInput.html(dayObj);
        that.$hiddenInput.val(dayObj);
    };
    that.addPluginAbilityToInput = function() {
        that.$fakeInput.addClass('s123-calendar-handler-widget-input');
        that.$fakeInput.off('click').on('click', function() {
            that.showPopUp();
        });
        that.$fakeInputIcon.off('click').on('click', function() {
            that.showPopUp();
        });
    };
    that.showPopUp = function() {
        if (that.isShown) return;
        var title = '';
        var $message = that.getMessageBody();
        switch (that.type) {
            case 'datePicker':
                that.$calendar = that.getCalendar();
                $message.find('.date-picker-container').append(that.$calendar);
                break;
            case 'timePicker':
                that.$time = that.getTime();
                $message.find('.time-picker-container').append(that.$time);
                break;
            case 'dateTimePicker':
                that.$calendar = that.getCalendar();
                that.$time = that.getTime();
                $message.find('.date-picker-container').append(that.$calendar);
                $message.find('.time-picker-container').append(that.$time);
                break;
        }
        var buttons = {
            confirm: {
                label: translations.popupButtonSelected,
                className: 'confirm-selection btn btn-success',
                callback: function() {
                    if (!that.onSubmit) return;
                    switch (that.type) {
                        case 'timePicker':
                            that.onSubmit.call($modal, that.$time.val());
                            if (that.hoursInputSettings) that.HoursInput.refreshBusinessHours();
                            break;
                        case 'dateTimePicker':
                            var selectedDate = that.$calendar.datepicker('getDate');
                            if (!selectedDate) selectedDate = new Date();
                            var dayObj = dayjs(selectedDate);
                            selectedDate = dayObj.format(that.calendarSettings.format);
                            that.onSubmit.call($modal, selectedDate, that.$time.val());
                            if (that.hoursInputSettings) that.HoursInput.refreshBusinessHours();
                            break;
                    }
                }
            }
        }
        if (that.type == 'datePicker') buttons = '';
        var $modal = that.calendarModalParent.bootbox.dialog({
                title: that.title,
                message: $message,
                className: `s123-calendar-handler-widget ${that.customClass}`,
                size: that.type == 'timePicker' ? 'small' : 'medium',
                closeButton: true,
                backdrop: true,
                show: false,
                buttons: buttons,
                onEscape: function() {},
                callback: function() {}
            })
            .on('show.bs.modal', function() {
                that.loadDateAndTimeFromInput();
                that.isShown = true;
            })
            .on('hide.bs.modal', function() {
                that.isShown = false;
            });
        $modal.find('.modal-header').addClass('background-primary-color btn-primary-text-color');
        $modal.find('.modal-header .bootbox-close-button').addClass('btn-primary-text-color');
        if (that.isAdmin) {
            $modal.find('.modal-header .bootbox-close-button').click(function() {
                $modal.modal('hide');
            });
        }
        if (that.type == 'datePicker') {
            that.datePickerSubmit(that.$calendar, $modal);
        }
        $modal.modal('show');
    };
    that.loadDateAndTimeFromInput = function() {
        if (that.$hiddenInput.val().length === 0) return;
        switch (that.type) {
            case 'datePicker':
                that.$calendar.datepicker('setDates', new Date(that.getDateAsIso(that.$hiddenInput.val())));
                break;
            case 'timePicker':
                that.$time.val(that.$hiddenInput.val());
                break;
            case 'dateTimePicker':
                var dateAndTime = that.$hiddenInput.val().split(' ');
                that.$calendar.datepicker('setDates', new Date(that.getDateAsIso(dateAndTime[0])));
                that.$time.val(dateAndTime[1]);
                break;
        }
    };
    that.getCalendar = function() {
        var $calendar = $('<div></div>');
        $.fn.datepicker.dates[that.calendarSettings.language] = that.getCalendarTranslations();
        if (that.calendarSettings.language == 'he' || that.calendarSettings.language == 'ar') {
            $.fn.datepicker.dates[that.calendarSettings.language].rtl = true;
        }
        if (that.calendarSettings.autoDisableWeekDays) {
            var disabledDays = '';
            if (that.calendarSettings.availability != 'fullTime') {
                var total = that.calendarSettings.businessHours.length;
                $.each(that.calendarSettings.businessHours, function(index) {
                    if (!that.calendarSettings.businessHours[index].isActive) {
                        if (that.calendarSettings.weekStart == 0) {
                            disabledDays += index;
                        } else {
                            disabledDays += (index + 1) % 7;
                        }
                        if (index < (total - 1)) {
                            disabledDays += ',';
                        }
                    }
                });
            }
            if (disabledDays.slice(-1) === ',') {
                disabledDays = disabledDays.slice(0, disabledDays.length - 1);
            }
            that.calendarSettings.daysOfWeekDisabled = disabledDays;
        }
        $calendar.datepicker({
            format: that.calendarSettings.format,
            weekStart: that.calendarSettings.weekStart,
            todayBtn: that.calendarSettings.todayBtn,
            clearBtn: that.calendarSettings.clearBtn,
            language: that.calendarSettings.language,
            startDate: that.calendarSettings.startDate,
            daysOfWeekDisabled: that.calendarSettings.daysOfWeekDisabled,
            todayHighlight: that.calendarSettings.todayHighlight
        });
        return $calendar;
    };
    that.getTime = function() {
        var $time = $('<select class="clock form-control"></select>');
        var settings = {
            hours: {
                start: 0,
                end: 23,
                steps: 1
            },
            minutes: {
                start: 0,
                end: 59,
                steps: 15
            }
        }
        for (var hours = settings.hours.start; hours <= settings.hours.end; hours += settings.hours.steps) {
            for (var minutes = settings.minutes.start; minutes <= settings.minutes.end; minutes += settings.minutes.steps) {
                var tmpH = hours < 10 ? '0' + hours : hours;
                var tmpM = minutes < 10 ? '0' + minutes : minutes;
                var selected = (hours == 8 && minutes == 0) ? 'selected' : '';
                $time.append('<option ' + selected + ' value="' + tmpH + ':' + tmpM + '">' + tmpH + ':' + tmpM + '</option>');
            }
        }
        return $time;
    };
    that.getMessageBody = function() {
        var html = '';
        html += `<link rel="stylesheet" type="text/css" href="${$GLOBALS["cdn-system-files"]}/files/vendor/site123/calendarHandler/css/calendarHandlerWidget.css?v=${$GLOBALS['v-cache']}" crossorigin="anonymous">`;
        html += '<div class="row calendar-handler-container">';
        switch (that.type) {
            case 'datePicker':
                html += '<div class="col-xs-12 date-picker-container"></div>';
                break;
            case 'timePicker':
                html += '<div class="col-xs-12 set-item-to-center">';
                html += '<div class="time-picker-container"></div>';
                html += '</div>';
                break;
            case 'dateTimePicker':
                html += '<div class="col-xs-12 calendar-handler-time">';
                html += '<div class="row">';
                html += '<div class="col-xs-12 time-picker-title">';
                html += '<label>' + translations.chooseTime + '</label>';
                html += '</div>';
                html += '<div class="col-xs-12 time-picker-container"></div>';
                html += '</div>';
                html += '</div>';
                html += '<div class="col-xs-12 calendar-handler-date">';
                html += '<div class="row">';
                html += '<div class="col-xs-12 date-picker-container"></div>';
                html += '</div>';
                html += '</div>';
                break;
        }
        html += '</div>';
        return $(html);
    };
    that.getDatePickerSupportedFormat = function(format) {
        return format == 'd/m/Y' ? 'DD/MM/YYYY' : 'MM/DD/YYYY';
    };
    that.getDateAsIso = function(date) {
        switch (that.calendarSettings.format) {
            case 'MM/DD/YYYY':
                date = dayjs(date).format("YYYY-MM-DD");
                break;
            case 'DD/MM/YYYY':
                var newdate = date.split("/").reverse().join("-");
                date = dayjs(newdate).format("YYYY-MM-DD");
                break;
        }
        return date;
    };
    that.datePickerSubmit = function(calendar, modal) {
        calendar.off('changeDate').on('changeDate', function(ev) {
            if (!that.onSubmit) return;
            var selectedDate = calendar.datepicker('getDate');
            if (!selectedDate) selectedDate = new Date();
            var dayObj = dayjs(selectedDate);
            selectedDate = dayObj.format(that.calendarSettings.format);
            that.onSubmit.call(modal, selectedDate);
            if (that.hoursInputSettings) that.HoursInput.refreshBusinessHours();
            modal.modal('hide');
        });
    };
    that.getCalendarTranslations = function() {
        return {
            days: [translations.calendarHandler.days.sunday, translations.calendarHandler.days.monday, translations.calendarHandler.days.tuesday, translations.calendarHandler.days.wednesday, translations.calendarHandler.days.thursday, translations.calendarHandler.days.friday, translations.calendarHandler.days.saturday],
            daysShort: [translations.calendarHandler.daysShort.sun, translations.calendarHandler.daysShort.mon, translations.calendarHandler.daysShort.tue, translations.calendarHandler.daysShort.wed, translations.calendarHandler.daysShort.thu, translations.calendarHandler.daysShort.fri, translations.calendarHandler.daysShort.sat, ],
            daysMin: [translations.calendarHandler.daysMin.su, translations.calendarHandler.daysMin.mo, translations.calendarHandler.daysMin.tu, translations.calendarHandler.daysMin.we, translations.calendarHandler.daysMin.th, translations.calendarHandler.daysMin.fr, translations.calendarHandler.daysMin.sa, ],
            months: [translations.calendarHandler.months.january, translations.calendarHandler.months.february, translations.calendarHandler.months.march, translations.calendarHandler.months.april, translations.calendarHandler.months.may, translations.calendarHandler.months.june, translations.calendarHandler.months.july, translations.calendarHandler.months.august, translations.calendarHandler.months.september, translations.calendarHandler.months.october, translations.calendarHandler.months.november, translations.calendarHandler.months.december],
            monthsShort: [translations.calendarHandler.monthsShort.jan, translations.calendarHandler.monthsShort.feb, translations.calendarHandler.monthsShort.mar, translations.calendarHandler.monthsShort.apr, translations.calendarHandler.monthsShort.may, translations.calendarHandler.monthsShort.jun, translations.calendarHandler.monthsShort.jul, translations.calendarHandler.monthsShort.aug, translations.calendarHandler.monthsShort.sep, translations.calendarHandler.monthsShort.oct, translations.calendarHandler.monthsShort.nov, translations.calendarHandler.monthsShort.dec],
            today: translations.calendarHandler.today,
            clear: translations.calendarHandler.clear,
            titleFormat: 'MM yyyy',
        };
    };
    that.getInActiveDays = function() {
        return that.inActiveDays;
    };
    that.isUnAvalible = function() {
        return that.inActiveDays == 7 || that.calendarSettings.availability == 'unavailable';
    };
    that.showUnavailableMsg = function() {
        that.$rootContainer.find('.c-h-widget').addClass('hidden');
        that.$rootContainer.find('.c-h-note-container').removeClass('hidden');
    };
    that.getSelectedDateTime = function() {
        var date = that.$rootContainer.find('.real-input.c-h-input').val();
        date = changeDateFormat('YYYY-mm-DD ' + that.calendarSettings.originalFormat, date);
        return dayjs(date + ' ' + that.$rootContainer.find('.service-hour').val()).format("YYYY-MM-DD HH:mm:ss");
    };
    that.getSelectedHour = function() {
        return that.$rootContainer.find('.service-hour').val();
    };
    that.getSelectedDate = function(formatDate) {
        var date = that.$rootContainer.find('.real-input.c-h-input').val();
        if (formatDate) {
            date = changeDateFormat('YYYY-mm-DD ' + that.calendarSettings.originalFormat, date);
        }
        return date;
    };

    function initializeBusinessHours() {
        that.inActiveDays = 0;
        if (that.calendarSettings.availability == 'custom') {
            $.each(that.calendarSettings.businessHours, function(index, dayOfWeek) {
                if (!dayOfWeek.isActive) {
                    that.inActiveDays++;
                }
            });
        }
        if (that.calendarSettings.availability == 'custom') {
            $.each(that.calendarSettings.businessHours, function(index, day) {
                let lastShift = getLastActiveShift(day);
                var startShift = lastShift.start.name;
                var endShift = lastShift.end.name;
                if (that.calendarSettings.businessHours[index].isActive && !day.hasNoShifts && day[endShift] <= day[startShift]) {
                    var startHour = parseInt(day[startShift].substring(0, 2));
                    var startMin = day[startShift].substring(3, 5);
                    var endHour = parseInt(day[endShift].substring(0, 2));
                    var endMin = day[endShift].substring(3, 5);
                    that.calendarSettings.businessHours[index][endShift] = '23:59';
                    var dayIndex = (index + 1);
                    if (index == 6) {
                        dayIndex = 0;
                    }
                    if (endHour < 10) endHour = '0' + endHour.toString();
                    that.calendarSettings.businessHours[dayIndex].startTime0 = '00:' + startMin;
                    that.calendarSettings.businessHours[dayIndex].endTime0 = endHour + ':' + endMin;
                    if (!that.calendarSettings.businessHours[dayIndex].isActive) {
                        that.calendarSettings.businessHours[dayIndex].isActive = true;
                        that.calendarSettings.businessHours[dayIndex].startTime1 = '';
                        that.calendarSettings.businessHours[dayIndex].endTime1 = '';
                        that.calendarSettings.businessHours[dayIndex].startTime2 = '';
                        that.calendarSettings.businessHours[dayIndex].endTime2 = '';
                        that.calendarSettings.businessHours[dayIndex].startTime3 = '';
                        that.calendarSettings.businessHours[dayIndex].endTime3 = '';
                        that.calendarSettings.businessHours[dayIndex].hasNoShifts = true;
                    }
                }
            });
        } else if (that.calendarSettings.availability == 'fullTime') {
            $.each(that.calendarSettings.businessHours, function(index, weekday) {
                weekday.isActive = true;
                weekday.startTime1 = '00:00';
                weekday.endTime1 = '24:00';
                weekday.startTime2 = '';
                weekday.endTime2 = '';
                weekday.startTime3 = '';
                weekday.endTime3 = '';
            });
        }
    }

    function getLastActiveShift(day) {
        var businessDay = JSON.parse(JSON.stringify(day));
        delete businessDay.isActive;
        delete businessDay.startTime0;
        delete businessDay.endTime0;
        let lastShift = {
            start: {
                name: '',
                value: ''
            },
            end: {
                name: '',
                value: ''
            }
        };
        let numberOfShifts = (Object.keys(businessDay).length) / 2;
        for (let i = numberOfShifts; i >= 0; i--) {
            if (businessDay[`startTime${i}`] !== "" && businessDay[`endTime${i}`] !== "") {
                lastShift.start.name = `startTime${i}`;
                lastShift.start.value = businessDay[`startTime${i}`];
                lastShift.end.name = `endTime${i}`;
                lastShift.end.value = businessDay[`endTime${i}`];
                break;
            }
        }
        return lastShift;
    }

    function changeDateFormat(websiteDateFormat, date) {
        switch (websiteDateFormat) {
            case 'YYYY-mm-DD m/d/Y':
                return dayjs(date).format("YYYY-MM-DD");
                break;
            case 'YYYY-mm-DD d/m/Y':
                var newdate = date.split("/").reverse().join("-");
                return dayjs(newdate).format("YYYY-MM-DD");
                break;
        }
    }
    that.HoursInput = function() {
        var _ = {
            isInitialized: false,
            calendarSettings: {},
            onInit: false,
            onHoursLoad: false,
            onHoursChage: false,
            $input: null,
            moduleID: null,
            moduleTypeNUM: null,
        };
        _.init = function(settings) {
            _.onInit = settings.onInit;
            _.moduleID = settings.moduleID;
            _.moduleTypeNUM = settings.moduleTypeNUM;
            _.calendarSettings = settings.calendarSettings;
            _.$form = settings.hoursInputSettings.$form;
            _.onHoursLoad = settings.hoursInputSettings.onHoursLoad;
            _.onHoursChage = settings.hoursInputSettings.onHoursChage;
            _.serviceType = settings.hoursInputSettings.serviceType;
            _.maxParticipants = settings.hoursInputSettings.maxParticipants;
            _.timeInterval = settings.hoursInputSettings.timeInterval;
            _.$rootContainer = $('#ch-' + _.moduleID);
            _.serviceDuration = _.$rootContainer.find('.serviceDuration').val();
            _.timeBetweenService = _.$rootContainer.find('.timeBetweenService').val();
            _.$serviceDatesContainer = _.$rootContainer.find('.serviceDatesContainer');
            _.$serviceHourContainer = _.$rootContainer.find('.serviceHourContainer');
            _.$tableHour = _.$rootContainer.find('.service-hour');
            _.$input = _.$rootContainer.find('.real-input.c-h-input');
            _.refreshBusinessHours();
        };
        _.refreshBusinessHours = function() {
            var $input = _.$input;
            var selectedDate = $input.val();
            selectedDate = changeDateFormat('YYYY-mm-DD ' + _.calendarSettings.originalFormat, selectedDate);
            var today = new Date(selectedDate);
            var lastDateOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
            lastDateOfMonth = getDateFormat(lastDateOfMonth) + ' ' + getHourFromDate(lastDateOfMonth);
            _.$tableHour.empty();
            if (_.moduleTypeNUM == 96) {
                $.ajax({
                        url: '/versions/2/wizard/modules/scheduleBooking/get-scheduled-orders.php',
                        method: 'post',
                        data: _.$form.serialize() + '&selectedDate=' + encodeURIComponent(selectedDate) + '&lastDateOfMonth=' + encodeURIComponent(lastDateOfMonth) + '&cartType=' + encodeURIComponent(_.moduleTypeNUM) + '&serviceTimeInterval=' + encodeURIComponent(_.timeInterval),
                    })
                    .done(function(data) {
                        data = tryParseJSON(data);
                        _.$serviceDatesContainer.data('corrent-time', data.userTime);
                        buildHourSelectBox();
                        removeUnavailableHours(data.orders);
                        if (_.$tableHour.text().length <= 0) {
                            _.$tableHour.addClass('hidden');
                            _.$serviceHourContainer.find('.no-time-available').removeClass('hidden');
                        } else {
                            _.$tableHour.removeClass('hidden');
                            _.$serviceHourContainer.find('.no-time-available').addClass('hidden');
                        }
                        if (!_.isInitialized) {
                            if (_.onInit) _.onInit.call(this);
                            _.isInitialized = true;
                        }
                        if (_.onHoursLoad) _.onHoursLoad.call(this, _.$tableHour);
                    });
            } else {
                buildHourSelectBox();
                if (!_.isInitialized) {
                    if (_.onInit) _.onInit.call(this);
                    _.isInitialized = true;
                }
                if (_.onHoursLoad) _.onHoursLoad.call(this, _.$tableHour);
            }

            function getHourFromDate(DateChoosed) {
                var hourFormat = DateChoosed;
                var hours = hourFormat.getHours();
                if (hours < 10) hours = '0' + hours;
                var minutes = hourFormat.getMinutes();
                if (minutes < 10) minutes = '0' + minutes;
                miliSeconds = hourFormat.getMilliseconds();
                if (miliSeconds < 10) miliSeconds = '0' + miliSeconds;
                return hours + ':' + minutes + ':' + miliSeconds;
            }

            function removeUnavailableHours(unavailableHours) {
                var selectedDate = _.$input.val();
                selectedDate = changeDateFormat('YYYY-mm-DD ' + _.calendarSettings.originalFormat, selectedDate);
                var serviceDurationHour = _.serviceDuration.substring(0, 2);
                var serviceDurationMin = _.serviceDuration.substring(3, 5);
                var timeBetweenService = parseInt(_.timeBetweenService) * 60 * 1000;
                var serviceDurationHourMili = parseInt(serviceDurationHour) * 60 * 60 * 1000;
                var serviceDurationMinutesMili = parseInt(serviceDurationMin) * 60 * 1000;
                var serviceDurationInMili = serviceDurationHourMili + serviceDurationMinutesMili + timeBetweenService;
                if (_.serviceType == 'Classes') {
                    var hoursToRemove = new Array();
                    $.each(_.$tableHour.find('option'), function(index, option) {
                        var schedualed = 0;
                        var timeFromOption = dayjs(selectedDate + ' ' + option.value).valueOf();
                        var dateFromPage = dayjs(selectedDate + ' ' + option.value).format("YYYY-MM-DD HH:mm:ss");
                        $.each(unavailableHours, function(index, date) {
                            if (dateFromPage.valueOf() == date.orderDate.valueOf()) {
                                schedualed++;
                            }
                            if (schedualed >= _.maxParticipants) {
                                var unavailableTime = dayjs(date.orderDate).valueOf();
                                if (timeFromOption == unavailableTime) {
                                    hoursToRemove.push(option.value);
                                }
                            }
                        });
                    });
                    for (var i = 0; i < hoursToRemove.length; i++) {
                        var Hour = hoursToRemove[i].substring(0, 2);
                        var Min = hoursToRemove[i].substring(3, 5);
                        Hour = parseInt(Hour) * 60 * 60 * 1000;
                        Min = parseInt(Min) * 60 * 1000;
                        var unavailableTime = Hour + Min;
                        $.each(_.$tableHour.find('option'), function(index, option) {
                            Hour = option.value.substring(0, 2);
                            Min = option.value.substring(3, 5);
                            Hour = parseInt(Hour) * 60 * 60 * 1000;
                            Min = parseInt(Min) * 60 * 1000;
                            var timeFromOption = Hour + Min;
                            if ((timeFromOption >= unavailableTime && timeFromOption < (unavailableTime + serviceDurationInMili)) ||
                                (timeFromOption > (unavailableTime - serviceDurationInMili) && timeFromOption < unavailableTime)) {
                                $(option).remove();
                            }
                        });
                    }
                } else {
                    $.each(unavailableHours, function(index, date) {
                        var unavailableTime = dayjs(date.orderDate).valueOf();
                        $.each(_.$tableHour.find('option'), function(index, option) {
                            var timeFromOption = dayjs(selectedDate + ' ' + option.value).valueOf();
                            if ((timeFromOption >= unavailableTime && timeFromOption < (unavailableTime + serviceDurationInMili)) ||
                                (timeFromOption > (unavailableTime - serviceDurationInMili) && timeFromOption < unavailableTime)) {
                                $(option).remove();
                            }
                        });
                    });
                }
            }

            function buildHourSelectBox() {
                var serviceDurationHour = _.serviceDuration.substring(0, 2);
                var serviceDurationHourMili = parseInt(serviceDurationHour) * 60 * 60 * 1000;
                var serviceDurationMin = _.serviceDuration.substring(3, 5);
                var serviceDurationMinutesMili = parseInt(serviceDurationMin) * 60 * 1000;
                var timeBetweenService = parseInt(_.timeBetweenService) * 60 * 1000;
                var serviceInterval = parseInt(_.timeInterval) * 60 * 1000;
                var dateFromCalendar = changeDateFormat('YYYY-mm-DD ' + _.calendarSettings.originalFormat, _.$input.val());
                if (!dateFromCalendar) throw 'Missing date parameter';
                for (var i = 0; i <= that.maxShiftsAmount; i++) {
                    var dayOfWeek = dayjs(dateFromCalendar).day();
                    if (dayOfWeek == 0) {
                        if (parseInt(_.calendarSettings.weekStart) == 1) {
                            var dataIndex = 6;
                        } else {
                            var dataIndex = dayOfWeek;
                        }
                    } else {
                        var dataIndex = dayOfWeek - parseInt(_.calendarSettings.weekStart);
                    }
                    var startTime = 'startTime' + i;
                    var endTime = 'endTime' + i;
                    startTime = _.calendarSettings.businessHours[dataIndex][startTime];
                    endTime = _.calendarSettings.businessHours[dataIndex][endTime];
                    if (startTime == '' || endTime == '' || !_.calendarSettings.businessHours[dataIndex].isActive)
                        continue;
                    var selectedDate = new Date(dateFromCalendar);
                    if (getDateFormat(selectedDate) == getDateFormat(new Date()) && new Date().getTime() >= dayjs(dateFromCalendar + " " + startTime).valueOf()) {
                        startTime = dayjs(dateFromCalendar + " " + _.$serviceDatesContainer.data('corrent-time')).valueOf();
                    } else {
                        startTime = dayjs(dateFromCalendar + " " + startTime).valueOf();
                    }
                    endTime = dayjs(dateFromCalendar + " " + endTime).valueOf();
                    for (; startTime <= (endTime - serviceDurationHourMili - serviceDurationMinutesMili - timeBetweenService); startTime += serviceInterval) {
                        var newdate = new Date(startTime);
                        var newHour = newdate.getHours();
                        var newMinutes = newdate.getMinutes();
                        if (newHour.toString().length == 1)
                            newHour = '0' + newHour;
                        if (newMinutes.toString().length == 1)
                            newMinutes = '0' + newMinutes;
                        var fullHour = newHour + ':' + newMinutes;
                        var hourExists = false;
                        $.each(_.$tableHour.find('option'), function(index) {
                            $optionVal = $(this).val();
                            if ($optionVal == fullHour) {
                                hourExists = true;
                                return false;
                            }
                        });
                        if (!hourExists) _.$tableHour.append('<option value="' + newHour + ':' + newMinutes + '">' + changeTimeFormat(_.calendarSettings.timeFormat, newdate) + '</option>');
                        else continue;
                    }
                }

                function changeTimeFormat(websiteTimeFormat, date) {
                    var dayObj = dayjs(date);
                    if (websiteTimeFormat === 'H:i') {
                        return dayObj.format('HH:mm');
                    } else if (websiteTimeFormat === 'h:i A') {
                        return dayObj.format('hh:mm A');
                    }
                }
                _.$tableHour.off('change').on('change', function(event) {
                    if (_.onHoursChage) _.onHoursChage.call(this, $(this).val());
                });
            }
        };
        _.isServiceAvalible = function() {
            return _.$tableHour.find('option').length > 0;
        };

        function getDateFormat(DateChoosed) {
            var formattedDate = DateChoosed;
            var day = formattedDate.getDate();
            if (day < 10) day = '0' + day;
            var month = (formattedDate.getMonth() + 1);
            if (month < 10) month = '0' + month;
            var year = formattedDate.getFullYear();
            return year + '-' + month + '-' + day;
        }

        function tryParseJSON(str) {
            try {
                var Obj = JSON.parse(str);
                if (Obj && typeof Obj === "object") {
                    return Obj;
                }
            } catch (e) {}
            return false;
        }
        return _;
    }();
    that.init();
}(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.Pjax = f()
    }
})(function() {
    var define, module, exports;
    return function() {
        function r(e, n, t) {
            function o(i, f) {
                if (!n[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && require;
                        if (!f && c) return c(i, !0);
                        if (u) return u(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw a.code = "MODULE_NOT_FOUND", a
                    }
                    var p = n[i] = {
                        exports: {}
                    };
                    e[i][0].call(p.exports, function(r) {
                        var n = e[i][1][r];
                        return o(n || r)
                    }, p, p.exports, r, e, n, t)
                }
                return n[i].exports
            }
            for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
            return o
        }
        return r
    }()({
        1: [function(require, module, exports) {
            var executeScripts = require("./lib/execute-scripts");
            var forEachEls = require("./lib/foreach-els");
            var parseOptions = require("./lib/parse-options");
            var switches = require("./lib/switches");
            var newUid = require("./lib/uniqueid");
            var on = require("./lib/events/on");
            var trigger = require("./lib/events/trigger");
            var clone = require("./lib/util/clone");
            var contains = require("./lib/util/contains");
            var extend = require("./lib/util/extend");
            var noop = require("./lib/util/noop");
            var Pjax = function(options) {
                this.state = {
                    numPendingSwitches: 0,
                    href: null,
                    options: null
                };
                this.options = parseOptions(options);
                this.log("Pjax options", this.options);
                if (this.options.scrollRestoration && "scrollRestoration" in history) {
                    history.scrollRestoration = "manual"
                }
                this.maxUid = this.lastUid = newUid();
                this.parseDOM(document);
                on(window, "popstate", function(st) {
                    if (st.state) {
                        var opt = clone(this.options);
                        opt.url = st.state.url;
                        opt.title = st.state.title;
                        opt.history = false;
                        opt.scrollPos = st.state.scrollPos;
                        if (st.state.uid < this.lastUid) {
                            opt.backward = true
                        } else {
                            opt.forward = true
                        }
                        this.lastUid = st.state.uid;
                        this.loadUrl(st.state.url, opt)
                    }
                }.bind(this))
            };
            Pjax.switches = switches;
            Pjax.prototype = {
                log: require("./lib/proto/log"),
                getElements: function(el) {
                    return el.querySelectorAll(this.options.elements)
                },
                parseDOM: function(el) {
                    var parseElement = require("./lib/proto/parse-element");
                    forEachEls(this.getElements(el), parseElement, this)
                },
                refresh: function(el) {
                    this.parseDOM(el || document)
                },
                reload: function() {
                    window.location.reload()
                },
                attachLink: require("./lib/proto/attach-link"),
                attachForm: require("./lib/proto/attach-form"),
                forEachSelectors: function(cb, context, DOMcontext) {
                    return require("./lib/foreach-selectors").bind(this)(this.options.selectors, cb, context, DOMcontext)
                },
                switchSelectors: function(selectors, fromEl, toEl, options) {
                    return require("./lib/switches-selectors").bind(this)(this.options.switches, this.options.switchesOptions, selectors, fromEl, toEl, options)
                },
                latestChance: function(href) {
                    window.location = href
                },
                onSwitch: function() {
                    trigger(window, "resize scroll");
                    this.state.numPendingSwitches--;
                    if (this.state.numPendingSwitches === 0) {
                        this.afterAllSwitches()
                    }
                },
                loadContent: function(html, options) {
                    if (typeof html !== "string") {
                        trigger(document, "pjax:complete pjax:error", options);
                        return
                    }
                    var tmpEl = document.implementation.createHTMLDocument("pjax");
                    var htmlRegex = /<html[^>]+>/gi;
                    var htmlAttribsRegex = /\s?[a-z:]+(?:=['"][^'">]+['"])*/gi;
                    var matches = html.match(htmlRegex);
                    if (matches && matches.length) {
                        matches = matches[0].match(htmlAttribsRegex);
                        if (matches.length) {
                            matches.shift();
                            matches.forEach(function(htmlAttrib) {
                                var attr = htmlAttrib.trim().split("=");
                                if (attr.length === 1) {
                                    tmpEl.documentElement.setAttribute(attr[0], true)
                                } else {
                                    tmpEl.documentElement.setAttribute(attr[0], attr[1].slice(1, -1))
                                }
                            })
                        }
                    }
                    tmpEl.documentElement.innerHTML = html;
                    this.log("load content", tmpEl.documentElement.attributes, tmpEl.documentElement.innerHTML.length);
                    if (document.activeElement && contains(document, this.options.selectors, document.activeElement)) {
                        try {
                            document.activeElement.blur()
                        } catch (e) {}
                    }
                    this.switchSelectors(this.options.selectors, tmpEl, document, options)
                },
                abortRequest: require("./lib/abort-request"),
                doRequest: require("./lib/send-request"),
                handleResponse: require("./lib/proto/handle-response"),
                loadUrl: function(href, options) {
                    options = typeof options === "object" ? extend({}, this.options, options) : clone(this.options);
                    this.log("load href", href, options);
                    this.abortRequest(this.request);
                    trigger(document, "pjax:send", options);
                    this.request = this.doRequest(href, options, this.handleResponse.bind(this))
                },
                afterAllSwitches: function() {
                    var autofocusEl = Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();
                    if (autofocusEl && document.activeElement !== autofocusEl) {
                        autofocusEl.focus()
                    }
                    this.options.selectors.forEach(function(selector) {
                        forEachEls(document.querySelectorAll(selector), function(el) {
                            executeScripts(el)
                        })
                    });
                    var state = this.state;
                    if (state.options.history) {
                        if (!window.history.state) {
                            this.lastUid = this.maxUid = newUid();
                            window.history.replaceState({
                                url: window.location.href,
                                title: document.title,
                                uid: this.maxUid,
                                scrollPos: [0, 0]
                            }, document.title)
                        }
                        this.lastUid = this.maxUid = newUid();
                        window.history.pushState({
                            url: state.href,
                            title: state.options.title,
                            uid: this.maxUid,
                            scrollPos: [0, 0]
                        }, state.options.title, state.href)
                    }
                    this.forEachSelectors(function(el) {
                        this.parseDOM(el)
                    }, this);
                    trigger(document, "pjax:complete pjax:success", state.options);
                    if (typeof state.options.analytics === "function") {
                        state.options.analytics()
                    }
                    if (state.options.history) {
                        var a = document.createElement("a");
                        a.href = this.state.href;
                        if (a.hash) {
                            var name = a.hash.slice(1);
                            name = decodeURIComponent(name);
                            var curtop = 0;
                            var target = document.getElementById(name) || document.getElementsByName(name)[0];
                            if (target) {
                                if (target.offsetParent) {
                                    do {
                                        curtop += target.offsetTop;
                                        target = target.offsetParent
                                    } while (target)
                                }
                            }
                            window.scrollTo(0, curtop)
                        } else if (state.options.scrollTo !== false) {
                            if (state.options.scrollTo.length > 1) {
                                window.scrollTo(state.options.scrollTo[0], state.options.scrollTo[1])
                            } else {
                                window.scrollTo(0, state.options.scrollTo)
                            }
                        }
                    } else if (state.options.scrollRestoration && state.options.scrollPos) {
                        window.scrollTo(state.options.scrollPos[0], state.options.scrollPos[1])
                    }
                    this.state = {
                        numPendingSwitches: 0,
                        href: null,
                        options: null
                    }
                }
            };
            Pjax.isSupported = require("./lib/is-supported");
            if (Pjax.isSupported()) {
                module.exports = Pjax
            } else {
                var stupidPjax = noop;
                for (var key in Pjax.prototype) {
                    if (Pjax.prototype.hasOwnProperty(key) && typeof Pjax.prototype[key] === "function") {
                        stupidPjax[key] = noop
                    }
                }
                module.exports = stupidPjax
            }
        }, {
            "./lib/abort-request": 2,
            "./lib/events/on": 4,
            "./lib/events/trigger": 5,
            "./lib/execute-scripts": 6,
            "./lib/foreach-els": 7,
            "./lib/foreach-selectors": 8,
            "./lib/is-supported": 9,
            "./lib/parse-options": 10,
            "./lib/proto/attach-form": 11,
            "./lib/proto/attach-link": 12,
            "./lib/proto/handle-response": 13,
            "./lib/proto/log": 14,
            "./lib/proto/parse-element": 15,
            "./lib/send-request": 16,
            "./lib/switches": 18,
            "./lib/switches-selectors": 17,
            "./lib/uniqueid": 19,
            "./lib/util/clone": 20,
            "./lib/util/contains": 21,
            "./lib/util/extend": 22,
            "./lib/util/noop": 23
        }],
        2: [function(require, module, exports) {
            var noop = require("./util/noop");
            module.exports = function(request) {
                if (request && request.readyState < 4) {
                    request.onreadystatechange = noop;
                    request.abort()
                }
            }
        }, {
            "./util/noop": 23
        }],
        3: [function(require, module, exports) {
            module.exports = function(el) {
                var code = el.text || el.textContent || el.innerHTML || "";
                var src = el.src || "";
                var parent = el.parentNode || document.querySelector("head") || document.documentElement;
                var script = document.createElement("script");
                if (code.match("document.write")) {
                    if (console && console.log) {
                        console.log("Script contains document.write. Can’t be executed correctly. Code skipped ", el)
                    }
                    return false
                }
                script.type = "text/javascript";
                script.id = el.id;
                if (src !== "") {
                    script.src = src;
                    script.async = false
                }
                if (code !== "") {
                    try {
                        script.appendChild(document.createTextNode(code))
                    } catch (e) {
                        script.text = code
                    }
                }
                parent.appendChild(script);
                if ((parent instanceof HTMLHeadElement || parent instanceof HTMLBodyElement) && parent.contains(script)) {
                    parent.removeChild(script)
                }
                return true
            }
        }, {}],
        4: [function(require, module, exports) {
            var forEachEls = require("../foreach-els");
            module.exports = function(els, events, listener, useCapture) {
                events = typeof events === "string" ? events.split(" ") : events;
                events.forEach(function(e) {
                    forEachEls(els, function(el) {
                        el.addEventListener(e, listener, useCapture)
                    })
                })
            }
        }, {
            "../foreach-els": 7
        }],
        5: [function(require, module, exports) {
            var forEachEls = require("../foreach-els");
            module.exports = function(els, events, opts) {
                events = typeof events === "string" ? events.split(" ") : events;
                events.forEach(function(e) {
                    var event;
                    event = document.createEvent("HTMLEvents");
                    event.initEvent(e, true, true);
                    event.eventName = e;
                    if (opts) {
                        Object.keys(opts).forEach(function(key) {
                            event[key] = opts[key]
                        })
                    }
                    forEachEls(els, function(el) {
                        var domFix = false;
                        if (!el.parentNode && el !== document && el !== window) {
                            domFix = true;
                            document.body.appendChild(el)
                        }
                        el.dispatchEvent(event);
                        if (domFix) {
                            el.parentNode.removeChild(el)
                        }
                    })
                })
            }
        }, {
            "../foreach-els": 7
        }],
        6: [function(require, module, exports) {
            var forEachEls = require("./foreach-els");
            var evalScript = require("./eval-script");
            module.exports = function(el) {
                if (el.tagName.toLowerCase() === "script") {
                    evalScript(el)
                }
                forEachEls(el.querySelectorAll("script"), function(script) {
                    if (!script.type || script.type.toLowerCase() === "text/javascript") {
                        if (script.parentNode) {
                            script.parentNode.removeChild(script)
                        }
                        evalScript(script)
                    }
                })
            }
        }, {
            "./eval-script": 3,
            "./foreach-els": 7
        }],
        7: [function(require, module, exports) {
            module.exports = function(els, fn, context) {
                if (els instanceof HTMLCollection || els instanceof NodeList || els instanceof Array) {
                    return Array.prototype.forEach.call(els, fn, context)
                }
                return fn.call(context, els)
            }
        }, {}],
        8: [function(require, module, exports) {
            var forEachEls = require("./foreach-els");
            module.exports = function(selectors, cb, context, DOMcontext) {
                DOMcontext = DOMcontext || document;
                selectors.forEach(function(selector) {
                    forEachEls(DOMcontext.querySelectorAll(selector), cb, context)
                })
            }
        }, {
            "./foreach-els": 7
        }],
        9: [function(require, module, exports) {
            module.exports = function() {
                return window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)
            }
        }, {}],
        10: [function(require, module, exports) {
            var defaultSwitches = require("./switches");
            module.exports = function(options) {
                options = options || {};
                options.elements = options.elements || "a[href], form[action]";
                options.selectors = options.selectors || ["title", ".js-Pjax"];
                options.switches = options.switches || {};
                options.switchesOptions = options.switchesOptions || {};
                options.history = typeof options.history === "undefined" ? true : options.history;
                options.analytics = typeof options.analytics === "function" || options.analytics === false ? options.analytics : defaultAnalytics;
                options.scrollTo = typeof options.scrollTo === "undefined" ? 0 : options.scrollTo;
                options.scrollRestoration = typeof options.scrollRestoration !== "undefined" ? options.scrollRestoration : true;
                options.cacheBust = typeof options.cacheBust === "undefined" ? true : options.cacheBust;
                options.debug = options.debug || false;
                options.timeout = options.timeout || 0;
                options.currentUrlFullReload = typeof options.currentUrlFullReload === "undefined" ? false : options.currentUrlFullReload;
                if (!options.switches.head) {
                    options.switches.head = defaultSwitches.switchElementsAlt
                }
                if (!options.switches.body) {
                    options.switches.body = defaultSwitches.switchElementsAlt
                }
                return options
            };

            function defaultAnalytics() {
                if (window._gaq) {
                    _gaq.push(["_trackPageview"])
                }
                if (window.ga) {
                    ga("send", "pageview", {
                        page: location.pathname,
                        title: document.title
                    })
                }
            }
        }, {
            "./switches": 18
        }],
        11: [function(require, module, exports) {
            var on = require("../events/on");
            var clone = require("../util/clone");
            var attrState = "data-pjax-state";
            var formAction = function(el, event) {
                if (isDefaultPrevented(event)) {
                    return
                }
                var options = clone(this.options);
                options.requestOptions = {
                    requestUrl: el.getAttribute("action") || window.location.href,
                    requestMethod: el.getAttribute("method") || "GET"
                };
                var virtLinkElement = document.createElement("a");
                virtLinkElement.setAttribute("href", options.requestOptions.requestUrl);
                var attrValue = checkIfShouldAbort(virtLinkElement, options);
                if (attrValue) {
                    el.setAttribute(attrState, attrValue);
                    return
                }
                event.preventDefault();
                if (el.enctype === "multipart/form-data") {
                    options.requestOptions.formData = new FormData(el)
                } else {
                    options.requestOptions.requestParams = parseFormElements(el)
                }
                el.setAttribute(attrState, "submit");
                options.triggerElement = el;
                this.loadUrl(virtLinkElement.href, options)
            };

            function parseFormElements(el) {
                var requestParams = [];
                var formElements = el.elements;
                for (var i = 0; i < formElements.length; i++) {
                    var element = formElements[i];
                    var tagName = element.tagName.toLowerCase();
                    if (!!element.name && element.attributes !== undefined && tagName !== "button") {
                        var type = element.attributes.type;
                        if (!type || type.value !== "checkbox" && type.value !== "radio" || element.checked) {
                            var values = [];
                            if (tagName === "select") {
                                var opt;
                                for (var j = 0; j < element.options.length; j++) {
                                    opt = element.options[j];
                                    if (opt.selected && !opt.disabled) {
                                        values.push(opt.hasAttribute("value") ? opt.value : opt.text)
                                    }
                                }
                            } else {
                                values.push(element.value)
                            }
                            for (var k = 0; k < values.length; k++) {
                                requestParams.push({
                                    name: encodeURIComponent(element.name),
                                    value: encodeURIComponent(values[k])
                                })
                            }
                        }
                    }
                }
                return requestParams
            }

            function checkIfShouldAbort(virtLinkElement, options) {
                if (virtLinkElement.protocol !== window.location.protocol || virtLinkElement.host !== window.location.host) {
                    return "external"
                }
                if (virtLinkElement.hash && virtLinkElement.href.replace(virtLinkElement.hash, "") === window.location.href.replace(location.hash, "")) {
                    return "anchor"
                }
                if (virtLinkElement.href === window.location.href.split("#")[0] + "#") {
                    return "anchor-empty"
                }
                if (options.currentUrlFullReload && virtLinkElement.href === window.location.href.split("#")[0]) {
                    return "reload"
                }
            }
            var isDefaultPrevented = function(event) {
                return event.defaultPrevented || event.returnValue === false
            };
            module.exports = function(el) {
                var that = this;
                el.setAttribute(attrState, "");
                on(el, "submit", function(event) {
                    formAction.call(that, el, event)
                })
            }
        }, {
            "../events/on": 4,
            "../util/clone": 20
        }],
        12: [function(require, module, exports) {
            var on = require("../events/on");
            var clone = require("../util/clone");
            var attrState = "data-pjax-state";
            var linkAction = function(el, event) {
                if (isDefaultPrevented(event)) {
                    return
                }
                var options = clone(this.options);
                var attrValue = checkIfShouldAbort(el, event);
                if (attrValue) {
                    el.setAttribute(attrState, attrValue);
                    return
                }
                event.preventDefault();
                if (this.options.currentUrlFullReload && el.href === window.location.href.split("#")[0]) {
                    el.setAttribute(attrState, "reload");
                    this.reload();
                    return
                }
                el.setAttribute(attrState, "load");
                options.triggerElement = el;
                this.loadUrl(el.href, options)
            };

            function checkIfShouldAbort(el, event) {
                if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                    return "modifier"
                }
                if (el.protocol !== window.location.protocol || el.host !== window.location.host) {
                    return "external"
                }
                if (el.hash && el.href.replace(el.hash, "") === window.location.href.replace(location.hash, "")) {
                    return "anchor"
                }
                if (el.href === window.location.href.split("#")[0] + "#") {
                    return "anchor-empty"
                }
            }
            var isDefaultPrevented = function(event) {
                return event.defaultPrevented || event.returnValue === false
            };
            module.exports = function(el) {
                var that = this;
                el.setAttribute(attrState, "");
                on(el, "click", function(event) {
                    linkAction.call(that, el, event)
                });
                on(el, "keyup", function(event) {
                    if (event.keyCode === 13) {
                        linkAction.call(that, el, event)
                    }
                }.bind(this))
            }
        }, {
            "../events/on": 4,
            "../util/clone": 20
        }],
        13: [function(require, module, exports) {
            var clone = require("../util/clone");
            var newUid = require("../uniqueid");
            var trigger = require("../events/trigger");
            module.exports = function(responseText, request, href, options) {
                options = clone(options || this.options);
                options.request = request;
                if (responseText === false) {
                    trigger(document, "pjax:complete pjax:error", options);
                    return
                }
                var currentState = window.history.state || {};
                window.history.replaceState({
                    url: currentState.url || window.location.href,
                    title: currentState.title || document.title,
                    uid: currentState.uid || newUid(),
                    scrollPos: [document.documentElement.scrollLeft || document.body.scrollLeft, document.documentElement.scrollTop || document.body.scrollTop]
                }, document.title, window.location.href);
                var oldHref = href;
                if (request.responseURL) {
                    if (href !== request.responseURL) {
                        href = request.responseURL
                    }
                } else if (request.getResponseHeader("X-PJAX-URL")) {
                    href = request.getResponseHeader("X-PJAX-URL")
                } else if (request.getResponseHeader("X-XHR-Redirected-To")) {
                    href = request.getResponseHeader("X-XHR-Redirected-To")
                }
                var a = document.createElement("a");
                a.href = oldHref;
                var oldHash = a.hash;
                a.href = href;
                if (oldHash && !a.hash) {
                    a.hash = oldHash;
                    href = a.href
                }
                this.state.href = href;
                this.state.options = options;
                try {
                    this.loadContent(responseText, options)
                } catch (e) {
                    trigger(document, "pjax:error", options);
                    if (!this.options.debug) {
                        if (console && console.error) {
                            console.error("Pjax switch fail: ", e)
                        }
                        return this.latestChance(href)
                    } else {
                        throw e
                    }
                }
            }
        }, {
            "../events/trigger": 5,
            "../uniqueid": 19,
            "../util/clone": 20
        }],
        14: [function(require, module, exports) {
            module.exports = function() {
                if (this.options.debug && console) {
                    if (typeof console.log === "function") {
                        console.log.apply(console, arguments)
                    } else if (console.log) {
                        console.log(arguments)
                    }
                }
            }
        }, {}],
        15: [function(require, module, exports) {
            var attrState = "data-pjax-state";
            module.exports = function(el) {
                switch (el.tagName.toLowerCase()) {
                    case "a":
                        if (!el.hasAttribute(attrState)) {
                            this.attachLink(el)
                        }
                        break;
                    case "form":
                        if (!el.hasAttribute(attrState)) {
                            this.attachForm(el)
                        }
                        break;
                    default:
                        throw "Pjax can only be applied on <a> or <form> submit"
                }
            }
        }, {}],
        16: [function(require, module, exports) {
            var updateQueryString = require("./util/update-query-string");
            module.exports = function(location, options, callback) {
                options = options || {};
                var queryString;
                var requestOptions = options.requestOptions || {};
                var requestMethod = (requestOptions.requestMethod || "GET").toUpperCase();
                var requestParams = requestOptions.requestParams || null;
                var formData = requestOptions.formData || null;
                var requestPayload = null;
                var request = new XMLHttpRequest;
                var timeout = options.timeout || 0;
                request.onreadystatechange = function() {
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            callback(request.responseText, request, location, options)
                        } else if (request.status !== 0) {
                            callback(null, request, location, options)
                        }
                    }
                };
                request.onerror = function(e) {
                    console.log(e);
                    callback(null, request, location, options)
                };
                request.ontimeout = function() {
                    callback(null, request, location, options)
                };
                if (requestParams && requestParams.length) {
                    queryString = requestParams.map(function(param) {
                        return param.name + "=" + param.value
                    }).join("&");
                    switch (requestMethod) {
                        case "GET":
                            location = location.split("?")[0];
                            location += "?" + queryString;
                            break;
                        case "POST":
                            requestPayload = queryString;
                            break
                    }
                } else if (formData) {
                    requestPayload = formData
                }
                if (options.cacheBust) {
                    location = updateQueryString(location, "t", Date.now())
                }
                request.open(requestMethod, location, true);
                request.timeout = timeout;
                request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                request.setRequestHeader("X-PJAX", "true");
                request.setRequestHeader("X-PJAX-Selectors", JSON.stringify(options.selectors));
                if (requestPayload && requestMethod === "POST" && !formData) {
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                }
                request.send(requestPayload);
                return request
            }
        }, {
            "./util/update-query-string": 24
        }],
        17: [function(require, module, exports) {
            var forEachEls = require("./foreach-els");
            var defaultSwitches = require("./switches");
            module.exports = function(switches, switchesOptions, selectors, fromEl, toEl, options) {
                var switchesQueue = [];
                selectors.forEach(function(selector) {
                    var newEls = fromEl.querySelectorAll(selector);
                    var oldEls = toEl.querySelectorAll(selector);
                    if (this.log) {
                        this.log("Pjax switch", selector, newEls, oldEls)
                    }
                    if (newEls.length !== oldEls.length) {
                        throw "DOM doesn’t look the same on new loaded page: ’" + selector + "’ - new " + newEls.length + ", old " + oldEls.length
                    }
                    forEachEls(newEls, function(newEl, i) {
                        var oldEl = oldEls[i];
                        if (this.log) {
                            this.log("newEl", newEl, "oldEl", oldEl)
                        }
                        var callback = switches[selector] ? switches[selector].bind(this, oldEl, newEl, options, switchesOptions[selector]) : defaultSwitches.outerHTML.bind(this, oldEl, newEl, options);
                        switchesQueue.push(callback)
                    }, this)
                }, this);
                this.state.numPendingSwitches = switchesQueue.length;
                switchesQueue.forEach(function(queuedSwitch) {
                    queuedSwitch()
                })
            }
        }, {
            "./foreach-els": 7,
            "./switches": 18
        }],
        18: [function(require, module, exports) {
            var on = require("./events/on");
            module.exports = {
                outerHTML: function(oldEl, newEl) {
                    oldEl.outerHTML = newEl.outerHTML;
                    this.onSwitch()
                },
                innerHTML: function(oldEl, newEl) {
                    oldEl.innerHTML = newEl.innerHTML;
                    if (newEl.className === "") {
                        oldEl.removeAttribute("class")
                    } else {
                        oldEl.className = newEl.className
                    }
                    this.onSwitch()
                },
                switchElementsAlt: function(oldEl, newEl) {
                    oldEl.innerHTML = newEl.innerHTML;
                    if (newEl.hasAttributes()) {
                        var attrs = newEl.attributes;
                        for (var i = 0; i < attrs.length; i++) {
                            oldEl.attributes.setNamedItem(attrs[i].cloneNode())
                        }
                    }
                    this.onSwitch()
                },
                replaceNode: function(oldEl, newEl) {
                    oldEl.parentNode.replaceChild(newEl, oldEl);
                    this.onSwitch()
                },
                sideBySide: function(oldEl, newEl, options, switchOptions) {
                    var forEach = Array.prototype.forEach;
                    var elsToRemove = [];
                    var elsToAdd = [];
                    var fragToAppend = document.createDocumentFragment();
                    var animationEventNames = "animationend webkitAnimationEnd MSAnimationEnd oanimationend";
                    var animatedElsNumber = 0;
                    var sexyAnimationEnd = function(e) {
                        if (e.target !== e.currentTarget) {
                            return
                        }
                        animatedElsNumber--;
                        if (animatedElsNumber <= 0 && elsToRemove) {
                            elsToRemove.forEach(function(el) {
                                if (el.parentNode) {
                                    el.parentNode.removeChild(el)
                                }
                            });
                            elsToAdd.forEach(function(el) {
                                el.className = el.className.replace(el.getAttribute("data-pjax-classes"), "");
                                el.removeAttribute("data-pjax-classes")
                            });
                            elsToAdd = null;
                            elsToRemove = null;
                            this.onSwitch()
                        }
                    }.bind(this);
                    switchOptions = switchOptions || {};
                    forEach.call(oldEl.childNodes, function(el) {
                        elsToRemove.push(el);
                        if (el.classList && !el.classList.contains("js-Pjax-remove")) {
                            if (el.hasAttribute("data-pjax-classes")) {
                                el.className = el.className.replace(el.getAttribute("data-pjax-classes"), "");
                                el.removeAttribute("data-pjax-classes")
                            }
                            el.classList.add("js-Pjax-remove");
                            if (switchOptions.callbacks && switchOptions.callbacks.removeElement) {
                                switchOptions.callbacks.removeElement(el)
                            }
                            if (switchOptions.classNames) {
                                el.className += " " + switchOptions.classNames.remove + " " + (options.backward ? switchOptions.classNames.backward : switchOptions.classNames.forward)
                            }
                            animatedElsNumber++;
                            on(el, animationEventNames, sexyAnimationEnd, true)
                        }
                    });
                    forEach.call(newEl.childNodes, function(el) {
                        if (el.classList) {
                            var addClasses = "";
                            if (switchOptions.classNames) {
                                addClasses = " js-Pjax-add " + switchOptions.classNames.add + " " + (options.backward ? switchOptions.classNames.forward : switchOptions.classNames.backward)
                            }
                            if (switchOptions.callbacks && switchOptions.callbacks.addElement) {
                                switchOptions.callbacks.addElement(el)
                            }
                            el.className += addClasses;
                            el.setAttribute("data-pjax-classes", addClasses);
                            elsToAdd.push(el);
                            fragToAppend.appendChild(el);
                            animatedElsNumber++;
                            on(el, animationEventNames, sexyAnimationEnd, true)
                        }
                    });
                    oldEl.className = newEl.className;
                    oldEl.appendChild(fragToAppend)
                }
            }
        }, {
            "./events/on": 4
        }],
        19: [function(require, module, exports) {
            module.exports = function() {
                var counter = 0;
                return function() {
                    var id = "pjax" + (new Date).getTime() + "_" + counter;
                    counter++;
                    return id
                }
            }()
        }, {}],
        20: [function(require, module, exports) {
            module.exports = function(obj) {
                if (null === obj || "object" !== typeof obj) {
                    return obj
                }
                var copy = obj.constructor();
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        copy[attr] = obj[attr]
                    }
                }
                return copy
            }
        }, {}],
        21: [function(require, module, exports) {
            module.exports = function contains(doc, selectors, el) {
                for (var i = 0; i < selectors.length; i++) {
                    var selectedEls = doc.querySelectorAll(selectors[i]);
                    for (var j = 0; j < selectedEls.length; j++) {
                        if (selectedEls[j].contains(el)) {
                            return true
                        }
                    }
                }
                return false
            }
        }, {}],
        22: [function(require, module, exports) {
            module.exports = function(target) {
                if (target == null) {
                    return null
                }
                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    if (source != null) {
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                to[key] = source[key]
                            }
                        }
                    }
                }
                return to
            }
        }, {}],
        23: [function(require, module, exports) {
            module.exports = function() {}
        }, {}],
        24: [function(require, module, exports) {
            module.exports = function(uri, key, value) {
                var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
                var separator = uri.indexOf("?") !== -1 ? "&" : "?";
                if (uri.match(re)) {
                    return uri.replace(re, "$1" + key + "=" + value + "$2")
                } else {
                    return uri + separator + key + "=" + value
                }
            }
        }, {}]
    }, {}, [1])(1)
});
jQuery(function($) {
    FaqModuleInitialize();
});

function FaqModuleInitialize() {
    $(document).on("s123.page.load", function(event) {
        var $sections = $('.s123-module-faq');
        $sections.each(function(index) {
            var $s = $(this);
            var categories = new ModuleLayoutCategories({
                $items: $s.find('.faq-category'),
                $categoriesContainer: $s.find('.categories-panel'),
                $filterButton: $s.find('.items-responsive-filter'),
                $categories: $s.find('.items-categories-container li')
            });
        });
    });
};
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.NProgress = factory();
    }
})(this, function() {
    var NProgress = {};
    NProgress.version = '0.2.0';
    var Settings = NProgress.settings = {
        minimum: 0.08,
        easing: 'linear',
        positionUsing: '',
        speed: 200,
        trickle: true,
        trickleSpeed: 200,
        showSpinner: true,
        barSelector: '[role="bar"]',
        spinnerSelector: '[role="spinner"]',
        parent: 'body',
        template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    NProgress.configure = function(options) {
        var key, value;
        for (key in options) {
            value = options[key];
            if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
        }
        return this;
    };
    NProgress.status = null;
    NProgress.set = function(n) {
        var started = NProgress.isStarted();
        n = clamp(n, Settings.minimum, 1);
        NProgress.status = (n === 1 ? null : n);
        var progress = NProgress.render(!started),
            bar = progress.querySelector(Settings.barSelector),
            speed = Settings.speed,
            ease = Settings.easing;
        progress.offsetWidth;
        queue(function(next) {
            if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();
            css(bar, barPositionCSS(n, speed, ease));
            if (n === 1) {
                css(progress, {
                    transition: 'none',
                    opacity: 1
                });
                progress.offsetWidth;
                setTimeout(function() {
                    css(progress, {
                        transition: 'all ' + speed + 'ms linear',
                        opacity: 0
                    });
                    setTimeout(function() {
                        NProgress.remove();
                        next();
                    }, speed);
                }, speed);
            } else {
                setTimeout(next, speed);
            }
        });
        return this;
    };
    NProgress.isStarted = function() {
        return typeof NProgress.status === 'number';
    };
    NProgress.start = function() {
        if (!NProgress.status) NProgress.set(0);
        var work = function() {
            setTimeout(function() {
                if (!NProgress.status) return;
                NProgress.trickle();
                work();
            }, Settings.trickleSpeed);
        };
        if (Settings.trickle) work();
        return this;
    };
    NProgress.done = function(force) {
        if (!force && !NProgress.status) return this;
        return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
    };
    NProgress.inc = function(amount) {
        var n = NProgress.status;
        if (!n) {
            return NProgress.start();
        } else if (n > 1) {
            return;
        } else {
            if (typeof amount !== 'number') {
                if (n >= 0 && n < 0.2) {
                    amount = 0.1;
                } else if (n >= 0.2 && n < 0.5) {
                    amount = 0.04;
                } else if (n >= 0.5 && n < 0.8) {
                    amount = 0.02;
                } else if (n >= 0.8 && n < 0.99) {
                    amount = 0.005;
                } else {
                    amount = 0;
                }
            }
            n = clamp(n + amount, 0, 0.994);
            return NProgress.set(n);
        }
    };
    NProgress.trickle = function() {
        return NProgress.inc();
    };
    (function() {
        var initial = 0,
            current = 0;
        NProgress.promise = function($promise) {
            if (!$promise || $promise.state() === "resolved") {
                return this;
            }
            if (current === 0) {
                NProgress.start();
            }
            initial++;
            current++;
            $promise.always(function() {
                current--;
                if (current === 0) {
                    initial = 0;
                    NProgress.done();
                } else {
                    NProgress.set((initial - current) / initial);
                }
            });
            return this;
        };
    })();
    NProgress.render = function(fromStart) {
        if (NProgress.isRendered()) return document.getElementById('nprogress');
        addClass(document.documentElement, 'nprogress-busy');
        var progress = document.createElement('div');
        progress.id = 'nprogress';
        progress.innerHTML = Settings.template;
        var bar = progress.querySelector(Settings.barSelector),
            perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
            parent = document.querySelector(Settings.parent),
            spinner;
        css(bar, {
            transition: 'all 0 linear',
            transform: 'translate3d(' + perc + '%,0,0)'
        });
        if (!Settings.showSpinner) {
            spinner = progress.querySelector(Settings.spinnerSelector);
            spinner && removeElement(spinner);
        }
        if (parent != document.body) {
            addClass(parent, 'nprogress-custom-parent');
        }
        parent.appendChild(progress);
        return progress;
    };
    NProgress.remove = function() {
        removeClass(document.documentElement, 'nprogress-busy');
        removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
        var progress = document.getElementById('nprogress');
        progress && removeElement(progress);
    };
    NProgress.isRendered = function() {
        return !!document.getElementById('nprogress');
    };
    NProgress.getPositioningCSS = function() {
        var bodyStyle = document.body.style;
        var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' : ('MozTransform' in bodyStyle) ? 'Moz' : ('msTransform' in bodyStyle) ? 'ms' : ('OTransform' in bodyStyle) ? 'O' : '';
        if (vendorPrefix + 'Perspective' in bodyStyle) {
            return 'translate3d';
        } else if (vendorPrefix + 'Transform' in bodyStyle) {
            return 'translate';
        } else {
            return 'margin';
        }
    };

    function clamp(n, min, max) {
        if (n < min) return min;
        if (n > max) return max;
        return n;
    }

    function toBarPerc(n) {
        return (-1 + n) * 100;
    }

    function barPositionCSS(n, speed, ease) {
        var barCSS;
        if (Settings.positionUsing === 'translate3d') {
            barCSS = {
                transform: 'translate3d(' + toBarPerc(n) + '%,0,0)'
            };
        } else if (Settings.positionUsing === 'translate') {
            barCSS = {
                transform: 'translate(' + toBarPerc(n) + '%,0)'
            };
        } else {
            barCSS = {
                'margin-left': toBarPerc(n) + '%'
            };
        }
        barCSS.transition = 'all ' + speed + 'ms ' + ease;
        return barCSS;
    }
    var queue = (function() {
        var pending = [];

        function next() {
            var fn = pending.shift();
            if (fn) {
                fn(next);
            }
        }
        return function(fn) {
            pending.push(fn);
            if (pending.length == 1) next();
        };
    })();
    var css = (function() {
        var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'],
            cssProps = {};

        function camelCase(string) {
            return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
                return letter.toUpperCase();
            });
        }

        function getVendorProp(name) {
            var style = document.body.style;
            if (name in style) return name;
            var i = cssPrefixes.length,
                capName = name.charAt(0).toUpperCase() + name.slice(1),
                vendorName;
            while (i--) {
                vendorName = cssPrefixes[i] + capName;
                if (vendorName in style) return vendorName;
            }
            return name;
        }

        function getStyleProp(name) {
            name = camelCase(name);
            return cssProps[name] || (cssProps[name] = getVendorProp(name));
        }

        function applyCss(element, prop, value) {
            prop = getStyleProp(prop);
            element.style[prop] = value;
        }
        return function(element, properties) {
            var args = arguments,
                prop, value;
            if (args.length == 2) {
                for (prop in properties) {
                    value = properties[prop];
                    if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
                }
            } else {
                applyCss(element, args[1], args[2]);
            }
        }
    })();

    function hasClass(element, name) {
        var list = typeof element == 'string' ? element : classList(element);
        return list.indexOf(' ' + name + ' ') >= 0;
    }

    function addClass(element, name) {
        var oldList = classList(element),
            newList = oldList + name;
        if (hasClass(oldList, name)) return;
        element.className = newList.substring(1);
    }

    function removeClass(element, name) {
        var oldList = classList(element),
            newList;
        if (!hasClass(element, name)) return;
        newList = oldList.replace(' ' + name + ' ', ' ');
        element.className = newList.substring(1, newList.length - 1);
    }

    function classList(element) {
        return (' ' + (element && element.className || '') + ' ').replace(/\s+/gi, ' ');
    }

    function removeElement(element) {
        element && element.parentNode && element.parentNode.removeChild(element);
    }
    return NProgress;
});
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    $.detectSwipe = {
        version: '2.1.2',
        enabled: 'ontouchstart' in document.documentElement,
        preventDefault: true,
        threshold: 20
    };
    var startX, startY, isMoving = false;

    function onTouchEnd() {
        this.removeEventListener('touchmove', onTouchMove);
        this.removeEventListener('touchend', onTouchEnd);
        isMoving = false;
    }

    function onTouchMove(e) {
        if ($.detectSwipe.preventDefault) {
            e.preventDefault();
        }
        if (isMoving) {
            var x = e.touches[0].pageX;
            var y = e.touches[0].pageY;
            var dx = startX - x;
            var dy = startY - y;
            var dir;
            var ratio = window.devicePixelRatio || 1;
            if (Math.abs(dx) * ratio >= $.detectSwipe.threshold) {
                dir = dx > 0 ? 'left' : 'right'
            } else if (Math.abs(dy) * ratio >= $.detectSwipe.threshold) {
                dir = dy > 0 ? 'up' : 'down'
            }
            if (dir) {
                onTouchEnd.call(this);
                $(this).trigger('swipe', dir).trigger('swipe' + dir);
            }
        }
    }

    function onTouchStart(e) {
        if (e.touches.length == 1) {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
            isMoving = true;
            this.addEventListener('touchmove', onTouchMove, false);
            this.addEventListener('touchend', onTouchEnd, false);
        }
    }

    function setup() {
        this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
    }

    function teardown() {
        this.removeEventListener('touchstart', onTouchStart);
    }
    $.event.special.swipe = {
        setup: setup
    };
    $.each(['left', 'up', 'down', 'right'], function() {
        $.event.special['swipe' + this] = {
            setup: function() {
                $(this).on('swipe', $.noop);
            }
        };
    });
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["jquery"], function(a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
}(this, function($) {
    var CanvasRenderer = function(el, options) {
        var cachedBackground;
        var canvas = document.createElement('canvas');
        el.appendChild(canvas);
        if (typeof(G_vmlCanvasManager) === 'object') {
            G_vmlCanvasManager.initElement(canvas);
        }
        var ctx = canvas.getContext('2d');
        canvas.width = canvas.height = options.size;
        var scaleBy = 1;
        if (window.devicePixelRatio > 1) {
            scaleBy = window.devicePixelRatio;
            canvas.style.width = canvas.style.height = [options.size, 'px'].join('');
            canvas.width = canvas.height = options.size * scaleBy;
            ctx.scale(scaleBy, scaleBy);
        }
        ctx.translate(options.size / 2, options.size / 2);
        ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);
        var radius = (options.size - options.lineWidth) / 2;
        if (options.scaleColor && options.scaleLength) {
            radius -= options.scaleLength + 2; // 2 is the distance between scale and bar
        }
        Date.now = Date.now || function() {
            return +(new Date());
        };
        var drawCircle = function(color, lineWidth, percent) {
            percent = Math.min(Math.max(-1, percent || 0), 1);
            var isNegative = percent <= 0 ? true : false;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, isNegative);
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        };
        var drawScale = function() {
            var offset;
            var length;
            ctx.lineWidth = 1;
            ctx.fillStyle = options.scaleColor;
            ctx.save();
            for (var i = 24; i > 0; --i) {
                if (i % 6 === 0) {
                    length = options.scaleLength;
                    offset = 0;
                } else {
                    length = options.scaleLength * 0.6;
                    offset = options.scaleLength - length;
                }
                ctx.fillRect(-options.size / 2 + offset, 0, length, 1);
                ctx.rotate(Math.PI / 12);
            }
            ctx.restore();
        };
        var reqAnimationFrame = (function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        }());
        var drawBackground = function() {
            if (options.scaleColor) drawScale();
            if (options.trackColor) drawCircle(options.trackColor, options.trackWidth || options.lineWidth, 1);
        };
        this.getCanvas = function() {
            return canvas;
        };
        this.getCtx = function() {
            return ctx;
        };
        this.clear = function() {
            ctx.clearRect(options.size / -2, options.size / -2, options.size, options.size);
        };
        this.draw = function(percent) {
            if (!!options.scaleColor || !!options.trackColor) {
                if (ctx.getImageData && ctx.putImageData) {
                    if (!cachedBackground) {
                        drawBackground();
                        cachedBackground = ctx.getImageData(0, 0, options.size * scaleBy, options.size * scaleBy);
                    } else {
                        ctx.putImageData(cachedBackground, 0, 0);
                    }
                } else {
                    this.clear();
                    drawBackground();
                }
            } else {
                this.clear();
            }
            ctx.lineCap = options.lineCap;
            var color;
            if (typeof(options.barColor) === 'function') {
                color = options.barColor(percent);
            } else {
                color = options.barColor;
            }
            drawCircle(color, options.lineWidth, percent / 100);
        }.bind(this);
        this.animate = function(from, to) {
            var startTime = Date.now();
            options.onStart(from, to);
            var animation = function() {
                var process = Math.min(Date.now() - startTime, options.animate.duration);
                var currentValue = options.easing(this, process, from, to - from, options.animate.duration);
                this.draw(currentValue);
                options.onStep(from, to, currentValue);
                if (process >= options.animate.duration) {
                    options.onStop(from, to);
                } else {
                    reqAnimationFrame(animation);
                }
            }.bind(this);
            reqAnimationFrame(animation);
        }.bind(this);
    };
    var EasyPieChart = function(el, opts) {
        var defaultOptions = {
            barColor: '#ef1e25',
            trackColor: '#f9f9f9',
            scaleColor: '#dfe0e0',
            scaleLength: 5,
            lineCap: 'round',
            lineWidth: 3,
            trackWidth: undefined,
            size: 110,
            rotate: 0,
            animate: {
                duration: 1000,
                enabled: true
            },
            easing: function(x, t, b, c, d) { // more can be found here: http://gsgd.co.uk/sandbox/jquery/easing/
                t = t / (d / 2);
                if (t < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            onStart: function(from, to) {
                return;
            },
            onStep: function(from, to, currentValue) {
                return;
            },
            onStop: function(from, to) {
                return;
            }
        };
        if (typeof(CanvasRenderer) !== 'undefined') {
            defaultOptions.renderer = CanvasRenderer;
        } else if (typeof(SVGRenderer) !== 'undefined') {
            defaultOptions.renderer = SVGRenderer;
        } else {
            throw new Error('Please load either the SVG- or the CanvasRenderer');
        }
        var options = {};
        var currentValue = 0;
        var init = function() {
            this.el = el;
            this.options = options;
            for (var i in defaultOptions) {
                if (defaultOptions.hasOwnProperty(i)) {
                    options[i] = opts && typeof(opts[i]) !== 'undefined' ? opts[i] : defaultOptions[i];
                    if (typeof(options[i]) === 'function') {
                        options[i] = options[i].bind(this);
                    }
                }
            }
            if (typeof(options.easing) === 'string' && typeof(jQuery) !== 'undefined' && jQuery.isFunction(jQuery.easing[options.easing])) {
                options.easing = jQuery.easing[options.easing];
            } else {
                options.easing = defaultOptions.easing;
            }
            if (typeof(options.animate) === 'number') {
                options.animate = {
                    duration: options.animate,
                    enabled: true
                };
            }
            if (typeof(options.animate) === 'boolean' && !options.animate) {
                options.animate = {
                    duration: 1000,
                    enabled: options.animate
                };
            }
            this.renderer = new options.renderer(el, options);
            this.renderer.draw(currentValue);
            if (el.dataset && el.dataset.percent) {
                this.update(parseFloat(el.dataset.percent));
            } else if (el.getAttribute && el.getAttribute('data-percent')) {
                this.update(parseFloat(el.getAttribute('data-percent')));
            }
        }.bind(this);
        this.update = function(newValue) {
            newValue = parseFloat(newValue);
            if (options.animate.enabled) {
                this.renderer.animate(currentValue, newValue);
            } else {
                this.renderer.draw(newValue);
            }
            currentValue = newValue;
            return this;
        }.bind(this);
        this.disableAnimation = function() {
            options.animate.enabled = false;
            return this;
        };
        this.enableAnimation = function() {
            options.animate.enabled = true;
            return this;
        };
        init();
    };
    $.fn.easyPieChart = function(options) {
        return this.each(function() {
            var instanceOptions;
            if (!$.data(this, 'easyPieChart')) {
                instanceOptions = $.extend({}, options, $(this).data());
                $.data(this, 'easyPieChart', new EasyPieChart(this, instanceOptions));
            }
        });
    };
}));