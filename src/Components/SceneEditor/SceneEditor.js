import { Link, useHistory } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { memo, useEffect, useState } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";
import { EditorWrapper } from "../EditorWrapper";
import { MenuBar } from "../FlowEditor/MenuBar/MenuBar";
import { EditorTools } from "./EditorTools";
import { EditorCanvas } from "./EditorCanvas";

export const SceneEditor = memo(() => {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const history = useHistory();

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
                    <BackButton />
                    <EditorCanvas node={node} />
                    <EditorTools node={setNode} />
                </EditorWrapper>
            ) : (
                history.push("/")
            )}
        </>
    );
});

const BackButton = memo(() => {
    const style = {
        position: "absolute",
        left: 20,
        top: 80,
        zIndex: 1000,
    };

    return (
        <Link to="/flow">
            <Tooltip title="Back to flow editor">
                <Button variant="contained" color="primary" style={style}>
                    <ChevronLeftIcon style={{ fill: "white" }} />
                </Button>
            </Tooltip>
        </Link>
    );
});
