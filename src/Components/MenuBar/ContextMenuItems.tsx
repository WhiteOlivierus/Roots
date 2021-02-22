import { useNodeViewerState } from "../../Context/NodeViewer/NodeViewerContext";
import { MenuItem } from "./MenuItem";
import { ReadFile, SaveFileInFolder } from "../../Utilities/FileHandling";
import { DiamondNodeModel } from "../Nodes/Scene/DiamondNodeModel";
import { useProjectFilesState } from "../../Context/ProjectFiles/ProjectFilesContext";

export function ContextMenuItems(props: any) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const CreateNode = async (e: any) => {
        var fileHandle = await ReadFile();

        // save file in project folder that is open
        fileHandle = await SaveFileInFolder(projectFilesState.projectHandle, fileHandle);

        var path = URL.createObjectURL(await fileHandle.getFile());

        var node1 = new DiamondNodeModel(path);
        node1.setPosition(e.clientX, e.clientY);

        nodeViewerState.model.addNode(node1);

        nodeViewerState.engine.repaintCanvas();

        setNodeViewerState(nodeViewerState);
    };

    return (
        <ul>
            <MenuItem action={CreateNode}>Create Scene</MenuItem>
        </ul>
    );
}
