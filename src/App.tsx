import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { ProjectFilesProvider } from "./Context/ProjectFiles/ProjectFilesProvider";
import { ReactFlowProvider } from "react-flow-renderer";

import { ContextMenu } from "./Components/ContextMenu";

import ReactFlow from "./Components/ReactFlow";
import StartMenu from "./Components/StartMenu/StartMenu";
import { Game } from "./Preview/components/Game";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./Theme";

const App = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <ReactFlowProvider>
                    <ContextMenu />
                    <ProjectFilesProvider>
                        <Switch>
                            <Route exact={true} path="/">
                                <StartMenu />
                            </Route>
                            <Route path="/flow">
                                <ReactFlow />
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
                    </ProjectFilesProvider>
                </ReactFlowProvider>
            </ThemeProvider>
        </Router>
    );
};

export default App;
