import { Game } from "./Game";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import styled from "styled-components";

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
            {projectFilesState.build ? (
                <Game game={projectFilesState.build} />
            ) : (
                <Redirect to="/" />
            )}
        </Wrapper>
    );
}
