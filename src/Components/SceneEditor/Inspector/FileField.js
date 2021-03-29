import { Grid, IconButton, Typography } from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';

export const FileField = (props) => {
    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{
                maxWidth: "100%"
            }}
        >
            <Grid item xs={12}>
                <Typography
                    variant="body1"
                    style={{
                        textAlign: "left"
                    }}>
                    {props.label}
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography
                    variant="body2"
                    style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden ",
                        textAlign: "left"
                    }}>
                    {props.value ? props.value : "No file"}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={props.action}
                >
                    <FolderIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};
