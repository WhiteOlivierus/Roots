import * as React from "react";
import * as MUI from "@material-ui/core";

import useNodeViewerState from "../../../Context/NodeViewerContext/NodeViewerContext";
import PropTypes from "prop-types";

import { isNode } from "react-flow-renderer";

export const EditNodeText = ({ value, nodeId, inputStyle, textStyle }) => {
    const [toggle, setToggle] = React.useState(false);
    const [nodeName, setNodeName] = React.useState(value);

    const input = React.useRef();

    const { nodeViewerState } = useNodeViewerState();

    React.useEffect(() => {
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

    const toggleEdit = React.useCallback((e) => {
        if (e.target.type !== "text") setToggle(false);
    }, []);

    React.useEffect(() => {
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
                <MUI.TextField
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
                <p
                    className={textStyle}
                    style={{ cursor: "pointer" }}
                    onDoubleClick={handleDoubleClick}
                >
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
export default React.memo(EditNodeText);
