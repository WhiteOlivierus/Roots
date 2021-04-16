
export const PointsToRelative = (points, size) => {
    var newPoints = points.map((point, index) => {
        if (index % 2) {
            //even
            point /= size.height;
        } else {
            //odd
            point /= size.width;
        }

        return point;
    });
    return newPoints;
};
export const PointsToImageSize = (points, size) => {
    var newPoints = points.map((point, index) => {
        if (index % 2) {
            //even
            point *= size.height;
        } else {
            //odd
            point *= size.width;
        }

        return point;
    });
    return newPoints;
};
export function TransformPoints(zone, size, action) {
    if (zone === undefined) return [];
    if (zone && zone.length > 0) {
        console.log(zone[0].points);
        zone = [...zone.map(zone => {
            return {
                ...zone,
                points: action(zone.points, size)
            };
        })];
        console.log(zone[0].points);
        return zone;
    }
}
