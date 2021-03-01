import React, { Component } from "react";
import { Scene } from "./Scene";

import "./style.css";

export class Game extends Component {
    state = {
        loading: true,
        game: undefined,
    };

    async componentDidMount() {
        const response = await fetch("/game.json");
        const json = await response.json();
        this.setState({ game: json });
        this.setState({ loading: false });
    }

    render() {
        return (
            <div>{this.state.loading || !this.state.game ? <h1>loading</h1> : <Scenes game={this.state.game} />}</div>
        );
    }
}

function Scenes(props) {
    let game = props.game;
    let scene = game.scenes.shift();

    let scenes = [<Scene key={-1} first={true} scene={scene} />];

    game.scenes.forEach((scene, index) => {
        scenes.push(<Scene key={index} scene={scene} />);
    });
    return scenes;
}
