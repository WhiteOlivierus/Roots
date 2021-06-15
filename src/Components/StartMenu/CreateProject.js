import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDials from "./SpeedDail";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import FolderIcon from "@material-ui/icons/Folder";
import { OpenProject } from "../../Utilities/ProjectHandler";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { withRouter } from "react-router";
import ProjectSettingsModal from "./ProjectSettingsModal";

export const useStyles = makeStyles(() => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

function CreateProject({ history }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const { projectFilesState } = useProjectFilesState();

    const [, setLoaded] = React.useState(false);

    const SetContext = ({ activeRoot, activeFlow }) => {
        projectFilesState.activeFlow = activeFlow;
        projectFilesState.activeRoot = activeRoot;

        setLoaded(true);
    };

    function onOpenProject() {
        OpenProject()
            .then((out) => {
                SetContext(out);
                history.push("/flow");
            })
            .catch(() => {
                console.log("User canceled open project");
            });
    }

    const actions = [
        { icon: <FolderIcon />, name: "Open", onClick: onOpenProject },
        { icon: <NoteAddIcon />, name: "New", onClick: handleOpen },
    ];

    return (
        <>
            <SpeedDials actions={actions} />
            <ProjectSettingsModal onClose={handleClose} open={open} />
        </>
    );
}

CreateProject.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default withRouter(CreateProject);
