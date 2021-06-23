import * as React from "react";
import SceneCanvas from "./scene-manager";
import PropTypes from "prop-types";

export const EditorCanvas = ({ mode, polygons, imageRef, selection }) => (
    <>
        {imageRef.current && (
            <SceneCanvas
                editMode={mode === "edit"}
                polygons={polygons}
                container={imageRef}
                selection={selection}
            />
        )}
    </>
);

EditorCanvas.displayName = "EditorCanvas";

EditorCanvas.propTypes = {
    mode: PropTypes.string.isRequired,
    polygons: PropTypes.object.isRequired,
    imageRef: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
};

export default React.memo(EditorCanvas);
