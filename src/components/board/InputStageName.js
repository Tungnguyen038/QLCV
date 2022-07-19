import React, { useState, useMemo, memo, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { updateStage } from '../../reducers/stageReducer';
import { useStageContext } from '../../contexts/stageContext'
import { fetchBoard } from '../../reducers/boardReducer';
import { useBoardContext } from '../../contexts/boardContext';

function InputStageName({ stage, setShowInput, currentSprint }) {
    const { currentUser } = useSelector(state => state.auth.login);
    const [, dispatchStage] = useStageContext();
    const [, dispatchBoard] = useBoardContext();
    const [stageName, setStageName] = useState(stage.stage_Name);
    const inputRef = useRef();

    useEffect(() => {
        const inputEl = inputRef.current;
        inputEl.focus();
        const handleEnter = (e) => {
            if (e.key === 'Enter') {
                const putStage = async () => {
                    const dataPut = {
                        stage_Name: stageName,
                        id_Updator: currentUser.id,
                        order: stage.order
                    }
                    await updateStage(stage.id, dataPut, dispatchStage);
                    fetchBoard({
                        idSprint: currentSprint.id,
                        idEpic: null,
                        type: 0
                    }, dispatchBoard);
                }
                putStage();
            }
        }
        inputEl.addEventListener('keyup', handleEnter);
        return () => {
            inputEl.removeEventListener('keyup', handleEnter);
        }
    }, [currentUser, stageName, stage, dispatchStage])

    return (
        <input
            ref={inputRef}
            value={stageName}
            onChange={e => setStageName(e.target.value)}
            onBlur={e => setShowInput(false)}
            spellCheck={false}
            className='input-stage-name' type="text"
        />
    )
}

export default memo(InputStageName)