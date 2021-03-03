import React, { useContext, useState } from "react";
import {
    AppBar,
    createStyles,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import MenuIcon from "@material-ui/icons/Menu";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FolderIcon from "@material-ui/icons/Folder";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";

import { useStoreActions } from "react-flow-renderer";

import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";
import { useNodeViewerState } from "./Context/NodeViewerContext";
import { NewFlow, NewProject, OpenFlow, OpenProject, SaveFlow } from "../../Utilities/ProjectHandler";
import { rfInstance } from "./FlowEditor";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: "none",
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: "hidden",
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    })
);

export function MenuBar(props) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const setElements = useStoreActions((actions) => actions.setElements);

    const states = {
        nodeViewerState,
        projectFilesState,
        setNodeViewerState,
        setProjectFilesState,
    };

    const buttons = [
        {
            name: "New Flow",
            action: NewFlow(states),
            icon: <InsertDriveFileIcon />,
        },
        {
            name: "New Project",
            action: NewProject(states),
            icon: <InsertDriveFileIcon />,
        },
        { divide: "" },
        {
            name: "Open Flow",
            action: OpenFlow(states, setElements),
            icon: <FolderIcon />,
        },
        {
            name: "Open Project",
            action: OpenProject(states, setElements),
            icon: <FolderIcon />,
        },
        { divide: "" },
        {
            name: "Save Flow",
            action: SaveFlow(states, rfInstance),
            icon: <SaveIcon />,
        },
        {
            name: "Save Flow As",
            action: () => null,
            icon: <SaveIcon />,
        },
    ];
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const newLocal = buttons.map(function (button: any, index) {
        if ("divide" in button) {
            return <Divider key={index} />;
        } else {
            return (
                <ListItem button key={index} onClick={button.action}>
                    <ListItemIcon>{button.icon}</ListItemIcon>
                    <ListItemText primary={button.name} />
                </ListItem>
            );
        }
    });
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar
                    variant="dense"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
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
                    <Typography variant="h6" color="inherit" noWrap>
                        {`Roots - 
                        ${
                            projectFilesState.activeRoot === undefined
                                ? "No project loaded"
                                : projectFilesState.activeRoot.name
                        }`}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={open}>
                <IconButton
                    onClick={handleDrawerClose}
                    style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <Divider />
                <List>{newLocal}</List>
            </Drawer>
        </div>
    );
}
