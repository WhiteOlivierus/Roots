import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Switch, Route, useLocation } from "react-router-dom";
import { Scene } from "./Scene";
import { useEffect } from "react";

export function Game(props) {
    let game = props.game;

    let location = useLocation();

    const scenes = game.scenes.map((scene, index) => {
        const isFirst = index === 0 ? true : false;
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
        <div>
            <SwitchTransition>
                <CSSTransition
                    key={location.key}
                    classNames="dialog"
                    timeout={300}
                >
                    <Switch location={location}>{scenes}</Switch>
                </CSSTransition>
            </SwitchTransition>
        </div>
    );
}
