import React, { useMemo, useRef, useState } from 'react'
import './Column.scss'
import Issue from './Issue'
import { v4 } from 'uuid'
import { Container, Draggable } from 'react-smooth-dnd'
import sorter from '../../util/sorter'
import { fetchBoard } from '../../reducers/boardReducer'
import { useBoardContext } from '../../contexts/boardContext'
import InputStageName from './InputStageName'
import useModal from '../../hooks/useModal'
import ChooseStagePopup from '../popup/ChooseStagePopup'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../../util/constants'
import DoneIcon from '@mui/icons-material/Done';
import { useStageContext } from '../../contexts/stageContext'

function Column({ stage, currentSprint, project }) {
    const [showInput, setShowInput] = useState(false);
    const [showChooseStage, setShowChooseStage, handleCloseShooseStage] = useModal();
    const { listIssue, listIssueOrder } = stage;
    sorter(listIssue, listIssueOrder);
    const columnRef = useRef();
    const [, dispatchBoard] = useBoardContext();
    const { currentUser } = useSelector(state => state.auth.login);
    const [{ stages }] = useStageContext();

    const isDone = useMemo(() => {
        return stages.some(item => {
            return item.id === stage.id && item.isDone === 1;
        })
    }, [stages, stage]);

    // handle issue drop
    const handleIssueDrop = async (dropResult) => {
        const { addedIndex, removedIndex, payload } = dropResult;
        if (addedIndex !== null && removedIndex !== null) {
            const issueRemoved = listIssue[addedIndex];
            const orderTemp = payload.order;
            payload.order = issueRemoved.order + 1;
            issueRemoved.order = orderTemp;
            // update issue added
            const dataPutAdded = {
                "idUpdator": currentUser.id,
                "idIssue": payload.id,
                "idStage": payload.id_Stage,
                "order": payload.order
            }
            // update issue added
            const dataPutRemoved = {
                "idUpdator": currentUser.id,
                "idIssue": issueRemoved.id,
                "idStage": issueRemoved.id_Stage,
                "order": issueRemoved.order
            }
            await axios.put(`${BASE_URL}/api/Issue/ChangeIssueStage`, dataPutAdded);
            await axios.put(`${BASE_URL}/api/Issue/ChangeIssueStage`, dataPutRemoved);
            fetchBoard({
                idSprint: currentSprint.id,
                idEpic: null,
                type: 0
            }, dispatchBoard);
            return;
        }

        if (addedIndex !== null && removedIndex === null) {
            const idStage = columnRef.current.dataset.id;
            if (idStage) {
                let preIssue, nextIssue;
                switch (addedIndex) {
                    case 0:
                        payload.order = 0;
                        if (listIssue.length > 0) {
                            nextIssue = listIssue[addedIndex];
                            nextIssue.order += 1;
                        }
                        break;
                    case listIssue.length:
                        let max = listIssue[0].order;
                        for (let i = 1; i < listIssue.length; i++) {
                            if (max < listIssue[i].order) {
                                max = listIssue[i].order
                            }
                        }
                        payload.order = ++max;
                        break;
                    default:
                        preIssue = listIssue[addedIndex - 1];
                        nextIssue = listIssue[addedIndex];
                        payload.order = preIssue.order + 1;
                        nextIssue.order += 1
                        break;
                }
                payload.id_Stage = idStage;
                // update added issue
                const dataPutAdded = {
                    "idUpdator": currentUser.id,
                    "idIssue": payload.id,
                    "idStage": payload.id_Stage,
                    "order": payload.order
                }
                await axios.put(`${BASE_URL}/api/Issue/ChangeIssueStage`, dataPutAdded);
                if (nextIssue) {
                    const dataPutNext = {
                        "idUpdator": currentUser.id,
                        "idIssue": nextIssue.id,
                        "idStage": nextIssue.id_Stage,
                        "order": nextIssue.order
                    }
                    await axios.put(`${BASE_URL}/api/Issue/ChangeIssueStage`, dataPutNext);
                }
                fetchBoard({
                    idSprint: currentSprint.id,
                    idEpic: null,
                    type: 0
                }, dispatchBoard);
            }
        }
    }

    return (
        <>
            {
                showChooseStage &&
                <ChooseStagePopup project={project} currentSprint={currentSprint} currentStage={stage} onClose={handleCloseShooseStage} />
            }
            <div data-tut='tut-column' ref={columnRef} data-id={stage?.id} className='column'>
                <div className="header header-selector">
                    {
                        showInput ?
                            <InputStageName currentSprint={currentSprint} stage={stage} setShowInput={setShowInput} /> :
                            <span onClick={() => setShowInput(true)} className='stage-name'>{stage.stage_Name}</span>
                    }
                    <span onClick={() => setShowChooseStage(true)} title='Remove Stage' className='remove-icon'>
                        <svg className='pointer-events-none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                    {
                        isDone && <DoneIcon style={{ color: 'green' }} fontSize='small' />
                    }
                </div>
                <div className="container-issue">
                    <Container
                        orientation="vertical"
                        onDrop={handleIssueDrop}
                        getChildPayload={index => listIssue[index]}
                        groupName='column'
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"
                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: 'cards-drop-preview'
                        }}
                    >
                        {
                            listIssue.length > 0 &&
                            listIssue.map(item => (
                                <Draggable key={v4()}>
                                    <Issue issue={item} />
                                </Draggable>
                            ))
                        }
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Column