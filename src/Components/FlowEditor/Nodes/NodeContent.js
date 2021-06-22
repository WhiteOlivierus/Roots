import * as React from "react";
import { EditNodeText } from "./EditNodeText";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const newLocal = {
    img: { width: "100%", height: "100%", borderRadius: 4 },
    root: { position: "relative", width: "100%", height: "100%" },
    tag: {
        position: "absolute",
        left: 0,
        top: -30,
        width: "100%",
        margin: 0,
    },
};

const NodeContent = ({ data, classes }) => (
    <div className={classes.root}>
        <EditNodeText
            inputStyle={classes.tag}
            textStyle={classes.tag}
            value={data.label}
            nodeId={data.id}
        />
        <img src={data.imageSrc} className={classes.img} />
    </div>
);

NodeContent.displayName = "NodeContent";

NodeContent.propTypes = {
    classes: PropTypes.shape({
        img: PropTypes.any,
        root: PropTypes.any,
        tag: PropTypes.any,
    }),
    data: PropTypes.object.isRequired,
};

export default React.memo(withStyles(newLocal)(NodeContent));
