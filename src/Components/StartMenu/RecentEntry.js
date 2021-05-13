import { ListItem, ListItemText } from "@material-ui/core";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { useHistory } from "react-router-dom";
import { OpenRecentProject } from "../../Utilities/ProjectHandler";
import * as React from "react";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

const RecentEntry = ({ files }) => {
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const onOpenRecentProject = React.useCallback(
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
            {files &&
                files.map((file, index) => (
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

RecentEntry.displayName = "RecentEntry";

RecentEntry.propTypes = {
    files: PropTypes.array.isRequired,
};

export default React.memo(RecentEntry);
