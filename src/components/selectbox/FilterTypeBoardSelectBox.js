import React from 'react'
import SelectBoxBase from './SelectBoxBase'

function FilterTypeBoardSelectBox({ issueTypes, handleChooseType, type, onClose, bodyStyle }) {
    return (
        <SelectBoxBase
            onClose={onClose}
            bodyStyle={bodyStyle}
        >
            <div
                className='type-dropdown'>
                {
                    issueTypes.length > 0 &&
                    issueTypes.map(item => (
                        <div
                            key={item.id}
                            onClick={() => handleChooseType(item.value)}
                            className='flex items-center gap-x-2 hover:bg-gray-main cursor-pointer'>
                            <input
                                id={item.id}
                                checked={type.includes(item.value)}
                                type="checkbox"
                                onChange={() => { }}
                                className='cursor-pointer'
                            />
                            <div className="w-5 h-5">
                                <img className='block w-full h-full object-cover rounded-md' src={item.thumbnail} alt="" />
                            </div>
                            <label className='capitalize' htmlFor={item.id}>{item.title}</label>
                        </div>
                    ))
                }
            </div>
        </SelectBoxBase>
    )
}

export default FilterTypeBoardSelectBox