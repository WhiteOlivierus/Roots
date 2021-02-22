import { CanvasWidget } from "@projectstorm/react-canvas-core";

import { useNodeViewerState } from "../Context/NodeViewer/NodeViewerContext";

export declare const window: any;

export function NodeViewer(props: any) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    nodeViewerState.engine.setModel(nodeViewerState.model);

    setNodeViewerState(nodeViewerState);

    return <CanvasWidget className="canvas" engine={nodeViewerState.engine} />;
}
