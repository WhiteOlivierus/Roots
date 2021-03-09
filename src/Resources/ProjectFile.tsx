export class InputZone {
    sceneId: string;
    svg: string;
    text: string;
    img: string;
}

export class Scene {
    id: string;
    uiId: string;
    img: string;
    audio: string;
    inputZones: InputZone[] = [];
}

export class ProjectFile {
    constructor(projectName: string) {
        this.project = projectName;
    }
    project: string;
    audio: string;
    scenes: Scene[] = [];
}
