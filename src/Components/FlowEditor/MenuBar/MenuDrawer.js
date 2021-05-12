import * as React from "react";
import * as MUI from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PropTypes from "prop-types";

import { MenuButtons } from "./MenuButtons.js";
import { useFileActions } from "./useFileActions";

const useMenuDrawerStyles = MUI.makeStyles((theme) =>
    MUI.createStyles({
        drawerHeader: {
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: "flex-end",
        },
    })
);

export const MenuDrawer = ({ open, handleDrawerClose }) => {
    const classes = useMenuDrawerStyles();

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
    open: PropTypes.bool,
    handleDrawerClose: PropTypes.func.isRequired,
};

export default React.memo(MenuDrawer);
