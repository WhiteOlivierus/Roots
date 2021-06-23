import * as React from "react";
import * as MUI from "@material-ui/core";
import PropTypes from "prop-types";
import InspectorDrawer from "./InspectorDrawer";
import ColorPicker from "material-ui-color-picker";
import { useTheme } from "@material-ui/core";

const ZoneStyleDrawer = ({ onChange, selection, selectedZone }) => {
    const theme = useTheme();

    const [selected, setSelected] = React.useState({
        ...{
            strokeWidth: 2,
            stroke: "#ffffff",
            fill: theme.palette.primary.main,
        },
        ...selectedZone.style,
    });

    const handleStyleChange = ({ target }) => {
        setSelected({
            ...selected,
            [target.name]: target.value,
        });

        onChange((draft) => {
            draft.find((zone) => zone.id === selection).style = {
                ...draft.find((zone) => zone.id === selection).style,
                [target.name]: target.value,
            };
        });
    };

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
                value={selected.strokeWidth}
                error={!selected.strokeWidth}
                helperText={!selected.strokeWidth && "Give a stroke width"}
                onChange={({ target }) =>
                    handleStyleChange({
                        target: {
                            name: target.name,
                            value: Number(target.value),
                        },
                    })
                }
            />,
            <ColorPicker
                key="2"
                name="stroke"
                type="stroke"
                label="Outline color"
                variant="outlined"
                fullWidth
                defaultValue={selected.stroke}
                value={selected.stroke}
                onChange={(color) =>
                    handleStyleChange({
                        target: { name: "stroke", value: color },
                    })
                }
            />,
            <ColorPicker
                key="2"
                name="fill"
                type="fill"
                label="Fill color"
                variant="outlined"
                fullWidth
                defaultValue={selected.fill}
                value={selected.fill}
                onChange={(color) =>
                    handleStyleChange({
                        target: { name: "fill", value: color },
                    })
                }
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
