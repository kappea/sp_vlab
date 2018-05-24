! function(e, t, n) {
    function r(e, t) {
        return typeof e === t
    }

    function i() {
        var e, t, n, i, o, a, s;
        for (var u in b)
            if (b.hasOwnProperty(u)) {
                if (e = [], t = b[u], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
                    for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                for (i = r(t.fn, "function") ? t.fn() : t.fn, o = 0; o < e.length; o++) a = e[o], s = a.split("."), 1 === s.length ? w[s[0]] = i : (!w[s[0]] || w[s[0]] instanceof Boolean || (w[s[0]] = new Boolean(w[s[0]])), w[s[0]][s[1]] = i), y.push((i ? "" : "no-") + s.join("-"))
            }
    }

    function o(e) {
        var t = k.className,
            n = w._config.classPrefix || "";
        if (T && (t = t.baseVal), w._config.enableJSClass) {
            var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            t = t.replace(r, "$1" + n + "js$2")
        }
        w._config.enableClasses && (t += " " + n + e.join(" " + n), T ? k.className.baseVal = t : k.className = t)
    }

    function a() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : T ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
    }

    function s() {
        var e = t.body;
        return e || (e = a(T ? "svg" : "body"), e.fake = !0), e
    }

    function u(e, n, r, i) {
        var o, u, c, l, f = "modernizr",
            d = a("div"),
            p = s();
        if (parseInt(r, 10))
            for (; r--;) c = a("div"), c.id = i ? i[r] : f + (r + 1), d.appendChild(c);
        return o = a("style"), o.type = "text/css", o.id = "s" + f, (p.fake ? p : d).appendChild(o), p.appendChild(d), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(t.createTextNode(e)), d.id = f, p.fake && (p.style.background = "", p.style.overflow = "hidden", l = k.style.overflow, k.style.overflow = "hidden", k.appendChild(p)), u = n(d, e), p.fake ? (p.parentNode.removeChild(p), k.style.overflow = l, k.offsetHeight) : d.parentNode.removeChild(d), !!u
    }

    function c(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function l(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
            return t + n.toUpperCase()
        }).replace(/^-/, "")
    }

    function f(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }

    function d(e, t, n) {
        var i;
        for (var o in e)
            if (e[o] in t) return n === !1 ? e[o] : (i = t[e[o]], r(i, "function") ? f(i, n || t) : i);
        return !1
    }

    function p(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }

    function h(t, r) {
        var i = t.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; i--;)
                if (e.CSS.supports(p(t[i]), r)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in e) {
            for (var o = []; i--;) o.push("(" + p(t[i]) + ":" + r + ")");
            return o = o.join(" or "), u("@supports (" + o + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == getComputedStyle(e, null).position
            })
        }
        return n
    }

    function m(e, t, i, o) {
        function s() {
            f && (delete L.style, delete L.modElem)
        }
        if (o = !r(o, "undefined") && o, !r(i, "undefined")) {
            var u = h(e, i);
            if (!r(u, "undefined")) return u
        }
        for (var f, d, p, m, g, v = ["modernizr", "tspan", "samp"]; !L.style && v.length;) f = !0, L.modElem = a(v.shift()), L.style = L.modElem.style;
        for (p = e.length, d = 0; d < p; d++)
            if (m = e[d], g = L.style[m], c(m, "-") && (m = l(m)), L.style[m] !== n) {
                if (o || r(i, "undefined")) return s(), "pfx" != t || m;
                try {
                    L.style[m] = i
                } catch (y) {}
                if (L.style[m] != g) return s(), "pfx" != t || m
            }
        return s(), !1
    }

    function g(e, t, n, i, o) {
        var a = e.charAt(0).toUpperCase() + e.slice(1),
            s = (e + " " + P.join(a + " ") + a).split(" ");
        return r(t, "string") || r(t, "undefined") ? m(s, t, i, o) : (s = (e + " " + S.join(a + " ") + a).split(" "), d(s, t, n))
    }

    function v(e, t, r) {
        return g(e, n, n, t, r)
    }
    var y = [],
        b = [],
        x = {
            _version: "3.3.1",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, t) {
                var n = this;
                setTimeout(function() {
                    t(n[e])
                }, 0)
            },
            addTest: function(e, t, n) {
                b.push({
                    name: e,
                    fn: t,
                    options: n
                })
            },
            addAsyncTest: function(e) {
                b.push({
                    name: null,
                    fn: e
                })
            }
        },
        w = function() {};
    w.prototype = x, w = new w, w.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
    var C = x._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    x._prefixes = C;
    var k = t.documentElement,
        T = "svg" === k.nodeName.toLowerCase();
    T || ! function(e, t) {
        function n(e, t) {
            var n = e.createElement("p"),
                r = e.getElementsByTagName("head")[0] || e.documentElement;
            return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
        }

        function r() {
            var e = T.elements;
            return "string" == typeof e ? e.split(" ") : e
        }

        function i(e, t) {
            var n = T.elements;
            "string" != typeof n && (n = n.join(" ")), "string" != typeof e && (e = e.join(" ")), T.elements = n + " " + e, c(t)
        }

        function o(e) {
            var t = k[e[w]];
            return t || (t = {}, C++, e[w] = C, k[C] = t), t
        }

        function a(e, n, r) {
            if (n || (n = t), g) return n.createElement(e);
            r || (r = o(n));
            var i;
            return i = r.cache[e] ? r.cache[e].cloneNode() : x.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), !i.canHaveChildren || b.test(e) || i.tagUrn ? i : r.frag.appendChild(i)
        }

        function s(e, n) {
            if (e || (e = t), g) return e.createDocumentFragment();
            n = n || o(e);
            for (var i = n.frag.cloneNode(), a = 0, s = r(), u = s.length; a < u; a++) i.createElement(s[a]);
            return i
        }

        function u(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                return T.shivMethods ? a(n, e, t) : t.createElem(n)
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + r().join().replace(/[\w\-:]+/g, function(e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
            }) + ");return n}")(T, t.frag)
        }

        function c(e) {
            e || (e = t);
            var r = o(e);
            return !T.shivCSS || m || r.hasCSS || (r.hasCSS = !!n(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), g || u(e, r), e
        }

        function l(e) {
            for (var t, n = e.getElementsByTagName("*"), i = n.length, o = RegExp("^(?:" + r().join("|") + ")$", "i"), a = []; i--;) t = n[i], o.test(t.nodeName) && a.push(t.applyElement(f(t)));
            return a
        }

        function f(e) {
            for (var t, n = e.attributes, r = n.length, i = e.ownerDocument.createElement(S + ":" + e.nodeName); r--;) t = n[r], t.specified && i.setAttribute(t.nodeName, t.nodeValue);
            return i.style.cssText = e.style.cssText, i
        }

        function d(e) {
            for (var t, n = e.split("{"), i = n.length, o = RegExp("(^|[\\s,>+~])(" + r().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), a = "$1" + S + "\\:$2"; i--;) t = n[i] = n[i].split("}"), t[t.length - 1] = t[t.length - 1].replace(o, a), n[i] = t.join("}");
            return n.join("{")
        }

        function p(e) {
            for (var t = e.length; t--;) e[t].removeNode()
        }

        function h(e) {
            function t() {
                clearTimeout(a._removeSheetTimer), r && r.removeNode(!0), r = null
            }
            var r, i, a = o(e),
                s = e.namespaces,
                u = e.parentWindow;
            return !N || e.printShived ? e : ("undefined" == typeof s[S] && s.add(S), u.attachEvent("onbeforeprint", function() {
                t();
                for (var o, a, s, u = e.styleSheets, c = [], f = u.length, p = Array(f); f--;) p[f] = u[f];
                for (; s = p.pop();)
                    if (!s.disabled && E.test(s.media)) {
                        try {
                            o = s.imports, a = o.length
                        } catch (h) {
                            a = 0
                        }
                        for (f = 0; f < a; f++) p.push(o[f]);
                        try {
                            c.push(s.cssText)
                        } catch (h) {}
                    }
                c = d(c.reverse().join("")), i = l(e), r = n(e, c)
            }), u.attachEvent("onafterprint", function() {
                p(i), clearTimeout(a._removeSheetTimer), a._removeSheetTimer = setTimeout(t, 500)
            }), e.printShived = !0, e)
        }
        var m, g, v = "3.7.3",
            y = e.html5 || {},
            b = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            x = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            w = "_html5shiv",
            C = 0,
            k = {};
        ! function() {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", m = "hidden" in e, g = 1 == e.childNodes.length || function() {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                }()
            } catch (n) {
                m = !0, g = !0
            }
        }();
        var T = {
            elements: y.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
            version: v,
            shivCSS: y.shivCSS !== !1,
            supportsUnknownElements: g,
            shivMethods: y.shivMethods !== !1,
            type: "default",
            shivDocument: c,
            createElement: a,
            createDocumentFragment: s,
            addElements: i
        };
        e.html5 = T, c(t);
        var E = /^$|\b(?:all|print)\b/,
            S = "html5shiv",
            N = !g && function() {
                var n = t.documentElement;
                return !("undefined" == typeof t.namespaces || "undefined" == typeof t.parentWindow || "undefined" == typeof n.applyElement || "undefined" == typeof n.removeNode || "undefined" == typeof e.attachEvent)
            }();
        T.type += " print", T.shivPrint = h, h(t), "object" == typeof module && module.exports && (module.exports = T)
    }("undefined" != typeof e ? e : this, t);
    var E = "Moz O ms Webkit",
        S = x._config.usePrefixes ? E.toLowerCase().split(" ") : [];
    x._domPrefixes = S, w.addTest("audio", function() {
        var e = a("audio"),
            t = !1;
        try {
            (t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), t.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (n) {}
        return t
    }), w.addTest("video", function() {
        var e = a("video"),
            t = !1;
        try {
            (t = !!e.canPlayType) && (t = new Boolean(t), t.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), t.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), t.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""), t.vp9 = e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, ""), t.hls = e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, ""))
        } catch (n) {}
        return t
    }), w.addTest("opacity", function() {
        var e = a("a").style;
        return e.cssText = C.join("opacity:.55;"), /^0.55$/.test(e.opacity)
    }), w.addTest("inlinesvg", function() {
        var e = a("div");
        return e.innerHTML = "<svg/>", "http://www.w3.org/2000/svg" == ("undefined" != typeof SVGRect && e.firstChild && e.firstChild.namespaceURI)
    });
    var N = "CSS" in e && "supports" in e.CSS,
        q = "supportsCSS" in e;
    w.addTest("supports", N || q);
    var A = function() {
        var t = e.matchMedia || e.msMatchMedia;
        return t ? function(e) {
            var n = t(e);
            return n && n.matches || !1
        } : function(t) {
            var n = !1;
            return u("@media " + t + " { #modernizr { position: absolute; } }", function(t) {
                n = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position
            }), n
        }
    }();
    x.mq = A;
    var j = x.testStyles = u;
    w.addTest("touchevents", function() {
        var n;
        if ("ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch) n = !0;
        else {
            var r = ["@media (", C.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            j(r, function(e) {
                n = 9 === e.offsetTop
            })
        }
        return n
    });
    var D = function() {
        var e = navigator.userAgent,
            t = e.match(/applewebkit\/([0-9]+)/gi) && parseFloat(RegExp.$1),
            n = e.match(/w(eb)?osbrowser/gi),
            r = e.match(/windows phone/gi) && e.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9,
            i = t < 533 && e.match(/android/gi);
        return n || i || r
    }();
    D ? w.addTest("fontface", !1) : j('@font-face {font-family:"font";src:url("https://")}', function(e, n) {
        var r = t.getElementById("smodernizr"),
            i = r.sheet || r.styleSheet,
            o = i ? i.cssRules && i.cssRules[0] ? i.cssRules[0].cssText : i.cssText || "" : "",
            a = /src/i.test(o) && 0 === o.indexOf(n.split(" ")[0]);
        w.addTest("fontface", a)
    });
    var P = x._config.usePrefixes ? E.split(" ") : [];
    x._cssomPrefixes = P;
    var O = {
        elem: a("modernizr")
    };
    w._q.push(function() {
        delete O.elem
    });
    var L = {
        style: O.elem.style
    };
    w._q.unshift(function() {
        delete L.style
    });
    var M = x.testProp = function(e, t, r) {
        return m([e], n, t, r)
    };
    w.addTest("textshadow", M("textShadow", "1px 1px")), x.testAllProps = g, x.testAllProps = v, w.addTest("cssanimations", v("animationName", "a", !0)), w.addTest("csstransforms3d", function() {
            var e = !!v("perspective", "1px", !0),
                t = w._config.usePrefixes;
            if (e && (!t || "webkitPerspective" in k.style)) {
                var n, r = "#modernizr{width:0;height:0}";
                w.supports ? n = "@supports (perspective: 1px)" : (n = "@media (transform-3d)", t && (n += ",(-webkit-transform-3d)")), n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}", j(r + n, function(t) {
                    e = 7 === t.offsetWidth && 18 === t.offsetHeight
                })
            }
            return e
        }), w.addTest("csstransitions", v("transition", "all", !0)),
        function() {
            w.addTest("csscolumns", function() {
                var e = !1,
                    t = v("columnCount");
                try {
                    (e = !!t) && (e = new Boolean(e))
                } catch (n) {}
                return e
            });
            for (var e, t, n = ["Width", "Span", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "BreakBefore", "BreakAfter", "BreakInside"], r = 0; r < n.length; r++) e = n[r].toLowerCase(), t = v("column" + n[r]), "breakbefore" !== e && "breakafter" !== e && "breakinside" != e || (t = t || v(n[r])), w.addTest("csscolumns." + e, t)
        }(), i(), o(y), delete x.addTest, delete x.addAsyncTest;
    for (var B = 0; B < w._q.length; B++) w._q[B]();
    e.Modernizr = w
}(window, document);
var requirejs, require, define;
! function(global) {
    function commentReplace(e, t, n, r) {
        return r || ""
    }

    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }

    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }

    function each(e, t) {
        if (e) {
            var n;
            for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var n;
            for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
        }
    }

    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }

    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }

    function eachProp(e, t) {
        var n;
        for (n in e)
            if (hasProp(e, n) && t(e[n], n)) break
    }

    function mixin(e, t, n, r) {
        return t && eachProp(t, function(t, i) {
            !n && hasProp(e, i) || (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[i] = t : (e[i] || (e[i] = {}), mixin(e[i], t, n, r)))
        }), e
    }

    function bind(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(e) {
        throw e
    }

    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."), function(e) {
            t = t[e]
        }), t
    }

    function makeError(e, t, n, r) {
        var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return i.requireType = e, i.requireModules = r, n && (i.originalError = n), i
    }

    function newContext(e) {
        function t(e) {
            var t, n;
            for (t = 0; t < e.length; t++)
                if (n = e[t], "." === n) e.splice(t, 1), t -= 1;
                else if (".." === n) {
                if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1]) continue;
                t > 0 && (e.splice(t - 1, 2), t -= 2)
            }
        }

        function n(e, n, r) {
            var i, o, a, s, u, c, l, f, d, p, h, m, g = n && n.split("/"),
                v = k.map,
                y = v && v["*"];
            if (e && (e = e.split("/"), l = e.length - 1, k.nodeIdCompat && jsSuffixRegExp.test(e[l]) && (e[l] = e[l].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && g && (m = g.slice(0, g.length - 1), e = m.concat(e)), t(e), e = e.join("/")), r && v && (g || y)) {
                a = e.split("/");
                e: for (s = a.length; s > 0; s -= 1) {
                    if (c = a.slice(0, s).join("/"), g)
                        for (u = g.length; u > 0; u -= 1)
                            if (o = getOwn(v, g.slice(0, u).join("/")), o && (o = getOwn(o, c))) {
                                f = o, d = s;
                                break e
                            }!p && y && getOwn(y, c) && (p = getOwn(y, c), h = s)
                }!f && p && (f = p, d = h), f && (a.splice(0, d, f), e = a.join("/"))
            }
            return i = getOwn(k.pkgs, e), i ? i : e
        }

        function r(e) {
            isBrowser && each(scripts(), function(t) {
                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === x.contextName) return t.parentNode.removeChild(t), !0
            })
        }

        function i(e) {
            var t = getOwn(k.paths, e);
            if (t && isArray(t) && t.length > 1) return t.shift(), x.require.undef(e), x.makeRequire(null, {
                skipMap: !0
            })([e]), !0
        }

        function o(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function a(e, t, r, i) {
            var a, s, u, c, l = null,
                f = t ? t.name : null,
                d = e,
                p = !0,
                h = "";
            return e || (p = !1, e = "_@r" + (D += 1)), c = o(e), l = c[0], e = c[1], l && (l = n(l, f, i), s = getOwn(q, l)), e && (l ? h = s && s.normalize ? s.normalize(e, function(e) {
                return n(e, f, i)
            }) : e.indexOf("!") === -1 ? n(e, f, i) : e : (h = n(e, f, i), c = o(h), l = c[0], h = c[1], r = !0, a = x.nameToUrl(h))), u = !l || s || r ? "" : "_unnormalized" + (P += 1), {
                prefix: l,
                name: h,
                parentMap: t,
                unnormalized: !!u,
                url: a,
                originalName: d,
                isDefine: p,
                id: (l ? l + "!" + h : h) + u
            }
        }

        function s(e) {
            var t = e.id,
                n = getOwn(T, t);
            return n || (n = T[t] = new x.Module(e)), n
        }

        function u(e, t, n) {
            var r = e.id,
                i = getOwn(T, r);
            !hasProp(q, r) || i && !i.defineEmitComplete ? (i = s(e), i.error && "error" === t ? n(i.error) : i.on(t, n)) : "defined" === t && n(q[r])
        }

        function c(e, t) {
            var n = e.requireModules,
                r = !1;
            t ? t(e) : (each(n, function(t) {
                var n = getOwn(T, t);
                n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
            }), r || req.onError(e))
        }

        function l() {
            globalDefQueue.length && (each(globalDefQueue, function(e) {
                var t = e[0];
                "string" == typeof t && (x.defQueueMap[t] = !0), N.push(e)
            }), globalDefQueue = [])
        }

        function f(e) {
            delete T[e], delete E[e]
        }

        function d(e, t, n) {
            var r = e.map.id;
            e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function(r, i) {
                var o = r.id,
                    a = getOwn(T, o);
                !a || e.depMatched[i] || n[o] || (getOwn(t, o) ? (e.defineDep(i, q[o]), e.check()) : d(a, t, n))
            }), n[r] = !0)
        }

        function p() {
            var e, t, n = 1e3 * k.waitSeconds,
                o = n && x.startTime + n < (new Date).getTime(),
                a = [],
                s = [],
                u = !1,
                l = !0;
            if (!y) {
                if (y = !0, eachProp(E, function(e) {
                        var n = e.map,
                            c = n.id;
                        if (e.enabled && (n.isDefine || s.push(e), !e.error))
                            if (!e.inited && o) i(c) ? (t = !0, u = !0) : (a.push(c), r(c));
                            else if (!e.inited && e.fetched && n.isDefine && (u = !0, !n.prefix)) return l = !1
                    }), o && a.length) return e = makeError("timeout", "Load timeout for modules: " + a, null, a), e.contextName = x.contextName, c(e);
                l && each(s, function(e) {
                    d(e, {}, {})
                }), o && !t || !u || !isBrowser && !isWebWorker || C || (C = setTimeout(function() {
                    C = 0, p()
                }, 50)), y = !1
            }
        }

        function h(e) {
            hasProp(q, e[0]) || s(a(e[0], null, !0)).init(e[1], e[2])
        }

        function m(e, t, n, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
        }

        function g(e) {
            var t = e.currentTarget || e.srcElement;
            return m(t, x.onScriptLoad, "load", "onreadystatechange"), m(t, x.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }

        function v() {
            var e;
            for (l(); N.length;) {
                if (e = N.shift(), null === e[0]) return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                h(e)
            }
            x.defQueueMap = {}
        }
        var y, b, x, w, C, k = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            T = {},
            E = {},
            S = {},
            N = [],
            q = {},
            A = {},
            j = {},
            D = 1,
            P = 1;
        return w = {
            require: function(e) {
                return e.require ? e.require : e.require = x.makeRequire(e.map)
            },
            exports: function(e) {
                if (e.usingExports = !0, e.map.isDefine) return e.exports ? q[e.map.id] = e.exports : e.exports = q[e.map.id] = {}
            },
            module: function(e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function() {
                        return getOwn(k.config, e.map.id) || {}
                    },
                    exports: e.exports || (e.exports = {})
                }
            }
        }, b = function(e) {
            this.events = getOwn(S, e.id) || {}, this.map = e, this.shim = getOwn(k.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, b.prototype = {
            init: function(e, t, n, r) {
                r = r || {}, this.inited || (this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function(e) {
                    this.emit("error", e)
                })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function(e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, x.startTime = (new Date).getTime();
                    var e = this.map;
                    return this.shim ? void x.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return e.prefix ? this.callPlugin() : this.load()
                    })) : e.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function() {
                var e = this.map.url;
                A[e] || (A[e] = !0, x.load(this.map.id, e))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var e, t, n = this.map.id,
                        r = this.depExports,
                        i = this.exports,
                        o = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(o)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        i = x.execCb(n, o, r, i)
                                    } catch (a) {
                                        e = a
                                    } else i = x.execCb(n, o, r, i);
                                    if (this.map.isDefine && void 0 === i && (t = this.module, t ? i = t.exports : this.usingExports && (i = this.exports)), e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", c(this.error = e)
                                } else i = o;
                                if (this.exports = i, this.map.isDefine && !this.ignore && (q[n] = i, req.onResourceLoad)) {
                                    var s = [];
                                    each(this.depMaps, function(e) {
                                        s.push(e.normalizedMap || e)
                                    }), req.onResourceLoad(x, this.map, s)
                                }
                                f(n), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else hasProp(x.defQueueMap, n) || this.fetch()
                }
            },
            callPlugin: function() {
                var e = this.map,
                    t = e.id,
                    r = a(e.prefix);
                this.depMaps.push(r), u(r, "defined", bind(this, function(r) {
                    var i, o, l, d = getOwn(j, this.map.id),
                        p = this.map.name,
                        h = this.map.parentMap ? this.map.parentMap.name : null,
                        m = x.makeRequire(e.parentMap, {
                            enableBuildCallback: !0
                        });
                    return this.map.unnormalized ? (r.normalize && (p = r.normalize(p, function(e) {
                        return n(e, h, !0)
                    }) || ""), o = a(e.prefix + "!" + p, this.map.parentMap), u(o, "defined", bind(this, function(e) {
                        this.map.normalizedMap = o, this.init([], function() {
                            return e
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        })
                    })), l = getOwn(T, o.id), void(l && (this.depMaps.push(o), this.events.error && l.on("error", bind(this, function(e) {
                        this.emit("error", e)
                    })), l.enable()))) : d ? (this.map.url = x.nameToUrl(d), void this.load()) : (i = bind(this, function(e) {
                        this.init([], function() {
                            return e
                        }, null, {
                            enabled: !0
                        })
                    }), i.error = bind(this, function(e) {
                        this.inited = !0, this.error = e, e.requireModules = [t], eachProp(T, function(e) {
                            0 === e.map.id.indexOf(t + "_unnormalized") && f(e.map.id)
                        }), c(e)
                    }), i.fromText = bind(this, function(n, r) {
                        var o = e.name,
                            u = a(o),
                            l = useInteractive;
                        r && (n = r), l && (useInteractive = !1), s(u), hasProp(k.config, t) && (k.config[o] = k.config[t]);
                        try {
                            req.exec(n)
                        } catch (f) {
                            return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + f, f, [t]))
                        }
                        l && (useInteractive = !0), this.depMaps.push(u), x.completeLoad(o), m([o], i)
                    }), void r.load(e.name, m, i, k))
                })), x.enable(r, this), this.pluginMaps[r.id] = r
            },
            enable: function() {
                E[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
                    var n, r, i;
                    if ("string" == typeof e) {
                        if (e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, i = getOwn(w, e.id)) return void(this.depExports[t] = i(this));
                        this.depCount += 1, u(e, "defined", bind(this, function(e) {
                            this.undefed || (this.defineDep(t, e), this.check())
                        })), this.errback ? u(e, "error", bind(this, this.errback)) : this.events.error && u(e, "error", bind(this, function(e) {
                            this.emit("error", e)
                        }))
                    }
                    n = e.id, r = T[n], hasProp(w, n) || !r || r.enabled || x.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function(e) {
                    var t = getOwn(T, e.id);
                    t && !t.enabled && x.enable(e, this)
                })), this.enabling = !1, this.check()
            },
            on: function(e, t) {
                var n = this.events[e];
                n || (n = this.events[e] = []), n.push(t)
            },
            emit: function(e, t) {
                each(this.events[e], function(e) {
                    e(t)
                }), "error" === e && delete this.events[e]
            }
        }, x = {
            config: k,
            contextName: e,
            registry: T,
            defined: q,
            urlFetched: A,
            defQueue: N,
            defQueueMap: {},
            Module: b,
            makeModuleMap: a,
            nextTick: req.nextTick,
            onError: c,
            configure: function(e) {
                if (e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/"), "string" == typeof e.urlArgs) {
                    var t = e.urlArgs;
                    e.urlArgs = function(e, n) {
                        return (n.indexOf("?") === -1 ? "?" : "&") + t
                    }
                }
                var n = k.shim,
                    r = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(e, function(e, t) {
                    r[t] ? (k[t] || (k[t] = {}), mixin(k[t], e, !0, !0)) : k[t] = e
                }), e.bundles && eachProp(e.bundles, function(e, t) {
                    each(e, function(e) {
                        e !== t && (j[e] = t)
                    })
                }), e.shim && (eachProp(e.shim, function(e, t) {
                    isArray(e) && (e = {
                        deps: e
                    }), !e.exports && !e.init || e.exportsFn || (e.exportsFn = x.makeShimExports(e)), n[t] = e
                }), k.shim = n), e.packages && each(e.packages, function(e) {
                    var t, n;
                    e = "string" == typeof e ? {
                        name: e
                    } : e, n = e.name, t = e.location, t && (k.paths[n] = e.location), k.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(T, function(e, t) {
                    e.inited || e.map.unnormalized || (e.map = a(t, null, !0))
                }), (e.deps || e.callback) && x.require(e.deps || [], e.callback)
            },
            makeShimExports: function(e) {
                function t() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                }
                return t
            },
            makeRequire: function(t, i) {
                function o(n, r, u) {
                    var l, f, d;
                    return i.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof n ? isFunction(r) ? c(makeError("requireargs", "Invalid require call"), u) : t && hasProp(w, n) ? w[n](T[t.id]) : req.get ? req.get(x, n, t, o) : (f = a(n, t, !1, !0), l = f.id, hasProp(q, l) ? q[l] : c(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), x.nextTick(function() {
                        v(), d = s(a(null, t)), d.skipMap = i.skipMap, d.init(n, r, u, {
                            enabled: !0
                        }), p()
                    }), o)
                }
                return i = i || {}, mixin(o, {
                    isBrowser: isBrowser,
                    toUrl: function(e) {
                        var r, i = e.lastIndexOf("."),
                            o = e.split("/")[0],
                            a = "." === o || ".." === o;
                        return i !== -1 && (!a || i > 1) && (r = e.substring(i, e.length), e = e.substring(0, i)), x.nameToUrl(n(e, t && t.id, !0), r, !0)
                    },
                    defined: function(e) {
                        return hasProp(q, a(e, t, !1, !0).id)
                    },
                    specified: function(e) {
                        return e = a(e, t, !1, !0).id, hasProp(q, e) || hasProp(T, e)
                    }
                }), t || (o.undef = function(e) {
                    l();
                    var n = a(e, t, !0),
                        i = getOwn(T, e);
                    i.undefed = !0, r(e), delete q[e], delete A[n.url], delete S[e], eachReverse(N, function(t, n) {
                        t[0] === e && N.splice(n, 1)
                    }), delete x.defQueueMap[e], i && (i.events.defined && (S[e] = i.events), f(e))
                }), o
            },
            enable: function(e) {
                var t = getOwn(T, e.id);
                t && s(e).enable()
            },
            completeLoad: function(e) {
                var t, n, r, o = getOwn(k.shim, e) || {},
                    a = o.exports;
                for (l(); N.length;) {
                    if (n = N.shift(), null === n[0]) {
                        if (n[0] = e, t) break;
                        t = !0
                    } else n[0] === e && (t = !0);
                    h(n)
                }
                if (x.defQueueMap = {}, r = getOwn(T, e), !t && !hasProp(q, e) && r && !r.inited) {
                    if (!(!k.enforceDefine || a && getGlobal(a))) return i(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [e]));
                    h([e, o.deps || [], o.exportsFn])
                }
                p()
            },
            nameToUrl: function(e, t, n) {
                var r, i, o, a, s, u, c, l = getOwn(k.pkgs, e);
                if (l && (e = l), c = getOwn(j, e)) return x.nameToUrl(c, t, n);
                if (req.jsExtRegExp.test(e)) s = e + (t || "");
                else {
                    for (r = k.paths, i = e.split("/"), o = i.length; o > 0; o -= 1)
                        if (a = i.slice(0, o).join("/"), u = getOwn(r, a)) {
                            isArray(u) && (u = u[0]), i.splice(0, o, u);
                            break
                        }
                    s = i.join("/"), s += t || (/^data\:|^blob\:|\?/.test(s) || n ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : k.baseUrl) + s
                }
                return k.urlArgs && !/^blob\:/.test(s) ? s + k.urlArgs(e, s) : s
            },
            load: function(e, t) {
                req.load(x, e, t)
            },
            execCb: function(e, t, n, r) {
                return t.apply(r, n)
            },
            onScriptLoad: function(e) {
                if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = g(e);
                    x.completeLoad(t.id)
                }
            },
            onScriptError: function(e) {
                var t = g(e);
                if (!i(t.id)) {
                    var n = [];
                    return eachProp(T, function(e, r) {
                        0 !== r.indexOf("_@r") && each(e.depMaps, function(e) {
                            if (e.id === t.id) return n.push(r), !0
                        })
                    }), c(makeError("scripterror", 'Script error for "' + t.id + (n.length ? '", needed by: ' + n.join(", ") : '"'), e, [t.id]))
                }
            }
        }, x.require = x.makeRequire(), x
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(e) {
            if ("interactive" === e.readyState) return interactiveScript = e
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.2.0",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(e, t, n, r) {
            var i, o, a = defContextName;
            return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = n, n = r) : e = []), o && o.context && (a = o.context), i = getOwn(contexts, a), i || (i = contexts[a] = req.s.newContext(a)), o && i.configure(o), i.require(e, t, n)
        }, req.config = function(e) {
            return req(e)
        }, req.nextTick = "undefined" != typeof setTimeout ? function(e) {
            setTimeout(e, 4)
        } : function(e) {
            e()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
            req[e] = function() {
                var t = contexts[defContextName];
                return t.require[e].apply(t, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(e, t, n) {
            var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r
        }, req.load = function(e, t, n) {
            var r, i = e && e.config || {};
            if (isBrowser) return r = req.createNode(i, t, n), r.setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = n, i.onNodeCreated && i.onNodeCreated(r, i, t, n), currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;
            if (isWebWorker) try {
                setTimeout(function() {}, 0), importScripts(n), e.completeLoad(t)
            } catch (o) {
                e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, o, [t]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(e) {
            if (head || (head = e.parentNode), dataMain = e.getAttribute("data-main")) return mainScript = dataMain, cfg.baseUrl || mainScript.indexOf("!") !== -1 || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
        }), define = function(e, t, n) {
            var r, i;
            "string" != typeof e && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function(e, n) {
                t.push(n)
            }), t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), i ? (i.defQueue.push([e, t, n]), i.defQueueMap[e] = !0) : globalDefQueue.push([e, t, n])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function(text) {
            return eval(text)
        }, req(cfg)
    }
}(this),
function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";

    function n(e, t) {
        t = t || ne;
        var n = t.createElement("script");
        n.text = e, t.head.appendChild(n).parentNode.removeChild(n)
    }

    function r(e) {
        var t = !!e && "length" in e && e.length,
            n = me.type(e);
        return "function" !== n && !me.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function i(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }

    function o(e, t, n) {
        return me.isFunction(t) ? me.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        }) : t.nodeType ? me.grep(e, function(e) {
            return e === t !== n
        }) : "string" != typeof t ? me.grep(e, function(e) {
            return se.call(t, e) > -1 !== n
        }) : Ee.test(t) ? me.filter(t, e, n) : (t = me.filter(t, e), me.grep(e, function(e) {
            return se.call(t, e) > -1 !== n && 1 === e.nodeType
        }))
    }

    function a(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function s(e) {
        var t = {};
        return me.each(e.match(De) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function u(e) {
        return e
    }

    function c(e) {
        throw e
    }

    function l(e, t, n, r) {
        var i;
        try {
            e && me.isFunction(i = e.promise) ? i.call(e).done(t).fail(n) : e && me.isFunction(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }

    function f() {
        ne.removeEventListener("DOMContentLoaded", f), e.removeEventListener("load", f), me.ready()
    }

    function d() {
        this.expando = me.expando + d.uid++
    }

    function p(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Re.test(e) ? JSON.parse(e) : e)
    }

    function h(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace($e, "-$&").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = p(n)
                } catch (i) {}
                Fe.set(e, t, n)
            } else n = void 0;
        return n
    }

    function m(e, t, n, r) {
        var i, o = 1,
            a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return me.css(e, t, "")
            },
            u = s(),
            c = n && n[3] || (me.cssNumber[t] ? "" : "px"),
            l = (me.cssNumber[t] || "px" !== c && +u) && Ie.exec(me.css(e, t));
        if (l && l[3] !== c) {
            c = c || l[3], n = n || [], l = +u || 1;
            do o = o || ".5", l /= o, me.style(e, t, l + c); while (o !== (o = s() / u) && 1 !== o && --a)
        }
        return n && (l = +l || +u || 0, i = n[1] ? l + (n[1] + 1) * n[2] : +n[2], r && (r.unit = c, r.start = l, r.end = i)), i
    }

    function g(e) {
        var t, n = e.ownerDocument,
            r = e.nodeName,
            i = Ue[r];
        return i ? i : (t = n.body.appendChild(n.createElement(r)), i = me.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), Ue[r] = i, i)
    }

    function v(e, t) {
        for (var n, r, i = [], o = 0, a = e.length; o < a; o++) r = e[o],
            r.style && (n = r.style.display, t ? ("none" === n && (i[o] = Be.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && _e(r) && (i[o] = g(r))) : "none" !== n && (i[o] = "none", Be.set(r, "display", n)));
        for (o = 0; o < a; o++) null != i[o] && (e[o].style.display = i[o]);
        return e
    }

    function y(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && i(e, t) ? me.merge([e], n) : n
    }

    function b(e, t) {
        for (var n = 0, r = e.length; n < r; n++) Be.set(e[n], "globalEval", !t || Be.get(t[n], "globalEval"))
    }

    function x(e, t, n, r, i) {
        for (var o, a, s, u, c, l, f = t.createDocumentFragment(), d = [], p = 0, h = e.length; p < h; p++)
            if (o = e[p], o || 0 === o)
                if ("object" === me.type(o)) me.merge(d, o.nodeType ? [o] : o);
                else if (Je.test(o)) {
            for (a = a || f.appendChild(t.createElement("div")), s = (Qe.exec(o) || ["", ""])[1].toLowerCase(), u = Ge[s] || Ge._default, a.innerHTML = u[1] + me.htmlPrefilter(o) + u[2], l = u[0]; l--;) a = a.lastChild;
            me.merge(d, a.childNodes), a = f.firstChild, a.textContent = ""
        } else d.push(t.createTextNode(o));
        for (f.textContent = "", p = 0; o = d[p++];)
            if (r && me.inArray(o, r) > -1) i && i.push(o);
            else if (c = me.contains(o.ownerDocument, o), a = y(f.appendChild(o), "script"), c && b(a), n)
            for (l = 0; o = a[l++];) Xe.test(o.type || "") && n.push(o);
        return f
    }

    function w() {
        return !0
    }

    function C() {
        return !1
    }

    function k() {
        try {
            return ne.activeElement
        } catch (e) {}
    }

    function T(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (r = r || n, n = void 0);
            for (s in t) T(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), i === !1) i = C;
        else if (!i) return e;
        return 1 === o && (a = i, i = function(e) {
            return me().off(e), a.apply(this, arguments)
        }, i.guid = a.guid || (a.guid = me.guid++)), e.each(function() {
            me.event.add(this, t, i, r, n)
        })
    }

    function E(e, t) {
        return i(e, "table") && i(11 !== t.nodeType ? t : t.firstChild, "tr") ? me(">tbody", e)[0] || e : e
    }

    function S(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function N(e) {
        var t = it.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function q(e, t) {
        var n, r, i, o, a, s, u, c;
        if (1 === t.nodeType) {
            if (Be.hasData(e) && (o = Be.access(e), a = Be.set(t, o), c = o.events)) {
                delete a.handle, a.events = {};
                for (i in c)
                    for (n = 0, r = c[i].length; n < r; n++) me.event.add(t, i, c[i][n])
            }
            Fe.hasData(e) && (s = Fe.access(e), u = me.extend({}, s), Fe.set(t, u))
        }
    }

    function A(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Ve.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function j(e, t, r, i) {
        t = oe.apply([], t);
        var o, a, s, u, c, l, f = 0,
            d = e.length,
            p = d - 1,
            h = t[0],
            m = me.isFunction(h);
        if (m || d > 1 && "string" == typeof h && !pe.checkClone && rt.test(h)) return e.each(function(n) {
            var o = e.eq(n);
            m && (t[0] = h.call(this, n, o.html())), j(o, t, r, i)
        });
        if (d && (o = x(t, e[0].ownerDocument, !1, e, i), a = o.firstChild, 1 === o.childNodes.length && (o = a), a || i)) {
            for (s = me.map(y(o, "script"), S), u = s.length; f < d; f++) c = o, f !== p && (c = me.clone(c, !0, !0), u && me.merge(s, y(c, "script"))), r.call(e[f], c, f);
            if (u)
                for (l = s[s.length - 1].ownerDocument, me.map(s, N), f = 0; f < u; f++) c = s[f], Xe.test(c.type || "") && !Be.access(c, "globalEval") && me.contains(l, c) && (c.src ? me._evalUrl && me._evalUrl(c.src) : n(c.textContent.replace(ot, ""), l))
        }
        return e
    }

    function D(e, t, n) {
        for (var r, i = t ? me.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || me.cleanData(y(r)), r.parentNode && (n && me.contains(r.ownerDocument, r) && b(y(r, "script")), r.parentNode.removeChild(r));
        return e
    }

    function P(e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || ut(e), n && (a = n.getPropertyValue(t) || n[t], "" !== a || me.contains(e.ownerDocument, e) || (a = me.style(e, t)), !pe.pixelMarginRight() && st.test(a) && at.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
    }

    function O(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function L(e) {
        if (e in ht) return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = pt.length; n--;)
            if (e = pt[n] + t, e in ht) return e
    }

    function M(e) {
        var t = me.cssProps[e];
        return t || (t = me.cssProps[e] = L(e) || e), t
    }

    function B(e, t, n) {
        var r = Ie.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function F(e, t, n, r, i) {
        var o, a = 0;
        for (o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0; o < 4; o += 2) "margin" === n && (a += me.css(e, n + ze[o], !0, i)), r ? ("content" === n && (a -= me.css(e, "padding" + ze[o], !0, i)), "margin" !== n && (a -= me.css(e, "border" + ze[o] + "Width", !0, i))) : (a += me.css(e, "padding" + ze[o], !0, i), "padding" !== n && (a += me.css(e, "border" + ze[o] + "Width", !0, i)));
        return a
    }

    function R(e, t, n) {
        var r, i = ut(e),
            o = P(e, t, i),
            a = "border-box" === me.css(e, "boxSizing", !1, i);
        return st.test(o) ? o : (r = a && (pe.boxSizingReliable() || o === e.style[t]), "auto" === o && (o = e["offset" + t[0].toUpperCase() + t.slice(1)]), o = parseFloat(o) || 0, o + F(e, t, n || (a ? "border" : "content"), r, i) + "px")
    }

    function $(e, t, n, r, i) {
        return new $.prototype.init(e, t, n, r, i)
    }

    function H() {
        gt && (ne.hidden === !1 && e.requestAnimationFrame ? e.requestAnimationFrame(H) : e.setTimeout(H, me.fx.interval), me.fx.tick())
    }

    function I() {
        return e.setTimeout(function() {
            mt = void 0
        }), mt = me.now()
    }

    function z(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) n = ze[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function _(e, t, n) {
        for (var r, i = (V.tweeners[t] || []).concat(V.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function W(e, t, n) {
        var r, i, o, a, s, u, c, l, f = "width" in t || "height" in t,
            d = this,
            p = {},
            h = e.style,
            m = e.nodeType && _e(e),
            g = Be.get(e, "fxshow");
        n.queue || (a = me._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
            a.unqueued || s()
        }), a.unqueued++, d.always(function() {
            d.always(function() {
                a.unqueued--, me.queue(e, "fx").length || a.empty.fire()
            })
        }));
        for (r in t)
            if (i = t[r], vt.test(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (m ? "hide" : "show")) {
                    if ("show" !== i || !g || void 0 === g[r]) continue;
                    m = !0
                }
                p[r] = g && g[r] || me.style(e, r)
            }
        if (u = !me.isEmptyObject(t), u || !me.isEmptyObject(p)) {
            f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], c = g && g.display, null == c && (c = Be.get(e, "display")), l = me.css(e, "display"), "none" === l && (c ? l = c : (v([e], !0), c = e.style.display || c, l = me.css(e, "display"), v([e]))), ("inline" === l || "inline-block" === l && null != c) && "none" === me.css(e, "float") && (u || (d.done(function() {
                h.display = c
            }), null == c && (l = h.display, c = "none" === l ? "" : l)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", d.always(function() {
                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
            })), u = !1;
            for (r in p) u || (g ? "hidden" in g && (m = g.hidden) : g = Be.access(e, "fxshow", {
                display: c
            }), o && (g.hidden = !m), m && v([e], !0), d.done(function() {
                m || v([e]), Be.remove(e, "fxshow");
                for (r in p) me.style(e, r, p[r])
            })), u = _(m ? g[r] : 0, r, d), r in g || (g[r] = u.start, m && (u.end = u.start, u.start = 0))
        }
    }

    function U(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (r = me.camelCase(n), i = t[r], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = me.cssHooks[r], a && "expand" in a) {
                o = a.expand(o), delete e[r];
                for (n in o) n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
    }

    function V(e, t, n) {
        var r, i, o = 0,
            a = V.prefilters.length,
            s = me.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                for (var t = mt || I(), n = Math.max(0, c.startTime + c.duration - t), r = n / c.duration || 0, o = 1 - r, a = 0, u = c.tweens.length; a < u; a++) c.tweens[a].run(o);
                return s.notifyWith(e, [c, o, n]), o < 1 && u ? n : (u || s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c]), !1)
            },
            c = s.promise({
                elem: e,
                props: me.extend({}, t),
                opts: me.extend(!0, {
                    specialEasing: {},
                    easing: me.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: mt || I(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = me.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? c.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; n < r; n++) c.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [c, 1, 0]), s.resolveWith(e, [c, t])) : s.rejectWith(e, [c, t]), this
                }
            }),
            l = c.props;
        for (U(l, c.opts.specialEasing); o < a; o++)
            if (r = V.prefilters[o].call(c, e, l, c.opts)) return me.isFunction(r.stop) && (me._queueHooks(c.elem, c.opts.queue).stop = me.proxy(r.stop, r)), r;
        return me.map(l, _, c), me.isFunction(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), me.fx.timer(me.extend(u, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c
    }

    function Q(e) {
        var t = e.match(De) || [];
        return t.join(" ")
    }

    function X(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function G(e, t, n, r) {
        var i;
        if (Array.isArray(t)) me.each(t, function(t, i) {
            n || qt.test(e) ? r(e, i) : G(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== me.type(t)) r(e, t);
        else
            for (i in t) G(e + "[" + i + "]", t[i], n, r)
    }

    function J(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(De) || [];
            if (me.isFunction(n))
                for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function Y(e, t, n, r) {
        function i(s) {
            var u;
            return o[s] = !0, me.each(e[s] || [], function(e, s) {
                var c = s(t, n, r);
                return "string" != typeof c || a || o[c] ? a ? !(u = c) : void 0 : (t.dataTypes.unshift(c), i(c), !1)
            }), u
        }
        var o = {},
            a = e === Ht;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }

    function K(e, t) {
        var n, r, i = me.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && me.extend(!0, e, r), e
    }

    function Z(e, t, n) {
        for (var r, i, o, a, s = e.contents, u = e.dataTypes;
            "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in s)
                if (s[i] && s[i].test(r)) {
                    u.unshift(i);
                    break
                }
        if (u[0] in n) o = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                a || (a = i)
            }
            o = o || a
        }
        if (o) return o !== u[0] && u.unshift(o), n[o]
    }

    function ee(e, t, n, r) {
        var i, o, a, s, u, c = {},
            l = e.dataTypes.slice();
        if (l[1])
            for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
        for (o = l.shift(); o;)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = l.shift())
                if ("*" === o) o = u;
                else if ("*" !== u && u !== o) {
            if (a = c[u + " " + o] || c["* " + o], !a)
                for (i in c)
                    if (s = i.split(" "), s[1] === o && (a = c[u + " " + s[0]] || c["* " + s[0]])) {
                        a === !0 ? a = c[i] : c[i] !== !0 && (o = s[0], l.unshift(s[1]));
                        break
                    }
            if (a !== !0)
                if (a && e["throws"]) t = a(t);
                else try {
                    t = a(t)
                } catch (f) {
                    return {
                        state: "parsererror",
                        error: a ? f : "No conversion from " + u + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }
    var te = [],
        ne = e.document,
        re = Object.getPrototypeOf,
        ie = te.slice,
        oe = te.concat,
        ae = te.push,
        se = te.indexOf,
        ue = {},
        ce = ue.toString,
        le = ue.hasOwnProperty,
        fe = le.toString,
        de = fe.call(Object),
        pe = {},
        he = "3.2.1",
        me = function(e, t) {
            return new me.fn.init(e, t)
        },
        ge = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ve = /^-ms-/,
        ye = /-([a-z])/g,
        be = function(e, t) {
            return t.toUpperCase()
        };
    me.fn = me.prototype = {
        jquery: he,
        constructor: me,
        length: 0,
        toArray: function() {
            return ie.call(this)
        },
        get: function(e) {
            return null == e ? ie.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = me.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return me.each(this, e)
        },
        map: function(e) {
            return this.pushStack(me.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(ie.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: ae,
        sort: te.sort,
        splice: te.splice
    }, me.extend = me.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            c = !1;
        for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || me.isFunction(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = a[t], r = e[t], a !== r && (c && r && (me.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && me.isPlainObject(n) ? n : {}, a[t] = me.extend(c, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }, me.extend({
        expando: "jQuery" + (he + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === me.type(e)
        },
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = me.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        },
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== ce.call(e)) && (!(t = re(e)) || (n = le.call(t, "constructor") && t.constructor, "function" == typeof n && fe.call(n) === de))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ue[ce.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            n(e)
        },
        camelCase: function(e) {
            return e.replace(ve, "ms-").replace(ye, be)
        },
        each: function(e, t) {
            var n, i = 0;
            if (r(e))
                for (n = e.length; i < n && t.call(e[i], i, e[i]) !== !1; i++);
            else
                for (i in e)
                    if (t.call(e[i], i, e[i]) === !1) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(ge, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (r(Object(e)) ? me.merge(n, "string" == typeof e ? [e] : e) : ae.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : se.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++) r = !t(e[o], o), r !== s && i.push(e[o]);
            return i
        },
        map: function(e, t, n) {
            var i, o, a = 0,
                s = [];
            if (r(e))
                for (i = e.length; a < i; a++) o = t(e[a], a, n), null != o && s.push(o);
            else
                for (a in e) o = t(e[a], a, n), null != o && s.push(o);
            return oe.apply([], s)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            if ("string" == typeof t && (n = e[t], t = e, e = n), me.isFunction(e)) return r = ie.call(arguments, 2), i = function() {
                return e.apply(t || this, r.concat(ie.call(arguments)))
            }, i.guid = e.guid = e.guid || me.guid++, i
        },
        now: Date.now,
        support: pe
    }), "function" == typeof Symbol && (me.fn[Symbol.iterator] = te[Symbol.iterator]), me.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        ue["[object " + t + "]"] = t.toLowerCase()
    });
    var xe = function(e) {
        function t(e, t, n, r) {
            var i, o, a, s, u, c, l, d = t && t.ownerDocument,
                h = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
            if (!r && ((t ? t.ownerDocument || t : I) !== O && P(t), t = t || O, M)) {
                if (11 !== h && (u = ve.exec(e)))
                    if (i = u[1]) {
                        if (9 === h) {
                            if (!(a = t.getElementById(i))) return n;
                            if (a.id === i) return n.push(a), n
                        } else if (d && (a = d.getElementById(i)) && $(t, a) && a.id === i) return n.push(a), n
                    } else {
                        if (u[2]) return K.apply(n, t.getElementsByTagName(e)), n;
                        if ((i = u[3]) && C.getElementsByClassName && t.getElementsByClassName) return K.apply(n, t.getElementsByClassName(i)), n
                    }
                if (C.qsa && !V[e + " "] && (!B || !B.test(e))) {
                    if (1 !== h) d = t, l = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(we, Ce) : t.setAttribute("id", s = H), c = S(e), o = c.length; o--;) c[o] = "#" + s + " " + p(c[o]);
                        l = c.join(","), d = ye.test(e) && f(t.parentNode) || t
                    }
                    if (l) try {
                        return K.apply(n, d.querySelectorAll(l)), n
                    } catch (m) {} finally {
                        s === H && t.removeAttribute("id")
                    }
                }
            }
            return q(e.replace(se, "$1"), t, n, r)
        }

        function n() {
            function e(n, r) {
                return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = r
            }
            var t = [];
            return e
        }

        function r(e) {
            return e[H] = !0, e
        }

        function i(e) {
            var t = O.createElement("fieldset");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), r = n.length; r--;) k.attrHandle[n[r]] = t
        }

        function a(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function c(e) {
            return function(t) {
                return "form" in t ? t.parentNode && t.disabled === !1 ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Te(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function l(e) {
            return r(function(t) {
                return t = +t, r(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function f(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function d() {}

        function p(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function h(e, t, n) {
            var r = t.dir,
                i = t.next,
                o = i || r,
                a = n && "parentNode" === o,
                s = _++;
            return t.first ? function(t, n, i) {
                for (; t = t[r];)
                    if (1 === t.nodeType || a) return e(t, n, i);
                return !1
            } : function(t, n, u) {
                var c, l, f, d = [z, s];
                if (u) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || a) && e(t, n, u)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || a)
                            if (f = t[H] || (t[H] = {}), l = f[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;
                            else {
                                if ((c = l[o]) && c[0] === z && c[1] === s) return d[2] = c[2];
                                if (l[o] = d, d[2] = e(t, n, u)) return !0
                            } return !1
            }
        }

        function m(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--;)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function g(e, n, r) {
            for (var i = 0, o = n.length; i < o; i++) t(e, n[i], r);
            return r
        }

        function v(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, c = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), c && t.push(s)));
            return a
        }

        function y(e, t, n, i, o, a) {
            return i && !i[H] && (i = y(i)), o && !o[H] && (o = y(o, a)), r(function(r, a, s, u) {
                var c, l, f, d = [],
                    p = [],
                    h = a.length,
                    m = r || g(t || "*", s.nodeType ? [s] : s, []),
                    y = !e || !r && t ? m : v(m, d, e, s, u),
                    b = n ? o || (r ? e : h || i) ? [] : a : y;
                if (n && n(y, b, s, u), i)
                    for (c = v(b, p), i(c, [], s, u), l = c.length; l--;)(f = c[l]) && (b[p[l]] = !(y[p[l]] = f));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (c = [], l = b.length; l--;)(f = b[l]) && c.push(y[l] = f);
                            o(null, b = [], c, u)
                        }
                        for (l = b.length; l--;)(f = b[l]) && (c = o ? ee(r, f) : d[l]) > -1 && (r[c] = !(a[c] = f))
                    }
                } else b = v(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, u) : K.apply(a, b)
            })
        }

        function b(e) {
            for (var t, n, r, i = e.length, o = k.relative[e[0].type], a = o || k.relative[" "], s = o ? 1 : 0, u = h(function(e) {
                    return e === t
                }, a, !0), c = h(function(e) {
                    return ee(t, e) > -1
                }, a, !0), l = [function(e, n, r) {
                    var i = !o && (r || n !== A) || ((t = n).nodeType ? u(e, n, r) : c(e, n, r));
                    return t = null, i
                }]; s < i; s++)
                if (n = k.relative[e[s].type]) l = [h(m(l), n)];
                else {
                    if (n = k.filter[e[s].type].apply(null, e[s].matches), n[H]) {
                        for (r = ++s; r < i && !k.relative[e[r].type]; r++);
                        return y(s > 1 && m(l), s > 1 && p(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(se, "$1"), n, s < r && b(e.slice(s, r)), r < i && b(e = e.slice(r)), r < i && p(e))
                    }
                    l.push(n)
                }
            return m(l)
        }

        function x(e, n) {
            var i = n.length > 0,
                o = e.length > 0,
                a = function(r, a, s, u, c) {
                    var l, f, d, p = 0,
                        h = "0",
                        m = r && [],
                        g = [],
                        y = A,
                        b = r || o && k.find.TAG("*", c),
                        x = z += null == y ? 1 : Math.random() || .1,
                        w = b.length;
                    for (c && (A = a === O || a || c); h !== w && null != (l = b[h]); h++) {
                        if (o && l) {
                            for (f = 0, a || l.ownerDocument === O || (P(l), s = !M); d = e[f++];)
                                if (d(l, a || O, s)) {
                                    u.push(l);
                                    break
                                }
                            c && (z = x)
                        }
                        i && ((l = !d && l) && p--, r && m.push(l))
                    }
                    if (p += h, i && h !== p) {
                        for (f = 0; d = n[f++];) d(m, g, a, s);
                        if (r) {
                            if (p > 0)
                                for (; h--;) m[h] || g[h] || (g[h] = J.call(u));
                            g = v(g)
                        }
                        K.apply(u, g), c && !r && g.length > 0 && p + n.length > 1 && t.uniqueSort(u)
                    }
                    return c && (z = x, A = y), m
                };
            return i ? r(a) : a
        }
        var w, C, k, T, E, S, N, q, A, j, D, P, O, L, M, B, F, R, $, H = "sizzle" + 1 * new Date,
            I = e.document,
            z = 0,
            _ = 0,
            W = n(),
            U = n(),
            V = n(),
            Q = function(e, t) {
                return e === t && (D = !0), 0
            },
            X = {}.hasOwnProperty,
            G = [],
            J = G.pop,
            Y = G.push,
            K = G.push,
            Z = G.slice,
            ee = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            re = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
            oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
            ae = new RegExp(ne + "+", "g"),
            se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            ue = new RegExp("^" + ne + "*," + ne + "*"),
            ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            le = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            fe = new RegExp(oe),
            de = new RegExp("^" + re + "$"),
            pe = {
                ID: new RegExp("^#(" + re + ")"),
                CLASS: new RegExp("^\\.(" + re + ")"),
                TAG: new RegExp("^(" + re + "|[*])"),
                ATTR: new RegExp("^" + ie),
                PSEUDO: new RegExp("^" + oe),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            },
            he = /^(?:input|select|textarea|button)$/i,
            me = /^h\d$/i,
            ge = /^[^{]+\{\s*\[native \w/,
            ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ye = /[+~]/,
            be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            xe = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            we = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            Ce = function(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            ke = function() {
                P()
            },
            Te = h(function(e) {
                return e.disabled === !0 && ("form" in e || "label" in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            K.apply(G = Z.call(I.childNodes), I.childNodes), G[I.childNodes.length].nodeType
        } catch (Ee) {
            K = {
                apply: G.length ? function(e, t) {
                    Y.apply(e, Z.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        C = t.support = {}, E = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, P = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : I;
            return r !== O && 9 === r.nodeType && r.documentElement ? (O = r, L = O.documentElement, M = !E(O), I !== O && (n = O.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", ke, !1) : n.attachEvent && n.attachEvent("onunload", ke)), C.attributes = i(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), C.getElementsByTagName = i(function(e) {
                return e.appendChild(O.createComment("")), !e.getElementsByTagName("*").length
            }), C.getElementsByClassName = ge.test(O.getElementsByClassName), C.getById = i(function(e) {
                return L.appendChild(e).id = H, !O.getElementsByName || !O.getElementsByName(H).length
            }), C.getById ? (k.filter.ID = function(e) {
                var t = e.replace(be, xe);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }, k.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && M) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }) : (k.filter.ID = function(e) {
                var t = e.replace(be, xe);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }, k.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && M) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if (n = o.getAttributeNode("id"), n && n.value === e) return [o];
                        for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                            if (n = o.getAttributeNode("id"), n && n.value === e) return [o]
                    }
                    return []
                }
            }), k.find.TAG = C.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : C.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, k.find.CLASS = C.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && M) return t.getElementsByClassName(e)
            }, F = [], B = [], (C.qsa = ge.test(O.querySelectorAll)) && (i(function(e) {
                L.appendChild(e).innerHTML = "<a id='" + H + "'></a><select id='" + H + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && B.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || B.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + H + "-]").length || B.push("~="), e.querySelectorAll(":checked").length || B.push(":checked"), e.querySelectorAll("a#" + H + "+*").length || B.push(".#.+[+~]")
            }), i(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = O.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && B.push("name" + ne + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && B.push(":enabled", ":disabled"), L.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && B.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), B.push(",.*:")
            })), (C.matchesSelector = ge.test(R = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && i(function(e) {
                C.disconnectedMatch = R.call(e, "*"), R.call(e, "[s!='']:x"), F.push("!=", oe)
            }), B = B.length && new RegExp(B.join("|")), F = F.length && new RegExp(F.join("|")), t = ge.test(L.compareDocumentPosition), $ = t || ge.test(L.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, Q = t ? function(e, t) {
                if (e === t) return D = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !C.sortDetached && t.compareDocumentPosition(e) === n ? e === O || e.ownerDocument === I && $(I, e) ? -1 : t === O || t.ownerDocument === I && $(I, t) ? 1 : j ? ee(j, e) - ee(j, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return D = !0, 0;
                var n, r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    s = [e],
                    u = [t];
                if (!i || !o) return e === O ? -1 : t === O ? 1 : i ? -1 : o ? 1 : j ? ee(j, e) - ee(j, t) : 0;
                if (i === o) return a(e, t);
                for (n = e; n = n.parentNode;) s.unshift(n);
                for (n = t; n = n.parentNode;) u.unshift(n);
                for (; s[r] === u[r];) r++;
                return r ? a(s[r], u[r]) : s[r] === I ? -1 : u[r] === I ? 1 : 0
            }, O) : O
        }, t.matches = function(e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== O && P(e), n = n.replace(le, "='$1']"), C.matchesSelector && M && !V[n + " "] && (!F || !F.test(n)) && (!B || !B.test(n))) try {
                var r = R.call(e, n);
                if (r || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (i) {}
            return t(n, O, null, [e]).length > 0
        }, t.contains = function(e, t) {
            return (e.ownerDocument || e) !== O && P(e), $(e, t)
        }, t.attr = function(e, t) {
            (e.ownerDocument || e) !== O && P(e);
            var n = k.attrHandle[t.toLowerCase()],
                r = n && X.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !M) : void 0;
            return void 0 !== r ? r : C.attributes || !M ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, t.escape = function(e) {
            return (e + "").replace(we, Ce)
        }, t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function(e) {
            var t, n = [],
                r = 0,
                i = 0;
            if (D = !C.detectDuplicates, j = !C.sortStable && e.slice(0), e.sort(Q), D) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return j = null, e
        }, T = t.getText = function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += T(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else
                for (; t = e[r++];) n += T(t);
            return n
        }, k = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: pe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(be, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(be, xe), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(be, xe).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = W[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && W(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, n, r) {
                    return function(i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, u) {
                        var c, l, f, d, p, h, m = o !== a ? "nextSibling" : "previousSibling",
                            g = t.parentNode,
                            v = s && t.nodeName.toLowerCase(),
                            y = !u && !s,
                            b = !1;
                        if (g) {
                            if (o) {
                                for (; m;) {
                                    for (d = t; d = d[m];)
                                        if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                    h = m = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? g.firstChild : g.lastChild], a && y) {
                                for (d = g, f = d[H] || (d[H] = {}), l = f[d.uniqueID] || (f[d.uniqueID] = {}), c = l[e] || [], p = c[0] === z && c[1], b = p && c[2], d = p && g.childNodes[p]; d = ++p && d && d[m] || (b = p = 0) || h.pop();)
                                    if (1 === d.nodeType && ++b && d === t) {
                                        l[e] = [z, p, b];
                                        break
                                    }
                            } else if (y && (d = t, f = d[H] || (d[H] = {}), l = f[d.uniqueID] || (f[d.uniqueID] = {}), c = l[e] || [], p = c[0] === z && c[1], b = p), b === !1)
                                for (;
                                    (d = ++p && d && d[m] || (b = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++b || (y && (f = d[H] || (d[H] = {}), l = f[d.uniqueID] || (f[d.uniqueID] = {}), l[e] = [z, b]), d !== t)););
                            return b -= i, b === r || b % r === 0 && b / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, n) {
                    var i, o = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[H] ? o(n) : o.length > 1 ? (i = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                        for (var r, i = o(e, n), a = i.length; a--;) r = ee(e, i[a]), e[r] = !(t[r] = i[a])
                    }) : function(e) {
                        return o(e, 0, i)
                    }) : o
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [],
                        n = [],
                        i = N(e.replace(se, "$1"));
                    return i[H] ? r(function(e, t, n, r) {
                        for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, r, o) {
                        return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                    }
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0
                    }
                }),
                contains: r(function(e) {
                    return e = e.replace(be, xe),
                        function(t) {
                            return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                        }
                }),
                lang: r(function(e) {
                    return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, xe).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = M ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === L
                },
                focus: function(e) {
                    return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: c(!1),
                disabled: c(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !k.pseudos.empty(e)
                },
                header: function(e) {
                    return me.test(e.nodeName)
                },
                input: function(e) {
                    return he.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: l(function() {
                    return [0]
                }),
                last: l(function(e, t) {
                    return [t - 1]
                }),
                eq: l(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: l(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: l(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: l(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: l(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, k.pseudos.nth = k.pseudos.eq;
        for (w in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) k.pseudos[w] = s(w);
        for (w in {
                submit: !0,
                reset: !0
            }) k.pseudos[w] = u(w);
        return d.prototype = k.filters = k.pseudos, k.setFilters = new d, S = t.tokenize = function(e, n) {
            var r, i, o, a, s, u, c, l = U[e + " "];
            if (l) return n ? 0 : l.slice(0);
            for (s = e, u = [], c = k.preFilter; s;) {
                r && !(i = ue.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = ce.exec(s)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(se, " ")
                }), s = s.slice(r.length));
                for (a in k.filter) !(i = pe[a].exec(s)) || c[a] && !(i = c[a](i)) || (r = i.shift(), o.push({
                    value: r,
                    type: a,
                    matches: i
                }), s = s.slice(r.length));
                if (!r) break
            }
            return n ? s.length : s ? t.error(e) : U(e, u).slice(0)
        }, N = t.compile = function(e, t) {
            var n, r = [],
                i = [],
                o = V[e + " "];
            if (!o) {
                for (t || (t = S(e)), n = t.length; n--;) o = b(t[n]), o[H] ? r.push(o) : i.push(o);
                o = V(e, x(i, r)), o.selector = e
            }
            return o
        }, q = t.select = function(e, t, n, r) {
            var i, o, a, s, u, c = "function" == typeof e && e,
                l = !r && S(e = c.selector || e);
            if (n = n || [], 1 === l.length) {
                if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && M && k.relative[o[1].type]) {
                    if (t = (k.find.ID(a.matches[0].replace(be, xe), t) || [])[0], !t) return n;
                    c && (t = t.parentNode),
                        e = e.slice(o.shift().value.length)
                }
                for (i = pe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !k.relative[s = a.type]);)
                    if ((u = k.find[s]) && (r = u(a.matches[0].replace(be, xe), ye.test(o[0].type) && f(t.parentNode) || t))) {
                        if (o.splice(i, 1), e = r.length && p(o), !e) return K.apply(n, r), n;
                        break
                    }
            }
            return (c || N(e, l))(r, t, !M, n, !t || ye.test(e) && f(t.parentNode) || t), n
        }, C.sortStable = H.split("").sort(Q).join("") === H, C.detectDuplicates = !!D, P(), C.sortDetached = i(function(e) {
            return 1 & e.compareDocumentPosition(O.createElement("fieldset"))
        }), i(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), C.attributes && i(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), i(function(e) {
            return null == e.getAttribute("disabled")
        }) || o(te, function(e, t, n) {
            var r;
            if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), t
    }(e);
    me.find = xe, me.expr = xe.selectors, me.expr[":"] = me.expr.pseudos, me.uniqueSort = me.unique = xe.uniqueSort, me.text = xe.getText, me.isXMLDoc = xe.isXML, me.contains = xe.contains, me.escapeSelector = xe.escape;
    var we = function(e, t, n) {
            for (var r = [], i = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (i && me(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        Ce = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        ke = me.expr.match.needsContext,
        Te = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        Ee = /^.[^:#\[\.,]*$/;
    me.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? me.find.matchesSelector(r, e) ? [r] : [] : me.find.matches(e, me.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, me.fn.extend({
        find: function(e) {
            var t, n, r = this.length,
                i = this;
            if ("string" != typeof e) return this.pushStack(me(e).filter(function() {
                for (t = 0; t < r; t++)
                    if (me.contains(i[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) me.find(e, i[t], n);
            return r > 1 ? me.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(o(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(o(this, e || [], !0))
        },
        is: function(e) {
            return !!o(this, "string" == typeof e && ke.test(e) ? me(e) : e || [], !1).length
        }
    });
    var Se, Ne = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
        qe = me.fn.init = function(e, t, n) {
            var r, i;
            if (!e) return this;
            if (n = n || Se, "string" == typeof e) {
                if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : Ne.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof me ? t[0] : t, me.merge(this, me.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : ne, !0)), Te.test(r[1]) && me.isPlainObject(t))
                        for (r in t) me.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return i = ne.getElementById(r[2]), i && (this[0] = i, this.length = 1), this
            }
            return e.nodeType ? (this[0] = e, this.length = 1, this) : me.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(me) : me.makeArray(e, this)
        };
    qe.prototype = me.fn, Se = me(ne);
    var Ae = /^(?:parents|prev(?:Until|All))/,
        je = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    me.fn.extend({
        has: function(e) {
            var t = me(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (me.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && me(e);
            if (!ke.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && me.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(o.length > 1 ? me.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? se.call(me(e), this[0]) : se.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(me.uniqueSort(me.merge(this.get(), me(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), me.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return we(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return we(e, "parentNode", n)
        },
        next: function(e) {
            return a(e, "nextSibling")
        },
        prev: function(e) {
            return a(e, "previousSibling")
        },
        nextAll: function(e) {
            return we(e, "nextSibling")
        },
        prevAll: function(e) {
            return we(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return we(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return we(e, "previousSibling", n)
        },
        siblings: function(e) {
            return Ce((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return Ce(e.firstChild)
        },
        contents: function(e) {
            return i(e, "iframe") ? e.contentDocument : (i(e, "template") && (e = e.content || e), me.merge([], e.childNodes))
        }
    }, function(e, t) {
        me.fn[e] = function(n, r) {
            var i = me.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = me.filter(r, i)), this.length > 1 && (je[e] || me.uniqueSort(i), Ae.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var De = /[^\x20\t\r\n\f]+/g;
    me.Callbacks = function(e) {
        e = "string" == typeof e ? s(e) : me.extend({}, e);
        var t, n, r, i, o = [],
            a = [],
            u = -1,
            c = function() {
                for (i = i || e.once, r = t = !0; a.length; u = -1)
                    for (n = a.shift(); ++u < o.length;) o[u].apply(n[0], n[1]) === !1 && e.stopOnFalse && (u = o.length, n = !1);
                e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
            },
            l = {
                add: function() {
                    return o && (n && !t && (u = o.length - 1, a.push(n)), function r(t) {
                        me.each(t, function(t, n) {
                            me.isFunction(n) ? e.unique && l.has(n) || o.push(n) : n && n.length && "string" !== me.type(n) && r(n)
                        })
                    }(arguments), n && !t && c()), this
                },
                remove: function() {
                    return me.each(arguments, function(e, t) {
                        for (var n;
                            (n = me.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= u && u--
                    }), this
                },
                has: function(e) {
                    return e ? me.inArray(e, o) > -1 : o.length > 0
                },
                empty: function() {
                    return o && (o = []), this
                },
                disable: function() {
                    return i = a = [], o = n = "", this
                },
                disabled: function() {
                    return !o
                },
                lock: function() {
                    return i = a = [], n || t || (o = n = ""), this
                },
                locked: function() {
                    return !!i
                },
                fireWith: function(e, n) {
                    return i || (n = n || [], n = [e, n.slice ? n.slice() : n], a.push(n), t || c()), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return l
    }, me.extend({
        Deferred: function(t) {
            var n = [
                    ["notify", "progress", me.Callbacks("memory"), me.Callbacks("memory"), 2],
                    ["resolve", "done", me.Callbacks("once memory"), me.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", me.Callbacks("once memory"), me.Callbacks("once memory"), 1, "rejected"]
                ],
                r = "pending",
                i = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return o.done(arguments).fail(arguments), this
                    },
                    "catch": function(e) {
                        return i.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return me.Deferred(function(t) {
                            me.each(n, function(n, r) {
                                var i = me.isFunction(e[r[4]]) && e[r[4]];
                                o[r[1]](function() {
                                    var e = i && i.apply(this, arguments);
                                    e && me.isFunction(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    then: function(t, r, i) {
                        function o(t, n, r, i) {
                            return function() {
                                var s = this,
                                    l = arguments,
                                    f = function() {
                                        var e, f;
                                        if (!(t < a)) {
                                            if (e = r.apply(s, l), e === n.promise()) throw new TypeError("Thenable self-resolution");
                                            f = e && ("object" == typeof e || "function" == typeof e) && e.then, me.isFunction(f) ? i ? f.call(e, o(a, n, u, i), o(a, n, c, i)) : (a++, f.call(e, o(a, n, u, i), o(a, n, c, i), o(a, n, u, n.notifyWith))) : (r !== u && (s = void 0, l = [e]), (i || n.resolveWith)(s, l))
                                        }
                                    },
                                    d = i ? f : function() {
                                        try {
                                            f()
                                        } catch (e) {
                                            me.Deferred.exceptionHook && me.Deferred.exceptionHook(e, d.stackTrace), t + 1 >= a && (r !== c && (s = void 0, l = [e]), n.rejectWith(s, l))
                                        }
                                    };
                                t ? d() : (me.Deferred.getStackHook && (d.stackTrace = me.Deferred.getStackHook()), e.setTimeout(d))
                            }
                        }
                        var a = 0;
                        return me.Deferred(function(e) {
                            n[0][3].add(o(0, e, me.isFunction(i) ? i : u, e.notifyWith)), n[1][3].add(o(0, e, me.isFunction(t) ? t : u)), n[2][3].add(o(0, e, me.isFunction(r) ? r : c))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? me.extend(e, i) : i
                    }
                },
                o = {};
            return me.each(n, function(e, t) {
                var a = t[2],
                    s = t[5];
                i[t[1]] = a.add, s && a.add(function() {
                    r = s
                }, n[3 - e][2].disable, n[0][2].lock), a.add(t[3].fire), o[t[0]] = function() {
                    return o[t[0] + "With"](this === o ? void 0 : this, arguments), this
                }, o[t[0] + "With"] = a.fireWith
            }), i.promise(o), t && t.call(o, o), o
        },
        when: function(e) {
            var t = arguments.length,
                n = t,
                r = Array(n),
                i = ie.call(arguments),
                o = me.Deferred(),
                a = function(e) {
                    return function(n) {
                        r[e] = this, i[e] = arguments.length > 1 ? ie.call(arguments) : n, --t || o.resolveWith(r, i)
                    }
                };
            if (t <= 1 && (l(e, o.done(a(n)).resolve, o.reject, !t), "pending" === o.state() || me.isFunction(i[n] && i[n].then))) return o.then();
            for (; n--;) l(i[n], a(n), o.reject);
            return o.promise()
        }
    });
    var Pe = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    me.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && Pe.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }, me.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    };
    var Oe = me.Deferred();
    me.fn.ready = function(e) {
        return Oe.then(e)["catch"](function(e) {
            me.readyException(e)
        }), this
    }, me.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (e === !0 ? --me.readyWait : me.isReady) || (me.isReady = !0, e !== !0 && --me.readyWait > 0 || Oe.resolveWith(ne, [me]))
        }
    }), me.ready.then = Oe.then, "complete" === ne.readyState || "loading" !== ne.readyState && !ne.documentElement.doScroll ? e.setTimeout(me.ready) : (ne.addEventListener("DOMContentLoaded", f), e.addEventListener("load", f));
    var Le = function(e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                c = null == n;
            if ("object" === me.type(n)) {
                i = !0;
                for (s in n) Le(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, me.isFunction(r) || (a = !0), c && (a ? (t.call(e, r), t = null) : (c = t, t = function(e, t, n) {
                    return c.call(me(e), n)
                })), t))
                for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : c ? t.call(e) : u ? t(e[0], n) : o
        },
        Me = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    d.uid = 1, d.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, Me(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[me.camelCase(t)] = n;
            else
                for (r in t) i[me.camelCase(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][me.camelCase(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    Array.isArray(t) ? t = t.map(me.camelCase) : (t = me.camelCase(t), t = t in r ? [t] : t.match(De) || []), n = t.length;
                    for (; n--;) delete r[t[n]]
                }(void 0 === t || me.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !me.isEmptyObject(t)
        }
    };
    var Be = new d,
        Fe = new d,
        Re = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        $e = /[A-Z]/g;
    me.extend({
        hasData: function(e) {
            return Fe.hasData(e) || Be.hasData(e)
        },
        data: function(e, t, n) {
            return Fe.access(e, t, n)
        },
        removeData: function(e, t) {
            Fe.remove(e, t)
        },
        _data: function(e, t, n) {
            return Be.access(e, t, n)
        },
        _removeData: function(e, t) {
            Be.remove(e, t)
        }
    }), me.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = Fe.get(o), 1 === o.nodeType && !Be.get(o, "hasDataAttrs"))) {
                    for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = me.camelCase(r.slice(5)), h(o, r, i[r])));
                    Be.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                Fe.set(this, e)
            }) : Le(this, function(t) {
                var n;
                if (o && void 0 === t) {
                    if (n = Fe.get(o, e), void 0 !== n) return n;
                    if (n = h(o, e), void 0 !== n) return n
                } else this.each(function() {
                    Fe.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                Fe.remove(this, e)
            })
        }
    }), me.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = Be.get(e, t), n && (!r || Array.isArray(n) ? r = Be.access(e, t, me.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = me.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = me._queueHooks(e, t),
                a = function() {
                    me.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Be.get(e, n) || Be.access(e, n, {
                empty: me.Callbacks("once memory").add(function() {
                    Be.remove(e, [t + "queue", n])
                })
            })
        }
    }), me.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? me.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = me.queue(this, e, t);
                me._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && me.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                me.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = me.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --r || i.resolveWith(o, [o])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = Be.get(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var He = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Ie = new RegExp("^(?:([+-])=|)(" + He + ")([a-z%]*)$", "i"),
        ze = ["Top", "Right", "Bottom", "Left"],
        _e = function(e, t) {
            return e = t || e, "none" === e.style.display || "" === e.style.display && me.contains(e.ownerDocument, e) && "none" === me.css(e, "display")
        },
        We = function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i
        },
        Ue = {};
    me.fn.extend({
        show: function() {
            return v(this, !0)
        },
        hide: function() {
            return v(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                _e(this) ? me(this).show() : me(this).hide()
            })
        }
    });
    var Ve = /^(?:checkbox|radio)$/i,
        Qe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Xe = /^$|\/(?:java|ecma)script/i,
        Ge = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Ge.optgroup = Ge.option, Ge.tbody = Ge.tfoot = Ge.colgroup = Ge.caption = Ge.thead, Ge.th = Ge.td;
    var Je = /<|&#?\w+;/;
    ! function() {
        var e = ne.createDocumentFragment(),
            t = e.appendChild(ne.createElement("div")),
            n = ne.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), pe.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", pe.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var Ye = ne.documentElement,
        Ke = /^key/,
        Ze = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        et = /^([^.]*)(?:\.(.+)|)/;
    me.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, u, c, l, f, d, p, h, m, g = Be.get(e);
            if (g)
                for (n.handler && (o = n, n = o.handler, i = o.selector), i && me.find.matchesSelector(Ye, i), n.guid || (n.guid = me.guid++), (u = g.events) || (u = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
                        return "undefined" != typeof me && me.event.triggered !== t.type ? me.event.dispatch.apply(e, arguments) : void 0
                    }), t = (t || "").match(De) || [""], c = t.length; c--;) s = et.exec(t[c]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p && (f = me.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, f = me.event.special[p] || {}, l = me.extend({
                    type: p,
                    origType: m,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && me.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, o), (d = u[p]) || (d = u[p] = [], d.delegateCount = 0, f.setup && f.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(p, a)), f.add && (f.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, l) : d.push(l), me.event.global[p] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, c, l, f, d, p, h, m, g = Be.hasData(e) && Be.get(e);
            if (g && (u = g.events)) {
                for (t = (t || "").match(De) || [""], c = t.length; c--;)
                    if (s = et.exec(t[c]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p) {
                        for (f = me.event.special[p] || {}, p = (r ? f.delegateType : f.bindType) || p, d = u[p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--;) l = d[o], !i && m !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (d.splice(o, 1), l.selector && d.delegateCount--, f.remove && f.remove.call(e, l));
                        a && !d.length && (f.teardown && f.teardown.call(e, h, g.handle) !== !1 || me.removeEvent(e, p, g.handle), delete u[p])
                    } else
                        for (p in u) me.event.remove(e, p + t[c], n, r, !0);
                me.isEmptyObject(u) && Be.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a, s = me.event.fix(e),
                u = new Array(arguments.length),
                c = (Be.get(this, "events") || {})[s.type] || [],
                l = me.event.special[s.type] || {};
            for (u[0] = s, t = 1; t < arguments.length; t++) u[t] = arguments[t];
            if (s.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, s) !== !1) {
                for (a = me.event.handlers.call(this, s, c), t = 0;
                    (i = a[t++]) && !s.isPropagationStopped();)
                    for (s.currentTarget = i.elem, n = 0;
                        (o = i.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, r = ((me.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u), void 0 !== r && (s.result = r) === !1 && (s.preventDefault(), s.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, s), s.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [],
                u = t.delegateCount,
                c = e.target;
            if (u && c.nodeType && !("click" === e.type && e.button >= 1))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== e.type || c.disabled !== !0)) {
                        for (o = [], a = {}, n = 0; n < u; n++) r = t[n], i = r.selector + " ", void 0 === a[i] && (a[i] = r.needsContext ? me(i, this).index(c) > -1 : me.find(i, this, null, [c]).length), a[i] && o.push(r);
                        o.length && s.push({
                            elem: c,
                            handlers: o
                        })
                    }
            return c = this, u < t.length && s.push({
                elem: c,
                handlers: t.slice(u)
            }), s
        },
        addProp: function(e, t) {
            Object.defineProperty(me.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: me.isFunction(t) ? function() {
                    if (this.originalEvent) return t(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[e]
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[me.expando] ? e : new me.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== k() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === k() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && i(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return i(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, me.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, me.Event = function(e, t) {
        return this instanceof me.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? w : C, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && me.extend(this, t), this.timeStamp = e && e.timeStamp || me.now(), void(this[me.expando] = !0)) : new me.Event(e, t)
    }, me.Event.prototype = {
        constructor: me.Event,
        isDefaultPrevented: C,
        isPropagationStopped: C,
        isImmediatePropagationStopped: C,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = w, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = w, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = w, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, me.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && Ke.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Ze.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, me.event.addProp), me.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        me.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return i && (i === r || me.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), me.fn.extend({
        on: function(e, t, n, r) {
            return T(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return T(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, me(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = C), this.each(function() {
                me.event.remove(this, e, n, t)
            })
        }
    });
    var tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        nt = /<script|<style|<link/i,
        rt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        it = /^true\/(.*)/,
        ot = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    me.extend({
        htmlPrefilter: function(e) {
            return e.replace(tt, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0),
                u = me.contains(e.ownerDocument, e);
            if (!(pe.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || me.isXMLDoc(e)))
                for (a = y(s), o = y(e), r = 0, i = o.length; r < i; r++) A(o[r], a[r]);
            if (t)
                if (n)
                    for (o = o || y(e), a = a || y(s), r = 0, i = o.length; r < i; r++) q(o[r], a[r]);
                else q(e, s);
            return a = y(s, "script"), a.length > 0 && b(a, !u && y(e, "script")), s
        },
        cleanData: function(e) {
            for (var t, n, r, i = me.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (Me(n)) {
                    if (t = n[Be.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? me.event.remove(n, r) : me.removeEvent(n, r, t.handle);
                        n[Be.expando] = void 0
                    }
                    n[Fe.expando] && (n[Fe.expando] = void 0)
                }
        }
    }), me.fn.extend({
        detach: function(e) {
            return D(this, e, !0)
        },
        remove: function(e) {
            return D(this, e)
        },
        text: function(e) {
            return Le(this, function(e) {
                return void 0 === e ? me.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return j(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = E(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return j(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = E(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return j(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return j(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (me.cleanData(y(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return me.clone(this, e, t)
            })
        },
        html: function(e) {
            return Le(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !nt.test(e) && !Ge[(Qe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = me.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) t = this[n] || {}, 1 === t.nodeType && (me.cleanData(y(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return j(this, arguments, function(t) {
                var n = this.parentNode;
                me.inArray(this, e) < 0 && (me.cleanData(y(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), me.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        me.fn[e] = function(e) {
            for (var n, r = [], i = me(e), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), me(i[a])[t](n), ae.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var at = /^margin/,
        st = new RegExp("^(" + He + ")(?!px)[a-z%]+$", "i"),
        ut = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        };
    ! function() {
        function t() {
            if (s) {
                s.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Ye.appendChild(a);
                var t = e.getComputedStyle(s);
                n = "1%" !== t.top, o = "2px" === t.marginLeft, r = "4px" === t.width, s.style.marginRight = "50%", i = "4px" === t.marginRight, Ye.removeChild(a), s = null
            }
        }
        var n, r, i, o, a = ne.createElement("div"),
            s = ne.createElement("div");
        s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", pe.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s), me.extend(pe, {
            pixelPosition: function() {
                return t(), n
            },
            boxSizingReliable: function() {
                return t(), r
            },
            pixelMarginRight: function() {
                return t(), i
            },
            reliableMarginLeft: function() {
                return t(), o
            }
        }))
    }();
    var ct = /^(none|table(?!-c[ea]).+)/,
        lt = /^--/,
        ft = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        dt = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        pt = ["Webkit", "Moz", "ms"],
        ht = ne.createElement("div").style;
    me.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = P(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = me.camelCase(t),
                    u = lt.test(t),
                    c = e.style;
                return u || (t = M(s)), a = me.cssHooks[t] || me.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : c[t] : (o = typeof n, "string" === o && (i = Ie.exec(n)) && i[1] && (n = m(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (me.cssNumber[s] ? "" : "px")), pe.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? c.setProperty(t, n) : c[t] = n)), void 0)
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = me.camelCase(t),
                u = lt.test(t);
            return u || (t = M(s)), a = me.cssHooks[t] || me.cssHooks[s], a && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = P(e, t, r)), "normal" === i && t in dt && (i = dt[t]), "" === n || n ? (o = parseFloat(i), n === !0 || isFinite(o) ? o || 0 : i) : i
        }
    }), me.each(["height", "width"], function(e, t) {
        me.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return !ct.test(me.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? R(e, t, r) : We(e, ft, function() {
                    return R(e, t, r)
                })
            },
            set: function(e, n, r) {
                var i, o = r && ut(e),
                    a = r && F(e, t, r, "border-box" === me.css(e, "boxSizing", !1, o), o);
                return a && (i = Ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = me.css(e, t)), B(e, n, a)
            }
        }
    }), me.cssHooks.marginLeft = O(pe.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(P(e, "marginLeft")) || e.getBoundingClientRect().left - We(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), me.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        me.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + ze[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, at.test(e) || (me.cssHooks[e + t].set = B)
    }), me.fn.extend({
        css: function(e, t) {
            return Le(this, function(e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (Array.isArray(t)) {
                    for (r = ut(e), i = t.length; a < i; a++) o[t[a]] = me.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? me.style(e, t, n) : me.css(e, t)
            }, e, t, arguments.length > 1)
        }
    }), me.Tween = $, $.prototype = {
        constructor: $,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || me.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (me.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = $.propHooks[this.prop];
            return e && e.get ? e.get(this) : $.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = $.propHooks[this.prop];
            return this.options.duration ? this.pos = t = me.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : $.propHooks._default.set(this), this
        }
    }, $.prototype.init.prototype = $.prototype, $.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = me.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            },
            set: function(e) {
                me.fx.step[e.prop] ? me.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[me.cssProps[e.prop]] && !me.cssHooks[e.prop] ? e.elem[e.prop] = e.now : me.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, $.propHooks.scrollTop = $.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, me.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, me.fx = $.prototype.init, me.fx.step = {};
    var mt, gt, vt = /^(?:toggle|show|hide)$/,
        yt = /queueHooks$/;
    me.Animation = me.extend(V, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return m(n.elem, e, Ie.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                me.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(De);
                for (var n, r = 0, i = e.length; r < i; r++) n = e[r], V.tweeners[n] = V.tweeners[n] || [], V.tweeners[n].unshift(t)
            },
            prefilters: [W],
            prefilter: function(e, t) {
                t ? V.prefilters.unshift(e) : V.prefilters.push(e)
            }
        }), me.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? me.extend({}, e) : {
                complete: n || !n && t || me.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !me.isFunction(t) && t
            };
            return me.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in me.fx.speeds ? r.duration = me.fx.speeds[r.duration] : r.duration = me.fx.speeds._default), null != r.queue && r.queue !== !0 || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                me.isFunction(r.old) && r.old.call(this), r.queue && me.dequeue(this, r.queue)
            }, r
        }, me.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(_e).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = me.isEmptyObject(e),
                    o = me.speed(t, n, r),
                    a = function() {
                        var t = V(this, me.extend({}, e), o);
                        (i || Be.get(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = null != e && e + "queueHooks",
                        o = me.timers,
                        a = Be.get(this);
                    if (i) a[i] && a[i].stop && r(a[i]);
                    else
                        for (i in a) a[i] && a[i].stop && yt.test(i) && r(a[i]);
                    for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                    !t && n || me.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = Be.get(this),
                        r = n[e + "queue"],
                        i = n[e + "queueHooks"],
                        o = me.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, me.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), me.each(["toggle", "show", "hide"], function(e, t) {
            var n = me.fn[t];
            me.fn[t] = function(e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(z(t, !0), e, r, i)
            }
        }), me.each({
            slideDown: z("show"),
            slideUp: z("hide"),
            slideToggle: z("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            me.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), me.timers = [], me.fx.tick = function() {
            var e, t = 0,
                n = me.timers;
            for (mt = me.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
            n.length || me.fx.stop(), mt = void 0
        }, me.fx.timer = function(e) {
            me.timers.push(e), me.fx.start()
        }, me.fx.interval = 13, me.fx.start = function() {
            gt || (gt = !0, H())
        }, me.fx.stop = function() {
            gt = null
        }, me.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, me.fn.delay = function(t, n) {
            return t = me.fx ? me.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, r) {
                var i = e.setTimeout(n, t);
                r.stop = function() {
                    e.clearTimeout(i)
                }
            })
        },
        function() {
            var e = ne.createElement("input"),
                t = ne.createElement("select"),
                n = t.appendChild(ne.createElement("option"));
            e.type = "checkbox", pe.checkOn = "" !== e.value, pe.optSelected = n.selected, e = ne.createElement("input"), e.value = "t", e.type = "radio", pe.radioValue = "t" === e.value
        }();
    var bt, xt = me.expr.attrHandle;
    me.fn.extend({
        attr: function(e, t) {
            return Le(this, me.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                me.removeAttr(this, e)
            })
        }
    }), me.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? me.prop(e, t, n) : (1 === o && me.isXMLDoc(e) || (i = me.attrHooks[t.toLowerCase()] || (me.expr.match.bool.test(t) ? bt : void 0)), void 0 !== n ? null === n ? void me.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = me.find.attr(e, t), null == r ? void 0 : r))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!pe.radioValue && "radio" === t && i(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0,
                i = t && t.match(De);
            if (i && 1 === e.nodeType)
                for (; n = i[r++];) e.removeAttribute(n)
        }
    }), bt = {
        set: function(e, t, n) {
            return t === !1 ? me.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, me.each(me.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = xt[t] || me.find.attr;
        xt[t] = function(e, t, r) {
            var i, o, a = t.toLowerCase();
            return r || (o = xt[a], xt[a] = i, i = null != n(e, t, r) ? a : null, xt[a] = o), i
        }
    });
    var wt = /^(?:input|select|textarea|button)$/i,
        Ct = /^(?:a|area)$/i;
    me.fn.extend({
        prop: function(e, t) {
            return Le(this, me.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[me.propFix[e] || e]
            })
        }
    }), me.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && me.isXMLDoc(e) || (t = me.propFix[t] || t, i = me.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = me.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : wt.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), pe.optSelected || (me.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), me.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        me.propFix[this.toLowerCase()] = this
    }), me.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (me.isFunction(e)) return this.each(function(t) {
                me(this).addClass(e.call(this, t, X(this)))
            });
            if ("string" == typeof e && e)
                for (t = e.match(De) || []; n = this[u++];)
                    if (i = X(n), r = 1 === n.nodeType && " " + Q(i) + " ") {
                        for (a = 0; o = t[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        s = Q(r), i !== s && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (me.isFunction(e)) return this.each(function(t) {
                me(this).removeClass(e.call(this, t, X(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(De) || []; n = this[u++];)
                    if (i = X(n), r = 1 === n.nodeType && " " + Q(i) + " ") {
                        for (a = 0; o = t[a++];)
                            for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                        s = Q(r), i !== s && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : me.isFunction(e) ? this.each(function(n) {
                me(this).toggleClass(e.call(this, n, X(this), t), t)
            }) : this.each(function() {
                var t, r, i, o;
                if ("string" === n)
                    for (r = 0, i = me(this), o = e.match(De) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else void 0 !== e && "boolean" !== n || (t = X(this), t && Be.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Be.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && (" " + Q(X(n)) + " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var kt = /\r/g;
    me.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0]; {
                if (arguments.length) return r = me.isFunction(e), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, me(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = me.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), t = me.valHooks[this.type] || me.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                });
                if (i) return t = me.valHooks[i.type] || me.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(kt, "") : null == n ? "" : n)
            }
        }
    }), me.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = me.find.attr(e, "value");
                    return null != t ? t : Q(me.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, o = e.options,
                        a = e.selectedIndex,
                        s = "select-one" === e.type,
                        u = s ? null : [],
                        c = s ? a + 1 : o.length;
                    for (r = a < 0 ? c : s ? a : 0; r < c; r++)
                        if (n = o[r], (n.selected || r === a) && !n.disabled && (!n.parentNode.disabled || !i(n.parentNode, "optgroup"))) {
                            if (t = me(n).val(), s) return t;
                            u.push(t)
                        }
                    return u
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = me.makeArray(t), a = i.length; a--;) r = i[a], (r.selected = me.inArray(me.valHooks.option.get(r), o) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), me.each(["radio", "checkbox"], function() {
        me.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = me.inArray(me(e).val(), t) > -1
            }
        }, pe.checkOn || (me.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Tt = /^(?:focusinfocus|focusoutblur)$/;
    me.extend(me.event, {
        trigger: function(t, n, r, i) {
            var o, a, s, u, c, l, f, d = [r || ne],
                p = le.call(t, "type") ? t.type : t,
                h = le.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = s = r = r || ne, 3 !== r.nodeType && 8 !== r.nodeType && !Tt.test(p + me.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."), p = h.shift(), h.sort()), c = p.indexOf(":") < 0 && "on" + p, t = t[me.expando] ? t : new me.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : me.makeArray(n, [t]), f = me.event.special[p] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!i && !f.noBubble && !me.isWindow(r)) {
                    for (u = f.delegateType || p, Tt.test(u + p) || (a = a.parentNode); a; a = a.parentNode) d.push(a), s = a;
                    s === (r.ownerDocument || ne) && d.push(s.defaultView || s.parentWindow || e)
                }
                for (o = 0;
                    (a = d[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? u : f.bindType || p, l = (Be.get(a, "events") || {})[t.type] && Be.get(a, "handle"), l && l.apply(a, n), l = c && a[c], l && l.apply && Me(a) && (t.result = l.apply(a, n), t.result === !1 && t.preventDefault());
                return t.type = p, i || t.isDefaultPrevented() || f._default && f._default.apply(d.pop(), n) !== !1 || !Me(r) || c && me.isFunction(r[p]) && !me.isWindow(r) && (s = r[c], s && (r[c] = null), me.event.triggered = p, r[p](), me.event.triggered = void 0, s && (r[c] = s)), t.result
            }
        },
        simulate: function(e, t, n) {
            var r = me.extend(new me.Event, n, {
                type: e,
                isSimulated: !0
            });
            me.event.trigger(r, null, t)
        }
    }), me.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                me.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return me.event.trigger(e, t, n, !0)
        }
    }), me.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        me.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), me.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), pe.focusin = "onfocusin" in e, pe.focusin || me.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            me.event.simulate(t, e.target, me.event.fix(e))
        };
        me.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = Be.access(r, t);
                i || r.addEventListener(e, n, !0), Be.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = Be.access(r, t) - 1;
                i ? Be.access(r, t, i) : (r.removeEventListener(e, n, !0), Be.remove(r, t))
            }
        }
    });
    var Et = e.location,
        St = me.now(),
        Nt = /\?/;
    me.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (r) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || me.error("Invalid XML: " + t), n
    };
    var qt = /\[\]$/,
        At = /\r?\n/g,
        jt = /^(?:submit|button|image|reset|file)$/i,
        Dt = /^(?:input|select|textarea|keygen)/i;
    me.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                var n = me.isFunction(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (Array.isArray(e) || e.jquery && !me.isPlainObject(e)) me.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) G(n, e[n], t, i);
        return r.join("&")
    }, me.fn.extend({
        serialize: function() {
            return me.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = me.prop(this, "elements");
                return e ? me.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !me(this).is(":disabled") && Dt.test(this.nodeName) && !jt.test(e) && (this.checked || !Ve.test(e))
            }).map(function(e, t) {
                var n = me(this).val();
                return null == n ? null : Array.isArray(n) ? me.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(At, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(At, "\r\n")
                }
            }).get()
        }
    });
    var Pt = /%20/g,
        Ot = /#.*$/,
        Lt = /([?&])_=[^&]*/,
        Mt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Bt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Ft = /^(?:GET|HEAD)$/,
        Rt = /^\/\//,
        $t = {},
        Ht = {},
        It = "*/".concat("*"),
        zt = ne.createElement("a");
    zt.href = Et.href, me.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Et.href,
            type: "GET",
            isLocal: Bt.test(Et.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": It,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": me.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? K(K(e, me.ajaxSettings), t) : K(me.ajaxSettings, e)
        },
        ajaxPrefilter: J($t),
        ajaxTransport: J(Ht),
        ajax: function(t, n) {
            function r(t, n, r, s) {
                var c, d, p, x, w, C = n;
                l || (l = !0, u && e.clearTimeout(u), i = void 0, a = s || "", k.readyState = t > 0 ? 4 : 0, c = t >= 200 && t < 300 || 304 === t, r && (x = Z(h, k, r)), x = ee(h, x, k, c), c ? (h.ifModified && (w = k.getResponseHeader("Last-Modified"), w && (me.lastModified[o] = w), w = k.getResponseHeader("etag"), w && (me.etag[o] = w)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = x.state, d = x.data, p = x.error, c = !p)) : (p = C, !t && C || (C = "error", t < 0 && (t = 0))), k.status = t, k.statusText = (n || C) + "", c ? v.resolveWith(m, [d, C, k]) : v.rejectWith(m, [k, C, p]), k.statusCode(b), b = void 0, f && g.trigger(c ? "ajaxSuccess" : "ajaxError", [k, h, c ? d : p]), y.fireWith(m, [k, C]), f && (g.trigger("ajaxComplete", [k, h]), --me.active || me.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var i, o, a, s, u, c, l, f, d, p, h = me.ajaxSetup({}, n),
                m = h.context || h,
                g = h.context && (m.nodeType || m.jquery) ? me(m) : me.event,
                v = me.Deferred(),
                y = me.Callbacks("once memory"),
                b = h.statusCode || {},
                x = {},
                w = {},
                C = "canceled",
                k = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (l) {
                            if (!s)
                                for (s = {}; t = Mt.exec(a);) s[t[1].toLowerCase()] = t[2];
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return l ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == l && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, x[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == l && (h.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (l) k.always(e[k.status]);
                            else
                                for (t in e) b[t] = [b[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || C;
                        return i && i.abort(t), r(0, t), this
                    }
                };
            if (v.promise(k), h.url = ((t || h.url || Et.href) + "").replace(Rt, Et.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(De) || [""], null == h.crossDomain) {
                c = ne.createElement("a");
                try {
                    c.href = h.url, c.href = c.href, h.crossDomain = zt.protocol + "//" + zt.host != c.protocol + "//" + c.host
                } catch (T) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = me.param(h.data, h.traditional)), Y($t, h, n, k), l) return k;
            f = me.event && h.global, f && 0 === me.active++ && me.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Ft.test(h.type), o = h.url.replace(Ot, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(Pt, "+")) : (p = h.url.slice(o.length), h.data && (o += (Nt.test(o) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (o = o.replace(Lt, "$1"), p = (Nt.test(o) ? "&" : "?") + "_=" + St++ + p), h.url = o + p), h.ifModified && (me.lastModified[o] && k.setRequestHeader("If-Modified-Since", me.lastModified[o]), me.etag[o] && k.setRequestHeader("If-None-Match", me.etag[o])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && k.setRequestHeader("Content-Type", h.contentType), k.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + It + "; q=0.01" : "") : h.accepts["*"]);
            for (d in h.headers) k.setRequestHeader(d, h.headers[d]);
            if (h.beforeSend && (h.beforeSend.call(m, k, h) === !1 || l)) return k.abort();
            if (C = "abort", y.add(h.complete), k.done(h.success), k.fail(h.error), i = Y(Ht, h, n, k)) {
                if (k.readyState = 1, f && g.trigger("ajaxSend", [k, h]), l) return k;
                h.async && h.timeout > 0 && (u = e.setTimeout(function() {
                    k.abort("timeout")
                }, h.timeout));
                try {
                    l = !1, i.send(x, r)
                } catch (T) {
                    if (l) throw T;
                    r(-1, T)
                }
            } else r(-1, "No Transport");
            return k
        },
        getJSON: function(e, t, n) {
            return me.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return me.get(e, void 0, t, "script")
        }
    }), me.each(["get", "post"], function(e, t) {
        me[t] = function(e, n, r, i) {
            return me.isFunction(n) && (i = i || r, r = n, n = void 0), me.ajax(me.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            }, me.isPlainObject(e) && e))
        }
    }), me._evalUrl = function(e) {
        return me.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }, me.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (me.isFunction(e) && (e = e.call(this[0])), t = me(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(e) {
            return me.isFunction(e) ? this.each(function(t) {
                me(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = me(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = me.isFunction(e);
            return this.each(function(n) {
                me(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                me(this).replaceWith(this.childNodes)
            }), this
        }
    }), me.expr.pseudos.hidden = function(e) {
        return !me.expr.pseudos.visible(e)
    }, me.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, me.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    };
    var _t = {
            0: 200,
            1223: 204
        },
        Wt = me.ajaxSettings.xhr();
    pe.cors = !!Wt && "withCredentials" in Wt, pe.ajax = Wt = !!Wt, me.ajaxTransport(function(t) {
        var n, r;
        if (pe.cors || Wt && !t.crossDomain) return {
            send: function(i, o) {
                var a, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (a in t.xhrFields) s[a] = t.xhrFields[a];
                t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (a in i) s.setRequestHeader(a, i[a]);
                n = function(e) {
                    return function() {
                        n && (n = r = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(_t[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), r = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                    4 === s.readyState && e.setTimeout(function() {
                        n && r()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (u) {
                    if (n) throw u
                }
            },
            abort: function() {
                n && n()
            }
        }
    }), me.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), me.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return me.globalEval(e), e
            }
        }
    }), me.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), me.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = me("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                    }), ne.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Ut = [],
        Vt = /(=)\?(?=&|$)|\?\?/;
    me.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Ut.pop() || me.expando + "_" + St++;
            return this[e] = !0, e
        }
    }), me.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, a, s = t.jsonp !== !1 && (Vt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = me.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Vt, "$1" + i) : t.jsonp !== !1 && (t.url += (Nt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return a || me.error(i + " was not called"), a[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            a = arguments
        }, r.always(function() {
            void 0 === o ? me(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Ut.push(i)), a && me.isFunction(o) && o(a[0]), a = o = void 0
        }), "script"
    }), pe.createHTMLDocument = function() {
        var e = ne.implementation.createHTMLDocument("").body;
        return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
    }(), me.parseHTML = function(e, t, n) {
        if ("string" != typeof e) return [];
        "boolean" == typeof t && (n = t, t = !1);
        var r, i, o;
        return t || (pe.createHTMLDocument ? (t = ne.implementation.createHTMLDocument(""), r = t.createElement("base"), r.href = ne.location.href, t.head.appendChild(r)) : t = ne), i = Te.exec(e), o = !n && [], i ? [t.createElement(i[1])] : (i = x([e], t, o), o && o.length && me(o).remove(), me.merge([], i.childNodes))
    }, me.fn.load = function(e, t, n) {
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return s > -1 && (r = Q(e.slice(s)), e = e.slice(0, s)), me.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && me.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(r ? me("<div>").append(me.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, me.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        me.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), me.expr.pseudos.animated = function(e) {
        return me.grep(me.timers, function(t) {
            return e === t.elem
        }).length
    }, me.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, c, l = me.css(e, "position"),
                f = me(e),
                d = {};
            "static" === l && (e.style.position = "relative"), s = f.offset(), o = me.css(e, "top"), u = me.css(e, "left"), c = ("absolute" === l || "fixed" === l) && (o + u).indexOf("auto") > -1, c ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), me.isFunction(t) && (t = t.call(e, n, me.extend({}, s))), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + i), "using" in t ? t.using.call(e, d) : f.css(d)
        }
    }, me.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                me.offset.setOffset(this, e, t)
            });
            var t, n, r, i, o = this[0];
            if (o) return o.getClientRects().length ? (r = o.getBoundingClientRect(), t = o.ownerDocument, n = t.documentElement, i = t.defaultView, {
                top: r.top + i.pageYOffset - n.clientTop,
                left: r.left + i.pageXOffset - n.clientLeft
            }) : {
                top: 0,
                left: 0
            }
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === me.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), i(e[0], "html") || (r = e.offset()), r = {
                    top: r.top + me.css(e[0], "borderTopWidth", !0),
                    left: r.left + me.css(e[0], "borderLeftWidth", !0)
                }), {
                    top: t.top - r.top - me.css(n, "marginTop", !0),
                    left: t.left - r.left - me.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === me.css(e, "position");) e = e.offsetParent;
                return e || Ye
            })
        }
    }), me.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        me.fn[e] = function(r) {
            return Le(this, function(e, r, i) {
                var o;
                return me.isWindow(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i ? o ? o[t] : e[r] : void(o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i)
            }, e, r, arguments.length)
        }
    }), me.each(["top", "left"], function(e, t) {
        me.cssHooks[t] = O(pe.pixelPosition, function(e, n) {
            if (n) return n = P(e, t), st.test(n) ? me(e).position()[t] + "px" : n
        })
    }), me.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        me.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            me.fn[r] = function(i, o) {
                var a = arguments.length && (n || "boolean" != typeof i),
                    s = n || (i === !0 || o === !0 ? "margin" : "border");
                return Le(this, function(t, n, i) {
                    var o;
                    return me.isWindow(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? me.css(t, n, s) : me.style(t, n, i, s)
                }, t, a ? i : void 0, a)
            }
        })
    }), me.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), me.holdReady = function(e) {
        e ? me.readyWait++ : me.ready(!0)
    }, me.isArray = Array.isArray, me.parseJSON = JSON.parse, me.nodeName = i, "function" == typeof define && define.amd && define("jquery", [], function() {
        return me
    });
    var Qt = e.jQuery,
        Xt = e.$;
    return me.noConflict = function(t) {
        return e.$ === me && (e.$ = Xt), t && e.jQuery === me && (e.jQuery = Qt), me
    }, t || (e.jQuery = e.$ = me), me
}), $.fn.createSearchBar = function() {
    function e() {
        n(), $(window).on("orientationchange resize", function() {
            t()
        }).resize(), a.hasClass("initSearch") ? u.on("click", function(e) {
            e.preventDefault(), "" !== s.val() && a.find("form").submit()
        }) : (u.on("click", function(e) {
            e.preventDefault(), "" !== s.val() ? a.find("form").submit() : c || s.is(":focus") ? i() : (r(), s.focus())
        }), s.on("blur", function() {
            a.is(":hover") || i()
        }), $(window).on("scroll", function() {
            a.hasClass("searchOpened") && (o.hasClass("home") || "mobile" === Core.viewport || "phablet" === Core.viewport || i())
        }))
    }

    function t() {
        o.hasClass("home") || "mobile" === Core.viewport || "phablet" === Core.viewport ? (o.hasClass("home") && a.addClass("initSearch"), r()) : i()
    }

    function n() {
        s.val("")
    }

    function r() {
        a.addClass("searchOpened"), u.attr("title", a.data("search-opened")), u.html(a.data("search-opened")), c = !0
    }

    function i() {
        u.attr("title", a.attr("data-search-closed")), u.html(a.attr("data-search-closed")), a.removeClass("searchOpened"), a.find(".clearField").removeClass("active"), n(), c = !1
    }
    var o = $("body"),
        a = $("#searchForm"),
        s = a.find(".searchInput"),
        u = a.find(".searchSubmit"),
        c = (window.getComputedStyle(document.body, ":after").getPropertyValue("content") || "desktop", !1);
    e()
}, $.fn.mobileNavigation = function() {
    var e, t = $(this);
    if (t.length > 0) {
        var n = t.attr("data-mobilebtntxt") || "Menu",
            r = t.attr("data-closemobilenavtxt") || "Sluiten";
        t.addClass("loaded"), createToggleBtn = function() {
            e || (e = $("<button/>", {
                "class": "toggleNav",
                html: "<span>" + n + "</span>"
            }), e.insertBefore(t), toggleBtn())
        }, removeToggleBtn = function() {
            e && (e.remove(), e = "")
        }, toggleBtn = function() {
            e && e.on("click", function() {
                t.hasClass("navOpen") ? closeNav() : openNav()
            })
        }, openNav = function() {
            t.addClass("navOpen"), e.addClass("navOpen"), e.find("span").html(r)
        }, closeNav = function() {
            t.removeClass("navOpen"), e.removeClass("navOpen"), e.find("span").html(n)
        }, checkMobileNav = function() {
            "mobile" === Core.viewport || "phablet" === Core.viewport ? createToggleBtn() : removeToggleBtn()
        }, window.attachEvent ? window.attachEvent("onresize", function() {
            checkMobileNav()
        }) : window.addEventListener && window.addEventListener("resize", function() {
            checkMobileNav()
        }, !0), $(window).scroll(function(e) {
            t.hasClass("navOpen") && closeNav()
        }), checkMobileNav()
    }
}, $.fn.createSkipLinks = function() {
    function e() {
        var e = t.find("span").first();
        e.remove(), t.find("a").prepend("<span>" + e.html() + "</span> ")
    }
    var t = $(this);
    e()
}, $.fn.createStickyNavbar = function() {
    function e() {
        f === !1 && (f = !0, $(window).scroll(function(e) {
            if (a()) {
                m = s.outerHeight();
                var t = h + m,
                    u = $(this).scrollTop();
                if (u > t) {
                    i();
                    var c = Math.abs(d - u);
                    c > p && (d > u ? l || n() : l && r(), d = u)
                } else u < h && o()
            }
        }))
    }

    function t() {
        l && (m = s.outerHeight(), u.hasClass("fixedNav") && c.css("margin-bottom", m + "px"))
    }

    function n() {
        u.removeClass("fixedNavUp").addClass("fixedNavDown"), l = !0
    }

    function r() {
        u.removeClass("fixedNavDown").addClass("fixedNavUp"), l = !1
    }

    function i() {
        u.addClass("fixedNav"), c.css("margin-bottom", m + "px")
    }

    function o() {
        u.removeClass("fixedNavDown"), u.removeClass("fixedNavUp"), u.removeClass("fixedNav"), c.css("margin-bottom", "0px"), l = !1
    }

    function a() {
        return "mobile" === Core.viewport || "phablet" === Core.viewport ? (e(), !0) : void o()
    }
    var s = $(this),
        u = $("html"),
        c = $("#header"),
        l = !1,
        f = !1,
        d = $(window).scrollTop(),
        p = 20,
        h = s.offset().top,
        m = 0;
    window.attachEvent ? window.attachEvent("onresize", function() {
        t(), a()
    }) : window.addEventListener && window.addEventListener("resize", function() {
        t(), a()
    }, !0), a()
}, $(window).on("load", function() {
    $("#navBar").length > 0 && ($(".mainNav").mobileNavigation(), $(".search").createSearchBar(), $(".skiplinks").createSkipLinks(), $("#navBar").createStickyNavbar())
}), $.fn.clearfields = function() {
    function e(e, t) {
        e.val("").focus(), t.removeClass("active")
    }

    function t(e, t) {
        "" !== e.val() ? t.addClass("active") : t.removeClass("active")
    }
    return this.each(function() {
        var n = $(this),
            r = "clearFieldWrapper";
        n.hasClass("autosize") && (r += " autosize");
        var i = $("<div/>", {
                "class": r,
                html: ""
            }),
            o = $("<button/>", {
                "class": "clearField",
                type: "button",
                html: "invoer wissen"
            });
        n.wrap(i), o.insertAfter(n), o.on("click", function() {
            e(n, o)
        }), t(n, o), n.on("keyup", function() {
            t(n, o)
        }), n.on("change", function() {
            t(n, o)
        })
    })
}, $('#search-form input[type="text"]').not(".date").clearfields(), $('#main input[type="text"], #aside input[type="text"]').not(".date").clearfields();
var Core = {},
    Cookies = {},
    Cookiebar = {},
    Surveybar = {},
    _paq = _paq || [];
! function(e, t) {
    function n(e, t) {
        var n = new RegExp("\\b" + t + "\\b");
        return "*" === t || n.test(e.className)
    }

    function r(e, t) {
        if (null === e) return !1;
        if (n(e, t)) {
            var r = e.className.match(" " + t) ? " " + t : t;
            e.className = e.className.replace(r, "")
        }
        return e
    }

    function o(e, t) {
        return null !== e && (n(e, t) || (e.className += e.className ? " " + t : t), e)
    }

    function a(e, t) {
        return null !== e && (n(e, t) ? r(e, t) : o(e, t), e)
    }

    function s() {
        var e = window.location.hostname;
        return e.substring(e.lastIndexOf(".", e.lastIndexOf(".") - 1) + 1)
    }

    function u() {
        var e = document.getElementsByTagName("body")[0],
            t = e.getAttribute("data-stats") || "",
            n = e.getAttribute("data-trackerurl") || "statistiek.rijksoverheid.nl/piwik/",
            r = parseInt(e.getAttribute("data-statssiteid")) || 0,
            o = parseInt(e.getAttribute("data-linktrackingtimer")) || 500,
            a = parseInt(e.getAttribute("data-hartbeattrackingtimer"));
        if (r) {
            if (_paq.push(["setDomains", document.domain]), _paq.push(["enableLinkTracking"]), _paq.push(["setLinkTrackingTimer", o]), a && (a < 10 && (a = 10), _paq.push(["enableHeartBeatTimer", a])), _paq.push(["setTrackerUrl", "//" + n + "piwik.php"]), _paq.push(["setSiteId", r]), t) {
                var s = t.split(";");
                for (i = 0, l = s.length; i < l; i++) "" !== s[i] && (customParamParts = s[i].split(":"), _paq.push(["setCustomVariable", "" + (i + 1), customParamParts[0], customParamParts[1], "page"]))
            }
            var u = document.getElementById("search-filter-form") || "";
            if (u) {
                var c = window.location.pathname.split("/").pop(),
                    f = parseInt(u.getAttribute("data-searchresultscount")) || 0,
                    d = u.getAttribute("data-searchkeyword");
                d && _paq.push(["trackSiteSearch", d, c, f])
            }
            _paq.push(["trackPageView"]), require(["//" + n + "piwik.js"])
        }
    }
    "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }), "undefined" != typeof t.console && "undefined" != typeof t.console.log || (t.console = {
        log: function() {}
    }), e.getElementsByClassName || (t.getElementsByClassName = function(e, t) {
        null === t && (t = document);
        for (var r = [], i = t.getElementsByTagName("*"), o = 0, a = i.length; o < a; o++) n(i[o], e) && r.push(i[o]);
        return r
    }, e.getElementsByClassName = function(e) {
        return t.getElementsByClassName(e, document)
    });
    String.prototype.hashCode = function() {
        var e, t, n = 0,
            r = this.length;
        if (0 === r) return n;
        for (e = 0; e < r; e++) t = this.charCodeAt(e), n = (n << 5) - n + t, n &= n;
        return n
    }, Cookies = {
        supported: !1,
        domain: "",
        init: function() {
            var e, n, r, i, o, a, s = this,
                u = t.location.hostname.split(".");
            u.length;
            for (e in this)
                if (this.hasOwnProperty(e)) {
                    if ("function" == typeof this[e]) continue;
                    this[e] = void 0
                }
            if (s.domain = t.location.hostname, s.test())
                for (a = document.cookie.split("; "), e = 0, n = a.length; e < n; e++) r = a[e].indexOf("="), r !== -1 && (i = a[e].substr(0, r), o = a[e].substr(r + 1, a[e].length), s[i] = o)
        },
        test: function() {
            var e = this;
            return e.create("deeg", "waar", 1), null !== e.read("deeg") && (e.supported = !0, e.erase("deeg")), e
        },
        create: function(e, t, n) {
            var r, i = this,
                o = "";
            n && (r = new Date, r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3), o = "; expires=" + r.toGMTString());
            var a = "";
            "https:" === document.location.protocol && (a = "secure;"), document.cookie = e + "=" + t + o + "; path=/ ; domain=" + i.domain + "; " + a, this[e] = t
        },
        read: function(e) {
            for (var t, n = e + "=", r = document.cookie.split(";"), i = 0, o = r.length; i < o; i++) {
                for (t = r[i];
                    " " === t.charAt(0);) t = t.substring(1, t.length);
                if (0 === t.indexOf(n)) return t.substring(n.length, t.length)
            }
            return null
        },
        erase: function(e) {
            this.create(e, "", -1), this[e] = void 0
        },
        eraseAll: function() {
            for (var e in this)
                if (this.hasOwnProperty(e)) {
                    if ("function" == typeof this[e]) continue;
                    this.erase(e)
                }
        }
    }, Cookiebar = {
        cookiename: "toestemmingvoorcookies",
        cookievalues: {
            accept: "ja",
            deny: "nee",
            implicit: "ja"
        },
        lifespan: 1825,
        callback: function(e) {
            var t = this;
            Cookies.create(t.cookiename, t.cookievalues[e], t.lifespan)
        },
        init: function(t) {
            function n(e) {
                e.onclick = function(e) {
                    var t = this.href;
                    setTimeout(function() {
                        window.location.href = t
                    }, 500), f.callback("implicit");
                    var n = e || window.event;
                    return n.stopPropagation ? n.stopPropagation() : n.cancelBubble = !0, !1
                }
            }
            var r, i, o, a, u, c, l, f = this,
                d = (e.getElementsByTagName("html")[0], e.getElementsByTagName("body")[0]);
            for (var p in t) this.hasOwnProperty(p) && (f[p] = t[p] || f[p]);
            if (!("object" != typeof Cookies || !Cookies.supported || "undefined" != typeof window.navigator.doNotTrack && "yes" === window.navigator.doNotTrack || "undefined" != typeof window.navigator.msDoNotTrack && "yes" === window.navigator.msDoNotTrack || d.className.indexOf("nocookiebar") > -1 || null !== Cookies.read(f.cookiename))) {
                var h = d.getAttribute("data-cookiebody") || "{sitenaam} gebruikt cookies om het gebruik van de website te analyseren en het gebruiksgemak te verbeteren. Lees meer over",
                    m = d.getAttribute("data-cookieurltext") || "cookies";
                o = e.createTextNode(h.replace("{sitenaam}", s()) + " "), c = e.createTextNode("."), u = e.createTextNode(m), a = e.createElement("a"), a.setAttribute("href", d.getAttribute("data-cookieinfourl") ? d.getAttribute("data-cookieinfourl") : "/cookies/"), a.setAttribute("id", "cookieinfo"), a.onclick = function(e) {
                    var t = e || window.event;
                    t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
                }, a.appendChild(u), i = e.createElement("p"), i.appendChild(o), i.appendChild(a), i.appendChild(c), r = e.createElement("div"), r.className = "site message cookie", l = e.createElement("div"), l.className = "wrapper", r.appendChild(l), l.appendChild(i), d.insertBefore(r, d.getElementsByTagName("div")[0]);
                for (var g = e.getElementById("mainwrapper").getElementsByTagName("a"), v = 0, y = g.length; v < y; v++) "string" == typeof g[v].href && g[v].href.indexOf("#") < 0 && n(g[v])
            }
        }
    }, Surveybar = {
        showsurvey: "false",
        surveyurl: "",
        surveyincidence: 50,
        surveytimethreshold: 30,
        surveyclickthreshold: 2,
        close: function(t, n) {
            Cookies.erase("surveyvisits"), Cookies.create("surveyinvitestatus", n, 100), e.getElementsByTagName("body")[0].removeChild(t)
        },
        init: function(t) {
            var n = this,
                r = (e.getElementsByTagName("html")[0], e.getElementsByTagName("body")[0]);
            n.surveyurl = r.getAttribute("data-surveyurl") || "";
            for (var i in t) n[i] = t[i] || n[i];
            if (Cookies.supported && "" !== n.surveyurl) {
                n.surveyincidence = parseInt(r.getAttribute("data-surveyincidence"), 10) || n.surveyincidence, n.surveytimethreshold = parseInt(r.getAttribute("data-surveytimethreshold"), 10) || n.surveytimethreshold, n.surveyclickthreshold = parseInt(r.getAttribute("data-surveyclickthreshold"), 10) || n.surveyclickthreshold;
                var o = (new Date).getTime();
                Cookies.read("surveyinvitestatus") || (Cookies.create("surveyinvitestatus", "tracking", 100), Cookies.create("surveyvisittime", o, 100));
                var a, u = Cookies.read("surveyinvitestatus") || "",
                    c = parseInt(Cookies.read("surveyvisittime") - 1e3, 10),
                    l = c > 0 ? o - c : 0,
                    f = !0,
                    d = "",
                    p = Math.floor(Math.random() * n.surveyincidence);
                if ("invited" === u ? p = 0 : "tracking" === u ? (Cookies.read("surveyvisits") && (d = parseInt(Cookies.read("surveyvisits"))), d += 1, Cookies.create("surveyvisits", d, 100), a = 1e3 * n.surveytimethreshold, (n.surveyclickthreshold > d || l < a) && (f = !1)) : "accepted" === u || "declined" === u ? (a = 78624e5, l > 0 && l < a && (f = !1)) : f = !1, f && !(p > 1)) {
                    var h, m, g, v, y, b, x, w;
                    h = r.getAttribute("data-surveybody") || "Help mee {sitenaam} te verbeteren.", h = e.createTextNode(h.replace("{sitenaam}", s()) + " "), m = e.createTextNode(r.getAttribute("data-surveyaccept") || "vul de enquete in"), g = e.createTextNode(r.getAttribute("data-surveydecline") || "Nee, bedankt."), v = e.createElement("a"), v.setAttribute("href", n.surveyurl), v.setAttribute("id", "survey-yes"), v.setAttribute("target", "_blank"), v.onclick = function() {
                        n.close(this.parentNode.parentNode.parentNode, "accepted");
                    }, v.appendChild(m), y = e.createElement("a"), y.setAttribute("href", "#"), y.setAttribute("id", "survey-no"), y.onclick = function(e) {
                        return e.preventDefault(), n.close(this.parentNode.parentNode, "declined"), !1
                    }, y.appendChild(g), b = e.createElement("p"), b.appendChild(h), x = e.createElement("div"), x.className = "site message survey", w = e.createElement("div"), w.className = "wrapper", x.appendChild(w), w.appendChild(b), w.appendChild(v), w.appendChild(y), r.insertBefore(x, r.getElementsByTagName("div")[0]), Cookies.create("surveyinvitestatus", "invited", 100)
                }
            }
        }
    }, Core = {
        debug: !1,
        minify: ".min",
        showcookiebar: "false",
        navtype: "reg",
        viewport: "mobile",
        setScreenType: function() {
            var e = function() {
                Core.viewport = window.getComputedStyle(document.body, ":after").getPropertyValue("content").replace(/[^0-9a-zA-Z]/g, "") || "mobile"
            };
            window.attachEvent ? window.attachEvent("onresize", function() {
                e()
            }) : window.addEventListener && window.addEventListener("resize", function() {
                e()
            }, !0), e()
        },
        testSingleSelector: function(t) {
            return "." === t.charAt(0) ? e.getElementsByClassName(t.substr(1)).length > 0 : "#" === t.charAt(0) ? e.getElementById(t.substr(1)) : e.getElementsByTagName(t).length > 0
        },
        testSelectors: function(e) {
            for (var t = !1, n = 0; n < e.length; n++) t = t || this.testSingleSelector(e[n]);
            return t
        },
        sizer: function(e) {
            var t = e + "";
            return "small" === t ? Modernizr.mq("screen and (max-width:35.99em)") : "medium" === t ? Modernizr.mq("screen and (min-width:36em) and (max-width:49.99em)") : "big" === t ? Modernizr.mq("screen and (min-width:50em)") : t.indexOf("em") !== -1 ? Modernizr.mq("screen and (min-width:" + t + ")") : Modernizr.mq("screen and (min-width:" + t + "px)")
        },
        getOptimalViewportImage: function(e, t, n) {
            var r = ["thumbnail", "small", "medium", "large", "widescreen"],
                o = "",
                a = "",
                s = e.split("/");
            for (i = 0, l = r.length; i < l; i++)
                for (i2 = 0, l2 = s.length; i2 < l2; i2++) r[i] === s[i2] && (o = r[i]);
            return "desktop" === Core.viewport ? a = "widescreen" === n ? "widescreen" : "large" === n ? "large" : "medium" === n ? "medium" : "large" : "tablet" === Core.viewport ? a = "large" === n ? "large" : "medium" === n ? "medium" : "large" : (a = "small", a = "small" === t ? "small" : "medium" === t ? "medium" : "large" === t ? "large" : "small"), "" !== o && "" !== a && (e = e.replace("/" + o, "/" + a)), e
        },
        checkSearchFormSubmit: function() {
            var e = document.getElementById("search-form");
            null != e && (e.onsubmit = function() {
                var e = document.getElementById("search-keyword");
                "" === e.value && (e.disabled = "true")
            })
        },
        fixSkiplinks: function() {
            window.addEventListener && window.addEventListener("hashchange", function() {
                var e = document.getElementById(location.hash.substring(1));
                e && (/^(?:a|select|input|button|textarea)$/i.test(e.tagName) || (e.tabIndex = -1), e.focus())
            }, !1)
        },
        fold: function(e, t) {
            return a(e, "hide"), null !== t && void(t.onclick = function() {
                return a(e, "hide"), a(t, "active"), !1
            })
        },
        foldList: function() {
            var t, n, r, i, o, a, s, u, c, l, f, d, p, h = this,
                m = e.getElementsByClassName("topic"),
                g = e.getElementsByClassName("list"),
                v = e.getElementsByClassName("thematic").length > 0,
                y = e.getElementById("sitemap");
            for (d = 0, p = m.length; d < p; d++) o = m[d].getElementsByTagName("h2")[0], "undefined" != typeof o && (a = o.getElementsByTagName("label")[0], i = m[d].getElementsByClassName ? m[d].getElementsByClassName("subtopics")[0] : window.getElementsByClassName("subtopics", m[d])[0], h.fold(i, o), "undefined" != typeof a && (s = a.getElementsByTagName("input")[0], h.stopClick(s), h.stopClick36emUp(a)), v && (u = o.getElementsByTagName("a")[0], l = u.childNodes[0].nodeValue, c = u.cloneNode(!0), f = e.createElement("p"), f.className = "more", f.appendChild(c), i.insertBefore(f, i.childNodes[0]), h.stopClick36emUp(u)));
            for (null !== y && (t = y.getElementsByTagName("h2")[0], n = t.getElementsByTagName("a")[0], r = y.getElementsByTagName("div")[0], h.fold(r, t), "undefined" != typeof n && h.stopClick36emUp(n)), d = 0, p = g.length; d < p; d++) o = g[d].getElementsByTagName("h2")[0], "undefined" != typeof o && (i = g[d].getElementsByClassName ? g[d].getElementsByClassName("sublist")[0] : window.getElementsByClassName("sublist", g[d])[0], h.fold(i, o))
        },
        stopClick: function(e) {
            e.onclick = function(e) {
                var t = e || window.event;
                t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
            }
        },
        stopClick36emUp: function(e) {
            e.onclick = function(e) {
                if (!Core.sizer("small")) {
                    var t = e || window.event;
                    t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
                }
            }
        },
        checkLogoVersion: function() {
            var e = document.getElementById("logotype");
            if (e) {
                var t = "desktop",
                    n = e.src;
                window.onload = function() {
                    var r = e.getAttribute("data-fallback");
                    if (r) {
                        var i = function() {
                            "mobile" === Core.viewport || "phablet" === Core.viewport ? "mobile" !== t && (e.setAttribute("src", r), t = "mobile") : "desktop" !== t && (e.setAttribute("src", n), t = "desktop")
                        };
                        window.attachEvent ? window.attachEvent("onresize", function() {
                            i()
                        }) : window.addEventListener && window.addEventListener("resize", function() {
                            i()
                        }, !0), i()
                    }
                }
            }
        },
        loadJsScripts: function() {
            var e = {
                    audiovideo: {
                        path: "shared-ro/mediaplayer",
                        deps: ["collapsiblePanels"],
                        triggers: [".block-audio-video"]
                    },
                    autocomplete: {
                        path: "shared-ro/autocomplete",
                        deps: ["jquery-ui"],
                        triggers: [".autocomplete"]
                    },
                    baz: {
                        path: "shared-ro/baz",
                        triggers: [".baz"]
                    },
                    collapsiblePanels: {
                        path: "shared-ro/collapsible-panels"
                    },
                    filterTools: {
                        path: "shared-ro/filtertool",
                        triggers: [".filterToolWrapper"]
                    },
                    filterList: {
                        path: "shared-ro/filter-list",
                        triggers: ["#source-list"]
                    },
                    "flex-images": {
                        path: "shared-ro/flex-images",
                        deps: ["img-helpers"],
                        triggers: [".block-photo-gallery"]
                    },
                    "foto-slider": {
                        path: "shared-ro/foto-slider",
                        triggers: [".fotoSlider"]
                    },
                    forms: {
                        path: "shared-ro/forms",
                        deps: ["jquery-ui"],
                        triggers: [".form"]
                    },
                    helpers: {
                        path: "shared-ro/helpers",
                        triggers: ["table", ".anchors", ".index"]
                    },
                    highchart: {
                        path: "shared-ro/highcharts",
                        deps: ["collapsiblePanels"],
                        triggers: [".hchart"]
                    },
                    highmaps: {
                        path: "shared-ro/highmaps",
                        deps: ["highchart"],
                        triggers: [".hmap"]
                    },
                    hotspot: {
                        path: "shared-ro/hotspot",
                        triggers: [".hotspotContainer"]
                    },
                    infographics: {
                        path: "shared-ro/infographics",
                        deps: ["collapsiblePanels"],
                        triggers: [".infographic", ".infographicInfo"]
                    },
                    "img-helpers": {
                        path: "shared-ro/img-helpers",
                        triggers: [".content-image-left", ".dlimg", ".hasOptions", ".headerImage", ".campaignImage"]
                    },
                    "jquery-ui": {
                        path: "shared-ro/jquery-ui"
                    },
                    "jquery-mobile": {
                        path: "shared-ro/jquery.mobile",
                        triggers: [".touchevents"]
                    },
                    lazyload: {
                        path: "shared-ro/jquery-lazyload",
                        triggers: [".lazy"]
                    },
                    leaflet: {
                        path: "shared-ro/leaflet"
                    },
                    mapresources: {
                        path: "shared-ro/map-resources",
                        deps: ["collapsiblePanels"],
                        triggers: [".map"]
                    },
                    contactMap: {
                        path: "shared-ro/contactmap",
                        deps: ["leaflet", "collapsiblePanels"],
                        triggers: [".mapsComponent"]
                    },
                    poll: {
                        path: "shared-ro/poll",
                        triggers: [".poll"]
                    },
                    "position-here": {
                        path: "shared-ro/position-here",
                        deps: ["jquery-ui"],
                        triggers: [".positionHere"]
                    },
                    "style-togglr": {
                        path: "shared-ro/styletogglr",
                        triggers: []
                    },
                    timeline: {
                        path: "shared-ro/timeliner",
                        deps: ["lazyload"],
                        triggers: [".timeline"]
                    },
                    "topic-filter": {
                        path: "shared-ro/topic-filters",
                        deps: ["jquery-ui"],
                        triggers: [".topicSearchForm"]
                    }
                },
                n = {},
                r = {},
                i = {};
            for (var o in e) n[o] = {}, n[o] = this.scriptpath + e[o].path + this.scriptversion + this.minify, r[o] = {}, r[o].exports = o, e[o].deps && (r[o].deps = e[o].deps), e[o].triggers && (i[o] = e[o].triggers);
            require.config({
                paths: n,
                shim: r
            });
            for (var a in i) this.testSelectors(i[a]) && require([a]);
            for (var s = t.location.host.split("."), u = 0, c = s.length; u < c; u++) "git" !== s[u] && "localhost:2000" !== s[u] && "192" !== s[u] || require(["style-togglr"])
        },
        init: function() {
            var n = this,
                r = e.getElementsByTagName("html")[0],
                i = e.getElementsByTagName("body")[0],
                o = r.className.indexOf("ie") > -1;
            n.debug = n.debug || t.location.hash.indexOf("debug") > -1, n.scriptpath = i.getAttribute("data-scriptpath") ? i.getAttribute("data-scriptpath") + "/" : "behaviour/", n.scriptversion = i.getAttribute("data-scriptversion") ? "-" + i.getAttribute("data-scriptversion") : "", n.minify = n.debug ? "" : ".min", !o && i.className.indexOf("home") < 0, n.setScreenType(), n.checkLogoVersion(), n.loadJsScripts(), n.fixSkiplinks(), Cookies.init(), n.showcookiebar = !!i.getAttribute("data-showcookiebar") && "true" === i.getAttribute("data-showcookiebar").toString(), n.showcookiebar && (Cookiebar.cookieurl = i.getAttribute("data-cookieimg") ? i.getAttribute("data-cookieimg") : "/presentation/shared-ro/images/cookie.png", Cookiebar.init({
                callback: function(e) {
                    Cookies.create(Cookiebar.cookiename, Cookiebar.cookievalues[e], Cookiebar.lifespan);
                    var t = navigator.userAgent.hashCode(),
                        n = (new Date).getTime(),
                        r = n + t.toString(),
                        i = Cookiebar.cookievalues[e],
                        o = new Image;
                    i = i + "." + r, o.src = Cookiebar.cookieurl + "?" + Cookiebar.cookiename + "=" + i
                }
            })), n.showsurveybar = i.getAttribute("data-showsurveybar") || "false", "true" === n.showsurveybar && Surveybar.init(), n.checkSearchFormSubmit()
        }
    }, Core.init(), u()
}(document, window);