import React, { useMemo, useState } from 'react'
import { useListIssueContext } from '../../contexts/listIssueContext';
import { fetchIssue, updateIssues } from '../../reducers/listIssueReducer';
import { issueTypes } from '../../util/constants';
import createToast from '../../util/createToast';

function LinkIssueSelectbox({ project, issue, showLinkIssue, setShowLinkIssue }) {
    const [{ issueNormals }, dispatchIssue] = useListIssueContext();
    const [search, setSearch] = useState('');

    const issueCanLink = useMemo(() => {
        if (showLinkIssue) {
            return issueNormals.filter(item => {
                return item.id !== issue.id &&
                    item.id_Linked_Issue !== issue.id &&
                    item.summary.toLowerCase().includes(search);
            })
        } else {
            return [];
        }
    }, [issueNormals, issue, showLinkIssue, search]);
    // handle link issue
    const handleLinkIssue = async (issueLink) => {
        issueLink.id_Linked_Issue = issue.id;
        await updateIssues(issueLink, dispatchIssue);
        fetchIssue(project.id, dispatchIssue);
        createToast('success', 'Link issue successfully!');
    }

    return (
        <div className={`link-issue ${showLinkIssue ? 'active' : ''}`}>
            <div className='header'>
                <p className='title'>Select issue to link</p>
                <span onClick={() => setShowLinkIssue(false)} className='btn-close'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className='search'>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    type="text"
                    placeholder='Search issue'
                />
                <span className='icon-search'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
            </div>
            <div className='list-issue have-y-scroll'>
                {
                    issueCanLink.length > 0 &&
                    issueCanLink.map(item => (
                        <div key={item.id} onClick={() => handleLinkIssue(item)} className='issue-item'>
                            <div className="img">
                                <img src={issueTypes.find(a => a.value === item.id_IssueType).thumbnail} alt="" />
                            </div>
                            <span>{item.summary}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LinkIssueSelectbox