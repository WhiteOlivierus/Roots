import { Paper } from "@material-ui/core";
import {
    getConnectedEdges,
    Handle,
    Position,
    useStoreState,
} from "react-flow-renderer";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";

export const InputNode = ({ data }) => {
    const classes = nodeStyle();

    const nodes = useStoreState((state) => state.nodes);
    const edges = useStoreState((state) => state.edges);

    const hasConnection = (connection) => {
        var node = nodes.filter((node) => {
            return node.id === connection.source;
        });

        var connectedEdges = getConnectedEdges(node, edges);
        return !(connectedEdges.length > 0);
    };

    return (
        <Paper className={classes.root}>
            <NodeContent data={data} />
            <Handle
                type="source"
                className={classes.handleRoot}
                position={Position.Right}
                isValidConnection={hasConnection}
                onConnect={(params) => console.log("handle onConnect", params)}
                id="a"
                style={{ top: "50%" }}
            >
                <p className={classes.handleText}>Left</p>
            </Handle>
        </Paper>
    );
};
