import {
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FolderIcon from "@material-ui/icons/Folder";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { NewProject, OpenProject } from "../../Utilities/ProjectHandler";
import {
    NewFlow,
    OpenFlow,
    SaveFlow,
    SaveFlowAs,
} from "../../Utilities/FlowHandler";
import { removeElements } from "react-flow-renderer";
import { defaultFlow } from "../../Utilities/DefaultFlow";
import { rfi } from "./FlowEditor";
import { memo, useCallback } from "react";
import { useSnackbar } from "notistack";

export function MenuButtons(props) {
    const { nodeViewerState } = useNodeViewerState();
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
            } catch {
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
            try {
                await SaveFlow(projectFilesState.activeFlow, rfi);
                enqueueSnackbar(`${projectFilesState.activeFlow.name} Saved`);
            } catch {
                return;
            }
        }
        onSaveFlow();
    }, [projectFilesState]);

    const onSaveFlowAs = useCallback(() => {
        async function onSaveFlowAs() {
            try {
                var activeFlow = await SaveFlowAs(
                    projectFilesState.activeRoot,
                    rfi
                );
            } catch {
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
        },
        {
            name: "New Project",
            action: onNewProject,
            icon: <InsertDriveFileIcon />,
        },
        { divide: "" },
        {
            name: "Open Flow",
            action: onOpenFlow,
            icon: <FolderIcon />,
        },
        {
            name: "Open Project",
            action: onOpenProject,
            icon: <FolderIcon />,
        },
        { divide: "" },
        {
            name: "Save Flow",
            action: onSaveFlow,
            icon: <SaveIcon />,
        },
        {
            name: "Save Flow As",
            action: onSaveFlowAs,
            icon: <SaveIcon />,
        },
    ];

    return (
        <div>
            {buttons.map(function (button: any, index) {
                if ("divide" in button) {
                    return <Divider key={index} />;
                } else {
                    return <MemoizedMenuButton key={index} button={button} />;
                }
            })}
        </div>
    );
}

function MenuButton(props) {
    return (
        <ListItem button onClick={props.button.action}>
            <ListItemIcon>{props.button.icon}</ListItemIcon>
            <ListItemText primary={props.button.name} />
        </ListItem>
    );
}

const MemoizedMenuButton = memo(MenuButton);
