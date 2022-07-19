import React from 'react'
import Portal from '../portal/Portal'

function ModalBase({ children, onClose, containerclassName, bodyStyle, bodyClassname, visible }) {
  return (
    <Portal
    bodyStyle={bodyStyle}
    onClose={onClose}
    bodyClassName={bodyClassname}
    containerclassName={containerclassName}>{children}</Portal>
  )
}

export default ModalBase