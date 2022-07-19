import { v4 } from "uuid";
import StoryImage from "../images/type-issues/story.jpg";
import TaskImage from "../images/type-issues/task.jpg";
import BugImage from "../images/type-issues/bug.jpg";
// Base url
export const BASE_URL = "https://localhost:5001";
// export const BASE_URL = "http://marvicweb.somee.com";
// inner height
export const documentHeight = window.innerHeight;
// key current project
export const KEY_CURRENT_PROJECT = "key_current_project";
// key timeline roadmap
export const KEY_FILTER_EPIC = "key_filter_epic";
// key role user
export const KEY_ROLE_USER = 'key_role_user';
// type timeline chart
export const timeLines = ['project', 'week', 'month', 'year', 'custom'];
// tour
export const KEY_USER_LOGIN = 'key_user_login';
export const KEY_SHOW_TOUR = 'key_show_tour';
// Levels
export const levels = [
  {
    id: v4(),
    value: 0,
    text: "Choose an access level",
  },
  {
    id: v4(),
    value: 1,
    text: "Public",
  },
  {
    id: v4(),
    value: 2,
    text: "Limited",
  },
  {
    id: v4(),
    value: 3,
    text: "Private",
  },
];
export const issueTypes = [
  {
    id: 2,
    value: 2,
    title: "story",
    thumbnail: StoryImage,
  },
  {
    id: 3,
    value: 3,
    title: "stask",
    thumbnail: TaskImage,
  },
  {
    id: 4,
    value: 4,
    title: "bug",
    thumbnail: BugImage,
  },
];
// role
export const roles = [
  {
    id: 1,
    name: 'Project Manager',
    value: 1,
  },
  {
    id: 2,
    name: 'Project Owner',
    value: 2,
  },
  {
    id: 3,
    name: 'Developer',
    value: 3,
  },
]
export const steps = [
  {

  }
]