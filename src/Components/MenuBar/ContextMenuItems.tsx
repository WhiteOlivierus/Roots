import { useNodeViewerState } from "../../Context/NodeViewer/NodeViewerContext";
import { MenuItem } from "./MenuItem";
import { ReadFile } from "../../Utilities/FileHandling";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";

export function ContextMenuItems(props: any) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const CreateNode = async (e: any) => {
        var fileHandle = await ReadFile();

        var node1 = new DefaultNodeModel(fileHandle.name, "rgb(0,192,255)");
        node1.addInPort("In");
        node1.addOutPort("Out");
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
