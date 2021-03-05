import React from "react";

export function UILayer(props) {
    if (!props.end) return null;

    return (
        <div class="ui layer center-content">
            <h1>{props.end}</h1>
        </div>
    );
}
