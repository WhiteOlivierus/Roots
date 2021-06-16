import * as React from "react";
import * as Formik from "formik";
import * as MUI from "@material-ui/core";
import * as Yup from "yup";
import * as Router from "react-router";

import { NewProject } from "../../Utilities/ProjectHandler";

import useProjectFilesState from "../../Context/ProjectFilesContext/ProjectFilesContext";
import PropTypes from "prop-types";

import FolderIcon from "@material-ui/icons/Folder";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";

const validationSchema = Yup.object({
    projectName: Yup.string("Enter a project name")
        .min(1, "Project name should be of minimum 1 characters length")
        .required("Project name is required"),
    authorName: Yup.string("Enter a author name")
        .min(2, "Author name should be of minimum 2 characters length")
        .required("Author name is required"),
    description: Yup.string("Enter a description").required(
        "Description is required"
    ),
});

const CreateProjectForm = ({ title, onClose, history, config }) => {
    const [loaded, setLoaded] = React.useState(false);

    const { projectFilesState } = useProjectFilesState();

    const validate = (values) => {
        const errors = {};

        if (!values.projectFolder.name) {
            errors.projectFolder = "Required";
        }

        return errors;
    };

    const formik = Formik.useFormik({
        initialValues: {
            ...{
                projectName: "",
                authorName: "",
                description: "",
                projectFolder: { name: "" },
                projectLogo: { name: "" },
            },
            ...config,
        },
        validate: validate,
        validationSchema: validationSchema,
        onSubmit: (values) =>
            NewProject(values)
                .then(({ activeRoot, activeFlow, activeConfig }) => {
                    projectFilesState.activeRoot = activeRoot;
                    projectFilesState.activeFlow = activeFlow;
                    projectFilesState.config = activeConfig;
                    setLoaded(true);
                })
                .catch(),
    });

    React.useEffect(() => {
        if (loaded) history.push("/flow");
    }, [history, loaded]);

    return (
        <MUI.Card style={{ width: "50%" }}>
            <MUI.Box p={4} m={4}>
                <ProjectForm title={title} onClose={onClose} formik={formik} />
            </MUI.Box>
        </MUI.Card>
    );
};

CreateProjectForm.propTypes = {
    title: PropTypes.string.isRequired,
    config: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default Router.withRouter(CreateProjectForm);

const ProjectForm = ({ title, onClose, formik }) => (
    <form onSubmit={formik.handleSubmit}>
        <MUI.Grid container direction={"column"} spacing={4} m={4}>
            <MUI.Grid item>
                <MUI.Typography variant="h2" component="h2">
                    {title}
                </MUI.Typography>
            </MUI.Grid>
            <MUI.Grid item>
                <MUI.TextField
                    name="projectName"
                    type="projectName"
                    label="Project name"
                    variant="outlined"
                    fullWidth
                    value={formik.values.projectName}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.projectName &&
                        Boolean(formik.errors.projectName)
                    }
                    helperText={
                        formik.touched.projectName && formik.errors.projectName
                    }
                />
            </MUI.Grid>
            <MUI.Grid item>
                <MUI.TextField
                    type="authorName"
                    name="authorName"
                    label="Author name"
                    variant="outlined"
                    fullWidth
                    value={formik.values.authorName}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.authorName &&
                        Boolean(formik.errors.authorName)
                    }
                    helperText={
                        formik.touched.authorName && formik.errors.authorName
                    }
                />
            </MUI.Grid>
            <MUI.Grid item>
                <MUI.TextField
                    type="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                    }
                    helperText={
                        formik.touched.description && formik.errors.description
                    }
                />
            </MUI.Grid>
            <MUI.Grid item>
                <MUI.TextField
                    name="projectFolder"
                    type="projectFolder"
                    label="Project folder"
                    variant="outlined"
                    fullWidth
                    disabled
                    style={{
                        outlineColor: "#f44336",
                    }}
                    value={formik.values.projectFolder.name}
                    error={
                        formik.touched.projectFolder &&
                        Boolean(formik.errors.projectFolder)
                    }
                    helperText={
                        formik.touched.projectFolder &&
                        formik.errors.projectFolder
                    }
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={(e) =>
                                    window
                                        .showDirectoryPicker()
                                        .then((directory) => {
                                            formik.handleChange({
                                                ...e,
                                                target: {
                                                    ...e.target,
                                                    value: directory,
                                                },
                                            });
                                        })
                                }
                            >
                                <FolderIcon />
                            </IconButton>
                        ),
                    }}
                />
            </MUI.Grid>
            <MUI.Grid item>
                <MUI.TextField
                    name="projectLogo"
                    type="projectLogo"
                    label="Project logo"
                    variant="outlined"
                    fullWidth
                    disabled
                    value={formik.values.projectLogo.name}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.projectLogo &&
                        Boolean(formik.errors.projectLogo)
                    }
                    helperText={
                        formik.touched.projectLogo && formik.errors.projectLogo
                    }
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={() =>
                                    window
                                        .showOpenFilePicker()
                                        .then(
                                            (logo) =>
                                                (formik.values.projectLogo = logo)
                                        )
                                }
                            >
                                <FolderIcon />
                            </IconButton>
                        ),
                    }}
                />
            </MUI.Grid>
            <MUI.Grid item>
                <MUI.Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={4}
                >
                    <MUI.Grid item>
                        <MUI.Button
                            variant="contained"
                            color="secondary"
                            onClick={onClose}
                            startIcon={<CancelIcon />}
                            size="large"
                        >
                            Cancel
                        </MUI.Button>
                    </MUI.Grid>
                    <MUI.Grid item>
                        <MUI.Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            startIcon={<CheckCircleIcon />}
                            size="large"
                        >
                            Create
                        </MUI.Button>
                    </MUI.Grid>
                </MUI.Grid>
            </MUI.Grid>
        </MUI.Grid>
    </form>
);

ProjectForm.propTypes = {
    title: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};
