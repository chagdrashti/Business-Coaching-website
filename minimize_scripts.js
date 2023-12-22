var IconToSvg = function() {
    var _ = {
        folderPath: '/ready_uploads/svg/'
    };
    _.init = function() {};
    _.getHtml = function(icon, classes, styles) {
        if (!IsIE11()) {
            var brandFlolder = _.getBrandFolder(icon);
            icon = icon.replace('fa-', '');
            icon = icon.replace('fa ', '');
            icon = icon.replace('site123-image-icon', '');
            icon = icon.replace('site123-svg-icons', ''); // existing customers, we now use `system-svg-icons`
            icon = icon.replace('system-svg-icons', '');
            icon = icon.replace('brand-1', '');
            icon = $.trim(icon);
            var url = $GLOBALS["cdn-images-files"] + _.folderPath + brandFlolder + icon + '.svg?v=2';
            url = setImagesCDN(url);
            return '<i data-icon-name="' + icon + '" class="svg-m ' + classes + ' s123-icon-converter" style="' + styles + ' mask: url(\'' + url + '\'); -webkit-mask: url(\'' + url + '\');" alt="' + icon + '">&nbsp;</i>';
        } else {
            return '<i class="fa site123-image-icon fa-' + icon + ' ' + classes.replace('svg-m', '') + '" alt="' + icon + '"></i>';
        }
    };
    _.getBrandFolder = function(url) {
        var brandFlolder = '';
        if (url.indexOf('brand-1') != -1) {
            brandFlolder = 'brand-1/';
        }
        return brandFlolder;
    }

    function IsIE11() {
        return !!window.MSInputMethodContext && !!document.documentMode;
    }
    return _;
}();

function Forms_GoogleRecaptcha() {
    var that = this;
    that.init = function($form) {
        that.isActive = false;
        if ($('#w').length == 0 || $('#w').val().length != 0) return;
        that.$form = $form;
        that.$inputs = that.$form.find('input, textarea, select');
        that.$recaptchaToken = that.$form.find('input[name="recaptchaToken"]');
        window.isGoogleRecaptchaLoaded = false;
        that.isGotToken = false;
        that.isActive = true;
        that.$inputs.on('focus', function() {
            var isUsingMagicButtons = $('html[dir="ltr"] .all-magic-buttons .m-btn-c').length > 0;
            if (!window.isGoogleRecaptchaLoaded) {
                window.isGoogleRecaptchaLoaded = true;
                $.getScript('https://www.google.com/recaptcha/api.js?render=6Lck3r0ZAAAAAOFc__oZANv72nZ3K29O-qsOIYPp').done(function() {
                    grecaptcha.ready(function() {
                        if (isUsingMagicButtons) {
                            $('.grecaptcha-badge').addClass('grecaptcha-badge-new-position');
                        }
                    });
                });
            } else {
                $('.grecaptcha-badge').removeClass('hide');
            }
        });
        that.$inputs.on('focusout', function() {
            $('.grecaptcha-badge').addClass('hide');
        });
    }
    that.getToken = function() {
        try {
            grecaptcha.ready(function() {
                grecaptcha.execute('6Lck3r0ZAAAAAOFc__oZANv72nZ3K29O-qsOIYPp', {
                        action: 'users_forms_submit'
                    })
                    .then(function(token) {
                        that.$recaptchaToken.val(token);
                        that.isGotToken = true;
                        that.$form.submit();
                    });
            });
        } catch (err) {
            that.$recaptchaToken.val('');
            that.isGotToken = true;
            that.$form.submit();
        }
    }
    that.reset = function() {
        that.isGotToken = false;
        window.isGoogleRecaptchaLoaded = false;
    };
}
const ColorsDetector = function() {
    const _ = {};
    _.isLightDarkColor = function(c) {
        var c = c.substring(1); // strip #
        var rgb = parseInt(c, 16); // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff; // extract red
        var g = (rgb >> 8) & 0xff; // extract green
        var b = (rgb >> 0) & 0xff; // extract blue
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
        return luma > 200 ? 'light' : 'dark';
    };
    _.getLighterColor = function(color) {
        var lightColor = tinycolor(color).toRgb();
        lightColor = tinycolor(lightColor).toHsl();
        lightColor.l = 0.9;
        lightColor = tinycolor(lightColor).toRgb();
        lightColor = tinycolor(lightColor).toHexString();
        return lightColor;
    };
    _.getDrakerColor = function(color) {
        var darkColor = tinycolor(color).toRgb();
        darkColor = tinycolor(darkColor).toHsl();
        darkColor.l = 0.2;
        darkColor = tinycolor(darkColor).toRgb();
        darkColor = tinycolor(darkColor).toHexString();
        return darkColor;
    };
    _.hexColorDelta = function(hex1, hex2) {
        var hex1 = hex1.substring(1); // strip #
        var hex2 = hex2.substring(1); // strip #
        var r1 = parseInt(hex1.substring(0, 2), 16);
        var g1 = parseInt(hex1.substring(2, 4), 16);
        var b1 = parseInt(hex1.substring(4, 6), 16);
        var r2 = parseInt(hex2.substring(0, 2), 16);
        var g2 = parseInt(hex2.substring(2, 4), 16);
        var b2 = parseInt(hex2.substring(4, 6), 16);
        var r = 255 - Math.abs(r1 - r2);
        var g = 255 - Math.abs(g1 - g2);
        var b = 255 - Math.abs(b1 - b2);
        r /= 255;
        g /= 255;
        b /= 255;
        return (r + g + b) / 3;
    }
    _.getBrightnessDiff = function(hex1, hex2) {
        const R1 = parseInt(hex1.substr(1, 2), 16);
        const G1 = parseInt(hex1.substr(3, 2), 16);
        const B1 = parseInt(hex1.substr(5, 2), 16);
        const R2 = parseInt(hex2.substr(1, 2), 16);
        const G2 = parseInt(hex2.substr(3, 2), 16);
        const B2 = parseInt(hex2.substr(5, 2), 16);
        const BR1 = (299 * R1 + 587 * G1 + 114 * B1) / 1000;
        const BR2 = (299 * R2 + 587 * G2 + 114 * B2) / 1000;
        return Math.abs(BR1 - BR2);
    }
    _.getColorBestBrightnessDiff = function(mainColor, colorsToCompare) {
        const sensitivity = ['#000000', '#ffffff'].includes(mainColor) ? 125 : 50;
        colorsToCompare = colorsToCompare.map(function(colorObj, index) {
            colorObj.score = _.getBrightnessDiff(mainColor, colorObj.color);
            if (colorObj.score < sensitivity) colorObj.score = -1;
            return colorObj;
        });
        colorsToCompare.sort(function(a, b) {
            return b.score - a.score;
        });
        colorsToCompare.sort(function(a, b) {
            return a.priority - b.priority;
        });
        return {
            score: colorsToCompare[0].score,
            color: colorsToCompare[0].color,
            colorsToCompare: colorsToCompare,
            isLight: !tinycolor(colorsToCompare[0].color).isDark(),
            colorBrightnessValue: _.getColorBrightness(colorsToCompare[0].color)
        };
    }
    _.getColorBrightness = function(color) {
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance;
    }
    return _;
}();
var S123 = function() {
    var that = {};
    that.init = function() {
        S123.loadDeferCSS();
        S123.contextmMenuDisable();
        S123.addIE11SupportClass();
    };
    return that;
}();
S123.loadDeferCSS = function() {
    $(document).on('s123.page.load', function(event) {
        var $defer_css = $('.defer-css');
        $defer_css.each(function() {
            var $css = $(this);
            $css.attr('href', $css.attr('data-href'));
            $css.removeAttr('data-href');
        });
    });
};
S123.isWebsiteInSlidingWindow = function() {
    try {
        if (!window.frameElement) return false;
    } catch (e) {
        return false;
    }
    if (window.frameElement.id === 'pagePopupWinID_iFrame') return true;
}();
S123.inIframe = function() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}();
S123.addIE11SupportClass = function() {
    if (!IsIE11()) return;
    $('html').addClass('ie11-support');
};

function initS123QueryString() {
    S123.QueryString = (function(paramsArray) {
        let params = {};
        for (let i = 0; i < paramsArray.length; ++i) {
            let param = paramsArray[i]
                .split('=', 2);
            if (param.length !== 2)
                continue;
            params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
        }
        return params;
    })(window.location.search.substr(1).split('&'));
}
initS123QueryString();
S123.escapeHtml = function(text) {
    if (!text) return text;
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
    };
    return text.toString().replace(/[&<>"']/g, function(m) {
        return map[m];
    });
};
S123.contextmMenuDisable = function() {
    return;
    $('body').on('contextmenu', '.disable-context-menu', function() {
        return false;
    });
};
S123.objectAssign = function(target, sources) {
    if (Object.assign) {
        sources = Object.assign(target, sources);
    } else {
        for (var prop in target)
            if (!sources.hasOwnProperty(prop)) sources[prop] = target[prop];
    }
    return sources;
};
S123.s123IconToSvg = function() {
    var _ = {
        folderPath: '/ready_uploads/svg/'
    };
    _.init = function() {
        $(document).on('s123.page.ready.s123IconToSvg', function(event) {
            if (IsIE11()) {
                loadFiles();
                $('.s123-icon-converter').each(function() {
                    var $this = $(this);
                    var $newIcon = $(_.getHtml($this.data('icon-name'), $this.data('ie11-classes'), ''));
                    if ($this.closest('#top-menu-mobile').length > 0) {
                        var newElem = $('<span class="fa fa-' + $this.data('icon-name') + '">&nbsp;</span>');
                        $this.replaceWith(newElem);
                    } else {
                        if ($this.attr('style').indexOf('display') != -1) {
                            $newIcon.css({
                                display: $this.css('display')
                            });
                        }
                        $this.replaceWith($newIcon);
                    }
                });
            } else {
                _.handleFroalaIcons();
            }
        });
    };
    _.handleFroalaIcons = function() {
        loadFiles();
    };
    _.getHtml = function(icon, classes, styles) {
        return IconToSvg.getHtml(icon, classes, styles);
    };

    function loadFiles() {
        if ($('.f-a-css').length > 0) return;
        $('head').append('<link rel="stylesheet" class="f-a-css" href="' + $GLOBALS["cdn-system-files"] + '/files/font-awesome-4.7/css/font-awesome.min.css?v=' + $GLOBALS["v-cache"] + '">');
    }
    return _;
}();
S123.CopyToClipboard = function() {
    var _ = {};
    _.copy = (copyText) => {
        if (window.isSecureContext && navigator.clipboard) {
            secureCopy(copyText);
        } else {
            unsecuredCopy(copyText);
        }
    }
    async function secureCopy(copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        try {
            await navigator.clipboard.writeText(copyText.value)
                .then(() => {
                    $.gritter.add({
                        title: 'Link copied to clipboard',
                        class_name: 'gritter-success',
                        time: 6000
                    });
                })
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    function unsecuredCopy(copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        try {
            document.execCommand('copy');
            $.gritter.add({
                title: 'Link copied to clipboard',
                class_name: 'gritter-success',
                time: 6000
            });
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }
    }
    return _;
}();
if (typeof menuScrollOffset === 'undefined') {
    var menuScrollOffset = 0;
}
var menuScrollOffset_mobile = 60;
var isMobileDevice = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobileDevice.Android() || isMobileDevice.BlackBerry() || isMobileDevice.iOS() || isMobileDevice.Opera() || isMobileDevice.Windows());
    }
};
var whatScreen = {
    any: function() {
        var screenWidth = $(window).width();
        if (screenWidth <= 544) {
            return 'mobile';
        }
        if (screenWidth > 544 && screenWidth <= 767) {
            return 'tablet';
        }
        if (screenWidth > 768) {
            return 'desktop';
        }
    }
};

function MutationObserverHandler() {
    $(document).on('s123.page.ready', function(event) {
        clearInterval(window.S123_MutationObserver_Interval);
        window.S123_MutationObserver_Interval = setInterval(function() {
            if (document.S123_MutationObserver_Height !== document.documentElement.scrollHeight) {
                $(document).trigger('s123.page.ready.refreshParallaxImages');
                $(document).trigger('s123.page.ready.refreshAOS');
                document.S123_MutationObserver_Height = document.documentElement.scrollHeight;
            }
        }, 250);
    });
}
S123.Jarallax = function() {
    var _ = {};
    _.init = function() {
        $(document).on('s123.page.ready', function(event) {
            $('.parallax-window').each(function() {
                _.set($(this));
                _.refreshParallaxImages();
            });
        });
    };
    _.set = function($jarallax) {
        if ($jarallax.css('filter')) {
            $jarallax.data('j-filter', $jarallax.css('filter'));
            $jarallax.css('filter', 'none');
        }
        var options = {
            speed: isMobileDevice.any() ? 0.75 : 0.5
        };
        if ($jarallax.data('background-position')) {
            options.imgPosition = $jarallax.data('background-position');
        }
        $jarallax.jarallax(options);
        if ($jarallax.data('backgroundcolor')) {
            $jarallax.find('.jarallax-container').css({
                backgroundColor: $jarallax.data('backgroundcolor')
            });
        }
        if ($jarallax.data('opacity')) {
            if ($jarallax.css('opacity') == 1) {
                $jarallax.find('.jarallax-container > div').css({
                    opacity: $jarallax.data('opacity')
                });
            }
        }
        if ($jarallax.data('j-filter')) {
            $jarallax.find('.jarallax-container > div').css({
                filter: $jarallax.data('j-filter')
            });
        }
    };
    _.refresh = function($jarallax) {
        $('.parallax-window').each(function() {
            jarallax(this, 'onScroll');
            jarallax(this, 'onResize');
        });
    };
    _.refreshParallaxImages = function($jarallax) {
        $(document).on('s123.page.ready.refreshParallaxImages', function(event) {
            _.refresh();
        });
    };
    return _;
}();

function Parallax_active(active) {
    return;
    if (active) {
        if ($('html').hasClass('parallax-active')) return;
        $('html')
            .addClass('parallax-active')
            .removeClass('parallax-disabled');
    } else {
        if ($('html').hasClass('parallax-disabled')) return;
        $('html')
            .removeClass('parallax-active')
            .addClass('parallax-disabled');
        DestroyParallaxImages();
    }
}

function DestroyParallaxImages() {
    return;
    $('.parallax-window').parallax('destroy');
}

function RefreshAOS() {
    $(document).on('s123.page.ready.refreshAOS', function(event) {
        AOS.refresh();
    });
}

function TopSectionInitialize() {
    $(document).on('s123.page.ready', function(event) {
        $.each($('#websitePopupHomeVideo, .promoVideoPopup .iconsCircle, #home_buttonText, #home_buttonText_1, #topAction_buttonText_1, #topAction_buttonText_2, #promoRedirectButton1, #promoRedirectButton2'), function(index, el) {
            intializePopupVideoPlayers($(el));
        });
        s123EditorVideoTagsHandler();
        S123.VideoHandler.init();
        S123.CrossOriginHandler.init();
    });
}

function intializePopupVideoPlayers($el) {
    $el.off('click.intializePopupVideoPlayers').on('click.intializePopupVideoPlayers', function(e) {
        var $this = $(this);
        if (!$this.data('video-popup')) return;
        var player = $this.data('player');
        var videoURL = $this.attr('href');
        e.preventDefault();
        e.stopPropagation();
        if (player === 'site123') {
            videoURL = '/include/globalVideoPlayer.php?websiteID=' + $('#websiteID').val() + '&website_uniqueID=' + $('#website_uniqueID').val() + '&cad=1&url=' + encodeURIComponent(videoURL) + '&fluid=true';
        }
        if (isMobileDevice.any()) {
            if (player === 'site123') {
                videoURL += '&autoplay=false';
            } else {
                videoURL = videoURL.replace('autoplay', 'disable-autoplay');
            }
        }
        buildPopup('playVideo', '', '', videoURL, true, false, true, '', '');
    });
}

function CountersModuleInitialize() {
    $(document).on('s123.page.ready', function(event) {
        if ($.isFunction($.fn['themePluginCounter'])) {
            $('[data-plugin-counter]:not(.manual), .counters [data-to]').each(function() {
                var $this = $(this),
                    opts;
                var pluginOptions = $this.data('plugin-options');
                if (pluginOptions)
                    opts = pluginOptions;
                $this.themePluginCounter(opts);
            });
        }
    });
}

function ContactFormHomeInitialize() {
    $(document).on('s123.page.ready', function(event) {
        if ($('#contactUsFormHome').length !== 0) {
            var $contactUsFormHome = $('#contactUsFormHome');
            var clickAction = $contactUsFormHome.data('click-action');
            $contactUsFormHome.append($('<div class="conv-code-container"></div>'));
            var $convCodeContainer = $contactUsFormHome.find('.conv-code-container');
            var customFormMultiSteps = new CustomFormMultiSteps();
            customFormMultiSteps.init({
                $form: $contactUsFormHome,
                $nextButton: $contactUsFormHome.find('.next-form-btn'),
                $submitButton: $contactUsFormHome.find('.submit-form-btn'),
                $previousButton: $contactUsFormHome.find('.previous-form-btn'),
                totalSteps: $contactUsFormHome.find('.custom-form-steps').data('total-steps')
            });
            var forms_GoogleRecaptcha = new Forms_GoogleRecaptcha();
            forms_GoogleRecaptcha.init($contactUsFormHome);
            $contactUsFormHome.validate({
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
                    if ($form.hasClass('custom-form') && !CustomForm_IsLastStep($form)) {
                        $form.find('.next-form-btn:visible').trigger('click');
                        return false;
                    }
                    if ($form.hasClass('custom-form') && !CustomForm_IsFillOutAtLeastOneField($form)) {
                        bootbox.alert(translations.fillOutAtLeastOneField);
                        return false;
                    }
                    $form.find('button:submit').prop('disabled', true);
                    S123.ButtonLoading.start($form.find('button:submit'));
                    var url = "/versions/" + $('#versionNUM').val() + "/include/contactO.php";
                    if ($form.hasClass('custom-form') || $form.hasClass('horizontal-custom-form')) {
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
                                    message: translations.ThankYouAfterSubmmit + '<iframe src="/versions/' + $('#versionNUM').val() + '/include/contactSentO.php?w=' + $('#w').val() + '&websiteID=' + dataObj.websiteID + '" style="width:100%;height:30px;" frameborder="0"></iframe>',
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
            $contactUsFormHome.find('.f-b-date-timePicker').each(function() {
                var $option = $(this);
                var $datePicker = $option.find('.fake-input.date-time-picker');
                var $hiddenInput = $option.find('[data-id="' + $datePicker.data('related-id') + '"]');
                var $datePickerIcon = $option.find('.f-b-date-timePicker-icon');
                var formBuilderCalendar = new calendar_handler();
                $datePicker.data('date-format', $contactUsFormHome.data('date-format'));
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
            CustomForm_DisableTwoColumns($contactUsFormHome);
        }
    });
}

function CustomForm_DisableTwoColumns($form) {
    if ($form.find('.custom-form-steps').width() < 300) {
        $form.find('.c-f-two-columns').addClass('disableTwoColumns');
    }
}

function CustomForm_EnableTwoColumns($form) {
    if ($form.find('.custom-form-steps').width() > 300) {
        $form.find('.c-f-two-columns').removeClass('disableTwoColumns');
    }
}

function CustomForm_IsLastStep($form) {
    var step = $form.find('.custom-form-step').data('step');
    var totalSteps = $form.find('.custom-form-steps').data('total-steps');
    var $nextBtn = $form.find('.next-form-btn:visible');
    if ($nextBtn.length == 0 || !step || !totalSteps) return true;
    return totalSteps <= step;
}

function CustomForm_IsFillOutAtLeastOneField($form) {
    var isFillOutAtLeastOneField = false;
    if ($form.find('input[required="required"]').length > 0) return true;
    if ($form.find('select').length > 0) return true;
    $form.find('.form-group').each(function() {
        var $this = $(this);
        var $inputs = $this.find('input[name^="number-"],input[name^="file-"],textarea[name^="textarea-"],input[name^="datePicker-"],input[name^="email-"],input[name^="text-"]');
        var $checkboxs = $this.find('input[type="checkbox"]');
        var $checkedCheckboxs = $this.find('input[type="checkbox"]:checked');
        var $radios = $this.find('input[type="radio"]');
        var $checkedRadio = $this.find('input[type="radio"]:checked');
        if (!isFillOutAtLeastOneField && $inputs.length > 0) {
            $inputs.each(function() {
                if ($(this).val().length > 0) {
                    isFillOutAtLeastOneField = true;
                    return false;
                }
            });
        }
        if (!isFillOutAtLeastOneField && $checkboxs.length > 0 && $checkedCheckboxs.length > 0) {
            isFillOutAtLeastOneField = true;
            return false;
        }
        if (!isFillOutAtLeastOneField && $radios.length > 0 && $checkedRadio.length > 0) {
            isFillOutAtLeastOneField = true;
            return false;
        }
    });
    return isFillOutAtLeastOneField;
}

function GenerateMailingSubscriptionHTML(userEmail, websiteID, w) {
    var html = '';
    html += '<div class="form-group">';
    html += translations.ConfirmMailingSubscrive;
    html += '</div>';
    html += '<div class="form-group">';
    html += '<span>' + translations.subscribeTellAboutYou + '</span>';
    html += '</div>';
    html += '<!-- User Info -->';
    html += '<div class="row">';
    html += '<div class="col-xs-12 col-sm-5">';
    html += '<!-- User Name -->';
    html += '<div class="form-group">';
    html += '<label>' + translations.firstName + '</label>';
    html += '<input class="form-control user-first-name">';
    html += '</div>';
    html += '<!-- User Last Name -->';
    html += '<div class="form-group">';
    html += '<label>' + translations.lastName + '</label>';
    html += '<input class="form-control user-last-name">';
    html += '</div>';
    html += '<!-- User Phone -->';
    html += '<div class="form-group">';
    html += '<label>' + translations.phone + '</label><br>';
    html += '<input type="text" class="form-control phoneIntlInput" style="direction:ltr;">';
    html += '</div>';
    html += '<!-- User Country -->';
    html += '<div class="form-group">';
    html += '<label>' + translations.country + '</label>';
    html += '<select class="form-control user-country"></select>';
    html += '</div>';
    html += '<!-- User Email -->';
    html += '<input class="user-email" type="hidden" value="' + userEmail + '">';
    html += '<input class="website-id" type="hidden" value="' + websiteID + '">';
    html += '<input class="w" type="hidden" value="' + w + '">';
    html += '</div>';
    html += '</div>';
    return html;
}

function MailingModuleInitialize() {
    if ($('.widget_subscribe_form').length !== 0) {
        var $widget_subscribe_form = $('.widget_subscribe_form');
        $widget_subscribe_form.each(function(index) {
            if ($(this).find('[name="recaptchaToken"]').length == 0) {
                $(this).append('<input type="hidden" name="recaptchaToken" value="">');
            }
            var forms_GoogleRecaptcha = new Forms_GoogleRecaptcha();
            forms_GoogleRecaptcha.init($(this));
            $(this).validate({
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
                errorPlacement: function(error, element) {
                    error.appendTo(element.closest('.form-group'));
                },
                submitHandler: function(form) {
                    var $form = $(form);
                    var $userEmail = $form.find('input[name="widget-subscribe-form-email"]');
                    var websiteID = $form.find('input[name="websiteID"]').val();
                    var w = $form.find('input[name="w"]').val();
                    $form.find('button:submit').prop('disabled', true);
                    if (forms_GoogleRecaptcha.isActive && !forms_GoogleRecaptcha.isGotToken) {
                        forms_GoogleRecaptcha.getToken();
                        return false;
                    }
                    $.ajax({
                        type: 'POST',
                        url: '/versions/' + $('#versionNUM').val() + '/include/subscribe.php',
                        data: $form.serialize(),
                        success: function(respondedMessage) {
                            var respondedMessage = tryParseJSON(respondedMessage);
                            if (!respondedMessage) {
                                $form.find('button:submit').prop('disabled', false);
                                return;
                            }
                            var outPutHTML = GenerateMailingSubscriptionHTML($userEmail.val(), websiteID, w);
                            $form.trigger("reset");
                            bootbox.alert({
                                title: translations.sent,
                                message: outPutHTML,
                                className: 'contactUsConfirm',
                                backdrop: true,
                                buttons: {
                                    ok: {
                                        label: 'Update',
                                        className: 'btn-primary'
                                    }
                                }
                            });
                            var countryList = JSON.parse(respondedMessage.countryList);
                            var userCountryName = respondedMessage.countryName;
                            var countryCode = respondedMessage.countryCode;
                            $.each(countryList, function(countryCode, country) {
                                $('.user-country').append('<option value="' + countryCode + '" ' + (userCountryName == country.name ? 'selected' : '') + '>' + country.name + '</option>');
                            });
                            $(".phoneIntlInput").intlTelInput({
                                autoHideDialCode: true,
                                autoPlaceholder: true,
                                geoIpLookup: function(callback) {
                                    callback(countryCode);
                                },
                                initialCountry: "auto",
                                nationalMode: true,
                                numberType: "MOBILE",
                                utilsScript: "/files/frameworks/intl-tel-input-8.5.2/build/js/utils.js"
                            });
                            $(".phoneIntlInput").removeAttr("autocomplete");
                            try {
                                setTimeout(function() {
                                    $('.contactUsConfirm').find(".phoneIntlInput").val($('.contactUsConfirm').find(".phoneIntlInput").intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL));
                                }, 500);
                            } catch (e) {
                                $('.contactUsConfirm').find(".phoneIntlInput").val($('.contactUsConfirm').find(".phoneIntlInput").val());
                            }
                            $('.contactUsConfirm').find('button[data-bb-handler=ok]').off('click').on('click', function() {
                                var websiteID = $('.contactUsConfirm').find('.website-id').val();
                                var w = $('.contactUsConfirm').find('.w').val();
                                var userEmail = $('.contactUsConfirm').find('.user-email').val();
                                var userFirstName = $('.contactUsConfirm').find('.user-first-name').val();
                                var userLastName = $('.contactUsConfirm').find('.user-last-name').val();
                                var userPhone = $('.contactUsConfirm').find('.phoneIntlInput').val();
                                userPhone = '+' + $('.contactUsConfirm .country-list .active').data('dial-code') + userPhone;
                                var userCountry = $('.contactUsConfirm').find('.user-country').val();
                                $.ajax({
                                    type: 'POST',
                                    url: '/versions/' + $('#versionNUM').val() + '/include/subscribe-update-info.php',
                                    data: {
                                        websiteid: websiteID,
                                        w: w,
                                        email: userEmail,
                                        firstName: userFirstName,
                                        lastName: userLastName,
                                        phone: userPhone,
                                        country: userCountry
                                    },
                                    success: function(response) {}
                                });
                            });
                            $form.find('button:submit').prop('disabled', false);
                            WizardNotificationUpdate();
                            forms_GoogleRecaptcha.reset();
                        }
                    });
                    return false;
                }
            });
        });
    }
}

function OpenSearchWindow(closeLocation, customPlaceholder) {
    var placeholder = customPlaceholder.length > 0 ? customPlaceholder : translations.enterYourQuery;
    var currentPageUrl = window.location.href;
    var searchInput = '<div class="searchInput" style="display:none;">';
    searchInput += '<form id="searchPopup" class="searchBox">';
    searchInput += '<div class="form-group">';
    searchInput += '<div class="input-group">';
    searchInput += '<input type="text" name="widget-search-form-keyword" class="widget-search-form-keyword form-control input-lg" placeholder="' + placeholder + '" aria-required="true" autocomplete="off">';
    searchInput += '<span class="input-group-btn">';
    searchInput += '<button class="btn btn-lg btn-primary" type="submit">' + S123.s123IconToSvg.getHtml('search', '', '') + '</button>';
    searchInput += '</span>';
    searchInput += '</div>';
    searchInput += '</div>';
    searchInput += '<input type="hidden" name="w" value="' + $('#w').val() + '">';
    searchInput += '<input type="hidden" name="websiteID" value="' + $('#websiteID').val() + '">';
    searchInput += '<input type="hidden" name="tranW" value="' + websiteLanguageCountryFullCode + '">';
    searchInput += '</form>';
    searchInput += '</div>';
    searchInput += '<div class="result" style="display:none;">';
    searchInput += '</div>';
    buildPopup('popupFloatDivSearch', '', searchInput, '', true, false, true, closeLocation, '');
    setTimeout(function() {
        var screenHeight = $('#popupFloatDivSearch .page').outerHeight(true);
        var searchHeight = $('#popupFloatDivSearch .searchInput').outerHeight(true);
        $('#popupFloatDivSearch .result').height(screenHeight - searchHeight);
        $('#popupFloatDivSearch .searchInput').show();
        $('#popupFloatDivSearch .result').show();
        if (!is_touch_device()) {
            $('#searchPopup .widget-search-form-keyword').focus();
        }
    }, 150);
    $('#searchPopup').submit(function(event) {
        var $form = $(this);
        var $input = $form.find('input[name="widget-search-form-keyword"]');
        var resultURL = '';
        var searchParam = '-search';
        var redirectOnSubmit = false;
        var $hasEcommerce = $('#hasEcommerce');
        if ($hasEcommerce.val() == '1') {
            searchParam = '-eCommerceSearch';
            redirectOnSubmit = true;
        }
        if ($input.val().length > 0) {
            if ($('#w').val() != '') {
                resultURL = '/' + searchParam + '/' + encodeURIComponent($input.val()) + '/?w=' + $('#w').val();
            } else {
                resultURL = '/' + searchParam + '/' + encodeURIComponent($input.val()) + '/';
            }
        }
        window.history.replaceState(currentPageUrl, 'Title', globalLanguageChildLan + resultURL);
        event.preventDefault();
        $form.find('button:submit').prop('disabled', true);
        $input.val($.trim($input.val()));
        if ($input.val().length === 0) {
            bootbox.alert({
                message: translations.searchInputValidation,
                className: 'bootbox-search-input-validation'
            }).on("hidden.bs.modal", function() {
                $form.find('button:submit').prop('disabled', false);
                $input.focus();
            });
            return;
        }
        if (redirectOnSubmit) {
            location.reload();
            return;
        }
        OpenSearchWindowSearchAjax($form);
    });
    $('#popupFloatDivSearch .popupCloseButton').on('click', function() {
        window.history.replaceState('', 'Title', currentPageUrl);
    });
    $('#popupFloatDivSearch .cover').on('click', function() {
        window.history.replaceState('', 'Title', currentPageUrl);
    });
}

function addWebsiteSearchPjaxSupport() {
    return;
    $html = $('#popupFloatDivSearch .result');
    $html.find('a').each(function() {
        var $this = $(this);
        if ($this.attr('target') == '_blank') return;
        $this.addClass('s123-fast-page-load');
    });
    S123.Pjax.refresh();
}

function OpenSearchWindowSearchAjax($form, query) {
    if (query) $('#searchPopup').find('[name="widget-search-form-keyword"]').val(query);
    $.ajax({
        type: 'POST',
        url: '/versions/' + $('#versionNUM').val() + '/include/searchResult/search.php',
        data: $form.serialize(),
        beforeSend: function() {
            $('#popupFloatDivSearch .result').html('LOADING...');
        },
        success: function(data) {
            $('#popupFloatDivSearch .result').html(data);
            $(document).trigger('s123.page.ready.data-model');
            addWebsiteSearchPjaxSupport();
        },
        complete: function(data) {
            $form.find('button:submit').prop('disabled', false);
            if (is_touch_device()) {
                document.activeElement.blur();
                $form.find('input[name="widget-search-form-keyword"]').blur();
            }
        }
    });
}

function SearchModuleInitialize() {
    $(document).on('s123.page.ready.search', function(event) {
        var $widget_search = $('.widget_search');
        $widget_search.each(function() {
            var $form = $(this);
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
                errorPlacement: function(error, element) {
                    error.appendTo(element.closest('.form-group'));
                },
                submitHandler: function(form) {
                    OpenSearchWindow('', $form.find('[name="widget-search-form-keyword"]').attr('placeholder'));
                    OpenSearchWindowSearchAjax($form, $form.find('[name="widget-search-form-keyword"]').val());
                    return false;
                }
            });
        });
    });
}

function ModulesDataModelInitialize() {
    $(document).on('s123.page.ready.data-model', function(event) {
        $('a[data-rel="popupScreen"]').off('click.popupScreen').on('click.popupScreen', function(event) {
            event.preventDefault();
            var $this = $(this);
            var href = $this.attr('href');
            var $link = $('<a href="' + href + '"></a>');
            var link = $link.get(0);
            href = link.href.replace(link.pathname, link.pathname + '/-content');
            buildPopup('pagePopupWinID', '', '', href, true, true, false, '', '');
        });
    });
}

function HomepageVideoSettingInitialize() {
    $(document).on('s123.page.ready', function(event) {
        if ($('#homepage_full_screen_3_party_video').length !== 0) {
            var $videoIframe = $('#homepage_full_screen_3_party_video');
            if ($videoIframe[0].src.indexOf("youtube.com") > -1) {
                (function() {
                    var script = document.createElement('script');
                    script.src = "http://www.youtube.com/player_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
                    var player;
                    window.onYouTubePlayerAPIReady = function() {
                        player = new YT.Player('homepage_full_screen_3_party_video', {
                            playerVars: {
                                'autoplay': 1,
                                'controls': 0,
                                'autohide': 1,
                                'wmode': 'opaque',
                                'loop': 1,
                                'modestbranding': 1,
                                'rel': 0,
                                'showinfo': 0
                            },
                            events: {
                                'onReady': onPlayerReady
                            }
                        });
                    }

                    function onPlayerReady(event) {
                        event.target.mute();
                    }
                })();
            } else if ($videoIframe[0].src.indexOf("vimeo.com") > -1) {
                (function() {
                    var script = document.createElement('script');
                    script.src = "https://f.vimeocdn.com/js/froogaloop2.min.js";
                    script.onload = function(script) {
                        var player = $f($videoIframe[0]);
                        player.api('setVolume', 0);
                    };
                    firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
                })();
            }
        }
    });
}

function GoToTopButtonInitialize() {
    $(document).on('s123.page.ready', function(event) {
        var $gotoTop = $('#gotoTop');
        var top = 150;
        $(document).off('S123MagicButton.initialized.GoToTopButton').on('S123MagicButton.initialized.GoToTopButton', function(event) {
            var $allMagicButtons = $('.all-magic-buttons');
            var isFreePackage = $('html.isFreePackage').length !== 0;
            if (($('html').attr('dir') === 'rtl' && !$('.all-magic-buttons').hasClass('mg-b-icon-position-right')) || $('.all-magic-buttons').hasClass('mg-b-icon-position-left')) {
                $gotoTop.css({
                    left: $allMagicButtons.width() + parseInt($allMagicButtons.css('left')) + 10,
                    bottom: '25px'
                });
            } else {
                $gotoTop.css({
                    right: $allMagicButtons.width() + parseInt($allMagicButtons.css('right')) + 10,
                    bottom: '25px'
                });
            }
            if (isFreePackage) {
                if ($('html:not(.s123-ads-banner-small) .all-magic-buttons').length !== 0) {
                    $gotoTop.css({
                        bottom: '75px'
                    });
                } else if ($('html[dir="ltr"].in-management.s123-ads-banner-small .all-magic-buttons.mg-b-icon-position-left').length !== 0) {
                    $gotoTop.css({
                        bottom: '75px'
                    });
                } else if ($('html[dir="rtl"].in-management.s123-ads-banner-small .all-magic-buttons').length !== 0) {
                    $gotoTop.css({
                        bottom: '75px'
                    });
                }
                if ($('html[dir="rtl"].in-management.s123-ads-banner-small .all-magic-buttons.mg-b-icon-position-right').length !== 0) {
                    $gotoTop.css({
                        bottom: '25px'
                    });
                }
            }
        });
        $(window).scroll(function() {
            if ($(window).scrollTop() >= top) {
                $gotoTop.show(200);
            } else {
                $gotoTop.hide(200);
            }
        });
    });
}

function ContactUsMapObject() {
    $(document).on('s123.page.ready', function(event) {
        $('.s123-module-contact-map, .gmap-container').find('.map-container').each(function(index, upload) {
            var $this = $(this);
            var dataID = $this.attr('id');
            var dataSrc = $this.data('src');
            if (!dataSrc) dataSrc = $this.attr('src');
            var $iframe = $('<iframe id="' + dataID + '" class="map-container iframeLazyload" data-src="' + dataSrc + '" frameborder="0"></iframe>');
            $this.replaceWith($iframe);
            $iframe.css('pointer-events', 'none');
            $iframe.parent().click(function(event) {
                $iframe.css('pointer-events', 'auto');
            });
            $iframe.parent().mouseleave(function() {
                $iframe.css('pointer-events', 'none');
            });
        });
    });
}

function ActivePopupInPage() {
    $(document).on('s123.page.ready', function(event) {
        ActivePopupActionButtonsInPage();
    });
}

function ActivePopupActionButtonsInPage() {
    $('[data-toggle="search_menuCallActionIcons"]').off('click').click(function() {
        var $this = $(this);
        OpenSearchWindow($this.data('closeLocation'), websiteCustomSearchPlaceHolder);
    });
    $('[data-toggle="social_menuCallActionIcons"]').off('click').click(function() {
        var $this = $(this);
        if (findBootstrapEnvironment() == 'xs') {
            var isMobile = 'mobile';
        } else {
            var isMobile = '';
        }
        var content = $('#header-social-content').html();
        buildPopup('popupFloatDivSearch', '', content, '', true, true, true, $this.data('closeLocation'), '');
        $(document).trigger('s123.page.ready.wizard_preview_manage_helpers');
    });
    $('[data-toggle="phone_menuCallActionIcons"]').off('click').click(function() {
        var $this = $(this);
        var $header_phone_content = $('#header-phone-content').clone();
        var multiPhonesObj = tryParseJSON($('#multiPhonesSettings').val());
        if (!multiPhonesObj) return;
        if (multiPhonesObj.length == 1 && multiPhonesObj[0].note == "") {
            if ((multiPhonesObj[0].type == '1' || multiPhonesObj[0].type == '4') && !isMobileDevice.any()) {
                openMultiPhonesPopup();
                return;
            }
            if (multiPhonesObj[0].type == '3') {
                window.open($header_phone_content.find('a')[0].href, '_blank');
            } else if (multiPhonesObj[0].type == '5') {
                window.open($header_phone_content.find('a')[0].href, '_blank');
            } else {
                window.location = $header_phone_content.find('a')[0].href;
            }
            return;
        }
        openMultiPhonesPopup();

        function openMultiPhonesPopup() {
            (function() {
                var max_text_length = 0;
                $header_phone_content.find('a').each(function() {
                    var $this = $(this);
                    var text_length = $this.text().length;
                    if (text_length > max_text_length) max_text_length = text_length;
                });
                if (max_text_length > 20) {
                    $header_phone_content.find('.global-contact-details-container').addClass('g-c-d-long-text-handler');
                }
            })();
            buildPopup('popupFloatDivSearch', '', $header_phone_content.html(), '', true, true, true, $this.data('closeLocation'), '');
            $(document).trigger('s123.page.ready.wizard_preview_manage_helpers');
        }
    });
    S123.globalContactEmail.init();
    $('[data-toggle="address_menuCallActionIcons"]').off('click').click(function() {
        var $this = $(this);
        buildPopup('popupFloatDivSearch', '', $('#header-address').html(), '', true, true, true, $this.data('closeLocation'), '');
        $(document).trigger('s123.page.ready.wizard_preview_manage_helpers');
    });
}

function Site123AdButtonInitialize() {
    var $html;
    var $showSmallAdOnScroll;
    var banner_height;
    if (IsWizard()) {
        $('#showSmallAdOnScroll').addClass('hidden');
        return;
    }
    $(document).on('s123.page.ready', function(event) {
        $html = $('html');
        $showSmallAdOnScroll = $('#showSmallAdOnScroll');
        if ($showSmallAdOnScroll.length === 0) return;
        if ($showSmallAdOnScroll.hasClass('static')) {
            addHtmlClass();
            return;
        }
        isSmallAds();
        banner_height = $('#showSmallAdOnScroll').outerHeight();
        bannerHandler();
        $(window).scroll(function() {
            bannerHandler();
        });
    });
    $(document).on('s123.page.ready.isSmallAds', function(event) {
        isSmallAds();
    });

    function bannerHandler() {
        var offset = ($html.hasClass('inside_page') || $html.hasClass('rich_page')) ? 0 : 50;
        if ($(window).scrollTop() >= offset) {
            addHtmlClass();
            $showSmallAdOnScroll.css({
                bottom: '0'
            });
        } else {
            removeHtmlClass();
            $showSmallAdOnScroll.css({
                bottom: (-1 * banner_height)
            });
        }
    }

    function addHtmlClass(htmlClass) {
        $html.addClass('s123-ads-banner-active');
    }

    function removeHtmlClass() {
        $html.removeClass('s123-ads-banner-active');
    }

    function isSmallAds() {
        if (!$html.hasClass('in-management')) return;
        var isSmallAds = screen.availHeight <= 660 && screen.availWidth >= 768;
        if (isSmallAds) {
            $html.addClass('s123-ads-banner-small');
        } else {
            $html.removeClass('s123-ads-banner-small');
        }
    }
}

function ActiveLazyImageLoad() {
    window.myLazyLoad = new LazyLoad({
        elements_selector: 'img.lazyload, .bgLazyload',
        threshold: 500,
        callback_enter: function(el) {
            $(document).trigger('lazyload_enter.image', [$(el)]);
        }
    });
    window.iframeLazyload = new LazyLoad({
        threshold: 500,
        elements_selector: '.iframeLazyload'
    });
    window.promoLazyload = new LazyLoad({
        elements_selector: '.promoLazyload',
        threshold: 500,
        callback_enter: function(el) {
            $(el).addClass('parallax-window');
            setTimeout(function() {
                S123.Jarallax.set($(el));
            }, 100);
            $(document).trigger('s123.page.ready.refreshParallaxImages');
        }
    });
    $(document).on('s123.page.ready', function(event) {
        window.myLazyLoad.update();
        window.iframeLazyload.update();
        window.promoLazyload.update();
        fixSafariPromoImages();
    });
    fixSafariPromoImages();

    function fixSafariPromoImages() {
        if (IsWizard() && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            $('.s123-module[data-module-type-num="1000"] .promoImageInline .lazyload:not(.loaded)').each(function(index, img) {
                LazyLoad.load(img, {
                    callback_loaded: function(el) {}
                });
            });
        }
    }
}

function SetHeightToEle() {
    $(document).on('s123.page.ready', function(event) {
        if (whatScreen.any() == 'tablet') {
            $('#top-menu').css('max-height', $(window).height() - $('.navbar-header').outerHeight(true) - menuScrollOffset_mobile);
        }
    });
}

function GetMenuPosition() {
    $(document).on('s123.page.ready', function(event) {
        layoutMenuPositionTXT = $('#layoutMenuPositionTXT').val();
        layoutMenuPositionOpenMenuTXT = ChangeDirection(layoutMenuPositionTXT);
        if (layoutMenuPositionTXT == 'left' || layoutMenuPositionTXT == 'right') {
            FixMenuTopPosition_SideMenu();
        }
        if (layoutMenuPositionTXT == 'top' || layoutMenuPositionTXT == 'bottom') {
            FixMenuTopPosition_TopMenu();
        }
    });
}

function getWebsiteMenuPosition() {
    if ($('nav#mainNav').length > 0) {
        if ($('nav#mainNav').offset().top - $(window).scrollTop() > 0) {
            return 'bottom';
        } else {
            return 'top';
        }
    } else {
        if ($('header#header').offset().left <= 0) {
            return 'left';
        } else {
            return 'right';
        }
    }
}

function MoveFirstSection(sectionNUM) {
    if ($('.promoButtons').data('prevent-btn-action')) {
        $('.promoButtons').data('prevent-btn-action', false);
        return;
    }
    var $pages = $('#s123ModulesContainer > section');
    if ($pages.length === 0) return;
    if (!sectionNUM) sectionNUM = 1;
    if (sectionNUM > $pages.length) sectionNUM = $pages.length;
    sectionNUM -= 1;
    var offset = findBootstrapEnvironment() != 'xs' ? menuScrollOffset : menuScrollOffset_mobile;
    $('html, body').stop().animate({
        scrollTop: ($pages.eq(sectionNUM).offset().top - offset)
    }, 1250, 'easeInOutExpo');
}

function MoveFirstSectionOrRedirect(url) {
    var $pages = $('#s123ModulesContainer > section');
    var offset = findBootstrapEnvironment() != 'xs' ? menuScrollOffset : menuScrollOffset_mobile;
    if ($pages.length !== 0) {
        $('html, body').stop().animate({
            scrollTop: ($pages.eq(0).offset().top - offset)
        }, 1250, 'easeInOutExpo');
    } else {
        if (url) location.href = url;
    }
}

function ScrollToModule(fromModuleID, toModuleID) {
    var offset = findBootstrapEnvironment() != 'xs' ? menuScrollOffset : menuScrollOffset_mobile;
    var $scrollTo = $('#section-' + toModuleID)
    if (toModuleID == 'top-section') {
        $scrollTo = $('#top-section')
    }
    if ($scrollTo.length === 0 && fromModuleID != '') {
        $scrollTo = $('#section-' + fromModuleID).next('section');
        if ($scrollTo.length == 0) {
            $scrollTo = $('#section-' + fromModuleID).prev('section');
        }
    }
    if ($scrollTo.length == 0) {
        $scrollTo = $('#top-section, #section-169');
    }
    if ($('html.inside_page').length > 0) {
        if ($('#w').val() != '') {
            location.href = '/?w=' + $('#w').val() + '#section-' + toModuleID;
        } else {
            location.href = '/#section-' + toModuleID;
        }
    } else {
        if ($scrollTo.length !== 0) {
            $('html, body').stop().animate({
                scrollTop: ($scrollTo.offset().top - offset)
            }, 1250, 'easeInOutExpo');
        }
    }
}
var dropdownClickFlag = 0; //Tell us if the user click on dropdown menu so we will not close it with the DOCUMENT event
function activeDropDownMenus() {
    $(document).on('s123.page.ready', function(event) {
        activeDropDownMenusAction();
    });
}

function activeDropDownMenusAction() {
    $('.dropdown-submenu > a').off('click.activeDropDownMenusAction').on('click.activeDropDownMenusAction', function(event) {
        if ($(this).parent().data('is-eCommerce')) {
            event.preventDefault();
        }
    });
    $('.navPages li').find('a').off('mouseenter.hideHoverMenu');
    $('.navPages, #top-menu .navActions').find('.dropdown-submenu')
        .off('click.subMenu mouseenter.subMenu mouseover.subMenu mouseout.subMenu mouseleave.subMenu')
        .on('click.subMenu mouseenter.subMenu mouseover.subMenu mouseout.subMenu mouseleave.subMenu', function(e) {
            var $this = $(this).find('> a');
            var eventType = e.type;
            if (findBootstrapEnvironment() == 'xs') {
                if (eventType == 'click') {
                    if ($this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen') != 'true') {
                        $this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen', 'true');
                        activeDropDownMenusAction_open(e, $this);
                    } else {
                        $this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen', 'false')
                        RemoveAllDropDownMenus();
                    }
                }
            } else {
                if (eventType == 'mouseenter') {
                    activeDropDownMenusAction_open(e, $this);
                }
                if (eventType == 'mouseover') {
                    $this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen', 'true');
                }
                if (eventType == 'click') {
                    if (dropdownClickFlag == 0) {
                        activeDropDownMenusAction_open(e, $this);
                    } else {
                        RemoveAllDropDownMenus();
                    }
                }
                if (eventType == 'mouseout') {
                    $this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen', 'false');
                    setTimeout(function() {
                        if ($this.parent('.dropdown-submenu').attr('data-menuSubMenuStillOpen') == 'false') {
                            $this.parent('.dropdown-submenu').removeClass('active').removeClass('open');
                        }
                    }, 2000);
                }
            }
        });
    $('.navPages > li').not('.dropdown-submenu').find(' > a').off('mouseenter.hideHoverMenu').on('mouseenter.hideHoverMenu', function(e) {
        $('.dropdown-submenu').removeClass('active').removeClass('open').removeClass('activePath');
        $('.dropdown-submenu').removeAttr('data-menuSubMenuStillOpen');
    });
    $(document).off('click.subMenu').on('click.subMenu', function(e) {
        if (dropdownClickFlag == 0 && $('.dropdown-submenu.open').length > 0) {
            RemoveAllDropDownMenus();
        }
    });
}

function RemoveAllDropDownMenus() {
    $('.dropdown-submenu').removeClass('active').removeClass('open');
    $('.dropdown-submenu').removeAttr('data-menuSubMenuStillOpen');
}

function activeDropDownMenusAction_open(e, $this) {
    dropdownClickFlag = 1;
    $this.parent('.dropdown-submenu').addClass('active').addClass('open');
    $this.parents('.dropdown-submenu').each(function() {
        var $this = $(this);
        $this.addClass('activePath');
    });
    $('.dropdown-submenu').not('.activePath').removeClass('active').removeClass('open').removeClass('activePath');
    $('.dropdown-submenu.activePath').removeClass('activePath');
    setTimeout(function() {
        dropdownClickFlag = 0;
    }, 1000);
}

function RemoveScriptsResidues() {
    $('body > .tooltip').remove();
}

function TriggerS123PageReady() {
    RemoveScriptsResidues();
    $(document).trigger('s123.page.ready');
}

function TriggerS123PageLoad() {
    $(document).trigger('s123.page.load');
}

function TriggerS123CSSReload() {
    $(document).trigger('s123.css.reloaded');
}

function AddReturnToManagerBtn() {
    try {
        if (!window.opener || !window.opener.s123_mobilePreview) return;
    } catch (err) {
        return;
    }
    var html = '';
    html += '<div class="returnToManager text-center">';
    html += '<a>Back to manager</a>';
    html += '</div>';
    $(document.body).append(html);
    $('.returnToManager').css({
        'position': 'fixed',
        'bottom': '0px',
        'z-index': '100',
        'display': 'block',
        'height': '53px',
        'padding-top': '15px',
        'margin-top': '0px',
        'padding-bottom': '16px',
        'margin-bottom': '0px',
        'background-color': '#2196F3',
        'width': '100%'
    });
    $('.returnToManager a').css('color', '#ffffff');
    $('.returnToManager').on('click', function() {
        window.close();
    });
}
var layoutMenuPositionTXT;
var layoutMenuPositionOpenMenuTXT;
jQuery(function($) {
    S123.ElementSizeChangeManager.escm_init();
    BlockUrlMasking();
    S123.Pjax.init();
    TopSectionInitialize();
    CountersModuleInitialize();
    ContactFormHomeInitialize();
    $(document).on('s123.page.ready', function(event) {
        MailingModuleInitialize();
    });
    ActivePopupInPage();
    SearchModuleInitialize();
    ModulesDataModelInitialize();
    HomepageVideoSettingInitialize();
    HomepageCountdown();
    GoToTopButtonInitialize();
    ContactUsMapObject();
    Site123AdButtonInitialize();
    ActiveLazyImageLoad();
    SetHeightToEle();
    GetMenuPosition();
    activeDropDownMenus();
    ActiveLanguageButton();
    PageScrollByClick();
    RefreshScrollSpy();
    (function() {
        S123Header_InitializeActionButtons(false);
        $(document).on('s123.pjax.complete', function(event) {
            S123Header_InitializeActionButtons();
        });
        $(document).on('visibilitychange', function() {
            S123Header_InitializeActionButtons();
        });
    })()
    s123MobileMenu.init();
    S123.Jarallax.init();
    RefreshAOS();
    MutationObserverHandler();
    homepageRandomText();
    ClientZone.init();
    CartCounter.init();
    moduleLayoutCategories_shadow();
    ProgressveWebApp.init();
    S123.init();
    S123.s123IconToSvg.init();
    TriggerS123PageReady();
    jqueryValidatorExtent();
    Order_FixWebsiteDomainUnderStoreSSL();
    AddReturnToManagerBtn();
    FitHomepageTextToWebsiteScreenWidth();
    $(document).trigger('s123.page.ready.FitHomepageTextToWebsiteScreenWidth');
    $(window).on('resize', function() {
        $(document).trigger('s123.page.ready.FitHomepageTextToWebsiteScreenWidth');
        $(document).trigger('s123.page.ready.isSmallAds');
    });
    S123.scrollToHandler.init();
    if (IsWizard()) {
        $(document).on('s123.pjax.complete', function() {
            topWindow.Wizard.refresh();
        });
        $(document).on('site123.colorPicker.change', function(event, id, newColor) {
            document.documentElement.style.setProperty(`--${id}`, newColor);
        });
        $(document).on('site123.fonts.change', function(event, id, newFont) {
            document.documentElement.style.setProperty(`--${id}`, newFont);
        });
    }
});
$(window).load(function() {
    $('html').addClass("page-loaded");
    TriggerS123PageLoad();
});
AOS.init({
    offset: 20,
    duration: 200, // we edited `aos.css`, to change it add the relevant CSS
    delay: 0
});

function BlockUrlMasking() {
    return;
    if (typeof packageNUM == 'undefined') return;
    if (!$.isNumeric($('#w').val()) && packageNUM < '2') {
        if (!S123.inIframe) return;
        if (S123.isWebsiteInSlidingWindow) return;
        if ($('#enable_as_theme').val() === '1') return;
        if (0) {
            topWindow.location = 'https://' + domain;
        }
        var websiteID = $('#websiteID').val();
        var topWindowURL = (topWindow && topWindow.location ? topWindow.location : '');
        var referrer = document.referrer;
        $.ajax({
            type: 'POST',
            url: '/manager/UrlMasking.php',
            data: 'websiteID=' + websiteID + '&topWindowURL=' + topWindowURL + '&referrer=' + referrer
        });
    }
}

function ChangeDirection(position) {
    switch (position) {
        case 'right':
            return 'left';
            break;
        case 'left':
            return 'right';
            break;
        case 'top':
            return 'bottom';
            break;
        case 'bottom':
            return 'top';
            break;
    }
}

function elementInViewport(el) {
    if (!el) return;
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    return (top >= window.pageYOffset && left >= window.pageXOffset && (top + height) <= (window.pageYOffset + window.innerHeight) && (left + width) <= (window.pageXOffset + window.innerWidth));
}
var setStickyMenuHandler = function() {
    var that = {};
    that.init = function(settings) {
        if (!settings) return;
        that.offSetTop = settings.offSetTop;
        that.$mainNav = settings.$mainNav;
        that.stickyMenu = $('#stickyMenu').val();
        if (that.stickyMenu == 'on') {
            that.set();
        }
    };
    that.set = function() {
        that.$mainNav.affix({
            offset: {
                top: function() {
                    return that.offSetTop
                }
            }
        });
        that.$mainNav.off('affix-top.bs.affix').on('affix-top.bs.affix', function() {
            if (!IsHomepage()) return;
            if (that.bgHandler) return;
            if ($('body').width() === $('.body').width()) {
                that.bgHandler = $('body').css('background-color');
                $('body').css('background-color', $('#mainNav').css('background-color'));
                that.$mainNav.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(event) {
                    if (!that.bgHandler) return;
                    $('body').css('background-color', that.bgHandler);
                    that.bgHandler = null;
                });
            }
        });
        that.$mainNav.off('affix.bs.affix').on('affix.bs.affix', function() {
            if (!$(window).scrollTop()) return false;
        });
    };
    return that;
}();

function ReduseMenuSizeWhenWeDontHavePlace() {
    ReduseMenuSizeWhenWeDontHavePlace_Action($('#top-menu .navPages'), 'header', 8);
    ReduseMenuSizeWhenWeDontHavePlace_Action($('.global_footer .nav'), 'footer', 4);
    FixMenuTopPosition_TopMenu();
    ShowMenuAfterReduseSize('header');
    ShowMenuAfterReduseSize('footer');
}

function ReduseMenuSizeWhenWeDontHavePlace_Action($nav, $place, $padding) {
    if (($place == 'footer' || findBootstrapEnvironment() != 'xs') && CheckMenuWidthSpace($place) && $nav.find('>li>a').length > 1) {
        if (CheckMenuWidthSpace($place)) {
            if ($nav.find('.extra-nav-more').length == 0) {
                var x = '<li class="moduleMenu extra-nav-more dropdown-submenu"><a aria-haspopup="true" aria-expanded="true" onclick="return false;"><span class="txt-container">' + translations.more.toLowerCase() + '</span>';
                if ($place == 'footer') {
                    x += ' ' + S123.s123IconToSvg.getHtml('caret-up', '', '') + '</a> <ul class="site-dropdown-menu dropdown-side-open-up';
                } else {
                    x += ' ' + S123.s123IconToSvg.getHtml('caret-down', '', '') + '</a> <ul class="site-dropdown-menu';
                }
                x += '"></ul></li>';
                $nav.append(x);
            }
            var $newLIpage = $nav.find(">li").eq(-2).detach().prependTo($nav.find('.extra-nav-more>ul'));
            if ($newLIpage.hasClass('dropdown-submenu') == true) {
                if ($('html').attr('dir') == 'rtl') {
                    $newLIpage.find('.site-dropdown-menu').addClass('dropdown-side-open-left');
                } else {
                    $newLIpage.find('.site-dropdown-menu').addClass('dropdown-side-open-right');
                }
                if ($place == 'header') {
                    if (IsIE11()) {
                        if ($('html').attr('dir') == 'rtl') {
                            $newLIpage.find('.fa').removeClass('fa-caret-down').addClass('fa-caret-left');
                        } else {
                            $newLIpage.find('.fa').removeClass('fa-caret-down').addClass('fa-caret-right');
                        }
                    } else {
                        if ($('html').attr('dir') == 'rtl') {
                            $newLIpage.find('.svg-m').replaceWith(S123.s123IconToSvg.getHtml('caret-left', '', ''));
                        } else {
                            $newLIpage.find('.svg-m').replaceWith(S123.s123IconToSvg.getHtml('caret-right', '', ''));
                        }
                    }
                }
                if ($place == 'footer') {
                    $newLIpage.find('.site-dropdown-menu').removeClass('dropdown-side-open-up');
                    var caretDir = layoutMenuPositionTXT == 'top' ? 'up' : 'down';
                    if (IsIE11()) {
                        $newLIpage.find('.fa-caret-up').removeClass('fa-caret-up').addClass('fa-caret-' + caretDir + '');
                    } else {
                        $newLIpage.find('.svg-m[data-icon-name="caret-up"]').replaceWith(S123.s123IconToSvg.getHtml('caret-' + caretDir, '', ''));
                    }
                }
            }
            if ($nav.find('.extra-nav-more').length == 0) {
                $nav.find(".extra-nav-more").detach().prependTo($nav);
            }
            ReduseMenuSizeWhenWeDontHavePlace_Action($nav, $place, $padding);
        }
    }
}

function CheckMenuWidthSpace($place) {
    if ($place == 'header') {
        switch ($('#layoutNUM').val()) {
            case '2':
                if ($('#mainNav .site_container').width() - 50 < $('#top-menu .navPages').outerWidth(true) + $('#top-menu .navActions').outerWidth(true)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case '5':
                if ($('.body').outerWidth(false) - 50 < $('#top-menu .navPages').outerWidth(true) + $('#top-menu .navActions').outerWidth(true)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case '13':
                if ($('#mainNav .site_container').width() - 50 < $('.navbar-header').outerWidth(true) + $('#top-menu .navPages').outerWidth(true) + $('#top-menu .navActions').outerWidth(true)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case '21':
                $('#centerLogo19').remove();
                $('#top-menu').css({
                    'padding-right': '0',
                    'padding-left': '0'
                });
                if ($('#mainNav .site_container').width() - 50 < $('.navbar-header').outerWidth(true) + $('#top-menu .navPages').outerWidth(true) + $('#mainNav .navActions').outerWidth(true) + 120) {
                    return true;
                } else {
                    return false;
                }
                break;
            case '33':
                if ($('#mainNav .site_container').width() < $('.navbar-header').outerWidth(true) + $('#top-menu .navPages').outerWidth(true) + $('#top-menu .navActions').outerWidth(true)) {
                    return true;
                } else {
                    return false;
                }
            default:
                if (GetTopMenuWidthByIsContainer() < $('.navbar-header').outerWidth(true) + $('#top-menu .navPages').outerWidth(true) + $('#top-menu .navActions').outerWidth(true)) {
                    return true;
                } else {
                    return false;
                }
        }
    }
    if ($place == 'footer') {
        switch ($('#footer_layout').val()) {
            case '2':
                if ($('.global_footer .part1').outerWidth(true) - 100 < $('.global_footer .nav').outerWidth(true)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case '1':
            case '3':
            case '4':
                if ($('.global_footer .side2').outerWidth(true) - 100 < $('.global_footer .nav').outerWidth(true)) {
                    return true;
                } else {
                    return false;
                }
        }
    }
}

function GetTopMenuWidthByIsContainer() {
    if ($('#mainNav .site_container').length > 0) {
        return $('#mainNav .site_container').width() - 50;
    } else {
        return $(window).outerWidth(true) - 50;
    }
}

function ReduseMenuSizeWhenWeDontHavePlaceHeight() {
    ReduseMenuSizeWhenWeDontHavePlaceHeight_action();
    FixMenuTopPosition_SideMenu();
    ShowMenuAfterReduseSize('');
    ReduseMenuSizeWhenWeDontHavePlace_Action($('.global_footer .nav'), 'footer', 4);
    FixMenuTopPosition_TopMenu();
    ShowMenuAfterReduseSize('footer');
}

function ReduseMenuSizeWhenWeDontHavePlaceHeight_action() {
    var $nav = $('#top-menu .navPages');
    if (findBootstrapEnvironment() != 'xs' && CheckMenuWidthSpaceHeight() && $nav.find('>li>a').length > 1) {
        if (CheckMenuWidthSpaceHeight()) {
            if ($nav.find('.extra-nav-more').length == 0) {
                var x = '<li class="moduleMenu extra-nav-more dropdown-submenu"><a href="#" aria-haspopup="true" aria-expanded="true">';
                if ($('html').attr('dir') == 'rtl') {
                    x += '<span class="txt-container">' + translations.more.toLowerCase() + '</span>';
                    x += ' ' + S123.s123IconToSvg.getHtml('caret-left', '', '');
                    x += '</a> <ul class="site-dropdown-menu dropdown-side-open-left"></ul></li>';
                } else {
                    x += '<span class="txt-container">' + translations.more.toLowerCase() + '</span>';
                    x += ' ' + S123.s123IconToSvg.getHtml('caret-right', '', '');
                    x += '</a> <ul class="site-dropdown-menu dropdown-side-open-right"></ul></li>';
                }
                $nav.append(x);
            }
            var $newLIpage = $nav.find(">li").eq(-2).detach().prependTo($nav.find('.extra-nav-more>ul'));
            if ($newLIpage.hasClass('dropdown-submenu') == true) {
                $newLIpage.find('.site-dropdown-menu').addClass('dropdown-side-open-' + layoutMenuPositionOpenMenuTXT + '');
            }
            if ($nav.find('.extra-nav-more').length == 0) {
                $nav.find('.extra-nav-more').detach().prependTo($nav);
            }
            ReduseMenuSizeWhenWeDontHavePlaceHeight_action();
        }
    }
}

function CheckMenuWidthSpaceHeight() {
    switch ($('#layoutNUM').val()) {
        default: if ($(window).outerHeight(true) - 20 < $('#header .header-column-logo').outerHeight(true) + $('#header .header-column-menu').outerHeight(true) + $('#header .header-column-menu-actions').outerHeight(true)) {
            return true;
        } else {
            return false;
        }
    }
}

function ShowMenuAfterReduseSize($place) {
    if (IsOnlyContent()) return;
    if ($('#top-menu').length > 0 && $('#layoutNUM').val() == '21' && $place == 'header') {
        $('#centerLogo19').remove();
        $('#top-menu').css({
            'padding-right': '0',
            'padding-left': '0'
        });
        var menuWidth = ($('#top-menu .navPages').outerWidth(true) + $('#top-menu .navActions').outerWidth(true)) / 2;
        var sumLIofMenu = 0;
        var saveLIplace = 1;
        var extraPaddingFromSideOne = 0;
        $('#top-menu .navPages > li').each(function() {
            var $this = $(this);
            sumLIofMenu += $this.outerWidth(true);
            if (sumLIofMenu >= menuWidth) {
                extraPaddingFromSideOne = sumLIofMenu - menuWidth;
                return false;
            }
            saveLIplace++;
        });
        if ($('#top-menu .navPages > li').eq(saveLIplace - 1).outerWidth(true) * 0.6 <= (extraPaddingFromSideOne)) {
            saveLIplace = saveLIplace - 1;
        }
        if ($('#top-menu .navPages > li').eq(saveLIplace - 1).length > 0) {
            $('<li id="centerLogo19">' + $('.navbar-header').html() + '</li>').insertAfter($('#top-menu .navPages > li').eq(saveLIplace - 1));
        } else {
            $('#top-menu .navPages').append('<li id="centerLogo19">' + $('.navbar-header').html() + '</li>');
        }
        (function() {
            var $logo = $('#centerLogo19 a');
            var href = $logo.attr('href');
            $logo
                .attr('href', 'javascript:void(0);')
                .off('click.scrollspyFix')
                .on('click.scrollspyFix', function(event) {
                    event.preventDefault();
                    if (!(IsWizard() && IsHomepage())) {
                        location.href = href;
                    }
                });
        })();
        ShowMenuAfterReduseSize_finishCalc();
        ShowMenuAfterReduseSize_finishCalc();
        ShowMenuAfterReduseSize_finishCalc();
        ShowMenuAfterReduseSize_finishCalc();
        if (IsWizard()) {
            $(document).trigger('centerLogo19.added');
        }
    }
    if ($('#header').length == 0 && $('#top-menu').length > 0 && $place == 'header') {
        var rectMenu = getMenuWidth();
        var rectHeader = Math.round($('#mainNav .site_container').width());
        var $replaceActionButtonsToIcon = $('.replaceActionButtonsToIcon').length > 0 ? $('.replaceActionButtonsToIcon') : $(`<li class="header-menu-wrapper replaceActionButtonsToIcon dropdown-submenu">
<a data-close-location="left" class="btn" role="button" data-container="body" data-toggle="menuCallActionIcons">
${S123.s123IconToSvg.getHtml('bars','','')}
</a>
<ul class="site-dropdown-menu navActions-dropdown" data-rel="navActions" style="opacity: 1;">
<li class="header-icons-container">
<ul class="header-icons-items"></ul>
</li>
<li class="header-action-btns-container">
<ul class="header-action-btns-items"></ul>
</li>
</ul>
</li>`);
        if ($('#mainNavMobile').is(":visible") == false && rectMenu > rectHeader && $('#top-menu .navActions .header-menu-wrapper').length == 0 && $('#top-menu.affix').length == 0) {
            $('#top-menu .navActions').append($replaceActionButtonsToIcon);
            $replaceActionButtonsToIcon.find('.site-dropdown-menu .header-action-btns-container .header-action-btns-items').append($('#top-menu .navActions .action-button-wrapper'));
            ResetMoreButton(false);
        }
        rectMenu = getMenuWidth();
        rectHeader = Math.round($('#mainNav .site_container').width());
        if ($('#mainNavMobile').is(':visible') == false && rectMenu > rectHeader && $('#top-menu .navActions .header-menu-wrapper').length > 0 && $('.replaceActionButtonsToIcon').length > 0 && $('.replaceActionButtonsToIconRemoveExtra').length == 0 && $('#top-menu.affix').length == 0) {
            $replaceActionButtonsToIcon.find('.site-dropdown-menu .header-icons-container .header-icons-items').prepend($('#top-menu').find('.header-phone-wrapper, .header-address-wrapper, .header-social-wrapper, .header-search-wrapper, .header-email-wrapper'));
            $replaceActionButtonsToIcon.addClass('replaceActionButtonsToIconRemoveExtra');
            ResetMoreButton(false);
        }
    }
    if ($('#mainNavMobile').is(":visible")) {
        if (window.mainNavMobile_page_loaded_icons_states) {
            window.mainNavMobile_page_loaded_icons_states.show();
        } else {
            window.mainNavMobile_page_loaded_icons_states = $('#mainNavMobile .navActions > li:visible')
                .not('.header-wish-list')
                .not('.header-cart-wrapper');
        }
    }
    if ($place == '' || $place == 'header') {
        $('#mainNav #top-menu .navPages, #mainNav #top-menu .navActions, #mainNav #top-menu .headerSocial, #header .header-row').css({
            'opacity': '1'
        });
    }
    if ($place == 'footer') {
        $('.global_footer .nav').css({
            'opacity': '1'
        });
    }
    $('#mainNavMobile').css({
        'opacity': '1'
    });
    activeDropDownMenusAction();

    function getMenuWidth() {
        var rectMenu = 0;
        $('#top-menu').children().each(function() {
            rectMenu += Math.round(this.offsetWidth);
        });
        if ($('#centerLogo19').length > 0) {
            rectMenu += parseInt($('#top-menu').css('padding-left'));
            rectMenu += parseInt($('#top-menu').css('padding-right'));
        } else if ($('#layoutNUM').val() != '2' && $('.site_container .s123-w-l-s').length > 0) {
            $('.site_container .s123-w-l-s').children().each(function() {
                rectMenu += Math.round(this.offsetWidth);
            });
        }
        return rectMenu;
    }
}

function ShowMenuAfterReduseSize_finishCalc() {
    var screenCenterPoint = $(window).outerWidth(true) / 2;
    var logoLeftPXforCenter = Math.round(screenCenterPoint - ($('#centerLogo19').outerWidth(true) / 2));
    var logoExistingLeftPX = Math.round($('#centerLogo19').offset().left);
    if (logoLeftPXforCenter > logoExistingLeftPX) {
        var result = (logoLeftPXforCenter - logoExistingLeftPX);
        var existingPadding = parseInt($('#top-menu').css('padding-left'), 10);
        result = result + existingPadding;
        $('#top-menu').css('padding-left', (result) + 'px');
    } else {
        var result = (logoExistingLeftPX - logoLeftPXforCenter);
        var existingPadding = parseInt($('#top-menu').css('padding-right'), 10);
        result = result + existingPadding;
        $('#top-menu').css('padding-right', (result) + 'px');
    }
}

function FixMenuTopPosition_SideMenu() {
    $('.navPages .dropdown-submenu > a').off('click.FixMenuTopPosition mouseenter.FixMenuTopPosition').on('click.FixMenuTopPosition mouseenter.FixMenuTopPosition', function(e) {
        var $this = $(this).parent().find('.site-dropdown-menu');
        if ($this.length > 0) {
            setTimeout(function() {
                var rect = $this[0].getBoundingClientRect();
                if (rect.top + rect.height > window.innerHeight && rect.height < window.innerHeight) {
                    $this.css('top', parseInt($this.css('top'), 10) - (rect.top + rect.height - window.innerHeight) - 25);
                }
                $this.css('opacity', '1');
            }, 100);
        }
    });
};

function FixMenuTopPosition_TopMenu() {
    var $menuLinks = $('.navPages .dropdown-submenu > a, .global_footer .nav .dropdown-submenu > a');
    $menuLinks
        .off('click.FixMenuTopPosition mouseenter.FixMenuTopPosition')
        .on('click.FixMenuTopPosition mouseenter.FixMenuTopPosition', function(e) {
            var $dropdown = $(this).parent().find('> .site-dropdown-menu');
            var isCategory = $dropdown.parents('ul').length > 1;
            if ($dropdown.length === 0) return;
            setTimeout(function() {
                if ($dropdown.length === 0) return;
                var rect = $dropdown[0].getBoundingClientRect();
                if (rect.top + rect.height > window.innerHeight && rect.height < window.innerHeight) {
                    $dropdown.css({
                        'bottom': '100%',
                        'top': 'auto'
                    });
                } else {
                    if (rect.top < 0 || rect.bottom < 0) {
                        $dropdown.css({
                            'top': '100%',
                            'bottom': 'auto'
                        });
                    }
                }
                if ($('html').attr('dir') != 'rtl') {
                    if (rect.right > window.innerWidth && rect.width < window.innerWidth) {
                        $dropdown.css({
                            'left': 'auto',
                            'right': isCategory ? '98%' : '0'
                        });
                    }
                } else {
                    if (rect.left < 0 && rect.width < window.innerWidth) {
                        $dropdown.css({
                            'right': 'auto',
                            'left': isCategory ? '98%' : '0'
                        });
                    }
                }
                $dropdown.css('opacity', '1');
            }, 100);
        });
}

function ResetMoreButton(isResetHamburger = true) {
    $('#mainNav #top-menu .navPages, #mainNav #top-menu .navActions, #mainNav #top-menu .headerSocial, #header .header-row, .global_footer .nav').css({
        'opacity': '0'
    });
    $('#top-menu .navPages .extra-nav-more > ul > li').each(function() {
        var $this = $(this);
        if ($('#mainNav #top-menu').length > 0) {
            $this.find('.site-dropdown-menu').removeClass('dropdown-side-open-left');
            if (IsIE11()) {
                $this.find('.fa').removeClass('fa-caret-left fa-caret-right').addClass('fa-caret-down');
            } else {
                $this.find('.svg-m').replaceWith(S123.s123IconToSvg.getHtml('caret-down', '', ''));
            }
        }
        $this.appendTo($('#top-menu .navPages'));
    });
    $('#top-menu .navPages .extra-nav-more').remove();
    if (isResetHamburger) {
        $('#top-menu .navActions .replaceActionButtonsToIcon ul:is(.header-icons-items,.header-action-btns-items) li').appendTo($('#top-menu .navActions'));
        $('#top-menu .navActions .replaceActionButtonsToIcon').remove();
    }
    $('footer .navPages .extra-nav-more > ul > li').each(function() {
        var $this = $(this);
        $this.appendTo($('footer .navPages'));
    });
    $('footer .navPages .extra-nav-more').remove();
    if (layoutMenuPositionTXT == 'left' || layoutMenuPositionTXT == 'right') {
        ReduseMenuSizeWhenWeDontHavePlaceHeight();
    } else {
        ReduseMenuSizeWhenWeDontHavePlace();
    }
}

function ActiveLanguageButton() {
    $(document).on('s123.page.ready.ActiveLanguageButton', function(event) {
        $('.website-languages-menu-link').off('click').on('click', function() {
            openDivMenuOnLanguageClickAction();
        });
    });
}

function openDivMenuOnLanguageClickAction() {
    var content = '<ul class="languagesList navPagesPopup">';
    $.each(languageList, function(index, language) {
        if (language['countryCode'] && language['countryCode'] != '') {
            content += '<li><a href="' + language['url'] + '"><img src="/files/vendor/flag-icon-css-master/flags/1x1/' + language['countryCode'] + '.svg" style="width:20px;height:14px;">&nbsp;' + language['name'] + '</a></li>';
        } else {
            content += '<li><a href="' + language['url'] + '">' + language['name'] + '</a></li>';
        }
    });
    content += '</ul>';
    buildPopup('popupFloatDivMenuLanguages', '', content, '', true, true, true, '', '');
}

function PageScrollByClick() {
    $(document).on('s123.page.ready.pageScrollByClick', function(event) {
        var offset = findBootstrapEnvironment() != 'xs' ? menuScrollOffset : menuScrollOffset_mobile;
        $('a.page-scroll').off('click.scrollEvent').on('click.scrollEvent', function(event) {
            var $anchor = $(this);
            var scroll_val = $($anchor.attr('href')).offset().top - offset;
            if (scroll_val < 0) scroll_val = 0;
            $anchor.blur();
            $('html, body').stop().animate({
                scrollTop: scroll_val
            }, 1250, 'easeInOutExpo');
            event.preventDefault();
        });
    });
}

function RefreshScrollSpy() {
    $(document).on('s123.page.ready.refreshScrollSpy', function(event) {
        $('body').scrollspy('refresh');
    });
};

function findBootstrapEnvironment() {
    var envs = ['xs', 'sm', 'md', 'lg'];
    var $el = $('<div>');
    $el.appendTo($('body'));
    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];
        $el.addClass('hidden-' + env);
        if ($el.is(':hidden')) {
            $el.remove();
            return env;
        }
    }
}

function findBootstrapColPerRow($items) {
    if (!$items || $items.length === 0) return 0;
    var first_item_offset_top = $items.first().offset().top;
    var col_per_row = 0;
    $items.each(function() {
        if ($(this).offset().top === first_item_offset_top) {
            col_per_row += 1;
        } else {
            return;
        }
    });
    return col_per_row;
}

function buildSmallPopup(popID, title, content, iframeURL, closeEsc, closeEnter, oneColor, closeLocation) {
    if (iframeURL != '') {
        content = '<iframe id="' + popID + '_iFrame" src="' + iframeURL + '" scrolling="no"></iframe>';
    }
    var x = '<div id="' + popID + '" class="quickPopupWin">';
    x += '<div class="cover">';
    x += '</div>';
    x += '<div class="content">';
    x += content;
    x += '</div>';
    x += '</div>';
    $('body').append(x);
    popupWinScrollAction(1);
    setTimeout(function() {
        $('#' + popID + '').find('.content').addClass('open');
    }, 100);
    $('#' + popID + ' .cover').click(function() {
        buildSmallPopup_CloseAction(popID);
    });
}

function buildSmallPopup_CloseAction(popID) {
    var $popup = $('#' + popID);
    if (popID == 'popupCart' && window.location.pathname == '/-order1/') {
        $(document).trigger('order1.reload');
    }
    setTimeout(function() {
        $popup.find('.content').removeClass('open');
    }, 100);
    setTimeout(function() {
        $('#' + popID).remove();
        popupWinScrollAction(0);
    }, 700);
}

function buildPopup(popID, title, content, iframeURL, closeEsc, closeEnter, oneColor, closeLocation, customClasses) {
    if ($('#' + popID).length !== 0) return;
    if (iframeURL != '') {
        var iClass = '';
        if (iframeURL.indexOf("youtube.com") > -1) iClass = 'videoSize';
        if (iframeURL.indexOf("vimeo.com") > -1) iClass = 'videoSize';
        content = '<iframe id="' + popID + '_iFrame" src="' + iframeURL + '" class="iframe ' + iClass + '" allowfullscreen></iframe>';
    }
    var x = '<div id="' + popID + '" class="popupWin container ' + customClasses + ' ' + (oneColor ? 'oneColor' : '') + '">';
    x += '<div class="cover">';
    x += '</div>';
    x += '<div class="content container">';
    x += '<div class="page">' + content + '</div>';
    x += '</div>';
    x += '<div class="popupCloseButton ' + closeLocation + '">';
    x += S123.s123IconToSvg.getHtml('times', '', '');
    x += '</div>';
    x += '</div>';
    $('body').append(x);
    popupWinScrollAction(1);
    $('#' + popID).find('.page').css({
        overflow: 'hidden'
    });
    setTimeout(function() {
        $('#' + popID).addClass('open');
        if (iframeURL == '') $('#' + popID).find('.page').css({
            overflow: 'auto'
        });
        $(document).trigger('build_popup.open');
    }, 100);
    $('#' + popID).find('.popupCloseButton').click(function() {
        buildPopup_CloseAction(popID);
    });
    $('#' + popID + ' .cover').click(function() {
        buildPopup_CloseAction(popID);
    });
    if (iframeURL != '') {
        $('#' + popID + '_iFrame').on("load", function() {
            setTimeout(function() {
                var screenHeight = $('#pagePopupWinID .page').outerHeight(true);
                $('#pagePopupWinID_iFrame').height(screenHeight);
                if (!is_touch_device()) {
                    $('#' + popID).find('.page').css({
                        overflow: 'hidden'
                    });
                } else {
                    $('#' + popID).find('.page').css({
                        overflow: 'auto'
                    });
                }
            }, 300);
        });
    }
    $(document).keyup(function(e) {
        if (closeEsc == true && e.keyCode === 27) {
            buildPopup_CloseAction(popID);
        }
    });
}

function is_touch_device() {
    return 'ontouchstart' in window // works on most browsers
        ||
        navigator.maxTouchPoints; // works on IE10/11 and Surface
};

function buildPopup_CloseAction(popID) {
    var $popup = $('#' + popID);
    $popup.find('.page').css({
        overflow: 'hidden'
    });
    $popup.removeClass('open');
    setTimeout(function() {
        $('#' + popID).remove();
        if ($('.popupWin').length == 0) {
            popupWinScrollAction(0);
        }
    }, 700);
    $(document).trigger('build_popup.close');
}

function buildPopup_CloseAllPopupsInPage() {
    if ($('.popupWin').length > 0) {
        $('.popupWin').each(function() {
            var popID = $(this).attr('id');
            buildPopup_CloseAction(popID);
        });
    }
}

function jqueryValidatorExtent() {
    jQuery.extend(jQuery.validator.messages, {
        required: translations.jqueryValidMsgRequire,
        remote: translations.jqueryValidMsgRemote,
        email: translations.jqueryValidMsgEmail,
        url: translations.jqueryValidMsgUrl,
        date: translations.jqueryValidMsgDate,
        dateISO: translations.jqueryValidMsgDateISO,
        number: translations.jqueryValidMsgNumber,
        digits: translations.jqueryValidMsgDigits,
        creditcard: translations.jqueryValidMsgCreditcard,
        equalTo: translations.jqueryValidMsgEqualTo,
        accept: translations.jqueryValidMsgAccept,
        maxlength: jQuery.validator.format(translations.jqueryValidMsgMaxlength),
        minlength: jQuery.validator.format(translations.jqueryValidMsgMinlength),
        rangelength: jQuery.validator.format(translations.jqueryValidMsgRangelength),
        range: jQuery.validator.format(translations.jqueryValidMsgRange),
        max: jQuery.validator.format(translations.jqueryValidMsgMax),
        min: jQuery.validator.format(translations.jqueryValidMsgMin)
    });
    jQuery.validator.addMethod('no-spaces-only', function(value, element) {
        return this.optional(element) || $.trim(value).length != 0;
    }, translations.pleaseEnterValidText);
}
S123.VideoHandler = function() {
    var _ = {};
    _.init = function() {
        $('.s123-video-handler:not([data-is-full-screen="true"])').each(function() {
            _.addClickEvent($(this));
        });
        if (isMobileDevice.any()) {
            $('.s123-video-handler:not([data-player="youtube"]):not([data-is-full-screen="true"])').imagesLoaded().progress(function(instance, image) {
                s123VideoHandler($(image.img).closest('.s123-video-handler'));
            });
        }
        $('.s123-video-handler[data-is-full-screen="true"]').on('click.VideoHandler', function(event) {
            var $this = $(this);
            var src = $this.data('video');
            $.magnificPopup.open({
                mainClass: 'mfp-e-product-gallery',
                delegate: '.e-p-mfp-image', // Categories Filter
                closeOnContentClick: true,
                closeBtnInside: false,
                tLoading: translations.loading, // Text that is displayed during loading
                type: 'iframe',
                items: {
                    src: src
                },
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '<div class="mfp-title" style="position: absolute; padding-top: 5px;"></div>' + '</div>',
                    patterns: {
                        youtube: {
                            index: 'youtube.com/',
                            id: function(url) {
                                var matches = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                                if (!matches || !matches[1]) return null;
                                return matches[1];
                            },
                            src: '//www.youtube.com/embed/%id%?autoplay=1'
                        },
                        vimeo: {
                            index: 'vimeo.com/',
                            id: function(url) {
                                var matches = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                                if (!matches || !matches[5]) return null;
                                return matches[5];
                            },
                            src: '//player.vimeo.com/video/%id%?autoplay=1'
                        },
                        site123: {
                            index: $GLOBALS['cdn-user-files'],
                            id: function(url) {
                                if (isMobileDevice.any()) url += '&autoplay=0';
                                return url;
                            },
                            src: '/include/globalVideoPlayer.php?websiteID=' + $('#websiteID').val() + '&website_uniqueID=' + $('#website_uniqueID').val() + '&cad=1&url=%id%'
                        },
                        site123Processing: {
                            index: '/files/images/video-processing.png',
                            id: function(url) {
                                if (isMobileDevice.any()) url += '&autoplay=0';
                                return url;
                            },
                            src: '/include/globalVideoPlayer.php?websiteID=' + $('#websiteID').val() + '&website_uniqueID=' + $('#website_uniqueID').val() + '&cad=1&url=%id%'
                        }
                    }
                },
            });
        });
    };
    _.addClickEvent = function($el) {
        $el.on('click.VideoHandler', function() {
            s123VideoHandler($(this));
        });
    };
    return _;
}();

function s123VideoHandler($obj) {
    var player = $obj.data('player');
    var video_id = $obj.data('video-id');
    var videoURL = $obj.data('video');
    var customStyle = $obj.find('img').attr('style') ? $obj.find('img').attr('style') : '';
    var width = $obj.find('img').width();
    var height = $obj.find('img').height();
    var originalHtml = $obj.prop('outerHTML');
    if (player === 'site123') {
        videoURL = '/include/globalVideoPlayer.php?websiteID=' + $('#websiteID').val() + '&website_uniqueID=' + $('#website_uniqueID').val() + '&cad=1&url=' + encodeURIComponent(videoURL) + '&width=' + width + '&height=' + height;
    }
    if (isMobileDevice.any()) {
        if (player === 'site123') {
            videoURL += '&autoplay=false';
        } else if (player === 'vimeo') {
            videoURL = videoURL.replace('autoplay', 'disable-autoplay');
        }
    } else {
        videoURL += '&autoplay=true';
    }
    var $iframe = $('<div class="video-wrapper"><iframe id="v-h-' + video_id + '" data-player="' + player + '" style="' + customStyle + 'width:' + width + 'px;height:' + height + 'px;" type="text/html" src="' + videoURL + '" allow="autoplay; fullscreen" frameborder="0" allowfullscreen></iframe></div>');
    $iframe.data('original-el', originalHtml);
    $obj.replaceWith($iframe);
    $(document).one('S123Resize.start.VideoHandler', function() {
        var $el = $($iframe.data('original-el'));
        $el.css('visibility', 'hidden');
        $iframe.replaceWith($el);
        $el.imagesLoaded().done(function(instance, image) {
            $el.css('visibility', 'visible');
        });
        S123.VideoHandler.addClickEvent($el);
    });
    (function() {
        if (player !== 'youtube') return;
        if (!isMobileDevice.any()) return;
        var youtube_player;
        if ($('#youtube_player_api').length === 0) {
            var script = document.createElement('script');
            script.id = 'youtube_player_api';
            script.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
            window.onYouTubePlayerAPIReady = function() {
                youtube_player = YouTubePlayerInitialize(video_id);
            }
        } else {
            youtube_player = YouTubePlayerInitialize(video_id);
        }

        function onPlayerReady(event) {
            if (isMobileDevice.iOS()) event.target.mute();
            event.target.playVideo();
        }

        function YouTubePlayerInitialize(video_id) {
            youtube_player = new YT.Player('v-h-' + video_id, {
                events: {
                    'onReady': onPlayerReady
                }
            });
            return youtube_player;
        }
    })();
}

function s123EditorVideoTagsHandler() {
    $('.fr-view video').each(function() {
        var $video = $(this);
        var src = $video.attr('src');
        var extension = src.split("?")[0].split('.').pop();
        var thumbnail = src.replace('.' + extension, '-thumbnail.jpg');
        $video.replaceWith('<div class="s123-video-handler" data-player="site123" data-video="' + src + '" style="max-width: 100%;max-height:100%;"><img style="' + $video.attr('style') + '" src="' + thumbnail + '"><div class="s123-video-cover"><a class="s123-video-play-icon"><i class="fa fa-play"></i></a></div></div>');
    });
}

function WizardNotificationUpdate() {
    if (IsWizard()) topWindow.Wizard.Notification.update();
}

function calculateCouponDiscount(totalPrice, $couponDiscount, $couponType) {
    if ($couponDiscount.length === 0 || !$.isNumeric($couponDiscount.val())) return 0;
    if ($couponType.length === 0 || !$.isNumeric($couponType.val())) return 0;
    if ($couponType.val() == '0') {
        return (parseFloat(totalPrice) * parseFloat($couponDiscount.val()) / 100);
    } else {
        return totalPrice > 0 ? parseFloat($couponDiscount.val()) : 0;
    }
}

function getCouponDetails(callback, couponCode, w, websiteID, versionNUM, total) {
    if (couponCode.length === 0) return;
    $.ajax({
        type: "POST",
        url: "/versions/" + versionNUM + "/wizard/orders/front/getCouponsAjax.php",
        data: 'w=' + w + '&websiteID=' + websiteID + '&couponCode=' + couponCode + '&total=' + total,
        success: function(data) {
            try {
                data = jQuery.parseJSON(data);
            } catch (e) {
                return;
            }
            if (callback) callback.call(this, data);
        }
    });
}

function getFormValues($form) {
    var values = {};
    $.each($form.serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });
    return values;
}

function getScrollbarWidth() {
    if ($(document).height() > $(window).height()) { //Make sure this page have a scroll
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
        document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = "scroll";
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    } else {
        return 0; //If this page is short without a scroll we don't add padding
    }
}

function popupWinScrollAction(addBOO) {
    var scrollWidth = getScrollbarWidth();
    if (addBOO == 1 && scrollWidth > 0) {
        $('body').addClass('popupWinScroll');
        $('body').css('padding-right', scrollWidth + 'px');
        $('#mainNavMobile').css('padding-right', scrollWidth + 'px');
        $('#showSmallAdOnScroll').css('padding-right', scrollWidth + 'px');
        if (layoutMenuPositionTXT == 'left' || layoutMenuPositionTXT == 'right') {} else {
            $('#mainNav').css('padding-right', scrollWidth + 'px');
            $('#mainNav #top-menu.affix').css('padding-right', scrollWidth + 'px');
        }
    } else {
        $('body').removeClass('popupWinScroll');
        $('body').css('padding-right', '0px');
        $('#mainNavMobile').css('padding-right', '0px');
        $('#showSmallAdOnScroll').css('padding-right', '0px');
        if (layoutMenuPositionTXT == 'left' || layoutMenuPositionTXT == 'right') {} else {
            $('#mainNav').css('padding-right', '0px');
            $('#mainNav #top-menu.affix').css('padding-right', '0px');
        }
    }
}

function Order_FixWebsiteDomainUnderStoreSSL() {
    var $store_ssl_domain = $('#store_ssl_domain');
    var $orderScreen = $('#orderScreen');
    var $websiteDomain = $('#websiteDomain');
    if ($orderScreen.length === 0 || $websiteDomain.length === 0 || $store_ssl_domain.length === 0) return;
    if (location.href.indexOf($store_ssl_domain.val()) === -1) return;
    if ($websiteDomain.val().length === 0) return;
    $('a').each(function() {
        var $this = $(this);
        var href = $this.attr('href');
        if (href && href.charAt(0) == '/') {
            var newHref = $websiteDomain.val() + href;
            $this.attr('href', newHref);
        }
    });
}

function IsHomepage() {
    return $('html.home_page').length === 1;
}

function IsInsidePage() {
    return $('html.inside_page').length === 1;
}

function IsRichPage() {
    return $('html.rich_page').length === 1;
}

function IsInsidePage() {
    return $('html.inside_page').length === 1;
}

function IsWizard() {
    return topWindow.Wizard ? true : false;
}

function IsOnlyContent() {
    var path = window.location.pathname.split("/");
    return path.pop() == '-content';
}
var topWindow = function() {
    var win = window;
    var top = win;
    while (win.parent != win) {
        try {
            win.parent.document;
            top = win.parent;
        } catch (e) {}
        win = win.parent;
    }
    return top;
}();
var holdChangeTextIntervals = []; //Hold all active interval so it will be easy to kiil them before trigger PAGE LOAD from interface
function homepageRandomText() {
    $(document).on('s123.page.ready.homepageRandomText', function(event) {
        holdChangeTextIntervals.forEach(function(element) {
            clearInterval(element);
        });
        $('.homepageRandomText').each(function() {
            homepageRandomTextAction(this, 'no');
        });
        $('.homepageRandomTextStop').each(function() {
            homepageRandomTextAction(this, 'yes');
        });
    });
}

function homepageRandomTextAction(t, hasStop) {
    var $this = $(t);
    var words = $this.data('text');
    var counter = 0;
    var speed = 5000;
    words = words.split('|');
    if (words.length > 0) {
        if (words[words.length - 1].includes('t:')) {
            var speedEle = words[words.length - 1].replace(/t:(.*)/, '$1');
            if ($.isNumeric(speedEle)) {
                speed = speedEle;
                words.splice(words.length - 1, 1);
            }
        }
        $this.html(words[counter]).addClass('elementToFadeIn');
        counter++;
        var inst = setInterval(function() {
            $this.removeClass('elementToFadeIn');
            setTimeout(function() {
                $this.html(words[counter]).addClass('elementToFadeIn');
            }, 50);
            counter++;
            if (counter >= words.length) {
                counter = 0;
                if (hasStop == 'yes') {
                    clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
                }
            }
        }, speed);
        holdChangeTextIntervals.push(inst);
    }
}
var ClientZone = function() {
    var CZ = {};
    CZ.init = function() {
        $(document).on('s123.page.ready', function(event) {
            CZ.updateClientIcon();
        });
    };
    CZ.updateClientIcon = function() {
        var $clientZoneLink = $('.header-client-zone-wrapper .client-zone-link');
        if ($clientZoneLink.length === 0) return;
        var $client = tryParseJSON($.cookie($('#websiteID').val() + '-clientZone'));
        if (!$client) return;
        $clientZoneLink.removeAttr('data-image');
        $clientZoneLink.removeAttr('data-letters');
        if ($client.profile_image) {
            $clientZoneLink.attr('data-image', 'true');
            $clientZoneLink.css('background-image', 'url(' + getImageWRV1(100, $client.profile_image) + ')');
        } else if ($client.name) {
            $clientZoneLink.attr('data-letters', $client.name[0]);
            $clientZoneLink.css('background-image', '');
        } else if ($client.email) {
            $clientZoneLink.attr('data-letters', $client.email[0]);
            $clientZoneLink.css('background-image', '');
        }
        if ($client.name !== 0) $clientZoneLink.attr('title', $client.name);
    };
    CZ.getClientAddress = function(callback) {
        var $client = tryParseJSON($.cookie($('#websiteID').val() + '-clientZone'));
        if (!$client) return;
        $.ajax({
            type: 'POST',
            url: '/versions/' + $('#versionNUM').val() + '/wizard/clientZone/getClientAddress.php',
            data: {
                websiteID: $('#websiteID').val(),
                w: $('#w').val()
            },
            success: function(response) {
                response = JSON.parse(response);
                if (response.status == 'Success') {
                    if (callback) callback.call(this, response.addresses);
                }
            }
        }).always(function() {
            $('.mainOrderBox .order-spacing-box .order-form-box').show();
        });
    }
    return CZ;
}();
var CartCounter = function() {
    var CC = {};
    CC.init = function() {
        if (S123.QueryString.onlyContent == 1) return;
        $(document).on('s123.page.ready', function(event) {
            CC.updateCartIcon();
        });
        CC.oldCustomersSupport();
    };
    CC.updateCartIcon = function() {
        var $headerCartWrapper = $('.header-cart-wrapper');
        if ($headerCartWrapper.length === 0) return;
        var productsNumber = $.cookie($('#websiteID').val() + '-cartCounter');
        if (!$.isNumeric(productsNumber)) productsNumber = 0;
        if (parseInt(productsNumber) === 0) {
            if (!$headerCartWrapper.hasClass('show-static')) {
                if ($('#mainNavMobile .navActions > li.landingPageBars').length == 0) {
                    $('#mainNavMobile .navActions > li:first').not('.landingPageBars').show();
                    window.mainNavMobile_page_loaded_icons_states = $('#mainNavMobile .navActions > li:visible')
                        .not('.header-wish-list')
                        .not('.header-cart-wrapper');
                }
                $headerCartWrapper.hide();
                ResetMoreButton();
            }
            $headerCartWrapper.find('.count').hide();
        } else {
            if (!$headerCartWrapper.hasClass('show-static')) {
                if ($('#mainNavMobile .navActions > li.landingPageBars').length == 0) {
                    $('#mainNavMobile .navActions > li:first').hide();
                    window.mainNavMobile_page_loaded_icons_states = $('#mainNavMobile .navActions > li:visible')
                        .not('.header-wish-list')
                        .not('.header-cart-wrapper');
                }
                $headerCartWrapper.show();
                $headerCartWrapper.closest('.header-column-menu-actions').addClass('side-menu-bottom-line');
                ResetMoreButton();
            }
            productsNumber = CC.getCartCountNumber($headerCartWrapper, productsNumber);
            $headerCartWrapper.find('.count').html(productsNumber).css({
                display: 'flex'
            });
        }
    };
    CC.getCartCountNumber = function($headerCartWrapper, productsNumber) {
        const productsNumberStr = productsNumber.toString();
        const productsNumberLen = productsNumberStr.length;
        const suffixes = ['', 'k', 'm', 'b', 't'];
        const suffixIndex = Math.ceil(productsNumberLen / 3) - 1;
        const suffix = suffixes[suffixIndex];
        const productsNumberDigits = productsNumberLen % 3 === 0 ? 3 : productsNumberLen % 3;
        const prefix = productsNumberStr.slice(0, productsNumberDigits);
        const newNumberStr = `${prefix}${suffix}`;
        if (newNumberStr.length == 3) {
            $headerCartWrapper.find('.count').addClass('reduceCountNumber');
        } else if (newNumberStr.length > 3) {
            $headerCartWrapper.find('.count').addClass('reduceCountNumber reduceCountNumber-4');
        } else {
            $headerCartWrapper.find('.count').removeClass('reduceCountNumber reduceCountNumber-4');
        }
        return newNumberStr;
    }
    CC.oldCustomersSupport = function() {
        if ($.cookie('CartCount') !== 'yes') return;
        $.ajax({
            type: "GET",
            url: "/versions/" + $('#versionNUM').val() + "/wizard/orders/front/countUserCart.php",
            data: 'w=' + $('#w').val() + '&websiteID=' + $('#websiteID').val() + '&tranW=' + websiteLanguageCountryFullCode + '&moduleTypeNUM=37'
        });
        CC.updateCartIcon();
    };
    return CC;
}();
S123.Pjax = function() {
    var that = {
        active: false,
        isMobile: null,
        pjaxSupported: null
    };
    that.init = function() {
        that.isMobile = findBootstrapEnvironment() === 'xs';
        that.pjaxSupported = $('#pjaxSupported').val();
        if ($('#onepage').val() !== '0') return;
        if (that.pjaxSupported != '1') return;
        that.breadcrumbInitialize();
        that.pjaxInit();
        NProgress.configure({
            showSpinner: false
        });
        document.addEventListener('pjax:send', function(event) {
            $(document).trigger('pjax_magnific_popup_reset');
            NProgress.start();
            $('.s123-front-last-element').nextAll().remove();
            that.triggerSend();
        });
        document.addEventListener('pjax:complete', function(event) {
            var is_data_page = that.isDataPage(event.request.response);
            if (is_data_page) {
                that.loadDataPageResources(event);
            } else {
                that.completeRequestActions(event, 0);
            }
        });
    };
    that.completeRequestActions = function(event, is_trigger_data_ready) {
        that.breadcrumbInitialize();
        if (typeof FB !== 'undefined') FB.XFBML.parse();
        window.grecaptcha = null;
        window.recaptcha = null;
        NProgress.done();
        if (is_trigger_data_ready) TriggerS123PageReadyData();
        TriggerS123PageReady();
        TriggerS123PageLoad();
        S123.Pjax.refresh();
        that.triggerComplete();
    };
    that.loadDataPageResources = function(event) {
        if (that.isDataResourcesLoaded) {
            that.completeRequestActions(event, 1);
            return;
        }
        that.isDataResourcesLoaded = true;
        var $request_response = $(event.request.response);
        var resource_deferreds = [];
        var $website_front_data_css = $request_response.filter('.website-front-data-css');
        $website_front_data_css.each(function(index, resource) {
            var d1 = $.Deferred();
            $(resource).load(function() {
                d1.resolve();
            })
            resource_deferreds.push(d1);
        });
        $('head').append($website_front_data_css);
        var $website_front_data_js = $request_response.filter('.website-front-data-js');
        $website_front_data_js.each(function(index, resource) {
            var d1 = $.Deferred();
            $.getScript(resource.src)
                .done(function(script, textStatus) {
                    d1.resolve();
                });
            resource_deferreds.push(d1);
        });
        $.when.apply($, resource_deferreds).done(function() {
            that.completeRequestActions(event, 0);
        });
    };
    that.pjaxInit = function() {
        var pjax_hash_delay = window.location.hash.length !== 0 ? 100 : 0;
        setTimeout(function() {
            that._p = new Pjax({
                elements: '.s123-fast-page-load',
                selectors: ['.s123-js-pjax', '#s123PjaxMainContainer', '#top-menu', "#top-menu-mobile"],
                scrollRestoration: true,
                cacheBust: false
            });
            that._p._handleResponse = that._p.handleResponse;
            that._p.handleResponse = function(responseText, request, href, options) {
                if (request.status == 404) window.location.href = request.responseURL;
                var browsedPageType = that.getBrowsedPageType(request.responseText);
                that.htmlTagClassesHandler(browsedPageType);
                if (request.responseText.match("<html")) {
                    that._p._handleResponse(responseText, request, href, options);
                } else {}
            }
            that.active = true;
        }, pjax_hash_delay);
    };
    that.refresh = function() {
        if (!that.active) return;
        that._p.refresh();
    };
    that.htmlTagClassesHandler = function(browsedPageType) {
        var homepage_html_classes = 'home_page home_page_design';
        var insidepage_html_classes = 'inside_page inside_page_header_design';
        var richpage_html_classes = 'rich_page home_page inside_page_header_design';
        if (browsedPageType.isHomepage && !browsedPageType.isRichpage) {
            $('html').removeClass(insidepage_html_classes);
            $('html').removeClass(richpage_html_classes);
            $('html').addClass(homepage_html_classes);
        } else if (browsedPageType.isRichpage) {
            $('html').removeClass(homepage_html_classes);
            $('html').removeClass(insidepage_html_classes);
            $('html').addClass(richpage_html_classes);
        } else {
            $('html').removeClass(homepage_html_classes);
            $('html').removeClass(richpage_html_classes);
            $('html').addClass(insidepage_html_classes);
        }
        popupWinScrollAction(0);
    };
    that.breadcrumbInitialize = function() {
        $('.breadcrumb-wrap .breadcrumb.container').find('a').addClass('s123-fast-page-load');
    };
    that.getBrowsedPageType = function(str) {
        var browsedPageType = {};
        str = str.substring(str.indexOf('<html'));
        str = str.substr(0, str.indexOf('>') + 1);
        browsedPageType.isHomepage = str.indexOf('home_page') !== -1;
        browsedPageType.isRichpage = str.indexOf('rich_page') !== -1;
        return browsedPageType;
    };
    that.isDataPage = function(str) {
        var $str = $(str);
        return $str.find('.s123-page-data').length > 0;
    };
    that.handleHashInUrl = function() {
        if (window.location.hash.length === 0) return;
        var $hash_element = $(window.location.hash);
        if ($hash_element.length === 0) return;
        $('html, body').scrollTop($(window.location.hash).offset().top - $('#mainNavMobile').outerHeight());
    };
    that.triggerComplete = function() {
        $(document).trigger('s123.pjax.complete');
    }
    that.triggerSend = function() {
        $(document).trigger('s123.pjax.send');
    }
    return that;
}();

function getImageWRV1(size, path) {
    if (!size || !path) return path;
    var ext = path.split('.').pop();
    path = setImagesCDN(path);
    if (ext === 'svg') return path;
    return path.replace('normal_', size + '_');
}

function setImagesCDN(path) {
    if (!path) return path;
    if ($GLOBALS['is_local_server']) return path;
    try {
        var Url = new URL(path);
        var host = Url.host.toLowerCase();
        if (host === 'cdn-cms-localhost.f-static.com') {
            return path;
        } else if (host === 'second-cdn.f-static.com' || host.indexOf("cdn-cms") !== -1 || host.indexOf("s123-cdn") !== -1) {
            path = path.replace(host, 'static1.s123-cdn-static-a.com');
        }
    } catch (e) {}
    return path;
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

function generateSharingPopoverHTML(popOverTitle, url, title) {
    html = '<div class="share-reply-buttons">';
    html += '<div class="share-reply-title" style="margin-bottom: 10px;">';
    html += '<span><b>' + popOverTitle + '</b></span>';
    html += '</div>';
    html += '<div class="share-reply-buttons" style="margin-bottom: 10px;">';
    html += '<input class="form-control sharing-url" style="cursor: text" type="text" value="' + decodeURIComponent(url) + '" readonly="">';
    html += '</div>';
    html += '<ul class="share-buttons square">';
    html += '<li style="margin-right: 5px;"><a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=' + url + '&t=' + title + '" title="Share on Facebook" target="_blank">' + S123.s123IconToSvg.getHtml('facebook', '', '') + '</a></li>';
    html += '<li style="margin-right: 5px;"><a class="btn" href="https://twitter.com/intent/tweet?source=' + url + '&text=' + title + ':%20' + url + '" target="_blank" title="Tweet">' + S123.s123IconToSvg.getHtml('twitter', '', '') + '</a></li>';
    html += '<li style="margin-right: 5px;"><a class="btn" href="mailto:?to=&subject=' + title + '&body=' + url + '">' + S123.s123IconToSvg.getHtml('envelope', '', '') + '</a></li>';
    html += '<li><button type="button" class="close">&times;</button></li>';
    html += '</ul>';
    html += '</div>';
    return html;
}

function sharePopover($button, html) {
    var $html = $(html);
    var $sharingURL = $html.find('.share-reply-buttons .sharing-url');
    var clipboard = new Clipboard('.popover.share-reply .share-reply-buttons .sharing-url', {
        target: function() {
            return document.querySelector('.popover.share-reply .share-reply-buttons .sharing-url');
        }
    });
    $sharingURL.click(function() {
        $.gritter.add({
            title: translations.linkCopiedToClipboard,
            class_name: 'gritter-success',
            time: 6000
        });
    })
    $button.popover({
        container: 'body',
        html: 'true',
        content: $html,
        trigger: 'manual',
        template: '<div class="popover share-reply" role="tooltip" style="max-width: 100%;"><div class="arrow"></div><div class="popover-content"></div></div>',
        placement: function(popover, button) {
            return isMobileDevice.any() ? 'auto' : 'top';
        }
    });
    $button.popover('show');
    $button.on('shown.bs.popover', function() {
        $html.find('button').on('click', function() {
            destroySharePopover();
        });
        $(document).on('mousedown.shareDestroyPopover', function(event) {
            if ($(event.target).closest('.popover.share-reply').length === 0) {
                destroySharePopover();
            }
        });
    });

    function destroySharePopover() {
        $button.popover('destroy');
        $(document).off('mousedown.shareDestroyPopover');
        $(window).off('blur.shareDestroyPopover');
        $(window).off('scroll.shareDestroyPopover');
    }
}

function Google_reCaptcha(reCaptcha) {
    grecaptcha.ready(function() {
        grecaptcha.render({
            'sitekey': '6LcICoEUAAAAACB-cKbhks2djWsryQxVdJe1eYBi',
            'callback': reCaptcha.callback,
            'action': reCaptcha.action
        });
        grecaptcha.execute();
    });
}

function showPrice(currency, price) {
    if (!$.isNumeric(price)) return html;
    if (currency.symbolFirst) {
        var html = '<span data-rel="multiCurrency" dir="ltr"><span data-type="symbol">' + currency.symbol + '</span><span data-type="price">' + price + '</span></span>';
    } else {
        var html = '<span data-rel="multiCurrency" dir="ltr"><span data-type="price">' + price + '</span><span data-type="symbol">' + currency.symbol + '</span></span>';
    }
    return html;
}

function FitHomepageTextToWebsiteScreenWidth() {
    $(document).on('s123.page.ready.FitHomepageTextToWebsiteScreenWidth', function(event) {
        fitTextToWebsiteScreenWidth('#home_siteSlogan', true);
        fitTextToWebsiteScreenWidth('#home_siteSlogan_2', true);
        fitTextToWebsiteScreenWidth('#home_SecondSiteSlogan', true);
        fitTextToWebsiteScreenWidth('.promoText1', false);
        fitTextToWebsiteScreenWidth('.promoText2', false);
        fitTextToWebsiteScreenWidth('.promoText3', false);
        fitTextToWebsiteScreenWidth('.promoText', false);
    });
}

function fitTextToWebsiteScreenWidth(textEle, hasCssVar) {
    var i = 0;
    var bodyWidth = $('body').width() - 50;
    var $textEle = $(textEle);
    if ($textEle.length === 0) return;
    if (hasCssVar) $textEle.css('font-size', '');
    if (whatScreen.any() == 'desktop') return;
    while (bodyWidth < $textEle.containerTextWidth_site123($textEle.css('font-size')) && i <= 50) {
        var fontSize = parseInt($textEle.css('font-size'), 10);
        fontSize = fontSize - 5;
        if (fontSize > 0) {
            $textEle.css('font-size', fontSize + 'px');
        } else {
            break;
        }
        i++;
    }
}
$.fn.containerTextWidth_site123 = function(fontSize) {
    var $this = $(this);
    if ($this.length === 0) return;
    var bodyWidth = $('body').width() - 50;
    var fontFamily = $this.css('font-family').replace('"', '\'');
    var html_calc = '<div id="containerTextWidth_site123" style="position:absolute;opacity:0;width:' + bodyWidth + 'px;display:table;font-size:' + fontSize + ';letter-spacing: ' + $this.css('letter-spacing') + ';line-height: ' + $this.css('line-height') + ';word-wrap: ' + $this.css('word-wrap') + ';white-space: ' + $this.css('white-space') + ';font-family: ' + fontFamily + ';">' + $this.html() + '</div>';
    $('body').append(html_calc);
    var width = $('#containerTextWidth_site123').width();
    $('#containerTextWidth_site123').remove();
    return width;
};
var s123MobileMenu = new function() {
    var that = this;
    that.init = function(settings) {
        $(document).on('s123.page.ready', function(event) {
            that.isRtl = $('html').attr('dir') === 'rtl' ? true : false;
            that.poupID = 'popupFloatDivMenu';
            that.animation = 400;
            that.isOpened = false;
            $('.header-menu-wrapper .mobile-menu-btn').off('click').click(function() {
                var $this = $(this);
                that.$source = $('#top-menu-mobile > ul').clone();
                that.closeLocation = $this.data('closeLocation');
                that.menuType = $this.data('menu-type');
                that.isMobile = $this.data('is-mobile');
                that.menuColor = $this.attr('data-menu-color');
                if (!that.$source) return;
                openMenu();
                that.$container = $('#popupFloatDivMenu');
                that.$page = that.$container.find('.page');
                that.$ul = that.$container.find('.navPagesPopup');
                that.$navPagesPopupActionButtons = that.$container.find('.navPagesPopupActionButtons');
                that.$categories = that.$container.find('.moduleMenu.dropdown-submenu > a');
                that.$container.addClass(that.menuColor);
                that.$container.addClass(colorContrast(that.menuColor));
                that.$categories.removeClass('page-scroll');
                dropdownClickFlag = 1;
                that.createCategoryOnClick();
                addPajaxSupport();
                addPopupCustomEvents();
            });
            topWindow.$(topWindow.document).off('mobileMenuColorCorrection').on('mobileMenuColorCorrection', function(event, val) {
                if ($('#popupFloatDivMenu').hasClass('open')) {
                    $('#popupFloatDivMenu').addClass(colorContrast(val));
                }
            })
        });
    };

    function colorContrast(colorClass) {
        const delta = 0.75;
        const cssGlobalVar = getComputedStyle(document.documentElement);
        const globalMainColor = cssGlobalVar.getPropertyValue('--global_main_color');
        const colorType = ColorsDetector.isLightDarkColor(globalMainColor.trim());
        if (colorClass == 'm-w') {
            return ColorsDetector.hexColorDelta(globalMainColor.trim(), '#ffffff') > delta ? 'color-contrast' : '';
        } else if (colorClass == 'm-g') {
            return ColorsDetector.hexColorDelta(globalMainColor.trim(), '#ebedf0') > delta ? 'color-contrast' : '';
        } else if (colorClass == '') {
            return ColorsDetector.hexColorDelta(globalMainColor.trim(), '#000000') > delta ? 'color-contrast' : '';
        } else if (colorClass == 'm-m-t-w') {
            if (colorType == 'light') {
                return 'color-contrast-black';
            } else if (colorType == 'dark') {
                return 'color-contrast';
            }
        }
        return '';
    }

    function addPajaxSupport() {
        that.$ul.find('a').each(function() {
            var $this = $(this);
            if ($this.parent().hasClass('dropdown-submenu')) return;
            if ($this.attr('target') == '_blank') return;
            $this.addClass('s123-fast-page-load');
        });
        S123.Pjax.refresh();
    }

    function addPopupCustomEvents() {
        setTimeout(function() {
            var navHeight = $('#popupFloatDivMenu .navPagesPopup').outerHeight(true) + 100;
            var actionHeight = $('.navPagesPopupActionButtons').outerHeight(true);
            var screenHeight = $('#popupFloatDivMenu .page').outerHeight(true);
            if (navHeight + actionHeight > screenHeight) {
                $('#popupFloatDivMenu .navPagesPopup').height(screenHeight - actionHeight - 15);
            } else {
                $('#popupFloatDivMenu .navPagesPopup').height(navHeight - 15);
            }
            $('#popupFloatDivMenu .navPagesPopup .site-dropdown-menu').css('opacity', '1');
        }, 150);
        activeDropDownMenusAction();
        $('#popupFloatDivMenu .navPagesPopup li').not('.dropdown-submenu').find('a').click(function() {
            buildPopup_CloseAction('popupFloatDivMenu');
        });
        $('#popupFloatDivMenu .navPagesPopupActionButtons_part2 a').click(function() {
            buildPopup_CloseAction('popupFloatDivMenu');
        });
        ActivePopupActionButtonsInPage();
        $('#popupFloatDivMenu .navPagesPopupActionButtons_part1 a.actionButton.btn-primary-action-button-4').addClass('orderOpenCart')
        $(document).trigger('s123.page.ready.pageScrollByClick');
        $(document).trigger('s123.page.ready.ActiveLanguageButton');
        $(document).trigger('s123.page.ready.wish_list');
        $(document).trigger('s123.page.ready.activeOrderPopup');
    }
    that.createCategoryOnClick = function() {
        that.$categories.each(function() {
            var $this = $(this);
            if ($this.parent().children('.site-dropdown-menu').length === 0) return;
            $this.off('click.mobile_categories').on('click.mobile_categories', function(e) {
                e.preventDefault();
                e.stopPropagation();
                that.contentOffset = $(window).width();
                $this.parent().addClass('selected-category');
                if (!$this.hasClass('active-cat')) {
                    that.menuHeight = that.$ul.outerHeight();
                    that.menuTop = that.$ul.offset().top - $(window).scrollTop();
                    var menuModuleId = $this.parent().data('menu-module-id');
                    that.$selectedCat = $this.closest('.navPagesPopup').clone();
                    that.$selectedCat.children().each(function(index, page) {
                        if ($(page).data('menu-module-id') != menuModuleId || !$(page).hasClass('selected-category')) {
                            $(page).remove();
                        } else {
                            $(page).find('.site-dropdown-menu').addClass('demo-ul');
                        }
                    });
                    replaceDemoContentWithOriginal(menuModuleId);
                    that.$selectedCat.css('overflow', 'hidden');
                    openCategory();
                    animate('show');
                    screenResizeHandler();
                }
            });
        });
    };

    function replaceDemoContentWithOriginal(menuModuleId) {
        var $selectedCategory = that.$selectedCat.children().first();
        var $categoryPages = null;
        var $category = $selectedCategory.children('a');
        $category.addClass('active-cat');
        if (IsIE11()) {
            $category.prepend('<span class="close-cat fa fa-caret-' + (that.isRtl ? 'right' : 'left') + '">&nbsp</span>');
            $category.children('span').last().remove();
        } else {
            $category.prepend(S123.s123IconToSvg.getHtml('caret-' + (that.isRtl ? 'right' : 'left'), 'close-cat', '') + '&nbsp');
            $category.children('i').last().remove();
        }
        that.$categoryPagesParent = that.$ul.find('li[data-menu-module-id="' + menuModuleId + '"].dropdown-submenu.selected-category');
        $selectedCategory.find('.demo-ul').replaceWith(that.$categoryPagesParent.children('.site-dropdown-menu'));
        $categoryPages = $selectedCategory.find('.site-dropdown-menu');
        $categoryPages.addClass('fancy-scrollbar');
        $categoryPages.addClass('active-cat-content');
        $categoryPages.css('max-height', that.menuHeight - 50 + 'px');
    }

    function animate(action, callBack) {
        var animation = {
            ul: {},
            openedCat: {}
        };
        var $categoryPages = that.$selectedCat.find('.active-cat-content');
        that.contentOffset = $(window).width();
        addRemoveAnimationClass('add', [$categoryPages, that.$container, that.$page, that.$ul, that.$selectedCat]);
        if (action == 'show') {
            that.$tmpDiv = $('<div style="width:100%;height:' + that.$ul.height() + 'px; margin-bottom:10px;"></div>');
            that.$ul.parent().prepend(that.$tmpDiv);
            if (that.isRtl) {
                that.$selectedCat.css({
                    position: 'absolute',
                    top: that.menuTop,
                    right: that.contentOffset,
                    height: that.menuHeight
                });
                animation.openedCat.right = ($(window).width() - (that.$page.offset().left + that.$page.outerWidth())) + 5;
                that.$ul.css({
                    position: 'absolute',
                    top: that.menuTop,
                    right: ($(window).width() - (that.$page.offset().left + that.$page.outerWidth())) + 5,
                    fontFamily: 'auto',
                    height: that.menuHeight,
                    zIndex: 1 // edge bug fix - element is disappears without z-index
                });
                animation.ul.right = that.contentOffset * -1;
            } else {
                that.$selectedCat.css({
                    position: 'absolute',
                    top: that.menuTop,
                    left: that.contentOffset,
                    height: that.menuHeight
                });
                animation.openedCat.left = that.$page.offset().left + 5;
                that.$ul.css({
                    position: 'absolute',
                    top: that.menuTop,
                    left: that.$page.offset().left + 5,
                    fontFamily: 'auto',
                    height: that.menuHeight,
                    zIndex: 1 // edge bug fix - element is disappears without z-index
                });
                animation.ul.left = that.contentOffset * -1;
            }
            that.$ul.parent().prepend(that.$selectedCat);
            that.$selectedCat.stop().animate(animation.openedCat, that.animation, function() {
                that.$selectedCat.css({
                    position: ''
                });
                addRemoveAnimationClass('remove', [$categoryPages, that.$selectedCat, that.$container, that.$page]);
                that.$tmpDiv.remove();
                that.$ul.css({
                    fontFamily: ''
                });
            });
            that.$ul.stop().animate(animation.ul, that.animation);
            that.isOpened = true;
        } else if (action == 'hide') {
            if (that.isRtl) {
                animation.ul.right = ($(window).width() - (that.$page.offset().left + that.$page.outerWidth())) + 5;
                animation.openedCat.right = that.contentOffset;
            } else {
                animation.ul.left = that.$page.offset().left + 5;
                animation.openedCat.left = that.contentOffset;
            }
            addRemoveAnimationClass('add', [$categoryPages]);
            that.$selectedCat.css({
                position: 'absolute'
            });
            that.$tmpDiv = $('<div style="height:' + that.$selectedCat.height() + 'px; margin-bottom:10px;"></div>');
            that.$ul.parent().prepend(that.$tmpDiv);
            that.$selectedCat.stop().animate(animation.openedCat, that.animation, function() {
                $categoryPages.removeClass();
                $categoryPages.addClass('site-dropdown-menu');
                $categoryPages.appendTo(that.$categoryPagesParent);
                that.$selectedCat.remove();
            });
            that.$ul.stop().animate(animation.ul, that.animation, function() {
                that.$ul.css({
                    position: '',
                    height: that.menuHeight
                });
                if (callBack) callBack.call(this);
                addRemoveAnimationClass('remove', [that.$container, that.$page, that.$ul]);
            });
            that.$ul.children('.selected-category').removeClass('selected-category');
            that.isOpened = false;
        }
    }

    function openCategory() {
        var $category = that.$selectedCat.find('.active-cat');
        var $subCat = that.$selectedCat.find('.site-dropdown-menu');
        that.ulPrevState = that.$ul.scrollTop();
        $category.closest('li').addClass('active').addClass('open');
        resetBackButtonEvent($category);
        $category.closest('li').siblings().hide();
    }

    function resetBackButtonEvent($category) {
        that.$selectedCat.find('.active-cat').on('click.mobile_categories_back', function(event) {
            event.preventDefault();
            animate('hide', function() {
                hideCategory($category);
            });
        });
    }

    function hideCategory($category) {
        $category.parent('.dropdown-submenu').removeClass('active').removeClass('open');
        that.$selectedCat.find('.active-cat').off('click.mobile_categories_back');
        $category.parent().siblings().show();
        that.$tmpDiv.remove();
        that.$ul.scrollTop(that.ulPrevState);
    }

    function generateHTML() {
        if (IsIE11()) {
            that.$source.find('.dropdown-submenu a > span:not(.txt-container)').removeClass('fa-caret-down')
                .addClass('fa-caret-' + (that.isRtl ? 'left' : 'right'));
        } else {
            that.$source.find('.dropdown-submenu a > i.s123-icon-converter').replaceWith(S123.s123IconToSvg.getHtml('caret-' + (that.isRtl ? 'left' : 'right'), '', ''));
        }
        var html = '<ul class="navPagesPopup fancy-scrollbar">' + that.$source.html() + '</ul>';
        html += '<div class="navPagesPopupActionButtons">';
        html += '<div class="navPagesPopupActionButtons_part1">';
        if ($('#websiteHeaderSettings').data('arranged-icons') === true) {
            $('#mainNavMobile .navActions li').each(function() {
                var $this = $(this);
                if ($this.hasClass('header-address-wrapper')) {
                    html += $('.header-address-wrapper').clone().html();
                }
                if ($this.hasClass('header-social-wrapper') && $('.header-social-wrapper.hidden').length == 0) {
                    html += $('.header-social-wrapper').clone().html();
                }
                if ($this.hasClass('header-search-wrapper')) {
                    html += $('.header-search-wrapper').clone().html();
                }
                if ($this.hasClass('header-email-wrapper')) {
                    html += $('#mainNavMobile .header-email-wrapper').clone().html();
                }
                if ($this.hasClass('header-phone-wrapper')) {
                    html += $('#mainNavMobile .header-phone-wrapper').clone().html();
                }
                if ($this.hasClass('header-client-zone-wrapper')) {
                    if ($('.header-client-zone-wrapper a')) {
                        html += $('.header-client-zone-wrapper').clone().html();
                    }
                }
                if ($this.hasClass('header-cart-wrapper') && $this.hasClass('show-static')) {
                    if ($this.data('has-online-store') && $this.data('has-online-store') === true) {
                        html += $('#mainNavMobile .header-cart-wrapper').clone().html();
                    }
                }
                if ($this.hasClass('header-wish-list')) {
                    html += $('#mainNavMobile .header-wish-list').clone().html();
                }
            });
            if ($('.website-languages-menu a').length > 0) {
                html += $('.website-languages-menu').clone().html();
            }
            if ($('.header-m-c-wrapper').length > 0) {
                html += MultiCurrencies.getMobileIconHtml();
            }
        } else {
            if ($('.header-address-wrapper').length > 0) {
                html += $('.header-address-wrapper').clone().html();
            }
            if ($('.header-social-wrapper').length > 0 && $('.header-social-wrapper.hidden').length == 0) {
                html += $('.header-social-wrapper').clone().html();
            }
            if ($('.header-search-wrapper').length > 0) {
                html += $('.header-search-wrapper').clone().html();
            }
            if ($('.website-languages-menu a').length > 0) {
                html += $('.website-languages-menu').clone().html();
            }
            if ($('.header-m-c-wrapper').length > 0) {
                html += MultiCurrencies.getMobileIconHtml();
            }
            if ($('#mainNavMobile .header-email-wrapper').length > 0) {
                html += $('#mainNavMobile .header-email-wrapper').clone().html();
            }
            if ($('#mainNavMobile .header-phone-wrapper').length > 0) {
                html += $('#mainNavMobile .header-phone-wrapper').clone().html();
            }
            if ($('.header-client-zone-wrapper a').length > 0) {
                html += $('.header-client-zone-wrapper').clone().html();
            }
        }
        html += '</div>';
        if ($('.action-button-wrapper').length > 0) {
            html += '<div class="navPagesPopupActionButtons_part2">';
            $('.action-button-wrapper').each(function() {
                var $this = $(this);
                html += $this.clone().html();
            });
            html += '</div>';
        }
        html += '</div>';
        return html;
    }

    function openMenu() {
        var customClass = '';
        var addCustomCover = false;
        switch (that.menuType) {
            case 0:
                customClass = '';
                break;
            case 1:
                customClass = 'side-menu';
                addCustomCover = true;
                break;
            case 2:
                customClass = 'side-menu half-width';
                addCustomCover = true;
                break;
        }
        if (that.isMobile) {
            customClass += ' is-mobile';
        }
        buildPopup(that.poupID, '', generateHTML(), '', true, true, true, that.closeLocation, customClass);
        if (addCustomCover) {
            var $customCover = $('#' + that.poupID).find('.cover').clone(true, false);
            $customCover.removeClass('cover');
            $customCover.addClass('custom-menu-cover');
            $('#' + that.poupID).append($customCover);
        }
    }

    function screenResizeHandler() {
        $(window).off('resize.mobile_menu').on('resize.mobile_menu', function() {
            that.contentOffset = $(window).width();
            that.menuHeight = that.$page.height() - that.$navPagesPopupActionButtons.outerHeight() - 10;
            that.menuTop = that.$ul.offset().top - $(window).scrollTop();
            that.$ul.css({
                height: that.menuHeight
            });
            if (that.isOpened) {
                that.menuTop = that.$selectedCat.offset().top - $(window).scrollTop();
                that.$ul.css({
                    top: that.menuTop,
                    height: that.menuHeight
                });
                that.$selectedCat.css({
                    top: that.menuTop,
                    height: that.menuHeight
                });
                that.$selectedCat.find('.active-cat-content').css({
                    maxHeight: that.menuHeight
                });
                if (that.isRtl) {
                    that.$ul.css({
                        right: that.contentOffset * -1
                    });
                } else {
                    that.$ul.css({
                        left: that.contentOffset * -1
                    });
                }
            }
        });
    }

    function addRemoveAnimationClass(action, elements) {
        switch (action) {
            case 'add':
                for (var i = 0; i < elements.length; i++) {
                    elements[i].addClass('m-m-progress');
                }
                break;
            case 'remove':
                for (var i = 0; i < elements.length; i++) {
                    elements[i].removeClass('m-m-progress');
                }
                break;
        }
    }
    return that;
}();

function moduleLayoutCategories_shadow() {
    $(document).on('s123.page.ready', function(event) {
        $.each($('.s123-module .s123-categories'), function() {
            var $this = $(this);
            var $categoriesContainer = $this.find('ul');
            var $mrsFirst = $('<div class="m-r-s"></div>');
            var $mrsLast = $('<div class="m-r-s"></div>');
            $this.prepend($mrsFirst);
            $this.append($mrsLast);
            if ($this.closest('.s123-module-gallery').length > 0 && !$this.hasClass('col-xs-12')) {
                $mrsFirst.css({
                    left: 0
                });
                $mrsLast.css({
                    right: 0
                });
            }
        });
    });
}
var ProgressveWebApp = new function() {
    var that = this;
    that.init = function() {
        $(document).on('s123.page.load.progressve_web_app', function(event) {
            if (typeof pwaSettings === 'undefined') return;
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js');
            }
            if (!pwaSettings.enableMessage) {
                window.addEventListener('beforeinstallprompt', function(e) {
                    e.preventDefault();
                });
            }
        });
    };
    return that;
}();

function s123InfiniteScroll(settings) {
    var that = {};
    that.init = function() {
        that.$container = settings.$container;
        that.ajax = settings.ajax;
        that.inProgress = false;
        that.pageNum = 2;
        that.initilized = false;
        that.disabled = false;
        that.id = settings.id;
        that.offset = settings.offset;
        that.loader = settings.loader;
        that.$loading = $(generateHtml());
        that.$container.parent().append(that.$loading);
        that.addLoadNextPageAbility();
        that.initilized = true;
        that.$container.data('s123InfiniteScroll', that);
    };
    that.addLoadNextPageAbility = function() {
        $(window).off('scroll.s123InfiniteScroll' + that.id).on('scroll.s123InfiniteScroll' + that.id, function() {
            if (that.disabled) return;
            if ($(window).scrollTop() + $(window).height() >= that.$container.height() - that.offset) {
                that.getPage();
                that.inProgress = true;
            }
        });
    };
    that.destroy = function() {
        $(window).off('scroll.s123InfiniteScroll' + that.id);
        that.$loading.remove();
        if (that.request) that.request.abort();
    };
    that.getPage = function() {
        if (that.inProgress) return;
        showLoadingAnimation();
        that.ajax.data.pageNumber = that.pageNum;
        that.request = $.ajax({
            type: that.ajax.type,
            url: that.ajax.url,
            data: that.ajax.data,
            success: function(data) {
                data = tryParseJSON(data);
                that.pageNum++;
                that.inProgress = false;
                hideLoadingAnimation();
                if (!data.hasNextPage) {
                    that.destroy();
                }
                if (that.ajax.success) that.ajax.success.call(this, data);
                that.request = null;
            }
        });
    };
    that.disable = function() {
        that.disabled = true;
    };
    that.enable = function() {
        that.disabled = false;
    };

    function generateHtml() {
        var html = '';
        html += '<div class="wizard-pagination text-center" style="display:none; width: 100%; padding: 10px;">';
        html += '<div class="loading-icon" style="width:100%;">';
        html += '<div class="s123-loader-ellips infinite-scroll-request">';
        html += '<span class="s123-loader-ellips__dot"></span>';
        html += '<span class="s123-loader-ellips__dot"></span>';
        html += '<span class="s123-loader-ellips__dot"></span>';
        html += '<span class="s123-loader-ellips__dot"></span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        return html;
    }

    function showLoadingAnimation() {
        if (that.loader) {
            for (var i = 0; i < that.ajax.data.limit; i++) {
                var $template = $(that.loader.template);
                $template.addClass('w-i-s-fake');
                that.loader.$container.append($template);
            }
        } else {
            that.$loading.show();
        }
    }

    function hideLoadingAnimation() {
        if (that.loader) {
            that.loader.$container.find('.w-i-s-fake').remove();
        } else {
            that.$loading.hide();
        }
    }
    that.init();
    return that;
}

function IsIE11() {
    return !!window.MSInputMethodContext && !!document.documentMode;
}
S123.popOver = function() {
    var that = {};
    that.init = function(settings) {
        if (!settings) return;
        if (settings.$el.length === 0) return;
        that.$el = settings.$el;
        that.elSelector = settings.elSelector;
        that.namespace = settings.namespace;
        that.oneTimeUsage = settings.oneTimeUsage;
        that.popOverSettings = settings.popOverSettings;
        that.$el.popover({
            selector: that.popOverSettings.selector,
            content: that.popOverSettings.content,
            html: that.popOverSettings.html,
            trigger: that.popOverSettings.trigger,
            template: that.popOverSettings.template,
            placement: function(popover, input) {
                if (that.popOverSettings.placementCallBack) {
                    return that.popOverSettings.placementCallBack.call(this);
                } else {
                    return 'auto';
                }
            }
        });
        that.$el.on('shown.bs.popover', function(event) {
                that.popOverSettings.content.find('[data-menu-dismiss="popover"]').click(function(event) {
                    if (that.oneTimeUsage) {
                        destroy();
                    } else {
                        hide();
                    }
                });
                $(window).on('mousedown.destroyPopover' + '.' + that.namespace, function(event) {
                    if (that.popOverSettings.trigger === 'manual' && $(event.target).closest(that.elSelector).length > 0) return;
                    if ($(event.target).closest('.' + that.selector).length === 0) {
                        if (that.oneTimeUsage) {
                            destroy();
                        } else {
                            hide();
                        }
                    }
                });
                $(window).one('blur.destroyPopover' + '.' + that.namespace, function(event) {
                    if (that.popOverSettings.trigger === 'manual' && $(event.target).closest(that.elSelector).length > 0) return;
                    if (that.oneTimeUsage) {
                        destroy();
                    } else {
                        hide();
                    }
                });
                $(document).trigger('s123_pop_over_wrapper.shown' + '.' + that.namespace);
            })
            .on('show.bs.popover', function(event) {
                $(document).trigger('s123_pop_over_wrapper.show' + '.' + that.namespace);
            })
            .on('hide.bs.popover' + '.' + that.namespace, function(event) {
                $(document).trigger('s123_pop_over_wrapper.hide' + '.' + that.namespace);
            });
    };

    function hide() {
        that.$el.popover('hide');
        $(window).off('mousedown.destroyPopover' + '.' + that.namespace);
        $(window).off('blur.destroyPopover' + '.' + that.namespace);
        $(window).off('scroll.destroyPopover' + '.' + that.namespace);
    }

    function destroy() {
        that.$el.popover('destroy');
        $(window).off('mousedown.destroyPopover' + '.' + that.namespace);
        $(window).off('blur.destroyPopover' + '.' + that.namespace);
        $(window).off('scroll.destroyPopover' + '.' + that.namespace);
    }
    return that;
}();
S123.globalContactEmail = function() {
    var that = {};
    that.init = function() {
        that.emailBtns = $('[data-toggle="email_menuCallActionIcons"]');
        that.settings = tryParseJSON($('#globalContactEmailSettings').val());
        that.custom_form_html = that.settings.custom_form_html ? that.settings.custom_form_html : '';
        that.emailBtns.off('click').click(function() {
            var $this = $(this);
            var $header_email_content = $('#header-email-content').clone();
            if (IsWizard() && $this.closest('.s123-module-contact').length !== 0) return;
            if ($header_email_content.find('a').text().length > 20) {
                $header_email_content.find('.global-contact-details-container').addClass('g-c-d-long-text-handler');
            }
            buildPopup('popupFloatDivSearch', '', that.buildEmailToolForm(), '', true, true, true, $this.data('closeLocation'), '');
            S123.globalContactEmail.submitHandler();
            $(document).trigger('s123.page.ready.wizard_preview_manage_helpers');
        });
    };
    that.buildEmailToolForm = function() {
        var html = '';
        html += '<div class="global-contact-email-container">';
        html += '<div class="g-c-email-info-box">';
        html += '<h3>' + translations.globalContactEmail.contactUs + '</h3>';
        html += '<p>' + translations.globalContactEmail.infoBox.replace('{{email_address}}', '<a href="mailto:' + that.settings.contact_email + '">' + that.settings.contact_email + '</a>') + '</p>';
        html += '</div>';
        if (that.settings.useCustomForm == 'on' && that.custom_form_html.length !== 0) {
            html += '<form class="g-c-email-form s123-custom-form-multi-steps custom-form">';
            html += that.custom_form_html;
            html += '<input type="hidden" name="websiteID" value="' + $('#websiteID').val() + '">';
            html += '<input type="hidden" name="w" value="' + $('#w').val() + '">';
            html += '<input type="hidden" name="recaptchaToken" value="">';
            html += '<input type="hidden" name="useCustomForm" value="1">';
            html += '<div class="conv-code-container"></div>';
            html += '</form>';
        } else {
            html += '<form class="g-c-email-form">';
            html += '<div class="row">';
            html += '<div class="col-sm-6 col-xs-12">';
            html += '<div class="form-group">';
            html += '<label for="emailForm_fullName" class="white">' + translations.globalContactEmail.fullName + '</label>';
            html += '<input type="text" name="emailForm_fullName" placeholder="' + translations.globalContactEmail.fullName + '" class="form-control" required data-msg-required="' + translations.jqueryValidMsgRequire + '">';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-sm-6 col-xs-12">';
            html += '<div class="form-group">';
            html += '<label for="emailForm_email" class="white">' + translations.emailAddress + '</label>';
            html += '<input type="text" name="emailForm_email" placeholder="' + translations.emailAddress + '" class="form-control" required data-msg-required="' + translations.jqueryValidMsgRequire + '" data-rule-email="true" data-msg-email="' + translations.jqueryValidMsgEmail + '">';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="row">';
            html += '<div class="col-xs-12">';
            html += '<div class="form-group">';
            html += '<label for="emailForm_description" class="white">' + translations.globalContactEmail.description + '</label>';
            html += '<textarea class="form-control" name="emailForm_description" rows="4" placeholder="' + translations.globalContactEmail.description + '"></textarea>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="row">';
            html += '<div class="col-xs-12">';
            html += '<button type="submit" class="btn btn-primary btn-block">' + translations.send + '</button>';
            html += '</div>';
            html += '</div>';
            html += '<input type="hidden" name="websiteID" value="' + $('#websiteID').val() + '">';
            html += '<input type="hidden" name="w" value="' + $('#w').val() + '">';
            html += '<input type="hidden" name="recaptchaToken" value="">';
            html += '<div class="conv-code-container"></div>';
            html += '</form>';
        }
        html += '<div class="g-c-email-message-sent-box">';
        html += '<div class="row">';
        html += '<div class="col-sm-6 col-xs-12 col-md-offset-3">';
        html += '<h3 class="g-c-email-message-content">' + translations.globalContactEmail.thankYouMessage + '</h3>';
        html += '</div>';
        html += '</div>';
        html += '<div class="row">';
        html += '<div class="col-sm-6 col-xs-12 col-md-offset-3">';
        html += '<button type="button" class="btn btn-primary close-order-thank-you">' + translations.globalContactEmail.thankYouCloseBtn + '</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        return html;
    };
    that.submitHandler = function() {
        var $form = $('.g-c-email-form');
        var customFormMultiSteps = new CustomFormMultiSteps();
        customFormMultiSteps.init({
            $form: $form,
            $nextButton: $form.find('.next-form-btn'),
            $submitButton: $form.find('.submit-form-btn'),
            $previousButton: $form.find('.previous-form-btn'),
            totalSteps: $form.find('.custom-form-steps').data('total-steps')
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
            submitHandler: function(form) {
                var $form = $(form);
                $form.find('button:submit').prop('disabled', true);
                if (forms_GoogleRecaptcha.isActive && !forms_GoogleRecaptcha.isGotToken) {
                    forms_GoogleRecaptcha.getToken();
                    return false;
                }
                $.ajax({
                    type: "POST",
                    url: "/versions/" + $('#versionNUM').val() + "/include/contactEmailO.php",
                    data: $form.serialize(),
                    success: function(data) {
                        data = tryParseJSON(data);
                        $form.trigger("reset");
                        if (data.conv_code && data.conv_code.length > 0) {
                            var $convCode = $('<div>' + data.conv_code + '</div>');
                            $form.find('.conv-code-container').html($convCode.text());
                        }
                        if (data.buttonClickAction && data.buttonClickAction == 'redirect') {
                            if (data.buttonLink_afterSubmit.length > 0) {
                                if (IsWizard()) {
                                    buildPopup_CloseAction('popupFloatDivSearch');
                                    bootbox.alert({
                                        title: translations.previewExternalLinkTitle,
                                        message: translations.previewExternalLinkMsg.replace('{{externalLink}}', '<b>' + data.buttonLink_afterSubmit + '</b>'),
                                        className: 'externalAlert'
                                    });
                                } else {
                                    buildPopup_CloseAction('popupFloatDivSearch');
                                    window.open(data.buttonLink_afterSubmit, '_self');
                                }
                            }
                        } else {
                            $form.addClass("hidden");
                            $(".g-c-email-message-sent-box").show();
                            $(".g-c-email-info-box").hide();
                            $form.next().find(".close-order-thank-you").on("click", function() {
                                buildPopup_CloseAction('popupFloatDivSearch');
                            });
                        }
                        forms_GoogleRecaptcha.reset();
                        $form.find('button:submit').prop('disabled', false);
                        WizardNotificationUpdate();
                    }
                });
                return false;
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
        });
    };
    return that;
}();

function previewScaleDeviceTypeChange(deviceType) {
    $(document).trigger('previewScale.deviceTypeChange', [deviceType]);
    $(document).trigger('S123PopOver.reposition');
}

function previewReloadPreviewCSSReloaded() {
    $(document).trigger('reloadPreviewCSS.reloaded');
}

function CustomFormMultiSteps() {
    var that = this;
    that.init = function(settings) {
        that.totalSteps = settings.totalSteps;
        that.$form = settings.$form;
        that.$nextButton = settings.$nextButton;
        that.$submitButton = settings.$submitButton;
        that.$previousButton = settings.$previousButton;
        that.initMultiStepsButtons();
    };
    that.initMultiStepsButtons = function() {
        that.$previousButton.off('click').on('click', function() {
            var $step = that.$form.find('.custom-form-step:visible');
            var step = $step.data('step');
            var previousStep = step - 1;
            $step.hide();
            that.$form.find('.custom-form-step.step-' + previousStep).fadeIn(350);
            that.$submitButton.hide();
            that.$nextButton.fadeIn(350);
            if (previousStep < 2) {
                that.$previousButton.hide();
            } else {
                that.$previousButton.fadeIn(350);
            }
        });
        that.$nextButton.off('click').on('click', function() {
            var $step = that.$form.find('.custom-form-step:visible');
            var step = $step.data('step');
            var nextStep = step + 1;
            if (!that.$form.valid()) return;
            var offset = findBootstrapEnvironment() != 'xs' ? menuScrollOffset : menuScrollOffset_mobile;
            var isScrollTopForm = that.$form.offset().top - offset < $(window).scrollTop();
            $step.hide();
            that.$form.find('.custom-form-step.step-' + nextStep).fadeIn(350);
            that.$previousButton.css('display', 'block');
            if (nextStep >= that.totalSteps) {
                that.$nextButton.hide();
                that.$submitButton.fadeIn(350);
            }
            if (that.$form.offset().top - offset < $(window).scrollTop()) {
                $('html, body').stop().animate({
                    scrollTop: (that.$form.offset().top - offset)
                }, 1250, 'easeInOutExpo');
            }
        });
    }
    that.reset = function() {
        that.$form.find('.custom-form-step').hide();
        that.$previousButton.hide();
        that.$submitButton.hide();
        that.$form.find('.step-1').fadeIn(350);
        that.$nextButton.fadeIn(350);
    };
}
S123.ButtonLoading = function() {
    var that = {};
    that.start = function($button) {
        if ($button.find('.s123-btn-loading').length > 0) return;
        var html = $button.html();
        $button.html('<div class="s123-btn-loading"><span class="s123-btn-loading-text">' + html + '</span>' + S123.s123IconToSvg.getHtml('spinner', 'fa-spin white', '') + '</div>');
    }
    that.stop = function($button) {
        if ($button.find('.s123-btn-loading').length == 0) return;
        $button.html($button.find('.s123-btn-loading-text').html());
    }
    return that;
}();

function HomepageCountdown() {
    $(document).on('s123.page.ready', function(event) {
        var $section = $('#top-section');
        var $countdown = $section.find('#homepageCountdown');
        var $container = $section.find('.homepage-countdown-container');
        if ($countdown.length == 0) return;
        var countdownWidget = new CountdownWidget();
        countdownWidget.init({
            $countdown: $countdown,
            dateInfo: $countdown.data('date-info'),
            type: $countdown.data('type'),
            translate: {
                days: $countdown.data('days'),
                hours: $countdown.data('hours'),
                minutes: $countdown.data('minutes'),
                seconds: $countdown.data('seconds')
            },
            onStop: function() {
                $container.find('.message').fadeIn(350);
            }
        });
    });
}
S123.CrossOriginHandler = function() {
    var _ = {};
    _.init = function() {
        if ($('[data-rel="crossOriginHandler"]').length == 0) return;
        $(window).on('message.crossOriginHandler', function(event) {
            var data = event.originalEvent.data;
            switch (data.eventType) {
                case 'resize':
                    $('#' + data.id).css({
                        height: data.height
                    });
                    break;
            }
        });
    };
    return _;
}();
$.fn.popover.Constructor.prototype.reposition = function() {
    var $tip = this.tip();
    var autoPlace = true;
    var placement = typeof this.options.placement === 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
    var pos = this.getPosition();
    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;
    if (autoPlace) {
        var orgPlacement = placement;
        var viewportDim = this.getPosition(this.$viewport);
        placement = placement === 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement === 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement === 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement === 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement
        $tip.removeClass(orgPlacement).addClass(placement);
    }
    var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
    this.applyPlacement(calculatedOffset, placement);
}

function IsEcommerceHighlight(moduleTypeNUM) {
    return [157, 158].indexOf(parseInt(moduleTypeNUM)) != -1;
}
S123.scrollToHandler = function() {
    var _ = {};
    _.init = function() {
        $(document).one('s123.page.load.scrollTo', function(event) {
            _.scroll();
        });
        $(document).on('s123.pjax.complete', function(event) {
            initS123QueryString();
            _.scroll();
        });
    };
    _.scroll = function() {
        if (!S123.QueryString.scrollTo) return;
        if (S123.QueryString.scrollTo.indexOf('section') != -1) {
            ScrollToModule('', S123.QueryString.scrollTo.replace('section-', ''));
        }
    };
    return _;
}();

function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}
$.fn.s123ScrollParent = function(includeHidden) {
    var position = this.css("position"),
        excludeStaticParent = position === "absolute",
        overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        scrollParent = this.parents().filter(function() {
            var parent = $(this);
            if (excludeStaticParent && parent.css("position") === "static") {
                return false;
            }
            return overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
        }).eq(0);
    return position === "fixed" || !scrollParent.length ? $(this[0].ownerDocument || document) : scrollParent;
};

function S123Header_InitializeActionButtons(isTriggerPageReady = true) {
    var $websiteHeaderSettings = $('#websiteHeaderSettings');
    if ($websiteHeaderSettings.length == 0) return;
    var settings = tryParseJSON($websiteHeaderSettings.val());
    var btns = {
        mobile: {
            $el: $('#mainNavMobile .navActions'),
            list: ['phone', 'email', 'address', 'social', 'search', 'cart', 'wishList', 'clientZone'],
        },
        desktop: {
            $el: settings.headerLayout == '3' ? $('#websiteHeader #mainNav .navActions.pull-right') : $('#websiteHeader #mainNav .navActions'),
            list: ['address', 'social', 'search', 'cart', 'wishList', 'email', 'phone', 'clientZone', 'actionsButtons'],
        }
    };
    if (settings.onepage == '2') {
        btns.mobile.list = btns.desktop.list;
    }
    settings.isSideMenu = false;
    if (settings.headerLayout == '5' || settings.headerLayout == '6') {
        settings.isSideMenu = true;
        delete btns.desktop;
        generateButtonsForSideMenu(settings);
    }
    $.each(btns, function(type, data) {
        var html = '';
        if (type == 'desktop' || settings.onepage == '2') {
            html += settings.languges;
            html += settings.multiCurrency;
        }
        var btnsList = arrangeButtonsList(data.list, settings);
        $.each(btnsList, function(index, btn) {
            html += getButtonHTML(btn, type, settings);
        });
        var $html = $(html);
        if (type == 'mobile') {
            var $btns = $('<div></div>').append($html);
            var icons = $btns.find('.header-icon-wrapper').length;
            var btns = $btns.find('.header-btn-wrapper').length;
            icons = icons + $btns.find('.header-cart-wrapper').length;
            if (settings.onepage == '2' && (btns > 1 || icons > 3 || (btns + icons) > 3)) {
                var $landingPageBars = $('<li class="header-menu-wrapper landingPageBars dropdown-submenu"><a data-close-location="left" class="btn l-pagebars-btn" data-is-mobile="true" role="button" data-container="body" data-toggle="menuCallActionIcons">' + S123.s123IconToSvg.getHtml('bars', '', '') + '</a><ul class="site-dropdown-menu navActions-dropdown" data-rel="navActions" style="opacity: 1;"></ul></li>');
                var $btns = $('<div></div>').append($html);
                var icons = $btns.find('.header-icon-wrapper').length;
                var btns = $btns.find('.header-btn-wrapper').length;
                var html = '';
                var actionBtnsHtml = '';
                html += '<div class="header-icons-container">';
                html += settings.languges;
                html += settings.multiCurrency;
                $.each(btnsList, function(index, btn) {
                    if (btn != 'actionsButtons') {
                        html += getButtonHTML(btn, type, settings);
                    } else {
                        actionBtnsHtml += getButtonHTML(btn, type, settings);
                    }
                });
                html += '</div>';
                html += '<div class="header-action-btns-container">' + actionBtnsHtml + '</div>';
                var $html = $(html);
                $landingPageBars.find('.site-dropdown-menu').append($html);
                $html = $landingPageBars;
                $html.find('a.l-pagebars-btn').off('click').on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $this = $(this);
                    var $multiCurrencyBtn = $this.closest('.landingPageBars').find('a.multi-currencies-controller');
                    $multiCurrencyBtn.find('span.m-c-symbol').remove();
                    $multiCurrencyBtn.find('i').remove();
                    $multiCurrencyBtn.on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    $this.closest('.landingPageBars').toggleClass('open');
                });
            } else {
                $html.each(function(index, li) {
                    if (index < 2) return;
                    $(li).hide();
                });
            }
        }
        data.$el.html('').append($html);
    });
    ActivePopupActionButtonsInPage();
    if (isTriggerPageReady) TriggerS123PageReady();

    function generateButtonsForSideMenu(settings) {
        var type = 'desktop';
        var html = '';
        var isFitMultiCurrencyBtn = false;
        html += '<ul class="navActions nav">';
        if (settings.layoutID == '3' || settings.layoutID == '4' || settings.layoutID == '6') {
            html += settings.languges;
            html += settings.multiCurrency;
            isFitMultiCurrencyBtn = true;
        }
        $.each(['cart', 'wishList', 'clientZone', 'actionsButtons'], function(index, btn) {
            if (settings.btns[btn].isActive || btn == 'cart') {
                html += getButtonHTML(btn, type, settings);
            }
        });
        html += '</ul>';
        html += '<ul class="headerSocial_2">';
        if (settings.btns['email'].isActive) {
            if (settings.btns['email'].headerEmail_style == '2' || settings.btns['email'].headerEmail_style == '3') {
                html += getButtonHTML('email', type, settings);
            }
        }
        if (settings.btns['phone'].isActive) {
            if (settings.btns['phone'].headerPhoneNumber_style == '2' || settings.btns['phone'].headerPhoneNumber_style == '3' || settings.btns['phone'].headerPhoneNumber_style == '4') {
                html += getButtonHTML('phone', type, settings);
            }
        }
        html += '</ul>';
        html += '<ul class="headerSocial">';
        $.each(['email', 'phone', 'address', 'social', 'search'], function(index, btn) {
            if (btn == 'email' && settings.btns['email'].headerEmail_style != '1') return;
            if (btn == 'phone' && settings.btns['phone'].headerPhoneNumber_style != '1') return;
            var buttonHTML = '';
            if (settings.btns[btn].isActive) {
                buttonHTML += getButtonHTML(btn, type, settings);
                html += buttonHTML.replaceAll('data-close-location="right"', 'data-close-location="left"');
            }
        });
        html += '</ul>';
        var $html = $(html);
        if (isFitMultiCurrencyBtn) {
            $html.find('.header-m-c-wrapper').addClass('m-c-width-auto');
        }
        $('#header .header-column-menu-actions .header-nav').html('').append($html);
    }

    function arrangeButtonsList(list, settings) {
        var newBtnList = [];
        $websiteHeaderSettings.data('arranged-icons', !$.isEmptyObject(settings.headerCallToActionsButtons));
        $.each(settings.headerCallToActionsButtons, function(btn) {
            if (list.includes(btn) && (settings.btns[btn].isActive || btn == 'cart')) {
                newBtnList.push(btn);
            }
        });
        $.each(list, function(index, btn) {
            if (!newBtnList.includes(btn) && (settings.btns[btn].isActive || btn == 'cart')) {
                newBtnList.push(btn);
            }
        });
        return newBtnList;
    }

    function getButtonHTML(btn, type, settings) {
        var html = '';
        switch (btn) {
            case 'email':
                html += '<li class="header-email-wrapper header-icon-wrapper"' + (type == 'desktop' ? ' data-style="' + settings.btns[btn].headerEmail_style + '"' : '') + '>';
                html += '<a data-close-location="right" class="actionButton" role="button" data-container="body" data-toggle="email_menuCallActionIcons">';
                if (type == 'desktop' && settings.btns[btn].headerEmail_style == '3') {
                    html += S123.s123IconToSvg.getHtml('envelope', '', '') + '&nbsp;' + settings.btns[btn].headerEmail;
                } else if (type == 'desktop' && settings.btns[btn].headerEmail_style == '2') {
                    html += settings.btns[btn].headerEmail;
                } else if (type == 'mobile' || (type == 'desktop' && settings.btns[btn].headerEmail_style == '1')) {
                    html += S123.s123IconToSvg.getHtml('envelope', '', '');
                }
                html += '</a>';
                html += '</li>';
                break;
            case 'address':
                html += '<li class="header-address-wrapper header-icon-wrapper">';
                html += '<a data-close-location="right" class="actionButton" role="button" data-container="body" data-toggle="address_menuCallActionIcons">' + S123.s123IconToSvg.getHtml('location-arrow', '', '') + '</a>';
                html += '</li>';
                break;
            case 'social':
                html += '<li class="header-social-wrapper header-icon-wrapper' + (settings.btns[btn].isEmpty ? ' hidden' : '') + '">';
                html += '<a data-close-location="right" class="actionButton" role="button" data-container="body" data-toggle="social_menuCallActionIcons">' + S123.s123IconToSvg.getHtml('share-alt', '', '') + '</a>';
                html += '</li>';
                break;
            case 'search':
                html += '<li class="header-search-wrapper header-icon-wrapper">';
                html += '<a data-close-location="right" class="actionButton" role="button" data-container="body" data-toggle="search_menuCallActionIcons">' + S123.s123IconToSvg.getHtml('search', '', '') + '</a>';
                html += '</li>';
                break;
            case 'wishList':
                html += '<li class="header-wish-list header-icon-wrapper ' + (settings.isMenuMainColor ? 'parent-main-color-handler' : '') + '">';
                html += '<a class="wishListActionButton actionButton" role="button">' + S123.s123IconToSvg.getHtml('heart', '', '') + '<span class="count"></span></a>';
                html += '</li>';
                break;
            case 'clientZone':
                html += '<li class="header-client-zone-wrapper header-icon-wrapper ' + (settings.isMenuMainColor ? 'parent-main-color-handler' : '') + '">';
                html += '<a class="client-zone-link" data-close-location="right" href="' + globalLanguageChildLan + '/' + '?clientZone=1' + settings.btns[btn].isManageURL + '">' + S123.s123IconToSvg.getHtml('user', '', '') + '</a>';
                html += '</li>';
                break;
            case 'cart':
                if (settings.isSideMenu) {
                    html += '<li class="header-cart-wrapper orderOpenCart header-icon-wrapper' + (settings.btns[btn].isActive ? ' show-static' : '') + ($('#websiteHeaderSettings').data('arranged-icons') === true ? ' arranged-icons' : '') + ' ' + (settings.isMenuMainColor ? 'parent-main-color-handler' : '') + '" data-has-online-store="' + settings.btns[btn].hasOnlineStore + '"><div class="s-c-w">' + settings.btns[btn].showMenuActionButtons + '</div></li>';
                } else {
                    html += '<li class="header-cart-wrapper orderOpenCart' + (settings.btns[btn].isActive ? ' show-static' : '') + ($('#websiteHeaderSettings').data('arranged-icons') === true ? ' arranged-icons' : '') + ' ' + (settings.isMenuMainColor ? 'parent-main-color-handler' : '') + '" data-has-online-store="' + settings.btns[btn].hasOnlineStore + '">' + settings.btns[btn].showMenuActionButtons + '</li>';
                }
                break;
            case 'phone':
                if (type == 'mobile') {
                    html += '<li class="header-phone-wrapper header-icon-wrapper">';
                    if (settings.btns[btn].phoneLinkIcon.icon.indexOf('.png') === -1) {
                        html += '<a data-close-location="right" class="actionButton" role="button" data-container="body" data-toggle="phone_menuCallActionIcons">' + S123.s123IconToSvg.getHtml(settings.btns[btn].phoneLinkIcon.icon, settings.btns[btn].phoneLinkIcon.icon, '') + '</a>';
                    } else {
                        html += '<a data-close-location="right" class="actionButton" role="button" data-container="body" data-toggle="phone_menuCallActionIcons" data-icon-type="socialImage"><img src="' + $GLOBALS["cdn-system-files"] + '/files/icons/socialNetworksBrands/' + settings.btns[btn].phoneLinkIcon.icon + '?v=' + $GLOBALS['v-cache'] + '" alt="' + settings.btns[btn].phoneLinkIcon.alt + '"></a>';
                    }
                    html += '</li>';
                } else {
                    html += '<li class="header-phone-wrapper" data-style="' + settings.btns[btn].headerPhoneNumber_style + '">';
                    if (settings.btns[btn].headerPhoneNumber_style == '1') {
                        if (settings.btns[btn].phoneLinkIcon.icon.indexOf('.png') === -1) {
                            html += '<a data-close-location="right" class="actionButton" role="button" data-container="body" data-toggle="phone_menuCallActionIcons">';
                            html += S123.s123IconToSvg.getHtml(settings.btns[btn].phoneLinkIcon.icon, settings.btns[btn].phoneLinkIcon.icon, '');
                            html += '</a>';
                        } else {
                            html += '<a data-close-location="right" class="actionButton" role="button" data-container="body" data-toggle="phone_menuCallActionIcons" data-social-icon="' + settings.btns[btn].phoneLinkIcon.icon.replace('.png', '') + '">';
                            html += '<img src="' + $GLOBALS["cdn-system-files"] + '/files/icons/socialNetworksBrands/' + settings.btns[btn].phoneLinkIcon.icon + '?v=' + $GLOBALS['v-cache'] + '" alt="' + settings.btns[btn].phoneLinkIcon.alt + '">';
                            html += '</a>';
                        }
                    } else if (settings.btns[btn].headerPhoneNumber_style == '2') {
                        html += '<a data-close-location="right" class="actionButton" role="button" data-container="body" data-toggle="phone_menuCallActionIcons">';
                        html += settings.btns[btn].addDailcCode;
                        html += '</a>';
                    } else if (settings.btns[btn].headerPhoneNumber_style == '3') {
                        html += '<a data-close-location="right" class="actionButton" role="button" data-container="body" data-toggle="phone_menuCallActionIcons">';
                        if (settings.btns[btn].phoneLinkIcon.icon.indexOf('.png') === -1) {
                            html += S123.s123IconToSvg.getHtml(settings.btns[btn].phoneLinkIcon.icon, settings.btns[btn].phoneLinkIcon.icon, '') + '&nbsp;';
                        } else {
                            html += '<img src="' + $GLOBALS["cdn-system-files"] + '/files/icons/socialNetworksBrands/' + settings.btns[btn].phoneLinkIcon.icon + '?v=' + $GLOBALS['v-cache'] + '" alt="' + settings.btns[btn].phoneLinkIcon.alt + '">&nbsp;';
                            html += settings.btns[btn].addDailcCode;
                        }
                        html += '</a>';
                    } else if (settings.btns[btn].headerPhoneNumber_style == '4') {
                        html += '<button type="button" class="btn btn-primary actionButton" data-toggle="phone_menuCallActionIcons">';
                        if (settings.btns[btn].phoneLinkIcon.icon.indexOf('.png') === -1) {
                            html += S123.s123IconToSvg.getHtml(settings.btns[btn].phoneLinkIcon.icon, settings.btns[btn].phoneLinkIcon.icon, '') + '&nbsp;';
                        } else {
                            html += '<img src="' + $GLOBALS["cdn-system-files"] + '/files/icons/socialNetworksBrands/' + settings.btns[btn].phoneLinkIcon.icon + '?v=' + $GLOBALS['v-cache'] + '" alt="' + settings.btns[btn].phoneLinkIcon.alt + '">&nbsp;';
                            html += settings.btns[btn].addDailcCode;
                        }
                        html += '</button>';
                    }
                    html += '</li>';
                }
                break;
            case 'actionsButtons':
                if (settings.btns[btn].button1.isActive) {
                    html += '<li class="action-button-wrapper header-btn-wrapper">' + settings.btns[btn].button1.showMenuActionButtons + '</li>';
                }
                if (settings.btns[btn].button2.isActive) {
                    html += '<li class="action-button-wrapper header-btn-wrapper">' + settings.btns[btn].button2.showMenuActionButtons + '</li>';
                }
                break;
        }
        return html;
    }
}
S123.ElementSizeChangeManager = function() {
    var _ = {
        observing: {}
    };
    _.escm_init = function() {
        _.SizeChangeManager = new ResizeObserver(function(entries) {
            for (let entry of entries) {
                const elSettings = getObservedSettings(entry.target.id);
                if (!elSettings) continue;
                if (!isObservedSizeChaged(elSettings, entry)) continue;
                elSettings.$el.trigger('escm.size.changed');
            }
        });
    };
    _.escm_observe = function(id, changesToObserve) {
        const $element = $(`#${id}`);
        if ($element.length == 0) return;
        if ($element.hasClass('escm-observing')) {
            _.escm_unobserve(id);
        }
        _.SizeChangeManager.observe($element.get(0));
        $element.addClass('escm-observing');
        _.observing[id] = {
            id: id,
            $el: $element,
            changesToObserve: changesToObserve
        };
        if (changesToObserve.includes('width')) {
            _.observing[id].lastWidth = $element.outerWidth();
        }
        if (changesToObserve.includes('height')) {
            _.observing[id].lastHeight = $element.outerHeight();
        }
    };
    _.escm_unobserve = function(id) {
        const $element = $(`#${id}`);
        _.SizeChangeManager.unobserve($element.get(0));
        $element.removeClass('escm-observing');
        delete _.observing[id];
    };

    function getObservedSettings(id) {
        return _.observing[id];
    }

    function isObservedSizeChaged(elSettings, entry) {
        if (elSettings.changesToObserve.includes('width') && elSettings.lastWidth != entry.contentRect.width) {
            elSettings.lastWidth = entry.contentRect.width;
            return true;
        }
        if (elSettings.changesToObserve.includes('height') && elSettings.lastHeight != entry.contentRect.height) {
            elSettings.lastHeight = entry.contentRect.height;
            return true;
        }
        return false;
    }
    return _;
}();