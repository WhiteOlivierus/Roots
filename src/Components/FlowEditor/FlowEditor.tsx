import { useEffect, useState } from "react";
import ReactFlow, { removeElements, addEdge, Controls, MiniMap } from "react-flow-renderer";
import NodeBar from "./NodeBar";
import { useHistory } from "react-router-dom";

import { NodeTypes } from "./Nodes/NodeTypes";
import { GetImageBlobPath, SaveFileInFolder } from "../../Utilities/FileHandler";
import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";

import { v4 as uuidv4 } from "uuid";
import { MenuBar } from "./MenuBar";
import { defaultFlow } from "../../Utilities/DefaultFlow";
import { useNodeViewerState } from "./Context/NodeViewerContext";

import { useZoomPanHelper } from "react-flow-renderer";
import { LoadFlow } from "../../Utilities/FlowHandler";

export declare const window: any;

export var rfi = undefined;

var initialElements = defaultFlow.elements;

export function FlowEditor(props) {
    const { fitView } = useZoomPanHelper();

    const history = useHistory();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const [elements, setElements] = useState(initialElements);

    const [rfInstance, setRfInstance] = useState(null);

    // On first load
    useEffect(() => {
        async function Action() {
            if (projectFilesState.activeRoot === undefined || projectFilesState.activeFlow == undefined) {
                history.push("/");
            }

            var flow = await LoadFlow(projectFilesState.activeRoot, projectFilesState.activeFlow);

            if (flow) {
                initialElements = flow.elements;
            } else {
                history.push("/");
            }

            setElements(elements);
            setElements(initialElements);
        }
        try {
            Action();
        } catch {
            history.push("/");
        }

        nodeViewerState.setElements = setElements;
        nodeViewerState.rfInstance = rfInstance;

        setNodeViewerState(nodeViewerState);

        fitView();
    }, []);

    function onConnect(params) {
        return setElements(function (els): any {
            return addEdge(params, els);
        });
    }
    function onElementsRemove(elementsToRemove) {
        return setElements((els): any => {
            return removeElements(elementsToRemove, els);
        });
    }

    function onDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    async function onDrop(event) {
        event.preventDefault();

        const type = event.dataTransfer.getData("application/reactflow");
        const position = rfInstance.project({ x: event.clientX, y: event.clientY - 40 });

        let fileHandle = await window.showOpenFilePicker();
        fileHandle = fileHandle[0];

        fileHandle = await SaveFileInFolder(projectFilesState.activeRoot, fileHandle);

        const blobURL = await GetImageBlobPath(projectFilesState.activeRoot, fileHandle);

        let newNode = undefined;
        newNode = CreateNode(type, newNode, position, blobURL, fileHandle);

        setProjectFilesState(projectFilesState);

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
            onLoad={setRfInstance}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onDrop={onDrop}
            onMove={() => (rfi = rfInstance)}
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
