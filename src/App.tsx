import React from "react";
import "./App.css";

import createEngine, {
    DefaultNodeModel,
    DiagramModel,
} from "@projectstorm/react-diagrams";

import { CanvasWidget } from "@projectstorm/react-canvas-core";

declare const window: any;
let projectFile: any = null;

const App = () => {
    //1) setup the diagram engine
    var engine = createEngine();

    //2) setup the diagram model
    var model = new DiagramModel();

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

    const Save = () => {
        var serializedModel = JSON.stringify(model.serialize(), null, 2);

        if (projectFile !== null) {
            WriteFile(projectFile, serializedModel);
        } else {
            projectFile = WriteNewFile();
            WriteFile(projectFile, serializedModel);
        }
    };

    const SaveAs = () => {
        var serializedModel = JSON.stringify(model.serialize(), null, 2);

        projectFile = WriteNewFile();
        WriteFile(projectFile, serializedModel);
    };

    const Load = async () => {
        var serializedModel = await ReadFile();
        var tempModel = new DiagramModel();
        tempModel.deserializeModel(JSON.parse(serializedModel), engine);
        engine.setModel(tempModel);
    };

    return (
        <div className="app-wrapper">
            <button onClick={Save}>Save</button>
            <button onClick={SaveAs}>SaveAs</button>
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

async function ReadFile(): Promise<string> {
    let [fileHandle] = await window.showOpenFilePicker();
    projectFile = await fileHandle.getFile();
    const contents = await projectFile.text();
    return contents;
}

async function WriteFile(fileHandle: any, contents: any) {
    const writable = await fileHandle.createWritable();
    await writable.write(contents);
    await writable.close();
}

async function WriteNewFile() {
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
    const handle = await window.showSaveFilePicker(options);
    return handle;
}

export default App;
