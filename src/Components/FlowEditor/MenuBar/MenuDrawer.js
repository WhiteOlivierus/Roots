import * as React from "react";
import * as MUI from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MenuButtons } from "./MenuButtons.js";
import useProjectFilesState from "../../../Context/ProjectFilesContext/ProjectFilesContext";
import { useSnackbar } from "notistack";
import SaveIcon from "@material-ui/icons/Save";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FolderIcon from "@material-ui/icons/Folder";
import { NewProject, OpenProject } from "../../../Utilities/ProjectHandler";
import * as FlowHandler from "../../../Utilities/FlowHandler";
import { removeElements } from "react-flow-renderer";
import { defaultFlow } from "../../../Utilities/DefaultFlow";
import { RemoveExtension } from "../../../Utilities/StringTools.js";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";
import PropTypes from "prop-types";

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

    const { enqueueSnackbar } = useSnackbar();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();
    const { nodeViewerState } = useNodeViewerState();

    const buttons = useFileActions(
        projectFilesState,
        setProjectFilesState,
        nodeViewerState,
        enqueueSnackbar
    );

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
            <MUI.List>{open && <MenuButtons buttons={buttons} />}</MUI.List>
        </MUI.Drawer>
    );
};

MenuDrawer.displayName = "MenuDrawer";

MenuDrawer.propTypes = {
    open: PropTypes.bool,
    handleDrawerClose: PropTypes.func.isRequired,
};

export default React.memo(MenuDrawer);

function useFileActions(
    projectFilesState,
    setProjectFilesState,
    nodeViewerState,
    enqueueSnackbar
) {
    React.useEffect(() => {
        window.addEventListener("keydown", shortCuts, true);
        return () => {
            window.removeEventListener("keydown", shortCuts, true);
        };
    });

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

    const onNewFlow = React.useCallback(() => {
        FlowHandler.NewFlow(projectFilesState.activeRoot)
            .then(({ activeFlow }) => {
                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);

                nodeViewerState.setElements((els) => removeElements(els, els));
                nodeViewerState.setElements(defaultFlow.elements);
            })
            .catch(() => {
                enqueueSnackbar(`New project could not be created`, {
                    variant: "error",
                });
            });
    }, [
        projectFilesState,
        setProjectFilesState,
        nodeViewerState,
        enqueueSnackbar,
    ]);

    const onNewProject = React.useCallback(() => {
        NewProject()
            .then(({ activeRoot, activeFlow }) => {
                projectFilesState.activeRoot = activeRoot;
                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);
            })
            .catch(() => {
                enqueueSnackbar(`New project could not be created`, {
                    variant: "error",
                });
            });
    }, [enqueueSnackbar, projectFilesState, setProjectFilesState]);

    const onOpenFlow = React.useCallback(() => {
        FlowHandler.OpenFlow(projectFilesState.activeRoot)
            .then(({ activeFlow, flow }) => {
                projectFilesState.activeFlow = activeFlow;

                setProjectFilesState(projectFilesState);

                nodeViewerState.setElements((els) => removeElements(els, els));
                nodeViewerState.setElements(flow.elements);
            })
            .catch(() => {
                enqueueSnackbar(`Could not open flow`, {
                    variant: "error",
                });
            });
    }, [
        projectFilesState,
        setProjectFilesState,
        nodeViewerState,
        enqueueSnackbar,
    ]);

    const onOpenProject = React.useCallback(() => {
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
            .catch(() => {
                enqueueSnackbar(`Could not open project`, {
                    variant: "error",
                });
            });
    }, [enqueueSnackbar, projectFilesState, setProjectFilesState]);

    const onSaveFlow = React.useCallback(() => {
        var fileName = RemoveExtension(projectFilesState.activeFlow.name);

        FlowHandler.SaveFlow(
            projectFilesState.activeFlow,
            nodeViewerState.rfInstance
        )
            .then(() => {
                enqueueSnackbar(`${fileName} saved`, {
                    variant: "success",
                });
            })
            .catch(() => {
                enqueueSnackbar(`${fileName} was not saved`, {
                    variant: "error",
                });
            });
    }, [
        enqueueSnackbar,
        nodeViewerState.rfInstance,
        projectFilesState.activeFlow,
    ]);

    const onSaveFlowAs = React.useCallback(() => {
        var fileName = RemoveExtension(projectFilesState.activeFlow.name);

        FlowHandler.SaveFlowAs(
            projectFilesState.activeRoot,
            nodeViewerState.rfInstance
        )
            .then((activeFlow) => {
                projectFilesState.activeFlow = activeFlow;
                setProjectFilesState(projectFilesState);

                const activeFlowName = RemoveExtension(activeFlow.name);
                enqueueSnackbar(`${fileName} saved as ${activeFlowName}`, {
                    variant: "success",
                });
            })
            .catch(() => {
                enqueueSnackbar(`${fileName} was not saved`, {
                    variant: "error",
                });
            });
    }, [
        enqueueSnackbar,
        nodeViewerState.rfInstance,
        projectFilesState,
        setProjectFilesState,
    ]);

    return [
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
}
