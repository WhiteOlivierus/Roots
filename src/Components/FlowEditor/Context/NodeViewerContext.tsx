import { createContext, useContext } from "react";

import createEngine, { DiagramEngine, DiagramModel, DiagramModelGenerics } from "@projectstorm/react-diagrams";

export class NodeViewerState {
    setElements: any;
}

export type NodeViewerContextType = {
    nodeViewerState: NodeViewerState;
    setNodeViewerState: (nodeViewerState: NodeViewerState) => void;
};

export const NodeViewerContext = createContext<NodeViewerContextType>({
    nodeViewerState: new NodeViewerState(),
    setNodeViewerState: (nodeViewerState) => console.warn("no node viewer"),
});

export const useNodeViewerState = () => useContext(NodeViewerContext);
