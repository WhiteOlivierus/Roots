import { Paper } from "@material-ui/core";
import { Handle, Position } from "react-flow-renderer";
import { hasSourceConnection } from "./NodeUtilities";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";
import { memo } from "react";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";
import short from "short-uuid";

export const SceneNode = memo(({ data }) => {
    const classes = nodeStyle();

    const { nodeViewerState } = useNodeViewerState();

    const length = data.zones && data.zones.length - 1;

    const CalculateHandlePosition = (length, index, handlePadding = 25) => {
        const part = ((100 - (handlePadding * 2)) / length);
        return handlePadding + (part * index);
    };

    const onHasSourceConnection = (connection) => {
        return hasSourceConnection(
            connection,
            nodeViewerState.rfInstance.getElements()
        );
    };

    const outHandles = data.zones && data.zones.map((handle, index) => {
        return (
            <Handle
                key={short.generate()}
                type="source"
                position={Position.Right}
                className={classes.handleRoot}
                isValidConnection={onHasSourceConnection}
                id={handle.id}
                style={{
                    top: `${CalculateHandlePosition(length, index)}%`,
                }}
            >
                <p className={classes.handleText}>{handle.id}</p>
            </Handle>
        );
    });

    return (
        <Paper className={classes.root}>
            <NodeContent data={data} />
            <Handle
                type="target"
                id="a"
                isValidConnection={onHasSourceConnection}
                position={Position.Left}
                className={classes.handleRoot}
            />
            {outHandles}
        </Paper>
    );
});
