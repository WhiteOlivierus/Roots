import { memo } from "react";

import { ProjectFilesProvider } from "./Context/ProjectFilesContext/ProjectFilesProvider";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Utilities/Theme";
import { NodeViewerProvider } from "./Context/NodeViewerContext/NodeViewerProvider";
import { SnackbarProvider } from "notistack";
import { ReactFlowProvider } from "react-flow-renderer";

export const GlobalProvider = memo((props) => {
    return (
        <SnackbarProvider maxSnack={3}>
            <ProjectFilesProvider>
                <NodeViewerProvider>
                    <ReactFlowProvider>
                        <ThemeProvider theme={theme}>
                            {props.children}
                        </ThemeProvider>
                    </ReactFlowProvider>
                </NodeViewerProvider>
            </ProjectFilesProvider>
        </SnackbarProvider>
    );
});
