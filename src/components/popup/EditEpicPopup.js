import React, { useEffect, useState, memo, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faTimes,
  faFlag,
  faBolt,
  faLock,
  faEye,
  faThumbsUp,
  faTimeline,
  faPaperclip,
  faLink,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import OptionComponent from "../option/OptionComponent";
import ButtonBacklogComponent from "../backlog/ButtonBacklogComponent";
import MemberComponent from "../board/MemberComponent";
import ModalBase from "../modal/ModalBase";
import { fetchIssue, updateIssues } from "../../reducers/listIssueReducer";
import { useListIssueContext } from "../../contexts/listIssueContext";
import createToast from "../../util/createToast";
import WrapperTask from "../roadmap-wrapertask/WrapperTask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./editEpicPopup.scss";
import Comments from "../comments/Comments";
import { useMembersContext } from "../../contexts/membersContext";
import Progress from "../progress/Progress";

function EditEpicPopup({ project, issue, setShow, donePercent }) {
  const [{ issueEpics }, dispatch] = useListIssueContext();
  const [showEpic, setShowEpic] = useState(false);
  const [valuesStore, setValuesStore] = useState({});
  const [selectedDateStart, setSelectedDateStart] = useState(
    new Date(issue.dateStarted)
  );
  const [selectedDateEnd, setSelectedDateEnd] = useState(
    new Date(issue.dateEnd)
  );
  const {
    state: { members },
  } = useMembersContext();
  const [values, setValues] = useState({
    summary: issue?.summary,
    description: issue?.description || "",
  });
  const [{ issueNormals }] = useListIssueContext();
  const issueCollect = useMemo(() => {
    return issueNormals.filter((item) => item.id_Parent_Issue === issue.id);
  }, [issue, issueNormals]);
  // create issue update
  const issueUpdate = useMemo(() => {
    const issueCopy = { ...issue, ...values };
    return issueCopy;
  }, [values.description, values.summary]);
  // handle close edit
  const handleCloseEditByButton = async () => {
    if (
      issueUpdate.summary === valuesStore.summary &&
      issueUpdate.description === valuesStore.description
    ) {
      setShow(false);
      return;
    }
    await updateIssues(issueUpdate, dispatch);
    await fetchIssue(project.id, dispatch);
    createToast("success", "Update issue successfully!");
    setShow(false);
  };
  // handle close edit by click outside
  const handleCloseEditByClickOutside = async (e) => {
    if (!e.target.closest(".content")) {
      issueUpdate.dateStarted = selectedDateStart;
      issueUpdate.dateEnd = selectedDateEnd;
      // if (
      //   issueUpdate.summary === valuesStore.summary &&
      //   issueUpdate.description === valuesStore.description &&
      //   issueUpdate.dateStarted === valuesStore.dateStarted &&
      //   issueUpdate.dateEnd === valuesStore.dateEnd
      // ) {
      setShow(false);
      //   return;
      // }

      await updateIssues(issueUpdate, dispatch);
      await fetchIssue(project.id, dispatch);
      createToast("success", "Update issue successfully!");
      setShow(false);
    }
  };
  // current epic
  const currentEpic = issueEpics.find(
    (item) => item.id === issue.id_Parent_Issue
  );
  // handle values change
  const handleValuesChange = (e) => {
    if (e.target.name === "summary") {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "description") {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };
  // useEffect
  useEffect(() => {
    setValuesStore({
      summary: values.summary,
      description: values.description,
      // dateStarted: values.dateStarted,
      // dateEnd: values.dateEnd,
    });
  }, [issue]);
  // handle toggle epic
  const handleToggleEpic = (e) => {
    if (e.target.matches(".epic-dropdown")) {
      setShowEpic((prev) => !prev);
    } else {
      return;
    }
  };
  // handle choose epic
  const handleChooseEpic = (epic) => {
    const issueUpdate = { ...issue };
    issueUpdate.id_Parent_Issue = epic.id;
    updateIssues(issueUpdate, dispatch);
    createToast("success", `Update epic successfully!`);
    setTimeout(() => {
      fetchIssue(project.id, dispatch);
    }, 500);
  };
  // handle remove epic
  const handleRemoveEpic = () => {
    const issueUpdate = { ...issue };
    issueUpdate.id_Parent_Issue = null;
    updateIssues(issueUpdate, dispatch);
    createToast("success", "Remove epic successfully!");
    setTimeout(() => {
      fetchIssue(project.id, dispatch);
    }, 500);
  };

  console.log("issueUpdate.dateStarted", issueUpdate);
  console.log("selectedDateStart", selectedDateStart);
  return (
    <ModalBase
      containerclassName="fixed inset-0 z-10 flex items-center justify-center"
      bodyClassname="relative content-modal"
      onClose={handleCloseEditByClickOutside}
    >
      <div
        className="have-y-scroll h-[80vh] overflow-auto bg-white  mb-10 overflow-x-hidden
        flex flex-col flex-[2]  mx-4 relative p-5 rounded-md"
      >
        <div className="sticky flex justify-between">
          {issue.id_IssueType !== 1 && (
            <div className="flex items-center">
              <div
                onClick={handleToggleEpic}
                className="epic-dropdown relative flex items-center gap-x-2 p-2 rounded
                            cursor-pointer bg-[#8777D9] bg-opacity-20 hover:bg-opacity-50"
              >
                <FontAwesomeIcon
                  size="1x"
                  className="pointer-events-none mx-1 p-[0.2rem] text-white text-[10px] inline-block bg-[#904ee2]"
                  icon={faBolt}
                />
                <span className="pointer-events-none">
                  {currentEpic ? currentEpic.summary : "Add epic"}
                </span>
                <span className="inline-block w-5 h-5 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
                {showEpic && (
                  <div className="have-y-scroll absolute w-fit max-h-[150px] overflow-auto p-2 rounded bg-white shadow-md shadow-[#8777D9] left-0 top-[calc(100%+10px)]">
                    {issueEpics.length > 0 &&
                      issueEpics
                        .filter(
                          (epicItem) => epicItem.id !== issue.id_Parent_Issue
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleChooseEpic(item)}
                            className="w-[150px] mb-2 p-3 bg-white rounded shadow-md font-semibold
                                            hover:bg-[#8777D9] hover:text-white"
                          >
                            {item.summary}
                          </div>
                        ))}
                    {issue.id_Parent_Issue &&
                      issue.id_Parent_Issue !==
                        "00000000-0000-0000-0000-000000000000" && (
                        <div
                          onClick={handleRemoveEpic}
                          className="flex items-center gap-x-2 w-[150px] mb-2 p-3 bg-red-500 text-white rounded shadow-md font-semibold"
                        >
                          <span className="inline-block w-5 h-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </span>
                          <span>Remove epic</span>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center ml-auto">
            <FontAwesomeIcon
              size="2x"
              className="mx-1 text-[1.5rem]"
              icon={faLock}
            />
            <FontAwesomeIcon
              size="2x"
              className="mx-1 text-[1.5rem]"
              icon={faEye}
            />
            <FontAwesomeIcon
              size="2x"
              className="mx-1 text-[1.5rem]"
              icon={faThumbsUp}
            />
            <FontAwesomeIcon
              size="2x"
              className="mx-1  text-[1.5rem]"
              icon={faTimeline}
            />
            <OptionComponent />
            <FontAwesomeIcon
              onClick={handleCloseEditByButton}
              size="2x"
              className="mx-4 text-[1.5rem] cursor-pointer"
              icon={faTimes}
            />
          </div>
        </div>
        <div className="mt-2 mb-5 text-2xl font-bold">
          <input
            value={values.summary}
            onChange={handleValuesChange}
            name="summary"
            className="w-full p-2 border-2 border-transparent rounded-md outline-none focus:border-primary"
            type="text"
          />
        </div>
        <div className="flex items-center">
          <ButtonBacklogComponent
            icon={
              <FontAwesomeIcon
                size="2x"
                className="m-1 text-[1.5rem]"
                icon={faPaperclip}
              />
            }
            text={"Attach"}
          />
          <ButtonBacklogComponent
            icon={
              <FontAwesomeIcon
                size="2x"
                className="m-1 text-[1.5rem]"
                icon={faTimeline}
              />
            }
            text={"Add a child issue"}
          />
          <ButtonBacklogComponent
            icon={
              <FontAwesomeIcon
                size="2x"
                className="m-1 text-[1.5rem]"
                icon={faLink}
              />
            }
            text={"Link issue"}
          />
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-col my-4 w-fit">
            <div className="uppercase flex items-center p-2 bg-[#ccc] w-fit rounded-[5px] mx-4 whitespace-nowrap">
              to do
              <FontAwesomeIcon
                size="1x"
                className="inline-block px-2"
                icon={faAngleDown}
              />
            </div>
          </div>
          {issue?.isFlagged === 1 && (
            <div className="flex items-center w-fit">
              <FontAwesomeIcon color="#EF0000" className="mx-2" icon={faFlag} />
              Flagged
            </div>
          )}
        </div>
        <div className="m-1 font-bold">Description</div>
        <div>
          <input
            value={values.description}
            onChange={handleValuesChange}
            placeholder="Enter description..."
            className="w-full p-2 border-2 border-transparent rounded-md outline-none focus:border-primary"
            name="description"
            type="text"
          />
        </div>
        <div className="flex flex-col child-isue ">
          <div className="items-center justify-between w-full my-2 h-11">
            <h2 className="w-full text-3xl text-blue-900">child issue</h2>
            <Progress done={Math.floor(donePercent)} />
            <div className=" font-bold max-h-[300px] overflow-y-auto have-y-scroll w-full">
              <div className="main w-[98%] h-fit min-h-[5rem]">
                <WrapperTask
                  members={members}
                  project={project}
                  issues={issueCollect}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="detail mt-[300px]">
          <div className="item w-full h-13 p-1 bg-white px-4 mt-[-1px] border-solid border-[1px] border-[#ccc] border-b-0 flex justify-between items-center">
            <div className="flex items-center justify-between w-full h-8 my-2">
              <div className="m-1 font-bold">Link issue</div>
              <div className="flex items-center h-full w-fit">
                <FontAwesomeIcon
                  size="2x"
                  className="mx-4 text-[1.5rem]"
                  icon={faAngleDown}
                />
              </div>
            </div>
          </div>
          <div className="item w-full h-13 p-1 bg-white px-4 mt-[-1px] border-solid border-[1px] border-[#ccc] flex justify-between items-center flex-wrap">
            <div className="w-[40%] h-13 my-4">Assignee</div>
            <div className="w-[60%]">
              <MemberComponent
                members={members}
                project={project}
                issue={issue}
              />
            </div>
            <div className="w-[40%] h-13 my-4">Labels</div>
            <div className="w-[60%]">None</div>
            <div className="w-[40%] h-13 my-4">Sprint</div>
            <div className="w-[60%]">MPM Sprint 1</div>
            <div className="w-[40%] h-13 my-4">Story point estimate</div>
            <div className="w-[60%]">none</div>
            <div className="w-full">
              <form className="w-full ">
                <div className="flex w-full">
                  <div className="w-[40%] h-13 my-4">Start date</div>
                  <div className="w-[60%]">
                    <DatePicker
                      placeholderText="Start Date"
                      className="p-2 border-2 border-blue-400 rounded-lg w-[20%] mb-5 inline-block"
                      selected={selectedDateStart}
                      onChange={(date) => setSelectedDateStart(date)}
                      dateFormat="yyyy/MM/dd"
                      showYearDropdown
                      scrollableMonthYearDropdown
                    />
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="w-[40%] h-13 my-4">Due date</div>
                  <div className="w-[60%]">
                    <DatePicker
                      placeholderText="End Date"
                      className="p-2 border-2 border-blue-400 rounded-lg w-[20%] mb-5 inline-block "
                      selected={selectedDateEnd}
                      dateFormat="yyyy/MM/dd"
                      onChange={(date) => setSelectedDateEnd(date)}
                      showYearDropdown
                      scrollableMonthYearDropdown
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="w-[40%] h-13 my-4">Reporter</div>
            <div className="w-[60%]">
              <MemberComponent
                members={members}
                project={project}
                issue={issue}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center my-5">
          <Comments
            commentURL="https://localhost:5001/hubs/marvic"
            IdIssueComment={issue.id}
          />
        </div>
      </div>
    </ModalBase>
  );
}

export default memo(EditEpicPopup);
