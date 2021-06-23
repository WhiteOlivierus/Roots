import * as React from "react";
import * as Transform from "../../Utilities/Transform";

import useNodeViewerState from "../../Context/NodeViewerContext/NodeViewerContext";
import ToolBar from "./Toolbar/ToolBar";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import Inspector from "./Inspector";
import Editor from "./Editor";
import useOnUnload from "../../Utilities/UseOnUnLoad";
import MenuBar from "../FlowEditor/MenuBar/MenuBar";

import { EditorCanvas } from "./EditorCanvas";
import { EditorWrapper } from "../EditorWrapper";
import { SceneCanvasHooks as Hooks } from "dutchskull-scene-manager";
import { Redirect } from "react-router";
import { Container, Content, Header, Item } from "../../Utilities/Container";

const SceneEditor = () => {
    useOnUnload("/roots");

    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const { projectFilesState } = useProjectFilesState();

    const activeRoot = projectFilesState.activeRoot;

    const zones = Hooks.useStateful([]);

    const node = Hooks.useStateful(nodeViewerState.activeNode);
    const mode = Hooks.useStateful("select");

    const selection = Hooks.useStateful(undefined);
    const selectedZone = Hooks.useStateful(undefined);

    const imageSize = Hooks.useStateful({ width: 0, height: 0 });

    const handleChangeSize = React.useCallback(
        (element) => {
            const size = {};
            ({ width: size.width, height: size.height } = element);

            imageSize.setValue(size);
            return size;
        },
        [imageSize]
    );

    const onLoad = React.useCallback(
        (element) => {
            const size = handleChangeSize(element);

            if (
                !node ||
                !node.value.data.zones ||
                !node.value.data.zones[0] ||
                !("points" in node.value.data.zones[0])
            )
                return;

            const translatedZones = Transform.TransformPoints(
                node.value.data.zones,
                size,
                Transform.PointsToImageSize
            );

            zones.setValue(translatedZones);
        },
        [node, handleChangeSize, zones]
    );

    const imageRef = React.useRef();

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
                            <EditorWrapper
                                style={{
                                    width: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    height: "100%",
                                }}
                            >
                                <Editor
                                    node={node}
                                    onLoad={onLoad}
                                    imageRef={imageRef}
                                />
                            </EditorWrapper>
                            <EditorCanvas
                                polygons={zones}
                                imageRef={imageRef}
                                mode={mode.value}
                                selection={selection}
                            />
                        </Item>
                        <Item auto noShrink style={{ width: 300 }}>
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
                <Redirect to={"/roots"} />
            )}
        </>
    );
};

SceneEditor.displayName = "SceneEditor";

export default React.memo(SceneEditor);
