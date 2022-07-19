import axios from "axios";
import { BASE_URL, KEY_ROLE_USER } from "../util/constants";
import createToast from "../util/createToast";
import {
  CHANGE_FILTERS_EPIC,
  CHANGE_FILTERS_LABEL,
  CHANGE_FILTERS_NAME,
  CHANGE_FILTERS_TYPE,
  CLEAR_FILTERS,
  CREATE_ISSUE,
  DELETE_ISSUE,
  GET_ISSUES,
  UPDATE_ISSUES,
} from "./actions";

// fetch issue
const fetchIssue = async (projectId, dispatch) => {
  const resp = await axios.get(
    `${BASE_URL}/api/Issue/GetIssuesByIdProject?idProject=${projectId}`
  );
  if (resp && resp.status === 200) {
    dispatch({
      type: GET_ISSUES,
      payload: resp.data,
    });
  } else {
    throw new Error("Error when fetch issues");
  }
};
// update issue
const updateIssues = async (issueUpdate, dispatch) => {
  try {
    issueUpdate.attachment_Path = null;
    const resp = await axios.put(`${BASE_URL}/api/Issue/Update`, issueUpdate);
    if (resp && resp.status === 200) {
      dispatch({
        type: UPDATE_ISSUES,
        payload: issueUpdate,
      });
    }
  } catch (error) {
    createToast("error", "Update issue failed");
    throw new Error("Error when update issues");
  }
};
// create issue
const createIssue = async (issuePost, dispatch) => {
  const resp = await axios.post(`${BASE_URL}/api/Issue/Create`, issuePost);
  if (resp.status === 200) {
    dispatch({
      type: CREATE_ISSUE,
      payload: issuePost,
    });
  }
};
// delete issue
const deleteIssue = async (idIssue, dispatch) => {
  const resp = await axios.delete(`${BASE_URL}/api/Issue/${idIssue}`);
  if (resp.status === 200) {
    dispatch({
      type: DELETE_ISSUE,
      payload: idIssue,
    });
  }
};

const initialIssues = {
  issues: [],
  issueEpics: [],
  issueNormals: [],
  filters: {
    name: "",
    type: [],
    epics: [],
    label: []
  },
};

const listIssueReducer = (state, action) => {
  let stateCopy = { ...state };
  switch (action.type) {
    case GET_ISSUES:
      // lấy ra các epic
      let issueEpicsData = action.payload.filter(
        (item) => item.id_IssueType === 1
      );
      // lấy ra các issue normal
      let issueNormalData = action.payload.filter(
        (item) => item.id_IssueType !== 1
      );
      const nameFilter = stateCopy.filters.name;
      const epicFilter = stateCopy.filters.epics;
      const typeFilter = stateCopy.filters.type;
      const labelFilter = stateCopy.filters.label;
      // filter name
      if (nameFilter) {
        const result = issueNormalData.filter((item) =>
          item.summary.toLowerCase().includes(nameFilter.toLowerCase())
        );
        stateCopy = {
          ...stateCopy,
          issues: [...action.payload],
          issueEpics: [...issueEpicsData],
          issueNormals: [...result],
        };
      } else {
        stateCopy = {
          ...stateCopy,
          issues: [...action.payload],
          issueEpics: [...issueEpicsData],
          issueNormals: [...issueNormalData],
        };
      }
      // filter epic
      if (epicFilter.length > 0) {
        let result = [];
        if (epicFilter.includes("issues without epic")) {
          result = stateCopy.issueNormals.filter((item) => {
            return (
              !item.id_Parent_Issue ||
              item.id_Parent_Issue === "00000000-0000-0000-0000-000000000000" ||
              !stateCopy.issueEpics.find(e => e.id === item.id_Parent_Issue)
            );
          });
        }
        result = [
          ...result,
          ...stateCopy.issueNormals.filter((item) => {
            return epicFilter.includes(item.id_Parent_Issue);
          }),
        ];
        stateCopy = {
          ...stateCopy,
          issueNormals: [...result],
        };
      } else {
        stateCopy = {
          ...stateCopy,
        };
      }
      // filter type
      if (typeFilter.length > 0) {
        const result = stateCopy.issueNormals.filter((item) =>
          typeFilter.includes(item.id_IssueType)
        );
        stateCopy = {
          ...stateCopy,
          issueNormals: [...result],
        };
      } else {
        stateCopy = {
          ...stateCopy,
        };
      }
      // filter label
      if (labelFilter.length > 0) {
        const result = stateCopy.issueNormals.filter(item => labelFilter.includes(item.id_Label));
        stateCopy = {
          ...stateCopy,
          issueNormals: [...result]
        }
      } else {
        stateCopy = { ...stateCopy };
      }
      state = { ...stateCopy };
      break;
    case UPDATE_ISSUES:
      let index = stateCopy.issues.findIndex(
        (item) => item.id === action.payload.id
      );
      stateCopy.issues.splice(index, 1, action.payload);
      if (action.payload.id_IssueType === 1) {
        index = stateCopy.issueEpics.findIndex(
          (item) => item.id === action.payload.id
        );
        stateCopy.issueEpics.splice(index, 1, action.payload);
      } else {
        index = stateCopy.issueNormals.findIndex(
          (item) => item.id === action.payload.id
        );
        stateCopy.issueNormals.splice(index, 1, action.payload);
      }
      state = { ...stateCopy };
      break;
    case CREATE_ISSUE:
      stateCopy.issues = [...stateCopy.issueEpics, action.payload];
      if (action.payload.id_IssueType === 1) {
        stateCopy.issueEpics = [...stateCopy.issueEpics, action.payload];
      } else {
        stateCopy.issueNormals = [...stateCopy.issueNormals, action.payload];
      }
      state = { ...stateCopy };
      break;
    case DELETE_ISSUE:
      stateCopy.issues = stateCopy.issues.filter(
        (item) => item.id !== action.payload
      );
      console.log("list issue ~ ", stateCopy.issues);
      state = { ...stateCopy };
      break;
    case CHANGE_FILTERS_NAME:
      state = {
        ...state,
        filters: {
          ...state.filters,
          name: action.payload,
        },
      };
      break;
    case CHANGE_FILTERS_TYPE:
      const filterType = stateCopy.filters.type;
      if (filterType.length > 0) {
        if (filterType.includes(action.payload)) {
          const result = filterType.filter((item) => item !== action.payload);
          stateCopy = {
            ...stateCopy,
            filters: {
              ...stateCopy.filters,
              type: [...result],
            },
          };
        } else {
          stateCopy = {
            ...stateCopy,
            filters: {
              ...stateCopy.filters,
              type: [...stateCopy.filters.type, action.payload],
            },
          };
        }
      } else {
        stateCopy = {
          ...stateCopy,
          filters: {
            ...stateCopy.filters,
            type: [action.payload],
          },
        };
      }
      state = { ...stateCopy };
      break;
    case CHANGE_FILTERS_EPIC:
      let filtersEpic = stateCopy.filters.epics;
      if (filtersEpic.length > 0) {
        if (filtersEpic.includes(action.payload)) {
          filtersEpic = filtersEpic.filter((item) => item !== action.payload);
        } else {
          filtersEpic = [...filtersEpic, action.payload];
        }
        stateCopy = {
          ...stateCopy,
          filters: {
            ...stateCopy.filters,
            epics: [...filtersEpic],
          },
        };
      } else {
        stateCopy = {
          ...stateCopy,
          filters: {
            ...stateCopy.filters,
            epics: [...stateCopy.filters.epics, action.payload],
          },
        };
      }
      state = { ...stateCopy };
      break;
    case CHANGE_FILTERS_LABEL:
      const filterLabel = stateCopy.filters.label;
      const isExist = filterLabel.includes(action.payload);
      if (isExist) {
        stateCopy.filters.label = filterLabel.filter(item => item !== action.payload);
      } else {
        stateCopy.filters.label.push(action.payload);
      }
      state = { ...stateCopy };
      break;
    case CLEAR_FILTERS:
      stateCopy.filters = {
        ...stateCopy.filters,
        epics: [],
        type: [],
        label: []
      }
      state = { ...stateCopy }
      break;
    default:
      break;
  }
  return state;
};
export {
  initialIssues,
  listIssueReducer,
  fetchIssue,
  updateIssues,
  createIssue,
  deleteIssue,
};
