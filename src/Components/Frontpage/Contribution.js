import * as MUI from "@material-ui/core";
import * as React from "react";

import PropTypes from "prop-types";

const Contribution = ({ theme, contribution }) => (
    <MUI.Grid item xs={4} style={{ display: "flex", flexDirection: "column" }}>
        <MUI.Typography
            style={{
                color: theme.palette.primary.contrastText,
            }}
            gutterBottom
            variant="h3"
        >
            {contribution.title}
        </MUI.Typography>
        <MUI.Typography
            style={{
                color: theme.palette.primary.contrastText,
                flexGrow: 1,
            }}
            gutterBottom
        >
            {contribution.text}
        </MUI.Typography>
        <MUI.Button
            style={{ margin: theme.spacing(4) }}
            variant="contained"
            color="secondary"
            onClick={() => {
                window.open(contribution.link, "_blank");
            }}
        >
            {contribution.button}
        </MUI.Button>
    </MUI.Grid>
);

Contribution.propTypes = {
    theme: PropTypes.object,
    contribution: PropTypes.object,
};

export default MUI.withTheme(Contribution);
