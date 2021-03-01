import { DiagramModel } from "@projectstorm/react-diagrams";

import { WriteFile, WriteNewFile, ReadFile, CreateFolder, OpenFolder } from "./FileHandling";

import { NodeViewerState } from "../Context/NodeViewer/NodeViewerContext";
import { ProjectFilesState } from "../Context/ProjectFiles/ProjectFilesContext";
import { Elements } from "react-flow-renderer";
import { InputZone, ProjectFile, Scene } from "../ProjectFile";

export async function New(nodeViewerState: NodeViewerState) {
    var projectName = await prompt("Please enter the projects name", "Narrative");

    var dirHandle = await OpenFolder();

    var projectStructure = [];

    if (projectName !== null || projectName !== "") {
        projectStructure.push(await CreateFolder(dirHandle, projectName));
        projectStructure.push(await CreateFolder(projectStructure[0], "images"));
        projectStructure.push(await CreateFolder(projectStructure[0], "node_views"));
    } else {
        return [];
    }

    nodeViewerState.model = new DiagramModel();
    nodeViewerState.engine.setModel(nodeViewerState.model);

    projectStructure.push(
        await projectStructure[2].getFileHandle("main_root.json", {
            create: true,
        })
    );

    return projectStructure;
}

export async function CreateProject(nodeViewerState: any, projectFilesState: any) {
    let projectStructure = await New(nodeViewerState);

    projectFilesState.files = projectStructure;
    projectFilesState.activeRoot = projectStructure[2];
}

export async function Save(projectFilesState: ProjectFilesState, flow: any) {
    if (!projectFilesState.projectHandle) projectFilesState.projectHandle = await OpenFolder();

    var serializedModel = JSON.stringify(flow, null, 2);

    const newFileHandle = await projectFilesState.projectHandle.getFileHandle("test.json", { create: true });

    WriteFile(newFileHandle, serializedModel);
}

export async function SaveAs(nodeViewerState: NodeViewerState) {
    nodeViewerState.projectFile = await WriteNewFile();

    if (!nodeViewerState.projectFile) return;

    var serializedModel = JSON.stringify(nodeViewerState.model.serialize(), null, 2);

    await WriteFile(nodeViewerState.projectFile, serializedModel);
}

export async function Load(projectFilesState: ProjectFilesState, fileName: string) {
    if (!projectFilesState.projectHandle) projectFilesState.projectHandle = await OpenFolder();

    let fileHandle = await FindFile(projectFilesState, fileName);
    let file = await fileHandle.getFile();
    let json = await file.text();

    return JSON.parse(json);
}

export async function FindFile(projectFileState: ProjectFilesState, fileName: string) {
    for await (const entry of projectFileState.projectHandle.values()) {
        if (entry.name === fileName) return entry;
    }
}

export async function Export(projectFileState: ProjectFilesState, nodes: any, edges: any) {
    if (!projectFileState.projectHandle) projectFileState.projectHandle = await OpenFolder();

    let projectFile: ProjectFile = new ProjectFile(projectFileState.projectHandle.name);

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

    const buildHandle = await projectFileState.projectHandle.getDirectoryHandle("Build", {
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

    WriteFile(newFileHandle, JSON.stringify(projectFile, null, 2));
}

async function Move(folderHandle: any, fileHandle: any) {
    let file = await fileHandle.getFile();

    const newFileHandle = await folderHandle.getFileHandle(fileHandle.name, { create: true });

    const writable = await newFileHandle.createWritable();
    await writable.write(file);
    await writable.close();
}
