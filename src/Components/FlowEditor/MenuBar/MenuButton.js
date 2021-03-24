import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@material-ui/core";
import { memo } from "react";

export const MenuButton = memo(({ button }) => {
    return (
        <Tooltip title={button.tooltip}>
            <ListItem button onClick={button.action}>
                <ListItemIcon>{button.icon}</ListItemIcon>
                <ListItemText primary={button.name} />
            </ListItem>
        </Tooltip>
    );
});
