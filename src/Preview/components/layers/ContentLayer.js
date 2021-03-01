import React from "react";

export function ContentLayer(props) {
    return (
        <div className="content layer">
            <img
                useMap={`#${props.id}`}
                className="object-fit_contain map maphilighted"
                src={`/img/${props.img}`}
                alt=""
            />
        </div>
    );
}
