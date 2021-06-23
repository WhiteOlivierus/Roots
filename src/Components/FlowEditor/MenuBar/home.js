import * as React from "react";
import * as MUI from "@material-ui/core";
import * as Router from "react-router";

import PropTypes from "prop-types";
import HomeIcon from "@material-ui/icons/Home";

import { useFileActions } from "./useFileActions";

const useStyles = MUI.makeStyles((theme) => ({
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
            <MUI.Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        padding: 20,
                    },
                }}
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
                        <MUI.Typography className={classes.typography}>
                            Do you want to save before going home?
                        </MUI.Typography>
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
            </MUI.Popover>
        </>
    );
}

Home.propTypes = {
    history: PropTypes.any,
};

export default Router.withRouter(Home);
