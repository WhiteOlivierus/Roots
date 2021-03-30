import { Box, Icon, Tooltip, Grid, Paper } from "@material-ui/core";
import React, { useState } from "react";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { BackButton } from "./BackButton";


const ToolBar = (props) => {
    const [view, setView] = useState(props.mode.value);

    const handleChange = (e, nextView) => {
        props.mode.set(nextView);
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
                            <ToggleButton value="select" aria-label="select">
                                <Tooltip title="select">
                                    <Icon className="fas fa-mouse-pointer" color="primary" />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton value="edit" aria-label="edit">
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


