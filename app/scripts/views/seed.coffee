Circle = require 'scripts/models/circle'
Circles = require 'scripts/models/circles'

module.exports = class Seed extends Backbone.View

  initialize: (@options) ->
    super
    @circles = new Circles()

  render: ->
    @svg = @options.app.svg
    @center = x: 0, y: 0
    @r = 80
    @i = 0
    @createCircles()
    @drawCircles()
    @

  createCircles: ->
    @pos = _(@center).clone()
    circle = @createCircle(class: 'center')
    #circle = @createCircle({class: 'center'}, {x:0, y: -@r})


    @levelScaleFactor = 0.866

    getPos = (rads, rscale=1) =>
      x: @center.x + (Math.sin rads) * (@r * rscale)
      y: @center.y - (Math.cos rads) * (@r * rscale)

    @level = 1
    @iterRadians (i, degrees, rads) =>
      @pos = getPos(rads, 1)
      @createCircle(class: 'level-1', 'data-id': i)
    , 6

    if @model.get('mode') is 'seed'
      @pos = _(@center).clone()
      @createCircle(class: 'outer', r: @r * 2)
      return
    else
      @drawGeneration(1, circle)

  drawGeneration: (gen, circle, dir=0) ->
    return if gen >= 2

    getPos = (rads, rscale=1) =>
      x: @pos.x + (Math.sin rads) * (@r * rscale)
      y: @pos.y - (Math.cos rads) * (@r * rscale)
    """
    rect = circle.getBoundingClientRect()
    @pos =
      x: rect.left + (rect.width / 2) - @r * 1.5
      y: rect.top + (rect.height / 2) + @r * @levelScaleFactor
    """
    _draw = (i, gen) =>
      rads = @getRads(i)
      @pos = getPos(rads, @levelScaleFactor * 2)
      delta = x: 0, y:0
      circle = @createCircle({class: "level-#{gen}"}, x: @pos.x + delta.x, y: @pos.y + delta.y)

    childCount = ->
      if gen is 1
        6
      else if gen is 2
        2
      else
        2

    circles = []
    for i in [0..childCount()-1]
      circles.push _draw((dir+i) % 6, gen)

    for i in [0..circles.length-1]
      @drawGeneration(gen+1, circle, (i+dir)%6)

  createCircle: (attrs, pos=@pos) ->
    _attrs =
      r: @r
      class: 'circle'
      cx: pos.x
      cy: pos.y
      'data-id':@i
    _(_attrs).extend attrs
    @i++

    circle = new Circle
      pos: pos
      attrs: _attrs
      index: @i
    @circles.add circle
    circle

  drawCircle: (circle) ->
    node = @svg.append("svg:circle").attr(circle.get 'attrs')
    pointAttrs =
      r: 2
      cx: circle.get('pos').x
      cy: circle.get('pos').y
    @svg.append("svg:circle").attr pointAttrs

    $text = @svg.append('text').attr
      x: circle.get('pos').x
      y: circle.get('pos').y
    $text.text circle.get('index')

    node[0][0]

  drawCircles: ->
    i = 0
    do _draw = =>
      if i >= @circles.size() - 1
        return
      @drawCircle @circles.models[i]
      i++
      _.delay _draw, 500

  iterRadians: (f, count, degreeOffset=0) ->
    for i in [0..count-1]
      degrees = ((360 * (i/count)) + degreeOffset) % 360
      rads = degrees * Math.PI/180
      f(i, degrees, rads)

  getRads: (i, count=6) ->
      degrees = ((360 * (i/count))) % 360
      rads = degrees * Math.PI/180