import { Paper } from "@material-ui/core";
import { Handle, Position, useStoreState } from "react-flow-renderer";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";
import { hasSourceConnection } from "./NodeUtilities";

export const InputNode = ({ data }) => {
    const classes = nodeStyle();

    const nodes = useStoreState((state) => state.nodes);
    const edges = useStoreState((state) => state.edges);

    const onHasSourceConnection = (connection) => {
        return hasSourceConnection(connection, nodes, edges);
    };

    return (
        <Paper className={classes.root}>
            <NodeContent data={data} />
            <Handle
                type="source"
                className={classes.handleRoot}
                position={Position.Right}
                isValidConnection={onHasSourceConnection}
                onConnect={(params) => console.log("handle onConnect", params)}
                id="a"
                style={{ top: "50%" }}
            >
                <p className={classes.handleText}>Left</p>
            </Handle>
        </Paper>
    );
};
