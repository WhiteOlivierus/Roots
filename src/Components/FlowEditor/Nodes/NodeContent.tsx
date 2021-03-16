import { makeStyles } from "@material-ui/core";
import { createElement, memo, useCallback, useEffect, useRef } from "react";
import { EditNodeText } from "./EditNodeText";

const contentStyle = makeStyles({
    img: { width: "100%", height: "100%", borderRadius: 4 },
    root: { position: "relative", width: "100%", height: "100%" },
    tag: {
        position: "absolute",
        left: 0,
        width: "100%",
        backgroundColor: "white",
    },
});

export const NodeContent = memo<{ data: any }>(({ data }) => {
    const classes = contentStyle();

    const renders = useRef(0);

    useEffect(() => {
        console.log(renders.current++);
    }, [renders]);

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
            <EditNodeText
                inputStyle={classes.tag}
                textStyle={classes.tag}
                value={data.label}
                nodeId={data.id}
            />
            {data.image && nodeImage}
        </div>
    );
});
