import * as Router from "react-router-dom";
import * as React from "react";
import * as MUI from "@material-ui/core";
import * as Transform from "../../Utilities/Transform";

import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { MenuBar } from "../FlowEditor/MenuBar/MenuBar";
import { EditorCanvas } from "./EditorCanvas";
import ToolBar from ".//Toolbar/ToolBar";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { EditorWrapper } from "../EditorWrapper";
import { SceneCanvasHooks as Hooks } from "dutchskull-scene-manager";
import { useBeforeReload } from "../../Utilities/UseBeforeReload";
import { Inspector } from "./Inspector";

const SceneEditor = () => {
    const history = Router.useHistory();
    useBeforeReload(() => history.push("/"));

    const imageRef = React.useRef();

    const { nodeViewerState } = useNodeViewerState();
    const { projectFilesState } = useProjectFilesState();

    const activeRoot = projectFilesState.activeRoot;

    const zones = Hooks.useStateful([]);
    const imageSize = Hooks.useStateful({ width: 0, height: 0 });

    const node = Hooks.useStateful(nodeViewerState.activeNode);
    const mode = Hooks.useStateful("select");
    const selection = Hooks.useStateful(undefined);
    const selectedZone = Hooks.useStateful(undefined);

    const onLoad = React.useCallback(
        (ref) => {
            if (!node) return;

            const size = {
                width: ref.target.width,
                height: ref.target.height,
            };

            imageSize.setValue(size);

            console.log(node.value.data.zones[0].points);

            const translatedZones = Transform.TransformPoints(
                node.value.data.zones,
                size,
                Transform.PointsToImageSize
            );
            zones.setValue(translatedZones);

            console.log(translatedZones[0].points);
        },
        [imageSize, node, zones]
    );

    const onExit = React.useCallback(() => {
        if (zones.value.length > 0) {
            console.log(zones.value[0].points);
        }

        const updatedNode = {
            ...node.value,
            data: {
                ...node.value.data,
                zones: Transform.TransformPoints(
                    zones.value,
                    imageSize.value,
                    Transform.PointsToRelative
                ),
            },
        };

        if (updatedNode.data.zones.value) {
            console.log(updatedNode.data.zones.value[0].points);
        }

        nodeViewerState.activeNode = updatedNode;
    }, [imageSize, node, nodeViewerState, zones]);

    React.useEffect(() => {
        if (!selection.value) return;
        const newLocal = zones.value.find(
            (zone) => zone.id === selection.value
        );
        selectedZone.setValue(newLocal);
        console.log("changed");
    }, [zones, selectedZone, selection.value]);

    return (
        <>
            {!nodeViewerState.activeNode && <Router.Redirect to="/" />}
            <MenuBar />
            <ToolBar mode={mode} onExit={onExit} />
            <EditorWrapper>
                <MUI.Paper style={{ margin: "auto", width: "65%" }}>
                    <img
                        src={node.value.data.imageSrc}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 4,
                        }}
                        alt="scene"
                        onLoad={onLoad}
                        ref={imageRef}
                    />
                </MUI.Paper>
            </EditorWrapper>
            {imageRef.current && (
                <EditorCanvas
                    polygon={zones}
                    imageRef={imageRef}
                    mode={mode.value}
                    selection={selection}
                />
            )}
            <Inspector
                node={node}
                activeRoot={activeRoot}
                selection={selection}
                selectedZone={selectedZone}
                mode={mode}
                polygons={zones}
            />
        </>
    );
};

SceneEditor.displayName = "SceneEditor";

export default React.memo(SceneEditor);
