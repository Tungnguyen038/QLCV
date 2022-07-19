import React, { useEffect, useRef, useState } from 'react'
import SelectBoxBase from './SelectBoxBase'
import { useLabelContext } from '../../contexts/labelContext'
import { useListIssueContext } from '../../contexts/listIssueContext'
import { useSelector } from 'react-redux';
import { createLabel, deleteLabel, fetchLabel, updateLabel } from '../../reducers/labelReducer';
import { v4 } from 'uuid';
import { CHANGE_FILTER_LABEL_BOARD } from '../../reducers/actions';
import { fetchBoard } from '../../reducers/boardReducer';
import { useBoardContext } from '../../contexts/boardContext';

function FilterLabelBoardSelectBox({ onClose, bodyStyle, project, currentSprint }) {
    const { currentUser } = useSelector(state => state.auth.login);
    const [{ labels }, dispatchLabel] = useLabelContext();
    const [{ filters: { labels: filterLabels } }, dispatchBoard] = useBoardContext();
    const [showInput, setShowInput] = useState(false);
    const [labelName, setLabelName] = useState('');
    const inputRef = useRef();

    // handle delete label
    const handleDeleteLabel = (label) => {
        deleteLabel(label.id, dispatchLabel);
    }
    // handle select label
    const handleSelectLabel = async (label) => {
        await dispatchBoard({
            type: CHANGE_FILTER_LABEL_BOARD,
            payload: label.id
        });
        fetchBoard({
            idSprint: currentSprint?.id,
            idEpic: null,
            type: 0
        }, dispatchBoard);
    }

    useEffect(() => {
        const inputEl = inputRef.current;
        const handleCreateLabel = async (e) => {
            if (e.key === 'Enter') {
                const dataPost = {
                    id_Project: project.id,
                    name: labelName,
                    id_Creator: currentUser.id
                }
                await createLabel(dataPost, dispatchLabel);
                await fetchLabel(project.id, dispatchLabel);
                setShowInput(false);
                setLabelName('');
            }
        }
        if (showInput) {
            inputEl.focus();
            inputEl.addEventListener('keyup', handleCreateLabel)
        }
        return () => {
            if (showInput) {
                inputEl.removeEventListener('keyup', handleCreateLabel);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showInput, labelName])

    return (
        <SelectBoxBase
            onClose={onClose}
            bodyStyle={bodyStyle}
        >
            <div className='bg-white w-[140px] shadow-lg shadow-epic-color p-3 rounded flex flex-col transition-all'>
                {
                    labels.length > 0 &&
                    labels.map(item => (
                        <div key={v4()} className='flex items-center gap-x-2 group mb-2'>
                            <input
                                checked={filterLabels.includes(item.id)}
                                onChange={() => handleSelectLabel(item)}
                                type="checkbox" className='cursor-pointer' />
                            <NameLabel key={item.id} label={item} project={project} />
                            <span onClick={() => handleDeleteLabel(item)} className='hidden group-hover:block ml-auto p-1 w-6 h-6 rounded-full text-gray-500 cursor-pointer hover:bg-gray-main'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    ))
                }
                {
                    showInput ?
                        (
                            <div className='min-w-[100px] mt-2 border-2 border-primary rounded'>
                                <input
                                    ref={inputRef}
                                    value={labelName}
                                    onChange={e => setLabelName(e.target.value)}
                                    onBlur={() => setShowInput(false)}
                                    className='w-full max-w-[100px] p-1 outline-none'
                                    placeholder='Enter label...' type="text" />
                            </div>
                        ) :
                        (
                            <div onClick={() => setShowInput(true)} className='min-w-[100px] mt-2 p-1 rounded flex items-center gap-2
                cursor-pointer hover:bg-gray-main transition-all'>
                                <span className='inline-block w-4 h-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <p className='text-sm font-semibold'>Add Label</p>
                            </div>
                        )
                }

            </div>
        </SelectBoxBase>
    )
}

export default FilterLabelBoardSelectBox

function NameLabel({ label, project }) {
    const [showInput, setShowInput] = useState(false);
    const [labelName, setLabelName] = useState(label.name);
    const [, dispatchLabel] = useLabelContext();
    const { currentUser } = useSelector(state => state.auth.login);
    const inputRef = useRef();

    useEffect(() => {
        const inputEl = inputRef.current;
        const handleEditlabel = async (e) => {
            if (e.key === 'Enter') {
                const dataPut = {
                    name: labelName,
                    id_Updator: currentUser.id
                };
                await updateLabel(label.id, dataPut, dispatchLabel);
                await fetchLabel(project.id, dispatchLabel);
            }
        }
        if (showInput) {
            inputEl.focus();
            inputEl.addEventListener('keyup', handleEditlabel);
        }
        return () => {
            if (showInput) {
                inputEl.removeEventListener('keyup', handleEditlabel);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showInput, labelName])

    return (
        <>
            {
                showInput ?
                    (
                        <input
                            ref={inputRef}
                            onBlur={() => setShowInput(false)}
                            value={labelName}
                            onChange={e => setLabelName(e.target.value)}
                            className='w-[60px] outline-none border-2 border-primary p-1 rounded'
                            type='text'
                        />
                    ) :
                    (
                        <span onClick={() => setShowInput(true)} className='cursor-pointer hover:text-primary hover:font-semibold'>{label.name}</span>
                    )
            }

        </>
    )
}