import { ListItem, ListItemText } from "@material-ui/core";
import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";
import { useHistory } from "react-router-dom";
import { OpenRecentProject } from "../../Utilities/ProjectHandler";

export function RecentEntry(props) {
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const history = useHistory();

    async function onOpenRecentProject(fileHandle) {
        try {
            var { activeRoot, activeFlow } = await OpenRecentProject(fileHandle);
        } catch {
            return;
        }

        projectFilesState.activeRoot = activeRoot;
        projectFilesState.activeFlow = activeFlow;

        setProjectFilesState(projectFilesState);

        history.push("/flow");
    }

    return (
        <div>
            {props.files &&
                props.files.map((file, index) => (
                    <ListItem key={index} button onClick={() => onOpenRecentProject(file)}>
                        <ListItemText primary={file.name} />
                    </ListItem>
                ))}
        </div>
    );
}
