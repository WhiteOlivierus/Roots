import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import { ProjectFilesProvider } from "./Components/ProjectFilesContext/ProjectFilesProvider";
import { ReactFlowProvider } from "react-flow-renderer";

import { ContextMenu } from "./Components/ContextMenu";

import { FlowEditor } from "./Components/FlowEditor/FlowEditor";
import StartMenu from "./Components/StartMenu/StartMenu";
import { Game } from "./Preview/components/Game";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Theme";
import { useProjectFilesState } from "./Components/ProjectFilesContext/ProjectFilesContext";

const App = () => {
    return (
        <ReactFlowProvider>
            <ProjectFilesProvider>
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
                                <Game />
                            </Route>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </ProjectFilesProvider>
        </ReactFlowProvider>
    );
};

export default App;
