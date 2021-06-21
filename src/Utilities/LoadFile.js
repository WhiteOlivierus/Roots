import { Move } from "./FileHandler";

export const LoadFile = async (root, options = {}) => {
    let fileHandle = await window.showOpenFilePicker(options);

    if (Array.isArray(fileHandle)) fileHandle = fileHandle[0];

    await Move(root, fileHandle);

    const file = await fileHandle.getFile();
    const blobUrl = await URL.createObjectURL(file);

    return { fileName: fileHandle.name, blobUrl };
};

export const AudioOptions = {
    id: "SceneAudio",
    types: [
        {
            description: "Audio",
            accept: {
                "audio/*": [".mp3", ".wav"],
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};

export const ImageOptions = {
    id: "SceneImage",
    types: [
        {
            description: "Image",
            accept: {
                "image/*": [".gif", ".jpeg", ".jpg", ".png"],
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};

export const LoadAudioFile = async (root) => LoadFile(root, AudioOptions);

export const LoadImageFile = async (root) => LoadFile(root, ImageOptions);
