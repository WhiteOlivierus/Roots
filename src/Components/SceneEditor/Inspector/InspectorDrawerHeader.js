import * as React from "react";
import * as MUI from "@material-ui/core";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const InspectorDrawerHeader = ({ open, handleClose, handleOpen, form }) => (
    <MUI.Box p={1}>
        <MUI.Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            <MUI.Grid item xs={1}>
                <MUI.IconButton onClick={open ? handleClose : handleOpen}>
                    {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </MUI.IconButton>
            </MUI.Grid>
            <MUI.Grid item>
                <MUI.Typography variant="h6" gutterBottom xs={11}>
                    {form.name}
                </MUI.Typography>
            </MUI.Grid>
        </MUI.Grid>
    </MUI.Box>
);

InspectorDrawerHeader.propTypes = {
    form: PropTypes.shape({
        name: PropTypes.any,
    }),
    handleClose: PropTypes.any,
    handleOpen: PropTypes.any,
    open: PropTypes.any,
};

export default InspectorDrawerHeader;
