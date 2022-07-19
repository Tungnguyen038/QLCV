import React from "react";
import { useNavigate } from "react-router-dom";
import { KEY_CURRENT_PROJECT } from "../../util/constants";

const YourWorkRecent = ({ project }) => {
  const navigate = useNavigate();
  const handleClickName = (key) => {
    localStorage.setItem(KEY_CURRENT_PROJECT, key);
    navigate(`/projects/board/${key}`);
  };
  return (
    <div
      data-tut='tut-recentproject'
      onClick={() => handleClickName(project.key)}
      className="w-[240px] mr-6 h-[170px] border-l-[20px] rounded-lg youwork-recent border-2  border-blue-400 mt-4 cursor-pointer"
    >
      <div className="flex flex-col p-4">
        <div className="flex items-center ml-[-22px]">
          <img
            src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="mr-3 rounded-md w-7 h-7"
          />
          <div className="leading-3 ">
            <h2 className="text-[#172b4d] text-base font-semibold">
              {project.name}
            </h2>
            <span className="text-xs font-light">Team-managed software</span>
          </div>
        </div>
        <div className="mt-4 ">
          <span className="ml-[12px] text-[12px] cursor-text  text-slate-500 font-semibold">
            QUICK LINKS
          </span>
          <div className="flex justify-between ml-[9px] hover:bg-slate-100 rounded-lg px-1 py-1 mt-2 items-center">
            <span className="text-xs font-normal">My open issues</span>
            <p className="w-[15px] h-[15px] text-center flex items-center rounded-sm bg-slate-200 text-slate-600">
              <span className="ml-1">{project.access}</span>
            </p>
          </div>
          <span className="ml-[9px] block rounded-lg text-xs font-normal px-1 py-1 mt-2 hover:bg-slate-100">
            Done issue
          </span>
        </div>
      </div>
      <div className="w-full h-[2px] bg-blue-400 mt-[-6px]"></div>
    </div>
  );
};

export default YourWorkRecent;
