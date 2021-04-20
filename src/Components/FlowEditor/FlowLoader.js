import * as React from "react";
import { useHistory } from "react-router-dom";
import useNodeViewerState from "../../Context/NodeViewerContext/NodeViewerContext";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import { LoadFlow } from "../../Utilities/FlowHandler";
import { SeparateNodesAndEdges } from "./Nodes/NodeUtilities";
import FlowEditor from "./FlowEditor";
import useOnUnload from "../../Utilities/UseOnUnLoad";
// import GoToOnReload from "../../Utilities/GoToOnReload";

const FlowLoader = () => {
    useOnUnload();

    const [initialFlow, setInitialFlow] = React.useState({});
    const [loaded, setLoaded] = React.useState(false);

    const { projectFilesState } = useProjectFilesState();
    const { nodeViewerState } = useNodeViewerState();

    const SetFlow = React.useCallback(
        (flow) => {
            const hasUpdatedActiveNode =
                nodeViewerState && nodeViewerState.activeNode;

            if (hasUpdatedActiveNode) {
                flow.elements = UpdateNode(flow.elements, nodeViewerState);

                flow.elements = UpdateEdges(flow.elements);
            }

            setInitialFlow(flow);
            setLoaded(true);
        },
        [nodeViewerState]
    );

    const history = useHistory();

    React.useEffect(() => {
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
    }, [SetFlow, history, nodeViewerState.rfInstance, projectFilesState]);

    return (
        <>
            {loaded === true ? (
                <FlowEditor flow={initialFlow} />
            ) : (
                <h1>Loading</h1>
            )}
        </>
    );
};

FlowLoader.displayName = "FlowLoader";
FlowLoader.propTypes = {};
export default React.memo(FlowLoader);

export const UpdateNode = (elements, nodeViewerState) => {
    return elements.map((element) => {
        if (element.id !== nodeViewerState.activeNode.id) return element;

        element = nodeViewerState.activeNode;

        return element;
    });
};

export const UpdateEdges = (elements) => {
    var { nodes, edges } = SeparateNodesAndEdges(elements);

    var allZones = nodes.filter((node) => {
        return node.data.zones && node.data.zones.length > 0;
    });

    allZones = allZones.map((zone) => {
        return zone.data.zones.map((zone) => zone.id);
    });

    allZones.push("a");

    allZones = [].concat.apply([], allZones);

    edges = edges.filter((edge) => {
        const newLocal =
            allZones.includes(edge.sourceHandle) &&
            allZones.includes(edge.targetHandle);
        return newLocal;
    });

    return nodes.concat(edges);
};
