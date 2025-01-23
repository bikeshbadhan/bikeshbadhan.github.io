function parseCookie(e) {
    var t = JSON.parse(e);
    return "object" != typeof t && (t = JSON.parse(t)), t
}
!function(e) {
    "use strict";
    var t = e.bikesh || {};
    t.Modules = t.Modules || {},
    t.modules = {
        find: function(e) {
            var t,
                n = "[data-module]";
            t = (e = e || document).querySelectorAll(n);
            for (var o = [], i = 0; i < t.length; i++)
                o.push(t[i]);
            return e !== document && e.getAttribute("data-module") && o.push(e), o
        },
        start: function(e) {
            function n(e) {
                return i(o(e))
            }
            function o(e) {
                return e.replace(/-([a-z])/g, (function(e) {
                    return e.charAt(1).toUpperCase()
                }))
            }
            function i(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }
            for (var r = this.find(e), s = 0, a = r.length; s < a; s++)
                for (var u = r[s], l = u.getAttribute("data-module").split(" "), d = 0, c = l.length; d < c; d++) {
                    var h = n(l[d]),
                        m = u.getAttribute("data-" + l[d] + "-module-started");
                    if ("function" == typeof t.Modules[h] && !m)
                        try {
                            t.Modules[h].prototype.init ? new t.Modules[h](u).init() : new t.Modules[h](u),
                            u.setAttribute("data-" + l[d] + "-module-started", !0)
                        } catch (e) {
                            console.error("Error starting " + h + " component JS: ", e, window.location)
                        }
                }
        }
    },
    e.bikesh = t
}(window),
document.addEventListener("DOMContentLoaded", (function() {
    window.bikesh.analyticsGa4 = window.bikesh.analyticsGa4 || {},
    void 0 !== window.bikesh.loadAnalytics && (window.bikesh.loadAnalytics.loadExtraDomains(), void 0 === window.bikesh.analyticsGa4.vars && window.bikesh.loadAnalytics.loadGa4()),
    window.bikesh.modules.start()
})),
function() {
    "use strict";
    window.bikesh = window.bikesh || {},
    window.bikesh.triggerEvent = function(e, t, n) {
        var o,
            i = n || {},
            r = i.keyCode;
        Object.prototype.hasOwnProperty.call(i, "bubbles") || (i.bubbles = !0),
        Object.prototype.hasOwnProperty.call(i, "cancelable") || (i.cancelable = !0),
        "function" == typeof window.CustomEvent ? o = new window.CustomEvent(t, i) : (o = document.createEvent("CustomEvent")).initCustomEvent(t, i.bubbles, i.cancelable, i.detail),
        r && (o.keyCode = r),
        i.shiftKey && (o.shiftKey = !0),
        e.dispatchEvent(o)
    }
}(window),
function() {
    "use strict";
    window.bikesh = window.bikesh || {};
    var e = {
            essential: !0,
            settings: !1,
            usage: !1,
            campaigns: !1
        },
        t = {
            cookies_policy: "essential",
            seen_cookie_message: "essential",
            cookie_preferences_set: "essential",
            cookies_preferences_set: "essential",
            "_email-alert-frontend_session": "essential",
            intervention_campaign: "essential",
            licensing_session: "essential",
            bikesh_contact_referrer: "essential",
            multivariatetest_cohort_coronavirus_extremely_vulnerable_rate_limit: "essential",
            dgu_beta_banner_dismissed: "settings",
            global_bar_seen: "settings",
            bikesh_browser_upgrade_dismisssed: "settings",
            bikesh_not_first_visit: "settings",
            user_nation: "settings",
            "JS-Detection": "usage",
            TLSversion: "usage",
            _ga_VBLT2V3FZR: "usage",
            _ga_P1DGM6TVYF: "usage",
            _ga_S5RQ7FTGVR: "usage"
        };
    window.bikesh.cookie = function(e, t, n) {
        return void 0 !== t ? !1 === t || null === t ? window.bikesh.setCookie(e, "", {
            days: -1
        }) : (void 0 === n && (n = {
            days: 30
        }), window.bikesh.setCookie(e, t, n)) : window.bikesh.getCookie(e)
    },
    window.bikesh.setDefaultConsentCookie = function() {
        window.bikesh.setConsentCookie(e)
    },
    window.bikesh.approveAllCookieTypes = function() {
        var e = {
            essential: !0,
            settings: !0,
            usage: !0,
            campaigns: !0
        };
        window.bikesh.setCookie("cookies_policy", JSON.stringify(e), {
            days: 365
        })
    },
    window.bikesh.getConsentCookie = function() {
        var e,
            t = window.bikesh.cookie("cookies_policy");
        if (!t)
            return null;
        try {
            e = JSON.parse(t)
        } catch (e) {
            return null
        }
        return "object" != typeof e && null !== e && (e = JSON.parse(e)), e
    },
    window.bikesh.setConsentCookie = function(n) {
        var o = window.bikesh.getConsentCookie();
        for (var i in o || (o = JSON.parse(JSON.stringify(e))), n)
            if (o[i] = n[i], !n[i])
                for (var r in t)
                    t[r] === i && window.bikesh.deleteCookie(r);
        window.bikesh.setCookie("cookies_policy", JSON.stringify(o), {
            days: 365
        })
    },
    window.bikesh.checkConsentCookieCategory = function(e, n) {
        var o = window.bikesh.getConsentCookie();
        if (!o && t[e])
            return !0;
        o = window.bikesh.getConsentCookie();
        try {
            return o[n]
        } catch (e) {
            return console.error(e), !1
        }
    },
    window.bikesh.checkConsentCookie = function(e, n) {
        if ("cookies_policy" === e || null === n || !1 === n)
            return !0;
        if (e.match("^bikesh_surveySeen") || e.match("^bikesh_taken"))
            return window.bikesh.checkConsentCookieCategory(e, "settings");
        if (t[e]) {
            var o = t[e];
            return window.bikesh.checkConsentCookieCategory(e, o)
        }
        return !1
    },
    window.bikesh.setCookie = function(e, t, n) {
        if (window.bikesh.checkConsentCookie(e, t)) {
            void 0 === n && (n = {});
            var o = e + "=" + t + "; path=/";
            if (n.days) {
                var i = new Date;
                i.setTime(i.getTime() + 24 * n.days * 60 * 60 * 1e3),
                o = o + "; expires=" + i.toGMTString()
            }
            "https:" === document.location.protocol && (o += "; Secure"),
            document.cookie = o
        }
    },
    window.bikesh.getCookie = function(e) {
        for (var t = e + "=", n = document.cookie.split(";"), o = 0, i = n.length; o < i; o++) {
            for (var r = n[o]; " " === r.charAt(0);)
                r = r.substring(1, r.length);
            if (0 === r.indexOf(t))
                return decodeURIComponent(r.substring(t.length))
        }
        return null
    },
    window.bikesh.getCookieCategory = function(e) {
        return t[e]
    },
    window.bikesh.deleteCookie = function(e) {
        window.bikesh.cookie(e, null),
        window.bikesh.cookie(e) && (document.cookie = e + "=;expires=" + new Date + ";", document.cookie = e + "=;expires=" + new Date + ";domain=" + window.location.hostname + ";path=/")
    },
    window.bikesh.deleteUnconsentedCookies = function() {
        var e = window.bikesh.getConsentCookie();
        for (var n in e)
            if (!e[n])
                for (var o in t)
                    t[o] === n && window.bikesh.deleteCookie(o)
    }
}(window),
function() {
    "use strict";
    window.bikesh = window.bikesh || {},
    window.bikesh.extendObject = function(e) {
        e = e || {};
        for (var t = 1; t < arguments.length; t++)
            if (arguments[t])
                for (var n in arguments[t])
                    Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
        return e
    }
}(window),
window.bikesh = window.bikesh || {},
window.bikesh.Modules = window.bikesh.Modules || {},
function(e) {
    function t(e) {
        this.$module = e,
        this.$module.cookieBannerConfirmationMessage = this.$module.querySelector(".gem-c-cookie-banner__confirmation"),
        this.$module.cookieBannerConfirmationMessageText = this.$module.querySelector(".gem-c-cookie-banner__confirmation-message")
    }
    t.prototype.init = function() {
        this.$module.hideCookieMessage = this.hideCookieMessage.bind(this),
        this.$module.showCookieMessage = this.showCookieMessage.bind(this),
        this.$module.showConfirmationMessage = this.showConfirmationMessage.bind(this),
        this.$module.setCookieConsent = this.setCookieConsent.bind(this),
        this.$module.rejectCookieConsent = this.rejectCookieConsent.bind(this),
        this.setupCookieMessage(),
        window.bikesh.useSingleConsentApi && (window.addEventListener("hide-cookie-banner", this.$module.hideCookieMessage), window.addEventListener("show-cookie-banner", this.$module.showCookieMessage), window.bikesh.singleConsent.init())
    },
    t.prototype.setupCookieMessage = function() {
        if (this.$hideLinks = this.$module.querySelectorAll("button[data-hide-cookie-banner]"), this.$hideLinks && this.$hideLinks.length)
            for (var e = 0; e < this.$hideLinks.length; e++)
                this.$hideLinks[e].addEventListener("click", this.$module.hideCookieMessage);
        this.$acceptCookiesButton = this.$module.querySelector("button[data-accept-cookies]"),
        this.$acceptCookiesButton && this.$acceptCookiesButton.addEventListener("click", this.$module.setCookieConsent),
        this.$rejectCookiesButton = this.$module.querySelector("button[data-reject-cookies]"),
        this.$rejectCookiesButton && this.$rejectCookiesButton.addEventListener("click", this.$module.rejectCookieConsent),
        window.bikesh.useSingleConsentApi || this.showCookieMessage()
    },
    t.prototype.showCookieMessage = function() {
        (window.removeEventListener("show-cookie-banner", this.$module.showCookieMessage), this.isInCookiesPage() || this.isInIframe()) || this.$module && "true" !== window.bikesh.cookie("cookies_preferences_set") && (this.$module.removeAttribute("hidden"), window.bikesh.cookie("cookies_policy") || window.bikesh.useSingleConsentApi || window.bikesh.setDefaultConsentCookie(), window.bikesh.deleteUnconsentedCookies())
    },
    t.prototype.hideCookieMessage = function(e) {
        window.removeEventListener("hide-cookie-banner", this.$module.hideCookieMessage),
        this.$module && (this.$module.hidden = !0, window.bikesh.useSingleConsentApi || window.bikesh.cookie("cookies_preferences_set", "true", {
            days: 365
        })),
        e.target && e.preventDefault()
    },
    t.prototype.setCookieConsent = function() {
        "all" === this.$acceptCookiesButton.getAttribute("data-cookie-types") && (this.$module.querySelector(".gem-c-cookie-banner__confirmation-message--accepted").hidden = !1),
        window.bikesh.useSingleConsentApi ? window.bikesh.singleConsent.setPreferences("accept") : (window.bikesh.approveAllCookieTypes(), window.bikesh.cookie("cookies_preferences_set", "true", {
            days: 365
        })),
        this.$module.showConfirmationMessage(),
        this.$module.cookieBannerConfirmationMessage.focus(),
        window.bikesh.globalBarInit && window.bikesh.globalBarInit.init(),
        window.bikesh.useSingleConsentApi || window.bikesh.triggerEvent(window, "cookie-consent")
    },
    t.prototype.rejectCookieConsent = function() {
        this.$module.querySelector(".gem-c-cookie-banner__confirmation-message--rejected").hidden = !1,
        this.$module.showConfirmationMessage(),
        this.$module.cookieBannerConfirmationMessage.focus(),
        window.bikesh.useSingleConsentApi ? window.bikesh.singleConsent.setPreferences("reject") : (window.bikesh.setDefaultConsentCookie(), window.bikesh.cookie("cookies_preferences_set", "true", {
            days: 365
        }))
    },
    t.prototype.showConfirmationMessage = function() {
        this.$cookieBannerHeader = this.$module.querySelector(".bikesh-cookie-banner__heading"),
        this.$cookieBannerHeader.hidden = !0,
        this.$cookieBannerMainContent = this.$module.querySelector(".gem-c-cookie-banner__content"),
        this.$cookieBannerMainContent.hidden = !0,
        this.$cookieBannerConfirmationButtons = this.$module.querySelector(".js-confirmation-buttons"),
        this.$cookieBannerConfirmationButtons.hidden = !0,
        this.$cookieBannerHideButton = this.$module.querySelector(".js-hide-button"),
        this.$cookieBannerHideButton.hidden = !1
    },
    t.prototype.isInCookiesPage = function() {
        return "/help/cookies" === window.location.pathname
    },
    t.prototype.isInIframe = function() {
        return window.parent && window.location !== window.parent.location
    },
    e.CookieBanner = t
}(window.bikesh.Modules),
window.bikesh = window.bikesh || {},
window.bikesh.Modules = window.bikesh.Modules || {},
function(e) {
    function t(e) {
        this.$header = e,
        this.$navigation = e && e.querySelectorAll("[data-one-login-header-nav]"),
        this.$numberOfNavs = this.$navigation && this.$navigation.length
    }
    t.prototype.init = function() {
        if (this.$header || this.$numberOfNavs)
            for (var e = 0; e < this.$numberOfNavs; e++) {
                var t = this.$navigation[e];
                if (t.$menuButton = t.querySelector(".js-x-header-toggle"), t.$menu = t.$menuButton && t.querySelector("#" + t.$menuButton.getAttribute("aria-controls")), t.menuItems = t.$menu && t.$menu.querySelectorAll("li"), !t.$menuButton || !t.$menu || t.menuItems.length < 2)
                    return;
                t.classList.add("toggle-enabled"),
                t.$menuOpenClass = t.$menu && t.$menu.dataset.openClass,
                t.$menuButtonOpenClass = t.$menuButton && t.$menuButton.dataset.openClass,
                t.$menuButtonOpenLabel = t.$menuButton && t.$menuButton.dataset.labelForShow,
                t.$menuButtonCloseLabel = t.$menuButton && t.$menuButton.dataset.labelForHide,
                t.$menuButtonOpenText = t.$menuButton && t.$menuButton.dataset.textForShow,
                t.$menuButtonCloseText = t.$menuButton && t.$menuButton.dataset.textForHide,
                t.isOpen = !1,
                t.$menuButton.addEventListener("click", this.handleMenuButtonClick.bind(t))
            }
    },
    t.prototype.handleMenuButtonClick = function() {
        this.isOpen = !this.isOpen,
        this.$menuOpenClass && this.$menu.classList.toggle(this.$menuOpenClass, this.isOpen),
        this.$menuButtonOpenClass && this.$menuButton.classList.toggle(this.$menuButtonOpenClass, this.isOpen),
        this.$menuButton.setAttribute("aria-expanded", this.isOpen),
        this.$menuButtonCloseLabel && this.$menuButtonOpenLabel && this.$menuButton.setAttribute("aria-label", this.isOpen ? this.$menuButtonCloseLabel : this.$menuButtonOpenLabel),
        this.$menuButtonCloseText && this.$menuButtonOpenText && (this.$menuButton.innerHTML = this.isOpen ? this.$menuButtonCloseText : this.$menuButtonOpenText)
    },
    e.CrossServiceHeader = t
}(window.bikesh.Modules),
window.bikesh = window.bikesh || {},
window.bikesh.Modules = window.bikesh.Modules || {},
function(e) {
    function t(e) {
        this.$module = e,
        this.somethingIsWrongForm = this.$module.querySelector("#something-is-wrong"),
        this.surveyForm = this.$module.querySelector("#page-is-not-useful"),
        this.prompt = this.$module.querySelector(".js-prompt"),
        this.forms = this.$module.querySelectorAll(".js-feedback-form"),
        this.toggleForms = this.$module.querySelectorAll(".js-toggle-form"),
        this.closeForms = this.$module.querySelectorAll(".js-close-form"),
        this.activeForm = !1,
        this.pageIsUsefulButton = this.$module.querySelector(".js-page-is-useful"),
        this.pageIsNotUsefulButton = this.$module.querySelector(".js-page-is-not-useful"),
        this.somethingIsWrongButton = this.$module.querySelector(".js-something-is-wrong"),
        this.promptQuestions = this.$module.querySelectorAll(".js-prompt-questions"),
        this.promptSuccessMessage = this.$module.querySelector(".js-prompt-success"),
        this.surveyWrapper = this.$module.querySelector("#survey-wrapper"),
        this.jshiddenClass = "js-hidden",
        this.whatDoingInput = this.$module.querySelector("[name=what_doing]"),
        this.whatWrongInput = this.$module.querySelector("[name=what_wrong]")
    }
    t.prototype.init = function() {
        this.setInitialAriaAttributes(),
        this.setHiddenValues(),
        this.setSurveyPath(),
        this.prompt.hidden = !1;
        for (var e = 0; e < this.promptQuestions.length; e++)
            this.promptQuestions[e].hidden = !1;
        this.surveyForm.hidden = !0;
        for (var t = 0; t < this.toggleForms.length; t++)
            this.toggleForms[t].addEventListener("click", function(e) {
                e.preventDefault();
                var t = e.target.closest("button");
                this.toggleForm(t.getAttribute("aria-controls")),
                this.updateAriaAttributes(t)
            }.bind(this));
        for (var n = 0; n < this.closeForms.length; n++)
            this.closeForms[n].hidden = !1,
            this.closeForms[n].addEventListener("click", function(e) {
                e.preventDefault();
                var t = e.target.getAttribute("aria-controls");
                this.toggleForm(t),
                this.setInitialAriaAttributes(),
                this.revealInitialPrompt();
                var n = ".js-" + t;
                this.$module.querySelector(n).focus()
            }.bind(this));
        if (this.pageIsUsefulButton.addEventListener("click", function(e) {
            e.preventDefault(),
            this.showFormSuccess(),
            this.revealInitialPrompt()
        }.bind(this)), this.somethingIsWrongButton.addEventListener("click", function() {
            this.timerInterval = setInterval(function() {
                this.timer = this.timer + 1,
                this.timerHoneyPot.setAttribute("value", this.timer)
            }.bind(this), 1e3)
        }.bind(this)), "function" == typeof window.URLSearchParams)
            for (var o = 0; o < this.forms.length; o++)
                this.forms[o].addEventListener("submit", function(e) {
                    e.preventDefault();
                    var t = e.target,
                        n = new XMLHttpRequest,
                        o = t.getAttribute("action"),
                        i = new FormData(t);
                    i = new URLSearchParams(i).toString(),
                    this.done = function() {
                        200 === n.status ? (this.showFormSuccess(n.message), this.revealInitialPrompt(), this.setInitialAriaAttributes(), this.activeForm.hidden = !0, clearInterval(this.timerInterval)) : (this.showError(n), this.enableSubmitFormButton(t))
                    }.bind(this),
                    n.addEventListener("loadend", this.done),
                    n.open("POST", o, !0),
                    n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                    this.disableSubmitFormButton(t),
                    n.send(i)
                }.bind(this))
    },
    t.prototype.disableSubmitFormButton = function(e) {
        e.querySelector('[type="submit"]').setAttribute("disabled", !0)
    },
    t.prototype.enableSubmitFormButton = function(e) {
        e.querySelector('[type="submit"]').removeAttribute("disabled")
    },
    t.prototype.setInitialAriaAttributes = function() {
        this.pageIsNotUsefulButton.setAttribute("aria-expanded", !1),
        this.somethingIsWrongButton.setAttribute("aria-expanded", !1)
    },
    t.prototype.setHiddenValues = function() {
        var e = document.createElement("input");
        e.setAttribute("type", "hidden"),
        e.setAttribute("name", "javascript_enabled"),
        e.setAttribute("value", !0),
        this.somethingIsWrongForm.appendChild(e);
        var t = document.createElement("input");
        t.setAttribute("type", "hidden"),
        t.setAttribute("name", "referrer"),
        t.setAttribute("value", document.referrer || "unknown"),
        this.somethingIsWrongForm.appendChild(t),
        this.somethingIsWrongForm.invalidInfoError = ["<h2>Sorry, we\u2019re unable to send your message as you haven\u2019t given us any information.</h2>", " <p>Please tell us what you were doing or what went wrong</p>"].join(""),
        this.timer = 0,
        this.timerHoneyPot = document.createElement("input"),
        this.timerHoneyPot.setAttribute("type", "hidden"),
        this.timerHoneyPot.setAttribute("name", "timer"),
        this.timerHoneyPot.setAttribute("value", this.timer),
        this.somethingIsWrongForm.appendChild(this.timerHoneyPot)
    },
    t.prototype.getPagePath = function() {
        return window.location.pathname
    },
    t.prototype.setSurveyPath = function() {
        var e = this.$module.querySelector("#survey_explanation a");
        if (e) {
            var t = this.getPagePath().replace(/[^\s=?&]+(?:@|%40)[^\s=?&]+/, "[email]"),
                n = encodeURI(t);
            e.setAttribute("href", "https://www.smartsurvey.co.uk/s/gov-uk-banner/?c=" + n)
        }
    },
    t.prototype.updateAriaAttributes = function(e) {
        e.setAttribute("aria-expanded", !0)
    },
    t.prototype.toggleForm = function(e) {
        if (this.activeForm = this.$module.querySelector("#" + e), this.activeForm.hidden ? this.activeForm.hidden = !1 : this.activeForm.hidden = !0, this.prompt.hidden ? this.prompt.hidden = !1 : this.prompt.hidden = !0, this.activeForm.hidden)
            this.activeForm = !1,
            clearInterval(this.timerInterval);
        else {
            var t = this.activeForm.querySelectorAll(".gem-c-textarea .bikesh-textarea, .gem-c-input.bikesh-input");
            t.length > 0 && t[0].focus()
        }
    },
    t.prototype.showError = function(e) {
        var t = ["<h2>Sorry, we\u2019re unable to receive your message right now.</h2>", " <p>If the problem persists, we have other ways for you to provide", ' feedback on the <a href="/contact/bikesh">contact page</a>.</p>'].join("");
        e = "response" in e ? "object" == typeof e.response && null !== e.response ? "email survey sign up failure" === e.response.message ? t : e.response.message : t : 422 === e.status && this.activeForm.invalidInfoError || t;
        var n = this.activeForm.querySelector(".js-errors");
        n.innerHTML = e,
        n.hidden = !1,
        n.focus()
    },
    t.prototype.showFormSuccess = function() {
        for (var e = 0; e < this.promptQuestions.length; e++)
            this.promptQuestions[e].hidden = !0;
        this.promptSuccessMessage.hidden = !1,
        this.promptSuccessMessage.focus()
    },
    t.prototype.revealInitialPrompt = function() {
        this.prompt.hidden = !1,
        this.prompt.focus()
    },
    e.Feedback = t
}(window.bikesh.Modules),
window.bikesh = window.bikesh || {},
window.bikesh.Modules = window.bikesh.Modules || {},
function(e) {
    function t(e) {
        this.$module = e,
        this.$searchToggle = this.$module.querySelector("#super-search-menu-toggle"),
        this.$searchMenu = this.$module.querySelector("#super-search-menu"),
        this.$navToggle = this.$module.querySelector("#super-navigation-menu-toggle"),
        this.$navMenu = this.$module.querySelector("#super-navigation-menu"),
        this.$buttons = this.$module.querySelectorAll("button[aria-controls][data-toggle-mobile-group][data-toggle-desktop-group]"),
        this.hiddenButtons = this.$module.querySelectorAll("button[hidden]")
    }
    var n = {
            label: {
                hide: "data-text-for-hide",
                show: "data-text-for-show"
            }
        },
        o = function(e, t) {
            var o = e.getAttribute(n.label[t]);
            o && e.setAttribute("aria-label", o)
        },
        i = function(e, t) {
            e.setAttribute("aria-expanded", !1),
            e.classList.remove("gem-c-layout-super-navigation-header__open-button"),
            t.setAttribute("hidden", "hidden"),
            o(e, "show")
        },
        r = function(e, t) {
            e.setAttribute("aria-expanded", !0),
            e.classList.add("gem-c-layout-super-navigation-header__open-button"),
            t.removeAttribute("hidden"),
            o(e, "hide")
        },
        s = function(e, t) {
            "true" === e.getAttribute("aria-expanded") ? i(e, t) : r(e, t)
        },
        a = function(e, t) {
            return e.tagName.toLowerCase() === t.toLowerCase() ? e : a(e.parentNode, t)
        },
        u = function(e, t) {
            if (null === e)
                return null;
            if (1 === e.nodeType && e.tagName.toLowerCase() === t.toLowerCase())
                return e;
            var n = e.previousElementSibling || e.previousSibling;
            return u(n, t)
        };
    t.prototype.buttonHandler = function(e) {
        for (var t = a(e.target, "button"), n = this.$module.querySelector("#" + t.getAttribute("aria-controls")), o = "data-toggle-desktop-group", r = t.getAttribute(o), u = this.$module.querySelectorAll("[" + o + '="' + r + '"]'), l = 0; l < u.length; l++) {
            var d = u[l];
            if (d !== t) {
                var c = this.$module.querySelector("#" + d.getAttribute("aria-controls"));
                i(d, c)
            }
        }
        s(t, n)
    },
    t.prototype.handleKeyDown = function(e) {
        var t = 9,
            n = 27,
            o = this.$navMenu.querySelectorAll("li a"),
            r = o[0],
            s = o[o.length - 1],
            a = this.$searchMenu.querySelectorAll("li a, input, button"),
            u = a[a.length - 1];
        if (e.keyCode === t)
            if (this.$navMenu.hasAttribute("hidden"))
                this.$searchMenu.hasAttribute("hidden") || document.activeElement === u && (e.shiftKey || i(this.$searchToggle, this.$searchMenu));
            else
                switch (document.activeElement) {
                case this.$navToggle:
                    e.shiftKey || (e.preventDefault(), r.focus());
                    break;
                case s:
                    e.shiftKey || (e.preventDefault(), this.$searchToggle.focus(), i(this.$navToggle, this.$navMenu));
                    break;
                case r:
                    e.shiftKey && (e.preventDefault(), this.$navToggle.focus());
                    break;
                case this.$searchToggle:
                    e.shiftKey && (e.preventDefault(), s.focus())
                }
        else
            e.keyCode === n && (this.$navMenu.hasAttribute("hidden") ? this.$searchMenu.hasAttribute("hidden") || (i(this.$searchToggle, this.$searchMenu), this.$searchToggle.focus()) : (i(this.$navToggle, this.$navMenu), this.$navToggle.focus()))
    },
    t.prototype.init = function() {
        this.$module.addEventListener("keydown", this.handleKeyDown.bind(this));
        for (var e = 0; e < this.$buttons.length; e++) {
            this.$buttons[e].addEventListener("click", this.buttonHandler.bind(this), !0)
        }
        for (var t = 0; t < this.hiddenButtons.length; t++) {
            var n = this.hiddenButtons[t];
            n.removeAttribute("hidden");
            var o = u(n, "a");
            o && o.setAttribute("hidden", "hidden")
        }
        this.$module.querySelector(".gem-c-layout-super-navigation-header__search-item-link").setAttribute("hidden", "hidden"),
        i(this.$searchToggle, this.$searchMenu),
        this.$module.classList.add("js-module-initialised")
    },
    e.SuperNavigationMegaMenu = t
}(window.bikesh.Modules),
window.bikesh = window.bikesh || {},
window.bikesh.Modules = window.bikesh.Modules || {},
function(e) {
    function t(e) {
        this.$module = e
    }
    t.prototype.init = function() {
        function e(e) {
            var t = parseCookie(bikesh.getCookie(o)),
                n = s;
            t && (n = t.version);
            var i = JSON.stringify({
                count: 999,
                version: n
            });
            bikesh.setCookie(o, i, {
                days: 84
            });
            var r = document.querySelector(".global-bar-additional");
            r && r.classList.remove("global-bar-additional--show");
            var a = document.querySelector(".global-bar__dismiss");
            a && a.classList.remove("global-bar__dismiss--show"),
            e.preventDefault()
        }
        function t(e) {
            e += 1;
            var t = JSON.stringify({
                count: e,
                version: s
            });
            bikesh.setCookie(o, t, {
                days: 84
            })
        }
        function n() {
            var e = bikesh.getCookie(o),
                t = parseInt(parseCookie(e).count, 10);
            return isNaN(t) && (t = 0), t
        }
        var o = "global_bar_seen",
            i = this.$module.getAttribute("data-global-bar-permanent");
        "false" === i && (i = !1);
        var r = bikesh.getCookieCategory(o);
        if (bikesh.getConsentCookie()[r]) {
            null !== bikesh.getCookie(o) && void 0 !== parseCookie(bikesh.getCookie(o)).count || bikesh.setCookie("global_bar_seen", JSON.stringify({
                count: 0,
                version: 0
            }), {
                days: 84
            });
            var s = parseCookie(bikesh.getCookie(o)).version,
                a = n()
        }
        this.$module.addEventListener("click", (function(t) {
            t.target.classList.contains("dismiss") && e(t)
        })),
        null === this.$module.offsetParent || i || t(a)
    },
    e.GlobalBar = t
}(window.bikesh.Modules),
window.bikesh = window.bikesh || {};
var BANNER_VERSION = 8,
    GLOBAL_BAR_SEEN_COOKIE = "global_bar_seen",
    globalBarInit = {
        getBannerVersion: function() {
            return BANNER_VERSION
        },
        getLatestCookie: function() {
            return window.bikesh.getCookie(GLOBAL_BAR_SEEN_COOKIE)
        },
        urlBlockList: function() {
            var e = ["^/coronavirus/.*$", "^/brexit(.cy)?$", "^/transition-check/.*$", "^/eubusiness(\\..*)?$", "^/account/.*$"],
                t = document.querySelector(".js-call-to-action");
            if (t) {
                var n = "^" + t.getAttribute("href") + "$";
                e.push(n)
            }
            return new RegExp(e.join("|")).test(window.location.pathname)
        },
        setBannerCookie: function() {
            var e,
                t = window.bikesh.getCookieCategory(GLOBAL_BAR_SEEN_COOKIE),
                n = bikesh.getConsentCookie();
            n && n[t] && (e = "/coronavirus" === window.location.pathname ? JSON.stringify({
                count: 999,
                version: globalBarInit.getBannerVersion()
            }) : JSON.stringify({
                count: 0,
                version: globalBarInit.getBannerVersion()
            }), window.bikesh.setCookie(GLOBAL_BAR_SEEN_COOKIE, e, {
                days: 84
            }))
        },
        makeBannerVisible: function() {
            document.documentElement.className = document.documentElement.className.concat(" show-global-bar");
            var e = document.querySelector("#global-bar");
            e && e.setAttribute("data-ga4-global-bar", "")
        },
        init: function() {
            if (globalBarInit.urlBlockList())
                (null === globalBarInit.getLatestCookie() || parseCookie(globalBarInit.getLatestCookie()).version !== globalBarInit.getBannerVersion()) && globalBarInit.setBannerCookie();
            else if (null === globalBarInit.getLatestCookie())
                globalBarInit.setBannerCookie(),
                globalBarInit.makeBannerVisible();
            else {
                if (parseCookie(globalBarInit.getLatestCookie()).version !== globalBarInit.getBannerVersion() && globalBarInit.setBannerCookie(), 999 === parseCookie(globalBarInit.getLatestCookie()).count) {
                    var e = document.querySelector(".global-bar-additional");
                    e && e.classList.remove("global-bar-additional--show");
                    var t = document.querySelector(".global-bar__dismiss");
                    t && t.classList.remove("global-bar__dismiss--show")
                }
                globalBarInit.makeBannerVisible()
            }
        }
    };
window.bikesh.globalBarInit = globalBarInit,
window.bikesh.globalBarInit.init(),
function() {
    "use strict";
    window.bikesh = window.bikesh || {};
    var e = function(e, t) {
            return "<a " + (t = t ? 'class="' + t + '"' : "") + ' href="{{surveyUrl}}" id="take-survey" target="_blank" rel="noopener noreferrer">' + e + "</a>"
        },
        t = function(e) {
            return '<section id="user-satisfaction-survey" class="visible" aria-hidden="false">  <div class="survey-wrapper bikesh-width-container" data-module="ga4-auto-tracker" data-ga4-auto=\'' + JSON.stringify({
                event_data: {
                    event_name: "element_visible",
                    type: "survey banner"
                }
            }) + '\'>    <a class="bikesh-link survey-close-button" href="#user-survey-cancel" aria-labelledby="survey-title user-survey-cancel" id="user-survey-cancel" role="button" data-module="ga4-event-tracker" data-ga4-event=\'' + JSON.stringify({
                event_name: "select_content",
                type: "survey banner",
                action: "closed",
                section: "{{title}}"
            }) + '\'>Close</a>    <h2 class="survey-title" id="survey-title">{{title}}</h2><div data-module="ga4-link-tracker" data-ga4-track-links-only data-ga4-link=\'' + JSON.stringify({
                event_name: "navigation",
                type: "survey banner",
                index: 1,
                index_total: 1,
                section: "{{title}}"
            }) + "'>" + e + "</div>  </div></section>"
        },
        n = t("<p>" + e("{{surveyCta}}", "bikesh-link survey-primary-link") + ' <span class="postscript-cta">{{surveyCtaPostscript}}</span></p>'),
        o = t('<div id="email-survey-pre">  <a class="bikesh-link survey-primary-link" href="#email-survey-form" id="email-survey-open" rel="noopener noreferrer" role="button" aria-expanded="false">    {{surveyCta}}  </a></div><form id="email-survey-form" action="/contact/bikesh/email-survey-signup" method="post" class="js-hidden" aria-hidden="true" data-module="ga4-form-tracker" data-ga4-form=\'' + JSON.stringify({
            event_name: "form_submit",
            type: "survey banner",
            action: "submit",
            section: "{{title}}",
            text: "{{surveyFormCta}}",
            tool_name: "{{title}}"
        }) + '\'>  <div class="survey-inner-wrapper">    <div id="survey-form-description" class="survey-form-description">{{surveyFormDescription}}      <br> {{surveyFormCtaPostscript}}    </div>    <label class="survey-form-label" for="survey-email-address">      Email Address    </label>    <input name="email_survey_signup[survey_id]" type="hidden" value="{{surveyId}}">    <input name="email_survey_signup[survey_source]" type="hidden" value="{{surveySource}}">    <input class="survey-form-input" name="email_survey_signup[email_address]" id="survey-email-address" type="text" aria-describedby="survey-form-description">    <button class="survey-form-button" type="submit">{{surveyFormCta}}</button>' + e("{{surveyFormNoEmailInvite}}") + '  </div></form><div id="email-survey-post-success" class="js-hidden" aria-hidden="true" tabindex="-1">  {{surveySuccess}}</div><div id="email-survey-post-failure" class="js-hidden" aria-hidden="true" tabindex="-1">  {{surveyFailure}}</div>'),
        i = 2,
        r = "(max-width: 800px)",
        s = {
            defaultSurvey: {
                url: "https://www.smartsurvey.co.uk/s/gov_uk?c={{currentPath}}",
                identifier: "user_satisfaction_survey",
                frequency: 6,
                surveyType: "email"
            },
            smallSurveys: [],
            init: function() {
                if (s.canShowAnySurvey()) {
                    var e = s.getActiveSurvey(s.defaultSurvey, s.smallSurveys);
                    if (void 0 !== e) {
                        var t = document.getElementById("global-bar");
                        t && (t.style.display = "none"),
                        s.displaySurvey(e)
                    }
                }
            },
            canShowAnySurvey: function() {
                var e = document.getElementById("user-satisfaction-survey-container");
                return !s.pathInBlocklist() && (!s.otherNotificationVisible() && (!s.userCompletedTransaction() && !!e))
            },
            processTemplate: function(e, t) {
                for (var n in e)
                    t = t.replace(new RegExp("{{" + n + "}}", "g"), e[n]);
                return t
            },
            getUrlSurveyTemplate: function() {
                return {
                    render: function(e) {
                        var t = {
                                title: "Tell us what you think of GOV.UK",
                                surveyCta: "Take the 3 minute survey",
                                surveyCtaPostscript: "This will open a short survey on another website",
                                surveyUrl: s.addParamsToURL(s.getSurveyUrl(e))
                            },
                            o = window.bikesh.extendObject(t, e.templateArgs);
                        return s.processTemplate(o, n)
                    }
                }
            },
            getEmailSurveyTemplate: function() {
                return {
                    render: function(e) {
                        var t = {
                                title: "Tell us what you think of GOV.UK",
                                surveyCta: "Take a short survey to give us your feedback",
                                surveyFormDescription: "We\u2019ll send you a link to a feedback form. It only takes 2 minutes to fill in.",
                                surveyFormCta: "Send me the survey",
                                surveyFormCtaPostscript: "Don\u2019t worry: we won\u2019t send you spam or share your email address with anyone.",
                                surveyFormNoEmailInvite: "Don\u2019t have an email address?",
                                surveySuccess: "Thanks, we\u2019ve sent you an email with a link to the survey.",
                                surveyFailure: "Sorry, we\u2019re unable to send you an email right now. Please try again later.",
                                surveyId: e.identifier,
                                surveySource: s.currentPath(),
                                surveyUrl: s.addParamsToURL(s.getSurveyUrl(e))
                            },
                            n = window.bikesh.extendObject(t, e.templateArgs);
                        return s.processTemplate(n, o)
                    }
                }
            },
            getActiveSurveys: function(e) {
                return e.filter((function(e) {
                    return s.currentTime() >= e.startTime && s.currentTime() <= e.endTime && s.activeWhen(e)
                }))
            },
            getDisplayableSurveys: function(e) {
                return e.filter((function(e) {
                    return s.isSurveyToBeDisplayed(e)
                }))
            },
            getActiveSurvey: function(e, t) {
                var n = s.getActiveSurveys(t),
                    o = [e].concat(n),
                    i = s.getDisplayableSurveys(o);
                return i.length < 2 ? i[0] : i[Math.floor(Math.random() * i.length)]
            },
            displaySurvey: function(e) {
                var t = document.getElementById("user-satisfaction-survey-container");
                if ("email" === e.surveyType)
                    s.displayEmailSurvey(e, t);
                else {
                    if ("url" !== e.surveyType && void 0 !== e.surveyType)
                        return;
                    s.displayURLSurvey(e, t)
                }
                s.incrementSurveySeenCounter(e)
            },
            displayURLSurvey: function(e, t) {
                var n = s.getUrlSurveyTemplate();
                t.innerHTML = n.render(e),
                window.bikesh.modules.start(t),
                s.setURLSurveyEventHandlers(e)
            },
            displayEmailSurvey: function(e, t) {
                var n = s.getEmailSurveyTemplate();
                t.innerHTML = n.render(e),
                window.bikesh.modules.start(t),
                s.setEmailSurveyEventHandlers(e)
            },
            addParamsToURL: function(e) {
                return e.replace(/\{\{currentPath\}\}/g, s.currentPath())
            },
            setEmailSurveyEventHandlers: function(e) {
                var t = document.getElementById("email-survey-open"),
                    n = document.getElementById("user-survey-cancel"),
                    o = document.getElementById("email-survey-pre"),
                    i = document.getElementById("email-survey-form"),
                    r = document.getElementById("email-survey-post-success"),
                    a = document.getElementById("email-survey-post-failure"),
                    u = document.getElementById("survey-email-address"),
                    l = document.getElementById("take-survey");
                l && l.addEventListener("click", (function() {
                    s.setSurveyTakenCookie(e),
                    s.hideSurvey(e)
                })),
                t && t.addEventListener("click", (function(t) {
                    t.preventDefault(),
                    e.surveyExpanded = !0,
                    o.classList.add("js-hidden"),
                    o.setAttribute("aria-hidden", "true"),
                    i.classList.remove("js-hidden"),
                    i.setAttribute("aria-hidden", "false"),
                    u.focus(),
                    t.stopPropagation()
                })),
                n && n.addEventListener("click", (function(t) {
                    s.setSurveyTakenCookie(e),
                    s.hideSurvey(e),
                    t.stopPropagation(),
                    t.preventDefault()
                })),
                i && i.addEventListener("submit", (function(t) {
                    var n = function() {
                            i.classList.add("js-hidden"),
                            i.setAttribute("aria-hidden", "true"),
                            r.classList.remove("js-hidden"),
                            r.setAttribute("aria-hidden", "false"),
                            r.focus(),
                            s.setSurveyTakenCookie(e)
                        },
                        o = function() {
                            i.classList.add("js-hidden"),
                            i.setAttribute("aria-hidden", "true"),
                            a.classList.remove("js-hidden"),
                            a.setAttribute("aria-hidden", "false"),
                            a.focus()
                        },
                        u = i.getAttribute("action");
                    /\.js$/.test(u) || (u += ".js");
                    var l = new XMLHttpRequest,
                        d = new FormData(i);
                    d = new URLSearchParams(d).toString(),
                    l.open("POST", u, !0),
                    l.onreadystatechange = function() {
                        4 === l.readyState && 200 === l.status ? (n(), s.attachGa4FormCompleteElement(i, !1)) : (o(), s.attachGa4FormCompleteElement(i, !0))
                    },
                    l.send(d),
                    t.stopPropagation(),
                    t.preventDefault()
                }))
            },
            attachGa4FormCompleteElement: function(e, t) {
                var n = document.getElementById("survey-title").textContent.trim(),
                    o = t ? document.getElementById("email-survey-post-failure") : document.getElementById("email-survey-post-success");
                o = o.textContent.trim();
                var i = document.createElement("span");
                i.setAttribute("data-module", "ga4-auto-tracker"),
                i.setAttribute("data-ga4-auto", JSON.stringify({
                    event_name: "form_complete",
                    action: "complete",
                    type: "survey banner",
                    text: o,
                    section: n,
                    tool_name: n
                })),
                e.appendChild(i),
                window.bikesh.modules.start(e)
            },
            setURLSurveyEventHandlers: function(e) {
                var t = document.getElementById("user-survey-cancel"),
                    n = document.getElementById("take-survey");
                t && t.addEventListener("click", (function(t) {
                    s.setSurveyTakenCookie(e),
                    s.hideSurvey(e),
                    t.stopPropagation(),
                    t.preventDefault()
                })),
                n && n.addEventListener("click", (function() {
                    s.setSurveyTakenCookie(e),
                    s.hideSurvey(e)
                }))
            },
            isSurveyToBeDisplayed: function(e) {
                return !(s.isBeingViewedOnMobile() && !s.surveyIsAllowedOnMobile(e)) && ("true" !== bikesh.cookie(s.surveyTakenCookieName(e)) && (!s.surveyHasBeenSeenTooManyTimes(e) && s.randomNumberMatches(e.frequency)))
            },
            pathInBlocklist: function() {
                return new RegExp("^/(?:" + /service-manual/.source + /|coronavirus/.source + /|account/.source + ")(?:/|$)").test(s.currentPath())
            },
            userCompletedTransaction: function() {
                function e(e, t) {
                    return e.indexOf(t) > -1
                }
                var t = s.currentPath();
                if (e(t, "/done") || e(t, "/transaction-finished") || e(t, "/driving-transaction-finished"))
                    return !0
            },
            setSurveyTakenCookie: function(e) {
                window.bikesh.cookie(s.surveyTakenCookieName(e), !0, {
                    days: 90
                })
            },
            incrementSurveySeenCounter: function(e) {
                var t = s.surveySeenCookieName(e),
                    n = s.surveySeenCount(e) + 1,
                    o = s.seenTooManyTimesCooloff(e);
                o ? window.bikesh.cookie(t, n, {
                    days: o
                }) : window.bikesh.cookie(t, n, {
                    days: 730
                })
            },
            seenTooManyTimesCooloff: function(e) {
                return e.seenTooManyTimesCooloff ? u(e.seenTooManyTimesCooloff, void 0, 1) : void 0
            },
            hideSurvey: function() {
                var e = document.getElementById("user-satisfaction-survey");
                e.classList.remove("visible"),
                e.setAttribute("aria-hidden", "true")
            },
            randomNumberMatches: function(e) {
                return 0 === Math.floor(Math.random() * e)
            },
            getSurveyUrl: function(e) {
                return e.url instanceof Array ? e.url[Math.floor(Math.random() * e.url.length)] : e.url
            },
            otherNotificationVisible: function() {
                function e(e) {
                    return null !== e.offsetParent
                }
                for (var t = [".emergency-banner", "#taxonomy-survey", "#global-bar"], n = 0, o = 0; o < t.length; o++) {
                    var i = document.querySelector(t[o]);
                    i && e(i) && n++
                }
                return n > 0
            },
            surveyHasBeenSeenTooManyTimes: function(e) {
                return s.surveySeenCount(e) >= s.surveySeenTooManyTimesLimit(e)
            },
            surveySeenTooManyTimesLimit: function(e) {
                var t = e.seenTooManyTimesLimit;
                return "unlimited" === String(t).toLowerCase() ? 1 / 0 : u(t, i, 1)
            },
            surveySeenCount: function(e) {
                return u(bikesh.cookie(s.surveySeenCookieName(e)), 0, 0)
            },
            surveyTakenCookieName: function(e) {
                return a("taken_" + e.identifier)
            },
            surveySeenCookieName: function(e) {
                return a("survey_seen_" + e.identifier)
            },
            isBeingViewedOnMobile: function() {
                return window.matchMedia(r).matches
            },
            surveyIsAllowedOnMobile: function(e) {
                return e.hasOwnProperty("allowedOnMobile") && !0 === e.allowedOnMobile
            },
            pathMatch: function(e) {
                function t(e) {
                    return /[\^$]/.test(e) ? "(?:" + e + ")" : "(?:/" + e + "(?:/|$))"
                }
                if (void 0 === e)
                    return !1;
                for (var n = [], o = 0; o < e.length; o++)
                    n.push(t(e[o]));
                return (n = new RegExp(n.join("|"))).test(s.currentPath())
            },
            breadcrumbMatch: function(e) {
                return void 0 !== e && new RegExp(e.join("|"), "i").test(s.currentBreadcrumb())
            },
            sectionMatch: function(e) {
                if (void 0 === e)
                    return !1;
                var t = new RegExp(e.join("|"), "i");
                return t.test(s.currentSection()) || t.test(s.currentThemes())
            },
            organisationMatch: function(e) {
                return void 0 !== e && new RegExp(e.join("|")).test(s.currentOrganisation())
            },
            tlsCookieMatch: function(e) {
                var t = s.currentTlsVersion();
                return void 0 !== e && "" !== t && t < e[0]
            },
            activeWhen: function(e) {
                if (e.hasOwnProperty("activeWhen")) {
                    if (e.activeWhen.hasOwnProperty("path") || e.activeWhen.hasOwnProperty("breadcrumb") || e.activeWhen.hasOwnProperty("section") || e.activeWhen.hasOwnProperty("organisation") || e.activeWhen.hasOwnProperty("tlsCookieVersionLimit")) {
                        var t = e.activeWhen.matchType || "include",
                            n = s.tlsCookieMatch(e.activeWhen.tlsCookieVersionLimit),
                            o = s.pathMatch(e.activeWhen.path),
                            i = s.breadcrumbMatch(e.activeWhen.breadcrumb),
                            r = s.sectionMatch(e.activeWhen.section),
                            a = s.organisationMatch(e.activeWhen.organisation),
                            u = n || o || i || r || a;
                        return "exclude" !== t ? u : !u
                    }
                    return !0
                }
                return !0
            },
            currentTime: function() {
                return (new Date).getTime()
            },
            currentPath: function() {
                return window.location.pathname
            },
            currentBreadcrumb: function() {
                var e = document.querySelector(".gem-c-breadcrumbs");
                return e ? e.textContent : ""
            },
            currentSection: function() {
                var e = document.querySelector('meta[name="bikesh:section"]');
                return e ? e.getAttribute("content") : ""
            },
            currentThemes: function() {
                var e = document.querySelector('meta[name="bikesh:themes"]');
                return e ? e.getAttribute("content") : ""
            },
            currentOrganisation: function() {
                var e = document.querySelector('meta[name="bikesh:analytics:organisations"]');
                return e ? e.getAttribute("content") : ""
            },
            currentTlsVersion: function() {
                var e = bikesh.getCookie("TLSversion");
                return null === e || "unknown" === e ? "" : parseFloat(e.replace("TLSv", "")) || ""
            },
            startModule: function() {
                if (bikesh.userSurveys) {
                    var e = window.bikesh.getConsentCookie();
                    e && e.usage ? window.bikesh.userSurveys.init() : (this.start = this.startModule.bind(this), window.addEventListener("cookie-consent", this.start))
                }
            }
        },
        a = function(e) {
            return "bikesh_" + e.replace(/(_\w)/g, (function(e) {
                return e.charAt(1).toUpperCase()
            }))
        },
        u = function(e, t, n) {
            var o = parseInt(e, 10);
            return isNaN(o) || o < n ? t : o
        };
    window.bikesh.userSurveys = s,
    window.bikesh.userSurveys.startModule()
}();
