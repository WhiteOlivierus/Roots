import { memo } from "react";
import { Handle, Position } from "react-flow-renderer";
import useNodeViewerState from "../../../Context/NodeViewerContext/NodeViewerContext";
import { nodeStyle } from "./NodeStyle";
import { hasSourceConnection } from "./NodeUtilities";
import PropTypes from "prop-types";
import NodePaper from "./NodePaper";

export const InputNode = ({ selected }) => {
    const classes = nodeStyle();

    const { nodeViewerState } = useNodeViewerState();

    const onHasSourceConnection = (connection) => {
        return hasSourceConnection(
            connection,
            nodeViewerState.rfInstance.getElements()
        );
    };

    return (
        <NodePaper
            style={{
                width: 90,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
            selected={selected}
        >
            <h3>Start</h3>
            <Handle
                type="source"
                className={classes.handleRoot}
                position={Position.Right}
                isValidConnection={onHasSourceConnection}
                id="a"
                style={{ top: "50%" }}
            ></Handle>
        </NodePaper>
    );
};

InputNode.displayName = "InputNode";

InputNode.propTypes = {
    data: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
};

export default memo(InputNode);
