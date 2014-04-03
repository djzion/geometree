(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("scripts/app", function(exports, require, module) {
  var $, App, Grid, Seed, app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Seed = require('scripts/views/seed');

  Grid = require('scripts/views/grid');

  $ = jQuery;

  App = (function(_super) {
    __extends(App, _super);

    function App() {
      _ref = App.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    App.prototype.defaults = {
      mode: 'tree'
    };

    App.prototype.initialize = function() {
      var _this = this;
      return this.on('change:mode', function() {
        return _this.view.render();
      });
    };

    App.prototype.ready = function() {
      var height, width;
      width = $("#page").width();
      height = $("#page").height();
      this.svg = d3.select("#page").append("svg").attr({
        viewBox: "" + (-width / 2) + " " + (-height / 2) + " " + width + " " + height
      });
      this.view = new Seed({
        el: $('#page'),
        model: this,
        app: this
      });
      this.view.render();
      this.grid = new Grid({
        el: $('#page'),
        model: this,
        app: this
      });
      return this.grid.render();
    };

    return App;

  })(Backbone.Model);

  app = new App;

  jQuery(function() {
    return app.ready();
  });

  module.exports = app;

  Backbone.$ = jQuery;
  
});
window.require.register("scripts/models/circle", function(exports, require, module) {
  var Circle, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Circle = (function(_super) {
    __extends(Circle, _super);

    function Circle() {
      _ref = Circle.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Circle;

  })(Backbone.Model);
  
});
window.require.register("scripts/models/circles", function(exports, require, module) {
  var Circle, Circles, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Circle = require('scripts/models/circle');

  module.exports = Circles = (function(_super) {
    __extends(Circles, _super);

    function Circles() {
      _ref = Circles.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Circles.prototype.model = Circle;

    return Circles;

  })(Backbone.Collection);
  
});
window.require.register("scripts/views/grid", function(exports, require, module) {
  var Grid, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Grid = (function(_super) {
    __extends(Grid, _super);

    function Grid() {
      _ref = Grid.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Grid.prototype.initialize = function(options) {
      this.options = options;
    };

    Grid.prototype.render = function() {
      var xAxis;
      this.svg = this.options.app.svg;
      this.rect = this.svg[0][0].getBoundingClientRect();
      this.center = {
        x: this.rect.width / 2,
        y: this.rect.height / 2
      };
      this.pxScale = 100;
      this.svg.append('svg:circle').attr({
        cx: this.center.x,
        cy: this.center.y,
        r: 5
      });
      this.svg.append('svg:line').attr({
        x1: -this.center.x,
        y1: 0,
        x2: this.rect.width,
        y2: 0,
        "class": 'axis'
      });
      this.svg.append('svg:line').attr({
        x1: 0,
        y1: -this.center.y,
        x2: 0,
        y2: this.rect.height,
        "class": 'axis'
      });
      return xAxis = d3.svg.axis().scale(1).tickValues([-3, -2, -1, 0, 1, 2, 3]);
    };

    return Grid;

  })(Backbone.View);
  
});
window.require.register("scripts/views/seed", function(exports, require, module) {
  var Circle, Circles, Seed, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Circle = require('scripts/models/circle');

  Circles = require('scripts/models/circles');

  module.exports = Seed = (function(_super) {
    __extends(Seed, _super);

    function Seed() {
      _ref = Seed.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Seed.prototype.initialize = function(options) {
      this.options = options;
      Seed.__super__.initialize.apply(this, arguments);
      return this.circles = new Circles();
    };

    Seed.prototype.render = function() {
      this.svg = this.options.app.svg;
      this.center = {
        x: 0,
        y: 0
      };
      this.r = 80;
      this.i = 0;
      this.createCircles();
      this.drawCircles();
      return this;
    };

    Seed.prototype.createCircles = function() {
      var circle, getPos,
        _this = this;
      this.pos = _(this.center).clone();
      circle = this.createCircle({
        "class": 'center'
      });
      this.levelScaleFactor = 0.866;
      getPos = function(rads, rscale) {
        if (rscale == null) {
          rscale = 1;
        }
        return {
          x: _this.center.x + (Math.sin(rads)) * (_this.r * rscale),
          y: _this.center.y - (Math.cos(rads)) * (_this.r * rscale)
        };
      };
      this.level = 1;
      this.iterRadians(function(i, degrees, rads) {
        _this.pos = getPos(rads, 1);
        return _this.createCircle({
          "class": 'level-1',
          'data-id': i
        });
      }, 6);
      if (this.model.get('mode') === 'seed') {
        this.pos = _(this.center).clone();
        this.createCircle({
          "class": 'outer',
          r: this.r * 2
        });
      } else {
        return this.drawGeneration(1, circle);
      }
    };

    Seed.prototype.drawGeneration = function(gen, circle, dir) {
      var childCount, circles, getPos, i, _draw, _i, _j, _ref1, _ref2, _results,
        _this = this;
      if (dir == null) {
        dir = 0;
      }
      if (gen >= 2) {
        return;
      }
      getPos = function(rads, rscale) {
        if (rscale == null) {
          rscale = 1;
        }
        return {
          x: _this.pos.x + (Math.sin(rads)) * (_this.r * rscale),
          y: _this.pos.y - (Math.cos(rads)) * (_this.r * rscale)
        };
      };
      "rect = circle.getBoundingClientRect()\n@pos =\n  x: rect.left + (rect.width / 2) - @r * 1.5\n  y: rect.top + (rect.height / 2) + @r * @levelScaleFactor";
      _draw = function(i, gen) {
        var delta, rads;
        rads = _this.getRads(i);
        _this.pos = getPos(rads, _this.levelScaleFactor * 2);
        delta = {
          x: 0,
          y: 0
        };
        return circle = _this.createCircle({
          "class": "level-" + gen
        }, {
          x: _this.pos.x + delta.x,
          y: _this.pos.y + delta.y
        });
      };
      childCount = function() {
        if (gen === 1) {
          return 6;
        } else if (gen === 2) {
          return 2;
        } else {
          return 2;
        }
      };
      circles = [];
      for (i = _i = 0, _ref1 = childCount() - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        circles.push(_draw((dir + i) % 6, gen));
      }
      _results = [];
      for (i = _j = 0, _ref2 = circles.length - 1; 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; i = 0 <= _ref2 ? ++_j : --_j) {
        _results.push(this.drawGeneration(gen + 1, circle, (i + dir) % 6));
      }
      return _results;
    };

    Seed.prototype.createCircle = function(attrs, pos) {
      var circle, _attrs;
      if (pos == null) {
        pos = this.pos;
      }
      _attrs = {
        r: this.r,
        "class": 'circle',
        cx: pos.x,
        cy: pos.y,
        'data-id': this.i
      };
      _(_attrs).extend(attrs);
      this.i++;
      circle = new Circle({
        pos: pos,
        attrs: _attrs,
        index: this.i
      });
      this.circles.add(circle);
      return circle;
    };

    Seed.prototype.drawCircle = function(circle) {
      var $text, node, pointAttrs;
      node = this.svg.append("svg:circle").attr(circle.get('attrs'));
      pointAttrs = {
        r: 2,
        cx: circle.get('pos').x,
        cy: circle.get('pos').y
      };
      this.svg.append("svg:circle").attr(pointAttrs);
      $text = this.svg.append('text').attr({
        x: circle.get('pos').x,
        y: circle.get('pos').y
      });
      $text.text(circle.get('index'));
      return node[0][0];
    };

    Seed.prototype.drawCircles = function() {
      var i, _draw,
        _this = this;
      i = 0;
      return (_draw = function() {
        if (i >= _this.circles.size() - 1) {
          return;
        }
        _this.drawCircle(_this.circles.models[i]);
        i++;
        return _.delay(_draw, 500);
      })();
    };

    Seed.prototype.iterRadians = function(f, count, degreeOffset) {
      var degrees, i, rads, _i, _ref1, _results;
      if (degreeOffset == null) {
        degreeOffset = 0;
      }
      _results = [];
      for (i = _i = 0, _ref1 = count - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
        degrees = ((360 * (i / count)) + degreeOffset) % 360;
        rads = degrees * Math.PI / 180;
        _results.push(f(i, degrees, rads));
      }
      return _results;
    };

    Seed.prototype.getRads = function(i, count) {
      var degrees, rads;
      if (count == null) {
        count = 6;
      }
      degrees = (360 * (i / count)) % 360;
      return rads = degrees * Math.PI / 180;
    };

    return Seed;

  })(Backbone.View);
  
});
