import React, { useRef, useState, useMemo, memo } from "react";
import { fetchIssue, updateIssues } from "../../reducers/listIssueReducer";
import { issueTypes } from "../../util/constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import MemberComponent from "../board/MemberComponent";
import OptionComponent from "../option/OptionComponent";
import useModal from "../../hooks/useModal";
import EditIssuePopup from "../popup/EditIssuePopup";
import { useListIssueContext } from "../../contexts/listIssueContext";
import { useStageContext } from "../../contexts/stageContext";
import createToast from "../../util/createToast";
import Stages from "./Stages";

function TaskItemComponent({ members, issue, project, issueEpics }) {
  const [{ stages }] = useStageContext();
  const [showEdit, setShow, handleClose] = useModal();
  const [, dispatch] = useListIssueContext();
  const [showFlag, setShowFlag] = useState(false);
  const [showInputPoint, setShowInputPoint] = useState(false);
  const [valuePointStore, setValuePointStore] = useState("");
  const [showEditEpic, setShowEditEpic, handleCloseEpic] = useModal();
  const [valuePoint, setValuePoint] = useState(
    issue?.story_Point_Estimate || 0
  );

  const ref = useRef(null);
  const stage = useMemo(() => {
    const result = stages.find((item) => item.id === issue.id_Stage);
    if (!result) return null;
    return result;
  }, [stages]);

  // handle click item
  const handleClickItem = (e) => {
    if (e.target.matches(".item")) {
      setShow(true);
    }
  };
  // handle blur input poit
  const handleBlurInputPoint = async () => {
    if (valuePointStore === valuePoint) {
      setValuePointStore("");
      setShowInputPoint(false);
      return;
    }
    const issueUpdate = { ...issue };
    issueUpdate.story_Point_Estimate = Number(valuePoint);
    issueUpdate.attachment_Path = null;
    await updateIssues(issueUpdate, dispatch);
    await fetchIssue(project.id, dispatch);
    setShowInputPoint(false);
    createToast("success", "Update point estimate successfully!");
  };
  // handle click parent
  const currentEpic = issueEpics.find(
    (item) => item.id === issue.id_Parent_Issue
  );
  const handleClickParent = (e) => {
    if (e.target.matches(".parent")) {
      setShowEditEpic(true);
    }
  };

  return (
    <>
      {showEdit && (
        <EditIssuePopup
          members={members}
          project={project}
          setShow={setShow}
          issue={issue}
        ></EditIssuePopup>
      )}
      {showEditEpic && (
        <EditIssuePopup
          project={project}
          setShow={setShowEditEpic}
          handleClose={handleCloseEpic}
          issue={currentEpic}
        ></EditIssuePopup>
      )}
      <div
        onClick={handleClickItem}
        ref={ref}
        className={`item hover:bg-[#eee] cursor-pointer w-full  p-1
            px-4 mt-[-1px] border-solid border-[1px] border-[#ccc]
            flex justify-between items-center ${
              issue.isFlagged ? "bg-[#ffe8e6] hover:bg-[#ffb9b3]" : "bg-white"
            }`}
      >
        <div className="flex items-center h-full left-item">
          <div className="w-5 h-5">
            <img
              className="object-cover w-full h-full rounded"
              src={
                issueTypes.find((item) => item.value === issue.id_IssueType)
                  ?.thumbnail
              }
              alt=""
            />
          </div>
          <div className="inline-block mx-1">
            <span>{issue?.summary}</span>
          </div>
          {issue?.id_Parent_Issue &&
            issue?.id_Parent_Issue !==
              "00000000-0000-0000-0000-000000000000" && (
              <div
                onClick={handleClickParent}
                className="parent ml-5 bg-[#8777D9] bg-opacity-60 hover:bg-[#8777D9] flex items-center justify-center p-1 rounded-[2px]"
              >
                <span className="text-[10px] pointer-events-none text-white font-semibold">
                  {currentEpic?.summary}
                </span>
              </div>
            )}
        </div>
        <div className="flex items-center h-full right-item w-fit">
          {issue.isFlagged === 1 && (
            <span className="inline-block w-5 h-5 text-[#ff2d1a]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
          {!showInputPoint &&
            (issue?.story_Point_Estimate ? (
              <div
                onClick={() => setShowInputPoint(true)}
                className="rounded-full cursor-pointer flex items-center justify-center w-[20px] h-[20px] p-1 text-xs bg-[#dfe1e6] mx-[0.2rem]"
              >
                <span>{issue?.story_Point_Estimate}</span>
              </div>
            ) : (
              <div
                onClick={() => setShowInputPoint(true)}
                className="rounded-full cursor-pointer flex items-center justify-center w-[20px] h-[20px] p-1 text-xs bg-[#dfe1e6] mx-[0.2rem]"
              >
                <span>-</span>
              </div>
            ))}
          {showInputPoint && (
            <input
              onChange={(e) => {
                const pointPrev = e.target.value;
                if (pointPrev < 0) {
                  setValuePoint(0);
                } else {
                  setValuePoint(pointPrev);
                }
              }}
              value={valuePoint}
              autoFocus={true}
              onFocus={() => setValuePointStore(valuePoint)}
              onBlur={handleBlurInputPoint}
              className="w-[50px] h-[30px] p-2 border-2 border-primary"
              type="number"
            />
          )}
          {showFlag && (
            <FontAwesomeIcon color="#EF0000" className="mx-2" icon={faFlag} />
          )}
          <Stages project={project} issue={issue} stage={stage} />
          <MemberComponent
            project={project}
            issue={issue}
            members={members}
          ></MemberComponent>
          <OptionComponent project={project} issue={issue} />
        </div>
      </div>
    </>
  );
}
export default memo(TaskItemComponent);
