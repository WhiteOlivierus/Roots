// TODO handle back button https://stackoverflow.com/questions/25806608/how-to-detect-browser-back-button-event-cross-browser

import { useEffect } from "react";

export const useBeforeReload = (fn, msg = undefined) => {
    const onBeforeReload = (event) => {
        event.returnValue = msg ? msg : `Are you sure you want to reload?`;
    };

    useEffect(() => {
        window.addEventListener("beforeunload", onBeforeReload, true);
        window.addEventListener("onunload", fn, true);

        return () => {
            window.removeEventListener("beforeunload", onBeforeReload, true);
            window.removeEventListener("onunload", fn, true);
        };
    });
};
