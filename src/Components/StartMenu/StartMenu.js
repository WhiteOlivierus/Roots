import { memo } from "react";

import { Box, Container, Grid } from "@material-ui/core";
import { Logo } from "./Logo";
import { File } from "./File";
import { Recent } from "./Recent";

const StartMenu = () => {
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
};

StartMenu.displayName = "StartMenu";

export default memo(StartMenu);
