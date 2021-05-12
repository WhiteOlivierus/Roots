import { getConnectedEdges } from "react-flow-renderer";

export const hasSourceConnection = (connection, elements) => {
    let { nodes, edges } = SeparateNodesAndEdges(elements);

    let node = nodes.filter((node) => {
        return node.id === connection.source;
    });

    if (edges === undefined) return true;

    let connectedEdges = getConnectedEdges(node, edges);

    let outgoingConnectedEdges = connectedEdges.filter((edge) => {
        return (
            edge.source === connection.source &&
            edge.sourceHandle === connection.sourceHandle
        );
    });

    return !(outgoingConnectedEdges.length > 0);
};

// TODO use isNode or isEdge
export const SeparateNodesAndEdges = (elements) => {
    let out = Object.values(groupBy(elements, "data"));
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
