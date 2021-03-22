import { memo /* , useEffect */ } from "react";

import { Box, Container, Grid } from "@material-ui/core";
import { Logo } from "./Logo";
import { File } from "./File";
import { Recent } from "./Recent";

export const StartMenu = memo(() => {
    // const shortCuts = (e) => e.preventDefault();

    // useEffect(() => {
    // window.addEventListener("keydown", shortCuts, true);
    // return () => {
    // window.removeEventListener("keydown", shortCuts, true);
    // };
    // });

    return (
        <Box paddingTop={10} bgcolor="primary.main" width={1} height={1}>
            <Container maxWidth="lg">
                <Logo />
                <Grid container direction="row" spacing={2}>
                    <File />
                    <Recent />
                </Grid>
            </Container>
        </Box>
    );
});
