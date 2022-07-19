import React, { useEffect, useRef, useState } from 'react'
import { BASE_URL } from '../../util/constants';
import './AttachmentForm.scss'

function AttachmentForm({ showAttachment, setShowAttachment, issue }) {
    const [file, setFile] = useState({})
    const imageRef = useRef();
    // handle change file
    const handleChangeFile = (e) => {
        const files = e.target.files;
        setFile(files[0]);
    }
    // handle clear
    const handleClear = (e) => {
        e.preventDefault();
        imageRef.current.src = '';
        imageRef.current.hidden = true;
    }
    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!imageRef.current.src) return;
        e.target.submit();
    }
    useEffect(() => {
        let url;
        if (file.name) {
            url = URL.createObjectURL(file)
            if (url) {
                imageRef.current.hidden = false;
                imageRef.current.src = url;
            }
        }
        return () => URL.revokeObjectURL(url);
    }, [file])

    return (
        <form
            onSubmit={handleSubmit}
            action={`${BASE_URL}/api/Issue/UploadFile`}
            method="post"
            encType="multipart/form-data"
            className={`form-attachment ${showAttachment ? 'active' : ''}`}
        >
            <div className="header">
                <h2 className='title'>Attachment</h2>
                <span onClick={() => setShowAttachment(false)} className='icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className='form-group'>
                <div className='image' htmlFor="attachment">
                    <label className='choose-img' htmlFor="attachment">Choose file</label>
                    <img hidden={true} ref={imageRef} src="" alt="" />
                </div>
                <input
                    hidden
                    name='IdIssue'
                    value={issue.id}
                    type="text"
                    onChange={() => { }}
                />
                <input
                    name='File'
                    onChange={handleChangeFile}
                    hidden
                    id='attachment'
                    type="file"
                />
                <input
                    hidden
                    name='Url'
                    value={window.location.href}
                    onChange={() => { }}
                    type="text"
                />
                <div className='wrapper-btn'>
                    <button className='submit' type="submit">Save</button>
                    <button onClick={handleClear} className='reset' type='reset'>Clear</button>
                </div>
            </div>
        </form>
    )
}

export default AttachmentForm