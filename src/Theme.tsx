import { createMuiTheme } from "@material-ui/core/styles";
import "./fonts.css";

export const theme = createMuiTheme({
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
