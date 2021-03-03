import React, { useRef, useState } from "react";
import ReactFlow, { removeElements, addEdge, Controls, MiniMap } from "react-flow-renderer";
import NodeBar from "./NodeBar";

import { NodeTypes } from "./Nodes/NodeTypes";
import { GetImage, GetImageBlobPath } from "../../Utilities/FileHandling";
import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";

import { v4 as uuidv4 } from "uuid";
import { MenuBar } from "./MenuBar";

const initialElements = [
    {
        id: uuidv4(),
        type: "input",
        position: { x: 100, y: 100 },
        data: { label: "Start" },
    },
];

export const FlowEditor = () => {
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);
    const onConnect = (params) => setElements((els): any => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) => setElements((els): any => removeElements(elementsToRemove, els));
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };

    const onDrop = async (event) => {
        event.preventDefault();

        const type = event.dataTransfer.getData("application/reactflow");
        const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });

        const fileHandle = await GetImage(projectFilesState);

        const newLocal = await GetImageBlobPath(projectFilesState, fileHandle);
        const newNode = {
            id: uuidv4(),
            type,
            position,
            data: { label: `${type} node`, image: newLocal, imageName: fileHandle.name },
        };

        setProjectFilesState(projectFilesState);

        setElements((es) => es.concat(newNode));
    };

    const MinimapSettings = (node) => {
        switch (node.type) {
            case "input":
                return "green";
            case "scene":
                return "grey";
            case "output":
                return "red";
        }
    };

    return (
        <ReactFlow
            elements={elements}
            nodeTypes={NodeTypes}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            deleteKeyCode={46}
        >
            <MenuBar />
            <Controls />
            <NodeBar />
            <MiniMap nodeColor={MinimapSettings} />
        </ReactFlow>
    );
};
