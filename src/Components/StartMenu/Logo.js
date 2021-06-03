import React from "react";
// import logo from "../../Resources/LogoWhite.png";
import { Box, Grid /* , Typography */ } from "@material-ui/core";
// import { useStyles } from "./useStyles";

export const Logo = () => {
    // const classes = useStyles();
    return (
        <Box p={5}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={5}
            >
                <Grid item>
                    <img src="/compressed/logo_text_white.svg" width="50%" />
                </Grid>
                {/*                 <Grid item>
                    <Typography variant="h1" className={classes.logoTitle}>
                        Roots
                    </Typography>
                </Grid> */}
            </Grid>
        </Box>
    );
};
