import { Move } from "./FileHandler";

export const LoadFile = async (root, options = {}) => {
    var fileHandle = await window.showOpenFilePicker(options);

    if (Array.isArray(fileHandle)) fileHandle = fileHandle[0];

    await Move(root, fileHandle);

    var file = await fileHandle.getFile();
    var blobUrl = await URL.createObjectURL(file);

    return { fileName: fileHandle.name, blobUrl };
};

export const AudioOptions = {
    types: [
        {
            description: 'Audio',
            accept: {
                'audio/*': ['.aac', '.mp3', '.oga', '.opus', '.wav', '.weba']
            }
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};


export const ImageOptions = {
    types: [
        {
            description: 'Image',
            accept: {
                'image/*': ['.gif', '.jpeg', '.jpg', '.png', '.tif', '.tiff', '.webp', '.bmp']
            }
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false
};

export const LoadAudioFile = async (root) => LoadFile(root, AudioOptions);


export const LoadImageFile = async (root) => LoadFile(root, ImageOptions);
