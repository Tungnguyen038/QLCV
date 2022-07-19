import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { useModalContext } from '../../contexts/modalContext'
import { BASE_URL, KEY_CURRENT_PROJECT } from '../../util/constants'
import OptionsEditIssue from '../option/OptionsEditIssue'
import './NotificationBoard.scss'
import SelectBoxBase from './SelectBoxBase'

function NotificationBoard({ onClose, bodyStyle, notifyData }) {
    const keyProject = localStorage.getItem(KEY_CURRENT_PROJECT);
    const navigate = useNavigate();
    const {
        modal: [show, setShow],
        item: [, setIssue]
    } = useModalContext();

    // handle click
    const handleClick = (data) => {
        if (data.isProject) {
            navigate(`/projects/board/${keyProject}`);
        } else if (data.isIssue) {
            setIssue({ id: data.idItemRef });
            setShow(true);
        }
        axios.patch(`${BASE_URL}/api/Notifications/Viewed?idNotif=${data.idNotif}`);
    }

    return (
        <>
            {
                show &&
                <OptionsEditIssue
                />
            }
            <SelectBoxBase
                onClose={onClose}
                bodyStyle={bodyStyle}
            >
                <div className="notification-wrapper">
                    <div className="notification-board have-y-scroll">
                        {
                            Object.entries(notifyData).length > 0 ?
                                (
                                    <div className='notification-list'>
                                        {
                                            notifyData.items.map(item => (
                                                <div onClick={() => handleClick(item)} key={v4()} className={`notification-item ${!item.isView ? 'unview' : ''}`}>
                                                    <div className="left">
                                                        <span className='text'>{item.message}</span>
                                                        <span className='time'>{item.date.slice(0, 10)}</span>
                                                    </div>
                                                    <div className='dot-new'></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ) :
                                (
                                    <p>You don't have any notification</p>
                                )
                        }
                    </div>
                </div>
            </SelectBoxBase>
        </>
    )
}

export default NotificationBoard