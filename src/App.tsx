import React from "react";
import "./App.css";

import { MenuBar } from "./Components/MenuBar";
import { NodeViewer } from "./Components/NodeViewer";
import { NodeViewerProvider } from "./Context/NodeViewer/NodeViewerProvider";
import { ProjectFilesProvider } from "./Context/ProjectFiles/ProjectFilesProvider";

const App = () => {
    return (
        <div className="app-wrapper">
            <NodeViewerProvider>
                <ProjectFilesProvider>
                    <MenuBar />
                    <NodeViewer />
                </ProjectFilesProvider>
            </NodeViewerProvider>
        </div>
    );
};

export default App;
