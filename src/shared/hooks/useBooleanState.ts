import { useCallback, useState } from "react";

export const useBooleanState = (
    initialState = false,
): {
    state: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
} => {
    const [state, setState] = useState(initialState);

    const setTrue = useCallback(() => setState(true), [setState]);
    const setFalse = useCallback(() => setState(false), [setState]);
    const toggle = useCallback(() => setState((state) => !state), [setState]);

    return {
        state,
        setTrue,
        setFalse,
        toggle,
    };
};
