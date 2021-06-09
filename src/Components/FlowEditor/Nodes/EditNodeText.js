import { memo, useCallback, useEffect, useRef, useState } from "react";
import { isNode } from "react-flow-renderer";
import useNodeViewerState from "../../../Context/NodeViewerContext/NodeViewerContext";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

export const EditNodeText = ({ value, nodeId, inputStyle, textStyle }) => {
    const [toggle, setToggle] = useState(false);
    const [nodeName, setNodeName] = useState(value);

    const input = useRef(null);

    const { nodeViewerState } = useNodeViewerState();

    useEffect(() => {
        if (nodeViewerState.rfInstance)
            nodeViewerState.setElements(
                nodeViewerState.rfInstance.getElements().map((el) => {
                    if (isNode(el) && el.id === nodeId) {
                        el.data = {
                            ...el.data,
                            label: nodeName,
                        };
                    }

                    return el;
                })
            );
    }, [nodeName, nodeViewerState, nodeId]);

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

    const handleDoubleClick = () => {
        setToggle(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (e.target.value !== "") {
                setToggle(false);
                setNodeName(e.target.value);
            } else {
                setToggle(false);
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
                    className={inputStyle}
                    type="text"
                    name="node label"
                    defaultValue={nodeName}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <p className={textStyle} onDoubleClick={handleDoubleClick}>
                    {nodeName}
                </p>
            )}
        </div>
    );
};

EditNodeText.displayName = "EditNodeText";
EditNodeText.propTypes = {
    value: PropTypes.string.isRequired,
    nodeId: PropTypes.string,
    inputStyle: PropTypes.string.isRequired,
    textStyle: PropTypes.string.isRequired,
};
export default memo(EditNodeText);
