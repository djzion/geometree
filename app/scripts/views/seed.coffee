module.exports = class Seed extends Backbone.View

  render: ->
    @$el.html ''
    @svg = d3.select("#page").append("svg")
    @center = x: $(@svg[0]).width() / 2, y: $(@svg[0]).height() / 2
    @r = 80
    @i = 0
    @drawCircles()
    @

  drawCircles: ->
    @pos = _(@center).clone()
    circle = @drawCircle(class: 'center')



    @levelScaleFactor = 0.866

    @level = 1
    #@iterRadians (i, degrees, rads) =>
    #  @pos = getPos(rads, 1)
    #  @drawCircle(class: 'level-1', 'data-id': i)
    #, 6

    if @model.get('mode') is 'seed'
      @pos = _(@center).clone()
      @drawCircle(class: 'outer', r: @r * 2)
      return
    else
      @drawGeneration(1, circle)


  drawGeneration: (gen, circle, dir=0) ->
    return if gen >= 4

    getPos = (rads, rscale=1) =>
      x: @pos.x + (Math.sin rads) * (@r * rscale)
      y: @pos.y - (Math.cos rads) * (@r * rscale)

    rect = circle.getBoundingClientRect()
    @pos =
      x: rect.left + (rect.width / 2) - @r * 1.5
      y: rect.top + (rect.height / 2) + @r * @levelScaleFactor

    _draw = (i, gen) =>
      rads = @getRads(i)
      if false
        @pos = getPos(rads, @levelScaleFactor * (gen+1))
      else
        @pos = getPos(rads, @levelScaleFactor * (gen) * 2)
      delta = x: 0, y:0
      debugger
      circle = @drawCircle({class: "level-#{gen}"}, x: @pos.x + delta.x, y: @pos.y + delta.y)

    childCount = ->
      if gen < 2
        6
      else
        6

    circles = []
    for i in [0..childCount()-1]
      circles.push _draw(i+dir, gen)

    recurse = 0
    for circle in circles
      @drawGeneration(gen+1, circle, dir)
      recurse++
      break if recurse > 6

  drawCircle: (attrs, pos=@pos) ->
    _attrs =
      r: @r
      class: 'circle'
      cx: pos.x
      cy: pos.y
    _(_attrs).extend attrs
    _attrs['data-id'] = @i
    node = @svg.append("svg:circle").attr(_attrs)
    pointAttrs = _.extend({}, _attrs, r: 2, class: '')
    @svg.append("svg:circle").attr pointAttrs

    $text = @svg.append('text').attr
      x: pos.x
      y: pos.y
    $text.text @i
    @i++
    node[0][0]

  iterRadians: (f, count, degreeOffset=0) ->
    for i in [0..count-1]
      degrees = ((360 * (i/count)) + degreeOffset) % 360
      rads = degrees * Math.PI/180
      f(i, degrees, rads)

  getRads: (i, count=6) ->
      degrees = ((360 * (i/count))) % 360
      rads = degrees * Math.PI/180