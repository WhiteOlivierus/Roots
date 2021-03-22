import { makeStyles } from "@material-ui/core";
import { createElement, memo, useEffect, useState } from "react";
import { useProjectFilesState } from "../../../Context/ProjectFilesContext/ProjectFilesContext";
import { FindFile, GetImageBlobPath } from "../../../Utilities/FileHandler";
import { EditNodeText } from "./EditNodeText";

const contentStyle = makeStyles({
    img: { width: "100%", height: "100%", borderRadius: 4 },
    root: { position: "relative", width: "100%", height: "100%" },
    tag: {
        position: "absolute",
        left: 0,
        width: "100%",
        backgroundColor: "white",
    },
});

export const NodeContent = memo(({ data }) => {
    const classes = contentStyle();

    const { projectFilesState } = useProjectFilesState();

    const [src, setSrc] = useState(data.src || "");

    useEffect(() => {
        if (!("src" in data) && "image" in data) {
            FindFile(projectFilesState.activeRoot, data.image).then(
                (fileHandle) => {
                    GetImageBlobPath(fileHandle).then((blobUrl) => {
                        var image = new Image();
                        image.scr = blobUrl;
                        setSrc(blobUrl);
                    });
                }
            );
        }
    });

    const nodeImage = createElement("img", {
        src: src,
        className: classes.img,
    });

    return (
        <div className={classes.root}>
            <EditNodeText
                inputStyle={classes.tag}
                textStyle={classes.tag}
                value={data.label}
                nodeId={data.id}
            />
            {src && nodeImage}
        </div>
    );
});
