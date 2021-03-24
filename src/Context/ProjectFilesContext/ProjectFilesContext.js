import { createContext, useContext } from "react";

export class ProjectFilesState {
    projectLoaded = false;
    activeRoot = undefined;
    activeFlow = undefined;
    buildHandle = undefined;
}

export const ProjectFilesContext = createContext({
    projectFilesState: new ProjectFilesState(),
    setProjectFilesState: (projectFilesState) => { },
});

export const useProjectFilesState = () => useContext(ProjectFilesContext);
