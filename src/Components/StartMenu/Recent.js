import PropTypes from "prop-types";
import * as React from "react";
import * as MUI from "@material-ui/core";

import { get } from "idb-keyval";

import RecentEntry from "./RecentEntry";
import AddIcon from "@material-ui/icons/Add";

export const Recent = ({ onClick }) => {
    const [files, setFiles] = React.useState(undefined);

    const GetFiles = () => get("files").then((files) => setFiles(files));

    React.useEffect(() => {
        let isSubscribed = true;
        get("files").then((files) => {
            if (isSubscribed) setFiles(files);
        });
        return () => (isSubscribed = false);
    }, [files]);

    return (
        <MUI.Card style={{ flex: "1 1 auto" }}>
            <MUI.CardContent style={{ height: "85%" }}>
                <MUI.Typography variant="h2">Recent Projects</MUI.Typography>
                {files && files.length > 0 ? (
                    <RecentEntry files={files} onChange={GetFiles} />
                ) : (
                    <NoRecents onClick={onClick} />
                )}
            </MUI.CardContent>
        </MUI.Card>
    );
};

Recent.propTypes = {
    onClick: PropTypes.func,
};

const NoRecents = ({ onClick }) => (
    <MUI.Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "75%" }}
    >
        <MUI.Grid item>
            <MUI.Typography variant="h3">
                No projects here yet. <br /> Start making your story by clicking
                here.
                <br />
                <MUI.Fab color="secondary" aria-label="add" onClick={onClick}>
                    <AddIcon />
                </MUI.Fab>
            </MUI.Typography>
        </MUI.Grid>
    </MUI.Grid>
);

NoRecents.propTypes = {
    onClick: PropTypes.func,
};
