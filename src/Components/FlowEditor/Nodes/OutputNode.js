import { memo } from "react";
import { Handle, Position } from "react-flow-renderer";
import { NodeContent } from "./NodeContent";
import PropTypes from "prop-types";
import NodePaper from "./NodePaper";

export const OutputNode = ({ data, selected }) => {
    return (
        <NodePaper selected={selected}>
            <NodeContent data={data} />
            <Handle id="a" type="target" position={Position.Left} />
        </NodePaper>
    );
};

OutputNode.displayName = "OutputNode";

OutputNode.propTypes = {
    data: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
};

export default memo(OutputNode);
