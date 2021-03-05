import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const G = styled.g`
    cursor: pointer;
    opacity: 0;

    :hover {
        opacity: 0.5;
        fill: #900;
    }
`;
const Text = styled.text`
    opacity: 0;

    ${G}:hover & {
        opacity: 1;
        font-size: 3rem;
        fill: white;
    }
`;

export function ScaledSVG(props) {
    const zone = props.zone;
    return (
        <G id="button">
            <Link to={`/${zone.sceneId}`}>
                <polygon points={zone.svg} />
            </Link>
            <Text
                x="0"
                y="0"
                alignment-baseline="middle"
                style={{ textAnchor: "middle" }}
            >
                {zone.text}
            </Text>
        </G>
    );
}
