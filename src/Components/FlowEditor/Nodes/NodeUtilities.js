import { getConnectedEdges } from "react-flow-renderer";

export function hasSourceConnection(connection, nodes, edges) {
    var node = nodes.filter((node) => {
        return node.id === connection.source;
    });

    var connectedEdges = getConnectedEdges(node, edges);

    var outgoingConnectedEdges = connectedEdges.filter((edge) => {
        return (
            edge.source === connection.source &&
            edge.sourceHandle === connection.sourceHandle
        );
    });

    return !(outgoingConnectedEdges.length > 0);
}
