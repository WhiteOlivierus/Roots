import * as React from "react";
import * as MUI from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import clsx from "clsx";
import { MenuDrawer } from "./MenuDrawer";
import { menuBarStyles } from "./menuBarStyles";
import { MenuBarTitle } from "./MenuBarTitle";

export const drawerWidth = 240;

export const MenuBar = () => {
    const classes = menuBarStyles();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = React.useCallback(() => setOpen(true), [setOpen]);

    const handleDrawerClose = React.useCallback(() => setOpen(false), [
        setOpen,
    ]);

    return (
        <div className={classes.root}>
            <MUI.AppBar position="static">
                <MUI.Toolbar
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <MUI.Tooltip title="Menu">
                        <MUI.IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </MUI.IconButton>
                    </MUI.Tooltip>
                    <MenuBarTitle />
                </MUI.Toolbar>
            </MUI.AppBar>
            <MenuDrawer open={open} handleDrawerClose={handleDrawerClose} />
        </div>
    );
};

MenuBar.displayName = "MenuBar";

export default React.memo(MenuBar);
