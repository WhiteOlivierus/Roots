import React from "react";
import "./App.css";

import { MenuBar } from "./Components/MenuBar/MenuBar";
import { ProjectFilesProvider } from "./Context/ProjectFiles/ProjectFilesProvider";
import { ContextMenu } from "./Components/ContextMenu";
import ReactFlow from "./Components/ReactFlow";
import { ReactFlowProvider } from "react-flow-renderer";

const App = () => {
    return (
        <ReactFlowProvider>
            <ContextMenu />
            <ProjectFilesProvider>
                <MenuBar />
                <ReactFlow />
            </ProjectFilesProvider>
        </ReactFlowProvider>
    );
};

export default App;
