import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ProjectFilesProvider } from "./Context/ProjectFilesContext/ProjectFilesProvider";

import { ContextMenu } from "./Utilities/ContextMenu";

import { FlowEditor } from "./Components/FlowEditor/FlowEditor";
import StartMenu from "./Components/StartMenu/StartMenu";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Utilities/Theme";
import { NodeViewerProvider } from "./Context/NodeViewerContext/NodeViewerProvider";
import { Preview } from "./Components/Preview/Preview";
import { SnackbarProvider } from "notistack";
import { SceneEditor } from "./Components/SceneEditor/SceneEditor";

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
                                    <FlowEditor />
                                </Route>
                                <Route path="/editor">
                                    <SceneEditor />
                                </Route>
                                <Route path="/preview">
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
