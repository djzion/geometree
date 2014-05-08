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
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
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

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("index", function(exports, require, module) {
module.exports = function anonymous(locals) {
var buf = [];
buf.push("<!DOCTYPE html><head><link href=\"/css/app.css\" rel=\"stylesheet\" type=\"text/css\"><script src=\"/js/vendor.js\"></script><script src=\"/js/app.js\"></script><script src=\"/js/templates.js\"></script><script>window.app = require('scripts/app')</script></head><body><div id=\"page\"></div></body>");;return buf.join("");
};
});

;require.register("templates/channel", function(exports, require, module) {
module.exports = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),id = locals_.id,name = locals_.name,threshold = locals_.threshold,frequency = locals_.frequency,frequencyRange = locals_.frequencyRange;buf.push("<div" + (jade.attrs({ 'data-channel':(id), "class": [('channel')] }, {"data-channel":true})) + "><label>Channel</label><input" + (jade.attrs({ 'data-value-for':("name"), 'value':(name) }, {"data-value-for":true,"value":true})) + "/><label>Threshold</label><input" + (jade.attrs({ 'data-value-for':("threshold"), 'value':(threshold) }, {"data-value-for":true,"value":true})) + "/><input" + (jade.attrs({ 'value':(threshold), 'type':("range"), 'min':("0"), 'max':("1"), 'step':("0.005"), "class": [('threshold')] }, {"value":true,"type":true,"min":true,"max":true,"step":true})) + "/><label>Frequency</label><input" + (jade.attrs({ 'data-value-for':("frequency"), 'value':(frequency) }, {"data-value-for":true,"value":true})) + "/><input" + (jade.attrs({ 'value':(frequency), 'type':("range"), 'min':("0"), 'max':("511"), "class": [('frequency')] }, {"value":true,"type":true,"min":true,"max":true})) + "/><label>Freq. Range</label><input" + (jade.attrs({ 'data-value-for':("frequencyRange"), 'value':(frequencyRange) }, {"data-value-for":true,"value":true})) + "/><input" + (jade.attrs({ 'value':(frequencyRange), 'type':("range"), 'min':("0"), 'max':("100"), "class": [('frequencyRange')] }, {"value":true,"type":true,"min":true,"max":true})) + "/></div>");;return buf.join("");
};
});

;
//# sourceMappingURL=templates.js.map