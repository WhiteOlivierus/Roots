import { map_range } from "../../../Utilities/Utilities";

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
