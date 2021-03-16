import { memo } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { EditorWrapper } from "../EditorWrapper";

export const SceneEditor = memo((props) => {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const node = nodeViewerState.activeNode;
    return (
        <EditorWrapper>
            <div>
                <img src={node.data.image} style={{ width: "50vw" }} />
                <h1>{node.data.label}</h1>
            </div>
        </EditorWrapper>
    );
});
