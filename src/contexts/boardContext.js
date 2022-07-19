import { useReducer, useContext, createContext } from "react";
import { boardReducer, initialValue } from "../reducers/boardReducer";

const BoardContext = createContext();

function BoardProvider({ children }) {
    const [state, dispatch] = useReducer(boardReducer, initialValue);
    const value = [state, dispatch];

    return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}

const useBoardContext = () => {
    const value = useContext(BoardContext);
    if (!value) throw new Error('Board context must be used inside BoardProvider!');
    return value
}
export { BoardProvider, useBoardContext }