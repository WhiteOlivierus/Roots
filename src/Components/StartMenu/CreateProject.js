import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDials from "./SpeedDail";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import FolderIcon from "@material-ui/icons/Folder";
import { NewProject, OpenProject } from "../../Utilities/ProjectHandler";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { withRouter } from "react-router";
import ProjectSettingsModal from "./ProjectSettingsModal";
import { WriteFile } from "../../Utilities/FileHandler";

export const useStyles = makeStyles(() => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

function CreateProject({ history, handleOpen, handleClose, open }) {
    const { projectFilesState } = useProjectFilesState();

    const SetContext = ({ activeRoot, activeFlow, activeConfig }) => {
        projectFilesState.activeFlow = activeFlow;
        projectFilesState.activeRoot = activeRoot;
        projectFilesState.config = activeConfig;
    };

    const handleSubmit = (values) => {
        NewProject(values)
            .then((out) => {
                SetContext(out);
                if (values.projectLogo.name)
                    Promise.all([
                        out.activeRoot.getFileHandle(`logo.png`, {
                            create: true,
                        }),
                        values.projectLogo.getFile(),
                    ]).then(([logoHandler, logoFile]) => {
                        WriteFile(logoHandler, logoFile);
                        projectFilesState.logo = logoHandler;
                        history.push("/flow");
                    });
                else {
                    history.push("/flow");
                }
            })
            .catch();
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
            <ProjectSettingsModal
                title="Create project"
                onClose={handleClose}
                open={open}
                onSubmit={handleSubmit}
            />
        </>
    );
}

CreateProject.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    open: PropTypes.bool,
};

export default withRouter(CreateProject);
