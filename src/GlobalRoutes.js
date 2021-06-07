import * as React from "react";
import * as Router from "react-router-dom";

import FlowLoader from "./Components/FlowEditor/FlowLoader";
import StartMenu from "./Components/StartMenu/StartMenu";
import { Preview } from "./Components/Preview/Preview";
import SceneEditor from "./Components/SceneEditor/SceneEditor";
import { PreviewButton } from "./Components/PreviewButton";
import GithubCorner from "react-github-corner";
import FrontPage from "./FrontPage";

const GlobalRoutes = () => {
    return (
        <Router.BrowserRouter>
            <Router.Switch>
                <Router.Route exact={true} path="/">
                    <FrontPage />
                </Router.Route>
                <Router.Route path="/roots">
                    <GithubCorner
                        href="https://github.com/WhiteOlivierus/Roots"
                        direction="left"
                    />
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
};

GlobalRoutes.displayName = "GlobalRoutes";

export default GlobalRoutes;
