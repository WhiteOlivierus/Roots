import { Game } from "./Game";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";

export function Preview(props) {
    const { projectFilesState } = useProjectFilesState();

    return <Game game={projectFilesState.build} />;
}
