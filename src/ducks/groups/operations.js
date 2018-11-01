import axios from 'axios';
import * as actions from './actions';
import swal from 'sweetalert';
import config from './../config';

function getGroups() {
    return async (dispatch) => {
        dispatch(actions.fetchingGroups());
        try {
            let response = await axios.get(`${config.baseUrl}/boards/${config.boardId}/groups`, {
                headers: {
                    "Access-Token": config.token
                }
            });
            dispatch(actions.setGroups(response));
        } catch (error) {
            swal("Error getting Groups", error.message, "error");
            console.error("error occured in getting groups ", error);
            dispatch(actions.getGroupsFailed(error));
        }
    }
}

function createGroup(group) {
    return async (dispatch) => {
        dispatch(actions.createGroup());
        try {
            let response = await axios.post(`${config.baseUrl}/boards/${config.boardId}/groups`, group, {
                headers: {
                    "Access-Token": config.token
                }
            });

            const { data } = response;
            dispatch(actions.createGroupSuccess(data));
            // dispatch(getGroups());
        } catch (error) {
            swal("Group Insersion Error", error.message, "error");
            console.error("error occured in creating groups ", error);
            dispatch(actions.createGroupFailed(error));
        }
    }
}


function updateGroup(group) {
    return async (dispatch) => {
        dispatch(actions.updateGroup());
        try {
            let response = await axios.put(`${config.baseUrl}/boards/${config.boardId}/groups`, group, {
                headers: {
                    "Access-Token": config.token
                }
            });
            dispatch(actions.updateGroupSuccess(response));
            dispatch(getGroups());
        } catch (error) {
            swal("Group updation Error", error.message, "error");
            console.error("error occured in updating groups ", error);
            dispatch(actions.updateGroupFailed(error));
        }
    }
}


function deleteGroup(group) {
    const { id } = group;
    return (dispatch) => {
        dispatch(actions.deleteGroup());

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this group",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`${config.baseUrl}/boards/${config.boardId}/groups`, {
                        headers: {
                            "Access-Token": config.token
                        },
                        data: {
                            id: id
                        }
                    }).then(() => {
                        dispatch(actions.deleteGroupSuccess(id));
                        // dispatch(getTasks());
                        swal("Poof! Your group has been deleted!", {
                            icon: "success",
                        });
                    }).catch((error) => {
                        swal("Group deletion Error", error.message, "error");
                        console.error("error in deleting group ", error);
                        dispatch(actions.deleteGroupFailed(error));
                    })


                } else {
                    swal("Your group is safe!");
                }
            });








        // try {
        //     let response = await axios.delete(`${config.baseUrl}/boards/${config.boardId}/groups`, {
        //         headers: {
        //             "Access-Token": config.token
        //         },
        //         data: {
        //             id: id
        //         }
        //     });
        //     dispatch(actions.deleteGroupSuccess(id));
        //     // dispatch(getGroups());
        // } catch (error) {
        //     swal("Group deletion Error", error.message, "error");
        //     console.error("error in deleting group ", error);
        //     dispatch(actions.deleteGroupFailed(error));
        // }
    }
}


export {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup
}
