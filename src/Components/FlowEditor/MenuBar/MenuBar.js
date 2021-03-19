import { useCallback, useState, memo } from "react";
import { useHistory } from "react-router-dom";
import {
    AppBar,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import clsx from "clsx";

import { Build } from "../../../Utilities/BuildHandler";
import { useProjectFilesState } from "../../../Context/ProjectFilesContext/ProjectFilesContext";
import { useSnackbar } from "notistack";

import { SaveFlow } from "../../../Utilities/FlowHandler";
import { MenuDrawer } from "./MenuDrawer";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";
import { SeparateNodesAndEdges } from "../Nodes/NodeUtilities";
import { RemoveExtension } from "../../../Utilities/StringTools";
import { menuBarStyles } from "./menuBarStyles";

export const drawerWidth = 240;

export const MenuBar = memo((props) => {
    const classes = menuBarStyles();
    const history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();
    const { nodeViewerState } = useNodeViewerState();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = useCallback(() => {
        setOpen((o) => (o = true));
    }, [setOpen]);

    const handleDrawerClose = useCallback(() => {
        setOpen((o) => (o = false));
    }, [setOpen]);

    const onBuild = useCallback(() => {
        SaveFlow(projectFilesState.activeFlow, nodeViewerState.rfInstance).then(
            () => {
                const FileName = projectFilesState.activeFlow.name.replace(
                    ".json",
                    ""
                );

                enqueueSnackbar(`Start building preview ${FileName}`, {
                    variant: "info",
                });

                var { nodes, edges } = SeparateNodesAndEdges(
                    nodeViewerState.rfInstance.getElements()
                );

                Build(projectFilesState.activeRoot, nodes, edges)
                    .then((build) => {
                        projectFilesState.build = build;
                        setProjectFilesState(projectFilesState);

                        if (build.scenes.length <= 0) return;

                        enqueueSnackbar(`Preview build successfully`, {
                            variant: "success",
                        });

                        history.push(`/preview/${build.scenes[0].id}`);
                    })
                    .catch((e) => {
                        enqueueSnackbar(e, {
                            variant: "error",
                        });
                    });
            }
        );
    }, [projectFilesState, setProjectFilesState, nodeViewerState]);

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
                    <Tooltip title="Preview">
                        <IconButton onClick={onBuild}>
                            <PlayCircleFilledIcon style={{ fill: "white" }} />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <MenuDrawer open={open} handleDrawerClose={handleDrawerClose} />
        </div>
    );
});

export const MenuBarTitle = memo((props) => {
    const classes = menuBarStyles();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

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
