import { Box, Icon, Tooltip, Grid, Paper, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { BackButton } from "./BackButton";

const createStyle = makeStyles((theme) => ({
    overrides: {
        MuiSelected: {
            fill: "secondary",
            backgroundColor: "black"
        }
    }
}));

const ToolBar = (props) => {
    const classes = createStyle();
    const [view, setView] = useState(props.state);

    const handleChange = (e, nextView) => {
        setView(nextView);
    };

    return (
        <Box
            p={3}
            style={{
                position: "absolute",
                top: 60
            }}
        >
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <BackButton to={"/flow"} />
                </Grid>
                <Grid item >
                    <Paper>
                        <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
                            <ToggleButton className={classes.overrides} value="select" aria-label="select">
                                <Tooltip title="select">
                                    <Icon className="fas fa-mouse-pointer" color="primary" />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton className={classes.overrides} value="edit" aria-label="edit">
                                <Tooltip title="edit zones">
                                    <Icon className="fas fa-pen-fancy" color="primary" />
                                </Tooltip>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ToolBar;


