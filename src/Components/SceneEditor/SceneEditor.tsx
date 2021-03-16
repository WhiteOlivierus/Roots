import { memo } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";

export const SceneEditor = memo((props) => {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const node = nodeViewerState.activeNode;
    return (
        <div>
            <img src={node.data.image} style={{ width: "50vw" }} />
            <h1>{node.data.label}</h1>
        </div>
    );
});
