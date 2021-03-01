import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Game } from "./components/Game";

import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const svg = "InitSVG";

fetch("/game.json")
    .then(async function (response) {
        return await response.json();
    })
    .then(function (game) {
        ReactDOM.render(<Game game={game} />, document.getElementById("root"));
    });

serviceWorkerRegistration.register();

reportWebVitals();
