import { Button, Modal, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { NIL } from 'uuid';
import { v4 } from 'uuid'
import { useListIssueContext } from '../../contexts/listIssueContext';
import { useSprintContext } from '../../contexts/sprintContext';
import { fetchIssue } from '../../reducers/listIssueReducer';
import { completeSprint, fetchSprint } from '../../reducers/sprintReducer';
import SelectBoxBase from './SelectBoxBase'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import createToast from '../../util/createToast';

const style = {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

function SprintSelectbox({ open, handleClose, listSprint, sprint, project, onClose, bodyStyle }) {
    const { dispatch } = useSprintContext();
    const [, dispatchIssue] = useListIssueContext();

    // handle choose sprint
    const handleChooseSprint = async (idSprint) => {
        const dataPost = {
            "currentProjectId": project.id,
            "currentSprintId": sprint.id,
            "newSprintId": idSprint
        }
        await completeSprint(dataPost, dispatch);
        await fetchSprint(project.id, dispatch);
        fetchIssue(project.id, dispatchIssue);
        createToast('success', 'Complete sprint successfully!');
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div
                    style={style}
                    className='bg-white rounded-md py-5 px-10'>
                    <Typography style={{ textAlign: 'center', fontWeight: 550, color: '#0052cc' }} variant='h5'>SELECT SPRINT</Typography>
                    <Typography style={{ textAlign: 'center', fontStyle: 'italic', opacity: 0.8 }} variant='subtitle2'>
                        <TipsAndUpdatesIcon style={{ color: '#EFC050', marginRight: 5 }} fontSize='small' />
                        select sprint to contain not done issues
                    </Typography>
                    <Stack
                        style={{ marginTop: 20 }}
                        direction='row'
                        justifyContent='center'
                        spacing={2}
                    >
                        {
                            listSprint?.map(item => (
                                <Button
                                    key={item.id}
                                    onClick={() => handleChooseSprint(item.id)}
                                    style={{ backgroundColor: '#f4f5f7', color: '#999' }}
                                    variant='text'
                                >{item.sprintName}</Button>
                            ))
                        }
                        <Button
                            onClick={() => handleChooseSprint(NIL)}
                            style={{ backgroundColor: '#f4f5f7', color: '#999' }}
                            variant='text'
                        >Backlog</Button>
                    </Stack>
                </div>
            </Modal>
        </>
        // <SelectBoxBase
        //     onClose={onClose}
        //     bodyStyle={bodyStyle}
        // >
        //     <div className='min-w-[100px] max-w-[150px] bg-white rounded shadow-md flex flex-col'>
        //         <p className='px-3 py-2 font-bold text-primary'>Select sprint</p>
        //         {
        //             listSprint.map(item => (
        //                 <div onClick={() => handleChooseSprint(item.id)} key={v4()} className='px-3 py-2 cursor-pointer hover:bg-gray-main'>{item.sprintName}</div>
        //             ))
        //         }
        //         <div onClick={() => handleChooseSprint(NIL)} key={v4()} className='px-3 py-2 cursor-pointer hover:bg-gray-main'>Back to backlog</div>
        //     </div>
        // </SelectBoxBase>
    )
}

export default SprintSelectbox