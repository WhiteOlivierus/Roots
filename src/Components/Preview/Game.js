import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Switch, Route, useLocation } from "react-router-dom";
import { Scene } from "./Scene";

export function Game(props) {
    let game = props.game;

    let location = useLocation();

    return (
        <SwitchTransition>
            <CSSTransition key={location.key} classNames="dialog" timeout={300}>
                <Switch location={location}>
                    {game.scenes.map((scene, index) => {
                        const isFirst = index === 0 ? true : false;
                        return (
                            <Route key={index} exact path={isFirst ? "/" : `/${scene.id}`}>
                                <Scene scene={scene} />
                            </Route>
                        );
                    })}
                </Switch>
            </CSSTransition>
        </SwitchTransition>
    );
}
