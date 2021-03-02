import React, { Component } from "react";
import { Card, CardContent, Grid, List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";

import { get } from "idb-keyval";
import { useStoreActions } from "react-flow-renderer";

import { useProjectFilesState } from "../../Context/ProjectFiles/ProjectFilesContext";
import { OpenRecentProject } from "../../Utilities/ProjectHandler";

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
    const { projectFilesState, setProjectFilesState } = useProjectFilesState();
    const setElements = useStoreActions((actions) => actions.setElements);

    return (
        <div>
            {props.files.map((file, index) => (
                <ListItem key={index} button onClick={OpenRecentProject(file, projectFilesState, setElements)}>
                    <ListItemText primary={file.name} />
                </ListItem>
            ))}
        </div>
    );
}
