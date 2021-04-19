import * as React from "react";
import * as MUI from "@material-ui/core";
import useProjectFilesState from "../../../Context/ProjectFilesContext/ProjectFilesContext";
import { RemoveExtension } from "../../../Utilities/StringTools";
import { menuBarStyles } from "./menuBarStyles";

export const MenuBarTitle = React.memo(() => {
    const classes = menuBarStyles();

    const { projectFilesState } = useProjectFilesState();

    return (
        <MUI.Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
        >
            {`Roots - 
            ${projectFilesState.activeRoot.name} - 
            ${RemoveExtension(projectFilesState.activeFlow.name)}`}
        </MUI.Typography>
    );
});

MenuBarTitle.displayName = "MenuBarTitle";

export default React.memo(MenuBarTitle);
