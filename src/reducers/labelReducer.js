import axios from "axios";
import { BASE_URL } from "../util/constants";
import { CREATE_LABEL, DELETE_LABEL, GET_LABELS, UPDATE_LABEL } from "./actions";

// fetch labels
const fetchLabel = async (idProject, dispatch) => {
    try {
        const resp = await axios.get(`${BASE_URL}/api/Labels/project/${idProject}`);
        if (resp.status === 200) {
            dispatch({
                type: GET_LABELS,
                payload: resp.data
            })
        }
    } catch (error) {
        console.log(error);
    }
}
// create label
const createLabel = async (dataPost, dispatch) => {
    try {
        const resp = await axios.post(`${BASE_URL}/api/Labels`, dataPost);
        if (resp.status === 200) {
            dispatch({
                type: CREATE_LABEL,
                payload: dataPost
            })
        }
    } catch (error) {
        console.log(error);
    }
}
const updateLabel = async (idLabel, dataPut, dispatch) => {
    try {
        const resp = await axios.put(`${BASE_URL}/api/Labels/${idLabel}`, dataPut);
        if (resp.status === 200) {
            dispatch({
                type: UPDATE_LABEL,
                action: resp.data
            })
        }
    } catch (error) {
        console.log(error);
    }
}
// delete label
const deleteLabel = async (idLabel, dispatch) => {
    try {
        const resp = await axios.delete(`${BASE_URL}/api/Labels/${idLabel}`);
        if (resp.status === 200) {
            dispatch({
                type: DELETE_LABEL,
                payload: idLabel
            })
        }
    } catch (error) {
        console.log(error);
    }
}

// init value
const initialValue = {
    labels: []
}

// reducer
const labelReducer = (state, action) => {
    const stateCopy = { ...state };
    switch (action.type) {
        case GET_LABELS:
            stateCopy.labels = [...action.payload];
            state = { ...stateCopy };
            break;
        case CREATE_LABEL:
            stateCopy.labels.push(action.payload);
            state = { ...stateCopy };
            break;
        case DELETE_LABEL:
            stateCopy.labels = stateCopy.labels.filter(item => item.id !== action.payload);
            state = { ...stateCopy };
            break;
        case UPDATE_LABEL:

            break;
        default:
            break;
    }
    return state;
}
export {
    initialValue,
    labelReducer,
    fetchLabel,
    createLabel,
    deleteLabel,
    updateLabel
}