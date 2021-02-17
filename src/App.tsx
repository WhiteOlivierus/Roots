import React, { Component } from "react";
import "./App.css";

import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel,
} from "@projectstorm/react-diagrams";

import { CanvasWidget } from "@projectstorm/react-canvas-core";

const App = () => {
    console.log("running in app!");

    // create an instance of the engine with all the defaults
    const engine = createEngine();

    // node 1
    const node1 = new DefaultNodeModel({
        name: "Node 1",
        color: "rgb(0,192,255)",
    });
    node1.setPosition(100, 100);
    let port1 = node1.addOutPort("Out");

    // node 2
    const node2 = new DefaultNodeModel({
        name: "Node 2",
        color: "rgb(192,192,255)",
    });
    node2.setPosition(200, 100);
    let port2 = node2.addInPort("In");

    // link them and add a label to the link
    const link = port1.link<DefaultLinkModel>(port2);
    //link.addLabel('Hello World!');

    const model = new DiagramModel();
    model.addAll(node1, node2, link);
    engine.setModel(model);

    return (
        <div className="app-wrapper">
            <div></div>
            <div
                style={{
                    height: "100vh",
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
