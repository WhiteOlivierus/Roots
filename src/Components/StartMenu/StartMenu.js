import { memo } from "react";

import { Box, Container } from "@material-ui/core";
import { Logo } from "./Logo";
import { Recent } from "./Recent";
import CreateProject from "./CreateProject";
import copyright from "copyright";

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
            <CreateProject />

            <Box style={{ flex: "0 1 auto", height: "100px" }}>
                {copyright("Dutchtskull")}
            </Box>
        </Container>
    </Box>
);

StartMenu.displayName = "StartMenu";

export default memo(StartMenu);
