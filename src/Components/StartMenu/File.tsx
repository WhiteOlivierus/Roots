import React from "react";
import { Box, Button, Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./useStyles";

export function File(props) {
    const classes = useStyles();
    return (
        <Grid item xs={6}>
            <Card>
                <CardContent>
                    <Grid item>
                        <Typography variant="h2">Project</Typography>
                    </Grid>
                    <Box p={2.5}>
                        <Grid container justify="center" spacing={2}>
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    New Project
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    Open Project
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}
