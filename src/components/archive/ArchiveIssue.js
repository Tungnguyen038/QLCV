import React from "react";
import { useMembersContext } from "../../contexts/membersContext";
import useModal from "../../hooks/useModal";
import EditArchiveIssuePopup from "../popup/EditArchiveIssuePopup";
import { issueTypes } from "../../util/constants";
import ShowAllMemberIssue from "../project-detail/ShowAllMemberIssue";

const ArchiveIssue = ({ ArchiveIssue, project }) => {
  const [showEditEpic, setShowEditEpic, handleCloseEpic] = useModal();
  const {
    state: { members },
  } = useMembersContext();
  console.log("ArchiveIssue", ArchiveIssue);
  return (
    <>
      {showEditEpic && (
        <EditArchiveIssuePopup
          members={members}
          project={project}
          issue={ArchiveIssue}
          setShow={setShowEditEpic}
        ></EditArchiveIssuePopup>
      )}

      <div
        className={`flex ${
          ArchiveIssue.isFlagged
            ? "bg-red-50 hover:bg-red-100"
            : "hover:bg-slate-200"
        } items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-200 w-full`}
      >
        <div
          className="flex items-center w-[300px]"
          onClick={() => {
            setShowEditEpic(true);
          }}
        >
          <div>
            <img
              className="object-cover w-6  rounded pointer-events-none"
              src={
                issueTypes.find(
                  (item) => item.value === ArchiveIssue.id_IssueType
                )?.thumbnail
              }
              alt=""
            />
          </div>
          <div className="flex flex-col justify-start ml-3">
            <h2 className="font-semibold">{ArchiveIssue.summary}</h2>
            <div className="flex items-center font-normal">
              <span className="text-[10px] mr-1">
                ({ArchiveIssue.dateStarted.slice(0, 10)}) -
              </span>
              <p className="text-[10px]">
                {" "}
                ({ArchiveIssue.dateEnd.slice(0, 10)})
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-1 w-[400px] justify-between">
          <div className="flex items-center">
            {ArchiveIssue.isFlagged ? (
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
            <div className="flex items-center justify-center w-6 h-6 ml-7 rounded-full bg-yellow-50">
              {ArchiveIssue.story_Point_Estimate}
            </div>
          </div>
          <div className="flex justify-between ">
            <ShowAllMemberIssue members={ArchiveIssue.users} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchiveIssue;
