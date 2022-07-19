import React from 'react'
import SelectBoxBase from './SelectBoxBase'
import CreateComponent from '../CreateComponent'
import EditIssuePopup from '../popup/EditIssuePopup'
import useModal from '../../hooks/useModal';
import { useMembersContext } from '../../contexts/membersContext';
import axios from 'axios';
import { BASE_URL } from '../../util/constants';
import { fetchIssue } from '../../reducers/listIssueReducer';
import { useListIssueContext } from '../../contexts/listIssueContext';
import { v4 } from 'uuid';
import createToast from '../../util/createToast';

function FilterEpicSelectBox({ onClose, bodyStyle, epics, issueEpics, project, handleChooseEpic }) {

    return (
        <SelectBoxBase
            onClose={onClose}
            bodyStyle={bodyStyle}
        >
            <div
                className='epic-dropdown have-y-scroll px-4 w-[200px] h-[200px] overflow-y-auto
                mx-4 bg-white rounded-[5px] flex flex-col gap-y-2 shadow-lg shadow-epic-color'>
                <div className='flex justify-between w-full py-2'>
                    <span className='font-bold text-lg text-[#8777D9]'>Epic</span>
                </div>
                <div
                    onClick={() => handleChooseEpic('issues without epic')}
                    className='flex items-center gap-x-2'>
                    <input
                        className='cursor-pointer'
                        id='none-epic'
                        checked={epics.includes('issues without epic')}
                        type="checkbox"
                        readOnly
                    />
                    <label className='text-base font-semibold' htmlFor="none-epic">Issues without epic</label>
                </div>
                {
                    issueEpics.length > 0 &&
                    issueEpics.map(item => (
                        <EpicItem key={v4()} project={project} epics={epics} epic={item} handleChooseEpic={handleChooseEpic} />
                    ))
                }
                <CreateComponent idIssueType={1} project={project} createWhat={"epic"} />
            </div>
        </SelectBoxBase>
    )
}

export default FilterEpicSelectBox

function EpicItem({ project, epics, epic, handleChooseEpic }) {
    const [show, setShow] = useModal();
    const { state: { members }
    } = useMembersContext();
    const [, dispatchIssue] = useListIssueContext();
    // handle delete
    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            const resp = await axios.delete(`${BASE_URL}/api/Issue/${epic.id}`);
            if (resp && resp.status === 200) {
                createToast('success', 'Delete epic successfully!');
                fetchIssue(project.id, dispatchIssue);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                show && <EditIssuePopup members={members} project={project} issue={epic} setShow={setShow} />
            }
            <div
                className='flex items-center gap-x-2 group'>
                <input
                    onChange={() => handleChooseEpic(epic.id)}
                    className='cursor-pointer border-gray-500'
                    checked={epics.includes(epic.id)}
                    readOnly
                    type="checkbox"
                />
                <label
                    onClick={() => setShow(true)}
                    className='text-base font-semibold hover:underline hover:text-epic-color cursor-pointer'
                >
                    {epic.summary}
                </label>
                <span onClick={handleDelete} className='cursor-pointer hidden group-hover:inline-flex ml-auto text-[#ccc] items-center justify-center w-6 h-6 p-1 rounded-full hover:bg-gray-main'>
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
        </>
    )
}