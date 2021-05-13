import React from "react";
import PropTypes from "prop-types";
function UILayer(props) {
    if (!props.end) return null;

    return (
        <div className="ui layer center-content">
            <h1>{props.end}</h1>
        </div>
    );
}

UILayer.displayName = "UILayer";
UILayer.propTypes = { end: PropTypes.string };
export default UILayer;
