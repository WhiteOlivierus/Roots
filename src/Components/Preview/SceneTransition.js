import { SwitchTransition, CSSTransition } from "react-transition-group";
import * as Router from "react-router-dom";
import Scene from "./Scene";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffectOnce } from "react-use";

const SceneTransition = ({ game, location, history }) => {
    useEffectOnce(() => history.push(`/${game.scenes[0].id}`));

    return (
        <SwitchTransition>
            <CSSTransition key={location.key} classNames="dialog" timeout={300}>
                <Router.Switch location={location}>
                    {game.scenes.map((scene, index) => (
                        <Router.Route key={index} exact path={`/${scene.id}`}>
                            <Scene
                                style={{ width: "100vw", height: "100vh" }}
                                scene={scene}
                            />
                        </Router.Route>
                    ))}
                </Router.Switch>
            </CSSTransition>
        </SwitchTransition>
    );
};

SceneTransition.displayName = "Game";

SceneTransition.propTypes = {
    game: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    location: PropTypes.shape({
        key: PropTypes.any,
    }),
};

export default Router.withRouter(SceneTransition);
