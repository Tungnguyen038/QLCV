import React, { useMemo } from 'react'
import { useListIssueContext } from '../../contexts/listIssueContext'
import { useLabelContext } from '../../contexts/labelContext'
import { useModalContext } from '../../contexts/modalContext'
import { issueTypes } from '../../util/constants'
import './Issue.scss'

function Issue({ issue }) {
    const {
        modal: [, setShowEdit],
        item: [, setIssue]
    } = useModalContext();
    const [{ issueEpics }] = useListIssueContext();
    const [{ labels }] = useLabelContext();
    // find current epic
    const epic = useMemo(() => {
        return issueEpics.find(item => item.id === issue.id_Parent_Issue);
    }, [issueEpics, issue]);
    // find current label
    const label = useMemo(() => {
        return labels.find(item => item.id === issue.id_Label);
    }, [labels])
    // handle click issue
    const handleClickIssue = () => {
        setIssue(issue);
        setShowEdit(true);
    }

    return (
        <div data-tut='tut-issueboard' className="issue">
            <div className="wrapper-summary">
                <div className="type">
                    <img className='type-img' src={issueTypes.find(item => item.value === issue.id_IssueType)?.thumbnail} alt="" />
                </div>
                <p onClick={handleClickIssue} className="summary">{issue.summary}</p>
            </div>
            <div className="bottom">
                <div className="epic">{epic ? epic.summary : 'None'}</div>
                {
                    label &&
                    <div className="label">{label.name}</div>
                }
            </div>
        </div>
    )
}

export default Issue