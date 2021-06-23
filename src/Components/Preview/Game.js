import * as Router from "react-router-dom";
import PropTypes from "prop-types";
import * as React from "react";
import SceneTransition from "./SceneTransition";

const Game = ({ game }) => (
    <Router.BrowserRouter>
        <SceneTransition game={game} />
    </Router.BrowserRouter>
);

Game.displayName = "Game";

Game.propTypes = {
    game: PropTypes.object.isRequired,
};

export default Game;
