import * as MUI from "@material-ui/core";
import * as React from "react";
import * as Router from "react-router-dom";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PropTypes from "prop-types";

const BackButton = ({ onExit, to }) => {
    const history = Router.useHistory();

    const handleClick = React.useCallback(() => {
        onExit();
        history.push(to);
    }, [history, onExit, to]);

    return (
        <MUI.Tooltip title="Back to flow editor">
            <MUI.Button
                onClick={handleClick}
                variant="contained"
                color="primary"
            >
                <ChevronLeftIcon style={{ fill: "white" }} />
            </MUI.Button>
        </MUI.Tooltip>
    );
};

BackButton.displayName = "BackButton";

BackButton.propTypes = {
    onExit: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
};

export default React.memo(BackButton);
