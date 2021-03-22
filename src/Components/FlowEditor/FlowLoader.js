import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useNodeViewerState } from "../../Context/NodeViewerContext/NodeViewerContext";
import { useProjectFilesState } from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { LoadFlow } from "../../Utilities/FlowHandler";
import FlowEditor from "./FlowEditor";

export const FlowLoader = memo(() => {
    const [initialFlow, setInitialFlow] = useState({});
    const [loaded, setLoaded] = useState(false);

    const history = useHistory();

    const { projectFilesState } = useProjectFilesState();
    const { nodeViewerState } = useNodeViewerState();

    const UpdateNode = (elements, nodeViewerState) => {
        return elements.map((element) => {
            if (element.id === nodeViewerState.activeNode.id)
                element = nodeViewerState.activeNode;
            return element;
        });
    };

    const SetFlow = (flow) => {
        const hasUpdatedActiveNode =
            nodeViewerState && nodeViewerState.activeNode;

        if (hasUpdatedActiveNode) {
            flow.elements = UpdateNode(flow.elements, nodeViewerState);
        }

        setInitialFlow(flow);
        setLoaded(true);
    };

    useEffect(() => {
        if (nodeViewerState.rfInstance !== undefined) {
            SetFlow(nodeViewerState.rfInstance.toObject());
        } else {
            LoadFlow(projectFilesState.activeRoot, projectFilesState.activeFlow)
                .then((flow) => {
                    SetFlow(flow);
                })
                .catch(() => {
                    history.push("/");
                });
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
