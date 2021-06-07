import { makeStyles } from "@material-ui/core";

export const fabStyle = makeStyles((theme) => ({
    fab: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));
