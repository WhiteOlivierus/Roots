import * as React from "react";
import { ProjectFilesState } from "./ProjectFilesContext";
import PropTypes from "prop-types";

const ProjectFilesContext = React.createContext(null);

const ProjectFilesProvider = ({ children }) => {
    const [projectFilesState, setProjectFilesState] = React.useState(
        new ProjectFilesState()
    );

    return (
        <ProjectFilesContext.Provider
            value={{ projectFilesState, setProjectFilesState }}
        >
            {children}
        </ProjectFilesContext.Provider>
    );
};

ProjectFilesProvider.displayName = "ProjectFilesProvider";

ProjectFilesProvider.propTypes = {
    children: PropTypes.element,
};

export default ProjectFilesProvider;
