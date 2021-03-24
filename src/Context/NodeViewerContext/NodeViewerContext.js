import { createContext, useContext } from "react";

export class NodeViewerState {
    setElements = undefined;
    rfInstance = undefined;
    activeNode = undefined;
}

export const NodeViewerContext = createContext({
    nodeViewerState: new NodeViewerState(),
    setNodeViewerState: (nodeViewerState) => {},
});

export const useNodeViewerState = () => useContext(NodeViewerContext);
