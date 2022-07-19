import React from 'react'
import FilterComponent from './FilterComponent'

export default function HeaderPlanComponent({ memberComponent, leftComponent, project }) {
    return (
        <>
            <div className='project-name block text-5xl py-4'>
                Projects/{project.name}
            </div>
            <div className='action-filter flex justify-around items-center h-16 w-full my-4'>
                <FilterComponent memberComponent={memberComponent} />
                {leftComponent}
            </div>
        </>
    )
}
