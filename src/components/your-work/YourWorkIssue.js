import React, { useState } from "react";
import "swiper/scss";
import { useSelector } from "react-redux";
import { issueTypes, KEY_CURRENT_PROJECT } from "../../util/constants";
import { useNavigate } from "react-router-dom";
import ShowAllMemberIssue from "../project-detail/ShowAllMemberIssue";

const YourWorkIssue = ({ dataIssue }) => {
  const navigate = useNavigate();

  const projects = useSelector((state) => state.projects.projects);
  const keyProject = projects.find(
    (project) => project.id === dataIssue.id_Project
  );

  const handleClickName = (key) => {
    localStorage.setItem(KEY_CURRENT_PROJECT, key);
    navigate(`/projects/board/${key}`);
  };

  return (
    <div className="flex items-center w-full p-1 rounded-lg cursor-pointer hover:bg-slate-200">
      <div>
        <img
          className="object-cover w-6  rounded pointer-events-none"
          src={
            issueTypes.find((item) => item.value === dataIssue.id_IssueType)
              ?.thumbnail
          }
          alt=""
        />
      </div>
      <div className="flex items-center justify-between w-full ml-4">
        <div onClick={() => handleClickName(keyProject.key)} className="">
          <h4 className="text-xl font-semibold">{dataIssue.summary}</h4>
          <span className="text-base font-normal text-slate-600">
            {dataIssue.projectName}
          </span>
        </div>
        <div className="w-[450px] flex items-center justify-between pr-20">
          <span className="flex items-center text-base font-normal text-slate-500">
            {dataIssue.status}
          </span>
          <div className="flex justify-between ">
            <ShowAllMemberIssue members={dataIssue.users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourWorkIssue;
