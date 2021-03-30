import { useHistory } from "react-router-dom";

import { memo, useEffect, useState } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";
import { EditorWrapper } from "../EditorWrapper";
import { MenuBar } from "../FlowEditor/MenuBar/MenuBar";
import EditorInspector from "./Inspector/EditorInspector";
import { EditorCanvas } from "./EditorCanvas";
import ToolBar from ".//Toolbar/ToolBar";
import { Divider, Typography } from "@material-ui/core";
import { SceneSettingsDrawer } from "./Inspector/SceneSettingsDrawer";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";

export const SceneEditor = memo(() => {
    const history = useHistory();

    const { nodeViewerState } = useNodeViewerState();
    const { projectFilesState } = useProjectFilesState();
    const activeRoot = projectFilesState.activeRoot;

    const [node, setNode] = useState(nodeViewerState.activeNode);
    const [mode, setMode] = useState("select");

    const activeNode = {
        value: node,
        set: (v) => setNode(v)
    };

    const activeMode = {
        value: mode,
        set: (v) => setMode(v)
    };

    useEffect(() => {
        nodeViewerState.activeNode = node;
    }, [node, nodeViewerState])

    return (
        <>
            {node ? (
                <EditorWrapper>
                    <OnBeforeReload />
                    <MenuBar />
                    <ToolBar mode={activeMode} />
                    <EditorCanvas node={activeNode} />
                    <EditorInspector >
                        <Divider />
                        <SceneSettingsDrawer node={activeNode} projectFolder={activeRoot} />
                        {false && (
                            <>
                                <Divider />
                                <Typography variant="h6">
                                    Selection settings
                                </Typography>
                            </>
                        )}
                    </EditorInspector>
                </EditorWrapper >
            ) : (
                history.push("/")
            )}
        </>
    );
});

