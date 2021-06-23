import * as React from "react";
import * as Router from "react-router-dom";

import FlowLoader from "./Components/FlowEditor/FlowLoader";
import StartMenu from "./Components/StartMenu/StartMenu";
import Preview from "./Components/Preview/Preview";
import SceneEditor from "./Components/SceneEditor/SceneEditor";
import PreviewButton from "./Components/PreviewButton";
import GithubCorner from "react-github-corner";
import FrontPage from "./Components/Frontpage/FrontPage";
import styled from "styled-components";
import useUpdate from "./Components/StartMenu/useUpdate";

const FullScreenApp = styled.div`
    overflow: hidden;
    height: 100vh;
`;

const GlobalRoutes = () => {
    useUpdate(true, "/roots");

    return (
        <Router.Switch>
            <Router.Route exact={true} path="/">
                <FrontPage />
            </Router.Route>
            <FullScreenApp>
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
            </FullScreenApp>
        </Router.Switch>
    );
};

GlobalRoutes.displayName = "GlobalRoutes";

export default GlobalRoutes;
