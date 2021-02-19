import { DiagramModel } from "@projectstorm/react-diagrams";

import { WriteFile, WriteNewFile, ReadFile } from "./FileHandeling";
import { NodeViewerState } from "../Context/NodeViewerContext";

export function New(nodeViewerState: NodeViewerState) {
    nodeViewerState.model = new DiagramModel();
    nodeViewerState.engine.setModel(nodeViewerState.model);
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
