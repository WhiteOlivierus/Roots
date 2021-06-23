import PropTypes from "prop-types";
import React, { memo, useCallback, useEffect } from "react";
import { useImmer } from "use-immer";
import { MoveableHelper } from "./MoveableHelper";
import SVGEditor from "./SVGEditor";
import { PreviewPolygon } from "./PreviewPolygon";
import { SVGViewport } from "./SVGViewport";
import { ApplyOffset, PolygonToHandles } from "./Utilities";
import { useStateful } from "./Hooks";
import { useKeyPress } from "./useKeyPress";

export const SceneCanvas = memo(
    ({ selection, editMode, polygons, container }) => {
        const editablePolygon = useStateful(PolygonToHandles());
        const polygonSelection = useStateful(undefined);

        const [imageSize] = useImmer(container.current.getBoundingClientRect());

        const DeletePolygon = () => {
            if (editMode || !polygonSelection.value) return;

            const polygonId = polygons.value.findIndex(
                (polygon) => polygon.id === polygonSelection.value
            );

            polygons.setValue((draft) => {
                draft.splice(polygonId, 1);
            });

            polygonSelection.setValue(undefined);
        };

        useKeyPress(46, DeletePolygon);

        const offsetPolygon = useCallback(
            (offset, id) => {
                if (!offset) return;

                const polygonId = polygons.value.findIndex(
                    (polygon) => polygon.id === id
                );

                polygons.setValue((draft) => {
                    draft[polygonId].points = draft[polygonId].points.map(
                        ApplyOffset(offset)
                    );
                });
            },
            [polygons]
        );

        const AddEditablePolygon = useCallback(() => {
            var polygonHandles;

            if (!polygonSelection.value) {
                polygonHandles = PolygonToHandles();
            } else {
                const polygonId = polygons.value.findIndex(
                    (polygon) => polygon.id === polygonSelection.value
                );

                polygonHandles = PolygonToHandles(
                    polygons.value.slice(polygonId, polygonId + 1)[0]
                );

                polygons.setValue((draft) => {
                    draft.splice(polygonId, 1);
                });
            }

            editablePolygon.setValue(polygonHandles);
        }, [polygons, polygonSelection, editablePolygon]);

        const SetEditablePolygon = useCallback(() => {
            var polygon = editablePolygon.value;

            const hasPolygon = polygon !== undefined;
            const hasPoints = polygon.points.length > 0;
            const isLine = polygon.points.length === 4;
            const isClosed = polygon.closed;

            if (!hasPolygon || !isClosed || !hasPoints || isLine) return;

            polygons.setValue((draft) => {
                draft.push({
                    id: polygon.id,
                    points: polygon.points,
                });
            });

            polygonSelection.setValue(undefined);
        }, [polygons, polygonSelection, editablePolygon]);

        useEffect(() => {
            editMode ? AddEditablePolygon() : SetEditablePolygon();
        }, [AddEditablePolygon, SetEditablePolygon, editMode]);

        useEffect(() => {
            selection.setValue(polygonSelection.value);
        }, [polygonSelection, selection]);

        return (
            <div
                className="scene_manager"
                style={{
                    position: "absolute",
                    left: imageSize.left + window.scrollX,
                    top: imageSize.top + window.scrollY,
                }}
            >
                <SVGViewport
                    container={imageSize}
                    style={{ zIndex: editMode ? 5 : 9 }}
                >
                    {polygons.value.map((polygon, index) => (
                        <PreviewPolygon
                            id={polygon.id}
                            key={`PreviewPolygon_${index}`}
                            points={polygon.points}
                            className={editMode ? "" : "interactable"}
                            style={polygon.style}
                        />
                    ))}
                </SVGViewport>

                {!editMode && (
                    <MoveableHelper
                        container=".scene_manager"
                        bounds={{
                            ...imageSize,
                            left: 0,
                            top: 0,
                            right: imageSize.right - imageSize.left,
                            bottom: imageSize.bottom - imageSize.top,
                        }}
                        offset={offsetPolygon}
                        onSelectionChange={(id) =>
                            polygonSelection.setValue(id)
                        }
                    />
                )}

                {editMode && (
                    <SVGEditor
                        container={imageSize}
                        polygon={editablePolygon}
                    />
                )}
            </div>
        );
    }
);

SceneCanvas.displayName = "SceneCanvas";

SceneCanvas.propTypes = {
    container: PropTypes.shape({
        current: PropTypes.shape({
            getBoundingClientRect: PropTypes.func,
        }),
    }),
    editMode: PropTypes.any,
    polygons: PropTypes.shape({
        setValue: PropTypes.func,
        value: PropTypes.shape({
            findIndex: PropTypes.func,
            map: PropTypes.func,
            slice: PropTypes.func,
        }),
    }),
    selection: PropTypes.shape({
        setValue: PropTypes.func,
    }),
};
