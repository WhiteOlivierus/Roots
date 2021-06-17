import PropTypes from "prop-types";
import * as React from "react";
import * as MUI from "@material-ui/core";

import clsx from "clsx";

import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";

import { MenuDrawer } from "./MenuDrawer";
import { menuBarStyles } from "./menuBarStyles";
import { MenuBarTitle } from "./MenuBarTitle";
import { withRouter } from "react-router";
import Home from "./home";
import ProjectSettingsModal from "../../StartMenu/ProjectSettingsModal";
import useProjectFilesState from "../../../Context/ProjectFilesContext/ProjectFilesContext";

export const drawerWidth = 240;

const MenuBar = () => {
    const classes = menuBarStyles();

    const { projectFilesState } = useProjectFilesState();

    const [openDrawer, handleDrawerOpen, handleDrawerClose] = useOpen(false);
    const [openModal, handleModalOpen, handleModalClose] = useOpen(false);

    return (
        <>
            <div className={classes.root}>
                <MUI.AppBar position="static">
                    <MUI.Toolbar
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: openDrawer,
                        })}
                    >
                        <MUI.Tooltip title="Menu">
                            <MUI.IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: openDrawer,
                                })}
                            >
                                <MenuIcon />
                            </MUI.IconButton>
                        </MUI.Tooltip>
                        <MenuBarTitle />
                        <MUI.IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleModalOpen}
                            color="inherit"
                        >
                            <SettingsIcon />
                        </MUI.IconButton>
                        <Home />
                    </MUI.Toolbar>
                </MUI.AppBar>
                <MenuDrawer
                    open={openDrawer}
                    handleDrawerClose={handleDrawerClose}
                />
            </div>
            <ProjectSettingsModal
                title="Project settings"
                open={openModal}
                config={projectFilesState.config}
                onClose={handleModalClose}
            />
        </>
    );
};

MenuBar.propTypes = {
    history: PropTypes.object.isRequired,
};

MenuBar.displayName = "MenuBar";

export default React.memo(withRouter(MenuBar));

const useOpen = (initial) => {
    const [open, setOpenDrawer] = React.useState(initial);

    const handleOpen = React.useCallback(() => setOpenDrawer(true), [
        setOpenDrawer,
    ]);

    const handleClose = React.useCallback(() => setOpenDrawer(false), [
        setOpenDrawer,
    ]);

    return [open, handleOpen, handleClose];
};
