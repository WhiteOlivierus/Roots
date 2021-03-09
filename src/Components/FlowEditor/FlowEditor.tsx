import { useCallback, useEffect, useState } from "react";
import ReactFlow, { removeElements, addEdge, Controls, MiniMap } from "react-flow-renderer";
import NodeBar from "./NodeBar";
import { useHistory } from "react-router-dom";

import { NodeTypes } from "./Nodes/NodeTypes";
import { SaveFileInFolder } from "../../Utilities/FileHandler";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";

import { MenuBar } from "./MenuBar";
import { defaultFlow } from "../../Utilities/DefaultFlow";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";

import { useZoomPanHelper } from "react-flow-renderer";
import { LoadFlow } from "../../Utilities/FlowHandler";
import { CreateNode } from "./Nodes/NodeFactory";
import React from "react";

export declare const window: any;

export var rfi = undefined;

var initialElements = defaultFlow.elements;

export const FlowEditor = React.memo(function (props) {
    const { fitView } = useZoomPanHelper();

    const history = useHistory();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const [elements, setElements] = useState(initialElements);

    const [rfInstance, setRfInstance] = useState(null);

    const InitialLoad = useCallback(async () => {
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

        nodeViewerState.setElements = setElements;
        nodeViewerState.rfInstance = rfInstance;

        setNodeViewerState(nodeViewerState);

        fitView();
    }, []);

    // On first load
    useEffect(() => {
        try {
            InitialLoad();
        } catch {
            history.push("/");
        }
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
        const position = rfInstance.project({ x: event.clientX, y: event.clientY });

        var fileHandle = await window.showOpenFilePicker();
        fileHandle = fileHandle[0];

        fileHandle = await SaveFileInFolder(projectFilesState.activeRoot, fileHandle);

        var newNode = await CreateNode(type, fileHandle);
        newNode.position = position;

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

    const updateRFInstance = useCallback(() => (rfi = rfInstance), [rfi, rfInstance]);

    return (
        <ReactFlow
            elements={elements}
            nodeTypes={NodeTypes}
            onLoad={setRfInstance}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onDrop={onDrop}
            onMove={updateRFInstance}
            onDragOver={onDragOver}
            deleteKeyCode={46}
        >
            <MenuBar />
            <Controls />
            <NodeBar />
            <MiniMap nodeColor={MinimapSettings} />
        </ReactFlow>
    );
});
