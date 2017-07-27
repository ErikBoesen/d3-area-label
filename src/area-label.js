export default function(area) {
  var x = area.x();
  var y0 = area.y0();
  var y1 = area.y1();
  var bisectorX = d3.bisector(x).right;

  // Returns true if there is at least one rectangle
  // of the given aspect ratio and scale
  // that fits somewhere within the area.
  function fits(data, aspect, height, justTest) {
    var x0, x1, i0, i1, j, d, top, bottom, ceiling, floor,
        width = aspect * height,
        xMax = x(data[data.length - 1]);

    for(i0 = 0; i0 < data.length; i0++) {
      d = data[i0];
      x0 = x(d);
      x1 = x0 + width;

      if (x1 > xMax) {
        break;
      }
      
      i1 = bisectorX(data, x1);
      ceiling = -Infinity;
      floor = Infinity;
      for(j = i0; j < i1; j++) {
        d = data[j];

        bottom = y0(d);
        if(bottom < floor) {
          floor = bottom;
        }

        top = y1(d);
        if(top > ceiling) {
          ceiling = top;
        }
      }
      if ((floor - ceiling) >= height) {

        // Avoid creating new objects unnecessarily while just testing.
        if (justTest) {
          return true;
        }

        // Output the coordinates for use in label transform.
        return {
          x: x0,
          y: ceiling
        };
      }
    }
    return false;
  }

  return function (data) {
  
    // TODO make this configurable
    var minHeight = 2;

    var bbox = this.getBBox();
    var aspect = bbox.width / bbox.height;

    // Find largest height where label would fit.
    // TODO use Bisection method to get more precision with fewer iterations.
    // https://en.wikipedia.org/wiki/Bisection_method
    var height = minHeight;
    while (fits(data, aspect, height, true)) {
      height++;
    }
    height--;
    var fit = fits(data, aspect, height);

    d3.select(this)
        .attr("transform", [
          "translate(" + fit.x + "," + fit.y + ")",
          "scale(" + height / bbox.height + ")",
          "translate(" + -bbox.x + "," + -bbox.y + ")"
        ].join(" "));
  }
};
