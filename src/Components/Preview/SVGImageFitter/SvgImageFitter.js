import * as React from "react";
import * as UseHooks from "react-use";

import PropTypes from "prop-types";
import { InitSVG, InitImageValues, ScalePoints } from "./SVGScaler";
import ScaledSVG from "./ScaledSVG.js";

const SvgImageFitter = ({ zones, container }) => {
    const { width, height } = UseHooks.useWindowSize();
    const { svg, inputZones, UpdateZones } = useSVGScaler(container, zones);

    React.useEffect(() => {
        UpdateZones();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height]);

    return (
        <div>
            <svg
                width={svg.value.width}
                height={svg.value.height}
                style={{
                    position: "absolute",
                    left: svg.value.left ? -svg.value.offset : 0,
                    top: !svg.value.left ? -svg.value.offset : 0,
                }}
            >
                {inputZones.value.map((value, index) => (
                    <ScaledSVG key={index} zone={value} />
                ))}
            </svg>
        </div>
    );
};

SvgImageFitter.displayName = "SvgImageFitter";

SvgImageFitter.propTypes = {
    zones: PropTypes.object.isRequired,
    container: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.element) }),
    ]),
};

export default React.memo(SvgImageFitter);

const useSVGScaler = (container, zones) => {
    const zonesRef = React.useRef(zones.inputZones);

    const [svgState, setSvgState] = React.useState(
        InitSVG(InitImageValues(container))
    );

    const [inputZonesState, setInputZonesState] = React.useState([]);

    const UpdateZones = () => {
        const copyInputZones = CopyArray(zonesRef.current);
        setInputZonesState(handleSVGScaling(copyInputZones));
        // console.log("Recalculate svg");
    };

    const handleSVGScaling = React.useCallback(
        (newInputZones) => {
            const sizeRef = InitImageValues(container);
            const svgL = InitSVG(sizeRef);
            setSvgState(svgL);
            newInputZones.forEach((zone, index) => {
                if (svgL.left)
                    newInputZones[index] = {
                        ...zone,
                        svg: ScalePoints(
                            zone.svg,
                            sizeRef.fullWidth,
                            sizeRef.height
                        ),
                    };
                else {
                    newInputZones[index] = {
                        ...zone,
                        svg: ScalePoints(
                            zone.svg,
                            sizeRef.width,
                            sizeRef.fullHeight
                        ),
                    };
                }
            });

            return newInputZones;
        },
        [container]
    );

    const svg = { value: svgState, setValue: setSvgState };
    const inputZones = { value: inputZonesState, setValue: setInputZonesState };

    return {
        svg,
        inputZones,
        UpdateZones,
    };
};

const CopyArray = (array) => JSON.parse(JSON.stringify(array));
