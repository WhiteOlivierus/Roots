import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import NodePreview from "./NodePreview";

const useStyles = makeStyles({
    root: {
        maxWidth: 275,
    },
    title: {
        fontSize: 14,
    },
});

export const NodeBar = () => {
    const classes = useStyles();

    return (
        <Box p={2} style={{ position: "absolute", right: 0, zIndex: 5 }}>
            <Card className={classes.root}>
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant="h5" gutterBottom>
                                Nodes
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" gutterBottom>
                                You can drag the nodes in too the flow editor.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Divider />
                        </Grid>
                        <NodePreview />
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};
