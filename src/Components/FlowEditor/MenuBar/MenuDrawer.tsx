import React, { useCallback, useEffect } from "react";
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
import { MenuButtons } from "./MenuButtons";
import { useProjectFilesState } from "../../../Context/ProjectFilesContext/ProjectFilesContext";
import { rfi } from "../FlowEditor";
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
import { RemoveExtension } from "../../../Utilities/StringTools";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";

const useMenuDrawerStyles = makeStyles((theme: Theme) =>
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

export const MenuDrawer = React.memo<{ open: any; handleDrawerClose: any }>(
    ({ open, handleDrawerClose }) => {
        const classes = useMenuDrawerStyles();

        const { enqueueSnackbar } = useSnackbar();

        const {
            projectFilesState,
            setProjectFilesState,
        } = useProjectFilesState();
        const { nodeViewerState } = useNodeViewerState();

        useEffect(() => {
            window.addEventListener("keydown", shortCuts());
            console.log("Set keydown");
            return () => {
                window.removeEventListener("keydown", shortCuts());
                console.log("Remove keydown");
            };
        }, []);

        function shortCuts(): (this: Window, ev: KeyboardEvent) => any {
            return (e) => {
                if (
                    (e.ctrlKey === true || e.metaKey === true) &&
                    e.key === "s"
                ) {
                    e.preventDefault();
                    onSaveFlow();
                    return;
                }

                if (
                    (e.ctrlKey || e.metaKey) &&
                    e.shiftKey &&
                    e.code === "KeyS"
                ) {
                    e.preventDefault();
                    onSaveFlowAs();
                    return;
                }

                if (
                    (e.ctrlKey === true || e.metaKey === true) &&
                    e.key === "o"
                ) {
                    e.preventDefault();
                    onOpenFlow();
                    return;
                }

                if (
                    (e.ctrlKey || e.metaKey) &&
                    e.shiftKey &&
                    e.code === "KeyO"
                ) {
                    e.preventDefault();
                    onOpenProject();
                    return;
                }

                if (
                    (e.ctrlKey === true || e.metaKey === true) &&
                    e.key === "n"
                ) {
                    e.preventDefault();
                    onNewFlow();
                    return;
                }

                if (
                    (e.ctrlKey || e.metaKey) &&
                    e.shiftKey &&
                    e.code === "KeyN"
                ) {
                    e.preventDefault();
                    onNewFlow();
                    return;
                }
            };
        }

        const onNewFlow = useCallback(() => {
            async function onNewFlow() {
                try {
                    var { activeFlow } = await NewFlow(
                        projectFilesState.activeRoot
                    );
                } catch {
                    return;
                }

                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);

                nodeViewerState.setElements((els) => removeElements(els, els));
                nodeViewerState.setElements(defaultFlow.elements);
            }
            onNewFlow();
        }, [projectFilesState, setProjectFilesState, nodeViewerState]);

        const onNewProject = useCallback(() => {
            async function onNewProject() {
                try {
                    var { activeRoot, activeFlow } = await NewProject();
                } catch {
                    return;
                }

                projectFilesState.activeRoot = activeRoot;
                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);
            }
            onNewProject();
        }, [projectFilesState, setProjectFilesState]);

        const onOpenFlow = useCallback(() => {
            async function onOpenFlow() {
                try {
                    var { activeFlow, flow } = await OpenFlow(
                        projectFilesState.activeRoot
                    );
                } catch {
                    return;
                }

                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);

                nodeViewerState.setElements((els) => removeElements(els, els));
                nodeViewerState.setElements(flow.elements);
            }
            onOpenFlow();
        }, [projectFilesState, setProjectFilesState, nodeViewerState]);

        const onOpenProject = useCallback(() => {
            async function onOpenProject() {
                try {
                    var { activeRoot, activeFlow } = await OpenProject();

                    var fileName = RemoveExtension(activeFlow.name);

                    enqueueSnackbar(`Opened ${fileName}`);
                } catch {
                    enqueueSnackbar(`${fileName} was not opened`);
                    return;
                }

                projectFilesState.activeRoot = activeRoot;
                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);
            }
            onOpenProject();
        }, [projectFilesState, setProjectFilesState]);

        const onSaveFlow = useCallback(() => {
            async function onSaveFlow() {
                var fileName = RemoveExtension(
                    projectFilesState.activeFlow.name
                );

                try {
                    await SaveFlow(projectFilesState.activeFlow, rfi);

                    enqueueSnackbar(`${fileName} saved`);
                } catch {
                    enqueueSnackbar(`${fileName} was not saved`);

                    return;
                }
            }
            onSaveFlow();
        }, [projectFilesState]);

        const onSaveFlowAs = useCallback(() => {
            async function onSaveFlowAs() {
                var fileName = RemoveExtension(
                    projectFilesState.activeFlow.name
                );

                try {
                    var activeFlow = await SaveFlowAs(
                        projectFilesState.activeRoot,
                        rfi
                    );

                    enqueueSnackbar(
                        `${fileName} saved as ${RemoveExtension(
                            activeFlow.name
                        )}`
                    );
                } catch {
                    enqueueSnackbar(`${fileName} was not saved`);
                    return;
                }

                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);
            }
            onSaveFlowAs();
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
    }
);
