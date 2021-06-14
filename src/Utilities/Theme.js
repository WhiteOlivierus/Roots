import { createMuiTheme } from "@material-ui/core/styles";
import "../fonts.css";

export const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: "#d45500",
            light: "rgb(220, 119, 51)",
            dark: "rgb(148, 59, 0)",
            contrastText: "#fff",
        },
        secondary: {
            main: "#3b2400",
            light: "rgb(98, 79, 51)",
            dark: "rgb(41, 25, 0)",
            contrastText: "#fff",
        },
        error: {
            main: "#f44336",
        },
        warning: {
            main: "#ff9800",
        },
        info: {
            main: "#2196f3",
        },
        success: {
            main: "#4caf50",
        },
        divider: "rgba(0, 0, 0, 0.12)",
    },
    typography: {
        h1: {
            fontFamily: "Martel",
            fontWeight: 1000,
        },
    },
    shape: {
        borderRadius: 4,
    },
    overrides: {
        MuiSwitch: {
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: 8,
            },
            switchBase: {
                padding: 1,
                "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
                    transform: "translateX(16px)",
                    color: "#fff",
                    "& + $track": {
                        opacity: 1,
                        border: "none",
                    },
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },
            track: {
                borderRadius: 13,
                border: "1px solid #bdbdbd",
                backgroundColor: "#fafafa",
                opacity: 1,
                transition:
                    "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            },
        },
    },
    props: {
        MuiTooltip: {
            arrow: true,
        },
    },
});

/* export const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: "#e040fb",
        },
        secondary: {
            main: "#f50057",
        },
    },
    typography: {
        h1: {
            fontFamily: "Martel",
            fontWeight: 1000,
        },
    },
});
 */
