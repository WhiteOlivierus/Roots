import { Typography } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { FileField } from "./FileField";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";
import { useProjectFilesState } from "../../../Context/ProjectFilesContext/ProjectFilesContext";
import { LoadAudioFile, LoadImageFile } from "../../../Utilities/LoadFile";

export const SceneSettingsDrawer = () => {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const [activeNode, setActiveNode] = useState(nodeViewerState.activeNode);

    useEffect(() => {
        nodeViewerState.activeNode = activeNode;
        setNodeViewerState(nodeViewerState);
    }, [activeNode, nodeViewerState, setActiveNode, setNodeViewerState]);

    const { projectFilesState } = useProjectFilesState();
    const activeRoot = projectFilesState.activeRoot;

    const handleLoadFile = useCallback((key, LoadAction) => {
        LoadAction(activeRoot)
            .then(({ fileName, blobUrl }) =>
                setActiveNode({
                    ...activeNode,
                    data: {
                        ...activeNode.data,
                        [key]: fileName,
                        [`${key}Src`]: blobUrl,
                    },
                }));
    }, [activeNode, activeRoot]);

    const onLoadImage = useCallback(() => {
        handleLoadFile("image", LoadImageFile);
    }, [handleLoadFile]);

    const onLoadAudio = useCallback(() => {
        handleLoadFile("audio", LoadAudioFile);
    }, [handleLoadFile]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Scene settings
                </Typography>
            <FileField
                action={onLoadImage}
                label="Image"
                value={activeNode.data.image} />
            <FileField
                action={onLoadAudio}
                label="Music"
                value={activeNode.data.audio} />
        </>
    );
};
