export function InitImageValues(img) {
    var dimensions = {
        width: 0,
        height: 0,
        fullWidth: 0,
        fullHeight: 0,
        renderedWidth: 0,
        renderedHeight: 0,
    };

    dimensions.width = img.width;
    dimensions.height = img.height;

    dimensions.naturalHeight = img.naturalHeight;
    dimensions.naturalWidth = img.naturalWidth;

    dimensions.widthFactor = dimensions.naturalHeight / dimensions.height;
    dimensions.heightFactor = dimensions.naturalWidth / dimensions.width;

    dimensions.fullWidth = dimensions.naturalWidth / dimensions.widthFactor;
    dimensions.fullHeight = dimensions.naturalHeight / dimensions.heightFactor;

    dimensions.renderedWidth = dimensions.fullWidth - dimensions.width;
    dimensions.renderedHeight = dimensions.fullHeight - dimensions.height;

    return dimensions;
}

export function InitSVG(dimensions) {
    const svg = { width: 0, height: 0, offset: 0, left: false };

    if (dimensions.height > dimensions.fullHeight) {
        svg.width = dimensions.fullWidth;
        svg.height = dimensions.height;

        svg.offset = dimensions.renderedWidth / 2;
        svg.left = true;
    } else {
        svg.width = dimensions.width;
        svg.height = dimensions.fullHeight;

        svg.offset = dimensions.renderedHeight / 2;
        svg.left = false;
    }

    return svg;
}

export function ScalePoints(svgPoints, width, height) {
    svgPoints.forEach((svgPoint, index) => {
        if (index % 2 === 0 || index === 0) {
            svgPoint *= width;
        } else {
            svgPoint *= height;
        }

        svgPoints[index] = svgPoint;
    });

    return svgPoints;
}

/* export function PositionText(svg, dimensions) {
    // Get the bounding box of a svg
    var svgSize = svg.getBBox();

    // Get the text in the svg
    var offsetX = svg.left ? svg.offset : 0;
    var offsetY = !svg.left ? svg.offset : 0;

    // Check if the svg is on the left or right side
    if (dimensions.renderedWidth / 2 > svgSize.x) {
        var x = (svgSize.width + offsetX) / 2 + svgSize.x;
    } else {
        var x = (svgSize.width - offsetX) / 2 + svgSize.x;
    }

    // Check if the svg is on the bottom or top side
    if (dimensions.renderedHeight / 2 > svgSize.y) {
        var y = (svgSize.height + offsetY) / 2 + svgSize.y;
    } else {
        var y = (svgSize.height - offsetY) / 2 + svgSize.y;
    }

    return { x: x, y: y };
} */

// Map a value to a range
// eslint-disable-next-line no-extend-native
Number.prototype.map = (inMin, inMax, outMin, outMax) =>
    ((this - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
