import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import * as MUI from "@material-ui/core";
import { withRouter } from "react-router";
import { useFileActions } from "./useFileActions";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

function Home({ history }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = ({ currentTarget }) => setAnchorEl(currentTarget);

    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const fileActions = useFileActions();

    return (
        <>
            <MUI.IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <HomeIcon />
            </MUI.IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                style={{ height: "auto" }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <MUI.Grid container direction="column">
                    <MUI.Grid item>
                        <Typography className={classes.typography}>
                            Do you want to save before going home?
                        </Typography>
                    </MUI.Grid>
                    <MUI.Grid
                        container
                        spacing={4}
                        direction="row"
                        justify="center"
                    >
                        <MUI.Grid item>
                            <MUI.Button
                                color="secondary"
                                variant="contained"
                                onClick={() => {
                                    fileActions[7].action();
                                    history.push("/roots");
                                }}
                            >
                                Yes
                            </MUI.Button>
                        </MUI.Grid>
                        <MUI.Grid item>
                            <MUI.Button
                                color="secondary"
                                variant="outlined"
                                onClick={() => {
                                    history.push("/roots");
                                }}
                            >
                                No
                            </MUI.Button>
                        </MUI.Grid>
                    </MUI.Grid>
                </MUI.Grid>
            </Popover>
        </>
    );
}

Home.propTypes = {
    history: PropTypes.any,
};

export default withRouter(Home);
