import * as MUI from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { fabStyle } from "./StartMenu/fabStyle";
import useBuild from "./useBuild";

export const PreviewButton = () => {
    const handleBuild = useBuild(true);

    return (
        <MUI.Tooltip title="preview">
            <MUI.Fab
                color="secondary"
                aria-label="add"
                className={fabStyle().fab}
                onClick={handleBuild}
            >
                <PlayCircleFilledIcon style={{ fill: "white" }} />
            </MUI.Fab>
        </MUI.Tooltip>
    );
};
