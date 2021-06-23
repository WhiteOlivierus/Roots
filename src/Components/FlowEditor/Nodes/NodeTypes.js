import { InputNode } from "./InputNode";
import SceneNode from "./SceneNode";
import { OutputNode } from "./OutputNode";
import { theme } from "../../../Utilities/Theme";

export const AllNodes = {
    in: { color: theme.palette.secondary.main, obj: InputNode, default: true },
    scene: {
        color: theme.palette.primary.main,
        obj: SceneNode,
        default: false,
    },
};

export const NodeTypes = {
    in: InputNode,
    scene: SceneNode,
    out: OutputNode,
};

export function MinimapSettings(node) {
    return AllNodes[node.type].color;
}
