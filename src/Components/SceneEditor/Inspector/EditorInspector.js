import * as MUI from "@material-ui/core";
import * as React from "react";
import PropTypes from "prop-types";

const EditorInspector = ({ children }) => {
    return (
        <MUI.Box pl={3} height="100%">
            <MUI.Card square={true} style={{ height: "100%" }}>
                <MUI.CardContent>
                    <MUI.Typography variant="h5" gutterBottom>
                        Inspector
                    </MUI.Typography>
                    {children}
                </MUI.CardContent>
            </MUI.Card>
        </MUI.Box>
    );
};

EditorInspector.displayName = "EditorInspector";

EditorInspector.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default React.memo(EditorInspector);
