import React from "react";

import { AudioLayer } from "./layers/AudioLayer";
import { UILayer } from "./layers/UILayer";
import SvgImageFitter from "./SVGImageFitter/SvgImageFitter";

import { Transition } from "react-transition-group";

export function Scene(props) {
    const scene = props.scene;

    return (
        <div id={scene.id}>
            <UILayer end={scene.end} />

            <AudioLayer audio={scene.audio} />

            <SvgImageFitter zones={scene} />
        </div>
    );
}
