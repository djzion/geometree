Seed = require 'scripts/views/seed'
$ = jQuery

class App extends Backbone.Model

  defaults:
    mode: 'tree'

  initialize: ->
    @on 'change:mode', => @view.render()

  ready: ->
    @view = new Seed(el: $('#page'), model: @)
    @view.render()


app = new App

jQuery ->
  app.ready()

module.exports = app
Backbone.$ = jQuery