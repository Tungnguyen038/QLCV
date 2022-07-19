import React, { memo } from 'react'
import { useStageContext } from '../../contexts/stageContext'
import { useBoardContext } from '../../contexts/boardContext'
import { fetchBoard } from '../../reducers/boardReducer';
import { deleteStage, fetchStage } from '../../reducers/stageReducer';
import ModalBase from '../modal/ModalBase'

function ChooseStagePopup({ onClose, currentStage, project, currentSprint }) {
    const [{ stages }, dispatchStage] = useStageContext();
    const [, dispatchBoard] = useBoardContext();

    // handle remove stage
    const handleRemoveStage = async (stage) => {
        const dataDelete = { dorward_Id_Stage: stage.id }
        await deleteStage(currentStage.id, dataDelete, dispatchStage);
        await fetchStage(project.id, dispatchStage);
        fetchBoard({
            idSprint: currentSprint.id,
            idEpic: null,
            type: 0
        }, dispatchBoard);
    }

    return (
        <ModalBase
            containerclassName='fixed inset-0 z-10 flex items-center justify-center'
            bodyClassname='relative content-modal'
            onClose={onClose}
        >
            <div className='w-fit min-w-[400px] p-4 rounded-md bg-white'>
                <h2 className='text-center text-[18px] font-bold text-primary py-2'>SELECT STAGE</h2>
                <div className='flex items-center justify-center gap-1 mb-5'>
                    <span className="inline-block text-orange-400 w-4 h-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                    </span>
                    <span className='text-sm italic text-yellow-300'>Select stage to contain current issue</span>
                </div>
                <div className='stages flex flex-wrap items-center justify-center -mx-2'>
                    {
                        stages.length > 0 &&
                        stages.map(item => {
                            return item.id !== currentStage.id ?
                                (
                                    <div onClick={() => handleRemoveStage(item)} key={item.id} className="stage w-[33.3333%] p-2">
                                        <p className='cursor-pointer uppercase flex items-center justify-center
                                        rounded w-full p-3 bg-gray-main hover:bg-gray-300 transition-all
                                        font-semibold'>{item.stage_Name}</p>
                                    </div>
                                ) :
                                null
                        })
                    }
                </div>
            </div>
        </ModalBase>
    )
}

export default memo(ChooseStagePopup)