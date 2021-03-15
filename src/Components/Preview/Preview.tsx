import { Game } from "./Game";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import React, { useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Button, Tooltip } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { OnBeforeReload } from "../../Utilities/OnBeforeReload";

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: hidden;
`;

export function Preview(props) {
    const history = useHistory();

    const { projectFilesState } = useProjectFilesState();

    useEffect(() => {
        if (projectFilesState.build === undefined) {
            history.push("/");
        }
    }, [projectFilesState]);

    return (
        <Wrapper>
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
            {projectFilesState.build ? (
                <Game game={projectFilesState.build} />
            ) : (
                <Redirect to="/" />
            )}
        </Wrapper>
    );
}
