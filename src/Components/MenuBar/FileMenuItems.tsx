import { Save, SaveAs, Load, CreateProject } from "../../Utilities/MenuBarFunctions";
import { useNodeViewerState } from "../../Context/NodeViewer/NodeViewerContext";
import { useProjectFilesState } from "../../Context/ProjectFiles/ProjectFilesContext";
import { MenuItem } from "./MenuItem";

export declare const window: any;

export function FileMenuItems(props: any) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const NewProject = () => {
        console.log("NewProject");
        CreateProject(nodeViewerState, projectFilesState);
        setProjectFilesState(projectFilesState);
        setNodeViewerState(nodeViewerState);
    };

    const SaveProject = () => {
        console.log("SaveProject");
        Save(nodeViewerState);
        setNodeViewerState(nodeViewerState);
    };

    const SaveAsProject = () => {
        console.log("SaveAsProject");
        SaveAs(nodeViewerState);
        setNodeViewerState(nodeViewerState);
    };

    const LoadProject = async () => {
        console.log("LoadProject");

        const dirHandle = await window.showDirectoryPicker();

        projectFilesState.projectHandle = dirHandle;

        setProjectFilesState(projectFilesState);

        // Load(nodeViewerState);
        // setNodeViewerState(nodeViewerState);
    };

    return (
        <ul>
            <MenuItem action={NewProject}>New Project</MenuItem>
            <MenuItem action={SaveProject}>Save Project</MenuItem>
            <MenuItem action={SaveAsProject}>Save As Project</MenuItem>
            <MenuItem action={LoadProject}>Load Project</MenuItem>
        </ul>
    );
}
