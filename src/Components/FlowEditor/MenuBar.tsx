import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    AppBar,
    createStyles,
    Drawer,
    IconButton,
    List,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import clsx from "clsx";

import { useStoreState } from "react-flow-renderer";

import { Build } from "../../Utilities/BuildHandler";
import { MenuButtons } from "./MenuButtons";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            textAlign: "left",
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
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

function MenuBarC(props) {
    const nodes = useStoreState((store) => store.nodes);
    const edges = useStoreState((store) => store.edges);

    const history = useHistory();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = useCallback(() => {
        setOpen((o) => (o = true));
    }, [setOpen]);

    const handleDrawerClose = useCallback(() => {
        setOpen((o) => (o = false));
    }, [setOpen]);

    const onBuild = useCallback(() => {
        async function Action() {
            var build = await Build(projectFilesState.activeRoot, nodes, edges);
            projectFilesState.build = build;
            setProjectFilesState(projectFilesState);
            history.push("/preview");
        }
        Action();
    }, [projectFilesState, setProjectFilesState, nodes, edges]);

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
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                        {`Roots - 
                        ${
                            projectFilesState.activeRoot === undefined
                                ? "No project loaded"
                                : `${projectFilesState.activeRoot.name} - ${projectFilesState.activeFlow.name.replace(
                                      ".json",
                                      ""
                                  )}`
                        }`}
                    </Typography>
                    <div onClick={onBuild}>
                        <IconButton color="secondary">
                            <PlayCircleFilledIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={open}>
                <IconButton
                    onClick={handleDrawerClose}
                    style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <List>{open && <MenuButtons />}</List>
            </Drawer>
        </div>
    );
}

export const MenuBar = React.memo(MenuBarC);
