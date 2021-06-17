import PropTypes from "prop-types";
import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreateProjectForm from "./CreateProjectForm";
import { useStyles } from "./CreateProject";

const ProjectSettingsModal = ({ open, ...rest }) => {
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={rest.onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <CreateProjectForm {...rest} />
            </Fade>
        </Modal>
    );
};

ProjectSettingsModal.propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    open: PropTypes.bool,
    config: PropTypes.object,
    title: PropTypes.string,
};

export default ProjectSettingsModal;
