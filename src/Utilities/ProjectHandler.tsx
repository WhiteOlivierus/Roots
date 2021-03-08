import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { CreateFolder, OpenFolder, WriteFile } from "./FileHandling";
import { FindDir, FindFile } from "./MenuBarFunctions";
import { transform } from "lodash";
import { set, get } from "idb-keyval";
import { Elements } from "react-flow-renderer";
import { defaultFlow } from "./defaultFlow";

export declare const window: any;

export async function NewProject() {
    var input = await NewProjectInput();

    var activeRoot = await CreateFolder(input.dirHandle, input.projectName);

    const config = await activeRoot.getFileHandle("config.json", {
        create: true,
    });

    await WriteFile(config, JSON.stringify({ lastOpened: "" }));

    var { flowFileHandle: activeFlow, flowDirHandle } = await CreateFlow(activeRoot);

    await WriteFile(activeFlow, JSON.stringify(defaultFlow));

    await SetActiveFlowInConfig(activeRoot, flowDirHandle.name);

    await RegisterRecentProject(activeRoot);

    return { activeRoot, activeFlow };
}

export async function OpenProject() {
    const activeRoot = await OpenFolder();

    const { obj: config } = await GetObjectFromFile(activeRoot, "config");

    const flowDirHandle: any = await FindDir(activeRoot, config.lastOpened);

    const activeFlow: any = await FindFile(flowDirHandle, `${config.lastOpened}.json`);

    await RegisterRecentProject(activeRoot);

    return { activeRoot, activeFlow };
}

export async function OpenRecentProject(activeRoot: any) {
    await verifyPermission(activeRoot, true);

    const { obj: config } = await GetObjectFromFile(activeRoot, "config");

    const flowDirHandle: any = await FindDir(activeRoot, config.lastOpened);

    const activeFlow: any = await FindFile(flowDirHandle, `${config.lastOpened}.json`);

    await RegisterRecentProject(activeRoot);

    return { activeRoot, activeFlow };
}

export async function NewFlow(activeRoot: any) {
    var { flowFileHandle: activeFlow, flowDirHandle } = await CreateFlow(activeRoot);

    await WriteFile(activeFlow, JSON.stringify(defaultFlow));

    await SetActiveFlowInConfig(activeRoot, flowDirHandle.name);

    return { activeFlow };
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

            var { flow, flowHandle } = await LoadFlow(root, flowDirHandle, flow.name);

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
            var { flowFileHandle, flowDirHandle } = await CreateFlow(states.projectFilesState.activeRoot);

            await SetActiveFlowInConfig(states.projectFilesState.activeRoot, flowDirHandle.name);

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

async function CreateFlow(root: any) {
    var flowName = prompt("Please enter your first root name", "Root");

    const isFlowName = flowName === "" || flowName === null;
    if (isFlowName) {
        return null;
    }

    if ((await FindDir(root, flowName)) !== null) {
        const overwrite = window.confirm(
            `You are going to overwrite a existing flow with the name ${flowName}. Are you sure you want to do this?`
        );

        if (!overwrite) {
            return;
        }
    }
    var flowDirHandle = await CreateFolder(root, flowName);

    // Create default flow
    const flowFileHandle = await flowDirHandle.getFileHandle(`${flowName}.json`, {
        create: true,
    });

    return { flowFileHandle, flowDirHandle };
}

async function SetActiveFlowInConfig(root: any, flowName: any) {
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

    return { projectName: projectName, dirHandle: dirHandle };
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

async function LoadFlow(root: any, flowDirHandle: any, flowFileName: any) {
    const { obj: flow, handle: flowHandle } = await GetObjectFromFile(flowDirHandle, flowFileName);

    if (flow) {
        await LoadElementImages(root, flow.elements);
        return { flow, flowHandle };
    } else {
        return null;
    }
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
