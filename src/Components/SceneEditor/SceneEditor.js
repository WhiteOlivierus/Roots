import { Redirect, useHistory } from "react-router-dom";

import * as React from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { MenuBar } from "../FlowEditor/MenuBar/MenuBar";
import EditorInspector from "./Inspector/EditorInspector";
import { EditorCanvas } from "./EditorCanvas";
import ToolBar from ".//Toolbar/ToolBar";
import * as MUI from "@material-ui/core";
import { SceneSettingsDrawer } from "./Inspector/SceneSettingsDrawer";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { EditorWrapper } from "../EditorWrapper";
import { SceneCanvasHooks } from "dutchskull-scene-manager";
import { PointsToImageSize, PointsToRelative, TransformPoints } from "../../Utilities/Transform";
import { useBeforeReload } from "../../Utilities/UseBeforeReload";

export const SceneEditor = React.memo(() => {
    const history = useHistory();

    useBeforeReload(() => history.push("/"));

    const imageRef = React.useRef();

    const polygons = SceneCanvasHooks.useStateful([]);
    const imageSize = SceneCanvasHooks.useStateful({ width: 0, height: 0 });

    const { nodeViewerState } = useNodeViewerState();
    const { projectFilesState } = useProjectFilesState();
    const activeRoot = projectFilesState.activeRoot;

    const node = SceneCanvasHooks.useStateful(nodeViewerState.activeNode);
    const mode = SceneCanvasHooks.useStateful("select");
    const selection = SceneCanvasHooks.useStateful(undefined);

    const onLoad = React.useCallback(
        (ref) => {
            if (!node) return;
            const size = {
                width: ref.target.width,
                height: ref.target.height
            };
            imageSize.setValue(size);
            const polygon = TransformPoints(node.value.data.zones, size, PointsToImageSize);
            polygons.setValue(polygon);
        },
        [imageSize, node, polygons]
    );

    const onExit = React.useCallback(() => {
        const newLocal = {
            ...node.value,
            data: {
                ...node.value.data,
                zones: TransformPoints(polygons.value, imageSize.value, PointsToRelative)
            }
        };
        nodeViewerState.activeNode = newLocal;
    }, [imageSize.value, node, nodeViewerState, polygons.value]);

    const selectedZone = SceneCanvasHooks.useStateful(undefined);
    React.useEffect(() => {
        const newLocal = polygons.value.find(zone => zone.id === selection.value);
        selectedZone.setValue(newLocal);
        console.log("changed");
    }, [polygons, selectedZone, selection.value]);

    return (
        <>
            {!nodeViewerState.activeNode && <Redirect to="/" />}
            <MenuBar />
            <ToolBar mode={mode} onExit={onExit} />
            <EditorWrapper>
                <MUI.Paper style={{ margin: "auto", width: "65%" }}>
                    <img
                        src={node.value.data.imageSrc}
                        style={{ width: "100%", height: "100%", borderRadius: 4 }}
                        alt="scene"
                        onLoad={onLoad}
                        ref={imageRef}
                    />
                </MUI.Paper>
            </EditorWrapper>
            {
                imageRef.current &&
                <EditorCanvas
                    polygon={polygons}
                    imageRef={imageRef}
                    mode={mode.value}
                    selection={selection}
                />
            }
            <Inspector
                node={node}
                activeRoot={activeRoot}
                selection={selection}
                selectedZone={selectedZone}
                mode={mode}
                polygons={polygons}
            />
        </>
    );
});


const Inspector = ({ node, activeRoot, selection, selectedZone, polygons, mode }) => {
    return (
        <EditorInspector>
            <MUI.Divider />
            <SceneSettingsDrawer node={node} projectFolder={activeRoot} />
            {
                selection.value && mode.value !== 'edit' && selectedZone.value && <>
                    <MUI.Divider />
                    <MUI.Typography variant="h6">
                        Selection settings
                        </MUI.Typography>
                    <MUI.FormControl component="fieldset">
                        <MUI.FormControlLabel
                            control={
                                <MUI.Switch
                                    checked={selectedZone.value.isZone}
                                    onChange={event => polygons.setValue(draft => {
                                        draft.find(zone => zone.id === selection.value).isZone = event.target.checked;
                                    })}
                                    name="isZone"
                                />
                            }
                            labelPlacement="start"
                            label="Is zone"
                        />
                        {
                            selectedZone.value.isZone &&
                            <MUI.FormControlLabel control={
                                <MUI.TextField
                                    error={selectedZone.value.name === ""}
                                    id="filled-basic"
                                    label="Zone name"
                                    variant="filled"
                                    defaultValue={selectedZone.value.name}
                                    helperText={selectedZone.value.name === "" && "A zone name can't be empty"}
                                    onChange={event => polygons.setValue(draft => {
                                        draft.find(zone => zone.id === selection.value).name = event.target.value;
                                    })}
                                />
                            }
                            />
                        }
                    </MUI.FormControl>
                </>
            }
        </EditorInspector>
    );
}
