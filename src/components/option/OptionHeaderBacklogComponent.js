import React, { useMemo } from 'react'
import { useSprintContext } from '../../contexts/sprintContext';
import useModal from '../../hooks/useModal';
import { deleteSprint, fetchSprint } from '../../reducers/sprintReducer'
import { NIL } from 'uuid'
import ModalBase from '../modal/ModalBase';
import Portal from '../portal/Portal';

export default function OptionHeaderBacklogComponent({ sprint, project, setShowEditSprint, bodyStyle, onClose }) {
    const { dispatch } = useSprintContext();
    const [showSprintPopup, setShowSprintPopup, handleCloseSprintPopup] = useModal();

    const handleDeleteSprint = async () => {
        setShowSprintPopup(true);
    }

    return (
        <>
            {
                showSprintPopup &&
                <SelectSprintPopup
                    currentSprint={sprint}
                    onClose={handleCloseSprintPopup}
                    project={project}
                    dispatch={dispatch}
                />
            }
            <Portal
                containerclassName='fixed inset-0 z-10'
                bodyClassName='fixed z-20'
                bodyStyle={bodyStyle}
                overlay={false}
                onClose={onClose}
            >
                <div className=' bg-white whitespace-nowrap w-fit h-auto flex flex-col rounded-md shadow-md'>
                    <div onClick={() => setShowEditSprint(true)} role="button" className='p-2 hover:bg-[#f4f5f7]'>
                        Edit sprint
                    </div>
                    <div onClick={handleDeleteSprint} role="button" className='p-2 hover:bg-[#f4f5f7]'>
                        Delete sprint
                    </div>
                </div>
            </Portal>
        </>
    )
}

// popup select sprint
function SelectSprintPopup({ onClose, currentSprint, dispatch, project }) {
    const { state: { sprints } } = useSprintContext();
    const sprintOther = useMemo(() => {
        return sprints.filter(item => item.id !== currentSprint.id)
    }, [sprints, currentSprint]);

    // handle select sprint
    const handleSelectSprint = async (idSprint) => {
        const dataDelete = {
            idSprintDelete: currentSprint.id,
            idSprintNew: idSprint
        }
        await deleteSprint(dataDelete, dispatch);
        fetchSprint(project?.id, dispatch);
    }

    return (
        <ModalBase
            containerclassName='fixed inset-0 z-10 flex items-center justify-center'
            bodyClassname='relative content-modal'
            onClose={onClose}
        >
            <div className='w-fit min-w-[400px] p-4 rounded-md bg-white'>
                <h2 className='text-center text-[18px] font-bold text-primary py-2'>SELECT SPRINT</h2>
                <div className='flex items-center justify-center gap-1 mb-5'>
                    <span className="inline-block text-orange-400 w-4 h-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                        </svg>
                    </span>
                    <span className='text-sm italic text-yellow-300'>select sprint to contain not done issues</span>
                </div>
                <div className='flex flex-wrap items-center justify-center -mx-2'>
                    {
                        sprintOther.map(item => (
                            <div key={item.id} onClick={() => handleSelectSprint(item.id)} className="stage w-[33.3333%] p-2">
                                <p className='cursor-pointer uppercase flex items-center justify-center
                                        rounded w-full p-3 bg-gray-main hover:bg-gray-300 transition-allfont-semibold'
                                >{item.sprintName}</p>
                            </div>
                        ))
                    }
                    <div onClick={() => handleSelectSprint(NIL)} className="stage w-[33.3333%] p-2">
                        <p className='cursor-pointer uppercase flex items-center justify-center
                                        rounded w-full p-3 bg-gray-main hover:bg-gray-300 transition-allfont-semibold'
                        >Backlog</p>
                    </div>
                </div>

            </div>
        </ModalBase>
    )
}
