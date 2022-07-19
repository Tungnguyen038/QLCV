import React from 'react'
import Portal from '../portal/Portal'

function Tooltip({ children, coord }) {
    let top = `${coord.bottom + 10}px`;
    let left = `${coord.left}px`;
   
    if(window.scrollY > 0) {
        top -= window.scrollY;
    }
    if(window.scrollX > 0) {
        left -= window.scrollX;
    }
    let bodyStyle = {
        position: 'fixed',
        top,
        left,
        transform: 'translateX(-25%)'
    }
    if(coord.left >= (document.body.clientWidth - 100)) {
        const right = `${document.body.clientWidth - coord.right}px`;
        bodyStyle = {
            position: 'fixed',
            top,
            right,

        }
    }
  return (
    <Portal bodyStyle={bodyStyle} overlay={false}>
        <div
        className='inline-block px-3 py-1 rounded-[4px] bg-black bg-opacity-80 text-[12px] text-white font-light'
        >{children}</div>
    </Portal>
  )
}

export default Tooltip