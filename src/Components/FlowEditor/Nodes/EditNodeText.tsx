import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "react-flow-renderer";

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
