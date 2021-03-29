import { Grid, IconButton, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import FolderIcon from '@material-ui/icons/Folder';
import { Move } from "../../Utilities/FileHandler";

export const AudioInspector = (props) => {
    const { nodeViewerState } = useNodeViewerState();
    const { projectFilesState } = useProjectFilesState();

    const activeRoot = projectFilesState.activeRoot;
    const activeNode = nodeViewerState.activeNode;

    const onLoadImage = useCallback(() => {
        LoadAudio(activeRoot)
            .then(({ audioName, blobUrl }) => {
                props.onEditNode({
                    ...activeNode,
                    data: {
                        ...activeNode.data,
                        audio: audioName,
                        audioSrc: blobUrl,
                    },
                });
            });
    }, [activeNode, activeRoot, props]);

    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{ maxWidth: "100%" }}
        >
            <Grid item xs={12}>
                <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                        textAlign: "left"
                    }}>
                    Background music
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body1" gutterBottom style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden ",
                    textAlign: "left"
                }}>
                    {activeNode.data.audio ? activeNode.data.audio : "No music yet"}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={onLoadImage}
                >
                    <FolderIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};
const LoadAudio = async (root) => {
    var fileHandle = await window.showOpenFilePicker();
    if (Array.isArray(fileHandle))
        fileHandle = fileHandle[0];

    await Move(root, fileHandle);

    var file = await fileHandle.getFile();
    var blobUrl = await URL.createObjectURL(file);
    var audioName = fileHandle.name;

    return { audioName, blobUrl };
};
