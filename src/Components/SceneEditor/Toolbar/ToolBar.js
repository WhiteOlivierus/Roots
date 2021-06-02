import * as MUI from "@material-ui/core";
import * as React from "react";
import * as MUILab from "@material-ui/lab";

import BackButton from "./BackButton";
import PropTypes from "prop-types";

import toolbarIcons from "./toolbarIcons.json";

const ToolBar = ({ mode, onExit }) => {
    const handleChange = (e, icon) => icon && mode.setValue(icon);

    return (
        <MUI.Box p={3}>
            <MUI.Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <MUI.Grid item>
                    <BackButton to={"/flow"} onExit={onExit} />
                </MUI.Grid>
                <MUI.Grid item>
                    <MUI.Paper>
                        <MUILab.ToggleButtonGroup
                            orientation="vertical"
                            value={mode.value}
                            exclusive
                            onChange={handleChange}
                        >
                            {toolbarIcons.map((icon) => (
                                <MUILab.ToggleButton
                                    key={icon.title}
                                    value={icon.tittle}
                                    aria-label={icon.tittle}
                                >
                                    <MUI.Tooltip title={icon.tittle}>
                                        <MUI.Icon
                                            className={`fas fa${icon.icon}`}
                                            color="primary"
                                        />
                                    </MUI.Tooltip>
                                </MUILab.ToggleButton>
                            ))}
                        </MUILab.ToggleButtonGroup>
                    </MUI.Paper>
                </MUI.Grid>
            </MUI.Grid>
        </MUI.Box>
    );
};

ToolBar.displayName = "ToolBar";

ToolBar.propTypes = {
    onExit: PropTypes.func.isRequired,
    mode: PropTypes.object.isRequired,
};

export default React.memo(ToolBar);
