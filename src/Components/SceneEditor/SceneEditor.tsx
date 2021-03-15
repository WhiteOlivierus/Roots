import * as React from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { MenuBar } from "../FlowEditor/MenuBar/MenuBar";

export const SceneEditor = (props) => {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    return (
        <MenuBar>
            <h1>{nodeViewerState.activeNode.id}</h1>
        </MenuBar>
    );
};
