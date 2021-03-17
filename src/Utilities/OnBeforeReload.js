import { useEffect } from "react";

// TODO handle back button https://stackoverflow.com/questions/25806608/how-to-detect-browser-back-button-event-cross-browser

export function OnBeforeReload(props) {
    const onBeforeReload = (event) => {
        event.returnValue = `Are you sure you want to leave?`;
    };

    useEffect(() => {
        window.addEventListener("beforeunload", onBeforeReload);

        return () => {
            window.removeEventListener("beforeunload", onBeforeReload);
        };
    }, []);

    return <div></div>;
}
