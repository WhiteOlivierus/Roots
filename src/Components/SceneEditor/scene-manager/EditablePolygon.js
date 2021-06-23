import styled from "styled-components";
import { theme } from "../../../Utilities/Theme";

export const EditablePolygon = styled.polygon`
    fill-opacity: 0;
    stroke: ${theme.palette.secondary.main};
    stroke-width: 2;
`;

export const EditablePolyLine = styled.polyline`
    fill-opacity: 0;
    stroke: ${theme.palette.secondary.main};
    stroke-width: 2;
`;
