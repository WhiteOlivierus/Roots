import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeContent } from "./NodeContent";

const customNodeStyles = {
    background: "green",
    color: "#FFF",
    padding: 10,
    width: 160,
    height: 90,
};

export const InputNode = ({ data }) => {
    return (
        <div style={customNodeStyles}>
            <NodeContent data={data} />
            <Handle type="source" position={Position.Right} id="a" style={{ top: "30%", borderRadius: 0 }} />
            <Handle type="source" position={Position.Right} id="b" style={{ top: "70%", borderRadius: 0 }} />
        </div>
    );
};
