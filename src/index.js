import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

console.clear();

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register();

reportWebVitals();
