import PropTypes from "prop-types";
import React from "react";

export const SVGViewport = ({ id, container, onClick, children }) => {
    return (
        <svg
            id={id}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 9,
            }}
            width={container.width}
            height={container.height}
            onClick={onClick}
        >
            {children}
        </svg>
    );
};

SVGViewport.propTypes = {
    children: PropTypes.any,
    container: PropTypes.shape({
        height: PropTypes.any,
        width: PropTypes.any,
    }),
    id: PropTypes.any,
    onClick: PropTypes.any,
};
