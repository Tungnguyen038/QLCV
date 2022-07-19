import React, { useEffect } from 'react'
import { v4 } from 'uuid';
import { useSprintContext } from '../../contexts/sprintContext'
import { fetchSprint } from '../../reducers/sprintReducer';
import Sprint from './Sprint';

function WrapperSprint({ project, members }) {
    const { state: { sprints }, dispatch } = useSprintContext();
    useEffect(() => {
        if (project.id) {
            fetchSprint(project.id, dispatch);
        }
    }, [project.id])

    return (
        <div data-tut='tut-container-backlog'>
            {
                sprints.length > 0 &&
                sprints.map((sprint, index) => (
                    <Sprint index={index} project={project} members={members} sprint={sprint} key={v4()} />
                ))
            }
        </div>
    )
}

export default WrapperSprint