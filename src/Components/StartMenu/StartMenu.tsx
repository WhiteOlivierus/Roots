import React, { Component } from "react";

import { Box, Container, Grid } from "@material-ui/core";
import { Logo } from "./Logo";
import { File } from "./File";
import { Recent } from "./Recent";

export default class StartMenu extends Component {
    render() {
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
    }
}
