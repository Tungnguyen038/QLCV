import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import MemberComponent from '../board/MemberComponent'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

export default function FilterComponent({ memberComponent }) {
    return (
        <>
            <div className='action flex-1 flex items-center'>
                <div className="search-wrapper border-2 border-[#ccc] inline-flex justify-start items-center h-80% rounded mx-2">
                    <svg class="w-5 h-5 icon mx-2" viewBox="0 0 20 20" fill="#ccc"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    <input type="text" placeholder="Search" className='outline-none py-2 mx-1' />
                </div>
                <div className='mx-3'>
                    {memberComponent}
                </div>
                <div className='add-member w-10 h-10 rounded-[50%] flex justify-center items-center bg-[#ccc] border-solid border-[#000] border-2 mx-2 cursor-pointer'>
                    <FontAwesomeIcon icon={faUserPlus} />
                </div>
                <div className='filter h-full flex justify-center items-center'>
                    <div className="custom-select h-full rounded-sm mx-2">
                        <select className='border-solid border-[#000] border-[1px] rounded-[4px] p-1'>
                            <option value="0">Select car:</option>
                            <option value="1">Audi</option>
                            <option value="2">BMW</option>
                        </select>
                    </div>
                    <div className="custom-select h-full rounded-sm mx-2">
                        <select className='border-solid border-[#000] border-[1px] rounded-[4px] p-1'>
                            <option value="0">Select car:</option>
                            <option value="1">Audi</option>
                            <option value="2">BMW</option>
                        </select>
                    </div>
                    <div className="clear-filter h-full mx-2 border-solid border-[#000] border-[1px] p-1 rounded-[4px] cursor-pointer">
                        Clear filter
                    </div>
                </div>
            </div>
        </>
    )
}
