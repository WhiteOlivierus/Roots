import { Box, Card, CardContent, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { nodeStyle } from "./Nodes/NodeStyle";

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
    },
    title: {
        fontSize: 14,
    },
});

export default () => {
    const classes = useStyles();

    return (
        <Box p={5} style={{ position: "absolute", left: 0, zIndex: 5 }}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        You can drag the nodes in too the flow editor.
                    </Typography>
                    <NodePreview />
                </CardContent>
            </Card>
        </Box>
    );
};

export function NodePreview(props) {
    const classes = nodeStyle();

    const nodes = [
        {
            name: "Scene",
            color: "grey",
        },
        {
            name: "End",
            color: "red",
        },
    ];

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <Grid container spacing={2} direction="column" alignItems="center">
            {nodes.map((node, index) => {
                return (
                    <Grid item xs={12} key={index}>
                        <Paper
                            onDragStart={(event) => onDragStart(event, node.name.toLowerCase())}
                            draggable
                            className={classes.root}
                            style={{ backgroundColor: node.color }}
                        >
                            <Box p={1}>
                                <Typography variant="h6" gutterBottom>
                                    {node.name} Node
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
}
