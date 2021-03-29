import { useCallback, useState, memo } from "react";
import {
    AppBar,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import clsx from "clsx";
import { useProjectFilesState } from "../../../Context/ProjectFilesContext/ProjectFilesContext";
import { MenuDrawer } from "./MenuDrawer";
import { RemoveExtension } from "../../../Utilities/StringTools";
import { menuBarStyles } from "./menuBarStyles";

export const drawerWidth = 240;

export const MenuBar = memo((props) => {
    const classes = menuBarStyles();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = useCallback(() => {
        setOpen((o) => (o = true));
    }, [setOpen]);

    const handleDrawerClose = useCallback(() => {
        setOpen((o) => (o = false));
    }, [setOpen]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Tooltip title="Menu">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <MenuBarTitle />
                </Toolbar>
            </AppBar>
            <MenuDrawer open={open} handleDrawerClose={handleDrawerClose} />
        </div>
    );
});

export const MenuBarTitle = memo((props) => {
    const classes = menuBarStyles();

    const { projectFilesState } = useProjectFilesState();

    return (
        <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
        >
            {`Roots - 
            ${projectFilesState.activeRoot.name} - 
            ${RemoveExtension(projectFilesState.activeFlow.name)}`}
        </Typography>
    );
});
