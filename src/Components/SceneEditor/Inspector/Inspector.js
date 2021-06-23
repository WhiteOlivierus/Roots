import * as React from "react";

import EditorInspector from "./EditorInspector";
import SceneSettingsDrawer from "./SceneSettingsDrawer";
import PropTypes from "prop-types";
import SelectionDrawer from "./SelectionDrawer";
// import ZoneStyleDrawer from "./ZoneStyleDrawer";

const Inspector = ({
    node,
    activeRoot,
    selection,
    selectedZone,
    polygons,
    mode,
}) => {
    const showSelectionDrawer =
        mode.value !== "edit" && selectedZone.value && selection.value;

    return (
        <EditorInspector>
            <SceneSettingsDrawer
                node={node.value}
                onChange={node.setValue}
                projectFolder={activeRoot}
            />
            {showSelectionDrawer && (
                <>
                    <SelectionDrawer
                        onChange={polygons.setValue}
                        selection={selection.value}
                        selectedZone={selectedZone.value}
                    />
                    {/*                     <ZoneStyleDrawer
                        onChange={polygons.setValue}
                        selection={selection.value}
                        selectedZone={selectedZone.value}
                    /> */}
                </>
            )}
        </EditorInspector>
    );
};

Inspector.displayName = "Inspector";

Inspector.propTypes = {
    node: PropTypes.object.isRequired,
    activeRoot: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
    selectedZone: PropTypes.object.isRequired,
    polygons: PropTypes.object.isRequired,
    mode: PropTypes.object.isRequired,
};

export default React.memo(Inspector);
