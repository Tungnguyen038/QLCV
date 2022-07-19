import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    if (!e.target.closest(".content")) {
      setShow(false);
    }
  };
  return [show, setShow, handleClose];
};
export default useModal;
