import * as React from "react";
import * as Router from "react-router-dom";
import { useBeforeReload } from "./UseBeforeReload";
import useEventListener from "./UseEventListener";

const useOnUnload = (to = "/") => {
    const history = Router.useHistory();

    useBeforeReload(
        React.useCallback(() => {
            console.log("reloading");
        }),
        [to, history]
    );

    useEventListener("onunload", () => history.push(to));
};

export default useOnUnload;
