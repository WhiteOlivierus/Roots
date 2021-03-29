import { Grid, IconButton, Typography } from "@material-ui/core";
import { useCallback } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { Move } from "../../Utilities/FileHandler";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import FolderIcon from '@material-ui/icons/Folder';

export const BackgroundInspector = (props) => {
    const { nodeViewerState } = useNodeViewerState();
    const { projectFilesState } = useProjectFilesState();

    const activeRoot = projectFilesState.activeRoot;
    const activeNode = nodeViewerState.activeNode;

    const onLoadImage = useCallback(() => {
        LoadImage(activeRoot)
            .then(({ imageName, blobUrl }) => {
                props.onEditNode({
                    ...activeNode,
                    data: {
                        ...activeNode.data,
                        image: imageName,
                        src: blobUrl,
                    },
                });
            });
    }, [activeNode, activeRoot, props]);

    return (
        <Grid container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{ maxWidth: "100%" }}>
            <Grid item xs={12}
            >
                <Typography variant="h6" gutterBottom>
                    Scene settings
                            </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="body1" gutterBottom style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden "
                }}>
                    {activeNode.data.image}
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

const LoadImage = async (root) => {
    var fileHandle = await window.showOpenFilePicker();
    if (Array.isArray(fileHandle))
        fileHandle = fileHandle[0];

    await Move(root, fileHandle);

    var file = await fileHandle.getFile();
    var blobUrl = await URL.createObjectURL(file);
    var imageName = fileHandle.name;

    return { imageName, blobUrl };
};
