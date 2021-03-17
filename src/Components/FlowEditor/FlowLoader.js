import { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { LoadFlow } from "../../Utilities/FlowHandler";
import { FlowEditor } from "./FlowEditor";

export const FlowLoader = memo((props) => {
    const [initialFlow, setInitialFlow] = useState({});
    const [loaded, setLoaded] = useState(false);

    const history = useHistory();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    useEffect(() => {
        const hasProject =
            projectFilesState.activeRoot !== undefined &&
            projectFilesState.activeFlow !== undefined;

        if (hasProject) {
            LoadFlow(projectFilesState.activeRoot, projectFilesState.activeFlow)
                .then((flow) => {
                    setInitialFlow((prevFlow) => (prevFlow = flow));
                    setLoaded((prevLoad) => (prevLoad = true));

                    projectFilesState.projectLoaded = true;
                    setProjectFilesState(projectFilesState);
                })
                .catch((e) => {
                    history.push("/");
                });
        } else {
            history.push("/");
        }
    }, []);

    return (
        <div>
            {loaded === true ? (
                <FlowEditor flow={initialFlow} />
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    );
});
