import * as React from "react";

import AudioLayer from "./layers/AudioLayer";
import UILayer from "./layers/UILayer";
import SvgImageFitter from "./SVGImageFitter/SvgImageFitter";

import PropTypes from "prop-types";

const Scene = ({ scene }) => {
    const [imageRef, setImageRef] = React.useState();

    return (
        <div id={scene.id}>
            <UILayer end={scene.end} />

            <AudioLayer audio={scene.audioSrc} />

            <img
                src={scene.imageSrc ? scene.imageSrc : `/img/${scene.image}`}
                style={{
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                }}
                onLoad={(ref) => setImageRef(ref)}
            />

            {imageRef && (
                <SvgImageFitter zones={scene} container={imageRef.target} />
            )}
        </div>
    );
};

Scene.displayName = "Scene";

Scene.propTypes = {
    scene: PropTypes.object.isRequired,
};

export default React.memo(Scene);
