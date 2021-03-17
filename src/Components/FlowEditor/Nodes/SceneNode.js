import { Paper } from "@material-ui/core";
import { Handle, Position, useStoreState } from "react-flow-renderer";
import { hasSourceConnection } from "./NodeUtilities";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";
import { memo } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";

export const SceneNode = memo(({ data }) => {
    const classes = nodeStyle();

    const nodes = useStoreState((state) => state.nodes);
    const edges = useStoreState((state) => state.edges);

    const length = data.outHandles.length - 1;

    function CalculateHandlePosition(length, index, handlePadding = 25) {
        return handlePadding + (100 - (handlePadding * 2) / length) * index;
    }

    const onHasSourceConnection = (connection) => {
        return hasSourceConnection(connection, nodes, edges);
    };

    const outHandles = data.outHandles.map((handle, index) => {
        return (
            <Handle
                key={index}
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
