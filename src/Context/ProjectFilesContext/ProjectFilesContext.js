import * as React from "react";

export class ProjectFilesState {
    constructor() {
        this.projectLoaded = false;
        this.activeRoot = undefined;
        this.activeFlow = undefined;
        this.buildHandle = undefined;
    }
}

export const ProjectFilesContext = React.createContext({
    projectFilesState: new ProjectFilesState(),
});

const useProjectFilesState = () => React.useContext(ProjectFilesContext);
export default useProjectFilesState;
