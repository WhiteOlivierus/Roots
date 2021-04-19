import { CreateFolder, WriteFile } from "./FileHandler";
import { FindDir, FindFile, GetObjectFromFileHandle } from "./FileHandler";
import { defaultFlow } from "./DefaultFlow";
import { SetActiveFlowInConfig } from "./ProjectHandler";

export async function NewFlow(activeRoot) {
    var { flowFileHandle: activeFlow, flowDirHandle } = await CreateFlow(
        activeRoot
    );

    await WriteFile(activeFlow, JSON.stringify(defaultFlow));

    await SetActiveFlowInConfig(activeRoot, flowDirHandle.name);

    return { activeFlow };
}

export async function OpenFlow(activeRoot) {
    var flowDirHandle = await window.showDirectoryPicker();

    const activeFlow = await FindFile(
        flowDirHandle,
        `${flowDirHandle.name}.json`
    );

    var flow = await LoadFlow(activeRoot, activeFlow);

    await SetActiveFlowInConfig(activeRoot, flowDirHandle.name);

    return { activeFlow, flow };
}

export async function SaveFlow(activeFlow, rfInstance) {
    const flow = rfInstance.toObject();

    var flowCopy = clone(flow);

    flowCopy.elements.map((element, index) => {
        if ("data" in element && "imageSrc" in element.data) {
            delete element.data["imageSrc"];
            flowCopy.elements[index] = element;
        }
    });

    const file = await JSON.stringify(flowCopy);

    await WriteFile(activeFlow, file);
}

export async function SaveFlowAs(activeRoot, rfInstance) {
    var { flowFileHandle: activeFlow, flowDirHandle } = await CreateFlow(
        activeRoot
    );

    SaveFlow(activeFlow, rfInstance);

    await SetActiveFlowInConfig(activeRoot, flowDirHandle.name);

    return activeFlow;
}

export async function LoadFlow(root, flowHandle) {
    const { obj: flow } = await GetObjectFromFileHandle(flowHandle);
    return flow;
}

export async function CreateFlow(root) {
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
    const flowFileHandle = await flowDirHandle.getFileHandle(
        `${flowName}.json`,
        {
            create: true,
        }
    );

    return { flowFileHandle, flowDirHandle };
}

export function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
