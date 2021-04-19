import React, { Component } from "react";
import PropTypes from "prop-types";
import { InitSVG, InitImageValues, ScalePoints } from "./SVGScaler";
import { ScaledSVG } from "./ScaledSVG.js";

Array.prototype.repeat = function (element, length) {
    while (length) this[--length] = element;
    return this;
};

class SvgImageFitter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zones: [].repeat(0, this.props.zones.inputZones.length),
            svg: { width: 0, height: 0, offset: 0, left: false },
        };
    }

    handleSVGScaling(image) {
        var dimensions = InitImageValues(image.target);

        var svg = InitSVG(dimensions);

        var zones = this.props.zones.inputZones;

        zones.forEach((zone, index) => {
            if (svg.left)
                zones[index].svg = ScalePoints(
                    zone.svg,
                    dimensions.fullWidth,
                    dimensions.height
                );
            else {
                zones[index].svg = ScalePoints(
                    zone.svg,
                    dimensions.width,
                    dimensions.fullHeight
                );
            }
        });

        this.setState({ zones: zones, svg: svg });
    }

    render() {
        const src = this.props.zones.src;

        const image = React.createElement("img", {
            src: src,
            style: {
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
            },
            onLoad: (image) => this.handleSVGScaling(image),
        });

        const zones = this.state.zones;
        const svg = this.state.svg;

        const svgStyle = {
            position: "absolute",
            left: svg.left ? -svg.offset : 0,
            top: !svg.left ? -svg.offset : 0,
        };

        return (
            <div>
                <svg width={svg.width} height={svg.height} style={svgStyle}>
                    {zones.map((value, index) => {
                        return <ScaledSVG key={index} zone={value} />;
                    })}
                </svg>
                {image}
            </div>
        );
    }
}

SvgImageFitter.displayName = "SvgImageFitter";
SvgImageFitter.propTypes = {
    zones: PropTypes.array.isRequired,
};
export default SvgImageFitter;
