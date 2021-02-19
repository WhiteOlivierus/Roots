import React, { useState } from "react";
import "./App.css";

import { MenuBar } from "./Components/MenuBar";
import { NodeViewer } from "./Components/NodeViewer";
import { NodeViewerState } from "./Context/NodeViewerContext";

const App = () => {
    return (
        <div className="app-wrapper">
            <NodeViewerProvider>
                <MenuBar />
                <NodeViewer />
            </NodeViewerProvider>
        </div>
    );
};

const NodeViewerContext = React.createContext(null);

const NodeViewerProvider = (props: any) => {
    const [nodeViewerState, setNodeViewerState] = useState(
        new NodeViewerState()
    );

    return (
        <NodeViewerContext.Provider
            value={{ nodeViewerState, setNodeViewerState }}
        >
            {props.children}
        </NodeViewerContext.Provider>
    );
};

export default App;
