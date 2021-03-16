import { memo, useEffect, useState } from "react";
import { useStoreState } from "react-flow-renderer";
import { useHistory } from "react-router-dom";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { LoadFlow } from "../../Utilities/FlowHandler";
import { FlowEditor } from "./FlowEditor";

export const FlowLoader = memo((props) => {
    const [initialFlow, setInitialFlow] = useState({});
    const [loaded, setLoaded] = useState(false);

    const nodes = useStoreState((state) => state.nodes);
    const edges = useStoreState((state) => state.edges);
    const transform = useStoreState((state) => state.transform);

    const history = useHistory();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    useEffect(() => {
        const elements = nodes.concat(edges);

        const hasProject =
            !projectFilesState.projectLoaded &&
            projectFilesState.activeRoot !== undefined &&
            projectFilesState.activeFlow !== undefined;

        const hasElements = elements.length > 1;

        if (hasElements) {
            const flow = {
                position: [transform[0], transform[1]],
                zoom: transform[2],
                elements: elements,
            };

            setInitialFlow((prevFlow) => (prevFlow = flow));
            setLoaded((prevLoad) => (prevLoad = true));
        } else if (hasProject) {
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
