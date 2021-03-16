import { memo, useState } from "react";
import ReactFlow, {
    removeElements,
    addEdge,
    Controls,
    MiniMap,
} from "react-flow-renderer";
import { NodeBar } from "./NodeBar";
import { useHistory } from "react-router-dom";

import { MinimapSettings, NodeTypes } from "./Nodes/NodeTypes";
import { SaveFileInFolder } from "../../Utilities/FileHandler";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";

import { MenuBar } from "./MenuBar/MenuBar";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";

import { CreateNode } from "./Nodes/NodeFactory";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";
import { Menu, MenuItem } from "@material-ui/core";
import { EditorWrapper } from "../EditorWrapper";

export declare const window: any;

const initialState = {
    mouseX: null,
    mouseY: null,
};

export const FlowEditor = memo<{ flow: any }>(({ flow }) => {
    const history = useHistory();

    const { projectFilesState } = useProjectFilesState();
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const [elements, setElements] = useState(flow.elements);

    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onLoad = (_reactFlowInstance) => {
        nodeViewerState.setElements = setElements;
        nodeViewerState.rfInstance = reactFlowInstance;
        setNodeViewerState(nodeViewerState);

        return setReactFlowInstance(_reactFlowInstance);
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
        const position = reactFlowInstance.project({
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

    const [state, setState] = useState(initialState);

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
        <EditorWrapper>
            <OnBeforeReload />
            <MenuBar />
            <ReactFlow
                elements={elements}
                onLoad={onLoad}
                nodeTypes={NodeTypes}
                onConnect={onConnect}
                onElementsRemove={onElementsRemove}
                onDrop={onDrop}
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
        </EditorWrapper>
    );
});
