import React from "react";

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside style={{ float: "right" }}>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, "scene")} draggable>
                Default Node
            </div>
            <div className="dndnode output" onDragStart={(event) => onDragStart(event, "output")} draggable>
                Output Node
            </div>
        </aside>
    );
};
