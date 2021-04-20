import * as React from "react";
import * as MUI from "@material-ui/core";
import PropTypes from "prop-types";
import { nodeStyle } from "./NodeStyle";
import { SceneCanvasHooks } from "dutchskull-scene-manager";

const NodePaper = ({ onHover, selected, children }) => {
    const classes = nodeStyle();

    const hover = SceneCanvasHooks.useToggle(false);

    const elevation = selected ? 10 : hover.value ? 5 : 1;

    const handleHover = React.useCallback(() => {
        hover.toggle();

        if (onHover) onHover(!hover.value);
    }, [hover, onHover]);

    return (
        <MUI.Paper
            className={classes.root}
            elevation={elevation}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            {children}
        </MUI.Paper>
    );
};

NodePaper.displayName = "NodePaper";

NodePaper.propTypes = {
    onHover: PropTypes.func,
    selected: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

NodePaper.defaultProps = {
    onHover: undefined,
    selected: false,
};

export default React.memo(NodePaper);
