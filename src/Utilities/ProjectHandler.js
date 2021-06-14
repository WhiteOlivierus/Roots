/* eslint-disable prettier/prettier */
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

export async function NewProject(values) {
    const activeRoot = await values.projectFolder.getDirectoryHandle(
        values.projectName,
        {
            create: true,
        }
    );

    if (activeRoot === undefined) return null;

    const { flowFileHandle: activeFlow, flowDirHandle } = await CreateFlow(
        activeRoot,
        "Flow"
    );

    await WriteFile(activeFlow, JSON.stringify(defaultFlow));

    const config = await activeRoot.getFileHandle("config.json", {
        create: true,
    });

    const newLocal = JSON.stringify({
        ...values,
        lastOpened: flowDirHandle.name,
        projectFolder: values.projectFolder.name,
        projectLogo: values.projectLogo.name | "",
    });

    await WriteFile(config, newLocal);

    await RegisterRecentProject({
        fileHandle: activeRoot,
        timeStamp: currentDateAndTime(),
    });

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

    await UnRegisterRecentProject(activeRoot.name);

    await RegisterRecentProject({
        fileHandle: activeRoot,
        timeStamp: currentDateAndTime(),
    });

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

        await UnRegisterRecentProject(activeRoot.name);

        await RegisterRecentProject({
            fileHandle: activeRoot,
            timeStamp: currentDateAndTime(),
        });

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
    let files = await get("files") || [];

    register();

    await set("files", files);

    function register() {
        for (let index = 0; index < files.length; index++) {
            const newLocal = files[index];
            if (
                newLocal.name === file.name &&
                newLocal.name === file.timeStamp
            ) {
                files.splice(index, 1);
            }
        }

        files.unshift(file);
        if (files.length > 10) {
            files.length = 10;
        }
    }
}
const currentDateAndTime = () => {
    const dt = new Date();
    return `${(dt.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${dt
            .getDate()
            .toString()
            .padStart(2, "0")}/${dt
                .getFullYear()
                .toString()
                .padStart(4, "0")} ${dt
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${dt
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}:${dt.getSeconds().toString().padStart(2, "0")}`;
};

export async function UnRegisterRecentProject(name) {
    let files = await get("files") || [];

    const index = files.findIndex((element) => {
        return element.fileHandle.name === name;
    });

    if (index === -1) return;

    files.splice(index, 1);

    await set("files", files);
}
