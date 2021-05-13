import * as React from "react";
import * as MUI from "@material-ui/core";
import * as Transform from "../../Utilities/Transform";

import useNodeViewerState from "../../Context/NodeViewerContext/NodeViewerContext";
import { MenuBar } from "../FlowEditor/MenuBar/MenuBar";
import { EditorCanvas } from "./EditorCanvas";
import ToolBar from ".//Toolbar/ToolBar";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { EditorWrapper } from "../EditorWrapper";
import { SceneCanvasHooks as Hooks } from "dutchskull-scene-manager";
import Inspector from "./Inspector";

import useOnUnload from "../../Utilities/UseOnUnLoad";
import { Redirect } from "react-router";
import { Container, Content, Header, Item } from "../../Container";

const SceneEditor = () => {
    useOnUnload();

    const imageRef = React.useRef();

    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
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
            if (
                !node ||
                !node.value.data.zones ||
                !node.value.data.zones[0] ||
                !("points" in node.value.data.zones[0])
            )
                return;

            const size = {};
            ({ width: size.width, height: size.height } = ref.target);

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
        mode.setValue("select");

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

        nodeViewerState.activeNode = updatedNode;
        setNodeViewerState(nodeViewerState);
    }, [
        imageSize.value,
        mode,
        node.value,
        nodeViewerState,
        setNodeViewerState,
        zones.value,
    ]);

    React.useEffect(() => {
        if (!selection.value) return;
        const newSelectedZone = zones.value.find(
            (zone) => zone.id === selection.value
        );
        selectedZone.setValue(newSelectedZone);
    }, [zones.value, selectedZone, selection.value]);

    return (
        <>
            {node.value ? (
                <Container>
                    <Header>
                        <MenuBar />
                    </Header>
                    <Content>
                        <Item auto noShrink>
                            <ToolBar mode={mode} onExit={onExit} />
                        </Item>
                        <Item>
                            <EditorWrapper style={{ width: "auto" }}>
                                <MUI.Paper style={{ margin: "auto" }}>
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
                            <EditorCanvas
                                polygon={zones}
                                imageRef={imageRef}
                                mode={mode.value}
                                selection={selection}
                            />
                        </Item>
                        <Item auto noShrink>
                            <Inspector
                                node={node}
                                activeRoot={activeRoot}
                                selection={selection}
                                selectedZone={selectedZone}
                                mode={mode}
                                polygons={zones}
                            />
                        </Item>
                    </Content>
                </Container>
            ) : (
                <Redirect to={"/"} />
            )}
        </>
    );
};

SceneEditor.displayName = "SceneEditor";

export default React.memo(SceneEditor);
