import React from "react";
import PropTypes from "prop-types";
import { useAudio } from "react-use";

function AudioLayer({ audio }) {
    const [a] = useAudio({
        src: audio,
        autoPlay: true,
    });

    return <div>{a}</div>;
}

AudioLayer.displayName = "AudioLayer";
AudioLayer.propTypes = { audio: PropTypes.string };
export default AudioLayer;
