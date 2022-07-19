import React, { useRef, useState, useMemo, memo } from "react";
import { fetchIssue, updateIssues } from "../../reducers/listIssueReducer";
import { issueTypes, KEY_ROLE_USER } from "../../util/constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import MemberComponent from "../board/MemberComponent";
import OptionComponent from "../option/OptionComponent";
import { useListIssueContext } from "../../contexts/listIssueContext";
import { useModalContext } from "../../contexts/modalContext";
import { useStageContext } from "../../contexts/stageContext";
import createToast from "../../util/createToast";
import Stages from "./Stages";
import { useLabelContext } from "../../contexts/labelContext";


function TaskItemComponent({ members, issue, project, issueEpics, sprint, isRoadmap = false }) {
  const roleUser = JSON.parse(localStorage.getItem(KEY_ROLE_USER));
  const [{ stages }] = useStageContext();
  const {
    modal: [, setShow],
    item: [, setIssue]
  } = useModalContext();
  const [{ labels }] = useLabelContext();
  const [, dispatch] = useListIssueContext();
  const [showFlag, setShowFlag] = useState(false);
  const [showInputPoint, setShowInputPoint] = useState(false);
  const [valuePointStore, setValuePointStore] = useState("");
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
    if (e.target.matches(".item") || e.target.closest(".left-item")) {
      setShow(true);
      setIssue(issue);
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
  // find current epic
  const currentEpic = issueEpics.find(
    (item) => item.id === issue.id_Parent_Issue
  );
  // find current label
  const currentLabel = labels.find(item => item.id === issue.id_Label);

  return (
    <>
      <div
        data-tut='tut-backlog-issue'
        onClick={handleClickItem}
        ref={ref}
        className={`item hover:bg-[#eee] cursor-pointer rounded-md w-full h-[30px] p-1
            px-4 mt-[-1px] border-solid border-[1px] border-[#ccc]
            flex justify-between items-center ${issue.isFlagged ? "bg-[#ffe8e6] hover:bg-[#ffb9b3]" : "bg-white"
          }`}
      >
        <div data-tut='tut-backlog-issue-info' className="flex items-center h-full left-item">
          <div className="w-5 h-5 pointer-events-none">
            <img
              className="object-cover w-full h-full rounded pointer-events-none"
              src={
                issueTypes.find((item) => item.value === issue.id_IssueType)
                  ?.thumbnail
              }
              alt=""
            />
          </div>
          <div className="inline-block mx-1">
            <span className="one-line">{issue?.summary}</span>
          </div>
          {currentEpic && !isRoadmap && (
            <div
              title="epic"
              className="parent ml-5 bg-[#8777D9] flex items-center justify-center p-1 rounded-[2px]"
            >
              <span className="text-[10px] pointer-events-none text-white font-semibold">
                {currentEpic?.summary}
              </span>
            </div>
          )}
          {
            currentLabel && !isRoadmap &&
            <div
              title='label'
              className="ml-5 bg-task-color text-white text-[10px] rounded-[2px] py-1 px-3">{currentLabel.name}</div>
          }
        </div>
        <div data-tut='tut-backlog-issue-action' className="flex items-center h-full right-item w-fit">
          {issue.isFlagged === 1 && (
            <span style={{ color: '#ff2d1a' }} className="inline-block w-5 h-5">
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
          {!showInputPoint && !isRoadmap &&
            (issue?.story_Point_Estimate ? (
              <div
                onClick={() =>
                  roleUser === 3 ? undefined : setShowInputPoint(true)
                }
                className={`rounded-full cursor-pointer flex items-center justify-center w-[20px] h-[20px] p-1
                text-xs bg-[#dfe1e6] mx-[0.2rem] hover:bg-primary hover:text-white transition-all
                ${roleUser === 3 ? 'cursor-not-allowed hover:bg-[#dfe1e6] hover:text-inherit' : ''}
                `}
              >
                <span>{issue?.story_Point_Estimate}</span>
              </div>
            ) : (
              <div
                onClick={() =>
                  roleUser === 3 ? undefined : setShowInputPoint(true)
                }
                className={`rounded-full cursor-pointer flex items-center justify-center w-[20px] h-[20px] p-1
                text-xs bg-[#dfe1e6] mx-[0.2rem] hover:bg-primary hover:text-white transition-all
                ${roleUser === 3 ? 'cursor-not-allowed hover:bg-[#dfe1e6] hover:text-inherit' : ''}
                `}
              >
                <span>-</span>
              </div>
            ))}
          {showInputPoint && !isRoadmap && (
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
          {
            sprint?.is_Started ?
              <Stages project={project} issue={issue} stage={stage} /> :
              null
          }
          {
            !isRoadmap &&
            <MemberComponent
              project={project}
              issue={issue}
              members={members}
            ></MemberComponent>
          }
          <OptionComponent project={project} issue={issue} />
        </div>
      </div>
    </>
  );
}
export default memo(TaskItemComponent);
