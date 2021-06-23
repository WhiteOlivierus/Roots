import PropTypes from "prop-types";
import * as React from "react";
import * as MUI from "@material-ui/core";
import * as Router from "react-router-dom";

import CreateProject from "./CreateProject";
import chromiumDetector from "chromium-detector";

import { Logo } from "./Logo";
import { Recent } from "./Recent";
import { useOpen } from "../FlowEditor/MenuBar/useOpen";
import { useModal } from "react-modal-hook";

const StartMenu = ({ history }) => {
    const [open, handleOpen, handleClose] = useOpen(false);

    const [showModal] = useModal(({ in: open, onExited }) => (
        <MUI.Dialog open={open} onExited={onExited}>
            <MUI.DialogTitle>No chromium detected</MUI.DialogTitle>
            <MUI.DialogContent>
                <MUI.Typography>
                    Roots only works with chromium at the moment. Please install
                    a chromium based browser to use Roots.
                </MUI.Typography>
            </MUI.DialogContent>
            <MUI.DialogActions>
                <MUI.Button
                    variant="contained"
                    onClick={() => {
                        window.location.href = "https://www.google.com/chrome/";
                    }}
                >
                    Get Chrome
                </MUI.Button>
                <MUI.Button
                    variant="outlined"
                    onClick={() => history.push("/")}
                >
                    Back
                </MUI.Button>
            </MUI.DialogActions>
        </MUI.Dialog>
    ));

    React.useEffect(() => {
        const info = chromiumDetector.getBrowserInfo();
        if (!info.isChromium) showModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
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
                <Recent onClick={handleOpen} />
                <MUI.Box style={{ flex: "0 1 auto", height: "32px" }}></MUI.Box>
            </MUI.Container>
            <CreateProject
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
        </MUI.Box>
    );
};

StartMenu.propTypes = {
    history: PropTypes.object,
};

StartMenu.displayName = "StartMenu";

export default React.memo(Router.withRouter(StartMenu));
