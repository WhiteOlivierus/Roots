import { Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FolderIcon from "@material-ui/icons/Folder";
import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";
import { useNodeViewerState } from "./Context/NodeViewerContext";
import { NewFlow, NewProject, OpenProject, OpenFlow, SaveFlow, SaveFlowAs } from "../../Utilities/ProjectHandler";
import { removeElements } from "react-flow-renderer";
import { defaultFlow } from "../../Utilities/defaultFlow";
import { useZoomPanHelper } from "react-flow-renderer";
import { rfi } from "./FlowEditor";

export function MenuButtons(props) {
    const { fitView } = useZoomPanHelper();
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    async function onNewFlow() {
        try {
            var { activeFlow } = await NewFlow(projectFilesState.activeRoot);
        } catch {
            return;
        }

        projectFilesState.activeFlow = activeFlow;

        setProjectFilesState(projectFilesState);

        nodeViewerState.setElements((els) => removeElements(els, els));
        nodeViewerState.setElements(defaultFlow.elements);

        fitView();
    }

    async function onNewProject() {
        try {
            var { activeRoot, activeFlow } = await NewProject();
        } catch {
            return;
        }

        projectFilesState.activeRoot = activeRoot;
        projectFilesState.activeFlow = activeFlow;

        setProjectFilesState(projectFilesState);

        fitView();
    }

    async function onOpenFlow() {
        try {
            var { activeFlow, flow } = await OpenFlow(projectFilesState.activeRoot);
        } catch {
            return;
        }

        projectFilesState.activeFlow = activeFlow;

        setProjectFilesState(projectFilesState);

        nodeViewerState.setElements((els) => removeElements(els, els));
        nodeViewerState.setElements(flow.elements);

        fitView();
    }

    async function onOpenProject() {
        try {
            var { activeRoot, activeFlow } = await OpenProject();
        } catch {
            return;
        }

        projectFilesState.activeRoot = activeRoot;
        projectFilesState.activeFlow = activeFlow;

        setProjectFilesState(projectFilesState);

        fitView();
    }

    async function onSaveFlow() {
        try {
            await SaveFlow(projectFilesState.activeFlow, rfi);
        } catch {
            return;
        }
    }

    async function onSaveFlowAs() {
        try {
            var activeFlow = await SaveFlowAs(projectFilesState.activeRoot, rfi);
        } catch {
            return;
        }

        projectFilesState.activeFlow = activeFlow;

        setProjectFilesState(projectFilesState);
    }

    const buttons = [
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
                    return (
                        <ListItem button key={index} onClick={button.action}>
                            <ListItemIcon>{button.icon}</ListItemIcon>
                            <ListItemText primary={button.name} />
                        </ListItem>
                    );
                }
            })}
        </div>
    );
}
