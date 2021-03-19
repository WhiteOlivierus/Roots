import { getConnectedEdges } from "react-flow-renderer";

export function hasSourceConnection(connection, elements) {
    var { nodes, edges } = SeparateNodesAndEdges(elements);

    var node = nodes.filter((node) => {
        return node.id === connection.source;
    });

    if (edges === undefined) return true;

    var connectedEdges = getConnectedEdges(node, edges);

    var outgoingConnectedEdges = connectedEdges.filter((edge) => {
        return (
            edge.source === connection.source &&
            edge.sourceHandle === connection.sourceHandle
        );
    });

    return !(outgoingConnectedEdges.length > 0);
}

export const SeparateNodesAndEdges = (elements) => {
    var out = Object.values(groupBy(elements, "data"));
    return { nodes: out[0], edges: out[1] };
};

const groupBy = (arr, property) => {
    return arr.reduce((memo, x) => {
        if (!memo[x[property]]) {
            memo[x[property]] = [];
        }
        memo[x[property]].push(x);
        return memo;
    }, {});
};
