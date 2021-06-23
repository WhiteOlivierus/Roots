import * as React from "react";
import * as MUI from "@material-ui/core";
import PropTypes from "prop-types";
import InspectorDrawer from "./InspectorDrawer";

const SelectionDrawer = ({ onChange, selection, selectedZone }) => {
    const handleToggleZone = ({ target }) =>
        onChange((draft) => {
            draft.find((zone) => zone.id === selection).isZone = target.checked;
        });

    const handleZoneName = ({ target }) =>
        onChange((draft) => {
            draft.find((zone) => zone.id === selection).name = target.value;
        });

    const form = {
        name: "Selection settings",
        inputs: [
            <MUI.FormControlLabel
                key="0"
                control={
                    <MUI.Switch
                        key="0"
                        name="isInteractable"
                        checked={selectedZone.isZone || false}
                        onChange={handleToggleZone}
                    />
                }
                label="Is interactable"
            />,
            <MUI.TextField
                style={{ display: selectedZone.isZone ? "block" : "none" }}
                key="1"
                name="zoneName"
                type="zoneName"
                label="Interactable name"
                variant="outlined"
                fullWidth
                value={selectedZone.name || ""}
                error={!selectedZone.name}
                helperText={!selectedZone.name && "Interactable needs a name"}
                onChange={handleZoneName}
            />,
        ],
    };

    return <InspectorDrawer form={form} />;
};

SelectionDrawer.propTypes = {
    onChange: PropTypes.func,
    selectedZone: PropTypes.shape({
        isZone: PropTypes.bool,
        name: PropTypes.string,
    }),
    selection: PropTypes.any,
};

export default SelectionDrawer;
