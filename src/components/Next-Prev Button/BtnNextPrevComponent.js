import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../../tutorial/data-tutorial";
import { motion } from "framer-motion";
import "../Next-Prev Button/BtnNextPrev.scss";

export default function BtnNextPrevComponent(props) {
  if (0 < parseInt(localStorage.getItem("count")) <= data.length) {
    localStorage.count = props.count;
  }

  const hiddenTutorial = () => {
    document.querySelector("#wrap-tutorial").style.display = "none";
  };

  const toggleBtn = (item) => {
    props.setShowAnimation((v) => !v);
    props.setShow((v) => !v);
    setTimeout(() => props.setShow((v) => !v), -100);
    if (item === "next") {
      props.setButton(true);
      props.setCount((count) => count + 1);
      if (parseInt(localStorage.getItem("count")) == data.length - 1) {
        document.querySelector(".btn-next").style.pointerEvents = "none";
        document.querySelector(".btn-next").style.cursor = "auto";
      } else {
        document.querySelector(".btn-prev").style.pointerEvents = "auto";
        document.querySelector(".btn-prev").style.cursor = "pointer";
      }
    } else {
      props.setButton(false);
      props.setCount((count) => count - 1);
      if (parseInt(localStorage.getItem("count")) == 2) {
        document.querySelector(".btn-prev").style.pointerEvents = "none";
        document.querySelector(".btn-prev").style.cursor = "auto";
      } else {
        document.querySelector(".btn-next").style.pointerEvents = "auto";
        document.querySelector(".btn-next").style.cursor = "pointer";
      }
    }
  };
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px #000" }}
        className="btn-next"
        value={"next"}
        onClick={() => toggleBtn("next")}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px #000" }}
        className="btn-prev"
        value={"prev"}
        onClick={() => toggleBtn("prev")}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </motion.button>
      {/* <motion.button whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px #000" }} className='btn-skip' value={'skip'} onClick={hiddenTutorial}><FontAwesomeIcon size='4x' icon={faTimes} /></motion.button> */}
    </>
  );
}
