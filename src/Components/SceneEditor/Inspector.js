import * as React from "react";
import EditorInspector from "./Inspector/EditorInspector";
import * as MUI from "@material-ui/core";
import { SceneSettingsDrawer } from "./Inspector/SceneSettingsDrawer";
import PropTypes from "prop-types";

const Inspector = ({
    node,
    activeRoot,
    selection,
    selectedZone,
    polygons,
    mode,
}) => {
    const handleToggleZone = React.useCallback(
        (event) =>
            polygons.setValue((draft) => {
                draft.find((zone) => zone.id === selection.value).isZone =
                    event.target.checked;
            }),
        [polygons, selection.value]
    );

    const handleZoneName = React.useCallback(
        (event) =>
            polygons.setValue((draft) => {
                draft.find((zone) => zone.id === selection.value).name =
                    event.target.value;
            }),
        [polygons, selection.value]
    );

    return (
        <EditorInspector>
            <MUI.Divider />
            <SceneSettingsDrawer node={node} projectFolder={activeRoot} />
            {selection.value && mode.value !== "edit" && selectedZone.value && (
                <>
                    <MUI.Divider />
                    <MUI.Typography variant="h6">
                        Selection settings
                    </MUI.Typography>
                    <MUI.Box>
                        <MUI.FormControl component="fieldset">
                            <MUI.FormControlLabel
                                control={
                                    <MUI.Switch
                                        checked={
                                            selectedZone.value.isZone
                                                ? selectedZone.value.isZone
                                                : false
                                        }
                                        onChange={handleToggleZone}
                                        name="isZone"
                                    />
                                }
                                labelPlacement="start"
                                label="Is zone"
                            />
                        </MUI.FormControl>
                    </MUI.Box>
                    {selectedZone.value.isZone && (
                        <MUI.Box>
                            <MUI.FormControl
                                variant="filled"
                                error={selectedZone.value.name === ""}
                            >
                                <MUI.InputLabel htmlFor="component-filled">
                                    Zone name
                                </MUI.InputLabel>
                                <MUI.FilledInput
                                    FilledInput
                                    id="component-filled"
                                    value={selectedZone.value.name}
                                    onChange={handleZoneName}
                                    aria-describedby="component-error-text"
                                    inputProps={{
                                        maxLength: 35,
                                    }}
                                />
                                {selectedZone.value.name === "" && (
                                    <MUI.FormHelperText
                                        error={selectedZone.value.name === ""}
                                        id="component-error-text"
                                    >
                                        A zone needs too have a name
                                    </MUI.FormHelperText>
                                )}
                            </MUI.FormControl>
                        </MUI.Box>
                    )}
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
