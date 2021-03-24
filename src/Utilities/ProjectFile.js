export class InputZone {
    sceneId = "";
    svg = "";
    text = "";
    img = "";
}

export class Scene {
    id = "";
    uiId = "";
    img = "";
    audio = "";
    inputZones = [];
}

export class ProjectFile {
    constructor(projectName) {
        this.project = projectName;
    }
    project = "";
    audio = "";
    scenes = [];
}
