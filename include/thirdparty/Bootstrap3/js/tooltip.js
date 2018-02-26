+function(e) {
  var d = function(b, a) {
    this.inState = this.$element = this.hoverState = this.timeout = this.enabled = this.options = this.type = null;
    this.init("tooltip", b, a);
  };
  d.VERSION = "3.3.6";
  d.TRANSITION_DURATION = 150;
  d.DEFAULTS = {animation:!0, placement:"top", selector:!1, template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger:"hover focus", title:"", delay:0, html:!1, container:!1, viewport:{selector:"body", padding:0}};
  d.prototype.init = function(b, a, c) {
    this.enabled = !0;
    this.type = b;
    this.$element = e(a);
    this.options = this.getOptions(c);
    this.$viewport = this.options.viewport && e(e.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
    this.inState = {click:!1, hover:!1, focus:!1};
    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
    }
    b = this.options.trigger.split(" ");
    for (a = b.length;a--;) {
      if (c = b[a], "click" == c) {
        this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
      } else {
        if ("manual" != c) {
          var f = "hover" == c ? "mouseleave" : "focusout";
          this.$element.on(("hover" == c ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, e.proxy(this.enter, this));
          this.$element.on(f + "." + this.type, this.options.selector, e.proxy(this.leave, this));
        }
      }
    }
    this.options.selector ? this._options = e.extend({}, this.options, {trigger:"manual", selector:""}) : this.fixTitle();
  };
  d.prototype.getDefaults = function() {
    return d.DEFAULTS;
  };
  d.prototype.getOptions = function(b) {
    b = e.extend({}, this.getDefaults(), this.$element.data(), b);
    b.delay && "number" == typeof b.delay && (b.delay = {show:b.delay, hide:b.delay});
    return b;
  };
  d.prototype.getDelegateOptions = function() {
    var b = {}, a = this.getDefaults();
    this._options && e.each(this._options, function(c, f) {
      a[c] != f && (b[c] = f);
    });
    return b;
  };
  d.prototype.enter = function(b) {
    var a = b instanceof this.constructor ? b : e(b.currentTarget).data("bs." + this.type);
    a || (a = new this.constructor(b.currentTarget, this.getDelegateOptions()), e(b.currentTarget).data("bs." + this.type, a));
    b instanceof e.Event && (a.inState["focusin" == b.type ? "focus" : "hover"] = !0);
    if (a.tip().hasClass("in") || "in" == a.hoverState) {
      a.hoverState = "in";
    } else {
      clearTimeout(a.timeout);
      a.hoverState = "in";
      if (!a.options.delay || !a.options.delay.show) {
        return a.show();
      }
      a.timeout = setTimeout(function() {
        "in" == a.hoverState && a.show();
      }, a.options.delay.show);
    }
  };
  d.prototype.isInStateTrue = function() {
    for (var b in this.inState) {
      if (this.inState[b]) {
        return !0;
      }
    }
    return !1;
  };
  d.prototype.leave = function(b) {
    var a = b instanceof this.constructor ? b : e(b.currentTarget).data("bs." + this.type);
    a || (a = new this.constructor(b.currentTarget, this.getDelegateOptions()), e(b.currentTarget).data("bs." + this.type, a));
    b instanceof e.Event && (a.inState["focusout" == b.type ? "focus" : "hover"] = !1);
    if (!a.isInStateTrue()) {
      clearTimeout(a.timeout);
      a.hoverState = "out";
      if (!a.options.delay || !a.options.delay.hide) {
        return a.hide();
      }
      a.timeout = setTimeout(function() {
        "out" == a.hoverState && a.hide();
      }, a.options.delay.hide);
    }
  };
  d.prototype.show = function() {
    var b = e.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);
      var a = e.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (!b.isDefaultPrevented() && a) {
        var c = this, b = this.tip(), a = this.getUID(this.type);
        this.setContent();
        b.attr("id", a);
        this.$element.attr("aria-describedby", a);
        this.options.animation && b.addClass("fade");
        var a = "function" == typeof this.options.placement ? this.options.placement.call(this, b[0], this.$element[0]) : this.options.placement, f = /\s?auto?\s?/i, l = f.test(a);
        l && (a = a.replace(f, "") || "top");
        b.detach().css({top:0, left:0, display:"block"}).addClass(a).data("bs." + this.type, this);
        this.options.container ? b.appendTo(this.options.container) : b.insertAfter(this.$element);
        this.$element.trigger("inserted.bs." + this.type);
        var f = this.getPosition(), h = b[0].offsetWidth, g = b[0].offsetHeight;
        if (l) {
          var l = a, k = this.getPosition(this.$viewport), a = "bottom" == a && f.bottom + g > k.bottom ? "top" : "top" == a && f.top - g < k.top ? "bottom" : "right" == a && f.right + h > k.width ? "left" : "left" == a && f.left - h < k.left ? "right" : a;
          b.removeClass(l).addClass(a);
        }
        f = this.getCalculatedOffset(a, f, h, g);
        this.applyPlacement(f, a);
        a = function() {
          var a = c.hoverState;
          c.$element.trigger("shown.bs." + c.type);
          c.hoverState = null;
          "out" == a && c.leave(c);
        };
        e.support.transition && this.$tip.hasClass("fade") ? b.one("bsTransitionEnd", a).emulateTransitionEnd(d.TRANSITION_DURATION) : a();
      }
    }
  };
  d.prototype.applyPlacement = function(b, a) {
    var c = this.tip(), f = c[0].offsetWidth, d = c[0].offsetHeight, h = parseInt(c.css("margin-top"), 10), g = parseInt(c.css("margin-left"), 10);
    isNaN(h) && (h = 0);
    isNaN(g) && (g = 0);
    b.top += h;
    b.left += g;
    e.offset.setOffset(c[0], e.extend({using:function(a) {
      c.css({top:Math.round(a.top), left:Math.round(a.left)});
    }}, b), 0);
    c.addClass("in");
    var g = c[0].offsetWidth, k = c[0].offsetHeight;
    "top" == a && k != d && (b.top = b.top + d - k);
    var m = this.getViewportAdjustedDelta(a, b, g, k);
    m.left ? b.left += m.left : b.top += m.top;
    f = (h = /top|bottom/.test(a)) ? 2 * m.left - f + g : 2 * m.top - d + k;
    d = h ? "offsetWidth" : "offsetHeight";
    c.offset(b);
    this.replaceArrow(f, c[0][d], h);
  };
  d.prototype.replaceArrow = function(b, a, c) {
    this.arrow().css(c ? "left" : "top", 50 * (1 - b / a) + "%").css(c ? "top" : "left", "");
  };
  d.prototype.setContent = function() {
    var b = this.tip(), a = this.getTitle();
    b.find(".tooltip-inner")[this.options.html ? "html" : "text"](a);
    b.removeClass("fade in top bottom left right");
  };
  d.prototype.hide = function(b) {
    function a() {
      "in" != c.hoverState && f.detach();
      c.$element.removeAttr("aria-describedby").trigger("hidden.bs." + c.type);
      b && b();
    }
    var c = this, f = e(this.$tip), l = e.Event("hide.bs." + this.type);
    this.$element.trigger(l);
    if (!l.isDefaultPrevented()) {
      return f.removeClass("in"), e.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", a).emulateTransitionEnd(d.TRANSITION_DURATION) : a(), this.hoverState = null, this;
    }
  };
  d.prototype.fixTitle = function() {
    var b = this.$element;
    (b.attr("title") || "string" != typeof b.attr("data-original-title")) && b.attr("data-original-title", b.attr("title") || "").attr("title", "");
  };
  d.prototype.hasContent = function() {
    return this.getTitle();
  };
  d.prototype.getPosition = function(b) {
    b = b || this.$element;
    var a = b[0], c = "BODY" == a.tagName, a = a.getBoundingClientRect();
    null == a.width && (a = e.extend({}, a, {width:a.right - a.left, height:a.bottom - a.top}));
    var d = c ? {top:0, left:0} : b.offset();
    b = {scroll:c ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()};
    c = c ? {width:e(window).width(), height:e(window).height()} : null;
    return e.extend({}, a, b, c, d);
  };
  d.prototype.getCalculatedOffset = function(b, a, c, d) {
    return "bottom" == b ? {top:a.top + a.height, left:a.left + a.width / 2 - c / 2} : "top" == b ? {top:a.top - d, left:a.left + a.width / 2 - c / 2} : "left" == b ? {top:a.top + a.height / 2 - d / 2, left:a.left - c} : {top:a.top + a.height / 2 - d / 2, left:a.left + a.width};
  };
  d.prototype.getViewportAdjustedDelta = function(b, a, c, d) {
    var e = {top:0, left:0};
    if (!this.$viewport) {
      return e;
    }
    var h = this.options.viewport && this.options.viewport.padding || 0, g = this.getPosition(this.$viewport);
    /right|left/.test(b) ? (c = a.top - h - g.scroll, a = a.top + h - g.scroll + d, c < g.top ? e.top = g.top - c : a > g.top + g.height && (e.top = g.top + g.height - a)) : (d = a.left - h, a = a.left + h + c, d < g.left ? e.left = g.left - d : a > g.right && (e.left = g.left + g.width - a));
    return e;
  };
  d.prototype.getTitle = function() {
    var b = this.$element, a = this.options;
    return b.attr("data-original-title") || ("function" == typeof a.title ? a.title.call(b[0]) : a.title);
  };
  d.prototype.getUID = function(b) {
    do {
      b += ~~(1E6 * Math.random());
    } while (document.getElementById(b));
    return b;
  };
  d.prototype.tip = function() {
    if (!this.$tip && (this.$tip = e(this.options.template), 1 != this.$tip.length)) {
      throw Error(this.type + " `template` option must consist of exactly 1 top-level element!");
    }
    return this.$tip;
  };
  d.prototype.arrow = function() {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
  };
  d.prototype.enable = function() {
    this.enabled = !0;
  };
  d.prototype.disable = function() {
    this.enabled = !1;
  };
  d.prototype.toggleEnabled = function() {
    this.enabled = !this.enabled;
  };
  d.prototype.toggle = function(b) {
    var a = this;
    b && (a = e(b.currentTarget).data("bs." + this.type), a || (a = new this.constructor(b.currentTarget, this.getDelegateOptions()), e(b.currentTarget).data("bs." + this.type, a)));
    b ? (a.inState.click = !a.inState.click, a.isInStateTrue() ? a.enter(a) : a.leave(a)) : a.tip().hasClass("in") ? a.leave(a) : a.enter(a);
  };
  d.prototype.destroy = function() {
    var b = this;
    clearTimeout(this.timeout);
    this.hide(function() {
      b.$element.off("." + b.type).removeData("bs." + b.type);
      b.$tip && b.$tip.detach();
      b.$tip = null;
      b.$arrow = null;
      b.$viewport = null;
    });
  };
  var n = e.fn.tooltip;
  e.fn.tooltip = function(b) {
    return this.each(function() {
      var a = e(this), c = a.data("bs.tooltip"), f = "object" == typeof b && b;
      if (c || !/destroy|hide/.test(b)) {
        if (c || a.data("bs.tooltip", c = new d(this, f)), "string" == typeof b) {
          c[b]();
        }
      }
    });
  };
  e.fn.tooltip.Constructor = d;
  e.fn.tooltip.noConflict = function() {
    e.fn.tooltip = n;
    return this;
  };
}(jQuery);
