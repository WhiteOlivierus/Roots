import short from "short-uuid";

export async function CreateNode(type, position) {
    const uuid = short.generate();
    switch (type) {
        case "scene":
            return {
                id: uuid,
                type: type,
                position: position,
                style: { width: 160, height: 90 },
                data: {
                    id: uuid,
                    label: `${type} node`,
                    outHandles: [{ text: "Left" }, { text: "Right" }],
                },
            };

        default:
            return {
                id: uuid,
                type: type,
                position: position,
                style: { width: 160, height: 90 },
                data: {
                    id: uuid,
                    label: `${type} node`,
                },
            };
    }
}
