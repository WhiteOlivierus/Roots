import { useCallback } from "react";
import { Fab, makeStyles, Tooltip } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { SaveFlow } from "../Utilities/FlowHandler";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import useProjectFilesState from "../Context/ProjectFilesContext/ProjectFilesContext";
import useNodeViewerState from "../Context/NodeViewerContext/NodeViewerContext";
import { Build } from "../Utilities/BuildHandler";
import { SeparateNodesAndEdges } from "./FlowEditor/Nodes/NodeUtilities";

export const PreviewButton = () => {
    const classes = useStyles();

    const history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();
    const { nodeViewerState } = useNodeViewerState();

    const onBuild = useCallback(() => {
        SaveFlow(projectFilesState.activeFlow, nodeViewerState.rfInstance).then(
            () => {
                const FileName = projectFilesState.activeFlow.name.replace(
                    ".json",
                    ""
                );

                enqueueSnackbar(`Start building preview ${FileName}`, {
                    variant: "info",
                });

                var { nodes, edges } = SeparateNodesAndEdges(
                    nodeViewerState.rfInstance.getElements()
                );

                Build(projectFilesState.activeRoot, nodes, edges)
                    .then(({ buildHandle, id }) => {
                        projectFilesState.buildHandle = buildHandle;

                        setProjectFilesState(projectFilesState);

                        enqueueSnackbar(`Preview build successfully`, {
                            variant: "success",
                        });

                        history.push(`/preview/${id}`);
                    })
                    .catch((e) => {
                        enqueueSnackbar(e, {
                            variant: "error",
                        });
                    });
            }
        );
    }, [
        projectFilesState,
        nodeViewerState.rfInstance,
        enqueueSnackbar,
        setProjectFilesState,
        history,
    ]);

    return (
        <Tooltip title="preview">
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={onBuild}
            >
                <PlayCircleFilledIcon style={{ fill: "white" }} />
            </Fab>
        </Tooltip>
    );
};
const useStyles = makeStyles((theme) => ({
    fab: {
        position: "absolute",
        zIndex: 100000000,
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));
