import short from "short-uuid";

export function SplitInChunks(array, size) {
    var output = [];
    for (var i = 0, j = array.length; i < j; i += size) {
        const slice = array.slice(i, i + size);
        output.push(slice);
    }
    return output;
}

export const PolygonToHandles = (polygon) => {
    if (polygon) {
        return {
            id: polygon.id,
            handles: SplitInChunks(polygon.points, 2),
            selectedHandle: -1,
            points: polygon.points,
            closed: true,
        };
    } else {
        return {
            id: short.generate(),
            handles: [],
            selectedHandle: -1,
            points: [],
            closed: false,
        };
    }
};

export const NearestPoints = (points, myPoint) => {
    var minDistance = Number.MAX_SAFE_INTEGER;
    var closestPoint = -1;
    var secondClosetsPoint = -1;
    for (var i = 0; i < points.length; i++) {
        const x = (myPoint[0] - points[i][0]) * (myPoint[0] - points[i][0]);
        const y = (myPoint[1] - points[i][1]) * (myPoint[1] - points[i][1]);
        var distance = Math.sqrt(x + y);
        if (distance < minDistance) {
            minDistance = distance;
            secondClosetsPoint = closestPoint;
            closestPoint = i;
        }
    }
    return { closestPoint, secondClosetsPoint };
};

export const ApplyOffset = (offset) => (point, index) =>
    point + (index % 2 ? offset[1] : offset[0]);
