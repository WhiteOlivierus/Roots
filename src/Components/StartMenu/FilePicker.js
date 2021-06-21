import * as React from "react";
import * as MUI from "@material-ui/core";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";

const FilePicker = ({ onClick, ...rest }) => (
    <MUI.TextField
        {...rest}
        variant="outlined"
        fullWidth
        disabled
        InputProps={{
            endAdornment: (
                <IconButton onClick={onClick}>
                    <FolderIcon />
                </IconButton>
            ),
        }}
    />
);

FilePicker.propTypes = {
    error: PropTypes.any,
    helperText: PropTypes.any,
    label: PropTypes.any,
    name: PropTypes.any,
    onClick: PropTypes.any,
    type: PropTypes.any,
    value: PropTypes.any,
};

export default FilePicker;
