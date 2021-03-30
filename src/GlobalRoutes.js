import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FlowLoader } from "./Components/FlowEditor/FlowLoader";
import { StartMenu } from "./Components/StartMenu/StartMenu";
import { Preview } from "./Components/Preview/Preview";
import { SceneEditor } from "./Components/SceneEditor/SceneEditor";
import { memo } from "react";

import { PreviewButton } from "./Components/PreviewButton";

export const GlobalRoutes = memo(() => {
    return (
        <Router>
            <Switch>
                <Route exact={true} path="/">
                    <StartMenu />
                </Route>
                <Route path="/flow">
                    <FlowLoader />
                    <PreviewButton />
                </Route>
                <Route path="/editor">
                    <SceneEditor />
                    <PreviewButton />
                </Route>
                <Route path="/preview">
                    <Preview />
                </Route>
            </Switch>
        </Router>
    );
});


