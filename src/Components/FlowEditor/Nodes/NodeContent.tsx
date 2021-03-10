import { makeStyles } from "@material-ui/core";
import { createElement, useCallback, useEffect } from "react";

const contentStyle = makeStyles({
    img: { width: "100%", height: "100%", borderRadius: 4 },
    root: { position: "relative", width: "100%", height: "100%" },
    tag: { position: "absolute", width: "100%" },
});

export const NodeContent = ({ data }) => {
    const classes = contentStyle();

    const preventDragHandler = useCallback((e) => {
        e.preventDefault();
    }, []);

    const nodeImage = createElement("img", {
        src: data.image ? data.image : "",
        className: classes.img,
        onDragStart: preventDragHandler,
    });

    return (
        <div className={classes.root}>
            <p className={classes.tag}>{data.label}</p>
            {data.image && nodeImage}
        </div>
    );
};
