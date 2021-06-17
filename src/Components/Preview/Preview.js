import Game from "./Game";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import * as React from "react";
import * as Router from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useBeforeReload } from "../../Utilities/UseBeforeReload";
import { EditorWrapper } from "../EditorWrapper";
import { GetObjectFromFileHandle } from "../../Utilities/FileHandler";

export const Preview = () => {
    const history = Router.useHistory();

    useBeforeReload(() => history.push("/roots"));

    const { projectFilesState } = useProjectFilesState();

    const [state, setState] = React.useState(undefined);

    React.useEffect(() => {
        if (projectFilesState.buildHandle === undefined) {
            history.push("/roots");
        } else {
            GetObjectFromFileHandle(projectFilesState.buildHandle).then(
                ({ obj: build }) => {
                    setState(build);
                }
            );
        }
    }, [history, projectFilesState]);

    return (
        <EditorWrapper>
            <Router.Link to="/flow">
                <Tooltip title="Back to flow editor">
                    <Button
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
                    </Button>
                </Tooltip>
            </Router.Link>
            {state && <Game game={state} />}
        </EditorWrapper>
    );
};

Preview.displayName = "Preview";

export default React.memo(Preview);
