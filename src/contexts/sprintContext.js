import React, { useReducer, useContext, createContext } from "react";
import { initialValue, sprintReducer } from "../reducers/sprintReducer";

const sprintContext = createContext();

function SprintProvider({ children }) {
    const [state, dispatch] = useReducer(sprintReducer, initialValue);
    const value = { state, dispatch };

    return <sprintContext.Provider value={value}>{children}</sprintContext.Provider>
}
function useSprintContext() {
    const value = useContext(sprintContext);
    if (!value) throw new Error('Sprint context must be use inside sprint provider');
    return value;
}
export { SprintProvider, useSprintContext }