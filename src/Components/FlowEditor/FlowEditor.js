import * as React from "react";
import ReactFlow, * as Flow from "react-flow-renderer";
import * as MUI from "@material-ui/core";
import * as Router from "react-router-dom";

import { NodeBar } from "./NodeBar";
import { MinimapSettings, NodeTypes } from "./Nodes/NodeTypes";
import { CreateNode } from "./Nodes/NodeFactory";
import { EditorWrapper } from "../EditorWrapper";

import useNodeViewerState from "../../Context/NodeViewerContext/NodeViewerContext";
import MenuBar from "./MenuBar/MenuBar";
import PropTypes from "prop-types";

const initialState = {
    mouseX: null,
    mouseY: null,
};

const FlowEditor = ({ flow, history }) => {
    const { nodeViewerState } = useNodeViewerState();

    const updateNodeInternals = Flow.useUpdateNodeInternals();

    const { transform } = Flow.useZoomPanHelper();
    const [elements, setElements] = React.useState(flow.elements || []);

    React.useEffect(() => {
        const [x, y] = flow.position;
        transform({ x, y, zoom: flow.zoom });
    }, [flow, nodeViewerState.rfInstance, transform]);

    const onLoad = (instance) => {
        nodeViewerState.setElements = setElements;
        nodeViewerState.rfInstance = instance;

        instance
            .getElements()
            .map((element) => updateNodeInternals(element.id));
    };

    const onConnect = (params) =>
        nodeViewerState.setElements((els) => Flow.addEdge(params, els));

    const onRemove = (elements) =>
        nodeViewerState.setElements((els) =>
            Flow.removeElements(
                elements.filter((element) => element.type !== "in"),
                els
            )
        );

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

        CreateNode(type, position).then((node) =>
            nodeViewerState.setElements((els) => els.concat(node))
        );
    };

    const [state, setState] = React.useState(initialState);

    const handleClick = (e, node) => {
        e.preventDefault();

        setState({
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
        });

        setActiveNode(e, node);
    };

    const setActiveNode = (e, node) => (nodeViewerState.activeNode = node);

    const handleClose = () => {
        setState(initialState);

        nodeViewerState.activeNode = undefined;
    };

    const onShowEditor = () => history.push("/editor");

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
                <Flow.Background variant="lines" gap={30} size={2} />
                <Flow.Controls style={{ left: 220 }} />
                <NodeBar />
                <Flow.MiniMap
                    nodeColor={MinimapSettings}
                    style={{ left: 10 }}
                />
            </ReactFlow>
            <MUI.Menu
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
                <MUI.MenuItem onClick={onShowEditor}>Edit</MUI.MenuItem>
            </MUI.Menu>
        </EditorWrapper>
    );
};

FlowEditor.displayName = "FlowEditor";

FlowEditor.propTypes = {
    flow: PropTypes.shape({
        elements: PropTypes.array,
        position: PropTypes.any,
        zoom: PropTypes.number,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default Router.withRouter(FlowEditor);
