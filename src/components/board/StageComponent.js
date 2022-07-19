
import React from 'react'
import TaskComponent from './TaskComponent'
import OptionComponent from '../option/OptionComponent'
import '../../../src/index.scss'
import MemberComponent from './MemberComponent'
import CreateComponent from '../CreateComponent'

export default function StageComponent({ componentOption }) {
    return (
        <>
            <div className='backlog-item h-fit overflow-y-auto w-[26rem] min-w-[26rem] min-h-[50rem] max-h-[50rem]  mx-4 bg-[#F4F5F7] block px-3 rounded-[4px] '>
                <div className='z-10 stage-name w-full flex justify-between py-3 sticky top-0 bg-[#F4F5F7] cursor-pointer'>
                    <div className='inline-flex items-center text-3xl font-bold'>Tên Stage</div>
                    {componentOption}
                </div>
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <TaskComponent componentOption={<OptionComponent />} componentMember={<MemberComponent />} />
                <CreateComponent createWhat={"issues"} />
            </div>
        </>
    )
}
