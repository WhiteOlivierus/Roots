import { memo } from "react";

import { Box, Container } from "@material-ui/core";
import { Logo } from "./Logo";
import { Recent } from "./Recent";
import CreateProject from "./CreateProject";

const StartMenu = () => (
    <Box bgcolor="primary.main" width={1} height="100vh">
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <Logo />
            <Recent />

            <Box style={{ flex: "0 1 auto", height: "32px" }}></Box>
        </Container>
        <CreateProject />
    </Box>
);

StartMenu.displayName = "StartMenu";

export default memo(StartMenu);
