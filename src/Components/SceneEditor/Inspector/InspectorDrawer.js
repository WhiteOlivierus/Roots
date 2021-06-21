import * as React from "react";
import * as MUI from "@material-ui/core";

import PropTypes from "prop-types";

import { useOpen } from "../../FlowEditor/MenuBar/useOpen";
import InspectorDrawerHeader from "./InspectorDrawerHeader";

const InspectorDrawer = ({ form }) => {
    const [open, handleOpen, handleClose] = useOpen(true);

    return (
        <MUI.Box pb={open && 2}>
            <MUI.Divider />
            <InspectorDrawerHeader
                open={open}
                handleClose={handleClose}
                handleOpen={handleOpen}
                form={form}
            />
            <MUI.Collapse in={open} timeout="auto" unmountOnExit>
                <MUI.Grid container spacing={2} direction="column">
                    {form.inputs.map((input, i) => (
                        <MUI.Grid item key={`${form.name}_${i}`}>
                            {input}
                        </MUI.Grid>
                    ))}
                </MUI.Grid>
            </MUI.Collapse>
        </MUI.Box>
    );
};

InspectorDrawer.propTypes = {
    form: PropTypes.shape({
        inputs: PropTypes.shape({
            map: PropTypes.func,
        }),
        name: PropTypes.any,
    }),
};

export default InspectorDrawer;
