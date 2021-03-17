import React, { useState } from "react";
import { ProjectFilesState } from "./ProjectFilesContext";

const ProjectFilesContext = React.createContext(null);

export const ProjectFilesProvider = (props: any) => {
    const [projectFilesState, setProjectFilesState] = useState(new ProjectFilesState());

    return (
        <ProjectFilesContext.Provider value={{ projectFilesState, setProjectFilesState }}>
            {props.children}
        </ProjectFilesContext.Provider>
    );
};
