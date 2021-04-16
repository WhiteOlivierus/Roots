import { Button, Tooltip } from "@material-ui/core";
import React, { memo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

export const BackButton = memo((props) => {
    const history = useHistory();

    const handleClick = useCallback(() => {
        props.onExit();
        history.push(props.to);
    }, [history, props]);

    return (
        <Tooltip title="Back to flow editor">
            <Button onClick={handleClick} variant="contained" color="primary">
                <ChevronLeftIcon style={{ fill: "white" }} />
            </Button>
        </Tooltip>
    );
});
