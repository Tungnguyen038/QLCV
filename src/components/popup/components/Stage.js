import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useBoardContext } from "../../../contexts/boardContext";
import { useListIssueContext } from "../../../contexts/listIssueContext";
import { useStageContext } from "../../../contexts/stageContext";
import { fetchBoard } from "../../../reducers/boardReducer";
import { fetchIssue } from "../../../reducers/listIssueReducer";
import { BASE_URL } from "../../../util/constants";
import createToast from "../../../util/createToast";

function Stage({ project, issue, stage, currentSprint }) {
    const [{ stages }, dispatchStage] = useStageContext();
    const [, dispatchBoard] = useBoardContext();
    const [show, setShow] = useState(false);
    const [, dispatchIssue] = useListIssueContext();
    const { currentUser } = useSelector(state => state.auth.login);
    // toggle
    const toggle = (e) => {
        if (e.target.matches(".btn-toggle")) {
            setShow(true)
        }
    };
    // handle change stage
    const handleChangeStage = async (stage) => {
        if (stage) {
            // issue.id_Stage = stage.id;
            // await updateIssues(issue, dispatchIssue);
            const dataPut = {
                "idUpdator": currentUser.id,
                "idIssue": issue.id,
                "idStage": stage.id,
                "order": issue.order
            }
            await axios.put(`${BASE_URL}/api/Issue/ChangeIssueStage`, dataPut);
            if (window.location.href.includes('projects/board')) {
                await fetchIssue(project.id, dispatchIssue);
                fetchBoard({
                    idSprint: currentSprint.id,
                    idEpic: null,
                    type: 0
                }, dispatchBoard);
            } else {
                fetchIssue(project.id, dispatchIssue);
            }
            createToast('success', 'Update stage successfully');
        }
    };

    return (
        <div onClick={toggle} className='btn-toggle relative flex gap-x-2 items-center justify-center px-4 py-2
      rounded bg-gray-main cursor-pointer hover:bg-gray-200 transition-all'>
            <span className='inline-block uppercase font-semibold pointer-events-none'>{stage.stage_Name}</span>
            <span className='inline-block w-5 h-5 text-inherit pointer-events-none'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </span>
            {show && <SelectStage setShow={setShow} stages={stages} stage={stage} handleChangeStage={handleChangeStage} />}
        </div>
    );
}
export default Stage;

function SelectStage({ stages, stage, handleChangeStage, setShow }) {
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
        <div ref={nodeRef} className="absolute w-[110%] z-10 top-[105%] left-0 bg-gray-main rounded shadow-md">
            {
                stages.length > 0 &&
                stages.map(item => {
                    return (
                        item.id !== stage.id
                            ? <p key={item.id} onClick={() => handleChangeStage(item)} className='p-2 uppercase cursor-pointer hover:bg-gray-200'>{item.stage_Name}</p>
                            : null
                    )

                })
            }
        </div>
    )
}