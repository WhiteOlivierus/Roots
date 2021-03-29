import { Button, Tooltip } from "@material-ui/core";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

export const BackButton = memo((props) => {
    return (
        <Link to={props.to}>
            <Tooltip title="Back to flow editor">
                <Button variant="contained" color="primary">
                    <ChevronLeftIcon style={{ fill: "white" }} />
                </Button>
            </Tooltip>
        </Link>
    );
});
