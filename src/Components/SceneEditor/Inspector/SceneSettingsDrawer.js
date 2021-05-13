import { Typography } from "@material-ui/core";
import * as React from "react";
import { FileField } from "./FileField";
import { LoadAudioFile, LoadImageFile } from "../../../Utilities/LoadFile";
import PropTypes from "prop-types";

export const SceneSettingsDrawer = ({ node, projectFolder }) => {
    const data = node.value.data;

    const handleLoadFile = React.useCallback(
        (key, LoadAction) => {
            LoadAction(projectFolder).then(({ fileName, blobUrl }) =>
                node.setValue({
                    ...node.value,
                    data: {
                        ...data,
                        [key]: fileName,
                        [`${key}Src`]: blobUrl,
                    },
                })
            );
        },
        [data, node, projectFolder]
    );

    const onLoadImage = React.useCallback(() => {
        handleLoadFile("image", LoadImageFile);
    }, [handleLoadFile]);

    const onLoadAudio = React.useCallback(() => {
        handleLoadFile("audio", LoadAudioFile);
    }, [handleLoadFile]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Scene settings
            </Typography>
            <FileField action={onLoadImage} label="Image" value={data.image} />
            <FileField action={onLoadAudio} label="Music" value={data.audio} />
        </>
    );
};

SceneSettingsDrawer.displayName = "SceneSettingsDrawer";

SceneSettingsDrawer.propTypes = {
    node: PropTypes.object.isRequired,
    projectFolder: PropTypes.object.isRequired,
};

export default React.memo(SceneSettingsDrawer);
