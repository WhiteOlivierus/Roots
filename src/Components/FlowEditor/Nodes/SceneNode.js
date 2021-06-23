import * as React from "react";

import { Handle, Position } from "react-flow-renderer";
import { hasSourceConnection } from "./NodeUtilities";
import NodeContent from "./NodeContent";
import { nodeStyle } from "./NodeStyle";
import useNodeViewerState from "../../../Context/NodeViewerContext/NodeViewerContext";

import PropTypes from "prop-types";
import NodePaper from "./NodePaper";
import EditButton from "./EditButton";
import { CalculateHandlePosition } from "./CalculateHandlePosition";
import { useStateful } from "../../SceneEditor/scene-manager/Hooks";

const SceneNode = ({ data, selected }) => {
    const classes = nodeStyle();

    const { nodeViewerState } = useNodeViewerState();

    const hover = useStateful(false);

    const zones =
        data.zones &&
        data.zones.filter((zone) => {
            if ("isZone" in zone) return zone.isZone;
        });

    const handleConnection = (connection) =>
        hasSourceConnection(
            connection,
            nodeViewerState.rfInstance.getElements()
        );

    const outHandles =
        zones &&
        zones.map((zone, index) => (
            <Handle
                key={zone.id}
                type="source"
                position={Position.Right}
                className={classes.handleRoot}
                isValidConnection={handleConnection}
                id={zone.id}
                style={{
                    top: `${CalculateHandlePosition(zones.length, index, 25)}%`,
                }}
            >
                <p className={classes.handleText}>{zone.name}</p>
            </Handle>
        ));

    return (
        <NodePaper onHover={hover.setValue} selected={selected}>
            {hover.value && <EditButton />}
            <NodeContent data={data} />
            <Handle
                type="target"
                id="a"
                isValidConnection={handleConnection}
                position={Position.Left}
                className={classes.handleRoot}
            />
            {outHandles}
        </NodePaper>
    );
};

SceneNode.displayName = "SceneNode";

SceneNode.propTypes = {
    data: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
};

export default React.memo(SceneNode);
