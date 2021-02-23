import React, { useCallback, useState } from "react";
import ReactFlow, { removeElements, addEdge, Controls, MiniMap, ReactFlowProvider } from "react-flow-renderer";
import Sidebar from "./Sidebar";

import "./ReactFlow.css";
import { NodeTypes } from "./Nodes/NodeTypes";
import { GetImage, GetImageBlobPath, LoadImages } from "../Utilities/FileHandling";
import { useProjectFilesState } from "../Context/ProjectFiles/ProjectFilesContext";
import { getId } from "./NodeIDTracker";

import { transform } from "lodash";
import { Load, Save } from "../Utilities/MenuBarFunctions";

const flowKey = "example-flow";

const initialElements = [
    {
        id: getId(),
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
            id: getId(),
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

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow: any = await Load(projectFilesState, "test.json");
            if (flow) {
                const [x = 0, y = 0] = flow.position;
                await LoadImages(projectFilesState, flow.elements);
                setElements(flow.elements || []);
                transform({ x, y, zoom: flow.zoom || 0 });
            }
        };
        restoreFlow();
    }, [setElements, transform]);

    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <div className="reactflow-wrapper">
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
                    </ReactFlow>
                    <div style={{ float: "left", width: 300, bottom: 0, position: "absolute", zIndex: 9 }}>
                        <button onClick={onSave}>save</button>
                        <button onClick={onRestore}>restore</button>
                    </div>
                </div>
                <Sidebar />
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
