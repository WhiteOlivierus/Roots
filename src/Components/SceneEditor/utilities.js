export const PointsToRelative = (points, size) =>
    points.map((point, index) =>
        divide(point, isEven(index) ? size.height : size.width)
    );

export const PointsToImageSize = (points, size) =>
    points.map((point, index) =>
        times(point, isEven(index) ? size.height : size.width)
    );

const isEven = (value) => value % 2;

const divide = (value, by) => (value /= by);
const times = (value, by) => (value *= by);

export const ApplyOffset = (points, offset) =>
    points.map((point, index) => (point + (index % 2) ? offset[1] : offset[0]));

export const TransformZones = (node, size, action) => {
    if (!node && node.length < 1) return;

    console.log(node[0].points);

    node = node.map((zone) => TransformZone(zone, size, action));

    console.log(node[0].points);

    return node;
};

export const TransformZone = (zone, size, action) => ({
    ...zone,
    points: action(zone.points, size),
});
