import { WriteFile } from "./FileHandler";

export const LoadFile = async (root, options = {}) => {
    let fileHandle = await window.showOpenFilePicker(options);

    if (Array.isArray(fileHandle)) fileHandle = fileHandle[0];

    const fileName = await root.getFileHandle(
        fileHandle.name.replace(/ /g, ""),
        {
            create: true,
        }
    );
    const file = await fileHandle.getFile();

    await WriteFile(fileName, file);

    const blobUrl = URL.createObjectURL(file);

    return { fileName: fileName.name, blobUrl };
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

export const LoadAudioFile = async (root) => {
    const test = LoadFile(root, AudioOptions);
    const audio = new Audio();
    audio.src = test.blobUrl;
    return test;
};

export const LoadImageFile = async (root) => LoadFile(root, ImageOptions);
