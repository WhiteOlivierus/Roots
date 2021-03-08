import { Component } from "react";
import { Card, CardContent, Grid, List, Typography } from "@material-ui/core";

import { get } from "idb-keyval";

import { RecentEntry } from "./RecentEntry";

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
                                <RecentEntry files={this.state.files} />
                            )}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}
