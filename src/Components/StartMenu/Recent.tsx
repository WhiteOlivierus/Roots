import React from "react";
import { Box, Card, CardContent, Grid, List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";
import { useStyles } from "./useStyles";

export function Recent(props) {
    const classes = useStyles();
    return (
        <Grid item direction="column" xs={6}>
            <Card>
                <CardContent>
                    <Typography variant="h2">Recent Projects</Typography>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </Grid>
    );
}
