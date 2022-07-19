import { createSlice } from '@reduxjs/toolkit'

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        filters: {
            name: ''
        },
        pending: false,
        error: false
    },
    reducers: {
        getProjectsStart(state) {
            state.pending = true;
            state.error = false;
        },
        getProjectsError(state) {
            state.pending = false;
            state.error = true;
        },
        getProjectsSuccess(state, action) {
            const filterName = state.filters.name;
            state.pending = false;
            state.error = false;
            if(filterName) {
                const result = action.payload.filter(item => item.name.toLowerCase().includes(filterName.toLowerCase()));
                state.projects = [...result];
            }else {
                state.projects = action.payload;
            }
        },
        updateProjectsStart(state) {
            state.pending = true;
            state.error = false;
        },
        updateProjectsError(state) {
            state.pending = false;
            state.error = true;
        },
        updateProjectsSuccess(state, action) {
            const index = state.projects.findIndex(item => item.id === action.payload.id);
            state.pending = false;
            state.error = false;
            state.projects.splice(index, 1, action.payload);
            console.log('ket thuc action');
        },
        deleteProjectsStart(state) {
            state.pending = true;
            state.error = false;
        },
        deleteProjectsError(state) {
            state.pending = false;
            state.error = true;
        },
        deleteProjectsSuccess(state, action) {
            const index = state.projects.findIndex(item => item.id === action.payload);
            state.pending = false;
            state.error = false;
            state.projects.splice(index, 1);
            console.log('ket thuc action');
        },
        changeFilters(state, action) {
            state.filters = {
                ...state.filters,
                name: action.payload.name
            }
        }
    }
})
export const { getProjectsStart, getProjectsError, getProjectsSuccess,
updateProjectsStart, updateProjectsError, updateProjectsSuccess,
deleteProjectsStart, deleteProjectsError, deleteProjectsSuccess, changeFilters } = projectsSlice.actions;
export default projectsSlice.reducer;