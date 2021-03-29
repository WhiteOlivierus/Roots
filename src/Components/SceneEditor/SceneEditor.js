import { useHistory } from "react-router-dom";

import { memo, useState } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";
import { EditorWrapper } from "../EditorWrapper";
import { MenuBar } from "../FlowEditor/MenuBar/MenuBar";
import EditorInspector from "./Inspector/EditorInspector";
import { EditorCanvas } from "./EditorCanvas";
import ToolBar from ".//Toolbar/ToolBar";

export const SceneEditor = memo(() => {

    const history = useHistory();

    const { nodeViewerState } = useNodeViewerState();
    const [node, setNode] = useState(nodeViewerState.activeNode);

    return (
        <>
            {node ? (
                <EditorWrapper>
                    <OnBeforeReload />
                    <MenuBar />
                    <ToolBar state="select" />
                    <EditorCanvas />
                    <EditorInspector onEditNode={setNode} />
                </EditorWrapper >
            ) : (
                history.push("/")
            )}
        </>
    );
});

