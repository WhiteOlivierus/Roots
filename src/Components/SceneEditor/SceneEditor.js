import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    makeStyles,
    Tooltip,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { memo, useEffect, useState } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";
import { EditorWrapper } from "../EditorWrapper";
import { MenuBar } from "../FlowEditor/MenuBar/MenuBar";
import { Move } from "../../Utilities/FileHandler";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";

export const SceneEditor = memo((props) => {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const [node, setNode] = useState(nodeViewerState.activeNode);

    useEffect(() => {
        nodeViewerState.activeNode = node;
        setNodeViewerState(nodeViewerState);
    }, [node, setNode]);

    return (
        <EditorWrapper>
            <OnBeforeReload />
            <MenuBar />
            <Link to="/flow">
                <Tooltip title="Back to flow editor">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            position: "absolute",
                            left: 20,
                            top: 80,
                            zIndex: 1000,
                        }}
                    >
                        <ChevronLeftIcon style={{ fill: "white" }} />
                    </Button>
                </Tooltip>
            </Link>
            <div>
                <img src={node.data.src} style={{ width: "50vw" }} />
                <h1>{node.data.label}</h1>
            </div>
            <EditorActions node={setNode} />
        </EditorWrapper>
    );
});

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
    },
    title: {
        fontSize: 14,
    },
});

export const EditorActions = memo((props) => {
    const classes = useStyles();
    const { nodeViewerState } = useNodeViewerState();
    const { projectFilesState } = useProjectFilesState();

    const node = nodeViewerState.activeNode;

    const onLoadBackGroundImage = async (e) => {
        var fileHandle = await window.showOpenFilePicker();

        await Move(projectFilesState.activeRoot, fileHandle);

        var file = await fileHandle[0].getFile();
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
