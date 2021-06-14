import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreateProjectForm from "./CreateProjectForm";
import SpeedDials from "./SpeedDail";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import FolderIcon from "@material-ui/icons/Folder";
import { OpenProject } from "../../Utilities/ProjectHandler";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function CreateProject({ history }) {
    const classes = useStyles();
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <CreateProjectForm
                        title="New project"
                        onClose={handleClose}
                    />
                </Fade>
            </Modal>
        </>
    );
}

CreateProject.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default withRouter(CreateProject);
