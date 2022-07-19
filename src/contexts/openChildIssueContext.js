import { createContext, useContext, useState } from "react";
const openChildIssueContext = createContext()

function OpenIssueProvider({ children }) {

    // const [listIssue, dispatch] = useReducer(listIssueReducer, initialIssues);
    const [items, setItems] = useState([])
    const value = [items, setItems];
    return (
        <openChildIssueContext.Provider value={value}  >{children}</openChildIssueContext.Provider>
    )
}

const useOpenIssueContext = () => {
    const value = useContext(openChildIssueContext);
    if (typeof value === 'undefined') throw new Error('value must be used inside openIssueProvider')
    return value;
}

export { OpenIssueProvider, useOpenIssueContext }