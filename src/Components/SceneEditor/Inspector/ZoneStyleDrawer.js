import * as React from "react";
import * as MUI from "@material-ui/core";
import PropTypes from "prop-types";
import InspectorDrawer from "./InspectorDrawer";

const ZoneStyleDrawer = ({ onChange, selection, selectedZone }) => {
    const [selected, setSelected] = React.useState({
        ...{
            style: {
                strokeWidth: 2,
                ...selectedZone.style,
            },
        },
        ...selectedZone,
    });

    const handleStyleChange = ({ target }) =>
        onChange((draft) => {
            const zoneIndex = draft.findIndex((zone) => zone.id === selection);
            const newLocal = {
                ...draft[zoneIndex].style,
                [target.name]: Number(target.value),
            };
            draft[zoneIndex].style = newLocal;
            setSelected({
                ...selected,
                style: {
                    ...selected.style,
                    ...newLocal,
                },
            });
        });

    const form = {
        name: "Zone style settings",
        inputs: [
            <MUI.TextField
                key="1"
                name="strokeWidth"
                type="strokeWidth"
                label="Stroke width"
                variant="outlined"
                fullWidth
                value={selected.style.strokeWidth}
                error={!selected.style.strokeWidth}
                helperText={
                    !selected.style.strokeWidth && "Give a stroke width"
                }
                onChange={handleStyleChange}
            />,
        ],
    };

    return <InspectorDrawer form={form} />;
};

ZoneStyleDrawer.propTypes = {
    onChange: PropTypes.func,
    selectedZone: PropTypes.object,
    selection: PropTypes.any,
};

export default ZoneStyleDrawer;
