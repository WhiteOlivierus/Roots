/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import * as React from "react";
import * as formik from "formik";
import * as MUI from "@material-ui/core";

import { TextField } from "formik-material-ui";

import FolderIcon from "@material-ui/icons/Folder";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const CreateProjectForm = ({ title, onClose }) => {
    const onValidate = (values) => {
        const errors = {};
        if (!values.projectName) {
            errors.projectName = "Required";
        }

        if (!values.authorName) {
            errors.authorName = "Required";
        }

        if (!values.description) {
            errors.description = "Required";
        }

        if (!values.projectFolder) {
            errors.projectFolder = "Required";
        }

        if (!values.projectLogo) {
            errors.projectLogo = "Required";
        }

        return errors;
    };

    const onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
        }, 500);
    };

    return (
        <MUI.Card style={{ width: "50%" }}>
            <MUI.Box p={4} m={4}>
                <formik.Formik
                    initialValues={{
                        projectName: "",
                        authorName: "",
                        description: "",
                        projectFolder: "",
                        projectLogo: "",
                    }}
                    validate={onValidate}
                    onSubmit={onSubmit}
                >
                    {ProjectForm(title, onClose)}
                </formik.Formik>
            </MUI.Box>
        </MUI.Card>
    );
};

CreateProjectForm.propTypes = {
    title: PropTypes.string.isRequired,
};

export default CreateProjectForm;

function ProjectForm(title, onClose) {
    return ({ submitForm, isSubmitting }) => (
        <formik.Form>
            <MUI.Grid container direction={"column"} spacing={4} m={4}>
                <MUI.Grid item>
                    <MUI.Typography variant="h2" component="h2">
                        {title}
                    </MUI.Typography>
                </MUI.Grid>
                <MUI.Grid item>
                    <formik.Field
                        component={TextField}
                        name="projectName"
                        type="projectName"
                        label="Project name"
                        variant="outlined"
                        fullWidth
                    />
                </MUI.Grid>
                <MUI.Grid item>
                    <formik.Field
                        component={TextField}
                        type="authorName"
                        name="authorName"
                        label="Author name"
                        variant="outlined"
                        fullWidth
                    />
                </MUI.Grid>
                <MUI.Grid item>
                    <formik.Field
                        component={TextField}
                        type="description"
                        name="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </MUI.Grid>
                <FileField
                    label={"Project folder"}
                    icon={<FolderIcon />}
                    onClick={() => alert("add logo")}
                >
                    Open
                </FileField>
                <FileField
                    label={"Project logo"}
                    icon={<FolderIcon />}
                    onClick={() => alert("add logo")}
                >
                    Open
                </FileField>
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
                                onClick={submitForm}
                                startIcon={<CheckCircleIcon />}
                                size="large"
                            >
                                Create
                            </MUI.Button>
                        </MUI.Grid>
                    </MUI.Grid>
                </MUI.Grid>
            </MUI.Grid>
        </formik.Form>
    );
}

const FileField = ({ label, onClick, icon, children }) => {
    const [first, second] = label.split(" ");
    const newLabel = [
        first.toLowerCase(),
        second.charAt(0).toUpperCase() + second.slice(1),
    ].join("");
    return (
        <MUI.Grid item>
            <MUI.Grid
                container
                direction={"row"}
                justify="space-between"
                alignItems="center"
            >
                <MUI.Grid item xs={10}>
                    <formik.Field
                        component={TextField}
                        type={newLabel}
                        name={newLabel}
                        label={label}
                        variant="outlined"
                        fullWidth
                        disabled
                    />
                </MUI.Grid>
                <MUI.Grid item>
                    <MUI.Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={onClick}
                        startIcon={icon}
                    >
                        {children}
                    </MUI.Button>
                </MUI.Grid>
            </MUI.Grid>
        </MUI.Grid>
    );
};
