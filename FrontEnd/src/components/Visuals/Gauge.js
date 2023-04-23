var width      = 960,
height     = 500,
margin     = 40,
n          = 30,
radius     = width/2 - (margin*2),
needleRad  = 20,
pi         = Math.PI,
halfPi     = pi/2,
endAngle   = pi/2,
startAngle = -endAngle,
data       = d3.range(startAngle, endAngle, pi/n),
_data      = data.slice(0),
tt         = 3000,
scale      = d3.scaleLinear().range([startAngle, endAngle]),
colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain([data[0], data[data.length-1]]),
svg        = d3.select('svg').append('g').attr('transform', 'translate(' + width/2 + ',' + (height-margin) + ')');

_data.push(endAngle);

var arc = d3.arc()
.innerRadius(radius - (radius/5))
.outerRadius(radius)
.startAngle(function(d) { return d; })
.endAngle(function(d, i) { return _data[i + 1]; });

var slice = svg.append('g').selectAll('path.slice').data(data);

slice
.enter()
.append('path')
.attr('class', 'slice')
.attr('d', arc)
.attr('fill', function(d) { return colorScale(d); });

var needle = svg.append('g').append('path').attr('class', 'needle').attr('fill-opacity', .7).attr('stroke', 'black');
var text   = svg.append('g').append('text').attr('class', 'text').attr('text-anchor', 'middle').attr('dy', '-0.45em').classed('monospace', true);

function update(oldValue, newValue){
needle
    .datum({ oldValue: oldValue })
    .transition().duration(tt)
    .attrTween('d', lineTween(newValue))
    .on('end', function(){
        update(newValue, scale(Math.random()));
    });

text
    .datum({ oldValue: oldValue })
    .transition().duration(tt)
    .attrTween('transform', transformTween(newValue))
    .tween('text', textTween(newValue));
}

function textTween(newValue){
return function(d){

    var that = d3.select(this),
        i    = d3.interpolate(d.oldValue, newValue);

    return function(t){
        that.text(d3.format('.1%')(scale.invert(i(t))));
    };
};
}

function transformTween(newValue){
return function(d){

    var interpolate = d3.interpolate(d.oldValue, newValue);

    return function(t){
        var _in     = interpolate(t) - halfPi,
            centerX = (radius + 20) * Math.cos(_in),
            centerY = (radius + 20) * Math.sin(_in);
        return 'translate(' + centerX + ',' + centerY + ')';
    };
};
}

function lineTween(newValue){
return function(d){

    var interpolate = d3.interpolate(d.oldValue, newValue);

    return function(t){

        var _in = interpolate(t) - halfPi,
            _im = _in - halfPi,
            _ip = _in + halfPi;

        var topX = radius * Math.cos(_in),
            topY = radius * Math.sin(_in);

        var leftX = needleRad * Math.cos(_im),
            leftY = needleRad * Math.sin(_im);

        var rightX = needleRad * Math.cos(_ip),
            rightY = needleRad * Math.sin(_ip);

        return d3.line()([[topX, topY], [leftX, leftY], [rightX, rightY]]) + 'Z';
    };
};
}

update(scale(0), scale(Math.random()));