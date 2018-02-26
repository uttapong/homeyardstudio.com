!function(b) {
  function h(a, d) {
    var c = b.proxy(this.process, this), f = b(a).is("body") ? b(window) : b(a), g;
    this.options = b.extend({}, b.fn.scrollspy.defaults, d);
    this.$scrollElement = f.on("scroll.scroll-spy.data-api", c);
    this.selector = (this.options.target || (g = b(a).attr("href")) && g.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a";
    this.$body = b("body");
    this.refresh();
    this.process();
  }
  h.prototype = {constructor:h, refresh:function() {
    var a = this;
    this.offsets = b([]);
    this.targets = b([]);
    this.$body.find(this.selector).map(function() {
      var d = b(this), d = d.data("target") || d.attr("href"), c = /^#\w/.test(d) && b(d);
      return c && c.length && [[c.position().top + (!b.isWindow(a.$scrollElement.get(0)) && a.$scrollElement.scrollTop()), d]] || null;
    }).sort(function(a, b) {
      return a[0] - b[0];
    }).each(function() {
      a.offsets.push(this[0]);
      a.targets.push(this[1]);
    });
  }, process:function() {
    var a = this.$scrollElement.scrollTop() + this.options.offset, b = (this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight) - this.$scrollElement.height(), c = this.offsets, f = this.targets, g = this.activeTarget, e;
    if (a >= b) {
      return g != (e = f.last()[0]) && this.activate(e);
    }
    for (e = c.length;e--;) {
      g != f[e] && a >= c[e] && (!c[e + 1] || a <= c[e + 1]) && this.activate(f[e]);
    }
  }, activate:function(a) {
    this.activeTarget = a;
    b(this.selector).parent(".active").removeClass("active");
    a = b(this.selector + '[data-target="' + a + '"],' + this.selector + '[href="' + a + '"]').parent("li").addClass("active");
    a.parent(".dropdown-menu").length && (a = a.closest("li.dropdown").addClass("active"));
    a.trigger("activate");
  }};
  var k = b.fn.scrollspy;
  b.fn.scrollspy = function(a) {
    return this.each(function() {
      var d = b(this), c = d.data("scrollspy"), f = "object" == typeof a && a;
      c || d.data("scrollspy", c = new h(this, f));
      if ("string" == typeof a) {
        c[a]();
      }
    });
  };
  b.fn.scrollspy.Constructor = h;
  b.fn.scrollspy.defaults = {offset:10};
  b.fn.scrollspy.noConflict = function() {
    b.fn.scrollspy = k;
    return this;
  };
  b(window).on("load", function() {
    b('[data-spy="scroll"]').each(function() {
      var a = b(this);
      a.scrollspy(a.data());
    });
  });
}(window.jQuery);
