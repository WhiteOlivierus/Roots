import * as React from "react";
import * as MUI from "@material-ui/core";
import PropTypes from "prop-types";

const Editor = ({ node, onLoad, imageRef }) => {
    const hasSrc = node.value.data.imageSrc;
    const test = {
        width: !hasSrc && "100%",
        paddingTop: !hasSrc && "56.25%",
        backgroundColor: !hasSrc && "#e040fb",
    };
    return (
        <MUI.Paper
            style={{
                margin: "auto",
                position: "relative",
                ...test,
            }}
        >
            {hasSrc ? (
                <img
                    src={hasSrc}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 4,
                    }}
                    alt="scene"
                    onLoad={onLoad}
                    ref={imageRef}
                />
            ) : (
                <h1
                    style={{
                        position: "absolute",
                        top: "50%",
                        width: "100%",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    No scene image yet, please add one.
                </h1>
            )}
        </MUI.Paper>
    );
};
Editor.displayName = "Editor";
Editor.propTypes = {
    node: PropTypes.object,
    onLoad: PropTypes.func,
    imageRef: PropTypes.object,
};

export default Editor;