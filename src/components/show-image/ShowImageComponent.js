import React, { useEffect } from 'react'
import '../show-image/ShowImage.scss'
import '../../index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion";


export default function ShowImageComponent({ backGround, clickImg, showImg }) {

    return (
        <motion.div className='wrap-show-image'
        >
            <div className='main-show-image' style={{ backgroundImage: "url(" + backGround + ")" }}>
                <button onClick={() => clickImg(false)} className='btn-skip'><FontAwesomeIcon size='4x' icon={faTimes} /></button>
            </div>
        </motion.div>
    )
}
