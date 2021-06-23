import styled from "styled-components";

export const PreviewPolygon = styled.polygon`
    stroke: white;
    stroke-width: 2;
    fill-opacity: 0;

    &:hover {
        fill: #e040fb;
        fill-opacity: 1;

        cursor: pointer;
    }

    &.selected {
        fill: #e040fb;
        fill-opacity: 1;
    }
`;
