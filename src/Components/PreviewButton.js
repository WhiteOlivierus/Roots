import * as MUI from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import useBuild from "./useBuild";

const useStyles = MUI.makeStyles((theme) => ({
    fab: {
        position: "absolute",
        zIndex: 100000000,
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export const PreviewButton = () => {
    const classes = useStyles();

    const handleBuild = useBuild(true);

    return (
        <MUI.Tooltip title="preview">
            <MUI.Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={handleBuild}
            >
                <PlayCircleFilledIcon style={{ fill: "white" }} />
            </MUI.Fab>
        </MUI.Tooltip>
    );
};
