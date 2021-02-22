import { CanvasWidget } from "@projectstorm/react-canvas-core";

import { useNodeViewerState } from "../Context/NodeViewer/NodeViewerContext";
import { SimplePortFactory } from "./Nodes/Scene/SimplePortFactory";

import { DiamondNodeFactory } from "./Nodes/Scene/DiamondNodeFactory";
import { DiamondPortModel } from "./Nodes/Scene/DiamondPortModel";
import { PortModelAlignment } from "@projectstorm/react-diagrams";

export declare const window: any;

export function NodeViewer(props: any) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    nodeViewerState.engine
        .getPortFactories()
        .registerFactory(new SimplePortFactory("scene", (config) => new DiamondPortModel(PortModelAlignment.LEFT)));
    nodeViewerState.engine.getNodeFactories().registerFactory(new DiamondNodeFactory());

    nodeViewerState.engine.setModel(nodeViewerState.model);

    setNodeViewerState(nodeViewerState);

    return <CanvasWidget className="canvas" engine={nodeViewerState.engine} />;
}
