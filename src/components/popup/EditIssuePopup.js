/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState, memo, useMemo, useRef } from "react";
import "./EditIssuePopup.scss";
import axios from "axios";
import { NIL } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import ModalBase from "../modal/ModalBase";
import { fetchIssue, updateIssues } from "../../reducers/listIssueReducer";
import { useListIssueContext } from "../../contexts/listIssueContext";
import createToast from "../../util/createToast";
import OptionsEditIssue from "../option/OptionsEditIssue";
import IssueCanAddSelectbox from "../selectbox/IssueCanAddSelectbox";
import { BASE_URL, issueTypes, KEY_ROLE_USER } from "../../util/constants";
import AttachmentForm from "../form/AttachmentForm";
import { useStageContext } from "../../contexts/stageContext";
import { useSprintContext } from "../../contexts/sprintContext";
import Comments from "../comments/Comments";
import { fetchBoard } from "../../reducers/boardReducer";
import { useBoardContext } from "../../contexts/boardContext";
import { ModalProvider, useModalContext } from "../../contexts/modalContext";
import LinkIssueSelectbox from "../selectbox/LinkIssueSelectbox";
import { useLabelContext } from "../../contexts/labelContext";
import { useSelector } from "react-redux";
import taskImage from '../../images/type-issues/task.jpg'
import storyImage from '../../images/type-issues/story.jpg'
import bugImage from '../../images/type-issues/bug.jpg'
import Stage from "./components/Stage";
import Assignee from "./components/Assignee";
import Reporter from "./components/Reporter";
import Label from "./components/Label";


function EditIssuePopup({ members, project, issue, setShow }) {
  const roleUser = JSON.parse(localStorage.getItem(KEY_ROLE_USER));
  const [{ issueEpics }, dispatch] = useListIssueContext();
  const [, dispatchBoard] = useBoardContext();
  const {
    state: { sprints },
  } = useSprintContext();
  const [{ stages }] = useStageContext();
  const [showEpic, setShowEpic] = useState(false);
  const [valuesStore, setValuesStore] = useState({});
  const [showCKEditorCMT, setShowCKEditorCMT] = useState(false);
  const [showAddchild, setShowAddchild] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [showLinkIssue, setShowLinkIssue] = useState(false);
  const [childIssues, setChildIssues] = useState([]);

  const [selectedDateStart, setSelectedDateStart] = useState(() => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  });
  const [selectedDateEnd, setSelectedDateEnd] = useState(() => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  });

  const [values, setValues] = useState({
    summary: issue?.summary,
    description: issue?.description || "",
    dateStarted: selectedDateStart,
    dateEnd: selectedDateEnd,
  });
  // icon issue
  const iconIssue = useMemo(() => {
    switch (issue.id_IssueType) {
      case 2:
        return storyImage;
      case 3:
        return taskImage;
      case 4:
        return bugImage;
      default:
        break;
    }
  }, [issue])
  // create issue update
  const issueUpdate = useMemo(() => {
    const issueCopy = { ...issue, ...values };
    return issueCopy;
  }, [values]);
  // stage
  const stage = stages.find((item) => item.id === issue?.id_Stage);
  // current sprint
  const currentSprint = useMemo(() => {
    return sprints.find(item => item.id = issue.id_Sprint);
    // return sprints.find((item) => item.is_Started);
  }, [sprints]);
  // handle close edit
  const handleCloseEditByButton = async () => {
    if (
      issueUpdate.summary === valuesStore.summary &&
      issueUpdate.description === valuesStore.description &&
      issueUpdate.dateStarted === valuesStore.dateStarted &&
      issueUpdate.dateEnd === valuesStore.dateEnd
    ) {
      setShow(false);
      return;
    }
    await updateIssues(issueUpdate, dispatch);
    if (window.location.href.includes('projects/board') >= 0) {
      if (currentSprint) {
        fetchBoard({
          idSprint: currentSprint.id,
          idEpic: null,
          type: 0
        }, dispatchBoard);
      }
    } else {
      fetchIssue(project.id, dispatch);
    }
    createToast("success", "Update issue successfully!");
    setShow(false);
  };
  // handle close edit by click outside
  const handleCloseEditByClickOutside = async (e) => {
    if (!e.target.closest(".content")) {
      if (
        issueUpdate.summary === valuesStore.summary &&
        issueUpdate.description === valuesStore.description &&
        issueUpdate.dateStarted === valuesStore.dateStarted &&
        issueUpdate.dateEnd === valuesStore.dateEnd
      ) {
        setShow(false);
        return;
      }
      console.log('issue update', issueUpdate);
      await updateIssues(issueUpdate, dispatch);
      if (window.location.href.includes('projects/board')) {
        if (currentSprint) {
          fetchBoard({
            idSprint: currentSprint.id,
            idEpic: null,
            type: 0
          }, dispatchBoard);
        }
      } else {
        fetchIssue(project.id, dispatch);
      }
      createToast("success", "Update issue successfully!");
      setShow(false);
    }
  };
  // current epic
  const currentEpic = issueEpics.find(
    (item) => item.id === issue?.id_Parent_Issue
  );
  // handle values change
  const handleValuesChange = (e) => {
    if (roleUser === 3) {
      createToast('warn', 'You are not permission!');
      return;
    } else {
      console.log('chay vao day');
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
      } else if (e.target.name === "dateStarted") {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        });
      } else if (e.target.name === "dateEnd") {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        });
      }
    }
  };
  // useEffect
  useEffect(() => {
    setValuesStore({
      summary: values.summary,
      description: values.description,
      dateStarted: values.dateStarted,
      dateEnd: values.dateEnd,
    });
  }, [issue]);
  // get child issue
  useEffect(() => {
    if (issue && project) {
      axios
        .get(
          `https://localhost:5001/api/Issue/GetIssueByIdParent?IdProject=${project.id}&IdParent=${issue?.id}`
        )
        .then((resp) => {
          if (resp.status === 200) {
            return resp.data;
          }
        })
        .then((data) => {
          setChildIssues(data);
        })
        .catch((err) => console.log(err));
    }
  }, [project, issue]);
  // handle toggle epic
  const handleToggleEpic = (e) => {
    if (e.target.matches(".epic-dropdown")) {
      setShowEpic((prev) => !prev);
    } else {
      return;
    }
  };
  // handle choose epic
  const handleChooseEpic = async (epic) => {
    const issueUpdate = { ...issue };
    issueUpdate.id_Parent_Issue = epic.id;
    await updateIssues(issueUpdate, dispatch);
    createToast("success", `Update epic successfully!`);
    if (window.location.href.includes('projects/board') >= 0) {
      fetchBoard({
        idSprint: currentSprint.id,
        idEpic: null,
        type: 0
      }, dispatchBoard);
    } else {
      fetchIssue(project.id, dispatch);
    }
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

  const showCKEditorCMTClick = () => {
    setShowCKEditorCMT(true);
  };
  const hiddenCKEditorCMTClick = () => {
    setShowCKEditorCMT(false);
  };
  return (
    <ModalBase
      containerclassName="fixed inset-0 z-10 flex items-center justify-center"
      bodyClassname="relative content-modal"
      onClose={handleCloseEditByClickOutside}
    >
      <label htmlFor={`close-option-${issue?.id}`}>
        <div
          className="hide-scroll h-[80vh] overflow-auto bg-white overflow-x-hidden
        flex flex-col flex-[2] relative p-5 rounded-md mx-6"
        >
          <IssueCanAddSelectbox
            project={project}
            issue={issue}
            showAddchild={showAddchild}
            setShowAddchild={setShowAddchild}
            childIssues={childIssues}
          />
          <AttachmentForm
            issue={issue}
            setShowAttachment={setShowAttachment}
            showAttachment={showAttachment}
          />
          <LinkIssueSelectbox
            project={project}
            issue={issue}
            showLinkIssue={showLinkIssue}
            setShowLinkIssue={setShowLinkIssue}
          />
          <div className="flex items-start justify-between">
            {issue?.id_IssueType !== 1 && (
              <div className="flex items-center">
                <div
                  onClick={handleToggleEpic}
                  className="epic-dropdown relative z-10 flex items-center gap-x-2 p-2 rounded
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
                    <EpicSelectBox setShowEpic={setShowEpic} issueEpics={issueEpics} issue={issue} handleChooseEpic={handleChooseEpic} handleRemoveEpic={handleRemoveEpic} />
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center ml-auto gap-x-2">
              <OptionsEditIssue
                issue={issue}
                setShowAttachment={setShowAttachment}
                setShowAddchild={setShowAddchild}
                setShowLinkIssue={setShowLinkIssue}
              />
              <div
                onClick={handleCloseEditByButton}
                className="flex items-center justify-center w-6 h-6 text-gray-500 transition-all rounded-full cursor-pointer hover:bg-primary hover:bg-opacity-30"
              >
                <span className="inline-flex items-center justify-center w-4 h-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="my-4 text-2xl font-bold flex items-center gap-x-2">
            <div className="w-5 h-5 rounded">
              {
                iconIssue ?
                  <img
                    className="w-full h-full"
                    src={iconIssue}
                    alt=""
                  /> :
                  <FontAwesomeIcon
                    size="1x"
                    className="pointer-events-none mx-1 p-[0.2rem] text-white text-[10px] inline-block bg-[#904ee2]"
                    icon={faBolt}
                  />
              }
            </div>
            <input
              spellCheck={false}
              value={values.summary}
              onChange={handleValuesChange}
              name="summary"
              className="w-full p-2 border-2 border-transparent rounded-md outline-none focus:border-primary"
              type="text"
            />
          </div>
          <div className="flex items-center mb-4 gap-x-2">
            <Stage
              currentSprint={currentSprint}
              project={project}
              issue={issue}
              stage={stage}
            />
            {issue?.isFlagged === 1 && (
              <div className="flex items-center w-fit">
                <span className="text-[#EF0000] w-5 h-5">
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
                Flagged
              </div>
            )}
          </div>
          <div className="m-1 font-bold">Description</div>
          <div>
            <TextBox
              spellCheck={false}
              value={values.description}
              onChange={handleValuesChange}
              placeholder="Enter description..."
              name="description"
            />
          </div>
          <Attachment issue={issue} />
          <ModalProvider project={project}>
            <ChildIssue project={project} issues={childIssues} />
          </ModalProvider>
          <ModalProvider project={project}>
            <LinkIssue project={project} issue={issue} />
          </ModalProvider>
          <div className='detail'>
            <div className='item w-full h-13 p-1 bg-white px-4 mt-[-1px] border-solid border border-[#ccc] border-b-0 flex justify-between items-center'>
              <div className='flex justify-between w-full h-8 items-center my-2'>
                <p className='font-bold m-1'>
                  Detail
                </p>
              </div>
            </div>
            <div className="item w-full h-13 p-1 bg-white px-4 mt-[-1px] border-solid border-[1px] border-[#ccc] flex justify-between items-center flex-wrap">
              <div className="w-[40%] h-13 my-4">Assignee</div>
              <div className="w-[60%] ">
                <Assignee members={members} project={project} issue={issue} />
              </div>
              <div className="w-[40%] h-13 my-4">Labels</div>
              <div className="w-[60%]">
                <Label project={project} issue={issue} currentSprint={currentSprint} />
              </div>
              <div className="w-[40%] h-13 my-4">Sprint</div>
              <div className="w-[60%]">
                <div className="w-fit px-4 py-1 border border-[#666] rounded">{currentSprint?.sprintName}</div>
              </div>
              <div className="w-[40%] h-13 my-4">Story point estimate</div>
              <div className="w-[60%]">
                <div className="w-fit px-4 py-1 border border-[#666] rounded">{issue?.story_Point_Estimate}</div>
              </div>
              <div className="w-[40%] h-13 my-4">Date started</div>
              <div className="w-[60%]">
                <input
                  className="p-2 rounded border border-[#666] cursor-pointer transition-all hover:bg-gray-main"
                  name="dateStarted"
                  onChange={handleValuesChange}
                  value={values.dateStarted}
                  type="date"
                />
              </div>
              <div className="w-[40%] h-13 my-4">Date end</div>
              <div className="w-[60%]">
                <input
                  className="p-2 rounded border border-[#666] cursor-pointer transition-all hover:bg-gray-main"
                  name="dateEnd"
                  onChange={handleValuesChange}
                  value={values.dateEnd}
                  type="date"
                />
              </div>

              <div className="w-[40%] h-13 my-4">Reporter</div>
              <div className="w-[60%]">
                <Reporter members={members} project={project} issue={issue} />
              </div>
            </div>
          </div>
          <div className="flex items-center my-5">
            <Comments
              commentURL="https://localhost:5001/hubs/marvic"
              IdIssueComment={issue?.id}
            />
          </div>
        </div>
      </label>
    </ModalBase>
  );
}

export default memo(EditIssuePopup);

// child issue
function ChildIssue({ issues, project }) {
  const [, dispatchIssue] = useListIssueContext();
  const {
    modal: [, setShow,],
    item: [, setIssue]
  } = useModalContext();

  // handle remove child
  const handleRemoveChild = async (child) => {
    child.id_Parent_Issue = NIL;
    await updateIssues(child, dispatchIssue);
    fetchIssue(project.id, dispatchIssue);
    createToast('success', 'Remove child successfully')
  }
  // handle show edit
  const handleShowEdit = (issueEdit) => {
    setIssue(issueEdit);
    setShow(true);
  }

  return (
    <div className="child-issue">
      <p className="title">Child issue</p>
      <div className="list-issue have-y-scroll">
        {issues.length === 0 && <p>No child issue</p>}
        {issues.length > 0 &&
          issues.map((issue) => (
            <div onClick={() => handleShowEdit(issue)} key={issue?.id} className="issue-item">
              <div className="img">
                <img
                  src={
                    issueTypes.find((item) => item.value === issue?.id_IssueType)
                      .thumbnail
                  }
                  alt=""
                />
              </div>
              <span className="summary">{issue?.summary}</span>
              <span
                onClick={() => handleRemoveChild(issue)}
                title="Remove"
                className="delete-child"
              >
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
            </div>
          ))}
      </div>
    </div>
  );
}
// link issue
function LinkIssue({ project, issue }) {
  const {
    modal: [, setShow,],
    item: [, setIssue]
  } = useModalContext();
  const [{ issueNormals }, dispatchIssue] = useListIssueContext();
  const issueLinked = useMemo(() => {
    return issueNormals.filter(item => item.id_Linked_Issue === issue?.id);
  }, [issueNormals, issue])
  // handle remove link
  const handleRemoveChild = async (issueRemove) => {
    issueRemove.id_Linked_Issue = NIL;
    await updateIssues(issueRemove, dispatchIssue);
    fetchIssue(project.id, dispatchIssue);
    createToast('success', 'Remove link issue successfully!');
  }
  const handleShowEdit = (issueEdit) => {
    setIssue(issueEdit);
    setShow(true);
  }

  return (
    <div className="show-link">
      <p className="title">Linked issue</p>
      <div className="list-issue have-y-scroll">
        {issueLinked.length === 0 && <p>No link issue</p>}
        {issueLinked.length > 0 &&
          issueLinked.map((item) => (
            <div onClick={() => handleShowEdit(item)} key={item.id} className="issue-item">
              <div className="img">
                <img
                  src={
                    issueTypes.find((t) => t.value === item.id_IssueType).thumbnail
                  }
                  alt=""
                />
              </div>
              <span className="summary">{item.summary}</span>
              <span
                onClick={() => handleRemoveChild(item)}
                title="Remove"
                className="delete-child"
              >
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
            </div>
          ))}
      </div>
    </div>
  )
}
// attachment
function Attachment({ issue }) {
  const downloadRef = useRef();
  // handle download
  const handleDownload = () => {
    const lastBacklashIndex = issue?.attachment_Path.lastIndexOf("/");
    const fileName = issue?.attachment_Path.slice(lastBacklashIndex + 1);
    const path = `${BASE_URL}/api/Issue/download?fileName=${fileName}`;
    if (fileName) {
      downloadRef.current.href = path;
      downloadRef.current.click();
    }
  };

  return (
    <div className="attach">
      <p className="title">Attachment</p>
      {!issue.attachment_Path ? (
        <p>No attachment</p>
      ) : (
        <div className="download">
          <div className="image">
            <img src={issue?.attachment_Path} alt="" />
          </div>
          <a ref={downloadRef} hidden href="/">
            download
          </a>
          <span onClick={handleDownload} className="btn-download">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
}
// text area
function TextBox({ value, onChange, ...props }) {
  const roleUser = JSON.parse(localStorage.getItem(KEY_ROLE_USER));
  const nodeRef = useRef();
  const [height, setHeight] = useState("auto");
  const [text, setText] = useState(value);
  // handle change
  const handleChange = (e) => {
    if (roleUser === 3) {
      createToast('warn', 'You are not permission!');
      return;
    }
    setText(e.target.value);
    setHeight("auto");
    onChange(e);
  };
  useEffect(() => {
    if (text) {
      setHeight(nodeRef.current.scrollHeight || 'auto');
    }
  }, [text])
  return (
    <textarea
      {...props}
      ref={nodeRef}
      style={{ height: height }}
      value={text}
      onChange={handleChange}
      className="w-full p-2 overflow-hidden border-2 border-transparent rounded-md outline-none resize-none focus:border-primary"
    ></textarea>
  );
}

function EpicSelectBox({ setShowEpic, issueEpics, issue, handleChooseEpic, handleRemoveEpic }) {
  const nodeRef = useRef();
  const renderRef = useRef(1);
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (nodeRef.current) {
        if (!nodeRef.current.contains(e.target) && renderRef.current !== 1) {
          setShowEpic(false);
        }
      }
      ++renderRef.current;
    }
    document.addEventListener('click', handleClickOutSide);
    return () => document.removeEventListener('click', handleClickOutSide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div ref={nodeRef} className="have-y-scroll absolute w-fit max-h-[150px] overflow-auto p-2 rounded bg-white shadow-md shadow-[#8777D9] left-0 top-[calc(100%+10px)]">
      {issueEpics.length > 0 &&
        issueEpics
          .filter(
            (epicItem) => epicItem.id !== issue.id_Parent_Issue
          )
          .map((item) => (
            <div
              onClick={() => handleChooseEpic(item)}
              className="w-[150px] mb-2 p-3 bg-white rounded shadow-md font-semibold
                                            hover:bg-[#8777D9] hover:text-white"
              key={item.id}
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
  )
}
