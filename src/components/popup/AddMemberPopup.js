import { Chip } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { v4 } from 'uuid';
import { useMembersContext } from '../../contexts/membersContext';
import { addMembers, fetchMembers } from '../../reducers/membersReducer';
import { BASE_URL, roles } from '../../util/constants';
import Button from '../button/Button';
import ModalBase from '../modal/ModalBase'

function AddMemberPopup({ onClose, setShow, project }) {
    const inputRef = useRef();
    const { dispatch: dispatchMembers } = useMembersContext();
    const [dropdown, setDropdown] = useState(false);
    const [members, setMembers] = useState([]);
    const [membersSearched, setMembersSearched] = useState([]);
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [role, setRole] = useState(3);

    // handle change search
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
        setDropdown(true);
    }
    // handle choose member
    const handleChooseMember = (member) => {
        const checkExist = members.find(item => item === member);
        if (checkExist) return;
        setMembers(prev => [...prev, member]);
        setSearch('')
    }
    // handle delete choose
    const handleDeleteChoose = (index) => {
        const membersCopy = [...members];
        membersCopy.splice(index, 1);
        setMembers(membersCopy);
    }
    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (members.length === 0) return;
        const data = {
            idProject: project.id,
            userNames: [...members],
            role
        }
        await addMembers(data, dispatchMembers);
        await fetchMembers(project.id, dispatchMembers);
        setShow(false);
    }

    useEffect(() => {
        const inputEl = inputRef.current;
        const handleFocus = () => {
            setFocus(true);
        }
        const handleBlur = () => {
            setFocus(false);
        }
        const handleClick = e => {
            if (!e.target.closest('.dropdown')) {
                setDropdown(false);
            }
        }
        window.addEventListener('click', handleClick)
        inputEl.addEventListener('focus', handleFocus);
        inputEl.addEventListener('blur', handleBlur);
        return () => {
            inputEl.removeEventListener('focus', handleFocus);
            inputEl.removeEventListener('blur', handleBlur);
            window.removeEventListener('click', handleClick);
        }
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            const resp = await axios.get(`${BASE_URL}/api/Project/UserCanAdded?IdProject=${project.id}`)
            const data = resp.data;
            setMembersSearched(data.filter(item => !members.includes(item) && item.toLowerCase().includes(search.toLowerCase())))
        }
        fetchData();

    }, [search])

    return (
        <ModalBase
            containerclassName='fixed z-20 inset-0 flex justify-center'
            bodyClassname='fixed z-10 mt-[100px]'
            onClose={onClose}
        >
            <form className='w-[500px] bg-white p-5 rounded'>
                <h3 className='text-[20px] text-black font-semibold'>Add members</h3>
                <div className={`relative flex items-center ${members.length > 0 ? 'p-3' : ''} pr-0 border-2 ${focus ? 'border-primary bg-white' : 'border-[#ccc] bg-gray-main'}
            rounded mt-5 transition-all mb-5`}>
                    <div className='grow flex flex-col gap-1 items-start'>
                        <div className='flex gap-x-2 flex-wrap'>
                            {
                                members.length > 0 &&
                                members.map((member, index) => (
                                    <Chip key={index} size='small' label={member} onDelete={() => handleDeleteChoose(index)} />

                                ))
                            }
                        </div>
                        <input
                            value={search}
                            onChange={handleChangeSearch}
                            ref={inputRef}
                            className='w-full group p-3 outline-none border-none bg-transparent'
                            placeholder='Enter name member'
                            type="text"
                        />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="#ccc">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    {
                        membersSearched.length > 0 && dropdown &&
                        <div className='absolute dropdown flex flex-col gap-y-2 left-0 top-[calc(100%+5px)] w-full p-3 rounded bg-gray-main'>
                            {
                                membersSearched.map(item => (
                                    <p key={v4()} onClick={() => handleChooseMember(item)} className='p-3 rounded bg-[#ccc] cursor-pointer hover:bg-white'>{item}</p>
                                ))
                            }
                        </div>

                    }
                </div>
                <div className='flex gap-4 justify-end'>
                    {
                        members.length > 0 &&
                        <div className='w-full max-w-[150px]'>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className='w-full p-3 rounded border-2 border-gray-300 outline-none focus:border-primary'
                            >
                                {
                                    roles.map(item => (
                                        <option key={item.id} value={item.value}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    }
                    <Button handleClick={() => setShow(false)} primary={false}>Cancel</Button>
                    <Button handleClick={handleSubmit}>Add</Button>
                </div>
            </form>
        </ModalBase>
    )
}

export default AddMemberPopup