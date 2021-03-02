import React from "react";

import { Box, Button, Card, CardContent, Grid, Typography } from "@material-ui/core";

import { useStoreActions } from "react-flow-renderer";

import { useNodeViewerState } from "../../Context/NodeViewer/NodeViewerContext";
import { useProjectFilesState } from "../../Context/ProjectFiles/ProjectFilesContext";

import { NewProject, OpenProject } from "../../Utilities/ProjectHandler";

export function File(props) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const setElements = useStoreActions((actions) => actions.setElements);

    const states = {
        nodeViewerState,
        projectFilesState,
        setProjectFilesState,
        setNodeViewerState,
    };

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
                                <Button variant="contained" color="primary" onClick={NewProject(states)}>
                                    New Project
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={OpenProject(projectFilesState, setElements)}
                                >
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
