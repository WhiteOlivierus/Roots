import React from "react";

import AudioLayer from "./layers/AudioLayer";
import UILayer from "./layers/UILayer";
import SvgImageFitter from "./SVGImageFitter/SvgImageFitter";

import PropTypes from "prop-types";
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

Scene.displayName = "Scene";
Scene.propTypes = {
    scene: PropTypes.object.isRequired,
};
export default Scene;
