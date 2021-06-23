import * as React from "react";
import * as MUI from "@material-ui/core";
import PropTypes from "prop-types";
import InspectorDrawer from "./InspectorDrawer";
import ColorPicker from "material-ui-color-picker";
import { useTheme } from "@material-ui/core";

const ZoneStyleDrawer = ({ onChange, selection, selectedZone }) => {
    const theme = useTheme();

    const [selected] = React.useState({
        style: {
            ...{
                strokeWidth: 2,
                stroke: "#ffffff",
                fill: theme.palette.primary.main,
            },
            ...selectedZone.style,
        },
        ...selectedZone,
    });

    const handleStyleChange = ({ target }) =>
        onChange((draft) => {
            const zoneIndex = draft.findIndex((zone) => zone.id === selection);
            const newStyle = {
                ...draft[zoneIndex].style,
                [target.name]: target.value,
            };
            draft[zoneIndex].style = newStyle;
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
                defaultValue={selected.style.stroke}
                value={selected.style.stroke}
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
                defaultValue={selected.style.fill}
                value={selected.style.fill}
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
