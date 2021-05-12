import { useCallback, useRef } from "react";
import { SaveFlow } from "../Utilities/FlowHandler";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import useProjectFilesState from "../Context/ProjectFilesContext/ProjectFilesContext";
import useNodeViewerState from "../Context/NodeViewerContext/NodeViewerContext";
import { Build } from "../Utilities/BuildHandler";
import { SeparateNodesAndEdges } from "./FlowEditor/Nodes/NodeUtilities";

const useBuild = (p) => {
    const preview = useRef(p);

    const history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();
    const { nodeViewerState } = useNodeViewerState();

    return useCallback(() => {
        SaveFlow(projectFilesState.activeFlow, nodeViewerState.rfInstance)
            .then(() => {
                const FileName = projectFilesState.activeFlow.name.replace(
                    ".json",
                    ""
                );

                enqueueSnackbar(
                    `Start building
                     ${preview.current ? "Preview" : ""} ${FileName}`,
                    {
                        variant: "info",
                    }
                );

                let { nodes, edges } = SeparateNodesAndEdges(
                    nodeViewerState.rfInstance.getElements()
                );

                return Build(
                    projectFilesState.activeRoot,
                    nodes,
                    edges,
                    preview.current
                );
            })
            .then(({ buildHandle, id }) => {
                projectFilesState.buildHandle = buildHandle;

                setProjectFilesState(projectFilesState);

                enqueueSnackbar(
                    `${preview.current ? "Preview" : ""} build successfully`,
                    {
                        variant: "success",
                    }
                );
                if (preview.current) {
                    history.push(`/preview/${id}`);
                }
            })
            .catch((e) => {
                enqueueSnackbar(e, {
                    variant: "error",
                });
            });
    }, [
        projectFilesState,
        nodeViewerState.rfInstance,
        enqueueSnackbar,
        preview,
        setProjectFilesState,
        history,
    ]);
};

export default useBuild;
