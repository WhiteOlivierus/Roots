import { ListItem, ListItemText } from "@material-ui/core";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { useHistory } from "react-router-dom";
import { OpenRecentProject } from "../../Utilities/ProjectHandler";
import { useCallback } from "react";
import { useSnackbar } from "notistack";

export function RecentEntry(props) {
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const onOpenRecentProject = useCallback(
        (fileHandle) => {
            try {
                OpenRecentProject(fileHandle)
                    .then(({ activeRoot, activeFlow }) => {
                        projectFilesState.activeRoot = activeRoot;
                        projectFilesState.activeFlow = activeFlow;
                        projectFilesState.projectLoaded = false;

                        setProjectFilesState(projectFilesState);

                        history.push("/flow");
                    })
                    .catch((e) => {
                        enqueueSnackbar(e, {
                            variant: "error",
                        });
                    });
            } catch {
                return;
            }
        },
        [projectFilesState]
    );

    return (
        <div>
            {props.files &&
                props.files.map((file, index) => (
                    <ListItem
                        key={index}
                        button
                        onClick={() => onOpenRecentProject(file)}
                    >
                        <ListItemText primary={file.name} />
                    </ListItem>
                ))}
        </div>
    );
}
