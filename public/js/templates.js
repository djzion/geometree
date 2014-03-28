window.require.register("index", function(exports, require, module) {
  module.exports = function anonymous(locals) {
  var buf = [];
  buf.push("<!DOCTYPE html><head><link href=\"/css/app.css\" rel=\"stylesheet\" type=\"text/css\"><script src=\"/js/vendor.js\"></script><script src=\"/js/app.js\"></script><script src=\"/js/templates.js\"></script><script>window.app = require('scripts/app')</script></head><body><div id=\"page\"></div></body>");;return buf.join("");
  };
});
window.require.register("templates/channel", function(exports, require, module) {
  module.exports = function anonymous(locals) {
  var buf = [];
  var locals_ = (locals || {}),id = locals_.id,name = locals_.name,threshold = locals_.threshold,frequency = locals_.frequency,frequencyRange = locals_.frequencyRange;buf.push("<div" + (jade.attrs({ 'data-channel':(id), "class": [('channel')] }, {"data-channel":true})) + "><label>Channel</label><input" + (jade.attrs({ 'data-value-for':("name"), 'value':(name) }, {"data-value-for":true,"value":true})) + "/><label>Threshold</label><input" + (jade.attrs({ 'data-value-for':("threshold"), 'value':(threshold) }, {"data-value-for":true,"value":true})) + "/><input" + (jade.attrs({ 'value':(threshold), 'type':("range"), 'min':("0"), 'max':("1"), 'step':("0.005"), "class": [('threshold')] }, {"value":true,"type":true,"min":true,"max":true,"step":true})) + "/><label>Frequency</label><input" + (jade.attrs({ 'data-value-for':("frequency"), 'value':(frequency) }, {"data-value-for":true,"value":true})) + "/><input" + (jade.attrs({ 'value':(frequency), 'type':("range"), 'min':("0"), 'max':("511"), "class": [('frequency')] }, {"value":true,"type":true,"min":true,"max":true})) + "/><label>Freq. Range</label><input" + (jade.attrs({ 'data-value-for':("frequencyRange"), 'value':(frequencyRange) }, {"data-value-for":true,"value":true})) + "/><input" + (jade.attrs({ 'value':(frequencyRange), 'type':("range"), 'min':("0"), 'max':("100"), "class": [('frequencyRange')] }, {"value":true,"type":true,"min":true,"max":true})) + "/></div>");;return buf.join("");
  };
});
