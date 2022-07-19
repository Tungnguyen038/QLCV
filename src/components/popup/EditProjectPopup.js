import React, { useEffect } from 'react'
import ModalBase from '../modal/ModalBase'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '../button/Button';
import { levels } from '../../util/constants'
import { updateProjects } from '../../redux/apiRequest'
import { useDispatch, useSelector } from 'react-redux'
import createKey from '../../util/createKey'


const schema = yup.object({
  name: yup.string().required('Name is a required field'),
  dateStarted: yup.date(),
  dateEnd: yup.date().min(
    yup.ref('dateStarted'),
    'End date has to be more than start date'
  ),
  key: yup.string().required('Key is a required field'),
  access: yup.number().oneOf(
    // eslint-disable-next-line array-callback-return
    levels.map(item => {
      if(item.value > 0) {
        return item.value
      }
    })
  , 'Level is a required field')
})

function EditProjectPopup({ onClose, setShow, project }) {
  const dateStartedProject = new Date(project.dateCreated);
  const dateStarted = `${dateStartedProject.getFullYear()}-${String(dateStartedProject.getMonth() + 1).padStart(2, '0')}-${String(dateStartedProject.getDate()).padStart(2, '0')}`
  const dateEndProject = new Date(project.dateEnd);
  const dateEnd = `${dateEndProject.getFullYear()}-${String(dateEndProject.getMonth() + 1).padStart(2, '0')}-${String(dateEndProject.getDate()).padStart(2, 0)}`
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.auth.login)
  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting }} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
        name: project.name,
        key: project.key,
        access: project.access,
        dateStarted,
        dateEnd
    }
  });
  const nameValue = watch('name');

  // on submit
  const onSubmit = (data) => {
      const dataPut ={
          ...project,
          ...data,
          isStared: project.isStared,
          id_Lead: currentUser.id,
          id_Updator: currentUser.id,
          updateDate: new Date()
      }
      console.log('data put ~ ', dataPut);
    return new Promise((resolve) => {
      setTimeout(() => {
            updateProjects(dispatch, dataPut)
            //getProjects(dispatch);
            reset();
            resolve();
            setShow(false);        
      }, 1000);
  });
  }
  useEffect(() => {
    setValue('key', createKey(nameValue));
  }, [nameValue, setValue])

  return (
    <ModalBase
    containerclassName='fixed inset-0 z-10 flex items-center justify-center'
    bodyClassname='relative content-modal'
    onClose={onClose}
    >
        <div className='have-y-scroll relative w-[95vw] max-w-[600px] max-h-[95vh] overflow-auto bg-white rounded p-10 shadow-md select-none'>
            <div onClick={() => setShow(false)} className="absolute top-0 right-0 p-2 cursor-pointer rounded-full hover:bg-primary hover:bg-opacity-30 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </div>
            <h2 className='text-[25px] text-primary text-center font-semibold mb-10'>Edit Project</h2>
            <form
            className='w-full'
            onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col items-start gap-y-2 mb-5'>
                <label className='font-semibold cursor-pointer' htmlFor="name">
                  <span className='opacity-80'>Name</span>
                  <sup className='text-red-500'>*</sup>
                </label>
                <input
                {...register('name')}
                className='w-full p-2 outline-none border-2 border-[#ccc]
                rounded focus:border-primary focus:border-opacity-60 transition-all'
                placeholder="Enter project's name"
                autoComplete='off'
                id='name'
                type="text" />
                <span className='text-[10px] text-red-500 italic'>{errors?.name?.message}</span>
              </div>
              <div className='flex flex-col items-start gap-y-2 mb-5'>
                <label className='font-semibold cursor-pointer' htmlFor="dateStarted">
                  <span className='opacity-80'>Date start</span>
                  <sup className='text-red-500'>*</sup>
                </label>
                <input
                {...register('dateStarted')}
                className='w-full p-2 outline-none border-2 border-[#ccc]
                rounded focus:border-primary focus:border-opacity-60 transition-all'
                autoComplete='off'
                id='dateStarted'
                type="date" />
                <span className='text-[10px] text-red-500 italic'>{errors?.dateStarted?.message}</span>
              </div>
              <div className='flex flex-col items-start gap-y-2 mb-5'>
                <label className='font-semibold cursor-pointer' htmlFor="dateEnd">
                  <span className='opacity-80'>Date end</span>
                  <sup className='text-red-500'>*</sup>
                </label>
                <input
                {...register('dateEnd')}
                className='w-full p-2 outline-none border-2 border-[#ccc]
                rounded focus:border-primary focus:border-opacity-60 transition-all'
                autoComplete='off'
                id='dateEnd'
                type="date" />
                <span className='text-[10px] text-red-500 italic'>{errors?.dateEnd?.message}</span>
              </div>
              <div className='flex flex-col items-start gap-y-2 mb-5'>
                <label className='font-semibold cursor-pointer' htmlFor="access">
                  <span className='opacity-80'>Access</span>
                  <sup className='text-red-500'>*</sup>
                </label>
                <select
                {...register('access')}
                className='w-full p-2 outline-none border-2 border-[#ccc]
                rounded focus:border-primary focus:border-opacity-60 transition-all'
                autoComplete='off'
                id='access'
                >
                  {
                    levels.map(level => (<option key={level.id} value={level.value}>{level.text}</option>))
                  }
                </select>
                <span className='text-[10px] text-red-500 italic'>{errors?.access?.message}</span>
              </div>
              <div className='flex flex-col items-start gap-y-2 mb-10'>
                <label className='font-semibold cursor-pointer' htmlFor="key">
                  <span className='opacity-80'>Key</span>
                  <sup className='text-red-500'>*</sup>
                </label>
                <input
                {...register('key')}
                className='w-full max-w-[30%] p-2 outline-none border-2 border-[#ccc]
                rounded focus:border-primary focus:border-opacity-60 transition-all'
                autoComplete='off'
                id='key'
                type="text" />
                <span className='text-[10px] text-red-500 italic'>{errors?.key?.message}</span>
              </div>
              <div className='w-full flex justify-end gap-x-2'>
                <Button handleClick={() => setShow(false)} primary={false}>Cancel</Button>
                <Button type='submit'>{!isSubmitting ? 'Save' :
                (<div className='w-5 h-5 mx-auto rounded-full border-2 border-white border-t-transparent animate-spin'></div>)}</Button>
            </div>
            </form>         
        </div>
    </ModalBase>
  )
}

export default EditProjectPopup