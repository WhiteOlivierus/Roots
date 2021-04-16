import { IconButton, Paper } from "@material-ui/core";
import { Handle, Position } from "react-flow-renderer";
import { hasSourceConnection } from "./NodeUtilities";
import { NodeContent } from "./NodeContent";
import { nodeStyle } from "./NodeStyle";
import { memo } from "react";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";
import short from "short-uuid";
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router-dom";
import { SceneCanvasHooks } from "dutchskull-scene-manager";

export const SceneNode = memo(({ id, data, selected }) => {
    const classes = nodeStyle();

    const { nodeViewerState } = useNodeViewerState();

    const showEditButton = SceneCanvasHooks.useToggle(false);

    const length = data.zones && data.zones.length - 1;

    const CalculateHandlePosition = (length, index, handlePadding = 25) => {
        const part = ((100 - (handlePadding * 2)) / length);
        return handlePadding + (part * index);
    };

    const onHasSourceConnection = (connection) => {
        return hasSourceConnection(
            connection,
            nodeViewerState.rfInstance.getElements()
        );
    };

    const history = useHistory();

    const onShowEditor = () => {
        history.push("/editor");
    };

    const outHandles = data.zones && data.zones.map((zone, index) => {
        if (!zone.isZone) return undefined;
        return (
            <Handle
                key={short.generate()}
                type="source"
                position={Position.Right}
                className={classes.handleRoot}
                isValidConnection={onHasSourceConnection}
                id={zone.id}
                style={{
                    top: `${CalculateHandlePosition(length, index)}%`,
                }}
            >
                <p className={classes.handleText}>{zone.name}</p>
            </Handle>
        );
    });

    const elevation = selected ? 10 : (showEditButton.value ? 5 : 1);
    return (
        <Paper
            className={classes.root}
            elevation={elevation}
            onMouseEnter={showEditButton.toggle}
            onMouseLeave={showEditButton.toggle}
        >
            {showEditButton.value &&
                <IconButton style={{ position: "absolute", top: 0, left: 0, zIndex: 100000000 }} onClick={onShowEditor}>
                    <EditIcon color="secondary" fontSize="small" />
                </IconButton>
            }
            <NodeContent data={data} />
            <Handle
                type="target"
                id="a"
                isValidConnection={onHasSourceConnection}
                position={Position.Left}
                className={classes.handleRoot}
            />
            {outHandles}
        </Paper>
    );
});
