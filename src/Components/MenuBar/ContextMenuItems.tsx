import { useNodeViewerState } from "../../Context/NodeViewer/NodeViewerContext";
import { MenuItem } from "./MenuItem";
import { ReadFile, SaveFileInFolder } from "../../Utilities/FileHandling";
import { useProjectFilesState } from "../../Context/ProjectFiles/ProjectFilesContext";
import { Elements } from "react-flow-renderer";
import { setElements } from "react-flow-renderer/dist/store/actions";
import { useState } from "react";
import React from "react";
import { useStoreState, useStoreActions } from "react-flow-renderer";

let id = 0;
const getId = () => `dndnode_${id++}`;

export function ContextMenuItems(props: any) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const nodes = useStoreState((store) => store.nodes);
    const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);

    const CreateNode = async (e: any) => {
        var fileHandle = await ReadFile();

        // save file in project folder that is open
        fileHandle = await SaveFileInFolder(projectFilesState.projectHandle, fileHandle);

        var path = URL.createObjectURL(await fileHandle.getFile());

        const newNode = {
            id: getId(),
            type: "special",
            position: { x: 250, y: 5 },
            data: { image: path },
        };

        setSelectedElements(function (es) {
            return es.concat(newNode);
        });

        nodeViewerState.engine.repaintCanvas();

        setNodeViewerState(nodeViewerState);
    };

    return (
        <ul>
            <MenuItem action={CreateNode}>Create Scene</MenuItem>
        </ul>
    );
}
