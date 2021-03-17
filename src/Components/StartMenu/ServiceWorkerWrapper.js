import React, { FC, useEffect, useState } from "react";
import * as serviceWorkerRegistration from "../../serviceWorkerRegistration";
import { Box, Button, Card, Grid, Paper, Typography } from "@material-ui/core";

export const ServiceWorkerWrapper = () => {
    const [showReload, setShowReload] = useState(false);
    const [waitingWorker, setWaitingWorker] = useState(null);

    const onSWUpdate = (registration) => {
        setShowReload(true);
        setWaitingWorker(registration.waiting);
    };

    useEffect(() => {
        serviceWorkerRegistration.register({ onUpdate: onSWUpdate });
    }, []);

    const reloadPage = () => {
        waitingWorker?.postMessage({ type: "SKIP_WAITING" });
        setShowReload(false);
        window.location.reload(true);
    };

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
