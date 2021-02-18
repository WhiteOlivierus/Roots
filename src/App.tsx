import React from "react";
import "./App.css";

import createEngine, {
    DefaultNodeModel,
    DiagramModel,
} from "@projectstorm/react-diagrams";

import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { WriteFile, WriteNewFile, ReadFile } from "./ReadFile";

let projectFile: any = undefined;

//1) setup the diagram engine
var engine = createEngine();

//2) setup the diagram model
var model = new DiagramModel();

const App = () => {
    //3-A) create a default node
    var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
    var port1 = node1.addOutPort("Out");
    node1.setPosition(100, 100);

    //3-B) create another default node
    var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
    var port2 = node2.addInPort("In");
    node2.setPosition(400, 100);

    //3-C) link the 2 nodes together
    var link1 = port1.link(port2);

    //4) add the models to the root graph
    model.addAll(node1, node2, link1);

    //5) load model into engine
    engine.setModel(model);

    return (
        <div className="app-wrapper">
            <button onClick={New}>New</button>
            <button onClick={Save}>Save</button>
            <button onClick={SaveAs}>Save As</button>
            <button onClick={Load}>Load</button>
            <div
                style={{
                    height: "auto",
                    width: "100vw",
                    backgroundColor: "aliceblue",
                }}
            >
                <CanvasWidget className="canvas" engine={engine} />
            </div>
        </div>
    );
};

export default App;

function New() {
    model = new DiagramModel();
    engine.setModel(model);
}

async function Save() {
    var serializedModel = JSON.stringify(model.serialize(), null, 2);

    if (projectFile !== undefined) {
        await WriteFile(projectFile, serializedModel);
    } else {
        await SaveAs();
    }
}

async function SaveAs() {
    projectFile = await WriteNewFile();

    if (!projectFile) return;

    var serializedModel = JSON.stringify(model.serialize(), null, 2);

    await WriteFile(projectFile, serializedModel);
}

async function Load() {
    projectFile = await ReadFile();

    if (!projectFile) return;

    model = new DiagramModel();

    var file = await projectFile.getFile();
    var json = JSON.parse(await file.text());
    model.deserializeModel(json, engine);
    engine.setModel(model);
}

window.addEventListener("keydown", (e) => {
    // Save As
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyS") {
        e.preventDefault();
        SaveAs();
        return;
    }

    // Save
    if ((e.ctrlKey === true || e.metaKey === true) && e.key === "s") {
        e.preventDefault();
        Save();
        return;
    }

    // Open
    if ((e.ctrlKey === true || e.metaKey === true) && e.key === "o") {
        e.preventDefault();
        Load();
        return;
    }

    // Close
    if ((e.ctrlKey === true || e.metaKey === true) && e.key === "n") {
        e.preventDefault();
        New();
        return;
    }
});
