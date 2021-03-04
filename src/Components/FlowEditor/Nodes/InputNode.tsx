import { Paper } from "@material-ui/core";
import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";

export const InputNode = ({ data }) => {
    const classes = nodeStyle();

    return (
        <Paper className={classes.root}>
            <NodeContent data={data} />
            <Handle
                type="source"
                className={classes.handleRoot}
                position={Position.Right}
                id="a"
                style={{ top: "50%" }}
            >
                <p className={classes.handleText}>Left</p>
            </Handle>
        </Paper>
    );
};
