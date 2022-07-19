import { createContext, useContext, useState } from 'react'
import EditIssuePopup from '../components/popup/EditIssuePopup';
import useModal from '../hooks/useModal'
import { useListIssueContext } from './listIssueContext';
import { useMembersContext } from './membersContext';

const ModalContext = createContext();


function ModalProvider({ children, project }) {
    const { state: { members } } = useMembersContext();
    const [show, setShow, handleClose] = useModal();
    const [issue, setIssue] = useState('');
    const [{ issueNormals }] = useListIssueContext();
    const _issue = issueNormals.find(item => item.id === issue?.id);
    const value = {
        modal: [show, setShow, handleClose],
        item: [issue, setIssue]
    }
    return (
        <>
            {
                show &&
                (
                    <EditIssuePopup
                        members={members}
                        project={project}
                        issue={_issue}
                        setShow={setShow}
                    />
                )
            }
            <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
        </>
    )
}

function useModalContext() {
    const value = useContext(ModalContext);
    if (!value) {
        throw new Error('Modal context must be used inside Modal provider');
    }
    return value;
}

export {
    ModalProvider,
    useModalContext
}