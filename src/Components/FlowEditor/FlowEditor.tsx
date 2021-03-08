import { useEffect, useState } from "react";
import ReactFlow, { removeElements, addEdge, Controls, MiniMap } from "react-flow-renderer";
import NodeBar from "./NodeBar";
import { useHistory } from "react-router-dom";

import { NodeTypes } from "./Nodes/NodeTypes";
import { GetImageBlobPath, SaveFileInFolder } from "../../Utilities/FileHandling";
import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";

import { v4 as uuidv4 } from "uuid";
import { MenuBar } from "./MenuBar";
import { defaultFlow } from "../../Utilities/defaultFlow";
import { LoadFlow } from "../../Utilities/FlowHandler";
import { useNodeViewerState } from "./Context/NodeViewerContext";

export declare const window: any;

export var rfInstance = undefined;

export function FlowEditor(props) {
    const history = useHistory();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    var initialElements = defaultFlow.elements;

    useEffect(() => {
        async function Action() {
            var flow = await LoadFlow(projectFilesState.activeFlow);
            if (flow) {
                initialElements = flow.elements;
            } else {
                history.push("/");
            }

            setElements(elements);
            setElements(initialElements);
        }
        Action();

        nodeViewerState.setElements = setElements;

        setNodeViewerState(nodeViewerState);
    }, []);

    const [elements, setElements] = useState(initialElements);

    const [rfInstance, setRfInstance] = useState(null);

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
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
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
