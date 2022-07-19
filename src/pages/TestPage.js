import axios from 'axios'
import React, { useState } from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ConfirmComponent from '../components/confirm/ConfirmComponent'
import ScoreComponent from '../components/score/ScoreComponent'
import '../scss/TestPage.scss'
import { BASE_URL } from '../util/constants'

export default function TestPage() {
    const { id, name } = useParams();
    const [showConfirm, setShowConfirm] = useState(false);
    const [listQuestion, setListQuestion] = useState([]);
    const [listId, setListId] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    // total score
    const totalScore = useMemo(() => {
        return listQuestion.reduce((init, item) => {
            return init + item.scores;
        }, 0);
    }, [listQuestion])


    useEffect(() => {
        const getTest = async () => {
            try {
                const resp = await axios.get(`${BASE_URL}/api/TestResults/GetTestById?idTest=${id}`);
                if (resp && resp.status === 200) {
                    setListQuestion(resp.data.listQuestion);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getTest();
    }, [id])

    return (
        <div>
            <div className='wrap'>
                <div id="test">
                    <div className="test-title">
                        <div className="title">
                            {name}
                        </div>
                        <div className="num-test">
                            Number of questions: {listQuestion?.length}
                        </div>
                    </div>
                    {
                        listQuestion.length > 0 &&
                        listQuestion.map((item, index) => (
                            <Question key={item.id} question={item} index={index} listId={listId} setListId={setListId} />
                        ))
                    }
                    <div className="wrapper-btn">
                        <Link to='/testlist' className='list-link'>Back to list</Link>
                        <button className="submit-btn" onClick={() => setShowConfirm(true)}>Submit</button>
                    </div>
                </div>
            </div>
            {showScore && <ScoreComponent setShowScore={setShowScore} totalScore={totalScore} score={score} />}
            {showConfirm && <ConfirmComponent totalScore={totalScore} setScore={setScore} setShowScore={setShowScore} listId={listId} idTest={id} setShowConfirm={setShowConfirm} />}
        </div>
    )
}

// component question
function Question({ question, index, listId, setListId }) {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (value) {
            const listIdCopy = [...listId];
            listIdCopy[index] = value;
            setListId(listIdCopy);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <div key={question.id} className="test-content">
            <div className="question">
                <div className="block-blue"></div>
                Question {index + 1}: {question.name} (Score: {question.scores})
            </div>
            <div className="wrap-answer">
                {
                    question.listAnswer.map(answer => (
                        <div key={answer.id} className="child-answer">
                            <input value={answer.id} onChange={e => setValue(e.target.value)} type="radio" name={question.id} className="answer" />
                            <label htmlFor="answer1">{answer.strAnswer}</label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}