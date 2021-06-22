import * as React from "react";
import * as serviceWorker from "../../serviceWorkerRegistration";

import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

const useUpdate = (showSnackBar, location = undefined) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [showReload, setShowReload] = React.useState(false);
    const [waitingWorker, setWaitingWorker] = React.useState(null);

    const reloadPage = React.useCallback(() => {
        waitingWorker?.postMessage({ type: "SKIP_WAITING" });
        setShowReload(false);
        window.location.reload();
    }, [waitingWorker]);

    const onUpdate = (registration) => {
        setShowReload(true);
        setWaitingWorker(registration.waiting);
    };

    React.useEffect(() => {
        if (!history.location.pathname === location) return;

        if (showSnackBar && showReload) {
            enqueueSnackbar("A new update is available", {
                variant: "info",
                persist: true,
                preventDuplicate: true,
                action: (
                    <Button color="secondary" size="small" onClick={reloadPage}>
                        Update
                    </Button>
                ),
            });
        }
    }, [
        enqueueSnackbar,
        history.location.pathname,
        location,
        reloadPage,
        showReload,
        showSnackBar,
    ]);

    React.useEffect(() => {
        serviceWorker.register({ onUpdate: onUpdate });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { showReload, reloadPage };
};

export default useUpdate;
