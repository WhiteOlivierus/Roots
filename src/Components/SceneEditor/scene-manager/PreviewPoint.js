import styled from "styled-components";

export const PreviewPoint = styled.circle`
    fill: #e040fb;

    &:hover {
        fill: white;
        cursor: pointer;
    }

    &.selected {
        fill: black;
        fill-opacity: 1;
    }
`;
