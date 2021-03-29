import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { memo, useEffect, useState } from "react";
import { BackgroundInspector } from "./BackgroundInspector";
import { AudioInspector } from "./AudioInspector";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";

const EditorInspector = memo((props) => {
    return (
        <Box
            p={3}
            style={{
                position: "absolute",
                right: 0,
                top: 60,
                zIndex: 5,
            }}
        >
            <Card style={{ width: 275 }}>
                <Typography variant="h5" gutterBottom>
                    Inspector
                </Typography>
                <CardContent>
                    <SceneSettingsDrawer />
                </CardContent>
            </Card>
        </Box>
    );
});

export default EditorInspector;


const SceneSettingsDrawer = () => {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const [node, setNode] = useState(nodeViewerState.activeNode);

    useEffect(() => {
        nodeViewerState.activeNode = node;
        setNodeViewerState(nodeViewerState);
    }, [node, nodeViewerState, setNode, setNodeViewerState]);

    return (
        <>
            <BackgroundInspector onUpdate={setNode} />
            <AudioInspector onUpdate={setNode} />
        </>
    );
};