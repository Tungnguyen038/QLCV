import Tippy from '@tippyjs/react';
import React, { useRef } from 'react'
import { useBoardContext } from '../../contexts/boardContext';
import { fetchBoard } from '../../reducers/boardReducer';
import './ButtonRefresh.scss';

function ButtonRefresh({ currentSprint }) {
    const [, dispatchBoard] = useBoardContext();
    const iconRef = useRef();
    // handle refresh
    const handleRefresh = () => {
        iconRef.current.animate(
            [
                { transform: 'rotate(0)', color: '#009B77' },
                { transform: 'rotate(360deg)', color: '#009B77' }
            ],
            {
                duration: 500,
                iterations: 3,
                endDelay: 100,
            }
        )
        setTimeout(() => {
            fetchBoard({
                idSprint: currentSprint.id,
                idEpic: null,
                type: 0
            }, dispatchBoard);
        }, 1600);
    }

    return (
        <Tippy content='Refresh board'>
            <div data-tut='tut-btn-refresh' onClick={handleRefresh} className="refresh">
                <span ref={iconRef} className='icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </span>
            </div>
        </Tippy>
    )
}

export default ButtonRefresh