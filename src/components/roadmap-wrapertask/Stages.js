import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/useModal";
import StageSelectbox from "../selectbox/StageSelectbox";
import { documentHeight } from "../../util/constants";

const secondThirdScreen = (documentHeight * 2) / 3;

function Stages({ stage, issue, project }) {
  const [coord, setCoord] = useState({});
  const [show, setShow, handleClose] = useModal();
  const nodeRef = useRef();

  const handleClick = () => {
    const bounding = nodeRef.current.getBoundingClientRect();
    if (bounding) {
      setCoord(bounding);
      setShow(true);
    }
  };

  return (
    <>
      {show && (
        <StageSelectbox
          bodyStyle={{
            top: coord.bottom <= secondThirdScreen ? coord.bottom : null,
            left: coord.left - 10,
            bottom:
              coord.bottom > secondThirdScreen
                ? documentHeight - coord.top
                : null,
          }}
          project={project}
          issue={issue}
          onClose={handleClose}
          stage={stage}
        />
      )}
      <div
        ref={nodeRef}
        onClick={handleClick}
        className="whitespace-nowrap rounded-md h-4 w-auto uppercase text-xs font-bold  mx-2 border-solid border-[0.5px] border-[#ccc] flex justify-center items-center py-3 px-2 bg-[#ccc]"
      >
        {stage?.stage_Name}
        <FontAwesomeIcon
          size="1x"
          className="px-2 inline-block"
          icon={faAngleDown}
        />
      </div>
    </>
  );
}

export default Stages;
