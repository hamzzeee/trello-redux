import * as types from './types';

function fetchingTasks() {
    return {
        type: types.GET_TASKS
    };
}

function getTasksFailed(err) {
    return {
        type: types.GET_TASKS_FAILED,
        payload: err
    };
}

function setTasks(data) {
    return {
        type: types.SET_TASKS,
        payload: data
    };
}

function createTask() {
    return {
        type: types.CREATE_TASK
    };
}

function createTaskSuccess(data) {
    return {
        type: types.CREATE_TASK_SUCCESS,
        payload: data
    };
}

function createTaskFailed(err) {
    return {
        type: types.CREATE_TASK_FAILED,
        payload: err
    };
}


function updateTask() {
    return {
        type: types.UPDATE_TASK
    };
}

function updateTaskSuccess(data) {
    return {
        type: types.UPDATE_TASK_SUCCESS,
        payload: data
    };
}

function updateTaskFailed(err) {
    return {
        type: types.UPDATE_TASK_FAILED,
        payload: err
    };
}


function deleteTask() {
    return {
        type: types.DELETE_TASK
    };
}

function deleteTaskSuccess(id) {
    return {
        type: types.DELETE_TASK_SUCCESS,
        payload: id
    };
}

function deleteTaskFailed(err) {
    return {
        type: types.DELETE_TASK_FAILED,
        payload: err
    };
}


export {
    fetchingTasks, getTasksFailed, setTasks,
    createTask, createTaskSuccess, createTaskFailed,
    updateTask, updateTaskSuccess, updateTaskFailed,
    deleteTask, deleteTaskSuccess, deleteTaskFailed
}