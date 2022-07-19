import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { NIL } from "uuid";
import { useBoardContext } from "../../../contexts/boardContext";
import { useLabelContext } from "../../../contexts/labelContext";
import { useListIssueContext } from "../../../contexts/listIssueContext";
import { fetchBoard } from "../../../reducers/boardReducer";
import { fetchIssue } from "../../../reducers/listIssueReducer";
import { BASE_URL, KEY_ROLE_USER } from "../../../util/constants";
import createToast from "../../../util/createToast";

function Label({ project, issue, currentSprint }) {
    const roleUser = JSON.parse(localStorage.getItem(KEY_ROLE_USER));
    const [{ labels }] = useLabelContext();
    const [, dispatchIssue] = useListIssueContext();
    const [, dispatchBoard] = useBoardContext();
    const [show, setShow] = useState(false);
    const currentLablel = useMemo(() => {
        return labels.find(item => item.id === issue.id_Label)
    }, [labels, issue])
    // handle show
    const handleShow = (e) => {
        if (roleUser === 3) return;
        if (e.target.matches('.btn-label')) {
            setShow(prev => !prev);
        }
    }
    // handle select label
    const handleSelectLabel = async (labelSelected) => {
        try {
            const resp = await axios.put(`${BASE_URL}/api/Issue/AddLabel`, {
                idIssue: issue.id,
                idLabel: labelSelected.id
            })
            if (resp.status === 200) {
                if (window.location.href.includes('/projects/board')) {
                    fetchIssue(project.id, dispatchIssue);
                    fetchBoard({
                        idSprint: currentSprint.id,
                        idEpic: null,
                        type: 0
                    }, dispatchBoard);
                } else if (window.location.href.includes('/projects/backlog')) {
                    fetchIssue(project.id, dispatchIssue);
                }
                createToast('success', 'Change label successfully!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div onClick={handleShow} className="w-fit relative">
            <p
                style={
                    roleUser === 3 ? { cursor: 'not-allowed' } : {}
                }
                className="btn-label w-fit p-2 rounded hover:bg-gray-main cursor-pointer border border-[#666] px-4 py-1"
            >{currentLablel ? currentLablel.name : 'None'}</p>
            {
                show &&
                <SelectLabel setShow={setShow} handleSelectLabel={handleSelectLabel} currentLablel={currentLablel} labels={labels} />
            }
        </div>
    )
}
export default Label;

function SelectLabel({ handleSelectLabel, currentLablel, labels, setShow }) {
    const nodeRef = useRef();
    const renderRef = useRef(0);
    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (!nodeRef.current?.contains(e.target) && renderRef.current > 0) {
                setShow(false);
            }
            renderRef.current++;
        }
        document.addEventListener('click', handleClickOutSide);
        return () => document.removeEventListener('click', handleClickOutSide);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div ref={nodeRef} className="bg-white shadow-md border border-gray-main absolute top-full left-0 rounded overflow-hidden min-w-[100px]">
            <p
                onClick={() => handleSelectLabel({ id: NIL })}
                className={`p-2 cursor-pointer hover:bg-gray-main w-full
            ${!currentLablel ? 'bg-orange-400 text-white pointer-events-none' : ''}`}
            >None</p>
            {
                labels.length > 0 &&
                labels.map(item => (
                    <p
                        key={item.id}
                        onClick={() => handleSelectLabel(item)}
                        className={`p-2 cursor-pointer hover:bg-gray-main w-full ${currentLablel?.id === item.id ? 'bg-orange-400 text-white pointer-events-none' : ''}`}>{item.name}</p>
                )
                )
            }
        </div>
    )
}