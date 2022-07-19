import React, { useRef, useState } from 'react'
import useModal from '../../hooks/useModal'
import OptionHeaderBacklogComponent from './OptionHeaderBacklogComponent';
import { documentHeight, KEY_ROLE_USER } from '../../util/constants';

const secondThirdScreen = documentHeight * 2 / 3;

function OptionSprint({ setShowEditSprint, project, sprint }) {
    const roleUser = JSON.parse(localStorage.getItem(KEY_ROLE_USER));
    const [show, setShow, handleClose] = useModal();
    const [coord, setCoord] = useState({});
    const nodeRef = useRef();

    // handle click
    const handleClick = () => {
        if (show || roleUser === 3) return;
        const bounding = nodeRef.current.getBoundingClientRect();
        if (bounding) {
            setShow(true);
            setCoord(bounding);
        }
    }

    return (
        <div
            style={roleUser === 3 ? { cursor: 'not-allowed' } : {}}
            ref={nodeRef}
            onClick={handleClick}
            className='flex gap-x-1 w-fit p-2 cursor-pointer bg-white rounded-md'>
            <div className='flex items-center justify-center pointer-events-none'>
                <span className='inline-flex items-center justify-center text-gray-500 w-6 h-6 hover:text-gray-800 pointer-events-none'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </span>
            </div>
            {
                show &&
                <OptionHeaderBacklogComponent
                    setShowEditSprint={setShowEditSprint}
                    sprint={sprint}
                    project={project}
                    onClose={handleClose}
                    bodyStyle={{
                        top: coord.bottom <= secondThirdScreen ? coord.bottom : null,
                        left: coord.left - 30,
                        bottom: !(coord.bottom <= secondThirdScreen) ? (documentHeight - coord.top) : null
                    }}
                />
            }
        </div>
    )
}

export default OptionSprint