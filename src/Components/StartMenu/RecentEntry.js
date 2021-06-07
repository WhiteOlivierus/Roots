import * as React from "react";
import * as MUI from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { OpenRecentProject } from "../../Utilities/ProjectHandler";
import { withSnackbar } from "notistack";

import DescriptionIcon from "@material-ui/icons/Description";
import PropTypes from "prop-types";
import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import styled from "styled-components";

const StyledDiv = styled.div`
    overflow-y: scroll;
    height: 100%;
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

const RecentEntry = ({ files, enqueueSnackbar }) => {
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
        <StyledDiv>
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
                            primary={file.name}
                            secondary={file.timestamp}
                        />
                    </MUI.ListItem>
                ))}
        </StyledDiv>
    );
};

RecentEntry.displayName = "RecentEntry";

RecentEntry.defaultProps = {
    files: [],
};

RecentEntry.propTypes = {
    files: PropTypes.array,
    enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(React.memo(RecentEntry));
