import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'


function CustomLink({ children, to }) {
  return (
    <NavLink  to={to}>
      {children}
      <div className="line"></div>
    </NavLink>
  )
}

export default memo(CustomLink)