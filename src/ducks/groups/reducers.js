import { combineReducers } from 'redux';
import * as types from './types';

const INITIAL_STATE = {
    fetching: false,
    data: [],
    error: null
};

function _getGroups(state, action) {
    return {
        ...state,
        fetching: true
    }
}

function _setGroups(state, action) {
    const { payload: data } = action;

    return {
        ...state,
        fetching: false,
        data
    }
}

function _getGroupsFailed(state, action) {
    const { payload: error } = action;
    return {
        ...state,
        fetching: false,
        error
    }
}

function _createGroup(state, action) {
    return {
        ...state,
        fetching: true
    }
}

function _createGroupSuccess(state, action) {
    const { payload: newGroup } = action;

    return Object.assign({}, state, {
        fetching: false,
        data: {
            ...state.data,
            data: [
                ...state.data.data,
                newGroup
            ]
        }
    });
}

function _createGroupFailed(state, action) {
    const { payload: error } = action;
    return {
        ...state,
        fetching: false,
        error
    }
}

function _deleteGroup(state, action) {
    return {
        ...state,
        fetching: false
    }
}

function _deleteGroupSuccess(state, action) {
    const { payload: group_id } = action;

    return Object.assign({}, state, {
        fetching: false,
        data: {
            ...state.data,
            data: [
                ...state.data.data.filter(item => item.id !== group_id )
            ]
        }
    });
}

function _deleteGroupFailed(state, action) {
    const { payload: error } = action;
    return {
        ...state,
        fetching: false,
        error
    }
}

function getGroups(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_GROUPS:
            return _getGroups(state, action);
        case types.SET_GROUPS:
            return _setGroups(state, action);
        case types.GET_GROUPS_FAILED:
            return _getGroupsFailed(state, action);
        case types.CREATE_GROUP:
            return _createGroup(state, action);
        case types.CREATE_GROUP_SUCCESS:
            return _createGroupSuccess(state, action);
        case types.CREATE_GROUP_FAILED:
            return _createGroupFailed(state, action);
            // break;
        case types.DELETE_GROUP:
            return _deleteGroup(state, action);
        case types.DELETE_GROUP_SUCCESS:
            return _deleteGroupSuccess(state, action);
        case types.DELETE_GROUP_FAILED:
            return _deleteGroupFailed(state, action);
        default:
            return state;
    }
}


const reducer = combineReducers({
    groups: getGroups,
});

export default reducer;