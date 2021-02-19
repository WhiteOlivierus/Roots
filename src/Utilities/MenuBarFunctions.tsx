import { DiagramModel } from "@projectstorm/react-diagrams";

import {
    WriteFile,
    WriteNewFile,
    ReadFile,
    CreateFolder,
    OpenFolder,
} from "./FileHandeling";

import { NodeViewerState } from "../Context/NodeViewer/NodeViewerContext";

export async function New(nodeViewerState: NodeViewerState) {
    var projectName = await prompt(
        "Please enter the projects name",
        "Narrative"
    );

    var dirHandle = await OpenFolder();

    var projectStructure = [];

    if (projectName !== null || projectName !== "") {
        projectStructure.push(await CreateFolder(dirHandle, projectName));
        projectStructure.push(
            await CreateFolder(projectStructure[0], "images")
        );
        projectStructure.push(
            await CreateFolder(projectStructure[0], "node_views")
        );
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

export async function Save(nodeViewerState: NodeViewerState) {
    var serializedModel = JSON.stringify(
        nodeViewerState.model.serialize(),
        null,
        2
    );

    if (nodeViewerState.projectFile !== undefined) {
        await WriteFile(nodeViewerState.projectFile, serializedModel);
    } else {
        await SaveAs(nodeViewerState);
    }
}

export async function SaveAs(nodeViewerState: NodeViewerState) {
    nodeViewerState.projectFile = await WriteNewFile();

    if (!nodeViewerState.projectFile) return;

    var serializedModel = JSON.stringify(
        nodeViewerState.model.serialize(),
        null,
        2
    );

    await WriteFile(nodeViewerState.projectFile, serializedModel);
}

export async function Load(nodeViewerState: NodeViewerState) {
    nodeViewerState.projectFile = await ReadFile();

    if (!nodeViewerState.projectFile) return;

    nodeViewerState.model = new DiagramModel();

    var file = await nodeViewerState.projectFile.getFile();
    var json = JSON.parse(await file.text());
    nodeViewerState.model.deserializeModel(json, nodeViewerState.engine);
    nodeViewerState.engine.setModel(nodeViewerState.model);
}
