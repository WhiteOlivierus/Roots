import { WriteFile, FindFile, Move } from "./FileHandler";
import { InputZone, ProjectFile, Scene } from "./ProjectFile";

export async function Build(activeRoot: any, nodes: any, edges: any) {
    let projectFile: ProjectFile = new ProjectFile(activeRoot.name);

    let images = [];

    for (let index = 0; index < nodes.length; index++) {
        const node: any = nodes[index];

        const newScene = new Scene();

        newScene.id = node.id;

        if ("imageName" in node.data) {
            newScene.img = node.data.image;

            images.push(await FindFile(activeRoot, node.data.imageName));
        }

        let times = 0;

        for (let index = 0; index < edges.length; index++) {
            const edge: any = edges[index];

            const newInputZone = new InputZone();

            const newLocal_1 = edge.source !== node.id;

            if (newLocal_1) continue;

            newInputZone.sceneId = edge.target;

            if ((times = 0)) {
                newInputZone.svg = "0,0 , 0.5,0 , 0.5,1 , 0,1";
                newInputZone.text = "Left";
            } else {
                newInputZone.svg = "0.5,0 , 1,0 , 1,1 , 0.5,1";
                newInputZone.text = "Right";
            }

            newScene.inputZones.push(newInputZone);

            times++;
        }

        projectFile.scenes.push(newScene);
    }

    const buildHandle = await activeRoot.getDirectoryHandle("Build", {
        create: true,
    });

    const imagesHandle = await buildHandle.getDirectoryHandle("img", {
        create: true,
    });

    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        await Move(imagesHandle, image);
    }

    const newFileHandle = await buildHandle.getFileHandle("game.json", { create: true });

    await WriteFile(newFileHandle, JSON.stringify(projectFile, null, 2));

    return projectFile;
}
