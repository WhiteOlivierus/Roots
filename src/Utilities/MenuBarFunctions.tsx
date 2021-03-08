import { WriteFile, OpenFolder } from "./FileHandling";

import { ProjectFilesState } from "../Components/ProjectFilesContext/ProjectFilesContext";
import { InputZone, ProjectFile, Scene } from "../ProjectFile";

export async function Load(projectFilesState: any, fileName: string) {
    if (!projectFilesState) projectFilesState = await OpenFolder();

    let fileHandle = await FindFile(projectFilesState, fileName);
    let file = await fileHandle.getFile();
    let json = await file.text();

    return JSON.parse(json);
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

export async function Export(projectFileState: ProjectFilesState, nodes: any, edges: any) {
    let projectFile: ProjectFile = new ProjectFile(projectFileState.activeRoot.name);

    let images = [];

    for (let index = 0; index < nodes.length; index++) {
        const node: any = nodes[index];

        const newScene = new Scene();

        newScene.id = node.id;

        if ("imageName" in node.data) {
            newScene.img = node.data.imageName;

            images.push(await FindFile(projectFileState, node.data.imageName));
        }

        let times = 0;

        for (let index = 0; index < edges.length; index++) {
            const edge: any = edges[index];

            const newInputZone = new InputZone();

            const newLocal_1 = edge.source !== node.id;

            if (newLocal_1) continue;

            newInputZone.sceneId = edge.target;

            if ((times = 0)) {
                newInputZone.svg = "0,0 , 0.5,0 , 0.5,1 , 0,1";
                newInputZone.text = "Left";
            } else {
                newInputZone.svg = "0.5,0 , 1,0 , 1,1 , 0.5,1";
                newInputZone.text = "Right";
            }

            newScene.inputZones.push(newInputZone);

            times++;
        }

        projectFile.scenes.push(newScene);
    }

    const buildHandle = await projectFileState.activeRoot.getDirectoryHandle("Build", {
        create: true,
    });

    const imagesHandle = await buildHandle.getDirectoryHandle("img", {
        create: true,
    });

    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        await Move(imagesHandle, image);
    }

    const newFileHandle = await buildHandle.getFileHandle("game.json", { create: true });

    await WriteFile(newFileHandle, JSON.stringify(projectFile, null, 2));
}

async function Move(folderHandle: any, fileHandle: any) {
    let file = await fileHandle.getFile();

    const newFileHandle = await folderHandle.getFileHandle(fileHandle.name, { create: true });

    const writable = await newFileHandle.createWritable();
    await writable.write(file);
    await writable.close();
}
