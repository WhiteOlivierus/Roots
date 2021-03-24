import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { memo } from "react";
import { nodeStyle } from "./Nodes/NodeStyle";
import { AllNodes } from "./Nodes/NodeTypes";

export const NodePreview = memo((props) => {
    const classes = nodeStyle();

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    const nodes = Object.keys(AllNodes).map((key) => {
        var node = AllNodes[key];

        if (node.default) return;

        return (
            <Grid item xs={12} key={key}>
                <Paper
                    onDragStart={(event) =>
                        onDragStart(event, key.toLowerCase())
                    }
                    draggable
                    className={(classes.root, "nodePreview")}
                    style={{
                        backgroundColor: node.color,
                    }}
                >
                    <Box p={2}>
                        <Typography variant="h6" gutterBottom>
                            {key} Node
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        );
    });

    return (
        <Grid container spacing={2} direction="column" alignItems="center">
            {nodes}
        </Grid>
    );
});
