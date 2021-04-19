import React, { useState } from "react";
import PropTypes from "prop-types";
import { NodeViewerState } from "./NodeViewerContext";

const NodeViewerContext = React.createContext(null);

const NodeViewerProvider = ({ children }) => {
    const [nodeViewerState, setNodeViewerState] = useState(
        new NodeViewerState()
    );

    return (
        <NodeViewerContext.Provider
            value={{ nodeViewerState, setNodeViewerState }}
        >
            {children}
        </NodeViewerContext.Provider>
    );
};

NodeViewerProvider.displayName = "NodeViewerProvider";

NodeViewerProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
};

export default NodeViewerProvider;
