import React, { useState } from "react";
import "../scss/Tutorial.scss";
import "../../src/index.scss";
import ShowImageComponent from "../components/show-image/ShowImageComponent";
import { data } from "../tutorial/data-tutorial";
import BtnNextPrevComponent from "../components/Next-Prev Button/BtnNextPrevComponent";
import { motion } from "framer-motion";

export default function Tutorial() {
  const [showImg, setShowImg] = useState(false);
  const [backGround, setBackGround] = useState();

  const [count, setCount] = useState(1);
  const [show, setShow] = useState(true);
  const [showAnimation, setShowAnimation] = useState(true);
  const [button, setButton] = useState(true); // True nếu là next

  const clickImg = (boolean, backGround) => {
    setShowImg(boolean);
    setBackGround(backGround);
  };

  var imgContent = "calc(-50vw + 70px)";
  var textContent = "calc(50vw - 70px)";

  var initialImg = 0;
  var initialContent = 0;

  if (!showAnimation) {
    initialImg = imgContent;
    initialContent = textContent;
    textContent = 0;
    imgContent = 0;
  }

  const animationTextContent = {
    show: {
      left: textContent,
      opacity: 2,
    },
    hidden: {
      left: initialContent,
      opacity: 0.1,
    },
  };

  const animationImageContent = {
    show: {
      left: imgContent,
      opacity: 1,
    },
    hidden: {
      left: initialImg,
      opacity: 0.1,
    },
  };

  const animationImageLarge = {
    show: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    hidden: {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      opacity: 0.7,
    },
  };

  const animationImageChild1 = {
    show: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    hidden: {
      x: Math.random() * 100,
      y: Math.random() * 1000,
      opacity: 0.7,
    },
  };

  const animationImageChild2 = {
    show: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    hidden: {
      x: Math.random() * 1000,
      y: Math.random() * 100,
      opacity: 0.7,
    },
  };

  const animationImageChild3 = {
    show: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    hidden: {
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0.7,
    },
  };

  const animationImageChild4 = {
    show: {
      x: 0,
      y: 0,
      z: 0,
      opacity: 1,
    },
    hidden: {
      x: Math.random() * 10,
      y: Math.random() * 10,
      z: Math.random() * 10,
      opacity: 0.7,
    },
  };

  const animationPrev = {
    show: {
      opacity: 1,
    },
    hidden: {
      opacity: 0.7,
    },
  };

  return (
    <>
      <div id="wrap-tutorial">
        {data.map((item) => {
          var html;
          if (item.id == count) {
            var booleanText;
            var booleanImg;
            item.title2 != "" ? (booleanText = true) : (booleanImg = true);
            html = (
              <div id="main-tutorial">
                <motion.div
                  className="content-tutorial"
                  initial={false}
                  variants={button ? animationTextContent : animationPrev}
                  animate={show ? "show" : "hidden"}
                  transition={{ type: "spring", stiffness: 60 }}
                >
                  <div className="title-content">{item.title1}</div>
                  <div className="content">
                    <p>{item.content1}</p>
                    <p>{item.content1_1}</p>
                  </div>
                </motion.div>
                <motion.div
                  className="image-tutorial"
                  initial={false}
                  variants={button ? animationImageContent : animationPrev}
                  animate={show ? "show" : "hidden"}
                  transition={{ type: "spring", stiffness: 60 }}
                >
                  {booleanText && (
                    <>
                      <div className="title-content">{item.title2}</div>
                      <div className="content ">
                        {item.title2_1 && (
                          <p className="font-semibold">
                            {item.title2_1 || null}
                          </p>
                        )}

                        <p>{item.content2}</p>
                      </div>
                    </>
                  )}
                  {booleanImg && (
                    <>
                      <motion.div
                        initial={false}
                        variants={button ? animationImageLarge : animationPrev}
                        animate={show ? "show" : "hidden"}
                        transition={{ type: "spring", stiffness: 60 }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0px 0px 8px #000",
                        }}
                        className="image-large"
                        style={{
                          backgroundImage: "url(" + item.imageLager + ")",
                        }}
                        onClick={() => clickImg(true, item.imageLager)}
                      ></motion.div>
                      <motion.div
                        initial={false}
                        variants={button ? animationImageChild1 : animationPrev}
                        animate={show ? "show" : "hidden"}
                        transition={{ type: "spring", stiffness: 60 }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0px 0px 8px #000",
                        }}
                        className="image-child-1"
                        style={{
                          backgroundImage: "url(" + item.imageChild1 + ")",
                        }}
                        onClick={() => clickImg(true, item.imageChild1)}
                      ></motion.div>
                      <motion.div
                        initial={false}
                        variants={button ? animationImageChild2 : animationPrev}
                        animate={show ? "show" : "hidden"}
                        transition={{ type: "spring", stiffness: 60 }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0px 0px 8px #000",
                        }}
                        className="image-child-2"
                        style={{
                          backgroundImage: "url(" + item.imageChild2 + ")",
                        }}
                        onClick={() => clickImg(true, item.imageChild2)}
                      ></motion.div>
                      <motion.div
                        initial={false}
                        variants={button ? animationImageChild3 : animationPrev}
                        animate={show ? "show" : "hidden"}
                        transition={{ type: "spring", stiffness: 60 }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0px 0px 8px #000",
                        }}
                        className="image-child-3"
                        style={{
                          backgroundImage: "url(" + item.imageChild3 + ")",
                        }}
                        onClick={() => clickImg(true, item.imageChild3)}
                      ></motion.div>
                      <motion.div
                        initial={false}
                        variants={button ? animationImageChild4 : animationPrev}
                        animate={show ? "show" : "hidden"}
                        transition={{ type: "spring", stiffness: 60 }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0px 0px 8px #000",
                        }}
                        className="image-child-4"
                        style={{
                          backgroundImage: "url(" + item.imageChild4 + ")",
                        }}
                        onClick={() => clickImg(true, item.imageChild4)}
                      ></motion.div>
                    </>
                  )}
                </motion.div>
              </div>
            );
          }

          return html;
        })}
        <BtnNextPrevComponent
          setButton={setButton}
          showAnimation={showAnimation}
          setShow={setShow}
          setShowAnimation={setShowAnimation}
          setCount={setCount}
          count={count}
        />
      </div>
      {showImg && (
        <ShowImageComponent
          backGround={backGround}
          clickImg={clickImg}
          showImg={showImg}
        />
      )}
    </>
  );
}
