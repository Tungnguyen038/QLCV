import React, { useState } from 'react'
import { useListIssueContext } from '../../contexts/listIssueContext';
import { deleteIssue, fetchIssue, updateIssues } from '../../reducers/listIssueReducer';
import createToast from '../../util/createToast';
import Portal from '../portal/Portal';

export default function OptionItemBacklogComponent({ issue, project, bodyStyle, onClose }) {
    const [, dispatch] = useListIssueContext();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    // handle change flagg
    const handleChangeFlag = () => {
        const issueUpdate = { ...issue };
        if (issue.isFlagged) {
            issueUpdate.isFlagged = 0
        } else {
            issueUpdate.isFlagged = 1
        }
        updateIssues(issueUpdate, dispatch);
        createToast('success', issueUpdate.isFlagged ? 'Add flag successfully!' : 'Remove flag successfully!')
        setTimeout(() => {
            fetchIssue(project.id, dispatch);
        }, 500);
    }
    // handleDeleteIssue
    const handleDeleteIssue = async () => {
        if (window.confirm(`Are you sure to delete issue ${issue.summary}?`)) {
            await deleteIssue(issue.id, dispatch);
            fetchIssue(project.id, dispatch);
        } else {
            return;
        }
    }

    return (
        <>
            <Portal
                containerclassName='fixed inset-0 z-10'
                bodyClassName='fixed z-20'
                bodyStyle={bodyStyle}
                overlay={false}
                onClose={onClose}
            >
                <div className='h-auto max-h-[180px] overflow-auto have-y-scroll rounded shadow-md bg-white whitespace-nowrap w-fit flex flex-col'>
                    <div className='p-2 uppercase text-[#ccc]'>
                        action
                    </div>
                    <div onClick={handleChangeFlag} role="button" className='p-2 hover:bg-[#f4f5f7]'>
                        {issue?.isFlagged ? 'Remove flag' : 'Add flag'}
                    </div>
                    <div onClick={handleDeleteIssue} role="button" className='p-2 hover:bg-[#f4f5f7]'>
                        Delete
                    </div>
                </div>
            </Portal>
        </>
    )
}
