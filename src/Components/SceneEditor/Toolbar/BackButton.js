import { Button, Tooltip } from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PropTypes from "prop-types";

const BackButton = ({ onExit, to }) => {
    const history = useHistory();

    const handleClick = React.useCallback(() => {
        onExit();
        history.push(to);
    }, [history, onExit, to]);

    return (
        <Tooltip title="Back to flow editor">
            <Button onClick={handleClick} variant="contained" color="primary">
                <ChevronLeftIcon style={{ fill: "white" }} />
            </Button>
        </Tooltip>
    );
};

BackButton.displayName = "BackButton";

BackButton.propTypes = {
    onExit: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
};

export default React.memo(BackButton);
