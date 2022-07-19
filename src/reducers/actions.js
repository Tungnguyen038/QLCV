const GET_ISSUES = "get_issues";
const UPDATE_ISSUES = "update_issues";
const CREATE_ISSUE = "create_issue";
const DELETE_ISSUE = "delete_issue";

const CHANGE_FILTERS_NAME = "change_filters_name";

const CHANGE_FILTERS_EPIC = "change_filter_epic";

const CHANGE_FILTERS_TYPE = "change_filters_type";

const CHANGE_FILTERS_LABEL = "change_filter_label";

const CLEAR_FILTERS = 'clear_filter_label';

// members actions
const GET_MEMBERS = "get_members";
const ADD_MEMBERS = "add_members";
const DELETE_MEMBERS = "delete_members";
// sprint actions
const GET_SPRINT = "get_sprint";
const CREATE_SPRINT = "creat_sprint";
const DELETE_SPRINT = "delete_sprint";
const UPDATE_SPRINT = "update_sprint";
const START_SPRINT = "start_sprint";
const COMPLETE_SPRINT = "complete_sprint";
// stage actions
const GET_STAGE = "get_stage";
const UPDATE_STAGE = "update_stage";
const CREATE_STAGE = 'create_stage';
const DELETE_STAGE = 'delete_stage';
// board actions
const GET_BOARD = "get_board";
const CHANGE_FILTER_NAME_BOARD = "change_filter_name";
const CHANGE_FILTER_EPIC_BOARD = "change_filter_epic_board";
const CHANGE_FILTER_TYPE_BOARD = "change_filter_type_board";
const CHANGE_FILTER_LABEL_BOARD = 'change_filter_label_board';
const CLEAR_FILTER_BOARD = 'clear_filter_board';
// label actions
const GET_LABELS = 'get_labels';
const CREATE_LABEL = 'create_label';
const UPDATE_LABEL = 'update_label';
const DELETE_LABEL = 'delete_label';

export {
  GET_ISSUES,
  UPDATE_ISSUES,
  CREATE_ISSUE,
  DELETE_ISSUE,
  CHANGE_FILTERS_NAME,
  CHANGE_FILTERS_EPIC,
  CHANGE_FILTERS_TYPE,
  CHANGE_FILTERS_LABEL,
  CLEAR_FILTERS,
  GET_MEMBERS,
  ADD_MEMBERS,
  DELETE_MEMBERS,
  GET_SPRINT,
  CREATE_SPRINT,
  DELETE_SPRINT,
  UPDATE_SPRINT,
  START_SPRINT,
  GET_STAGE,
  COMPLETE_SPRINT,
  GET_BOARD,
  UPDATE_STAGE,
  CREATE_STAGE,
  DELETE_STAGE,
  CHANGE_FILTER_NAME_BOARD,
  CHANGE_FILTER_EPIC_BOARD,
  CHANGE_FILTER_TYPE_BOARD,
  CHANGE_FILTER_LABEL_BOARD,
  CLEAR_FILTER_BOARD,
  GET_LABELS,
  CREATE_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
};
