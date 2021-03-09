import { makeStyles } from "@material-ui/core";
import { useCallback } from "react";

const contentStyle = makeStyles({
    img: { width: "100%", height: "100%", borderRadius: 4 },
});

export const NodeContent = ({ data }) => {
    const classes = contentStyle();

    const preventDragHandler = useCallback((e) => {
        e.preventDefault();
    }, []);

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <p style={{ position: "absolute", width: "100%" }}>{data.label}</p>
            {data.image && <img onDragStart={preventDragHandler} src={data.image} className={classes.img} alt="" />}
        </div>
    );
};
