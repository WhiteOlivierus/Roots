import {
    Box,
    Card,
    CardContent,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { NodePreview } from "./NodePreview";

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
        <Box p={2} style={{ position: "absolute", left: 0, zIndex: 5 }}>
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
