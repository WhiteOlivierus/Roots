import { Paper } from "@material-ui/core";
import { memo, useEffect, useRef, useState } from "react";
import { EditorWrapper } from "../EditorWrapper";
import SVGEditor from "dutchskull-svg-editor";

const test =
{
    "id": "sq3e47aZKbxGdP9WFFAmBo",
    "points": [
        221,
        570.5,
        136,
        629.5,
        398,
        635.5,
        676,
        619.5,
        803,
        600.5,
        774,
        569.5,
        621,
        589.5,
        494,
        588.5,
        307,
        582.5
    ]
};

export const EditorCanvas = memo((props) => {
    const imageRef = useRef(null);

    const [instance, setInstance] = useState([]);

    const onLoadSetInstance = (instance) => setInstance(instance);

    useEffect(() => {
        const size = { width: imageRef.current.width, height: imageRef.current.height };

        if (props.node.data.zones && props.node.data.zones.length > 0) {
            console.log(props.node.data.zones[0].points);

            props.node.data.zones = props.node.data.zones.map((zone) => {
                zone.points = PointsToImageSize(zone.points, size);
                return zone;
            });

            // console.log(props.node.data.zones[0].points);
        }

        return () => {
            props.node.data.zones = props.node.data.zones.map((zone) => {
                zone.points = PointsToRelative(zone.points, size);
                return zone;
            });

            // console.log(props.node.data.zones[0].points);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (instance.length < 1) {
            delete props.node.data.zones;
            return;
        }

        props.node.data.zones = instance;
    }, [instance, props.node.data]);

    return (
        <EditorWrapper>
            <Paper style={{ margin: "auto", width: "65%" }}>
                <SVGEditor polygons={props.node.data.zones} onLoad={onLoadSetInstance} contentRef={imageRef} />
                <img
                    ref={imageRef}
                    src={props.node.data.src}
                    style={{ width: "100%", height: "100%", borderRadius: 4 }}
                    alt="scene" />
            </Paper>
        </EditorWrapper>
    );
});

const PointsToRelative = (points, size) => {
    var newPoints = points.map((point, index) => {
        if (index % 2) {
            //even
            point /= size.height;

        } else {
            //odd
            point /= size.width;
        }
        return point;
    });
    return newPoints;
};

const PointsToImageSize = (points, size) => {
    var newPoints = points.map((point, index) => {
        if (index % 2) {
            //even
            point *= size.height;
        } else {
            //odd
            point *= size.width;
        }
        return point;
    });
    return newPoints;
};
