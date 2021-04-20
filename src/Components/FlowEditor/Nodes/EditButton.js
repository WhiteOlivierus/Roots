import { IconButton } from "@material-ui/core";
import * as React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";

export const EditButton = () => {
    const history = useHistory();

    const onShowEditor = React.useCallback(() => {
        history.push("/editor");
    }, [history]);

    return (
        <IconButton
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 100000000,
            }}
            onClick={onShowEditor}
        >
            <EditIcon color="secondary" fontSize="small" />
        </IconButton>
    );
};

EditButton.displayName = "EditButton";

EditButton.propTypes = {};

export default React.memo(EditButton);
