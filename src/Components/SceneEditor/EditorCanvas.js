import { memo } from "react";
import SceneCanvas from "dutchskull-scene-manager";

export const EditorCanvas = memo((props) => {
    return (
        <SceneCanvas
            editMode={props.mode === "edit"}
            polygons={props.polygon}
            container={props.imageRef}
            selection={props.selection}
        />
    );
});

