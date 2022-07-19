import React, { useEffect, useRef, useState } from "react";
import "./TopDetail.scss";
import { useSelector, useDispatch } from "react-redux";
import useModal from "../../hooks/useModal";
import { getProjects, updateProjects } from "../../redux/apiRequest";
import { fetchIssue } from "../../reducers/listIssueReducer";
import {
  CHANGE_FILTERS_EPIC,
  CHANGE_FILTERS_NAME,
  CHANGE_FILTERS_TYPE,
  CLEAR_FILTERS,
} from "../../reducers/actions";
import AddMemberPopup from "../popup/AddMemberPopup";
import { useListIssueContext } from "../../contexts/listIssueContext";
import { deleteMembers, fetchMembers } from "../../reducers/membersReducer";
import { useMembersContext } from "../../contexts/membersContext";
import { BASE_URL, documentHeight, issueTypes, KEY_ROLE_USER } from "../../util/constants";
import FilterEpicSelectBox from "../selectbox/FilterEpicSelectBox";
import FilterTypeSelectBox from "../selectbox/FilterTypeSelectBox";
import FilterLabelSelectBox from "../selectbox/FilterLabelSelectBox";
import BreadcrumbsComp from "./Breadcrumbs";
import { Button, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AllMember from "./AllMember";
import Tippy from '@tippyjs/react'
import axios from "axios";
import { useLocation } from "react-router-dom";

const secondThirdScreen = (documentHeight * 2) / 3;

function TopDetail({ project }) {
  const roleUser = JSON.parse(localStorage.getItem(KEY_ROLE_USER));
  const location = useLocation();
  const [
    {
      issueEpics,
      filters: { epics, type, label },
    },
    dispatchIssue,
  ] = useListIssueContext();
  const {
    state: { members },
    dispatch: dispatchMembers,
  } = useMembersContext();
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const [show, setShow, handleClose] = useModal();
  const timer = useRef();

  const [search, setSearch] = useState("");
  const [coordEpic, setCoordEpic] = useState({});
  const [coordType, setCoordType] = useState({});
  const [coordLabel, setCoordLabel] = useState({});
  const [showEpic, setShowEpic, handleCloseEpic] = useModal();
  const [showType, setShowType, handleCloseType] = useModal();
  const [showLabel, setShowLabel, handleCloseLabel] = useModal();
  const [showMembers, setShowMembers] = useState(false);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef();
  const filterEpicRef = useRef();
  const filterTypeRef = useRef();
  const filterLabelRef = useRef();
  const [showAllMembers, setShowAllMembers] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };

  // handle click star
  const handleClickStar = () => {
    const putData = async () => {
      const resp = await axios.patch(`${BASE_URL}/api/Project/UpdateStarredProject`,
        {
          "idProject": project.id
        }
      );
      if (resp.status === 200) {
        getProjects(dispatch, currentUser.id);
      }
    };
    putData();
  };
  // handle change show members
  const handleChangeShowMembers = (e) => {
    if (e.target.matches(".js-changeshow")) {
      setShowMembers((prev) => !prev);
      setShowAllMembers(false);
    }
  };
  // useEffect get issues
  useEffect(() => {
    if (project && Object.entries(project).length > 0) {
      fetchIssue(project.id, dispatchIssue);
    }
  }, [project.id]);
  useEffect(() => {
    const inputEl = inputRef.current;
    inputEl.addEventListener("focus", handleFocus);
    inputEl.addEventListener("blur", handleBlur);

    return () => {
      inputEl.removeEventListener("focus", handleFocus);
      inputEl.removeEventListener("blur", handleBlur);
    };
  }, []);
  useEffect(() => {
    if (project?.id) {
      fetchMembers(project.id, dispatchMembers);
    }
  }, [project?.id]);
  // dispatch search
  useEffect(() => {
    if (project?.id) {
      timer.current = setTimeout(() => {
        dispatchIssue({
          type: CHANGE_FILTERS_NAME,
          payload: search,
        });
        fetchIssue(project.id, dispatchIssue);
      }, 1000);
    }
    return () => clearTimeout(timer.current);
  }, [search]);

  const handleClickAdd = () => {
    if (roleUser === 3) return;
    setShow(true);
  };
  // handle delete member
  const handleDeleteMember = async (idUser) => {
    if (roleUser === 3) return;
    const data = {
      idProject: project.id,
      idUser,
    };
    await deleteMembers(data, dispatchMembers);
    fetchMembers(project.id, dispatchMembers);
  };
  // handle show epic
  const handleShowFilterEpic = () => {
    const bounding = filterEpicRef.current.getBoundingClientRect();
    if (bounding) {
      setCoordEpic(bounding);
      setShowEpic(true);
    }
  };
  // handle show type
  const handleShowFilterType = () => {
    const bounding = filterTypeRef.current.getBoundingClientRect();
    if (bounding) {
      setCoordType(bounding);
      setShowType(true);
    }
  };
  // handle show filter label
  const handleShowFilterLabel = () => {
    const bounding = filterLabelRef.current.getBoundingClientRect();
    if (bounding) {
      setCoordLabel(bounding);
      setShowLabel(true);
    }
  };
  // handle choose epic
  const handleChooseEpic = (idEpic) => {
    dispatchIssue({
      type: CHANGE_FILTERS_EPIC,
      payload: idEpic,
    });
    setTimeout(() => {
      fetchIssue(project.id, dispatchIssue);
    }, 500);
  };
  // handle choose type
  const handleChooseType = (idType) => {
    dispatchIssue({
      type: CHANGE_FILTERS_TYPE,
      payload: idType,
    });
    setTimeout(() => {
      fetchIssue(project.id, dispatchIssue);
    }, 500);
  };
  // handle clear filter
  const handleClearFilter = async () => {
    await dispatchIssue({ type: CLEAR_FILTERS });
    fetchIssue(project.id, dispatchIssue);
  };

  const handleChangeShowAllMembers = (e) => {
    if (e.target.matches(".js-changeshowallmember")) {
      setShowAllMembers((prev) => !prev);
    }
  };

  return (
    <div className="top">
      {showEpic && (
        <FilterEpicSelectBox
          handleChooseEpic={handleChooseEpic}
          onClose={handleCloseEpic}
          bodyStyle={{
            top:
              coordEpic.bottom <= secondThirdScreen
                ? coordEpic.bottom + 10
                : null,
            left: coordEpic.left - 100,
            bottom: !(coordEpic.bottom <= secondThirdScreen)
              ? documentHeight - coordEpic.top - 10
              : null,
          }}
          epics={epics}
          issueEpics={issueEpics}
          project={project}
        />
      )}
      {showType && (
        <FilterTypeSelectBox
          issueTypes={issueTypes}
          type={type}
          handleChooseType={handleChooseType}
          onClose={handleCloseType}
          bodyStyle={{
            top:
              coordType.bottom <= secondThirdScreen
                ? coordType.bottom + 10
                : null,
            left: coordType.left,
            bottom: !(coordType.bottom <= secondThirdScreen)
              ? documentHeight - coordType.top - 10
              : null,
          }}
        />
      )}
      {showLabel && (
        <FilterLabelSelectBox
          project={project}
          onClose={handleCloseLabel}
          bodyStyle={{
            top:
              coordLabel.bottom <= secondThirdScreen
                ? coordLabel.bottom + 10
                : null,
            left: coordLabel.left,
            bottom: !(coordLabel.bottom <= secondThirdScreen)
              ? documentHeight - coordLabel.top - 10
              : null,
          }}
        />
      )}
      {show && (
        <AddMemberPopup
          project={project}
          setShow={setShow}
          onClose={handleClose}
        ></AddMemberPopup>
      )}
      <div className="navigate">
        <BreadcrumbsComp />
      </div>
      <div className="wrap-key">
        <h3 className="key">
          {project?.key + ' '}
          {location.pathname.slice(location.pathname.indexOf('/', 1) + 1, location.pathname.lastIndexOf('/'))}
        </h3>
        {project?.isStared ? (
          <Tippy content='UnStarred'>
            <span className="w-8 h-8 cursor-pointer text-yellow-300">
              <svg
                onClick={handleClickStar}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                strokeWidth={1}
                stroke="#000"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          </Tippy>
        ) : (
          <Tippy content='Star'>
            <span className="w-8 h-8 cursor-pointer">
              <svg
                onClick={handleClickStar}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ccc"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </span>
          </Tippy>
        )}
      </div>
      <div className="actions">
        <div className="actions">
          <div className={`wrap-input ${focus ? "expand" : ""}`}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={focus ? "Search this board" : ""}
              ref={inputRef}
              type="text"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              viewBox="0 0 20 20"
              fill="#ccc"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="members">
            <AllMember project={project} members={members} handleDeleteMember={handleDeleteMember} />
            <Tippy content='Add members'>
              <IconButton
                onClick={handleClickAdd}
                id='add-member-btn'
                style={roleUser === 3 ? { width: 40, height: 40, cursor: 'not-allowed' } : { width: 40, height: 40 }}
              >
                <PersonAddAltIcon />
              </IconButton>
            </Tippy>
          </div>
        </div>
        <div className="filters">
          {
            showEpic ?
              <Button
                ref={filterEpicRef}
                onClick={handleShowFilterEpic}
                style={{ backgroundColor: '#8777D9', fontWeight: 550, color: 'white' }}
                size="medium"
                variant="contained"
                endIcon={
                  <>
                    {
                      epics.length > 0 ?
                        <div style={{ fontSize: 10 }} className="w-5 h-5 rounded-full bg-white text-epic-color flex
                        items-center justify-center">{epics.length}</div> :
                        null
                    }
                    <KeyboardArrowDownIcon fontSize="small" />
                  </>
                }
              >Epic</Button> :
              <Button
                ref={filterEpicRef}
                onClick={handleShowFilterEpic}
                style={{ backgroundColor: 'rgba(25, 118, 210, 0.04)', color: '#8777D9', fontWeight: 550 }}
                size="medium"
                variant="contained"
                endIcon={
                  <>
                    {
                      epics.length > 0 ?
                        <div style={{ fontSize: 10 }} className="w-5 h-5 rounded-full bg-epic-color text-white flex
                        items-center justify-center">{epics.length}</div> :
                        null
                    }
                    <KeyboardArrowDownIcon fontSize="small" />
                  </>
                }
              >Epic</Button>
          }
          {
            showType ?
              <Button
                ref={filterTypeRef}
                onClick={handleShowFilterType}
                style={{ backgroundColor: '#4BADE8', fontWeight: 550, color: 'white' }}
                size="medium"
                variant="contained"
                endIcon={
                  <>
                    {
                      type.length > 0 ?
                        <div style={{ fontSize: 10 }} className="w-5 h-5 rounded-full bg-white text-task-color flex: ;
                        items-center justify-center">{type.length}</div> :
                        null
                    }
                    <KeyboardArrowDownIcon fontSize="small" />
                  </>
                }
              >Type</Button> :
              <Button
                ref={filterTypeRef}
                onClick={handleShowFilterType}
                style={{ backgroundColor: 'rgba(25, 118, 210, 0.04)', color: '#4BADE8', fontWeight: 550 }}
                size="medium"
                variant="contained"
                endIcon={
                  <>
                    {
                      type.length > 0 ?
                        <div style={{ fontSize: 10 }} className="w-5 h-5 rounded-full bg-task-color text-white flex: ;
                        items-center justify-center">{type.length}</div> :
                        null
                    }
                    <KeyboardArrowDownIcon fontSize="small" />
                  </>
                }
              >Type</Button>
          }
          {
            showLabel ?
              <Button
                ref={filterLabelRef}
                onClick={handleShowFilterLabel}
                style={{ backgroundColor: '#0052cc', fontWeight: 550, color: 'white' }}
                size="medium"
                variant="contained"
                endIcon={
                  <>
                    {
                      label.length > 0 ?
                        <div style={{ fontSize: 10 }} className="w-5 h-5 rounded-full bg-white text-primary flex: ;
                        items-center justify-center">{label.length}</div> :
                        null
                    }
                    <KeyboardArrowDownIcon fontSize="small" />
                  </>
                }
              >Label</Button> :
              <Button
                ref={filterLabelRef}
                onClick={handleShowFilterLabel}
                style={{ backgroundColor: 'rgba(25, 118, 210, 0.04)', color: '#0052cc', fontWeight: 550 }}
                size="medium"
                variant="contained"
                endIcon={
                  <>
                    {
                      label.length > 0 ?
                        <div style={{ fontSize: 10 }} className="w-5 h-5 rounded-full bg-primary text-white flex: ;
                        items-center justify-center">{label.length}</div> :
                        null
                    }
                    <KeyboardArrowDownIcon fontSize="small" />
                  </>
                }
              >Label</Button>
          }
          {(epics.length > 0 || type.length > 0 || label.length > 0) && (
            <Button
              style={{ color: '#000' }}
              onClick={handleClearFilter}
              size='small'
              variant='text'
              endIcon={<ClearIcon style={{ fontSize: 10 }} />}
            >Clear filter</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopDetail;
