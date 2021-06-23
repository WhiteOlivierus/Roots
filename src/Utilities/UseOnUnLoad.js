import * as Router from "react-router-dom";
import { useBeforeReload } from "./UseBeforeReload";
import useEventListener from "./UseEventListener";

const useOnUnload = (to = "/") => {
    const history = Router.useHistory();

    useBeforeReload(() => {
        console.log("reloading");
    });

    useEventListener("onunload", () => history.push(to));
};

export default useOnUnload;
