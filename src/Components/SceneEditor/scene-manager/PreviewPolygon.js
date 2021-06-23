import styled from "styled-components";
import { theme } from "../../../Utilities/Theme";

export const PreviewPolygon = styled.polygon`
    stroke: ${theme.palette.secondary.main};
    stroke-width: 2;
    fill-opacity: 0;

    &:hover {
        fill: ${theme.palette.primary.main};
        fill-opacity: 1;

        cursor: pointer;
    }

    &.selected {
        fill: ${theme.palette.primary.main};
        fill-opacity: 1;
    }
`;
