import React, { useRef, useState, useEffect } from 'react'
import { v4 } from 'uuid';
import axios from 'axios';
import sorter from '../../util/sorter';
import './Board.scss'
import Column from './Column'
import { Container, Draggable } from 'react-smooth-dnd'
import { fetchBoard } from '../../reducers/boardReducer';
import { useBoardContext } from '../../contexts/boardContext';
import { useStageContext } from '../../contexts/stageContext'
import { BASE_URL } from '../../util/constants'
import { useSelector } from 'react-redux'
import { createStage, fetchStage } from '../../reducers/stageReducer'


function Board({ board, project, currentSprint }) {
    const iconRef = useRef();
    const [, dispatchBoard] = useBoardContext();
    const { listStageOrder, listStage } = board;
    sorter(listStage, listStageOrder);

    // handle column drop
    const handleColumnDrop = async (dropResult) => {
        const { addedIndex, removedIndex } = dropResult;
        if (addedIndex !== null && removedIndex !== null) {
            try {
                const resp = await axios.post(`${BASE_URL}/api/Stages/draganddrop`, {
                    currentPos: removedIndex,
                    newPos: addedIndex,
                    id_Project: project.id
                });
                if (resp.status === 200) {
                    fetchBoard({
                        idSprint: currentSprint.id,
                        idEpic: null,
                        type: 0
                    }, dispatchBoard);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div data-tut='tut-container-board' className='board'>
            <Container
                orientation="horizontal"
                dragHandleSelector=".header-selector"
                onDrop={handleColumnDrop}
                getChildPayload={index => listStage[index]}
                dragClass=""
                dropClass=""
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'cards-drop-preview'
                }}
                style={{ width: 'auto', display: 'flex', alignItems: 'stretch' }}
            >
                {
                    listStage.length > 0 &&
                    listStage.map(item => (
                        <Draggable
                            style={{ height: 'auto' }}
                            key={v4()}>
                            <Column project={project} currentSprint={currentSprint} stage={item} />
                        </Draggable>
                    ))
                }
            </Container>
            <AddColumn currentSprint={currentSprint} project={project} />
        </div>
    )
}

export default Board

function AddColumn({ project, currentSprint }) {
    const [showInput, setShowInput] = useState(false);
    const [stageName, setStageName] = useState('');
    const inputRef = useRef();
    const { currentUser } = useSelector(state => state.auth.login);
    const [, dispatchStage] = useStageContext();
    const [, dispatchBoard] = useBoardContext();

    useEffect(() => {
        const inputEl = inputRef.current;
        const handleCreateStage = async (e) => {
            if (e.key === 'Enter') {
                const stagePost = {
                    id_Project: project.id,
                    stage_Name: stageName,
                    id_Creator: currentUser.id
                }
                await createStage(stagePost, dispatchStage);
                await fetchStage(project.id, dispatchStage);
                fetchBoard({
                    idSprint: currentSprint.id,
                    idEpic: null,
                    type: 0
                }, dispatchBoard);
            }
        }
        if (showInput) {
            inputEl.focus();
            inputEl.addEventListener('keyup', handleCreateStage);
        }
        return () => {
            if (showInput) {
                inputEl.removeEventListener('keyup', handleCreateStage);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showInput, stageName])
    return (
        <div className="add-column">
            {
                !showInput ?
                    (
                        <div onClick={() => setShowInput(true)} className='btn-add'>
                            <span className='title'>ADD STAGE</span>
                            <span className='icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </span>
                        </div>
                    ) :
                    (
                        <div className='wrapper-input'>
                            <input
                                value={stageName}
                                onChange={e => setStageName(e.target.value)}
                                ref={inputRef}
                                onBlur={() => setShowInput(false)}
                                placeholder='Enter stage name'
                                type="text" />
                        </div>
                    )
            }
            <img src="https://community.atlassian.com/html/assets/img/hot-issue-balloon.png" alt="" />
        </div>
    )
}