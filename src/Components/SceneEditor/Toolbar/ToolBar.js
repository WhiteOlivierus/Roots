import { Box, Icon, Tooltip, Grid, Paper } from "@material-ui/core";
import * as React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import BackButton from "./BackButton";
import PropTypes from "prop-types";

const ToolBar = ({ mode, onExit }) => {
    const handleChange = (e, nextView) => mode.setValue(nextView);

    return (
        <Box p={3}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <BackButton to={"/flow"} onExit={onExit} />
                </Grid>
                <Grid item>
                    <Paper>
                        <ToggleButtonGroup
                            orientation="vertical"
                            value={mode.value}
                            exclusive
                            onChange={handleChange}
                        >
                            <ToggleButton value="select" aria-label="select">
                                <Tooltip title="select">
                                    <Icon
                                        className="fas fa-mouse-pointer"
                                        color="primary"
                                    />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton value="edit" aria-label="edit">
                                <Tooltip title="edit zones">
                                    <Icon
                                        className="fas fa-pen-fancy"
                                        color="primary"
                                    />
                                </Tooltip>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

ToolBar.displayName = "ToolBar";

ToolBar.propTypes = {
    onExit: PropTypes.func.isRequired,
    mode: PropTypes.object.isRequired,
};

export default React.memo(ToolBar);
