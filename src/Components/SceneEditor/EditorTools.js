import { Box, Button, Card, CardContent, makeStyles } from "@material-ui/core";
import { memo } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { Move } from "../../Utilities/FileHandler";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";

export const useStyles = makeStyles({
    root: {
        maxWidth: 275,
    },
    title: {
        fontSize: 14,
    },
});

export const EditorTools = memo((props) => {
    const classes = useStyles();
    const { nodeViewerState } = useNodeViewerState();
    const { projectFilesState } = useProjectFilesState();

    const node = nodeViewerState.activeNode;

    const onLoadBackGroundImage = async () => {
        var fileHandle = await window.showOpenFilePicker();
        if (Array.isArray(fileHandle)) fileHandle = fileHandle[0];

        await Move(projectFilesState.activeRoot, fileHandle);

        var file = await fileHandle.getFile();
        var blobUrl = await URL.createObjectURL(file);

        props.node({
            ...node,
            data: {
                ...node.data,
                image: fileHandle.name,
                src: blobUrl,
            },
        });
    };

    return (
        <Box
            p={5}
            style={{
                position: "absolute",
                right: 0,
                top: 50,
                zIndex: 5,
            }}
        >
            <Card className={classes.root}>
                <CardContent>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onLoadBackGroundImage}
                    >
                        Load Background Image
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
});
