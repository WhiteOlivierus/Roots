import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import Selecto from "react-selecto";
import Moveable from "react-moveable";

export const MoveableHelper = (props) => {
    const [targets, setTargets] = useState([]);
    const [frameMap] = useState(() => new Map());
    const moveableRef = useRef(null);
    const selectoRef = useRef(null);

    return (
        <>
            <Moveable
                ref={moveableRef}
                draggable
                target={targets}
                bounds={props.bounds}
                snappable
                origin={false}
                onClickGroup={(e) => {
                    selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onDragStart={(e) => {
                    const target = e.target;

                    if (!frameMap.has(target)) {
                        frameMap.set(target, {
                            translate: [0, 0],
                        });
                    }
                    const frame = frameMap.get(target);

                    e.set(frame.translate);
                }}
                onDrag={(e) => {
                    const target = e.target;
                    const frame = frameMap.get(target);

                    frame.translate = e.beforeTranslate;
                    target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
                }}
                onDragEnd={(e) => {
                    const target = e.target;
                    const frame = frameMap.get(target);

                    props.offset(frame.translate, target.id);
                    target.style.transform = `translate(0px, 0px)`;
                    frameMap.set(target, {
                        translate: [0, 0],
                    });
                }}
                onDragGroupStart={(e) => {
                    e.events.forEach((ev) => {
                        const target = ev.target;

                        if (!frameMap.has(target)) {
                            frameMap.set(target, {
                                translate: [0, 0],
                            });
                        }
                        const frame = frameMap.get(target);

                        ev.set(frame.translate);
                    });
                }}
                onDragGroup={(e) => {
                    e.events.forEach((ev) => {
                        const target = ev.target;
                        const frame = frameMap.get(target);

                        frame.translate = ev.beforeTranslate;
                        target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
                    });
                }}
                onDragGroupEnd={(e) => {
                    e.targets.forEach((ev) => {
                        const target = ev;
                        const frame = frameMap.get(target);

                        props.offset(frame.translate, target.id);
                        target.style.transform = `translate(0px, 0px)`;
                        frameMap.set(target, {
                            translate: [0, 0],
                        });
                    });
                }}
            />
            <Selecto
                ref={selectoRef}
                dragContainer={props.container}
                selectableTargets={[".interactable"]}
                hitRate={0}
                selectByClick
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                onSelect={(e) => {
                    e.added.forEach((el) => {
                        el.classList.add("selected");
                    });
                    e.removed.forEach((el) => {
                        el.classList.remove("selected");
                    });

                    props.onSelectionChange(
                        e.added.length > 0 ? e.added[0].id : undefined
                    );
                }}
                onDragStart={(e) => {
                    const moveable = moveableRef.current;
                    const target = e.inputEvent.target;
                    if (
                        moveable.isMoveableElement(target) ||
                        targets.some((t) => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }}
                onSelectEnd={(e) => {
                    const moveable = moveableRef.current;
                    setTargets(e.selected);

                    if (e.isDragStart) {
                        e.inputEvent.preventDefault();

                        setTimeout(() => moveable.dragStart(e.inputEvent));
                    }
                }}
            />
        </>
    );
};

MoveableHelper.propTypes = {
    bounds: PropTypes.any,
    container: PropTypes.any,
    offset: PropTypes.func,
    onSelectionChange: PropTypes.func,
};
