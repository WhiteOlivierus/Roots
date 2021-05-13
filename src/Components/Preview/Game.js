import { SwitchTransition, CSSTransition } from "react-transition-group";
import * as Router from "react-router-dom";
import Scene from "./Scene";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffectOnce } from "react-use";

const Game = ({ game }) => (
    <Router.BrowserRouter>
        <Test game={game} />
    </Router.BrowserRouter>
);

Game.displayName = "Game";

Game.propTypes = {
    game: PropTypes.object.isRequired,
};

export default Game;

function Test({ game }) {
    const location = Router.useLocation();

    const history = Router.useHistory();

    useEffectOnce(() => history.push(`/${game.scenes[0].id}`));

    const scenes = game.scenes.map((scene, index) => (
        <Router.Route key={index} exact path={`/${scene.id}`}>
            <Scene style={{ width: "100vw", height: "100vh" }} scene={scene} />
        </Router.Route>
    ));

    return (
        <SwitchTransition>
            <CSSTransition key={location.key} classNames="dialog" timeout={300}>
                <Router.Switch location={location}>{scenes}</Router.Switch>
            </CSSTransition>
        </SwitchTransition>
    );
}

Test.displayName = "Game";

Test.propTypes = {
    game: PropTypes.object.isRequired,
};
