import { Paper } from "@material-ui/core";
import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";

const handlePadding = 25;

export const SceneNode = ({ data }) => {
    const classes = nodeStyle();
    const length = data.outHandles.length - 1;

    return (
        <Paper className={classes.root}>
            <NodeContent data={data} />
            <Handle type="target" position={Position.Left} className={classes.handleRoot} />
            {data.outHandles.map((handle, index) => {
                return (
                    <Handle
                        key={index}
                        type="source"
                        position={Position.Right}
                        className={classes.handleRoot}
                        id="a"
                        style={{ top: `${handlePosition(length, index)}%` }}
                    >
                        <p className={classes.handleText}>{handle.text}</p>
                    </Handle>
                );
            })}
        </Paper>
    );
};

function handlePosition(length, index) {
    return handlePadding + (100 - (handlePadding * 2) / length) * index;
}
