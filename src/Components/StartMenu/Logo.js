import React from "react";
import { Box, Grid } from "@material-ui/core";

export const Logo = () => (
    <Box p={5} pt={10} style={{ flex: "0 1 auto" }}>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
        >
            <Grid item>
                <img src="/compressed/logo_text_white.svg" width="40%" />
            </Grid>
        </Grid>
    </Box>
);
