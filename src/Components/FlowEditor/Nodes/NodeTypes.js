import { InputNode } from "./InputNode";
import { SceneNode } from "./SceneNode";
import { OutputNode } from "./OutputNode";

export const AllNodes = {
    in: { color: "green", obj: InputNode, default: true },
    scene: { color: "grey", obj: SceneNode, default: false },
    out: { color: "red", obj: OutputNode, default: false },
};

export const NodeTypes = {
    in: InputNode,
    scene: SceneNode,
    out: OutputNode,
};

export function MinimapSettings(node) {
    return AllNodes[node.type].color;
}
