import React, { memo, useCallback, useEffect } from "react";
import {
    createStyles,
    Drawer,
    IconButton,
    List,
    makeStyles,
    Theme,
    Tooltip,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MenuButtons } from "./MenuButtons.js";
import { useProjectFilesState } from "../../../Context/ProjectFilesContext/ProjectFilesContext";
import { useSnackbar } from "notistack";
import SaveIcon from "@material-ui/icons/Save";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FolderIcon from "@material-ui/icons/Folder";
import { NewProject, OpenProject } from "../../../Utilities/ProjectHandler";
import {
    NewFlow,
    OpenFlow,
    SaveFlow,
    SaveFlowAs,
} from "../../../Utilities/FlowHandler";
import { removeElements } from "react-flow-renderer";
import { defaultFlow } from "../../../Utilities/DefaultFlow";
import { RemoveExtension } from "../../../Utilities/StringTools.js";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";

const useMenuDrawerStyles = makeStyles((theme) =>
    createStyles({
        drawerHeader: {
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: "flex-end",
        },
    })
);

export const MenuDrawer = memo(({ open, handleDrawerClose }) => {
    const classes = useMenuDrawerStyles();

    const { enqueueSnackbar } = useSnackbar();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();
    const { nodeViewerState } = useNodeViewerState();

    useEffect(() => {
        window.addEventListener("keydown", shortCuts, true);
        return () => {
            window.removeEventListener("keydown", shortCuts, true);
        };
    }, []);

    const shortCuts = (e) => {
        if ((e.ctrlKey === true || e.metaKey === true) && e.key === "s") {
            e.preventDefault();
            onSaveFlow();
            return;
        }

        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyS") {
            e.preventDefault();
            onSaveFlowAs();
            return;
        }

        if ((e.ctrlKey === true || e.metaKey === true) && e.key === "o") {
            e.preventDefault();
            onOpenFlow();
            return;
        }

        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyO") {
            e.preventDefault();
            onOpenProject();
            return;
        }

        if ((e.ctrlKey === true || e.metaKey === true) && e.key === "n") {
            e.preventDefault();
            onNewFlow();
            return;
        }

        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyN") {
            e.preventDefault();
            onNewFlow();
            return;
        }
    };

    const onNewFlow = useCallback(() => {
        NewFlow(projectFilesState.activeRoot)
            .then(({ activeFlow }) => {
                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);

                nodeViewerState.setElements((els) => removeElements(els, els));
                nodeViewerState.setElements(defaultFlow.elements);
            })
            .catch((e) => {
                enqueueSnackbar(`New project could not be created`, {
                    variant: "error",
                });
            });
    }, [projectFilesState, setProjectFilesState, nodeViewerState]);

    const onNewProject = useCallback(() => {
        NewProject()
            .then(({ activeRoot, activeFlow }) => {
                projectFilesState.activeRoot = activeRoot;
                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);
            })
            .catch((e) => {
                enqueueSnackbar(`New project could not be created`, {
                    variant: "error",
                });
            });
    }, [projectFilesState, setProjectFilesState]);

    const onOpenFlow = useCallback(() => {
        OpenFlow(projectFilesState.activeRoot)
            .then(({ activeFlow, flow }) => {
                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);

                nodeViewerState.setElements((els) => removeElements(els, els));
                nodeViewerState.setElements(flow.elements);
            })
            .catch((e) => {
                enqueueSnackbar(`Could not open flow`, {
                    variant: "error",
                });
            });
    }, [projectFilesState, setProjectFilesState, nodeViewerState]);

    const onOpenProject = useCallback(() => {
        OpenProject()
            .then(({ activeRoot, activeFlow }) => {
                projectFilesState.activeRoot = activeRoot;
                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);

                var fileName = RemoveExtension(activeFlow.name);

                enqueueSnackbar(`Opened project ${fileName}`, {
                    variant: "success",
                });
            })
            .catch((e) => {
                enqueueSnackbar(`Could not open project`, {
                    variant: "error",
                });
            });
    }, [projectFilesState, setProjectFilesState]);

    const onSaveFlow = useCallback(() => {
        var fileName = RemoveExtension(projectFilesState.activeFlow.name);

        SaveFlow(projectFilesState.activeFlow, nodeViewerState.rfInstance)
            .then(() => {
                enqueueSnackbar(`${fileName} saved`, {
                    variant: "success",
                });
            })
            .catch((e) => {
                enqueueSnackbar(`${fileName} was not saved`, {
                    variant: "error",
                });
            });
    }, [projectFilesState]);

    const onSaveFlowAs = useCallback(() => {
        var fileName = RemoveExtension(projectFilesState.activeFlow.name);

        SaveFlowAs(projectFilesState.activeRoot, nodeViewerState.rfInstance)
            .then((activeFlow) => {
                projectFilesState.activeFlow = activeFlow;
                setProjectFilesState(projectFilesState);

                const activeFlowName = RemoveExtension(activeFlow.name);
                enqueueSnackbar(`${fileName} saved as ${activeFlowName}`, {
                    variant: "success",
                });
            })
            .catch((e) => {
                enqueueSnackbar(`${fileName} was not saved`, {
                    variant: "error",
                });
            });
    }, [projectFilesState, setProjectFilesState]);

    const buttons = [
        { divide: "" },
        {
            name: "New Flow",
            action: onNewFlow,
            icon: <InsertDriveFileIcon />,
            tooltip: "Ctrl-N",
        },
        {
            name: "New Project",
            action: onNewProject,
            icon: <InsertDriveFileIcon />,
            tooltip: "Ctrl-Shift-N",
        },
        { divide: "" },
        {
            name: "Open Flow",
            action: onOpenFlow,
            icon: <FolderIcon />,
            tooltip: "Ctrl-O",
        },
        {
            name: "Open Project",
            action: onOpenProject,
            icon: <FolderIcon />,
            tooltip: "Ctrl-Shift-O",
        },
        { divide: "" },
        {
            name: "Save Flow",
            action: onSaveFlow,
            icon: <SaveIcon />,
            tooltip: "Ctrl-S",
        },
        {
            name: "Save Flow As",
            action: onSaveFlowAs,
            icon: <SaveIcon />,
            tooltip: "Ctrl-Shift-S",
        },
    ];

    return (
        <Drawer variant="persistent" anchor="left" open={open}>
            <div className={classes.drawerHeader}>
                <Tooltip title="Close Menu">
                    <IconButton
                        onClick={handleDrawerClose}
                        style={{
                            display: "flex",
                            alignItems: "right",
                            justifyContent: "flex-end",
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <List>{open && <MenuButtons buttons={buttons} />}</List>
        </Drawer>
    );
});
