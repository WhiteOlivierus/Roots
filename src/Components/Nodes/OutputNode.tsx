import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeContent } from "./NodeContent";

const customNodeStyles = {
    background: "red",
    color: "#FFF",
    padding: 10,
    width: 160,
    height: 90,
};

export const OutputNode = ({ data }) => {
    return (
        <div style={customNodeStyles}>
            <Handle type="target" position={Position.Left} style={{ borderRadius: 0 }} />
            <NodeContent data={data} />
        </div>
    );
};
