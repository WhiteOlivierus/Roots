import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { ProjectFilesProvider } from "./Components/ProjectFilesContext/ProjectFilesProvider";
import { ReactFlowProvider } from "react-flow-renderer";

import { ContextMenu } from "./Components/ContextMenu";

import { FlowEditor } from "./Components/FlowEditor/FlowEditor";
import StartMenu from "./Components/StartMenu/StartMenu";
import { Game } from "./Preview/components/Game";
import { Fade, ThemeProvider } from "@material-ui/core";
import { theme } from "./Theme";

const App = () => {
    return (
        <Router>
            <ReactFlowProvider>
                <ProjectFilesProvider>
                    <ThemeProvider theme={theme}>
                        <ContextMenu />
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
                    </ThemeProvider>
                </ProjectFilesProvider>
            </ReactFlowProvider>
        </Router>
    );
};

export default App;
