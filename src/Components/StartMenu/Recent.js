import * as React from "react";
import * as MUI from "@material-ui/core";

import { get } from "idb-keyval";

import RecentEntry from "./RecentEntry";

export const Recent = () => {
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
                    <NoRecents />
                )}
            </MUI.CardContent>
        </MUI.Card>
    );
};

const NoRecents = () => (
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
                in the right corner.
            </MUI.Typography>
        </MUI.Grid>
    </MUI.Grid>
);
