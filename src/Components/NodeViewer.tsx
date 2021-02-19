import { DefaultNodeModel } from "@projectstorm/react-diagrams";

import { CanvasWidget } from "@projectstorm/react-canvas-core";

import { useNodeViewerState } from "../Context/NodeViewer/NodeViewerContext";
import { useEffect } from "react";
import { HandleHoverFile } from "../Utilities/FileHandling";

export declare const window: any;

export function NodeViewer(props: any) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    useEffect(() => {
        window.addEventListener("dragover", (e: any) => {
            e.preventDefault();
            console.log("Got a file dragged over");
        });

        window.addEventListener("drop", async (e: any) => {
            e.preventDefault();
            for (const item of e.dataTransfer.items) {
                HandleHoverFile(item);
            }
        });
    });

    var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
    node1.addInPort("In");
    var port1 = node1.addOutPort("Out");
    node1.setPosition(100, 100);

    var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
    var port2 = node2.addInPort("In");
    node2.addOutPort("Out");
    node2.setPosition(400, 100);

    var link1 = port1.link(port2);

    nodeViewerState.model.addAll(node1, node2, link1);

    nodeViewerState.engine.setModel(nodeViewerState.model);

    setNodeViewerState(nodeViewerState);

    return <CanvasWidget className="canvas" engine={nodeViewerState.engine} />;
}
