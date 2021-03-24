import { Game } from "./Game";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { memo, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";
import { EditorWrapper } from "../EditorWrapper";
import { GetObjectFromFileHandle } from "../../Utilities/FileHandler"

export const Preview = memo((props) => {
    const history = useHistory();

    const { projectFilesState } = useProjectFilesState();

    const [state, setState] = useState(undefined);

    useEffect(() => {
        if (projectFilesState.buildHandle === undefined) {
            history.push("/");
        } else {
            GetObjectFromFileHandle(projectFilesState.buildHandle).then(({ obj: build }) => {
                setState(build);
            })
        }
    }, [history, projectFilesState]);

    return (
        <EditorWrapper>
            <OnBeforeReload />
            <Link to="/flow">
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
            </Link>
            {state && <Game game={state} />}
        </EditorWrapper>
    );
});
