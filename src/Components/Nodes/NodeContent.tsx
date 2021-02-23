import React from "react";

export const NodeContent = ({ data }) => {
    const preventDragHandler = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <p>{data.label}</p>
            <img onDragStart={preventDragHandler} src={data.image} width="100%" height="100%" alt="" />
        </div>
    );
};
