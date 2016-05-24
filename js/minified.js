function Event() {}
function MouseEvent() {}
function KeyboardEvent() {}
function TouchEvent() {}
function MutationEvent() {}
function MessageEvent() {}
function MediaEvent() {}
Event.RESIZE = "resize";
Event.LOAD = "load";
Event.SCROLL = "scroll";
Event.SELECT = "select";
Event.SUBMIT = "submit";
Event.HASHCHANGE = "hashchange";
Event.BLUR = "blur";
Event.CHANGE = "change";
Event.ABORT = "abort";
Event.UNLOAD = "unload";
Event.BEFOREUNLOAD = "beforeunload";
Event.LOAD = "load";
Event.ERROR = "error";
Event.CONTEXTMENU = "contextmenu";
Event.COPY = "copy";
Event.PASTE = "paste";
Event.READY_STATE_CHANGE = "readystatechange";
Event.RESET = "reset";
MouseEvent.CLICK = "click";
MouseEvent.MOUSE_DOWN = "mousedown";
MouseEvent.MOUSE_MOVE = "mousemove";
MouseEvent.MOUSE_UP = "mouseup";
MouseEvent.RIGHT_CLICK = "rightclick";
MouseEvent.MOUSE_OVER = "mouseover";
MouseEvent.MOUSE_OUT = "mouseout";
MouseEvent.DOUBLE_CLICK = "dblclick";
MouseEvent.FOCUS = "focus";
MouseEvent.MOUSE_ENTER = "mouseenter";
MouseEvent.MOUSE_LEAVE = "mouseleave";
MouseEvent.ROLL_OVER = "mouseenter";
MouseEvent.ROLL_OUT = "mouseleave";
MouseEvent.DRAG_END = "dragend";
MouseEvent.DRAG_ENTER = "dragenter";
MouseEvent.DRAG_LEAVE = "dragleave";
MouseEvent.DRAG_OVER = "dragover";
MouseEvent.DRAG_START = "dragstart";
MouseEvent.DROP = "drop";
MouseEvent.MOUSE_WHEEL = "mousewheel";
KeyboardEvent.KEY_DOWN = "keydown";
KeyboardEvent.KEY_UP = "keyup";
KeyboardEvent.KEY_PRESS = "keypress";
TouchEvent.TOUCH_START = "touchstart";
TouchEvent.TOUCH_MOVE = "touchmove";
TouchEvent.TOUCH_END = "touchend";
TouchEvent.TOUCH_CANCEL = "touchcancel";
if (!0 == BrowserDetect.TABLET || !0 == BrowserDetect.MOBILE) MouseEvent.MOUSE_DOWN = TouchEvent.TOUCH_START;
MessageEvent.MESSAGE = "message";
MediaEvent.TIME_UPDATE = "timeupdate";
function Key() {}
Key.SPACEBAR = 32;
Key.BACKSPACE = 8;
Key.TAB = 9;
Key.ENTER = 13;
Key.SHIFT = 16;
Key.CTRL = 17;
Key.ALT = 18;
Key.PAUSE = 19;
Key.CAPSLOCK = 20;
Key.ESCAPE = 27;
Key.PAGEUP = 33;
Key.PAGEDOWN = 34;
Key.END = 35;
Key.HOME = 36;
Key.LEFT = 37;
Key.UP = 38;
Key.RIGHT = 39;
Key.DOWN = 40;
Key.INSERT = 45;
Key.DELETE = 46;
Key.QUESTIONMARK = 191;
Key.PASTE = 91;
Key.GO_BACK = 87;
Key.PREV_ITEM = 65;
Key.NEXT_ITEM = 68;
Key.GO_BACK_ALT = 73;
Key.PREV_ITEM_ALT = 74;
Key.NEXT_ITEM_ALT = 76;
function Trace(b, c) {
    if (Trace.isEnabled) {
        var d = b;
        if (null != c) {
            var f = "";
            try {
                f = "Function" == typeof c ? c.name.toString() + "();": c.toString()
            } catch(h) {
                try {
                    f = c.toString()
                } catch(g) {
                    f = "null"
                }
            }
            d = f + " => " + d
        }
        Trace.displayOnScreen ? (Trace._onScreenDiv || (Trace._onScreenDiv = document.createElement("div"), Trace._onScreenDiv.style.position = "absolute", Trace._onScreenDiv.style.width = "200px", Trace._onScreenDiv.style.height = "300px", Trace._onScreenDiv.style.overflowY = "scroll", Trace._onScreenDiv.style.color = "#00ff00", Trace._onScreenDiv.style.padding = "10px", Trace._onScreenDiv.style.zIndex = 2E7, Trace._onScreenDiv.style.left = "20px", Trace._onScreenDiv.style.top = "20px", Trace._onScreenDiv.style.fontFamily = "Courier New", Trace._onScreenDiv.style.fontSize = "10px", Trace._onScreenDiv.style.backgroundColor = "#000000", Trace._fieldLines = []), Trace._fieldLines.push(d), Trace._fieldLines.length > Trace.onScreenMaxLines && Trace._fieldLines.shift(), Trace._onScreenDiv.innerHTML = Trace._fieldLines.join("<br />"), document.body.appendChild(Trace._onScreenDiv)) : !0 === trace._consoleAvailable && console.log(d);
        Trace._traceArray.push(d)
    }
}
Trace.checkConsole = function() {
    var b = !1;
    "undefined" !== typeof console && (b = !0);
    return b
};
var trace = Trace;
Trace.isEnabled = !0;
Trace.displayOnScreen = !1;
Trace.onScreenMaxLines = 50;
Trace._onScreenDiv = null;
Trace._fieldLines = null;
Trace._traceArray = [];
Trace._consoleAvailable = Trace.checkConsole();
var GoogleAnalytics = {
    trackPage: function(b) {
        null === b && (b = location.pathname + location.search + location.hash);
        _gaq.push(["_trackPageview", b])
    },
    trackEvent: function(b, c, d, f, h) {
        null === h && (h = !1);
        _gaq.push(["_trackEvent", b, c, d, f, h])
    },
    trackSocialEvent: function(b, c, d, f) {
        _gaq.push(["_trackSocial", b, c, d, f])
    }
};
ArrayManipulation = {
    unique: function(b, c) {
        null == c && (c = !0);
        for (var d = 0,
        f = b.length,
        h, g = [], d = 0; d < f; d += 1) h = b[d],
        -1 == g.indexOf(h) && (!c || "" != h) && g.push(h);
        return g
    }
};
ScreenScroll = {
    UPDATE: "update",
    START: "start",
    END: "end",
    _initiated: !1
};
ScreenScroll._coverLayer;
ScreenScroll._totalMove = 0;
ScreenScroll._currMoveX = 0;
ScreenScroll._currMoveY = 0;
ScreenScroll._startDispatched = !1;
ScreenScroll.init = function() {
    function b(b) {
        if (Assets.SCREEN_SCROLL_ENABLED) {
            ScreenScroll._startDispatched = !1;
            ScreenScroll._totalMove = 0;
            if (!0 == BrowserDetect.MOBILE || !0 == BrowserDetect.TABLET) b = b.targetTouches[0];
            f = b.pageX;
            h = b.pageY;
            ScreenScroll._currMoveX = f;
            ScreenScroll._currMoveY = h;
            BrowserDetect.MOBILE || BrowserDetect.TABLET ? (document.addEventListener(TouchEvent.TOUCH_END, d), document.addEventListener(TouchEvent.TOUCH_MOVE, c)) : (document.addEventListener(MouseEvent.MOUSE_UP, d), document.addEventListener(MouseEvent.MOUSE_MOVE, c))
        }
    }
    function c(b) {
        var e, c; ! 0 == BrowserDetect.MOBILE || !0 == BrowserDetect.TABLET ? (c = b.targetTouches[0], e = c.pageX, c = c.pageY) : (e = b.pageX, c = b.pageY);
        var d = e - f,
        q = c - h;
        ScreenScroll._totalMove += Math.abs(d) + Math.abs(q);
        3 < ScreenScroll._totalMove && (ScreenScroll._coverLayer.parentNode || (ScreenScroll._coverLayer.style.width = window.innerWidth + "px", ScreenScroll._coverLayer.style.height = window.innerHeight + "px", Assets.LAYER_TOP.appendChild(ScreenScroll._coverLayer)), ScreenScroll._startDispatched || (ScreenScroll._startDispatched = !0, CustomEvents.triggerEvent(ScreenScroll.START, null, ScreenScroll)), CustomEvents.triggerEvent(ScreenScroll.UPDATE, {
            deltaX: d,
            deltaY: q,
            moveX: e - ScreenScroll._currMoveX,
            moveY: c - ScreenScroll._currMoveY
        },
        ScreenScroll));
        f = e;
        h = c;
        b.preventDefault();
        return ! 1
    }
    function d() {
        ScreenScroll._coverLayer.parentNode && Assets.LAYER_TOP.removeChild(ScreenScroll._coverLayer); ! 1 == BrowserDetect.MOBILE && !1 == BrowserDetect.TABLET ? (document.removeEventListener(MouseEvent.MOUSE_UP, d), document.removeEventListener(MouseEvent.MOUSE_MOVE, c)) : (document.removeEventListener(TouchEvent.TOUCH_END, d), document.removeEventListener(TouchEvent.TOUCH_MOVE, c));
        CustomEvents.triggerEvent(ScreenScroll.END, null, ScreenScroll)
    }
    if (!ScreenScroll._initiated) {
        ScreenScroll._initiated = !0;
        ScreenScroll._coverLayer = document.createElement("div");
        ScreenScroll._coverLayer.style.backgroundColor = "#ff0000";
        TweenLite.to(ScreenScroll._coverLayer, 0, {
            css: {
                opacity: 0
            },
            overwrite: !0
        });
        var f = 0,
        h = 0;
        BrowserDetect.MOBILE || BrowserDetect.TABLET ? (document.addEventListener(TouchEvent.TOUCH_START, b), trace("MOBILE")) : (document.addEventListener(MouseEvent.MOUSE_DOWN, b), trace("NOT MOBILE"))
    }
};
ScreenScroll.addEvent = function(b, c) {
    ScreenScroll.init();
    CustomEvents.addEvent(b, c, ScreenScroll)
};
ScreenScroll.removeEvent = function(b, c) {
    CustomEvents.removeEvent(b, c)
};
CustomEvents = {
    _eventCategories: [],
    addEvent: function(b, c, d) {
        d || (d = "all");
        CustomEvents.getCategory(b).list.push({
            target: d,
            callback: c
        })
    },
    removeEvent: function(b, c) {
        for (var d = CustomEvents.getCategory(b).list, f = d.length, h; 0 < f; f += 1) if (h = d[0], h.callback === c) {
            d.splice(0, 1);
            break
        }
    },
    triggerEvent: function(b, c, d) {
        var b = CustomEvents.getCategory(b).list,
        f,
        h = b.length,
        g;
        for (f = 0; f < h; f += 1) g = b[f],
        g.target === d && g.callback(c)
    },
    getCategory: function(b) {
        var c, d = CustomEvents._eventCategories.length,
        f, h;
        for (c = 0; c < d; c += 1) if (f = CustomEvents._eventCategories[c], f.type === b) {
            h = f;
            break
        }
        h || (h = {
            type: b,
            list: []
        },
        CustomEvents._eventCategories.push(h));
        return h
    }
};
function AssetLoader() {}
AssetLoader.init = function(b) {
    AssetLoader.assets = [];
    AssetLoader.que = [];
    AssetLoader.busy = !1;
    AssetLoader.assetPath = b
};
AssetLoader.loadGroup = function(b) {
    function c() {
        function b(e) {
            e.currentTarget.removeEventListener(Event.LOAD, h);
            m++;
            h()
        }
        function f(b) {
            trace("AssetLoader: Error: Cant load : " + b.currentTarget.src);
            m++;
            h()
        }
        function h() {
            _percentageLoaded = 100 * (m / q);
            _percentageLoaded = Math.ceil(_percentageLoaded);
            null != onUpdate && onUpdate(_percentageLoaded);
            m == q && (callback(), AssetLoader.que.shift(), 0 < AssetLoader.que.length ? setTimeout(c, 100) : AssetLoader.busy = !1)
        }
        data = AssetLoader.que[0].data;
        callback = AssetLoader.que[0].callback;
        onUpdate = AssetLoader.que[0].onUpdate;
        var g = 0,
        e = data.length,
        m = 0,
        i = [],
        q = 0,
        k;
        for (g; g < e; g++) {
            var n = k,
            v = !1,
            o = 0,
            x = AssetLoader.assets.length;
            for (o; o < x; o++) if (n === AssetLoader.assets[o].id) {
                v = !0;
                break
            }
            v || (i.push(data[g]), q++)
        }
        if (0 < i.length) {
            e = 0;
            n = i.length;
            for (e; e < n; e++) g = new Image,
            k = i[e],
            AssetLoader.assets.push({
                asset: g,
                id: k
            }),
            g.addEventListener(Event.LOAD, b, !0),
            g.addEventListener(Event.ERROR, f, !0),
            g.style.position = "absolute",
            g.src = AssetLoader.assetPath + i[e]
        } else h()
    }
    AssetLoader.busy ? AssetLoader.que.push(b) : (AssetLoader.busy = !0, AssetLoader.que.push(b), c())
};
AssetLoader.getAsset = function(b) {
    var c = !1,
    d = 0,
    f = AssetLoader.assets.length,
    h = null,
    g;
    for (d; d < f; d++) if (g = AssetLoader.assets[d], b === g.id) {
        c = !0;
        h = g.asset.cloneNode(!0);
        h.width = g.asset.width;
        h.height = g.asset.height;
        h.style.position = "absolute";
        break
    } ! 0 !== c && trace("AssetLoader: Error: Asset with id >> " + b + ", not found");
    return h
};
function AssetGroup(b, c, d) {
    var f = {};
    f.data = b;
    f.callback = c;
    f.onUpdate = d;
    return f
}
var Share = {
    twitter: function(b) {
        window.open("https://twitter.com/intent/tweet?source=webclient&text=" + b, "_blank", "width=575, height=400")
    },
    facebook: function(b) {
        window.open("https://www.facebook.com/sharer/sharer.php?u=" + b, "_blank", "width=640, height=470")
    }
},
ContentManager = {
    AUTOMATICALLY_TRACK_GOOGLE_ANALYTICS: !0,
    SHOW_TRACES: !0,
    _activeTemplates: [],
    _templateRegister: [],
    _templateGroups: [],
    _newPath: "",
    _blocked: !1,
    _defaultPath: "home",
    _xml: null,
    _prevTemplateObj: null,
    _passedVariables: null,
    init: function(b, c) {
        ContentManager.trace("init();");
        ContentManager._xml = b;
        c && (ContentManager._defaultPath = c, ContentManager.trace(ContentManager._defaultPath, "_defaultPath"));
        window.addEventListener(Event.HASHCHANGE, ContentManager.onHashChange);
        "Explorer" == BrowserDetect.BROWSER_NAME && 7 >= BrowserDetect.BROWSER_VERSION && ContentManager.autoCheck();
        ContentManager.onHashChange()
    },
    path: function(b) {
        "object" == typeof b && (b = ContentManager.composeFullPathFromXML(b));
        ContentManager.trace("path();");
        ContentManager.trace(b, "newPath");
        window.location.hash = "/" + b
    },
    nextTemplate: function(b) {
        ContentManager.trace("nextTemplate();");
        ContentManager._passedVariables = b;
        ContentManager._blocked = !1;
        ContentManager.onHashChange()
    },
    addTemplate: function(b, c) {
        ContentManager._templateRegister.push({
            templateName: b,
            JSClass: c
        })
    },
    addTransitionGroup: function(b, c) {
        ContentManager._templateGroups.push({
            name: b,
            group: c
        })
    },
    getTransitionGroup: function(b, c) {
        for (var d = null,
        f = ContentManager._templateGroups.length,
        h = null,
        g = null,
        e = null,
        d = 0; d < f; d += 1) if (h = ContentManager._templateGroups[d], g = h.group, -1 != g.indexOf(b) && -1 != g.indexOf(c)) {
            e = h.name;
            break
        }
        return e
    },
    composeFullPathFromXML: function(b) {
        var c = b.getAttribute("data-path"),
        d = [];
        c && d.unshift(c);
        for (var b = b.parentNode,
        f = 0; c && !((c = b.getAttribute("data-path")) && d.unshift(c), b = b.parentNode, f += 1, 10 < f););
        return d.join("/")
    },
    getTransitionIndex: function(b) {
        var c = b.getAttribute("data-path"),
        d = 0,
        f = 0;
        c && (d = DOMUtils.getChildIndex(b), -1 != d && (f += d));
        for (var b = b.parentNode,
        h = 0; c;) {
            if (c = b.getAttribute("data-path")) d = DOMUtils.getChildIndex(b),
            -1 != d && (f += d);
            b = b.parentNode;
            h += 1;
            if (10 < h) break
        }
        return f
    },
    isContentSupported: function(b) {
        var b = ContentManager.findContent(ContentManager.extractPath(b).split("/")),
        c = !1;
        b && (templateName = b.getAttribute("data-template")) && ContentManager.findTemplateFromName(templateName) && (c = !0);
        return c
    },
    onHashChange: function() {
        ContentManager.trace("-----------------------------");
        if (!1 == ContentManager._blocked) {
            ContentManager._newPath = ContentManager.extractPath(window.location.hash);
            var b = ContentManager._newPath.split("/"),
            c,
            d = [],
            f,
            h,
            g;
            "" == b[0] && (b[0] = ContentManager._defaultPath);
            for (ContentManager.trace(b, "pathArr"); 0 < b.length;) {
                if (c = ContentManager.findContent(b)) if (f = c.getAttribute("data-template")) h = ContentManager.findTemplateLevelFromName(f),
                !1 === h && (h = b.length - 1),
                g = c.getAttribute("data-path"),
                ContentManager.trace("new candidate"),
                ContentManager.trace(g, "templatePath"),
                ContentManager.trace(f, "templateName"),
                ContentManager.trace(h, "templateLevel"),
                d.push({
                    xml: c,
                    path: g,
                    templateName: f,
                    level: h
                });
                b.pop()
            }
            d = d.sortOn("level");
            c = 0;
            f = d.length;
            var e;
            h = "none";
            b = ContentManager._activeTemplates;
            ContentManager.trace(d.length, "candidates.length");
            for (c = 0; c < f; c += 1) {
                e = d[c];
                g = e.level;
                if (null == b[g]) h = "push";
                else if (b[g].getTemplatePath() != e.path || -1 == b[g].getTemplateFullPath().indexOf(ContentManager.composeFullPathFromXML(e.xml))) h = "pop";
                if ("none" != h) break
            }
            "none" == h && d.length < b.length && e && (h = "pop");
            ContentManager.trace(h, "type");
            "none" != h && ((ContentManager._blocked = !0, "pop" == h) ? (d = b.pop(), trace(d, "templateData"), ContentManager._passedVariables && (d.setPassedVariables(ContentManager._passedVariables), ContentManager._passedVariables = null), b = new TemplateData, b.setTemplateName(e.templateName), b.setLevel(e.level), b.setTemplatePath(e.path), d.setNextTemplateData(b), ContentManager._prevTemplateObj = d, d.getTemplate().templateOut()) : "push" == h && ((ContentManager.trace("push candidate"), ContentManager.trace(e.path, "candidate.path"), ContentManager.trace(e.templateName, "candidate.templateName"), ContentManager.trace(e.level, "candidate.level"), c = ContentManager.findTemplateFromName(e.templateName)) ? (d = new TemplateData, d.setXML(e.xml), d.setLevel(e.level), d.setTemplatePath(e.path), d.setTemplateName(e.templateName), f = ContentManager.composeFullPathFromXML(e.xml), d.setTemplateFullPath(f), ContentManager._prevTemplateObj && (d.setPrevTemplateData(ContentManager._prevTemplateObj), ContentManager._prevTemplateObj = null), ContentManager._passedVariables && (d.setPassedVariables(ContentManager._passedVariables), ContentManager._passedVariables = null), c = new c(d), d.setTemplate(c), null !== typeof _gaq && !0 === ContentManager.AUTOMATICALLY_TRACK_GOOGLE_ANALYTICS && (e = "#/" + ContentManager.composeFullPathFromXML(e.xml), _gaq.push(["_trackPageview", e])), ContentManager._prevTemplateObj = d, b.push(d), c.templateIn()) : (ContentManager._blocked = !1, trace("ContentManger.js unable to find template"))))
        }
    },
    findContent: function(b) {
        for (var c = ContentManager.cloneArray(b), d = c[0], f = ContentManager._xml, h = "", g, e, m, i = !1, q, k = 0, n = 0; d;) {
            q = f.children;
            m = q.length;
            for (e = 0; e < m; e += 1) if (g = q[e], h = g.getAttribute("data-path"), h == d) {
                c.shift();
                d = c[0];
                f = g;
                i = !0;
                n += 1;
                break
            }
            if (!i || !d || 10 < k) d = null;
            k += 1
        }
        n != b.length && (f = null);
        return f
    },
    extractPath: function(b) {
        var b = b.split("#"),
        b = b[b.length - 1].split("/"),
        c = [],
        d = b.length,
        f,
        h;
        for (f = 0; f < d; f += 1) h = b[f],
        null !== h && "" !== h && c.push(h);
        return c.join("/")
    },
    findTemplateFromName: function(b) {
        var c, d = ContentManager._templateRegister,
        f = d.length,
        h, g;
        for (c = 0; c < f; c += 1) if (h = d[c], h.templateName == b) {
            g = h.JSClass;
            break
        }
        return g
    },
    findTemplateLevelFromName: function(b) {
        var c = !1; (b = b.match(/\d+/)) && (c = b);
        return c
    },
    autoCheck: function() {
        function b() {
            var f = window.location.hash;
            f != c && (c = f, ContentManager.onHashChange());
            setTimeout(b, 1E3 * d)
        }
        ContentManager.trace("autoCheck();");
        var c = window.location.hash,
        d = 0.2;
        setTimeout(b, 1E3 * d)
    },
    cloneArray: function(b) {
        var c, d = b.length,
        f = [];
        for (c = 0; c < d; c += 1) f.push(b[c]);
        return f
    },
    trace: function(b, c) {
        ContentManager.SHOW_TRACES && (c || (c = ""), trace(b, "ContentManager.js " + c))
    }
};
function TemplateData() {
    var b = {},
    c, d, f, h, g, e, m, i, q;
    b.getXML = function() {
        return c
    };
    b.getLevel = function() {
        return d
    };
    b.getPassedVariablesByName = function(b) {
        var e = "undefined";
        f && (b = f[b]) && (e = b);
        return e
    };
    b.getNextTemplateData = function() {
        return i
    };
    b.getPrevTemplateData = function() {
        return q
    };
    b.getTemplate = function() {
        return h
    };
    b.getTemplateName = function() {
        return g
    };
    b.getTemplatePath = function() {
        return e
    };
    b.getTemplateFullPath = function() {
        return m
    };
    b.setXML = function(b) {
        c = b
    };
    b.setLevel = function(b) {
        d = b
    };
    b.setPassedVariables = function(b) {
        f = b
    };
    b.setNextTemplateData = function(b) {
        i = b
    };
    b.setPrevTemplateData = function(b) {
        q = b
    };
    b.setTemplate = function(b) {
        h = b
    };
    b.setTemplateName = function(b) {
        g = b
    };
    b.setTemplatePath = function(b) {
        e = b
    };
    b.setTemplateFullPath = function(b) {
        m = b
    };
    return b
}
var FixIE = {
    DEBUG_MODE: !1,
    init: function() {
        if ("Explorer" == BrowserDetect.BROWSER_NAME && 8 >= BrowserDetect.BROWSER_VERSION) {
            var b = function(b) {
                window.attachEvent && (b.addEventListener = function(c, d) {
                    b.attachEvent("on" + c,
                    function(e) {
                        var c = window.event || e,
                        h = {};
                        h.currentTarget = b;
                        h.target = e.srcElement;
                        h.type = e.type;
                        h.cancelable = e.cancelBubble;
                        h.preventDefault = e.returnValue;
                        h.pageX = e.clientX;
                        h.pageY = e.clientY;
                        h.offsetX = e.offsetX;
                        h.offsetY = e.offsetY;
                        h.altKey = e.altKey;
                        h.ctrlKey = e.ctrlKey;
                        h.shiftKey = e.shiftKey;
                        h.keyCode = e.keyCode;
                        h.stopPropagation = function() {
                            c.cancelBubble = !0
                        };
                        h.preventDefault = function() {
                            c.returnValue = !1
                        };
                        d(h)
                    })
                },
                b.removeEventListener = function(c, d) {
                    b.detachEvent("on" + c, d)
                },
                b.dispatchEvent = function(c) {
                    b.fireEvent("on" + c.type, c)
                })
            },
            c = function(c) {
                "undefined" !== typeof c ? !0 != c.____hasBeenIEFixed && (b(c), c.____hasBeenIEFixed = !0) : "undefined" !== typeof Trace && Trace("FixIE: ** Error **: Element does not exist.")
            };
            Image = function() {
                return document.createElement("img")
            };
            document.createEvent = function() {
                var b = document.createEventObject(window.event);
                b.initEvent = function(b, c, e) {
                    this.type = b;
                    this.cancelBubble = c;
                    this.returnValue = e
                };
                return b
            };
            document._createElement = document.createElement;
            document.createElement = function(b) {
                b = document._createElement(b);
                c(b);
                return b
            };
            document._getElementById = document.getElementById;
            document.getElementById = function(b) {
                b = document._getElementById(b);
                c(b);
                return b
            };
            document._getElementsByTagName = document.getElementsByTagName;
            document.getElementsByTagName = function(b) {
                for (var b = document._getElementsByTagName(b), d = 0; d < b.length; d++) c(b[d]);
                return b
            };
            document._getElementsByClassName = document.getElementsByClassName;
            document.getElementsByClassName = function(b) {
                for (var b = b.split(" "), d = this.querySelectorAll("." + b[0]), g = 1; g < b.length; g++) {
                    for (var e = this.querySelectorAll("." + b[g]), m = [], i = 0; i < d.length; i++) {
                        for (var q = !1,
                        k = 0; k < e.length; k++) if (d[i] == e[k]) {
                            q = !0;
                            break
                        }
                        q && (c(d[i]), m.push(d[i]))
                    }
                    d = m
                }
                return d
            };
            var d = function() {
                window.innerWidth = document.documentElement.clientWidth;
                window.innerHeight = document.documentElement.clientHeight
            };
            b(document);
            b(window);
            window.attachEvent("onresize", d);
            d();
            document.head = document.getElementsByTagName("head")[0]
        }
    },
    imageCheckForPNGFix: function(b) {
        var c = !1;
        if (null != b.currentTarget) {
            b.currentTarget.removeEventListener(Event.LOAD, FixIE.imageCheckForPNGFix);
            var d = b.currentTarget.src;
            ".png" === d.substr(d.length - 4).toLowerCase() && (c = !0); ! 0 == c && (c = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='crop',src='" + d + "')", b.currentTarget.style.background = "transparent", b.currentTarget.___isAlphaPNG = !0, b.currentTarget.___alphaPNGFilter = " " + c, b.currentTarget.style.MsFilter = c, b.currentTarget.style.filter = c, b.currentTarget.style.zoom = 1)
        }
    }
};
"bind" in Function.prototype || (Function.prototype.bind = function(b) {
    var c = this;
    if (1 >= arguments.length) return function() {
        return c.apply(b, arguments)
    };
    var d = Array.prototype.slice.call(arguments, 1);
    return function() {
        return c.apply(b, 0 === arguments.length ? d: d.concat(Array.prototype.slice.call(arguments)))
    }
});
"trim" in String.prototype || (String.prototype.trim = function() {
    return this.replace(/^\s+/, "").replace(/\s+$/, "")
});
"indexOf" in Array.prototype || (Array.prototype.indexOf = function(b, c) {
    c === void 0 && (c = 0);
    c < 0 && (c = c + this.length);
    c < 0 && (c = 0);
    for (var d = this.length; c < d; c++) if (c in this && this[c] === b) return c;
    return - 1
});
"lastIndexOf" in Array.prototype || (Array.prototype.lastIndexOf = function(b, c) {
    c === void 0 && (c = this.length - 1);
    c < 0 && (c = c + this.length);
    c > this.length - 1 && (c = this.length - 1);
    for (c++; c-->0;) if (c in this && this[c] === b) return c;
    return - 1
});
"forEach" in Array.prototype || (Array.prototype.forEach = function(b, c) {
    for (var d = 0,
    f = this.length; d < f; d++) d in this && b.call(c, this[d], d, this)
});
"map" in Array.prototype || (Array.prototype.map = function(b, c) {
    for (var d = Array(this.length), f = 0, h = this.length; f < h; f++) f in this && (d[f] = b.call(c, this[f], f, this));
    return d
});
"filter" in Array.prototype || (Array.prototype.filter = function(b, c) {
    for (var d = [], f, h = 0, g = this.length; h < g; h++) h in this && b.call(c, f = this[h], h, this) && d.push(f);
    return d
});
"every" in Array.prototype || (Array.prototype.every = function(b, c) {
    for (var d = 0,
    f = this.length; d < f; d++) if (d in this && !b.call(c, this[d], d, this)) return false;
    return true
});
"some" in Array.prototype || (Array.prototype.some = function(b, c) {
    for (var d = 0,
    f = this.length; d < f; d++) if (d in this && b.call(c, this[d], d, this)) return true;
    return false
});
FixIE.init();
FixIE.passThrough = function(b) {
    var c = b.target,
    d = c.style.display;
    c.style.display = "none";
    var f = document.elementFromPoint(b.pageX, b.pageY),
    b = b.type;
    if (c.parentItemWas == f && f != c) {
        var b = "mouseover",
        h = document.createEvent("MouseEvents");
        h.initEvent(b, true, false);
        f.dispatchEvent(h)
    } else if (c.parentItemWas != null) {
        b = "mouseout";
        h = document.createEvent("MouseEvents");
        h.initEvent(b, true, false);
        c.parentItemWas.dispatchEvent(h)
    }
    c.style.display = d;
    c.parentItemWas = f;
    c.parentItemWasWas = c.parentItemWas
};
FixIE.passThroughClick = function(b) {
    var c = b.target,
    d = c.style.display;
    c.style.display = "none";
    var f = document.elementFromPoint(b.pageX, b.pageY);
    if (c.parentItemWas != null) {
        var h = document.createEvent("MouseEvents");
        h.initEvent(b.type, true, false);
        c.parentItemWas.dispatchEvent(h);
        trace("Dispatching : " + b.type)
    }
    c.style.display = d;
    c.parentItemWas = f
};
FixIE.pointerEventsNone = function(b) {
    if (BrowserDetect.BROWSER_NAME == "Explorer" && BrowserDetect.BROWSER_VERSION <= 8) {
        b.addEventListener(MouseEvent.MOUSE_MOVE, FixIE.passThrough);
        b.addEventListener(MouseEvent.CLICK, FixIE.passThroughClick);
        b.addEventListener(MouseEvent.MOUSE_DOWN, FixIE.passThroughClick)
    } else b.style.pointerEvents = "none"
};
FixIE.degreesToRadians = function(b) {
    return b * Math.PI / 180
};
FixIE.fixBoundaryBug = function(b, c) {
    var d = b.style.filter;
    b.style.filter = "";
    var f = b.offsetWidth,
    h = b.offsetHeight;
    b.style.filter = d;
    var g = c.x(Matrix.create([[0], [0], [1]])),
    e = c.x(Matrix.create([[0], [h], [1]])),
    d = c.x(Matrix.create([[f], [0], [1]])),
    f = c.x(Matrix.create([[f], [h], [1]])),
    h = {
        x: parseFloat(parseFloat(g.e(1, 1)).toFixed(8)),
        y: parseFloat(parseFloat(g.e(2, 1)).toFixed(8))
    },
    e = {
        x: parseFloat(parseFloat(e.e(1, 1)).toFixed(8)),
        y: parseFloat(parseFloat(e.e(2, 1)).toFixed(8))
    },
    d = {
        x: parseFloat(parseFloat(d.e(1, 1)).toFixed(8)),
        y: parseFloat(parseFloat(d.e(2, 1)).toFixed(8))
    },
    f = {
        x: parseFloat(parseFloat(f.e(1, 1)).toFixed(8)),
        y: parseFloat(parseFloat(f.e(2, 1)).toFixed(8))
    },
    d = {
        tl: h,
        bl: e,
        tr: d,
        br: f
    },
    f = e = 0,
    m;
    for (m in d) {
        h = d[m];
        if (h.y < e) e = h.y;
        if (h.x < f) f = h.x
    }
    b.___compensateY = b.___storeTempY + e;
    b.___compensateX = b.___storeTempX + f
};
FixIE.transformOrigin = function(b, c) {
    var d = b.style.filter;
    b.style.filter = "";
    var f = b.offsetWidth,
    h = b.offsetHeight;
    b.style.filter = d;
    var g = d = 0.5;
    if (b.registrationPointPercentX != null) {
        d = b.registrationPointPercentX / 100;
        g = b.registrationPointPercentY / 100
    }
    toOrigin = {
        x: f * d,
        y: h * g
    };
    fromOrigin = {
        x: 0,
        y: 0
    };
    f = c.x(Matrix.create([[toOrigin.x], [toOrigin.y], [1]]));
    h = c.x(Matrix.create([[fromOrigin.x], [fromOrigin.y], [1]]));
    b.___storeTempY = parseFloat(parseFloat(h.e(2, 1) - fromOrigin.y - (f.e(2, 1) - toOrigin.y)).toFixed(8));
    b.___storeTempX = parseFloat(parseFloat(h.e(1, 1) - fromOrigin.x - (f.e(1, 1) - toOrigin.x)).toFixed(8))
};
function Matrix() {}
Matrix.prototype = {
    e: function(b, c) {
        return b < 1 || b > this.elements.length || c < 1 || c > this.elements[0].length ? null: this.elements[b - 1][c - 1]
    },
    multiply: function(b) {
        var c = b.modulus ? true: false,
        b = b.elements || b;
        if (typeof b[0][0] == "undefined") b = Matrix.create(b).elements;
        var d = this.elements.length,
        f = d,
        h, g, e = b[0].length,
        m,
        i = this.elements[0].length,
        q = [],
        k,
        n,
        v;
        do {
            h = f - d;
            q[h] = [];
            g = e;
            do {
                m = e - g;
                k = 0;
                n = i;
                do {
                    v = i - n;
                    k = k + this.elements[h][v] * b[v][m]
                } while (-- n );
                q[h][m] = k
            } while (-- g )
        } while (-- d );
        b = Matrix.create(q);
        return c ? b.col(1) : b
    },
    x: function(b) {
        return this.multiply(b)
    },
    setElements: function(b) {
        var c = b.elements || b;
        if (typeof c[0][0] != "undefined") {
            var d = c.length,
            f = d,
            h, g, e;
            this.elements = [];
            do {
                b = f - d;
                g = h = c[b].length;
                this.elements[b] = [];
                do {
                    e = g - h;
                    this.elements[b][e] = c[b][e]
                } while (-- h )
            } while (-- d );
            return this
        }
        f = d = c.length;
        this.elements = [];
        do {
            b = f - d;
            this.elements.push([c[b]])
        } while (-- d );
        return this
    }
};
Matrix.create = function(b) {
    return (new Matrix).setElements(b)
};
Matrix.Rotation = function(b, c) {
    if (!c) return Matrix.create([[Math.cos(b), -Math.sin(b)], [Math.sin(b), Math.cos(b)]]);
    var d = c.dup();
    if (d.elements.length != 3) return null;
    var f = d.modulus(),
    h = d.elements[0] / f,
    g = d.elements[1] / f,
    d = d.elements[2] / f,
    f = Math.sin(b),
    e = Math.cos(b),
    m = 1 - e;
    return Matrix.create([[m * h * h + e, m * h * g - f * d, m * h * d + f * g], [m * h * g + f * d, m * g * g + e, m * g * d - f * h], [m * h * d - f * g, m * g * d + f * h, m * d * d + e]])
};
var Transform = {
    extend: function(b, c, d) {
        if (BrowserDetect.BROWSER_NAME == "Explorer") BrowserDetect.BROWSER_VERSION >= 8 ? Object.defineProperty(b, c, {
            get: function() {
                return c
            },
            set: function(b) {
                c = b;
                d(b)
            }
        }) : b._setter.push(c);
        else {
            b.__defineGetter__(c,
            function() {
                return c
            });
            b.__defineSetter__(c,
            function(b) {
                c = b;
                d(b)
            })
        }
    }
};
function SmartObject(b) {
    if (b == null) {
        b = document.createElement("div");
        b.style.position = "absolute";
        b.style.left = "0px";
        b.style.top = "0px"
    } else b.style.position = "absolute";
    return SmartObject.convert(b)
}
SmartObject.convert = function(b) {
    function c() {
        if (b.___timeoutRunning == false && b.___firstRun == false) {
            b.___timeoutRunning = false;
            d()
        }
    }
    function d() {
        if (b.___firstRun == false) {
            var c = false;
            if (BrowserDetect.BROWSER_NAME == "Explorer" && BrowserDetect.BROWSER_VERSION <= 8 && b.parentNode == null) {
                var d = document.createElement("div");
                d.appendChild(b);
                document.body.appendChild(d);
                c = true
            }
            var g = b.scaleX,
            e = b.scaleY,
            m = b.rotation,
            i = b.opacity,
            q = "translate(" + b.x + "px, " + b.y + "px)";
            m != 0 && (q = q + (" rotate(" + m + "deg)"));
            if (g != 1 || e != 1) q = q + (" scale(" + g + ", " + e + ")");
            g = b.registrationPointPercentX + "% " + b.registrationPointPercentY + "%";
            e = false;
            BrowserDetect.BROWSER_NAME == "Explorer" && BrowserDetect.BROWSER_VERSION <= 8 && (e = true);
            if (e == false) {
                b.style.opacity = i;
                b.style.msTransformOrigin = b.style.MozTransformOrigin = b.style.WebkitTransformOrigin = b.style.OTransformOrigin = b.style.transformOrigin = g;
                b.style.msTransform = b.style.MozTransform = b.style.WebkitTransform = b.style.OTransform = b.style.transform = q
            } else {
                i = null;
                q = "";
                b.opacity != 1 && (q = " progid:DXImageTransform.Microsoft.Alpha(opacity=" + Math.round(b.opacity * 100) + ")");
                g = "";
                if (b.rotation != 0 || b.scaleX != 1 || b.scaleY != 1) var i = Matrix.Rotation(FixIE.degreesToRadians(m)),
                m = i.e(1, 1) * b.scaleX,
                g = i.e(1, 2) * b.scaleY,
                e = i.e(2, 1) * b.scaleX,
                k = i.e(2, 2) * b.scaleY,
                i = Matrix.create([[m, g, 0], [e, k, 0], [0, 0, 1]]),
                g = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', " + ("M11=" + m + ", M12=" + g + ", M21=" + e + ", M22=" + k) + ", filterType='nearest neighbor')";
                m = g + q + "";
                if (b.style.background == null) b.style.background = "transparent";
                b.style.MsFilter = m;
                b.style.filter = m;
                b.style.zoom = "1";
                if (g != "") {
                    FixIE.transformOrigin(b, i);
                    FixIE.fixBoundaryBug(b, i)
                }
                b.style.left = b.x + b.___compensateX + "px";
                b.style.top = b.y + b.___compensateY + "px";
                if (c == true) {
                    document.body.removeChild(d);
                    delete d
                }
            }
        }
    }
    b._setter = [];
    b.___origX = 0;
    b.___origY = 0;
    b.___compensateX = 0;
    b.___compensateY = 0;
    b.___parentCompensationX = 0;
    b.___parentCompensationY = 0;
    b.___timeoutRunning = false;
    b.___firstRun = true;
    b.registrationPointPercentX = 50;
    b.registrationPointPercentY = 50;
    BrowserDetect.BROWSER_NAME == "Explorer" && BrowserDetect.BROWSER_VERSION <= 7 && b.attachEvent("onpropertychange", c);
    b.getWidth = function() {
        var c = 0;
        if (b.parentNode == null) {
            document.body.appendChild(b);
            c = b.offsetWidth;
            document.body.removeChild(b)
        } else if (b.offsetWidth == 0) {
            var d = b.parentNode;
            document.body.appendChild(b);
            c = b.offsetWidth;
            d.appendChild(b)
        } else c = b.offsetWidth;
        return c + 1
    };
    b.getHeight = function() {
        var c = 0;
        if (b.parentNode == null) {
            document.body.appendChild(b);
            c = b.offsetHeight;
            document.body.removeChild(b)
        } else if (b.offsetWidth == 0) {
            var d = b.parentNode;
            document.body.appendChild(b);
            c = b.offsetHeight;
            trace("returnWidth : " + c);
            d.appendChild(b)
        } else c = b.offsetHeight;
        return c + 1
    };
    b.x = 0;
    Transform.extend(b, "x",
    function() {
        c()
    });
    this.x = 0;
    b.y = 0;
    Transform.extend(b, "y",
    function() {
        c()
    });
    this.y = 0;
    b.scaleX = 1;
    b.scaleY = 1;
    Transform.extend(b, "scaleY",
    function() {
        c()
    });
    this.scaleY = 1;
    b.scaleX = 1;
    Transform.extend(b, "scaleX",
    function() {
        c()
    });
    this.scaleX = 1;
    b.opacity = 1;
    Transform.extend(b, "opacity",
    function() {
        c()
    });
    Transform.extend(b, "alpha", this.setOpacity);
    this.opacity = 1;
    b.rotation = 0;
    Transform.extend(b, "rotation",
    function() {
        c()
    });
    this.rotation = 0;
    b.rotationX = 0;
    Transform.extend(b, "rotationX",
    function() {
        c()
    });
    this.rotationX = 0;
    b.rotationY = 0;
    Transform.extend(b, "rotationY",
    function() {
        c()
    });
    this.rotationY = 0;
    b.rotationZ = 0;
    Transform.extend(b, "rotationZ",
    function() {
        c()
    });
    this.rotationZ = 0;
    b.width = 0;
    b.x = 0;
    b.y = 0;
    b.rotation = 0;
    b.rotationX = 0;
    b.rotationY = 0;
    b.rotationZ = 0;
    b.opacity = 1;
    b.scaleX = 1;
    b.scaleY = 1;
    b.___firstRun = false;
    b.___timeoutRunning = false;
    d();
    return b
};
Array.prototype.sortOn = function() {
    var b = this.slice();
    if (!arguments.length) return b.sort();
    var c = Array.prototype.slice.call(arguments);
    return b.sort(function(b, f) {
        for (var h = c.slice(), g = h.shift(); b[g] == f[g] && h.length;) g = h.shift();
        return b[g] == f[g] ? 0 : b[g] > f[g] ? 1 : -1
    })
};
Array.prototype.shuffle = function() {
    for (var b = []; this.length;) b.push(this.splice(Math.random() * this.length, 1)[0]);
    for (; b.length;) this.push(b.pop());
    return this
};
DOMUtils = {
    getChildIndex: function(b) {
        if (!b) return - 1;
        var c = b.parentNode;
        if (!c) return - 1;
        for (var c = c.children,
        d = c.length,
        f = 0; f < d; f++) if (c[f] === b) return f
    },
    getOffset: function(b) {
        for (var c = 0,
        d = 0; b && !isNaN(b.offsetLeft) && !isNaN(b.offsetTop);) {
            c = c + (b.offsetLeft - b.scrollLeft);
            d = d + (b.offsetTop - b.scrollTop);
            b = b.parentNode ? b.parentNode: b.offsetParent
        }
        return {
            top: d,
            left: c
        }
    }
};
var GSpreadsheet = function(b, c, d) {
    this.key = b;
    this.options = d || {};
    this.data = [];
    this.headers = [];
    this.index = [];
    this.entryLength = c.feed.entry.length;
    for (d = 0; d < c.feed.entry.length; d++) {
        var f = c.feed.entry[d],
        h = {},
        g;
        for (g in f) if (g.indexOf("gsx$") == 0) {
            b = g.substring(4);
            d == 0 && this.headers.push(b);
            b == this.options.index && (this.index[f[g].$t] = d);
            h[b] = f[g].$t
        }
        this.data.push(h)
    }
    this.each = function(b) {
        for (var c = 0; c < this.data.length; c++) b(this.data[c])
    };
    this.select = function(b) {
        return typeof b == "string" ? this.data[this.index[b]] : this.data[b]
    };
    this.displayAll = function(b) {
        b || (b = "");
        for (var c = "<table cellpadding='5' cellspacing='0' " + b + "><tr>",
        b = 0; b < this.headers.length; b++) c = c + ("<th style='background-color: black; color: white;'>" + this.headers[b] + "</th>");
        var c = c + "</tr>",
        d = this;
        this.each(function(b) {
            for (var e = "<tr>",
            f = 0; f < d.headers.length; f++) e = e + ("<td style='border: 1px solid grey;'>" + b[d.headers[f]] + "</td>");
            c = c + (e + "</tr>")
        });
        return c = c + "</table>"
    };
    this.displayRow = function(b) {
        var b = this.select(b),
        c = [],
        d;
        for (d in b) c.push(d + " = " + b[d]);
        return c.join(", ")
    }
};
GSpreadsheet.load = function(b, c) {
    c.worksheet || (c.worksheet = "od6");
    var d = c.worksheet,
    f = "GSpreadsheet.loader_" + b + "_" + d;
    eval(f + " = function(json) { var gs = new GSpreadsheet(key, json, options); callback(gs); }");
    var h = document.createElement("script");
    h.setAttribute("src", "http://spreadsheets.google.com/feeds/list/" + b + "/" + d + "/public/values?alt=json-in-script&callback=" + f);
    h.setAttribute("id", "jsonScript");
    h.setAttribute("type", "text/javascript");
    document.documentElement.firstChild.appendChild(h)
};
var SpreadsheetData = {
    getData: function(b) {
        function c() {
            var m = 0;
            GSpreadsheet.load("0AlmbG1DJhgZvdGFKam5BUEZIajk3dWMzTUswd3JHVGc", {
                worksheet: d[g].worksheet,
                index: "web-id"
            },
            function(i) {
                function q() {
                    var k = i.data[m],
                    z = 300,
                    t = "",
                    p = 0,
                    w = 0,
                    u = k.filenamemainasset,
                    y = function() {
                        var u = k["web-id"];
                        if (u == null || u == "") u = m;
                        var E = k.offsettop;
                        E || (E = 0);
                        var B = k.relatedoffsettop;
                        B || (B = 0);
                        var I = 1;
                        if (k.scalefactor != "" && k.scalefactor != null) I = k.scalefactor;
                        var H = k.tooltipgravity;
                        H || (H = "bottom");
                        e = e + ('<div data-template="productTemplate" data-subsection="' + k.subsection + '" data-path="' + u + '">');
                        e = e + ('<div data-scale-factor="' + I + '" data-image-width="' + v + '" data-image-height="' + n + '" data-offsetTop="' + E + '" data-relatedoffsettop="' + B + '" data-year="' + k.date + '" data-space="' + z + '" data-image="' + t + '" data-shadow-type="' + o + '" data-tooltip-offset="' + w + "," + p + '">');
                        e = e + ("<div>" + k.rollover + "</div>");
                        e = e + ("<div>" + k.title + "</div>");
                        e = e + ("<div>" + k.date + "</div>");
                        e = e + ("<div>" + k.artist + "</div>");
                        e = e + ("<div>" + k.remainingcaptioninfo + "</div>");
                        e = e + ("<div>" + k.labeltext + "</div>");
                        e = e + ("<div>" + k.photocreditline + "</div>");
                        e = e + ("<div>" + H + "</div>");
                        e = e + "</div>";
                        e = e + "<div>";
                        k.relatedobject1 && (e = e + ("<div>" + k.relatedobject1 + "</div>"));
                        k.relatedobject2 && (e = e + ("<div>" + k.relatedobject2 + "</div>"));
                        k.relatedobject3 && (e = e + ("<div>" + k.relatedobject3 + "</div>"));
                        k.relatedobject4 && (e = e + ("<div>" + k.relatedobject4 + "</div>"));
                        e = e + "</div>";
                        e = e + "<div>";
                        k.filenamecontextualasset1 && (e = e + ("<div><div>" + k.contextualasset1 + "</div><div>" + k.caption1 + "</div><div>" + k.filenamecontextualasset1 + "</div></div>"));
                        k.filenamecontextualasset2 && (e = e + ("<div><div>" + k.contextualasset2 + "</div><div>" + k.caption2 + "</div><div>" + k.filenamecontextualasset2 + "</div></div>"));
                        k.filenamecontextualasset3 && (e = e + ("<div><div>" + k.contextualasset3 + "</div><div>" + k.caption3 + "</div><div>" + k.filenamecontextualasset3 + "</div></div>"));
                        e = e + "</div>";
                        for (E = 0; E < h.length; E++) {
                            B = h[E];
                            if (u == B.associateWithWebID) {
                                e = e + ('<div data-name="event" data-image="' + B.image + '">');
                                e = e + ('<div data-name="xPos">' + B.xPos + "</div>");
                                e = e + ('<div data-name="dropDistance">' + B.dropDistance + "</div>");
                                e = e + ('<div data-name="tooltipCoordinates">' + B.tooltipCoordinates + "</div>");
                                e = e + ('<div data-name="header">' + B.tooltipHeader + "</div>");
                                e = e + ('<div data-name="subHeader">' + B.tooltipSubheader + "</div>");
                                e = e + ('<div data-name="year">' + B.year + "</div>");
                                e = e + "</div>"
                            }
                        }
                        e = e + "</div>";
                        if (m == i.entryLength - 1) {
                            e = e + "</div>";
                            g++;
                            if (g == d.length) {
                                e = e + "<div id='more-about-content'>";
                                u = 0;
                                for (E = f.length; u < E; u = u + 1) {
                                    e = e + ("<div data-more-about='" + f[u].name + "'>");
                                    e = e + ("<div data-name='header'>" + f[u].name + "</div>");
                                    e = e + ("<div data-name='text'>" + f[u].description + "</div>");
                                    e = e + "</div>"
                                }
                                e = e + "</div>";
                                b(e)
                            } else c()
                        } else {
                            m++;
                            q()
                        }
                    },
                    D = new Image;
                    D.addEventListener("load",
                    function(b) {
                        var c = b.currentTarget.width;
                        n = b = b.currentTarget.height;
                        v = c;
                        w = c - 13;
                        p = -10;
                        var d = k.tooltipx;
                        d != "" && d != null && (w = d);
                        d = k.tooltipy;
                        d != "" && d != null && (p = d);
                        z = 30;
                        d = k.spacing;
                        d != "" && d != null && (z = d);
                        o = b > c ? "floor": "wall";
                        c = k.shadowtype;
                        c != "" && c != null && (o = c);
                        t = u + "";
                        y()
                    });
                    D.addEventListener("error",
                    function(b) {
                        console.log("Image not found : " + b.currentTarget.src);
                        t = "image not found";
                        y()
                    });
                    D.src = "assets/images/century/s/" + u + ""
                }
                var k = d[g],
                n = 0,
                v = 0,
                o = "wall";
                e = e + ('<div data-menuTitle="' + k.name + '" data-template="centuryTemplate" data-color="' + k.color + '" data-path="' + k.path + '"><div data-name="description"><div data-name="header">' + k.descriptionHeader + '</div><div data-name="period">' + k.time + '</div><div data-name="text">' + k.descriptionBody + "</div></div>");
                q()
            })
        }
        var d = [{
            worksheet: "od6",
            color: "657cb2",
            path: "new-century",
            name: "New Century, New Child, New Art",
            time: "1900s&ndash;1910s",
            descriptionHeader: "New Century, New Child, New Art",
            descriptionBody: "For many designers, writers, and reformers at the turn of the twentieth century, children were the living symbol of the sweeping changes that ushered in the birth of the modern. As the focus of millennial fears and utopian dreams, they seemed an inexhaustible source of renewal, evoking both a paradise lost in the remote past and the future possibility of an ideal city or state.<p>A reformed and integrated approach to every area of the child's experience emerged through the New Art, an amalgam of the Arts and Crafts movement and Art Nouveau, both of them tendencies that emphasized the unity of all art forms, the revival of handcraft, and the revitalizing of design through the use of organic forms and imagery. In emergent artistic centers in Europe and America&mdash;from Glasgow and Chicago to Rome, Vienna, and Budapest&mdash;the leading designers and intellectuals of the day, many of them women, used this approach to shape the material world of the modern child. </p><p>These aesthetic roots coalesced with a social, democratizing concept of art in the kindergarten movement, in which emphasis was placed on the child's enjoyment of the creative process and an intuitive investigation of materials. Like the New Art, the new pedagogy emphasized authentic expression, the inspiration of the natural world, and the creative potential of every individual, every child.</p>"
        },
        {
            worksheet: "od8",
            color: "7f2d2a",
            path: "avant-garde-playtime",
            name: "Avant-Garde Playtime",
            time: "1910s&ndash;1930s",
            descriptionHeader: "Avant-Garde Playtime",
            descriptionBody: "The artistic and educational reform movements that had opened the twentieth century set the tone for avant-garde explorations during and immediately after World War I. Groups working simultaneously in different countries, with a growing interchange between them&mdash;including Italian Futurists, the De Stijl group in the Netherlands, German Expressionist architects, modernists in the newly constituted state of Czechoslovakia, and teachers and students at the Bauhaus school of design and art&mdash;energized the modern movement in design.<p>Many such avant-gardists sought to refresh their creativity through recapturing a playful, untutored attitude toward the world&mdash;the \"innocent eye\" of the child&mdash;and stripping away extraneous elements such as historicist ornament to get back to the purest forms of human experience and language. Children's naively subversive modes of questioning the world around them offered a model for creative experimentation, and for probing social attitudes or revealing the absurd. Opening themselves up to children's perceptual worlds, avant-garde designers set out to create innovative forms of furniture, toys, books, and interiors that might release youthful energy and imagination, and thereby help shape the society of the future.</p>"
        },
        {
            worksheet: "odb",
            color: "78bad3",
            path: "light-air-health",
            name: "Light, Air, Health",
            time: "1920s&ndash;1930s",
            descriptionHeader: "Light, Air, Health",
            descriptionBody: "Modernism revealed its greatest idealism in design for children between the two world wars, uniting a concern for the health and safety of the young with determination to transform society. The utopian society of the future, it was argued, would have the same dynamic curiosity, openness, and unaffected simplicity as children themselves. In this way, children would become the agents of a systematic modernization of traditional culture, the heralds of the new way of life.<p>Medical, educational, and design reformers of the interwar years believed that light, hygiene, and air should permeate all aspects of a child's early environments. Harnessing the language of abstraction as well as new materials and industrial production, designers developed new modern schools, nurseries, clothing, and furniture that were simple, light, and flexible: a tabula rasa upon which the modern child could inscribe his or her identity. Physical education, delivered through schools and clubs, encouraged children to participate in forms of modern dance, gymnastics and sport, whether as a means of inculcating collective values or of promoting health and self-expression.</p><p>If the built environment was central to shaping the larger awareness of modern society, the mental environment of the child also required attention. Interactive picture books and construction toys led children on spatial, temporal, and imaginative journeys into the wider world of things and ideas, preparing them to function as members of a modern industrialized society.</p>"
        },
        {
            worksheet: "oda",
            color: "585a60",
            path: "children-body-politics",
            name: "Children and the Body Politic",
            time: "1920s&ndash;1940s",
            descriptionHeader: "Children and the Body Politic",
            descriptionBody: "Despite the Romantic ideal of modern childhood as a time of innocence to be preserved, children could not help but be implicated in the major political tendencies of the twentieth century. As symbols of domestic life, national identity, and the future, they were one of the key motifs in visual propaganda from the 1920s through World War II. During this time, many politically engaged modernists used their skills to proclaim the benefits to children of radical social change, as well as highlight the collateral damage they suffered in wartime. Designers were recruited for the causes of various state-run and political youth movements, to design uniforms, magazines, and environments, such as for children's clubs in the Soviet Union and children's colonies in Fascist Italy.         <p>Children became the focus of patriotic consumption on the part of their parents, and there was a growing demand throughout Europe, the United States, and Japan for modern books, clothing, and toys that would inculcate the appropriate political beliefs, thereby transposing adult politics into the imaginary and material worlds of children. But an equally powerful theme emerges: design as a therapeutic agent for children damaged by war, informed by the unshakeable belief of many artists and educators in the power of design to transcend politics and heal wounds.</p>"
        },
        {
            worksheet: "od9",
            color: "f99a2d",
            path: "regeneration",
            name: "Regeneration",
            time: "1940s&ndash;1960s",
            descriptionHeader: "Regeneration",
            descriptionBody: "Life after the end of World War II was perilous for millions of displaced, starving, and orphaned children, particularly in Europe and Japan, but massive children's welfare and school-building programs captured a spirit of hopeful postwar reconstruction. Across the ideological spectrum in the United States as well as Europe, children were seen as key to visions of constructing better, more egalitarian worlds. At the same time, the treatment of children rapidly became a crucial sphere of Cold War ideological contest, with idealized, child-centered depictions of community and family life intensifying on both sides of the East-West divide.<p>Soaring toy sales furthered economic regeneration but, in the aftermath of such brutality and devastation also triggered debates about a field of design some saw as imbued with militarism, pernicious nationalism, and negative racial or gender stereotyping. Many avant-garde designers instead sought to recover a lost innocence embodied in the spontaneity of children's art, and to emulate the constructive impulse of children's play. International groups of concerned child psychologists, manufacturers, educators, and designers joined forces to promote \"good toys\" that were well designed, safe, and nonviolent. Meanwhile, in the ruins of many European cities, similarly interdisciplinary groups of professionals worked with children to reclaim bombed-out areas through therapeutic play, and to reconsider the place of children in the modern city.</p>"
        },
        {
            worksheet: "ocy",
            color: "5c9f17",
            path: "power-play",
            name: "Power Play",
            time: "1960s&ndash;1990s",
            descriptionHeader: "Power Play",
            descriptionBody: "Children and consumer culture have exerted power over each other (as well as over adults) for more than a century. After the period of regeneration following World War II, innovation and mass production, the hallmarks of modern design, fueled a proliferation of goods for children and contributed to intensified market research and advertising aimed at children all over the world, as well as to concerns about their exploitation. Here we look at significant points of junction between children and the commercial realm of modern design, focusing on the period from the 1960s to 2000s, a broad span of time held together by the prevailing concept of the child as an individual consumer, cognizant and autonomous.<p>In this period, design for children has demonstrated tangible advances in materials and techniques as well as the influence of external factors such as the Cold War. Power has been a prominent and slippery theme in this narrative: the power of global brands and companies, the power of electronic and digital media, and the power of children themselves, who, over time, have come to wield more purchasing ability and exert more influence on adult consumption. As retail consultant Paco Underhill observed at the close of the twentieth century, \"You no longer need to stay clear of the global marketplace just because you're three-and-a-half feet tall, have no income to speak of and are not permitted to cross the street without Mom. You're an economic force, now and in the future, and that's what counts.\"</p>"
        },
        {
            worksheet: "ocz",
            color: "654665",
            path: "designing-better-worlds",
            name: "Designing Better Worlds",
            time: "1960s&ndash;2000s",
            descriptionHeader: "Designing Better Worlds",
            descriptionBody: "The modern world is fraught with inequity, as is keenly evidenced by drastic disparities in the security and quality of life of children around the world: they are hungry and sick, they labor in deplorable conditions, they are victims of violence, abuse, and exploitation. Some of these dark realities began long before the twentieth century, and others are the result of more recent political and sociocultural shifts and may be linked to developments in modern design; the AK-47, for example, an assault rifle designed in the Soviet Union at the end of World War II, is simple and light enough to be wielded, stripped, and reassembled by child soldiers as young as eight years old.<p>In the last half-century, complex and often contradictory ideas about the status, rights, and needs of children in the modern world have emerged through passionate public discourse among adults&mdash;educators, parents, politicians. It has been through design that these changing notions, abstract but directly felt by children, have been made manifest. Starting in the 1960s designers broke with established conventions in order to challenge institutional, authoritarian, and commercial structures, and among the results were alternative living environments that responded to the idea of a community's collective responsibility for children, the movement toward an ethical, sustainable design culture, and the increased visibility of inclusive, therapeutic, and assistive design for children with disabilities and other challenges.</p><p>Among the divergent new objects and environments produced for children in the closing decades of the twentieth century, those presented here herald a pronounced progressive or idealistic philosophy; they attempt to communicate to children that they deserve a better world and that this world might be possible.</p>"
        }],
        f = [{
            name: "Kindergarten Movement",
            description: "A new way of thinking about the child was taking hold around 1900, one that questioned the mind-numbing traditional methods of learning by rote, and treated children as active learners. Inspired by early-nineteenth-century educational theorists, above all Friedrich Froebel in Germany, progressive teachers of young children embraced singing, dancing, direct observation of nature, and, most importantly, open-ended play with real objects and materials. This holistic focus on each child's physical, emotional, and intellectual abilities, they believed, stimulated more effective learning than harsh discipline and copying. By the opening decades of the twentieth century, the kindergarten movement's wider international impact was beginning to trigger both avant-garde artistic experimentation and a decisive shift in educational methods: in 1906 Maria Montessori established her first Casa dei Bambini in Rome, and in 1919 Rudolf Steiner his first school in Germany&mdash;initiatives that have continued to inform educational theory and inspire modern design to this day."
        },
        {
            name: "Glasgow",
            description: "By 1900 Glasgow had made a spectacular transformation from medieval city and classical mercantile center to an industrial powerhouse of the British Empire, a process of modernization that engendered shocking dislocations, both social and visual, with children as both its beneficiaries and its victims. The challenge for progressive designers like Charles Rennie Mackintosh, Jessie M. King, and their contemporaries at the Glasgow School of Art was to develop a new visual language that would infuse the city's industrial culture with a mystical sense of nature implicit in the name Glasgow (from the Gaelic Glaschu, signifying a \"dear green place\"), and would express the city's modernity as well as its remote Arcadian past. As part of their commitment to a process of aesthetic and social renewal, these designers addressed the needs of children through acclaimed innovations in school architecture, educational publishing, and dress reform."
        },
        {
            name: "Chicago",
            description: 'In the first decades of the twentieth century, Chicago, the second largest city in the United States and a hotbed of Progressive Era reform, was both socially and physically redesigned to benefit its youngest residents. Children were a spiritual inspiration for modern architects, notably Frank Lloyd Wright and others associated with the Prairie School, a predominantly Midwestern movement. In his "Kindergarten Chats," a series of articles published from 1901\u201302, Chicago architect Louis H. Sullivan explicitly encouraged a childlike interpretation of nature and form as the pure source for a modern, organic, and uniquely American architecture. At the same time, organizations like Hull House provided social services and agitated for political reform on behalf of children, especially in working-class and immigrant families. This and another Chicago landmark, the Laboratory School at the University of Chicago, were leading exponents of modern education, including manual/industrial instruction for children. These institutions also joined a national revolution known as the Playground Movement, in which Chicago was a beacon.'
        },
        {
            name: "Vienna",
            description: "Children were prominent in the aesthetic ferment of turn-of-the-century Vienna, where there was a fascinating convergence of innovative pedagogy, modern design, and psychoanalysis. Sigmund Freud, who was developing his groundbreaking theory of child development as a series of psychosexual stages driven by libidinal desires, recognized the distinctiveness of children as individuals, taking seriously their fantasy worlds and mental anguish. His methods added an influential voice to calls for less repressive childcare and education that was echoed in the freeform teaching of Franz Ci\u017eek's pioneering classes for children at the Vienna Kunstgewerbeschule (School of applied arts). Ci\u017eek's colleagues and older design students drew inspiration from the uninhibited expression and bold colors of the children's work, and in the Wiener Werkst\u00e4tte&mdash;an Arts and Crafts workshop in which many of them were also involved&mdash;the production of modern playthings, books, clothes, and interiors for children was put on the same footing as fine art."
        },
        {
            name: "Rome",
            description: 'By 1900 Italy remained at the margins of industrialized Europe, lagging far behind in terms of economic, social, and technological development. But a small number of radical artists, social reformers, and educators in Rome dedicated themselves to addressing the plight of children in the city and surrounding countryside. Among them were Francesco Randone and Maria Montessori, who established innovative, activity-based models of education that emphasized spontaneous interaction with teaching materials and a stimulating classroom environment. Arts and Crafts architect Alessandro Marcucci and his brother-in-law, Futurist artist Giacomo Balla, worked with medical specialists to set up schools for the rural poor; attending to the education and needs of children was, in their words, "the action of an avant-garde. This work precedes the inevitable transformation of rural life and presupposes a new cultural and economic order."'
        },
        {
            name: "Budapest",
            description: "Drawing inspiration from the heroic vision of peasant life celebrated by the novelist Leo Tolstoy and leaders of the British Arts and Crafts movement, a group of Hungarian designers established an artists' colony in G\u00f6d\u00f6ll\u0151, near Budapest. The search for totality of artistic expression and a style for the new century was rooted in the concept of the colony as a collaborative <i>Gesamtkunstwerk</i>, a unified artwork that would be created by every colony member in every medium, from buildings and stained glass to clothing and toys. Children from varied social and ethnic backgrounds figured prominently in the colony's collective program to modernize vernacular crafts and establish a shared way of life; the emphasis was on fostering their self-sufficiency and unhampered development as creative individuals, whether working in the colony's weaving workshop and craft studios, creating their own designs at home, or playing in an idyllic natural environment."
        },
        {
            name: "The New School",
            description: "In the late 1920s there was a paradigmatic shift in the design of schools, ushering in more welcoming, airy, and flexible spaces that were seen by progressive educators and design reformers as embodiments of the more equitable and open society to which they aspired. Much of the thinking about the \"new school\" was also based on the relationship between children's health and education, specifically the need for schools to compensate for the poor diet and lack of hygienic facilities in many children's home life, and to curb the spread of infectious diseases. Typically the new school was single-story, opening on to sheltered outdoor spaces, along the lines of open-air schools that were initially targeted at children in the first stages of tuberculosis. Reflecting modern attitudes toward teacher-student interaction, open classrooms were designed to accommodate different activities simultaneously, with furniture that could be reconfigured for individual or informal group-based learning rather than being arranged in inflexible rows."
        },
        {
            name: "The Healthy Body",
            description: "The profound social and psychological results of World War I had affected how people thought about the future, triggering an almost obsessive concern with children's health. As a symbolic entity, the child's body in the 1920s and 30s was inscribed with the paradoxical pressures of modernity, signifying on the one hand a connection with nature, primal emotion, and unrestrained psychic energy, and on the other the idea of a perfectible human machine that could be conditioned to function within a utopian, modern world. The years after the war saw a new emphasis on physical culture, the design of healthier clothing, housing, medical products for children, and graphic propaganda about new lifestyles. Advances in medical knowledge and behavioral psychology contributed to a sounder understanding of the environmental conditions needed for the proper physical and mental development of young children, and modernist architecture reflected the consensus that access to plenty of fresh air, sunlight, and water was a route to children's health."
        },
        {
            name: "At Home with Modernism",
            description: '"Teach your children that a house is only habitable when it is full of light and air, and when the floors and walls are clear," urged the avant-garde architect Le Corbusier in 1923. Modernist architects and designers did not have a monopoly on concepts of hygiene and practicality, but their use of simple, minimalist schemes, built-in features, and washable surfaces stood up to the wear and tear of boisterous young people. Blackboard panels encouraged self-expression, and troublesome chalk dust was easily cleaned from floors and tabletops covered with linoleum or cork tiles. The easy-to-clean principle was extended to simple, undecorated furniture and toys. Glass, plywood, enamel-painted wood, and chromed steel&mdash;all modernist materials of choice&mdash;could be kept absolutely spotless. Similar qualities of abstraction, clarity, and simplicity transformed the appearance of modern children\'s books, in which some of the practitioners at the highest level of both design and literature came together to produce volumes to nurture and challenge young minds.'
        },
        {
            name: "Reclaiming the City",
            description: "The exuberant reappearance of children in public urban space after the experience of confinement or evacuation during World War II was marked in films, photography, and artworks&mdash;such as Ben Shahn's <i>Liberation</i>&mdash;that showed children's spontaneous play amidst the ruins of bombed out buildings. The children in these works epitomized a new attitude, at once disruptive and challenging but also playful, that inspired a new approach to the creative redevelopment of Europe's shattered cityscapes. Adopting a grassroots approach to urban planning and playground design, architects and social workers transformed bomb sites and desolate lots into landscapes for adventure play, including free-form construction, with adult facilitators. On both sides of the Cold War divide, attempts were made to engage the young in imagining future cities and to prepare them for participation in urban planning, building, and administration. A number of construction toys, educational books, and programs helped to foster children's environmental awareness and appreciation of modern architecture and designed environments."
        },
        {
            name: "Back to School",
            description: "The wartime devastation in Europe, rising birthrates on both sides of the Atlantic, and a shortage of materials created an opportunity for inventiveness and collaboration when it came to constructing new schools rapidly. The postwar school was considered an important site for nourishing values of the individual, the community, and the state, and many governments backed the wide-scale implementation of earlier experimental, low-rise models developed for reformist pedagogies in the 1930s.<br /><br />In addition to an emphasis on prefabrication and building economically with steel frames and glass walls, architects and engineers examined the psychological effects of lighting, airflow, and color to determine what was best for a learning environment. Artists and educators collaborated on artworks to enhance the fabric of school buildings, accompanied by an expansion of creative arts in many schools' curricula. In plan, design, interior decoration, and furnishings, the postwar school gave material form to an ideal vision of the future.</p>"
        },
        {
            name: "Postwar Play",
            description: 'At mid-century, children\'s play was a restorative and inspiring cause for modern design in both private and public spheres. Internationally, designers, manufacturers, educators, and parents championed "good toys"&mdash;abstract, geometric, and nonviolent objects with pedagogical value, fine craftsmanship, and durability. Iconic toys of the immediate postwar period&mdash;such as Slinky and Lego building bricks&mdash;endure today, even in competition with more elaborate toys and video games.<br /><br />Beyond the toy, modern-minded adults became increasingly interested in playful furniture and environments, and in enriching the educational potential of the child\'s first surroundings. Child development experts like Jean Piaget, Arnold Gesell, and Benjamin Spock contended that room for play should be part of a child\'s everyday space, and playtime was recognized as essential for promoting autonomy, stimulating motor development, and encouraging aesthetic appreciation. In the United States especially, the mid-century modern playroom became an important site of free expression and discovery, as well as an anchor of fervent contemporary discourse around "correct" decoration and taste.</p>'
        },
        {
            name: "Space Wars",
            description: "The early space age was a period of technological innovation and political and cultural transformation that began in 1957, with the Soviet Union's launch of the satellite Sputnik, and peaked in 1969, with the United States' first manned moon landing, by Apollo 11. People of all ages and on both sides of the Cold War were buoyed by childlike wonder and optimism, even amid fear of the prospects of outer space and the threat of nuclear war. Design for children in this period was remarkably inventive, producing stylish (and implicitly ideological) toys, environments, films, and television programs that furnished fantasy worlds for children in whose real worlds the distinctions between possible and impossible, science fact and fiction, were increasingly blurred. "
        },
        {
            name: "Design for the Real World",
            description: "Victor Papanek's <i>Design for the Real World</i>, a provocative manifesto published in 1971, accused designers of being negligent and entangled with corporate bottom lines and encouraged them to pursue more meaningful responses to universal needs and inclusive design. The book featured more than one hundred examples of thoughtful design projects for children, including experimental cube-based childcare centers, better childproof containers for medicines and household cleaners, and safer playgrounds and school buses. Papanek naturally outraged many of his colleagues, but thanks to him and to other progressive activists, the movement toward socially and ecologically responsible design became increasingly prominent in the late twentieth century.<br />A moral imperative took hold in the design world in the 1970s and '80s, to consider the perspectives of previously marginalized groups, including people with disabilities. The result was the field of inclusive design, also called universal design, which encompasses the specialist fields of therapeutic design (to treat or alleviate specific conditions) and assistive design (to enhance abilities and independence) for people with audiovisual, motor, and developmental disabilities. Inclusive design has proved to be a uniquely thoughtful, demanding, and often quite personal realm of the profession, all the more so when it focuses on children."
        },
        {
            name: "The Universal Child ",
            description: 'In the past three decades the emergence of a so-called global civil society and the increasing influence of transnational aid organizations have shaped the idea of the "universal child," signifying children across the globe linked in kinship to all other humans and the natural world as well as possessing universal inalienable rights. These were codified in 1959 by the Declaration of the Rights of the Child, adopted by the General Assembly of the United Nations, and further enforced in 1989 by the Convention on the Rights of the Child, whose guiding principles for state and local governments as well as for UNICEF and other international aid organizations have been ratified by every member of the United Nations except for the United States and Somalia. Designers have paid tribute to these efforts, and given them physical form by creating powerful graphics and innovative products that have benefited countless children in vulnerable or dire circumstances.'
        },
        {
            name: "Playground Revolution",
            description: 'By the early 1960s the playground\'s standard kit of parts&mdash;swings, slides, seesaws&mdash;had been revealed to be outmoded and inadequate, in part by two major developments in playground design. The first was the radical junk or adventure playground&mdash;bomb sites and desolate lots reclaimed by the ingenious constructions of children&mdash;an idea that flourished in postwar Europe. The second was abstract, freestanding (and often concrete) play sculpture in Europe and the United States, which posited, according to <i>Architectural Review</i>, a "new relationship between art and citizen."<br />Both of these models came under critical fire, felt by different adult factions to be too dangerous on the one hand, too static on the other. Ambitious designers experimented with combining the most salient qualities of the two, the adventurous and the sculptural, in proposals and sites that often also evinced an interest in socially responsible design. The ideals were noble, but the results were mixed, and concerns about safety, liability, and accessibility challenged the endurance of novel designs, if they were even built. Despite its hindrances, failures, and criticisms, The Playground Revolution, a term originating about 50 years ago, never really ended, as these examples from around the world attest. Today playgrounds remain touchstones and rallying points for the well-being of children in the modern world and a controversial but rich area for innovation.'
        }],
        h = [{
            image: "1_book.png",
            year: "1900",
            xPos: 400,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Ellen Key publishes Century of the Child",
            tooltipSubheader: "1900",
            associateWithWebID: "primary-class-studying-plants"
        },
        {
            image: "2_window.png",
            year: "1906",
            xPos: 600,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Maria Montessori establishes her Casa dei Bambini in Rome",
            tooltipSubheader: "1906",
            associateWithWebID: "the-kin-der-kids"
        },
        {
            image: "3_dino.png",
            year: "1914",
            xPos: 300,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Gertie the Dinosaur early animation",
            tooltipSubheader: "1914",
            associateWithWebID: "animation-still-from-gertie-the-dinosaur"
        },
        {
            image: "4_plane.png",
            year: "1914&ndash;1918",
            xPos: 800,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "World War I",
            tooltipSubheader: "1914 - 1918",
            associateWithWebID: "chairs-and-desk-from-school-for-rural-poor"
        },
        {
            image: "4_plane.png",
            year: "1914&ndash;1918",
            xPos: 800,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "World War I",
            tooltipSubheader: "1914 - 1918",
            associateWithWebID: "skittles"
        },
        {
            image: "5_stol.png",
            year: "1917&ndash;1932",
            xPos: 300,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "De Stijl magazine",
            tooltipSubheader: "1917 - 1932",
            associateWithWebID: "village-with-numbers"
        },
        {
            image: "6_steiner.png",
            year: "1919",
            xPos: 400,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "First Steiner School",
            tooltipSubheader: "1919",
            associateWithWebID: "high-chair-dutch"
        },
        {
            image: "7_face.png",
            year: "1919",
            xPos: 600,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Bauhaus established",
            tooltipSubheader: "1919",
            associateWithWebID: "alpine-architecture"
        },
        {
            image: "8_bomb.png",
            year: "1936&ndash;1938",
            xPos: 250,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Spanish Civil War",
            tooltipSubheader: "1936 - 1938",
            associateWithWebID: "rhinoceros-toy"
        },
        {
            image: "9_school.png",
            year: "1922",
            xPos: 900,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "First International Congress on Open Air Schools",
            tooltipSubheader: "1922",
            associateWithWebID: "skippy-racer"
        },
        {
            image: "10_symbol.png",
            year: "1924",
            xPos: 600,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "World Child Welfare Charter endorsed by the League of Nations",
            tooltipSubheader: "1924",
            associateWithWebID: "open-air-school-amsterdam"
        },
        {
            image: "11_pencilin.png",
            year: "1928",
            xPos: 500,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Discovery of Penicillin",
            tooltipSubheader: "1928",
            associateWithWebID: "cover-we-live"
        },
        {
            image: "12_house.png",
            year: "1928",
            xPos: 750,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "CIAM (International Congresses of Modern Architecture) established",
            tooltipSubheader: "1928",
            associateWithWebID: "the-aalto-children"
        },
        {
            image: "13_writing.png",
            year: "1929",
            xPos: 300,
            dropDistance: 210,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Association Montessori Internationale founded",
            tooltipSubheader: "1929",
            associateWithWebID: "childs-room-furniture"
        },
        {
            image: "14_toy.png",
            year: "1937",
            xPos: 575,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "MoMA's Education Department established",
            tooltipSubheader: "1937",
            associateWithWebID: "healthy-youth-strong-people"
        },
        {
            image: "15_ussr.png",
            year: "1922",
            xPos: 500,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "USSR established",
            tooltipSubheader: "1922",
            associateWithWebID: "growth-in-capacity-city-nurseries"
        },
        {
            image: "17_bomb.png",
            year: "1936&ndash;1938",
            xPos: 680,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Spanish Civil War",
            tooltipSubheader: "1936 - 1938",
            associateWithWebID: "post-office-mural-study"
        },
        {
            image: "17_plane.png",
            year: "1939&ndash;1945",
            xPos: 400,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "World War II",
            tooltipSubheader: "1939 - 1945",
            associateWithWebID: "concentration-camp-collage"
        },
        {
            image: "18_hs.png",
            year: "1945",
            xPos: 800,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Atomic bombs dropped on Hiroshima and Nagasaki",
            tooltipSubheader: "1945",
            associateWithWebID: "game-of-3-geese"
        },
        {
            image: "pippi.png",
            year: "1945",
            xPos: 350,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Birth of Pippi Longstocking and the Moomins ",
            tooltipSubheader: "1945",
            associateWithWebID: "little-peter-bushytail-spread"
        },
        {
            image: "unicef.png",
            year: "1946",
            xPos: 700,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "UNICEF established",
            tooltipSubheader: "1946",
            associateWithWebID: "school-desk"
        },
        {
            image: "spielgut.png",
            year: "1954",
            xPos: 450,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Spiel Gut Award started",
            tooltipSubheader: "1954",
            associateWithWebID: "eames-coat-rack"
        },
        {
            image: "polio.png",
            year: "1955",
            xPos: 670,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Polio vaccine",
            tooltipSubheader: "1955",
            associateWithWebID: "munkegards-school-desk"
        },
        {
            image: "hand.png",
            year: "1959",
            xPos: 800,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "United Nations' Declaration of the Rights of the Child",
            tooltipSubheader: "1959",
            associateWithWebID: "curtain-wall-builder"
        },
        {
            image: "sputnik.png",
            year: "1957",
            xPos: 880,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Soviet Union launches Sputnik satellite",
            tooltipSubheader: "1957",
            associateWithWebID: "sputnik-play-sculpture"
        },
        {
            image: "moon.png",
            year: "1969",
            xPos: 600,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "US first manned moon landing by Apollo 11",
            tooltipSubheader: "1969",
            associateWithWebID: "space-station-space-rocket"
        },
        {
            image: "disney.png",
            year: "1971",
            xPos: 400,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Walt Disney World opens",
            tooltipSubheader: "1971",
            associateWithWebID: "cockpit-play-environment"
        },
        {
            image: "mcd.png",
            year: "1979",
            xPos: 800,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "McDonald's Happy Meal introduced",
            tooltipSubheader: "1979",
            associateWithWebID: "kartells-childrens-furniture-advertisement"
        },
        {
            image: "tetries.png",
            year: "1989",
            xPos: 1E3,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Nintendo's Game Boy released",
            tooltipSubheader: "1989",
            associateWithWebID: "pee-wee-playhouse-interior"
        },
        {
            image: "unesco.png",
            year: "1979",
            xPos: 400,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "UNESCO's International Year of the Child",
            tooltipSubheader: "1979",
            associateWithWebID: "and-babies"
        },
        {
            image: "un.png",
            year: "1989",
            xPos: 700,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "United Nations' Convention on the Rights of the Child",
            tooltipSubheader: "1989",
            associateWithWebID: "growing-by-design-conference"
        },
        {
            image: "communismfall.png",
            year: "1989",
            xPos: 300,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Fall of Communism",
            tooltipSubheader: "1989",
            associateWithWebID: "modular-indoor-pay-area"
        },
        {
            image: "growing.png",
            year: "1990",
            xPos: 500,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Growing by Design, International Design Conference in Aspen",
            tooltipSubheader: "1990",
            associateWithWebID: "zoob-play-system"
        },
        {
            image: "book.png",
            year: "2004",
            xPos: 900,
            dropDistance: 200,
            tooltipCoordinates: "0,0",
            tooltipHeader: "Pat Kane publishes The Play Ethic",
            tooltipSubheader: "2004",
            associateWithWebID: "xo-laptop"
        }],
        g = 0,
        e = "";
        c()
    }
};
function AssetGroup(b, c, d) {
    var f = {};
    f.data = b;
    f.callback = c;
    f.onUpdate = d;
    return f
}
function AssetLoader() {}
AssetLoader.init = function(b) {
    AssetLoader.assets = [];
    AssetLoader.que = [];
    AssetLoader.busy = false;
    AssetLoader.assetPath = b
};
AssetLoader.loadGroup = function(b) {
    function c() {
        function b(c) {
            c.currentTarget.removeEventListener(Event.LOAD, h);
            m++;
            h()
        }
        function f(b) {
            trace("AssetLoader: Error: Cant load : " + b.currentTarget.src);
            m++;
            h()
        }
        function h() {
            _percentageLoaded = m / q * 100;
            _percentageLoaded = Math.ceil(_percentageLoaded);
            onUpdate != null && onUpdate(_percentageLoaded);
            if (m == q) {
                callback();
                AssetLoader.que.shift();
                AssetLoader.que.length > 0 ? setTimeout(c, 100) : AssetLoader.busy = false
            }
        }
        data = AssetLoader.que[0].data;
        callback = AssetLoader.que[0].callback;
        onUpdate = AssetLoader.que[0].onUpdate;
        var g = 0,
        e = data.length,
        m = 0,
        i = [],
        q = 0,
        k;
        for (g; g < e; g++) {
            var n = k,
            v = false,
            o = 0,
            x = AssetLoader.assets.length;
            for (o; o < x; o++) if (n === AssetLoader.assets[o].id) {
                v = true;
                break
            }
            if (!v) {
                i.push(data[g]);
                q++
            }
        }
        if (i.length > 0) {
            e = 0;
            n = i.length;
            for (e; e < n; e++) {
                g = new Image;
                k = i[e];
                AssetLoader.assets.push({
                    asset: g,
                    id: k
                });
                g.addEventListener(Event.LOAD, b, true);
                g.addEventListener(Event.ERROR, f, true);
                g.style.position = "absolute";
                g.src = AssetLoader.assetPath + i[e]
            }
        } else h()
    }
    if (AssetLoader.busy) AssetLoader.que.push(b);
    else {
        AssetLoader.busy = true;
        AssetLoader.que.push(b);
        c()
    }
};
AssetLoader.getAsset = function(b) {
    var c = false,
    d = 0,
    f = AssetLoader.assets.length,
    h = null,
    g;
    for (d; d < f; d++) {
        g = AssetLoader.assets[d];
        if (b === g.id) {
            c = true;
            h = g.asset.cloneNode(true);
            h.width = g.asset.width;
            h.height = g.asset.height;
            h.style.position = "absolute";
            break
        }
    }
    c !== true && trace("AssetLoader: Error: Asset with id >> " + b + ", not found");
    return h
}; (window._gsQueue || (window._gsQueue = [])).push(function() {
    _gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function(b, c, d) {
        var f = function(b, c, e) {
            d.call(this, b, c, e);
            this._cycle = 0;
            this._yoyo = true == this.vars.yoyo;
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._dirty = true
        },
        h = f.prototype = d.to({},
        0.1, {}),
        g = [];
        h.constructor = f;
        h.kill()._gc = false;
        f.killTweensOf = f.killDelayedCallsTo = d.killTweensOf;
        f.getTweensOf = d.getTweensOf;
        f.ticker = d.ticker;
        h.invalidate = function() {
            this._yoyo = true == this.vars.yoyo;
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._uncache(true);
            return d.prototype.invalidate.call(this)
        };
        h.updateTo = function(b, c) {
            var e = this.ratio,
            f;
            c && null != this.timeline && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(false), this._gc ? this._enabled(true, false) : this._timeline.insert(this, this._startTime - this._delay));
            for (f in b) this.vars[f] = b[f];
            if (this._initted) if (c) this._initted = false;
            else if (this._notifyPluginsOfEnabled && this._firstPT && d._onPluginEvent("_onDisable", this), 0.998 < this._time / this._duration) {
                e = this._time;
                this.render(0, true, false);
                this._initted = false;
                this.render(e, true, false)
            } else if (0 < this._time) {
                this._initted = false;
                this._init();
                e = 1 / (1 - e);
                f = this._firstPT;
                for (var g; f;) {
                    g = f.s + f.c;
                    f.c = f.c * e;
                    f.s = g - f.c;
                    f = f._next
                }
            }
            return this
        };
        h.render = function(b, c, d) {
            var e = !this._dirty ? this._totalDuration: this.totalDuration(),
            f = this._time,
            h = this._totalTime,
            m = this._cycle,
            i,
            p;
            if (b >= e) {
                if (this._totalTime = e, this._cycle = this._repeat, this._yoyo && 0 !== (this._cycle & 1) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (i = true, p = "onComplete"), 0 === this._duration) {
                    if (0 === b || 0 > this._rawPrevTime) this._rawPrevTime !== b && (d = true);
                    this._rawPrevTime = b
                }
            } else if (0 >= b) {
                this._totalTime = this._time = this._cycle = 0;
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
                if (0 !== h || 0 === this._duration && 0 < this._rawPrevTime) {
                    p = "onReverseComplete";
                    i = this._reversed
                }
                0 > b ? (this._active = false, 0 === this._duration && (0 <= this._rawPrevTime && (d = true), this._rawPrevTime = b)) : this._initted || (d = true)
            } else if (this._totalTime = this._time = b, 0 !== this._repeat && ((b = this._duration + this._repeatDelay, this._cycle = this._totalTime / b >> 0, 0 !== this._cycle && this._cycle === this._totalTime / b && this._cycle--, this._time = this._totalTime - this._cycle * b, this._yoyo && 0 !== (this._cycle & 1) && (this._time = this._duration - this._time), this._time > this._duration) ? this._time = this._duration: 0 > this._time && (this._time = 0)), this._easeType) {
                var b = this._time / this._duration,
                e = this._easeType,
                w = this._easePower;
                if (1 === e || 3 === e && 0.5 <= b) b = 1 - b;
                3 === e && (b = b * 2);
                1 === w ? b = b * b: 2 === w ? b = b * b * b: 3 === w ? b = b * b * b * b: 4 === w && (b = b * b * b * b * b);
                this.ratio = 1 === e ? 1 - b: 2 === e ? b: 0.5 > this._time / this._duration ? b / 2 : 1 - b / 2
            } else this.ratio = this._ease.getRatio(this._time / this._duration);
            if (f !== this._time || d) {
                this._initted || (this._init(), !i && this._time && (this.ratio = this._ease.getRatio(this._time / this._duration))); ! this._active && !this._paused && (this._active = true);
                if (0 == h && this.vars.onStart && (0 !== this._totalTime || 0 === this._duration)) c || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || g);
                for (d = this._firstPT; d;) {
                    if (d.f) d.t[d.p](d.c * this.ratio + d.s);
                    else d.t[d.p] = d.c * this.ratio + d.s;
                    d = d._next
                }
                this._onUpdate && (c || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || g));
                this._cycle != m && (c || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || g));
                p && !this._gc && (i && (this._timeline.autoRemoveChildren && this._enabled(false, false), this._active = false), c || this.vars[p] && this.vars[p].apply(this.vars[p + "Scope"] || this, this.vars[p + "Params"] || g))
            }
        };
        f.to = function(b, c, d) {
            return new f(b, c, d)
        };
        f.from = function(b, c, d) {
            d.runBackwards = true;
            false != d.immediateRender && (d.immediateRender = true);
            return new f(b, c, d)
        };
        f.fromTo = function(b, c, d, e) {
            e.startAt = d;
            d.immediateRender && (e.immediateRender = true);
            return new f(b, c, e)
        };
        f.staggerTo = f.allTo = function(b, c, d, e, g, h, m) {
            var e = e || 0,
            i = [],
            p = b.length,
            w = d.delay || 0,
            u,
            y,
            D;
            for (y = 0; y < p; y++) {
                u = {};
                for (D in d) u[D] = d[D];
                u.delay = w;
                y === p - 1 && g && (u.onComplete = function() {
                    d.onComplete && d.onComplete.apply(d.onCompleteScope, d.onCompleteParams);
                    g.apply(m, h)
                });
                i[y] = new f(b[y], c, u);
                w = w + e
            }
            return i
        };
        f.staggerFrom = f.allFrom = function(b, c, d, e, g, h, m) {
            d.runBackwards = true;
            false != d.immediateRender && (d.immediateRender = true);
            return f.staggerTo(b, c, d, e, g, h, m)
        };
        f.staggerFromTo = f.allFromTo = function(b, c, d, e, g, h, m, i) {
            e.startAt = d;
            d.immediateRender && (e.immediateRender = true);
            return f.staggerTo(b, c, e, g, h, m, i)
        };
        f.delayedCall = function(b, c, d, e, g) {
            return new f(c, 0, {
                delay: b,
                onComplete: c,
                onCompleteParams: d,
                onCompleteScope: e,
                onReverseComplete: c,
                onReverseCompleteParams: d,
                onReverseCompleteScope: e,
                immediateRender: false,
                useFrames: g,
                overwrite: 0
            })
        };
        f.set = function(b, c) {
            return new f(b, 0, c)
        };
        f.isTweening = function(b) {
            for (var b = d.getTweensOf(b), c = b.length, e; - 1 < --c;) if ((e = b[c])._active || e._startTime === e.timeline._time && e.timeline._active) return true;
            return false
        };
        var e = function(b, c) {
            for (var f = [], g = 0, h = b._first; h;) {
                h instanceof d ? f[g++] = h: (c && (f[g++] = h), f = f.concat(e(h, c)), g = f.length);
                h = h._next
            }
            return f
        },
        m = f.getAllTweens = function(c) {
            return e(b._rootTimeline, c).concat(e(b._rootFramesTimeline, c))
        };
        f.killAll = function(b, d, e, f) {
            null == d && (d = true);
            null == e && (e = true);
            for (var g = m(false != f), h = g.length, f = d && e && f, i, t; - 1 < --h;) if (t = g[h], f || t instanceof c || (i = t.target === t.vars.onComplete) && e || d && !i) b ? t.totalTime(t.totalDuration()) : t._enabled(false, false)
        };
        f.pauseAll = function(b, c, d) {
            i(true, b, c, d)
        };
        f.resumeAll = function(b, c, d) {
            i(false, b, c, d)
        };
        var i = function(b, d, e, f) {
            void 0 == d && (d = true);
            void 0 == e && (e = true);
            for (var g = m(f), f = d && e && f, h = g.length, i, t; - 1 < --h;) {
                t = g[h]; (f || t instanceof c || (i = t.target === t.vars.onComplete) && e || d && !i) && t.paused(b)
            }
        };
        h.progress = function(b) {
            return ! arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * b + this._cycle * this._duration, false)
        };
        h.totalProgress = function(b) {
            return ! arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * b, false)
        };
        h.time = function(b, c) {
            if (!arguments.length) return this._time;
            this._dirty && this.totalDuration();
            b > this._duration && (b = this._duration);
            this._yoyo && 0 !== (this._cycle & 1) ? b = this._duration - b + this._cycle * (this._duration + this._repeatDelay) : 0 != this._repeat && (b = b + this._cycle * (this._duration + this._repeatDelay));
            return this.totalTime(b, c)
        };
        h.totalDuration = function(b) {
            return ! arguments.length ? (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = false), this._totalDuration) : -1 == this._repeat ? this: this.duration((b - this._repeat * this._repeatDelay) / (this._repeat + 1))
        };
        h.repeat = function(b) {
            if (!arguments.length) return this._repeat;
            this._repeat = b;
            return this._uncache(true)
        };
        h.repeatDelay = function(b) {
            if (!arguments.length) return this._repeatDelay;
            this._repeatDelay = b;
            return this._uncache(true)
        };
        h.yoyo = function(b) {
            if (!arguments.length) return this._yoyo;
            this._yoyo = b;
            return this
        };
        return f
    },
    true);
    _gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"],
    function(b, c, d) {
        var f = function(b) {
            c.call(this, b);
            this._labels = {};
            this.autoRemoveChildren = true == this.vars.autoRemoveChildren;
            this.smoothChildTiming = true == this.vars.smoothChildTiming;
            this._sortChildren = true;
            this._onUpdate = this.vars.onUpdate;
            for (var b = h.length,
            d, e; - 1 < --b;) if (e = this.vars[h[b]]) for (d = e.length; - 1 < --d;)"{self}" === e[d] && (e = this.vars[h[b]] = e.concat(), e[d] = this);
            this.vars.tweens instanceof Array && this.insertMultiple(this.vars.tweens, 0, this.vars.align || "normal", this.vars.stagger || 0)
        },
        h = ["onStartParams", "onUpdateParams", "onCompleteParams", "onReverseCompleteParams", "onRepeatParams"],
        g = [],
        e = f.prototype = new c;
        e.constructor = f;
        e.kill()._gc = false;
        e.to = function(b, c, e, f, g) {
            return this.insert(new d(b, c, e), this._parseTimeOrLabel(g) + (f || 0))
        };
        e.from = function(b, c, e, f, g) {
            return this.insert(d.from(b, c, e), this._parseTimeOrLabel(g) + (f || 0))
        };
        e.fromTo = function(b, c, e, f, g, h) {
            return this.insert(d.fromTo(b, c, e, f), this._parseTimeOrLabel(h) + (g || 0))
        };
        e.staggerTo = function(b, c, e, g, h, v, o, x, z) {
            o = new f({
                onComplete: o,
                onCompleteParams: x,
                onCompleteScope: z
            });
            g = g || 0;
            for (x = 0; x < b.length; x++) o.insert(new d(b[x], c, e), x * g);
            return this.insert(o, this._parseTimeOrLabel(v) + (h || 0))
        };
        e.staggerFrom = function(b, c, d, e, f, g, h, x, z) {
            null == d.immediateRender && (d.immediateRender = true);
            d.runBackwards = true;
            return this.staggerTo(b, c, d, e, f, g, h, x, z)
        };
        e.staggerFromTo = function(b, c, d, e, f, g, h, x, z, t) {
            e.startAt = d;
            d.immediateRender && (e.immediateRender = true);
            return this.staggerTo(b, c, e, f, g, h, x, z, t)
        };
        e.call = function(b, c, e, f, g) {
            return this.insert(d.delayedCall(0, b, c, e), this._parseTimeOrLabel(g) + (f || 0))
        };
        e.set = function(b, c, e, f) {
            c.immediateRender = false;
            return this.insert(new d(b, 0, c), this._parseTimeOrLabel(f) + (e || 0))
        };
        f.exportRoot = function(b, c) {
            b = b || {};
            null == b.smoothChildTiming && (b.smoothChildTiming = true);
            var e = new f(b),
            g = e._timeline;
            null == c && (c = true);
            g._remove(e, true);
            e._startTime = 0;
            e._rawPrevTime = e._time = e._totalTime = g._time;
            for (var h = g._first,
            v; h;) {
                v = h._next; (!c || !(h instanceof d && h.target == h.vars.onComplete)) && e.insert(h, h._startTime - h._delay);
                h = v
            }
            g.insert(e, 0);
            return e
        };
        e.insert = function(e, f) {
            if (! (e instanceof b)) {
                if (e instanceof Array) return this.insertMultiple(e, f);
                if ("string" === typeof e) return this.addLabel(e, this._parseTimeOrLabel(f || 0, true));
                if ("function" === typeof e) e = d.delayedCall(0, e);
                else throw "ERROR: Cannot insert() " + e + " into the TimelineLite/Max because it is neither a tween, timeline, function, nor a String.";
            }
            c.prototype.insert.call(this, e, this._parseTimeOrLabel(f || 0, true));
            if (this._gc && !this._paused && this._time === this._duration && this._time < this.duration()) for (var g = this; g._gc && g._timeline;) {
                g._timeline.smoothChildTiming ? g.totalTime(g._totalTime, true) : g._enabled(true, false);
                g = g._timeline
            }
            return this
        };
        e.remove = function(c) {
            if (c instanceof b) return this._remove(c, false);
            if (c instanceof Array) {
                for (var e = c.length; - 1 < --e;) this.remove(c[e]);
                return this
            }
            return "string" === typeof c ? this.removeLabel(c) : this.kill(null, c)
        };
        e.append = function(b, c) {
            return this.insert(b, this.duration() + (c || 0))
        };
        e.insertMultiple = function(b, c, e, d) {
            for (var e = e || "normal",
            d = d || 0,
            g, h = this._parseTimeOrLabel(c || 0, true), o = b.length, c = 0; c < o; c++) {
                if ((g = b[c]) instanceof Array) g = new f({
                    tweens: g
                });
                this.insert(g, h);
                "string" === typeof g || "function" === typeof g || ("sequence" === e ? h = g._startTime + g.totalDuration() / g._timeScale: "start" === e && (g._startTime = g._startTime - g.delay()));
                h = h + d
            }
            return this._uncache(true)
        };
        e.appendMultiple = function(b, c, e, d) {
            return this.insertMultiple(b, this.duration() + (c || 0), e, d)
        };
        e.addLabel = function(b, c) {
            this._labels[b] = c;
            return this
        };
        e.removeLabel = function(b) {
            delete this._labels[b];
            return this
        };
        e.getLabelTime = function(b) {
            return null != this._labels[b] ? this._labels[b] : -1
        };
        e._parseTimeOrLabel = function(b, c) {
            return null == b ? this.duration() : "string" === typeof b && isNaN(b) ? null == this._labels[b] ? c ? this._labels[b] = this.duration() : 0 : this._labels[b] : Number(b)
        };
        e.seek = function(b, c) {
            return this.totalTime(this._parseTimeOrLabel(b, false), false != c)
        };
        e.stop = function() {
            return this.paused(true)
        };
        e.gotoAndPlay = function(b, e) {
            return c.prototype.play.call(this, b, e)
        };
        e.gotoAndStop = function(b, c) {
            return this.pause(b, c)
        };
        e.render = function(b, c, e) {
            this._gc && this._enabled(true, false);
            this._active = !this._paused;
            var d = !this._dirty ? this._totalDuration: this.totalDuration(),
            f = this._time,
            h = this._startTime,
            o = this._timeScale,
            x = this._paused,
            z,
            t,
            p;
            if (b >= d) {
                this._totalTime = this._time = d;
                if (!this._reversed && !this._hasPausedChild() && (z = true, p = "onComplete", 0 === this._duration && (0 === b || 0 > this._rawPrevTime))) this._rawPrevTime !== b && (e = true);
                this._rawPrevTime = b;
                b = d + 1E-6
            } else if (0 >= b) {
                this._totalTime = this._time = 0;
                if (0 !== f || 0 === this._duration && 0 < this._rawPrevTime) {
                    p = "onReverseComplete";
                    z = this._reversed
                }
                0 > b ? (this._active = false, 0 === this._duration && 0 <= this._rawPrevTime && (e = true)) : this._initted || (e = true);
                this._rawPrevTime = b;
                b = -1E-6
            } else this._totalTime = this._time = this._rawPrevTime = b;
            if (this._time !== f || e) {
                this._initted || (this._initted = true);
                0 === f && this.vars.onStart && 0 !== this._time && (c || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || g));
                if (this._time > f) for (e = this._first; e;) {
                    t = e._next;
                    if (this._paused && !x) break;
                    else if (e._active || e._startTime <= this._time && !e._paused && !e._gc) e._reversed ? e.render((!e._dirty ? e._totalDuration: e.totalDuration()) - (b - e._startTime) * e._timeScale, c, false) : e.render((b - e._startTime) * e._timeScale, c, false);
                    e = t
                } else for (e = this._last; e;) {
                    t = e._prev;
                    if (this._paused && !x) break;
                    else if (e._active || e._startTime <= f && !e._paused && !e._gc) e._reversed ? e.render((!e._dirty ? e._totalDuration: e.totalDuration()) - (b - e._startTime) * e._timeScale, c, false) : e.render((b - e._startTime) * e._timeScale, c, false);
                    e = t
                }
                this._onUpdate && (c || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || g));
                if (p && !this._gc && (h === this._startTime || o != this._timeScale)) if (0 === this._time || d >= this.totalDuration()) {
                    z && (this._timeline.autoRemoveChildren && this._enabled(false, false), this._active = false);
                    c || this.vars[p] && this.vars[p].apply(this.vars[p + "Scope"] || this, this.vars[p + "Params"] || g)
                }
            }
        };
        e._hasPausedChild = function() {
            for (var b = this._first; b;) {
                if (b._paused || b instanceof f && b._hasPausedChild()) return true;
                b = b._next
            }
            return false
        };
        e.getChildren = function(b, c, e, g) {
            for (var g = g || -9999999999,
            f = [], h = this._first, o = 0; h;) {
                h._startTime < g || (h instanceof d ? false != c && (f[o++] = h) : (false != e && (f[o++] = h), false != b && (f = f.concat(h.getChildren(true, c, e)), o = f.length)));
                h = h._next
            }
            return f
        };
        e.getTweensOf = function(b, c) {
            for (var e = d.getTweensOf(b), f = e.length, g = [], h = 0; - 1 < --f;) if (e[f].timeline === this || c && this._contains(e[f])) g[h++] = e[f];
            return g
        };
        e._contains = function(b) {
            for (b = b.timeline; b;) {
                if (b === this) return true;
                b = b.timeline
            }
            return false
        };
        e.shiftChildren = function(b, e, c) {
            for (var c = c || 0,
            d = this._first; d;) {
                d._startTime >= c && (d._startTime = d._startTime + b);
                d = d._next
            }
            if (e) for (var f in this._labels) this._labels[f] >= c && (this._labels[f] = this._labels[f] + b);
            return this._uncache(true)
        };
        e._kill = function(b, c) {
            if (null == b && null == c) return this._enabled(false, false);
            for (var e = null == c ? this.getChildren(true, true, false) : this.getTweensOf(c), d = e.length, f = false; - 1 < --d;) e[d]._kill(b, c) && (f = true);
            return f
        };
        e.clear = function(b) {
            var c = this.getChildren(false, true, true),
            e = c.length;
            for (this._time = this._totalTime = 0; - 1 < --e;) c[e]._enabled(false, false);
            false != b && (this._labels = {});
            return this._uncache(true)
        };
        e.invalidate = function() {
            for (var b = this._first; b;) {
                b.invalidate();
                b = b._next
            }
            return this
        };
        e._enabled = function(b, e) {
            if (b == this._gc) for (var d = this._first; d;) {
                d._enabled(b, true);
                d = d._next
            }
            return c.prototype._enabled.call(this, b, e)
        };
        e.progress = function(b) {
            return ! arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * b, false)
        };
        e.duration = function(b) {
            if (!arguments.length) return this._dirty && this.totalDuration(),
            this._duration;
            0 !== this.duration() && 0 !== b && this.timeScale(this._duration / b);
            return this
        };
        e.totalDuration = function(b) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var c = 0,
                    e = this._first,
                    d = -999999999999,
                    f; e;) {
                        f = e._next;
                        e._startTime < d && this._sortChildren ? this.insert(e, e._startTime - e._delay) : d = e._startTime;
                        0 > e._startTime && (c = c - e._startTime, this.shiftChildren( - e._startTime, false, -9999999999));
                        e = e._startTime + (!e._dirty ? e._totalDuration: e.totalDuration()) / e._timeScale;
                        e > c && (c = e);
                        e = f
                    }
                    this._duration = this._totalDuration = c;
                    this._dirty = false
                }
                return this._totalDuration
            }
            0 !== this.totalDuration() && 0 !== b && this.timeScale(this._totalDuration / b);
            return this
        };
        e.usesFrames = function() {
            for (var e = this._timeline; e._timeline;) e = e._timeline;
            return e === b._rootFramesTimeline
        };
        e.rawTime = function() {
            return this._paused || 0 !== this._totalTime && this._totalTime !== this._totalDuration ? this._totalTime: (this._timeline.rawTime() - this._startTime) * this._timeScale
        };
        return f
    },
    true);
    _gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"],
    function(b, c, d) {
        var f = function(e) {
            b.call(this, e);
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._cycle = 0;
            this._yoyo = true == this.vars.yoyo;
            this._dirty = true
        },
        h = [],
        g = new d(null, null, 1, 0),
        d = f.prototype = new b;
        d.constructor = f;
        d.kill()._gc = false;
        f.version = 12;
        d.invalidate = function() {
            this._yoyo = true == this.vars.yoyo;
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._uncache(true);
            return b.prototype.invalidate.call(this)
        };
        d.addCallback = function(b, d, f, g) {
            return this.insert(c.delayedCall(0, b, f, g), d)
        };
        d.removeCallback = function(b, c) {
            if (null == c) this._kill(null, b);
            else for (var d = this.getTweensOf(b, false), f = d.length, g = this._parseTimeOrLabel(c, false); - 1 < --f;) d[f]._startTime === g && d[f]._enabled(false, false);
            return this
        };
        d.tweenTo = function(b, d) {
            var d = d || {},
            f = {
                ease: g,
                overwrite: 2,
                useFrames: this.usesFrames(),
                immediateRender: false
            },
            q,
            k;
            for (q in d) f[q] = d[q];
            f.time = this._parseTimeOrLabel(b, false);
            k = new c(this, Math.abs(Number(f.time) - this._time) / this._timeScale || 0.001, f);
            f.onStart = function() {
                k.target.paused(true);
                k.vars.time != k.target.time() && k.duration(Math.abs(k.vars.time - k.target.time()) / k.target._timeScale);
                d.onStart && d.onStart.apply(d.onStartScope || k, d.onStartParams || h)
            };
            return k
        };
        d.tweenFromTo = function(b, c, d) {
            d = d || {};
            d.startAt = {
                time: this._parseTimeOrLabel(b, false)
            };
            b = this.tweenTo(c, d);
            return b.duration(Math.abs(b.vars.time - b.vars.startAt.time) / this._timeScale || 0.001)
        };
        d.render = function(b, c, d) {
            this._gc && this._enabled(true, false);
            this._active = !this._paused;
            var f = !this._dirty ? this._totalDuration: this.totalDuration(),
            g = this._time,
            n = this._totalTime,
            v = this._startTime,
            o = this._timeScale,
            x = this._rawPrevTime,
            z = this._paused,
            t = this._cycle,
            p,
            w;
            if (b >= f) {
                this._locked || (this._totalTime = f, this._cycle = this._repeat);
                if (!this._reversed && !this._hasPausedChild() && (p = true, w = "onComplete", 0 === this._duration && (0 === b || 0 > this._rawPrevTime))) this._rawPrevTime !== b && (d = true);
                this._rawPrevTime = b;
                this._yoyo && 0 !== (this._cycle & 1) ? (this._time = 0, b = -1E-6) : (this._time = this._duration, b = this._duration + 1E-6)
            } else if (0 >= b) {
                this._locked || (this._totalTime = this._cycle = 0);
                this._time = 0;
                if (0 !== g || 0 === this._duration && 0 < this._rawPrevTime) {
                    w = "onReverseComplete";
                    p = this._reversed
                }
                0 > b ? (this._active = false, 0 === this._duration && 0 <= this._rawPrevTime && (d = true)) : this._initted || (d = true);
                this._rawPrevTime = b;
                b = -1E-6
            } else if (this._time = this._rawPrevTime = b, !this._locked && (this._totalTime = b, 0 !== this._repeat))(b = this._duration + this._repeatDelay, this._cycle = this._totalTime / b >> 0, 0 !== this._cycle && this._cycle === this._totalTime / b && this._cycle--, this._time = this._totalTime - this._cycle * b, this._yoyo && 0 != (this._cycle & 1) && (this._time = this._duration - this._time), this._time > this._duration) ? (this._time = this._duration, b = this._duration + 1E-6) : 0 > this._time ? (this._time = 0, b = -1E-6) : b = this._time;
            if (this._cycle !== t && !this._locked) {
                var u = this._yoyo && 0 !== (t & 1),
                y = u === (this._yoyo && 0 !== (this._cycle & 1)),
                D = this._totalTime,
                G = this._cycle,
                E = this._rawPrevTime,
                B = this._time;
                this._totalTime = t * this._duration;
                this._cycle < t ? u = !u: this._totalTime = this._totalTime + this._duration;
                this._time = g;
                this._rawPrevTime = x;
                this._cycle = t;
                this._locked = true;
                g = u ? 0 : this._duration;
                this.render(g, c, false);
                c || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, vars.onRepeatParams || h);
                y && (g = u ? this._duration + 1E-6: -1E-6, this.render(g, true, false));
                this._time = B;
                this._totalTime = D;
                this._cycle = G;
                this._rawPrevTime = E;
                this._locked = false
            }
            if (this._time !== g || d) {
                this._initted || (this._initted = true);
                0 === n && this.vars.onStart && 0 !== this._totalTime && (c || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || h));
                if (this._time > g) for (d = this._first; d;) {
                    n = d._next;
                    if (this._paused && !z) break;
                    else if (d._active || d._startTime <= this._time && !d._paused && !d._gc) d._reversed ? d.render((!d._dirty ? d._totalDuration: d.totalDuration()) - (b - d._startTime) * d._timeScale, c, false) : d.render((b - d._startTime) * d._timeScale, c, false);
                    d = n
                } else for (d = this._last; d;) {
                    n = d._prev;
                    if (this._paused && !z) break;
                    else if (d._active || d._startTime <= g && !d._paused && !d._gc) d._reversed ? d.render((!d._dirty ? d._totalDuration: d.totalDuration()) - (b - d._startTime) * d._timeScale, c, false) : d.render((b - d._startTime) * d._timeScale, c, false);
                    d = n
                }
                this._onUpdate && (c || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || h));
                if (w && !this._locked && !this._gc && (v === this._startTime || o != this._timeScale)) if (0 === this._time || f >= this.totalDuration()) {
                    p && (this._timeline.autoRemoveChildren && this._enabled(false, false), this._active = false);
                    c || this.vars[w] && this.vars[w].apply(this.vars[w + "Scope"] || this, this.vars[w + "Params"] || h)
                }
            }
        };
        d.getActive = function(b, c, d) {
            null == b && (b = true);
            null == c && (c = true);
            null == d && (d = false);
            var f = [],
            b = this.getChildren(b, c, d),
            c = 0,
            d = b.length,
            g,
            h;
            for (g = 0; g < d; g++) if (h = b[g], !h._paused && h._timeline._totalTime >= h._startTime && h._timeline._totalTime < h._startTime + h._totalDuration / h._timeScale) {
                var v;
                a: {
                    for (v = h._timeline; v;) {
                        if (v._paused) {
                            v = true;
                            break a
                        }
                        v = v._timeline
                    }
                    v = false
                }
                v || (f[c++] = h)
            }
            return f
        };
        d.getLabelAfter = function(b) { ! b && 0 !== b && (b = this._time);
            var c = this._getLabelsArray(),
            d = c.length,
            f;
            for (f = 0; f < d; f++) if (c[f].time > b) return c[f].name;
            return null
        };
        d.getLabelBefore = function(b) {
            null == b && (b = this._time);
            for (var c = this._getLabelsArray(), d = c.length; - 1 < --d;) if (c[d].time < b) return c[d].name;
            return null
        };
        d._getLabelsArray = function() {
            var b = [],
            c = 0,
            d;
            for (d in this._labels) b[c++] = {
                time: this._labels[d],
                name: d
            };
            b.sort(function(b, c) {
                return b.time - c.time
            });
            return b
        };
        d.progress = function(b) {
            return ! arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * b + this._cycle * this._duration, false)
        };
        d.totalProgress = function(b) {
            return ! arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * b, false)
        };
        d.totalDuration = function(c) {
            return ! arguments.length ? (this._dirty && (b.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration) : -1 == this._repeat ? this: this.duration((c - this._repeat * this._repeatDelay) / (this._repeat + 1))
        };
        d.time = function(b, c) {
            if (!arguments.length) return this._time;
            this._dirty && this.totalDuration();
            b > this._duration && (b = this._duration);
            this._yoyo && 0 !== (this._cycle & 1) ? b = this._duration - b + this._cycle * (this._duration + this._repeatDelay) : 0 != this._repeat && (b = b + this._cycle * (this._duration + this._repeatDelay));
            return this.totalTime(b, c)
        };
        d.repeat = function(b) {
            if (!arguments.length) return this._repeat;
            this._repeat = b;
            return this._uncache(true)
        };
        d.repeatDelay = function(b) {
            if (!arguments.length) return this._repeatDelay;
            this._repeatDelay = b;
            return this._uncache(true)
        };
        d.yoyo = function(b) {
            if (!arguments.length) return this._yoyo;
            this._yoyo = b;
            return this
        };
        d.currentLabel = function(b) {
            return ! arguments.length ? this.getLabelBefore(this._time + 1E-8) : this.seek(b, true)
        };
        return f
    },
    true);
    _gsDefine("plugins.BezierPlugin", ["plugins.TweenPlugin"],
    function(b) {
        var c = function() {
            b.call(this, "bezier", -1);
            this._overwriteProps.pop();
            this._func = {};
            this._round = {}
        },
        d = c.prototype = new b("bezier", 1),
        f = 180 / Math.PI,
        h = [],
        g = [],
        e = [],
        m = {},
        i = function(b, c, d, e) {
            this.a = b;
            this.b = c;
            this.c = d;
            this.d = e;
            this.da = e - b;
            this.ca = d - b;
            this.ba = c - b
        },
        q = c.bezierThrough = function(b, c, d, f, q, t) {
            var p = {},
            w = [],
            u,
            y,
            q = "string" === typeof q ? "," + q + ",": ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,";
            null == c && (c = 1);
            for (y in b[0]) w.push(y);
            h.length = g.length = e.length = 0;
            for (u = w.length; - 1 < --u;) {
                y = w[u];
                m[y] = -1 !== q.indexOf("," + y + ",");
                var D = p,
                G = y,
                E;
                E = b;
                var B = y,
                I = m[y],
                H = t,
                K = [],
                J = void 0,
                C = void 0,
                A = void 0,
                s = void 0,
                F = void 0;
                if (H) {
                    E = [H].concat(E);
                    for (C = E.length; - 1 < --C;) if ("string" === typeof(J = E[C][B]))"=" === J.charAt(1) && (E[C][B] = H[B] + Number(J.charAt(0) + J.substr(2)))
                }
                J = E.length - 2;
                if (0 > J) K[0] = new i(E[0][B], 0, 0, E[ - 1 > J ? 0 : 1][B]);
                else {
                    for (C = 0; C < J; C++) {
                        A = E[C][B];
                        s = E[C + 1][B];
                        K[C] = new i(A, 0, 0, s);
                        I && (F = E[C + 2][B], h[C] = (h[C] || 0) + (s - A) * (s - A), g[C] = (g[C] || 0) + (F - s) * (F - s))
                    }
                    K[C] = new i(E[C][B], 0, 0, E[C + 1][B])
                }
                E = K;
                D[G] = E
            }
            for (u = h.length; - 1 < --u;) {
                h[u] = Math.sqrt(h[u]);
                g[u] = Math.sqrt(g[u])
            }
            if (!f) {
                for (u = w.length; - 1 < --u;) if (m[y]) {
                    a = p[w[u]];
                    l = a.length - 1;
                    for (j = 0; j < l; j++) {
                        r = a[j + 1].da / g[j] + a[j].da / h[j];
                        e[j] = (e[j] || 0) + r * r
                    }
                }
                for (u = e.length; - 1 < --u;) e[u] = Math.sqrt(e[u])
            }
            for (u = w.length; - 1 < --u;) {
                y = w[u];
                b = p[y];
                q = c;
                t = d;
                D = f;
                y = m[y];
                G = b.length - 1;
                E = 0;
                for (var B = b[0].a, L = F = s = H = J = s = J = H = void 0, I = 0; I < G; I++) {
                    C = b[E];
                    H = C.a;
                    K = C.d;
                    A = b[E + 1].d;
                    y ? (s = h[I], F = g[I], L = 0.25 * (F + s) * q / (D ? 0.5 : e[I] || 0.5), J = K - (K - H) * (D ? 0.5 * q: L / s), A = K + (A - K) * (D ? 0.5 * q: L / F), s = K - (J + (A - J) * (3 * s / (s + F) + 0.5) / 4)) : (J = K - 0.5 * (K - H) * q, A = K + 0.5 * (A - K) * q, s = K - (J + A) / 2);
                    J = J + s;
                    A = A + s;
                    C.c = J;
                    C.b = 0 != I ? B: B = C.a + 0.6 * (C.c - C.a);
                    C.da = K - H;
                    C.ca = J - H;
                    C.ba = B - H;
                    t ? (H = k(H, B, J, K), b.splice(E, 1, H[0], H[1], H[2], H[3]), E = E + 4) : E++;
                    B = A
                }
                C = b[E];
                C.b = B;
                C.c = B + 0.4 * (C.d - B);
                C.da = C.d - C.a;
                C.ca = C.c - C.a;
                C.ba = B - C.a;
                t && (H = k(C.a, B, C.c, C.d), b.splice(E, 1, H[0], H[1], H[2], H[3]))
            }
            return p
        },
        k = c.cubicToQuadratic = function(b, c, d, e) {
            var f = {
                a: b
            },
            g = {},
            h = {},
            k = {
                c: e
            },
            i = (b + c) / 2,
            m = (c + d) / 2,
            d = (d + e) / 2,
            c = (i + m) / 2,
            m = (m + d) / 2,
            q = (m - c) / 8;
            f.b = i + (b - i) / 4;
            g.b = c + q;
            f.c = g.a = (f.b + g.b) / 2;
            g.c = h.a = (c + m) / 2;
            h.b = m - q;
            k.b = d + (e - d) / 4;
            h.c = k.a = (h.b + k.b) / 2;
            return [f, g, h, k]
        };
        c.quadraticToCubic = function(b, c, d) {
            return new i(b, (2 * c + b) / 3, (2 * c + d) / 3, d)
        };
        d.constructor = c;
        c.API = 2;
        d._onInitTween = function(b, c, d) {
            this._target = b;
            c instanceof Array && (c = {
                values: c
            });
            this._props = [];
            this._timeRes = null == c.timeResolution ? 6 : parseInt(c.timeResolution);
            var e = c.values || [],
            f = {},
            g = e[0],
            d = c.autoRotate || d.vars.orientToBezier,
            h,
            k,
            m;
            this._autoRotate = d ? d instanceof Array ? d: [["x", "y", "rotation", true === d ? 0 : Number(d) || 0]] : null;
            for (h in g) this._props.push(h);
            for (g = this._props.length; - 1 < --g;) {
                h = this._props[g];
                this._overwriteProps.push(h);
                d = this._func[h] = "function" === typeof b[h];
                f[h] = !d ? parseFloat(b[h]) : b[h.indexOf("set") || "function" !== typeof b["get" + h.substr(3)] ? h: "get" + h.substr(3)]();
                m || f[h] !== e[0][h] && (m = f)
            }
            if ("cubic" !== c.type && "quadratic" !== c.type && "soft" !== c.type) f = q(e, isNaN(c.curviness) ? 1 : c.curviness, false, "thruBasic" === c.type, c.correlate, m);
            else {
                d = (d = c.type) || "soft";
                c = {};
                m = "cubic" === d ? 3 : 2;
                var d = "soft" === d,
                g = [],
                y,
                D,
                G,
                E,
                B,
                I,
                H,
                K,
                J;
                d && f && (e = [f].concat(e));
                if (null == e || e.length < m + 1) throw "invalid Bezier data";
                for (D in e[0]) g.push(D);
                for (I = g.length; - 1 < --I;) {
                    D = g[I];
                    c[D] = B = [];
                    J = 0;
                    K = e.length;
                    for (H = 0; H < K; H++) {
                        y = null == f ? e[H][D] : "string" === typeof(G = e[H][D]) && "=" === G.charAt(1) ? f[D] + Number(G.charAt(0) + G.substr(2)) : Number(G);
                        d && 1 < H && H < K - 1 && (B[J++] = (y + B[J - 2]) / 2);
                        B[J++] = y
                    }
                    K = J - m + 1;
                    for (H = J = 0; H < K; H = H + m) {
                        y = B[H];
                        D = B[H + 1];
                        G = B[H + 2];
                        E = 2 === m ? 0 : B[H + 3];
                        B[J++] = G = 3 === m ? new i(y, D, G, E) : new i(y, (2 * D + y) / 3, (2 * D + G) / 3, G)
                    }
                    B.length = J
                }
                f = c
            }
            this._beziers = f;
            this._segCount = this._beziers[h].length;
            if (this._timeRes) {
                g = this._beziers;
                h = this._timeRes;
                h = h >> 0 || 6;
                f = [];
                D = [];
                e = G = 0;
                c = h - 1;
                m = [];
                d = [];
                for (k in g) {
                    y = g[k];
                    B = f;
                    I = h;
                    H = 1 / I;
                    K = y.length;
                    for (var C = void 0,
                    A = void 0,
                    s = void 0,
                    F = void 0,
                    L = void 0; - 1 < --K;) {
                        s = y[K];
                        A = s.a;
                        J = s.d - A;
                        E = s.c - A;
                        s = s.b - A;
                        A = 0;
                        for (F = 1; F <= I; F++) {
                            C = H * F;
                            L = 1 - C;
                            C = A - (A = (C * C * J + 3 * L * (C * E + L * s)) * C);
                            L = K * I + F - 1;
                            B[L] = (B[L] || 0) + C * C
                        }
                    }
                }
                g = f.length;
                for (k = 0; k < g; k++) {
                    G = G + Math.sqrt(f[k]);
                    y = k % h;
                    d[y] = G;
                    y === c && (e = e + G, y = k / h >> 0, m[y] = d, D[y] = e, G = 0, d = [])
                }
                this._length = e;
                this._lengths = D;
                this._segments = m;
                this._l1 = this._li = this._s1 = this._si = 0;
                this._l2 = this._lengths[0];
                this._curSeg = this._segments[0];
                this._s2 = this._curSeg[0];
                this._prec = 1 / this._curSeg.length
            }
            if (d = this._autoRotate) {
                d[0] instanceof Array || (this._autoRotate = d = [d]);
                for (g = d.length; - 1 < --g;) for (k = 0; 3 > k; k++) {
                    h = d[g][k];
                    this._func[h] = "function" === typeof b[h] ? b[h.indexOf("set") || "function" !== typeof b["get" + h.substr(3)] ? h: "get" + h.substr(3)] : false
                }
            }
            return true
        };
        d.setRatio = function(b) {
            var c = this._segCount,
            d = this._func,
            e = this._target,
            g, h, k, i, m;
            if (this._timeRes) {
                g = this._lengths;
                i = this._curSeg;
                b = b * this._length;
                h = this._li;
                if (b > this._l2 && h < c - 1) {
                    for (c = c - 1; h < c && (this._l2 = g[++h]) <= b;);
                    this._l1 = g[h - 1];
                    this._li = h;
                    this._curSeg = i = this._segments[h];
                    this._s2 = i[this._s1 = this._si = 0]
                } else if (b < this._l1 && 0 < h) {
                    for (; 0 < h && (this._l1 = g[--h]) >= b;);
                    0 === h && b < this._l1 ? this._l1 = 0 : h++;
                    this._l2 = g[h];
                    this._li = h;
                    this._curSeg = i = this._segments[h];
                    this._s1 = i[(this._si = i.length - 1) - 1] || 0;
                    this._s2 = i[this._si]
                }
                g = h;
                b = b - this._l1;
                h = this._si;
                if (b > this._s2 && h < i.length - 1) {
                    for (c = i.length - 1; h < c && (this._s2 = i[++h]) <= b;);
                    this._s1 = i[h - 1];
                    this._si = h
                } else if (b < this._s1 && 0 < h) {
                    for (; 0 < h && (this._s1 = i[--h]) >= b;);
                    0 === h && b < this._s1 ? this._s1 = 0 : h++;
                    this._s2 = i[h];
                    this._si = h
                }
                i = (h + (b - this._s1) / (this._s2 - this._s1)) * this._prec
            } else {
                g = 0 > b ? 0 : 1 <= b ? c - 1 : c * b >> 0;
                i = (b - g * (1 / c)) * c
            }
            c = 1 - i;
            for (h = this._props.length; - 1 < --h;) if (b = this._props[h], k = this._beziers[b][g], m = (i * i * k.da + 3 * c * (i * k.ca + c * k.ba)) * i + k.a, this._round[b] && (m = m + (0 < m ? 0.5 : -0.5) >> 0), d[b]) e[b](m);
            else e[b] = m;
            if (this._autoRotate) {
                var c = this._autoRotate,
                q, D, G, E, B;
                for (h = c.length; - 1 < --h;) {
                    b = c[h][2];
                    E = c[h][3] || 0;
                    B = true == c[h][4] ? 1 : f;
                    k = this._beziers[c[h][0]][g];
                    m = this._beziers[c[h][1]][g];
                    q = k.a + (k.b - k.a) * i;
                    D = k.b + (k.c - k.b) * i;
                    q = q + (D - q) * i;
                    D = D + (k.c + (k.d - k.c) * i - D) * i;
                    k = m.a + (m.b - m.a) * i;
                    G = m.b + (m.c - m.b) * i;
                    k = k + (G - k) * i;
                    G = G + (m.c + (m.d - m.c) * i - G) * i;
                    m = Math.atan2(G - k, D - q) * B + E;
                    d[b] ? d[b].call(e, m) : e[b] = m
                }
            }
        };
        d._roundProps = function(b, c) {
            for (var d = this._overwriteProps,
            e = d.length; - 1 < --e;) if (b[d[e]] || b.bezier || b.bezierThrough) this._round[d[e]] = c
        };
        d._kill = function(c) {
            var d = this._props,
            e, f;
            for (e in _beziers) if (e in c) {
                delete this._beziers[e];
                delete this._func[e];
                for (f = d.length; - 1 < --f;) d[f] === e && d.splice(f, 1)
            }
            return b.prototype._kill.call(this, c)
        };
        b.activate([c]);
        return c
    },
    true);
    _gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"],
    function(b) {
        var c = function() {
            b.call(this, "css");
            this._overwriteProps.pop()
        },
        d = c.prototype = new b("css");
        d.constructor = c;
        c.API = 2;
        c.suffixMap = {
            top: "px",
            right: "px",
            bottom: "px",
            left: "px",
            width: "px",
            height: "px",
            fontSize: "px",
            padding: "px",
            margin: "px"
        };
        var f = /[^\d\-\.]/g,
        h = /(\d|\-|\+|=|#|\.)*/g,
        g = /(\d|\.)+/g,
        e = /opacity *= *([^)]*)/,
        m = /opacity:([^;]*)/,
        i = /([A-Z])/g,
        q = /-([a-z])/gi,
        k = function(b, c) {
            return c.toUpperCase()
        },
        n = /(Left|Right|Width)/i,
        v = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        o = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        x = Math.PI / 180,
        z = 180 / Math.PI,
        t = {},
        p = document.createElement("div"),
        w,
        u,
        y = document.createElement("div"),
        D;
        y.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
        u = (D = y.getElementsByTagName("a")[0]) ? /^0.55/.test(D.style.opacity) : false;
        var G;
        /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent);
        G = parseFloat(RegExp.$1);
        var E = function(b) {
            return ! b || "" === b ? R.black: R[b] ? R[b] : "number" === typeof b ? [b >> 16, b >> 8 & 255, b & 255] : "#" === b.charAt(0) ? (4 === b.length && (b = "#" + b.charAt(1) + b.charAt(1) + b.charAt(2) + b.charAt(2) + b.charAt(3) + b.charAt(3)), b = parseInt(b.substr(1), 16), [b >> 16, b >> 8 & 255, b & 255]) : b.match(g) || R.transparent
        },
        B = function(b) {
            return e.test("string" === typeof b ? b: (b.currentStyle ? b.currentStyle.filter: b.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        },
        I = document.defaultView ? document.defaultView.getComputedStyle: function() {},
        H = function(b, c, d, e) {
            return ! u && "opacity" === c ? B(b) : !e && b.style[c] ? b.style[c] : (d = d || I(b, null)) ? (b = d.getPropertyValue(c.replace(i, "-$1").toLowerCase())) || d.length ? b: d[c] : b.currentStyle ? b.currentStyle[c] : null
        },
        K = function(b, c) {
            var d = {},
            e;
            if (c = c || I(b, null)) if (e = c.length) for (; - 1 < --e;) d[c[e].replace(q, k)] = c.getPropertyValue(c[e]);
            else for (e in c) d[e] = c[e];
            else if (c = b.currentStyle || b.style) for (e in c) d[e.replace(q, k)] = c[e];
            u || (d.opacity = B(b));
            e = T(b, c, false);
            d.rotation = e.rotation * z;
            d.skewX = e.skewX * z;
            d.scaleX = e.scaleX;
            d.scaleY = e.scaleY;
            d.x = e.x;
            d.y = e.y;
            null != d.filters && delete d.filters;
            return d
        },
        J = function(b, c, d, e) {
            var f = {},
            h, g;
            for (g in c) if ("cssText" !== g && "length" !== g && isNaN(g) && b[g] != (h = c[g])) if (h !== A && ("number" === typeof h || "string" === typeof h)) {
                f[g] = h;
                e && e.props.push(g)
            }
            if (d) for (g in d)"className" !== g && (f[g] = d[g]);
            return f
        },
        C = {
            scaleX: 1,
            scaleY: 1,
            x: 1,
            y: 1,
            rotation: 1,
            shortRotation: 1,
            skewX: 1,
            skewY: 1,
            scale: 1
        },
        A,
        s,
        y = document.body || document.documentElement;
        D = I(y, "");
        for (var F = ["O", "-o-", "Moz", "-moz-", "ms", "-ms-", "Webkit", "-webkit-"], L = 9; - 1 < (L = L - 2) && !H(y, F[L] + "transform", D););
        0 < L ? (A = F[L - 1] + "Transform", s = F[L]) : s = null;
        var y = navigator.userAgent,
        M = false,
        V = -1 !== y.indexOf("Safari") && -1 === y.indexOf("Chrome") && -1 === y.indexOf("Android"),
        T = function(b, c, d) {
            var e = b._gsTransform,
            f;
            A ? f = H(b, s + "transform", c, true) : b.currentStyle && (f = (f = b.currentStyle.filter.match(v)) && f.length === 4 ? f[0].substr(4) + "," + Number(f[2].substr(4)) + "," + Number(f[1].substr(4)) + "," + f[3].substr(4) + "," + (e ? e.x: 0) + "," + (e ? e.y: 0) : null);
            var c = (f || "").replace(/[^\d\-\.e,]/g, "").split(","),
            h = (f = c.length >= 6) ? Number(c[0]) : 1,
            g = f ? Number(c[1]) : 0,
            k = f ? Number(c[2]) : 0,
            i = f ? Number(c[3]) : 1,
            e = d ? e || {
                skewY: 0
            }: {
                skewY: 0
            },
            m = e.scaleX < 0;
            e.x = f ? Number(c[4]) : 0;
            e.y = f ? Number(c[5]) : 0;
            e.scaleX = Math.sqrt(h * h + g * g);
            e.scaleY = Math.sqrt(i * i + k * k);
            e.rotation = h || g ? Math.atan2(g, h) : e.rotation || 0;
            e.skewX = k || i ? Math.atan2(k, i) + e.rotation: e.skewX || 0;
            if (Math.abs(e.skewX) > Math.PI / 2) if (m) {
                e.scaleX = e.scaleX * -1;
                e.skewX = e.skewX + (e.rotation <= 0 ? Math.PI: -Math.PI);
                e.rotation = e.rotation + (e.rotation <= 0 ? Math.PI: -Math.PI)
            } else {
                e.scaleY = e.scaleY * -1;
                e.skewX = e.skewX + (e.skewX <= 0 ? Math.PI: -Math.PI)
            }
            if (e.rotation < 1E-6 && e.rotation > -1E-6 && (h || g)) e.rotation = 0;
            if (e.skewX < 1E-6 && e.skewX > -1E-6 && (g || k)) e.skewX = 0;
            if (d) b._gsTransform = e;
            return e
        },
        Z = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        },
        P = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        N = function(b, c, d, e, f) {
            if (e === "px" || !e) return d;
            if (e === "auto" || !d) return 0;
            var h = n.test(c),
            g = b,
            s = d < 0;
            s && (d = -d);
            p.style.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;";
            if (e === "%" || e === "em" || !g.appendChild) {
                g = b.parentNode || document.body;
                p.style[h ? "width": "height"] = d + e
            } else p.style[h ? "borderLeftWidth": "borderTopWidth"] = d + e;
            g.appendChild(p);
            h = parseFloat(p[h ? "offsetWidth": "offsetHeight"]);
            g.removeChild(p);
            h === 0 && !f && (h = N(b, c, d, e, true));
            return s ? -h: h
        },
        ba = function(b, c) {
            if (b == null || b === "" || b === "auto") b = "0 0";
            var c = c || {},
            d = b.indexOf("left") !== -1 ? "0%": b.indexOf("right") !== -1 ? "100%": b.split(" ")[0],
            e = b.indexOf("top") !== -1 ? "0%": b.indexOf("bottom") !== -1 ? "100%": b.split(" ")[1];
            e == null ? e = "0": e === "center" && (e = "50%");
            d === "center" && (d = "50%");
            c.oxp = d.indexOf("%") !== -1;
            c.oyp = e.indexOf("%") !== -1;
            c.oxr = d.charAt(1) === "=";
            c.oyr = e.charAt(1) === "=";
            c.ox = parseFloat(d.replace(f, ""));
            c.oy = parseFloat(e.replace(f, ""));
            return c
        },
        O = function(b, c) {
            return b == null ? c: typeof b === "string" && b.indexOf("=") === 1 ? Number(b.split("=").join("")) + c: Number(b)
        },
        W = function(b, c) {
            var d = b.indexOf("rad") === -1 ? x: 1,
            e = b.indexOf("=") === 1,
            b = Number(b.replace(f, "")) * d;
            return e ? b + c: b
        },
        R = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        };
        d._onInitTween = function(b, d, e) {
            if (!b.nodeType) return false;
            this._target = b;
            this._tween = e;
            this._classData = this._transform = null;
            w = d.autoRound;
            var f = this._style = b.style,
            h = I(b, ""),
            g;
            if (M && f.zIndex === "") f.zIndex = 0;
            if (typeof d === "string") {
                g = f.cssText;
                e = K(b, h);
                f.cssText = g + ";" + d;
                e = J(e, K(b));
                if (!u && m.test(d)) val.opacity = parseFloat(RegExp.$1);
                d = e;
                f.cssText = g
            } else if (d.className) {
                g = b.className;
                this._classData = {
                    b: g,
                    e: d.className.charAt(1) !== "=" ? d.className: d.className.charAt(0) === "+" ? b.className + " " + d.className.substr(2) : b.className.split(d.className.substr(2)).join(""),
                    props: []
                };
                if (e._duration) {
                    e = K(b, h);
                    b.className = this._classData.e;
                    d = J(e, K(b), d, this._classData);
                    b.className = g
                } else d = {}
            }
            this._parseVars(d, b, h, d.suffixMap || c.suffixMap);
            return true
        };
        d._parseVars = function(b, c, d, e) {
            var g = this._style,
            s, k, i, m, L, F, n;
            for (s in b) {
                k = b[s];
                if (s === "transform" || s === A) this._parseTransform(c, k, d, e);
                else if (C[s] || s === "transformOrigin") this._parseTransform(c, b, d, e);
                else {
                    if (s === "alpha" || s === "autoAlpha") s = "opacity";
                    else if (s === "margin" || s === "padding") {
                        k = (k + "").split(" ");
                        L = k.length;
                        i = {};
                        i[s + "Top"] = k[0];
                        i[s + "Right"] = L > 1 ? k[1] : k[0];
                        i[s + "Bottom"] = L === 4 ? k[2] : k[0];
                        i[s + "Left"] = L === 4 ? k[3] : L === 2 ? k[1] : k[0];
                        this._parseVars(i, c, d, e);
                        continue
                    } else if (s === "backgroundPosition" || s === "backgroundSize") {
                        i = ba(k);
                        n = ba(m = H(c, s, d));
                        this._firstPT = i = {
                            _next: this._firstPT,
                            t: g,
                            p: s,
                            b: m,
                            f: false,
                            n: "css_" + s,
                            type: 3,
                            s: n.ox,
                            c: i.oxr ? i.ox: i.ox - n.ox,
                            ys: n.oy,
                            yc: i.oyr ? i.oy: i.oy - n.oy,
                            sfx: i.oxp ? "%": "px",
                            ysfx: i.oyp ? "%": "px",
                            r: !i.oxp && b.autoRound !== false
                        };
                        i.e = i.s + i.c + i.sfx + " " + (i.ys + i.yc) + i.ysfx;
                        continue
                    } else if (s === "border") {
                        k = (k + "").split(" ");
                        this._parseVars({
                            borderWidth: k[0],
                            borderStyle: k[1] || "none",
                            borderColor: k[2] || "#000000"
                        },
                        c, d, e);
                        continue
                    } else if (s === "bezier") {
                        this._parseBezier(k, c, d, e);
                        continue
                    } else if (s === "autoRound") continue;
                    m = H(c, s, d);
                    m = m != null ? m + "": "";
                    this._firstPT = i = {
                        _next: this._firstPT,
                        t: g,
                        p: s,
                        b: m,
                        f: false,
                        n: "css_" + s,
                        sfx: "",
                        r: false,
                        type: 0
                    };
                    if (s === "opacity" && b.autoAlpha != null) {
                        if (m === "1" && H(c, "visibility", d) === "hidden") m = i.b = "0";
                        this._firstPT = i._prev = {
                            _next: i,
                            t: g,
                            p: "visibility",
                            f: false,
                            n: "css_visibility",
                            r: false,
                            type: -1,
                            b: Number(m) !== 0 ? "visible": "hidden",
                            i: "visible",
                            e: Number(k) === 0 ? "hidden": "visible"
                        };
                        this._overwriteProps.push("css_visibility")
                    }
                    L = typeof k === "string";
                    if (s === "color" || s === "fill" || s === "stroke" || s.indexOf("Color") !== -1 || L && !k.indexOf("rgb(")) {
                        L = E(m);
                        k = E(k);
                        i.e = i.i = (k.length > 3 ? "rgba(": "rgb(") + k.join(",") + ")";
                        i.b = (L.length > 3 ? "rgba(": "rgb(") + L.join(",") + ")";
                        i.s = Number(L[0]);
                        i.c = Number(k[0]) - i.s;
                        i.gs = Number(L[1]);
                        i.gc = Number(k[1]) - i.gs;
                        i.bs = Number(L[2]);
                        i.bc = Number(k[2]) - i.bs;
                        i.type = 1;
                        if (L.length > 3 || k.length > 3) if (u) {
                            i.as = L.length < 4 ? 1 : Number(L[3]);
                            i.ac = (k.length < 4 ? 1 : Number(k[3])) - i.as;
                            i.type = 2
                        } else if (k[3] == 0) {
                            i.e = i.i = "transparent";
                            i.type = -1
                        }
                    } else {
                        F = m.replace(h, "");
                        if (m === "" || m === "auto") if (s === "width" || s === "height") {
                            var q = s;
                            F = c;
                            n = d;
                            m = parseFloat(q === "width" ? F.offsetWidth: F.offsetHeight);
                            var q = Z[q],
                            o = q.length;
                            for (n = n || I(F, null); --o > -1;) {
                                m = m - (parseFloat(H(F, "padding" + q[o], n, true)) || 0);
                                m = m - (parseFloat(H(F, "border" + q[o] + "Width", n, true)) || 0)
                            }
                            n = m;
                            F = "px"
                        } else {
                            n = s !== "opacity" ? 0 : 1;
                            F = ""
                        } else n = m.indexOf(" ") === -1 ? parseFloat(m.replace(f, "")) : NaN;
                        if (L) {
                            L = k.charAt(1) === "=";
                            m = k.replace(h, "");
                            k = k.indexOf(" ") === -1 ? parseFloat(k.replace(f, "")) : NaN
                        } else {
                            L = false;
                            m = ""
                        }
                        m === "" && (m = e[s] || F);
                        i.e = k || k === 0 ? (L ? k + n: k) + m: b[s];
                        if (F !== m && m !== "" && (k || k === 0)) if (n || n === 0) {
                            n = N(c, s, n, F);
                            if (m === "%") {
                                n = n / (N(c, s, 100, "%") / 100);
                                n > 100 && (n = 100)
                            } else if (m === "em") n = n / N(c, s, 1, "em");
                            else {
                                k = N(c, s, k, m);
                                m = "px"
                            }
                            if (L && (k || k === 0)) i.e = k + n + m
                        }
                        if ((n || n === 0) && (k || k === 0) && (i.c = L ? k: k - n)) {
                            i.s = n;
                            i.sfx = m;
                            if (s === "opacity") {
                                if (!u) {
                                    i.type = 4;
                                    i.p = "filter";
                                    i.b = "alpha(opacity=" + i.s * 100 + ")";
                                    i.e = "alpha(opacity=" + (i.s + i.c) * 100 + ")";
                                    i.dup = b.autoAlpha != null;
                                    this._style.zoom = 1
                                }
                            } else if (w !== false && (m === "px" || s === "zIndex")) i.r = true
                        } else {
                            i.type = -1;
                            i.i = s === "display" && i.e === "none" ? i.b: i.e;
                            i.s = i.c = 0
                        }
                    }
                    this._overwriteProps.push("css_" + s);
                    if (i._next) i._next._prev = i
                }
            }
        };
        d._parseTransform = function(b, c, d) {
            if (!this._transform) {
                var d = this._transform = T(b, d, true),
                e = this._style,
                f,
                g;
                if (typeof c === "object") {
                    b = {
                        scaleX: O(c.scaleX != null ? c.scaleX: c.scale, d.scaleX),
                        scaleY: O(c.scaleY != null ? c.scaleY: c.scale, d.scaleY),
                        x: O(c.x, d.x),
                        y: O(c.y, d.y)
                    };
                    if (c.shortRotation != null) {
                        b.rotation = typeof c.shortRotation === "number" ? c.shortRotation * x: W(c.shortRotation, d.rotation);
                        f = (b.rotation - d.rotation) % (Math.PI * 2);
                        f !== f % Math.PI && (f = f + Math.PI * (f < 0 ? 2 : -2));
                        b.rotation = d.rotation + f
                    } else b.rotation = c.rotation == null ? d.rotation: typeof c.rotation === "number" ? c.rotation * x: W(c.rotation, d.rotation);
                    b.skewX = c.skewX == null ? d.skewX: typeof c.skewX === "number" ? c.skewX * x: W(c.skewX, d.skewX);
                    b.skewY = c.skewY == null ? d.skewY: typeof c.skewY === "number" ? c.skewY * x: W(c.skewY, d.skewY);
                    if (f = b.skewY - d.skewY) {
                        b.skewX = b.skewX + f;
                        b.rotation = b.rotation + f
                    }
                    if (b.skewY < 1E-6 && b.skewY > -1E-6) b.skewY = 0;
                    if (b.skewX < 1E-6 && b.skewX > -1E-6) b.skewX = 0;
                    if (b.rotation < 1E-6 && b.rotation > -1E-6) b.rotation = 0;
                    if ((c = c.transformOrigin) != null) if (A) {
                        g = A + "Origin";
                        this._firstPT = c = {
                            _next: this._firstPT,
                            t: e,
                            p: g,
                            s: 0,
                            c: 0,
                            n: g,
                            f: false,
                            r: false,
                            b: e[g],
                            e: c,
                            i: c,
                            type: -1,
                            sfx: ""
                        };
                        if (c._next) c._next._prev = c
                    } else ba(c, d)
                } else if (typeof c === "string" && A) {
                    f = e[A];
                    e[A] = c;
                    b = T(b, null, false);
                    e[A] = f
                } else return;
                if (A) {
                    if (V) {
                        M = true;
                        if (e.WebkitBackfaceVisibility === "") e.WebkitBackfaceVisibility = "hidden";
                        if (e.zIndex === "") e.zIndex = 0
                    }
                } else e.zoom = 1;
                for (g in C) if ((d[g] !== b[g] || t[g] != null) && g !== "shortRotation" && g !== "scale") {
                    this._firstPT = c = {
                        _next: this._firstPT,
                        t: d,
                        p: g,
                        s: d[g],
                        c: b[g] - d[g],
                        n: g,
                        f: false,
                        r: false,
                        b: d[g],
                        e: b[g],
                        type: 0,
                        sfx: 0
                    };
                    if (c._next) c._next._prev = c;
                    this._overwriteProps.push("css_" + g)
                }
            }
        };
        d._parseBezier = function(b, c, d, e) {
            if (window.com.greensock.plugins.BezierPlugin) {
                b instanceof Array && (b = {
                    values: b
                });
                var g = b.values || [],
                f = g.length,
                h = [],
                s = this._bezier = {
                    _pt: []
                },
                i = s._proxy = {},
                k = 0,
                m = 0,
                I = {},
                L = f - 1,
                F = t,
                n = s._plugin = new window.com.greensock.plugins.BezierPlugin,
                q,
                o,
                p,
                G,
                u;
                for (q = 0; q < f; q++) {
                    G = {};
                    this._transform = null;
                    p = this._firstPT;
                    this._parseVars(t = g[q], c, d, e);
                    o = this._firstPT;
                    if (q === 0) {
                        for (u = this._transform; o !== p;) {
                            i[o.p] = o.s;
                            s._pt[m++] = I[o.p] = o;
                            if (o.type === 1 || o.type === 2) {
                                i[o.p + "_g"] = o.gs;
                                i[o.p + "_b"] = o.bs;
                                if (o.type === 2) i[o.p + "_a"] = o.as
                            } else if (o.type === 3) i[o.p + "_y"] = o.ys;
                            o = o._next
                        }
                        o = this._firstPT
                    } else {
                        this._firstPT = p;
                        if (p._prev) p._prev._next = null;
                        p = p._prev = null
                    }
                    for (; o !== p;) {
                        if (I[o.p]) {
                            G[o.p] = o.s + o.c;
                            if (q === L) I[o.p].e = o.e;
                            if (o.type === 1 || o.type === 2) {
                                G[o.p + "_g"] = o.gs + o.gc;
                                G[o.p + "_b"] = o.bs + o.bc;
                                o.type === 2 && (G[o.p + "_a"] = o.as + o.ac)
                            } else o.type === 3 && (G[o.p + "_y"] = o.ys + o.yc);
                            if (q === 0) o.c = o.ac = o.gc = o.bc = o.yc = 0
                        }
                        o = o._next
                    }
                    h[k++] = G
                }
                this._transform = u;
                t = F;
                b.values = h;
                if (b.autoRotate === 0) b.autoRotate = true;
                if (b.autoRotate && !(b.autoRotate instanceof Array)) {
                    q = b.autoRotate == true ? 0 : Number(b.autoRotate) * Math.PI / 180;
                    b.autoRotate = h[0].left != null ? [["left", "top", "rotation", q, true]] : h[0].x != null ? [["x", "y", "rotation", q, true]] : false
                }
                if ((s._autoRotate = b.autoRotate) && !u) this._transform = T(c, d, true);
                n._onInitTween(i, b, this._tween);
                b.values = g
            } else console.log("Error: BezierPlugin not loaded.")
        };
        d.setRatio = function(b) {
            var c = this._firstPT,
            d = this._bezier,
            g = 1E-6,
            f, s;
            if (d) {
                d._plugin.setRatio(b);
                var i = d._pt,
                k = d._proxy;
                for (s = i.length; --s > -1;) {
                    c = i[s];
                    c.s = k[c.p];
                    if (c.type === 1 || c.type === 2) {
                        c.gs = k[c.p + "_g"];
                        c.bs = k[c.p + "_b"];
                        if (c.type === 2) c.as = k[c.p + "_a"]
                    } else if (c.type === 3) c.ys = k[c.p + "_y"]
                }
                if (d._autoRotate) this._transform.rotation = k.rotation
            }
            if (b === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) for (; c;) {
                c.t[c.p] = c.e;
                if (c.type === 4 && c.s + c.c === 1) {
                    this._style.removeAttribute("filter");
                    if (H(this._target, "filter")) c.t[c.p] = c.e
                }
                c = c._next
            } else if (b || !(this._tween._time === this._tween._duration || this._tween._time === 0)) for (; c;) {
                f = c.c * b + c.s;
                c.r ? f = f > 0 ? f + 0.5 >> 0 : f - 0.5 >> 0 : f < g && f > -g && (f = 0);
                if (c.type) if (c.type === 1) c.t[c.p] = "rgb(" + (f >> 0) + ", " + (c.gs + b * c.gc >> 0) + ", " + (c.bs + b * c.bc >> 0) + ")";
                else if (c.type === 2) c.t[c.p] = "rgba(" + (f >> 0) + ", " + (c.gs + b * c.gc >> 0) + ", " + (c.bs + b * c.bc >> 0) + ", " + (c.as + b * c.ac) + ")";
                else if (c.type === -1) c.t[c.p] = c.i;
                else if (c.type === 3) {
                    d = c.ys + b * c.yc;
                    c.r && (d = d > 0 ? d + 0.5 >> 0 : d - 0.5 >> 0);
                    c.t[c.p] = f + c.sfx + " " + d + c.ysfx
                } else {
                    if (c.dup) c.t.filter = c.t.filter || "alpha(opacity=100)";
                    c.t.filter = c.t.filter.indexOf("opacity") === -1 ? c.t.filter + (" alpha(opacity=" + (f * 100 >> 0) + ")") : c.t.filter.replace(e, "opacity=" + (f * 100 >> 0))
                } else c.t[c.p] = f + c.sfx;
                c = c._next
            } else for (; c;) {
                c.t[c.p] = c.b;
                if (c.type === 4 && c.s === 1) {
                    this._style.removeAttribute("filter");
                    if (H(this._target, "filter")) c.t[c.p] = c.b
                }
                c = c._next
            }
            if (this._transform) {
                c = this._transform;
                if (A && !c.rotation && !c.skewX) this._style[A] = (c.x || c.y ? "translate(" + c.x + "px," + c.y + "px) ": "") + (c.scaleX !== 1 || c.scaleY !== 1 ? "scale(" + c.scaleX + "," + c.scaleY + ")": "") || "translate(0px,0px)";
                else {
                    var i = A ? c.rotation: -c.rotation,
                    m = A ? i - c.skewX: i + c.skewX,
                    d = Math.cos(i) * c.scaleX,
                    i = Math.sin(i) * c.scaleX,
                    k = Math.sin(m) * -c.scaleY,
                    m = Math.cos(m) * c.scaleY,
                    I;
                    d < g && d > -g && (d = 0);
                    i < g && i > -g && (i = 0);
                    k < g && k > -g && (k = 0);
                    m < g && m > -g && (m = 0);
                    if (A) this._style[A] = "matrix(" + d + "," + i + "," + k + "," + m + "," + c.x + "," + c.y + ")";
                    else if (I = this._target.currentStyle) {
                        g = i;
                        i = -k;
                        k = -g;
                        g = this._style.filter;
                        this._style.filter = "";
                        s = this._target.offsetWidth;
                        f = this._target.offsetHeight;
                        var L = I.position !== "absolute",
                        F = "progid:DXImageTransform.Microsoft.Matrix(M11=" + d + ", M12=" + i + ", M21=" + k + ", M22=" + m,
                        n = c.x,
                        q = c.y,
                        p, u;
                        if (c.ox != null) {
                            p = (c.oxp ? s * c.ox * 0.01 : c.ox) - s / 2;
                            u = (c.oyp ? f * c.oy * 0.01 : c.oy) - f / 2;
                            n = p - (p * d + u * i) + c.x;
                            q = u - (p * k + u * m) + c.y
                        }
                        if (L) {
                            p = s / 2;
                            u = f / 2;
                            F = F + (", Dx=" + (p - (p * d + u * i) + n) + ", Dy=" + (u - (p * k + u * m) + q) + ")")
                        } else {
                            var v = G < 8 ? 1 : -1;
                            p = c.ieOffsetX || 0;
                            u = c.ieOffsetY || 0;
                            c.ieOffsetX = Math.round((s - ((d < 0 ? -d: d) * s + (i < 0 ? -i: i) * f)) / 2 + n);
                            c.ieOffsetY = Math.round((f - ((m < 0 ? -m: m) * f + (k < 0 ? -k: k) * s)) / 2 + q);
                            for (s = 0; s < 4; s++) {
                                n = P[s];
                                f = I[n];
                                f = f.indexOf("px") !== -1 ? parseFloat(f) : N(this._target, n, parseFloat(f), f.replace(h, "")) || 0;
                                q = f !== c[n] ? s < 2 ? -c.ieOffsetX: -c.ieOffsetY: s < 2 ? p - c.ieOffsetX: u - c.ieOffsetY;
                                this._style[n] = (c[n] = Math.round(f - q * (s === 0 || s === 2 ? 1 : v))) + "px"
                            }
                            F = F + ", sizingMethod='auto expand')"
                        }
                        this._style.filter = g.indexOf("progid:DXImageTransform.Microsoft.Matrix(") !== -1 ? g.replace(o, F) : g + " " + F;
                        if (b === 0 || b === 1) if (d === 1 && i === 0 && k === 0 && m === 1 && (!L || F.indexOf("Dx=0, Dy=0") !== -1))(!e.test(g) || parseFloat(RegExp.$1) === 100) && this._style.removeAttribute("filter")
                    }
                }
            }
            if (this._classData) {
                c = this._classData;
                if (b === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                    for (s = c.props.length; --s > -1;) this._style[c.props[s]] = "";
                    this._target.className = c.e
                } else if (this._target.className !== c.b) this._target.className = c.b
            }
        };
        d._kill = function(c) {
            var d = c,
            e;
            if (c.autoAlpha || c.alpha) {
                d = {};
                for (e in c) d[e] = c[e];
                d.opacity = 1;
                if (d.autoAlpha) d.visibility = 1
            }
            return b.prototype._kill.call(this, d)
        };
        b.activate([c]);
        return c
    },
    true);
    _gsDefine("plugins.RoundPropsPlugin", ["plugins.TweenPlugin"],
    function(b) {
        var c = function() {
            b.call(this, "roundProps", -1);
            this._overwriteProps.pop()
        },
        d = c.prototype = new b("roundProps", -1);
        d.constructor = c;
        c.API = 2;
        d._onInitTween = function(b, c, d) {
            this._tween = d;
            return true
        };
        d._onInitAllProps = function() {
            for (var b = this._tween,
            c = b.vars.roundProps instanceof Array ? b.vars.roundProps: b.vars.roundProps.split(","), d = c.length, e = {},
            m, i; - 1 < --d;) e[c[d]] = 1;
            for (d = c.length; - 1 < --d;) {
                m = c[d];
                for (i = b._firstPT; i;) {
                    i.pg ? i.t._roundProps(e, true) : i.n == m && (this._add(i.t, m, i.s, i.c), i._next && (i._next._prev = i._prev), i._prev ? i._prev._next = i._next: b._firstPT === i && (b._firstPT = i._next), i._next = i._prev = null, b._propLookup[m] = this);
                    i = i._next
                }
            }
            return false
        };
        d._add = function(b, c, d, e) {
            this._addTween(b, c, d, d + e, c, true);
            this._overwriteProps.push(c)
        };
        b.activate([c]);
        return c
    },
    true);
    _gsDefine("easing.Back", ["easing.Ease"],
    function(b) {
        var c = window.com.greensock._class,
        d = function(d, e) {
            var f = c("easing." + d,
            function() {},
            true),
            g = f.prototype = new b;
            g.constructor = f;
            g.getRatio = e;
            return f
        },
        f = function(d, e) {
            var f = c("easing." + d,
            function(b) {
                this._p1 = b || 0 === b ? b: 1.70158;
                this._p2 = 1.525 * this._p1
            },
            true),
            g = f.prototype = new b;
            g.constructor = f;
            g.getRatio = e;
            g.config = function(b) {
                return new f(b)
            };
            return f
        },
        h = f("BackOut",
        function(b) {
            return (b = b - 1) * b * ((this._p1 + 1) * b + this._p1) + 1
        }),
        g = f("BackIn",
        function(b) {
            return b * b * ((this._p1 + 1) * b - this._p1)
        }),
        f = f("BackInOut",
        function(b) {
            return 1 > (b = b * 2) ? 0.5 * b * b * ((this._p2 + 1) * b - this._p2) : 0.5 * ((b = b - 2) * b * ((this._p2 + 1) * b + this._p2) + 2)
        }),
        e = d("BounceOut",
        function(b) {
            return b < 1 / 2.75 ? 7.5625 * b * b: b < 2 / 2.75 ? 7.5625 * (b = b - 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b = b - 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b = b - 2.625 / 2.75) * b + 0.984375
        }),
        m = d("BounceIn",
        function(b) {
            return (b = 1 - b) < 1 / 2.75 ? 1 - 7.5625 * b * b: b < 2 / 2.75 ? 1 - (7.5625 * (b = b - 1.5 / 2.75) * b + 0.75) : b < 2.5 / 2.75 ? 1 - (7.5625 * (b = b - 2.25 / 2.75) * b + 0.9375) : 1 - (7.5625 * (b = b - 2.625 / 2.75) * b + 0.984375)
        }),
        i = d("BounceInOut",
        function(b) {
            var c = 0.5 > b,
            b = c ? 1 - 2 * b: 2 * b - 1,
            b = b < 1 / 2.75 ? 7.5625 * b * b: b < 2 / 2.75 ? 7.5625 * (b = b - 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b = b - 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b = b - 2.625 / 2.75) * b + 0.984375;
            return c ? 0.5 * (1 - b) : 0.5 * b + 0.5
        }),
        q = d("CircOut",
        function(b) {
            return Math.sqrt(1 - (b = b - 1) * b)
        }),
        k = d("CircIn",
        function(b) {
            return - (Math.sqrt(1 - b * b) - 1)
        }),
        n = d("CircInOut",
        function(b) {
            return 1 > (b = b * 2) ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b = b - 2) * b) + 1)
        }),
        v = 2 * Math.PI,
        o = function(d, e, f) {
            var g = c("easing." + d,
            function(b, c) {
                this._p1 = b || 1;
                this._p2 = c || f;
                this._p3 = this._p2 / v * (Math.asin(1 / this._p1) || 0)
            },
            true),
            d = g.prototype = new b;
            d.constructor = g;
            d.getRatio = e;
            d.config = function(b, c) {
                return new g(b, c)
            };
            return g
        },
        x = o("ElasticOut",
        function(b) {
            return this._p1 * Math.pow(2, -10 * b) * Math.sin((b - this._p3) * v / this._p2) + 1
        },
        0.3),
        z = o("ElasticIn",
        function(b) {
            return - (this._p1 * Math.pow(2, 10 * (b = b - 1)) * Math.sin((b - this._p3) * v / this._p2))
        },
        0.3),
        o = o("ElasticInOut",
        function(b) {
            return 1 > (b = b * 2) ? -0.5 * this._p1 * Math.pow(2, 10 * (b = b - 1)) * Math.sin((b - this._p3) * v / this._p2) : 0.5 * this._p1 * Math.pow(2, -10 * (b = b - 1)) * Math.sin((b - this._p3) * v / this._p2) + 1
        },
        0.45),
        t = d("ExpoOut",
        function(b) {
            return 1 - Math.pow(2, -10 * b)
        }),
        p = d("ExpoIn",
        function(b) {
            return Math.pow(2, 10 * (b - 1)) - 0.001
        }),
        w = d("ExpoInOut",
        function(b) {
            return 1 > (b = b * 2) ? 0.5 * Math.pow(2, 10 * (b - 1)) : 0.5 * (2 - Math.pow(2, -10 * (b - 1)))
        }),
        u = Math.PI / 2,
        y = d("SineOut",
        function(b) {
            return Math.sin(b * u)
        }),
        D = d("SineIn",
        function(b) {
            return - Math.cos(b * u) + 1
        }),
        d = d("SineInOut",
        function(b) {
            return - 0.5 * (Math.cos(Math.PI * b) - 1)
        }),
        G = c("easing.SlowMo",
        function(b, c, d) {
            null == b ? b = 0.7 : 1 < b && (b = 1);
            this._p = 1 != b ? c || 0 === c ? c: 0.7 : 0;
            this._p1 = (1 - b) / 2;
            this._p2 = b;
            this._p3 = this._p1 + this._p2;
            this._calcEnd = true === d
        },
        true),
        E = G.prototype = new b;
        E.constructor = G;
        E.getRatio = function(b) {
            var c = b + (0.5 - b) * this._p;
            return b < this._p1 ? this._calcEnd ? 1 - (b = 1 - b / this._p1) * b: c - (b = 1 - b / this._p1) * b * b * b * c: b > this._p3 ? this._calcEnd ? 1 - (b = (b - this._p3) / this._p1) * b: c + (b - c) * (b = (b - this._p3) / this._p1) * b * b * b: this._calcEnd ? 1 : c
        };
        G.ease = new G(0.7, 0.7);
        E.config = G.config = function(b, c, d) {
            return new G(b, c, d)
        };
        var B = c("easing.SteppedEase",
        function(b) {
            b = b || 1;
            this._p1 = 1 / b;
            this._p2 = b + 1
        },
        true),
        E = B.prototype = new b;
        E.constructor = B;
        E.getRatio = function(b) {
            0 > b ? b = 0 : 1 <= b && (b = 0.999999999);
            return (this._p2 * b >> 0) * this._p1
        };
        E.config = B.config = function(b) {
            return new B(b)
        };
        c("easing.Bounce", {
            easeOut: new e,
            easeIn: new m,
            easeInOut: new i
        },
        true);
        c("easing.Circ", {
            easeOut: new q,
            easeIn: new k,
            easeInOut: new n
        },
        true);
        c("easing.Elastic", {
            easeOut: new x,
            easeIn: new z,
            easeInOut: new o
        },
        true);
        c("easing.Expo", {
            easeOut: new t,
            easeIn: new p,
            easeInOut: new w
        },
        true);
        c("easing.Sine", {
            easeOut: new y,
            easeIn: new D,
            easeInOut: new d
        },
        true);
        return {
            easeOut: new h,
            easeIn: new g,
            easeInOut: new f
        }
    },
    true)
}); (function(b) {
    var c = function(c) {
        var c = c.split("."),
        d = b,
        e;
        for (e = 0; e < c.length; e++) d[c[e]] = d = d[c[e]] || {};
        return d
    },
    d = c("com.greensock"),
    f,
    h,
    g,
    e,
    m,
    i = {},
    q = function(d, e, f, g) {
        this.sc = i[d] ? i[d].sc: [];
        i[d] = this;
        this.gsClass = null;
        this.def = f;
        var h = e || [],
        k = [];
        this.check = function(e) {
            for (var m = h.length,
            F = 0,
            n; - 1 < --m;)(n = i[h[m]] || new q(h[m])).gsClass ? k[m] = n.gsClass: (F++, e && n.sc.push(this));
            if (0 === F && f) {
                var e = ("com.greensock." + d).split("."),
                m = e.pop(),
                o = c(e.join("."))[m] = this.gsClass = f.apply(f, k);
                g && ((b.GreenSockGlobals || b)[m] = o, "function" === typeof define && define.amd ? define((b.GreenSockAMDPath ? b.GreenSockAMDPath + "/": "") + d.split(".").join("/"), [],
                function() {
                    return o
                }) : "undefined" !== typeof module && module.exports && (module.exports = o));
                for (m = 0; m < this.sc.length; m++) this.sc[m].check(false)
            }
        };
        this.check(true)
    },
    k = d._class = function(b, c, d) {
        new q(b, [],
        function() {
            return c
        },
        d);
        return c
    };
    b._gsDefine = function(b, c, d, e) {
        return new q(b, c, d, e)
    };
    var n = [0, 0, 1, 1],
    v = [],
    o = k("easing.Ease",
    function(b, c, d, e) {
        this._func = b;
        this._type = d || 0;
        this._power = e || 0;
        this._params = c ? n.concat(c) : n
    },
    true);
    g = o.prototype;
    g._calcEnd = false;
    g.getRatio = function(b) {
        if (this._func) return this._params[0] = b,
        this._func.apply(null, this._params);
        var c = this._type,
        d = this._power,
        e = 1 === c ? 1 - b: 2 === c ? b: 0.5 > b ? 2 * b: 2 * (1 - b);
        1 === d ? e = e * e: 2 === d ? e = e * e * e: 3 === d ? e = e * e * e * e: 4 === d && (e = e * e * e * e * e);
        return 1 === c ? 1 - e: 2 === c ? e: 0.5 > b ? e / 2 : 1 - e / 2
    };
    f = ["Linear", "Quad", "Cubic", "Quart", "Quint"];
    for (h = f.length; - 1 < --h;) {
        g = k("easing." + f[h],
        function() {},
        true);
        e = k("easing.Power" + h,
        function() {},
        true);
        g.easeOut = e.easeOut = new o(null, null, 1, h);
        g.easeIn = e.easeIn = new o(null, null, 2, h);
        g.easeInOut = e.easeInOut = new o(null, null, 3, h)
    }
    k("easing.Strong", d.easing.Power4, true);
    d.easing.Linear.easeNone = d.easing.Linear.easeIn;
    g = k("events.EventDispatcher",
    function(b) {
        this._listeners = {};
        this._eventTarget = b || this
    }).prototype;
    g.addEventListener = function(b, c, d, e, f) {
        var f = f || 0,
        g = this._listeners[b],
        h = 0,
        i;
        null == g && (this._listeners[b] = g = []);
        for (i = g.length; - 1 < --i;) {
            b = g[i];
            b.c === c ? g.splice(i, 1) : 0 === h && b.pr < f && (h = i + 1)
        }
        g.splice(h, 0, {
            c: c,
            s: d,
            up: e,
            pr: f
        })
    };
    g.removeEventListener = function(b, c) {
        var d = this._listeners[b];
        if (d) for (var e = d.length; - 1 < --e;) if (d[e].c === c) {
            d.splice(e, 1);
            break
        }
    };
    g.dispatchEvent = function(b) {
        var c = this._listeners[b];
        if (c) for (var d = c.length,
        e, f = this._eventTarget; - 1 < --d;) {
            e = c[d];
            e.up ? e.c.call(e.s || f, {
                type: b,
                target: f
            }) : e.c.call(e.s || f)
        }
    };
    var x = b.requestAnimationFrame,
    z = b.cancelAnimationFrame,
    t = Date.now ||
    function() {
        return (new Date).getTime()
    };
    f = ["ms", "moz", "webkit", "o"];
    for (h = f.length; - 1 < --h && !x;) {
        x = b[f[h] + "RequestAnimationFrame"];
        z = b[f[h] + "CancelAnimationFrame"] || b[f[h] + "CancelRequestAnimationFrame"]
    }
    z || (z = function(c) {
        b.clearTimeout(c)
    });
    k("Ticker",
    function(c, d) {
        this.frame = this.time = 0;
        var e = this,
        f = t(),
        g = false !== d,
        h,
        i,
        k,
        m,
        n;
        this.tick = function() {
            e.time = (t() - f) / 1E3;
            if (!h || e.time >= n) {
                e.frame++;
                n = e.time + m - (e.time - n) - 5E-4;
                n <= e.time && (n = e.time + 0.001);
                e.dispatchEvent("tick")
            }
            k = i(e.tick)
        };
        this.fps = function(c) {
            if (!arguments.length) return h;
            h = c;
            m = 1 / (h || 60);
            n = this.time + m;
            i = 0 === h ?
            function() {}: !g || !x ?
            function(c) {
                return b.setTimeout(c, 1E3 * (n - e.time) + 1 >> 0 || 1)
            }: x;
            z(k);
            k = i(e.tick)
        };
        this.useRAF = function(b) {
            if (!arguments.length) return g;
            g = b;
            this.fps(h)
        };
        this.fps(c)
    });
    g = d.Ticker.prototype = new d.events.EventDispatcher;
    g.constructor = d.Ticker;
    var p = k("core.Animation",
    function(b, c) {
        this.vars = c || {};
        this._duration = this._totalDuration = b || 0;
        this._delay = Number(this.vars.delay) || 0;
        this._timeScale = 1;
        this._active = true == this.vars.immediateRender;
        this.data = this.vars.data;
        this._reversed = true == this.vars.reversed;
        if (H) {
            m || (w.tick(), m = true);
            var d = this.vars.useFrames ? I: H;
            d.insert(this, d._time);
            this.vars.paused && this.paused(true)
        }
    }),
    w = p.ticker = new d.Ticker;
    g = p.prototype;
    g._dirty = g._gc = g._initted = g._paused = false;
    g._totalTime = g._time = 0;
    g._rawPrevTime = -1;
    g._next = g._last = g._onUpdate = g._timeline = g.timeline = null;
    g._paused = false;
    g.play = function(b, c) {
        arguments.length && this.seek(b, c);
        this.reversed(false);
        return this.paused(false)
    };
    g.pause = function(b, c) {
        arguments.length && this.seek(b, c);
        return this.paused(true)
    };
    g.resume = function(b, c) {
        arguments.length && this.seek(b, c);
        return this.paused(false)
    };
    g.seek = function(b, c) {
        return this.totalTime(Number(b), false != c)
    };
    g.restart = function(b, c) {
        this.reversed(false);
        this.paused(false);
        return this.totalTime(b ? -this._delay: 0, false != c)
    };
    g.reverse = function(b, c) {
        arguments.length && this.seek(b || this.totalDuration(), c);
        this.reversed(true);
        return this.paused(false)
    };
    g.render = function() {};
    g.invalidate = function() {
        return this
    };
    g._enabled = function(b, c) {
        this._gc = !b;
        this._active = b && !this._paused && 0 < this._totalTime && this._totalTime < this._totalDuration;
        true != c && (b && null == this.timeline ? this._timeline.insert(this, this._startTime - this._delay) : !b && null != this.timeline && this._timeline._remove(this, true));
        return false
    };
    g._kill = function() {
        return this._enabled(false, false)
    };
    g.kill = function(b, c) {
        this._kill(b, c);
        return this
    };
    g._uncache = function(b) {
        for (b = b ? this: this.timeline; b;) {
            b._dirty = true;
            b = b.timeline
        }
        return this
    };
    g.eventCallback = function(b, c, d, e) {
        if (null == b) return null;
        if ("on" === b.substr(0, 2)) {
            if (1 === arguments.length) return this.vars[b];
            if (null == c) delete this.vars[b];
            else if (this.vars[b] = c, this.vars[b + "Params"] = d, this.vars[b + "Scope"] = e, d) for (var f = d.length; - 1 < --f;)"{self}" === d[f] && (d = this.vars[b + "Params"] = d.concat(), d[f] = this);
            "onUpdate" === b && (this._onUpdate = c)
        }
        return this
    };
    g.delay = function(b) {
        if (!arguments.length) return this._delay;
        this._timeline.smoothChildTiming && this.startTime(this._startTime + b - this._delay);
        this._delay = b;
        return this
    };
    g.duration = function(b) {
        if (!arguments.length) return this._dirty = false,
        this._duration;
        this._duration = this._totalDuration = b;
        this._uncache(true);
        this._timeline.smoothChildTiming && this._active && 0 != b && this.totalTime(this._totalTime * (b / this._duration), true);
        return this
    };
    g.totalDuration = function(b) {
        this._dirty = false;
        return ! arguments.length ? this._totalDuration: this.duration(b)
    };
    g.time = function(b, c) {
        if (!arguments.length) return this._time;
        this._dirty && this.totalDuration();
        b > this._duration && (b = this._duration);
        return this.totalTime(b, c)
    };
    g.totalTime = function(b, c) {
        if (!arguments.length) return this._totalTime;
        if (this._timeline) {
            0 > b && (b = b + this.totalDuration());
            if (this._timeline.smoothChildTiming && (this._dirty && this.totalDuration(), b > this._totalDuration && (b = this._totalDuration), this._startTime = (this._paused ? this._pauseTime: this._timeline._time) - (!this._reversed ? b: this._totalDuration - b) / this._timeScale, this._timeline._dirty || this._uncache(false), !this._timeline._active)) for (var d = this._timeline; d._timeline;) {
                d.totalTime(d._totalTime, true);
                d = d._timeline
            }
            this._gc && this._enabled(true, false);
            this._totalTime != b && this.render(b, c, false)
        }
        return this
    };
    g.startTime = function(b) {
        if (!arguments.length) return this._startTime;
        b != this._startTime && (this._startTime = b, this.timeline && this.timeline._sortChildren && this.timeline.insert(this, b - this._delay));
        return this
    };
    g.timeScale = function(b) {
        if (!arguments.length) return this._timeScale;
        b = b || 1E-6;
        if (this._timeline && this._timeline.smoothChildTiming) {
            var c = this._pauseTime || 0 == this._pauseTime ? this._pauseTime: this._timeline._totalTime;
            this._startTime = c - (c - this._startTime) * this._timeScale / b
        }
        this._timeScale = b;
        return this._uncache(false)
    };
    g.reversed = function(b) {
        if (!arguments.length) return this._reversed;
        b != this._reversed && (this._reversed = b, this.totalTime(this._totalTime, true));
        return this
    };
    g.paused = function(b) {
        if (!arguments.length) return this._paused;
        b != this._paused && this._timeline && (!b && this._timeline.smoothChildTiming && (this._startTime = this._startTime + (this._timeline.rawTime() - this._pauseTime), this._uncache(false)), this._pauseTime = b ? this._timeline.rawTime() : null, this._paused = b, this._active = !this._paused && 0 < this._totalTime && this._totalTime < this._totalDuration);
        this._gc && (b || this._enabled(true, false));
        return this
    };
    d = k("core.SimpleTimeline",
    function(b) {
        p.call(this, 0, b);
        this.autoRemoveChildren = this.smoothChildTiming = true
    });
    g = d.prototype = new p;
    g.constructor = d;
    g.kill()._gc = false;
    g._first = g._last = null;
    g._sortChildren = false;
    g.insert = function(b, c) {
        b._startTime = Number(c || 0) + b._delay;
        b._paused && this !== b._timeline && (b._pauseTime = b._startTime + (this.rawTime() - b._startTime) / b._timeScale);
        b.timeline && b.timeline._remove(b, true);
        b.timeline = b._timeline = this;
        b._gc && b._enabled(true, true);
        var d = this._last;
        if (this._sortChildren) for (var e = b._startTime; d && d._startTime > e;) d = d._prev;
        d ? (b._next = d._next, d._next = b) : (b._next = this._first, this._first = b);
        b._next ? b._next._prev = b: this._last = b;
        b._prev = d;
        this._timeline && this._uncache(true);
        return this
    };
    g._remove = function(b, c) {
        b.timeline === this && (c || b._enabled(false, true), b.timeline = null, b._prev ? b._prev._next = b._next: this._first === b && (this._first = b._next), b._next ? b._next._prev = b._prev: this._last === b && (this._last = b._prev), this._timeline && this._uncache(true));
        return this
    };
    g.render = function(b, c) {
        var d = this._first,
        e;
        for (this._totalTime = this._time = this._rawPrevTime = b; d;) {
            e = d._next;
            if (d._active || b >= d._startTime && !d._paused) d._reversed ? d.render((!d._dirty ? d._totalDuration: d.totalDuration()) - (b - d._startTime) * d._timeScale, c, false) : d.render((b - d._startTime) * d._timeScale, c, false);
            d = e
        }
    };
    g.rawTime = function() {
        return this._totalTime
    };
    var u = k("TweenLite",
    function(b, c, d) {
        p.call(this, c, d);
        if (null == b) throw "Cannot tween an undefined reference.";
        this.target = b;
        this._overwrite = null == this.vars.overwrite ? B[u.defaultOverwrite] : "number" === typeof this.vars.overwrite ? this.vars.overwrite >> 0 : B[this.vars.overwrite];
        if ((b instanceof Array || b.jquery) && "object" === typeof b[0]) {
            this._targets = b.slice(0);
            this._propLookup = [];
            this._siblings = [];
            for (b = 0; b < this._targets.length; b++) {
                d = this._targets[b];
                d.jquery ? (this._targets.splice(b--, 1), this._targets = this._targets.concat(d.constructor.makeArray(d))) : (this._siblings[b] = K(d, this, false), 1 === this._overwrite && 1 < this._siblings[b].length && J(d, this, null, 1, this._siblings[b]))
            }
        } else {
            this._propLookup = {};
            this._siblings = K(b, this, false);
            1 === this._overwrite && 1 < this._siblings.length && J(b, this, null, 1, this._siblings)
        } (this.vars.immediateRender || 0 === c && 0 === this._delay && false != this.vars.immediateRender) && this.render( - this._delay, false, true)
    },
    true);
    g = u.prototype = new p;
    g.constructor = u;
    g.kill()._gc = false;
    g.ratio = 0;
    g._firstPT = g._targets = g._overwrittenProps = null;
    g._notifyPluginsOfEnabled = false;
    u.version = 12;
    u.defaultEase = g._ease = new o(null, null, 1, 1);
    u.defaultOverwrite = "auto";
    u.ticker = w;
    var y = u._plugins = {},
    D = {},
    G = 0,
    E = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        orientToBezier: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1
    },
    B = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        "true": 1,
        "false": 0
    },
    I = p._rootFramesTimeline = new d,
    H = p._rootTimeline = new d;
    H._startTime = w.time;
    I._startTime = w.frame;
    H._active = I._active = true;
    p._updateRoot = function() {
        H.render((w.time - H._startTime) * H._timeScale, false, false);
        I.render((w.frame - I._startTime) * I._timeScale, false, false);
        if (! (w.frame % 120)) {
            var b, c, d;
            for (d in D) {
                c = D[d].tweens;
                for (b = c.length; - 1 < --b;) c[b]._gc && c.splice(b, 1);
                0 === c.length && delete D[d]
            }
        }
    };
    w.addEventListener("tick", p._updateRoot);
    var K = function(b, c, d) {
        var e = b._gsTweenID,
        f;
        if (!D[e || (b._gsTweenID = e = "t" + G++)]) D[e] = {
            target: b,
            tweens: []
        };
        if (c && (b = D[e].tweens, b[f = b.length] = c, d)) for (; - 1 < --f;) b[f] === c && b.splice(f, 1);
        return D[e].tweens
    },
    J = function(b, c, d, e, f) {
        var g, h, i;
        if (1 === e || 4 <= e) {
            b = f.length;
            for (g = 0; g < b; g++) if ((i = f[g]) !== c) i._gc || i._enabled(false, false) && (h = true);
            else if (5 === e) break;
            return h
        }
        var k = c._startTime + 1E-10,
        m = [],
        n = 0,
        o;
        for (g = f.length; - 1 < --g;) if (! ((i = f[g]) === c || i._gc || i._paused)) i._timeline !== c._timeline ? (o = o || C(c, 0), 0 === C(i, o) && (m[n++] = i)) : i._startTime <= k && i._startTime + i.totalDuration() / i._timeScale + 1E-10 > k && ((0 === c._duration || !i._initted) && 2E-10 >= k - i._startTime || (m[n++] = i));
        for (g = n; - 1 < --g;) if (i = m[g], 2 === e && i._kill(d, b) && (h = true), 2 !== e || !i._firstPT && i._initted) i._enabled(false, false) && (h = true);
        return h
    },
    C = function(b, c) {
        for (var d = b._timeline,
        e = d._timeScale,
        f = b._startTime; d._timeline;) {
            f = f + d._startTime;
            e = e * d._timeScale;
            if (d._paused) return - 100;
            d = d._timeline
        }
        f = f / e;
        return f > c ? f - c: !b._initted && 2E-10 > f - c ? 1E-10: (f = f + b.totalDuration() / b._timeScale / e) > c ? 0 : f - c - 1E-10
    };
    g._init = function() {
        this.vars.startAt && (this.vars.startAt.overwrite = 0, this.vars.startAt.immediateRender = true, u.to(this.target, 0, this.vars.startAt));
        var b, c;
        this._ease = this.vars.ease instanceof o ? this.vars.easeParams instanceof Array ? this.vars.ease.config.apply(this.vars.ease, this.vars.easeParams) : this.vars.ease: "function" === typeof this.vars.ease ? new o(this.vars.ease, this.vars.easeParams) : u.defaultEase;
        this._easeType = this._ease._type;
        this._easePower = this._ease._power;
        this._firstPT = null;
        if (this._targets) for (b = this._targets.length; - 1 < --b;) {
            if (this._initProps(this._targets[b], this._propLookup[b] = {},
            this._siblings[b], this._overwrittenProps ? this._overwrittenProps[b] : null)) c = true
        } else c = this._initProps(this.target, this._propLookup, this._siblings, this._overwrittenProps);
        c && u._onPluginEvent("_onInitAllProps", this);
        this._overwrittenProps && null == this._firstPT && "function" !== typeof this.target && this._enabled(false, false);
        if (this.vars.runBackwards) for (b = this._firstPT; b;) {
            b.s = b.s + b.c;
            b.c = -b.c;
            b = b._next
        }
        this._onUpdate = this.vars.onUpdate;
        this._initted = true
    };
    g._initProps = function(b, c, d, e) {
        var f, g, h, i, k, m;
        if (null == b) return false;
        for (f in this.vars) {
            if (E[f]) {
                if ("onStartParams" === f || "onUpdateParams" === f || "onCompleteParams" === f || "onReverseCompleteParams" === f || "onRepeatParams" === f) if (k = this.vars[f]) for (g = k.length; - 1 < --g;)"{self}" === k[g] && (k = this.vars[f] = k.concat(), k[g] = this)
            } else if (y[f] && (i = new y[f])._onInitTween(b, this.vars[f], this)) {
                this._firstPT = m = {
                    _next: this._firstPT,
                    t: i,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: true,
                    n: f,
                    pg: true,
                    pr: i._priority
                };
                for (g = i._overwriteProps.length; - 1 < --g;) c[i._overwriteProps[g]] = this._firstPT;
                if (i._priority || i._onInitAllProps) h = true;
                if (i._onDisable || i._onEnable) this._notifyPluginsOfEnabled = true
            } else {
                this._firstPT = c[f] = m = {
                    _next: this._firstPT,
                    t: b,
                    p: f,
                    f: "function" === typeof b[f],
                    n: f,
                    pg: false,
                    pr: 0
                };
                m.s = !m.f ? parseFloat(b[f]) : b[f.indexOf("set") || "function" !== typeof b["get" + f.substr(3)] ? f: "get" + f.substr(3)]();
                m.c = "number" === typeof this.vars[f] ? this.vars[f] - m.s: "string" === typeof this.vars[f] ? parseFloat(this.vars[f].split("=").join("")) : 0
            }
            m && m._next && (m._next._prev = m)
        }
        return e && this._kill(e, b) ? this._initProps(b, c, d, e) : 1 < this._overwrite && this._firstPT && 1 < d.length && J(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e)) : h
    };
    g.render = function(b, c, d) {
        var e = this._time,
        f, g;
        if (b >= this._duration) {
            if (this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (f = true, g = "onComplete"), 0 === this._duration) {
                if (0 === b || 0 > this._rawPrevTime) this._rawPrevTime !== b && (d = true);
                this._rawPrevTime = b
            }
        } else if (0 >= b) {
            this._totalTime = this._time = 0;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
            if (0 !== e || 0 === this._duration && 0 < this._rawPrevTime) {
                g = "onReverseComplete";
                f = this._reversed
            }
            0 > b ? (this._active = false, 0 === this._duration && (0 <= this._rawPrevTime && (d = true), this._rawPrevTime = b)) : this._initted || (d = true)
        } else if (this._totalTime = this._time = b, this._easeType) {
            var h = b / this._duration,
            i = this._easeType,
            k = this._easePower;
            if (1 === i || 3 === i && 0.5 <= h) h = 1 - h;
            3 === i && (h = h * 2);
            1 === k ? h = h * h: 2 === k ? h = h * h * h: 3 === k ? h = h * h * h * h: 4 === k && (h = h * h * h * h * h);
            this.ratio = 1 === i ? 1 - h: 2 === i ? h: 0.5 > b / this._duration ? h / 2 : 1 - h / 2
        } else this.ratio = this._ease.getRatio(b / this._duration);
        if (this._time !== e || d) {
            this._initted || (this._init(), !f && this._time && (this.ratio = this._ease.getRatio(this._time / this._duration))); ! this._active && !this._paused && (this._active = true);
            if (0 === e && this.vars.onStart && (0 !== this._time || 0 === this._duration)) c || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || v);
            for (b = this._firstPT; b;) {
                if (b.f) b.t[b.p](b.c * this.ratio + b.s);
                else b.t[b.p] = b.c * this.ratio + b.s;
                b = b._next
            }
            this._onUpdate && (c || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || v));
            g && !this._gc && (f && (this._timeline.autoRemoveChildren && this._enabled(false, false), this._active = false), c || this.vars[g] && this.vars[g].apply(this.vars[g + "Scope"] || this, this.vars[g + "Params"] || v))
        }
    };
    g._kill = function(b, c) {
        "all" === b && (b = null);
        if (null == b && (null == c || c == this.target)) return this._enabled(false, false);
        var c = c || this._targets || this.target,
        d, e, f, g, h, i, k;
        if ((c instanceof Array || c.jquery) && "object" === typeof c[0]) for (d = c.length; - 1 < --d;) this._kill(b, c[d]) && (h = true);
        else {
            if (this._targets) for (d = this._targets.length; - 1 < --d;) {
                if (c === this._targets[d]) {
                    g = this._propLookup[d] || {};
                    this._overwrittenProps = this._overwrittenProps || [];
                    e = this._overwrittenProps[d] = b ? this._overwrittenProps[d] || {}: "all";
                    break
                }
            } else {
                if (c !== this.target) return false;
                g = this._propLookup;
                e = this._overwrittenProps = b ? this._overwrittenProps || {}: "all"
            }
            if (g) for (f in i = b || g, k = b != e && "all" != e && b != g && (null == b || true != b._tempKill), i) {
                if (d = g[f]) {
                    d.pg && d.t._kill(i) && (h = true);
                    if (!d.pg || 0 === d.t._overwriteProps.length) {
                        d._prev ? d._prev._next = d._next: d === this._firstPT && (this._firstPT = d._next);
                        d._next && (d._next._prev = d._prev);
                        d._next = d._prev = null
                    }
                    delete g[f]
                }
                k && (e[f] = 1)
            }
        }
        return h
    };
    g.invalidate = function() {
        this._notifyPluginsOfEnabled && u._onPluginEvent("_onDisable", this);
        this._onUpdate = this._overwrittenProps = this._firstPT = null;
        this._initted = this._active = this._notifyPluginsOfEnabled = false;
        this._propLookup = this._targets ? {}: [];
        return this
    };
    g._enabled = function(b, c) {
        if (b && this._gc) if (this._targets) for (var d = this._targets.length; - 1 < --d;) this._siblings[d] = K(this._targets[d], this, true);
        else this._siblings = K(this.target, this, true);
        p.prototype._enabled.call(this, b, c);
        return this._notifyPluginsOfEnabled && this._firstPT ? u._onPluginEvent(b ? "_onEnable": "_onDisable", this) : false
    };
    u.to = function(b, c, d) {
        return new u(b, c, d)
    };
    u.from = function(b, c, d) {
        d.runBackwards = true;
        false != d.immediateRender && (d.immediateRender = true);
        return new u(b, c, d)
    };
    u.fromTo = function(b, c, d, e) {
        e.startAt = d;
        d.immediateRender && (e.immediateRender = true);
        return new u(b, c, e)
    };
    u.delayedCall = function(b, c, d, e, f) {
        return new u(c, 0, {
            delay: b,
            onComplete: c,
            onCompleteParams: d,
            onCompleteScope: e,
            onReverseComplete: c,
            onReverseCompleteParams: d,
            onReverseCompleteScope: e,
            immediateRender: false,
            useFrames: f,
            overwrite: 0
        })
    };
    u.set = function(b, c) {
        return new u(b, 0, c)
    };
    u.killTweensOf = u.killDelayedCallsTo = function(b, c) {
        for (var d = u.getTweensOf(b), e = d.length; - 1 < --e;) d[e]._kill(c, b)
    };
    u.getTweensOf = function(b) {
        if (null != b) {
            var c, d, e;
            if ((b instanceof Array || b.jquery) && "object" === typeof b[0]) {
                c = b.length;
                for (d = []; - 1 < --c;) d = d.concat(u.getTweensOf(b[c]));
                for (c = d.length; - 1 < --c;) {
                    e = d[c];
                    for (b = c; - 1 < --b;) e === d[b] && d.splice(c, 1)
                }
            } else {
                d = K(b).concat();
                for (c = d.length; - 1 < --c;) d[c]._gc && d.splice(c, 1)
            }
            return d
        }
    };
    var A = k("plugins.TweenPlugin",
    function(b, c) {
        this._overwriteProps = (b || "").split(",");
        this._propName = this._overwriteProps[0];
        this._priority = c || 0
    },
    true);
    g = A.prototype;
    A.version = 12;
    A.API = 2;
    g._firstPT = null;
    g._addTween = function(b, c, d, e, f, g) {
        var h;
        if (null != e && (h = "number" === typeof e || "=" !== e.charAt(1) ? Number(e) - d: Number(e.split("=").join("")))) {
            this._firstPT = {
                _next: this._firstPT,
                t: b,
                p: c,
                s: d,
                c: h,
                f: "function" === typeof b[c],
                n: f || c,
                r: g
            };
            this._firstPT._next && (this._firstPT._next._prev = this._firstPT)
        }
    };
    g.setRatio = function(b) {
        for (var c = this._firstPT,
        d; c;) {
            d = c.c * b + c.s;
            c.r && (d = d + (0 < d ? 0.5 : -0.5) >> 0);
            if (c.f) c.t[c.p](d);
            else c.t[c.p] = d;
            c = c._next
        }
    };
    g._kill = function(b) {
        if (null != b[this._propName]) this._overwriteProps = [];
        else for (var c = this._overwriteProps.length; - 1 < --c;) null != b[this._overwriteProps[c]] && this._overwriteProps.splice(c, 1);
        for (c = this._firstPT; c;) {
            null != b[c.n] && ((c._next && (c._next._prev = c._prev), c._prev) ? (c._prev._next = c._next, c._prev = null) : this._firstPT === c && (this._firstPT = c._next));
            c = c._next
        }
        return false
    };
    g._roundProps = function(b, c) {
        for (var d = this._firstPT; d;) {
            if (b[this._propName] || null != d.n && b[d.n.split(this._propName + "_").join("")]) d.r = c;
            d = d._next
        }
    };
    u._onPluginEvent = function(b, c) {
        var d = c._firstPT,
        e;
        if ("_onInitAllProps" === b) {
            for (var f, g, h, i; d;) {
                i = d._next;
                for (f = g; f && f.pr > d.pr;) f = f._next; (d._prev = f ? f._prev: h) ? d._prev._next = d: g = d; (d._next = f) ? f._prev = d: h = d;
                d = i
            }
            d = c._firstPT = g
        }
        for (; d;) {
            d.pg && "function" === typeof d.t[b] && d.t[b]() && (e = true);
            d = d._next
        }
        return e
    };
    A.activate = function(b) {
        for (var c = b.length; - 1 < --c;) b[c].API === A.API && (u._plugins[(new b[c])._propName] = b[c]);
        return true
    };
    if (f = b._gsQueue) {
        for (h = 0; h < f.length; h++) f[h]();
        for (g in i) i[g].def || console.log("Warning: TweenLite encountered missing dependency: com.greensock." + g)
    }
})(window); (window._gsQueue || (window._gsQueue = [])).push(function() {
    _gsDefine("plugins.ArcPlugin", ["plugins.TweenPlugin"],
    function(b) {
        var c = function() {
            b.call(this, "arc");
            this._overwriteProps.pop()
        },
        d = c.prototype = new b("arc");
        d.constructor = c;
        c.API = 2;
        d._onInitTween = function(b, c) {
            this._target = b;
            for (var d in c) this[d] = c[d];
            for (this.dir = this.dir || 1; this.start > this.end && this.dir > 0;) this.start = this.start - 360;
            for (; this.start < this.end && this.dir < 0;) this.start = this.start + 360;
            return true
        };
        d._kill = function(c) {
            return b.prototype._kill.call(this, c)
        };
        d.setRatio = function(b) {
            var b = 1 - b,
            c = this.start * b + this.end * (1 - b),
            c = c * 3.1415927 / 180,
            b = Math.sin(c) * this.radius + this.center[0],
            c = Math.cos(c) * this.radius + this.center[1];
            this._target.style.left = b + "px";
            this._target.style.top = c + "px"
        };
        b.activate([c]);
        return c
    },
    true)
});
window._gsDefine && _gsQueue.pop()();
function FrameByFrameAnim(b, c, d, f, h, g, e) {
    var m = this,
    i = new SmartObject,
    q = 0,
    k = b.length,
    n = [],
    v = c[0].length,
    o = 1E3 / d,
    x = false,
    z = false,
    t = 1,
    p;
    m.load = function() {
        for (var c = b.length,
        d = 0; d < c; d++) {
            var h = b[d],
            i = new SmartObject,
            o = new Image,
            p = function(b) {
                b.currentTarget.removeEventListener(Event.LOAD, p);
                b.currentTarget.removeEventListener(Event.LOAD, v);
                q++;
                if (q == k) {
                    m.init();
                    g && g()
                }
            },
            v = function(b) {
                trace("FrameByFrameAnim - Image Failed to Load: " + b.currentTarget.src)
            };
            o.addEventListener(Event.LOAD, p, false);
            o.addEventListener(Event.ERROR, v, false);
            o.src = f + h;
            i.appendChild(o);
            n.push(i);
            e && o.addEventListener(Event.ONLOAD, FixIE.imageCheckForPNGFix)
        }
    };
    m.init = function() {
        for (var b = n.length,
        c = 0; c < b; c++) i.appendChild(n[c]);
        m.setFrame(0);
        h && h === true && m.play()
    };
    m.setFrame = function(b) {
        var d = 0,
        e = n.length;
        for (d; d < e; d++) {
            var f = n[d],
            g = c[d][b];
            if (b == 0) {
                f.registrationPointPercentX = g.rx;
                f.registrationPointPercentY = g.ry
            }
            if (g.x != null) f.x = g.x;
            if (g.y != null) f.y = g.y;
            if (g.sx != null) f.scaleX = g.sx;
            if (g.sy != null) f.scaleY = g.sy;
            if (g.r != null) f.rotation = g.r;
            if (g.o != null) f.opacity = g.o
        }
        t = b
    };
    m.play = function(b) {
        function c() {
            m.setFrame(t);
            t++;
            if (t < v - 1 && z == false) p = setTimeout(c, o);
            else {
                b && b();
                x = false
            }
        }
        clearTimeout(p);
        z = false;
        x = true;
        c()
    };
    m.animateTo = function(b, c) {
        function d() {
            m.setFrame(t);
            if (e == "incr") {
                t++;
                if (t < b && z == false) p = setTimeout(d, o);
                else {
                    x = false;
                    m.stop();
                    if (c) {
                        c();
                        c = null
                    }
                }
            } else {
                t--;
                if (t > b && z == false) p = setTimeout(d, o);
                else {
                    x = false;
                    t < 0 && (t = 0);
                    if (c) {
                        c();
                        c = null
                    }
                }
            }
        }
        clearTimeout(p);
        var e = "incr";
        if (b <= t) e = "decr";
        else if (b != t) {
            z = false;
            x = true;
            d()
        }
    };
    m.stop = function() {
        clearTimeout(p);
        z = true
    };
    m.gotoAndStop = function(b) {
        clearTimeout(p);
        z = true;
        t = b;
        m.setFrame(t)
    };
    m.gotoAndPlay = function(b, c) {
        z = true;
        t = b;
        m.setFrame(t);
        m.play(c)
    };
    m.getTotalFrames = function() {
        return v
    };
    m.isStopped = z;
    m.isPlaying = x;
    m.load();
    i.play = m.play;
    i.stop = m.stop;
    i.gotoAndStop = m.gotoAndStop;
    i.gotoAndPlay = m.gotoAndPlay;
    i.animateTo = m.animateTo;
    i.gotoFrame = m.setFrame;
    i.getTotalFrames = m.getTotalFrames;
    i.isStopped = m.isStopped;
    i.isPlaying = m.isPlaying;
    return i
}
function MainMenu(b) {
    function c(b) {
        ContentManager.path(b.currentTarget._storeData)
    }
    function d() {
        f.parentNode.removeChild(f)
    }
    var f = document.createElement("div"),
    h = 0,
    g = b.children.length;
    f.id = "menu-holder";
    for (h = 0; h < g; h++) {
        var e = b.children[h],
        m = document.createElement("div");
        m.innerHTML = e.getAttribute("data-menuTitle");
        m._storeData = e;
        m.addEventListener(MouseEvent.CLICK, c);
        m.className = "create-menu-item";
        f.appendChild(m)
    }
    f.animateIn = function() {
        TweenLite.to(f, 2, {
            css: {
                bottom: 50
            },
            ease: Quad.easeOut
        })
    };
    f.animatOut = function(b) {
        TweenLite.to(f, 2, {
            css: {
                bottom: 0
            },
            ease: Quad.easeOut,
            onComplete: b
        })
    };
    f.kill = function() {
        f.animatOut(d)
    };
    return f
}
function PlotFrontItems(b, c) {
    var d = document.createElement("div");
    d.id = "item-plot-area";
    var f = [],
    h = {
        green: [],
        orange: [],
        gray: [],
        blue: [],
        red: [],
        marine: [],
        purple: []
    },
    g = [];
    Assets.plottedItemsSections = h;
    d.init = function() {
        if (g.length > 0) {
            trace("don't build front items again");
            for (var e = g.length,
            m = 0; m < e; m = m + 1) g[m].item.onOut()
        } else {
            trace("building items to plot");
            for (var e = {},
            i = Assets.DATA_PAGES.querySelector("[data-type=frontpageItemsPositions]").children, q = 0, k = i.length; q < k; q = q + 1) {
                for (var n = i[q].getAttribute("id"), v = [], o = i[q].innerHTML.split(","), x = 0, z = o.length; x < z; x = x + 1) {
                    var t = Assets.trim(o[x]);
                    v.push(t)
                }
                e[n] = v
            }
            i = 0;
            for (q = Assets.centuryData.length; i < q; i = i + 1) {
                k = Assets.centuryData[i];
                n = k.items.length;
                for (v = 0; v < n; v = v + 1) {
                    x = k.items[v];
                    o = x.color;
                    z = {};
                    o.indexOf("#") == -1 && (o = "#" + o);
                    switch (o) {
                    case Assets.SECTION_COLOR_MARINE:
                        z.name = "marine";
                        z.arrPos = 6;
                        break;
                    case Assets.SECTION_COLOR_RED:
                        z.name = "red";
                        z.arrPos = 0;
                        break;
                    case Assets.SECTION_COLOR_BLUE:
                        z.name = "blue";
                        z.arrPos = 1;
                        break;
                    case Assets.SECTION_COLOR_GRAY:
                        z.name = "gray";
                        z.arrPos = 2;
                        break;
                    case Assets.SECTION_COLOR_ORANGE:
                        z.name = "orange";
                        z.arrPos = 3;
                        break;
                    case Assets.SECTION_COLOR_GREEN:
                        z.name = "green";
                        z.arrPos = 4;
                        break;
                    case Assets.SECTION_COLOR_PURPLE:
                        z.name = "purple";
                        z.arrPos = 5
                    }
                    o = z;
                    z = e[o.name];
                    if (v < z.length) {
                        t = z[v].split("|");
                        z = parseInt(t[0]);
                        t = parseInt(t[1]);
                        if (x.type == "product") {
                            m = x.title.split("|");
                            m = {
                                gravity: x.tooltipGravity,
                                data: '<h4 style="color:#' + x.color + '" class="TheinhardtMedium"> ' + m[0] + "</h4>" + m[1],
                                bgColor: "#" + x.color,
                                fontColor: "#" + x.color,
                                href: "timeline/" + k.path + "/",
                                href2: x.path
                            }
                        } else if (x.type == "quote") {
                            m = x.title.split("|");
                            m = {
                                gravity: x.tooltipGravity,
                                data: "<i>" + m[0] + "</i><br />" + ('<b style="color:#' + x.color + '">' + m[1] + "</b>"),
                                bgColor: "#" + x.color,
                                fontColor: "#" + x.color
                            }
                        }
                        var p = "images/items/" + o.name + "/dot.png",
                        w = "images/items/" + o.name + "/dot_hover.png";
                        if (x.thumb != null && x.thumbHover != null) {
                            p = x.thumb;
                            w = x.thumbHover
                        }
                        if (p.indexOf("assets/") > -1) var u = p.split("assets/"),
                        p = u[1];
                        if (w.indexOf("assets/") > -1) {
                            u = w.split("assets/");
                            w = u[1]
                        }
                        x = new GraphicBtnTooltip(p, w, m, x.tooltipOffset);
                        x.style.position = "absolute";
                        x.style.left = parseInt(c[o.arrPos].style.left) + z + "px";
                        x.style.top = parseInt(c[o.arrPos].style.top) + t + "px";
                        x.style.cursor = "pointer";
                        x.href = m.href;
                        x.path = 10;
                        x.style.opacity = 0;
                        x.init();
                        f.push(x);
                        d.appendChild(x);
                        z = Assets.getOffset(b).left + 215;
                        t = Assets.getOffset(b).top + 215;
                        z = {
                            x: z,
                            y: t
                        };
                        x.x = Assets.getOffset(x).left;
                        x.y = Assets.getOffset(x).top;
                        distanceToCenter = Assets.lineDistance(z, x);
                        g.push({
                            item: x,
                            dist: distanceToCenter,
                            num: i
                        });
                        h[o.name].push(x)
                    }
                }
            }
        }
    };
    d.showPlottedItems = function() {
        g = g.sortOn("dist");
        for (var b = g.length,
        c = BrowserDetect.TABLET ? 0.5 : 1, d = [{
            start: 1,
            random: 0
        },
        {
            start: 2,
            random: 0
        },
        {
            start: 3,
            random: 0
        },
        {
            start: 4,
            random: 0
        },
        {
            start: 5,
            random: 0
        },
        {
            start: 6,
            random: 0
        },
        {
            start: 0,
            random: 0
        }], f = 0; f < b; f = f + 1) {
            var h = d[g[f].num];
            h.random = h.random + 0.1;
            var n = h.start * 0.2;
            g[f].item.style.opacity = 0;
            TweenLite.to(g[f].item, c, {
                delay: n + h.random,
                css: {
                    opacity: 1
                },
                ease: Quad.easeInOut,
                overwrite: true
            });
            if (f === b - 2) Assets.itemsPlotted = true
        }
    };
    d.hidePlottedItems = function(b, c) {
        g = g.sortOn("dist");
        var d = [{
            start: 1,
            random: 0
        },
        {
            start: 2,
            random: 0
        },
        {
            start: 3,
            random: 0
        },
        {
            start: 4,
            random: 0
        },
        {
            start: 5,
            random: 0
        },
        {
            start: 6,
            random: 0
        },
        {
            start: 0,
            random: 0
        }],
        f = g.length;
        if (c == null) for (var h = 0; h < f; h = h + 1) if (g[h].item == b) {
            c = g[h].num;
            break
        }
        for (var h = [[0, 0.2, 0.6, 1, 1, 0.6, 0.2], [0.2, 0, 0.2, 0.6, 1, 1, 0.6], [0.6, 0.2, 0, 0.2, 0.6, 1, 1], [1, 0.6, 0.2, 0, 0.2, 0.6, 1], [1, 1, 0.6, 0.2, 0, 0.2, 0.6], [0.6, 1, 1, 0.6, 0.2, 0, 0.2], [0.2, 0.6, 1, 1, 0.6, 0.2, 0]], n = 0, v = 0; v < f; v = v + 1) {
            var o = g[v].item,
            n = c > -1 ? 1 - h[c][g[v].num] : d[g[v].num].start * 0.1;
            TweenLite.to(o, 0.5, {
                delay: n * 0.5,
                css: {
                    opacity: 0
                },
                ease: Quad.easeInOut,
                overwrite: false
            })
        }
    };
    d.kill = function() {
        trace("kill plotted items")
    };
    d.plottedItemsArr = f;
    return d
}
function CircularFrontMenu(b, c) {
    var d;
    function f(b, c) {
        TweenLite.to(b, 0.3, {
            css: {
                opacity: 1,
                shortRotation: c
            },
            ease: Sine.easeOut,
            overwrite: true
        })
    }
    function h(b, c) {
        TweenLite.to(b, 0.2, {
            css: {
                opacity: 0,
                shortRotation: c
            },
            ease: Sine.easeOut,
            overwrite: true
        })
    }
    var g = document.createElement("div");
    g.style.position = "absolute";
    var e = ["top", "top", "top", "top", "top", "top", "top"],
    m = [Assets.SECTION_COLOR_RED, Assets.SECTION_COLOR_BLUE, Assets.SECTION_COLOR_GRAY, Assets.SECTION_COLOR_ORANGE, Assets.SECTION_COLOR_GREEN, Assets.SECTION_COLOR_PURPLE, Assets.SECTION_COLOR_MARINE],
    i = ["2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "1.png"],
    q = [{
        start: 129,
        end: 211
    },
    {
        start: 78,
        end: 196
    },
    {
        start: 27,
        end: 181
    },
    {
        start: -24,
        end: 166
    },
    {
        start: -75,
        end: 151
    },
    {
        start: -126,
        end: 136
    },
    {
        start: 180,
        end: 226
    }];
    g.tooltipArr = e;
    g.ACTIVE_COLOR = null;
    var k = [],
    n = -1,
    v = new ChildContainer;
    v.className = "child-container";
    typeof c == "undefined" && (c = false);
    var o = [{
        color: "orange",
        path: "regeneration",
        min: 180,
        max: 230,
        item: null
    },
    {
        color: "green",
        path: "power-play",
        min: 230,
        max: 280,
        item: null
    },
    {
        color: "purple",
        path: "designing-better-worlds",
        min: 280,
        max: 330,
        item: null
    },
    {
        color: "marine",
        path: "new-century",
        min: 330,
        max: 30,
        item: null
    },
    {
        color: "red",
        path: "avant-garde-playtime",
        min: 30,
        max: 80,
        item: null
    },
    {
        color: "blue",
        path: "light-air-health",
        min: 80,
        max: 130,
        item: null
    },
    {
        color: "gray",
        path: "children-body-politics",
        min: 130,
        max: 180,
        item: null
    }],
    x = function(b, c) {
        if (n != b) {
            n = b;
            for (var d = c ? 0 : 1.6, f = 0; f < e.length; f = f + 1) {
                var g = {};
                g.start = q[f].start;
                g.end = q[f].end;
                g.center = [172, 175];
                g.radius = 250;
                g.dir = -1;
                if (b == 360) {
                    g.end = q[f].start;
                    g.start = q[f].end
                }
                TweenLite.to(e[f], d, {
                    arc: g,
                    ease: Quad.easeInOut
                });
                if (e[f].style.opacity == 0) {
                    var h = [5, 4, 3, 2, 1, 0, 6][f] * 100 + 800,
                    i = {};
                    i.start = q[f].start;
                    i.end = q[f].end;
                    i.center = [172, 175];
                    i.radius = 250;
                    i.dir = -1;
                    i.end = i.end + 110;
                    e[f].style.opacity = 1;
                    TweenLite.to(e[f], 0, {
                        arc: i,
                        overwrite: true
                    });
                    g.start = g.end + 110;
                    TweenLite.to(e[f], 0.6, {
                        delay: h / 1E3,
                        arc: g,
                        overwrite: true
                    })
                }
            }
        }
    },
    z = document.createElement("div"),
    t = document.createElement("div");
    t.id = "wheel-container";
    var p = document.createElement("div");
    p.id = "wheel-container-inner";
    Assets.wheelInner = p;
    var w = Assets.DATA_CIRCULAR_MENU;
    g.appendChild(t);
    g.appendChild(p);
    for (var k = [], u = 0, y = o.length; u < y; u = u + 1) {
        var D = document.createElement("div");
        D.className = "wheel-color-container wheel-color-" + o[u].color;
        D.colorName = o[u].color;
        D.path = o[u].path;
        o[u].item = D;
        k.push(D);
        g.appendChild(D)
    }
    g.appendChild(z);
    g.appendChild(v);
    v.start();
    u = 1;
    y = 0;
    d = ContentManager.extractPath(window.location.hash).split("/");
    D = null;
    d = d[0];
    if (BrowserDetect.TABLET) BrowserDetect.TABLET && (d == "timeline" && D == null) && (y = 10);
    else y = u = 1;
    D = d == "timeline" && D == null ? 1 : 0.8;
    TweenLite.to(t, u, {
        css: {
            opacity: 1
        },
        ease: Quad.easeOut,
        overwrite: true
    });
    TweenLite.to(p, 0, {
        css: {
            scale: D
        }
    });
    TweenLite.to(p, 1.3, {
        delay: y + 0.1,
        css: {
            opacity: 1,
            scale: 1
        },
        ease: Quad.easeOut,
        overwrite: true,
        onComplete: function() {
            p.style["-webkit-transform"] = ""
        }
    });
    TweenLite.to(z, u, {
        delay: y + 0.5,
        css: {
            opacity: 1
        },
        ease: Quad.easeOut,
        overwrite: true
    });
    TweenLite.to(v, 2, {
        delay: y + 3,
        css: {
            opacity: 1
        },
        ease: Linear.easeNone,
        overwrite: true
    });
    trace("createTooltips()");
    for (t = 0; t < 7; t++) {
        y = w[t].innerHTML;
        u = w[t].getAttribute("data-path");
        y = y.split("|");
        D = "<h4 class='tooltip-copy' style='color:" + m[t] + "'>" + y[0] + "</h4>";
        D = D + y[1];
        u = new Tooltip({
            gravity: e.shift(),
            bgColor: m[t],
            img: i[t],
            data: D,
            href: "timeline/" + u,
            type: "menu"
        });
        e.push(u);
        z.appendChild(u)
    }
    m = 0;
    BrowserDetect.TABLET || (m = 1E3);
    setTimeout(function() {
        if (n != 180) {
            n = 360;
            for (var c = 0; c < e.length; c = c + 1) {
                var d = {};
                d.start = q[c].start;
                d.end = q[c].end;
                d.center = [172, 175];
                d.radius = 250;
                d.dir = -1;
                d.end = q[c].start;
                d.start = q[c].end;
                TweenLite.to(e[c], 0, {
                    arc: d
                });
                TweenLite.to(e[c], b == 360 ? 1.5 : 0.5, {
                    delay: [1, 2, 3, 4, 5, 6, 0][c] * 0.15 + 1.2,
                    css: {
                        opacity: 1
                    }
                })
            }
        }
    },
    m);
    g.drawCircle180 = function() {
        trace("drawCircle180()");
        BrowserDetect.TABLET || g.removeEvents();
        x(180);
        v.stop();
        for (var b = 0,
        c = o.length; b < c; b = b + 1) TweenLite.to(o[b].item, 1, {
            css: {
                shortRotation: -90
            },
            ease: Quad.easeOut,
            overwrite: true
        })
    };
    g.drawCircle360 = function() {
        trace("drawCircle360()");
        x(360);
        v.start();
        for (var b = 0,
        c = o.length; b < c; b = b + 1) TweenLite.to(o[b].item, 0.3, {
            css: {
                opacity: 0
            },
            ease: Quad.easeOut,
            overwrite: true
        })
    };
    g.onMouseMove = g._onMouseMove = function(b) {
        for (var c = Assets.getOffset(z).left + 215, d = Assets.getOffset(z).top + 215, c = Math.atan2(b.pageX - c, b.pageY - d), b = c * (180 / Math.PI) * -1 + 90, b = Math.round(b), c = Math.round(c * (180 / Math.PI)), c = 360 - (c + 180), d = 0, e = k.length; d < e; d = d + 1) {
            var i = o[d];
            g.ACTIVE_COLOR == i.color ? f(k[d], b) : i.color === "marine" && (c >= i.min || c <= i.max) ? f(k[d], b) : c >= i.min && c <= i.max ? f(k[d], b) : h(k[d], b)
        }
    };
    g.removeEvents = function() {
        trace("Wheel: EVENTS REMOVED");
        document.removeEventListener(MouseEvent.MOUSE_MOVE, g.onMouseMove)
    };
    g.addEvents = function() {
        trace("Wheel: EVENTS ADDED");
        trace("wheelMode: " + n);
        document.addEventListener(MouseEvent.MOUSE_MOVE, g.onMouseMove, false)
    };
    g.init = void 0;
    g.hideTooltips = function() {
        var b = e.length,
        c = e.slice();
        c.shuffle();
        for (var d = 0; d < b; d++) c[d].fadeOut(0)
    };
    g.setColor = function(b) {
        var c;
        if (b != null) {
            for (var d = 0; d < k.length; d++) if (k[d].path == b) {
                g.ACTIVE_COLOR = k[d];
                c = k[d].colorName;
                break
            }
            b = 0;
            for (d = o.length; b < d; b = b + 1) {
                var e = o[b].item;
                o[b].color == c ? f(e, -90) : h(e, -90)
            }
        } else g.ACTIVE_COLOR = null
    };
    g.showChild = function() {
        trace("show child");
        g.appendChild(v);
        TweenLite.to(v, 0.5, {
            delay: 0.2,
            css: {
                opacity: 1
            },
            ease: Quad.easeOut,
            overwrite: true
        })
    };
    g.hideChild = function() {
        trace("hide child");
        TweenLite.to(v, 0.5, {
            delay: 0,
            css: {
                opacity: 0
            },
            ease: Quad.easeOut,
            overwrite: false,
            onComplete: function() {
                g.removeChild(v)
            }
        })
    };
    g.kill = function() {
        document.removeEventListener(MouseEvent.MOUSE_MOVE, null)
    };
    return g
}
function CreateCircularFrontMenu() {
    var b = document.createElement("div");
    b.className = "create-circular-front-menu";
    b.tooltipArr = ["left", "top", "right", "bottom", "left", "top", "bottom"];
    var c = null,
    d = null,
    f = null;
    Assets.CURRENT_PAGE = c;
    var h = 360,
    g = b.showDotsImmediately = false;
    b.isShown = true;
    b.init = function() {
        function e() {
            TweenLite.to(n, 1, {
                delay: 0.2,
                css: {
                    opacity: "0"
                },
                ease: Quad.easeOut,
                overwrite: true
            })
        }
        function m(b, c) {
            typeof c == "undefined" && (c = 0.5);
            var d = "assets/images/ui/timeline_dots_";
            b == "regeneration" ? d = d + "orange": b == "power-play" ? d = d + "green": b == "designing-better-worlds" ? d = d + "purple": b == "new-century" ? d = d + "marine": b == "light-air-health" ? d = d + "blue": b == "children-body-politics" ? d = d + "gray": b == "avant-garde-playtime" && (d = d + "red");
            TweenLite.to(v, c, {
                delay: c,
                css: {
                    opacity: "0"
                },
                ease: Quad.easeOut,
                overwrite: false,
                onComplete: function() {
                    v.img.src = d + ".png";
                    v.img.onload = function() {}
                }
            })
        }
        function i() {
            trace("Create.onResize();");
            k.style.left = Assets.DOCUMENT_WIDTH * 0.5 + "px";
            if (c == "timeline") {
                k.style.top = Assets.DOCUMENT_HEIGHT + 110 + "px";
                n.style.top = Assets.DOCUMENT_HEIGHT - 279 + "px";
                n.style.left = Assets.DOCUMENT_WIDTH * 0.5 - 346 + "px"
            }
        }
        var q = ContentManager.extractPath(window.location.hash).split("/");
        d = c;
        c = q[0];
        c == "timeline" && (f = q[1]);
        if (c == "timeline" && d == null) {
            h = 180;
            g = true
        }
        var k = new CircularFrontMenu(h, g);
        k.id = "wheel-menu-container";
        k.style.left = Assets.DOCUMENT_WIDTH * 0.5 + "px";
        k.style.top = Assets.DOCUMENT_HEIGHT * 0.5 + "px";
        _wheelMenuContainer = k;
        Assets.wheelMenuContainer = k;
        var n = document.createElement("div");
        n.className = "elipse-bg";
        n.style.background = "url(" + AssetLoader.getAsset("images/ui/home/elipse_half_bg.png").src + ") no-repeat";
        n.style.top = Assets.DOCUMENT_HEIGHT - 279 + "px";
        n.style.left = Assets.DOCUMENT_WIDTH * 0.5 - 346 + "px";
        var v = document.createElement("div");
        v.className = "timeline-dot-bg";
        v.img = new Image;
        v.style.top = Assets.DOCUMENT_HEIGHT - 208 + "px";
        v.style.left = Assets.DOCUMENT_WIDTH * 0.5 - 320 + "px";
        v.style.opacity = 0;
        Assets.wheelMenuInstance = k;
        b.appendChild(k);
        Assets.circularMenu.doOnTimelineIn = function() {
            k.drawCircle180();
            i();
            var b = ContentManager.extractPath(window.location.hash).split("/");
            d = c;
            c = b[0];
            f = b[1];
            trace(f, "_currentCentury");
            k.setColor(f);
            m(f)
        };
        b.showBgs = function(b) {
            typeof b == "undefined" && (b = 0);
            TweenLite.to(n, 1, {
                delay: b + 0.1,
                css: {
                    opacity: "1"
                },
                ease: Quad.easeOut,
                overwrite: true
            })
        };
        b.hideBgs = e;
        Assets.circularMenu.doOnTimelineOut = function() {
            trace("doOnTimelineOut();");
            Assets.fadeInItemsOnFrontPageTiming = 500;
            TweenLite.to(k, 1, {
                delay: 0.3,
                css: {
                    top: Assets.DOCUMENT_HEIGHT * 0.5 + "px"
                },
                ease: Quad.easeInOut,
                overwrite: true,
                onComplete: function() {
                    setTimeout(function() {
                        k.showChild()
                    },
                    200);
                    v.img.src = null;
                    v.style.background = "none"
                }
            });
            e();
            k.drawCircle360();
            k.setColor(null)
        };
        if (c == "timeline" && f == null && d == null) {
            b.hideMenu();
            setTimeout(function() {
                b.showMenu()
            },
            3E3)
        } else TweenLite.to(k, 1, {
            delay: 0.5,
            css: {
                opacity: 1
            },
            ease: Quad.easeOut,
            overwrite: true
        });
        b.getNewTimelineDotBg = m;
        _onResize = i
    };
    b.showMenu = function(c) {
        trace("showMenu()");
        c || (c = 0);
        b.isShown = true;
        TweenLite.to(_wheelMenuContainer, 1.4, {
            delay: c,
            css: {
                top: Assets.DOCUMENT_HEIGHT + 110 + "px"
            },
            ease: Quad.easeInOut,
            overwrite: true
        });
        b.showBgs(c + 1)
    };
    b.hideMenu = function(c) {
        trace("showhideMenuMenu()");
        typeof c == "undefined" ? c = 0 : c < 1.5 && (c = 1.5);
        b.isShown = false;
        TweenLite.to(_wheelMenuContainer, 2, {
            delay: c,
            css: {
                top: Assets.DOCUMENT_HEIGHT + 400 + "px"
            },
            ease: Quad.easeOut,
            overwrite: true
        });
        b.hideBgs()
    };
    b.toTimelineTransitionCentury = function(b) {
        Assets.CURRENT_PAGE == "homepage" ? Assets.homePageInstance.toTimelineTransitionCentury(b) : ContentManager.path(b)
    };
    Assets.transit.fromHomeToTimelineCentury = b.toTimelineTransitionCentury;
    b.kill = function() {};
    return b
}
function Footer(b) {
    function c(b) {
        d(b.currentTarget)
    }
    function d(b) {
        TweenLite.to(b._hoverImage, 0.2, {
            css: {
                top: -12
            },
            ease: Quad.easeOut
        })
    }
    function f(b) {
        h(b.currentTarget)
    }
    function h(b) {
        b._isSelected != true && TweenLite.to(b._hoverImage, 0.2, {
            css: {
                top: 28
            },
            ease: Quad.easeIn
        })
    }
    function g(b) {
        var b = b.currentTarget,
        c = b._storeData;
        if (c.getAttribute("data-type") == "external") window.open(c.getAttribute("data-link"), "_blank");
        else {
            x = b = b._storeTemplateNumber;
            if (!o) {
                G.appendChild(B);
                G.appendChild(I);
                G.appendChild(H);
                G.appendChild(K);
                o = true
            }
            c = t[b];
            d(c);
            c._isSelected = true;
            if (p != null) {
                p._isSelected = false;
                h(p)
            }
            p = c;
            b = -(b * Assets.getDocumentSize().width);
            if (z) TweenLite.to(G, 0.6, {
                css: {
                    left: b
                },
                ease: Quad.easeInOut
            });
            else {
                G.style.left = b + "px";
                Assets.SCREEN_SCROLL_ENABLED && (u = true);
                Assets.SCREEN_SCROLL_ENABLED = false;
                E.style.display = "block";
                E.style.top = "-22px";
                E.style.right = "90px";
                TweenLite.to(E, 0.1, {
                    css: {
                        top: -22,
                        right: 90
                    },
                    overwrite: true
                });
                w = document.createElement("div");
                w.className = "footer-dim";
                w.style.top = -(Assets.DOCUMENT_HEIGHT * 2 - 550) + "px";
                w.style.height = Assets.DOCUMENT_HEIGHT * 2 + "px";
                w.style.zIndex = -10;
                w.addEventListener(MouseEvent.CLICK, i);
                w.addEventListener(TouchEvent.TOUCH_START, i);
                y.appendChild(w);
                w.addEventListener(MouseEvent.MOUSE_OUT,
                function() {
                    TweenLite.to(E, 1.5, {
                        delay: 0.3,
                        css: {
                            top: -22,
                            right: 90
                        },
                        overwrite: false,
                        ease: Quad.easeInOut
                    })
                });
                w.addEventListener(MouseEvent.MOUSE_MOVE, m);
                z = true;
                TweenLite.to(y, 0.7, {
                    css: {
                        top: -550
                    },
                    ease: Quad.easeOut
                });
                TweenLite.to(E, 0.4, {
                    css: {
                        opacity: 1
                    },
                    ease: Quad.easeOut
                });
                TweenLite.to(w, 0.5, {
                    css: {
                        opacity: 1
                    }
                })
            }
        }
    }
    function e() {
        for (var b = [B, I, H, K], c = 0, d = b.length; c < d; c = c + 1) {
            var e = b[c];
            e.style.left = Assets.DOCUMENT_WIDTH * c + (Assets.DOCUMENT_WIDTH - e._storeWidth) * 0.5 + "px"
        }
        G.style.left = -(x * Assets.DOCUMENT_WIDTH) + "px";
        if (w) {
            w.style.top = -(Assets.DOCUMENT_HEIGHT * 2 - 550) + "px";
            w.style.height = Assets.DOCUMENT_HEIGHT * 2 + "px"
        }
    }
    function m(b) {
        var c = Assets.getDocumentSize().width - b.clientX,
        d = -(Assets.getDocumentSize().height - 580 - b.clientY);
        if (b.type == "mouseover" && E.style.top == "-22px" && E.style.right == "90px") {
            c = 68;
            d = 0
        }
        d > 0 && (d = 0);
        TweenLite.to(E, 0.5, {
            css: {
                top: d - 22,
                right: c + 22
            },
            overwrite: true
        })
    }
    function i() {
        E.style.display = "none";
        if (u) Assets.SCREEN_SCROLL_ENABLED = true;
        u = null;
        if (p) {
            p._isSelected = false;
            h(p);
            p = null
        }
        z = false;
        TweenLite.to(y, 0.5, {
            css: {
                top: 0
            },
            ease: Quad.easeIn,
            onComplete: q
        });
        TweenLite.to(E, 0.3, {
            css: {
                opacity: 0
            },
            ease: Quad.easeOut
        });
        TweenLite.to(w, 0.5, {
            css: {
                opacity: 0
            },
            onComplete: function() {
                y.removeChild(w);
                w = null
            }
        })
    }
    function q() {
        if (o) {
            G.removeChild(B);
            G.removeChild(I);
            G.removeChild(H);
            G.removeChild(K);
            o = false
        }
    }
    var k = document.createElement("div"),
    n = 0,
    v = b.children.length,
    o = false,
    n = [],
    x = 0,
    z = false,
    t = [],
    p = null,
    w,
    u;
    k.id = "footer";
    var y = document.createElement("div");
    y.className = "footer-content-area";
    var D = AssetLoader.getAsset("images/ui/footer/main_bg.png");
    D.id = "footerBGImage";
    D.className = "footer-bg-image";
    var G = document.createElement("div");
    G.className = "footer-template-area";
    y.appendChild(D);
    var E = new GraphicBtn("images/ui/buttons/close-out.png", "images/ui/buttons/close-over.png");
    E.className = "add-close-button";
    y.appendChild(E);
    E.init();
    E.addEventListener(MouseEvent.CLICK, i);
    E.addEventListener(MouseEvent.MOUSE_OVER, m);
    var B = new Footer.about(b.querySelector("[data-gfx=btn_about]")),
    I = new Footer.relatedEvents(b.querySelector("[data-gfx=btn_related_events]")),
    H = new Footer.furtherReading(b.querySelector("[data-gfx=btn_further_reading]")),
    K = new Footer.credits(b.querySelector("[data-gfx=btn_credits]"));
    B._storeWidth = 1E3;
    H._storeWidth = 1E3;
    I._storeWidth = 1E3;
    K._storeWidth = 1E3;
    n.push(B);
    n.push(H);
    n.push(I);
    n.push(K);
    e();
    window.addEventListener(Event.RESIZE, e, false);
    window.addEventListener("orientationchange", e, false);
    y.appendChild(G);
    k.appendChild(y);
    for (var D = document.createElement("div"), J = null, C = 50, A = 0, n = 0; n < v; n = n + 1) {
        var s = b.children[n],
        F = document.createElement("div");
        F.style.position = "absolute";
        var L = AssetLoader.getAsset("images/ui/footer/" + s.getAttribute("data-gfx") + ".png");
        L.style.position = "absolute";
        L.style.top = "-4px";
        F._storeImageWidth = L.width;
        F.appendChild(L);
        if (s.getAttribute("data-type") != "share") {
            var M = AssetLoader.getAsset("images/ui/footer/" + s.getAttribute("data-gfx") + "_hover.png");
            M.className = "hover-button";
            F.appendChild(M);
            F.className = "footer-menu-item";
            F.style.width = F._storeImageWidth - 6 + "px";
            F._hoverImage = M;
            F._normalImage = L;
            M = MouseEvent.MOUSE_DOWN;
            if (s.getAttribute("data-type") == "external") M = MouseEvent.CLICK;
            else {
                F._storeTemplateNumber = A;
                A = A + 1;
                t.push(F)
            }
            F._storeData = s;
            F.addEventListener(M, g);
            F.addEventListener(MouseEvent.MOUSE_OVER, c);
            F.addEventListener(MouseEvent.MOUSE_OUT, f);
            F._isSelected = false
        } else {
            s = document.createElement("div");
            s.className = "twitter-share";
            s.style.backgroundImage = "url(" + Assets.IMAGE_BLANK + ")";
            M = AssetLoader.getAsset("images/ui/footer/btn_twitter_hover.png");
            M.className = "social-hover";
            s.appendChild(M);
            s._hoverImage = M;
            s.addEventListener(MouseEvent.CLICK,
            function() {
                Share.twitter("Century of the Child exhibition via @MuseumModernArt  http://www.moma.org/centuryofthechild #momacotc")
            });
            s.addEventListener(MouseEvent.MOUSE_OVER, c);
            s.addEventListener(MouseEvent.MOUSE_OUT, f);
            F.className = "footer-menu-item";
            F.style.width = F._storeImageWidth - 6 + "px";
            F.appendChild(s);
            s = document.createElement("div");
            s.className = "facebook-share";
            s.style.backgroundImage = "url(" + Assets.IMAGE_BLANK + ")";
            M = AssetLoader.getAsset("images/ui/footer/btn_facebook_hover.png");
            s.appendChild(M);
            M.className = "social-hover";
            s._hoverImage = M;
            s.addEventListener(MouseEvent.CLICK,
            function() {
                Share.facebook("http://www.moma.org/interactives/exhibitions/2012/centuryofthechild")
            });
            s.addEventListener(MouseEvent.MOUSE_OVER, c);
            s.addEventListener(MouseEvent.MOUSE_OUT, f);
            F.appendChild(s)
        }
        J == null ? F.style.left = "0px": n == v - 1 ? F.style.right = "0px": F.style.left = parseInt(J.style.left) + J._storeImageWidth - 14 + "px";
        F.style.zIndex = C;
        C = C - 1;
        J = F;
        D.appendChild(F)
    }
    k.appendChild(D);
    k.animateIn = function() {
        var b = window.location.href.split("#/timeline").length > 1 ? 0 : 3;
        TweenLite.to(k, 2, {
            delay: b,
            css: {
                top: -6
            },
            ease: Quad.easeOut
        })
    };
    k.animatOut = function() {
        TweenLite.to(k, 2, {
            css: {
                top: 100
            },
            ease: Quad.easeOut
        })
    };
    return k
}
Footer.credits = function(b) {
    var c = document.createElement("div");
    c.className = "footer-panel credits";
    c.innerHTML = b.innerHTML;
    return c
};
Footer.about = function(b) {
    var c = document.createElement("div");
    c.className = "footer-panel about";
    c.innerHTML = b.innerHTML;
    return c
};
Footer.relatedEvents = function(b) {
    var c = document.createElement("div");
    c.className = "footer-panel related-events";
    c.innerHTML = b.innerHTML;
    return c
};
Footer.furtherReading = function(b) {
    function c(b) {
        e = (b.offsetY ? b.offsetY: b.layerY) + 4;
        document.body.addEventListener(TouchEvent.TOUCH_MOVE, f);
        document.body.addEventListener(MouseEvent.MOUSE_MOVE, f)
    }
    function d() {
        document.body.removeEventListener(TouchEvent.TOUCH_MOVE, f);
        document.body.removeEventListener(MouseEvent.MOUSE_MOVE, f)
    }
    function f(b) {
        b.preventDefault();
        var c = Assets.localToGlobal(m),
        c = b.pageY - c.y - e;
        c > g ? c = g: c < 0 && (c = 0);
        i.style.top = c + "px";
        var b = document.getElementById("further-reading-scroller"),
        c = c / g,
        d;
        if (c < 0.5) {
            d = b.children[0];
            c = c * 2;
            if (parseInt(b.children[1].style.marginTop) < 0) b.children[1].style.marginTop = "0px"
        } else {
            d = b.children[1];
            c = (c - 0.5) * 2;
            if (parseInt(b.children[0].style.marginTop) < b.children[0].offsetHeight - 430) b.children[0].style.marginTop = -(b.children[0].offsetHeight - 430) + "px"
        }
        d.style.marginTop = -(d.offsetHeight - 430) * c + "px"
    }
    var h = document.createElement("div");
    h.className = "footer-panel further-reading";
    h.innerHTML = b.innerHTML;
    var g = 331,
    e, m = document.createElement("div");
    m.className = "scroll-container";
    h.appendChild(m);
    var i = document.createElement("div");
    i.className = "scrollbar";
    m.appendChild(i);
    i.addEventListener(MouseEvent.MOUSE_DOWN, c);
    i.addEventListener(TouchEvent.TOUCH_START, c);
    document.body.addEventListener(MouseEvent.MOUSE_UP, d);
    document.body.addEventListener(TouchEvent.TOUCH_END, d);
    return h
};
function ChildLogo() {
    var b = document.createElement("div");
    b.className = "logo";
    b.addEventListener(MouseEvent.MOUSE_DOWN,
    function() {
        ContentManager.path("")
    });
    var c = AssetLoader.getAsset("images/ui/child-logo.png");
    c.className = "logo-image";
    c.style.left = -c.width - 30 + "px";
    b.appendChild(c);
    b.animateIn = function() {
        var b = window.location.href.split("#/timeline").length > 1 ? 2 : 4;
        TweenLite.to(c, 1, {
            delay: b,
            css: {
                left: 5
            },
            ease: Quad.easeOut
        })
    };
    b.animatOut = function() {
        TweenLite.to(c, 1, {
            delay: 2,
            css: {
                left: -c.width
            },
            ease: Quad.easeInOut
        })
    };
    return b
}
function MomaLogo() {
    var b = document.createElement("div");
    b.className = "moma-logo";
    b.addEventListener(MouseEvent.MOUSE_DOWN,
    function() {
        window.open("http://moma.org")
    });
    var c = AssetLoader.getAsset("images/ui/logo.png");
    c.className = "moma-logo-graphic";
    b.appendChild(c);
    b.animateIn = function() {
        var b = window.location.href.split("#/timeline").length > 1 ? 2 : 4;
        TweenLite.to(c, 1, {
            delay: b,
            css: {
                left: -c.width - 20
            },
            ease: Cubic.easeOut
        })
    };
    b.animatOut = function() {
        TweenLite.to(c, 1, {
            delay: 2,
            css: {
                left: 0
            },
            ease: Cubic.easeOut
        })
    };
    return b
} (function(b) {
    function c(d) {
        var f = false,
        h = this;
        h.isOutOfView = false;
        var g, e, m, i, q = {
            x: 10,
            y: 10,
            width: 30,
            height: 30,
            gravity: "right",
            bgColor: "#000",
            fontColor: "#fff",
            img: null,
            data: "<h4>Lorem Ipsum</h4>",
            href: null,
            offsetX: 0,
            offsetY: 0,
            type: false
        },
        k = "";
        h.init = function() {
            if (d !== void 0) {
                if (d.height === void 0 && d.width !== void 0) q.height = d.width;
                h.mergeObjects(q, d, true)
            }
            i = q;
            var b = i.width,
            c = document.createElement("div");
            c.style.width = i.width + "px";
            c.style.height = i.height + "px";
            if (i.img == "plus") {
                var f = new CircleShape(i.fontColor.substring(1, 7), "plus", "large");
                c.appendChild(f)
            } else if (i.img) {
                k = i.img;
                k.indexOf("/") == -1 && (k = "assets/images/ui/buttons/" + k);
                c.style.background = "url(" + k + ")"
            }
            c.style.color = i.fontColor;
            c.style.borderRadius = b + "px";
            c.style.position = "absolute";
            c.style.textAlign = "center";
            c.style.cursor = "pointer";
            if (i.offsetX) c.style.backgroundPosition = i.offsetX + "px";
            if (i.offsetY) c.style.top = i.offsetY + "px";
            b = m = document.createElement("div");
            b.style.position = "absolute";
            b.style.width = "12px";
            b.style.height = "20px";
            b.style.margin = "6px 0 0 14px";
            b.style.webkitTransform = "rotate(90deg)";
            b.style.MozTransform = "rotate(90deg)";
            b.style.msTransform = "rotate(90deg)";
            b.style.transform = "rotate(90deg)";
            b.style.background = "url(" + AssetLoader.getAsset("images/ui/buttons/arrow.png").src + ") no-repeat";
            b.style.backgroundSize = "100% 100%";
            b.style.pointerEvents = "none";
            b.style.zIndex = 101;
            b.style.opacity = 0;
            c.arrow = b;
            c.appendChild(b);
            b = e = document.createElement("div");
            b.className = "wheel-menu-tooltip-bubble";
            f = document.createElement("div");
            f.style.position = "absolute";
            f.innerHTML = i.data;
            if (i.data.indexOf("<h") > -1) {
                f.style.fontSize = "16px";
                f.style.maxWidth = "400px"
            } else {
                f.style.fontSize = "12px";
                f.style.maxWidth = "300px"
            }
            document.body.appendChild(f);
            document.body.appendChild(b);
            f.style.width = f.offsetWidth + 3 + "px";
            f.style.position = "relative";
            document.body.removeChild(f);
            f.className = "inner";
            f.style.fontSize = "inherit";
            f.style.textAlign = "left";
            b.style.pointerEvents = "none";
            f.style.pointerEvents = "none";
            b.style.opacity = 0;
            b.style.zIndex = 100;
            b.style.webkitTransform = "scale(0.9)";
            b.style.MozTransform = "scale(0.5)";
            b.textWrapper = f;
            b.appendChild(f);
            b.style.marginLeft = "28px";
            b.style.marginTop = -f.offsetHeight / 2 + 9 + "px";
            if (f.offsetHeight > 40) {
                f.style.margin = "15px 35px 15px 35px";
                f.isTall = true;
                b.style.marginTop = parseInt(b.style.marginTop) - 10 + "px"
            }
            f = g = document.createElement("div");
            f.style.left = i.x + "px";
            f.style.top = i.y + "px";
            f.style.position = "absolute";
            f.style.opacity = 0;
            f.style.zIndex = 10;
            f.style.width = i.width + "px";
            f.style.height = i.height + "px";
            f.style.overflow = "visible";
            f.className = "thisIsAtooltip";
            f.fadeIn = h.fadeIn;
            f.fadeOut = h.fadeOut;
            f.show = h.show;
            f.hide = h.hide;
            f.onOver = h.tooltipMouseOver;
            f.onOut = h.tooltipMouseOut;
            f.currMouseState = null;
            f.click = h.tooltipClick;
            f.setPosition = h.setPosition;
            f.removeEvents = h.removeEvents;
            f.dot = c;
            f.bubble = b;
            f.gravity = i.gravity;
            f.kill = h.kill;
            f.appendChild(b);
            f.appendChild(c);
            h.initEvents();
            return g
        };
        h.kill = function() {};
        h.activate = function() {
            f = false
        };
        h.deactivate = function() {
            f = true
        };
        h.tooltipMouseOver = function() {
            var b = Assets.localToGlobal(g);
            if (Assets.getCurrentView() == "home" && (b.y < 0 || b.x < 0 || b.y > Assets.DOCUMENT_HEIGHT - 30 - 20 || b.x > Assets.DOCUMENT_WIDTH)) h.isOutOfView = true;
            else if (f == false) {
                g.currMouseState = "mouseOver";
                b = g;
                h.checkPosition();
                h.showBubble();
                Assets.homePageItemsMouseOverArr.indexOf(b) < 0 && Assets.homePageItemsMouseOverArr.push(b)
            }
        };
        h.tooltipMouseOut = function() {
            if (i.type != "timelineItem" && h.isOutOfView) h.isOutOfView = false;
            else if (f == false) {
                g.currMouseState = "mouseOut";
                var b = g;
                h.hideBubble();
                Assets.homePageItemsMouseOverArr.indexOf(b) > -1 && Assets.homePageItemsMouseOverArr.splice(Assets.homePageItemsMouseOverArr.indexOf(b))
            }
        };
        h.tooltipClick = function() {
            h.hideBubble(true)
        };
        h.showBubble = function() {
            g.dot.style.background = i.bgColor;
            g.style.zIndex = 9999;
            TweenLite.to(e, 0.1, {
                delay: 0,
                css: {
                    opacity: 1,
                    scale: 1,
                    transformOrigin: h.setCorrectGravity(g.gravity)
                },
                ease: Quad.easeOut,
                overwrite: true
            });
            TweenLite.to(m, 0, {
                delay: 0,
                css: {
                    opacity: 1
                },
                ease: Quad.easeInOut,
                overwrite: true
            })
        };
        h.hideBubble = function(b) {
            TweenLite.to(e, 0.1, {
                delay: 0.2,
                css: {
                    opacity: 0,
                    scale: 0.8,
                    transformOrigin: h.setCorrectGravity(g.gravity)
                },
                ease: Quad.easeInOut,
                onComplete: function() {
                    g.style.zIndex = 0
                },
                overwrite: true
            });
            TweenLite.to(m, 0, {
                delay: 0.25,
                css: {
                    opacity: 0
                },
                ease: Quad.easeInOut,
                overwrite: true,
                onComplete: function() {
                    g.dot.style.background = i.img ? "url(" + k + ")": i.bgColor;
                    if (i.href != null && b) {
                        Assets.imageData = {
                            path: "4",
                            image: new Image
                        };
                        if (g.parentNode.name == "GraphicBtnTooltip") {
                            Assets.transit.fromHomeToTimeline(g.parentNode, i.href);
                            h.hide()
                        } else Assets.transit.fromHomeToTimelineCentury(i.href)
                    }
                }
            })
        };
        h.checkPosition = function() {
            var c = g.x - g.bubble.offsetWidth,
            d = g.y + g.bubble.offsetHeight - 50,
            f = e.textWrapper.isTall != void 0 ? 28 : 0;
            if (b.innerWidth - (g.x + g.bubble.offsetWidth) < 200 && g.gravity == "right") g.gravity = "left";
            else if (c < 300 && g.gravity == "left") g.gravity = "top";
            else if (d < 300 && g.gravity == "top") g.gravity = "bottom";
            if (g.gravity != "right" && g.gravity == "left") {
                g.bubble.style.marginLeft = -parseInt(g.bubble.textWrapper.style.width) - 39 - f + "px";
                g.gravity = "left";
                m.style.webkitTransform = "rotate(-90deg)";
                m.style.MozTransform = "rotate(-90deg)";
                m.style.msTransform = "rotate(-90deg)";
                m.style.transform = "rotate(-90deg)";
                m.style.margin = "6px 0 0 4px"
            }
            if (g.gravity == "top") {
                g.bubble.style.marginLeft = -parseInt(g.bubble.textWrapper.style.width) / 2 - 7 + "px";
                g.bubble.style.marginTop = -parseInt(g.bubble.offsetHeight) + 2 + "px";
                g.gravity = "top";
                m.style.webkitTransform = "rotate(0deg)";
                m.style.MozTransform = "rotate(0deg)";
                m.style.msTransform = "rotate(0deg)";
                m.style.transform = "rotate(0deg)";
                m.style.margin = "0 0 0 9px";
                if (i.type == "timelineEvent" || i.type == "timelineItem") {
                    g.bubble.style.marginTop = parseInt(g.bubble.style.marginTop) - 2 + "px";
                    m.style.margin = "0 0 0 7px"
                }
            } else if (g.gravity == "bottom") {
                g.bubble.style.marginLeft = -parseInt(g.bubble.textWrapper.style.width) / 2 - 7 + "px";
                g.bubble.style.marginTop = "28px";
                g.gravity = "bottom";
                m.style.webkitTransform = "rotate(180deg)";
                m.style.MozTransform = "rotate(180deg)";
                m.style.msTransform = "rotate(180deg)";
                m.style.transform = "rotate(180deg)";
                m.style.margin = "11px 0 0 10px";
                if (i.type == "timelineEvent" || i.type == "timelineItem") {
                    g.bubble.style.marginTop = "22px";
                    m.style.margin = "9px 0 0 8px"
                }
            }
        };
        h.setPosition = function() {
            g.x = parseInt(Assets.getOffset(g).left);
            g.y = parseInt(Assets.getOffset(g).top)
        };
        h.setCorrectGravity = function(b) {
            if (b == "left") b = "right";
            else if (b == "right") b = "left";
            else if (b == "top" || b == "up") b = "bottom";
            else if (b == "bottom" || b == "down") b = "top";
            return b
        };
        h.fadeIn = function(b) {
            b != void 0 ? b: 0;
            c.fadeDelay = c.fadeDelay + 0.1;
            TweenLite.to(g, 0.7, {
                delay: 0,
                css: {
                    opacity: 1
                },
                ease: Quad.easeInOut
            });
            h.setPosition()
        };
        h.fadeOut = function(b) {
            b != void 0 ? b: 0;
            c.fadeDelay = c.fadeDelay + 0.1;
            TweenLite.to(g, 0.7, {
                delay: 0,
                css: {
                    opacity: 0
                },
                ease: Quad.easeInOut
            })
        };
        h.show = function(b, c) {
            b != void 0 ? b: 0;
            c != void 0 ? c: 0;
            TweenLite.to(g, c, {
                delay: b,
                css: {
                    opacity: 1
                },
                ease: Quad.easeInOut,
                overwrite: true
            });
            h.setPosition()
        };
        h.hide = function(b, c) {
            b != void 0 ? b: 0;
            c != void 0 ? c: 0;
            TweenLite.to(g, c, {
                delay: b,
                css: {
                    opacity: 0
                },
                ease: Quad.easeInOut,
                overwrite: true
            })
        };
        h.initEvents = function() {
            if (! (BrowserDetect.TABLET && i.type == "menu")) {
                g.dot.addEventListener(MouseEvent.MOUSE_OVER, h.tooltipMouseOver, false);
                g.dot.addEventListener(MouseEvent.MOUSE_OUT, h.tooltipMouseOut, false)
            }
            i.href != void 0 && g.addEventListener(MouseEvent.MOUSE_DOWN, h.tooltipClick, false)
        };
        h.removeEvents = function() {
            if (! (BrowserDetect.TABLET && i.type == "menu")) {
                g.dot.removeEventListener(MouseEvent.MOUSE_OVER, h.tooltipMouseOver);
                g.dot.removeEventListener(MouseEvent.MOUSE_OUT, h.tooltipMouseOut)
            }
            i.href != void 0 && g.removeEventListener(MouseEvent.MOUSE_DOWN, h.tooltipClick)
        };
        h.mergeObjects = function(b, c, d) {
            for (var e in c) if (d || b[e] === void 0) b[e] = c[e];
            return b
        };
        return h.init()
    }
    c.fadeDelay = 0;
    b.Tooltip = c
})(window);
function GraphicBtn(b, c) {
    function d(b) {
        typeof b == "function" && (i = b);
        m.style.display = "inline";
        TweenLite.to(m, g.fadeSpeed, {
            css: {
                opacity: 1
            },
            ease: Quad.easeOut,
            overwrite: true,
            onComplete: h
        })
    }
    function f(b) {
        if (m.style.display != "none") {
            typeof b == "function" && (i = b);
            TweenLite.to(m, g.fadeSpeed, {
                css: {
                    opacity: 0
                },
                ease: Quad.easeOut,
                overwrite: true,
                onComplete: function() {
                    m.style.display = "none"
                }
            })
        }
    }
    function h() {
        typeof i == "function" && i()
    }
    var g = document.createElement("div");
    g.className = "graphic-btn";
    g.fadeSpeed = 0.3;
    var e, m, i = null;
    g.init = function() {
        e = AssetLoader.getAsset(b);
        g.appendChild(e);
        g.over = d;
        g.out = f;
        if (c) {
            m = AssetLoader.getAsset(c);
            m.style.opacity = 0;
            m.style.display = "none";
            g.appendChild(m);
            g.addEventListener(MouseEvent.MOUSE_OVER, d);
            g.addEventListener(MouseEvent.MOUSE_OUT, f)
        }
    };
    g.kill = function() {
        g.removeEventListener(MouseEvent.MOUSE_OVER, d);
        g.removeEventListener(MouseEvent.MOUSE_OUT, f);
        g.style.cursor = "auto"
    };
    g.getHeight = function() {
        return e.height
    };
    g.getWidth = function() {
        return e.width
    };
    return g
}
function MoreBtn(b, c, d, f) {
    function h() {
        TweenLite.to(i, 0.3, {
            css: {
                opacity: 1
            },
            ease: Quart.easeOut,
            overwrite: true
        })
    }
    function g() {
        TweenLite.to(i, 0.3, {
            css: {
                opacity: 0
            },
            ease: Quart.easeOut,
            overwrite: true
        })
    }
    var e = typeof f != "undefined" ? new SmartObject: document.createElement("div"),
    m,
    i,
    q,
    k;
    e.style.position = "absolute";
    e.style.cursor = "pointer";
    e.init = function() {
        var f = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/more-btn-out-left.png"),
        v = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/more-btn-out-center.png"),
        o = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/more-btn-out-right.png");
        k = CircleShape(c, d);
        m = new Slice3Image(f, v, o);
        e.appendChild(m);
        f = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/more-btn-over-left.png");
        v = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/more-btn-over-center.png");
        o = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/more-btn-over-right.png");
        i = new Slice3Image(f, v, o);
        TweenLite.to(i, 0, {
            css: {
                opacity: 0
            },
            overwrite: true
        });
        e.appendChild(i);
        k.style.top = "13px";
        e.appendChild(k);
        e.addEventListener(MouseEvent.MOUSE_OVER, h);
        e.addEventListener(MouseEvent.MOUSE_OUT, g);
        q = new TextField;
        q.className = "text-field";
        e.appendChild(q);
        e.text(b)
    };
    e.kill = function() {
        e.removeEventListener(MouseEvent.MOUSE_OVER, h);
        e.removeEventListener(MouseEvent.MOUSE_OUT, g)
    };
    e.text = function(b) {
        q.setText(b);
        q.className = "text-field";
        b = Math.floor(q.getWidth()) + 65;
        m.setWidth(b);
        i.setWidth(b);
        k.style.left = b - 33 + "px";
        if (d == "arrowUp") {
            k.style.left = "16px";
            q.style.left = "43px"
        }
    };
    e.getHeight = function() {
        return m.getHeight()
    };
    e.getWidth = function() {
        return m.getHeight()
    };
    return e
}
function ShareBtn() {
    function b() {
        var b = window.location.toString().split("#"),
        b = "Century of the Child http://www.moma.org/interactives/exhibitions/2012/centuryofthechild/%23" + b[1];
        Share.twitter(b + " %23momacotc via @MuseumModernArt")
    }
    function c() {
        var b = "http://www.moma.org/interactives/exhibitions/2012/centuryofthechild/%23" + window.location.toString().split("#")[1];
        Share.facebook(b.toString())
    }
    function d(b) {
        TweenLite.to(b.currentTarget, 0.3, {
            css: {
                opacity: 1
            },
            ease: Quart.easeOut,
            overwrite: true
        })
    }
    function f(b) {
        TweenLite.to(b.currentTarget, 0.3, {
            css: {
                opacity: 0
            },
            ease: Quart.easeOut,
            overwrite: true
        })
    }
    var h = document.createElement("div"),
    g = null,
    e = null,
    m = AssetLoader.getAsset("images/ui/share/field.png"),
    e = AssetLoader.getAsset("images/ui/share/twitter_hover.png"),
    g = AssetLoader.getAsset("images/ui/share/facebook_hover.png");
    h.appendChild(m);
    m.style.top = "0px";
    e.className = "twitter-hover";
    e.style.opacity = 0;
    e.addEventListener(MouseEvent.CLICK, b);
    e.addEventListener(MouseEvent.MOUSE_OVER, d);
    e.addEventListener(MouseEvent.MOUSE_OUT, f);
    h.appendChild(e);
    g.className = "facebook-hover";
    g.style.opacity = 0;
    g.addEventListener(MouseEvent.CLICK, c);
    g.addEventListener(MouseEvent.MOUSE_OVER, d);
    g.addEventListener(MouseEvent.MOUSE_OUT, f);
    h.appendChild(g);
    h.kill = function() {
        e.removeEventListener(MouseEvent.CLICK, b);
        e.removeEventListener(MouseEvent.MOUSE_OVER, d);
        e.removeEventListener(MouseEvent.MOUSE_OUT, f);
        g.removeEventListener(MouseEvent.CLICK, c);
        g.removeEventListener(MouseEvent.MOUSE_OVER, d);
        g.removeEventListener(MouseEvent.MOUSE_OUT, f)
    };
    return h
}
function Slice3Image(b, c, d) {
    var f = document.createElement("div"),
    h = c.height,
    g = 0;
    f.appendChild(b);
    f.appendChild(c);
    f.appendChild(d);
    f.style.position = "absolute";
    f.setWidth = function(e) {
        g = e;
        var f = b.width,
        e = e - f - d.width;
        c.style.left = f + "px";
        c.width = e;
        c.height = h;
        d.style.left = f + e + "px"
    };
    f.getHeight = function() {
        return h
    };
    f.getHeight = function() {
        return g
    };
    return f
}
function GraphicBtnTooltip(b, c, d, f) {
    var h = document.createElement("div");
    h.className = "graphic-btn-tooltip";
    h.name = "GraphicBtnTooltip";
    var g, e, m;
    h.init = function() {
        function i() {
            if (d.href2) Assets.slideToProduct = d.href2;
            if (BrowserDetect.TABLET) {
                g.out();
                Assets.transit.fromHomeToTimelineCentury(d.href)
            } else e.click()
        }
        BrowserDetect.TABLET || (e = new Tooltip(d));
        if (!BrowserDetect.TABLET && typeof f != "undefined" && f.constructor == Object) {
            e.style.left = f.x + "px";
            e.style.top = f.y + "px"
        }
        g = new GraphicBtn(b, c);
        g.speed = 0.2;
        BrowserDetect.TABLET || h.appendChild(e);
        h.appendChild(g);
        if (!BrowserDetect.TABLET) {
            h.addEventListener(MouseEvent.MOUSE_OVER, h.onOver);
            h.addEventListener(MouseEvent.MOUSE_OUT, h.onOut)
        }
        h.addEventListener(MouseEvent.MOUSE_DOWN, i);
        if (!BrowserDetect.TABLET) e.style.pointerEvents = "none";
        m = i;
        g.init()
    };
    h.removeInteraction = function() {
        BrowserDetect.TABLET || h.removeChild(e);
        g.kill();
        h.style.cursor = "auto";
        if (!BrowserDetect.TABLET) {
            h.removeEventListener(MouseEvent.MOUSE_OVER, h.onOver);
            h.removeEventListener(MouseEvent.MOUSE_OUT, h.onOut)
        }
        h.removeEventListener(MouseEvent.MOUSE_DOWN, m)
    };
    h.onOver = function() {
        h.style.zIndex = 9999;
        g.over(function() {
            e.show();
            e.onOver()
        })
    };
    h.onOut = function() {
        h.style.zIndex = 1;
        g.out();
        e.onOut();
        e.hide(0)
    };
    h.kill = function() {
        g.kill()
    };
    h.getButton = function() {
        return g
    };
    return h
}
function TextField() {
    var b = document.createElement("div");
    b.className = "text-field";
    var c = "",
    d = 0;
    b.style.position = "absolute";
    b.setText = function(c) {
        b.innerHTML = c
    };
    b.setId = function(b) {
        c = b
    };
    b.getId = function() {
        return c
    };
    b.setSpaceToNext = function(b) {
        d = b
    };
    b.getSpaceToNext = function() {
        return d
    };
    b.setFont = function(c) {
        b.className = c
    };
    b.getHeight = function() {
        var c = b.offsetHeight,
        d = parseInt(b.style.height);
        d > c && (c = d);
        return c
    };
    b.getWidth = function() {
        var c = b.offsetWidth,
        d = parseInt(b.style.width);
        d > c && (c = d);
        return c
    };
    b.getTotalHeight = function() {
        return b.getHeight() + b.getSpaceToNext()
    };
    b.format = function(c) {
        for (var d in c) b.style[d] = c[d]
    };
    return b
}
function TextLayout() {
    function b(b) {
        var c, e = f.length,
        g, h;
        for (c = 0; c < e; c = c + 1) {
            h = f[c];
            if (h.getId() === b) {
                g = h;
                break
            }
        }
        if (!g) {
            g = new TextField;
            g.setId(b);
            d.appendChild(g);
            f.push(g)
        }
        return g
    }
    function c() {
        var b, c = f.length,
        d, h = 0,
        n = 0,
        v = 0;
        for (b = 0; b < c; b = b + 1) {
            d = f[b];
            d.style.top = h + "px";
            v = d.getWidth();
            v > n && (n = v);
            h = h + d.getTotalHeight()
        }
        g = n;
        e = h
    }
    trace("TextLayout();");
    var d = document.createElement("div"),
    f = [],
    h,
    g = 0,
    e = 0;
    d.style.position = "absolute";
    d.addText = function(d, e, f, g) {
        d = b(d);
        h && d.format(h);
        f && d.setFont(f);
        d.setSpaceToNext(g);
        d.setText(e);
        c()
    };
    d.formatAll = function(b) {
        if (h = b) for (var d = f.length,
        e, b = 0; b < d; b = b + 1) {
            e = f[b];
            e.format(h)
        }
        c()
    };
    d.format = function(d, e) {
        b(d).format(e);
        c()
    };
    d.getWidth = function() {
        return g
    };
    d.getHeight = function() {
        return e
    };
    return d
}
function ChildContainer() {
    function b() {
        e.backgroundPosition = h[currentFrame].x + "px " + h[currentFrame].y + "px";
        currentFrame = currentFrame + 1;
        currentFrame >= g && (currentFrame = 0)
    }
    var c = [{
        width: 250,
        height: 300,
        image: "child-sprite2.png",
        animation: [{
            x: -261,
            y: -1866
        },
        {
            x: 0,
            y: -1866
        },
        {
            x: -2088,
            y: -1555
        },
        {
            x: -2088,
            y: -1244
        },
        {
            x: -2088,
            y: -933
        },
        {
            x: -2088,
            y: -622
        },
        {
            x: -2088,
            y: -311
        },
        {
            x: -2088,
            y: 0
        },
        {
            x: -1827,
            y: -1555
        },
        {
            x: -1566,
            y: -1555
        },
        {
            x: -1305,
            y: -1555
        },
        {
            x: -1044,
            y: -1555
        },
        {
            x: -783,
            y: -1555
        },
        {
            x: -522,
            y: -1555
        },
        {
            x: -261,
            y: -1555
        },
        {
            x: 0,
            y: -1555
        },
        {
            x: -1827,
            y: -1244
        },
        {
            x: -1566,
            y: -1244
        },
        {
            x: -1305,
            y: -1244
        },
        {
            x: -1044,
            y: -1244
        },
        {
            x: -783,
            y: -1244
        },
        {
            x: -522,
            y: -1244
        },
        {
            x: -261,
            y: -1244
        },
        {
            x: 0,
            y: -1244
        },
        {
            x: -1827,
            y: -933
        },
        {
            x: -1566,
            y: -933
        },
        {
            x: -1305,
            y: -933
        },
        {
            x: -1044,
            y: -933
        },
        {
            x: -783,
            y: -933
        },
        {
            x: -522,
            y: -933
        },
        {
            x: -261,
            y: -933
        },
        {
            x: 0,
            y: -933
        },
        {
            x: -1827,
            y: -622
        },
        {
            x: -1566,
            y: -622
        },
        {
            x: -1305,
            y: -622
        },
        {
            x: -1044,
            y: -622
        },
        {
            x: -783,
            y: -622
        },
        {
            x: -522,
            y: -622
        },
        {
            x: -261,
            y: -622
        },
        {
            x: 0,
            y: -622
        },
        {
            x: -1827,
            y: -311
        },
        {
            x: -1305,
            y: -311
        },
        {
            x: -1044,
            y: -311
        },
        {
            x: -783,
            y: -311
        },
        {
            x: -522,
            y: -311
        },
        {
            x: -261,
            y: -311
        },
        {
            x: 0,
            y: -311
        },
        {
            x: -1827,
            y: 0
        },
        {
            x: -1566,
            y: 0
        },
        {
            x: -1305,
            y: 0
        },
        {
            x: -1044,
            y: 0
        },
        {
            x: -783,
            y: 0
        },
        {
            x: -522,
            y: 0
        },
        {
            x: -261,
            y: 0
        },
        {
            x: 0,
            y: 0
        }]
    },
    {
        width: 250,
        height: 300,
        image: "child-sprite3.png",
        animation: [{
            x: -1044,
            y: -1866
        },
        {
            x: -783,
            y: -1866
        },
        {
            x: -522,
            y: -1866
        },
        {
            x: -261,
            y: -1866
        },
        {
            x: 0,
            y: -1866
        },
        {
            x: -1827,
            y: -1555
        },
        {
            x: -1827,
            y: -1244
        },
        {
            x: -1827,
            y: -933
        },
        {
            x: -1827,
            y: -622
        },
        {
            x: -1827,
            y: -311
        },
        {
            x: -1827,
            y: 0
        },
        {
            x: -1566,
            y: -1555
        },
        {
            x: -1305,
            y: -1555
        },
        {
            x: -1044,
            y: -1555
        },
        {
            x: -783,
            y: -1555
        },
        {
            x: -522,
            y: -1555
        },
        {
            x: -261,
            y: -1555
        },
        {
            x: 0,
            y: -1555
        },
        {
            x: -1566,
            y: -1244
        },
        {
            x: -1305,
            y: -1244
        },
        {
            x: -1044,
            y: -1244
        },
        {
            x: -783,
            y: -1244
        },
        {
            x: -522,
            y: -1244
        },
        {
            x: -261,
            y: -1244
        },
        {
            x: 0,
            y: -1244
        },
        {
            x: -1566,
            y: -933
        },
        {
            x: -1305,
            y: -933
        },
        {
            x: -1044,
            y: -933
        },
        {
            x: -783,
            y: -933
        },
        {
            x: -522,
            y: -933
        },
        {
            x: -261,
            y: -933
        },
        {
            x: 0,
            y: -933
        },
        {
            x: -1566,
            y: -622
        },
        {
            x: -1305,
            y: -622
        },
        {
            x: -1044,
            y: -622
        },
        {
            x: -783,
            y: -622
        },
        {
            x: -522,
            y: -622
        },
        {
            x: -261,
            y: -622
        },
        {
            x: 0,
            y: -622
        },
        {
            x: -1566,
            y: -311
        },
        {
            x: -1305,
            y: -311
        }]
    },
    {
        width: 250,
        height: 300,
        image: "child-sprite4.png",
        animation: [{
            x: -1566,
            y: -311
        },
        {
            x: -1566,
            y: 0
        },
        {
            x: -1305,
            y: -1244
        },
        {
            x: -1044,
            y: -1244
        },
        {
            x: -783,
            y: -1244
        },
        {
            x: -522,
            y: -1244
        },
        {
            x: -261,
            y: -1244
        },
        {
            x: 0,
            y: -1244
        },
        {
            x: -1305,
            y: -933
        },
        {
            x: -1044,
            y: -933
        },
        {
            x: -783,
            y: -933
        },
        {
            x: -522,
            y: -933
        },
        {
            x: -261,
            y: -933
        },
        {
            x: 0,
            y: -933
        },
        {
            x: -1305,
            y: -622
        },
        {
            x: -1044,
            y: -622
        },
        {
            x: -783,
            y: -622
        },
        {
            x: -522,
            y: -622
        },
        {
            x: -261,
            y: -622
        },
        {
            x: 0,
            y: -622
        },
        {
            x: -1305,
            y: -311
        },
        {
            x: -1044,
            y: -311
        },
        {
            x: -783,
            y: -311
        },
        {
            x: -522,
            y: -311
        },
        {
            x: -261,
            y: -311
        },
        {
            x: 0,
            y: -311
        },
        {
            x: -1305,
            y: 0
        },
        {
            x: -1044,
            y: 0
        },
        {
            x: -783,
            y: 0
        },
        {
            x: -522,
            y: 0
        },
        {
            x: -261,
            y: 0
        },
        {
            x: 0,
            y: 0
        }]
    }],
    d = Math.floor(Math.random() * 2),
    f = document.createElement("div"),
    h,
    g,
    e;
    this.timer;
    f.start = function() {
        d = d + 1;
        d >= c.length && (d = 0);
        e = f.style;
        h = c[d].animation;
        g = h.length;
        e.width = c[d].width + "px";
        e.height = c[d].height + "px";
        e.backgroundImage = "url(assets/images/child/" + c[d].image + ")";
        this.timer && f.stop();
        currentFrame = 0;
        this.timer = setInterval(b, 30)
    };
    f.stop = function() {
        clearInterval(this.timer);
        this.timer = null
    };
    return f
}
function CircleShape(b, c, d) {
    var f = document.createElement("div");
    f.style.position = "absolute";
    f.style.backgroundColor = "#" + b;
    f._currentColor = b;
    f._defaultColor = b;
    f.getCurrentColor = function() {
        var b = f._currentColor.split("#");
        return b.length > 1 ? b[1] : b[0]
    };
    f.changeColor = function(b) {
        f._currentColor = b;
        TweenLite.to(f, 0.3, {
            css: {
                backgroundColor: "#" + b
            },
            overwrite: true
        })
    };
    f.defaultColor = function() {
        f._currentColor = f._defaultColor;
        TweenLite.to(f, 0.3, {
            css: {
                backgroundColor: "#" + f._defaultColor
            },
            overwrite: true
        })
    };
    if (d == "large") {
        f.style.height = "27px";
        f.style.width = "27px";
        f.style.borderRadius = "15px"
    } else {
        f.style.height = "20px";
        f.style.width = "20px";
        f.style.borderRadius = "10px"
    }
    var h;
    c == null && (c = "nextArrowSmall");
    if (c == "nextArrowSmall") {
        h = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/icon_arrow_right_small.png");
        h.style.top = "6px";
        h.style.left = "8px"
    } else if (c == "arrowUp") {
        h = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/icon_arrow_up.png");
        h.style.top = "7px";
        h.style.left = "6px"
    } else if (c == "nextArrow") {
        h = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/icon_arrow_right.png");
        h.style.top = "9px";
        h.style.left = "12px"
    } else if (c == "prevArrow") {
        h = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/icon_arrow_left.png");
        h.style.top = "9px";
        h.style.left = "10px"
    } else if (c == "plus") {
        h = AssetLoader.getAsset("images/ui/buttons/timeline-btns/generic/icon_plus.png");
        h.style.top = "10px";
        h.style.left = "10px"
    }
    h.style.opacity = 0.7;
    f.appendChild(h);
    return f
}
function CenturyReadMore(b, c, d) {
    function f() {
        setTimeout(function() {
            n.addEventListener(MouseEvent.CLICK, g)
        },
        1500)
    }
    function h() {
        TweenLite.to(k, 20, {
            css: {
                rotation: 360
            },
            ease: Linear.easeNone,
            overwrite: true,
            onComplete: h
        })
    }
    function g() {
        i.kill();
        TweenLite.to(i, 0.7, {
            css: {
                opacity: 0
            },
            overwrite: true,
            ease: Sine.easeOut,
            onComplete: e
        })
    }
    function e() {
        i.parentNode.removeChild(i);
        q()
    }
    function m() {
        i.style.display = "none";
        var b = Math.floor(Assets.DOCUMENT_HEIGHT * 0.5);
        i.style.left = Math.floor(Assets.DOCUMENT_WIDTH * 0.5) + "px";
        i.style.top = b + "px";
        k.style.left = -Math.floor(k.width * 0.5) + "px";
        k.style.top = -Math.floor(k.height * 0.5) + "px";
        v.style.left = -Math.floor(v.getWidth() * 0.5) + "px";
        v.style.top = -Math.floor(v.getHeight() * 0.5) + "px";
        n.style.width = Assets.DOCUMENT_WIDTH + "px";
        n.style.height = Assets.DOCUMENT_HEIGHT - 34 + "px";
        n.style.left = -(Assets.DOCUMENT_WIDTH / 2) + "px";
        n.style.top = -(Assets.DOCUMENT_HEIGHT / 2) + "px";
        i.style.display = "block"
    }
    var i = document.createElement("div");
    i.style.opacity = 0;
    var q = d,
    k, n, v, o;
    i.className = "century-read-more";
    i.init = function() {
        var d = Assets.getDocumentSize();
        n = document.createElement("div");
        n.className = "read-more-dim";
        n.style.width = d.width + "px";
        n.style.height = d.height * 2 - 34 + "px";
        n.style.left = -(d.width / 2) + "px";
        n.style.top = -(d.height / 2) + "px";
        i.appendChild(n);
        k = document.createElement("div");
        k.style.position = "absolute";
        d = document.createElement("div");
        d.className = "read-more-bg-circle";
        k.appendChild(d);
        d = AssetLoader.getAsset("images/ui/home/elipse_bg.png");
        d.className = "read-more-bg-image";
        k.appendChild(d);
        h();
        i.appendChild(k);
        v = new TextLayout;
        i.appendChild(v);
        v.addText("header", b.querySelector("[data-name=header]").innerHTML, "TheinhardtHeavy", 10);
        v.format("header", {
            color: "#" + c,
            fontSize: "25px",
            whiteSpace: "noWrap"
        });
        v.addText("text", b.querySelector("[data-name=text]").innerHTML, "TheinhardtMedium", 0);
        v.format("text", {
            color: "#45454d",
            fontSize: "13px",
            width: "610px",
            lineHeight: "18px"
        });
        v.className = "CenturyIndent";
        o = new GraphicBtn("images/ui/buttons/close-out.png", "images/ui/buttons/close-over.png");
        o.style.left = "630px";
        o.style.top = "-30px";
        v.appendChild(o);
        o.init();
        o.addEventListener(MouseEvent.CLICK, g);
        window.addEventListener(Event.RESIZE, m);
        m();
        TweenLite.to(i, 0.7, {
            delay: 0.2,
            css: {
                opacity: 1
            },
            overwrite: true,
            ease: Sine.easeOut,
            onComplete: f
        })
    };
    i.kill = function() {
        window.removeEventListener(Event.RESIZE, m);
        o.kill();
        o.removeEventListener(MouseEvent.MOUSE_DOWN, g);
        n.removeEventListener(MouseEvent.CLICK, g);
        TweenLite.killTweensOf(k)
    };
    return i
}
function ProductDetail(b, c) {
    function d(b) {
        if (D != b.target.num) {
            E.parentNode.removeChild(E);
            b.target.appendChild(E);
            D = b.target.num;
            TweenLite.to(p, 0.3, {
                css: {
                    opacity: 0
                }
            });
            TweenLite.to(t, 0.3, {
                css: {
                    opacity: 0
                },
                onComplete: function() {}
            });
            setTimeout(function() {
                u.innerHTML = y[D].credits;
                w.innerHTML = y[D].artist ? y[D].artist: "";
                t.storeHeight = t.offsetHeight;
                q();
                k.removeChild(p);
                p = null;
                if (y[D].video) {
                    p = document.createElement("iframe");
                    p.src = "http://www.moma.org/videos/embed/224/" + y[D].video;
                    p.width = 640;
                    p.height = 480;
                    p.frameborder = 0;
                    p.style.backgroundColor = "#000";
                    p.style.position = "absolute";
                    p.style.border = "none";
                    p.style.boxShadow = "0 0 15px rgba(0, 0, 0, .4)";
                    p.allowfullscreen = "allowfullscreen";
                    k.appendChild(p);
                    g()
                } else f()
            },
            350);
            TweenLite.to(t, 0.3, {
                delay: 0.4,
                css: {
                    opacity: 1
                }
            })
        }
    }
    function f() {
        if (B && B) {
            B.kill();
            B = null
        }
        B = new Preloader;
        B.init();
        k.appendChild(B);
        p = new Image;
        p.style.display = "none";
        p.style.opacity = 0;
        p.src = "assets/images/century/l/" + y[D].image;
        k.appendChild(p);
        p.style.position = "absolute";
        p.addEventListener(Event.LOAD, h);
        if (v == "wall") p.style.boxShadow = "0 0 15px rgba(0, 0, 0, .4)"
    }
    function h() {
        if (B) {
            B.kill();
            B = null
        }
        p.style.display = "";
        q();
        TweenLite.to(p, 0.5, {
            delay: 0.4,
            css: {
                opacity: 1
            },
            overwrite: true,
            onComplete: function() {
                p.addEventListener(TouchEvent.TOUCH_START, m)
            }
        });
        TweenLite.to(z, 0.3, {
            delay: 0.4,
            css: {
                opacity: 1
            }
        })
    }
    function g() {
        var b = Assets.DOCUMENT_WIDTH - 260,
        c = Assets.DOCUMENT_HEIGHT - 185 - 34 - t.storeHeight - 60 - 40,
        d = true;
        if (p.width > p.height) {
            d = true;
            p.height * (b / p.width) > c && (d = false)
        } else {
            d = false;
            p.width * (c / p.height) > b && (d = true)
        }
        scaleAmount = d ? b / p.width: c / p.height;
        b = -(p.width * scaleAmount) * 0.5;
        c = -(p.height * scaleAmount) * 0.5 + 10;
        p.style.width = p.width * scaleAmount + "px";
        p.style.height = p.height * scaleAmount + "px";
        p.style.left = b + "px";
        p.style.top = c + "px";
        e()
    }
    function e() {
        var b = p.style.height ? -parseInt(p.style.height) * 0.5 : -p.height * 0.5,
        c = p.style.width ? parseInt(p.style.width) * 0.5 : p.width * 0.5;
        if (z.style.opacity == "0") {
            z.style.top = b + "px";
            z.style.left = c + 15 + "px"
        } else TweenLite.to(z, 1, {
            css: {
                top: b,
                left: c + 15
            },
            ease: Quad.easeInOut
        })
    }
    function m() {
        k.kill();
        TweenLite.to(k, 0.7, {
            css: {
                opacity: 0
            },
            overwrite: true,
            ease: Sine.easeOut,
            onComplete: i
        })
    }
    function i() {
        o();
        k.parentNode.removeChild(k)
    }
    function q() {
        k.style.display = "none";
        var b = Math.floor(Assets.DOCUMENT_HEIGHT * 0.5);
        k.style.left = Math.floor(Assets.DOCUMENT_WIDTH * 0.5) + "px";
        k.style.top = b + "px";
        t.style.top = b - 34 - t.storeHeight - 60 + "px";
        G.style.top = parseInt(t.style.top) + t.storeHeight + 20 + "px";
        x.style.width = Assets.DOCUMENT_WIDTH + "px";
        x.style.height = Assets.DOCUMENT_HEIGHT + "px";
        x.style.left = -(Assets.DOCUMENT_WIDTH * 0.5) + "px";
        x.style.top = -(Assets.DOCUMENT_HEIGHT * 0.5) + "px";
        if (y[D].video) g();
        else {
            var b = Assets.DOCUMENT_WIDTH - 260,
            c = Assets.DOCUMENT_HEIGHT - 185 - 34 - t.storeHeight - 60 - 40,
            d = true;
            if (p.width > p.height) {
                d = true;
                p.height * (b / p.width) > c && (d = false)
            } else {
                d = false;
                p.width * (c / p.height) > b && (d = true)
            }
            scaleAmount = d ? b / p.width: c / p.height;
            b = -(p.width * scaleAmount) * 0.5;
            c = -(p.height * scaleAmount) * 0.5 + 10;
            p.style.width = p.width * scaleAmount + "px";
            p.style.height = p.height * scaleAmount + "px";
            p.style.left = b + "px";
            p.style.top = c + "px";
            e()
        }
        k.style.display = "block"
    }
    var k = document.createElement("div"),
    n = b.children[0],
    v = n.getAttribute("data-shadow-type"),
    o = c,
    x,
    z,
    t,
    p,
    w,
    u,
    y = [],
    D = 0,
    G,
    E,
    B;
    k.className = "product-detail-overlay";
    k.style.position = "absolute";
    k.init = function() {
        for (var c = b.children[2], e = 0, g = c.children.length + 1; e < g; e = e + 1) {
            var h = {};
            if (e == 0) {
                h.image = n.getAttribute("data-image");
                h.credits = ""
            } else {
                var i = c.children[e - 1].children[2].innerHTML;
                i.indexOf("ID=") > -1 ? h.video = i.split("ID=")[1] : h.image = i;
                h.artist = c.children[e - 1].children[0].innerHTML;
                h.credits = c.children[e - 1].children[1].innerHTML
            }
            y.push(h)
        }
        c = Math.floor(Assets.DOCUMENT_HEIGHT * 0.5);
        k.style.left = Math.floor(Assets.DOCUMENT_WIDTH * 0.5) + "px";
        k.style.top = c + "px";
        x = document.createElement("div");
        x.className = "read-more-dim";
        x.style.opacity = 0;
        x.style.width = Assets.DOCUMENT_WIDTH + "px";
        x.style.height = Assets.DOCUMENT_HEIGHT + "px";
        x.style.left = -(Assets.DOCUMENT_WIDTH * 0.5) + "px";
        x.style.top = -(Assets.DOCUMENT_HEIGHT * 0.5) + "px";
        x.addEventListener(MouseEvent.CLICK, m);
        k.appendChild(x);
        t = new SmartObject;
        t.className = "slideshow-text-holder";
        t.style.opacity = 0;
        w = document.createElement("div");
        w.className = "slideshow-artist";
        t.appendChild(w);
        u = document.createElement("div");
        u.innerHTML = y[D].credits;
        u.className = "slideshow-credits";
        t.appendChild(u);
        z = new GraphicBtn("images/ui/buttons/close-out.png", "images/ui/buttons/close-over.png");
        k.appendChild(z);
        z.style.opacity = 0;
        z.style.zIndex = 1;
        z.init();
        z.oncontextmenu = function() {
            TweenLite.to(z, 0.7, {
                css: {
                    rotation: 360
                },
                ease: Quad.easeInOut
            });
            return false
        };
        z.addEventListener(MouseEvent.CLICK, m);
        z.addEventListener(TouchEvent.TOUCH_START, m);
        G = document.createElement("div");
        G.className = "slideshow-button-container";
        G.style.opacity = 0;
        y.length > 1 && k.appendChild(G);
        e = 0;
        for (g = y.length; e < g; e = e + 1) {
            h = document.createElement("div");
            h.className = "slideshow-button";
            h.num = e;
            G.appendChild(h);
            h.addEventListener(MouseEvent.CLICK, d);
            if (e == 0) {
                E = document.createElement("div");
                E.className = "selected";
                E.style.backgroundColor = "#" + Assets.CURR_COLOR;
                h.appendChild(E)
            }
        }
        G.style.width = 24 * y.length + "px";
        G.style.marginLeft = ( - parseInt(G.style.width) + 6) * 0.5 + "px";
        document.body.appendChild(t);
        t.storeHeight = t.offsetHeight;
        k.appendChild(t);
        t.style.top = c - 34 - t.storeHeight - 60 + "px";
        G.style.top = parseInt(t.style.top) + t.storeHeight + 20 + "px";
        f();
        window.addEventListener(Event.RESIZE, q);
        TweenLite.to(x, 0.3, {
            css: {
                opacity: 1
            }
        });
        TweenLite.to(t, 0.3, {
            delay: 0.2,
            css: {
                opacity: 1
            }
        });
        TweenLite.to(G, 0.3, {
            delay: 0.2,
            css: {
                opacity: 1
            }
        })
    };
    k.kill = function() {
        window.removeEventListener(Event.RESIZE, q);
        z.kill();
        z.removeEventListener(MouseEvent.MOUSE_DOWN, m);
        z.removeEventListener(TouchEvent.TOUCH_START, m);
        p.removeEventListener(TouchEvent.TOUCH_START, m)
    };
    k.close = m;
    return k
}
function Preloader() {
    var b = document.createElement("div"),
    c,
    d;
    b.init = function(f) {
        f = f || 0;
        c = document.createElement("div");
        c.className = "intro-preloader";
        c.style.background = "url(" + AssetLoader.getAsset("images/ui/preloader.png").src + ") no-repeat";
        b.appendChild(c);
        d = document.createElement("div");
        d.className = "intro-preloader";
        d.style.background = "url(" + AssetLoader.getAsset("images/ui/preloader-bg.png").src + ") no-repeat";
        b.appendChild(d);
        b.style.opacity = 0;
        TweenLite.to(b, 1, {
            delay: f,
            css: {
                opacity: 1
            },
            ease: Linear.easeNone
        });
        var h = function() {
            TweenLite.to(d, 1.8, {
                css: {
                    rotation: -360
                },
                ease: Linear.easeNone
            });
            TweenLite.to(c, 1.5, {
                css: {
                    rotation: 360
                },
                ease: Linear.easeNone,
                onComplete: h
            })
        };
        h()
    };
    b.onUpdate = function() {};
    b.kill = function(f) {
        TweenLite.to(b, f || 0.3, {
            css: {
                opacity: 0
            },
            ease: Quad.easeInOut,
            overwrite: true,
            onComplete: function() {
                TweenLite.killTweensOf(c);
                TweenLite.killTweensOf(d);
                b.parentNode.removeChild(b)
            }
        })
    };
    return b
}
function TimelineItem(b, c, d, f) {
    function h() {
        if (y) {
            y();
            y = null
        }
        u = true;
        k.removeEventListener(Event.LOAD, h);
        var b = Number(i.getAttribute("data-offsetTop")),
        d = Number(i.getAttribute("data-scale-factor"));
        if (z) {
            var f = Number(i.getAttribute("data-relatedoffsettop")),
            d = 0.3;
            k.width = k.width * d;
            b = n == "wall" ? -28 : n == "floor" ? BrowserDetect.BROWSER_NAME == "Explorer" ? 86 - k.height * d: 86 - k.height: BrowserDetect.BROWSER_NAME == "Explorer" ? 110 - k.height * d: 110 - k.height;
            b = b + f
        } else {
            k.width = k.width * d;
            b == "imageOnFloor" && (b = -k.height + 7)
        }
        if (BrowserDetect.BROWSER_NAME == "Explorer") k.height = k.height * d;
        e.y = c ? b: -300 + b;
        if (n == "wall") k.className = k.className + " wall-shadow";
        else if (n == "floor") {
            v = new FloorShadow;
            q.insertBefore(v, k);
            v._startX = parseInt(k.style.left);
            v.style.left = v._startX;
            v.init();
            v.resize(k.width, k.height);
            e.changePerspective(o)
        }
        TweenLite.to(k, 0.3, {
            css: {
                opacity: 1
            }
        });
        if (p) {
            p.style.left = Number(w[0]) + "px";
            p.style.top = Number(w[1]) + "px";
            e.appendChild(p);
            p.hide()
        }
        if (e.imageLoadedCallback) {
            e.imageLoadedCallback();
            e.imageLoadedCallback = null
        }
    }
    function g() {
        ContentManager.path(m)
    }
    var e = new SmartObject,
    m = b,
    i = m.children[0];
    e.xml = m;
    var q, k, n = i.getAttribute("data-shadow-type"),
    v,
    o = 0,
    x = "";
    i.getAttribute("data-image");
    var z = c,
    t, p = null,
    w, u = false,
    y = f;
    e.imageLoadedCallback;
    e.className = "timeline-item";
    e.style["-webkit-transform-style"] = "preserve-3d";
    e.init = function() {
        if (n == "none") e.style.zIndex = 2;
        w = i.getAttribute("data-tooltip-offset").split(",");
        var b = Number(i.getAttribute("data-scale-factor")),
        f = Number(i.getAttribute("data-image-width"));
        e._storeImageHeight = i.getAttribute("data-image-height");
        e._storeImageWidth = f;
        c && (b = 0.3);
        e._scaleFactor = b;
        e._imageWidth = f * b;
        x = m.getAttribute("data-path");
        q = new SmartObject;
        q.draggable = false;
        q.className = "item-container";
        e.appendChild(q);
        if (!c) if (!BrowserDetect.TABLET) {
            b = m.parentNode.getAttribute("data-color");
            f = i.children[0].innerHTML.split("|");
            p = new Tooltip({
                gravity: i.children[7].innerHTML,
                data: '<h4 style="color:#' + b + '" class="TheinhardtMedium"> ' + f[0] + "</h4>" + (f.length > 1 ? f[1] : ""),
                bgColor: "#" + b,
                fontColor: "#" + b,
                img: "plus",
                width: 24,
                height: 24,
                offsetX: -3,
                offsetY: -3,
                type: "timelineItem"
            });
            if (!BrowserDetect.TABLET) {
                e.addEventListener(MouseEvent.MOUSE_OVER, e.showTooltip);
                e.addEventListener(MouseEvent.MOUSE_OUT, e.hideTooltip)
            }
        }
        e.addEventListener(MouseEvent.CLICK, g); (d || typeof d != "undefined") && e.addEventListener(TouchEvent.TOUCH_START, g);
        BrowserDetect.TABLET || e.addEventListener(MouseEvent.MOUSE_DOWN,
        function(b) {
            b.preventDefault();
            return false
        });
        k = new Image;
        k.src = "assets/images/century/s/" + i.getAttribute("data-image");
        q.appendChild(k);
        k.style.position = "absolute";
        k.style.opacity = 0;
        k.addEventListener(Event.LOAD, h)
    };
    e.getXML = function() {
        return m
    };
    e.getPath = function() {
        return x
    };
    e.addDetailImage = function() {
        t && q.removeChild(t);
        t = new Image;
        t.style.display = "none";
        t.src = "assets/images/century/m/" + i.getAttribute("data-image");
        t.width = k.width;
        t.height = k.height;
        t.style.position = "absolute";
        q.appendChild(t);
        if (n == "wall") t.className = t.className + " wall-shadow-light";
        e.style.cursor = "";
        t.addEventListener(Event.LOAD,
        function() {
            if (t) {
                t.style.display = "block";
                k.style.visibility = "hidden"
            }
        })
    };
    e.removeDetailImage = function() {
        trace("removeDetailImage();");
        if (t) {
            k.style.visibility = "visible";
            q.removeChild(t);
            t = null;
            e.style.cursor = "pointer"
        }
    };
    e.disableTooltip = function() {
        if (p) p.style.display = "none"
    };
    e.enableTooltip = function() {
        if (p) {
            p.style.display = "";
            p.hide(0, 0)
        }
    };
    e.fadeOutShadow = function() {
        n == "floor" && TweenLite.to(v, 0.4, {
            css: {
                opacity: 0
            },
            delay: 0.6
        })
    };
    e.fadeInShadow = function() {
        n == "floor" && TweenLite.to(v, 0.4, {
            css: {
                opacity: 1
            }
        })
    };
    e.webkitRefresh = function() {
        q.style["-webkit-transform"] = ""
    };
    e.changePerspective = function(b) {
        o = b
    };
    e.getHangAmount = function() {
        return 1 - Math.abs(o)
    };
    e.showTooltip = function() {
        if (!t && p) {
            e.style.zIndex = e.style.zIndex == 2 ? 3 : 1;
            p.show(0, 0.2)
        }
    };
    e.hideTooltip = function() {
        if (!t && p) {
            e.style.zIndex = e.style.zIndex > 2 ? 2 : 0;
            p.hide(0, 0.1)
        }
    };
    e.getSpace = function() {
        var b = Number(i.getAttribute("data-space")) + Number(i.getAttribute("data-image-width"));
        z == true ? b = 0 : b || (b = 30);
        return b
    };
    e.getWidth = function() {
        return k.width
    };
    e.getHeight = function() {
        return k.height
    };
    e.imageExists = function() {
        return u
    };
    e.kill = function() {
        e.removeEventListener(MouseEvent.CLICK, g); (d || typeof d != "undefined") && e.removeEventListener(TouchEvent.TOUCH_START, g);
        p && p.kill()
    };
    return e
}
function FloorShadow() {
    var b = document.createElement("div"),
    c,
    d,
    f,
    h;
    b.className = "floor-shadow";
    b.init = function() {
        c = AssetLoader.getAsset("images/ui/shadow-floor-top-left.png");
        d = AssetLoader.getAsset("images/ui/shadow-floor-top-right.png");
        f = AssetLoader.getAsset("images/ui/shadow-floor-bottom-left.png");
        h = AssetLoader.getAsset("images/ui/shadow-floor-bottom-right.png");
        c.style.top = "2px";
        d.style.top = c.style.top;
        c.style.left = "-12px";
        f.style.left = "-12px";
        b.appendChild(c);
        b.appendChild(d);
        b.appendChild(f);
        b.appendChild(h)
    };
    b.resize = function(b, e) {
        c.height = e - 5;
        c.width = 18;
        d.height = e - 5;
        d.width = 18;
        d.style.left = b - 5 + "px";
        f.style.top = e - 9 + "px";
        h.style.top = f.style.top;
        h.style.left = b - 4 + "px"
    };
    return b
}
function WallShadow() {
    var b = document.createElement("div");
    b.style.position = "absolute";
    b.init = function() {
        b.className = "wall-shadow"
    };
    b.resize = function(c, d) {
        b.style.width = c + "px";
        b.style.height = d + "px"
    };
    return b
}
function TimelineEvents(b) {
    var c = document.createElement("div"),
    d;
    c.style.position = "absolute";
    c.init = function() {
        d = []
    };
    c.addItem = function(f) {
        if (f.getXML().querySelector("[data-name=event]")) {
            f = new TimelineEvent(f, b);
            d.push(f);
            c.appendChild(f);
            f.init()
        }
    };
    c.update = function() {
        var b, c = d.length,
        g, e = Assets.DOCUMENT_HEIGHT,
        m;
        for (b = 0; b < c; b = b + 1) {
            g = d[b];
            var i = m = g.getTimelineItem().getHangAmount();
            m = -1 * (i = i / 1) * (i - 2) + 0;
            g.style.top = g.getDropDistance(e) * m - 100 + "px"
        }
    };
    c.resize = function() {
        var b = window.innerWidth,
        c, g = d.length,
        e;
        for (c = 0; c < g; c = c + 1) {
            e = d[c];
            e.style.left = e.getXPos(b) + "px"
        }
    };
    c.kill = function() {
        var b, c = d.length,
        g;
        for (b = 0; b < c; b = b + 1) {
            g = d[b];
            g.kill()
        }
    };
    return c
}
function TimelineEvent(b, c) {
    function d() {
        var b = -Math.floor(i.height * 0.5);
        i.style.left = -Math.floor(i.width * 0.5) + "px";
        i.style.top = b + "px";
        f.appendChild(q);
        q.style.left = Number(m[0]) + "px";
        q.style.top = Number(m[1]) + "px";
        q.show()
    }
    var f = document.createElement("div"),
    h = b.getXML().querySelector("[data-name=event]"),
    g = 0,
    e = 0,
    m,
    i,
    q;
    f.style.position = "absolute";
    f.init = function() {
        g = h.querySelector("[data-name=xPos]").innerHTML;
        e = h.querySelector("[data-name=dropDistance]").innerHTML;
        m = h.querySelector("[data-name=tooltipCoordinates]").innerHTML.split(",");
        var b = {
            gravity: "bottom",
            data: "<h4 style='color:#" + c + "'>" + h.querySelector("[data-name=header]").innerHTML + "</h4>" + h.querySelector("[data-name=subHeader]").innerHTML,
            bgColor: "#" + c,
            fontColor: "#" + c,
            img: "plus",
            width: 24,
            height: 24,
            offsetX: -3,
            offsetY: -3,
            type: "timelineEvent"
        };
        q = new Tooltip(b);
        i = new Image;
        i.style.position = "absolute";
        i.addEventListener(Event.LOAD, d);
        f.appendChild(i);
        i.src = "assets/images/century/events/" + h.getAttribute("data-image");
        trace("_image.src : " + i.src)
    };
    f.kill = function() {
        i.removeEventListener(Event.LOAD, d);
        q.kill()
    };
    f.getTimelineItem = function() {
        return b
    };
    f.getXPos = function(b) {
        return b / 1280 * g
    };
    f.getDropDistance = function(b) {
        return b / 800 * e
    };
    return f
}
var Assets = {
    firstRun: !0,
    LAYER_ALL: null,
    LAYER_TOP: null,
    LAYER_MID: null,
    LAYER_BOT: null,
    FOOTER: null,
    DATA_SITE: null,
    DATA_STATIC: null,
    DATA_PAGES: null,
    DATA_FOOTER: null,
    DATA_TIMELINE: null,
    CURR_PRODUCT_ARRAY: null,
    CURR_COLOR: null,
    CURR_PRODUCT_HOLDER: null,
    SCREEN_SCROLL_ENABLED: !0,
    CENTURY_TEMPLATE_MOVE_TO: null,
    CURRENT_TIMELINE_TEMPLATE: null,
    FRONT_ITEMS: null,
    SECTION_COLOR_MARINE: "#657cb2",
    SECTION_COLOR_RED: "#7f2d2a",
    SECTION_COLOR_BLUE: "#78bad3",
    SECTION_COLOR_GRAY: "#585a60",
    SECTION_COLOR_ORANGE: "#f99a2d",
    SECTION_COLOR_GREEN: "#5c9f17",
    SECTION_COLOR_PURPLE: "#654665",
    COLORS: "657cb2 7f2d2a 78bad3 585a60 f99a2d 5c9f17 654665".split(" "),
    getPreviousColor: function() {
        if (!Assets.CURR_COLOR) return "FFFFFF";
        for (var b, c = 0,
        d = Assets.COLORS.length; c < d; c = c + 1) if (Assets.CURR_COLOR == Assets.COLORS[c]) {
            b = c === 0 ? Assets.COLORS[d - 1] : Assets.COLORS[c - 1];
            break
        }
        return b
    },
    getNextColor: function() {
        if (!Assets.CURR_COLOR) return "FFFFFF";
        for (var b, c = 0,
        d = Assets.COLORS.length; c < d; c = c + 1) if (Assets.CURR_COLOR == Assets.COLORS[c]) {
            b = c === d - 1 ? Assets.COLORS[0] : Assets.COLORS[c + 1];
            break
        }
        return b
    }
};
Assets.SCREEN_WIDTH = window.innerWidth;
Assets.SCREEN_HEIGHT = window.innerHeight;
Assets.DOCUMENT_WIDTH;
Assets.DOCUMENT_HEIGHT;
Assets.transitionPrevious = !1;
Assets.transitionPreviousDetail = !1;
Assets.IMAGE_BLANK = "data:image/gif;base64,R0lGODlhBQAFAIAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNFNzNGRTM0QzJDNjExRTFCMTRCOThBNEQ0MDQwRDEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNFNzNGRTM1QzJDNjExRTFCMTRCOThBNEQ0MDQwRDEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0U3M0ZFMzJDMkM2MTFFMUIxNEI5OEE0RDQwNDBEMTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0U3M0ZFMzNDMkM2MTFFMUIxNEI5OEE0RDQwNDBEMTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAAAACwAAAAABQAFAAACBISPqVgAOw==";
Assets.homePageItemsMouseOverArr = [];
Assets.alreadyVisitedFrontPage = !1;
Assets.fadeInItemsOnFrontPageTiming = 2700;
Assets.slideToProduct = null;
Assets.transit = {
    fromHomeToTimeline: null,
    fromHomeToTimelineCentury: null
};
Assets.getChildIndex = function(b) {
    for (var c = b.parentNode,
    d = c.children.length,
    f = 0; f < d; f++) if (c.children[f] == b) return f
};
Assets.preventDrag = function() {
    return false
};
Assets.roundNumber = function(b, c) {
    return Math.round(b * Math.pow(10, c)) / Math.pow(10, c)
};
Assets.isEmpty = function(b) {
    return ! b || 0 === b.length
};
Assets.isBlank = function(b) {
    return ! b || /^\s*$/.test(b)
};
Assets.randomXToY = function(b, c, d) {
    b = b + Math.random() * (c - b);
    return typeof d == "undefined" ? Math.round(b) : b.toFixed(d)
};
Assets.cloneObject = function(b) {
    return b.cloneNode(true)
};
Assets.rmvFileExt = function(b) {
    return b.slice(0, -4)
};
Assets.removeTabletTouchDelay = function() {
    if ((BrowserDetect.OS == "iPad" || BrowserDetect.MOBILE) && BrowserDetect.BROWSER_NAME != "Explorer") {
        MouseEvent.MOUSE_DOWN = "touchstart";
        MouseEvent.MOUSE_OVER = "touchstart"
    }
} ();
Assets.getOffset = function(b) {
    for (var c = 0,
    d = 0; b && !isNaN(b.offsetLeft) && !isNaN(b.offsetTop);) {
        c = c + (b.offsetLeft - b.scrollLeft);
        d = d + (b.offsetTop - b.scrollTop);
        b = b.parentNode ? b.parentNode: b.offsetParent
    }
    return {
        top: d,
        left: c
    }
};
Assets.trim = function(b) {
    return b.replace(/^\s+|\s+$/g, "")
};
Assets.lineDistance = function(b, c) {
    var d = 0,
    f = 0,
    d = c.x - b.x,
    f = c.y - b.y;
    return Math.sqrt(d * d + f * f)
};
Assets.cloneObject = function(b) {
    var c = {},
    d;
    for (d in b) b.hasOwnProperty(d) && (c[d] = b[d]);
    return c
};
Assets.getCurrentView = function() {
    var b = window.location.href.split("#/");
    if (b.length == 1) return "home";
    b[1].split("/");
    return b.length <= 1 || b[1] == "" ? "home": b.length === 2 ? "timeline": b.length === 3 ? "product": "none"
};
Assets.getDocumentSize = function() {
    var b = document.body,
    c = document.documentElement,
    d = Math.max(b.scrollWidth, b.offsetWidth, c.clientWidth, c.scrollWidth, c.offsetWidth),
    b = Math.max(b.scrollHeight, b.offsetHeight, c.clientHeight, c.scrollHeight, c.offsetHeight);
    return {
        width: d,
        height: b
    }
};
Assets.localToGlobal = function(b) {
    for (var c = 0,
    d = 0; b != null;) {
        c = c + b.offsetLeft;
        d = d + b.offsetTop;
        b = b.offsetParent
    }
    return {
        x: c,
        y: d
    }
};
function HomePageTemplate(b) {
    function c(b) {
        b.preventDefault()
    }
    trace("HomePageTemplate();");
    var d = document.createElement("div");
    d.style.zIndex = 10;
    b.getXML();
    var f, h, g = Assets.wheelMenuContainer,
    e, m;
    Assets.imageData = null;
    Assets.homePageInstance = d;
    d.templateIn = function() {
        function b() {
            if (Assets.plottedItemsSections) {
                for (var c = 0,
                d = Assets.plottedItemsSections.purple.length; c < d; c = c + 1) {
                    var e = Assets.plottedItemsSections.purple[c],
                    f = Assets.localToGlobal(e);
                    e.style.visibility = f.x < 275 && f.y < 155 ? "hidden": "visible"
                }
                c = 0;
                for (d = Assets.plottedItemsSections.red.length; c < d; c = c + 1) {
                    e = Assets.plottedItemsSections.red[c];
                    f = Assets.localToGlobal(e);
                    e.style.visibility = f.x > Assets.DOCUMENT_WIDTH - 200 && f.y < 50 ? "hidden": "visible"
                }
            }
        }
        function q() {
            Assets.SCREEN_WIDTH = Assets.DOCUMENT_WIDTH;
            Assets.SCREEN_HEIGHT = Assets.DOCUMENT_HEIGHT;
            d.style.width = Assets.DOCUMENT_WIDTH + "px";
            d.style.height = Assets.DOCUMENT_HEIGHT + "px";
            g.style.left = Assets.DOCUMENT_WIDTH * 0.5 + "px";
            g.style.top = Assets.DOCUMENT_HEIGHT * 0.5 + "px";
            b()
        }
        BrowserDetect.TABLET && document.addEventListener(MouseEvent.MOUSE_DOWN, c);
        Assets.SCREEN_SCROLL_ENABLED = false;
        trace("HomePageTemplate.templateIn();");
        Assets.CURRENT_PAGE = "homepage";
        setTimeout(function() {
            Assets.wheelMenuContainer.addEvents()
        },
        2E3);
        var k = document.createElement("div");
        k.style.position = "absolute";
        k.style.width = "957px";
        k.style.height = "996px";
        k.style.background = "url(" + AssetLoader.getAsset("images/ui/home/elipse_bg.png").src + ") no-repeat";
        k.style.top = "50%";
        k.style.left = "50%";
        k.style.marginTop = "-539px";
        k.style.marginLeft = "-478px";
        k.style.opacity = 0;
        e = k;
        var n = document.createElement("div");
        n.style.position = "absolute";
        n.style.width = "958px";
        n.style.height = "800px";
        n.style.background = "url(" + AssetLoader.getAsset("images/ui/home/pie_bg.png").src + ") no-repeat";
        n.style.top = "50%";
        n.style.left = "50%";
        n.style.marginTop = "-400px";
        n.style.marginLeft = "-478px";
        n.style.opacity = 0;
        m = n;
        if (Assets.FRONT_ITMES) h = Assets.FRONT_ITMES;
        else {
            h = new PlotFrontItems(Assets.wheelMenuContainer, Assets.wheelMenuContainer.tooltipArr);
            Assets.FRONT_ITMES = h
        }
        BrowserDetect.TABLET || d.appendChild(k);
        d.appendChild(n);
        d.appendChild(h);
        Assets.LAYER_TOP.appendChild(d);
        var v = [];
        Assets.centuryData = v;
        for (var o = Assets.DATA_PAGES.querySelector("[data-type=frontpageItems]").children, x = 0, z = o.length; x < z; x = x + 1) {
            var t = o[x],
            p = {
                title: t.getAttribute("data-menuTitle"),
                color: t.getAttribute("data-color"),
                path: t.getAttribute("data-path"),
                items: []
            };
            v.push(p);
            for (var t = t.querySelectorAll("[data-type=product], [data-type=quote]"), w = 0, u = t.length; w < u; w = w + 1) {
                var y = t[w],
                D = y.innerHTML,
                G = y.getAttribute("data-type"),
                E = {
                    x: 50,
                    y: 50
                },
                B = y.getAttribute("data-tooltip-offset");
                if (B != null && typeof B != "undefined") {
                    B = B.split(",");
                    E = {
                        x: B[0],
                        y: B[1]
                    }
                }
                var B = "right",
                I = y.getAttribute("data-tooltip-gravity");
                I != null && typeof I != "undefined" && (B = I);
                y = {
                    type: G,
                    title: D,
                    color: p.color,
                    path: y.getAttribute("data-path"),
                    parentPath: p.path,
                    thumb: y.getAttribute("data-thumb"),
                    thumbHover: y.getAttribute("data-thumb-hover"),
                    tooltipOffset: E,
                    tooltipGravity: B
                };
                p.items.push(y)
            }
        }
        v = 0;
        o = 1;
        if (!BrowserDetect.TABLET) {
            v = 2;
            o = 1
        }
        TweenLite.to(k, 0, {
            delay: o,
            css: {
                scale: 0.7
            },
            ease: Quad.easeOut,
            overwrite: true
        });
        TweenLite.to(k, v, {
            delay: o + 0.9,
            css: {
                opacity: "1",
                scale: 1
            },
            ease: Quad.easeOut,
            onComplete: function() {
                k.style["-webkit-transform"] = ""
            }
        });
        TweenLite.to(n, v, {
            delay: o,
            css: {
                opacity: "1",
                scale: 1
            },
            ease: Quad.easeOut,
            overwrite: true
        });
        window.addEventListener(Event.RESIZE, q);
        window.addEventListener("orientationchange", q);
        q();
        n = 1E3;
        BrowserDetect.TABLET || (n = 0);
        BrowserDetect.BROWSER_NAME == "Explorer" && (n = 4E3);
        setTimeout(function() {
            setTimeout(h.init, Assets.fadeInItemsOnFrontPageTiming * 0.5);
            setTimeout(function() {
                Assets.fadeInItemsOnFrontPageTiming = 0;
                trace("showPlottedItems");
                h.showPlottedItems();
                b()
            },
            Assets.fadeInItemsOnFrontPageTiming);
            ContentManager.nextTemplate()
        },
        n);
        f = q
    };
    d.toTimelineTransition = function(b, c) {
        h.hidePlottedItems(b);
        d.hideAllItemsButMenu();
        setTimeout(function() {
            ContentManager.path(c)
        },
        2500)
    };
    d.toTimelineTransitionCentury = function(b) {
        var c;
        switch (b.split("timeline/")[1]) {
        case "avant-garde-playtime":
            c = 0;
            break;
        case "light-air-health":
            c = 1;
            break;
        case "children-body-politics":
            c = 2;
            break;
        case "regeneration":
            c = 3;
            break;
        case "power-play":
            c = 4;
            break;
        case "designing-better-worlds":
            c = 5;
            break;
        case "new-century":
            c = 6
        }
        h.hidePlottedItems(null, c);
        Assets.circularMenu.showDotsImmediately = true;
        d.hideAllItemsButMenu(b)
    };
    d.hideAllItemsButMenu = function(b) {
        trace("hideAllItemsButMenu();");
        Assets.wheelMenuContainer.removeEvents();
        setTimeout(function() {
            Assets.wheelMenuContainer.drawCircle180();
            Assets.circularMenu.showMenu(0.3)
        },
        600);
        setTimeout(function() {
            b && ContentManager.path(b)
        },
        2300);
        TweenLite.to(e, 1, {
            css: {
                opacity: 0,
                scale: 0.9
            },
            ease: Quad.easeOut,
            overwrite: false
        });
        TweenLite.to(e, 0, {
            delay: 0.1,
            css: {
                scale: 0.7
            },
            ease: Quad.easeOut,
            overwrite: false,
            onComplete: function() {
                g.hideChild()
            }
        });
        TweenLite.to(m, 0.5, {
            delay: 0.1,
            css: {
                opacity: 0,
                scale: 0.9
            },
            ease: Quad.easeOut,
            overwrite: false
        })
    };
    Assets.transit.fromHomeToTimeline = d.toTimelineTransition;
    d.getImageData = function() {
        Assets.imageData = {
            path: "4",
            image: new Image
        }
    };
    d.templateOut = function() {
        trace("HomePageTemplate.templateOut();");
        BrowserDetect.TABLET && document.removeEventListener(MouseEvent.MOUSE_DOWN, c);
        Assets.CURRENT_PAGE = null;
        window.removeEventListener(Event.RESIZE, f);
        window.removeEventListener("orientationchange", f);
        d.parentNode.removeChild(d);
        ContentManager.nextTemplate()
    };
    return d
}
function TimelineTemplate(b) {
    function c() {
        f.parentNode.removeChild(f);
        window.removeEventListener(Event.RESIZE, d);
        window.removeEventListener("orientationchange", d)
    }
    function d() {
        h.style.top = Math.floor(Assets.DOCUMENT_HEIGHT * 0.65) + "px";
        h.width = Assets.DOCUMENT_WIDTH;
        h.height = 197;
        f.style.width = Assets.DOCUMENT_WIDTH + "px";
        f.style.height = Assets.DOCUMENT_HEIGHT + "px"
    }
    trace("TimelineTemplate();");
    var f = document.createElement("div");
    b.getXML();
    var h;
    Assets.CURRENT_TIMELINE_TEMPLATE = f;
    f.templateIn = function() {
        Assets.wheelMenuContainer.removeEvents();
        f.style.position = "absolute";
        f.style.overflow = "hidden";
        Assets.LAYER_MID.appendChild(f);
        h = AssetLoader.getAsset("images/ui/timeline-floor.jpg");
        TweenLite.to(h, 0, {
            css: {
                opacity: 0
            }
        });
        f.appendChild(h);
        window.addEventListener(Event.RESIZE, d, false);
        window.addEventListener("orientationchange", d, false);
        d();
        TweenLite.to(h, 0.7, {
            css: {
                opacity: 1
            },
            ease: Sine.easeOut
        });
        setTimeout(ContentManager.nextTemplate, 700)
    };
    f.templateOut = function() {
        TweenLite.to(h, 0.7, {
            css: {
                opacity: 0
            },
            ease: Sine.easeOut,
            onComplete: c
        });
        setTimeout(ContentManager.nextTemplate, 100)
    };
    f.hideFloor = function() {
        TweenLite.to(h, 0.7, {
            css: {
                opacity: 0
            },
            ease: Sine.easeOut
        })
    };
    f.showFloor = function() {
        TweenLite.to(h, 0.7, {
            css: {
                opacity: 1
            },
            ease: Sine.easeOut
        })
    };
    return f
}
function ProductTemplate(b) {
    function c(b) {
        b.preventDefault()
    }
    function d() {
        ContentManager.path(i.parentNode);
        u.removeEventListener(MouseEvent.MOUSE_DOWN, d);
        document.removeEventListener(KeyboardEvent.KEY_UP, f)
    }
    function f(b) { (b.keyCode == Key.UP || b.keyCode == Key.ESCAPE || b.keyCode == Key.GO_BACK || b.keyCode == Key.GO_BACK_ALT) && d()
    }
    function h() {
        Assets.currentCenturyTemplate.showArrows();
        n = null
    }
    function g() {
        n = new ProductDetail(i, h);
        Assets.LAYER_TOP.appendChild(n);
        n.init();
        Assets.currentCenturyTemplate.hideArrows()
    }
    function e() {
        BrowserDetect.TABLET && document.removeEventListener(MouseEvent.MOUSE_DOWN, c);
        Assets.circularMenu.showDotsImmediately = true;
        Assets.circularMenu.showMenu();
        window.removeEventListener(Event.RESIZE, k);
        u.kill();
        u.parentNode.removeChild(u);
        o.parentNode.removeChild(o);
        m.parentNode.removeChild(m);
        Assets.SCREEN_SCROLL_ENABLED = true;
        ContentManager.nextTemplate()
    }
    trace("ProductTemplate();");
    var m = new SmartObject,
    i = b.getXML(),
    q,
    k,
    n,
    v = 0,
    o = null,
    x = null,
    z = null,
    t;
    a: {
        for (var b = i.parentNode.querySelectorAll("[data-template=productTemplate]"), p = 0; p < b.length; p++) if (b[p] == i) {
            t = p;
            break a
        }
        t = void 0
    }
    var w = Assets.CURR_PRODUCT_ARRAY[t],
    u = null;
    m.templateIn = function() {
        function b() {
            v = parseInt(w.y);
            w.fadeOutShadow();
            setTimeout(function() {
                w.addDetailImage()
            },
            1E3);
            w.addEventListener(MouseEvent.CLICK, g);
            w.addEventListener(TouchEvent.TOUCH_START, g);
            h(true);
            if (BrowserDetect.TABLET) Assets.CENTURY_TEMPLATE_MOVE_TO(t, 2, e);
            else {
                Assets.CENTURY_TEMPLATE_MOVE_TO(t, 1);
                e()
            }
            var c = document.createElement("div");
            c.className = "simple-tooltip";
            c.innerHTML = i.children[2].children.length == 0 ? "Zoom in": "View more";
            m.appendChild(c);
            w.addEventListener(MouseEvent.MOUSE_OVER,
            function(b) {
                w.addEventListener(MouseEvent.MOUSE_MOVE, d);
                var e = -(m.x - b.clientX),
                b = -(parseInt(m.style.top) - b.clientY);
                c.style.left = e + 15 + "px";
                c.style.top = b + 8 + "px";
                TweenLite.to(c, 0.3, {
                    css: {
                        opacity: 1
                    }
                })
            });
            var d = function(b) {
                var d = -(m.x - b.clientX),
                b = -(parseInt(m.style.top) - b.clientY);
                TweenLite.to(c, 0.5, {
                    css: {
                        left: d + 15,
                        top: b + 8
                    }
                })
            };
            w.addEventListener(MouseEvent.MOUSE_OUT,
            function() {
                w.removeEventListener(MouseEvent.MOUSE_MOVE, d);
                TweenLite.to(c, 0.3, {
                    css: {
                        opacity: 0
                    }
                })
            })
        }
        function e() {
            for (var b = Assets.DOCUMENT_WIDTH,
            c = 6,
            d = true,
            f = t - 1; f >= 0; f--) {
                var g = Assets.CURR_PRODUCT_ARRAY[f],
                h = c = c - 1;
                if (h > 6) {
                    h = 6;
                    d = false
                }
                if (d) TweenLite.to(g, 0.5, {
                    x: g.x - b,
                    delay: h * 0.1,
                    ease: Quad.easeIn
                });
                else {
                    g.style.display = "none";
                    g.x = parseInt(g.x) - b
                }
            }
            for (var c = Assets.CURR_PRODUCT_ARRAY.length,
            i = 6,
            d = true,
            f = t + 1; f < c; f++) {
                g = Assets.CURR_PRODUCT_ARRAY[f];
                h = i = i - 1;
                if (h > 6) {
                    h = 6;
                    d = false
                }
                if (d) TweenLite.to(g, 0.5, {
                    x: g.x + b,
                    delay: h * 0.1,
                    ease: Quad.easeIn
                });
                else {
                    g.style.display = "none";
                    g.x = parseInt(g.x) - b
                }
            }
            b = 0;
            BrowserDetect.TABLET && (b = 0.5);
            TweenLite.to(A, 0.6, {
                y: 12,
                delay: b + 1,
                ease: Quad.easeOut
            });
            TweenLite.to(m, 0.8, {
                x: Assets.DOCUMENT_WIDTH * 0.5 + 80,
                delay: b + 0.6,
                ease: Quad.easeOut
            });
            TweenLite.to(o, 0.8, {
                y: Assets.DOCUMENT_HEIGHT - 200,
                delay: b + 0.6,
                ease: Quad.easeOut
            });
            TweenLite.to(x, 0.4, {
                css: {
                    opacity: 1
                },
                delay: b + 1.4,
                ease: Quad.easeOut
            });
            Assets.CURRENT_TIMELINE_TEMPLATE.hideFloor()
        }
        function h(b) {
            var c = Assets.DOCUMENT_WIDTH * 0.5 - 100,
            d = Assets.DOCUMENT_HEIGHT - 365,
            e = true;
            if (w.getWidth() > w.getHeight()) {
                e = true;
                w.getHeight() * (c / w.getWidth()) > d && (e = false)
            } else {
                e = false;
                w.getWidth() * (d / w.getHeight()) > c && (e = true)
            }
            scaleAmount = e ? c / w.getWidth() : d / w.getHeight();
            var f = b ? 0.5 : 0,
            c = b ? 0.6 : 0,
            d = w._xPos,
            e = Assets.CURR_PRODUCT_ARRAY[Assets.CURR_PRODUCT_ARRAY.length - 1],
            e = e._xPos + e._imageWidth,
            g = d + w.getWidth() * 0.5; (g < Assets.DOCUMENT_WIDTH * 0.5 || g > e - Assets.DOCUMENT_WIDTH * 0.5) && setTimeout(function() {
                var b = Assets.CURR_PRODUCT_HOLDER,
                c = Math.round(Assets.DOCUMENT_WIDTH * 0.5 - w._xPos - w.getWidth() * 0.5 - b.x);
                TweenLite.to(b, f, {
                    css: {
                        left: c
                    },
                    ease: Sine.easeInOut
                })
            },
            c * 1E3);
            d = parseInt(d + w.getWidth() * 0.5) - w.getWidth() * scaleAmount;
            e = Assets.DOCUMENT_HEIGHT * 0.5 - w.getHeight() * scaleAmount * 0.5 - Assets.DOCUMENT_HEIGHT * 0.65;
            BrowserDetect.TABLET && (c = c + 1.3);
            TweenLite.to(w, f, {
                delay: c,
                scaleX: scaleAmount,
                scaleY: scaleAmount,
                x: d,
                y: e,
                ease: Sine.easeInOut,
                onComplete: function() {
                    if (b) {
                        w.style["-webkit-transform-style"] = "flat";
                        w.webkitRefresh();
                        ContentManager.nextTemplate()
                    } else {
                        w.style["-webkit-transform-style"] = "flat";
                        w.webkitRefresh()
                    }
                }
            })
        }
        function p() {
            m.x = Assets.DOCUMENT_WIDTH * 0.5 + 80;
            m.style.top = (Assets.DOCUMENT_HEIGHT - q.offsetHeight) * 0.5 - 70 + "px";
            o.x = Assets.DOCUMENT_WIDTH * 0.5 + 80;
            o.y = Assets.DOCUMENT_HEIGHT - 200;
            A.x = Assets.DOCUMENT_WIDTH * 0.5 + 80;
            h(false)
        }
        BrowserDetect.TABLET && document.addEventListener(MouseEvent.MOUSE_DOWN, c);
        Assets.currentCenturyTemplate.hideEvents();
        Assets.currentCenturyTemplate.addSubSectionButton(i.getAttribute("data-subsection"));
        Assets.SCREEN_SCROLL_ENABLED = false;
        Assets.CURRENT_PRODUCT_ITEM = t;
        Assets.circularMenu.hideMenu();
        q = new SmartObject;
        q.className = "product-text-holder";
        var n = document.createElement("div");
        n.style.color = "#" + Assets.CURR_COLOR;
        n.className = "product-header-copy";
        n.innerHTML = i.children[0].children[1].innerHTML;
        var I = document.createElement("div");
        I.className = "product-year-copy";
        I.innerHTML = i.children[0].children[2].innerHTML;
        var H = new ShareBtn;
        H.className = "product-share-button";
        var K = document.createElement("div");
        K.className = "product-credits-copy";
        K.innerHTML = i.children[0].children[3].innerHTML;
        var J = document.createElement("div");
        J.className = "product-materials-copy";
        J.style.color = "#" + Assets.CURR_COLOR;
        J.innerHTML = i.children[0].children[4].innerHTML;
        var C = document.createElement("div");
        C.className = "product-about-copy";
        C.innerHTML = i.children[0].children[5].innerHTML;
        q.appendChild(n);
        q.appendChild(I);
        q.appendChild(H);
        q.appendChild(K);
        q.appendChild(J);
        q.appendChild(C);
        document.body.appendChild(q);
        n = q.offsetHeight;
        m.x = Assets.DOCUMENT_WIDTH;
        m.style.top = Assets.DOCUMENT_HEIGHT / 2 - n / 2 - 70 + "px";
        m.appendChild(q);
        Assets.LAYER_TOP.appendChild(m);
        o = new SmartObject;
        o.y = Assets.DOCUMENT_HEIGHT;
        o.x = Assets.DOCUMENT_WIDTH * 0.5 + 80;
        z = AssetLoader.getAsset("images/ui/product_floor.png");
        z.style.top = "120px";
        z.style.left = "-126px";
        o.appendChild(z);
        n = document.createElement("div");
        n.style.fontSize = "12px";
        n.style.color = "#b3b3b3";
        n.style.opacity = 0;
        n.innerHTML = "Related:";
        x = n;
        o.appendChild(n);
        Assets.LAYER_TOP.appendChild(o);
        n = new SmartObject;
        I = i.children[1];
        H = I.children.length;
        for (J = K = 0; J < H; J++) {
            C = I.children[J];
            C.innerHTML = C.innerHTML.toLowerCase();
            C = Assets.DATA_TIMELINE.querySelector("[data-path=" + C.innerHTML + "]");
            if (C != null) {
                C = new TimelineItem(C, true, true);
                n.appendChild(C);
                C.init();
                C.x = K;
                C._xPos = K;
                K = K + (C._imageWidth + 15)
            } else trace("Related Item - doesnt match any WebIDs")
        }
        n.y = 46;
        o.appendChild(n);
        var A = new MoreBtn("Back to timeline", "a2a2a6", "arrowUp", true);
        A.style.position = "absolute";
        A.y = -40;
        A.x = Assets.DOCUMENT_WIDTH * 0.5 + 75;
        document.body.appendChild(A);
        A.init();
        Assets.LAYER_TOP.appendChild(A);
        A.addEventListener(MouseEvent.MOUSE_DOWN, d, false);
        u = A;
        document.addEventListener(KeyboardEvent.KEY_UP, f);
        w.hideTooltip();
        w.disableTooltip();
        w.imageExists() ? b() : w.imageLoadedCallback = b;
        window.addEventListener(Event.RESIZE, p);
        k = p
    };
    m.templateOut = function() {
        Assets.currentCenturyTemplate.removeSubSectionButton();
        Assets.currentCenturyTemplate.showEvents();
        w.removeEventListener(MouseEvent.CLICK, g);
        w.removeEventListener(TouchEvent.TOUCH_START, g);
        w.className = w.className.replace(" zoom-cursor", "");
        w.fadeInShadow();
        w.removeDetailImage();
        w.enableTooltip();
        Assets.CURRENT_PRODUCT_ITEM = null;
        n && n.close();
        for (var b = 0,
        c = true,
        d = t - 1; d >= 0; d--) {
            var f = Assets.CURR_PRODUCT_ARRAY[d],
            h = b = b + 1;
            if (h > 6) {
                h = 6;
                c = false
            }
            c ? TweenLite.to(f, 0.5, {
                x: f._xPos,
                delay: h * 0.07,
                ease: Quad.easeOut
            }) : f.x = f._xPos
        }
        for (var b = Assets.CURR_PRODUCT_ARRAY.length,
        i = 0,
        c = true,
        d = t + 1; d < b; d++) {
            f = Assets.CURR_PRODUCT_ARRAY[d];
            h = i = i + 1;
            if (h > 6) {
                h = 6;
                c = false
            }
            c ? TweenLite.to(f, 0.5, {
                x: f._xPos,
                delay: h * 0.07,
                ease: Quad.easeOut
            }) : f.x = f._xPos
        }
        w.style["-webkit-transform-style"] = "preserve-3d";
        TweenLite.to(w, 0.5, {
            scaleX: 1,
            scaleY: 1,
            x: w._xPos,
            y: v,
            ease: Sine.easeInOut
        });
        TweenLite.to(Assets.CURR_PRODUCT_HOLDER, 0.5, {
            css: {
                left: 0
            },
            ease: Sine.easeInOut
        });
        TweenLite.to(u, 0.3, {
            css: {
                y: -40
            },
            ease: Quad.easeIn
        });
        Assets.CENTURY_TEMPLATE_MOVE_TO(t);
        TweenLite.to(q, 0.5, {
            x: Assets.DOCUMENT_WIDTH,
            ease: Quad.easeIn
        });
        TweenLite.to(o, 0.3, {
            y: Assets.DOCUMENT_HEIGHT,
            delay: 0.2,
            ease: Quad.easeIn
        });
        TweenLite.to(x, 0.2, {
            css: {
                opacity: 0
            },
            delay: 0,
            ease: Quad.easeOut
        });
        Assets.CURRENT_TIMELINE_TEMPLATE.showFloor();
        setTimeout(e, 800)
    };
    return m
}
function CenturyTemplate(b) {
    function c() {
        trace("CenturyTemplate.transitionInFromHomeTemplate();");
        var b = H.getPrevTemplateData().getPrevTemplateData().getTemplate(),
        c = b.getImageData(),
        d = 0;
        trace(c, "imageData");
        if (c) {
            b.getImageData();
            for (var c = J.length,
            e, b = 0; b < c; b = b + 1) {
                e = J[b];
                trace(e.getPath(), "timelineItem.getPath()");
                if (e.getPath() == "4") {
                    d = b;
                    break
                }
            }
        }
        if (Assets.slideToProduct) {
            d = Assets.slideToProduct;
            Assets.slideToProduct = null
        }
        if (typeof d == "string") {
            b = 0;
            for (c = Assets.CURR_PRODUCT_ARRAY.length; b < c; b = b + 1) if (Assets.CURR_PRODUCT_ARRAY[b].getPath() == d) {
                d = b;
                break
            }
        }
        trace(d, "startOnId");
        o(d)
    }
    function d() {
        trace("CenturyTemplate.transitionInFromMisc");
        var b = 0;
        if (Assets.slideToProduct) {
            b = Assets.slideToProduct;
            Assets.slideToProduct = null
        }
        if (typeof b == "string") for (var c = 0,
        d = Assets.CURR_PRODUCT_ARRAY.length; c < d; c = c + 1) if (Assets.CURR_PRODUCT_ARRAY[c].getPath() == b) {
            b = c;
            break
        }
        trace("startOnId: " + b);
        Assets.transitionPreviousDetail || o(b);
        Assets.transitionPreviousDetail = false
    }
    function f() {
        window.removeEventListener(Event.RESIZE, B);
        var b, c = J.length,
        d;
        for (b = 0; b < c; b = b + 1) {
            d = J[b];
            d.kill()
        }
        U && U.kill();
        S.kill();
        I.parentNode.removeChild(I)
    }
    function h() {
        A.removeEventListener(MouseEvent.MOUSE_OVER, m);
        A.removeEventListener(MouseEvent.MOUSE_OUT, i);
        A.removeEventListener(MouseEvent.MOUSE_DOWN, q);
        s.removeEventListener(MouseEvent.MOUSE_OVER, k);
        s.removeEventListener(MouseEvent.MOUSE_OUT, n);
        s.removeEventListener(MouseEvent.MOUSE_DOWN, v);
        this.removeEventListener(KeyboardEvent.KEY_UP, e);
        Assets.LAYER_TOP.removeChild(T);
        Assets.LAYER_TOP.removeChild(Z);
        ScreenScroll.removeEvent(ScreenScroll.UPDATE, p);
        ScreenScroll.removeEvent(ScreenScroll.START, t);
        ScreenScroll.removeEvent(ScreenScroll.END, w);
        $.kill();
        $.removeEventListener(MouseEvent.MOUSE_DOWN, G)
    }
    function g() {
        M = AssetLoader.getAsset("images/ui/cover-left-shadow.png");
        M.style.zIndex = 5;
        Assets.LAYER_TOP.appendChild(M);
        V = AssetLoader.getAsset("images/ui/cover-right-shadow.png");
        V.style.zIndex = 5;
        Assets.LAYER_TOP.appendChild(V);
        T = document.createElement("div");
        Z = document.createElement("div");
        T.style.position = "absolute";
        Z.style.position = "absolute";
        T.style.zIndex = Z.style.zIndex = 5;
        T.style.left = "3px";
        Assets.LAYER_TOP.appendChild(T);
        Assets.LAYER_TOP.appendChild(Z);
        A = GraphicBtn("images/ui/buttons/timeline-btns/generic/timeline-prev-btn.png");
        A.init();
        var b = CircleShape(X, "prevArrow", "large");
        b.style.top = "18px";
        b.style.left = "18px";
        A.circle = b;
        A.appendChild(b);
        T.appendChild(A);
        A.style.left = -A.getWidth() + "px";
        s = GraphicBtn("images/ui/buttons/timeline-btns/generic/timeline-next-btn.png");
        s.init();
        b = CircleShape(X, "nextArrow", "large");
        b.style.top = "18px";
        b.style.left = "16px";
        s.circle = b;
        s.appendChild(b);
        Z.appendChild(s);
        A.addEventListener(MouseEvent.MOUSE_OVER, m);
        A.addEventListener(MouseEvent.MOUSE_OUT, i);
        A.addEventListener(MouseEvent.MOUSE_DOWN, q);
        s.addEventListener(MouseEvent.MOUSE_OVER, k);
        s.addEventListener(MouseEvent.MOUSE_OUT, n);
        s.addEventListener(MouseEvent.MOUSE_DOWN, v);
        this.addEventListener(KeyboardEvent.KEY_UP, e);
        A._hidden = false;
        s._hidden = true;
        F = AssetLoader.getAsset("images/ui/cover-left-line.png");
        F.style.zIndex = 999;
        Assets.LAYER_TOP.appendChild(F);
        L = AssetLoader.getAsset("images/ui/cover-right-line.png");
        L.style.zIndex = 999;
        Assets.LAYER_TOP.appendChild(L)
    }
    function e(b) {
        b.keyCode == Key.LEFT && q();
        b.keyCode == Key.RIGHT && v(); (b.keyCode == Key.PREV_ITEM || b.keyCode == Key.PREV_ITEM_ALT) && q(true); (b.keyCode == Key.NEXT_ITEM || b.keyCode == Key.NEXT_ITEM_ALT) && v(true); (b.keyCode == Key.ENTER || b.keyCode == Key.SPACEBAR) && ContentManager.path(J[P].xml)
    }
    function m() {
        TweenLite.to(A, 0.5, {
            css: {
                left: 0
            },
            ease: Cubic.easeOut
        })
    }
    function i() {
        A._hidden || TweenLite.to(A, 0.5, {
            css: {
                left: -10
            },
            ease: Cubic.easeOut
        })
    }
    function q() {
        if (!aa) {
            if (Assets.CURRENT_PRODUCT_ITEM != null) {
                aa = true;
                if (Assets.CURRENT_PRODUCT_ITEM == 0) {
                    for (var b, c = 0,
                    d = Assets.DATA_TIMELINE.children.length - 1; c < d; c = c + 1) {
                        var e = A.circle.getCurrentColor(),
                        f = Assets.DATA_TIMELINE.children[c];
                        if (e == f.getAttribute("data-color")) {
                            f = Assets.DATA_TIMELINE.children[c];
                            b = f.children[f.children.length - 1];
                            break
                        }
                    }
                    Assets.transitionPreviousDetail = true;
                    ContentManager.path(b)
                } else {
                    ContentManager.path(K.children[Assets.CURRENT_PRODUCT_ITEM]);
                    setTimeout(function() {
                        aa = false
                    },
                    da)
                }
            } else if (A.circle.getCurrentColor() != Assets.CURR_COLOR) {
                trace("transition from timeline");
                c = 0;
                for (d = Assets.DATA_TIMELINE.children.length - 1; c < d; c = c + 1) {
                    e = A.circle.getCurrentColor();
                    f = Assets.DATA_TIMELINE.children[c];
                    if (e == f.getAttribute("data-color")) {
                        f = Assets.DATA_TIMELINE.children[c];
                        b = f.children[1];
                        break
                    }
                }
                Assets.transitionPrevious = true;
                Assets.slideToProduct = f.children.length - 2;
                ContentManager.path(f)
            }
            if (!A._hidden) {
                P = P - 3;
                P < 0 && (P = 0);
                o(P)
            }
        }
    }
    function k() {
        s._hidden || TweenLite.to(s, 0.5, {
            css: {
                left: -s.getWidth()
            },
            ease: Cubic.easeOut
        })
    }
    function n() {
        s._hidden || TweenLite.to(s, 0.5, {
            css: {
                left: -s.getWidth() + 10
            },
            ease: Cubic.easeOut
        })
    }
    function v() {
        if (!aa) if (Assets.CURRENT_PRODUCT_ITEM != null) {
            aa = true;
            if (Assets.CURRENT_PRODUCT_ITEM == Assets.CURR_PRODUCT_ARRAY.length - 1) {
                for (var b, c = 0,
                d = Assets.DATA_TIMELINE.children.length - 1; c < d; c = c + 1) {
                    var e = s.circle.getCurrentColor(),
                    f = Assets.DATA_TIMELINE.children[c];
                    if (e == f.getAttribute("data-color")) {
                        f = Assets.DATA_TIMELINE.children[c];
                        b = f.children[1];
                        break
                    }
                }
                ContentManager.path(b)
            } else {
                ContentManager.path(K.children[Assets.CURRENT_PRODUCT_ITEM + 2]);
                setTimeout(function() {
                    aa = false
                },
                da)
            }
        } else if (s.circle.getCurrentColor() != Assets.CURR_COLOR) {
            trace("transition from timeline");
            c = 0;
            for (d = Assets.DATA_TIMELINE.children.length - 1; c < d; c = c + 1) {
                e = s.circle.getCurrentColor();
                f = Assets.DATA_TIMELINE.children[c];
                if (e == f.getAttribute("data-color")) {
                    f = Assets.DATA_TIMELINE.children[c];
                    break
                }
            }
            ContentManager.path(f)
        } else {
            P = P + 3;
            b = J.length - 1;
            P > b && (P = b);
            trace(P, "_currId");
            o(P)
        }
    }
    function o(b, c, d) {
        function e() {
            d && d()
        }
        P = b;
        var c = c || 1,
        f = J[P],
        f = Math.floor(Assets.DOCUMENT_WIDTH * 0.5) - (f._xPos + f._imageWidth * 0.5),
        g = J[J.length - 1],
        g = -(g._xPos + g._imageWidth) + Assets.DOCUMENT_WIDTH - 50,
        h = g + 200;
        if (f > 0) {
            f = 50;
            f == N && o(b + 1, c, d)
        }
        f < h && (f = g);
        N = f;
        if (c === 0) {
            TweenLite.killTweensOf(O);
            O.x = N;
            u();
            d && d()
        } else {
            TweenLite.to(O, c, {
                x: N,
                ease: Quint.easeOut,
                overwrite: true,
                onUpdate: u,
                onComplete: z
            });
            setTimeout(e, 500)
        }
        x(N)
    }
    function x(b) {
        var b = b ? b: C.x,
        c = J[J.length - 1],
        c = -(c._xPos + c._imageWidth) + Assets.DOCUMENT_WIDTH - 50,
        c = Math.ceil(c);
        if (Assets.CURRENT_PRODUCT_ITEM != null) {
            if (Assets.CURRENT_PRODUCT_ITEM == 0) {
                var d = Assets.getPreviousColor();
                A.circle.changeColor(d)
            } else A.circle.defaultColor();
            if (Assets.CURRENT_PRODUCT_ITEM >= K.children.length - 2) {
                d = Assets.getNextColor();
                s.circle.changeColor(d)
            } else s.circle.defaultColor()
        } else {
            if (b >= 50) {
                d = Assets.getPreviousColor();
                A.circle.changeColor(d)
            } else A.circle.defaultColor();
            if (b <= c) {
                d = Assets.getNextColor();
                s.circle.changeColor(d)
            } else s.circle.defaultColor()
        }
    }
    function z() {
        x();
        A._hidden = false;
        TweenLite.to(A, 0.5, {
            css: {
                left: -10
            },
            ease: Cubic.easeOut,
            overwrite: true
        });
        s._hidden = false;
        TweenLite.to(s, 0.5, {
            css: {
                left: -s.getWidth() + 10
            },
            ease: Cubic.easeOut,
            overwrite: true
        })
    }
    function t() {
        ba = N
    }
    function p(b) {
        if (Assets.SCREEN_SCROLL_ENABLED == true) {
            N = ba + b.moveX;
            TweenLite.to(O, 0.4, {
                x: N,
                ease: Quint.easeOut,
                overwrite: true,
                onUpdate: u
            })
        }
    }
    function w() {
        if (Assets.SCREEN_SCROLL_ENABLED == true) {
            var b, c = J.length,
            d;
            d = d = 0;
            var e = Assets.DOCUMENT_WIDTH * 0.5,
            f = [];
            for (b = 0; b < c; b = b + 1) {
                d = J[b];
                d = d._xPos + d.getWidth() * 0.5;
                d = Math.abs(d + N - e);
                f.push({
                    id: b,
                    distX: d
                })
            }
            f = f.sortOn("distX");
            N == 50 ? o(0) : o(f[0].id);
            x();
            z()
        }
    }
    function u() {
        var b = Math.round(O.x);
        if (C.x != b) {
            C.x = Math.round(O.x);
            for (var c = J.length,
            d, e = 0,
            e = 0,
            f = Assets.DOCUMENT_WIDTH * 0.5,
            b = 0; b < c; b = b + 1) {
                d = J[b];
                e = d._xPos;
                e = e + O.x - f;
                e < -f ? e = -f: e > f && (e = f);
                e = 1 / f * e;
                d.changePerspective(e)
            }
            S.update()
        }
    }
    function y() {
        if (!U) {
            for (var b = Assets.DATA_TIMELINE.querySelectorAll('[id="more-about-content"]')[0], c, d = 0, e = b.children.length; d < e; d = d + 1) {
                var f = b.children[d],
                g = f.getAttribute("data-more-about");
                Q.sectionName.indexOf(g) > -1 ? c = f: g.indexOf(Q.sectionName) > -1 && (c = f)
            }
            c || (c = "Content was not found.");
            U = new CenturyReadMore(c, X, D, false);
            Assets.LAYER_TOP.appendChild(U);
            U.init()
        }
    }
    function D() {
        U = null
    }
    function G() {
        if (!U) {
            U = new CenturyReadMore(ca, X, E, true);
            Assets.LAYER_TOP.appendChild(U);
            U.init()
        }
    }
    function E() {
        U = null
    }
    function B() {
        var b = Math.floor(Assets.DOCUMENT_HEIGHT * 0.5);
        I.style.width = Assets.DOCUMENT_WIDTH + "px";
        I.style.height = Assets.DOCUMENT_HEIGHT + "px";
        C.style.top = Math.floor(Assets.DOCUMENT_HEIGHT * 0.65) + "px";
        Z.style.left = Assets.DOCUMENT_WIDTH - 3 + "px";
        A.style.top = b - Math.floor(A.getHeight() * 0.5) + "px";
        s.style.top = A.style.top;
        L.style.left = Assets.DOCUMENT_WIDTH - 4 + "px";
        V.style.left = Assets.DOCUMENT_WIDTH - V.width + "px";
        F.style.top = b - Math.floor(F.height * 0.5) + "px";
        L.style.top = F.style.top;
        M.style.top = F.style.top;
        V.style.top = F.style.top;
        W.style.top = Assets.DOCUMENT_HEIGHT + 10 + "px";
        Assets.wheelMenuContainer.style.left = Assets.DOCUMENT_WIDTH / 2 + "px";
        Assets.wheelMenuContainer.style.top = Assets.circularMenu.isShown ? Assets.DOCUMENT_HEIGHT + 110 + "px": Assets.DOCUMENT_HEIGHT + 400 + "px";
        o(P);
        S.resize()
    }
    trace("CenturyTemplate();");
    var I = document.createElement("div"),
    H = b,
    K = H.getXML(),
    J = [],
    C = null,
    A,
    s,
    F,
    L,
    M,
    V,
    T,
    Z,
    P = 0,
    N = 0,
    ba = 0,
    O = {
        x: 0
    },
    W,
    R,
    $,
    Q,
    X = K.getAttribute("data-color");
    Assets.CURR_COLOR = X;
    var ca, U, S, Y, aa = false,
    da = 2E3;
    I.templateIn = function() {
        Assets.currentCenturyTemplate = I;
        trace("Assets.currentCenturyTemplate: " + Assets.currentCenturyTemplate);
        Assets.circularMenu.doOnTimelineIn();
        I.className = "century-timeline";
        Assets.LAYER_MID.appendChild(I);
        N = Assets.DOCUMENT_WIDTH;
        O.x = N;
        Y = new Preloader;
        Y.style.position = "absolute";
        Y.style.top = Assets.DOCUMENT_HEIGHT / 2 + "px";
        Y.style.left = Assets.DOCUMENT_WIDTH / 2 + "px";
        Y.init(0.5);
        I.parentNode.appendChild(Y);
        C = new SmartObject;
        C.x = Assets.DOCUMENT_WIDTH;
        I.appendChild(C);
        var b = 0,
        e, f = K.querySelectorAll("[data-template=productTemplate]"),
        h = f.length,
        i,
        k = 0,
        m = function() {
            k = k + 1;
            if (k == J.length) {
                if (Y) {
                    Y.kill();
                    Y = null
                }
                g();
                Assets.SCREEN_SCROLL_ENABLED = true;
                ScreenScroll.addEvent(ScreenScroll.UPDATE, p);
                ScreenScroll.addEvent(ScreenScroll.START, t);
                ScreenScroll.addEvent(ScreenScroll.END, w);
                W = document.createElement("div");
                W.className = "read-more-container";
                I.appendChild(W);
                R = document.createElement("div");
                R.className = "read-more-sub-container";
                W.appendChild(R);
                ca = K.querySelector("[data-name=description]");
                var b = new TextLayout;
                R.appendChild(b);
                b.addText("header", ca.querySelector("[data-name=header]").innerHTML, "read-more-header", -2);
                b.addText("year", ca.querySelector("[data-name=period]").innerHTML, "read-more-year", 0);
                b.format("year", {
                    color: "#" + X
                });
                $ = new MoreBtn("Read more", X);
                $.className = "read-more-button";
                R.appendChild($);
                $.init();
                $.addEventListener(MouseEvent.MOUSE_DOWN, G);
                TweenLite.to(R, 1, {
                    delay: 0.5,
                    css: {
                        top: -168
                    },
                    ease: Cubic.easeOut,
                    overwrite: true
                });
                trace("CenturyTemplate.addEvents();");
                S = new TimelineEvents(X);
                S.init();
                for (var e = J.length,
                f, b = 0; b < e; b = b + 1) {
                    f = J[b];
                    S.addItem(f)
                }
                setTimeout(function() {
                    I.appendChild(S)
                },
                300);
                window.addEventListener(Event.RESIZE, B);
                B(); (b = H.getPrevTemplateData().getPrevTemplateData()) && trace(b.getTemplateName(), "prevTemplateData.getTemplateName()");
                if (b && b.getTemplateName() == "homePageTemplate") {
                    trace("<<< transitionInFromHomeTemplate setTimeout");
                    setTimeout(c, 500)
                } else {
                    trace("<<< transitionInFromMisc setTimeout");
                    if (Assets.transitionPrevious || Assets.transitionPreviousDetail) {
                        Assets.transitionPrevious = false;
                        b = J[J.length - 1];
                        N = -(b._xPos + b._imageWidth);
                        TweenLite.to(O, 0, {
                            x: N,
                            ease: Quint.easeOut,
                            overwrite: true,
                            onUpdate: u
                        })
                    }
                    setTimeout(d, 500)
                }
                setTimeout(ContentManager.nextTemplate, 1E3)
            }
        },
        n = document.createDocumentFragment();
        for (e = 0; e < h; e = e + 1) {
            i = f[e];
            i = new TimelineItem(i, null, null, m);
            n.appendChild(i);
            i.init();
            i._xPos = Math.round(b);
            i.x = i._xPos;
            J.push(i);
            b = b + i.getSpace()
        }
        C.appendChild(n);
        Assets.CURR_PRODUCT_HOLDER = C;
        Assets.CURR_PRODUCT_ARRAY = J
    };
    I.templateOut = function() {
        trace("CenturyTemplate.templateOut();");
        Assets.SCREEN_SCROLL_ENABLED = false;
        h();
        var b = H.getNextTemplateData(),
        c = ContentManager.getTransitionGroup(H.getTemplateName(), b.getTemplateName());
        trace(c, "transitionName");
        trace(b.getTemplateName(), "nextTemplateData.getTemplateName()");
        if (b.getTemplateName() == "homePageTemplate") {
            Assets.circularMenu.doOnTimelineOut();
            Assets.CURRENT_TIMELINE_TEMPLATE.hideFloor()
        }
        TweenLite.to(S, 1, {
            css: {
                top: -window.innerHeight * 0.4
            },
            ease: Quint.easeOut,
            overwrite: true
        });
        for (var d = J.length,
        e, g = 0,
        g = 0,
        i = Assets.DOCUMENT_WIDTH * 0.5,
        k, b = 0; b < d; b = b + 1) {
            k = false;
            e = J[b];
            g = e._xPos;
            g = g + O.x - i;
            g < -i ? k = true: g > i && (k = true);
            if (k) e.style.display = "none"
        }
        if (c == "rightToLeft") {
            trace("transitionOutRightToLeft");
            c = 0;
            c = Assets.transitionPrevious || Assets.transitionPreviousDetail ? Assets.DOCUMENT_WIDTH + 500 : N - Assets.DOCUMENT_WIDTH - 500;
            TweenLite.to(O, 1, {
                x: c,
                ease: Quint.easeOut,
                overwrite: true,
                onUpdate: u,
                onComplete: f
            });
            TweenLite.to(R, 1, {
                css: {
                    top: 0
                },
                ease: Cubic.easeOut,
                overwrite: true
            });
            TweenLite.to(F, 0.7, {
                css: {
                    opacity: 0
                },
                ease: Sine.easeOut,
                overwrite: true
            });
            TweenLite.to(L, 0.7, {
                css: {
                    opacity: 0
                },
                ease: Sine.easeOut,
                overwrite: true
            });
            TweenLite.to(M, 0.7, {
                css: {
                    opacity: 0
                },
                ease: Sine.easeOut,
                overwrite: true
            });
            TweenLite.to(V, 0.7, {
                css: {
                    opacity: 0
                },
                ease: Sine.easeOut,
                overwrite: true
            });
            TweenLite.to(A, 0.5, {
                css: {
                    left: -A.getWidth()
                },
                ease: Cubic.easeOut,
                overwrite: true
            });
            TweenLite.to(s, 0.5, {
                css: {
                    left: 0
                },
                ease: Cubic.easeOut,
                overwrite: true
            });
            setTimeout(ContentManager.nextTemplate, 500)
        } else {
            trace("transitionOutMiscTemplate");
            TweenLite.to(R, 1, {
                css: {
                    top: 0
                },
                ease: Cubic.easeOut,
                overwrite: true
            });
            TweenLite.to(O, 1, {
                x: N + Assets.DOCUMENT_WIDTH + 100,
                ease: Quint.easeOut,
                overwrite: true,
                onUpdate: u,
                onComplete: f
            });
            TweenLite.to(F, 0.7, {
                css: {
                    opacity: 0
                },
                ease: Sine.easeOut,
                overwrite: true
            });
            TweenLite.to(L, 0.7, {
                css: {
                    opacity: 0
                },
                ease: Sine.easeOut,
                overwrite: true
            });
            TweenLite.to(M, 0.7, {
                css: {
                    opacity: 0
                },
                ease: Sine.easeOut,
                overwrite: true
            });
            TweenLite.to(V, 0.7, {
                css: {
                    opacity: 0
                },
                ease: Sine.easeOut,
                overwrite: true
            });
            TweenLite.to(A, 0.5, {
                css: {
                    left: -A.getWidth()
                },
                ease: Cubic.easeOut,
                overwrite: true
            });
            TweenLite.to(s, 0.5, {
                css: {
                    left: 0
                },
                ease: Cubic.easeOut,
                overwrite: true
            });
            setTimeout(ContentManager.nextTemplate, 1E3)
        }
    };
    Assets.CENTURY_SET_X = function(b) {
        O.x = b
    };
    Assets.CENTURY_TEMPLATE_MOVE_TO = o;
    I.hideArrows = function() {
        TweenLite.to(A, 0.5, {
            css: {
                left: -A.getWidth()
            },
            ease: Cubic.easeOut,
            overwrite: true
        });
        TweenLite.to(s, 0.5, {
            css: {
                left: 0
            },
            ease: Cubic.easeOut,
            overwrite: true
        })
    };
    I.showArrows = function() {
        TweenLite.to(A, 0.5, {
            css: {
                left: -10
            },
            ease: Cubic.easeOut,
            overwrite: true
        });
        TweenLite.to(s, 0.5, {
            css: {
                left: -s.getWidth() + 10
            },
            ease: Cubic.easeOut,
            overwrite: true
        })
    };
    I.addSubSectionButton = function(b) {
        if (b) {
            Q = new MoreBtn("More about <span> " + b + "</span>", X);
            Q.className = "read-more-button";
            Q.sectionName = b;
            Q.style.left = "114px";
            Q.style.opacity = 0;
            R.appendChild(Q);
            Q.init();
            TweenLite.to(Q, 1, {
                css: {
                    opacity: 1
                },
                overwrite: false
            });
            Q.addEventListener(MouseEvent.MOUSE_DOWN, y)
        }
    };
    I.removeSubSectionButton = function() {
        Q && TweenLite.to(Q, 0.5, {
            css: {
                opacity: 0
            },
            overwrite: false,
            onComplete: function() {
                Q.removeEventListener(MouseEvent.MOUSE_DOWN, y);
                R.removeChild(Q);
                Q = null
            }
        })
    };
    I.showEvents = function() {
        trace("CenturyTemplate.showEvents();");
        if (S) {
            S.style.display = "block";
            TweenLite.to(S, 0.5, {
                css: {
                    top: 0
                }
            })
        }
    };
    I.hideEvents = function() {
        trace("CenturyTemplate.hideEvents();");
        S && TweenLite.to(S, 0.5, {
            css: {
                top: -250
            },
            onComplete: function() {
                S.style.display = "none"
            }
        })
    };
    return I
}
var Main = {
    init: function() {
        Trace.isEnabled = false;
        Trace.displayOnScreen = false;
        trace("version", "1.6");
        trace(BrowserDetect.BROWSER_NAME, "BrowserDetect.BROWSER_NAME");
        trace(BrowserDetect.BROWSER_VERSION, "BrowserDetect.BROWSER_VERSION");
        trace(BrowserDetect.TABLET, "BrowserDetect.TABLET");
        trace(BrowserDetect.MOBILE, "BrowserDetect.MOBILE");
        trace(BrowserDetect.OS, "BrowserDetect.OS");
        Assets.DATA_SITE = document.getElementById("SITE");
        Assets.DATA_STATIC = document.getElementById("STATIC");
        Assets.DATA_PAGES = document.getElementById("PAGES");
        Assets.DATA_FOOTER = document.getElementById("FOOTER");
        Assets.DATA_CIRCULAR_MENU = document.getElementById("circular-menu-data");
        Assets.DATA_SITE.parentNode.removeChild(Assets.DATA_SITE);
        Assets.DATA_CIRCULAR_MENU = Assets.DATA_CIRCULAR_MENU.getElementsByTagName("li");
        Assets.LAYER_ALL = document.createElement("div");
        Assets.LAYER_ALL.id = "LAYER_ALL";
        document.body.appendChild(Assets.LAYER_ALL);
        Assets.LAYER_BOT = document.createElement("div");
        Assets.LAYER_BOT.id = "LAYER_BOT";
        Assets.LAYER_ALL.appendChild(Assets.LAYER_BOT);
        Assets.LAYER_MID = document.createElement("div");
        Assets.LAYER_MID.id = "LAYER_MID";
        Assets.LAYER_ALL.appendChild(Assets.LAYER_MID);
        Assets.LAYER_TOP = document.createElement("div");
        Assets.LAYER_TOP.id = "LAYER_TOP";
        Assets.LAYER_ALL.appendChild(Assets.LAYER_TOP);
        Assets.FOOTER = document.createElement("div");
        Assets.FOOTER.id = "FOOTER";
        Assets.LAYER_ALL.appendChild(Assets.FOOTER)
    }
};
function preventDrag(b) {
    b.preventDefault()
}
Main.loadPreloaderAssets = function() {
    function b() {
        AssetLoader.init("assets/");
        AssetLoader.loadGroup(new AssetGroup(["images/ui/preloader.png", "images/ui/preloader-bg.png"], Main.initPreloader))
    }
    BrowserDetect.TABLET && document.addEventListener(MouseEvent.MOUSE_DOWN, preventDrag);
    var c = document.createElement("div");
    c.className = "intro-moma-logo";
    var d = new Image;
    d.src = "assets/images/ui/logo.png";
    d.onload = function() {
        c.appendChild(d);
        Assets.momaLogo = c;
        document.body.appendChild(c);
        TweenLite.to(c, 1, {
            css: {
                opacity: "1"
            },
            ease: Quad.easeInOut,
            onComplete: b
        })
    }
};
Main.initPreloader = function() {
    TweenLite.to(Assets.momaLogo, 1, {
        css: {
            opacity: 0
        },
        ease: Quad.easeOut,
        onComplete: function() {
            document.body.removeChild(Assets.momaLogo);
            var b = new Preloader;
            Assets.preloader = b;
            b.init();
            document.body.appendChild(b);
            Main.loadAssets()
        }
    })
};
Main.loadAssets = function() {
    AssetLoader.loadGroup(new AssetGroup(["images/ui/timeline-floor.jpg", "images/ui/shadow-floor-top-left.png", "images/ui/shadow-floor-top-right.png", "images/ui/shadow-floor-bottom-left.png", "images/ui/shadow-floor-bottom-right.png", "images/ui/buttons/close-out.png", "images/ui/buttons/close-over.png", "images/ui/child-logo.png", "images/ui/logo.png", "images/ui/buttons/timeline-btns/generic/more-btn-out-center.png", "images/ui/buttons/timeline-btns/generic/more-btn-out-left.png", "images/ui/buttons/timeline-btns/generic/more-btn-out-right.png", "images/ui/buttons/timeline-btns/generic/more-btn-over-center.png", "images/ui/buttons/timeline-btns/generic/more-btn-over-left.png", "images/ui/buttons/timeline-btns/generic/more-btn-over-right.png", "images/ui/buttons/timeline-btns/generic/timeline-prev-btn.png", "images/ui/buttons/timeline-btns/generic/timeline-next-btn.png", "images/ui/buttons/timeline-btns/generic/icon_arrow_right.png", "images/ui/buttons/timeline-btns/generic/icon_arrow_right_small.png", "images/ui/buttons/timeline-btns/generic/icon_arrow_left.png", "images/ui/buttons/timeline-btns/generic/icon_plus.png", "images/ui/buttons/timeline-btns/generic/icon_arrow_up.png", "images/ui/buttons/1.png", "images/ui/buttons/2.png", "images/ui/buttons/3.png", "images/ui/buttons/4.png", "images/ui/buttons/5.png", "images/ui/buttons/6.png", "images/ui/buttons/7.png", "images/ui/buttons/arrow.png", "images/ui/cover-left-line.png", "images/ui/cover-right-line.png", "images/ui/cover-left-shadow.png", "images/ui/cover-right-shadow.png", "images/ui/footer/btn_about_hover.png", "images/ui/footer/btn_about.png", "images/ui/footer/btn_buy_tickets.png", "images/ui/footer/btn_buy_tickets_hover.png", "images/ui/footer/btn_credits.png", "images/ui/footer/btn_credits_hover.png", "images/ui/footer/btn_facebook_hover.png", "images/ui/footer/btn_further_reading_hover.png", "images/ui/footer/btn_further_reading.png", "images/ui/footer/btn_publications_hover.png", "images/ui/footer/btn_publications.png", "images/ui/footer/btn_related_events.png", "images/ui/footer/btn_related_events_hover.png", "images/ui/footer/btn_share.png", "images/ui/footer/btn_twitter_hover.png", "images/ui/footer/main_bg.png", "images/ui/footer/cut.png", "images/ui/footer/list_seperator.png", "images/ui/footer/icon_book.png", "images/ui/footer/icon_press.png", "images/ui/footer/shadow_left.png", "images/ui/footer/shadow_right.png", "images/ui/buttons/timeline-btns/a2a2a6/timeline-next-btn.png", "images/ui/buttons/timeline-btns/a2a2a6/timeline-prev-btn.png", "images/ui/share/field.png", "images/ui/share/twitter_hover.png", "images/ui/share/facebook_hover.png", "images/ui/product_floor.png", "images/items/green/quote1.png", "images/items/green/quote1_hover.png", "images/items/green/quote2.png", "images/items/green/quote2_hover.png", "images/items/green/item1.png", "images/items/green/item1_hover.png", "images/items/green/item2.png", "images/items/green/item2_hover.png", "images/items/green/item3.png", "images/items/green/item3_hover.png", "images/items/green/item4.png", "images/items/green/item4_hover.png", "images/items/green/item5.png", "images/items/green/item5_hover.png", "images/items/green/item6.png", "images/items/green/item6_hover.png", "images/items/green/item7.png", "images/items/green/item7_hover.png", "images/items/green/item8.png", "images/items/green/item8_hover.png", "images/items/orange/dot.png", "images/items/orange/dot_hover.png", "images/items/orange/quote1.png", "images/items/orange/quote1_hover.png", "images/items/orange/quote2.png", "images/items/orange/quote2_hover.png", "images/items/orange/item1.png", "images/items/orange/item1_hover.png", "images/items/orange/item2.png", "images/items/orange/item2_hover.png", "images/items/orange/item3.png", "images/items/orange/item3_hover.png", "images/items/orange/item4.png", "images/items/orange/item4_hover.png", "images/items/orange/item5.png", "images/items/orange/item5_hover.png", "images/items/orange/item6.png", "images/items/orange/item6_hover.png", "images/items/orange/item7.png", "images/items/orange/item7_hover.png", "images/items/orange/item8.png", "images/items/orange/item8_hover.png", "images/items/gray/dot.png", "images/items/gray/dot_hover.png", "images/items/gray/quote1.png", "images/items/gray/quote1_hover.png", "images/items/gray/item1.png", "images/items/gray/item1_hover.png", "images/items/gray/item2.png", "images/items/gray/item2_hover.png", "images/items/gray/item3.png", "images/items/gray/item3_hover.png", "images/items/gray/item4.png", "images/items/gray/item4_hover.png", "images/items/gray/item5.png", "images/items/gray/item5_hover.png", "images/items/gray/item6.png", "images/items/gray/item6_hover.png", "images/items/gray/item7.png", "images/items/gray/item7_hover.png", "images/items/gray/item8.png", "images/items/gray/item8_hover.png", "images/items/red/dot.png", "images/items/red/dot_hover.png", "images/items/red/quote1.png", "images/items/red/quote1_hover.png", "images/items/red/quote2.png", "images/items/red/quote2_hover.png", "images/items/red/quote3.png", "images/items/red/quote3_hover.png", "images/items/red/item1.png", "images/items/red/item1_hover.png", "images/items/red/item2.png", "images/items/red/item2_hover.png", "images/items/red/item3.png", "images/items/red/item3_hover.png", "images/items/red/item4.png", "images/items/red/item4_hover.png", "images/items/red/item5.png", "images/items/red/item5_hover.png", "images/items/red/item6.png", "images/items/red/item6_hover.png", "images/items/red/item7.png", "images/items/red/item7_hover.png", "images/items/red/item8.png", "images/items/red/item8_hover.png", "images/items/blue/dot.png", "images/items/blue/dot_hover.png", "images/items/blue/quote1.png", "images/items/blue/quote1_hover.png", "images/items/blue/quote2.png", "images/items/blue/quote2_hover.png", "images/items/blue/item1.png", "images/items/blue/item1_hover.png", "images/items/blue/item2.png", "images/items/blue/item2_hover.png", "images/items/blue/item3.png", "images/items/blue/item3_hover.png", "images/items/blue/item4.png", "images/items/blue/item4_hover.png", "images/items/blue/item5.png", "images/items/blue/item5_hover.png", "images/items/blue/item6.png", "images/items/blue/item6_hover.png", "images/items/blue/item7.png", "images/items/blue/item7_hover.png", "images/items/blue/item8.png", "images/items/blue/item8_hover.png", "images/items/purple/quote1.png", "images/items/purple/quote1_hover.png", "images/items/purple/quote2.png", "images/items/purple/quote2_hover.png", "images/items/purple/item1.png", "images/items/purple/item1_hover.png", "images/items/purple/item2.png", "images/items/purple/item2_hover.png", "images/items/purple/item3.png", "images/items/purple/item3_hover.png", "images/items/purple/item4.png", "images/items/purple/item4_hover.png", "images/items/purple/item5.png", "images/items/purple/item5_hover.png", "images/items/purple/item6.png", "images/items/purple/item6_hover.png", "images/items/purple/item7.png", "images/items/purple/item7_hover.png", "images/items/purple/item8.png", "images/items/purple/item8_hover.png", "images/items/marine/quote1.png", "images/items/marine/quote1_hover.png", "images/items/marine/item1.png", "images/items/marine/item1_hover.png", "images/items/marine/item2.png", "images/items/marine/item2_hover.png", "images/items/marine/item3.png", "images/items/marine/item3_hover.png", "images/items/marine/item4.png", "images/items/marine/item4_hover.png", "images/items/marine/item5.png", "images/items/marine/item5_hover.png", "images/items/marine/item6.png", "images/items/marine/item6_hover.png", "images/items/marine/item7.png", "images/items/marine/item7_hover.png", "images/items/marine/item8.png", "images/items/marine/item8_hover.png", "images/ui/home/elipse_bg.png", "images/ui/home/elipse_half_bg.png", "images/ui/home/pie_bg.png", "images/ui/home/circle/gray.png"], Main.addContent, Assets.preloader.onUpdate))
};
Main.addContent = function() {
    function b() {
        document.getElementById("LAYER_ALL");
        var b = Assets.getDocumentSize();
        Assets.DOCUMENT_WIDTH = b.width;
        Assets.DOCUMENT_HEIGHT = b.height
    }
    BrowserDetect.TABLET && document.removeEventListener(MouseEvent.MOUSE_DOWN, preventDrag);
    Assets.preloader.kill();
    b();
    var c = new ChildLogo;
    Assets.LAYER_TOP.appendChild(c);
    c.animateIn();
    Assets.childLogo = c;
    c = new MomaLogo;
    Assets.LAYER_TOP.appendChild(c);
    c.animateIn();
    c = new CreateCircularFrontMenu;
    Assets.circularMenu = c;
    Assets.LAYER_TOP.appendChild(c);
    c.init();
    c = new Footer(Assets.DATA_FOOTER);
    Assets.FOOTER.appendChild(c);
    c.animateIn();
    ContentManager.AUTOMATICALLY_TRACK_GOOGLE_ANALYTICSa = true;
    ContentManager.SHOW_TRACES = false;
    ContentManager.addTransitionGroup("rightToLeft", ["centuryTemplate"]);
    ContentManager.addTemplate("homePageTemplate", HomePageTemplate);
    ContentManager.addTemplate("timelineTemplate", TimelineTemplate);
    ContentManager.addTemplate("productTemplate", ProductTemplate);
    ContentManager.addTemplate("centuryTemplate", CenturyTemplate);
    ContentManager.init(Assets.DATA_PAGES, "home");
    window.addEventListener(Event.RESIZE, b)
};
window.onload = function() {
    var b = document.location.toString();
    Assets.DATA_TIMELINE = document.getElementById("TIMELINE");
    b.indexOf("showLiveData=true") > -1 ? SpreadsheetData.getData(function(b) {
        Assets.DATA_TIMELINE.innerHTML = b;
        Main.startSite()
    }) : Main.startSite()
};
Main.startSite = function() {
    Main.init();
    Main.loadPreloaderAssets()
};