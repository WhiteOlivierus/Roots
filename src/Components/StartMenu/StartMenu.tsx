import React, { Component, FC, useEffect } from "react";

import * as serviceWorkerRegistration from "../../serviceWorkerRegistration";

import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Typography,
} from "@material-ui/core";
import { Logo } from "./Logo";
import { File } from "./File";
import { Recent } from "./Recent";

export default class StartMenu extends Component {
    render() {
        return (
            <Box paddingTop={10} bgcolor="primary.main" width={1} height={1}>
                <Container maxWidth="lg">
                    <Logo />
                    <Grid container direction="row" spacing={2}>
                        <File />
                        <Recent />
                        <ServiceWorkerWrapper />
                    </Grid>
                </Container>
            </Box>
        );
    }
}

export const ServiceWorkerWrapper: FC = () => {
    const [showReload, setShowReload] = React.useState(false);
    const [
        waitingWorker,
        setWaitingWorker,
    ] = React.useState<ServiceWorker | null>(null);

    const onSWUpdate = (registration: ServiceWorkerRegistration) => {
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
                <Paper>
                    <Box>
                        <Typography variant="body1">
                            New update is here!
                        </Typography>
                        <Button
                            color="inherit"
                            size="small"
                            onClick={reloadPage}
                        >
                            Update
                        </Button>
                    </Box>
                </Paper>
            )}
        </div>
    );
};
