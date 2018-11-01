import { combineReducers } from 'redux';
import * as types from './types';

const INITIAL_STATE = {
    fetching: false,
    data: [],
    error: null
};

function _getTasks(state, action) {
    return {
        ...state,
        fetching: true
    }
}

function _setTasks(state, action) {
    const { payload: data } = action;

    return {
        ...state,
        fetching: false,
        data
    }
}

function _getTasksFailed(state, action) {
    const { payload: error } = action;
    return {
        ...state,
        fetching: false,
        error
    }
}

function _createTask(state, action) {
    return {
        ...state,
        fetching: true
    }
}

function _createTaskSuccess(state, action) {
    const { payload: newTask } = action;

    return Object.assign({}, state, {
        fetching: false,
        data: {
            ...state.data,
            data: [
                ...state.data.data,
                newTask
            ]
        }

    });
}

function _createTaskFailed(state, action) {
    const { payload: error } = action;
    return {
        ...state,
        fetching: false,
        error
    }
}

function _deleteTask(state, action) {
    return {
        ...state,
        fetching: false
    }
}

function _deleteTaskSuccess(state, action) {
    const { payload: task_id } = action;

    return Object.assign({}, state, {
        fetching: false,
        data: {
            ...state.data,
            data: [
                ...state.data.data.filter(item => item.id !== task_id)
            ]
        }
    });
}

function _deleteTaskFailed(state, action) {
    const { payload: error } = action;
    return {
        ...state,
        fetching: false,
        error
    }
}

function getTasks(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_TASKS:
            return _getTasks(state, action);
        case types.SET_TASKS:
            return _setTasks(state, action);
        case types.GET_TASKS_FAILED:
            return _getTasksFailed(state, action);
        case types.CREATE_TASK:
            return _createTask(state, action);
        case types.CREATE_TASK_SUCCESS:
            return _createTaskSuccess(state, action);
        case types.CREATE_TASK_FAILED:
            return _createTaskFailed(state, action);
        case types.DELETE_TASK:
            return _deleteTask(state, action);
        case types.DELETE_TASK_SUCCESS:
            return _deleteTaskSuccess(state, action);
        case types.DELETE_TASK_FAILED:
            return _deleteTaskFailed(state, action);
        default:
            return state;
    }
}


const reducer = combineReducers({
    tasks: getTasks
});

export default reducer;