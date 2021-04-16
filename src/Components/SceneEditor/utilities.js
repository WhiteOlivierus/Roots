export const PointsToRelative = (points, size) => points.map((point, index) => divide(point, isEven(index) ? size.height : size.width));

export const PointsToImageSize = (points, size) => points.map((point, index) => times(point, isEven(index) ? size.height : size.width));

const isEven = (value) => value % 2;

const divide = (value, by) => value /= by;
const times = (value, by) => value *= by;

export const ApplyOffset = (points, offset) => {
    return points.map((point, index) => {
        if (index % 2) {
            point += offset[1];
        } else {
            point += offset[0];
        }
        return point;
    });
}

export const TransformZones = (node, size, action) => {
    if (!node && node.length < 1) return;

    console.log(node[0].points);

    node = node.map((zone) => {
        return TransformZone(zone, size, action);
    });

    console.log(node[0].points);

    return node;
};

export const TransformZone = (zone, size, action) => ({
    ...zone,
    points: action(zone.points, size)
});

