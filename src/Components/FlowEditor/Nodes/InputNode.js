import { Paper } from "@material-ui/core";
import { memo } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";
import { hasSourceConnection } from "./NodeUtilities";

export const InputNode = memo(({ data }) => {
    const classes = nodeStyle();

    const { nodeViewerState } = useNodeViewerState();

    const onHasSourceConnection = (connection) => {
        return hasSourceConnection(
            connection,
            nodeViewerState.rfInstance.getElements()
        );
    };

    return (
        <Paper className={classes.root}>
            <NodeContent data={data} />
            <Handle
                type="source"
                className={classes.handleRoot}
                position={Position.Right}
                isValidConnection={onHasSourceConnection}
                id="a"
                style={{ top: "50%" }}
            ></Handle>
        </Paper>
    );
});