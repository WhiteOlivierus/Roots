import { makeStyles } from "@material-ui/core";
import * as React from "react";
import useProjectFilesState from "../../../Context/ProjectFilesContext/ProjectFilesContext";
import { FindFile, GetImageBlobPath } from "../../../Utilities/FileHandler";
import { EditNodeText } from "./EditNodeText";
import PropTypes from "prop-types";

const contentStyle = makeStyles({
    img: { width: "100%", height: "100%", borderRadius: 4 },
    root: { position: "relative", width: "100%", height: "100%" },
    tag: {
        position: "absolute",
        left: 0,
        top: -30,
        width: "100%",
        margin: 0,
    },
});

export const NodeContent = ({ data }) => {
    const classes = contentStyle();

    const { projectFilesState } = useProjectFilesState();

    const [src, setSrc] = React.useState(data.imageSrc || "");

    React.useEffect(() => {
        if (!("imageSrc" in data) && "image" in data) {
            FindFile(projectFilesState.activeRoot, data.image).then(
                (fileHandle) => {
                    GetImageBlobPath(fileHandle).then((blobUrl) => {
                        var image = new Image();
                        image.scr = blobUrl;
                        data.imageSrc = blobUrl;
                        setSrc(blobUrl);
                    });
                }
            );
        }
    });

    const nodeImage = React.createElement("img", {
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
};

NodeContent.displayName = "NodeContent";

NodeContent.propTypes = {
    data: PropTypes.object.isRequired,
};

export default React.memo(NodeContent);
