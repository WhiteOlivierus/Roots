import * as React from "react";
import * as MUI from "@material-ui/core";

import CreateProject from "./CreateProject";

import { Logo } from "./Logo";
import { Recent } from "./Recent";

const StartMenu = () => (
    <MUI.Box bgcolor="primary.main" width={1} height="100vh">
        <MUI.Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <Logo />
            <Recent />
            <MUI.Box style={{ flex: "0 1 auto", height: "32px" }}></MUI.Box>
        </MUI.Container>
        <CreateProject />
    </MUI.Box>
);

StartMenu.displayName = "StartMenu";

export default React.memo(StartMenu);
