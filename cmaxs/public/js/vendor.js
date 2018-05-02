var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (e, t) {
    "use strict";
    "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");return t(e);
    } : t(e);
}("undefined" != typeof window ? window : this, function (e, t) {
    "use strict";
    var n = [],
        r = e.document,
        i = Object.getPrototypeOf,
        o = n.slice,
        a = n.concat,
        s = n.push,
        u = n.indexOf,
        l = {},
        c = l.toString,
        f = l.hasOwnProperty,
        p = f.toString,
        d = p.call(Object),
        h = {},
        g = function e(t) {
        return "function" == typeof t && "number" != typeof t.nodeType;
    },
        y = function e(t) {
        return null != t && t === t.window;
    },
        v = { type: !0, src: !0, noModule: !0 };function m(e, t, n) {
        var i,
            o = (t = t || r).createElement("script");if (o.text = e, n) for (i in v) {
            n[i] && (o[i] = n[i]);
        }t.head.appendChild(o).parentNode.removeChild(o);
    }function x(e) {
        return null == e ? e + "" : "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e ? l[c.call(e)] || "object" : typeof e === "undefined" ? "undefined" : _typeof(e);
    }var b = "3.3.1",
        w = function w(e, t) {
        return new w.fn.init(e, t);
    },
        T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.fn = w.prototype = { jquery: "3.3.1", constructor: w, length: 0, toArray: function toArray() {
            return o.call(this);
        }, get: function get(e) {
            return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e];
        }, pushStack: function pushStack(e) {
            var t = w.merge(this.constructor(), e);return t.prevObject = this, t;
        }, each: function each(e) {
            return w.each(this, e);
        }, map: function map(e) {
            return this.pushStack(w.map(this, function (t, n) {
                return e.call(t, n, t);
            }));
        }, slice: function slice() {
            return this.pushStack(o.apply(this, arguments));
        }, first: function first() {
            return this.eq(0);
        }, last: function last() {
            return this.eq(-1);
        }, eq: function eq(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
        }, end: function end() {
            return this.prevObject || this.constructor();
        }, push: s, sort: n.sort, splice: n.splice }, w.extend = w.fn.extend = function () {
        var e,
            t,
            n,
            r,
            i,
            o,
            a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || g(a) || (a = {}), s === u && (a = this, s--); s < u; s++) {
            if (null != (e = arguments[s])) for (t in e) {
                n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && w.isPlainObject(n) ? n : {}, a[t] = w.extend(l, o, r)) : void 0 !== r && (a[t] = r));
            }
        }return a;
    }, w.extend({ expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(e) {
            throw new Error(e);
        }, noop: function noop() {}, isPlainObject: function isPlainObject(e) {
            var t, n;return !(!e || "[object Object]" !== c.call(e)) && (!(t = i(e)) || "function" == typeof (n = f.call(t, "constructor") && t.constructor) && p.call(n) === d);
        }, isEmptyObject: function isEmptyObject(e) {
            var t;for (t in e) {
                return !1;
            }return !0;
        }, globalEval: function globalEval(e) {
            m(e);
        }, each: function each(e, t) {
            var n,
                r = 0;if (C(e)) {
                for (n = e.length; r < n; r++) {
                    if (!1 === t.call(e[r], r, e[r])) break;
                }
            } else for (r in e) {
                if (!1 === t.call(e[r], r, e[r])) break;
            }return e;
        }, trim: function trim(e) {
            return null == e ? "" : (e + "").replace(T, "");
        }, makeArray: function makeArray(e, t) {
            var n = t || [];return null != e && (C(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n;
        }, inArray: function inArray(e, t, n) {
            return null == t ? -1 : u.call(t, e, n);
        }, merge: function merge(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) {
                e[i++] = t[r];
            }return e.length = i, e;
        }, grep: function grep(e, t, n) {
            for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++) {
                (r = !t(e[o], o)) !== s && i.push(e[o]);
            }return i;
        }, map: function map(e, t, n) {
            var r,
                i,
                o = 0,
                s = [];if (C(e)) for (r = e.length; o < r; o++) {
                null != (i = t(e[o], o, n)) && s.push(i);
            } else for (o in e) {
                null != (i = t(e[o], o, n)) && s.push(i);
            }return a.apply([], s);
        }, guid: 1, support: h }), "function" == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]), w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        l["[object " + t + "]"] = t.toLowerCase();
    });function C(e) {
        var t = !!e && "length" in e && e.length,
            n = x(e);return !g(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e);
    }var E = function (e) {
        var t,
            n,
            r,
            i,
            o,
            a,
            s,
            u,
            l,
            c,
            f,
            p,
            d,
            h,
            g,
            y,
            v,
            m,
            x,
            b = "sizzle" + 1 * new Date(),
            w = e.document,
            T = 0,
            C = 0,
            E = ae(),
            k = ae(),
            S = ae(),
            D = function D(e, t) {
            return e === t && (f = !0), 0;
        },
            N = {}.hasOwnProperty,
            A = [],
            j = A.pop,
            q = A.push,
            L = A.push,
            H = A.slice,
            O = function O(e, t) {
            for (var n = 0, r = e.length; n < r; n++) {
                if (e[n] === t) return n;
            }return -1;
        },
            P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            M = "[\\x20\\t\\r\\n\\f]",
            R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            I = "\\[" + M + "*(" + R + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + M + "*\\]",
            W = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)",
            $ = new RegExp(M + "+", "g"),
            B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
            F = new RegExp("^" + M + "*," + M + "*"),
            _ = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
            z = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"),
            X = new RegExp(W),
            U = new RegExp("^" + R + "$"),
            V = { ID: new RegExp("^#(" + R + ")"), CLASS: new RegExp("^\\.(" + R + ")"), TAG: new RegExp("^(" + R + "|[*])"), ATTR: new RegExp("^" + I), PSEUDO: new RegExp("^" + W), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"), bool: new RegExp("^(?:" + P + ")$", "i"), needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i") },
            G = /^(?:input|select|textarea|button)$/i,
            Y = /^h\d$/i,
            Q = /^[^{]+\{\s*\[native \w/,
            J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            K = /[+~]/,
            Z = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
            ee = function ee(e, t, n) {
            var r = "0x" + t - 65536;return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
        },
            te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            ne = function ne(e, t) {
            return t ? "\0" === e ? "\uFFFD" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
        },
            re = function re() {
            p();
        },
            ie = me(function (e) {
            return !0 === e.disabled && ("form" in e || "label" in e);
        }, { dir: "parentNode", next: "legend" });try {
            L.apply(A = H.call(w.childNodes), w.childNodes), A[w.childNodes.length].nodeType;
        } catch (e) {
            L = { apply: A.length ? function (e, t) {
                    q.apply(e, H.call(t));
                } : function (e, t) {
                    var n = e.length,
                        r = 0;while (e[n++] = t[r++]) {}e.length = n - 1;
                } };
        }function oe(e, t, r, i) {
            var o,
                s,
                l,
                c,
                f,
                h,
                v,
                m = t && t.ownerDocument,
                T = t ? t.nodeType : 9;if (r = r || [], "string" != typeof e || !e || 1 !== T && 9 !== T && 11 !== T) return r;if (!i && ((t ? t.ownerDocument || t : w) !== d && p(t), t = t || d, g)) {
                if (11 !== T && (f = J.exec(e))) if (o = f[1]) {
                    if (9 === T) {
                        if (!(l = t.getElementById(o))) return r;if (l.id === o) return r.push(l), r;
                    } else if (m && (l = m.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r;
                } else {
                    if (f[2]) return L.apply(r, t.getElementsByTagName(e)), r;if ((o = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return L.apply(r, t.getElementsByClassName(o)), r;
                }if (n.qsa && !S[e + " "] && (!y || !y.test(e))) {
                    if (1 !== T) m = t, v = e;else if ("object" !== t.nodeName.toLowerCase()) {
                        (c = t.getAttribute("id")) ? c = c.replace(te, ne) : t.setAttribute("id", c = b), s = (h = a(e)).length;while (s--) {
                            h[s] = "#" + c + " " + ve(h[s]);
                        }v = h.join(","), m = K.test(e) && ge(t.parentNode) || t;
                    }if (v) try {
                        return L.apply(r, m.querySelectorAll(v)), r;
                    } catch (e) {} finally {
                        c === b && t.removeAttribute("id");
                    }
                }
            }return u(e.replace(B, "$1"), t, r, i);
        }function ae() {
            var e = [];function t(n, i) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i;
            }return t;
        }function se(e) {
            return e[b] = !0, e;
        }function ue(e) {
            var t = d.createElement("fieldset");try {
                return !!e(t);
            } catch (e) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null;
            }
        }function le(e, t) {
            var n = e.split("|"),
                i = n.length;while (i--) {
                r.attrHandle[n[i]] = t;
            }
        }function ce(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;if (r) return r;if (n) while (n = n.nextSibling) {
                if (n === t) return -1;
            }return e ? 1 : -1;
        }function fe(e) {
            return function (t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e;
            };
        }function pe(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();return ("input" === n || "button" === n) && t.type === e;
            };
        }function de(e) {
            return function (t) {
                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ie(t) === e : t.disabled === e : "label" in t && t.disabled === e;
            };
        }function he(e) {
            return se(function (t) {
                return t = +t, se(function (n, r) {
                    var i,
                        o = e([], n.length, t),
                        a = o.length;while (a--) {
                        n[i = o[a]] && (n[i] = !(r[i] = n[i]));
                    }
                });
            });
        }function ge(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e;
        }n = oe.support = {}, o = oe.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;return !!t && "HTML" !== t.nodeName;
        }, p = oe.setDocument = function (e) {
            var t,
                i,
                a = e ? e.ownerDocument || e : w;return a !== d && 9 === a.nodeType && a.documentElement ? (d = a, h = d.documentElement, g = !o(d), w !== d && (i = d.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = ue(function (e) {
                return e.className = "i", !e.getAttribute("className");
            }), n.getElementsByTagName = ue(function (e) {
                return e.appendChild(d.createComment("")), !e.getElementsByTagName("*").length;
            }), n.getElementsByClassName = Q.test(d.getElementsByClassName), n.getById = ue(function (e) {
                return h.appendChild(e).id = b, !d.getElementsByName || !d.getElementsByName(b).length;
            }), n.getById ? (r.filter.ID = function (e) {
                var t = e.replace(Z, ee);return function (e) {
                    return e.getAttribute("id") === t;
                };
            }, r.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && g) {
                    var n = t.getElementById(e);return n ? [n] : [];
                }
            }) : (r.filter.ID = function (e) {
                var t = e.replace(Z, ee);return function (e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");return n && n.value === t;
                };
            }, r.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && g) {
                    var n,
                        r,
                        i,
                        o = t.getElementById(e);if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e) return [o];i = t.getElementsByName(e), r = 0;while (o = i[r++]) {
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                        }
                    }return [];
                }
            }), r.find.TAG = n.getElementsByTagName ? function (e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0;
            } : function (e, t) {
                var n,
                    r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);if ("*" === e) {
                    while (n = o[i++]) {
                        1 === n.nodeType && r.push(n);
                    }return r;
                }return o;
            }, r.find.CLASS = n.getElementsByClassName && function (e, t) {
                if ("undefined" != typeof t.getElementsByClassName && g) return t.getElementsByClassName(e);
            }, v = [], y = [], (n.qsa = Q.test(d.querySelectorAll)) && (ue(function (e) {
                h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && y.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || y.push("\\[" + M + "*(?:value|" + P + ")"), e.querySelectorAll("[id~=" + b + "-]").length || y.push("~="), e.querySelectorAll(":checked").length || y.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || y.push(".#.+[+~]");
            }), ue(function (e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t = d.createElement("input");t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && y.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && y.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && y.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), y.push(",.*:");
            })), (n.matchesSelector = Q.test(m = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ue(function (e) {
                n.disconnectedMatch = m.call(e, "*"), m.call(e, "[s!='']:x"), v.push("!=", W);
            }), y = y.length && new RegExp(y.join("|")), v = v.length && new RegExp(v.join("|")), t = Q.test(h.compareDocumentPosition), x = t || Q.test(h.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
            } : function (e, t) {
                if (t) while (t = t.parentNode) {
                    if (t === e) return !0;
                }return !1;
            }, D = t ? function (e, t) {
                if (e === t) return f = !0, 0;var r = !e.compareDocumentPosition - !t.compareDocumentPosition;return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === d || e.ownerDocument === w && x(w, e) ? -1 : t === d || t.ownerDocument === w && x(w, t) ? 1 : c ? O(c, e) - O(c, t) : 0 : 4 & r ? -1 : 1);
            } : function (e, t) {
                if (e === t) return f = !0, 0;var n,
                    r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    a = [e],
                    s = [t];if (!i || !o) return e === d ? -1 : t === d ? 1 : i ? -1 : o ? 1 : c ? O(c, e) - O(c, t) : 0;if (i === o) return ce(e, t);n = e;while (n = n.parentNode) {
                    a.unshift(n);
                }n = t;while (n = n.parentNode) {
                    s.unshift(n);
                }while (a[r] === s[r]) {
                    r++;
                }return r ? ce(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0;
            }, d) : d;
        }, oe.matches = function (e, t) {
            return oe(e, null, null, t);
        }, oe.matchesSelector = function (e, t) {
            if ((e.ownerDocument || e) !== d && p(e), t = t.replace(z, "='$1']"), n.matchesSelector && g && !S[t + " "] && (!v || !v.test(t)) && (!y || !y.test(t))) try {
                var r = m.call(e, t);if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r;
            } catch (e) {}return oe(t, d, null, [e]).length > 0;
        }, oe.contains = function (e, t) {
            return (e.ownerDocument || e) !== d && p(e), x(e, t);
        }, oe.attr = function (e, t) {
            (e.ownerDocument || e) !== d && p(e);var i = r.attrHandle[t.toLowerCase()],
                o = i && N.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null;
        }, oe.escape = function (e) {
            return (e + "").replace(te, ne);
        }, oe.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        }, oe.uniqueSort = function (e) {
            var t,
                r = [],
                i = 0,
                o = 0;if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(D), f) {
                while (t = e[o++]) {
                    t === e[o] && (i = r.push(o));
                }while (i--) {
                    e.splice(r[i], 1);
                }
            }return c = null, e;
        }, i = oe.getText = function (e) {
            var t,
                n = "",
                r = 0,
                o = e.nodeType;if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;for (e = e.firstChild; e; e = e.nextSibling) {
                        n += i(e);
                    }
                } else if (3 === o || 4 === o) return e.nodeValue;
            } else while (t = e[r++]) {
                n += i(t);
            }return n;
        }, (r = oe.selectors = { cacheLength: 50, createPseudo: se, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(e) {
                    return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                }, CHILD: function CHILD(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e;
                }, PSEUDO: function PSEUDO(e) {
                    var t,
                        n = !e[6] && e[2];return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
                } }, filter: { TAG: function TAG(e) {
                    var t = e.replace(Z, ee).toLowerCase();return "*" === e ? function () {
                        return !0;
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                }, CLASS: function CLASS(e) {
                    var t = E[e + " "];return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && E(e, function (e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
                    });
                }, ATTR: function ATTR(e, t, n) {
                    return function (r) {
                        var i = oe.attr(r, e);return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace($, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"));
                    };
                }, CHILD: function CHILD(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;return 1 === r && 0 === i ? function (e) {
                        return !!e.parentNode;
                    } : function (t, n, u) {
                        var l,
                            c,
                            f,
                            p,
                            d,
                            h,
                            g = o !== a ? "nextSibling" : "previousSibling",
                            y = t.parentNode,
                            v = s && t.nodeName.toLowerCase(),
                            m = !u && !s,
                            x = !1;if (y) {
                            if (o) {
                                while (g) {
                                    p = t;while (p = p[g]) {
                                        if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                    }h = g = "only" === e && !h && "nextSibling";
                                }return !0;
                            }if (h = [a ? y.firstChild : y.lastChild], a && m) {
                                x = (d = (l = (c = (f = (p = y)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], p = d && y.childNodes[d];while (p = ++d && p && p[g] || (x = d = 0) || h.pop()) {
                                    if (1 === p.nodeType && ++x && p === t) {
                                        c[e] = [T, d, x];break;
                                    }
                                }
                            } else if (m && (x = d = (l = (c = (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x) while (p = ++d && p && p[g] || (x = d = 0) || h.pop()) {
                                if ((s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) && ++x && (m && ((c = (f = p[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [T, x]), p === t)) break;
                            }return (x -= i) === r || x % r == 0 && x / r >= 0;
                        }
                    };
                }, PSEUDO: function PSEUDO(e, t) {
                    var n,
                        i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function (e, n) {
                        var r,
                            o = i(e, t),
                            a = o.length;while (a--) {
                            e[r = O(e, o[a])] = !(n[r] = o[a]);
                        }
                    }) : function (e) {
                        return i(e, 0, n);
                    }) : i;
                } }, pseudos: { not: se(function (e) {
                    var t = [],
                        n = [],
                        r = s(e.replace(B, "$1"));return r[b] ? se(function (e, t, n, i) {
                        var o,
                            a = r(e, null, i, []),
                            s = e.length;while (s--) {
                            (o = a[s]) && (e[s] = !(t[s] = o));
                        }
                    }) : function (e, i, o) {
                        return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop();
                    };
                }), has: se(function (e) {
                    return function (t) {
                        return oe(e, t).length > 0;
                    };
                }), contains: se(function (e) {
                    return e = e.replace(Z, ee), function (t) {
                        return (t.textContent || t.innerText || i(t)).indexOf(e) > -1;
                    };
                }), lang: se(function (e) {
                    return U.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(Z, ee).toLowerCase(), function (t) {
                        var n;do {
                            if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
                        } while ((t = t.parentNode) && 1 === t.nodeType);return !1;
                    };
                }), target: function target(t) {
                    var n = e.location && e.location.hash;return n && n.slice(1) === t.id;
                }, root: function root(e) {
                    return e === h;
                }, focus: function focus(e) {
                    return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                }, enabled: de(!1), disabled: de(!0), checked: function checked(e) {
                    var t = e.nodeName.toLowerCase();return "input" === t && !!e.checked || "option" === t && !!e.selected;
                }, selected: function selected(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                }, empty: function empty(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        if (e.nodeType < 6) return !1;
                    }return !0;
                }, parent: function parent(e) {
                    return !r.pseudos.empty(e);
                }, header: function header(e) {
                    return Y.test(e.nodeName);
                }, input: function input(e) {
                    return G.test(e.nodeName);
                }, button: function button(e) {
                    var t = e.nodeName.toLowerCase();return "input" === t && "button" === e.type || "button" === t;
                }, text: function text(e) {
                    var t;return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                }, first: he(function () {
                    return [0];
                }), last: he(function (e, t) {
                    return [t - 1];
                }), eq: he(function (e, t, n) {
                    return [n < 0 ? n + t : n];
                }), even: he(function (e, t) {
                    for (var n = 0; n < t; n += 2) {
                        e.push(n);
                    }return e;
                }), odd: he(function (e, t) {
                    for (var n = 1; n < t; n += 2) {
                        e.push(n);
                    }return e;
                }), lt: he(function (e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0;) {
                        e.push(r);
                    }return e;
                }), gt: he(function (e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;) {
                        e.push(r);
                    }return e;
                }) } }).pseudos.nth = r.pseudos.eq;for (t in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
            r.pseudos[t] = fe(t);
        }for (t in { submit: !0, reset: !0 }) {
            r.pseudos[t] = pe(t);
        }function ye() {}ye.prototype = r.filters = r.pseudos, r.setFilters = new ye(), a = oe.tokenize = function (e, t) {
            var n,
                i,
                o,
                a,
                s,
                u,
                l,
                c = k[e + " "];if (c) return t ? 0 : c.slice(0);s = e, u = [], l = r.preFilter;while (s) {
                n && !(i = F.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = _.exec(s)) && (n = i.shift(), o.push({ value: n, type: i[0].replace(B, " ") }), s = s.slice(n.length));for (a in r.filter) {
                    !(i = V[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({ value: n, type: a, matches: i }), s = s.slice(n.length));
                }if (!n) break;
            }return t ? s.length : s ? oe.error(e) : k(e, u).slice(0);
        };function ve(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) {
                r += e[t].value;
            }return r;
        }function me(e, t, n) {
            var r = t.dir,
                i = t.next,
                o = i || r,
                a = n && "parentNode" === o,
                s = C++;return t.first ? function (t, n, i) {
                while (t = t[r]) {
                    if (1 === t.nodeType || a) return e(t, n, i);
                }return !1;
            } : function (t, n, u) {
                var l,
                    c,
                    f,
                    p = [T, s];if (u) {
                    while (t = t[r]) {
                        if ((1 === t.nodeType || a) && e(t, n, u)) return !0;
                    }
                } else while (t = t[r]) {
                    if (1 === t.nodeType || a) if (f = t[b] || (t[b] = {}), c = f[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;else {
                        if ((l = c[o]) && l[0] === T && l[1] === s) return p[2] = l[2];if (c[o] = p, p[2] = e(t, n, u)) return !0;
                    }
                }return !1;
            };
        }function xe(e) {
            return e.length > 1 ? function (t, n, r) {
                var i = e.length;while (i--) {
                    if (!e[i](t, n, r)) return !1;
                }return !0;
            } : e[0];
        }function be(e, t, n) {
            for (var r = 0, i = t.length; r < i; r++) {
                oe(e, t[r], n);
            }return n;
        }function we(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) {
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
            }return a;
        }function Te(e, t, n, r, i, o) {
            return r && !r[b] && (r = Te(r)), i && !i[b] && (i = Te(i, o)), se(function (o, a, s, u) {
                var l,
                    c,
                    f,
                    p = [],
                    d = [],
                    h = a.length,
                    g = o || be(t || "*", s.nodeType ? [s] : s, []),
                    y = !e || !o && t ? g : we(g, p, e, s, u),
                    v = n ? i || (o ? e : h || r) ? [] : a : y;if (n && n(y, v, s, u), r) {
                    l = we(v, d), r(l, [], s, u), c = l.length;while (c--) {
                        (f = l[c]) && (v[d[c]] = !(y[d[c]] = f));
                    }
                }if (o) {
                    if (i || e) {
                        if (i) {
                            l = [], c = v.length;while (c--) {
                                (f = v[c]) && l.push(y[c] = f);
                            }i(null, v = [], l, u);
                        }c = v.length;while (c--) {
                            (f = v[c]) && (l = i ? O(o, f) : p[c]) > -1 && (o[l] = !(a[l] = f));
                        }
                    }
                } else v = we(v === a ? v.splice(h, v.length) : v), i ? i(null, a, v, u) : L.apply(a, v);
            });
        }function Ce(e) {
            for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = me(function (e) {
                return e === t;
            }, s, !0), f = me(function (e) {
                return O(t, e) > -1;
            }, s, !0), p = [function (e, n, r) {
                var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));return t = null, i;
            }]; u < o; u++) {
                if (n = r.relative[e[u].type]) p = [me(xe(p), n)];else {
                    if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
                        for (i = ++u; i < o; i++) {
                            if (r.relative[e[i].type]) break;
                        }return Te(u > 1 && xe(p), u > 1 && ve(e.slice(0, u - 1).concat({ value: " " === e[u - 2].type ? "*" : "" })).replace(B, "$1"), n, u < i && Ce(e.slice(u, i)), i < o && Ce(e = e.slice(i)), i < o && ve(e));
                    }p.push(n);
                }
            }return xe(p);
        }function Ee(e, t) {
            var n = t.length > 0,
                i = e.length > 0,
                o = function o(_o, a, s, u, c) {
                var f,
                    h,
                    y,
                    v = 0,
                    m = "0",
                    x = _o && [],
                    b = [],
                    w = l,
                    C = _o || i && r.find.TAG("*", c),
                    E = T += null == w ? 1 : Math.random() || .1,
                    k = C.length;for (c && (l = a === d || a || c); m !== k && null != (f = C[m]); m++) {
                    if (i && f) {
                        h = 0, a || f.ownerDocument === d || (p(f), s = !g);while (y = e[h++]) {
                            if (y(f, a || d, s)) {
                                u.push(f);break;
                            }
                        }c && (T = E);
                    }n && ((f = !y && f) && v--, _o && x.push(f));
                }if (v += m, n && m !== v) {
                    h = 0;while (y = t[h++]) {
                        y(x, b, a, s);
                    }if (_o) {
                        if (v > 0) while (m--) {
                            x[m] || b[m] || (b[m] = j.call(u));
                        }b = we(b);
                    }L.apply(u, b), c && !_o && b.length > 0 && v + t.length > 1 && oe.uniqueSort(u);
                }return c && (T = E, l = w), x;
            };return n ? se(o) : o;
        }return s = oe.compile = function (e, t) {
            var n,
                r = [],
                i = [],
                o = S[e + " "];if (!o) {
                t || (t = a(e)), n = t.length;while (n--) {
                    (o = Ce(t[n]))[b] ? r.push(o) : i.push(o);
                }(o = S(e, Ee(i, r))).selector = e;
            }return o;
        }, u = oe.select = function (e, t, n, i) {
            var o,
                u,
                l,
                c,
                f,
                p = "function" == typeof e && e,
                d = !i && a(e = p.selector || e);if (n = n || [], 1 === d.length) {
                if ((u = d[0] = d[0].slice(0)).length > 2 && "ID" === (l = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
                    if (!(t = (r.find.ID(l.matches[0].replace(Z, ee), t) || [])[0])) return n;p && (t = t.parentNode), e = e.slice(u.shift().value.length);
                }o = V.needsContext.test(e) ? 0 : u.length;while (o--) {
                    if (l = u[o], r.relative[c = l.type]) break;if ((f = r.find[c]) && (i = f(l.matches[0].replace(Z, ee), K.test(u[0].type) && ge(t.parentNode) || t))) {
                        if (u.splice(o, 1), !(e = i.length && ve(u))) return L.apply(n, i), n;break;
                    }
                }
            }return (p || s(e, d))(i, t, !g, n, !t || K.test(e) && ge(t.parentNode) || t), n;
        }, n.sortStable = b.split("").sort(D).join("") === b, n.detectDuplicates = !!f, p(), n.sortDetached = ue(function (e) {
            return 1 & e.compareDocumentPosition(d.createElement("fieldset"));
        }), ue(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
        }) || le("type|href|height|width", function (e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }), n.attributes && ue(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
        }) || le("value", function (e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        }), ue(function (e) {
            return null == e.getAttribute("disabled");
        }) || le(P, function (e, t, n) {
            var r;if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
        }), oe;
    }(e);w.find = E, w.expr = E.selectors, w.expr[":"] = w.expr.pseudos, w.uniqueSort = w.unique = E.uniqueSort, w.text = E.getText, w.isXMLDoc = E.isXML, w.contains = E.contains, w.escapeSelector = E.escape;var k = function k(e, t, n) {
        var r = [],
            i = void 0 !== n;while ((e = e[t]) && 9 !== e.nodeType) {
            if (1 === e.nodeType) {
                if (i && w(e).is(n)) break;r.push(e);
            }
        }return r;
    },
        S = function S(e, t) {
        for (var n = []; e; e = e.nextSibling) {
            1 === e.nodeType && e !== t && n.push(e);
        }return n;
    },
        D = w.expr.match.needsContext;function N(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e, t, n) {
        return g(t) ? w.grep(e, function (e, r) {
            return !!t.call(e, r, e) !== n;
        }) : t.nodeType ? w.grep(e, function (e) {
            return e === t !== n;
        }) : "string" != typeof t ? w.grep(e, function (e) {
            return u.call(t, e) > -1 !== n;
        }) : w.filter(t, e, n);
    }w.filter = function (e, t, n) {
        var r = t[0];return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? w.find.matchesSelector(r, e) ? [r] : [] : w.find.matches(e, w.grep(t, function (e) {
            return 1 === e.nodeType;
        }));
    }, w.fn.extend({ find: function find(e) {
            var t,
                n,
                r = this.length,
                i = this;if ("string" != typeof e) return this.pushStack(w(e).filter(function () {
                for (t = 0; t < r; t++) {
                    if (w.contains(i[t], this)) return !0;
                }
            }));for (n = this.pushStack([]), t = 0; t < r; t++) {
                w.find(e, i[t], n);
            }return r > 1 ? w.uniqueSort(n) : n;
        }, filter: function filter(e) {
            return this.pushStack(j(this, e || [], !1));
        }, not: function not(e) {
            return this.pushStack(j(this, e || [], !0));
        }, is: function is(e) {
            return !!j(this, "string" == typeof e && D.test(e) ? w(e) : e || [], !1).length;
        } });var q,
        L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init = function (e, t, n) {
        var i, o;if (!e) return this;if (n = n || q, "string" == typeof e) {
            if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : L.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);if (i[1]) {
                if (t = t instanceof w ? t[0] : t, w.merge(this, w.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), A.test(i[1]) && w.isPlainObject(t)) for (i in t) {
                    g(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                }return this;
            }return (o = r.getElementById(i[2])) && (this[0] = o, this.length = 1), this;
        }return e.nodeType ? (this[0] = e, this.length = 1, this) : g(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this);
    }).prototype = w.fn, q = w(r);var H = /^(?:parents|prev(?:Until|All))/,
        O = { children: !0, contents: !0, next: !0, prev: !0 };w.fn.extend({ has: function has(e) {
            var t = w(e, this),
                n = t.length;return this.filter(function () {
                for (var e = 0; e < n; e++) {
                    if (w.contains(this, t[e])) return !0;
                }
            });
        }, closest: function closest(e, t) {
            var n,
                r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && w(e);if (!D.test(e)) for (; r < i; r++) {
                for (n = this[r]; n && n !== t; n = n.parentNode) {
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && w.find.matchesSelector(n, e))) {
                        o.push(n);break;
                    }
                }
            }return this.pushStack(o.length > 1 ? w.uniqueSort(o) : o);
        }, index: function index(e) {
            return e ? "string" == typeof e ? u.call(w(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        }, add: function add(e, t) {
            return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))));
        }, addBack: function addBack(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        } });function P(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType) {}return e;
    }w.each({ parent: function parent(e) {
            var t = e.parentNode;return t && 11 !== t.nodeType ? t : null;
        }, parents: function parents(e) {
            return k(e, "parentNode");
        }, parentsUntil: function parentsUntil(e, t, n) {
            return k(e, "parentNode", n);
        }, next: function next(e) {
            return P(e, "nextSibling");
        }, prev: function prev(e) {
            return P(e, "previousSibling");
        }, nextAll: function nextAll(e) {
            return k(e, "nextSibling");
        }, prevAll: function prevAll(e) {
            return k(e, "previousSibling");
        }, nextUntil: function nextUntil(e, t, n) {
            return k(e, "nextSibling", n);
        }, prevUntil: function prevUntil(e, t, n) {
            return k(e, "previousSibling", n);
        }, siblings: function siblings(e) {
            return S((e.parentNode || {}).firstChild, e);
        }, children: function children(e) {
            return S(e.firstChild);
        }, contents: function contents(e) {
            return N(e, "iframe") ? e.contentDocument : (N(e, "template") && (e = e.content || e), w.merge([], e.childNodes));
        } }, function (e, t) {
        w.fn[e] = function (n, r) {
            var i = w.map(this, t, n);return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = w.filter(r, i)), this.length > 1 && (O[e] || w.uniqueSort(i), H.test(e) && i.reverse()), this.pushStack(i);
        };
    });var M = /[^\x20\t\r\n\f]+/g;function R(e) {
        var t = {};return w.each(e.match(M) || [], function (e, n) {
            t[n] = !0;
        }), t;
    }w.Callbacks = function (e) {
        e = "string" == typeof e ? R(e) : w.extend({}, e);var t,
            n,
            r,
            i,
            o = [],
            a = [],
            s = -1,
            u = function u() {
            for (i = i || e.once, r = t = !0; a.length; s = -1) {
                n = a.shift();while (++s < o.length) {
                    !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
                }
            }e.memory || (n = !1), t = !1, i && (o = n ? [] : "");
        },
            l = { add: function add() {
                return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
                    w.each(n, function (n, r) {
                        g(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== x(r) && t(r);
                    });
                }(arguments), n && !t && u()), this;
            }, remove: function remove() {
                return w.each(arguments, function (e, t) {
                    var n;while ((n = w.inArray(t, o, n)) > -1) {
                        o.splice(n, 1), n <= s && s--;
                    }
                }), this;
            }, has: function has(e) {
                return e ? w.inArray(e, o) > -1 : o.length > 0;
            }, empty: function empty() {
                return o && (o = []), this;
            }, disable: function disable() {
                return i = a = [], o = n = "", this;
            }, disabled: function disabled() {
                return !o;
            }, lock: function lock() {
                return i = a = [], n || t || (o = n = ""), this;
            }, locked: function locked() {
                return !!i;
            }, fireWith: function fireWith(e, n) {
                return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this;
            }, fire: function fire() {
                return l.fireWith(this, arguments), this;
            }, fired: function fired() {
                return !!r;
            } };return l;
    };function I(e) {
        return e;
    }function W(e) {
        throw e;
    }function $(e, t, n, r) {
        var i;try {
            e && g(i = e.promise) ? i.call(e).done(t).fail(n) : e && g(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
        } catch (e) {
            n.apply(void 0, [e]);
        }
    }w.extend({ Deferred: function Deferred(t) {
            var n = [["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2], ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]],
                r = "pending",
                i = { state: function state() {
                    return r;
                }, always: function always() {
                    return o.done(arguments).fail(arguments), this;
                }, "catch": function _catch(e) {
                    return i.then(null, e);
                }, pipe: function pipe() {
                    var e = arguments;return w.Deferred(function (t) {
                        w.each(n, function (n, r) {
                            var i = g(e[r[4]]) && e[r[4]];o[r[1]](function () {
                                var e = i && i.apply(this, arguments);e && g(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments);
                            });
                        }), e = null;
                    }).promise();
                }, then: function then(t, r, i) {
                    var o = 0;function a(t, n, r, i) {
                        return function () {
                            var s = this,
                                u = arguments,
                                l = function l() {
                                var e, l;if (!(t < o)) {
                                    if ((e = r.apply(s, u)) === n.promise()) throw new TypeError("Thenable self-resolution");l = e && ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "function" == typeof e) && e.then, g(l) ? i ? l.call(e, a(o, n, I, i), a(o, n, W, i)) : (o++, l.call(e, a(o, n, I, i), a(o, n, W, i), a(o, n, I, n.notifyWith))) : (r !== I && (s = void 0, u = [e]), (i || n.resolveWith)(s, u));
                                }
                            },
                                c = i ? l : function () {
                                try {
                                    l();
                                } catch (e) {
                                    w.Deferred.exceptionHook && w.Deferred.exceptionHook(e, c.stackTrace), t + 1 >= o && (r !== W && (s = void 0, u = [e]), n.rejectWith(s, u));
                                }
                            };t ? c() : (w.Deferred.getStackHook && (c.stackTrace = w.Deferred.getStackHook()), e.setTimeout(c));
                        };
                    }return w.Deferred(function (e) {
                        n[0][3].add(a(0, e, g(i) ? i : I, e.notifyWith)), n[1][3].add(a(0, e, g(t) ? t : I)), n[2][3].add(a(0, e, g(r) ? r : W));
                    }).promise();
                }, promise: function promise(e) {
                    return null != e ? w.extend(e, i) : i;
                } },
                o = {};return w.each(n, function (e, t) {
                var a = t[2],
                    s = t[5];i[t[1]] = a.add, s && a.add(function () {
                    r = s;
                }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), o[t[0]] = function () {
                    return o[t[0] + "With"](this === o ? void 0 : this, arguments), this;
                }, o[t[0] + "With"] = a.fireWith;
            }), i.promise(o), t && t.call(o, o), o;
        }, when: function when(e) {
            var t = arguments.length,
                n = t,
                r = Array(n),
                i = o.call(arguments),
                a = w.Deferred(),
                s = function s(e) {
                return function (n) {
                    r[e] = this, i[e] = arguments.length > 1 ? o.call(arguments) : n, --t || a.resolveWith(r, i);
                };
            };if (t <= 1 && ($(e, a.done(s(n)).resolve, a.reject, !t), "pending" === a.state() || g(i[n] && i[n].then))) return a.then();while (n--) {
                $(i[n], s(n), a.reject);
            }return a.promise();
        } });var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook = function (t, n) {
        e.console && e.console.warn && t && B.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
    }, w.readyException = function (t) {
        e.setTimeout(function () {
            throw t;
        });
    };var F = w.Deferred();w.fn.ready = function (e) {
        return F.then(e)["catch"](function (e) {
            w.readyException(e);
        }), this;
    }, w.extend({ isReady: !1, readyWait: 1, ready: function ready(e) {
            (!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0, !0 !== e && --w.readyWait > 0 || F.resolveWith(r, [w]));
        } }), w.ready.then = F.then;function _() {
        r.removeEventListener("DOMContentLoaded", _), e.removeEventListener("load", _), w.ready();
    }"complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll ? e.setTimeout(w.ready) : (r.addEventListener("DOMContentLoaded", _), e.addEventListener("load", _));var z = function z(e, t, n, r, i, o, a) {
        var s = 0,
            u = e.length,
            l = null == n;if ("object" === x(n)) {
            i = !0;for (s in n) {
                z(e, t, s, n[s], !0, o, a);
            }
        } else if (void 0 !== r && (i = !0, g(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
            return l.call(w(e), n);
        })), t)) for (; s < u; s++) {
            t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        }return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
    },
        X = /^-ms-/,
        U = /-([a-z])/g;function V(e, t) {
        return t.toUpperCase();
    }function G(e) {
        return e.replace(X, "ms-").replace(U, V);
    }var Y = function Y(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    };function Q() {
        this.expando = w.expando + Q.uid++;
    }Q.uid = 1, Q.prototype = { cache: function cache(e) {
            var t = e[this.expando];return t || (t = {}, Y(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))), t;
        }, set: function set(e, t, n) {
            var r,
                i = this.cache(e);if ("string" == typeof t) i[G(t)] = n;else for (r in t) {
                i[G(r)] = t[r];
            }return i;
        }, get: function get(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][G(t)];
        }, access: function access(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
        }, remove: function remove(e, t) {
            var n,
                r = e[this.expando];if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(G) : (t = G(t)) in r ? [t] : t.match(M) || []).length;while (n--) {
                        delete r[t[n]];
                    }
                }(void 0 === t || w.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
            }
        }, hasData: function hasData(e) {
            var t = e[this.expando];return void 0 !== t && !w.isEmptyObject(t);
        } };var J = new Q(),
        K = new Q(),
        Z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ee = /[A-Z]/g;function te(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Z.test(e) ? JSON.parse(e) : e);
    }function ne(e, t, n) {
        var r;if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(ee, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
            try {
                n = te(n);
            } catch (e) {}K.set(e, t, n);
        } else n = void 0;return n;
    }w.extend({ hasData: function hasData(e) {
            return K.hasData(e) || J.hasData(e);
        }, data: function data(e, t, n) {
            return K.access(e, t, n);
        }, removeData: function removeData(e, t) {
            K.remove(e, t);
        }, _data: function _data(e, t, n) {
            return J.access(e, t, n);
        }, _removeData: function _removeData(e, t) {
            J.remove(e, t);
        } }), w.fn.extend({ data: function data(e, t) {
            var n,
                r,
                i,
                o = this[0],
                a = o && o.attributes;if (void 0 === e) {
                if (this.length && (i = K.get(o), 1 === o.nodeType && !J.get(o, "hasDataAttrs"))) {
                    n = a.length;while (n--) {
                        a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = G(r.slice(5)), ne(o, r, i[r]));
                    }J.set(o, "hasDataAttrs", !0);
                }return i;
            }return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? this.each(function () {
                K.set(this, e);
            }) : z(this, function (t) {
                var n;if (o && void 0 === t) {
                    if (void 0 !== (n = K.get(o, e))) return n;if (void 0 !== (n = ne(o, e))) return n;
                } else this.each(function () {
                    K.set(this, e, t);
                });
            }, null, t, arguments.length > 1, null, !0);
        }, removeData: function removeData(e) {
            return this.each(function () {
                K.remove(this, e);
            });
        } }), w.extend({ queue: function queue(e, t, n) {
            var r;if (e) return t = (t || "fx") + "queue", r = J.get(e, t), n && (!r || Array.isArray(n) ? r = J.access(e, t, w.makeArray(n)) : r.push(n)), r || [];
        }, dequeue: function dequeue(e, t) {
            t = t || "fx";var n = w.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = w._queueHooks(e, t),
                a = function a() {
                w.dequeue(e, t);
            };"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
        }, _queueHooks: function _queueHooks(e, t) {
            var n = t + "queueHooks";return J.get(e, n) || J.access(e, n, { empty: w.Callbacks("once memory").add(function () {
                    J.remove(e, [t + "queue", n]);
                }) });
        } }), w.fn.extend({ queue: function queue(e, t) {
            var n = 2;return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = w.queue(this, e, t);w._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e);
            });
        }, dequeue: function dequeue(e) {
            return this.each(function () {
                w.dequeue(this, e);
            });
        }, clearQueue: function clearQueue(e) {
            return this.queue(e || "fx", []);
        }, promise: function promise(e, t) {
            var n,
                r = 1,
                i = w.Deferred(),
                o = this,
                a = this.length,
                s = function s() {
                --r || i.resolveWith(o, [o]);
            };"string" != typeof e && (t = e, e = void 0), e = e || "fx";while (a--) {
                (n = J.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            }return s(), i.promise(t);
        } });var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ie = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"),
        oe = ["Top", "Right", "Bottom", "Left"],
        ae = function ae(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && w.contains(e.ownerDocument, e) && "none" === w.css(e, "display");
    },
        se = function se(e, t, n, r) {
        var i,
            o,
            a = {};for (o in t) {
            a[o] = e.style[o], e.style[o] = t[o];
        }i = n.apply(e, r || []);for (o in t) {
            e.style[o] = a[o];
        }return i;
    };function ue(e, t, n, r) {
        var i,
            o,
            a = 20,
            s = r ? function () {
            return r.cur();
        } : function () {
            return w.css(e, t, "");
        },
            u = s(),
            l = n && n[3] || (w.cssNumber[t] ? "" : "px"),
            c = (w.cssNumber[t] || "px" !== l && +u) && ie.exec(w.css(e, t));if (c && c[3] !== l) {
            u /= 2, l = l || c[3], c = +u || 1;while (a--) {
                w.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
            }c *= 2, w.style(e, t, c + l), n = n || [];
        }return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
    }var le = {};function ce(e) {
        var t,
            n = e.ownerDocument,
            r = e.nodeName,
            i = le[r];return i || (t = n.body.appendChild(n.createElement(r)), i = w.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), le[r] = i, i);
    }function fe(e, t) {
        for (var n, r, i = [], o = 0, a = e.length; o < a; o++) {
            (r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = J.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && ae(r) && (i[o] = ce(r))) : "none" !== n && (i[o] = "none", J.set(r, "display", n)));
        }for (o = 0; o < a; o++) {
            null != i[o] && (e[o].style.display = i[o]);
        }return e;
    }w.fn.extend({ show: function show() {
            return fe(this, !0);
        }, hide: function hide() {
            return fe(this);
        }, toggle: function toggle(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                ae(this) ? w(this).show() : w(this).hide();
            });
        } });var pe = /^(?:checkbox|radio)$/i,
        de = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        he = /^$|^module$|\/(?:java|ecma)script/i,
        ge = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ge.optgroup = ge.option, ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td;function ye(e, t) {
        var n;return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && N(e, t) ? w.merge([e], n) : n;
    }function ve(e, t) {
        for (var n = 0, r = e.length; n < r; n++) {
            J.set(e[n], "globalEval", !t || J.get(t[n], "globalEval"));
        }
    }var me = /<|&#?\w+;/;function xe(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++) {
            if ((o = e[d]) || 0 === o) if ("object" === x(o)) w.merge(p, o.nodeType ? [o] : o);else if (me.test(o)) {
                a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + w.htmlPrefilter(o) + u[2], c = u[0];while (c--) {
                    a = a.lastChild;
                }w.merge(p, a.childNodes), (a = f.firstChild).textContent = "";
            } else p.push(t.createTextNode(o));
        }f.textContent = "", d = 0;while (o = p[d++]) {
            if (r && w.inArray(o, r) > -1) i && i.push(o);else if (l = w.contains(o.ownerDocument, o), a = ye(f.appendChild(o), "script"), l && ve(a), n) {
                c = 0;while (o = a[c++]) {
                    he.test(o.type || "") && n.push(o);
                }
            }
        }return f;
    }!function () {
        var e = r.createDocumentFragment().appendChild(r.createElement("div")),
            t = r.createElement("input");t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), h.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue;
    }();var be = r.documentElement,
        we = /^key/,
        Te = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Ce = /^([^.]*)(?:\.(.+)|)/;function Ee() {
        return !0;
    }function ke() {
        return !1;
    }function Se() {
        try {
            return r.activeElement;
        } catch (e) {}
    }function De(e, t, n, r, i, o) {
        var a, s;if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
            "string" != typeof n && (r = r || n, n = void 0);for (s in t) {
                De(e, s, n, r, t[s], o);
            }return e;
        }if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = ke;else if (!i) return e;return 1 === o && (a = i, (i = function i(e) {
            return w().off(e), a.apply(this, arguments);
        }).guid = a.guid || (a.guid = w.guid++)), e.each(function () {
            w.event.add(this, t, i, r, n);
        });
    }w.event = { global: {}, add: function add(e, t, n, r, i) {
            var o,
                a,
                s,
                u,
                l,
                c,
                f,
                p,
                d,
                h,
                g,
                y = J.get(e);if (y) {
                n.handler && (n = (o = n).handler, i = o.selector), i && w.find.matchesSelector(be, i), n.guid || (n.guid = w.guid++), (u = y.events) || (u = y.events = {}), (a = y.handle) || (a = y.handle = function (t) {
                    return "undefined" != typeof w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0;
                }), l = (t = (t || "").match(M) || [""]).length;while (l--) {
                    d = g = (s = Ce.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = w.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = w.event.special[d] || {}, c = w.extend({ type: d, origType: g, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && w.expr.match.needsContext.test(i), namespace: h.join(".") }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(d, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), w.event.global[d] = !0);
                }
            }
        }, remove: function remove(e, t, n, r, i) {
            var o,
                a,
                s,
                u,
                l,
                c,
                f,
                p,
                d,
                h,
                g,
                y = J.hasData(e) && J.get(e);if (y && (u = y.events)) {
                l = (t = (t || "").match(M) || [""]).length;while (l--) {
                    if (s = Ce.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
                        f = w.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;while (o--) {
                            c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                        }a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, y.handle) || w.removeEvent(e, d, y.handle), delete u[d]);
                    } else for (d in u) {
                        w.event.remove(e, d + t[l], n, r, !0);
                    }
                }w.isEmptyObject(u) && J.remove(e, "handle events");
            }
        }, dispatch: function dispatch(e) {
            var t = w.event.fix(e),
                n,
                r,
                i,
                o,
                a,
                s,
                u = new Array(arguments.length),
                l = (J.get(this, "events") || {})[t.type] || [],
                c = w.event.special[t.type] || {};for (u[0] = t, n = 1; n < arguments.length; n++) {
                u[n] = arguments[n];
            }if (t.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, t)) {
                s = w.event.handlers.call(this, t, l), n = 0;while ((o = s[n++]) && !t.isPropagationStopped()) {
                    t.currentTarget = o.elem, r = 0;while ((a = o.handlers[r++]) && !t.isImmediatePropagationStopped()) {
                        t.rnamespace && !t.rnamespace.test(a.namespace) || (t.handleObj = a, t.data = a.data, void 0 !== (i = ((w.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
                    }
                }return c.postDispatch && c.postDispatch.call(this, t), t.result;
            }
        }, handlers: function handlers(e, t) {
            var n,
                r,
                i,
                o,
                a,
                s = [],
                u = t.delegateCount,
                l = e.target;if (u && l.nodeType && !("click" === e.type && e.button >= 1)) for (; l !== this; l = l.parentNode || this) {
                if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                    for (o = [], a = {}, n = 0; n < u; n++) {
                        void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? w(i, this).index(l) > -1 : w.find(i, this, null, [l]).length), a[i] && o.push(r);
                    }o.length && s.push({ elem: l, handlers: o });
                }
            }return l = this, u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s;
        }, addProp: function addProp(e, t) {
            Object.defineProperty(w.Event.prototype, e, { enumerable: !0, configurable: !0, get: g(t) ? function () {
                    if (this.originalEvent) return t(this.originalEvent);
                } : function () {
                    if (this.originalEvent) return this.originalEvent[e];
                }, set: function set(t) {
                    Object.defineProperty(this, e, { enumerable: !0, configurable: !0, writable: !0, value: t });
                } });
        }, fix: function fix(e) {
            return e[w.expando] ? e : new w.Event(e);
        }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
                    if (this !== Se() && this.focus) return this.focus(), !1;
                }, delegateType: "focusin" }, blur: { trigger: function trigger() {
                    if (this === Se() && this.blur) return this.blur(), !1;
                }, delegateType: "focusout" }, click: { trigger: function trigger() {
                    if ("checkbox" === this.type && this.click && N(this, "input")) return this.click(), !1;
                }, _default: function _default(e) {
                    return N(e.target, "a");
                } }, beforeunload: { postDispatch: function postDispatch(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                } } } }, w.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n);
    }, w.Event = function (e, t) {
        if (!(this instanceof w.Event)) return new w.Event(e, t);e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ee : ke, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && w.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[w.expando] = !0;
    }, w.Event.prototype = { constructor: w.Event, isDefaultPrevented: ke, isPropagationStopped: ke, isImmediatePropagationStopped: ke, isSimulated: !1, preventDefault: function preventDefault() {
            var e = this.originalEvent;this.isDefaultPrevented = Ee, e && !this.isSimulated && e.preventDefault();
        }, stopPropagation: function stopPropagation() {
            var e = this.originalEvent;this.isPropagationStopped = Ee, e && !this.isSimulated && e.stopPropagation();
        }, stopImmediatePropagation: function stopImmediatePropagation() {
            var e = this.originalEvent;this.isImmediatePropagationStopped = Ee, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
        } }, w.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(e) {
            var t = e.button;return null == e.which && we.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Te.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
        } }, w.event.addProp), w.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, t) {
        w.event.special[e] = { delegateType: t, bindType: t, handle: function handle(e) {
                var n,
                    r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;return i && (i === r || w.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n;
            } };
    }), w.fn.extend({ on: function on(e, t, n, r) {
            return De(this, e, t, n, r);
        }, one: function one(e, t, n, r) {
            return De(this, e, t, n, r, 1);
        }, off: function off(e, t, n) {
            var r, i;if (e && e.preventDefault && e.handleObj) return r = e.handleObj, w(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
                for (i in e) {
                    this.off(i, t, e[i]);
                }return this;
            }return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = ke), this.each(function () {
                w.event.remove(this, e, n, t);
            });
        } });var Ne = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        Ae = /<script|<style|<link/i,
        je = /checked\s*(?:[^=]|=\s*.checked.)/i,
        qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e, t) {
        return N(e, "table") && N(11 !== t.nodeType ? t : t.firstChild, "tr") ? w(e).children("tbody")[0] || e : e;
    }function He(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
    }function Oe(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
    }function Pe(e, t) {
        var n, r, i, o, a, s, u, l;if (1 === t.nodeType) {
            if (J.hasData(e) && (o = J.access(e), a = J.set(t, o), l = o.events)) {
                delete a.handle, a.events = {};for (i in l) {
                    for (n = 0, r = l[i].length; n < r; n++) {
                        w.event.add(t, i, l[i][n]);
                    }
                }
            }K.hasData(e) && (s = K.access(e), u = w.extend({}, s), K.set(t, u));
        }
    }function Me(e, t) {
        var n = t.nodeName.toLowerCase();"input" === n && pe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue);
    }function Re(e, t, n, r) {
        t = a.apply([], t);var i,
            o,
            s,
            u,
            l,
            c,
            f = 0,
            p = e.length,
            d = p - 1,
            y = t[0],
            v = g(y);if (v || p > 1 && "string" == typeof y && !h.checkClone && je.test(y)) return e.each(function (i) {
            var o = e.eq(i);v && (t[0] = y.call(this, i, o.html())), Re(o, t, n, r);
        });if (p && (i = xe(t, e[0].ownerDocument, !1, e, r), o = i.firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
            for (u = (s = w.map(ye(i, "script"), He)).length; f < p; f++) {
                l = i, f !== d && (l = w.clone(l, !0, !0), u && w.merge(s, ye(l, "script"))), n.call(e[f], l, f);
            }if (u) for (c = s[s.length - 1].ownerDocument, w.map(s, Oe), f = 0; f < u; f++) {
                l = s[f], he.test(l.type || "") && !J.access(l, "globalEval") && w.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? w._evalUrl && w._evalUrl(l.src) : m(l.textContent.replace(qe, ""), c, l));
            }
        }return e;
    }function Ie(e, t, n) {
        for (var r, i = t ? w.filter(t, e) : e, o = 0; null != (r = i[o]); o++) {
            n || 1 !== r.nodeType || w.cleanData(ye(r)), r.parentNode && (n && w.contains(r.ownerDocument, r) && ve(ye(r, "script")), r.parentNode.removeChild(r));
        }return e;
    }w.extend({ htmlPrefilter: function htmlPrefilter(e) {
            return e.replace(Ne, "<$1></$2>");
        }, clone: function clone(e, t, n) {
            var r,
                i,
                o,
                a,
                s = e.cloneNode(!0),
                u = w.contains(e.ownerDocument, e);if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e))) for (a = ye(s), r = 0, i = (o = ye(e)).length; r < i; r++) {
                Me(o[r], a[r]);
            }if (t) if (n) for (o = o || ye(e), a = a || ye(s), r = 0, i = o.length; r < i; r++) {
                Pe(o[r], a[r]);
            } else Pe(e, s);return (a = ye(s, "script")).length > 0 && ve(a, !u && ye(e, "script")), s;
        }, cleanData: function cleanData(e) {
            for (var t, n, r, i = w.event.special, o = 0; void 0 !== (n = e[o]); o++) {
                if (Y(n)) {
                    if (t = n[J.expando]) {
                        if (t.events) for (r in t.events) {
                            i[r] ? w.event.remove(n, r) : w.removeEvent(n, r, t.handle);
                        }n[J.expando] = void 0;
                    }n[K.expando] && (n[K.expando] = void 0);
                }
            }
        } }), w.fn.extend({ detach: function detach(e) {
            return Ie(this, e, !0);
        }, remove: function remove(e) {
            return Ie(this, e);
        }, text: function text(e) {
            return z(this, function (e) {
                return void 0 === e ? w.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
                });
            }, null, e, arguments.length);
        }, append: function append() {
            return Re(this, arguments, function (e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Le(this, e).appendChild(e);
            });
        }, prepend: function prepend() {
            return Re(this, arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Le(this, e);t.insertBefore(e, t.firstChild);
                }
            });
        }, before: function before() {
            return Re(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
            });
        }, after: function after() {
            return Re(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
            });
        }, empty: function empty() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                1 === e.nodeType && (w.cleanData(ye(e, !1)), e.textContent = "");
            }return this;
        }, clone: function clone(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return w.clone(this, e, t);
            });
        }, html: function html(e) {
            return z(this, function (e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;if (void 0 === e && 1 === t.nodeType) return t.innerHTML;if ("string" == typeof e && !Ae.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = w.htmlPrefilter(e);try {
                        for (; n < r; n++) {
                            1 === (t = this[n] || {}).nodeType && (w.cleanData(ye(t, !1)), t.innerHTML = e);
                        }t = 0;
                    } catch (e) {}
                }t && this.empty().append(e);
            }, null, e, arguments.length);
        }, replaceWith: function replaceWith() {
            var e = [];return Re(this, arguments, function (t) {
                var n = this.parentNode;w.inArray(this, e) < 0 && (w.cleanData(ye(this)), n && n.replaceChild(t, this));
            }, e);
        } }), w.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
        w.fn[e] = function (e) {
            for (var n, r = [], i = w(e), o = i.length - 1, a = 0; a <= o; a++) {
                n = a === o ? this : this.clone(!0), w(i[a])[t](n), s.apply(r, n.get());
            }return this.pushStack(r);
        };
    });var We = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"),
        $e = function $e(t) {
        var n = t.ownerDocument.defaultView;return n && n.opener || (n = e), n.getComputedStyle(t);
    },
        Be = new RegExp(oe.join("|"), "i");!function () {
        function t() {
            if (c) {
                l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", be.appendChild(l).appendChild(c);var t = e.getComputedStyle(c);i = "1%" !== t.top, u = 12 === n(t.marginLeft), c.style.right = "60%", s = 36 === n(t.right), o = 36 === n(t.width), c.style.position = "absolute", a = 36 === c.offsetWidth || "absolute", be.removeChild(l), c = null;
            }
        }function n(e) {
            return Math.round(parseFloat(e));
        }var i,
            o,
            a,
            s,
            u,
            l = r.createElement("div"),
            c = r.createElement("div");c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === c.style.backgroundClip, w.extend(h, { boxSizingReliable: function boxSizingReliable() {
                return t(), o;
            }, pixelBoxStyles: function pixelBoxStyles() {
                return t(), s;
            }, pixelPosition: function pixelPosition() {
                return t(), i;
            }, reliableMarginLeft: function reliableMarginLeft() {
                return t(), u;
            }, scrollboxSize: function scrollboxSize() {
                return t(), a;
            } }));
    }();function Fe(e, t, n) {
        var r,
            i,
            o,
            a,
            s = e.style;return (n = n || $e(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || w.contains(e.ownerDocument, e) || (a = w.style(e, t)), !h.pixelBoxStyles() && We.test(a) && Be.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a;
    }function _e(e, t) {
        return { get: function get() {
                if (!e()) return (this.get = t).apply(this, arguments);delete this.get;
            } };
    }var ze = /^(none|table(?!-c[ea]).+)/,
        Xe = /^--/,
        Ue = { position: "absolute", visibility: "hidden", display: "block" },
        Ve = { letterSpacing: "0", fontWeight: "400" },
        Ge = ["Webkit", "Moz", "ms"],
        Ye = r.createElement("div").style;function Qe(e) {
        if (e in Ye) return e;var t = e[0].toUpperCase() + e.slice(1),
            n = Ge.length;while (n--) {
            if ((e = Ge[n] + t) in Ye) return e;
        }
    }function Je(e) {
        var t = w.cssProps[e];return t || (t = w.cssProps[e] = Qe(e) || e), t;
    }function Ke(e, t, n) {
        var r = ie.exec(t);return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
    }function Ze(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0,
            s = 0,
            u = 0;if (n === (r ? "border" : "content")) return 0;for (; a < 4; a += 2) {
            "margin" === n && (u += w.css(e, n + oe[a], !0, i)), r ? ("content" === n && (u -= w.css(e, "padding" + oe[a], !0, i)), "margin" !== n && (u -= w.css(e, "border" + oe[a] + "Width", !0, i))) : (u += w.css(e, "padding" + oe[a], !0, i), "padding" !== n ? u += w.css(e, "border" + oe[a] + "Width", !0, i) : s += w.css(e, "border" + oe[a] + "Width", !0, i));
        }return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5))), u;
    }function et(e, t, n) {
        var r = $e(e),
            i = Fe(e, t, r),
            o = "border-box" === w.css(e, "boxSizing", !1, r),
            a = o;if (We.test(i)) {
            if (!n) return i;i = "auto";
        }return a = a && (h.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === w.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], a = !0), (i = parseFloat(i) || 0) + Ze(e, t, n || (o ? "border" : "content"), a, r, i) + "px";
    }w.extend({ cssHooks: { opacity: { get: function get(e, t) {
                    if (t) {
                        var n = Fe(e, "opacity");return "" === n ? "1" : n;
                    }
                } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: {}, style: function style(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i,
                    o,
                    a,
                    s = G(t),
                    u = Xe.test(t),
                    l = e.style;if (u || (t = Je(s)), a = w.cssHooks[t] || w.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];"string" == (o = typeof n === "undefined" ? "undefined" : _typeof(n)) && (i = ie.exec(n)) && i[1] && (n = ue(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (w.cssNumber[s] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n));
            }
        }, css: function css(e, t, n, r) {
            var i,
                o,
                a,
                s = G(t);return Xe.test(t) || (t = Je(s)), (a = w.cssHooks[t] || w.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Fe(e, t, r)), "normal" === i && t in Ve && (i = Ve[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i;
        } }), w.each(["height", "width"], function (e, t) {
        w.cssHooks[t] = { get: function get(e, n, r) {
                if (n) return !ze.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? et(e, t, r) : se(e, Ue, function () {
                    return et(e, t, r);
                });
            }, set: function set(e, n, r) {
                var i,
                    o = $e(e),
                    a = "border-box" === w.css(e, "boxSizing", !1, o),
                    s = r && Ze(e, t, r, a, o);return a && h.scrollboxSize() === o.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ze(e, t, "border", !1, o) - .5)), s && (i = ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = w.css(e, t)), Ke(e, n, s);
            } };
    }), w.cssHooks.marginLeft = _e(h.reliableMarginLeft, function (e, t) {
        if (t) return (parseFloat(Fe(e, "marginLeft")) || e.getBoundingClientRect().left - se(e, { marginLeft: 0 }, function () {
            return e.getBoundingClientRect().left;
        })) + "px";
    }), w.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
        w.cssHooks[e + t] = { expand: function expand(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) {
                    i[e + oe[r] + t] = o[r] || o[r - 2] || o[0];
                }return i;
            } }, "margin" !== e && (w.cssHooks[e + t].set = Ke);
    }), w.fn.extend({ css: function css(e, t) {
            return z(this, function (e, t, n) {
                var r,
                    i,
                    o = {},
                    a = 0;if (Array.isArray(t)) {
                    for (r = $e(e), i = t.length; a < i; a++) {
                        o[t[a]] = w.css(e, t[a], !1, r);
                    }return o;
                }return void 0 !== n ? w.style(e, t, n) : w.css(e, t);
            }, e, t, arguments.length > 1);
        } });function tt(e, t, n, r, i) {
        return new tt.prototype.init(e, t, n, r, i);
    }w.Tween = tt, tt.prototype = { constructor: tt, init: function init(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || w.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (w.cssNumber[n] ? "" : "px");
        }, cur: function cur() {
            var e = tt.propHooks[this.prop];return e && e.get ? e.get(this) : tt.propHooks._default.get(this);
        }, run: function run(e) {
            var t,
                n = tt.propHooks[this.prop];return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : tt.propHooks._default.set(this), this;
        } }, tt.prototype.init.prototype = tt.prototype, tt.propHooks = { _default: { get: function get(e) {
                var t;return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
            }, set: function set(e) {
                w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[w.cssProps[e.prop]] && !w.cssHooks[e.prop] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit);
            } } }, tt.propHooks.scrollTop = tt.propHooks.scrollLeft = { set: function set(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        } }, w.easing = { linear: function linear(e) {
            return e;
        }, swing: function swing(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        }, _default: "swing" }, w.fx = tt.prototype.init, w.fx.step = {};var nt,
        rt,
        it = /^(?:toggle|show|hide)$/,
        ot = /queueHooks$/;function at() {
        rt && (!1 === r.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(at) : e.setTimeout(at, w.fx.interval), w.fx.tick());
    }function st() {
        return e.setTimeout(function () {
            nt = void 0;
        }), nt = Date.now();
    }function ut(e, t) {
        var n,
            r = 0,
            i = { height: e };for (t = t ? 1 : 0; r < 4; r += 2 - t) {
            i["margin" + (n = oe[r])] = i["padding" + n] = e;
        }return t && (i.opacity = i.width = e), i;
    }function lt(e, t, n) {
        for (var r, i = (pt.tweeners[t] || []).concat(pt.tweeners["*"]), o = 0, a = i.length; o < a; o++) {
            if (r = i[o].call(n, t, e)) return r;
        }
    }function ct(e, t, n) {
        var r,
            i,
            o,
            a,
            s,
            u,
            l,
            c,
            f = "width" in t || "height" in t,
            p = this,
            d = {},
            h = e.style,
            g = e.nodeType && ae(e),
            y = J.get(e, "fxshow");n.queue || (null == (a = w._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
            a.unqueued || s();
        }), a.unqueued++, p.always(function () {
            p.always(function () {
                a.unqueued--, w.queue(e, "fx").length || a.empty.fire();
            });
        }));for (r in t) {
            if (i = t[r], it.test(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                    if ("show" !== i || !y || void 0 === y[r]) continue;g = !0;
                }d[r] = y && y[r] || w.style(e, r);
            }
        }if ((u = !w.isEmptyObject(t)) || !w.isEmptyObject(d)) {
            f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = y && y.display) && (l = J.get(e, "display")), "none" === (c = w.css(e, "display")) && (l ? c = l : (fe([e], !0), l = e.style.display || l, c = w.css(e, "display"), fe([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === w.css(e, "float") && (u || (p.done(function () {
                h.display = l;
            }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
            })), u = !1;for (r in d) {
                u || (y ? "hidden" in y && (g = y.hidden) : y = J.access(e, "fxshow", { display: l }), o && (y.hidden = !g), g && fe([e], !0), p.done(function () {
                    g || fe([e]), J.remove(e, "fxshow");for (r in d) {
                        w.style(e, r, d[r]);
                    }
                })), u = lt(g ? y[r] : 0, r, p), r in y || (y[r] = u.start, g && (u.end = u.start, u.start = 0));
            }
        }
    }function ft(e, t) {
        var n, r, i, o, a;for (n in e) {
            if (r = G(n), i = t[r], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = w.cssHooks[r]) && "expand" in a) {
                o = a.expand(o), delete e[r];for (n in o) {
                    n in e || (e[n] = o[n], t[n] = i);
                }
            } else t[r] = i;
        }
    }function pt(e, t, n) {
        var r,
            i,
            o = 0,
            a = pt.prefilters.length,
            s = w.Deferred().always(function () {
            delete u.elem;
        }),
            u = function u() {
            if (i) return !1;for (var t = nt || st(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) {
                l.tweens[o].run(r);
            }return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1);
        },
            l = s.promise({ elem: e, props: w.extend({}, t), opts: w.extend(!0, { specialEasing: {}, easing: w.easing._default }, n), originalProperties: t, originalOptions: n, startTime: nt || st(), duration: n.duration, tweens: [], createTween: function createTween(t, n) {
                var r = w.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);return l.tweens.push(r), r;
            }, stop: function stop(t) {
                var n = 0,
                    r = t ? l.tweens.length : 0;if (i) return this;for (i = !0; n < r; n++) {
                    l.tweens[n].run(1);
                }return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this;
            } }),
            c = l.props;for (ft(c, l.opts.specialEasing); o < a; o++) {
            if (r = pt.prefilters[o].call(l, e, c, l.opts)) return g(r.stop) && (w._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
        }return w.map(c, lt, l), g(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), w.fx.timer(w.extend(u, { elem: e, anim: l, queue: l.opts.queue })), l;
    }w.Animation = w.extend(pt, { tweeners: { "*": [function (e, t) {
                var n = this.createTween(e, t);return ue(n.elem, e, ie.exec(t), n), n;
            }] }, tweener: function tweener(e, t) {
            g(e) ? (t = e, e = ["*"]) : e = e.match(M);for (var n, r = 0, i = e.length; r < i; r++) {
                n = e[r], pt.tweeners[n] = pt.tweeners[n] || [], pt.tweeners[n].unshift(t);
            }
        }, prefilters: [ct], prefilter: function prefilter(e, t) {
            t ? pt.prefilters.unshift(e) : pt.prefilters.push(e);
        } }), w.speed = function (e, t, n) {
        var r = e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? w.extend({}, e) : { complete: n || !n && t || g(e) && e, duration: e, easing: n && t || t && !g(t) && t };return w.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in w.fx.speeds ? r.duration = w.fx.speeds[r.duration] : r.duration = w.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            g(r.old) && r.old.call(this), r.queue && w.dequeue(this, r.queue);
        }, r;
    }, w.fn.extend({ fadeTo: function fadeTo(e, t, n, r) {
            return this.filter(ae).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
        }, animate: function animate(e, t, n, r) {
            var i = w.isEmptyObject(e),
                o = w.speed(t, n, r),
                a = function a() {
                var t = pt(this, w.extend({}, e), o);(i || J.get(this, "finish")) && t.stop(!0);
            };return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
        }, stop: function stop(e, t, n) {
            var r = function r(e) {
                var t = e.stop;delete e.stop, t(n);
            };return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
                var t = !0,
                    i = null != e && e + "queueHooks",
                    o = w.timers,
                    a = J.get(this);if (i) a[i] && a[i].stop && r(a[i]);else for (i in a) {
                    a[i] && a[i].stop && ot.test(i) && r(a[i]);
                }for (i = o.length; i--;) {
                    o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                }!t && n || w.dequeue(this, e);
            });
        }, finish: function finish(e) {
            return !1 !== e && (e = e || "fx"), this.each(function () {
                var t,
                    n = J.get(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    o = w.timers,
                    a = r ? r.length : 0;for (n.finish = !0, w.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) {
                    o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                }for (t = 0; t < a; t++) {
                    r[t] && r[t].finish && r[t].finish.call(this);
                }delete n.finish;
            });
        } }), w.each(["toggle", "show", "hide"], function (e, t) {
        var n = w.fn[t];w.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ut(t, !0), e, r, i);
        };
    }), w.each({ slideDown: ut("show"), slideUp: ut("hide"), slideToggle: ut("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
        w.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r);
        };
    }), w.timers = [], w.fx.tick = function () {
        var e,
            t = 0,
            n = w.timers;for (nt = Date.now(); t < n.length; t++) {
            (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        }n.length || w.fx.stop(), nt = void 0;
    }, w.fx.timer = function (e) {
        w.timers.push(e), w.fx.start();
    }, w.fx.interval = 13, w.fx.start = function () {
        rt || (rt = !0, at());
    }, w.fx.stop = function () {
        rt = null;
    }, w.fx.speeds = { slow: 600, fast: 200, _default: 400 }, w.fn.delay = function (t, n) {
        return t = w.fx ? w.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, r) {
            var i = e.setTimeout(n, t);r.stop = function () {
                e.clearTimeout(i);
            };
        });
    }, function () {
        var e = r.createElement("input"),
            t = r.createElement("select").appendChild(r.createElement("option"));e.type = "checkbox", h.checkOn = "" !== e.value, h.optSelected = t.selected, (e = r.createElement("input")).value = "t", e.type = "radio", h.radioValue = "t" === e.value;
    }();var dt,
        ht = w.expr.attrHandle;w.fn.extend({ attr: function attr(e, t) {
            return z(this, w.attr, e, t, arguments.length > 1);
        }, removeAttr: function removeAttr(e) {
            return this.each(function () {
                w.removeAttr(this, e);
            });
        } }), w.extend({ attr: function attr(e, t, n) {
            var r,
                i,
                o = e.nodeType;if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? w.prop(e, t, n) : (1 === o && w.isXMLDoc(e) || (i = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? dt : void 0)), void 0 !== n ? null === n ? void w.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = w.find.attr(e, t)) ? void 0 : r);
        }, attrHooks: { type: { set: function set(e, t) {
                    if (!h.radioValue && "radio" === t && N(e, "input")) {
                        var n = e.value;return e.setAttribute("type", t), n && (e.value = n), t;
                    }
                } } }, removeAttr: function removeAttr(e, t) {
            var n,
                r = 0,
                i = t && t.match(M);if (i && 1 === e.nodeType) while (n = i[r++]) {
                e.removeAttribute(n);
            }
        } }), dt = { set: function set(e, t, n) {
            return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n;
        } }, w.each(w.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = ht[t] || w.find.attr;ht[t] = function (e, t, r) {
            var i,
                o,
                a = t.toLowerCase();return r || (o = ht[a], ht[a] = i, i = null != n(e, t, r) ? a : null, ht[a] = o), i;
        };
    });var gt = /^(?:input|select|textarea|button)$/i,
        yt = /^(?:a|area)$/i;w.fn.extend({ prop: function prop(e, t) {
            return z(this, w.prop, e, t, arguments.length > 1);
        }, removeProp: function removeProp(e) {
            return this.each(function () {
                delete this[w.propFix[e] || e];
            });
        } }), w.extend({ prop: function prop(e, t, n) {
            var r,
                i,
                o = e.nodeType;if (3 !== o && 8 !== o && 2 !== o) return 1 === o && w.isXMLDoc(e) || (t = w.propFix[t] || t, i = w.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
        }, propHooks: { tabIndex: { get: function get(e) {
                    var t = w.find.attr(e, "tabindex");return t ? parseInt(t, 10) : gt.test(e.nodeName) || yt.test(e.nodeName) && e.href ? 0 : -1;
                } } }, propFix: { "for": "htmlFor", "class": "className" } }), h.optSelected || (w.propHooks.selected = { get: function get(e) {
            var t = e.parentNode;return t && t.parentNode && t.parentNode.selectedIndex, null;
        }, set: function set(e) {
            var t = e.parentNode;t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        } }), w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        w.propFix[this.toLowerCase()] = this;
    });function vt(e) {
        return (e.match(M) || []).join(" ");
    }function mt(e) {
        return e.getAttribute && e.getAttribute("class") || "";
    }function xt(e) {
        return Array.isArray(e) ? e : "string" == typeof e ? e.match(M) || [] : [];
    }w.fn.extend({ addClass: function addClass(e) {
            var t,
                n,
                r,
                i,
                o,
                a,
                s,
                u = 0;if (g(e)) return this.each(function (t) {
                w(this).addClass(e.call(this, t, mt(this)));
            });if ((t = xt(e)).length) while (n = this[u++]) {
                if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
                    a = 0;while (o = t[a++]) {
                        r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                    }i !== (s = vt(r)) && n.setAttribute("class", s);
                }
            }return this;
        }, removeClass: function removeClass(e) {
            var t,
                n,
                r,
                i,
                o,
                a,
                s,
                u = 0;if (g(e)) return this.each(function (t) {
                w(this).removeClass(e.call(this, t, mt(this)));
            });if (!arguments.length) return this.attr("class", "");if ((t = xt(e)).length) while (n = this[u++]) {
                if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
                    a = 0;while (o = t[a++]) {
                        while (r.indexOf(" " + o + " ") > -1) {
                            r = r.replace(" " + o + " ", " ");
                        }
                    }i !== (s = vt(r)) && n.setAttribute("class", s);
                }
            }return this;
        }, toggleClass: function toggleClass(e, t) {
            var n = typeof e === "undefined" ? "undefined" : _typeof(e),
                r = "string" === n || Array.isArray(e);return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : g(e) ? this.each(function (n) {
                w(this).toggleClass(e.call(this, n, mt(this), t), t);
            }) : this.each(function () {
                var t, i, o, a;if (r) {
                    i = 0, o = w(this), a = xt(e);while (t = a[i++]) {
                        o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                    }
                } else void 0 !== e && "boolean" !== n || ((t = mt(this)) && J.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : J.get(this, "__className__") || ""));
            });
        }, hasClass: function hasClass(e) {
            var t,
                n,
                r = 0;t = " " + e + " ";while (n = this[r++]) {
                if (1 === n.nodeType && (" " + vt(mt(n)) + " ").indexOf(t) > -1) return !0;
            }return !1;
        } });var bt = /\r/g;w.fn.extend({ val: function val(e) {
            var t,
                n,
                r,
                i = this[0];{
                if (arguments.length) return r = g(e), this.each(function (n) {
                    var i;1 === this.nodeType && (null == (i = r ? e.call(this, n, w(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = w.map(i, function (e) {
                        return null == e ? "" : e + "";
                    })), (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i));
                });if (i) return (t = w.valHooks[i.type] || w.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(bt, "") : null == n ? "" : n;
            }
        } }), w.extend({ valHooks: { option: { get: function get(e) {
                    var t = w.find.attr(e, "value");return null != t ? t : vt(w.text(e));
                } }, select: { get: function get(e) {
                    var t,
                        n,
                        r,
                        i = e.options,
                        o = e.selectedIndex,
                        a = "select-one" === e.type,
                        s = a ? null : [],
                        u = a ? o + 1 : i.length;for (r = o < 0 ? u : a ? o : 0; r < u; r++) {
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !N(n.parentNode, "optgroup"))) {
                            if (t = w(n).val(), a) return t;s.push(t);
                        }
                    }return s;
                }, set: function set(e, t) {
                    var n,
                        r,
                        i = e.options,
                        o = w.makeArray(t),
                        a = i.length;while (a--) {
                        ((r = i[a]).selected = w.inArray(w.valHooks.option.get(r), o) > -1) && (n = !0);
                    }return n || (e.selectedIndex = -1), o;
                } } } }), w.each(["radio", "checkbox"], function () {
        w.valHooks[this] = { set: function set(e, t) {
                if (Array.isArray(t)) return e.checked = w.inArray(w(e).val(), t) > -1;
            } }, h.checkOn || (w.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
        });
    }), h.focusin = "onfocusin" in e;var wt = /^(?:focusinfocus|focusoutblur)$/,
        Tt = function Tt(e) {
        e.stopPropagation();
    };w.extend(w.event, { trigger: function trigger(t, n, i, o) {
            var a,
                s,
                u,
                l,
                c,
                p,
                d,
                h,
                v = [i || r],
                m = f.call(t, "type") ? t.type : t,
                x = f.call(t, "namespace") ? t.namespace.split(".") : [];if (s = h = u = i = i || r, 3 !== i.nodeType && 8 !== i.nodeType && !wt.test(m + w.event.triggered) && (m.indexOf(".") > -1 && (m = (x = m.split(".")).shift(), x.sort()), c = m.indexOf(":") < 0 && "on" + m, t = t[w.expando] ? t : new w.Event(m, "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t), t.isTrigger = o ? 2 : 3, t.namespace = x.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : w.makeArray(n, [t]), d = w.event.special[m] || {}, o || !d.trigger || !1 !== d.trigger.apply(i, n))) {
                if (!o && !d.noBubble && !y(i)) {
                    for (l = d.delegateType || m, wt.test(l + m) || (s = s.parentNode); s; s = s.parentNode) {
                        v.push(s), u = s;
                    }u === (i.ownerDocument || r) && v.push(u.defaultView || u.parentWindow || e);
                }a = 0;while ((s = v[a++]) && !t.isPropagationStopped()) {
                    h = s, t.type = a > 1 ? l : d.bindType || m, (p = (J.get(s, "events") || {})[t.type] && J.get(s, "handle")) && p.apply(s, n), (p = c && s[c]) && p.apply && Y(s) && (t.result = p.apply(s, n), !1 === t.result && t.preventDefault());
                }return t.type = m, o || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(v.pop(), n) || !Y(i) || c && g(i[m]) && !y(i) && ((u = i[c]) && (i[c] = null), w.event.triggered = m, t.isPropagationStopped() && h.addEventListener(m, Tt), i[m](), t.isPropagationStopped() && h.removeEventListener(m, Tt), w.event.triggered = void 0, u && (i[c] = u)), t.result;
            }
        }, simulate: function simulate(e, t, n) {
            var r = w.extend(new w.Event(), n, { type: e, isSimulated: !0 });w.event.trigger(r, null, t);
        } }), w.fn.extend({ trigger: function trigger(e, t) {
            return this.each(function () {
                w.event.trigger(e, t, this);
            });
        }, triggerHandler: function triggerHandler(e, t) {
            var n = this[0];if (n) return w.event.trigger(e, t, n, !0);
        } }), h.focusin || w.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        var n = function n(e) {
            w.event.simulate(t, e.target, w.event.fix(e));
        };w.event.special[t] = { setup: function setup() {
                var r = this.ownerDocument || this,
                    i = J.access(r, t);i || r.addEventListener(e, n, !0), J.access(r, t, (i || 0) + 1);
            }, teardown: function teardown() {
                var r = this.ownerDocument || this,
                    i = J.access(r, t) - 1;i ? J.access(r, t, i) : (r.removeEventListener(e, n, !0), J.remove(r, t));
            } };
    });var Ct = e.location,
        Et = Date.now(),
        kt = /\?/;w.parseXML = function (t) {
        var n;if (!t || "string" != typeof t) return null;try {
            n = new e.DOMParser().parseFromString(t, "text/xml");
        } catch (e) {
            n = void 0;
        }return n && !n.getElementsByTagName("parsererror").length || w.error("Invalid XML: " + t), n;
    };var St = /\[\]$/,
        Dt = /\r?\n/g,
        Nt = /^(?:submit|button|image|reset|file)$/i,
        At = /^(?:input|select|textarea|keygen)/i;function jt(e, t, n, r) {
        var i;if (Array.isArray(t)) w.each(t, function (t, i) {
            n || St.test(e) ? r(e, i) : jt(e + "[" + ("object" == (typeof i === "undefined" ? "undefined" : _typeof(i)) && null != i ? t : "") + "]", i, n, r);
        });else if (n || "object" !== x(t)) r(e, t);else for (i in t) {
            jt(e + "[" + i + "]", t[i], n, r);
        }
    }w.param = function (e, t) {
        var n,
            r = [],
            i = function i(e, t) {
            var n = g(t) ? t() : t;r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
        };if (Array.isArray(e) || e.jquery && !w.isPlainObject(e)) w.each(e, function () {
            i(this.name, this.value);
        });else for (n in e) {
            jt(n, e[n], t, i);
        }return r.join("&");
    }, w.fn.extend({ serialize: function serialize() {
            return w.param(this.serializeArray());
        }, serializeArray: function serializeArray() {
            return this.map(function () {
                var e = w.prop(this, "elements");return e ? w.makeArray(e) : this;
            }).filter(function () {
                var e = this.type;return this.name && !w(this).is(":disabled") && At.test(this.nodeName) && !Nt.test(e) && (this.checked || !pe.test(e));
            }).map(function (e, t) {
                var n = w(this).val();return null == n ? null : Array.isArray(n) ? w.map(n, function (e) {
                    return { name: t.name, value: e.replace(Dt, "\r\n") };
                }) : { name: t.name, value: n.replace(Dt, "\r\n") };
            }).get();
        } });var qt = /%20/g,
        Lt = /#.*$/,
        Ht = /([?&])_=[^&]*/,
        Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Mt = /^(?:GET|HEAD)$/,
        Rt = /^\/\//,
        It = {},
        Wt = {},
        $t = "*/".concat("*"),
        Bt = r.createElement("a");Bt.href = Ct.href;function Ft(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");var r,
                i = 0,
                o = t.toLowerCase().match(M) || [];if (g(n)) while (r = o[i++]) {
                "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
            }
        };
    }function _t(e, t, n, r) {
        var i = {},
            o = e === Wt;function a(s) {
            var u;return i[s] = !0, w.each(e[s] || [], function (e, s) {
                var l = s(t, n, r);return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1);
            }), u;
        }return a(t.dataTypes[0]) || !i["*"] && a("*");
    }function zt(e, t) {
        var n,
            r,
            i = w.ajaxSettings.flatOptions || {};for (n in t) {
            void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        }return r && w.extend(!0, e, r), e;
    }function Xt(e, t, n) {
        var r,
            i,
            o,
            a,
            s = e.contents,
            u = e.dataTypes;while ("*" === u[0]) {
            u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        }if (r) for (i in s) {
            if (s[i] && s[i].test(r)) {
                u.unshift(i);break;
            }
        }if (u[0] in n) o = u[0];else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;break;
                }a || (a = i);
            }o = o || a;
        }if (o) return o !== u[0] && u.unshift(o), n[o];
    }function Ut(e, t, n, r) {
        var i,
            o,
            a,
            s,
            u,
            l = {},
            c = e.dataTypes.slice();if (c[1]) for (a in e.converters) {
            l[a.toLowerCase()] = e.converters[a];
        }o = c.shift();while (o) {
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
                if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) {
                    if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                        !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));break;
                    }
                }if (!0 !== a) if (a && e["throws"]) t = a(t);else try {
                    t = a(t);
                } catch (e) {
                    return { state: "parsererror", error: a ? e : "No conversion from " + u + " to " + o };
                }
            }
        }return { state: "success", data: t };
    }w.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Ct.href, type: "GET", isLocal: Pt.test(Ct.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": $t, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": w.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(e, t) {
            return t ? zt(zt(e, w.ajaxSettings), t) : zt(w.ajaxSettings, e);
        }, ajaxPrefilter: Ft(It), ajaxTransport: Ft(Wt), ajax: function ajax(t, n) {
            "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (n = t, t = void 0), n = n || {};var i,
                o,
                a,
                s,
                u,
                l,
                c,
                f,
                p,
                d,
                h = w.ajaxSetup({}, n),
                g = h.context || h,
                y = h.context && (g.nodeType || g.jquery) ? w(g) : w.event,
                v = w.Deferred(),
                m = w.Callbacks("once memory"),
                x = h.statusCode || {},
                b = {},
                T = {},
                C = "canceled",
                E = { readyState: 0, getResponseHeader: function getResponseHeader(e) {
                    var t;if (c) {
                        if (!s) {
                            s = {};while (t = Ot.exec(a)) {
                                s[t[1].toLowerCase()] = t[2];
                            }
                        }t = s[e.toLowerCase()];
                    }return null == t ? null : t;
                }, getAllResponseHeaders: function getAllResponseHeaders() {
                    return c ? a : null;
                }, setRequestHeader: function setRequestHeader(e, t) {
                    return null == c && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, b[e] = t), this;
                }, overrideMimeType: function overrideMimeType(e) {
                    return null == c && (h.mimeType = e), this;
                }, statusCode: function statusCode(e) {
                    var t;if (e) if (c) E.always(e[E.status]);else for (t in e) {
                        x[t] = [x[t], e[t]];
                    }return this;
                }, abort: function abort(e) {
                    var t = e || C;return i && i.abort(t), k(0, t), this;
                } };if (v.promise(E), h.url = ((t || h.url || Ct.href) + "").replace(Rt, Ct.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(M) || [""], null == h.crossDomain) {
                l = r.createElement("a");try {
                    l.href = h.url, l.href = l.href, h.crossDomain = Bt.protocol + "//" + Bt.host != l.protocol + "//" + l.host;
                } catch (e) {
                    h.crossDomain = !0;
                }
            }if (h.data && h.processData && "string" != typeof h.data && (h.data = w.param(h.data, h.traditional)), _t(It, h, n, E), c) return E;(f = w.event && h.global) && 0 == w.active++ && w.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Mt.test(h.type), o = h.url.replace(Lt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(qt, "+")) : (d = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (kt.test(o) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (o = o.replace(Ht, "$1"), d = (kt.test(o) ? "&" : "?") + "_=" + Et++ + d), h.url = o + d), h.ifModified && (w.lastModified[o] && E.setRequestHeader("If-Modified-Since", w.lastModified[o]), w.etag[o] && E.setRequestHeader("If-None-Match", w.etag[o])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && E.setRequestHeader("Content-Type", h.contentType), E.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + $t + "; q=0.01" : "") : h.accepts["*"]);for (p in h.headers) {
                E.setRequestHeader(p, h.headers[p]);
            }if (h.beforeSend && (!1 === h.beforeSend.call(g, E, h) || c)) return E.abort();if (C = "abort", m.add(h.complete), E.done(h.success), E.fail(h.error), i = _t(Wt, h, n, E)) {
                if (E.readyState = 1, f && y.trigger("ajaxSend", [E, h]), c) return E;h.async && h.timeout > 0 && (u = e.setTimeout(function () {
                    E.abort("timeout");
                }, h.timeout));try {
                    c = !1, i.send(b, k);
                } catch (e) {
                    if (c) throw e;k(-1, e);
                }
            } else k(-1, "No Transport");function k(t, n, r, s) {
                var l,
                    p,
                    d,
                    b,
                    T,
                    C = n;c || (c = !0, u && e.clearTimeout(u), i = void 0, a = s || "", E.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, r && (b = Xt(h, E, r)), b = Ut(h, b, E, l), l ? (h.ifModified && ((T = E.getResponseHeader("Last-Modified")) && (w.lastModified[o] = T), (T = E.getResponseHeader("etag")) && (w.etag[o] = T)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state, p = b.data, l = !(d = b.error))) : (d = C, !t && C || (C = "error", t < 0 && (t = 0))), E.status = t, E.statusText = (n || C) + "", l ? v.resolveWith(g, [p, C, E]) : v.rejectWith(g, [E, C, d]), E.statusCode(x), x = void 0, f && y.trigger(l ? "ajaxSuccess" : "ajaxError", [E, h, l ? p : d]), m.fireWith(g, [E, C]), f && (y.trigger("ajaxComplete", [E, h]), --w.active || w.event.trigger("ajaxStop")));
            }return E;
        }, getJSON: function getJSON(e, t, n) {
            return w.get(e, t, n, "json");
        }, getScript: function getScript(e, t) {
            return w.get(e, void 0, t, "script");
        } }), w.each(["get", "post"], function (e, t) {
        w[t] = function (e, n, r, i) {
            return g(n) && (i = i || r, r = n, n = void 0), w.ajax(w.extend({ url: e, type: t, dataType: i, data: n, success: r }, w.isPlainObject(e) && e));
        };
    }), w._evalUrl = function (e) {
        return w.ajax({ url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 });
    }, w.fn.extend({ wrapAll: function wrapAll(e) {
            var t;return this[0] && (g(e) && (e = e.call(this[0])), t = w(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                var e = this;while (e.firstElementChild) {
                    e = e.firstElementChild;
                }return e;
            }).append(this)), this;
        }, wrapInner: function wrapInner(e) {
            return g(e) ? this.each(function (t) {
                w(this).wrapInner(e.call(this, t));
            }) : this.each(function () {
                var t = w(this),
                    n = t.contents();n.length ? n.wrapAll(e) : t.append(e);
            });
        }, wrap: function wrap(e) {
            var t = g(e);return this.each(function (n) {
                w(this).wrapAll(t ? e.call(this, n) : e);
            });
        }, unwrap: function unwrap(e) {
            return this.parent(e).not("body").each(function () {
                w(this).replaceWith(this.childNodes);
            }), this;
        } }), w.expr.pseudos.hidden = function (e) {
        return !w.expr.pseudos.visible(e);
    }, w.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }, w.ajaxSettings.xhr = function () {
        try {
            return new e.XMLHttpRequest();
        } catch (e) {}
    };var Vt = { 0: 200, 1223: 204 },
        Gt = w.ajaxSettings.xhr();h.cors = !!Gt && "withCredentials" in Gt, h.ajax = Gt = !!Gt, w.ajaxTransport(function (t) {
        var _n, r;if (h.cors || Gt && !t.crossDomain) return { send: function send(i, o) {
                var a,
                    s = t.xhr();if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (a in t.xhrFields) {
                    s[a] = t.xhrFields[a];
                }t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");for (a in i) {
                    s.setRequestHeader(a, i[a]);
                }_n = function n(e) {
                    return function () {
                        _n && (_n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Vt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? { binary: s.response } : { text: s.responseText }, s.getAllResponseHeaders()));
                    };
                }, s.onload = _n(), r = s.onerror = s.ontimeout = _n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function () {
                    4 === s.readyState && e.setTimeout(function () {
                        _n && r();
                    });
                }, _n = _n("abort");try {
                    s.send(t.hasContent && t.data || null);
                } catch (e) {
                    if (_n) throw e;
                }
            }, abort: function abort() {
                _n && _n();
            } };
    }), w.ajaxPrefilter(function (e) {
        e.crossDomain && (e.contents.script = !1);
    }), w.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function textScript(e) {
                return w.globalEval(e), e;
            } } }), w.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
    }), w.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, _n2;return { send: function send(i, o) {
                    t = w("<script>").prop({ charset: e.scriptCharset, src: e.url }).on("load error", _n2 = function n(e) {
                        t.remove(), _n2 = null, e && o("error" === e.type ? 404 : 200, e.type);
                    }), r.head.appendChild(t[0]);
                }, abort: function abort() {
                    _n2 && _n2();
                } };
        }
    });var Yt = [],
        Qt = /(=)\?(?=&|$)|\?\?/;w.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
            var e = Yt.pop() || w.expando + "_" + Et++;return this[e] = !0, e;
        } }), w.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i,
            o,
            a,
            s = !1 !== t.jsonp && (Qt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Qt.test(t.data) && "data");if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = g(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Qt, "$1" + i) : !1 !== t.jsonp && (t.url += (kt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
            return a || w.error(i + " was not called"), a[0];
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
            a = arguments;
        }, r.always(function () {
            void 0 === o ? w(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Yt.push(i)), a && g(o) && o(a[0]), a = o = void 0;
        }), "script";
    }), h.createHTMLDocument = function () {
        var e = r.implementation.createHTMLDocument("").body;return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length;
    }(), w.parseHTML = function (e, t, n) {
        if ("string" != typeof e) return [];"boolean" == typeof t && (n = t, t = !1);var i, o, a;return t || (h.createHTMLDocument ? ((i = (t = r.implementation.createHTMLDocument("")).createElement("base")).href = r.location.href, t.head.appendChild(i)) : t = r), o = A.exec(e), a = !n && [], o ? [t.createElement(o[1])] : (o = xe([e], t, a), a && a.length && w(a).remove(), w.merge([], o.childNodes));
    }, w.fn.load = function (e, t, n) {
        var r,
            i,
            o,
            a = this,
            s = e.indexOf(" ");return s > -1 && (r = vt(e.slice(s)), e = e.slice(0, s)), g(t) ? (n = t, t = void 0) : t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (i = "POST"), a.length > 0 && w.ajax({ url: e, type: i || "GET", dataType: "html", data: t }).done(function (e) {
            o = arguments, a.html(r ? w("<div>").append(w.parseHTML(e)).find(r) : e);
        }).always(n && function (e, t) {
            a.each(function () {
                n.apply(this, o || [e.responseText, t, e]);
            });
        }), this;
    }, w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        w.fn[t] = function (e) {
            return this.on(t, e);
        };
    }), w.expr.pseudos.animated = function (e) {
        return w.grep(w.timers, function (t) {
            return e === t.elem;
        }).length;
    }, w.offset = { setOffset: function setOffset(e, t, n) {
            var r,
                i,
                o,
                a,
                s,
                u,
                l,
                c = w.css(e, "position"),
                f = w(e),
                p = {};"static" === c && (e.style.position = "relative"), s = f.offset(), o = w.css(e, "top"), u = w.css(e, "left"), (l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1) ? (a = (r = f.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), g(t) && (t = t.call(e, n, w.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : f.css(p);
        } }, w.fn.extend({ offset: function offset(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function (t) {
                w.offset.setOffset(this, e, t);
            });var t,
                n,
                r = this[0];if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset }) : { top: 0, left: 0 };
        }, position: function position() {
            if (this[0]) {
                var e,
                    t,
                    n,
                    r = this[0],
                    i = { top: 0, left: 0 };if ("fixed" === w.css(r, "position")) t = r.getBoundingClientRect();else {
                    t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;while (e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position")) {
                        e = e.parentNode;
                    }e && e !== r && 1 === e.nodeType && ((i = w(e).offset()).top += w.css(e, "borderTopWidth", !0), i.left += w.css(e, "borderLeftWidth", !0));
                }return { top: t.top - i.top - w.css(r, "marginTop", !0), left: t.left - i.left - w.css(r, "marginLeft", !0) };
            }
        }, offsetParent: function offsetParent() {
            return this.map(function () {
                var e = this.offsetParent;while (e && "static" === w.css(e, "position")) {
                    e = e.offsetParent;
                }return e || be;
            });
        } }), w.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, t) {
        var n = "pageYOffset" === t;w.fn[e] = function (r) {
            return z(this, function (e, r, i) {
                var o;if (y(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r];o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i;
            }, e, r, arguments.length);
        };
    }), w.each(["top", "left"], function (e, t) {
        w.cssHooks[t] = _e(h.pixelPosition, function (e, n) {
            if (n) return n = Fe(e, t), We.test(n) ? w(e).position()[t] + "px" : n;
        });
    }), w.each({ Height: "height", Width: "width" }, function (e, t) {
        w.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, r) {
            w.fn[r] = function (i, o) {
                var a = arguments.length && (n || "boolean" != typeof i),
                    s = n || (!0 === i || !0 === o ? "margin" : "border");return z(this, function (t, n, i) {
                    var o;return y(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? w.css(t, n, s) : w.style(t, n, i, s);
                }, t, a ? i : void 0, a);
            };
        });
    }), w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) {
        w.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
        };
    }), w.fn.extend({ hover: function hover(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        } }), w.fn.extend({ bind: function bind(e, t, n) {
            return this.on(e, null, t, n);
        }, unbind: function unbind(e, t) {
            return this.off(e, null, t);
        }, delegate: function delegate(e, t, n, r) {
            return this.on(t, e, n, r);
        }, undelegate: function undelegate(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
        } }), w.proxy = function (e, t) {
        var n, r, i;if ("string" == typeof t && (n = e[t], t = e, e = n), g(e)) return r = o.call(arguments, 2), i = function i() {
            return e.apply(t || this, r.concat(o.call(arguments)));
        }, i.guid = e.guid = e.guid || w.guid++, i;
    }, w.holdReady = function (e) {
        e ? w.readyWait++ : w.ready(!0);
    }, w.isArray = Array.isArray, w.parseJSON = JSON.parse, w.nodeName = N, w.isFunction = g, w.isWindow = y, w.camelCase = G, w.type = x, w.now = Date.now, w.isNumeric = function (e) {
        var t = w.type(e);return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
    }, "function" == typeof define && define.amd && define("jquery", [], function () {
        return w;
    });var Jt = e.jQuery,
        Kt = e.$;return w.noConflict = function (t) {
        return e.$ === w && (e.$ = Kt), t && e.jQuery === w && (e.jQuery = Jt), w;
    }, t || (e.jQuery = e.$ = w), w;
});

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");+function (a) {
    "use strict";
    var b = a.fn.jquery.split(" ")[0].split(".");if (b[0] < 2 && b[1] < 9 || 1 == b[0] && 9 == b[1] && b[2] < 1 || b[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
}(jQuery), +function (a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap"),
            b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };for (var c in b) {
            if (void 0 !== a.style[c]) return { end: b[c] };
        }return !1;
    }a.fn.emulateTransitionEnd = function (b) {
        var c = !1,
            d = this;a(this).one("bsTransitionEnd", function () {
            c = !0;
        });var e = function e() {
            c || a(d).trigger(a.support.transition.end);
        };return setTimeout(e, b), this;
    }, a(function () {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = { bindType: a.support.transition.end, delegateType: a.support.transition.end, handle: function handle(b) {
                if (a(b.target).is(this)) return b.handleObj.handler.apply(this, arguments);
            } });
    });
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var c = a(this),
                e = c.data("bs.alert");e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c);
        });
    }var c = '[data-dismiss="alert"]',
        d = function d(b) {
        a(b).on("click", c, this.close);
    };d.VERSION = "3.3.7", d.TRANSITION_DURATION = 150, d.prototype.close = function (b) {
        function c() {
            g.detach().trigger("closed.bs.alert").remove();
        }var e = a(this),
            f = e.attr("data-target");f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, ""));var g = a("#" === f ? [] : f);b && b.preventDefault(), g.length || (g = e.closest(".alert")), g.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (g.removeClass("in"), a.support.transition && g.hasClass("fade") ? g.one("bsTransitionEnd", c).emulateTransitionEnd(d.TRANSITION_DURATION) : c());
    };var e = a.fn.alert;a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function () {
        return a.fn.alert = e, this;
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close);
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b);
        });
    }var c = function c(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1;
    };c.VERSION = "3.3.7", c.DEFAULTS = { loadingText: "loading..." }, c.prototype.setState = function (b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();b += "Text", null == f.resetText && d.data("resetText", d[e]()), setTimeout(a.proxy(function () {
            d[e](null == f[b] ? this.options[b] : f[b]), "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c).prop(c, !0)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c).prop(c, !1));
        }, this), 0);
    }, c.prototype.toggle = function () {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');if (b.length) {
            var c = this.$element.find("input");"radio" == c.prop("type") ? (c.prop("checked") && (a = !1), b.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == c.prop("type") && (c.prop("checked") !== this.$element.hasClass("active") && (a = !1), this.$element.toggleClass("active")), c.prop("checked", this.$element.hasClass("active")), a && c.trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };var d = a.fn.button;a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function () {
        return a.fn.button = d, this;
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (c) {
        var d = a(c.target).closest(".btn");b.call(d, "toggle"), a(c.target).is('input[type="radio"], input[type="checkbox"]') || (c.preventDefault(), d.is("input,button") ? d.trigger("focus") : d.find("input:visible,button:visible").first().trigger("focus"));
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (b) {
        a(b.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(b.type));
    });
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b),
                g = "string" == typeof b ? b : f.slide;e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle();
        });
    }var c = function c(b, _c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = _c, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
    };c.VERSION = "3.3.7", c.TRANSITION_DURATION = 600, c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }, c.prototype.keydown = function (a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
            switch (a.which) {case 37:
                    this.prev();break;case 39:
                    this.next();break;default:
                    return;}a.preventDefault();
        }
    }, c.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this;
    }, c.prototype.getItemIndex = function (a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active);
    }, c.prototype.getItemForDirection = function (a, b) {
        var c = this.getItemIndex(b),
            d = "prev" == a && 0 === c || "next" == a && c == this.$items.length - 1;if (d && !this.options.wrap) return b;var e = "prev" == a ? -1 : 1,
            f = (c + e) % this.$items.length;return this.$items.eq(f);
    }, c.prototype.to = function (a) {
        var b = this,
            c = this.getItemIndex(this.$active = this.$element.find(".item.active"));if (!(a > this.$items.length - 1 || a < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function () {
            b.to(a);
        }) : c == a ? this.pause().cycle() : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
    }, c.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, c.prototype.next = function () {
        if (!this.sliding) return this.slide("next");
    }, c.prototype.prev = function () {
        if (!this.sliding) return this.slide("prev");
    }, c.prototype.slide = function (b, d) {
        var e = this.$element.find(".item.active"),
            f = d || this.getItemForDirection(b, e),
            g = this.interval,
            h = "next" == b ? "left" : "right",
            i = this;if (f.hasClass("active")) return this.sliding = !1;var j = f[0],
            k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: h });if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, g && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");var l = a(this.$indicators.children()[this.getItemIndex(f)]);l && l.addClass("active");
            }var m = a.Event("slid.bs.carousel", { relatedTarget: j, direction: h });return a.support.transition && this.$element.hasClass("slide") ? (f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), e.one("bsTransitionEnd", function () {
                f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), i.sliding = !1, setTimeout(function () {
                    i.$element.trigger(m);
                }, 0);
            }).emulateTransitionEnd(c.TRANSITION_DURATION)) : (e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger(m)), g && this.cycle(), this;
        }
    };var d = a.fn.carousel;a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = d, this;
    };var e = function e(c) {
        var d,
            e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault();
        }
    };a(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var c = a(this);b.call(c, c.data());
        });
    });
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        var c,
            d = b.attr("data-target") || (c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "");return a(d);
    }function c(b) {
        return this.each(function () {
            var c = a(this),
                e = c.data("bs.collapse"),
                f = a.extend({}, d.DEFAULTS, c.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b);!e && f.toggle && /show|hide/.test(b) && (f.toggle = !1), e || c.data("bs.collapse", e = new d(this, f)), "string" == typeof b && e[b]();
        });
    }var d = function d(b, c) {
        this.$element = a(b), this.options = a.extend({}, d.DEFAULTS, c), this.$trigger = a('[data-toggle="collapse"][href="#' + b.id + '"],[data-toggle="collapse"][data-target="#' + b.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle();
    };d.VERSION = "3.3.7", d.TRANSITION_DURATION = 350, d.DEFAULTS = { toggle: !0 }, d.prototype.dimension = function () {
        var a = this.$element.hasClass("width");return a ? "width" : "height";
    }, d.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var b,
                e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");if (!(e && e.length && (b = e.data("bs.collapse"), b && b.transitioning))) {
                var f = a.Event("show.bs.collapse");if (this.$element.trigger(f), !f.isDefaultPrevented()) {
                    e && e.length && (c.call(e, "hide"), b || e.data("bs.collapse", null));var g = this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;var h = function h() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[g](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse");
                    };if (!a.support.transition) return h.call(this);var i = a.camelCase(["scroll", g].join("-"));this.$element.one("bsTransitionEnd", a.proxy(h, this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i]);
                }
            }
        }
    }, d.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;var e = function e() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(e, this)).emulateTransitionEnd(d.TRANSITION_DURATION) : e.call(this);
            }
        }
    }, d.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, d.prototype.getParent = function () {
        return a(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(a.proxy(function (c, d) {
            var e = a(d);this.addAriaAndCollapsedClass(b(e), e);
        }, this)).end();
    }, d.prototype.addAriaAndCollapsedClass = function (a, b) {
        var c = a.hasClass("in");a.attr("aria-expanded", c), b.toggleClass("collapsed", !c).attr("aria-expanded", c);
    };var e = a.fn.collapse;a.fn.collapse = c, a.fn.collapse.Constructor = d, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = e, this;
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (d) {
        var e = a(this);e.attr("data-target") || d.preventDefault();var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();c.call(f, h);
    });
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        var c = b.attr("data-target");c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));var d = c && a(c);return d && d.length ? d : b.parent();
    }function c(c) {
        c && 3 === c.which || (a(e).remove(), a(f).each(function () {
            var d = a(this),
                e = b(d),
                f = { relatedTarget: this };e.hasClass("open") && (c && "click" == c.type && /input|textarea/i.test(c.target.tagName) && a.contains(e[0], c.target) || (e.trigger(c = a.Event("hide.bs.dropdown", f)), c.isDefaultPrevented() || (d.attr("aria-expanded", "false"), e.removeClass("open").trigger(a.Event("hidden.bs.dropdown", f)))));
        }));
    }function d(b) {
        return this.each(function () {
            var c = a(this),
                d = c.data("bs.dropdown");d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c);
        });
    }var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function g(b) {
        a(b).on("click.bs.dropdown", this.toggle);
    };g.VERSION = "3.3.7", g.prototype.toggle = function (d) {
        var e = a(this);if (!e.is(".disabled, :disabled")) {
            var f = b(e),
                g = f.hasClass("open");if (c(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click", c);var h = { relatedTarget: this };if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;e.trigger("focus").attr("aria-expanded", "true"), f.toggleClass("open").trigger(a.Event("shown.bs.dropdown", h));
            }return !1;
        }
    }, g.prototype.keydown = function (c) {
        if (/(38|40|27|32)/.test(c.which) && !/input|textarea/i.test(c.target.tagName)) {
            var d = a(this);if (c.preventDefault(), c.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = b(d),
                    g = e.hasClass("open");if (!g && 27 != c.which || g && 27 == c.which) return 27 == c.which && e.find(f).trigger("focus"), d.trigger("click");var h = " li:not(.disabled):visible a",
                    i = e.find(".dropdown-menu" + h);if (i.length) {
                    var j = i.index(c.target);38 == c.which && j > 0 && j--, 40 == c.which && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus");
                }
            }
        }
    };var h = a.fn.dropdown;a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = h, this;
    }, a(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation();
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f, g.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", g.prototype.keydown);
}(jQuery), +function (a) {
    "use strict";
    function b(b, d) {
        return this.each(function () {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b);f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d);
        });
    }var c = function c(b, _c2) {
        this.options = _c2, this.$body = a(document.body), this.$element = a(b), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };c.VERSION = "3.3.7", c.TRANSITION_DURATION = 300, c.BACKDROP_TRANSITION_DURATION = 150, c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a);
    }, c.prototype.show = function (b) {
        var d = this,
            e = a.Event("show.bs.modal", { relatedTarget: b });this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            d.$element.one("mouseup.dismiss.bs.modal", function (b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function () {
            var e = a.support.transition && d.$element.hasClass("fade");d.$element.parent().length || d.$element.appendTo(d.$body), d.$element.show().scrollTop(0), d.adjustDialog(), e && d.$element[0].offsetWidth, d.$element.addClass("in"), d.enforceFocus();var f = a.Event("shown.bs.modal", { relatedTarget: b });e ? d.$dialog.one("bsTransitionEnd", function () {
                d.$element.trigger("focus").trigger(f);
            }).emulateTransitionEnd(c.TRANSITION_DURATION) : d.$element.trigger("focus").trigger(f);
        }));
    }, c.prototype.hide = function (b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(c.TRANSITION_DURATION) : this.hideModal());
    }, c.prototype.enforceFocus = function () {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
            document === a.target || this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus");
        }, this));
    }, c.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", a.proxy(function (a) {
            27 == a.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, c.prototype.resize = function () {
        this.isShown ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this)) : a(window).off("resize.bs.modal");
    }, c.prototype.hideModal = function () {
        var a = this;this.$element.hide(), this.backdrop(function () {
            a.$body.removeClass("modal-open"), a.resetAdjustments(), a.resetScrollbar(), a.$element.trigger("hidden.bs.modal");
        });
    }, c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, c.prototype.backdrop = function (b) {
        var d = this,
            e = this.$element.hasClass("fade") ? "fade" : "";if (this.isShown && this.options.backdrop) {
            var f = a.support.transition && e;if (this.$backdrop = a(document.createElement("div")).addClass("modal-backdrop " + e).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;f ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : b();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");var g = function g() {
                d.removeBackdrop(), b && b();
            };a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION) : g();
        } else b && b();
    }, c.prototype.handleUpdate = function () {
        this.adjustDialog();
    }, c.prototype.adjustDialog = function () {
        var a = this.$element[0].scrollHeight > document.documentElement.clientHeight;this.$element.css({ paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : "" });
    }, c.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: "", paddingRight: "" });
    }, c.prototype.checkScrollbar = function () {
        var a = window.innerWidth;if (!a) {
            var b = document.documentElement.getBoundingClientRect();a = b.right - Math.abs(b.left);
        }this.bodyIsOverflowing = document.body.clientWidth < a, this.scrollbarWidth = this.measureScrollbar();
    }, c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", a + this.scrollbarWidth);
    }, c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad);
    }, c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");a.className = "modal-scrollbar-measure", this.$body.append(a);var b = a.offsetWidth - a.clientWidth;return this.$body[0].removeChild(a), b;
    };var d = a.fn.modal;a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
        return a.fn.modal = d, this;
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());d.is("a") && c.preventDefault(), f.one("show.bs.modal", function (a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function () {
                d.is(":visible") && d.trigger("focus");
            });
        }), b.call(f, g, this);
    });
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;!e && /destroy|hide/.test(b) || (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]());
        });
    }var c = function c(a, b) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", a, b);
    };c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 } }, c.prototype.init = function (b, c, d) {
        if (this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(a.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = { click: !1, hover: !1, focus: !1 }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this));
            }
        }this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle();
    }, c.prototype.getDefaults = function () {
        return c.DEFAULTS;
    }, c.prototype.getOptions = function (b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b;
    }, c.prototype.getDelegateOptions = function () {
        var b = {},
            c = this.getDefaults();return this._options && a.each(this._options, function (a, d) {
            c[a] != d && (b[a] = d);
        }), b;
    }, c.prototype.enter = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusin" == b.type ? "focus" : "hover"] = !0), c.tip().hasClass("in") || "in" == c.hoverState ? void (c.hoverState = "in") : (clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show();
        }, c.options.delay.show)) : c.show());
    }, c.prototype.isInStateTrue = function () {
        for (var a in this.inState) {
            if (this.inState[a]) return !0;
        }return !1;
    }, c.prototype.leave = function (b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);if (c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), b instanceof a.Event && (c.inState["focusout" == b.type ? "focus" : "hover"] = !1), !c.isInStateTrue()) return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide();
        }, c.options.delay.hide)) : c.hide();
    }, c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);var d = a.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);if (b.isDefaultPrevented() || !d) return;var e = this,
                f = this.tip(),
                g = this.getUID(this.type);this.setContent(), f.attr("id", g), this.$element.attr("aria-describedby", g), this.options.animation && f.addClass("fade");var h = "function" == typeof this.options.placement ? this.options.placement.call(this, f[0], this.$element[0]) : this.options.placement,
                i = /\s?auto?\s?/i,
                j = i.test(h);j && (h = h.replace(i, "") || "top"), f.detach().css({ top: 0, left: 0, display: "block" }).addClass(h).data("bs." + this.type, this), this.options.container ? f.appendTo(this.options.container) : f.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);var k = this.getPosition(),
                l = f[0].offsetWidth,
                m = f[0].offsetHeight;if (j) {
                var n = h,
                    o = this.getPosition(this.$viewport);h = "bottom" == h && k.bottom + m > o.bottom ? "top" : "top" == h && k.top - m < o.top ? "bottom" : "right" == h && k.right + l > o.width ? "left" : "left" == h && k.left - l < o.left ? "right" : h, f.removeClass(n).addClass(h);
            }var p = this.getCalculatedOffset(h, k, l, m);this.applyPlacement(p, h);var q = function q() {
                var a = e.hoverState;e.$element.trigger("shown.bs." + e.type), e.hoverState = null, "out" == a && e.leave(e);
            };a.support.transition && this.$tip.hasClass("fade") ? f.one("bsTransitionEnd", q).emulateTransitionEnd(c.TRANSITION_DURATION) : q();
        }
    }, c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top += g, b.left += h, a.offset.setOffset(d[0], a.extend({ using: function using(a) {
                d.css({ top: Math.round(a.top), left: Math.round(a.left) });
            } }, b), 0), d.addClass("in");var i = d[0].offsetWidth,
            j = d[0].offsetHeight;"top" == c && j != f && (b.top = b.top + f - j);var k = this.getViewportAdjustedDelta(c, b, i, j);k.left ? b.left += k.left : b.top += k.top;var l = /top|bottom/.test(c),
            m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
            n = l ? "offsetWidth" : "offsetHeight";d.offset(b), this.replaceArrow(m, d[0][n], l);
    }, c.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "");
    }, c.prototype.setContent = function () {
        var a = this.tip(),
            b = this.getTitle();a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right");
    }, c.prototype.hide = function (b) {
        function d() {
            "in" != e.hoverState && f.detach(), e.$element && e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), b && b();
        }var e = this,
            f = a(this.$tip),
            g = a.Event("hide.bs." + this.type);if (this.$element.trigger(g), !g.isDefaultPrevented()) return f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", d).emulateTransitionEnd(c.TRANSITION_DURATION) : d(), this.hoverState = null, this;
    }, c.prototype.fixTitle = function () {
        var a = this.$element;(a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "");
    }, c.prototype.hasContent = function () {
        return this.getTitle();
    }, c.prototype.getPosition = function (b) {
        b = b || this.$element;var c = b[0],
            d = "BODY" == c.tagName,
            e = c.getBoundingClientRect();null == e.width && (e = a.extend({}, e, { width: e.right - e.left, height: e.bottom - e.top }));var f = window.SVGElement && c instanceof window.SVGElement,
            g = d ? { top: 0, left: 0 } : f ? null : b.offset(),
            h = { scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop() },
            i = d ? { width: a(window).width(), height: a(window).height() } : null;return a.extend({}, e, h, i, g);
    }, c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : "top" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : "left" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
    }, c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = { top: 0, left: 0 };if (!this.$viewport) return e;var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i);
        } else {
            var j = b.left - f,
                k = b.left + f + c;j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k);
        }return e;
    }, c.prototype.getTitle = function () {
        var a,
            b = this.$element,
            c = this.options;return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title);
    }, c.prototype.getUID = function (a) {
        do {
            a += ~~(1e6 * Math.random());
        } while (document.getElementById(a));return a;
    }, c.prototype.tip = function () {
        if (!this.$tip && (this.$tip = a(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");return this.$tip;
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, c.prototype.enable = function () {
        this.enabled = !0;
    }, c.prototype.disable = function () {
        this.enabled = !1;
    }, c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
    }, c.prototype.toggle = function (b) {
        var c = this;b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), b ? (c.inState.click = !c.inState.click, c.isInStateTrue() ? c.enter(c) : c.leave(c)) : c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
    }, c.prototype.destroy = function () {
        var a = this;clearTimeout(this.timeout), this.hide(function () {
            a.$element.off("." + a.type).removeData("bs." + a.type), a.$tip && a.$tip.detach(), a.$tip = null, a.$arrow = null, a.$viewport = null, a.$element = null;
        });
    };var d = a.fn.tooltip;a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = d, this;
    };
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;!e && /destroy|hide/.test(b) || (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]());
        });
    }var c = function c(a, b) {
        this.init("popover", a, b);
    };if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");c.VERSION = "3.3.7", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function () {
        return c.DEFAULTS;
    }, c.prototype.setContent = function () {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide();
    }, c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
    }, c.prototype.getContent = function () {
        var a = this.$element,
            b = this.options;return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content);
    }, c.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };var d = a.fn.popover;a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function () {
        return a.fn.popover = d, this;
    };
}(jQuery), +function (a) {
    "use strict";
    function b(c, d) {
        this.$body = a(document.body), this.$scrollElement = a(a(c).is(document.body) ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", a.proxy(this.process, this)), this.refresh(), this.process();
    }function c(c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && c;e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]();
        });
    }b.VERSION = "3.3.7", b.DEFAULTS = { offset: 10 }, b.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, b.prototype.refresh = function () {
        var b = this,
            c = "offset",
            d = 0;this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), a.isWindow(this.$scrollElement[0]) || (c = "position", d = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);return f && f.length && f.is(":visible") && [[f[c]().top + d, e]] || null;
        }).sort(function (a, b) {
            return a[0] - b[0];
        }).each(function () {
            b.offsets.push(this[0]), b.targets.push(this[1]);
        });
    }, b.prototype.process = function () {
        var a,
            b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);if (g && b < e[0]) return this.activeTarget = null, this.clear();for (a = e.length; a--;) {
            g != f[a] && b >= e[a] && (void 0 === e[a + 1] || b < e[a + 1]) && this.activate(f[a]);
        }
    }, b.prototype.activate = function (b) {
        this.activeTarget = b, this.clear();var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy");
    }, b.prototype.clear = function () {
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };var d = a.fn.scrollspy;a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = d, this;
    }, a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);c.call(b, b.data());
        });
    });
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.tab");e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]();
        });
    }var c = function c(b) {
        this.element = a(b);
    };c.VERSION = "3.3.7", c.TRANSITION_DURATION = 150, c.prototype.show = function () {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a"),
                f = a.Event("hide.bs.tab", { relatedTarget: b[0] }),
                g = a.Event("show.bs.tab", { relatedTarget: e[0] });if (e.trigger(f), b.trigger(g), !g.isDefaultPrevented() && !f.isDefaultPrevented()) {
                var h = a(d);this.activate(b.closest("li"), c), this.activate(h, h.parent(), function () {
                    e.trigger({ type: "hidden.bs.tab", relatedTarget: b[0] }), b.trigger({ type: "shown.bs.tab", relatedTarget: e[0] });
                });
            }
        }
    }, c.prototype.activate = function (b, d, e) {
        function f() {
            g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu").length && b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), e && e();
        }var g = d.find("> .active"),
            h = e && a.support.transition && (g.length && g.hasClass("fade") || !!d.find("> .fade").length);g.length && h ? g.one("bsTransitionEnd", f).emulateTransitionEnd(c.TRANSITION_DURATION) : f(), g.removeClass("in");
    };var d = a.fn.tab;a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
        return a.fn.tab = d, this;
    };var e = function e(c) {
        c.preventDefault(), b.call(a(this), "show");
    };a(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', e).on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
}(jQuery), +function (a) {
    "use strict";
    function b(b) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b;e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]();
        });
    }var c = function c(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition();
    };c.VERSION = "3.3.7", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = { offset: 0, target: window }, c.prototype.getState = function (a, b, c, d) {
        var e = this.$target.scrollTop(),
            f = this.$element.offset(),
            g = this.$target.height();if (null != c && "top" == this.affixed) return e < c && "top";if ("bottom" == this.affixed) return null != c ? !(e + this.unpin <= f.top) && "bottom" : !(e + g <= a - d) && "bottom";var h = null == this.affixed,
            i = h ? e : f.top,
            j = h ? g : b;return null != c && e <= c ? "top" : null != d && i + j >= a - d && "bottom";
    }, c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a = this.$target.scrollTop(),
            b = this.$element.offset();return this.pinnedOffset = b.top - a;
    }, c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1);
    }, c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b = this.$element.height(),
                d = this.options.offset,
                e = d.top,
                f = d.bottom,
                g = Math.max(a(document).height(), a(document.body).height());"object" != (typeof d === "undefined" ? "undefined" : _typeof(d)) && (f = e = d), "function" == typeof e && (e = d.top(this.$element)), "function" == typeof f && (f = d.bottom(this.$element));var h = this.getState(g, b, e, f);if (this.affixed != h) {
                null != this.unpin && this.$element.css("top", "");var i = "affix" + (h ? "-" + h : ""),
                    j = a.Event(i + ".bs.affix");if (this.$element.trigger(j), j.isDefaultPrevented()) return;this.affixed = h, this.unpin = "bottom" == h ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix", "affixed") + ".bs.affix");
            }"bottom" == h && this.$element.offset({ top: g - b - f });
        }
    };var d = a.fn.affix;a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function () {
        return a.fn.affix = d, this;
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var c = a(this),
                d = c.data();d.offset = d.offset || {}, null != d.offsetBottom && (d.offset.bottom = d.offsetBottom), null != d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d);
        });
    });
}(jQuery);
/*!
 * perfect-scrollbar v1.3.0
 * (c) 2017 Hyunje Jun
 * @license MIT
 */
!function (t, e) {
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.PerfectScrollbar = e();
}(this, function () {
    "use strict";
    function t(t) {
        return getComputedStyle(t);
    }function e(t, e) {
        for (var i in e) {
            var r = e[i];"number" == typeof r && (r += "px"), t.style[i] = r;
        }return t;
    }function i(t) {
        var e = document.createElement("div");return e.className = t, e;
    }function r(t, e) {
        if (!v) throw new Error("No element matching method supported");return v.call(t, e);
    }function l(t) {
        t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t);
    }function n(t, e) {
        return Array.prototype.filter.call(t.children, function (t) {
            return r(t, e);
        });
    }function o(t, e) {
        var i = t.element.classList,
            r = m.state.scrolling(e);i.contains(r) ? clearTimeout(Y[e]) : i.add(r);
    }function s(t, e) {
        Y[e] = setTimeout(function () {
            return t.isAlive && t.element.classList.remove(m.state.scrolling(e));
        }, t.settings.scrollingThreshold);
    }function a(t, e) {
        o(t, e), s(t, e);
    }function c(t) {
        if ("function" == typeof window.CustomEvent) return new CustomEvent(t);var e = document.createEvent("CustomEvent");return e.initCustomEvent(t, !1, !1, void 0), e;
    }function h(t, e, i, r, l) {
        var n = i[0],
            o = i[1],
            s = i[2],
            h = i[3],
            u = i[4],
            d = i[5];void 0 === r && (r = !0), void 0 === l && (l = !1);var f = t.element;t.reach[h] = null, f[s] < 1 && (t.reach[h] = "start"), f[s] > t[n] - t[o] - 1 && (t.reach[h] = "end"), e && (f.dispatchEvent(c("ps-scroll-" + h)), e < 0 ? f.dispatchEvent(c("ps-scroll-" + u)) : e > 0 && f.dispatchEvent(c("ps-scroll-" + d)), r && a(t, h)), t.reach[h] && (e || l) && f.dispatchEvent(c("ps-" + h + "-reach-" + t.reach[h]));
    }function u(t) {
        return parseInt(t, 10) || 0;
    }function d(t) {
        return r(t, "input,[contenteditable]") || r(t, "select,[contenteditable]") || r(t, "textarea,[contenteditable]") || r(t, "button,[contenteditable]");
    }function f(e) {
        var i = t(e);return u(i.width) + u(i.paddingLeft) + u(i.paddingRight) + u(i.borderLeftWidth) + u(i.borderRightWidth);
    }function p(t, e) {
        return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e;
    }function b(t, i) {
        var r = { width: i.railXWidth };i.isRtl ? r.left = i.negativeScrollAdjustment + t.scrollLeft + i.containerWidth - i.contentWidth : r.left = t.scrollLeft, i.isScrollbarXUsingBottom ? r.bottom = i.scrollbarXBottom - t.scrollTop : r.top = i.scrollbarXTop + t.scrollTop, e(i.scrollbarXRail, r);var l = { top: t.scrollTop, height: i.railYHeight };i.isScrollbarYUsingRight ? i.isRtl ? l.right = i.contentWidth - (i.negativeScrollAdjustment + t.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth : l.right = i.scrollbarYRight - t.scrollLeft : i.isRtl ? l.left = i.negativeScrollAdjustment + t.scrollLeft + 2 * i.containerWidth - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth : l.left = i.scrollbarYLeft + t.scrollLeft, e(i.scrollbarYRail, l), e(i.scrollbarX, { left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth }), e(i.scrollbarY, { top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth });
    }function g(t, e) {
        function i(e) {
            p[d] = b + v * (e[a] - g), o(t, f), T(t), e.stopPropagation(), e.preventDefault();
        }function r() {
            s(t, f), t.event.unbind(t.ownerDocument, "mousemove", i);
        }var l = e[0],
            n = e[1],
            a = e[2],
            c = e[3],
            h = e[4],
            u = e[5],
            d = e[6],
            f = e[7],
            p = t.element,
            b = null,
            g = null,
            v = null;t.event.bind(t[h], "mousedown", function (e) {
            b = p[d], g = e[a], v = (t[n] - t[l]) / (t[c] - t[u]), t.event.bind(t.ownerDocument, "mousemove", i), t.event.once(t.ownerDocument, "mouseup", r), e.stopPropagation(), e.preventDefault();
        });
    }var v = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector),
        m = { main: "ps", element: { thumb: function thumb(t) {
                return "ps__thumb-" + t;
            }, rail: function rail(t) {
                return "ps__rail-" + t;
            }, consuming: "ps__child--consume" }, state: { focus: "ps--focus", active: function active(t) {
                return "ps--active-" + t;
            }, scrolling: function scrolling(t) {
                return "ps--scrolling-" + t;
            } } },
        Y = { x: null, y: null },
        X = function X(t) {
        this.element = t, this.handlers = {};
    },
        w = { isEmpty: { configurable: !0 } };X.prototype.bind = function (t, e) {
        void 0 === this.handlers[t] && (this.handlers[t] = []), this.handlers[t].push(e), this.element.addEventListener(t, e, !1);
    }, X.prototype.unbind = function (t, e) {
        var i = this;this.handlers[t] = this.handlers[t].filter(function (r) {
            return !(!e || r === e) || (i.element.removeEventListener(t, r, !1), !1);
        });
    }, X.prototype.unbindAll = function () {
        var t = this;for (var e in t.handlers) {
            t.unbind(e);
        }
    }, w.isEmpty.get = function () {
        var t = this;return Object.keys(this.handlers).every(function (e) {
            return 0 === t.handlers[e].length;
        });
    }, Object.defineProperties(X.prototype, w);var y = function y() {
        this.eventElements = [];
    };y.prototype.eventElement = function (t) {
        var e = this.eventElements.filter(function (e) {
            return e.element === t;
        })[0];return e || (e = new X(t), this.eventElements.push(e)), e;
    }, y.prototype.bind = function (t, e, i) {
        this.eventElement(t).bind(e, i);
    }, y.prototype.unbind = function (t, e, i) {
        var r = this.eventElement(t);r.unbind(e, i), r.isEmpty && this.eventElements.splice(this.eventElements.indexOf(r), 1);
    }, y.prototype.unbindAll = function () {
        this.eventElements.forEach(function (t) {
            return t.unbindAll();
        }), this.eventElements = [];
    }, y.prototype.once = function (t, e, i) {
        var r = this.eventElement(t),
            l = function l(t) {
            r.unbind(e, l), i(t);
        };r.bind(e, l);
    };var W = function W(t, e, i, r, l) {
        void 0 === r && (r = !0), void 0 === l && (l = !1);var n;if ("top" === e) n = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];else {
            if ("left" !== e) throw new Error("A proper axis should be provided");n = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"];
        }h(t, i, n, r, l);
    },
        L = { isWebKit: "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style, supportsTouch: "undefined" != typeof window && ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch), supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints, isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent) },
        T = function T(t) {
        var e = t.element;t.containerWidth = e.clientWidth, t.containerHeight = e.clientHeight, t.contentWidth = e.scrollWidth, t.contentHeight = e.scrollHeight, e.contains(t.scrollbarXRail) || (n(e, m.element.rail("x")).forEach(function (t) {
            return l(t);
        }), e.appendChild(t.scrollbarXRail)), e.contains(t.scrollbarYRail) || (n(e, m.element.rail("y")).forEach(function (t) {
            return l(t);
        }), e.appendChild(t.scrollbarYRail)), !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0, t.railXWidth = t.containerWidth - t.railXMarginWidth, t.railXRatio = t.containerWidth / t.railXWidth, t.scrollbarXWidth = p(t, u(t.railXWidth * t.containerWidth / t.contentWidth)), t.scrollbarXLeft = u((t.negativeScrollAdjustment + e.scrollLeft) * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : t.scrollbarXActive = !1, !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0, t.railYHeight = t.containerHeight - t.railYMarginHeight, t.railYRatio = t.containerHeight / t.railYHeight, t.scrollbarYHeight = p(t, u(t.railYHeight * t.containerHeight / t.contentHeight)), t.scrollbarYTop = u(e.scrollTop * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : t.scrollbarYActive = !1, t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth), t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight), b(e, t), t.scrollbarXActive ? e.classList.add(m.state.active("x")) : (e.classList.remove(m.state.active("x")), t.scrollbarXWidth = 0, t.scrollbarXLeft = 0, e.scrollLeft = 0), t.scrollbarYActive ? e.classList.add(m.state.active("y")) : (e.classList.remove(m.state.active("y")), t.scrollbarYHeight = 0, t.scrollbarYTop = 0, e.scrollTop = 0);
    },
        R = { "click-rail": function clickRail(t) {
            t.event.bind(t.scrollbarY, "mousedown", function (t) {
                return t.stopPropagation();
            }), t.event.bind(t.scrollbarYRail, "mousedown", function (e) {
                var i = e.pageY - window.pageYOffset - t.scrollbarYRail.getBoundingClientRect().top > t.scrollbarYTop ? 1 : -1;t.element.scrollTop += i * t.containerHeight, T(t), e.stopPropagation();
            }), t.event.bind(t.scrollbarX, "mousedown", function (t) {
                return t.stopPropagation();
            }), t.event.bind(t.scrollbarXRail, "mousedown", function (e) {
                var i = e.pageX - window.pageXOffset - t.scrollbarXRail.getBoundingClientRect().left > t.scrollbarXLeft ? 1 : -1;t.element.scrollLeft += i * t.containerWidth, T(t), e.stopPropagation();
            });
        }, "drag-thumb": function dragThumb(t) {
            g(t, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x"]), g(t, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y"]);
        }, keyboard: function keyboard(t) {
            function e(e, r) {
                var l = i.scrollTop;if (0 === e) {
                    if (!t.scrollbarYActive) return !1;if (0 === l && r > 0 || l >= t.contentHeight - t.containerHeight && r < 0) return !t.settings.wheelPropagation;
                }var n = i.scrollLeft;if (0 === r) {
                    if (!t.scrollbarXActive) return !1;if (0 === n && e < 0 || n >= t.contentWidth - t.containerWidth && e > 0) return !t.settings.wheelPropagation;
                }return !0;
            }var i = t.element,
                l = function l() {
                return r(i, ":hover");
            },
                n = function n() {
                return r(t.scrollbarX, ":focus") || r(t.scrollbarY, ":focus");
            };t.event.bind(t.ownerDocument, "keydown", function (r) {
                if (!(r.isDefaultPrevented && r.isDefaultPrevented() || r.defaultPrevented) && (l() || n())) {
                    var o = document.activeElement ? document.activeElement : t.ownerDocument.activeElement;if (o) {
                        if ("IFRAME" === o.tagName) o = o.contentDocument.activeElement;else for (; o.shadowRoot;) {
                            o = o.shadowRoot.activeElement;
                        }if (d(o)) return;
                    }var s = 0,
                        a = 0;switch (r.which) {case 37:
                            s = r.metaKey ? -t.contentWidth : r.altKey ? -t.containerWidth : -30;break;case 38:
                            a = r.metaKey ? t.contentHeight : r.altKey ? t.containerHeight : 30;break;case 39:
                            s = r.metaKey ? t.contentWidth : r.altKey ? t.containerWidth : 30;break;case 40:
                            a = r.metaKey ? -t.contentHeight : r.altKey ? -t.containerHeight : -30;break;case 32:
                            a = r.shiftKey ? t.containerHeight : -t.containerHeight;break;case 33:
                            a = t.containerHeight;break;case 34:
                            a = -t.containerHeight;break;case 36:
                            a = t.contentHeight;break;case 35:
                            a = -t.contentHeight;break;default:
                            return;}t.settings.suppressScrollX && 0 !== s || t.settings.suppressScrollY && 0 !== a || (i.scrollTop -= a, i.scrollLeft += s, T(t), e(s, a) && r.preventDefault());
                }
            });
        }, wheel: function wheel(e) {
            function i(t, i) {
                var r = 0 === o.scrollTop,
                    l = o.scrollTop + o.offsetHeight === o.scrollHeight,
                    n = 0 === o.scrollLeft,
                    s = o.scrollLeft + o.offsetWidth === o.offsetWidth;return !(Math.abs(i) > Math.abs(t) ? r || l : n || s) || !e.settings.wheelPropagation;
            }function r(t) {
                var e = t.deltaX,
                    i = -1 * t.deltaY;return void 0 !== e && void 0 !== i || (e = -1 * t.wheelDeltaX / 6, i = t.wheelDeltaY / 6), t.deltaMode && 1 === t.deltaMode && (e *= 10, i *= 10), e !== e && i !== i && (e = 0, i = t.wheelDelta), t.shiftKey ? [-i, -e] : [e, i];
            }function l(e, i, r) {
                if (!L.isWebKit && o.querySelector("select:focus")) return !0;if (!o.contains(e)) return !1;for (var l = e; l && l !== o;) {
                    if (l.classList.contains(m.element.consuming)) return !0;var n = t(l);if ([n.overflow, n.overflowX, n.overflowY].join("").match(/(scroll|auto)/)) {
                        var s = l.scrollHeight - l.clientHeight;if (s > 0 && !(0 === l.scrollTop && r > 0 || l.scrollTop === s && r < 0)) return !0;var a = l.scrollLeft - l.clientWidth;if (a > 0 && !(0 === l.scrollLeft && i < 0 || l.scrollLeft === a && i > 0)) return !0;
                    }l = l.parentNode;
                }return !1;
            }function n(t) {
                var n = r(t),
                    s = n[0],
                    a = n[1];if (!l(t.target, s, a)) {
                    var c = !1;e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (a ? o.scrollTop -= a * e.settings.wheelSpeed : o.scrollTop += s * e.settings.wheelSpeed, c = !0) : e.scrollbarXActive && !e.scrollbarYActive && (s ? o.scrollLeft += s * e.settings.wheelSpeed : o.scrollLeft -= a * e.settings.wheelSpeed, c = !0) : (o.scrollTop -= a * e.settings.wheelSpeed, o.scrollLeft += s * e.settings.wheelSpeed), T(e), (c = c || i(s, a)) && !t.ctrlKey && (t.stopPropagation(), t.preventDefault());
                }
            }var o = e.element;void 0 !== window.onwheel ? e.event.bind(o, "wheel", n) : void 0 !== window.onmousewheel && e.event.bind(o, "mousewheel", n);
        }, touch: function touch(e) {
            function i(t, i) {
                var r = h.scrollTop,
                    l = h.scrollLeft,
                    n = Math.abs(t),
                    o = Math.abs(i);if (o > n) {
                    if (i < 0 && r === e.contentHeight - e.containerHeight || i > 0 && 0 === r) return 0 === window.scrollY && i > 0 && L.isChrome;
                } else if (n > o && (t < 0 && l === e.contentWidth - e.containerWidth || t > 0 && 0 === l)) return !0;return !0;
            }function r(t, i) {
                h.scrollTop -= i, h.scrollLeft -= t, T(e);
            }function l(t) {
                return t.targetTouches ? t.targetTouches[0] : t;
            }function n(t) {
                return !(t.pointerType && "pen" === t.pointerType && 0 === t.buttons || (!t.targetTouches || 1 !== t.targetTouches.length) && (!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE));
            }function o(t) {
                if (n(t)) {
                    var e = l(t);u.pageX = e.pageX, u.pageY = e.pageY, d = new Date().getTime(), null !== p && clearInterval(p);
                }
            }function s(e, i, r) {
                if (!h.contains(e)) return !1;for (var l = e; l && l !== h;) {
                    if (l.classList.contains(m.element.consuming)) return !0;var n = t(l);if ([n.overflow, n.overflowX, n.overflowY].join("").match(/(scroll|auto)/)) {
                        var o = l.scrollHeight - l.clientHeight;if (o > 0 && !(0 === l.scrollTop && r > 0 || l.scrollTop === o && r < 0)) return !0;var s = l.scrollLeft - l.clientWidth;if (s > 0 && !(0 === l.scrollLeft && i < 0 || l.scrollLeft === s && i > 0)) return !0;
                    }l = l.parentNode;
                }return !1;
            }function a(t) {
                if (n(t)) {
                    var e = l(t),
                        o = { pageX: e.pageX, pageY: e.pageY },
                        a = o.pageX - u.pageX,
                        c = o.pageY - u.pageY;if (s(t.target, a, c)) return;r(a, c), u = o;var h = new Date().getTime(),
                        p = h - d;p > 0 && (f.x = a / p, f.y = c / p, d = h), i(a, c) && t.preventDefault();
                }
            }function c() {
                e.settings.swipeEasing && (clearInterval(p), p = setInterval(function () {
                    e.isInitialized ? clearInterval(p) : f.x || f.y ? Math.abs(f.x) < .01 && Math.abs(f.y) < .01 ? clearInterval(p) : (r(30 * f.x, 30 * f.y), f.x *= .8, f.y *= .8) : clearInterval(p);
                }, 10));
            }if (L.supportsTouch || L.supportsIePointer) {
                var h = e.element,
                    u = {},
                    d = 0,
                    f = {},
                    p = null;L.supportsTouch ? (e.event.bind(h, "touchstart", o), e.event.bind(h, "touchmove", a), e.event.bind(h, "touchend", c)) : L.supportsIePointer && (window.PointerEvent ? (e.event.bind(h, "pointerdown", o), e.event.bind(h, "pointermove", a), e.event.bind(h, "pointerup", c)) : window.MSPointerEvent && (e.event.bind(h, "MSPointerDown", o), e.event.bind(h, "MSPointerMove", a), e.event.bind(h, "MSPointerUp", c)));
            }
        } },
        H = function H(r, l) {
        var n = this;if (void 0 === l && (l = {}), "string" == typeof r && (r = document.querySelector(r)), !r || !r.nodeName) throw new Error("no element is specified to initialize PerfectScrollbar");this.element = r, r.classList.add(m.main), this.settings = { handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"], maxScrollbarLength: null, minScrollbarLength: null, scrollingThreshold: 1e3, scrollXMarginOffset: 0, scrollYMarginOffset: 0, suppressScrollX: !1, suppressScrollY: !1, swipeEasing: !0, useBothWheelAxes: !1, wheelPropagation: !1, wheelSpeed: 1 };for (var o in l) {
            n.settings[o] = l[o];
        }this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;var s = function s() {
            return r.classList.add(m.state.focus);
        },
            a = function a() {
            return r.classList.remove(m.state.focus);
        };this.isRtl = "rtl" === t(r).direction, this.isNegativeScroll = function () {
            var t = r.scrollLeft,
                e = null;return r.scrollLeft = -1, e = r.scrollLeft < 0, r.scrollLeft = t, e;
        }(), this.negativeScrollAdjustment = this.isNegativeScroll ? r.scrollWidth - r.clientWidth : 0, this.event = new y(), this.ownerDocument = r.ownerDocument || document, this.scrollbarXRail = i(m.element.rail("x")), r.appendChild(this.scrollbarXRail), this.scrollbarX = i(m.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", s), this.event.bind(this.scrollbarX, "blur", a), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;var c = t(this.scrollbarXRail);this.scrollbarXBottom = parseInt(c.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = u(c.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = u(c.borderLeftWidth) + u(c.borderRightWidth), e(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = u(c.marginLeft) + u(c.marginRight), e(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = i(m.element.rail("y")), r.appendChild(this.scrollbarYRail), this.scrollbarY = i(m.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", s), this.event.bind(this.scrollbarY, "blur", a), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;var h = t(this.scrollbarYRail);this.scrollbarYRight = parseInt(h.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = u(h.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? f(this.scrollbarY) : null, this.railBorderYWidth = u(h.borderTopWidth) + u(h.borderBottomWidth), e(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = u(h.marginTop) + u(h.marginBottom), e(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = { x: r.scrollLeft <= 0 ? "start" : r.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null, y: r.scrollTop <= 0 ? "start" : r.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null }, this.isAlive = !0, this.settings.handlers.forEach(function (t) {
            return R[t](n);
        }), this.lastScrollTop = r.scrollTop, this.lastScrollLeft = r.scrollLeft, this.event.bind(this.element, "scroll", function (t) {
            return n.onScroll(t);
        }), T(this);
    };return H.prototype.update = function () {
        this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, e(this.scrollbarXRail, { display: "block" }), e(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = u(t(this.scrollbarXRail).marginLeft) + u(t(this.scrollbarXRail).marginRight), this.railYMarginHeight = u(t(this.scrollbarYRail).marginTop) + u(t(this.scrollbarYRail).marginBottom), e(this.scrollbarXRail, { display: "none" }), e(this.scrollbarYRail, { display: "none" }), T(this), W(this, "top", 0, !1, !0), W(this, "left", 0, !1, !0), e(this.scrollbarXRail, { display: "" }), e(this.scrollbarYRail, { display: "" }));
    }, H.prototype.onScroll = function (t) {
        this.isAlive && (T(this), W(this, "top", this.element.scrollTop - this.lastScrollTop), W(this, "left", this.element.scrollLeft - this.lastScrollLeft), this.lastScrollTop = this.element.scrollTop, this.lastScrollLeft = this.element.scrollLeft);
    }, H.prototype.destroy = function () {
        this.isAlive && (this.event.unbindAll(), l(this.scrollbarX), l(this.scrollbarY), l(this.scrollbarXRail), l(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1);
    }, H.prototype.removePsClasses = function () {
        this.element.className = this.element.className.split(" ").filter(function (t) {
            return !t.match(/^ps([-_].+|)$/);
        }).join(" ");
    }, H;
});
/*! Select2 4.0.5 | https://github.com/select2/select2/blob/master/LICENSE.md */!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c;
    } : a(jQuery);
}(function (a) {
    var b = function () {
        if (a && a.fn && a.fn.select2 && a.fn.select2.amd) var b = a.fn.select2.amd;var b;return function () {
            if (!b || !b.requirejs) {
                b ? c = b : b = {};var a, c, d;!function (b) {
                    function e(a, b) {
                        return v.call(a, b);
                    }function f(a, b) {
                        var c,
                            d,
                            e,
                            f,
                            g,
                            h,
                            i,
                            j,
                            k,
                            l,
                            m,
                            n,
                            o = b && b.split("/"),
                            p = t.map,
                            q = p && p["*"] || {};if (a) {
                            for (a = a.split("/"), g = a.length - 1, t.nodeIdCompat && x.test(a[g]) && (a[g] = a[g].replace(x, "")), "." === a[0].charAt(0) && o && (n = o.slice(0, o.length - 1), a = n.concat(a)), k = 0; k < a.length; k++) {
                                if ("." === (m = a[k])) a.splice(k, 1), k -= 1;else if (".." === m) {
                                    if (0 === k || 1 === k && ".." === a[2] || ".." === a[k - 1]) continue;k > 0 && (a.splice(k - 1, 2), k -= 2);
                                }
                            }a = a.join("/");
                        }if ((o || q) && p) {
                            for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
                                if (d = c.slice(0, k).join("/"), o) for (l = o.length; l > 0; l -= 1) {
                                    if ((e = p[o.slice(0, l).join("/")]) && (e = e[d])) {
                                        f = e, h = k;break;
                                    }
                                }if (f) break;!i && q && q[d] && (i = q[d], j = k);
                            }!f && i && (f = i, h = j), f && (c.splice(0, h, f), a = c.join("/"));
                        }return a;
                    }function g(a, c) {
                        return function () {
                            var d = w.call(arguments, 0);return "string" != typeof d[0] && 1 === d.length && d.push(null), _o2.apply(b, d.concat([a, c]));
                        };
                    }function h(a) {
                        return function (b) {
                            return f(b, a);
                        };
                    }function i(a) {
                        return function (b) {
                            r[a] = b;
                        };
                    }function j(a) {
                        if (e(s, a)) {
                            var c = s[a];delete s[a], u[a] = !0, n.apply(b, c);
                        }if (!e(r, a) && !e(u, a)) throw new Error("No " + a);return r[a];
                    }function k(a) {
                        var b,
                            c = a ? a.indexOf("!") : -1;return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a];
                    }function l(a) {
                        return a ? k(a) : [];
                    }function m(a) {
                        return function () {
                            return t && t.config && t.config[a] || {};
                        };
                    }var n,
                        _o2,
                        p,
                        q,
                        r = {},
                        s = {},
                        t = {},
                        u = {},
                        v = Object.prototype.hasOwnProperty,
                        w = [].slice,
                        x = /\.js$/;p = function p(a, b) {
                        var c,
                            d = k(a),
                            e = d[0],
                            g = b[1];return a = d[1], e && (e = f(e, g), c = j(e)), e ? a = c && c.normalize ? c.normalize(a, h(g)) : f(a, g) : (a = f(a, g), d = k(a), e = d[0], a = d[1], e && (c = j(e))), { f: e ? e + "!" + a : a, n: a, pr: e, p: c };
                    }, q = { require: function require(a) {
                            return g(a);
                        }, exports: function exports(a) {
                            var b = r[a];return void 0 !== b ? b : r[a] = {};
                        }, module: function module(a) {
                            return { id: a, uri: "", exports: r[a], config: m(a) };
                        } }, n = function n(a, c, d, f) {
                        var h,
                            k,
                            m,
                            n,
                            o,
                            t,
                            v,
                            w = [],
                            x = typeof d === "undefined" ? "undefined" : _typeof(d);if (f = f || a, t = l(f), "undefined" === x || "function" === x) {
                            for (c = !c.length && d.length ? ["require", "exports", "module"] : c, o = 0; o < c.length; o += 1) {
                                if (n = p(c[o], t), "require" === (k = n.f)) w[o] = q.require(a);else if ("exports" === k) w[o] = q.exports(a), v = !0;else if ("module" === k) h = w[o] = q.module(a);else if (e(r, k) || e(s, k) || e(u, k)) w[o] = j(k);else {
                                    if (!n.p) throw new Error(a + " missing " + k);n.p.load(n.n, g(f, !0), i(k), {}), w[o] = r[k];
                                }
                            }m = d ? d.apply(r[a], w) : void 0, a && (h && h.exports !== b && h.exports !== r[a] ? r[a] = h.exports : m === b && v || (r[a] = m));
                        } else a && (r[a] = d);
                    }, a = c = _o2 = function o(a, c, d, e, f) {
                        if ("string" == typeof a) return q[a] ? q[a](c) : j(p(a, l(c)).f);if (!a.splice) {
                            if (t = a, t.deps && _o2(t.deps, t.callback), !c) return;c.splice ? (a = c, c = d, d = null) : a = b;
                        }return c = c || function () {}, "function" == typeof d && (d = e, e = f), e ? n(b, a, c, d) : setTimeout(function () {
                            n(b, a, c, d);
                        }, 4), _o2;
                    }, _o2.config = function (a) {
                        return _o2(a);
                    }, a._defined = r, d = function d(a, b, c) {
                        if ("string" != typeof a) throw new Error("See almond README: incorrect module build, no module name");b.splice || (c = b, b = []), e(r, a) || e(s, a) || (s[a] = [a, b, c]);
                    }, d.amd = { jQuery: !0 };
                }(), b.requirejs = a, b.require = c, b.define = d;
            }
        }(), b.define("almond", function () {}), b.define("jquery", [], function () {
            var b = a || $;return null == b && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), b;
        }), b.define("select2/utils", ["jquery"], function (a) {
            function b(a) {
                var b = a.prototype,
                    c = [];for (var d in b) {
                    "function" == typeof b[d] && "constructor" !== d && c.push(d);
                }return c;
            }var c = {};c.Extend = function (a, b) {
                function c() {
                    this.constructor = a;
                }var d = {}.hasOwnProperty;for (var e in b) {
                    d.call(b, e) && (a[e] = b[e]);
                }return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, a;
            }, c.Decorate = function (a, c) {
                function d() {
                    var b = Array.prototype.unshift,
                        d = c.prototype.constructor.length,
                        e = a.prototype.constructor;d > 0 && (b.call(arguments, a.prototype.constructor), e = c.prototype.constructor), e.apply(this, arguments);
                }function e() {
                    this.constructor = d;
                }var f = b(c),
                    g = b(a);c.displayName = a.displayName, d.prototype = new e();for (var h = 0; h < g.length; h++) {
                    var i = g[h];d.prototype[i] = a.prototype[i];
                }for (var j = function j(a) {
                    var b = function b() {};(a in d.prototype) && (b = d.prototype[a]);var e = c.prototype[a];return function () {
                        return Array.prototype.unshift.call(arguments, b), e.apply(this, arguments);
                    };
                }, k = 0; k < f.length; k++) {
                    var l = f[k];d.prototype[l] = j(l);
                }return d;
            };var d = function d() {
                this.listeners = {};
            };return d.prototype.on = function (a, b) {
                this.listeners = this.listeners || {}, a in this.listeners ? this.listeners[a].push(b) : this.listeners[a] = [b];
            }, d.prototype.trigger = function (a) {
                var b = Array.prototype.slice,
                    c = b.call(arguments, 1);this.listeners = this.listeners || {}, null == c && (c = []), 0 === c.length && c.push({}), c[0]._type = a, a in this.listeners && this.invoke(this.listeners[a], b.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments);
            }, d.prototype.invoke = function (a, b) {
                for (var c = 0, d = a.length; c < d; c++) {
                    a[c].apply(this, b);
                }
            }, c.Observable = d, c.generateChars = function (a) {
                for (var b = "", c = 0; c < a; c++) {
                    b += Math.floor(36 * Math.random()).toString(36);
                }return b;
            }, c.bind = function (a, b) {
                return function () {
                    a.apply(b, arguments);
                };
            }, c._convertData = function (a) {
                for (var b in a) {
                    var c = b.split("-"),
                        d = a;if (1 !== c.length) {
                        for (var e = 0; e < c.length; e++) {
                            var f = c[e];f = f.substring(0, 1).toLowerCase() + f.substring(1), f in d || (d[f] = {}), e == c.length - 1 && (d[f] = a[b]), d = d[f];
                        }delete a[b];
                    }
                }return a;
            }, c.hasScroll = function (b, c) {
                var d = a(c),
                    e = c.style.overflowX,
                    f = c.style.overflowY;return (e !== f || "hidden" !== f && "visible" !== f) && ("scroll" === e || "scroll" === f || d.innerHeight() < c.scrollHeight || d.innerWidth() < c.scrollWidth);
            }, c.escapeMarkup = function (a) {
                var b = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" };return "string" != typeof a ? a : String(a).replace(/[&<>"'\/\\]/g, function (a) {
                    return b[a];
                });
            }, c.appendMany = function (b, c) {
                if ("1.7" === a.fn.jquery.substr(0, 3)) {
                    var d = a();a.map(c, function (a) {
                        d = d.add(a);
                    }), c = d;
                }b.append(c);
            }, c;
        }), b.define("select2/results", ["jquery", "./utils"], function (a, b) {
            function c(a, b, d) {
                this.$element = a, this.data = d, this.options = b, c.__super__.constructor.call(this);
            }return b.Extend(c, b.Observable), c.prototype.render = function () {
                var b = a('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple") && b.attr("aria-multiselectable", "true"), this.$results = b, b;
            }, c.prototype.clear = function () {
                this.$results.empty();
            }, c.prototype.displayMessage = function (b) {
                var c = this.options.get("escapeMarkup");this.clear(), this.hideLoading();var d = a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
                    e = this.options.get("translations").get(b.message);d.append(c(e(b.args))), d[0].className += " select2-results__message", this.$results.append(d);
            }, c.prototype.hideMessages = function () {
                this.$results.find(".select2-results__message").remove();
            }, c.prototype.append = function (a) {
                this.hideLoading();var b = [];if (null == a.results || 0 === a.results.length) return void (0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" }));a.results = this.sort(a.results);for (var c = 0; c < a.results.length; c++) {
                    var d = a.results[c],
                        e = this.option(d);b.push(e);
                }this.$results.append(b);
            }, c.prototype.position = function (a, b) {
                b.find(".select2-results").append(a);
            }, c.prototype.sort = function (a) {
                return this.options.get("sorter")(a);
            }, c.prototype.highlightFirstItem = function () {
                var a = this.$results.find(".select2-results__option[aria-selected]"),
                    b = a.filter("[aria-selected=true]");b.length > 0 ? b.first().trigger("mouseenter") : a.first().trigger("mouseenter"), this.ensureHighlightVisible();
            }, c.prototype.setClasses = function () {
                var b = this;this.data.current(function (c) {
                    var d = a.map(c, function (a) {
                        return a.id.toString();
                    });b.$results.find(".select2-results__option[aria-selected]").each(function () {
                        var b = a(this),
                            c = a.data(this, "data"),
                            e = "" + c.id;null != c.element && c.element.selected || null == c.element && a.inArray(e, d) > -1 ? b.attr("aria-selected", "true") : b.attr("aria-selected", "false");
                    });
                });
            }, c.prototype.showLoading = function (a) {
                this.hideLoading();var b = this.options.get("translations").get("searching"),
                    c = { disabled: !0, loading: !0, text: b(a) },
                    d = this.option(c);d.className += " loading-results", this.$results.prepend(d);
            }, c.prototype.hideLoading = function () {
                this.$results.find(".loading-results").remove();
            }, c.prototype.option = function (b) {
                var c = document.createElement("li");c.className = "select2-results__option";var d = { role: "treeitem", "aria-selected": "false" };b.disabled && (delete d["aria-selected"], d["aria-disabled"] = "true"), null == b.id && delete d["aria-selected"], null != b._resultId && (c.id = b._resultId), b.title && (c.title = b.title), b.children && (d.role = "group", d["aria-label"] = b.text, delete d["aria-selected"]);for (var e in d) {
                    var f = d[e];c.setAttribute(e, f);
                }if (b.children) {
                    var g = a(c),
                        h = document.createElement("strong");h.className = "select2-results__group";a(h);this.template(b, h);for (var i = [], j = 0; j < b.children.length; j++) {
                        var k = b.children[j],
                            l = this.option(k);i.push(l);
                    }var m = a("<ul></ul>", { class: "select2-results__options select2-results__options--nested" });m.append(i), g.append(h), g.append(m);
                } else this.template(b, c);return a.data(c, "data", b), c;
            }, c.prototype.bind = function (b, c) {
                var d = this,
                    e = b.id + "-results";this.$results.attr("id", e), b.on("results:all", function (a) {
                    d.clear(), d.append(a.data), b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                }), b.on("results:append", function (a) {
                    d.append(a.data), b.isOpen() && d.setClasses();
                }), b.on("query", function (a) {
                    d.hideMessages(), d.showLoading(a);
                }), b.on("select", function () {
                    b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                }), b.on("unselect", function () {
                    b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                }), b.on("open", function () {
                    d.$results.attr("aria-expanded", "true"), d.$results.attr("aria-hidden", "false"), d.setClasses(), d.ensureHighlightVisible();
                }), b.on("close", function () {
                    d.$results.attr("aria-expanded", "false"), d.$results.attr("aria-hidden", "true"), d.$results.removeAttr("aria-activedescendant");
                }), b.on("results:toggle", function () {
                    var a = d.getHighlightedResults();0 !== a.length && a.trigger("mouseup");
                }), b.on("results:select", function () {
                    var a = d.getHighlightedResults();if (0 !== a.length) {
                        var b = a.data("data");"true" == a.attr("aria-selected") ? d.trigger("close", {}) : d.trigger("select", { data: b });
                    }
                }), b.on("results:previous", function () {
                    var a = d.getHighlightedResults(),
                        b = d.$results.find("[aria-selected]"),
                        c = b.index(a);if (0 !== c) {
                        var e = c - 1;0 === a.length && (e = 0);var f = b.eq(e);f.trigger("mouseenter");var g = d.$results.offset().top,
                            h = f.offset().top,
                            i = d.$results.scrollTop() + (h - g);0 === e ? d.$results.scrollTop(0) : h - g < 0 && d.$results.scrollTop(i);
                    }
                }), b.on("results:next", function () {
                    var a = d.getHighlightedResults(),
                        b = d.$results.find("[aria-selected]"),
                        c = b.index(a),
                        e = c + 1;if (!(e >= b.length)) {
                        var f = b.eq(e);f.trigger("mouseenter");var g = d.$results.offset().top + d.$results.outerHeight(!1),
                            h = f.offset().top + f.outerHeight(!1),
                            i = d.$results.scrollTop() + h - g;0 === e ? d.$results.scrollTop(0) : h > g && d.$results.scrollTop(i);
                    }
                }), b.on("results:focus", function (a) {
                    a.element.addClass("select2-results__option--highlighted");
                }), b.on("results:message", function (a) {
                    d.displayMessage(a);
                }), a.fn.mousewheel && this.$results.on("mousewheel", function (a) {
                    var b = d.$results.scrollTop(),
                        c = d.$results.get(0).scrollHeight - b + a.deltaY,
                        e = a.deltaY > 0 && b - a.deltaY <= 0,
                        f = a.deltaY < 0 && c <= d.$results.height();e ? (d.$results.scrollTop(0), a.preventDefault(), a.stopPropagation()) : f && (d.$results.scrollTop(d.$results.get(0).scrollHeight - d.$results.height()), a.preventDefault(), a.stopPropagation());
                }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (b) {
                    var c = a(this),
                        e = c.data("data");if ("true" === c.attr("aria-selected")) return void (d.options.get("multiple") ? d.trigger("unselect", { originalEvent: b, data: e }) : d.trigger("close", {}));d.trigger("select", { originalEvent: b, data: e });
                }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (b) {
                    var c = a(this).data("data");d.getHighlightedResults().removeClass("select2-results__option--highlighted"), d.trigger("results:focus", { data: c, element: a(this) });
                });
            }, c.prototype.getHighlightedResults = function () {
                return this.$results.find(".select2-results__option--highlighted");
            }, c.prototype.destroy = function () {
                this.$results.remove();
            }, c.prototype.ensureHighlightVisible = function () {
                var a = this.getHighlightedResults();if (0 !== a.length) {
                    var b = this.$results.find("[aria-selected]"),
                        c = b.index(a),
                        d = this.$results.offset().top,
                        e = a.offset().top,
                        f = this.$results.scrollTop() + (e - d),
                        g = e - d;f -= 2 * a.outerHeight(!1), c <= 2 ? this.$results.scrollTop(0) : (g > this.$results.outerHeight() || g < 0) && this.$results.scrollTop(f);
                }
            }, c.prototype.template = function (b, c) {
                var d = this.options.get("templateResult"),
                    e = this.options.get("escapeMarkup"),
                    f = d(b, c);null == f ? c.style.display = "none" : "string" == typeof f ? c.innerHTML = e(f) : a(c).append(f);
            }, c;
        }), b.define("select2/keys", [], function () {
            return { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 };
        }), b.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (a, b, c) {
            function d(a, b) {
                this.$element = a, this.options = b, d.__super__.constructor.call(this);
            }return b.Extend(d, b.Observable), d.prototype.render = function () {
                var b = a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), b.attr("title", this.$element.attr("title")), b.attr("tabindex", this._tabindex), this.$selection = b, b;
            }, d.prototype.bind = function (a, b) {
                var d = this,
                    e = (a.id, a.id + "-results");this.container = a, this.$selection.on("focus", function (a) {
                    d.trigger("focus", a);
                }), this.$selection.on("blur", function (a) {
                    d._handleBlur(a);
                }), this.$selection.on("keydown", function (a) {
                    d.trigger("keypress", a), a.which === c.SPACE && a.preventDefault();
                }), a.on("results:focus", function (a) {
                    d.$selection.attr("aria-activedescendant", a.data._resultId);
                }), a.on("selection:update", function (a) {
                    d.update(a.data);
                }), a.on("open", function () {
                    d.$selection.attr("aria-expanded", "true"), d.$selection.attr("aria-owns", e), d._attachCloseHandler(a);
                }), a.on("close", function () {
                    d.$selection.attr("aria-expanded", "false"), d.$selection.removeAttr("aria-activedescendant"), d.$selection.removeAttr("aria-owns"), d.$selection.focus(), d._detachCloseHandler(a);
                }), a.on("enable", function () {
                    d.$selection.attr("tabindex", d._tabindex);
                }), a.on("disable", function () {
                    d.$selection.attr("tabindex", "-1");
                });
            }, d.prototype._handleBlur = function (b) {
                var c = this;window.setTimeout(function () {
                    document.activeElement == c.$selection[0] || a.contains(c.$selection[0], document.activeElement) || c.trigger("blur", b);
                }, 1);
            }, d.prototype._attachCloseHandler = function (b) {
                a(document.body).on("mousedown.select2." + b.id, function (b) {
                    var c = a(b.target),
                        d = c.closest(".select2");a(".select2.select2-container--open").each(function () {
                        var b = a(this);this != d[0] && b.data("element").select2("close");
                    });
                });
            }, d.prototype._detachCloseHandler = function (b) {
                a(document.body).off("mousedown.select2." + b.id);
            }, d.prototype.position = function (a, b) {
                b.find(".selection").append(a);
            }, d.prototype.destroy = function () {
                this._detachCloseHandler(this.container);
            }, d.prototype.update = function (a) {
                throw new Error("The `update` method must be defined in child classes.");
            }, d;
        }), b.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (a, b, c, d) {
            function e() {
                e.__super__.constructor.apply(this, arguments);
            }return c.Extend(e, b), e.prototype.render = function () {
                var a = e.__super__.render.call(this);return a.addClass("select2-selection--single"), a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), a;
            }, e.prototype.bind = function (a, b) {
                var c = this;e.__super__.bind.apply(this, arguments);var d = a.id + "-container";this.$selection.find(".select2-selection__rendered").attr("id", d), this.$selection.attr("aria-labelledby", d), this.$selection.on("mousedown", function (a) {
                    1 === a.which && c.trigger("toggle", { originalEvent: a });
                }), this.$selection.on("focus", function (a) {}), this.$selection.on("blur", function (a) {}), a.on("focus", function (b) {
                    a.isOpen() || c.$selection.focus();
                }), a.on("selection:update", function (a) {
                    c.update(a.data);
                });
            }, e.prototype.clear = function () {
                this.$selection.find(".select2-selection__rendered").empty();
            }, e.prototype.display = function (a, b) {
                var c = this.options.get("templateSelection");return this.options.get("escapeMarkup")(c(a, b));
            }, e.prototype.selectionContainer = function () {
                return a("<span></span>");
            }, e.prototype.update = function (a) {
                if (0 === a.length) return void this.clear();var b = a[0],
                    c = this.$selection.find(".select2-selection__rendered"),
                    d = this.display(b, c);c.empty().append(d), c.prop("title", b.title || b.text);
            }, e;
        }), b.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (a, b, c) {
            function d(a, b) {
                d.__super__.constructor.apply(this, arguments);
            }return c.Extend(d, b), d.prototype.render = function () {
                var a = d.__super__.render.call(this);return a.addClass("select2-selection--multiple"), a.html('<ul class="select2-selection__rendered"></ul>'), a;
            }, d.prototype.bind = function (b, c) {
                var e = this;d.__super__.bind.apply(this, arguments), this.$selection.on("click", function (a) {
                    e.trigger("toggle", { originalEvent: a });
                }), this.$selection.on("click", ".select2-selection__choice__remove", function (b) {
                    if (!e.options.get("disabled")) {
                        var c = a(this),
                            d = c.parent(),
                            f = d.data("data");e.trigger("unselect", { originalEvent: b, data: f });
                    }
                });
            }, d.prototype.clear = function () {
                this.$selection.find(".select2-selection__rendered").empty();
            }, d.prototype.display = function (a, b) {
                var c = this.options.get("templateSelection");return this.options.get("escapeMarkup")(c(a, b));
            }, d.prototype.selectionContainer = function () {
                return a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
            }, d.prototype.update = function (a) {
                if (this.clear(), 0 !== a.length) {
                    for (var b = [], d = 0; d < a.length; d++) {
                        var e = a[d],
                            f = this.selectionContainer(),
                            g = this.display(e, f);f.append(g), f.prop("title", e.title || e.text), f.data("data", e), b.push(f);
                    }var h = this.$selection.find(".select2-selection__rendered");c.appendMany(h, b);
                }
            }, d;
        }), b.define("select2/selection/placeholder", ["../utils"], function (a) {
            function b(a, b, c) {
                this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c);
            }return b.prototype.normalizePlaceholder = function (a, b) {
                return "string" == typeof b && (b = { id: "", text: b }), b;
            }, b.prototype.createPlaceholder = function (a, b) {
                var c = this.selectionContainer();return c.html(this.display(b)), c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), c;
            }, b.prototype.update = function (a, b) {
                var c = 1 == b.length && b[0].id != this.placeholder.id;if (b.length > 1 || c) return a.call(this, b);this.clear();var d = this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(d);
            }, b;
        }), b.define("select2/selection/allowClear", ["jquery", "../keys"], function (a, b) {
            function c() {}return c.prototype.bind = function (a, b, c) {
                var d = this;a.call(this, b, c), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function (a) {
                    d._handleClear(a);
                }), b.on("keypress", function (a) {
                    d._handleKeyboardClear(a, b);
                });
            }, c.prototype._handleClear = function (a, b) {
                if (!this.options.get("disabled")) {
                    var c = this.$selection.find(".select2-selection__clear");if (0 !== c.length) {
                        b.stopPropagation();for (var d = c.data("data"), e = 0; e < d.length; e++) {
                            var f = { data: d[e] };if (this.trigger("unselect", f), f.prevented) return;
                        }this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {});
                    }
                }
            }, c.prototype._handleKeyboardClear = function (a, c, d) {
                d.isOpen() || c.which != b.DELETE && c.which != b.BACKSPACE || this._handleClear(c);
            }, c.prototype.update = function (b, c) {
                if (b.call(this, c), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === c.length)) {
                    var d = a('<span class="select2-selection__clear">&times;</span>');d.data("data", c), this.$selection.find(".select2-selection__rendered").prepend(d);
                }
            }, c;
        }), b.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (a, b, c) {
            function d(a, b, c) {
                a.call(this, b, c);
            }return d.prototype.render = function (b) {
                var c = a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer = c, this.$search = c.find("input");var d = b.call(this);return this._transferTabIndex(), d;
            }, d.prototype.bind = function (a, b, d) {
                var e = this;a.call(this, b, d), b.on("open", function () {
                    e.$search.trigger("focus");
                }), b.on("close", function () {
                    e.$search.val(""), e.$search.removeAttr("aria-activedescendant"), e.$search.trigger("focus");
                }), b.on("enable", function () {
                    e.$search.prop("disabled", !1), e._transferTabIndex();
                }), b.on("disable", function () {
                    e.$search.prop("disabled", !0);
                }), b.on("focus", function (a) {
                    e.$search.trigger("focus");
                }), b.on("results:focus", function (a) {
                    e.$search.attr("aria-activedescendant", a.id);
                }), this.$selection.on("focusin", ".select2-search--inline", function (a) {
                    e.trigger("focus", a);
                }), this.$selection.on("focusout", ".select2-search--inline", function (a) {
                    e._handleBlur(a);
                }), this.$selection.on("keydown", ".select2-search--inline", function (a) {
                    if (a.stopPropagation(), e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented(), a.which === c.BACKSPACE && "" === e.$search.val()) {
                        var b = e.$searchContainer.prev(".select2-selection__choice");if (b.length > 0) {
                            var d = b.data("data");e.searchRemoveChoice(d), a.preventDefault();
                        }
                    }
                });var f = document.documentMode,
                    g = f && f <= 11;this.$selection.on("input.searchcheck", ".select2-search--inline", function (a) {
                    if (g) return void e.$selection.off("input.search input.searchcheck");e.$selection.off("keyup.search");
                }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function (a) {
                    if (g && "input" === a.type) return void e.$selection.off("input.search input.searchcheck");var b = a.which;b != c.SHIFT && b != c.CTRL && b != c.ALT && b != c.TAB && e.handleSearch(a);
                });
            }, d.prototype._transferTabIndex = function (a) {
                this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1");
            }, d.prototype.createPlaceholder = function (a, b) {
                this.$search.attr("placeholder", b.text);
            }, d.prototype.update = function (a, b) {
                var c = this.$search[0] == document.activeElement;this.$search.attr("placeholder", ""), a.call(this, b), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), c && this.$search.focus();
            }, d.prototype.handleSearch = function () {
                if (this.resizeSearch(), !this._keyUpPrevented) {
                    var a = this.$search.val();this.trigger("query", { term: a });
                }this._keyUpPrevented = !1;
            }, d.prototype.searchRemoveChoice = function (a, b) {
                this.trigger("unselect", { data: b }), this.$search.val(b.text), this.handleSearch();
            }, d.prototype.resizeSearch = function () {
                this.$search.css("width", "25px");var a = "";if ("" !== this.$search.attr("placeholder")) a = this.$selection.find(".select2-selection__rendered").innerWidth();else {
                    a = .75 * (this.$search.val().length + 1) + "em";
                }this.$search.css("width", a);
            }, d;
        }), b.define("select2/selection/eventRelay", ["jquery"], function (a) {
            function b() {}return b.prototype.bind = function (b, c, d) {
                var e = this,
                    f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                    g = ["opening", "closing", "selecting", "unselecting"];b.call(this, c, d), c.on("*", function (b, c) {
                    if (-1 !== a.inArray(b, f)) {
                        c = c || {};var d = a.Event("select2:" + b, { params: c });e.$element.trigger(d), -1 !== a.inArray(b, g) && (c.prevented = d.isDefaultPrevented());
                    }
                });
            }, b;
        }), b.define("select2/translation", ["jquery", "require"], function (a, b) {
            function c(a) {
                this.dict = a || {};
            }return c.prototype.all = function () {
                return this.dict;
            }, c.prototype.get = function (a) {
                return this.dict[a];
            }, c.prototype.extend = function (b) {
                this.dict = a.extend({}, b.all(), this.dict);
            }, c._cache = {}, c.loadPath = function (a) {
                if (!(a in c._cache)) {
                    var d = b(a);c._cache[a] = d;
                }return new c(c._cache[a]);
            }, c;
        }), b.define("select2/diacritics", [], function () {
            return { "Ⓐ": "A", "Ａ": "A", "À": "A", "Á": "A", "Â": "A", "Ầ": "A", "Ấ": "A", "Ẫ": "A", "Ẩ": "A", "Ã": "A", "Ā": "A", "Ă": "A", "Ằ": "A", "Ắ": "A", "Ẵ": "A", "Ẳ": "A", "Ȧ": "A", "Ǡ": "A", "Ä": "A", "Ǟ": "A", "Ả": "A", "Å": "A", "Ǻ": "A", "Ǎ": "A", "Ȁ": "A", "Ȃ": "A", "Ạ": "A", "Ậ": "A", "Ặ": "A", "Ḁ": "A", "Ą": "A", "Ⱥ": "A", "Ɐ": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ⓑ": "B", "Ｂ": "B", "Ḃ": "B", "Ḅ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ɓ": "B", "Ⓒ": "C", "Ｃ": "C", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ƈ": "C", "Ȼ": "C", "Ꜿ": "C", "Ⓓ": "D", "Ｄ": "D", "Ḋ": "D", "Ď": "D", "Ḍ": "D", "Ḑ": "D", "Ḓ": "D", "Ḏ": "D", "Đ": "D", "Ƌ": "D", "Ɗ": "D", "Ɖ": "D", "Ꝺ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "ǲ": "Dz", "ǅ": "Dz", "Ⓔ": "E", "Ｅ": "E", "È": "E", "É": "E", "Ê": "E", "Ề": "E", "Ế": "E", "Ễ": "E", "Ể": "E", "Ẽ": "E", "Ē": "E", "Ḕ": "E", "Ḗ": "E", "Ĕ": "E", "Ė": "E", "Ë": "E", "Ẻ": "E", "Ě": "E", "Ȅ": "E", "Ȇ": "E", "Ẹ": "E", "Ệ": "E", "Ȩ": "E", "Ḝ": "E", "Ę": "E", "Ḙ": "E", "Ḛ": "E", "Ɛ": "E", "Ǝ": "E", "Ⓕ": "F", "Ｆ": "F", "Ḟ": "F", "Ƒ": "F", "Ꝼ": "F", "Ⓖ": "G", "Ｇ": "G", "Ǵ": "G", "Ĝ": "G", "Ḡ": "G", "Ğ": "G", "Ġ": "G", "Ǧ": "G", "Ģ": "G", "Ǥ": "G", "Ɠ": "G", "Ꞡ": "G", "Ᵹ": "G", "Ꝿ": "G", "Ⓗ": "H", "Ｈ": "H", "Ĥ": "H", "Ḣ": "H", "Ḧ": "H", "Ȟ": "H", "Ḥ": "H", "Ḩ": "H", "Ḫ": "H", "Ħ": "H", "Ⱨ": "H", "Ⱶ": "H", "Ɥ": "H", "Ⓘ": "I", "Ｉ": "I", "Ì": "I", "Í": "I", "Î": "I", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "İ": "I", "Ï": "I", "Ḯ": "I", "Ỉ": "I", "Ǐ": "I", "Ȉ": "I", "Ȋ": "I", "Ị": "I", "Į": "I", "Ḭ": "I", "Ɨ": "I", "Ⓙ": "J", "Ｊ": "J", "Ĵ": "J", "Ɉ": "J", "Ⓚ": "K", "Ｋ": "K", "Ḱ": "K", "Ǩ": "K", "Ḳ": "K", "Ķ": "K", "Ḵ": "K", "Ƙ": "K", "Ⱪ": "K", "Ꝁ": "K", "Ꝃ": "K", "Ꝅ": "K", "Ꞣ": "K", "Ⓛ": "L", "Ｌ": "L", "Ŀ": "L", "Ĺ": "L", "Ľ": "L", "Ḷ": "L", "Ḹ": "L", "Ļ": "L", "Ḽ": "L", "Ḻ": "L", "Ł": "L", "Ƚ": "L", "Ɫ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ꝇ": "L", "Ꞁ": "L", "Ǉ": "LJ", "ǈ": "Lj", "Ⓜ": "M", "Ｍ": "M", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ɯ": "M", "Ⓝ": "N", "Ｎ": "N", "Ǹ": "N", "Ń": "N", "Ñ": "N", "Ṅ": "N", "Ň": "N", "Ṇ": "N", "Ņ": "N", "Ṋ": "N", "Ṉ": "N", "Ƞ": "N", "Ɲ": "N", "Ꞑ": "N", "Ꞥ": "N", "Ǌ": "NJ", "ǋ": "Nj", "Ⓞ": "O", "Ｏ": "O", "Ò": "O", "Ó": "O", "Ô": "O", "Ồ": "O", "Ố": "O", "Ỗ": "O", "Ổ": "O", "Õ": "O", "Ṍ": "O", "Ȭ": "O", "Ṏ": "O", "Ō": "O", "Ṑ": "O", "Ṓ": "O", "Ŏ": "O", "Ȯ": "O", "Ȱ": "O", "Ö": "O", "Ȫ": "O", "Ỏ": "O", "Ő": "O", "Ǒ": "O", "Ȍ": "O", "Ȏ": "O", "Ơ": "O", "Ờ": "O", "Ớ": "O", "Ỡ": "O", "Ở": "O", "Ợ": "O", "Ọ": "O", "Ộ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Ɔ": "O", "Ɵ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ȣ": "OU", "Ⓟ": "P", "Ｐ": "P", "Ṕ": "P", "Ṗ": "P", "Ƥ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝓ": "P", "Ꝕ": "P", "Ⓠ": "Q", "Ｑ": "Q", "Ꝗ": "Q", "Ꝙ": "Q", "Ɋ": "Q", "Ⓡ": "R", "Ｒ": "R", "Ŕ": "R", "Ṙ": "R", "Ř": "R", "Ȑ": "R", "Ȓ": "R", "Ṛ": "R", "Ṝ": "R", "Ŗ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꝛ": "R", "Ꞧ": "R", "Ꞃ": "R", "Ⓢ": "S", "Ｓ": "S", "ẞ": "S", "Ś": "S", "Ṥ": "S", "Ŝ": "S", "Ṡ": "S", "Š": "S", "Ṧ": "S", "Ṣ": "S", "Ṩ": "S", "Ș": "S", "Ş": "S", "Ȿ": "S", "Ꞩ": "S", "Ꞅ": "S", "Ⓣ": "T", "Ｔ": "T", "Ṫ": "T", "Ť": "T", "Ṭ": "T", "Ț": "T", "Ţ": "T", "Ṱ": "T", "Ṯ": "T", "Ŧ": "T", "Ƭ": "T", "Ʈ": "T", "Ⱦ": "T", "Ꞇ": "T", "Ꜩ": "TZ", "Ⓤ": "U", "Ｕ": "U", "Ù": "U", "Ú": "U", "Û": "U", "Ũ": "U", "Ṹ": "U", "Ū": "U", "Ṻ": "U", "Ŭ": "U", "Ü": "U", "Ǜ": "U", "Ǘ": "U", "Ǖ": "U", "Ǚ": "U", "Ủ": "U", "Ů": "U", "Ű": "U", "Ǔ": "U", "Ȕ": "U", "Ȗ": "U", "Ư": "U", "Ừ": "U", "Ứ": "U", "Ữ": "U", "Ử": "U", "Ự": "U", "Ụ": "U", "Ṳ": "U", "Ų": "U", "Ṷ": "U", "Ṵ": "U", "Ʉ": "U", "Ⓥ": "V", "Ｖ": "V", "Ṽ": "V", "Ṿ": "V", "Ʋ": "V", "Ꝟ": "V", "Ʌ": "V", "Ꝡ": "VY", "Ⓦ": "W", "Ｗ": "W", "Ẁ": "W", "Ẃ": "W", "Ŵ": "W", "Ẇ": "W", "Ẅ": "W", "Ẉ": "W", "Ⱳ": "W", "Ⓧ": "X", "Ｘ": "X", "Ẋ": "X", "Ẍ": "X", "Ⓨ": "Y", "Ｙ": "Y", "Ỳ": "Y", "Ý": "Y", "Ŷ": "Y", "Ỹ": "Y", "Ȳ": "Y", "Ẏ": "Y", "Ÿ": "Y", "Ỷ": "Y", "Ỵ": "Y", "Ƴ": "Y", "Ɏ": "Y", "Ỿ": "Y", "Ⓩ": "Z", "Ｚ": "Z", "Ź": "Z", "Ẑ": "Z", "Ż": "Z", "Ž": "Z", "Ẓ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ȥ": "Z", "Ɀ": "Z", "Ⱬ": "Z", "Ꝣ": "Z", "ⓐ": "a", "ａ": "a", "ẚ": "a", "à": "a", "á": "a", "â": "a", "ầ": "a", "ấ": "a", "ẫ": "a", "ẩ": "a", "ã": "a", "ā": "a", "ă": "a", "ằ": "a", "ắ": "a", "ẵ": "a", "ẳ": "a", "ȧ": "a", "ǡ": "a", "ä": "a", "ǟ": "a", "ả": "a", "å": "a", "ǻ": "a", "ǎ": "a", "ȁ": "a", "ȃ": "a", "ạ": "a", "ậ": "a", "ặ": "a", "ḁ": "a", "ą": "a", "ⱥ": "a", "ɐ": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ⓑ": "b", "ｂ": "b", "ḃ": "b", "ḅ": "b", "ḇ": "b", "ƀ": "b", "ƃ": "b", "ɓ": "b", "ⓒ": "c", "ｃ": "c", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "ç": "c", "ḉ": "c", "ƈ": "c", "ȼ": "c", "ꜿ": "c", "ↄ": "c", "ⓓ": "d", "ｄ": "d", "ḋ": "d", "ď": "d", "ḍ": "d", "ḑ": "d", "ḓ": "d", "ḏ": "d", "đ": "d", "ƌ": "d", "ɖ": "d", "ɗ": "d", "ꝺ": "d", "ǳ": "dz", "ǆ": "dz", "ⓔ": "e", "ｅ": "e", "è": "e", "é": "e", "ê": "e", "ề": "e", "ế": "e", "ễ": "e", "ể": "e", "ẽ": "e", "ē": "e", "ḕ": "e", "ḗ": "e", "ĕ": "e", "ė": "e", "ë": "e", "ẻ": "e", "ě": "e", "ȅ": "e", "ȇ": "e", "ẹ": "e", "ệ": "e", "ȩ": "e", "ḝ": "e", "ę": "e", "ḙ": "e", "ḛ": "e", "ɇ": "e", "ɛ": "e", "ǝ": "e", "ⓕ": "f", "ｆ": "f", "ḟ": "f", "ƒ": "f", "ꝼ": "f", "ⓖ": "g", "ｇ": "g", "ǵ": "g", "ĝ": "g", "ḡ": "g", "ğ": "g", "ġ": "g", "ǧ": "g", "ģ": "g", "ǥ": "g", "ɠ": "g", "ꞡ": "g", "ᵹ": "g", "ꝿ": "g", "ⓗ": "h", "ｈ": "h", "ĥ": "h", "ḣ": "h", "ḧ": "h", "ȟ": "h", "ḥ": "h", "ḩ": "h", "ḫ": "h", "ẖ": "h", "ħ": "h", "ⱨ": "h", "ⱶ": "h", "ɥ": "h", "ƕ": "hv", "ⓘ": "i", "ｉ": "i", "ì": "i", "í": "i", "î": "i", "ĩ": "i", "ī": "i", "ĭ": "i", "ï": "i", "ḯ": "i", "ỉ": "i", "ǐ": "i", "ȉ": "i", "ȋ": "i", "ị": "i", "į": "i", "ḭ": "i", "ɨ": "i", "ı": "i", "ⓙ": "j", "ｊ": "j", "ĵ": "j", "ǰ": "j", "ɉ": "j", "ⓚ": "k", "ｋ": "k", "ḱ": "k", "ǩ": "k", "ḳ": "k", "ķ": "k", "ḵ": "k", "ƙ": "k", "ⱪ": "k", "ꝁ": "k", "ꝃ": "k", "ꝅ": "k", "ꞣ": "k", "ⓛ": "l", "ｌ": "l", "ŀ": "l", "ĺ": "l", "ľ": "l", "ḷ": "l", "ḹ": "l", "ļ": "l", "ḽ": "l", "ḻ": "l", "ſ": "l", "ł": "l", "ƚ": "l", "ɫ": "l", "ⱡ": "l", "ꝉ": "l", "ꞁ": "l", "ꝇ": "l", "ǉ": "lj", "ⓜ": "m", "ｍ": "m", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ɯ": "m", "ⓝ": "n", "ｎ": "n", "ǹ": "n", "ń": "n", "ñ": "n", "ṅ": "n", "ň": "n", "ṇ": "n", "ņ": "n", "ṋ": "n", "ṉ": "n", "ƞ": "n", "ɲ": "n", "ŉ": "n", "ꞑ": "n", "ꞥ": "n", "ǌ": "nj", "ⓞ": "o", "ｏ": "o", "ò": "o", "ó": "o", "ô": "o", "ồ": "o", "ố": "o", "ỗ": "o", "ổ": "o", "õ": "o", "ṍ": "o", "ȭ": "o", "ṏ": "o", "ō": "o", "ṑ": "o", "ṓ": "o", "ŏ": "o", "ȯ": "o", "ȱ": "o", "ö": "o", "ȫ": "o", "ỏ": "o", "ő": "o", "ǒ": "o", "ȍ": "o", "ȏ": "o", "ơ": "o", "ờ": "o", "ớ": "o", "ỡ": "o", "ở": "o", "ợ": "o", "ọ": "o", "ộ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "ɔ": "o", "ꝋ": "o", "ꝍ": "o", "ɵ": "o", "ƣ": "oi", "ȣ": "ou", "ꝏ": "oo", "ⓟ": "p", "ｐ": "p", "ṕ": "p", "ṗ": "p", "ƥ": "p", "ᵽ": "p", "ꝑ": "p", "ꝓ": "p", "ꝕ": "p", "ⓠ": "q", "ｑ": "q", "ɋ": "q", "ꝗ": "q", "ꝙ": "q", "ⓡ": "r", "ｒ": "r", "ŕ": "r", "ṙ": "r", "ř": "r", "ȑ": "r", "ȓ": "r", "ṛ": "r", "ṝ": "r", "ŗ": "r", "ṟ": "r", "ɍ": "r", "ɽ": "r", "ꝛ": "r", "ꞧ": "r", "ꞃ": "r", "ⓢ": "s", "ｓ": "s", "ß": "s", "ś": "s", "ṥ": "s", "ŝ": "s", "ṡ": "s", "š": "s", "ṧ": "s", "ṣ": "s", "ṩ": "s", "ș": "s", "ş": "s", "ȿ": "s", "ꞩ": "s", "ꞅ": "s", "ẛ": "s", "ⓣ": "t", "ｔ": "t", "ṫ": "t", "ẗ": "t", "ť": "t", "ṭ": "t", "ț": "t", "ţ": "t", "ṱ": "t", "ṯ": "t", "ŧ": "t", "ƭ": "t", "ʈ": "t", "ⱦ": "t", "ꞇ": "t", "ꜩ": "tz", "ⓤ": "u", "ｕ": "u", "ù": "u", "ú": "u", "û": "u", "ũ": "u", "ṹ": "u", "ū": "u", "ṻ": "u", "ŭ": "u", "ü": "u", "ǜ": "u", "ǘ": "u", "ǖ": "u", "ǚ": "u", "ủ": "u", "ů": "u", "ű": "u", "ǔ": "u", "ȕ": "u", "ȗ": "u", "ư": "u", "ừ": "u", "ứ": "u", "ữ": "u", "ử": "u", "ự": "u", "ụ": "u", "ṳ": "u", "ų": "u", "ṷ": "u", "ṵ": "u", "ʉ": "u", "ⓥ": "v", "ｖ": "v", "ṽ": "v", "ṿ": "v", "ʋ": "v", "ꝟ": "v", "ʌ": "v", "ꝡ": "vy", "ⓦ": "w", "ｗ": "w", "ẁ": "w", "ẃ": "w", "ŵ": "w", "ẇ": "w", "ẅ": "w", "ẘ": "w", "ẉ": "w", "ⱳ": "w", "ⓧ": "x", "ｘ": "x", "ẋ": "x", "ẍ": "x", "ⓨ": "y", "ｙ": "y", "ỳ": "y", "ý": "y", "ŷ": "y", "ỹ": "y", "ȳ": "y", "ẏ": "y", "ÿ": "y", "ỷ": "y", "ẙ": "y", "ỵ": "y", "ƴ": "y", "ɏ": "y", "ỿ": "y", "ⓩ": "z", "ｚ": "z", "ź": "z", "ẑ": "z", "ż": "z", "ž": "z", "ẓ": "z", "ẕ": "z", "ƶ": "z", "ȥ": "z", "ɀ": "z", "ⱬ": "z", "ꝣ": "z", "Ά": "Α", "Έ": "Ε", "Ή": "Η", "Ί": "Ι", "Ϊ": "Ι", "Ό": "Ο", "Ύ": "Υ", "Ϋ": "Υ", "Ώ": "Ω", "ά": "α", "έ": "ε", "ή": "η", "ί": "ι", "ϊ": "ι", "ΐ": "ι", "ό": "ο", "ύ": "υ", "ϋ": "υ", "ΰ": "υ", "ω": "ω", "ς": "σ" };
        }), b.define("select2/data/base", ["../utils"], function (a) {
            function b(a, c) {
                b.__super__.constructor.call(this);
            }return a.Extend(b, a.Observable), b.prototype.current = function (a) {
                throw new Error("The `current` method must be defined in child classes.");
            }, b.prototype.query = function (a, b) {
                throw new Error("The `query` method must be defined in child classes.");
            }, b.prototype.bind = function (a, b) {}, b.prototype.destroy = function () {}, b.prototype.generateResultId = function (b, c) {
                var d = b.id + "-result-";return d += a.generateChars(4), null != c.id ? d += "-" + c.id.toString() : d += "-" + a.generateChars(4), d;
            }, b;
        }), b.define("select2/data/select", ["./base", "../utils", "jquery"], function (a, b, c) {
            function d(a, b) {
                this.$element = a, this.options = b, d.__super__.constructor.call(this);
            }return b.Extend(d, a), d.prototype.current = function (a) {
                var b = [],
                    d = this;this.$element.find(":selected").each(function () {
                    var a = c(this),
                        e = d.item(a);b.push(e);
                }), a(b);
            }, d.prototype.select = function (a) {
                var b = this;if (a.selected = !0, c(a.element).is("option")) return a.element.selected = !0, void this.$element.trigger("change");if (this.$element.prop("multiple")) this.current(function (d) {
                    var e = [];a = [a], a.push.apply(a, d);for (var f = 0; f < a.length; f++) {
                        var g = a[f].id;-1 === c.inArray(g, e) && e.push(g);
                    }b.$element.val(e), b.$element.trigger("change");
                });else {
                    var d = a.id;this.$element.val(d), this.$element.trigger("change");
                }
            }, d.prototype.unselect = function (a) {
                var b = this;if (this.$element.prop("multiple")) {
                    if (a.selected = !1, c(a.element).is("option")) return a.element.selected = !1, void this.$element.trigger("change");this.current(function (d) {
                        for (var e = [], f = 0; f < d.length; f++) {
                            var g = d[f].id;g !== a.id && -1 === c.inArray(g, e) && e.push(g);
                        }b.$element.val(e), b.$element.trigger("change");
                    });
                }
            }, d.prototype.bind = function (a, b) {
                var c = this;this.container = a, a.on("select", function (a) {
                    c.select(a.data);
                }), a.on("unselect", function (a) {
                    c.unselect(a.data);
                });
            }, d.prototype.destroy = function () {
                this.$element.find("*").each(function () {
                    c.removeData(this, "data");
                });
            }, d.prototype.query = function (a, b) {
                var d = [],
                    e = this;this.$element.children().each(function () {
                    var b = c(this);if (b.is("option") || b.is("optgroup")) {
                        var f = e.item(b),
                            g = e.matches(a, f);null !== g && d.push(g);
                    }
                }), b({ results: d });
            }, d.prototype.addOptions = function (a) {
                b.appendMany(this.$element, a);
            }, d.prototype.option = function (a) {
                var b;a.children ? (b = document.createElement("optgroup"), b.label = a.text) : (b = document.createElement("option"), void 0 !== b.textContent ? b.textContent = a.text : b.innerText = a.text), void 0 !== a.id && (b.value = a.id), a.disabled && (b.disabled = !0), a.selected && (b.selected = !0), a.title && (b.title = a.title);var d = c(b),
                    e = this._normalizeItem(a);return e.element = b, c.data(b, "data", e), d;
            }, d.prototype.item = function (a) {
                var b = {};if (null != (b = c.data(a[0], "data"))) return b;if (a.is("option")) b = { id: a.val(), text: a.text(), disabled: a.prop("disabled"), selected: a.prop("selected"), title: a.prop("title") };else if (a.is("optgroup")) {
                    b = { text: a.prop("label"), children: [], title: a.prop("title") };for (var d = a.children("option"), e = [], f = 0; f < d.length; f++) {
                        var g = c(d[f]),
                            h = this.item(g);e.push(h);
                    }b.children = e;
                }return b = this._normalizeItem(b), b.element = a[0], c.data(a[0], "data", b), b;
            }, d.prototype._normalizeItem = function (a) {
                c.isPlainObject(a) || (a = { id: a, text: a }), a = c.extend({}, { text: "" }, a);var b = { selected: !1, disabled: !1 };return null != a.id && (a.id = a.id.toString()), null != a.text && (a.text = a.text.toString()), null == a._resultId && a.id && null != this.container && (a._resultId = this.generateResultId(this.container, a)), c.extend({}, b, a);
            }, d.prototype.matches = function (a, b) {
                return this.options.get("matcher")(a, b);
            }, d;
        }), b.define("select2/data/array", ["./select", "../utils", "jquery"], function (a, b, c) {
            function d(a, b) {
                var c = b.get("data") || [];d.__super__.constructor.call(this, a, b), this.addOptions(this.convertToOptions(c));
            }return b.Extend(d, a), d.prototype.select = function (a) {
                var b = this.$element.find("option").filter(function (b, c) {
                    return c.value == a.id.toString();
                });0 === b.length && (b = this.option(a), this.addOptions(b)), d.__super__.select.call(this, a);
            }, d.prototype.convertToOptions = function (a) {
                function d(a) {
                    return function () {
                        return c(this).val() == a.id;
                    };
                }for (var e = this, f = this.$element.find("option"), g = f.map(function () {
                    return e.item(c(this)).id;
                }).get(), h = [], i = 0; i < a.length; i++) {
                    var j = this._normalizeItem(a[i]);if (c.inArray(j.id, g) >= 0) {
                        var k = f.filter(d(j)),
                            l = this.item(k),
                            m = c.extend(!0, {}, j, l),
                            n = this.option(m);k.replaceWith(n);
                    } else {
                        var o = this.option(j);if (j.children) {
                            var p = this.convertToOptions(j.children);b.appendMany(o, p);
                        }h.push(o);
                    }
                }return h;
            }, d;
        }), b.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (a, b, c) {
            function d(a, b) {
                this.ajaxOptions = this._applyDefaults(b.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), d.__super__.constructor.call(this, a, b);
            }return b.Extend(d, a), d.prototype._applyDefaults = function (a) {
                var b = { data: function data(a) {
                        return c.extend({}, a, { q: a.term });
                    }, transport: function transport(a, b, d) {
                        var e = c.ajax(a);return e.then(b), e.fail(d), e;
                    } };return c.extend({}, b, a, !0);
            }, d.prototype.processResults = function (a) {
                return a;
            }, d.prototype.query = function (a, b) {
                function d() {
                    var d = f.transport(f, function (d) {
                        var f = e.processResults(d, a);e.options.get("debug") && window.console && console.error && (f && f.results && c.isArray(f.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), b(f);
                    }, function () {
                        d.status && "0" === d.status || e.trigger("results:message", { message: "errorLoading" });
                    });e._request = d;
                }var e = this;null != this._request && (c.isFunction(this._request.abort) && this._request.abort(), this._request = null);var f = c.extend({ type: "GET" }, this.ajaxOptions);"function" == typeof f.url && (f.url = f.url.call(this.$element, a)), "function" == typeof f.data && (f.data = f.data.call(this.$element, a)), this.ajaxOptions.delay && null != a.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(d, this.ajaxOptions.delay)) : d();
            }, d;
        }), b.define("select2/data/tags", ["jquery"], function (a) {
            function b(b, c, d) {
                var e = d.get("tags"),
                    f = d.get("createTag");void 0 !== f && (this.createTag = f);var g = d.get("insertTag");if (void 0 !== g && (this.insertTag = g), b.call(this, c, d), a.isArray(e)) for (var h = 0; h < e.length; h++) {
                    var i = e[h],
                        j = this._normalizeItem(i),
                        k = this.option(j);this.$element.append(k);
                }
            }return b.prototype.query = function (a, b, c) {
                function d(a, f) {
                    for (var g = a.results, h = 0; h < g.length; h++) {
                        var i = g[h],
                            j = null != i.children && !d({ results: i.children }, !0);if ((i.text || "").toUpperCase() === (b.term || "").toUpperCase() || j) return !f && (a.data = g, void c(a));
                    }if (f) return !0;var k = e.createTag(b);if (null != k) {
                        var l = e.option(k);l.attr("data-select2-tag", !0), e.addOptions([l]), e.insertTag(g, k);
                    }a.results = g, c(a);
                }var e = this;if (this._removeOldTags(), null == b.term || null != b.page) return void a.call(this, b, c);a.call(this, b, d);
            }, b.prototype.createTag = function (b, c) {
                var d = a.trim(c.term);return "" === d ? null : { id: d, text: d };
            }, b.prototype.insertTag = function (a, b, c) {
                b.unshift(c);
            }, b.prototype._removeOldTags = function (b) {
                this._lastTag;this.$element.find("option[data-select2-tag]").each(function () {
                    this.selected || a(this).remove();
                });
            }, b;
        }), b.define("select2/data/tokenizer", ["jquery"], function (a) {
            function b(a, b, c) {
                var d = c.get("tokenizer");void 0 !== d && (this.tokenizer = d), a.call(this, b, c);
            }return b.prototype.bind = function (a, b, c) {
                a.call(this, b, c), this.$search = b.dropdown.$search || b.selection.$search || c.find(".select2-search__field");
            }, b.prototype.query = function (b, c, d) {
                function e(b) {
                    var c = g._normalizeItem(b);if (!g.$element.find("option").filter(function () {
                        return a(this).val() === c.id;
                    }).length) {
                        var d = g.option(c);d.attr("data-select2-tag", !0), g._removeOldTags(), g.addOptions([d]);
                    }f(c);
                }function f(a) {
                    g.trigger("select", { data: a });
                }var g = this;c.term = c.term || "";var h = this.tokenizer(c, this.options, e);h.term !== c.term && (this.$search.length && (this.$search.val(h.term), this.$search.focus()), c.term = h.term), b.call(this, c, d);
            }, b.prototype.tokenizer = function (b, c, d, e) {
                for (var f = d.get("tokenSeparators") || [], g = c.term, h = 0, i = this.createTag || function (a) {
                    return { id: a.term, text: a.term };
                }; h < g.length;) {
                    var j = g[h];if (-1 !== a.inArray(j, f)) {
                        var k = g.substr(0, h),
                            l = a.extend({}, c, { term: k }),
                            m = i(l);null != m ? (e(m), g = g.substr(h + 1) || "", h = 0) : h++;
                    } else h++;
                }return { term: g };
            }, b;
        }), b.define("select2/data/minimumInputLength", [], function () {
            function a(a, b, c) {
                this.minimumInputLength = c.get("minimumInputLength"), a.call(this, b, c);
            }return a.prototype.query = function (a, b, c) {
                if (b.term = b.term || "", b.term.length < this.minimumInputLength) return void this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: b.term, params: b } });a.call(this, b, c);
            }, a;
        }), b.define("select2/data/maximumInputLength", [], function () {
            function a(a, b, c) {
                this.maximumInputLength = c.get("maximumInputLength"), a.call(this, b, c);
            }return a.prototype.query = function (a, b, c) {
                if (b.term = b.term || "", this.maximumInputLength > 0 && b.term.length > this.maximumInputLength) return void this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: b.term, params: b } });a.call(this, b, c);
            }, a;
        }), b.define("select2/data/maximumSelectionLength", [], function () {
            function a(a, b, c) {
                this.maximumSelectionLength = c.get("maximumSelectionLength"), a.call(this, b, c);
            }return a.prototype.query = function (a, b, c) {
                var d = this;this.current(function (e) {
                    var f = null != e ? e.length : 0;if (d.maximumSelectionLength > 0 && f >= d.maximumSelectionLength) return void d.trigger("results:message", { message: "maximumSelected", args: { maximum: d.maximumSelectionLength } });a.call(d, b, c);
                });
            }, a;
        }), b.define("select2/dropdown", ["jquery", "./utils"], function (a, b) {
            function c(a, b) {
                this.$element = a, this.options = b, c.__super__.constructor.call(this);
            }return b.Extend(c, b.Observable), c.prototype.render = function () {
                var b = a('<span class="select2-dropdown"><span class="select2-results"></span></span>');return b.attr("dir", this.options.get("dir")), this.$dropdown = b, b;
            }, c.prototype.bind = function () {}, c.prototype.position = function (a, b) {}, c.prototype.destroy = function () {
                this.$dropdown.remove();
            }, c;
        }), b.define("select2/dropdown/search", ["jquery", "../utils"], function (a, b) {
            function c() {}return c.prototype.render = function (b) {
                var c = b.call(this),
                    d = a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>');return this.$searchContainer = d, this.$search = d.find("input"), c.prepend(d), c;
            }, c.prototype.bind = function (b, c, d) {
                var e = this;b.call(this, c, d), this.$search.on("keydown", function (a) {
                    e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented();
                }), this.$search.on("input", function (b) {
                    a(this).off("keyup");
                }), this.$search.on("keyup input", function (a) {
                    e.handleSearch(a);
                }), c.on("open", function () {
                    e.$search.attr("tabindex", 0), e.$search.focus(), window.setTimeout(function () {
                        e.$search.focus();
                    }, 0);
                }), c.on("close", function () {
                    e.$search.attr("tabindex", -1), e.$search.val("");
                }), c.on("focus", function () {
                    c.isOpen() || e.$search.focus();
                }), c.on("results:all", function (a) {
                    if (null == a.query.term || "" === a.query.term) {
                        e.showSearch(a) ? e.$searchContainer.removeClass("select2-search--hide") : e.$searchContainer.addClass("select2-search--hide");
                    }
                });
            }, c.prototype.handleSearch = function (a) {
                if (!this._keyUpPrevented) {
                    var b = this.$search.val();this.trigger("query", { term: b });
                }this._keyUpPrevented = !1;
            }, c.prototype.showSearch = function (a, b) {
                return !0;
            }, c;
        }), b.define("select2/dropdown/hidePlaceholder", [], function () {
            function a(a, b, c, d) {
                this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c, d);
            }return a.prototype.append = function (a, b) {
                b.results = this.removePlaceholder(b.results), a.call(this, b);
            }, a.prototype.normalizePlaceholder = function (a, b) {
                return "string" == typeof b && (b = { id: "", text: b }), b;
            }, a.prototype.removePlaceholder = function (a, b) {
                for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
                    var e = b[d];this.placeholder.id === e.id && c.splice(d, 1);
                }return c;
            }, a;
        }), b.define("select2/dropdown/infiniteScroll", ["jquery"], function (a) {
            function b(a, b, c, d) {
                this.lastParams = {}, a.call(this, b, c, d), this.$loadingMore = this.createLoadingMore(), this.loading = !1;
            }return b.prototype.append = function (a, b) {
                this.$loadingMore.remove(), this.loading = !1, a.call(this, b), this.showLoadingMore(b) && this.$results.append(this.$loadingMore);
            }, b.prototype.bind = function (b, c, d) {
                var e = this;b.call(this, c, d), c.on("query", function (a) {
                    e.lastParams = a, e.loading = !0;
                }), c.on("query:append", function (a) {
                    e.lastParams = a, e.loading = !0;
                }), this.$results.on("scroll", function () {
                    var b = a.contains(document.documentElement, e.$loadingMore[0]);if (!e.loading && b) {
                        e.$results.offset().top + e.$results.outerHeight(!1) + 50 >= e.$loadingMore.offset().top + e.$loadingMore.outerHeight(!1) && e.loadMore();
                    }
                });
            }, b.prototype.loadMore = function () {
                this.loading = !0;var b = a.extend({}, { page: 1 }, this.lastParams);b.page++, this.trigger("query:append", b);
            }, b.prototype.showLoadingMore = function (a, b) {
                return b.pagination && b.pagination.more;
            }, b.prototype.createLoadingMore = function () {
                var b = a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                    c = this.options.get("translations").get("loadingMore");return b.html(c(this.lastParams)), b;
            }, b;
        }), b.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (a, b) {
            function c(b, c, d) {
                this.$dropdownParent = d.get("dropdownParent") || a(document.body), b.call(this, c, d);
            }return c.prototype.bind = function (a, b, c) {
                var d = this,
                    e = !1;a.call(this, b, c), b.on("open", function () {
                    d._showDropdown(), d._attachPositioningHandler(b), e || (e = !0, b.on("results:all", function () {
                        d._positionDropdown(), d._resizeDropdown();
                    }), b.on("results:append", function () {
                        d._positionDropdown(), d._resizeDropdown();
                    }));
                }), b.on("close", function () {
                    d._hideDropdown(), d._detachPositioningHandler(b);
                }), this.$dropdownContainer.on("mousedown", function (a) {
                    a.stopPropagation();
                });
            }, c.prototype.destroy = function (a) {
                a.call(this), this.$dropdownContainer.remove();
            }, c.prototype.position = function (a, b, c) {
                b.attr("class", c.attr("class")), b.removeClass("select2"), b.addClass("select2-container--open"), b.css({ position: "absolute", top: -999999 }), this.$container = c;
            }, c.prototype.render = function (b) {
                var c = a("<span></span>"),
                    d = b.call(this);return c.append(d), this.$dropdownContainer = c, c;
            }, c.prototype._hideDropdown = function (a) {
                this.$dropdownContainer.detach();
            }, c.prototype._attachPositioningHandler = function (c, d) {
                var e = this,
                    f = "scroll.select2." + d.id,
                    g = "resize.select2." + d.id,
                    h = "orientationchange.select2." + d.id,
                    i = this.$container.parents().filter(b.hasScroll);i.each(function () {
                    a(this).data("select2-scroll-position", { x: a(this).scrollLeft(), y: a(this).scrollTop() });
                }), i.on(f, function (b) {
                    var c = a(this).data("select2-scroll-position");a(this).scrollTop(c.y);
                }), a(window).on(f + " " + g + " " + h, function (a) {
                    e._positionDropdown(), e._resizeDropdown();
                });
            }, c.prototype._detachPositioningHandler = function (c, d) {
                var e = "scroll.select2." + d.id,
                    f = "resize.select2." + d.id,
                    g = "orientationchange.select2." + d.id;this.$container.parents().filter(b.hasScroll).off(e), a(window).off(e + " " + f + " " + g);
            }, c.prototype._positionDropdown = function () {
                var b = a(window),
                    c = this.$dropdown.hasClass("select2-dropdown--above"),
                    d = this.$dropdown.hasClass("select2-dropdown--below"),
                    e = null,
                    f = this.$container.offset();f.bottom = f.top + this.$container.outerHeight(!1);var g = { height: this.$container.outerHeight(!1) };g.top = f.top, g.bottom = f.top + g.height;var h = { height: this.$dropdown.outerHeight(!1) },
                    i = { top: b.scrollTop(), bottom: b.scrollTop() + b.height() },
                    j = i.top < f.top - h.height,
                    k = i.bottom > f.bottom + h.height,
                    l = { left: f.left, top: g.bottom },
                    m = this.$dropdownParent;"static" === m.css("position") && (m = m.offsetParent());var n = m.offset();l.top -= n.top, l.left -= n.left, c || d || (e = "below"), k || !j || c ? !j && k && c && (e = "below") : e = "above", ("above" == e || c && "below" !== e) && (l.top = g.top - n.top - h.height), null != e && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + e), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + e)), this.$dropdownContainer.css(l);
            }, c.prototype._resizeDropdown = function () {
                var a = { width: this.$container.outerWidth(!1) + "px" };this.options.get("dropdownAutoWidth") && (a.minWidth = a.width, a.position = "relative", a.width = "auto"), this.$dropdown.css(a);
            }, c.prototype._showDropdown = function (a) {
                this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown();
            }, c;
        }), b.define("select2/dropdown/minimumResultsForSearch", [], function () {
            function a(b) {
                for (var c = 0, d = 0; d < b.length; d++) {
                    var e = b[d];e.children ? c += a(e.children) : c++;
                }return c;
            }function b(a, b, c, d) {
                this.minimumResultsForSearch = c.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), a.call(this, b, c, d);
            }return b.prototype.showSearch = function (b, c) {
                return !(a(c.data.results) < this.minimumResultsForSearch) && b.call(this, c);
            }, b;
        }), b.define("select2/dropdown/selectOnClose", [], function () {
            function a() {}return a.prototype.bind = function (a, b, c) {
                var d = this;a.call(this, b, c), b.on("close", function (a) {
                    d._handleSelectOnClose(a);
                });
            }, a.prototype._handleSelectOnClose = function (a, b) {
                if (b && null != b.originalSelect2Event) {
                    var c = b.originalSelect2Event;if ("select" === c._type || "unselect" === c._type) return;
                }var d = this.getHighlightedResults();if (!(d.length < 1)) {
                    var e = d.data("data");null != e.element && e.element.selected || null == e.element && e.selected || this.trigger("select", { data: e });
                }
            }, a;
        }), b.define("select2/dropdown/closeOnSelect", [], function () {
            function a() {}return a.prototype.bind = function (a, b, c) {
                var d = this;a.call(this, b, c), b.on("select", function (a) {
                    d._selectTriggered(a);
                }), b.on("unselect", function (a) {
                    d._selectTriggered(a);
                });
            }, a.prototype._selectTriggered = function (a, b) {
                var c = b.originalEvent;c && c.ctrlKey || this.trigger("close", { originalEvent: c, originalSelect2Event: b });
            }, a;
        }), b.define("select2/i18n/en", [], function () {
            return { errorLoading: function errorLoading() {
                    return "The results could not be loaded.";
                }, inputTooLong: function inputTooLong(a) {
                    var b = a.input.length - a.maximum,
                        c = "Please delete " + b + " character";return 1 != b && (c += "s"), c;
                }, inputTooShort: function inputTooShort(a) {
                    return "Please enter " + (a.minimum - a.input.length) + " or more characters";
                }, loadingMore: function loadingMore() {
                    return "Loading more results…";
                }, maximumSelected: function maximumSelected(a) {
                    var b = "You can only select " + a.maximum + " item";return 1 != a.maximum && (b += "s"), b;
                }, noResults: function noResults() {
                    return "No results found";
                }, searching: function searching() {
                    return "Searching…";
                } };
        }), b.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C) {
            function D() {
                this.reset();
            }return D.prototype.apply = function (l) {
                if (l = a.extend(!0, {}, this.defaults, l), null == l.dataAdapter) {
                    if (null != l.ajax ? l.dataAdapter = o : null != l.data ? l.dataAdapter = n : l.dataAdapter = m, l.minimumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, r)), l.maximumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, s)), l.maximumSelectionLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, t)), l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)), null == l.tokenSeparators && null == l.tokenizer || (l.dataAdapter = j.Decorate(l.dataAdapter, q)), null != l.query) {
                        var C = b(l.amdBase + "compat/query");l.dataAdapter = j.Decorate(l.dataAdapter, C);
                    }if (null != l.initSelection) {
                        var D = b(l.amdBase + "compat/initSelection");l.dataAdapter = j.Decorate(l.dataAdapter, D);
                    }
                }if (null == l.resultsAdapter && (l.resultsAdapter = c, null != l.ajax && (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)), null != l.placeholder && (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)), l.selectOnClose && (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))), null == l.dropdownAdapter) {
                    if (l.multiple) l.dropdownAdapter = u;else {
                        var E = j.Decorate(u, v);l.dropdownAdapter = E;
                    }if (0 !== l.minimumResultsForSearch && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)), l.closeOnSelect && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)), null != l.dropdownCssClass || null != l.dropdownCss || null != l.adaptDropdownCssClass) {
                        var F = b(l.amdBase + "compat/dropdownCss");l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F);
                    }l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y);
                }if (null == l.selectionAdapter) {
                    if (l.multiple ? l.selectionAdapter = e : l.selectionAdapter = d, null != l.placeholder && (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)), l.allowClear && (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)), l.multiple && (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)), null != l.containerCssClass || null != l.containerCss || null != l.adaptContainerCssClass) {
                        var G = b(l.amdBase + "compat/containerCss");l.selectionAdapter = j.Decorate(l.selectionAdapter, G);
                    }l.selectionAdapter = j.Decorate(l.selectionAdapter, i);
                }if ("string" == typeof l.language) if (l.language.indexOf("-") > 0) {
                    var H = l.language.split("-"),
                        I = H[0];l.language = [l.language, I];
                } else l.language = [l.language];if (a.isArray(l.language)) {
                    var J = new k();l.language.push("en");for (var K = l.language, L = 0; L < K.length; L++) {
                        var M = K[L],
                            N = {};try {
                            N = k.loadPath(M);
                        } catch (a) {
                            try {
                                M = this.defaults.amdLanguageBase + M, N = k.loadPath(M);
                            } catch (a) {
                                l.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.');continue;
                            }
                        }J.extend(N);
                    }l.translations = J;
                } else {
                    var O = k.loadPath(this.defaults.amdLanguageBase + "en"),
                        P = new k(l.language);P.extend(O), l.translations = P;
                }return l;
            }, D.prototype.reset = function () {
                function b(a) {
                    function b(a) {
                        return l[a] || a;
                    }return a.replace(/[^\u0000-\u007E]/g, b);
                }function c(d, e) {
                    if ("" === a.trim(d.term)) return e;if (e.children && e.children.length > 0) {
                        for (var f = a.extend(!0, {}, e), g = e.children.length - 1; g >= 0; g--) {
                            null == c(d, e.children[g]) && f.children.splice(g, 1);
                        }return f.children.length > 0 ? f : c(d, f);
                    }var h = b(e.text).toUpperCase(),
                        i = b(d.term).toUpperCase();return h.indexOf(i) > -1 ? e : null;
                }this.defaults = { amdBase: "./", amdLanguageBase: "./i18n/", closeOnSelect: !0, debug: !1, dropdownAutoWidth: !1, escapeMarkup: j.escapeMarkup, language: C, matcher: c, minimumInputLength: 0, maximumInputLength: 0, maximumSelectionLength: 0, minimumResultsForSearch: 0, selectOnClose: !1, sorter: function sorter(a) {
                        return a;
                    }, templateResult: function templateResult(a) {
                        return a.text;
                    }, templateSelection: function templateSelection(a) {
                        return a.text;
                    }, theme: "default", width: "resolve" };
            }, D.prototype.set = function (b, c) {
                var d = a.camelCase(b),
                    e = {};e[d] = c;var f = j._convertData(e);a.extend(this.defaults, f);
            }, new D();
        }), b.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (a, b, c, d) {
            function e(b, e) {
                if (this.options = b, null != e && this.fromElement(e), this.options = c.apply(this.options), e && e.is("input")) {
                    var f = a(this.get("amdBase") + "compat/inputData");this.options.dataAdapter = d.Decorate(this.options.dataAdapter, f);
                }
            }return e.prototype.fromElement = function (a) {
                var c = ["select2"];null == this.options.multiple && (this.options.multiple = a.prop("multiple")), null == this.options.disabled && (this.options.disabled = a.prop("disabled")), null == this.options.language && (a.prop("lang") ? this.options.language = a.prop("lang").toLowerCase() : a.closest("[lang]").prop("lang") && (this.options.language = a.closest("[lang]").prop("lang"))), null == this.options.dir && (a.prop("dir") ? this.options.dir = a.prop("dir") : a.closest("[dir]").prop("dir") ? this.options.dir = a.closest("[dir]").prop("dir") : this.options.dir = "ltr"), a.prop("disabled", this.options.disabled), a.prop("multiple", this.options.multiple), a.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), a.data("data", a.data("select2Tags")), a.data("tags", !0)), a.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), a.attr("ajax--url", a.data("ajaxUrl")), a.data("ajax--url", a.data("ajaxUrl")));var e = {};e = b.fn.jquery && "1." == b.fn.jquery.substr(0, 2) && a[0].dataset ? b.extend(!0, {}, a[0].dataset, a.data()) : a.data();var f = b.extend(!0, {}, e);f = d._convertData(f);for (var g in f) {
                    b.inArray(g, c) > -1 || (b.isPlainObject(this.options[g]) ? b.extend(this.options[g], f[g]) : this.options[g] = f[g]);
                }return this;
            }, e.prototype.get = function (a) {
                return this.options[a];
            }, e.prototype.set = function (a, b) {
                this.options[a] = b;
            }, e;
        }), b.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (a, b, c, d) {
            var e = function e(a, c) {
                null != a.data("select2") && a.data("select2").destroy(), this.$element = a, this.id = this._generateId(a), c = c || {}, this.options = new b(c, a), e.__super__.constructor.call(this);var d = a.attr("tabindex") || 0;a.data("old-tabindex", d), a.attr("tabindex", "-1");var f = this.options.get("dataAdapter");this.dataAdapter = new f(a, this.options);var g = this.render();this._placeContainer(g);var h = this.options.get("selectionAdapter");this.selection = new h(a, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, g);var i = this.options.get("dropdownAdapter");this.dropdown = new i(a, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, g);var j = this.options.get("resultsAdapter");this.results = new j(a, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);var k = this;this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function (a) {
                    k.trigger("selection:update", { data: a });
                }), a.addClass("select2-hidden-accessible"), a.attr("aria-hidden", "true"), this._syncAttributes(), a.data("select2", this);
            };return c.Extend(e, c.Observable), e.prototype._generateId = function (a) {
                var b = "";return b = null != a.attr("id") ? a.attr("id") : null != a.attr("name") ? a.attr("name") + "-" + c.generateChars(2) : c.generateChars(4), b = b.replace(/(:|\.|\[|\]|,)/g, ""), b = "select2-" + b;
            }, e.prototype._placeContainer = function (a) {
                a.insertAfter(this.$element);var b = this._resolveWidth(this.$element, this.options.get("width"));null != b && a.css("width", b);
            }, e.prototype._resolveWidth = function (a, b) {
                var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if ("resolve" == b) {
                    var d = this._resolveWidth(a, "style");return null != d ? d : this._resolveWidth(a, "element");
                }if ("element" == b) {
                    var e = a.outerWidth(!1);return e <= 0 ? "auto" : e + "px";
                }if ("style" == b) {
                    var f = a.attr("style");if ("string" != typeof f) return null;for (var g = f.split(";"), h = 0, i = g.length; h < i; h += 1) {
                        var j = g[h].replace(/\s/g, ""),
                            k = j.match(c);if (null !== k && k.length >= 1) return k[1];
                    }return null;
                }return b;
            }, e.prototype._bindAdapters = function () {
                this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container);
            }, e.prototype._registerDomEvents = function () {
                var b = this;this.$element.on("change.select2", function () {
                    b.dataAdapter.current(function (a) {
                        b.trigger("selection:update", { data: a });
                    });
                }), this.$element.on("focus.select2", function (a) {
                    b.trigger("focus", a);
                }), this._syncA = c.bind(this._syncAttributes, this), this._syncS = c.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;null != d ? (this._observer = new d(function (c) {
                    a.each(c, b._syncA), a.each(c, b._syncS);
                }), this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", b._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", b._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", b._syncS, !1));
            }, e.prototype._registerDataEvents = function () {
                var a = this;this.dataAdapter.on("*", function (b, c) {
                    a.trigger(b, c);
                });
            }, e.prototype._registerSelectionEvents = function () {
                var b = this,
                    c = ["toggle", "focus"];this.selection.on("toggle", function () {
                    b.toggleDropdown();
                }), this.selection.on("focus", function (a) {
                    b.focus(a);
                }), this.selection.on("*", function (d, e) {
                    -1 === a.inArray(d, c) && b.trigger(d, e);
                });
            }, e.prototype._registerDropdownEvents = function () {
                var a = this;this.dropdown.on("*", function (b, c) {
                    a.trigger(b, c);
                });
            }, e.prototype._registerResultsEvents = function () {
                var a = this;this.results.on("*", function (b, c) {
                    a.trigger(b, c);
                });
            }, e.prototype._registerEvents = function () {
                var a = this;this.on("open", function () {
                    a.$container.addClass("select2-container--open");
                }), this.on("close", function () {
                    a.$container.removeClass("select2-container--open");
                }), this.on("enable", function () {
                    a.$container.removeClass("select2-container--disabled");
                }), this.on("disable", function () {
                    a.$container.addClass("select2-container--disabled");
                }), this.on("blur", function () {
                    a.$container.removeClass("select2-container--focus");
                }), this.on("query", function (b) {
                    a.isOpen() || a.trigger("open", {}), this.dataAdapter.query(b, function (c) {
                        a.trigger("results:all", { data: c, query: b });
                    });
                }), this.on("query:append", function (b) {
                    this.dataAdapter.query(b, function (c) {
                        a.trigger("results:append", { data: c, query: b });
                    });
                }), this.on("keypress", function (b) {
                    var c = b.which;a.isOpen() ? c === d.ESC || c === d.TAB || c === d.UP && b.altKey ? (a.close(), b.preventDefault()) : c === d.ENTER ? (a.trigger("results:select", {}), b.preventDefault()) : c === d.SPACE && b.ctrlKey ? (a.trigger("results:toggle", {}), b.preventDefault()) : c === d.UP ? (a.trigger("results:previous", {}), b.preventDefault()) : c === d.DOWN && (a.trigger("results:next", {}), b.preventDefault()) : (c === d.ENTER || c === d.SPACE || c === d.DOWN && b.altKey) && (a.open(), b.preventDefault());
                });
            }, e.prototype._syncAttributes = function () {
                this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {});
            }, e.prototype._syncSubtree = function (a, b) {
                var c = !1,
                    d = this;if (!a || !a.target || "OPTION" === a.target.nodeName || "OPTGROUP" === a.target.nodeName) {
                    if (b) {
                        if (b.addedNodes && b.addedNodes.length > 0) for (var e = 0; e < b.addedNodes.length; e++) {
                            var f = b.addedNodes[e];f.selected && (c = !0);
                        } else b.removedNodes && b.removedNodes.length > 0 && (c = !0);
                    } else c = !0;c && this.dataAdapter.current(function (a) {
                        d.trigger("selection:update", { data: a });
                    });
                }
            }, e.prototype.trigger = function (a, b) {
                var c = e.__super__.trigger,
                    d = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting" };if (void 0 === b && (b = {}), a in d) {
                    var f = d[a],
                        g = { prevented: !1, name: a, args: b };if (c.call(this, f, g), g.prevented) return void (b.prevented = !0);
                }c.call(this, a, b);
            }, e.prototype.toggleDropdown = function () {
                this.options.get("disabled") || (this.isOpen() ? this.close() : this.open());
            }, e.prototype.open = function () {
                this.isOpen() || this.trigger("query", {});
            }, e.prototype.close = function () {
                this.isOpen() && this.trigger("close", {});
            }, e.prototype.isOpen = function () {
                return this.$container.hasClass("select2-container--open");
            }, e.prototype.hasFocus = function () {
                return this.$container.hasClass("select2-container--focus");
            }, e.prototype.focus = function (a) {
                this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}));
            }, e.prototype.enable = function (a) {
                this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), null != a && 0 !== a.length || (a = [!0]);var b = !a[0];this.$element.prop("disabled", b);
            }, e.prototype.data = function () {
                this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var a = [];return this.dataAdapter.current(function (b) {
                    a = b;
                }), a;
            }, e.prototype.val = function (b) {
                if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == b || 0 === b.length) return this.$element.val();var c = b[0];a.isArray(c) && (c = a.map(c, function (a) {
                    return a.toString();
                })), this.$element.val(c).trigger("change");
            }, e.prototype.destroy = function () {
                this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null;
            }, e.prototype.render = function () {
                var b = a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return b.attr("dir", this.options.get("dir")), this.$container = b, this.$container.addClass("select2-container--" + this.options.get("theme")), b.data("element", this.$element), b;
            }, e;
        }), b.define("select2/compat/utils", ["jquery"], function (a) {
            function b(b, c, d) {
                var e,
                    f,
                    g = [];e = a.trim(b.attr("class")), e && (e = "" + e, a(e.split(/\s+/)).each(function () {
                    0 === this.indexOf("select2-") && g.push(this);
                })), e = a.trim(c.attr("class")), e && (e = "" + e, a(e.split(/\s+/)).each(function () {
                    0 !== this.indexOf("select2-") && null != (f = d(this)) && g.push(f);
                })), b.attr("class", g.join(" "));
            }return { syncCssClasses: b };
        }), b.define("select2/compat/containerCss", ["jquery", "./utils"], function (a, b) {
            function c(a) {
                return null;
            }function d() {}return d.prototype.render = function (d) {
                var e = d.call(this),
                    f = this.options.get("containerCssClass") || "";a.isFunction(f) && (f = f(this.$element));var g = this.options.get("adaptContainerCssClass");if (g = g || c, -1 !== f.indexOf(":all:")) {
                    f = f.replace(":all:", "");var h = g;g = function g(a) {
                        var b = h(a);return null != b ? b + " " + a : a;
                    };
                }var i = this.options.get("containerCss") || {};return a.isFunction(i) && (i = i(this.$element)), b.syncCssClasses(e, this.$element, g), e.css(i), e.addClass(f), e;
            }, d;
        }), b.define("select2/compat/dropdownCss", ["jquery", "./utils"], function (a, b) {
            function c(a) {
                return null;
            }function d() {}return d.prototype.render = function (d) {
                var e = d.call(this),
                    f = this.options.get("dropdownCssClass") || "";a.isFunction(f) && (f = f(this.$element));var g = this.options.get("adaptDropdownCssClass");if (g = g || c, -1 !== f.indexOf(":all:")) {
                    f = f.replace(":all:", "");var h = g;g = function g(a) {
                        var b = h(a);return null != b ? b + " " + a : a;
                    };
                }var i = this.options.get("dropdownCss") || {};return a.isFunction(i) && (i = i(this.$element)), b.syncCssClasses(e, this.$element, g), e.css(i), e.addClass(f), e;
            }, d;
        }), b.define("select2/compat/initSelection", ["jquery"], function (a) {
            function b(a, b, c) {
                c.get("debug") && window.console && console.warn && console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"), this.initSelection = c.get("initSelection"), this._isInitialized = !1, a.call(this, b, c);
            }return b.prototype.current = function (b, c) {
                var d = this;if (this._isInitialized) return void b.call(this, c);this.initSelection.call(null, this.$element, function (b) {
                    d._isInitialized = !0, a.isArray(b) || (b = [b]), c(b);
                });
            }, b;
        }), b.define("select2/compat/inputData", ["jquery"], function (a) {
            function b(a, b, c) {
                this._currentData = [], this._valueSeparator = c.get("valueSeparator") || ",", "hidden" === b.prop("type") && c.get("debug") && console && console.warn && console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."), a.call(this, b, c);
            }return b.prototype.current = function (b, c) {
                function d(b, c) {
                    var e = [];return b.selected || -1 !== a.inArray(b.id, c) ? (b.selected = !0, e.push(b)) : b.selected = !1, b.children && e.push.apply(e, d(b.children, c)), e;
                }for (var e = [], f = 0; f < this._currentData.length; f++) {
                    var g = this._currentData[f];e.push.apply(e, d(g, this.$element.val().split(this._valueSeparator)));
                }c(e);
            }, b.prototype.select = function (b, c) {
                if (this.options.get("multiple")) {
                    var d = this.$element.val();d += this._valueSeparator + c.id, this.$element.val(d), this.$element.trigger("change");
                } else this.current(function (b) {
                    a.map(b, function (a) {
                        a.selected = !1;
                    });
                }), this.$element.val(c.id), this.$element.trigger("change");
            }, b.prototype.unselect = function (a, b) {
                var c = this;b.selected = !1, this.current(function (a) {
                    for (var d = [], e = 0; e < a.length; e++) {
                        var f = a[e];b.id != f.id && d.push(f.id);
                    }c.$element.val(d.join(c._valueSeparator)), c.$element.trigger("change");
                });
            }, b.prototype.query = function (a, b, c) {
                for (var d = [], e = 0; e < this._currentData.length; e++) {
                    var f = this._currentData[e],
                        g = this.matches(b, f);null !== g && d.push(g);
                }c({ results: d });
            }, b.prototype.addOptions = function (b, c) {
                var d = a.map(c, function (b) {
                    return a.data(b[0], "data");
                });this._currentData.push.apply(this._currentData, d);
            }, b;
        }), b.define("select2/compat/matcher", ["jquery"], function (a) {
            function b(b) {
                function c(c, d) {
                    var e = a.extend(!0, {}, d);if (null == c.term || "" === a.trim(c.term)) return e;if (d.children) {
                        for (var f = d.children.length - 1; f >= 0; f--) {
                            var g = d.children[f];b(c.term, g.text, g) || e.children.splice(f, 1);
                        }if (e.children.length > 0) return e;
                    }return b(c.term, d.text, d) ? e : null;
                }return c;
            }return b;
        }), b.define("select2/compat/query", [], function () {
            function a(a, b, c) {
                c.get("debug") && window.console && console.warn && console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."), a.call(this, b, c);
            }return a.prototype.query = function (a, b, c) {
                b.callback = c, this.options.get("query").call(null, b);
            }, a;
        }), b.define("select2/dropdown/attachContainer", [], function () {
            function a(a, b, c) {
                a.call(this, b, c);
            }return a.prototype.position = function (a, b, c) {
                c.find(".dropdown-wrapper").append(b), b.addClass("select2-dropdown--below"), c.addClass("select2-container--below");
            }, a;
        }), b.define("select2/dropdown/stopPropagation", [], function () {
            function a() {}return a.prototype.bind = function (a, b, c) {
                a.call(this, b, c);var d = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];this.$dropdown.on(d.join(" "), function (a) {
                    a.stopPropagation();
                });
            }, a;
        }), b.define("select2/selection/stopPropagation", [], function () {
            function a() {}return a.prototype.bind = function (a, b, c) {
                a.call(this, b, c);var d = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];this.$selection.on(d.join(" "), function (a) {
                    a.stopPropagation();
                });
            }, a;
        }), function (c) {
            "function" == typeof b.define && b.define.amd ? b.define("jquery-mousewheel", ["jquery"], c) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = c : c(a);
        }(function (a) {
            function b(b) {
                var g = b || window.event,
                    h = i.call(arguments, 1),
                    j = 0,
                    l = 0,
                    m = 0,
                    n = 0,
                    o = 0,
                    p = 0;if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
                    if (1 === g.deltaMode) {
                        var q = a.data(this, "mousewheel-line-height");j *= q, m *= q, l *= q;
                    } else if (2 === g.deltaMode) {
                        var r = a.data(this, "mousewheel-page-height");j *= r, m *= r, l *= r;
                    }if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || n < f) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                        var s = this.getBoundingClientRect();o = b.clientX - s.left, p = b.clientY - s.top;
                    }return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h);
                }
            }function c() {
                f = null;
            }function d(a, b) {
                return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 == 0;
            }var e,
                f,
                g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                i = Array.prototype.slice;if (a.event.fixHooks) for (var j = g.length; j;) {
                a.event.fixHooks[g[--j]] = a.event.mouseHooks;
            }var k = a.event.special.mousewheel = { version: "3.1.12", setup: function setup() {
                    if (this.addEventListener) for (var c = h.length; c;) {
                        this.addEventListener(h[--c], b, !1);
                    } else this.onmousewheel = b;a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this));
                }, teardown: function teardown() {
                    if (this.removeEventListener) for (var c = h.length; c;) {
                        this.removeEventListener(h[--c], b, !1);
                    } else this.onmousewheel = null;a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height");
                }, getLineHeight: function getLineHeight(b) {
                    var c = a(b),
                        d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16;
                }, getPageHeight: function getPageHeight(b) {
                    return a(b).height();
                }, settings: { adjustOldDeltas: !0, normalizeOffset: !0 } };a.fn.extend({ mousewheel: function mousewheel(a) {
                    return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
                }, unmousewheel: function unmousewheel(a) {
                    return this.unbind("mousewheel", a);
                } });
        }), b.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function (a, b, c, d) {
            if (null == a.fn.select2) {
                var e = ["open", "close", "destroy"];a.fn.select2 = function (b) {
                    if ("object" == _typeof(b = b || {})) return this.each(function () {
                        var d = a.extend(!0, {}, b);new c(a(this), d);
                    }), this;if ("string" == typeof b) {
                        var d,
                            f = Array.prototype.slice.call(arguments, 1);return this.each(function () {
                            var c = a(this).data("select2");null == c && window.console && console.error && console.error("The select2('" + b + "') method was called on an element that is not using Select2."), d = c[b].apply(c, f);
                        }), a.inArray(b, e) > -1 ? this : d;
                    }throw new Error("Invalid arguments for Select2: " + b);
                };
            }return null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c;
        }), { define: b.define, require: b.require };
    }(),
        c = b.require("jquery.select2");return a.fn.select2.amd = b, c;
});
/**
 * Set square
 * @returns {undefined}
 */
$.fn.square = function (func) {
    function _resize(instance) {
        $(instance).each(function () {
            $(this).height($(this).width());
        });

        if (func != undefined) {
            func(this);
        }
    }

    var ins = this;
    $(window).resize(function () {
        _resize(ins);
    });

    _resize(this);
};
(function ($) {
    /**
     * Instance method
     * @param el
     * @param options
     * @returns KeepRatio
     */
    function KeepRatio(el, options) {
        var defaultOptions = {
            ratio: [4, 3],
            delay: 100,
            resizer: null
        };
        this.el = $(el);
        this.el.data('KeepRatio', this);
        this.options = $.extend({}, defaultOptions, options);
        this.parseOptions();
        this.init();
    }
    $.extend(KeepRatio.prototype, {
        /**
         * Parse options for correct usage
         * @returns void
         */
        parseOptions: function parseOptions() {
            // parse ratio
            if (typeof this.options.ratio === 'string') {
                this.options.ratio = this.options.ratio.split(/[\:\/\-]/);
            }
            // parse delay
            this.options.delay = parseInt(this.options.delay);
            if (isNaN(this.options.delay) || this.options.delay <= 0) {
                this.options.delay = 100;
            }
        },
        /**
         * Set or get value of an option
         * @param string name
         * @param mixed value
         * @returns mixed
         */
        option: function option(name, value) {
            if (value) {
                this.options[name] = value;
                this.parseOptions();
            }
            return this.options[name];
        },
        /**
         * Resize the element
         * @returns void
         */
        resize: function resize() {
            var w = this.el.width(),
                h;
            h = w * this.options.ratio[1] / this.options.ratio[0];
            this.el.css('height', h + 'px');
        },
        /**
         * Init the window resize event
         * @returns void
         */
        init: function init() {
            var _timer,
                t = this,
                el = this.el;
            $(window).on('resize.keepratio', function () {
                clearTimeout(_timer);
                _timer = setTimeout(function () {
                    if (typeof t.options.resizer === 'function') {
                        t.options.resizer.call(el, t, t.options.ratio);
                    } else {
                        t.resize();
                    }
                }, t.options.delay);
            }).trigger('resize.keepratio');
        },
        /**
         * Get this object instance
         * @returns KeepRatio
         */
        getInstance: function getInstance() {
            return this;
        },
        destroy: function destroy() {
            // off resize
            $(window).off('resize.keepratio');
            // remove instance from dataset
            this.el.data('KeepRatio', null);
        }
    });
    $.fn.keepRatio = function (opts) {
        // call method
        // eg: $('.keep-ratio').keepRatio('getInstance')
        if (typeof opts === 'string') {
            var instance = $(this).data('KeepRatio');
            if (instance && typeof KeepRatio.prototype[opts] === 'function') {
                var args = Array.prototype.slice.call(arguments, 1);
                return instance[opts].apply(instance, args);
            }
            throw 'Method not allowed or inexisted';
        } else {
            // instantiate
            return this.each(function () {
                var instance = new KeepRatio(this, opts);
                console.log(instance);
            });
        }
    };
})(jQuery);

/**
 * Event: Remove error message
 * Event auto remove error and message when input to error field 
 */
var Events = {
    /**
     * Init events method
     * @param array arrs
     * @returns void
     */
    init: function init(arrs) {
        for (var index in arrs) {
            Events[arrs[index]]();
        }
    },

    /**
     * Reset validate when change value on input bootstrap
     * @returns void
     */
    resetValidate: function resetValidate() {
        $(document).on('change paste keyup', '.form-control', function () {
            $(this).closest('.has-error').removeClass('has-error').find('help-block').text('');
            $(this).closest('.has-success').removeClass('has-success').find('help-block').text('');
        });
    },

    /**
     * Disabled submit
     * @returns void
     */
    disableSubmit: function disableSubmit() {
        $(document).on('submit', 'form[data-disabled="true"]', function () {
            $(this).find('[type="submit"]').prop('disabled', true);

            var id = $(this).attr('id');

            if (id) {
                $('[data-disabled-from="' + id + '"]').prop('disabled', true);
                $('[data-disabled-from="' + id + '"]').addClass('link-disabled', true);
            }
        });
    },

    /**
     * Disabled submit
     * @returns void
     */
    disableClick: function disableClick() {
        $(document).on('click', '[data-click-disabled="true"]', function () {
            $(this).prop('disabled', true);
        });
    },

    /**
     * Disabled Link Click
     * @returns void
     */
    disableLinkClick: function disableLinkClick() {
        $(document).on('click', 'a[data-click-disabled="true"]', function () {
            $(this).addClass('link-disabled', true);
        });
    }
};

// Register event
//Events.init(["resetValidate"]);
var App = {
    /**
     * Get info
     * @param string name name of attribute
     * @param string path this string will be concat at first when val is not empty
     * @returns string
     */
    getInfo: function getInfo(name, path) {
        var val = $('meta[name="support"]').attr(name);

        if (path != undefined && val != "") {
            val = path + val;
        }

        return val;
    },

    /**
     * Get url
     * 
     * @param string path
     * @returns string
     */
    getUrl: function getUrl(path) {
        var baseUrl = $('meta[name="support"]').attr('data-url');

        if (path != undefined) {
            if (path.charAt(0) == "/") {
                baseUrl = baseUrl + path;
            }
            // Concat string with "/"
            else {
                    baseUrl = baseUrl + "/" + path;
                }
        }

        return baseUrl;
    },

    /**
     * Get token method
     */
    getToken: function getToken() {
        return $('meta[name="csrf-token"]').attr('content');
    },

    /**
     * Get new csrf token
     * @param function success the method will be call when generate success
     * @returns mixed
     */
    getNewCsrfToken: function getNewCsrfToken(_success) {
        $.ajax({
            url: ROOT_URL + 'common/get-csrf-token',
            data: {},
            success: function success(response) {
                $('meta[name="csrf-token"]').attr('content', response);

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': APP.getToken()
                    }
                });
                if (_success != undefined) {
                    _success();
                }
            }
        });
    },

    /**
     * redirectErrorPage
     * @param {type} code
     * @param {type} message
     * @returns {undefined}
     */
    errorPage: function errorPage(code, message) {
        var form = document.createElement('form');
        $(form).attr({ 'method': 'POST', 'action': this.getUrl('/errors') });
        $(form).append('<input type="hidden" name="code" value="' + code + '"/>');
        $(form).append('<input type="hidden" name="message" value="' + message + '"/>');
        $(form).append('<input type="hidden" name="_token" value="' + this.getToken() + '"/>');
        $('body').append(form);
        $(form).submit();
    }
};

// add loading when call ajax
$(document).ajaxStart(function () {
    $("#loading").show();
});
$(document).ajaxSuccess(function () {
    $("#loading").hide();
});
$(document).ajaxError(function () {
    $("#loading").hide();
});
/**
 * RUN FOR ALL PAGE
 */
$(document).ready(function () {

    // Auto set token to header of ajax post
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': App.getToken()
        }
    });

    // Layout register event
    Events.init(['disableSubmit', 'disableClick', 'disableLinkClick']);

    /**
     * On click go top arrow
     */
    $('a[href*="#"]:not([href="#"]):not([role="tab"])').click(function () {
        var target;
        if (document.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && document.location.hostname === this.hostname) {
            target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    // Check display scroll button
    function displayScrollButton() {
        var scroll = $(window).scrollTop();
        if (scroll > 10) {
            $('a#go-top').fadeIn(200);
        }
    }

    /**
     * Check Scroll Gotop
     */
    $(window).scroll(function (event) {
        $('a#go-top').fadeOut(200);
    });

    // extension:
    $.fn.scrollEnd = function (callback, timeout) {
        $(this).scroll(function () {
            var $this = $(this);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }

            $this.data('scrollTimeout', setTimeout(callback, timeout));
        });
    };

    // how to call it (with a 1000ms timeout):
    $(window).scrollEnd(displayScrollButton, 600);

    displayScrollButton();

    // Custom Select2
    $(".custom-select select").select2({
        theme: "bootstrap",
        width: '100%',
        minimumResultsForSearch: Infinity,
        allowClear: true
    });

    var ps;
    $(".custom-select select, .custom-select-table:not(.multiple-select) .table-select").on("select2:open", function (e) {
        if (ps) ps.destroy();
        var ps;
        setTimeout(function () {
            ps = new PerfectScrollbar('.select2-container .select2-results > .select2-results__options', {
                // wheelSpeed: 0.1,
                minScrollbarLength: 90
            });
        }, 5);
    }).on("select2:close", function (e) {
        if (ps) ps.destroy();
        ps = null;
    });

    // Table Dropdown Select
    $("table.table-dropdown td .item select.table-select:not([multiple])").select2({
        dropdownCssClass: "select2-table-select",
        minimumResultsForSearch: Infinity,
        width: '100%',
        placeholder: $(this).data('placeholder'),
        allowClear: true
    });

    $(document).on('click', '.table-btn-add', function () {
        var $parentSelectTable = $(this).parent().find('.custom-select-table'),
            $btnSelectTable = $(this).parent().find('.custom-select-table .table-select');
        if ($btnSelectTable.attr("multiple") !== 'multiple') {
            $btnSelectTable.select2('destroy');
            $btnSelectTable.attr("multiple", "multiple");

            var optionHeight = 0;
            $parentSelectTable.addClass('multiple-select');
            $.each($btnSelectTable.find('option'), function () {
                var optionAttr = $(this).attr('value');
                if (typeof optionAttr === 'undefined' || optionAttr === null || optionAttr === '') {
                    $(this).remove();
                } else {
                    optionHeight += $(this).outerHeight() === 36 ? $(this).outerHeight() : 16;
                }
            });

            $btnSelectTable.height(optionHeight);
            psmulti = new PerfectScrollbar($parentSelectTable[0], {
                wheelSpeed: 0.5,
                minScrollbarLength: 90
            });
        }
    });

    //Handle redirect link API
    $('a.ss-link').on('click', function (e) {
        var pathRedirect = $(this).data('path-redirect');
        e.preventDefault();
        $.ajax({
            type: 'GET',
            data: { 'path-redirect': pathRedirect },
            url: '/page/api/call-redirect-url',
            success: function success(data) {
                //             window.location.href = data;
                window.open(data, '_blank');
            },
            error: function error(e) {
                window.location.reload();
            }
        });
    });
});
var MSG = {
    MSG_LOGOUT: "ログアウトしました。",
    ZIPCODE_REQUIRED: '郵便番号を入力してください。',
    ZIPCODE_MAX_LENGH: '郵便番号は7文字で入力してください。'
};