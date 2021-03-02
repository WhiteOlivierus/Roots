import { ProjectFilesState } from "../Context/ProjectFiles/ProjectFilesContext";

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

export async function GetImage(projectFilesState: ProjectFilesState) {
    if (!projectFilesState.projectHandle) projectFilesState.projectHandle = await OpenFolder();

    return await ReadFile();
}

export async function GetImageBlobPath(projectFilesState: ProjectFilesState, fileHandle: any) {
    fileHandle = await SaveFileInFolder(projectFilesState.projectHandle, fileHandle);

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
