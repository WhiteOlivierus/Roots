export declare const window: any;

export async function ReadFile(): Promise<any> {
    try {
        let [fileHandle] = await window.showOpenFilePicker();
        return fileHandle;
    } catch (ex) {
        if (ex.name === "AbortError") {
            return;
        }
    }
}
export async function WriteFile(fileHandle: any, contents: any) {
    if (fileHandle.createWriter) {
        const writer = await fileHandle.createWriter();
        await writer.write(0, contents);
        await writer.close();
        return;
    }
    const writable = await fileHandle.createWritable();
    await writable.write(contents);
    await writable.close();
}
export async function WriteNewFile() {
    const options = {
        types: [
            {
                description: "Json file",
                accept: {
                    "application/json": [".json"],
                },
            },
        ],
    };
    try {
        return await window.showSaveFilePicker(options);
    } catch (ex) {
        if (ex.name === "AbortError") {
            return;
        }
    }
}

async function verifyPermission(fileHandle: any, readWrite: any) {
    const opts = { writable: false, mode: "" };
    if (readWrite) {
        opts.writable = true;
        opts.mode = "readwrite";
    }
    if ((await fileHandle.queryPermission(opts)) === "granted") {
        return true;
    }
    if ((await fileHandle.requestPermission(opts)) === "granted") {
        return true;
    }
    return false;
}
