import { useEffect, useState } from "react";

export function useKeyPress(targetKey, action) {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler({ keyCode, key }) {
        if (keyCode === targetKey || key === targetKey) {
            setKeyPressed(true);
        }
    }

    const upHandler = ({ keyCode, key }) => {
        if (keyCode === targetKey || key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        if (keyPressed) action();
    }, [action, keyPressed]);

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return keyPressed;
}
