import React from 'react'
import './OptionEditIssue.scss';

function OptionsEditIssue({ issue, setShowAddchild, setShowAttachment, setShowLinkIssue }) {
    return (
        <div className='relative flex items-center justify-center cursor-pointer'>
            <label htmlFor={issue?.id} className='inline-flex items-center justify-center text-gray-500 w-6 h-6 hover:text-gray-800'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            </label>
            <input hidden type="radio" name='option' id={issue?.id} className='open-option' />
            <input hidden type="radio" name='option' id={`close-option-${issue?.id}`} className='close-option' />
            <div className='editIssue-options'>
                <LinkIssue setShowLinkIssue={setShowLinkIssue} />
                <AddChildIssue setShowAddchild={setShowAddchild} />
                <Attachment setShowAttachment={setShowAttachment} />
            </div>
        </div>
    )
}

export default OptionsEditIssue

// add child issue component
function AddChildIssue({ setShowAddchild }) {
    // handle show
    const handleShow = (e) => {
        if (e.target.matches('#btn-addchild')) {
            setShowAddchild(prev => !prev);
        }
    }
    return (
        <div onClick={handleShow} style={{ '--rotate': 1, '--color': '#8777D9' }} className='option-item'>
            <div className='item'>
                <span id='btn-addchild' title='Add child issue' className='icon'>
                    <svg className='pointer-events-none' viewBox="0 0 24 24" role="presentation">
                        <g fill="currentColor" fillRule="evenodd">
                            <path d="M11 7h2v5h-2zm5 6h2v3h-2zM6 13h2v3H6z"></path>
                            <path d="M7 11h10a1 1 0 011 1v1H6v-1a1 1 0 011-1z"></path>
                            <path d="M5 18v1h4v-1H5zm0-2h4a2 2 0 012 2v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1a2 2 0 012-2zm10 2v1h4v-1h-4zm0-2h4a2 2 0 012 2v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1a2 2 0 012-2zM10 5v1h4V5h-4zm0-2h4a2 2 0 012 2v1a2 2 0 01-2 2h-4a2 2 0 01-2-2V5a2 2 0 012-2z" fillRule="nonzero">
                            </path>
                        </g>
                    </svg>
                </span>
            </div>
        </div>
    )
}
// upload file
function Attachment({ setShowAttachment }) {
    // handle show
    const handleShow = (e) => {
        if (e.target.matches('#btn-attachment')) {
            setShowAttachment(prev => !prev)
        }
    }
    return (
        <div onClick={handleShow} style={{ '--rotate': 2, '--color': '#0052cc' }} className='option-item'>
            <div className='item'>
                <span id='btn-attachment' title='Attachment' className='icon'>
                    <svg className='pointer-events-none' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                </span>
            </div>
        </div>
    )
}
// link issue
function LinkIssue({ setShowLinkIssue }) {
    // handle show
    const handleShow = (e) => {
        if (e.target.matches('#btn-linkIssue')) {
            setShowLinkIssue(prev => !prev);
        }
    }
    return (
        <div onClick={handleShow} style={{ '--rotate': 0, '--color': '#4BADE8' }} className='option-item'>
            <div className='item'>
                <span id='btn-linkIssue' title='Link issue' className='icon'>
                    <svg className='pointer-events-none' viewBox="0 0 24 24" role="presentation">
                        <g fill="currentColor" fillRule="evenodd">
                            <path d="M12.856 5.457l-.937.92a1.002 1.002 0 000 1.437 1.047 1.047 0 001.463 0l.984-.966c.967-.95 2.542-1.135 3.602-.288a2.54 2.54 0 01.203 3.81l-2.903 2.852a2.646 2.646 0 01-3.696 0l-1.11-1.09L9 13.57l1.108 1.089c1.822 1.788 4.802 1.788 6.622 0l2.905-2.852a4.558 4.558 0 00-.357-6.82c-1.893-1.517-4.695-1.226-6.422.47"></path>
                            <path d="M11.144 19.543l.937-.92a1.002 1.002 0 000-1.437 1.047 1.047 0 00-1.462 0l-.985.966c-.967.95-2.542 1.135-3.602.288a2.54 2.54 0 01-.203-3.81l2.903-2.852a2.646 2.646 0 013.696 0l1.11 1.09L15 11.43l-1.108-1.089c-1.822-1.788-4.802-1.788-6.622 0l-2.905 2.852a4.558 4.558 0 00.357 6.82c1.893 1.517 4.695 1.226 6.422-.47"></path></g>
                    </svg>
                </span>
            </div>
        </div>
    )
}