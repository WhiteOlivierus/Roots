export async function SaveObjectToFile(flow, fileHandle) {
    const json = JSON.stringify(flow);

    const writable = await fileHandle.createWritable();
    await writable.write(json);
    await writable.close();
}

export async function LoadObjectFromFile(fileHandle) {
    const file = await fileHandle.getFile();

    const json = await file.text();

    return await JSON.parse(json);
}

export async function verifyPermission(fileHandle, readWrite) {
    const options = { mode: "" };

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
