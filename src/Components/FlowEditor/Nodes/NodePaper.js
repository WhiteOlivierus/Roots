import * as React from "react";
import * as MUI from "@material-ui/core";
import PropTypes from "prop-types";
import { nodeStyle } from "./NodeStyle";
import { useToggle } from "../../SceneEditor/scene-manager/Hooks";

const NodePaper = ({ onHover, selected, children, style }) => {
    const classes = nodeStyle();

    const hover = useToggle(false);

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
            style={style}
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
    style: PropTypes.object,
};

NodePaper.defaultProps = {
    onHover: undefined,
    selected: false,
};

export default React.memo(NodePaper);
