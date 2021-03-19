import { ListItem, ListItemText } from "@material-ui/core";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { useHistory } from "react-router-dom";
import { OpenRecentProject } from "../../Utilities/ProjectHandler";
import { useCallback } from "react";
import { useSnackbar } from "notistack";

export const RecentEntry = (props) => {
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const onOpenRecentProject = useCallback(
        (fileHandle) => {
            OpenRecentProject(fileHandle)
                .then(({ activeRoot, activeFlow }) => {
                    projectFilesState.activeRoot = activeRoot;
                    projectFilesState.activeFlow = activeFlow;

                    setProjectFilesState(projectFilesState);

                    history.push("/flow");
                })
                .catch((e) => {
                    enqueueSnackbar(e, {
                        variant: "error",
                    });
                });
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
};
