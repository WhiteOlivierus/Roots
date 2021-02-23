import { Save, SaveAs, Load, CreateProject } from "../../Utilities/MenuBarFunctions";
import { useNodeViewerState } from "../../Context/NodeViewer/NodeViewerContext";
import { useProjectFilesState } from "../../Context/ProjectFiles/ProjectFilesContext";
import { MenuItem } from "./MenuItem";
import { useStoreActions, useStoreState } from "react-flow-renderer";
import { ReadFile, SaveFileInFolder } from "../../Utilities/FileHandling";

export declare const window: any;

let id = 0;
const getId = () => `dndnode_${id++}`;

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
        // Save(nodeViewerState);
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

    const nodes = useStoreState((store) => store.nodes);
    const setElements = useStoreActions((actions) => actions.setElements);
    const newNode = {
        id: getId(),
        type: "special",
        position: { x: 250, y: 5 },
        data: { image: "path" },
    };

    const SetNewNode = () => {
        setElements(nodes.concat(newNode));
    };
    const CreateNode = async (e: any) => {
        var fileHandle = await ReadFile();

        // save file in project folder that is open
        fileHandle = await SaveFileInFolder(projectFilesState.projectHandle, fileHandle);

        var path = URL.createObjectURL(await fileHandle.getFile());

        newNode.data.image = path;

        SetNewNode();

        nodeViewerState.engine.repaintCanvas();

        setNodeViewerState(nodeViewerState);
    };

    return (
        <ul>
            <MenuItem action={NewProject}>New Project</MenuItem>
            <MenuItem action={SaveProject}>Save Project</MenuItem>
            <MenuItem action={SaveAsProject}>Save As Project</MenuItem>
            <MenuItem action={LoadProject}>Load Project</MenuItem>
            <MenuItem action={CreateNode}>Create Node</MenuItem>
        </ul>
    );
}
