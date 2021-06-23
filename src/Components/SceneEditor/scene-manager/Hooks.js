import { useCallback, useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";

export const useForceUpdate = () => useState()[1];

export const useToggle = (initialValue = false) => {
    const state = useStateful(initialValue);
    const toggle = useCallback(() => state.setValue(!state.value), [state]);
    return { value: state.value, toggle };
};

export const useStateful = (initial) => {
    const [value, setValue] = useImmer(initial);
    return useMemo(
        () => ({
            value,
            setValue,
        }),
        [setValue, value]
    );
};

export const useWillUnmount = (f) => useEffect(() => () => f && f(), []);
