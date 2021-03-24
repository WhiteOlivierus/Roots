import { memo, useCallback, useEffect, useRef, useState } from "react";
import { isNode } from "react-flow-renderer";
import { useNodeViewerState } from "../../../Context/NodeViewerContext/NodeViewerContext";
import TextField from "@material-ui/core/TextField";

export const EditNodeText = memo((props) => {
    const [toggle, setToggle] = useState(false);
    const [nodeName, setNodeName] = useState(props.value);

    const input = useRef(null);

    const { nodeViewerState } = useNodeViewerState();

    useEffect(() => {
        nodeViewerState.setElements(
            nodeViewerState.rfInstance.getElements().map((el) => {
                if (isNode(el) && el.id === props.nodeId) {
                    el.data = {
                        ...el.data,
                        label: nodeName,
                    };
                }

                return el;
            })
        );
    }, [nodeName, nodeViewerState, props.nodeId]);

    const toggleEdit = useCallback((e) => {
        if (e.target.type !== "text") setToggle(false);
    }, []);

    useEffect(() => {
        if (toggle) {
            window.addEventListener("click", toggleEdit);
            input.current.focus();
        } else {
            window.removeEventListener("click", toggleEdit);
        }
    }, [toggle, setToggle, toggleEdit]);

    const handleDoubleClick = (e) => {
        setToggle((s) => (s = true));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.target.value !== "") {
                setToggle((s) => (s = false));
                setNodeName((s) => (s = e.target.value));
            } else {
                setToggle((s) => (s = false));
            }
        }
    };

    return (
        <div>
            {toggle ? (
                <TextField
                    id="outlined-basic"
                    label="scene name"
                    variant="outlined"
                    ref={input}
                    size="small"
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
});
