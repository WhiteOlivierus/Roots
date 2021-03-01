import React from "react";
import { AudioLayer } from "./layers/AudioLayer";
import { ContentLayer } from "./layers/ContentLayer";
import { InputLayer } from "./layers/InputLayer";
import { UILayer } from "./layers/UILayer";

export function Scene(props) {
    const scene = props.scene;

    let newLocal = props.first ? "scene-active" : "scene-inactive";
    newLocal = `${newLocal} layer`;

    return (
        <div className={newLocal} id={scene.id}>
            <UILayer end={scene.end} />

            <AudioLayer audio={scene.audio} />

            <ContentLayer id={scene.id} img={scene.img} />

            <InputLayer id={scene.id} zones={scene.inputZones} />
        </div>
    );

    function hashCode(str) {
        var hash = 0,
            i,
            chr;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}
