import { createContext, useContext } from "react";

export class ProjectFilesState {
    files: any = [];
    activeRoot: any = undefined;
    projectHandle: any = undefined;
}

export type ProjectFilesType = {
    projectFilesState: ProjectFilesState;
    setProjectFilesState: (projectFilesState: ProjectFilesState) => void;
};

export const ProjectFilesContext = createContext<ProjectFilesType>({
    projectFilesState: new ProjectFilesState(),
    setProjectFilesState: (projectFilesState) => console.warn("no node viewer"),
});

export const useProjectFilesState = () => useContext(ProjectFilesContext);
