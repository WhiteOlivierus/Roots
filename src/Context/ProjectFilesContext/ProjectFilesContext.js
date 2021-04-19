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
    // eslint-disable-next-line prettier/prettier, no-unused-vars
    setProjectFilesState: (projectFilesState) => { },
});

const useProjectFilesState = () => React.useContext(ProjectFilesContext);
export default useProjectFilesState;
