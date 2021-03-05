import { createContext, Reducer, useEffect, useReducer } from "react";
import { getInitialState, persistState } from "../Utilities/PresistState";

export const STORAGE_KEY = "appState";

interface AppState {
    flow: any;
    activeFlow: any;
}
const defaultState: AppState = {
    flow: {},
    activeFlow: undefined,
};

const initialState: AppState = getInitialState(STORAGE_KEY) ?? defaultState;

export type AuthActions = { payload: string };

// Define what our auth provider looks like
export interface AuthProviderValue {
    state: AppState;
    dispatch(action: AuthActions): void;
}
// Create an initial provider value.
const providerValue: AuthProviderValue = {
    state: initialState,
    dispatch: (action) => {}, // << This will be overwritten
};
// Create the store or 'context'.
const authStore = createContext(providerValue);
const { Provider } = authStore;

function reducer(state: AppState, action: AuthActions): AppState {
    return {
        ...state,
        ...{
            activeFlow: action.payload,
        },
    };
}

function AuthStateProvider({ children }: any) {
    const [state, dispatch] = useReducer<Reducer<AppState, any>>(reducer, initialState);
    const providerValue = { state, dispatch };
    useEffect(() => persistState(STORAGE_KEY, state), [state]);
    return <Provider value={providerValue}>{children}</Provider>;
}
export { authStore, AuthStateProvider };
