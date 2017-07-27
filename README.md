# d3-area-label

A label placement library for area charts.

[![image](https://user-images.githubusercontent.com/68416/28669943-0e11fa72-72f4-11e7-9aef-0c575cb20825.png)](https://bl.ocks.org/curran/2793201c7025c416c471e30d30546c6b)
Example: https://bl.ocks.org/curran/2793201c7025c416c471e30d30546c6b

## Installing

If you use NPM, `npm install d3-area-label`. Otherwise, download the [latest release](https://github.com/curran/d3-area-label/releases/latest).

## API Reference

<a href="#area-label" name="area-label">#</a> <b>areaLabel</b>(<i>area</i>)

Computes the optimal position and size for a label. Also positions the label using SVG transform.

Example usage:

```js
const labels = svg.selectAll('text').data(stacked)
labels
  .enter().append('text')
    .attr('class', 'area-label')
  .merge(labels)
    .text(d => d.key)
    .each(d3.areaLabel(area)) // <--------------------- Call the function like this.
```

For more details and context, see [test/index.html](test/index.html).

# Thanks

Many thanks to Lee Byron, Noah Veltman, Philippe Rivière, and Adam Pearce for ideas and input.
