import * as React from "react";

import * as _ from "lodash";

import {
    DiagramModel,
    DefaultNodeModel,
    DiagramEngine,
} from "@projectstorm/react-diagrams";

export class CloneSelected extends React.Component<
    { model: DiagramModel; engine: DiagramEngine; add: boolean },
    any
> {
    addOutPort = () => {
        const nodes: DefaultNodeModel[] = _.values(
            this.props.model.getNodes()
        ) as DefaultNodeModel[];

        for (let node of nodes) {
            if (node.isSelected())
                node.addOutPort(`out-${node.getOutPorts().length + 1}`, false);
        }
        this.props.engine.repaintCanvas();
    };

    removeOutPort = () => {
        const nodes: DefaultNodeModel[] = _.values(
            this.props.model.getNodes()
        ) as DefaultNodeModel[];

        for (let node of nodes) {
            if (node.getOutPorts().length === 1) return;

            if (node.isSelected()) node.removePort(node.getOutPorts()[0]);
        }
        this.props.engine.repaintCanvas();
    };

    render() {
        var button = (
            <button onClick={this.removeOutPort}>{this.props.children}</button>
        );

        if (this.props.add)
            button = (
                <button onClick={this.addOutPort}>{this.props.children}</button>
            );

        return button;
    }
}
