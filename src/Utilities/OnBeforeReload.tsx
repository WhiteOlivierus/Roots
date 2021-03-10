import { useEffect } from "react";

export function OnBeforeReload(props) {
    const onBeforeReload: any = (event) => {
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
