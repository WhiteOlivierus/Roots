import { Link, useHistory } from "react-router-dom";
import { Button, Paper, Tooltip } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { memo, useEffect, useRef, useState } from "react";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";
import { EditorWrapper } from "../EditorWrapper";
import { MenuBar } from "../FlowEditor/MenuBar/MenuBar";
import { EditorTools } from "./EditorTools";
import SVGEditor from "dutchskull-svg-editor";

export const SceneEditor = memo(() => {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const history = useHistory();

    const [node, setNode] = useState(nodeViewerState.activeNode);


    useEffect(() => {
        nodeViewerState.activeNode = node;
        setNodeViewerState(nodeViewerState);
    }, [node, nodeViewerState, setNode, setNodeViewerState]);

    return (
        <>
            {node ? (
                <EditorWrapper>
                    <OnBeforeReload />
                    <MenuBar />
                    <BackButton />
                    <EditorCanvas node={node} />
                    <EditorTools node={setNode} />
                </EditorWrapper>
            ) : (
                history.push("/")
            )}
        </>
    );
});

const EditorCanvas = memo((props) => {
    const imageRef = useRef(null);

    const [instance, setInstance] = useState([]);

    const onLoadSetInstance = (instance) => setInstance(instance);

    useEffect(() => {
        props.node.data.zones = instance;
    }, [instance, props.node.data])

    return (
        <EditorWrapper>
            <Paper style={{ margin: "auto", width: "65%" }}>
                <SVGEditor polygons={props.node.data.zones} onLoad={onLoadSetInstance} contentRef={imageRef} />
                <img
                    ref={imageRef}
                    src={props.node.data.src}
                    style={{ width: "100%", height: "100%", borderRadius: 4 }}
                    alt="scene"
                />
            </Paper>
        </EditorWrapper>
    );
});

const BackButton = memo(() => {
    const style = {
        position: "absolute",
        left: 20,
        top: 80,
        zIndex: 1000,
    };

    return (
        <Link to="/flow">
            <Tooltip title="Back to flow editor">
                <Button variant="contained" color="primary" style={style}>
                    <ChevronLeftIcon style={{ fill: "white" }} />
                </Button>
            </Tooltip>
        </Link>
    );
});
