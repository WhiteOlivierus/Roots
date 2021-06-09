import * as React from "react";
import * as ProjectHandler from "../../../Utilities/ProjectHandler";
import * as FlowHandler from "../../../Utilities/FlowHandler";
import * as FileHandler from "../../../Utilities/FileHandler.js";

import SaveIcon from "@material-ui/icons/Save";
import BuildIcon from "@material-ui/icons/Build";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import FolderIcon from "@material-ui/icons/Folder";

import useProjectFilesState from "../../../Context/ProjectFilesContext/ProjectFilesContext";
import useNodeViewerState from "../../../Context/NodeViewerContext/NodeViewerContext";

import { removeElements } from "react-flow-renderer";
import { defaultFlow } from "../../../Utilities/DefaultFlow";
import { RemoveExtension } from "../../../Utilities/StringTools.js";
import { useSnackbar } from "notistack";
import useBuild from "../../useBuild";

export function useFileActions() {
    const { enqueueSnackbar } = useSnackbar();

    const { projectFilesState } = useProjectFilesState();
    const { nodeViewerState } = useNodeViewerState();

    const handleNewFlow = React.useCallback(() => {
        FlowHandler.NewFlow(projectFilesState.activeRoot)
            .then(({ activeFlow }) => {
                projectFilesState.activeFlow = activeFlow;

                nodeViewerState.setElements((els) => removeElements(els, els));
                nodeViewerState.setElements(defaultFlow.elements);
            })
            .catch(() =>
                enqueueSnackbar(`New project could not be created`, {
                    variant: "error",
                })
            );
    }, [projectFilesState, nodeViewerState, enqueueSnackbar]);

    const handleNewProject = React.useCallback(() => {
        ProjectHandler.NewProject()
            .then(({ activeRoot, activeFlow }) => {
                projectFilesState.activeRoot = activeRoot;
                projectFilesState.activeFlow = activeFlow;
            })
            .catch(() => {
                enqueueSnackbar(`New project could not be created`, {
                    variant: "error",
                });
            });
    }, [enqueueSnackbar, projectFilesState]);

    const handleOpenFlow = React.useCallback(() => {
        FlowHandler.OpenFlow(projectFilesState.activeRoot)
            .then(({ activeFlow, flow }) => {
                projectFilesState.activeFlow = activeFlow;

                nodeViewerState.setElements((els) => removeElements(els, els));
                nodeViewerState.setElements(flow.elements);
            })
            .catch(() => {
                enqueueSnackbar(`Could not open flow`, {
                    variant: "error",
                });
            });
    }, [projectFilesState, nodeViewerState, enqueueSnackbar]);

    const handleOpenProject = React.useCallback(() => {
        ProjectHandler.OpenProject()
            .then(({ activeRoot, activeFlow }) => {
                projectFilesState.activeRoot = activeRoot;
                projectFilesState.activeFlow = activeFlow;

                let fileName = RemoveExtension(activeFlow.name);

                enqueueSnackbar(`Opened project ${fileName}`, {
                    variant: "success",
                });
            })
            .catch(() => {
                enqueueSnackbar(`Could not open project`, {
                    variant: "error",
                });
            });
    }, [enqueueSnackbar, projectFilesState]);

    const handleSaveFlow = React.useCallback(() => {
        let fileName = RemoveExtension(projectFilesState.activeFlow.name);

        FlowHandler.SaveFlow(
            projectFilesState.activeFlow,
            nodeViewerState.rfInstance
        )
            .then(() => {
                enqueueSnackbar(`${fileName} saved`, {
                    variant: "success",
                });
            })
            .catch(() => {
                enqueueSnackbar(`${fileName} was not saved`, {
                    variant: "error",
                });
            });
    }, [
        enqueueSnackbar,
        nodeViewerState.rfInstance,
        projectFilesState.activeFlow,
    ]);

    const handleSaveFlowAs = React.useCallback(() => {
        let fileName = RemoveExtension(projectFilesState.activeFlow.name);

        FlowHandler.SaveFlowAs(
            projectFilesState.activeRoot,
            nodeViewerState.rfInstance
        )
            .then((activeFlow) => {
                projectFilesState.activeFlow = activeFlow;

                const activeFlowName = RemoveExtension(activeFlow.name);
                enqueueSnackbar(`${fileName} saved as ${activeFlowName}`, {
                    variant: "success",
                });
            })
            .catch(() => {
                enqueueSnackbar(`${fileName} was not saved`, {
                    variant: "error",
                });
            });
    }, [enqueueSnackbar, nodeViewerState.rfInstance, projectFilesState]);

    const build = useBuild(false);

    const handleBuild = React.useCallback(() => {
        // TODO check if the builder is all ready there

        enqueueSnackbar(`Builder is being prepared`, {
            variant: "warning",
        });

        let buildHandle;
        FileHandler.FindDir(projectFilesState.activeRoot, "Build").then(
            (buildFolderHandle) => (buildHandle = buildFolderHandle)
        );

        fetch("./roots-builder.exe")
            .then((response) =>
                Promise.all([
                    buildHandle.getFileHandle("roots-builder.exe", {
                        create: true,
                    }),
                    response.blob(),
                ])
            )
            .then((args) => FileHandler.WriteFile(args[0], args[1]))
            .then((file) => FileHandler.SaveFileInFolder(buildHandle, file))
            .catch((e) => {
                if (e.message.includes("'name'")) return;
                enqueueSnackbar(e.message, {
                    variant: "error",
                });
            })
            .finally(() => {
                enqueueSnackbar(`Builder has been place in project folder`, {
                    variant: "success",
                });
                build();
            });
    }, [build, enqueueSnackbar, projectFilesState.activeRoot]);

    useKeyboardShortCuts(
        handleSaveFlow,
        handleSaveFlowAs,
        handleOpenFlow,
        handleOpenProject,
        handleNewFlow,
        handleBuild
    );

    return [
        { divide: "" },
        {
            name: "New Flow",
            action: handleNewFlow,
            icon: <InsertDriveFileIcon />,
            tooltip: "Ctrl-N",
            shortCut: "Ctrl-N",
        },
        {
            name: "New Project",
            action: handleNewProject,
            icon: <InsertDriveFileIcon />,
            tooltip: "Ctrl-Shift-N",
            shortCut: "Ctrl-Shift-N",
        },
        { divide: "" },
        {
            name: "Open Flow",
            action: handleOpenFlow,
            icon: <FolderIcon />,
            tooltip: "Ctrl-O",
            shortCut: "Ctrl-O",
        },
        {
            name: "Open Project",
            action: handleOpenProject,
            icon: <FolderIcon />,
            tooltip: "Ctrl-Shift-O",
            shortCut: "Ctrl-Shift-O",
        },
        { divide: "" },
        {
            name: "Save Flow",
            action: handleSaveFlow,
            icon: <SaveIcon />,
            tooltip: "Ctrl-S",
            shortCut: "Ctrl-S",
        },
        {
            name: "Save Flow As",
            action: handleSaveFlowAs,
            icon: <SaveIcon />,
            tooltip: "Ctrl-Shift-S",
            shortCut: "Ctrl-Shift-S",
        },
        { divide: "" },
        {
            name: "Build",
            action: handleBuild,
            icon: <BuildIcon />,
            tooltip: "Ctrl-Shift-B",
            shortCut: "Ctrl-Shift-B",
        },
    ];
}
function useKeyboardShortCuts(
    handleSaveFlow,
    handleSaveFlowAs,
    handleOpenFlow,
    handleOpenProject,
    handleNewFlow,
    handleBuild
) {
    React.useEffect(() => {
        window.addEventListener("keydown", shortCuts, true);
        return () => {
            window.removeEventListener("keydown", shortCuts, true);
        };
    });

    const shortCuts = (e) => {
        if ((e.ctrlKey === true || e.metaKey === true) && e.key === "s") {
            e.preventDefault();
            handleSaveFlow();
            return;
        }

        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyS") {
            e.preventDefault();
            handleSaveFlowAs();
            return;
        }

        if ((e.ctrlKey === true || e.metaKey === true) && e.key === "o") {
            e.preventDefault();
            handleOpenFlow();
            return;
        }

        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyO") {
            e.preventDefault();
            handleOpenProject();
            return;
        }

        if ((e.ctrlKey === true || e.metaKey === true) && e.key === "n") {
            e.preventDefault();
            handleNewFlow();
            return;
        }

        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyN") {
            e.preventDefault();
            handleNewFlow();
            return;
        }

        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyB") {
            e.preventDefault();
            handleBuild();
            return;
        }
    };
}
