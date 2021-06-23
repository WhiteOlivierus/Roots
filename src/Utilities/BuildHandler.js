import { getConnectedEdges } from "react-flow-renderer";
import { WriteFile, FindFile, Move } from "./FileHandler";
import { InputZone, ProjectFile, Scene } from "./ProjectFile";

export async function Build(activeRoot, nodes, edges, preview) {
    let projectFile = new ProjectFile(activeRoot.name);

    let images = [];

    let copiedNodes = [...nodes];

    let inNode = copiedNodes.splice(0, 1);

    let connectedEdgesInNode = edges.filter(
        (edge) => edge.source === inNode[0].id
    )[0];

    let firstNodeID = copiedNodes.findIndex(
        (node) => node.id === connectedEdgesInNode.target
    );

    if (firstNodeID === -1)
        throw new Error("No node connected to the start node");

    let id = copiedNodes[firstNodeID].id;

    let newScene = await CreateScene(copiedNodes[firstNodeID], edges);

    if ("image" in copiedNodes[firstNodeID].data) {
        newScene.image = copiedNodes[firstNodeID].data.image;
        newScene.audio = copiedNodes[firstNodeID].data.audio;
        if (preview) {
            newScene.imageSrc = copiedNodes[firstNodeID].data.imageSrc;
            newScene.audioSrc = copiedNodes[firstNodeID].data.audioSrc;
        }
        images.push(
            await FindFile(activeRoot, copiedNodes[firstNodeID].data.image)
        );
        if ("audio" in copiedNodes[firstNodeID].data)
            images.push(
                await FindFile(activeRoot, copiedNodes[firstNodeID].data.audio)
            );
    }

    copiedNodes.splice(firstNodeID, 1);

    projectFile.scenes.push(newScene);

    for (let index = 0; index < copiedNodes.length; index++) {
        const node = copiedNodes[index];

        newScene = await CreateScene(node, edges);

        if ("image" in node.data) {
            newScene.image = node.data.image;
            newScene.audio = node.data.audio;

            if (preview) {
                newScene.imageSrc = node.data.imageSrc;
                newScene.audioSrc = node.data.audioSrc;
            }
            images.push(await FindFile(activeRoot, node.data.image));
            if ("audio" in node.data)
                images.push(await FindFile(activeRoot, node.data.audio));
        }

        projectFile.scenes.push(newScene);
    }

    const buildHandle = await activeRoot.getDirectoryHandle("Build", {
        create: true,
    });

    const imagesHandle = await buildHandle.getDirectoryHandle("img", {
        create: true,
    });

    const config = await FindFile(activeRoot, "config.json");

    const configHandle = await buildHandle.getFileHandle("config.json", {
        create: true,
    });

    const configFile = await config.getFile();

    await WriteFile(configHandle, configFile);

    const logo = await FindFile(activeRoot, "logo.png");

    if (logo) {
        const logoHandle = await buildHandle.getFileHandle("logo.png", {
            create: true,
        });

        const logoFile = await logo.getFile();

        await WriteFile(logoHandle, logoFile);
    }

    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        await Move(imagesHandle, image);
    }

    const buildFileHandle = await buildHandle.getFileHandle("game.json", {
        create: true,
    });

    await WriteFile(buildFileHandle, JSON.stringify(projectFile, null, 2));

    return { buildHandle: buildFileHandle, id };
}

const CreateScene = async (node, edges) => {
    const newScene = new Scene();

    newScene.id = node.id;

    if (edges === undefined) {
        throw new Error("No connections to build");
    }

    let connectedEdges = getConnectedEdges([node], edges);

    for (let index = 0; index < connectedEdges.length; index++) {
        const edge = connectedEdges[index];

        const newInputZone = new InputZone();

        if (edge.source !== node.id) continue;

        newInputZone.sceneId = edge.target;

        const zone = node.data.zones.filter(
            (zone) => zone.id === edge.sourceHandle
        )[0];
        newInputZone.svg = zone.points;
        newInputZone.text = zone.id;

        newScene.inputZones.push(newInputZone);
    }
    return newScene;
};
