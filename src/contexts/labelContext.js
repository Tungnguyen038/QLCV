import { createContext, useContext, useReducer } from 'react'
import { initialValue, labelReducer } from '../reducers/labelReducer';

const labelContext = createContext();

function LabelProvider({ children }) {
    const [state, dispatch] = useReducer(labelReducer, initialValue);
    const value = [state, dispatch];

    return (
        <labelContext.Provider value={value}>{children}</labelContext.Provider>
    )
}

function useLabelContext() {
    const value = useContext(labelContext);
    if (!value) {
        throw new Error('Label context must be used inside LabelProvider');
    }
    return value;
}

export {
    useLabelContext,
    LabelProvider
}