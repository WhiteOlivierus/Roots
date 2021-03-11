import { Paper } from "@material-ui/core";
import React, { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";

export const SceneNode = ({ data }) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";

    const classes = nodeStyle();
    const length = data.outHandles.length - 1;

    function CalculateHandlePosition(length, index, handlePadding = 25) {
        return handlePadding + (100 - (handlePadding * 2) / length) * index;
    }

    return (
        <Paper className={classes.root}>
            <NodeContent data={data} />
            <Handle
                type="target"
                id="a"
                position={Position.Left}
                className={classes.handleRoot}
            />
            {data.outHandles.map((handle, index) => {
                return (
                    <Handle
                        key={index}
                        type="source"
                        position={Position.Right}
                        className={classes.handleRoot}
                        id={letters[index]}
                        style={{
                            top: `${CalculateHandlePosition(length, index)}%`,
                        }}
                    >
                        <p className={classes.handleText}>{handle.text}</p>
                    </Handle>
                );
            })}
        </Paper>
    );
};
