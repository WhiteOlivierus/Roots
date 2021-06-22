import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { memo } from "react";
import { nodeStyle } from "./Nodes/NodeStyle";
import { AllNodes } from "./Nodes/NodeTypes";

const NodePreview = () => {
    const classes = nodeStyle();

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return Object.keys(AllNodes)
        .filter((key) => !AllNodes[key].default)
        .map((key) => {
            var node = AllNodes[key];

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
                            width: 160,
                            height: 90,
                        }}
                    >
                        <Box p={2}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                style={{ color: "white" }}
                            >
                                {key} Node
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            );
        });
};

NodePreview.displayName = "NodePreview";
NodePreview.propTypes = {};
export default memo(NodePreview);
