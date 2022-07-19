import axios from "axios";
import { BASE_URL } from "../util/constants";
import {
  getProjectsStart,
  getProjectsError,
  getProjectsSuccess,
  updateProjectsStart,
  updateProjectsSuccess,
  updateProjectsError,
  deleteProjectsStart,
  deleteProjectsSuccess,
  deleteProjectsError,
} from "./projectsSlice";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart);
  try {
    const res = await axios.post(`${BASE_URL}/api/User/login`, user);
    console.log(res);

    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
    alert("Ten dang nhap hoac mat khau khong chinh xac");
    navigate("/login");
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart);
  try {
    await axios.post(`${BASE_URL}/api/User/register`, user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed());
  }
};

export const logOut = async (dispatch, navigate, id) => {
  dispatch(logOutStart);
  try {
    await axios.post(`${BASE_URL}/api/User/logout`);
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(logOutFailed);
  }
};

export const getProjects = async (dispatch, idUser) => {
  dispatch(getProjectsStart);
  try {
    const resp = await axios.get(
      `${BASE_URL}/api/Project/GetProjectByIdUser/Id?IdUser=${idUser}`
    );
    if (resp && resp.data.length >= 0) {
      dispatch(getProjectsSuccess(resp.data));
    }
  } catch (err) {
    dispatch(getProjectsError());
  }
};
export const updateProjects = async (dispatch, data) => {
  dispatch(updateProjectsStart());
  try {
    const resp = await axios.put(`${BASE_URL}/api/Project/Update`, data);
    if (resp.status === 200) {
      dispatch(updateProjectsSuccess(data));
      console.log("update success");
    }
  } catch (err) {
    dispatch(updateProjectsError());
  }
};
export const deleteProjects = async (dispatch, data) => {
  dispatch(deleteProjectsStart());
  try {
    const resp = await axios.delete(`${BASE_URL}/api/Project/${data}`);
    if (resp.status === 200) {
      dispatch(deleteProjectsSuccess(data));
      console.log("delete success");
    }
  } catch (err) {
    dispatch(deleteProjectsError());
  }
};
