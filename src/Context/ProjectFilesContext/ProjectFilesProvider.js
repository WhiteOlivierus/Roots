import * as React from "react";
import { ProjectFilesState } from "./ProjectFilesContext";
import PropTypes from "prop-types";

const ProjectFilesContext = React.createContext(null);

const ProjectFilesProvider = ({ children }) => {
    const [projectFilesState] = React.useState(new ProjectFilesState());

    return (
        <ProjectFilesContext.Provider value={{ projectFilesState }}>
            {children}
        </ProjectFilesContext.Provider>
    );
};

ProjectFilesProvider.displayName = "ProjectFilesProvider";

ProjectFilesProvider.propTypes = {
    children: PropTypes.element,
};

export default ProjectFilesProvider;
