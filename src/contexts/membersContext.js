import React, { createContext, useContext, useReducer } from 'react'
import { initialValue, membersReducer } from '../reducers/membersReducer';

const membersContext = createContext();

function MembersProvider({ children }) {
    const [state, dispatch] = useReducer(membersReducer, initialValue);
    const value = { state, dispatch }

    return <membersContext.Provider value={value}>{children}</membersContext.Provider>
}
function useMembersContext() {
    const value = useContext(membersContext);
    if (!value) throw new Error('Members context must be inside members provider');
    return value;
}
export { MembersProvider, useMembersContext }