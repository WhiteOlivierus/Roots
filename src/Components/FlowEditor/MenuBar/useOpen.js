import * as React from "react";

export const useOpen = (initial) => {
    const [open, setOpenDrawer] = React.useState(initial);

    const handleOpen = React.useCallback(() => setOpenDrawer(true), [
        setOpenDrawer,
    ]);

    const handleClose = React.useCallback(() => setOpenDrawer(false), [
        setOpenDrawer,
    ]);

    return [open, handleOpen, handleClose];
};
