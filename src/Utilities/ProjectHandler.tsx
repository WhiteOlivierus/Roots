import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { CreateFolder, OpenFolder, SaveFileInFolder, WriteFile } from "./FileHandling";
import { FindDir, FindFile } from "./MenuBarFunctions";
import { transform } from "lodash";
import { set, get } from "idb-keyval";
import { DiagramModel } from "@projectstorm/react-diagrams";
import { Elements } from "react-flow-renderer";

export declare const window: any;

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

            states.projectFilesState.activeRoot = root;

            // Create project config
            const config = await root.getFileHandle("config.json", {
                create: true,
            });

            await WriteFile(config, JSON.stringify({ lastOpened: "" }));

            var { flowFileHandle: flowHandle, flowDirHandle } = await CreateFlow(states);

            await WriteFile(flowHandle, JSON.stringify(defaultFlow));

            await SetActiveFlow(states.projectFilesState.activeRoot, flowDirHandle.name);

            // Cache the created files
            states.projectFilesState.activeRoot = root;
            states.projectFilesState.activeFlow = flowHandle;

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

export function OpenProject(states: any, setElements: any) {
    const history = useHistory();

    return useCallback(
        async function restoreFlow() {
            const root = await OpenFolder();

            if (root === undefined) {
                return null;
            }

            const { obj: config, handle: configHandle } = await GetObjectFromFile(root, "config");

            const flowDirHandle: any = await FindDir(root, config.lastOpened);

            var { flow, flowHandle } = await LoadFlow(root, flowDirHandle, setElements, config.lastOpened);

            // Cache the created files
            states.projectFilesState.files = [root, configHandle, flowHandle, flowDirHandle];
            states.projectFilesState.activeRoot = root;
            states.projectFilesState.activeFlow = flowHandle;

            states.setProjectFilesState(states.projectFilesState);
            states.setNodeViewerState(states.nodeViewerState);

            await RegisterRecentProject(root);

            history.push("/flow");
        },
        [setElements, transform]
    );
}

export function OpenRecentProject(states: any, root: any, setElements: any) {
    const history = useHistory();

    return useCallback(
        async function restoreFlow() {
            await verifyPermission(root, true);

            const { obj: config, handle: configHandle } = await GetObjectFromFile(root, "config");

            const flowDirHandle: any = await FindDir(root, config.lastOpened);

            var { flow, flowHandle } = await LoadFlow(root, flowDirHandle, setElements, config.lastOpened);

            // Cache the created files
            states.projectFilesState.files = [root, configHandle, flowHandle, flowDirHandle];
            states.projectFilesState.activeRoot = root;
            states.projectFilesState.activeFlow = flowHandle;

            states.setProjectFilesState(states.projectFilesState);
            states.setNodeViewerState(states.nodeViewerState);

            await RegisterRecentProject(root);

            history.push("/flow");
        },
        [states.projectFilesState]
    );
}

export function NewFlow(states: any) {
    return useCallback(
        async function createFlow() {
            var { flowFileHandle, flowDirHandle } = await CreateFlow(states);

            await SetActiveFlow(states.projectFilesState.activeRoot, flowDirHandle.name);

            await WriteFile(flowFileHandle, JSON.stringify(defaultFlow));

            const { handle: configHandle } = await GetObjectFromFile(states.projectFilesState.activeRoot, "config");
            await WriteFile(configHandle, JSON.stringify({ lastOpened: flowDirHandle.name }));

            states.nodeViewerState.model = new DiagramModel();
            states.nodeViewerState.engine.setModel(states.nodeViewerState.model);

            states.projectFilesState.files.push([flowFileHandle, flowDirHandle]);

            states.setProjectFilesState(states.projectFilesState);
            states.setNodeViewerState(states.nodeViewerState);
        },
        [states.nodeViewerState, states.projectFilesState]
    );
}

export function OpenFlow(states: any, root: any, setElements: any) {
    const history = useHistory();

    return useCallback(
        async function restoreFlow() {
            var flow = await window.showDirectoryPicker();

            if (flow === undefined) {
                return null;
            }

            const flowDirHandle: any = await FindDir(states.projectFilesState.activeRoot, flow.name);

            var { flow, flowHandle } = await LoadFlow(root, flowDirHandle, setElements, flow.name);

            states.projectFilesState.activeFlow = flowHandle;

            states.setProjectFilesState(states.projectFilesState);
            states.setNodeViewerState(states.nodeViewerState);

            const { handle: configHandle } = await GetObjectFromFile(root, "config");
            await WriteFile(configHandle, JSON.stringify({ lastOpened: flow.name }));

            history.push("/flow");
        },
        [setElements, transform]
    );
}

export function SaveFlow(states: any, rfInstance: any) {
    return useCallback(
        async function restoreFlow() {
            const flow = rfInstance.toObject();
            const file = await JSON.stringify(flow);

            const writable = await states.projectFilesState.activeFlow.createWritable();
            await writable.write(file);
            await writable.close();
        },
        [rfInstance]
    );
}

export function SaveFlowAs(states: any, rfInstance: any) {
    return useCallback(
        async function restoreFlow() {
            var { flowFileHandle, flowDirHandle } = await CreateFlow(states);

            await SetActiveFlow(states.projectFilesState.activeRoot, flowDirHandle.name);

            const flow = rfInstance.toObject();
            const file = await JSON.stringify(flow);

            const writable = await flowFileHandle.createWritable();
            await writable.write(file);
            await writable.close();

            states.projectFilesState.activeFlow = flowFileHandle;

            states.setProjectFilesState(states.projectFilesState);
            states.setNodeViewerState(states.nodeViewerState);
        },
        [rfInstance]
    );
}

async function CreateFlow(states: any) {
    var flowName = prompt("Please enter your first root name", "Root");

    const isFlowName = flowName === "" || flowName === null;
    if (isFlowName) {
        return null;
    }

    var flowDirHandle = await CreateFolder(states.projectFilesState.activeRoot, flowName);

    // Create default flow
    const flowFileHandle = await flowDirHandle.getFileHandle(`${flowName}.json`, {
        create: true,
    });

    return { flowFileHandle, flowDirHandle };
}

async function SetActiveFlow(root: any, flowName: any) {
    const { handle: configHandle } = await GetObjectFromFile(root, "config");
    await WriteFile(configHandle, JSON.stringify({ lastOpened: flowName }));
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

    /*     var flowName = prompt("Please enter your first root name", "Root");

    const isFlowName = flowName === "" || flowName === null;
    if (isFlowName) {
        return null;
    } */

    return { projectName: projectName /* , flowName: flowName */, dirHandle: dirHandle };
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

async function LoadFlow(root: any, flowDirHandle: any, setElements: any, flowFileName: any) {
    const { obj: flow, handle: flowHandle } = await GetObjectFromFile(flowDirHandle, flowFileName);

    if (flow) {
        const [x = 0, y = 0] = flow.position;
        await LoadElementImages(root, flow.elements);
        setElements(flow.elements || []);
        transform({ x, y, zoom: flow.zoom || 0 });
    }

    return { flow, flowHandle };
}

async function GetObjectFromFile(root: any, fileName: any) {
    const handle: any = await FindFile(root, `${fileName}.json`);
    const file = await handle.getFile();
    const json = await file.text();
    const obj = await JSON.parse(json);
    return { obj, handle };
}

async function LoadElementImages(dirHandle: any, elements: Elements<any>) {
    elements.forEach(async (element, index) => {
        const containsKeys = "data" in element && "imageName" in element.data;

        if (containsKeys) {
            let imageHandle = await FindFile(dirHandle, element.data.imageName);
            const imageFile = await imageHandle.getFile();
            element.data.image = await URL.createObjectURL(imageFile);
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
