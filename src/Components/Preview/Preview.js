import * as React from "react";
import * as Router from "react-router-dom";
import * as MUI from "@material-ui/core";

import PropTypes from "prop-types";
import Game from "./Game";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { useBeforeReload } from "../../Utilities/UseBeforeReload";
import { EditorWrapper } from "../EditorWrapper";
import { GetObjectFromFileHandle } from "../../Utilities/FileHandler";

const Preview = ({ history }) => {
    useBeforeReload(() => history.push("/roots"));

    const { projectFilesState } = useProjectFilesState();

    const [game, setGame] = React.useState();

    React.useEffect(
        () =>
            GetObjectFromFileHandle(projectFilesState.buildHandle)
                .then(({ obj: build }) => setGame(build))
                .catch(() => history.push("/roots")),
        [history, projectFilesState.buildHandle]
    );

    return (
        <EditorWrapper>
            <Router.Link to="/flow">
                <MUI.Tooltip title="Back to flow editor">
                    <MUI.Button
                        variant="contained"
                        color="primary"
                        style={{
                            position: "absolute",
                            left: 20,
                            top: 20,
                            zIndex: 1000,
                        }}
                    >
                        <ChevronLeftIcon style={{ fill: "white" }} />
                    </MUI.Button>
                </MUI.Tooltip>
            </Router.Link>
            {game && <Game game={game} />}
        </EditorWrapper>
    );
};

Preview.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

Preview.displayName = "Preview";

export default React.memo(Router.withRouter(Preview));
