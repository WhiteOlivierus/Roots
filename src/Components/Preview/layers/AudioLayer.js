import React from "react";

export function AudioLayer(props) {
    return (
        <div>
            <audio autoPlay>
                <source src={props.audio} type="audio/mp3" />
            </audio>
        </div>
    );
}
