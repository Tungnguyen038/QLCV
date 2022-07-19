import React, { memo, useMemo, useState } from 'react'
import { useBoardContext } from '../../contexts/boardContext';
import { useListIssueContext } from '../../contexts/listIssueContext'
import { useSprintContext } from '../../contexts/sprintContext'
import { fetchBoard } from '../../reducers/boardReducer';
import { fetchIssue, updateIssues } from '../../reducers/listIssueReducer';
import { issueTypes } from '../../util/constants'
import createToast from '../../util/createToast';

function IssueCanAddSelectbox({ showAddchild, setShowAddchild, issue, project, childIssues }) {
    const [, dispatchIssue] = useListIssueContext();
    const [{ issueNormals }] = useListIssueContext();
    const { state: { sprints } } = useSprintContext();
    const [, dispatchBoard] = useBoardContext();
    const [search, setSearch] = useState('');
    const parentIssue = issueNormals.find(item => item.id === issue.id_Parent_Issue);
    const issueCanAdd = useMemo(() => {
        return issueNormals.filter(item => {
            return item.id !== issue.id
                && !childIssues.map(child => child.id).includes(item.id)
                && item.id !== parentIssue?.id
                && item.summary.toLowerCase().includes(search);
        });
    }, [issueNormals, childIssues, issue, parentIssue, search])

    const currentSprint = useMemo(() => {
        return sprints.find(item => item.is_Started === 1)
    }, [sprints])

    // handle add child
    const handleAddChild = async (child) => {
        if (child) {
            child.id_Parent_Issue = issue.id;
            await updateIssues(child, dispatchIssue);
            fetchIssue(project.id, dispatchIssue);
            if (window.location.href.includes('projects/board')) {
                fetchBoard({
                    idSprint: currentSprint.id,
                    idEpic: null,
                    type: 0
                }, dispatchBoard);
            }
            createToast('success', 'Add child issue sucessfully');
        }
    }

    return (
        <div
            className={`add-childissue ${showAddchild ? 'active' : ''}`}
        >
            <div className='header'>
                <p className='title'>Select issue to add</p>
                <span onClick={() => setShowAddchild(false)} className='btn-close'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className='search'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                    issueCanAdd &&
                    issueCanAdd.length > 0 &&
                    issueCanAdd.map(item => (
                        <div onClick={() => handleAddChild(item)} key={item.id} className='issue-item'>
                            <div className="img">
                                <img src={issueTypes.find(type => type.value === item.id_IssueType)?.thumbnail} alt="" />
                            </div>
                            <span>{item.summary}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default memo(IssueCanAddSelectbox)