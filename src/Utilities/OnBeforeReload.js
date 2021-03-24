import React, { useEffect } from "react";

// TODO handle back button https://stackoverflow.com/questions/25806608/how-to-detect-browser-back-button-event-cross-browser

import { useHistory } from "react-router-dom";
export function OnBeforeReload(props) {
    const history = useHistory();

    const onBeforeReload = (event) => {
        event.returnValue = `Are you sure you want to leave?`;
    };
    const onUnload = () => {
        return history.push("/");
    };

    useEffect(() => {
        window.addEventListener("beforeunload", onBeforeReload, true);
        window.addEventListener("onunload", onUnload, true);

        return () => {
            window.removeEventListener("beforeunload", onBeforeReload, true);
            window.removeEventListener("onunload", onUnload, true);
        };
    });

    return <div></div>;
}
