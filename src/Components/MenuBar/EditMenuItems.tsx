import * as lodash from "lodash";

import { MenuItem } from "./MenuItem";
import { BaseModel } from "@projectstorm/react-canvas-core";
import { DefaultNodeModel, LinkModel, NodeModel } from "@projectstorm/react-diagrams";
import { useNodeViewerState } from "../FlowEditor/Context/NodeViewerContext";

const nodesToCopy: any[] = [];

export function EditMenuItems(props: any) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const copyNode = () => {
        const nodes: DefaultNodeModel[] = lodash.values(nodeViewerState.model.getNodes()) as DefaultNodeModel[];

        nodesToCopy.length = 0;

        for (let node of nodes) {
            if (node.isSelected()) {
                nodesToCopy.push(node);
            }
        }
    };

    const pasteNode = () => {
        console.log(nodesToCopy);

        for (let node of nodesToCopy) {
            nodeViewerState.model.addNode(node.clone());
        }

        nodeViewerState.engine.repaintCanvas();
    };

    const duplicateNode = () => {
        let engine = nodeViewerState.engine;
        let offset = { x: 100, y: 100 };
        let model = engine.getModel();

        let itemMap = {};
        lodash.forEach(model.getSelectedEntities(), (item: BaseModel<any>) => {
            let newItem = item.clone(itemMap);

            if (newItem instanceof NodeModel) {
                newItem.setPosition(newItem.getX() + offset.x, newItem.getY() + offset.y);
                model.addNode(newItem);
            } else if (newItem instanceof LinkModel) {
                newItem.getPoints().forEach((p) => {
                    p.setPosition(p.getX() + offset.x, p.getY() + offset.y);
                });
                model.addLink(newItem);
            }
            (newItem as BaseModel).setSelected(false);
        });

        engine.repaintCanvas();
    };

    const addOutPort = () => {
        const nodes: DefaultNodeModel[] = lodash.values(nodeViewerState.model.getNodes()) as DefaultNodeModel[];

        for (let node of nodes) {
            if (node.isSelected()) {
                node.addOutPort(`Out-${node.getOutPorts().length + 1}`, false);
            }
        }

        nodeViewerState.engine.repaintCanvas();
    };

    const removeOutPort = () => {
        const nodes: DefaultNodeModel[] = lodash.values(nodeViewerState.model.getNodes()) as DefaultNodeModel[];

        for (let node of nodes) {
            if (node.getOutPorts().length == 1) {
                continue;
            }

            if (node.isSelected()) {
                node.removePort(node.getOutPorts()[0]);
            }
        }
        nodeViewerState.engine.repaintCanvas();
    };

    return (
        <ul>
            <MenuItem action={copyNode}> Copy</MenuItem>
            <MenuItem action={pasteNode}> Paste</MenuItem>
            <MenuItem action={duplicateNode}> Duplicate</MenuItem>
            <MenuItem action={addOutPort}> Add port to node</MenuItem>
            <MenuItem action={removeOutPort}>Remove port from node</MenuItem>
        </ul>
    );
}
