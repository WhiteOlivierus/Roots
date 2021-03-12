import {
    CreateFolder,
    WriteFile,
    FindDir,
    FindFile,
    verifyPermission,
    GetObjectFromFileHandle,
} from "./FileHandler";
import { set, get } from "idb-keyval";
import { defaultFlow } from "./DefaultFlow";
import { CreateFlow } from "./FlowHandler";

export declare const window: any;

export async function NewProject() {
    var activeRoot = await window.showDirectoryPicker();

    if (activeRoot === undefined) {
        return null;
    }

    const config = await activeRoot.getFileHandle("config.json", {
        create: true,
    });

    await WriteFile(config, JSON.stringify({ lastOpened: "" }));

    var { flowFileHandle: activeFlow, flowDirHandle } = await CreateFlow(
        activeRoot
    );

    await WriteFile(activeFlow, JSON.stringify(defaultFlow));

    await SetActiveFlowInConfig(activeRoot, flowDirHandle.name);

    await RegisterRecentProject(activeRoot);

    return { activeRoot, activeFlow };
}

export async function OpenProject() {
    const activeRoot = await window.showDirectoryPicker();

    const handle: any = await FindFile(activeRoot, `config.json`);

    const { obj: config } = await GetObjectFromFileHandle(handle);

    const flowDirHandle: any = await FindDir(activeRoot, config.lastOpened);

    const activeFlow: any = await FindFile(
        flowDirHandle,
        `${config.lastOpened}.json`
    );

    await RegisterRecentProject(activeRoot);

    return { activeRoot, activeFlow };
}

export async function OpenRecentProject(activeRoot: any) {
    await verifyPermission(activeRoot, true);

    const handle: any = await FindFile(activeRoot, `config.json`);

    const { obj: config } = await GetObjectFromFileHandle(handle);

    const flowDirHandle: any = await FindDir(activeRoot, config.lastOpened);

    const activeFlow: any = await FindFile(
        flowDirHandle,
        `${config.lastOpened}.json`
    );

    await RegisterRecentProject(activeRoot);

    return { activeRoot, activeFlow };
}

export async function SetActiveFlowInConfig(activeRoot: any, flowName: any) {
    const configHandle: any = await FindFile(activeRoot, `config.json`);

    await WriteFile(configHandle, JSON.stringify({ lastOpened: flowName }));
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
