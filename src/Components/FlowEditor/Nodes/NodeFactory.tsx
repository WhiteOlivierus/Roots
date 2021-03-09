import { GetImageBlobPath } from "../../../Utilities/FileHandler";
import { v4 as uuidv4 } from "uuid";

export async function CreateNode(type: any, fileHandle: any) {
    const blobURL = await GetImageBlobPath(fileHandle);

    switch (type) {
        case "scene":
            return {
                id: uuidv4(),
                type: type,
                position: { x: 0, y: 0 },
                style: { width: 160, height: 90 },
                data: {
                    label: `${type} node`,
                    image: blobURL,
                    imageName: fileHandle.name,
                    outHandles: [{ text: "Left" }, { text: "Right" }],
                },
            };

        default:
            return {
                id: uuidv4(),
                type: type,
                position: { x: 0, y: 0 },
                style: { width: 160, height: 90 },
                data: { label: `${type} node`, image: blobURL, imageName: fileHandle.name },
            };
    }
}
