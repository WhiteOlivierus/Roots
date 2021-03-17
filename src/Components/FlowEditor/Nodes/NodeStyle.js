import { createStyles, makeStyles, Theme } from "@material-ui/core";

const handleTextSize = 0.5;

export const nodeStyle = makeStyles((theme) =>
    createStyles({
        root: {
            width: 160,
            height: 90,
        },
        handleRoot: {
            display: "flex",
            flexDirection: "row",
        },
        handleText: {
            fontSize: `${handleTextSize}rem`,
            position: "absolute",
            top: `-${handleTextSize / 2}rem`,
            right: 10,
            margin: 0,
            padding: 0,
        },
    })
);
