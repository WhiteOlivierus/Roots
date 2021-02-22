import React from "react";
import "./App.css";

import { MenuBar } from "./Components/MenuBar/MenuBar";
import { NodeViewer } from "./Components/NodeViewer";
import { NodeViewerProvider } from "./Context/NodeViewer/NodeViewerProvider";
import { ProjectFilesProvider } from "./Context/ProjectFiles/ProjectFilesProvider";
import { ContextMenu } from "./Components/ContextMenu";
import { ContextMenuItems } from "./Components/MenuBar/ContextMenuItems";

const App = () => {
    return (
        <NodeViewerProvider>
            <ProjectFilesProvider>
                <MenuBar />
                <NodeViewer />
            </ProjectFilesProvider>
            <ContextMenu>
                <ContextMenuItems />
            </ContextMenu>
        </NodeViewerProvider>
    );
};

export default App;
