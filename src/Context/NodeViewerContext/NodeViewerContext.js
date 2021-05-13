import { createContext, useContext } from "react";

export class NodeViewerState {
    constructor() {
        this.setElements = undefined;
        this.rfInstance = undefined;
        this.activeNode = undefined;
    }
}

export const NodeViewerContext = createContext({
    nodeViewerState: new NodeViewerState(),
    // eslint-disable-next-line prettier/prettier, no-unused-vars
    setNodeViewerState: (nodeViewerState) => { },
});

const useNodeViewerState = () => useContext(NodeViewerContext);

export default useNodeViewerState;
