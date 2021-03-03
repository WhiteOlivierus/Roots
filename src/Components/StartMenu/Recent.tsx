import React, { Component, useContext } from "react";
import { Card, CardContent, Grid, List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";

import { get } from "idb-keyval";
import { useStoreActions } from "react-flow-renderer";

import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";
import { OpenRecentProject } from "../../Utilities/ProjectHandler";
import { useNodeViewerState } from "../FlowEditor/Context/NodeViewerContext";
import { authStore } from "../../Context/AppState";

export class Recent extends Component {
    state = {
        files: [],
        loading: true,
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const files = await get("files");
        this.setState({ files: files, loading: false });
    }

    render() {
        return (
            <Grid item xs={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h2">Recent Projects</Typography>
                        <List component="nav" aria-label="main mailbox folders">
                            {this.state.loading ? (
                                <Typography variant="h3">Loading...</Typography>
                            ) : (
                                <Test files={this.state.files} />
                            )}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export function Test(props) {
    const { nodeViewerState, setNodeViewerState } = useNodeViewerState();
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const setElements = useStoreActions((actions) => actions.setElements);

    const states = {
        nodeViewerState,
        projectFilesState,
        setNodeViewerState,
        setProjectFilesState,
    };

    return (
        <div>
            {props.files.map((file, index) => (
                <ListItem key={index} button onClick={OpenRecentProject(states, file, setElements)}>
                    <ListItemText primary={file.name} />
                </ListItem>
            ))}
        </div>
    );
}
