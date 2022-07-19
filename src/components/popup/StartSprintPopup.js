import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

import Button from '../button/Button';
import ModalBase from '../modal/ModalBase'
import createToast from '../../util/createToast';
import { fetchSprint, startSprint, updateSprint } from '../../reducers/sprintReducer';
import { useSprintContext } from '../../contexts/sprintContext';

const schema = yup.object({
    name: yup.string().required('Please enter sprint name'),
    startDate: yup.date(),
    endDate: yup.date().min(
        yup.ref('startDate'),
        'End date must be greater than start date'
    )
})

function StartSprintPopup({ onClose, setshow, sprint, project }) {
    const { dispatch } = useSprintContext();
    const today = useMemo(() => {
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
    }, [])
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            name: sprint?.sprintName,
            startDate: today,
            endDate: today
        },
    });

    // on submit
    const onSubmit = async (values) => {
        const checkEndDate = new Date(project?.dateEnd) >= new Date(values.endDate) && new Date(values.endDate) >= new Date(project?.dateCreated);
        const checkStartDate = new Date(values.startDate) >= new Date(project?.dateCreated) && new Date(project.dateEnd) >= new Date(values.startDate);
        if (!checkEndDate) {
            createToast('warn', 'The end date must be greater than start date of project and less than end date of project');
            return;
        }
        if (!checkStartDate) {
            createToast('warn', 'The start date must be greater than start date of project and less than end date of project');
            return;
        }
        const dataPut = { ...sprint };
        dataPut.end_Date = moment(values.endDate, 'YYYY-DD-MM').add(1, 'days');
        dataPut.start_Date = moment(values.startDate, 'YYYY-DD-MM').add(1, 'days');
        dataPut.sprint_Name = values.name;
        await startSprint(sprint.id, dataPut, dispatch);
        fetchSprint(project?.id, dispatch);
    }

    return (
        <ModalBase
            containerclassName='fixed inset-0 z-10 flex items-center justify-center'
            bodyClassname='relative content-modal'
            onClose={onClose}
        >
            <div className='flex flex-col w-[600px] max-h-[90vh] bg-white p-10 rounded-md select-none'>
                <h2 className='shrink-0 text-2xl font-semibold text-primary'>Start Sprint: {sprint?.sprintName}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-[35px] mb-[22px] grow flex flex-col items-start overflow-auto have-y-scroll'>
                    <div className="form-group w-full mb-3 flex flex-col gap-y-2 items-start text-gray-500">
                        <label htmlFor="name" className='font-semibold'>Sprint name <sub className='text-sm text-red-500'>*</sub></label>
                        <input
                            id='name'
                            type='text'
                            {...register('name')}
                            className='w-full px-2 py-3 rounded border-2 border-gray-400 focus:border-primary
                    transition-all outline-none'
                        />
                        <span className='text-sm text-red-500 italic'>{errors?.name?.message}</span>
                    </div>
                    <div className="form-group w-full mb-3 flex flex-col gap-y-2 items-start text-gray-500">
                        <label htmlFor="startDate" className='font-semibold'>Start date <sub className='text-sm text-red-500'>*</sub></label>
                        <p className='text-sm text-primary opacity-80'>Date start project: {(new Date(project?.dateCreated)).toDateString()}</p>
                        <input
                            id='startDate'
                            type='date'
                            placeholder='dd-mm-yyyy'
                            {...register('startDate')}
                            className='w-full px-2 py-3 rounded border-2 border-gray-400 focus:border-primary
                    transition-all outline-none'
                        />
                        <span className='text-sm text-red-500 italic'>{errors?.startDate?.message}</span>
                    </div>
                    <div className="form-group w-full mb-3 flex flex-col gap-y-2 items-start text-gray-500">
                        <label htmlFor="endDate" className='font-semibold'>End date<sub className='text-sm text-red-500'>*</sub></label>
                        <p className='text-sm text-primary opacity-80'>Date end project: {(new Date(project?.dateEnd)).toDateString()}</p>
                        <input
                            id='endDate'
                            type='date'
                            placeholder='dd-mm-yyyy'
                            {...register('endDate')}
                            className='w-full px-2 py-3 rounded border-2 border-gray-400 focus:border-primary
                    transition-all outline-none'
                        />
                        <span className='text-sm text-red-500 italic'>{errors?.endDate?.message}</span>
                    </div>
                    <div className='mt-4 w-full flex gap-x-3 justify-end'>
                        <Button primary={false} handleClick={() => setshow(false)}>Cancel</Button>
                        <Button type='submit'>{isSubmitting ?
                            <div className='w-[20px] h-[20px] rounded-full border-2 border-white animate-spin mx-auto'></div> :
                            'Start'}</Button>
                    </div>
                </form>
            </div>
        </ModalBase>
    )
}

export default StartSprintPopup