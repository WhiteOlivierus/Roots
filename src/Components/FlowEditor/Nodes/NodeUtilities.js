import { getConnectedEdges, isNode } from "react-flow-renderer";

export const hasSourceConnection = (connection, elements) => {
    let { nodes, edges } = SeparateNodesAndEdges(elements);

    let node = nodes.filter((node) => node.id === connection.source);

    if (edges === undefined) return true;

    let connectedEdges = getConnectedEdges(node, edges);

    let outgoingConnectedEdges = connectedEdges.filter(
        (edge) =>
            edge.source === connection.source &&
            edge.sourceHandle === connection.sourceHandle
    );

    return !(outgoingConnectedEdges.length > 0);
};

export const SeparateNodesAndEdges = (elements) =>
    elements.reduce(
        (output, element) => {
            const key = isNode(element) ? "nodes" : "edges";
            output[key].push(element);
            return output;
        },
        { nodes: [], edges: [] }
    );
