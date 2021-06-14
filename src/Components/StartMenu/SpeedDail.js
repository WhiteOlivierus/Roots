import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

const useStyles = makeStyles((theme) => ({
    exampleWrapper: {
        position: "relative",
        marginTop: theme.spacing(3),
        height: 380,
    },
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
    speedDial: {
        position: "absolute",
        "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
}));

export default function SpeedDials({ actions }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);

    const handleOpen = () => setOpen(true);

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="left"
                FabProps={{ color: "secondary" }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                    />
                ))}
            </SpeedDial>
        </>
    );
}

SpeedDials.propTypes = {
    actions: PropTypes.array,
};
