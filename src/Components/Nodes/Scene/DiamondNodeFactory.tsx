import * as React from "react";

import { SceneNodeWidget } from "./SceneNodeWidget";
import { DiamondNodeModel } from "./DiamondNodeModel";

import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class DiamondNodeFactory extends AbstractReactFactory<DiamondNodeModel, DiagramEngine> {
    image: string = "";

    constructor(image: string = "") {
        super("scene");
        this.image = image;
    }

    generateReactWidget(event: any): JSX.Element {
        return <SceneNodeWidget engine={this.engine} size={50} image={this.image} node={event.model} />;
    }

    generateModel(event: any) {
        return new DiamondNodeModel(this.image);
    }
}
