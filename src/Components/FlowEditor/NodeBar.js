import * as MUI from "@material-ui/core";
import NodePreview from "./NodePreview";

export const NodeBar = () => (
    <MUI.Paper square style={{ height: "100%" }}>
        <MUI.Box p={4}>
            <MUI.Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
            >
                <MUI.Grid item>
                    <MUI.Typography variant="h5">Nodes</MUI.Typography>
                </MUI.Grid>
                <MUI.Grid item>
                    <MUI.Typography variant="body1">
                        You can drag the nodes in too the flow editor.
                    </MUI.Typography>
                </MUI.Grid>
                <NodePreview />
            </MUI.Grid>
        </MUI.Box>
    </MUI.Paper>
);
