import { Paper } from "@material-ui/core";
import React, { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";
import { v4 as uuidv4 } from "uuid";

export const SceneNode = ({ data }) => {
    const classes = nodeStyle();
    const length = data.outHandles.length - 1;

    const onCalculateHandlePosition = useCallback(
        (index) => {
            return `${CalculateHandlePosition(length, index)}%`;
        },
        [length]
    );

    return (
        <Paper className={classes.root}>
            <NodeContent data={data} />
            <Handle
                type="target"
                position={Position.Left}
                className={classes.handleRoot}
            />
            {data.outHandles.map((handle, index) => {
                const id = uuidv4();
                return (
                    <Handle
                        key={id}
                        type="source"
                        position={Position.Right}
                        className={classes.handleRoot}
                        id={id}
                        style={{ top: onCalculateHandlePosition(index) }}
                    >
                        <p className={classes.handleText}>{handle.text}</p>
                    </Handle>
                );
            })}
        </Paper>
    );
};

function CalculateHandlePosition(length, index, handlePadding = 25) {
    return handlePadding + (100 - (handlePadding * 2) / length) * index;
}
