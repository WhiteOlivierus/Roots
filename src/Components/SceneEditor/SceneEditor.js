import { useHistory } from "react-router-dom";

import { memo, useEffect, useState } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";
import { EditorWrapper } from "../EditorWrapper";
import { MenuBar } from "../FlowEditor/MenuBar/MenuBar";
import EditorInspector from "./EditorInspector";
import { EditorCanvas } from "./EditorCanvas";
import ToolBar from "./ToolBar";

export const SceneEditor = memo(() => {

    const history = useHistory();

    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const [node, setNode] = useState(nodeViewerState.activeNode);

    useEffect(() => {
        nodeViewerState.activeNode = node;
        setNodeViewerState(nodeViewerState);
    }, [node, nodeViewerState, setNode, setNodeViewerState]);

    return (
        <>
            {node ? (
                <EditorWrapper>
                    <OnBeforeReload />
                    <MenuBar />
                    <ToolBar />
                    <EditorCanvas node={node} />
                    <EditorInspector onEditNode={setNode} />
                </EditorWrapper >
            ) : (
                history.push("/")
            )
            }
        </>
    );
});

