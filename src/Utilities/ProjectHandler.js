import {
    WriteFile,
    FindDir,
    FindFile,
    verifyPermission,
    GetObjectFromFileHandle,
} from "./FileHandler";
import { set, get } from "idb-keyval";
import { defaultFlow } from "./DefaultFlow";
import { CreateFlow } from "./FlowHandler";

export async function NewProject({ projectFolder: activeRoot }) {
    if (activeRoot === undefined) {
        return null;
    }

    verifyPermission(activeRoot, true);

    const config = await activeRoot.getFileHandle("config.json", {
        create: true,
    });

    await WriteFile(config, JSON.stringify({ lastOpened: "" }));

    const { flowFileHandle: activeFlow, flowDirHandle } = await CreateFlow(
        activeRoot,
        "Flow"
    );

    await WriteFile(activeFlow, JSON.stringify(defaultFlow));

    await SetActiveFlowInConfig(activeRoot, flowDirHandle.name);

    await RegisterRecentProject(activeRoot);

    return { activeRoot, activeFlow };
}

export async function OpenProject() {
    const activeRoot = await window.showDirectoryPicker();

    const handle = await FindFile(activeRoot, `config.json`);

    const { obj: config } = await GetObjectFromFileHandle(handle);

    const flowDirHandle = await FindDir(activeRoot, config.lastOpened);

    const activeFlow = await FindFile(
        flowDirHandle,
        `${config.lastOpened}.json`
    );

    await RegisterRecentProject(activeRoot);

    return { activeRoot, activeFlow };
}

export async function OpenRecentProject(activeRoot) {
    try {
        await verifyPermission(activeRoot, true);

        const handle = await FindFile(activeRoot, `config.json`);

        const { obj: config } = await GetObjectFromFileHandle(handle);

        const flowDirHandle = await FindDir(activeRoot, config.lastOpened);

        const activeFlow = await FindFile(
            flowDirHandle,
            `${config.lastOpened}.json`
        );

        await RegisterRecentProject(activeRoot);

        return { activeRoot, activeFlow };
    } catch {
        await UnRegisterRecentProject(activeRoot.name);
        throw Error(`Project ${activeRoot.name} does not exist`);
    }
}

export async function SetActiveFlowInConfig(activeRoot, flowName) {
    const configHandle = await FindFile(activeRoot, `config.json`);

    await WriteFile(configHandle, JSON.stringify({ lastOpened: flowName }));
}

async function RegisterRecentProject(file) {
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

export async function UnRegisterRecentProject(name) {
    var files = await get("files");

    const index = files.findIndex((element) => {
        return element.name === name;
    });

    if (index === -1) return;

    files.splice(index, 1);

    await set("files", files);
}
