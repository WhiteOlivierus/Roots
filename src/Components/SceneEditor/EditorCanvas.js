import * as React from "react";
import SceneCanvas from "dutchskull-scene-manager";
import PropTypes from "prop-types";

export const EditorCanvas = ({ mode, polygon, imageRef, selection }) => (
    <>
        {imageRef.current && (
            <SceneCanvas
                editMode={mode === "edit"}
                polygons={polygon}
                container={imageRef}
                selection={selection}
            />
        )}
    </>
);

EditorCanvas.displayName = "EditorCanvas";

EditorCanvas.propTypes = {
    mode: PropTypes.string.isRequired,
    polygon: PropTypes.object.isRequired,
    imageRef: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
};

export default React.memo(EditorCanvas);
