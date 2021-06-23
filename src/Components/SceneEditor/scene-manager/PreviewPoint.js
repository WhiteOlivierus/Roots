import styled from "styled-components";
import { theme } from "../../../Utilities/Theme";

export const PreviewPoint = styled.circle`
    fill: ${theme.palette.primary.main};

    &:hover {
        fill: ${theme.palette.secondary.main};
        cursor: pointer;
    }

    &.selected {
        fill: ${theme.palette.secondary.main};
        fill-opacity: 1;
    }
`;
