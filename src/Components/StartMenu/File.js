import { useHistory } from "react-router-dom";
import * as MUI from "@material-ui/core";
import React from "react";
import { ServiceWorkerWrapper } from "./ServiceWorkerWrapper";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { NewProject, OpenProject } from "../../Utilities/ProjectHandler";

export const File = () => {
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const history = useHistory();

    async function SetProjectContext(action) {
        action()
            .then(({ activeRoot, activeFlow }) => {
                projectFilesState.activeRoot = activeRoot;
                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);

                history.push("/flow");
            })
            .catch();
    }

    async function onNewProject() {
        await SetProjectContext(NewProject);
    }

    async function onOpenProject() {
        await SetProjectContext(OpenProject);
    }

    return (
        <MUI.Grid item xs={6}>
            <MUI.Grid container spacing={2}>
                <MUI.Grid item xs={12}>
                    <MUI.Card>
                        <MUI.CardContent>
                            <MUI.Typography variant="h2">
                                Project
                            </MUI.Typography>
                            <MUI.Box p={2.5}>
                                <MUI.Grid
                                    container
                                    justify="center"
                                    spacing={2}
                                >
                                    <MUI.Grid item>
                                        <MUI.Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={onNewProject}
                                        >
                                            New Project
                                        </MUI.Button>
                                    </MUI.Grid>
                                    <MUI.Grid item>
                                        <MUI.Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={onOpenProject}
                                        >
                                            Open Project
                                        </MUI.Button>
                                    </MUI.Grid>
                                </MUI.Grid>
                            </MUI.Box>
                        </MUI.CardContent>
                    </MUI.Card>
                </MUI.Grid>
                <MUI.Grid item xs={12}>
                    <ServiceWorkerWrapper />
                </MUI.Grid>
            </MUI.Grid>
        </MUI.Grid>
    );
};

File.displayName = "File";

export default React.memo(File);
