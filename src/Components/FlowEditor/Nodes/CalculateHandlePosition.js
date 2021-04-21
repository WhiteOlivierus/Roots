export const CalculateHandlePosition = (length, index, handlePadding = 0) => {
    length -= 1;
    if (length === 0) return 50;
    else
        return map_range(
            index,
            0,
            length,
            0 + handlePadding,
            100 - handlePadding
        );
};

const map_range = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
