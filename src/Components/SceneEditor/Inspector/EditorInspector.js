import { Box, Card, CardContent, Divider, Typography } from "@material-ui/core";
import { memo } from "react";
import { SceneSettingsDrawer } from "./SceneSettingsDrawer";

const EditorInspector = memo((props) => {
    return (
        <Box
            p={3}
            style={{
                position: "absolute",
                right: 0,
                top: 80,
                zIndex: 5,
                width: 275
            }}
        >
            <Card >
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Inspector
                    </Typography>
                    <Divider />
                    <SceneSettingsDrawer />
                    {props.selection && (
                        <>
                            <Divider />
                            <Typography variant="h6">
                                Selection settings
                        </Typography>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
});

export default EditorInspector;


