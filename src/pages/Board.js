import React from 'react'
import Header from '../components/header/Header'
import '../../src/index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import StageComponent from '../components/board/StageComponent'
import MemberComponent from '../components/board/MemberComponent'
import OptionComponent from '../components/option/OptionComponent'
import HeaderPlanComponent from '../components/headerPlanning/HeaderPlanComponent'
import LeftBoardComponent from '../components/headerPlanning/LeftBoardComponent'

export default function Backlog() {
    return (
        <>
            <Header />
            <div id='wrap-board' className='h-screen m-3'>
                <HeaderPlanComponent leftComponent={<LeftBoardComponent />} memberComponent={<MemberComponent />} />
                <div className='main-board h-fit w-auto flex flex-row flex-nowrap overflow-auto min-h-[40rem] py-10'>
                    <StageComponent componentOption={<OptionComponent />} />
                    <StageComponent componentOption={<OptionComponent />} />
                    <StageComponent componentOption={<OptionComponent />} />
                    <StageComponent componentOption={<OptionComponent />} />
                    <StageComponent componentOption={<OptionComponent />} />
                    <StageComponent componentOption={<OptionComponent />} />
                    <StageComponent componentOption={<OptionComponent />} />
                    <div className='w-14 h-14 block '>
                        <FontAwesomeIcon size='3x' icon={faCirclePlus} />
                    </div>
                </div>
            </div>
        </>
    )
}
