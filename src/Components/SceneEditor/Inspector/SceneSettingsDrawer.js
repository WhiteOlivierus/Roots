import { Typography } from "@material-ui/core";
import { memo, useCallback } from "react";
import { FileField } from "./FileField";
import { LoadAudioFile, LoadImageFile } from "../../../Utilities/LoadFile";

export const SceneSettingsDrawer = memo((props) => {
    const data = props.node.value.data;

    const handleLoadFile = useCallback((key, LoadAction) => {
        LoadAction(props.projectFolder)
            .then(({ fileName, blobUrl }) =>
                props.node.setValue({
                    ...props.node.value,
                    data: {
                        ...data,
                        [key]: fileName,
                        [`${key}Src`]: blobUrl,
                    },
                }));
    }, [data, props.node, props.projectFolder]);

    const onLoadImage = useCallback(() => {
        handleLoadFile("image", LoadImageFile);
    }, [handleLoadFile]);

    const onLoadAudio = useCallback(() => {
        handleLoadFile("audio", LoadAudioFile);
    }, [handleLoadFile]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Scene settings
                </Typography>
            <FileField
                action={onLoadImage}
                label="Image"
                value={data.image} />
            <FileField
                action={onLoadAudio}
                label="Music"
                value={data.audio} />
        </>
    );
});
