import { get, set } from "idb-keyval";
import { removeElements } from "react-flow-renderer";

import { verifyPermission, LoadObjectFromFile, SaveObjectToFile } from "./FileHandler";

export const flowKey = "example-flow";

export declare const window: any;

export const filePickerOptions = {
    types: [
        {
            description: "Flow files",
            accept: {
                "text/plain": [".json"],
            },
        },
    ],
};

export async function NewFlow(setElements, elements) {
    var fileHandle = await VerifyFileHandle(undefined, ShowSaveFilePicker);

    await SaveObjectToFile({}, fileHandle);

    await set(flowKey, fileHandle);

    setElements((els) => removeElements(elements, els));
}

export async function SaveFlow(rfInstance) {
    var fileHandle = await get(flowKey);

    fileHandle = await VerifyFileHandle(fileHandle, ShowSaveFilePicker);

    await SaveElements(rfInstance, fileHandle);
}

export async function SaveFlowAs(rfInstance) {
    var fileHandle = await VerifyFileHandle(undefined, ShowSaveFilePicker);

    await SaveElements(rfInstance, fileHandle);

    await set(flowKey, fileHandle);
}

export async function OpenFlow() {
    var fileHandle = await VerifyFileHandle(undefined, ShowOpenFilePicker);
    fileHandle = fileHandle[0];

    await set(flowKey, fileHandle);

    return await LoadObjectFromFile(fileHandle);
}

export async function LoadFlow(fileHandle) {
    try {
        await verifyPermission(fileHandle, true);
        return await LoadObjectFromFile(fileHandle);
    } catch {
        return null;
    }
}

async function ShowOpenFilePicker() {
    return await window.showOpenFilePicker(filePickerOptions);
}

async function ShowSaveFilePicker() {
    return await window.showSaveFilePicker(filePickerOptions);
}

async function VerifyFileHandle(fileHandle, action) {
    try {
        await verifyPermission(fileHandle, true);
    } catch {
        fileHandle = await action();
    }

    return fileHandle;
}

async function SaveElements(rfInstance, fileHandle) {
    if (rfInstance) {
        const flow = rfInstance.toObject();

        await SaveObjectToFile(flow, fileHandle);
    } else {
        console.log("Something went horrible wrong");
    }
}
