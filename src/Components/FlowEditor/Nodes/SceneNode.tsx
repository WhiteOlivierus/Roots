import { Paper } from "@material-ui/core";
import {
    getConnectedEdges,
    Handle,
    Position,
    useStoreState,
} from "react-flow-renderer";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";

const letters = "abcdefghijklmnopqrstuvwxyz";

export const SceneNode = ({ data }) => {
    const classes = nodeStyle();

    const nodes = useStoreState((state) => state.nodes);
    const edges = useStoreState((state) => state.edges);

    const length = data.outHandles.length - 1;

    function CalculateHandlePosition(length, index, handlePadding = 25) {
        return handlePadding + (100 - (handlePadding * 2) / length) * index;
    }

    const hasSourceConnection = (connection) => {
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
    };

    const hasTargetConnection = (connection) => {
        var node = nodes.filter((node) => {
            return node.id === connection.target;
        });

        var connectedEdges = getConnectedEdges(node, edges);

        var outgoingConnectedEdges = connectedEdges.filter((edge) => {
            return (
                edge.target === connection.target &&
                edge.targetHandle === connection.targetHandle
            );
        });

        return !(outgoingConnectedEdges.length > 0);
    };

    return (
        <Paper className={classes.root}>
            <NodeContent data={data} />
            <Handle
                type="target"
                id="a"
                isValidConnection={hasSourceConnection}
                position={Position.Left}
                className={classes.handleRoot}
            />
            {data.outHandles.map((handle, index) => {
                return (
                    <Handle
                        key={index}
                        type="source"
                        position={Position.Right}
                        className={classes.handleRoot}
                        isValidConnection={hasSourceConnection}
                        id={letters[index]}
                        style={{
                            top: `${CalculateHandlePosition(length, index)}%`,
                        }}
                    >
                        <p className={classes.handleText}>{handle.text}</p>
                    </Handle>
                );
            })}
        </Paper>
    );
};
