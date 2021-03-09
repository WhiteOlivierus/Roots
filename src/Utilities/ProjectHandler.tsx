import {
    CreateFolder,
    OpenFolder,
    WriteFile,
    FindDir,
    FindFile,
    GetObjectFromFile,
    verifyPermission,
} from "./FileHandler";
import { set, get } from "idb-keyval";
import { defaultFlow } from "./DefaultFlow";
import { CreateFlow } from "./FlowHandler";

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

export async function SetActiveFlowInConfig(root: any, flowName: any) {
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
