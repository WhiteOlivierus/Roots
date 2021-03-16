import { GetImageBlobPath } from "../../../Utilities/FileHandler";
import short from "short-uuid";

export async function CreateNode(type: any, fileHandle: any) {
    const blobURL = await GetImageBlobPath(fileHandle);

    const uuid = short.generate();
    switch (type) {
        case "scene":
            return {
                id: uuid,
                type: type,
                position: { x: 0, y: 0 },
                style: { width: 160, height: 90 },
                data: {
                    id: uuid,
                    label: `${type} node`,
                    image: blobURL,
                    imageName: fileHandle.name,
                    outHandles: [{ text: "Left" }, { text: "Right" }],
                },
            };

        default:
            return {
                id: uuid,
                type: type,
                position: { x: 0, y: 0 },
                style: { width: 160, height: 90 },
                data: {
                    id: uuid,
                    label: `${type} node`,
                    image: blobURL,
                    imageName: fileHandle.name,
                },
            };
    }
}
