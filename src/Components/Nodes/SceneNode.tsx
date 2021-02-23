import React from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeContent } from "./NodeContent";

const customNodeStyles = {
    background: "#9CA8B3",
    color: "#FFF",
    padding: 10,
    width: 160,
    height: 90,
};

export const SceneNode = ({ data }) => {
    return (
        <div style={customNodeStyles}>
            <Handle type="target" position={Position.Left} style={{ borderRadius: 0 }} />
            <NodeContent data={data} />
            <Handle type="source" position={Position.Right} id="a" style={{ top: "30%", borderRadius: 0 }} />
            <Handle type="source" position={Position.Right} id="b" style={{ top: "70%", borderRadius: 0 }} />
        </div>
    );
};
