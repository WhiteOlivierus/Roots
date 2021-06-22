import PropTypes from "prop-types";
import * as React from "react";
import * as Router from "react-router-dom";

import { LoadFlow } from "../../Utilities/FlowHandler";
import { SeparateNodesAndEdges } from "./Nodes/NodeUtilities";
import { FindFile, GetImageBlobPath } from "../../Utilities/FileHandler";
import { isNode } from "react-flow-renderer";

import useNodeViewerState from "../../Context/NodeViewerContext/NodeViewerContext";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import FlowEditor from "./FlowEditor";
import useOnUnload from "../../Utilities/UseOnUnLoad";

const FlowLoader = ({ history }) => {
    useOnUnload("/roots");

    const [initialFlow, setInitialFlow] = React.useState(undefined);

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
        },
        [nodeViewerState]
    );

    React.useEffect(() => {
        if (nodeViewerState.rfInstance !== undefined) {
            SetFlow(nodeViewerState.rfInstance.toObject());
        } else {
            LoadFlow(projectFilesState.activeRoot, projectFilesState.activeFlow)
                .then((flow) =>
                    LoadImagesFlow(flow, projectFilesState).then(
                        (loadedElements) => {
                            SetFlow({
                                ...flow,
                                elements: [...loadedElements],
                            });
                        }
                    )
                )
                .catch(() => history.push("/roots"));
        }
    }, [SetFlow, history, nodeViewerState.rfInstance, projectFilesState]);

    return (
        <>
            {initialFlow ? <FlowEditor flow={initialFlow} /> : <h1>Loading</h1>}
        </>
    );
};

FlowLoader.displayName = "FlowLoader";

FlowLoader.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default React.memo(Router.withRouter(FlowLoader));

export const UpdateNode = (elements, nodeViewerState) => {
    return elements.map((element) => {
        if (element.id !== nodeViewerState.activeNode.id) return element;

        element = nodeViewerState.activeNode;

        return element;
    });
};

export const UpdateEdges = (elements) => {
    let { nodes, edges } = SeparateNodesAndEdges(elements);

    let allZones = nodes.filter(
        (node) => node.data.zones && node.data.zones.length > 0
    );

    allZones = allZones.map((zone) => zone.data.zones.map((zone) => zone.id));

    allZones.push("a");

    allZones = [].concat.apply([], allZones);

    edges = edges.filter(
        (edge) =>
            allZones.includes(edge.sourceHandle) &&
            allZones.includes(edge.targetHandle)
    );

    return nodes.concat(edges);
};

const LoadImagesFlow = (flow, projectFilesState) => {
    const test = flow.elements.map(async (element) => {
        const data = element.data;

        if (!(isNode(element) && "image" in data)) return element;

        const newLocal = FindFile(projectFilesState.activeRoot, data.image)
            .then((fileHandle) => GetImageBlobPath(fileHandle))
            .then((blobUrl) => {
                const image = new Image();
                image.scr = blobUrl;
                element.data.imageSrc = blobUrl;
                return element;
            });
        return newLocal;
    });
    return Promise.all(test);
};
