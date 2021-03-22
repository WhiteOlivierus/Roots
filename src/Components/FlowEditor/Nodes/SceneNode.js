import { Paper } from "@material-ui/core";
import { Handle, Position } from "react-flow-renderer";
import { hasSourceConnection } from "./NodeUtilities";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";
import { memo } from "react";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";
import short from "short-uuid";

const letters = "abcdefghijklmnopqrstuvwxyz";

export const SceneNode = memo(({ data }) => {
    const classes = nodeStyle();

    const { nodeViewerState } = useNodeViewerState();

    const length = data.outHandles.length - 1;

    const CalculateHandlePosition = (length, index, handlePadding = 25) => {
        return handlePadding + (100 - (handlePadding * 2) / length) * index;
    };

    const onHasSourceConnection = (connection) => {
        return hasSourceConnection(
            connection,
            nodeViewerState.rfInstance.getElements()
        );
    };

    const outHandles = data.outHandles.map((handle, index) => {
        return (
            <Handle
                key={short.generate()}
                type="source"
                position={Position.Right}
                className={classes.handleRoot}
                isValidConnection={onHasSourceConnection}
                id={letters[index]}
                style={{
                    top: `${CalculateHandlePosition(length, index)}%`,
                }}
            >
                <p className={classes.handleText}>{handle.text}</p>
            </Handle>
        );
    });

    return (
        <Paper className={classes.root}>
            <Handle
                type="target"
                id="a"
                isValidConnection={onHasSourceConnection}
                position={Position.Left}
                className={classes.handleRoot}
            />
            <NodeContent data={data} />
            {outHandles}
        </Paper>
    );
});
