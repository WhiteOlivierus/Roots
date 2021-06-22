import * as React from "react";
import * as Router from "react-router-dom";

import ProjectFilesProvider from "./Context/ProjectFilesContext/ProjectFilesProvider";
import NodeViewerProvider from "./Context/NodeViewerContext/NodeViewerProvider";
import PropTypes from "prop-types";

import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Utilities/Theme";
import { SnackbarProvider } from "notistack";
import { ReactFlowProvider } from "react-flow-renderer";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";

const GlobalProvider = ({ children }) => {
    return (
        <Router.BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <ProjectFilesProvider>
                    <NodeViewerProvider>
                        <ReactFlowProvider>
                            <ThemeProvider theme={theme}>
                                <ModalProvider rootComponent={TransitionGroup}>
                                    {children}
                                </ModalProvider>
                            </ThemeProvider>
                        </ReactFlowProvider>
                    </NodeViewerProvider>
                </ProjectFilesProvider>
            </SnackbarProvider>
        </Router.BrowserRouter>
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
