import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@material-ui/core";
import { memo } from "react";
import PropTypes from "prop-types";
export const MenuButton = ({ button }) => {
    return (
        <Tooltip title={button.tooltip}>
            <ListItem button onClick={button.action}>
                <ListItemIcon>{button.icon}</ListItemIcon>
                <ListItemText primary={button.name} />
            </ListItem>
        </Tooltip>
    );
};

MenuButton.displayName = "MenuButton";
MenuButton.propTypes = { button: PropTypes.object.isRequired };
export default memo(MenuButton);
