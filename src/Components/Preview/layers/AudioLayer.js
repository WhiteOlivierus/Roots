import React from "react";
import PropTypes from "prop-types";
function AudioLayer(props) {
    return (
        <div>
            <audio autoPlay>
                <source src={props.audio} type="audio/mp3" />
            </audio>
        </div>
    );
}

AudioLayer.displayName = "AudioLayer";
AudioLayer.propTypes = { audio: PropTypes.string };
export default AudioLayer;
