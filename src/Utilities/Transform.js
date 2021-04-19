export const PointsToRelative = (point, index, size) =>
    point / (index % 2 ? size.height : size.width);

export const PointsToImageSize = (point, index, size) =>
    point * (index % 2 ? size.height : size.width);

// Takes zones and tranforms every zone based on passed translation
export const TransformPoints = (zones, size, action) => {
    if (zones === undefined || !zones || zones.length < 1) return [];

    return [
        ...zones.map((zone) => {
            return {
                ...zone,
                points: zone.points.map((point, index) =>
                    action(point, index, size)
                ),
            };
        }),
    ];
};
