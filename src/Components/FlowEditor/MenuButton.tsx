import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@material-ui/core";
import React from "react";

export const MenuButton = React.memo<{ button: any }>(({ button }) => {
    return (
        <Tooltip title={button.tooltip}>
            <ListItem button onClick={button.action}>
                <ListItemIcon>{button.icon}</ListItemIcon>
                <ListItemText primary={button.name} />
            </ListItem>
        </Tooltip>
    );
});
