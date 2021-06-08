import React, { useCallback, useEffect, useState } from "react";
import * as serviceWorkerRegistration from "../../serviceWorkerRegistration";
import { Box, Button, Card, Grid, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";

const ServiceWorkerWrapper = () => {
    const { showReload, reloadPage } = useUpdate();
    return (
        <div>
            {showReload && (
                <Card>
                    <Box p={2}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item>
                                <Typography variant="body1">
                                    A new update is here!
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={reloadPage}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            )}
        </div>
    );
};

export default ServiceWorkerWrapper;

export const useUpdate = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [showReload, setShowReload] = useState(false);
    const [waitingWorker, setWaitingWorker] = useState(null);

    const reloadPage = useCallback(() => {
        waitingWorker?.postMessage({ type: "SKIP_WAITING" });
        setShowReload(false);
        window.location.reload(true);
    }, [waitingWorker]);

    const onSWUpdate = useCallback(
        (registration) => {
            enqueueSnackbar("A new update is available", {
                variant: "info",
                persist: true,
                action: (
                    <Button color="secondary" size="small" onClick={reloadPage}>
                        Update
                    </Button>
                ),
            });
            setShowReload(true);
            setWaitingWorker(registration.waiting);
        },
        [enqueueSnackbar, reloadPage]
    );

    useEffect(() => {
        serviceWorkerRegistration.register({ onUpdate: onSWUpdate });
    }, []);

    return { showReload, reloadPage };
};
