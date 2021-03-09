import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import { ProjectFilesProvider } from "./Components/ProjectFilesContext/ProjectFilesProvider";
import { ReactFlowProvider } from "react-flow-renderer";

import { ContextMenu } from "./Components/ContextMenu";

import { FlowEditor } from "./Components/FlowEditor/FlowEditor";
import StartMenu from "./Components/StartMenu/StartMenu";
import { Game } from "./Components/Preview/Game";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Theme";
import { NodeViewerProvider } from "./Components/FlowEditor/Context/NodeViewerProvider";
import { useProjectFilesState } from "./Components/ProjectFilesContext/ProjectFilesContext";

export function App() {
    return (
        <ReactFlowProvider>
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
                                <Route path="/preview">
                                    <Link to="/flow">
                                        <button style={{ position: "absolute", left: 0, top: 0, zIndex: 1000 }}>
                                            toFlow
                                        </button>
                                    </Link>
                                    <Bla />
                                </Route>
                            </Switch>
                        </Router>
                    </ThemeProvider>
                </NodeViewerProvider>
            </ProjectFilesProvider>
        </ReactFlowProvider>
    );
}

function Bla(props) {
    const { projectFilesState } = useProjectFilesState();

    return <Game game={projectFilesState.build} />;
}
