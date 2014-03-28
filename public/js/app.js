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
  var $, App, Seed, app, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Seed = require('scripts/views/seed');

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
      this.view = new Seed({
        el: $('#page'),
        model: this
      });
      return this.view.render();
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
window.require.register("scripts/views/seed", function(exports, require, module) {
  var Seed, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Seed = (function(_super) {
    __extends(Seed, _super);

    function Seed() {
      _ref = Seed.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Seed.prototype.render = function() {
      this.$el.html('');
      this.svg = d3.select("#page").append("svg");
      this.center = {
        x: $(this.svg[0]).width() / 2,
        y: $(this.svg[0]).height() / 2
      };
      this.r = 140;
      this.i = 0;
      this.drawCircles();
      return this;
    };

    Seed.prototype.drawCircles = function() {
      var getPos, levelScaleFactor,
        _this = this;
      this.pos = _(this.center).clone();
      this.drawCircle({
        "class": 'center'
      });
      getPos = function(rads, rscale) {
        if (rscale == null) {
          rscale = 1;
        }
        return {
          x: _this.center.x + (Math.sin(rads)) * (_this.r * rscale),
          y: _this.center.y - (Math.cos(rads)) * (_this.r * rscale)
        };
      };
      levelScaleFactor = 0.866;
      this.level = 1;
      this.iterRadians(function(i, degrees, rads) {
        _this.pos = getPos(rads, 1);
        return _this.drawCircle({
          "class": 'level-1',
          'data-id': i
        });
      }, 6);
      if (this.model.get('mode') === 'seed') {
        this.pos = _(this.center).clone();
        this.drawCircle({
          "class": 'outer',
          r: this.r * 2
        });
        return;
      }
      this.svg.selectAll('circle.level-1').each(function(circle) {
        _this.pos = {
          x: circle.attr('cx'),
          y: circle.attr('cy')
        };
        _this.iterRadians(function(i, degrees, rads) {
          _this.pos = getPos(rads, 1);
          return _this.drawCircle({
            "class": 'level-2',
            'data-id': i
          });
        }, 6);
        debugger;
      });
      return;
      this.level = 2;
      this.iterRadians(function(i, degrees, rads) {
        _this.pos = getPos(rads, 2);
        return _this.drawCircle({
          "class": 'level-2'
        });
      }, 6);
      this.iterRadians(function(i, degrees, rads) {
        _this.pos = getPos(rads, 2 * levelScaleFactor);
        return _this.drawCircle({
          "class": 'level-2'
        });
      }, 6, 30);
      this.level = 3;
      this.iterRadians(function(i, degrees, rads) {
        _this.pos = getPos(rads, 3);
        return _this.drawCircle({
          "class": 'level-3'
        });
      }, 6);
      this.iterRadians(function(i, degrees, rads) {
        _this.pos = getPos(rads, 3 * .88);
        return _this.drawCircle({
          "class": 'level-3'
        });
      }, 6, 19);
      return this.iterRadians(function(i, degrees, rads) {
        _this.pos = getPos(rads, 3 * .89);
        return _this.drawCircle({
          "class": 'level-3'
        });
      }, 6, -19);
    };

    Seed.prototype.drawCircle = function(attrs) {
      var $text, node, pointAttrs, _attrs;
      _attrs = {
        r: this.r,
        "class": 'circle',
        cx: this.pos.x,
        cy: this.pos.y
      };
      _(_attrs).extend(attrs);
      node = this.svg.append("svg:circle").attr(_attrs);
      pointAttrs = _.extend({}, _attrs, {
        r: 2,
        "class": ''
      });
      this.svg.append("svg:circle").attr(pointAttrs);
      $text = this.svg.append('text').attr({
        x: this.pos.x,
        y: this.pos.y
      });
      $text.text(this.i);
      return this.i++;
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

    return Seed;

  })(Backbone.View);
  
});
