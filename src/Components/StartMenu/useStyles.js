import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
    createStyles({
        logoTitle: {
            fontFamily: "Martel",
            textTransform: "uppercase",
            margin: theme.spacing(4, 0, 2),
            color: "#fff",
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    })
);
