import React from 'react'
import './Confirm.scss'
import axios from 'axios'
import { BASE_URL } from '../../util/constants'

export default function ConfirmComponent({ listId, idTest, setShowConfirm, setScore, setShowScore }) {

  const handleSubmit = async () => {
    try {
      const dataPost = {
        listId,
        idTest: idTest
      }
      const resp = await axios.post(`${BASE_URL}/api/TestResults/SubmitTest`, dataPost);
      if (resp && resp.status === 200) {
        setScore(resp.data);
        setShowConfirm(false);
        setShowScore(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div id="confirm">
      <div className='main-confirm'>
        <div className='title-confirm'>
          Are you sure ?
        </div>
        <div className='btn-confirm'>
          <button className='yes-confirm' onClick={handleSubmit}>
            Có
          </button>
          <button className='no-confirm' onClick={() => setShowConfirm(false)}>
            Không
          </button>
        </div>
      </div>
    </div>
  )
}