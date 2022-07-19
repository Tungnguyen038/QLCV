import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Score.scss'

export default function ScoreComponent({ setShowScore, score, totalScore }) {
    const navigate = useNavigate();
    // handle click ok
    const handleClickOk = () => {
        setShowScore(false);
        navigate('/test-results');
    }

    return (
        <div className='score-main'>
            <div className='score'>
                <div className='score-title'>
                    Điểm
                </div>
                <div className='score-num'>
                    {score}/{totalScore}
                </div>
                <button className='btn-ok' onClick={handleClickOk}>
                    OK
                </button>
            </div>
        </div>
    )
}