import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { CreateFolder, OpenFolder, WriteFile } from "./FileHandling";
import { FindDir, FindFile } from "./MenuBarFunctions";
import { transform } from "lodash";
import { set, get } from "idb-keyval";
import { DiagramModel } from "@projectstorm/react-diagrams";
import { Elements } from "react-flow-renderer";
import { ProjectFilesState } from "../Context/ProjectFiles/ProjectFilesContext";

const defaultFlow = {
    elements: [
        {
            id: "8a62b31a-657d-47b4-9ca8-a8867bd8c703",
            type: "input",
            position: {
                x: 537,
                y: 116,
            },
            data: {
                label: "Start",
            },
        },
    ],
    position: [0, 0],
    zoom: 1,
};

export function NewProject(states: any) {
    const history = useHistory();

    return useCallback(
        async function createFlow() {
            // Handle the input to create a project
            var input = await NewProjectInput();

            if (input === null) {
                return;
            }

            var root = await CreateFolder(input.dirHandle, input.projectName);

            var flowDirHandle = await CreateFolder(root, input.flowName);

            // Create default flow
            const flow = await flowDirHandle.getFileHandle(`${input.flowName}.json`, {
                create: true,
            });

            await WriteFile(flow, JSON.stringify(defaultFlow));

            // Create project config
            const config = await root.getFileHandle("config.json", {
                create: true,
            });

            await WriteFile(config, JSON.stringify({ lastOpened: input.flowName }));

            // Cache the created files
            states.projectFilesState.files = [root, config, flow, flowDirHandle];
            states.projectFilesState.activeRoot = root;

            await RegisterRecentProject(root);

            states.nodeViewerState.model = new DiagramModel();
            states.nodeViewerState.engine.setModel(states.nodeViewerState.model);

            states.setProjectFilesState(states.projectFilesState);
            states.setNodeViewerState(states.nodeViewerState);

            history.push("/flow");
        },
        [states.nodeViewerState, states.projectFilesState]
    );
}

async function NewProjectInput() {
    var projectName = prompt("Please enter the projects name", "Narrative");

    const isProjectName = projectName === "" || projectName === null;
    if (isProjectName) {
        return null;
    }

    var dirHandle = await OpenFolder();

    if (dirHandle === undefined) {
        return null;
    }

    var flowName = prompt("Please enter your first root name", "Root");

    const isFlowName = flowName === "" || flowName === null;
    if (isFlowName) {
        return null;
    }

    return { projectName: projectName, flowName: flowName, dirHandle: dirHandle };
}

async function RegisterRecentProject(file: any) {
    var files = await get("files");

    if (files) {
        register();
    } else {
        files = [];
        register();
    }

    await set("files", files);

    function register() {
        for (let index = 0; index < files.length; index++) {
            const newLocal = files[index];
            if (newLocal.name === file.name) {
                files.splice(index, 1);
            }
        }

        files.unshift(file);
        if (files.length > 10) {
            files.length = 10;
        }
    }
}

export function OpenProject(projectFilesState: ProjectFilesState, setElements: any) {
    const history = useHistory();

    return useCallback(
        async function restoreFlow() {
            const root = await OpenFolder();

            if (root === undefined) {
                return null;
            }

            await LoadProject(root, setElements, projectFilesState);

            history.push("/flow");
        },
        [setElements, transform]
    );
}

export function OpenRecentProject(root: any, projectFilesState: ProjectFilesState, setElements: any) {
    const history = useHistory();

    return useCallback(
        async function restoreFlow() {
            await verifyPermission(root, true);

            await LoadProject(root, setElements, projectFilesState);

            history.push("/flow");
        },
        [projectFilesState]
    );
}

async function LoadProject(root: any, setElements: any, projectFilesState: ProjectFilesState) {
    const { obj: config, handle: configHandle } = await GetObjectFromFile(root, "config");

    const flowDirHandle: any = await FindDir(root, config.lastOpened);

    const { obj: flow, handle: flowHandle } = await GetObjectFromFile(flowDirHandle, config.lastOpened);

    if (flow) {
        const [x = 0, y = 0] = flow.position;
        await LoadElementImages(flowDirHandle, flow.elements);
        setElements(flow.elements || []);
        transform({ x, y, zoom: flow.zoom || 0 });
    }

    // Cache the created files
    projectFilesState.files = [root, configHandle, flowHandle, flowDirHandle];
    projectFilesState.activeRoot = root;

    await RegisterRecentProject(root);
}

async function GetObjectFromFile(root: any, fileName: any) {
    const handle: any = await FindFile(root, `${fileName}.json`);
    const file = await handle.getFile();
    const json = await file.text();
    const obj = await JSON.parse(json);
    return { obj, handle };
}

export async function LoadElementImages(dirHandle: any, elements: Elements<any>) {
    elements.forEach(async (element, index) => {
        const containsKeys = "data" in element && "imageName" in element.data;

        if (containsKeys) {
            let imageHandle = await FindFile(dirHandle, element.data.imageName);
            const imageFile = await imageHandle.getFile();
            element.data.image = URL.createObjectURL(imageFile);
            elements[index] = element;
        }
    });
}

async function verifyPermission(fileHandle, readWrite) {
    const options: any = {};
    if (readWrite) {
        options.mode = "readwrite";
    }
    if ((await fileHandle.queryPermission(options)) === "granted") {
        return true;
    }
    if ((await fileHandle.requestPermission(options)) === "granted") {
        return true;
    }
    return false;
}
