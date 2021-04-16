import * as Router from "react-router-dom";
import { FlowLoader } from "./Components/FlowEditor/FlowLoader";
import { StartMenu } from "./Components/StartMenu/StartMenu";
import { Preview } from "./Components/Preview/Preview";
import { SceneEditor } from "./Components/SceneEditor/SceneEditor";
import * as React from "react";

import { PreviewButton } from "./Components/PreviewButton";

export const GlobalRoutes = React.memo(() => {
    return (
        <Router.BrowserRouter>
            <Router.Switch>
                <Router.Route exact={true} path="/">
                    <StartMenu />
                </Router.Route>
                <Router.Route path="/flow">
                    <FlowLoader />
                    <PreviewButton />
                </Router.Route>
                <Router.Route path="/editor">
                    <SceneEditor />
                    <PreviewButton />
                </Router.Route>
                <Router.Route path="/preview">
                    <Preview />
                </Router.Route>
            </Router.Switch>
        </Router.BrowserRouter>
    );
});


