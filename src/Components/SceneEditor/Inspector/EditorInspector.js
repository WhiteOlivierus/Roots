import * as MUI from "@material-ui/core";
import * as React from "react";
import PropTypes from "prop-types";

const EditorInspector = ({ children }) => {
    return (
        <MUI.Box
            p={3}
            style={{
                position: "absolute",
                right: 0,
                top: 80,
                zIndex: 5,
                width: 275,
            }}
        >
            <MUI.Card>
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
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
};

export default React.memo(EditorInspector);
