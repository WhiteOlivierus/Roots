$(window).on("load", function () {
    InitSVG();
});

var offsetX = 0;
var offsetY = 0;

var renderedWidth;
var renderedHeight;

function InitSVG() {
    var image = $(".scene-active img")[0];

    var width = image.width;
    var height = image.height;

    var naturalHeight = image.naturalHeight;
    var naturalWidth = image.naturalWidth;

    var widthFactor = naturalHeight / height;
    var heightFactor = naturalWidth / width;

    var fullWidth = naturalWidth / widthFactor;
    var fullHeight = naturalHeight / heightFactor;

    renderedWidth = fullWidth - width;
    renderedHeight = fullHeight - height;

    // Check if the overflow is in the height or in the width
    if (height > fullHeight) {
        const newLocal = $(".scene-active svg");
        newLocal.attr("width", `${fullWidth}px`);
        newLocal.attr("height", `${height}px`);

        // Move the svg based on the render with
        offsetX = renderedWidth / 2;
        newLocal.css("left", `-${offsetX}px`);

        SetupSVG(".scene-active #button", fullWidth, height);
    } else {
        const newLocal = $("svg");
        newLocal.attr("width", `${width}px`);
        newLocal.attr("height", `${fullHeight}px`);

        offsetY = renderedHeight / 2;
        newLocal.css("top", `-${offsetY}px`);

        SetupSVG(".scene-active #button", width, fullHeight);
    }
}

function SetupSVG(selector, width, height) {
    $.each($(`${selector} polygon`), (index, element) => {
        ScaleSvg($(element), width, height);
        PositionText($(element), $(`${selector} text`));
    });
}

function ScaleSvg(svg, width, height) {
    // Get the points of the svg and parse them as json, instead of parse float
    var svgPoints = JSON.parse(`[${svg.attr("points")}]`);
    // var svgPoints = MapSVGValues();

    svg.attr("points", ScalePoints(svgPoints, width, height));
}

function ScalePoints(svgPoints, width, height) {
    // Iterate over all the point and multiply by the width of the rendered image
    $.each(svgPoints, (index, svgPoint) => {
        if (index % 2 == 0 || index == 0) {
            svgPoint *= width;
        } else {
            svgPoint *= height;
        }

        svgPoints[index] = svgPoint;
    });

    return svgPoints.join(",");
}

function PositionText(svg, text) {
    // Get the bounding box of a svg
    var svgSize = svg[0].getBBox();

    // Check if the svg is on the left or right side
    if (renderedWidth / 2 > svgSize.x) {
        var x = (svgSize.width + offsetX) / 2 + svgSize.x;
    } else {
        var x = (svgSize.width - offsetX) / 2 + svgSize.x;
    }

    // Check if the svg is on the bottom or top side
    if (renderedHeight / 2 > svgSize.y) {
        var y = (svgSize.height + offsetY) / 2 + svgSize.y;
    } else {
        var y = (svgSize.height - offsetY) / 2 + svgSize.y;
    }

    // Apply the position
    text.attr("x", x);
    text.attr("y", y);
}

// Map the x and y values to 0 to 1
function MapSVGValues() {
    var values = [
        1317,
        2006,
        1317,
        1713,
        1461,
        1569,
        1578,
        1708,
        1573,
        2070,
        1658,
        2070,
        1663,
        2245,
        1530,
        2245,
        1530,
        2155,
        1439,
        2139,
        1275,
        2048,
        1280,
        2000,
    ];

    $.each(values, (index, value) => {
        if (index % 2 == 0 || index == 0) {
            value = value.map(0, 6024, 0, 1);
        } else {
            value = value.map(0, 3389, 0, 1);
        }

        values[index] = value;
    });

    return values;
}

// Map a value to a range
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (
        ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
};
