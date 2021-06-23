import * as MUI from "@material-ui/core";
import * as React from "react";

export const Copyright = () => (
    <MUI.Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <MUI.Link color="inherit" href="https://dutchskull.com/">
            Dutchskull
        </MUI.Link>{" "}
        {new Date().getFullYear()}
        {"."}
    </MUI.Typography>
);
