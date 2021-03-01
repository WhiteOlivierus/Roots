import React from "react";
import { v4 as uuidv4 } from "uuid";

export function InputLayer(props) {
    if (!props.zones) return null;

    let s = [];

    props.zones.forEach((zone, index) => {
        if ((index = 0)) {
            s.push(<InputZone key={uuidv4()} id={index} zone={zone} />);
        } else {
            s.push(<InputZone key={uuidv4()} id={index} zone={zone} />);
        }
    });

    return (
        <svg width="100vw" height="100vh">
            {s}
        </svg>
    );
}

function InputZone(props) {
    let zone = props.zone;

    return (
        <g id="button">
            <polygon points={zone.svg} id={zone.sceneId} />
            <text x="0.25" y="0.5" style={{ textAnchor: "middle" }}>
                {zone.text}
            </text>
        </g>
    );
}
