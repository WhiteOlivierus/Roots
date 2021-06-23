import * as MUI from "@material-ui/core";
import * as React from "react";
import * as MUILab from "@material-ui/lab";

import BackButton from "./BackButton";
import PropTypes from "prop-types";

import { toolBarIcons } from "./toolbarIcons";

const ToolBar = ({ mode, onExit }) => {
    const handleChange = (e, icon) => mode.setValue(icon);

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
                            {toolBarIcons.map(({ icon, title }) => (
                                <MUILab.ToggleButton
                                    key={title}
                                    value={title}
                                    aria-label={title}
                                >
                                    <MUI.Tooltip title={title}>
                                        {icon}
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
