import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

import { MenuBar } from "./Components/MenuBar/MenuBar";
import { NodeViewer } from "./Components/NodeViewer";
import { NodeViewerProvider } from "./Context/NodeViewer/NodeViewerProvider";
import { ProjectFilesProvider } from "./Context/ProjectFiles/ProjectFilesProvider";
import { ContextMenu } from "./Components/ContextMenu";

const App = () => {
    return (
        <NodeViewerProvider>
            <ProjectFilesProvider>
                <MenuBar />
                <NodeViewer />
            </ProjectFilesProvider>
            <ContextMenu />
        </NodeViewerProvider>
    );
};

export default App;
