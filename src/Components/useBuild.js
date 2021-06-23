import * as React from "react";
import * as MUI from "@material-ui/core";

import useProjectFilesState from "../Context/ProjectFilesContext/ProjectFilesContext";
import useNodeViewerState from "../Context/NodeViewerContext/NodeViewerContext";

import { SaveFlow } from "../Utilities/FlowHandler";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Build } from "../Utilities/BuildHandler";
import { SeparateNodesAndEdges } from "./FlowEditor/Nodes/NodeUtilities";
import { Button } from "@material-ui/core";
import { useModal } from "react-modal-hook";
import { get, set } from "idb-keyval";

const useBuild = (isPreview) => {
    const preview = React.useRef(isPreview);

    const history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const { projectFilesState } = useProjectFilesState();
    const { nodeViewerState } = useNodeViewerState();

    const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
        <MUI.Dialog open={open} onExited={onExited} onClose={hideModal}>
            <MUI.Box p={4}>
                <MUI.DialogTitle>How to build</MUI.DialogTitle>
                <MUI.DialogContent>
                    <MUI.List dense>
                        <MUI.ListItem>
                            <MUI.ListItemText primary="1. Find your project in the windows explorer" />
                        </MUI.ListItem>
                        <MUI.ListItem>
                            <MUI.ListItemText primary="2. Navigate too the build folder" />
                        </MUI.ListItem>
                        <MUI.ListItem>
                            <MUI.ListItemText primary="3. Execute `Roots-builder.exe` and wait for it to be done" />
                        </MUI.ListItem>
                        <MUI.ListItem>
                            <MUI.ListItemText primary="4. Share the build file in the build folder" />
                        </MUI.ListItem>
                    </MUI.List>
                    <img
                        src="./tutorial.png"
                        alt="build tutorial"
                        width="100%"
                    />
                </MUI.DialogContent>
                <MUI.DialogActions>
                    <MUI.Button
                        color="secondary"
                        variant="contained"
                        onClick={hideModal}
                    >
                        Understood
                    </MUI.Button>
                </MUI.DialogActions>
            </MUI.Box>
        </MUI.Dialog>
    ));

    return React.useCallback(() => {
        get("firstTimeBuild").then((hasBuild) => {
            if (!hasBuild) {
                showModal();
                set("firstTimeBuild", true);
            }
        });

        SaveFlow(projectFilesState.activeFlow, nodeViewerState.rfInstance)
            .then(() => {
                let { nodes, edges } = SeparateNodesAndEdges(
                    nodeViewerState.rfInstance.getElements()
                );

                if (preview.current)
                    enqueueSnackbar(`Building preview`, {
                        variant: "info",
                    });

                return Build(
                    projectFilesState.activeRoot,
                    nodes,
                    edges,
                    preview.current
                );
            })
            .then(({ buildHandle, id }) => {
                projectFilesState.buildHandle = buildHandle;

                const FileName = projectFilesState.activeFlow.name.replace(
                    ".json",
                    ""
                );

                if (!preview.current)
                    enqueueSnackbar(
                        `This is how you start building
                    ${preview.current ? "Preview" : ""} ${FileName}`,
                        {
                            variant: "info",
                            action: (
                                <Button size="small" onClick={showModal}>
                                    Info
                                </Button>
                            ),
                        }
                    );
                else
                    enqueueSnackbar(`Preview build success`, {
                        variant: "success",
                    });

                if (preview.current) {
                    history.push(`/preview/${id}`);
                }
            })
            .catch((e) => {
                enqueueSnackbar(e.message, {
                    variant: "error",
                });
            });
    }, [
        projectFilesState,
        nodeViewerState.rfInstance,
        enqueueSnackbar,
        showModal,
        history,
    ]);
};

export default useBuild;
