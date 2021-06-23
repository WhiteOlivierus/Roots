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
                <a href="/">
                    <img
                        style={{ cursor: "pointer" }}
                        src="/compressed/logo_text_white.svg"
                        width="40%"
                        preload="true"
                    />
                </a>
            </Grid>
        </Grid>
    </Box>
);
