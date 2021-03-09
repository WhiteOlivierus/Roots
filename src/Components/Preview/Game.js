import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Switch, Route, useLocation } from "react-router-dom";
import { Scene } from "./Scene";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

export function Game(props) {
    const history = useHistory();

    useEffect(() => {
        if (game === undefined) {
            history.push("/");
        }
    }, []);

    let game = props.game;

    let location = useLocation();

    return (
        <SwitchTransition>
            <CSSTransition key={location.key} classNames="dialog" timeout={300}>
                <Switch location={location}>
                    {game.scenes.map((scene, index) => {
                        const isFirst = index === 0 ? true : false;
                        return (
                            <Route
                                key={index}
                                exact
                                path={isFirst ? `${location.path}/0` : `${location.path}/${scene.id}`}
                            >
                                <Scene scene={scene} />
                            </Route>
                        );
                    })}
                </Switch>
            </CSSTransition>
        </SwitchTransition>
    );
}
