import { createContext, useReducer, useContext } from 'react'
import { stageReducer, initialValues } from '../reducers/stageReducer';

const StageContext = createContext();

function StageProvider({ children }) {
    const [state, dispatch] = useReducer(stageReducer, initialValues);
    const value = [state, dispatch]

    return <StageContext.Provider value={value}>{children}</StageContext.Provider>
}

function useStageContext() {
    const value = useContext(StageContext);
    if (!value) throw new Error('Stage context must be used inside Stage provider');
    return value;
}
export { StageProvider, useStageContext }