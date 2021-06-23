import PropTypes from "prop-types";
import React, { useCallback, useRef, Fragment } from "react";
import short from "short-uuid";
import { EditablePolygon, EditablePolyLine } from "./EditablePolygon";
import { useStateful } from "./Hooks";
import { MoveableHelper } from "./MoveableHelper";
import { PreviewPoint } from "./PreviewPoint";
import { SVGViewport } from "./SVGViewport";
import { useKeyPress } from "./useKeyPress";
import { ApplyOffset } from "./Utilities";

const SVGEditor = ({ container, polygon }) => {
    const pointSelection = useStateful(undefined);

    const editorId = useRef(short.generate());

    const DeleteHandle = useCallback(() => {
        if (!pointSelection.value) return;

        polygon.setValue((draft) => {
            draft.handles.splice(pointSelection.value, 1);
            draft.points = [].concat.apply([], draft.handles);
        });
    }, [pointSelection.value, polygon]);

    useKeyPress(46, DeleteHandle);

    const AddHandle = useCallback(
        (e) => {
            const isCurrentEditor =
                e.target.tagName !== "svg" && e.target.id !== editorId;
            if (isCurrentEditor) return;

            const position = [
                e.clientX - container.left + window.scrollX,
                e.clientY - container.top + window.scrollY,
            ];

            polygon.setValue((draft) => {
                draft.handles.push(position);
                draft.points = [].concat.apply([], draft.handles);
            });
        },
        [container.left, container.top, polygon]
    );

    const ClosePolygon = useCallback(() => {
        polygon.setValue((draft) => {
            draft.closed = true;
        });
    }, [polygon]);

    const offsetPoint = useCallback(
        (offset, id) => {
            if (!offset) return;
            polygon.setValue((draft) => {
                draft.handles[id] = draft.handles[id].map(ApplyOffset(offset));
                draft.points = [].concat.apply([], draft.handles);
            });
        },
        [polygon]
    );

    return (
        <>
            <SVGViewport
                container={container}
                id={editorId.current}
                onClick={AddHandle}
            >
                {polygon.value.closed ? (
                    <EditablePolygon points={polygon.value.points} />
                ) : (
                    <EditablePolyLine points={polygon.value.points} />
                )}
                {polygon.value.handles.map((point, index) => {
                    const isFirst = (index === 0) & !polygon.value.closed;
                    return (
                        <PreviewPoint
                            key={`point_${index}`}
                            id={index}
                            r={isFirst ? 10 : 5}
                            cx={point[0]}
                            cy={point[1]}
                            onClick={isFirst ? ClosePolygon : undefined}
                            className="interactable"
                        />
                    );
                })}
            </SVGViewport>

            <MoveableHelper
                container=".scene_manager"
                bounds={{
                    ...container,
                    left: 0,
                    top: 0,
                    right: container.right - container.left,
                    bottom: container.bottom - container.top,
                }}
                offset={offsetPoint}
                onSelectionChange={(id) => pointSelection.setValue(id)}
            />
        </>
    );
};

SVGEditor.propTypes = {
    container: PropTypes.shape({
        bottom: PropTypes.any,
        left: PropTypes.any,
        right: PropTypes.any,
        top: PropTypes.any,
    }),
    polygon: PropTypes.shape({
        setValue: PropTypes.func,
        value: PropTypes.shape({
            closed: PropTypes.any,
            handles: PropTypes.shape({
                map: PropTypes.func,
            }),
            points: PropTypes.any,
        }),
    }),
};

export default React.memo(SVGEditor);
