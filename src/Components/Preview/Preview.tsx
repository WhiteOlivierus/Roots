import { Game } from "./Game";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";

export function Preview(props) {
    const history = useHistory();

    const { projectFilesState } = useProjectFilesState();

    useEffect(() => {
        if (projectFilesState.build === undefined) {
            history.push("/");
        }
    }, [projectFilesState]);

    return (
        <div>
            {projectFilesState.build ? (
                <Game game={projectFilesState.build} />
            ) : (
                <Redirect to="/" />
            )}
        </div>
    );
}
