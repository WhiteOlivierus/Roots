import React, { useState } from "react";
import { NodeViewerState } from "./NodeViewerContext";

const NodeViewerContext = React.createContext(null);

export const NodeViewerProvider = (props: any) => {
    const [nodeViewerState, setNodeViewerState] = useState(new NodeViewerState());

    return (
        <NodeViewerContext.Provider value={{ nodeViewerState, setNodeViewerState }}>
            {props.children}
        </NodeViewerContext.Provider>
    );
};
