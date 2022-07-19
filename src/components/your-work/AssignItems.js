import React from "react";
import { KEY_CURRENT_PROJECT } from "../../util/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ShowAllMemberIssue from "../project-detail/ShowAllMemberIssue";
import { issueTypes } from "../../util/constants";

const AssignItems = ({ assignItem }) => {
  const navigate = useNavigate();

  const projects = useSelector((state) => state.projects.projects);
  const keyProject = projects.find(
    (project) => project.id === assignItem.id_Project
  );

  const handleClickName = (key) => {
    localStorage.setItem(KEY_CURRENT_PROJECT, key);
    navigate(`/projects/board/${key}`);
  };

  return (
    <div
      className={`flex items-center ${
        assignItem.isFlagged
          ? "bg-red-50 hover:bg-red-100"
          : "hover:bg-slate-200"
      } w-full px-3 py-1 rounded-lg cursor-pointer  justify-between pr-10`}
    >
      <div
        onClick={() => handleClickName(keyProject.key)}
        className="flex items-center"
      >
        <div>
          <img
            className="object-cover w-6  rounded pointer-events-none"
            src={
              issueTypes.find((item) => item.value === assignItem.id_IssueType)
                ?.thumbnail
            }
            alt=""
          />
        </div>
        <div className="flex flex-col ml-3">
          <h3 className="text-base font-semibold">{assignItem.summary}</h3>
          <span className="text-sm">{assignItem.projectName}</span>
        </div>
      </div>
      <div className="flex items-center w-[300px] justify-around">
        {assignItem.isFlagged ? (
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
              ></path>
            </svg>
          </span>
        ) : (
          <div className="w-5 h-5"></div>
        )}
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-50  ml-10">
          {assignItem.story_Point_Estimate}
        </div>
        <div className="w-[300px]">
          <ShowAllMemberIssue members={assignItem.users}></ShowAllMemberIssue>
        </div>
      </div>
    </div>
  );
};

export default AssignItems;
