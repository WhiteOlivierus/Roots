export const MapRange = (range, fn) =>
    Array(range)
        .fill(0)
        .map((_, i) => fn(i));

export const map_range = (value, minLow, minHigh, maxLow, maxHigh) =>
    ((value - minLow) * (maxHigh - maxLow)) / (minHigh - minLow) + maxLow;
