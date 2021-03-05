import React, { useContext, useEffect, useState } from "react";
import ReactFlow, { removeElements, addEdge, Controls, MiniMap } from "react-flow-renderer";
import NodeBar from "./NodeBar";

import { NodeTypes } from "./Nodes/NodeTypes";
import { GetImageBlobPath, SaveFileInFolder } from "../../Utilities/FileHandling";
import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";

import { v4 as uuidv4 } from "uuid";
import { MenuBar } from "./MenuBar";

export declare const window: any;

export let rfInstance = undefined;

export function FlowEditor(props) {
    const [elements, setElements] = useState([]);

    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const onConnect = (params) => setElements((els): any => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) => setElements((els): any => removeElements(elementsToRemove, els));
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const onLoad = (_reactFlowInstance) => {
        setReactFlowInstance(_reactFlowInstance);
        _reactFlowInstance.fitView();
    };

    useEffect(() => {
        window.addEventListener("beforeunload", function (e) {
            e.preventDefault();
            e.returnValue = "";
        });
    });

    function onDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    async function onDrop(event) {
        event.preventDefault();

        const type = event.dataTransfer.getData("application/reactflow");
        const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });

        let fileHandle = await window.showOpenFilePicker();
        fileHandle = fileHandle[0];

        fileHandle = await SaveFileInFolder(projectFilesState.activeRoot, fileHandle);

        const blobURL = await GetImageBlobPath(projectFilesState.activeRoot, fileHandle);

        let newNode = undefined;
        newNode = CreateNode(type, newNode, position, blobURL, fileHandle);

        setProjectFilesState(projectFilesState);

        rfInstance = reactFlowInstance;

        setElements((es) => es.concat(newNode));
    }

    function MinimapSettings(node) {
        switch (node.type) {
            case "start":
                return "green";
            case "scene":
                return "grey";
            case "end":
                return "red";
        }
    }

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
}

function CreateNode(type: any, newNode: any, position: any, blobURL: string, fileHandle: any) {
    switch (type) {
        case "scene":
            newNode = {
                id: uuidv4(),
                type,
                position,
                style: { width: 160, height: 90 },
                data: {
                    label: `${type} node`,
                    image: blobURL,
                    imageName: fileHandle.name,
                    outHandles: [{ text: "Left" }, { text: "Right" }],
                },
            };
            break;

        default:
            newNode = {
                id: uuidv4(),
                type,
                position,
                style: { width: 160, height: 90 },
                data: { label: `${type} node`, image: blobURL, imageName: fileHandle.name },
            };
            break;
    }
    return newNode;
}
