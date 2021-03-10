export declare const window: any;

export async function CreateFolder(fileHandle: any, directoryName: String) {
    return await fileHandle.getDirectoryHandle(directoryName, {
        create: true,
    });
}

export async function SaveFileInFolder(dirHandle: any, fileHandle: any) {
    let newFileHandle = await dirHandle.getFileHandle(fileHandle.name, {
        create: true,
    });
    let file = await fileHandle.getFile();

    const writable = await newFileHandle.createWritable();
    await writable.write(file);
    await writable.close();

    return newFileHandle;
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

export async function GetObjectFromFileHandle(handle: any) {
    const file = await handle.getFile();
    const json = await file.text();
    const obj = await JSON.parse(json);
    return { obj, handle };
}

export async function LoadElementImages(dirHandle: any, elements: any) {
    elements.forEach(async (element, index) => {
        const containsKeys = "data" in element && "imageName" in element.data;

        if (containsKeys) {
            let imageHandle = await FindFile(dirHandle, element.data.imageName);
            elements[index].data.image = await GetImageBlobPath(imageHandle);
        }
    });

    return elements;
}

export async function GetImageBlobPath(fileHandle: any) {
    const file = await fileHandle.getFile();
    var path = (window.URL ? URL : webkitURL).createObjectURL(file);
    return path;
}

export async function verifyPermission(fileHandle, readWrite) {
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

export async function FindFile(dirHandle: any, fileName: string) {
    return await Find(dirHandle, fileName, "file");
}

export async function FindDir(dirHandle: any, dirName: string) {
    return await Find(dirHandle, dirName, "directory");
}

async function Find(dirHandle: any, fileName: string, type: any) {
    try {
        for await (const entry of dirHandle.values()) {
            if (entry.name === fileName && entry.kind === type) {
                return entry;
            }
        }
    } catch {
        return null;
    }
}

export async function Move(folderHandle: any, fileHandle: any) {
    let file = await fileHandle.getFile();

    const newFileHandle = await folderHandle.getFileHandle(fileHandle.name, {
        create: true,
    });

    const writable = await newFileHandle.createWritable();
    await writable.write(file);
    await writable.close();
}
