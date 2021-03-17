import { Link } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { memo } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";
import { EditorWrapper } from "../EditorWrapper";

export const SceneEditor = memo((props) => {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const node = nodeViewerState.activeNode;

    return (
        <EditorWrapper>
            <OnBeforeReload />
            <Link to="/flow">
                <Tooltip title="Back to flow editor">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            position: "absolute",
                            left: 20,
                            top: 20,
                            zIndex: 1000,
                        }}
                    >
                        <ChevronLeftIcon style={{ fill: "white" }} />
                    </Button>
                </Tooltip>
            </Link>
            <div>
                <img src={node.data.image} style={{ width: "50vw" }} />
                <h1>{node.data.label}</h1>
            </div>
        </EditorWrapper>
    );
});
