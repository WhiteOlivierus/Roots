import { createContext, useContext } from "react";

export class NodeViewerState {
    setElements: any = undefined;
    rfInstance: any = undefined;
    activeNode: any = undefined;
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
