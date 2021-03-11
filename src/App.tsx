import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { ProjectFilesProvider } from "./Context/ProjectFilesContext/ProjectFilesProvider";
import { ReactFlowProvider } from "react-flow-renderer";

import { ContextMenu } from "./Utilities/ContextMenu";

import { FlowEditor } from "./Components/FlowEditor/FlowEditor";
import StartMenu from "./Components/StartMenu/StartMenu";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Utilities/Theme";
import { NodeViewerProvider } from "./Context/NodeViewerContext/NodeViewerProvider";
import { Preview } from "./Components/Preview/Preview";
import { OnBeforeReload } from "./Utilities/OnBeforeReload";
import { SnackbarProvider } from "notistack";

export function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <ProjectFilesProvider>
                <NodeViewerProvider>
                    <ThemeProvider theme={theme}>
                        <ContextMenu />
                        <Router>
                            <Switch>
                                <Route exact={true} path="/">
                                    <StartMenu />
                                </Route>
                                <Route path="/flow">
                                    <OnBeforeReload />
                                    <ReactFlowProvider>
                                        <FlowEditor />
                                    </ReactFlowProvider>
                                </Route>
                                <Route path="/preview">
                                    <OnBeforeReload />
                                    <Link to="/flow">
                                        <button
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                top: 0,
                                                zIndex: 1000,
                                            }}
                                        >
                                            toFlow
                                        </button>
                                    </Link>
                                    <Preview />
                                </Route>
                            </Switch>
                        </Router>
                    </ThemeProvider>
                </NodeViewerProvider>
            </ProjectFilesProvider>
        </SnackbarProvider>
    );
}
