import { Box, Card, CardContent, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
    },
    title: {
        fontSize: 14,
    },
});

const nodes = [
    {
        name: "Scene",
        color: "grey",
    },
    {
        name: "Output",
        color: "red",
    },
];

export default () => {
    const classes = useStyles();

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <Box p={5} style={{ position: "absolute", left: 0, zIndex: 5 }}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        You can drag the nodes in too the flow editor.
                    </Typography>
                    <Grid container spacing={2} direction="column">
                        {nodes.map((node, index) => {
                            return (
                                <Grid item xs={12} key={index}>
                                    <Paper
                                        onDragStart={(event) => onDragStart(event, node.name.toLowerCase())}
                                        draggable
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
                </CardContent>
            </Card>
        </Box>
    );
};
