module.exports = class Seed extends Backbone.View

  render: ->
    @$el.html ''
    @svg = d3.select("#page").append("svg")
    @center = x: $(@svg[0]).width() / 2, y: $(@svg[0]).height() / 2
    @r = 140
    @i = 0
    @drawCircles()
    @

  drawCircles: ->
    @pos = _(@center).clone()
    @drawCircle(class: 'center')

    getPos = (rads, rscale=1) =>
      x: @center.x + (Math.sin rads) * (@r * rscale)
      y: @center.y - (Math.cos rads) * (@r * rscale)

    levelScaleFactor = 0.866

    @level = 1
    @iterRadians (i, degrees, rads) =>
      @pos = getPos(rads, 1)
      @drawCircle(class: 'level-1', 'data-id': i)
    , 6

    if @model.get('mode') is 'seed'
      @pos = _(@center).clone()
      @drawCircle(class: 'outer', r: @r * 2)
      return

    @svg.selectAll('circle.level-1').each (circle) =>
      @pos = x: circle.attr('cx'), y: circle.attr('cy')
      @iterRadians (i, degrees, rads) =>
        @pos = getPos(rads, 1)
        @drawCircle(class: 'level-2', 'data-id': i)
      , 6
      debugger

    return
    @level = 2
    @iterRadians (i, degrees, rads) =>
      @pos = getPos(rads, 2)
      @drawCircle(class: 'level-2')
    , 6

    @iterRadians (i, degrees, rads) =>
      @pos = getPos(rads, 2 * levelScaleFactor)
      @drawCircle(class: 'level-2')
    , 6, 30


    @level = 3
    @iterRadians (i, degrees, rads) =>
      @pos = getPos(rads, 3)
      @drawCircle(class: 'level-3')
    , 6

    @iterRadians (i, degrees, rads) =>
      @pos = getPos(rads, 3 * .88)
      @drawCircle(class: 'level-3')
    , 6, 19

    @iterRadians (i, degrees, rads) =>
      @pos = getPos(rads, 3 * .89)
      @drawCircle(class: 'level-3')
    , 6, -19

  drawCircle: (attrs) ->
    _attrs =
      r: @r
      class: 'circle'
      cx: @pos.x
      cy: @pos.y
    _(_attrs).extend attrs
    node = @svg.append("svg:circle").attr(_attrs)
    pointAttrs = _.extend({}, _attrs, r: 2, class: '')
    @svg.append("svg:circle").attr pointAttrs

    $text = @svg.append('text').attr
      x: @pos.x
      y: @pos.y
    $text.text @i
    @i++

  iterRadians: (f, count, degreeOffset=0) ->
    for i in [0..count-1]
      degrees = ((360 * (i/count)) + degreeOffset) % 360
      rads = degrees * Math.PI/180
      f(i, degrees, rads)