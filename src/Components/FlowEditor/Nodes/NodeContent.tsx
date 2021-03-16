import { makeStyles } from "@material-ui/core";
import { createElement, useCallback, useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "react-flow-renderer";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";

const contentStyle = makeStyles({
    img: { width: "100%", height: "100%", borderRadius: 4 },
    root: { position: "relative", width: "100%", height: "100%" },
    tag: {
        position: "absolute",
        left: 0,
        width: "100%",
        backgroundColor: "white",
    },
});

export const NodeContent = ({ data }) => {
    const classes = contentStyle();

    const preventDragHandler = useCallback((e) => {
        e.preventDefault();
    }, []);

    const nodeImage = createElement("img", {
        src: data.image ? data.image : "",
        className: classes.img,
        onDragStart: preventDragHandler,
    });

    return (
        <div className={classes.root}>
            <EditNodeText
                inputStyle={classes.tag}
                textStyle={classes.tag}
                value={data.label}
                nodeId={data.id}
            />
            {data.image && nodeImage}
        </div>
    );
};

export const EditNodeText = (props) => {
    const [toggle, setToggle] = useState(false);
    const [nodeName, setNodeName] = useState(props.value);

    const nodes = useStoreState((store) => store.nodes);
    const setElements = useStoreActions((actions) => actions.setElements);

    useEffect(() => {
        setElements(
            nodes.map((el) => {
                if (el.id === props.nodeId) {
                    el.data = {
                        ...el.data,
                        label: nodeName,
                    };
                }

                return el;
            })
        );
    }, [nodeName]);

    const handleDoubleClick = (e) => {
        setToggle((s) => (s = true));
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (event.target.value !== "") {
                setToggle((s) => (s = false));
                setNodeName((s) => (s = event.target.value));
            } else {
                setToggle((s) => (s = false));
            }
        }
    };

    return (
        <div>
            {toggle ? (
                <input
                    className={props.inputStyle}
                    type="text"
                    name="node label"
                    defaultValue={nodeName}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <p
                    className={props.textStyle}
                    onDoubleClick={handleDoubleClick}
                >
                    {nodeName}
                </p>
            )}
        </div>
    );
};
