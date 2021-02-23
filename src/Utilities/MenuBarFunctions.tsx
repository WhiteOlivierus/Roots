import { DiagramModel } from "@projectstorm/react-diagrams";

import { WriteFile, WriteNewFile, ReadFile, CreateFolder, OpenFolder } from "./FileHandling";

import { NodeViewerState } from "../Context/NodeViewer/NodeViewerContext";
import { ProjectFilesState } from "../Context/ProjectFiles/ProjectFilesContext";

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
