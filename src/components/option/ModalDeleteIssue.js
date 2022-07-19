import React from 'react'
import Modal from '@mui/material/Modal';
import { Button, Typography } from '@mui/material';
import { deleteIssue, fetchIssue } from '../../reducers/listIssueReducer';

const style = {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

function ModalDeleteIssue({ open, handleClose, project, issue, dispatch }) {
    const handleDelete = async () => {
        await deleteIssue(issue.id, dispatch);
        fetchIssue(project.id, dispatch);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div
                className='bg-white rounded-md py-5 px-10'
                style={style}
            >
                <Typography color='#000' variant='h5'>Are you sure to delete {issue?.summary} ?</Typography>
                <div className='flex mt-5 justify-end'>
                    <Button onClick={handleClose} style={{ color: '#999', fontSize: 10, backgroundColor: '#f4f5f7' }}>Cancel</Button>
                    <Button onClick={handleDelete} style={{ backgroundColor: '#BC243C', marginLeft: 10 }} size='small' variant='contained'>Delete</Button>
                </div>
            </div>

        </Modal>
    )
}

export default ModalDeleteIssue