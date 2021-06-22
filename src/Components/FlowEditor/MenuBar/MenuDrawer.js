import * as React from "react";
import * as MUI from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PropTypes from "prop-types";

import { MenuButtons } from "./MenuButtons.js";
import { useFileActions } from "./useFileActions";
import { withStyles } from "@material-ui/core";

const useMenuDrawerStyles = (theme) => ({
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
});

const MenuDrawer = ({ open, handleDrawerClose, classes }) => {
    const fileActions = useFileActions();

    return (
        <MUI.Drawer variant="persistent" anchor="left" open={open}>
            <div className={classes.drawerHeader}>
                <MUI.Tooltip title="Close Menu">
                    <MUI.IconButton
                        onClick={handleDrawerClose}
                        style={{
                            display: "flex",
                            alignItems: "right",
                            justifyContent: "flex-end",
                        }}
                    >
                        <ChevronLeftIcon />
                    </MUI.IconButton>
                </MUI.Tooltip>
            </div>
            <MUI.List>{open && <MenuButtons buttons={fileActions} />}</MUI.List>
        </MUI.Drawer>
    );
};
MenuDrawer.displayName = "MenuDrawer";

MenuDrawer.propTypes = {
    classes: PropTypes.shape({
        drawerHeader: PropTypes.any,
    }),
    handleDrawerClose: PropTypes.func.isRequired,
    open: PropTypes.bool,
};

export default React.memo(withStyles(useMenuDrawerStyles)(MenuDrawer));
