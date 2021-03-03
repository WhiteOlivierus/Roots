import { get, set } from "idb-keyval";

export function persistState(storageKey: string, state: object) {
    set(storageKey, state);
}
export function getInitialState(storageKey: string): any {
    return get(storageKey).then((savedState) => {
        try {
            if (!savedState) {
                return undefined;
            }
            return savedState;
        } catch (e) {
            console.error(`Error loading state : ${storageKey}`);
            return undefined;
        }
    });
}
