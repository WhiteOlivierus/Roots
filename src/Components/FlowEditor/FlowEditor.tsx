import { useCallback, useState } from "react";
import ReactFlow, {
    removeElements,
    addEdge,
    Controls,
    MiniMap,
    ReactFlowProvider,
    useStoreState,
} from "react-flow-renderer";
import { NodeBar } from "./NodeBar";
import { useHistory } from "react-router-dom";

import { MinimapSettings, NodeTypes } from "./Nodes/NodeTypes";
import { SaveFileInFolder } from "../../Utilities/FileHandler";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";

import { MenuBar } from "./MenuBar/MenuBar";
import { defaultFlow } from "../../Utilities/DefaultFlow";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";

import { LoadFlow } from "../../Utilities/FlowHandler";
import { CreateNode } from "./Nodes/NodeFactory";
import React from "react";
import styled from "styled-components";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";
import { Menu, MenuItem } from "@material-ui/core";

export declare const window: any;

export var rfi = undefined;

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
`;

const initialState = {
    mouseX: null,
    mouseY: null,
};

export const FlowEditor = React.memo((props) => {
    const history = useHistory();

    const { projectFilesState } = useProjectFilesState();
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const [elements, setElements] = useState(defaultFlow.elements);
    const nodes = useStoreState((state) => state.nodes);
    const edges = useStoreState((state) => state.edges);
    const [rfInstance, setRfInstance] = useState(null);

    const onLoad = (reactFlowInstance) => {
        try {
            if (
                projectFilesState.activeRoot === undefined ||
                projectFilesState.activeFlow == undefined
            ) {
                throw "No project loaded";
            }

            const elements = nodes.concat(edges);

            if (elements.length > 1) {
                setElements(elements);
                console.log("Elements set from provider");
            } else {
                LoadFlow(
                    projectFilesState.activeRoot,
                    projectFilesState.activeFlow
                ).then((flow) => {
                    if (flow) {
                        nodeViewerState.setElements = setElements;
                        nodeViewerState.rfInstance = rfInstance;

                        setNodeViewerState(nodeViewerState);

                        setElements(flow.elements);

                        console.log("Elements set from file");
                    } else {
                        throw "No flow initialized";
                    }
                });
            }

            setRfInstance(reactFlowInstance);
            reactFlowInstance.fitView();
        } catch {
            history.push("/");
        }
    };

    function onConnect(params) {
        return setElements(function (els): any {
            return addEdge(params, els);
        });
    }

    function onElementsRemove(elementsToRemove) {
        return setElements((els): any => {
            return removeElements(elementsToRemove, els);
        });
    }

    function onDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    async function onDrop(event) {
        event.preventDefault();

        const type = event.dataTransfer.getData("application/reactflow");
        const position = rfInstance.project({
            x: event.clientX,
            y: event.clientY,
        });

        var fileHandle = await window.showOpenFilePicker();
        fileHandle = fileHandle[0];

        fileHandle = await SaveFileInFolder(
            projectFilesState.activeRoot,
            fileHandle
        );

        var newNode = await CreateNode(type, fileHandle);
        newNode.position = position;
        setElements((es) => es.concat(newNode));
    }

    const updateRFInstance = useCallback(() => (rfi = rfInstance), [
        rfi,
        rfInstance,
    ]);

    const [state, setState] = React.useState<{
        mouseX: null | number;
        mouseY: null | number;
    }>(initialState);

    const handleClick = (e: any, node: any) => {
        e.preventDefault();

        setState({
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
        });

        nodeViewerState.activeNode = node;
        setNodeViewerState(nodeViewerState);
    };

    const handleClose = (e) => {
        setState(initialState);

        nodeViewerState.activeNode = undefined;
        setNodeViewerState(nodeViewerState);
    };

    const onShowEditor = (e) => {
        history.push("/editor");
    };

    return (
        <Wrapper>
            <OnBeforeReload />
            <MenuBar />
            <ReactFlow
                elements={elements}
                nodeTypes={NodeTypes}
                onLoad={onLoad}
                onConnect={onConnect}
                onElementsRemove={onElementsRemove}
                onDrop={onDrop}
                onMove={updateRFInstance}
                onDragOver={onDragOver}
                deleteKeyCode={46}
                minZoom={0.1}
                maxZoom={2}
                multiSelectionKeyCode={17}
                onNodeContextMenu={handleClick}
                onPaneClick={handleClose}
            >
                <Controls />
                <NodeBar />
                <MiniMap nodeColor={MinimapSettings} />
            </ReactFlow>
            <Menu
                keepMounted
                open={state.mouseY !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    state.mouseY !== null && state.mouseX !== null
                        ? { top: state.mouseY, left: state.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={onShowEditor}>Edit</MenuItem>
            </Menu>
        </Wrapper>
    );
});
