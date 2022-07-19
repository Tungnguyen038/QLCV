import axios from "axios";
import { BASE_URL } from "../util/constants";
import { ADD_MEMBERS, DELETE_MEMBERS, GET_MEMBERS } from "./actions";

// fetch members
const fetchMembers = async (idProject, dispatch) => {
    try {
        const resp = await axios.get(`${BASE_URL}/api/Project/GetAllMemberByIdProject?IdProject=${idProject}`);
        if (resp.status === 200) {
            dispatch({
                type: GET_MEMBERS,
                payload: resp.data
            })
        }
    } catch (error) {
        console.log(error);
    }
}
// add members
const addMembers = async (data, dispatch) => {
    try {
        const resp = await axios.post(`${BASE_URL}/api/Project/AddMember`, data);
        if (resp.status === 200) {
            dispatch({
                type: ADD_MEMBERS,
                payload: resp.data
            })
        }
    } catch (error) {
        console.log(error);
    }
}
// delete members
const deleteMembers = async (data, dispatch) => {
    try {
        const resp = await axios.post(`${BASE_URL}/api/Project/RemoveMember`, data);
        if (resp.status === 200) {
            dispatch({
                type: DELETE_MEMBERS,
                payload: resp.data
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const initialValue = {
    members: []
}

const membersReducer = (state, action) => {
    const stateCopy = { ...state };
    switch (action.type) {
        case GET_MEMBERS:
            stateCopy.members = [...action.payload];
            state = { ...stateCopy };
            break;
        case ADD_MEMBERS:
            stateCopy.members = [...stateCopy.members, { id: action.payload }];
            state = { ...stateCopy };
            break;
        case DELETE_MEMBERS:
            stateCopy.members = stateCopy.members.filter(item => item.id !== action.payload);
            state = { ...stateCopy };
            break;
        default:
            throw new Error('Action is not valid!')
    }
    return state;
}

export { initialValue, membersReducer, fetchMembers, addMembers, deleteMembers }