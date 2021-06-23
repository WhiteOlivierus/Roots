export async function SaveFileInFolder(dirHandle, fileHandle) {
    let newFileHandle = await dirHandle.getFileHandle(fileHandle.name, {
        create: true,
    });
    let file = await fileHandle.getFile();

    const writable = await newFileHandle.createWritable();
    await writable.write(file);
    await writable.close();

    return newFileHandle;
}

export async function WriteFile(fileHandle, contents) {
    if (verifyPermission(fileHandle, true)) {
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
}

export async function GetObjectFromFileHandle(fileHandle) {
    if (Array.isArray(fileHandle)) fileHandle = fileHandle[0];

    const file = await fileHandle.getFile();
    const json = await file.text();
    const obj = await JSON.parse(json);
    return { obj, handle: fileHandle };
}

export async function LoadElementImages(dirHandle, elements) {
    elements.forEach(async (element, index) => {
        const containsKeys = "data" in element && "image" in element.data;

        if (containsKeys) {
            let imageHandle = await FindFile(dirHandle, element.data.imageName);
            elements[index].data.imageSrc = await GetImageBlobPath(imageHandle);
        }
    });

    return elements;
}

export function GetImageBlobPath(fileHandle) {
    if (Array.isArray(fileHandle)) fileHandle = fileHandle[0];

    if (!fileHandle) return;

    return fileHandle
        .getFile()
        .then((file) => URL.createObjectURL(file))
        .catch((e) => () => console.log(e.stack));
}

export async function verifyPermission(fileHandle, readWrite) {
    const options = {};
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

export async function FindFile(dirHandle, fileName) {
    return await Find(dirHandle, fileName, "file");
}

export async function FindDir(dirHandle, dirName) {
    return await Find(dirHandle, dirName, "directory");
}

async function Find(dirHandle, fileName, type) {
    try {
        const files = dirHandle.values();
        for await (const entry of files) {
            if (entry.name === fileName && entry.kind === type) {
                return entry;
            }
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function Move(folderHandle, fileHandle) {
    if (Array.isArray(fileHandle)) fileHandle = fileHandle[0];

    let file = await fileHandle.getFile();

    const newFileHandle = await folderHandle.getFileHandle(fileHandle.name, {
        create: true,
    });

    const writable = await newFileHandle.createWritable();
    await writable.write(file);
    await writable.close();
}
