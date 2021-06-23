import React from "react";
import { Box, Button, Card, Grid, Typography } from "@material-ui/core";
import useUpdate from "./useUpdate";

const ServiceWorkerWrapper = () => {
    const { showReload, reloadPage } = useUpdate(false);
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
