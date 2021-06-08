import * as React from "react";
import * as MUI from "@material-ui/core";

import { useHistory } from "react-router-dom";
import {
    OpenRecentProject,
    UnRegisterRecentProject,
} from "../../Utilities/ProjectHandler";
import { withSnackbar } from "notistack";

import DescriptionIcon from "@material-ui/icons/Description";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import styled, { css } from "styled-components";

const ScrollBar = css`
    ::-webkit-scrollbar {
        width: 15px;
        height: 15px;
    }
    ::-webkit-scrollbar-thumb {
        background: #3b2400;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #f9d4ff;
    }
    ::-webkit-scrollbar-track {
        background: #ffffff;
        border-radius: 10px;
        box-shadow: inset 7px 10px 12px #f0f0f0;
    }
`;

const ScrollView = styled.div`
    ${ScrollBar}
    overflow-y: scroll;
    list-style-type: none;
    height: 100%;
`;

const RecentEntry = ({ files, enqueueSnackbar, onChange }) => {
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const history = useHistory();

    const onOpenRecentProject = React.useCallback(
        (fileHandle) => {
            OpenRecentProject(fileHandle)
                .then(({ activeRoot, activeFlow }) => {
                    projectFilesState.activeRoot = activeRoot;
                    projectFilesState.activeFlow = activeFlow;

                    setProjectFilesState(projectFilesState);

                    history.push("/flow");
                })
                .catch((e) => {
                    enqueueSnackbar(e, {
                        variant: "error",
                    });
                });
        },
        [enqueueSnackbar, history, projectFilesState, setProjectFilesState]
    );

    return (
        <ScrollView>
            {files &&
                files.map((file, index) => (
                    <MUI.ListItem
                        key={index}
                        button
                        onClick={() => onOpenRecentProject(file)}
                    >
                        <MUI.ListItemAvatar>
                            <MUI.Avatar>
                                <DescriptionIcon />
                            </MUI.Avatar>
                        </MUI.ListItemAvatar>
                        <MUI.ListItemText
                            primary={file.fileHandle.name}
                            secondary={file.timeStamp}
                        />
                        <MUI.ListItemSecondaryAction>
                            <MUI.IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                    UnRegisterRecentProject(
                                        file.fileHandle.name
                                    );
                                    onChange();
                                }}
                            >
                                <DeleteIcon />
                            </MUI.IconButton>
                        </MUI.ListItemSecondaryAction>
                    </MUI.ListItem>
                ))}
        </ScrollView>
    );
};

RecentEntry.displayName = "RecentEntry";

RecentEntry.defaultProps = {
    files: [],
};

RecentEntry.propTypes = {
    enqueueSnackbar: PropTypes.func,
    files: PropTypes.array,
    onChange: PropTypes.func,
};

export default withSnackbar(React.memo(RecentEntry));
