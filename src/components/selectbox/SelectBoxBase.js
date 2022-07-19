import React from "react";
import Portal from "../portal/Portal";

function SelectBoxBase({ children, onClose, bodyStyle }) {
  return (
    <Portal
      containerclassName="fixed inset-0 z-10"
      bodyClassName="fixed z-20"
      bodyStyle={bodyStyle}
      overlay={false}
      onClose={onClose}
    >
      {children}
    </Portal>
  );
}

export default SelectBoxBase;
