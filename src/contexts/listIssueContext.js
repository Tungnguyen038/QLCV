import { createContext, useContext, useReducer} from 'react'
import { initialIssues, listIssueReducer } from '../reducers/listIssueReducer';

const ListIssueContext = createContext();

function ListIssueProvider({children}) {
    const [listIssue, dispatch] = useReducer(listIssueReducer, initialIssues);
    const value = [listIssue, dispatch];
    return (
        <ListIssueContext.Provider value={value}>{children}</ListIssueContext.Provider>
    )
}

const useListIssueContext = () => {
    const issuesContext = useContext(ListIssueContext);
    if(typeof issuesContext === 'undefined') throw new Error('issueContext must be used inside listIssueProvider')
    return issuesContext;
}

export {ListIssueProvider, useListIssueContext, ListIssueContext}