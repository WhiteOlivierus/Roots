import * as React from "react";
import ReactFlow, * as Flow from "react-flow-renderer";

import { NodeBar } from "./NodeBar";
import { MinimapSettings, NodeTypes } from "./Nodes/NodeTypes";
import { CreateNode } from "./Nodes/NodeFactory";
import { Container, Content, Header, Item } from "../../Utilities/Container";

import useNodeViewerState from "../../Context/NodeViewerContext/NodeViewerContext";
import MenuBar from "./MenuBar/MenuBar";
import PropTypes from "prop-types";

const initialState = {
    mouseX: null,
    mouseY: null,
};

const FlowEditor = ({ flow }) => {
    const { nodeViewerState } = useNodeViewerState();

    const updateNodeInternals = Flow.useUpdateNodeInternals();

    const { transform } = Flow.useZoomPanHelper();
    const [elements, setElements] = React.useState(flow.elements || []);

    const onLoad = (instance) => {
        nodeViewerState.setElements = setElements;
        nodeViewerState.rfInstance = instance;

        nodeViewerState.rfInstance
            .getElements()
            .map((element) => updateNodeInternals(element.id));
        return instance;
    };

    React.useEffect(() => {
        const [x, y] = flow.position;
        transform({ x, y, zoom: flow.zoom });

        if (!nodeViewerState.rfInstance) return;

        nodeViewerState.rfInstance
            .getElements()
            .map((element) => updateNodeInternals(element.id));
    }, [flow, nodeViewerState.rfInstance, transform, updateNodeInternals]);

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

    const [, setState] = React.useState(initialState);

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

    return (
        <Container>
            <Header>
                <MenuBar />
            </Header>
            <Content>
                <Item>
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
                        <Flow.MiniMap
                            nodeColor={MinimapSettings}
                            style={{ left: 10 }}
                        />
                    </ReactFlow>
                </Item>
                <Item auto noShrink style={{ width: 300 }}>
                    <NodeBar />
                </Item>
            </Content>
        </Container>
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

export default FlowEditor;
