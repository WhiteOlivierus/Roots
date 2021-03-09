import { CreateFolder, WriteFile } from "./FileHandler";
import { FindDir, FindFile, GetObjectFromFileHandle, LoadElementImages } from "./FileHandler";
import { defaultFlow } from "./DefaultFlow";
import { SetActiveFlowInConfig } from "./ProjectHandler";

export declare const window: any;

export async function NewFlow(activeRoot: any) {
    var { flowFileHandle: activeFlow, flowDirHandle } = await CreateFlow(activeRoot);

    await WriteFile(activeFlow, JSON.stringify(defaultFlow));

    await SetActiveFlowInConfig(activeRoot, flowDirHandle.name);

    return { activeFlow };
}

export async function OpenFlow(activeRoot: any) {
    var flowDirHandle = await window.showDirectoryPicker();

    const activeFlow: any = await FindFile(flowDirHandle, `${flowDirHandle.name}.json`);

    var flow = await LoadFlow(activeRoot, activeFlow);

    await SetActiveFlowInConfig(activeRoot, flowDirHandle.name);

    return { activeFlow, flow };
}

export async function SaveFlow(activeFlow: any, rfInstance: any) {
    const flow = rfInstance.toObject();
    const file = await JSON.stringify(flow);

    const writable = await activeFlow.createWritable();
    await writable.write(file);
    await writable.close();
}

export async function SaveFlowAs(activeRoot: any, rfInstance: any) {
    var { flowFileHandle: activeFlow, flowDirHandle } = await CreateFlow(activeRoot);

    SaveFlow(activeFlow, rfInstance);

    await SetActiveFlowInConfig(activeRoot, flowDirHandle.name);

    return activeFlow;
}

export async function LoadFlow(root: any, flowHandle: any) {
    var flow = undefined;
    try {
        const { obj } = await GetObjectFromFileHandle(flowHandle);
        flow = obj;
    } catch {
        return null;
    }

    if (flow) {
        flow.elements = await LoadElementImages(root, flow.elements);
        return flow;
    } else {
        return null;
    }
}
export async function CreateFlow(root: any) {
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
