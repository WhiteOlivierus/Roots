import { useHistory } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@material-ui/core";

import { ServiceWorkerWrapper } from "./ServiceWorkerWrapper";

import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";

import { NewProject, OpenProject } from "../../Utilities/ProjectHandler";

export function File(props) {
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const history = useHistory();

    async function onNewProject() {
        await SetProjectContext(NewProject);
    }

    async function onOpenProject() {
        await SetProjectContext(OpenProject);
    }

    async function SetProjectContext(action: any) {
        try {
            var { activeRoot, activeFlow } = await action();
        } catch {
            return;
        }
        projectFilesState.activeRoot = activeRoot;
        projectFilesState.activeFlow = activeFlow;

        setProjectFilesState(projectFilesState);

        history.push("/flow");
    }

    return (
        <Grid item xs={6}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h2">Project</Typography>
                            <Box p={2.5}>
                                <Grid container justify="center" spacing={2}>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={onNewProject}
                                        >
                                            New Project
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={onOpenProject}
                                        >
                                            Open Project
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <ServiceWorkerWrapper />
                </Grid>
            </Grid>
        </Grid>
    );
}
