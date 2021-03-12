import { createContext, useContext } from "react";

export class NodeViewerState {
    setElements: any;
    rfInstance: any;
}

export type NodeViewerContextType = {
    nodeViewerState: NodeViewerState;
    setNodeViewerState: (nodeViewerState: NodeViewerState) => void;
};

export const NodeViewerContext = createContext<NodeViewerContextType>({
    nodeViewerState: new NodeViewerState(),
    setNodeViewerState: (nodeViewerState) => {},
});

export const useNodeViewerState = () => useContext(NodeViewerContext);
