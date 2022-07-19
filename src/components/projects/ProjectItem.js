import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProjects, getProjects, updateProjects } from '../../redux/apiRequest';
import EditProjectPopup from '../popup/EditProjectPopup'
import useModal from '../../hooks/useModal';
import { BASE_URL, KEY_CURRENT_PROJECT } from '../../util/constants';
import { Avatar, Button, IconButton, Modal, Skeleton, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useLoading from '../../hooks/useLoading';
import Tippy from '@tippyjs/react';
import { Box } from '@mui/system';
import axios from 'axios';

const style = {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    backgroundColor: 'white',
    boxShadow: 24,
    borderRadius: '4px',
    p: 4,
};

function ProjectItem({ project }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showEdit, setShow, handleClose] = useModal()
    const { currentUser } = useSelector(state => state.auth.login);
    const [isLoading] = useLoading();
    const [openDelete, setOpenDelete] = useState(false);

    const handleClickItem = (e) => {
        if (e.target.closest('.name') || e.target.closest('.key') || e.target.closest('.lead') || e.target.matches('.actions')) {
            localStorage.setItem(KEY_CURRENT_PROJECT, project.key);
            navigate(`/projects/board/${project.key}`);
        }
    }
    const handleShowEdit = (e) => {
        setShow(true);
    }
    // handle click star
    const handleClickStar = () => {
        const putData = async () => {
            const resp = await axios.patch(`${BASE_URL}/api/Project/UpdateStarredProject`,
                {
                    "idProject": project.id
                }
            );
            if (resp.status === 200) {
                getProjects(dispatch, currentUser.id);
            }
        };
        putData();
    }
    // handle delete project
    const handleDeleteProject = () => {
        deleteProjects(dispatch, project.id);
        getProjects(dispatch, currentUser.id)
    }


    return (
        <div data-tut='tut-projectitem' onClick={handleClickItem} className="item flex py-[8px] hover:bg-gray-main cursor-pointer">
            {showEdit && <EditProjectPopup project={project} onClose={handleClose} setShow={setShow}></EditProjectPopup>}
            <div id='star' className='basis-[5%] flex items-center justify-center'>
                {
                    isLoading ?
                        (
                            <div>
                                <Skeleton style={{ backgroundColor: '#f4f5f7' }} variant='text' animation='wave' width={20} height={20} />
                            </div>
                        ) :
                        <>
                            {
                                project.isStared ?
                                    <Tippy content='Unstarred'>
                                        <svg data-tut='tut-btn-startproject' onClick={handleClickStar} xmlns="http://www.w3.org/2000/svg" strokeWidth={1} stroke='#000' className="star h-6 w-6 cursor-pointer" viewBox="0 0 20 20" fill="rgb(253, 224, 71)">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </Tippy> :
                                    <Tippy content='Star'>
                                        <svg data-tut='tut-btn-startproject' onClick={handleClickStar} xmlns="http://www.w3.org/2000/svg" className="star h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#ccc" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </Tippy>
                            }
                        </>
                }
            </div>
            <div className='basis-[25%] name flex items-center gap-x-3'>
                {
                    isLoading ?
                        (
                            <div>
                                <Skeleton style={{ backgroundColor: '#f4f5f7' }} variant='text' animation='wave' width={30} height={30} />
                            </div>
                        ) :
                        (
                            <img
                                className='w-6 h-6 object-cover rounded-sm'
                                src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt=""
                            />
                        )
                }
                {
                    isLoading ?
                        (
                            <div>
                                <Skeleton style={{ backgroundColor: '#f4f5f7' }} variant='text' animation='wave' width={80} height={20} />
                            </div>
                        ) :
                        (
                            <span className='text-primary'>{project.name}</span>
                        )
                }
            </div>
            <div className='basis-[20%] key'>
                {
                    isLoading ?
                        (
                            <div>
                                <Skeleton style={{ backgroundColor: '#f4f5f7' }} variant='text' animation='wave' width={30} height={20} />
                            </div>
                        ) :
                        (
                            <span>{project.key}</span>
                        )
                }
            </div>
            <div className='basis-[25%] flex gap-x-2 actions'>
                {
                    isLoading ?
                        (
                            <div>
                                <Skeleton style={{ backgroundColor: '#f4f5f7' }} variant='text' animation='wave' width={50} height={20} />
                            </div>
                        ) :
                        (
                            <>
                                <Tippy content='Edit project'>
                                    <IconButton data-tut='tut-btn-editproject' sx={{ width: 30, height: 30 }} onClick={handleShowEdit} size='sm'>
                                        <EditIcon fontSize='small' />
                                    </IconButton>
                                </Tippy>
                                <Tippy content='Delete project'>
                                    <IconButton data-tut='tut-btn-deleteproject' sx={{ width: 30, height: 30 }} onClick={() => setOpenDelete(true)} size='sm'>
                                        <DeleteIcon fontSize='small' />
                                    </IconButton>
                                </Tippy>
                                <Modal
                                    open={openDelete}
                                    onClose={() => setOpenDelete(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography variant='h5'>Are you sure to delete {project.name} ?</Typography>
                                        <Stack sx={{ marginTop: 2 }} direction='row' justifyContent="flex-end" spacing={2}>
                                            <Button onClick={() => setOpenDelete(false)} size='medium' sx={{ color: '#ccc' }}>Cancel</Button>
                                            <Button
                                                onClick={handleDeleteProject}
                                                sx={{
                                                    backgroundColor: 'rgb(188, 36, 60)',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'rgb(188, 36, 60)'
                                                    }
                                                }}
                                                variant='contained'
                                                size='medium'>Delete</Button>
                                        </Stack>
                                    </Box>
                                </Modal>
                            </>
                        )
                }
            </div>
            <div className='basis-[25%] flex items-center gap-x-3 lead'>
                {
                    isLoading ?
                        (
                            <div>
                                <Skeleton style={{ backgroundColor: '#f4f5f7' }} variant='text' animation='wave' width={60} height={20} />
                            </div>
                        ) :
                        (
                            <>
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24
                                    }}
                                    alt='Lead project image'
                                    src='https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' />
                                <span className='text-primary'>{project?.lead}</span>
                            </>
                        )
                }
            </div>
        </div>
    )
}

export default ProjectItem