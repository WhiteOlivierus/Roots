import { Paper } from "@material-ui/core";
import { memo } from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";

export const OutputNode = memo(({ data }) => {
    const classes = nodeStyle();
    return (
        <Paper className={classes.root}>
            <NodeContent data={data} />
            <Handle id="a" type="target" position={Position.Left} />
        </Paper>
    );
});
