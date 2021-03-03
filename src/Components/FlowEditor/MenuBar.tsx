import React from "react";
import {
    AppBar,
    Box,
    createStyles,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
    Toolbar,
    Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useProjectFilesState } from "../ProjectFilesContext/ProjectFilesContext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    })
);

export function MenuBar(props) {
    const classes = useStyles();

    const { projectFilesState, setProjectFilesState } = useProjectFilesState();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box style={{ position: "relative", zIndex: 6 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Roots -
                        {projectFilesState === undefined ? projectFilesState.activeRoot.name : "No project loaded"}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={open}>
                <IconButton onClick={handleDrawerClose}>back</IconButton>
                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}
