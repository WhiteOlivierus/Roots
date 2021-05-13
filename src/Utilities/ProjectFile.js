export class InputZone {
    constructor() {
        this.sceneId = "";
        this.svg = "";
        this.text = "";
        this.img = "";
    }
}

export class Scene {
    constructor() {
        this.id = "";
        this.uiId = "";
        this.img = "";
        this.audio = "";
        this.inputZones = [];
    }
}

export class ProjectFile {
    constructor(projectName = "") {
        this.project = projectName;
        this.audio = "";
        this.scenes = [];
    }
}
