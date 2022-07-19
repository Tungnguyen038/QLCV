import React from 'react'
import './Button.scss'

function Button({ children, handleClick, primary = true, type = 'button', ...props }) {
  return (
    <button
      {...props}
      className={`button hover:bg-opacity-90 ${primary ? 'bg-primary text-white' : 'bg-gray-main text-[#666]'}`}
      onClick={handleClick}
      type={type}
    >{children}</button>
  )
}

export default Button