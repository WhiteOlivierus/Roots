import React, { useCallback } from "react";
import { Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FolderIcon from "@material-ui/icons/Folder";
import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";
import { useNodeViewerState } from "./Context/NodeViewerContext";
import { NewFlow, OpenFlow, SaveFlow, SaveFlowAs } from "../../Utilities/ProjectHandler";
import { removeElements } from "react-flow-renderer";
import { defaultFlow } from "../../Utilities/defaultFlow";

export function MenuButtons(props) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const onNewFlow = useCallback(() => {
        async function Action() {
            try {
                var { activeFlow } = await NewFlow(projectFilesState.activeRoot);
            } catch {
                return;
            }

            projectFilesState.activeFlow = activeFlow;

            setProjectFilesState(projectFilesState);

            nodeViewerState.setElements((els) => removeElements(els, els));
            nodeViewerState.setElements(defaultFlow.elements);
        }
        Action();
    }, [projectFilesState]);

    const buttons = [
        {
            name: "New Flow",
            action: onNewFlow,
            icon: <InsertDriveFileIcon />,
        },
        /*         {
            name: "New Project",
            action: NewProject(states),
            icon: <InsertDriveFileIcon />,
        }, */
        /*         { divide: "" }, */
        /*         {
            name: "Open Flow",
            action: OpenFlow(states, projectFilesState.activeRoot, setElements),
            icon: <FolderIcon />,
        }, */
        /*         {
            name: "Open Project",
            action: OpenProject(states, undefined, setElements),
            icon: <FolderIcon />,
        }, */
        /*         { divide: "" }, */
        /*         {
            name: "Save Flow",
            action: SaveFlow(states, rfInstance),
            icon: <SaveIcon />,
        }, */
        /*         {
            name: "Save Flow As",
            action: SaveFlowAs(states, rfInstance),
            icon: <SaveIcon />,
        }, */
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
