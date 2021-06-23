import * as React from "react";
import * as MUI from "@material-ui/core";
import PropTypes from "prop-types";
import { theme } from "../../Utilities/Theme";

const Editor = ({ node, onLoad, imageRef }) => {
    const hasSrc = node.value.data.imageSrc;

    const handleLoad = ({ target }) => onLoad(target);

    return (
        <MUI.Paper
            style={{
                position: "relative",
                width: !hasSrc && "100%",
                paddingTop: !hasSrc && "56.25%",
                backgroundColor: !hasSrc && theme.palette.primary.main,
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
                    onLoad={handleLoad}
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
                    No scene image yet, please add one. <br /> You can do this
                    under scene settings in the inspector.
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
