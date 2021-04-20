import * as React from "react";

import ProjectFilesProvider from "./Context/ProjectFilesContext/ProjectFilesProvider";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Utilities/Theme";
import NodeViewerProvider from "./Context/NodeViewerContext/NodeViewerProvider";
import { SnackbarProvider } from "notistack";
import { ReactFlowProvider } from "react-flow-renderer";
import PropTypes from "prop-types";

const GlobalProvider = ({ children }) => {
    return (
        <SnackbarProvider maxSnack={3}>
            <ProjectFilesProvider>
                <NodeViewerProvider>
                    <ReactFlowProvider>
                        <ThemeProvider theme={theme}>{children}</ThemeProvider>
                    </ReactFlowProvider>
                </NodeViewerProvider>
            </ProjectFilesProvider>
        </SnackbarProvider>
    );
};

GlobalProvider.displayName = "GlobalProvider";

GlobalProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default React.memo(GlobalProvider);
