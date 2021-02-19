import { useEffect } from "react";

import { New, Save, SaveAs, Load } from "../Utilities/MenuBarFunctions";
import { useNodeViewerState } from "../Context/NodeViewer/NodeViewerContext";
import { CloneSelected } from "./CustomNode";
import {
    ProjectFilesState,
    useProjectFilesState,
} from "../Context/ProjectFiles/ProjectFilesContext";

export function MenuBar(props: any) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            // Save As
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyS") {
                e.preventDefault();
                SaveAs(nodeViewerState);
                setNodeViewerState(nodeViewerState);
                return;
            }

            // Save
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                Save(nodeViewerState);
                setNodeViewerState(nodeViewerState);
                return;
            }

            // Open
            if ((e.ctrlKey || e.metaKey) && e.key === "o") {
                e.preventDefault();
                Load(nodeViewerState);
                setNodeViewerState(nodeViewerState);
                return;
            }

            // Close
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "n") {
                e.preventDefault();
                CreateProject();
                return;
            }
        });
    });

    const CreateProject = async () => {
        let projectStructure = await New(nodeViewerState);

        projectFilesState.files = projectStructure;
        projectFilesState.activeRoot = projectStructure[2];

        setProjectFilesState(projectFilesState);
        setNodeViewerState(nodeViewerState);
    };

    return (
        <div>
            <button
                onClick={() => {
                    CreateProject();
                    setNodeViewerState(nodeViewerState);
                }}
            >
                New
            </button>
            <button
                onClick={() => {
                    Save(nodeViewerState);
                    setNodeViewerState(nodeViewerState);
                }}
            >
                Save
            </button>
            <button
                onClick={() => {
                    SaveAs(nodeViewerState);
                    setNodeViewerState(nodeViewerState);
                }}
            >
                Save As
            </button>
            <button
                onClick={() => {
                    Load(nodeViewerState);
                    setNodeViewerState(nodeViewerState);
                }}
            >
                Load
            </button>
            <CloneSelected
                engine={nodeViewerState.engine}
                model={nodeViewerState.model}
                add={true}
            >
                Add port to node
            </CloneSelected>
            <CloneSelected
                engine={nodeViewerState.engine}
                model={nodeViewerState.model}
                add={false}
            >
                Remove port from node
            </CloneSelected>
        </div>
    );
}
