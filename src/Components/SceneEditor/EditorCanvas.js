import { Paper } from "@material-ui/core";
import { memo, useEffect, useRef, useState } from "react";
import { EditorWrapper } from "../EditorWrapper";
import SVGEditor from "dutchskull-svg-editor";

export const EditorCanvas = memo((props) => {
    const imageRef = useRef(null);

    const [instance, setInstance] = useState(props.node.value.data.zones || []);

    const onLoadSetInstance = (instance) => setInstance(instance);

    useEffect(() => {
        const size = {
            width: imageRef.current.width,
            height: imageRef.current.height
        };

        TransformPoints(props.node.value, size, PointsToImageSize);

        return () => {
            TransformPoints(props.node.value, size, PointsToRelative);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (instance.length < 1) {
            delete props.node.value.data.zones;
            return;
        }

        props.node.value.data.zones = instance;
    }, [instance, props.node.value.data]);

    return (
        <EditorWrapper>
            <Paper style={{ margin: "auto", width: "65%" }}>
                {
                    props.mode.value === "edit" &&
                    <SVGEditor
                        polygons={props.node.value.data.zones}
                        onLoad={onLoadSetInstance}
                        contentRef={imageRef}
                    />
                }
                <img
                    ref={imageRef}
                    src={props.node.value.data.imageSrc}
                    style={{ width: "100%", height: "100%", borderRadius: 4 }}
                    alt="scene"
                />
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

function TransformPoints(node, size, action) {
    if (node.data.zones && node.data.zones.length > 0) {

        console.log(node.data.zones[0].points);

        node.data.zones = node.data.zones.map((zone) => {
            zone.points = action(zone.points, size);
            return zone;
        });

        console.log(node.data.zones[0].points);
    }
}
