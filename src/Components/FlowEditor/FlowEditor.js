import React, { memo, useEffect, useState } from "react";
import ReactFlow, {
    removeElements,
    addEdge,
    Controls,
    MiniMap,
    Background,
    useUpdateNodeInternals,
    useZoomPanHelper,
} from "react-flow-renderer";
import { NodeBar } from "./NodeBar";
import { useHistory } from "react-router-dom";

import { MinimapSettings, NodeTypes } from "./Nodes/NodeTypes";

import MenuBar from "./MenuBar/MenuBar";
import useNodeViewerState from "../../Context/NodeViewerContext/NodeViewerContext";

import { CreateNode } from "./Nodes/NodeFactory";
import { Menu, MenuItem } from "@material-ui/core";
import { EditorWrapper } from "../EditorWrapper";
import PropTypes from "prop-types";

const initialState = {
    mouseX: null,
    mouseY: null,
};

const FlowEditor = memo(({ flow }) => {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const updateNodeInternals = useUpdateNodeInternals();

    const { transform } = useZoomPanHelper();
    const [elements, setElements] = useState(flow.elements || []);

    useEffect(() => {
        const [x = 0, y = 0] = flow.position;
        transform({ x, y, zoom: flow.zoom || 0 });
    }, [flow, transform]);

    const onLoad = (instance) => {
        nodeViewerState.setElements = setElements;
        nodeViewerState.rfInstance = instance;

        instance
            .getElements()
            .map((element) => updateNodeInternals(element.id));
    };

    const onConnect = (params) =>
        nodeViewerState.setElements((els) => addEdge(params, els));

    const onRemove = (elements) => {
        elements = elements.filter((element) => {
            return element.type !== "in";
        });

        return nodeViewerState.setElements((els) =>
            removeElements(elements, els)
        );
    };

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const onDrop = (event) => {
        event.preventDefault();

        const type = event.dataTransfer.getData("application/reactflow");
        const position = nodeViewerState.rfInstance.project({
            x: event.clientX,
            y: event.clientY,
        });

        CreateNode(type, position).then((node) => {
            nodeViewerState.setElements((els) => {
                const newLocal = els.concat(node);
                return newLocal;
            });
        });
    };

    const [state, setState] = useState(initialState);

    const handleClick = (e, node) => {
        e.preventDefault();

        setState({
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
        });

        setActiveNode(e, node);
    };

    const setActiveNode = (e, node) => {
        nodeViewerState.activeNode = node;
        setNodeViewerState(nodeViewerState);
    };

    const handleClose = () => {
        setState(initialState);

        nodeViewerState.activeNode = undefined;
        setNodeViewerState(nodeViewerState);
    };

    const history = useHistory();

    const onShowEditor = () => {
        history.push("/editor");
    };

    return (
        <EditorWrapper>
            <MenuBar />
            <ReactFlow
                elements={elements}
                onLoad={onLoad}
                nodeTypes={NodeTypes}
                onConnect={onConnect}
                onElementsRemove={onRemove}
                onDragOver={onDragOver}
                onDrop={onDrop}
                deleteKeyCode={46}
                minZoom={0.1}
                maxZoom={2}
                multiSelectionKeyCode={17}
                onNodeContextMenu={handleClick}
                onPaneClick={handleClose}
                onNodeMouseEnter={setActiveNode}
            >
                <Background variant="lines" gap={30} size={2} />
                <Controls />
                <NodeBar />
                <MiniMap nodeColor={MinimapSettings} style={{ left: 50 }} />
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

FlowEditor.displayName = "FlowEditor";

FlowEditor.propTypes = {
    flow: PropTypes.any.isRequired,
};

export default FlowEditor;
