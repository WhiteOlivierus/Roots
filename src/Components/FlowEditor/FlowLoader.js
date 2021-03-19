import { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { LoadFlow } from "../../Utilities/FlowHandler";
import { FlowEditor } from "./FlowEditor";

export const FlowLoader = memo((props) => {
    const [initialFlow, setInitialFlow] = useState({});
    const [loaded, setLoaded] = useState(false);

    const history = useHistory();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();

    const UpdateNode = (elements, nodeViewerState) => {
        return elements.map((element) => {
            if (element.id === nodeViewerState.activeNode.id)
                element = nodeViewerState.activeNode;
            return element;
        });
    };

    useEffect(() => {
        const hasProject =
            projectFilesState.activeRoot !== undefined &&
            projectFilesState.activeFlow !== undefined;

        if (hasProject) {
            LoadFlow(projectFilesState.activeRoot, projectFilesState.activeFlow)
                .then((flow) => {
                    if (nodeViewerState && nodeViewerState.activeNode) {
                        flow.elements = UpdateNode(
                            flow.elements,
                            nodeViewerState
                        );
                    }

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
