import { Grid, IconButton, Typography } from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import * as React from "react";
import PropTypes from "prop-types";

export const FileField = ({ label, value, action }) => {
    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{
                maxWidth: "100%",
            }}
        >
            <Grid item xs={12}>
                <Typography
                    variant="body1"
                    style={{
                        textAlign: "left",
                    }}
                >
                    {label}
                </Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography
                    variant="body2"
                    style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden ",
                        textAlign: "left",
                    }}
                >
                    {value ? value : "No file"}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <IconButton
                    color="secondary"
                    variant="contained"
                    onClick={action}
                >
                    <FolderIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

FileField.displayName = "FileField";

FileField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    action: PropTypes.func.isRequired,
};

export default React.memo(FileField);
