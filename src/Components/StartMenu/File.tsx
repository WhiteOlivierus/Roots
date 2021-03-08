import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { Box, Button, Card, CardContent, Grid, Typography } from "@material-ui/core";

import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";

import { NewProject, OpenProject } from "../../Utilities/ProjectHandler";

export function File(props) {
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const history = useHistory();

    const onNewProject = useCallback(() => {
        async function Action() {
            try {
                var { activeRoot, activeFlow } = await NewProject();
            } catch {
                return;
            }

            projectFilesState.activeRoot = activeRoot;
            projectFilesState.activeFlow = activeFlow;

            setProjectFilesState(projectFilesState);

            history.push("/flow");
        }

        Action();
    }, [projectFilesState, history]);

    const onOpenProject = useCallback(() => {
        async function Action() {
            try {
                var { activeRoot, activeFlow } = await OpenProject();
            } catch {
                return;
            }

            projectFilesState.activeRoot = activeRoot;
            projectFilesState.activeFlow = activeFlow;

            setProjectFilesState(projectFilesState);

            history.push("/flow");
        }

        Action();
    }, [projectFilesState, history]);

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
                                <Button variant="contained" color="primary" onClick={onNewProject}>
                                    New Project
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={onOpenProject}>
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
