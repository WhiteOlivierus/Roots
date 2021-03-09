export declare const window: any;

export async function CreateFolder(fileHandle: any, directoryName: String) {
    return await fileHandle.getDirectoryHandle(directoryName, {
        create: true,
    });
}

export async function SaveFileInFolder(dirHandle: any, fileHandle: any) {
    let newFileHandle = await dirHandle.getFileHandle(fileHandle.name, { create: true });
    let file = await fileHandle.getFile();

    const writable = await newFileHandle.createWritable();
    await writable.write(file);
    await writable.close();

    return newFileHandle;
}

export async function OpenFolder() {
    return await window.showDirectoryPicker();
}

export async function ReadFolder(dirHandle: any) {
    var fileHandles = [];

    for await (const fileHandle of dirHandle.values()) {
        fileHandles.push(fileHandle);
    }

    return fileHandles;
}

export async function ReadProject(dirHandle: any) {
    if (dirHandle.values().contains()) console.log("It's a project");
}

export async function GetImageBlobPath(projectFilesState: any, fileHandle: any) {
    var path = URL.createObjectURL(await fileHandle.getFile());
    return path;
}

export async function HandleHoverFile(fileHandle: any) {
    const entry = await fileHandle.getAsFileSystemHandle();
    if (entry.kind === "directory") {
        ReadProject(entry);
    } else {
        var s = await entry.getFile();
        if (s.type.includes("image/")) {
            console.log("thats a image");
        } else {
            console.log(s.type);
        }
        console.log("Got a file ");
    }
}

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

export async function GetObjectFromFile(root: any, fileName: any) {
    const handle: any = await FindFile(root, `${fileName}.json`);
    return await GetObjectFromFileHandle(handle);
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
            const imageFile = await imageHandle.getFile();
            element.data.image = await URL.createObjectURL(imageFile);
            elements[index] = element;
        }
    });
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

    const newFileHandle = await folderHandle.getFileHandle(fileHandle.name, { create: true });

    const writable = await newFileHandle.createWritable();
    await writable.write(file);
    await writable.close();
}
