import * as React from "react";
import * as Router from "react-router-dom";
import * as MUI from "@material-ui/core";

import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";

const EditButton = ({ history }) => (
    <MUI.Fab
        color="primary"
        style={{
            position: "absolute",
            top: -20,
            right: -20,
            zIndex: 100000000,
        }}
        onClick={() => history.push("/editor")}
        size="small"
    >
        <EditIcon />
    </MUI.Fab>
);

EditButton.displayName = "EditButton";

EditButton.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default React.memo(Router.withRouter(EditButton));
