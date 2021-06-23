import * as React from "react";

import PropTypes from "prop-types";
import FilePicker from "../../StartMenu/FilePicker";
import InspectorDrawer from "./InspectorDrawer";

import { LoadAudioFile, LoadImageFile } from "../../../Utilities/LoadFile";

const SceneSettingsDrawer = ({ node, onChange, projectFolder }) => {
    const data = node.data;

    const handleLoadFile = (key, LoadAction) =>
        LoadAction(projectFolder).then(({ fileName, blobUrl }) =>
            onChange({
                ...node,
                data: {
                    ...data,
                    [key]: fileName,
                    [`${key}Src`]: blobUrl,
                },
            })
        );

    const onLoadImage = () => handleLoadFile("image", LoadImageFile);

    const onLoadAudio = () => handleLoadFile("audio", LoadAudioFile);

    const form = {
        name: "Scene settings",
        inputs: [
            <FilePicker
                key="1"
                {...{
                    name: "sceneImage",
                    label: "Scene image",
                    value: data.image,
                    onClick: onLoadImage,
                }}
            />,
            <FilePicker
                key="2"
                {...{
                    name: "sceneAudio",
                    label: "Scene audio",
                    value: data.audio,
                    onClick: onLoadAudio,
                }}
            />,
        ],
    };

    return <InspectorDrawer form={form} />;
};

SceneSettingsDrawer.displayName = "SceneSettingsDrawer";

SceneSettingsDrawer.propTypes = {
    node: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    projectFolder: PropTypes.object.isRequired,
};

export default React.memo(SceneSettingsDrawer);
