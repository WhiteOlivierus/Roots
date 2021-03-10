import { createContext, useContext } from "react";

export class ProjectFilesState {
    activeRoot: any = undefined;
    activeFlow: any = undefined;
    build: any = undefined;
}

export type ProjectFilesType = {
    projectFilesState: ProjectFilesState;
    setProjectFilesState: (projectFilesState: ProjectFilesState) => void;
};

export const ProjectFilesContext = createContext<ProjectFilesType>({
    projectFilesState: new ProjectFilesState(),
    setProjectFilesState: (projectFilesState) => {},
});

export const useProjectFilesState = () => useContext(ProjectFilesContext);
