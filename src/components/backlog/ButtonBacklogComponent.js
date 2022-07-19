import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useSprintContext } from '../../contexts/sprintContext';
import { createSprint, fetchSprint } from '../../reducers/sprintReducer'
import createSprintName from '../../util/createSprintName';

export default function ButtonBacklogComponent({ text, icon, project }) {
    const { currentUser } = useSelector(state => state.auth.login);
    const { state: { sprints }, dispatch } = useSprintContext();

    const nameSprints = useMemo(() => {
        return sprints.map(item => item.sprintName)
    }, [sprints]);

    const handleCreateSprint = async () => {
        const dataPost = {
            id_Project: project.id,
            sprint_Name: createSprintName(nameSprints),
            id_Creator: currentUser.id,
        }
        await createSprint(dataPost, dispatch);
        fetchSprint(project.id, dispatch);
    }

    return (
        <>
            <div onClick={handleCreateSprint} className='btn-main cursor-pointer flex items-center rounded-[5px] py-1 px-2 w-fit h-full
            mx-4 border-solid border-[#000] border-[1px] hover:bg-primary hover:text-white transition-all'>
                {icon}
                <span className='whitespace-nowrap'>{text}</span>
            </div>
        </>
    )
}
