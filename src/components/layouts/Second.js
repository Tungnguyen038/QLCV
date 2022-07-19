import React from 'react'
import Main from './Main'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'

function Second() {
  return (
    <>
        <Main></Main>
        <div className='flex'>
            <Sidebar></Sidebar>
            <div className='basis-[80%]'>
                <Outlet></Outlet>
            </div>
        </div>
    </>
  )
}

export default Second