import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Switch, Route, useLocation } from "react-router-dom";
import { Scene } from "./Scene";
import PropTypes from "prop-types";
function Game(props) {
    let game = props.game;

    let location = useLocation();

    const scenes = game.scenes.map((scene, index) => {
        return (
            <Route key={index} exact path={`/preview/${scene.id}`}>
                <Scene
                    style={{ width: "100vw", height: "100vh" }}
                    scene={scene}
                />
            </Route>
        );
    });

    return (
        <SwitchTransition>
            <CSSTransition key={location.key} classNames="dialog" timeout={300}>
                <Switch location={location}>{scenes}</Switch>
            </CSSTransition>
        </SwitchTransition>
    );
}
Game.displayName = "Game";
Game.propTypes = { game: PropTypes.object.isRequired };
export default Game;
