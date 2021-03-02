import React, { useCallback, useState } from "react";
import ReactFlow, { removeElements, addEdge, Controls, MiniMap, ReactFlowProvider, isNode } from "react-flow-renderer";
import Sidebar from "./Sidebar";

import "./ReactFlow.css";
import { NodeTypes } from "./Nodes/NodeTypes";
import { GetImage, GetImageBlobPath } from "../Utilities/FileHandling";
import { ProjectFilesState, useProjectFilesState } from "../Context/ProjectFiles/ProjectFilesContext";

import { transform } from "lodash";
import { Export, Load, Save } from "../Utilities/MenuBarFunctions";

import { v4 as uuidv4 } from "uuid";
import { MenuBar } from "./MenuBar/MenuBar";

const initialElements = [
    {
        id: uuidv4(),
        type: "input",
        position: { x: 100, y: 100 },
        data: { label: "Start" },
    },
];

const DnDFlow = () => {
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
        console.log(type);
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

    const onSave = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();

            Save(projectFilesState, flow);
        }
    }, [reactFlowInstance]);

    const onExport = useCallback(() => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            let nodes = [];
            let edges = [];
            for (let index = 0; index < flow.elements.length; index++) {
                const element = flow.elements[index];
                if (isNode(element)) nodes.push(element);
                else edges.push(element);
            }

            Export(projectFilesState, nodes, edges);
        }
    }, [reactFlowInstance]);

    const MinimapSettings = (node) => {
        switch (node.type) {
            case "input":
                return "red";
            case "scene":
                return "#00ff00";
            case "output":
                return "rgb(0,0,255)";
            default:
                return "#eee";
        }
    };
    return (
        <div>
            <MenuBar />
            <div className="dndflow">
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
                    <Controls />
                    <MiniMap nodeColor={MinimapSettings} nodeStrokeWidth={3} />
                </ReactFlow>
                <div style={{ float: "left", width: 300, bottom: 0, position: "absolute", zIndex: 9 }}>
                    <button onClick={onSave}>save</button>
                    <button onClick={onExport}>export</button>
                </div>
                <Sidebar />
            </div>
        </div>
    );
};

export default DnDFlow;
