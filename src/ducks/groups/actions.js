import * as types from './types';

function fetchingGroups() {
    return {
        type: types.GET_GROUPS
    };
}

function getGroupsFailed(err) {
    return {
        type: types.GET_GROUPS_FAILED,
        payload: err
    };
}

function setGroups(data) {
    return {
        type: types.SET_GROUPS,
        payload: data
    };
}

function createGroup() {
    return {
        type: types.CREATE_GROUP
    };
}

function createGroupSuccess(data) {
    return {
        type: types.CREATE_GROUP_SUCCESS,
        payload: data
    };
}

function createGroupFailed(err) {
    return {
        type: types.CREATE_GROUP_FAILED,
        payload: err
    };
}


function updateGroup() {
    return {
        type: types.UPDATE_GROUP
    };
}

function updateGroupSuccess(data) {
    return {
        type: types.UPDATE_GROUP_SUCCESS,
        payload: data
    };
}

function updateGroupFailed(err) {
    return {
        type: types.UPDATE_GROUP_FAILED,
        payload: err
    };
}


function deleteGroup() {
    return {
        type: types.DELETE_GROUP
    };
}

function deleteGroupSuccess(id) {
    return {
        type: types.DELETE_GROUP_SUCCESS,
        payload: id
    };
}

function deleteGroupFailed(err) {
    return {
        type: types.DELETE_GROUP_FAILED,
        payload: err
    };
}


export {
    fetchingGroups, getGroupsFailed, setGroups,
    createGroup, createGroupSuccess, createGroupFailed,
    updateGroup, updateGroupSuccess, updateGroupFailed,
    deleteGroup, deleteGroupSuccess, deleteGroupFailed
}