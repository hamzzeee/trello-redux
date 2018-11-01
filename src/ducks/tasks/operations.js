import axios from 'axios';
import * as actions from './actions';
import swal from 'sweetalert';
import config from './../config';

function getTasks() {
    return async (dispatch) => {
        dispatch(actions.fetchingTasks());
        try {
            let response = await axios.get(`${config.baseUrl}/boards/${config.boardId}/tasks`, {
                headers: {
                    "Access-Token": config.token
                }
            });
            dispatch(actions.setTasks(response));
        } catch (error) {
            swal("Error getting tasks", error.message, "error");
            console.error("error occured in getting tasks ", error);
            dispatch(actions.getTasksFailed(error));
        }
    }
}

function createTask(task) {
    return async (dispatch) => {
        dispatch(actions.createTask());
        try {
            let response = await axios.post(`${config.baseUrl}/boards/${config.boardId}/tasks`, task, {
                headers: {
                    "Access-Token": config.token
                }
            });
            const { data } = response;
            dispatch(actions.createTaskSuccess(data));
            // dispatch(getTasks());
        } catch (error) {
            swal("Task Creation Error", error.message, "error");
            console.error("error occured in creating tasks ", error);
            dispatch(actions.createTaskFailed(error));
        }
    }
}


function updateTask(task) {
    return async (dispatch) => {
        dispatch(actions.updateTask());
        try {
            let response = await axios.put(`${config.baseUrl}/boards/${config.boardId}/tasks`, task, {
                headers: {
                    "Access-Token": config.token
                }
            });
            dispatch(actions.updateTaskSuccess(response));
            dispatch(getTasks());
        } catch (error) {
            swal("Task Update Error", error.message, "error");
            console.error("error occured in updating tasks ", error);
            dispatch(actions.updateTaskFailed(error));
        }
    }
}


function deleteTask(task) {
    const { id } = task;

    return (dispatch) => {
        dispatch(actions.deleteTask());


        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`${config.baseUrl}/boards/${config.boardId}/tasks`, {
                        headers: {
                            "Access-Token": config.token
                        },
                        data: {
                            id: id
                        }
                    }).then(() => {
                        dispatch(actions.deleteTaskSuccess(id));
                        // dispatch(getTasks());
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    }).catch((error) => {
                        swal("Task Insersion Error", error.message, "error");
                        console.error("error in deleting task ", error);
                        dispatch(actions.deleteTaskFailed(error));
                    })

                    
                } else {
                    swal("Your task is safe!");
                }
            });



        // try {
        //     let response = await axios.delete(`${config.baseUrl}/boards/${config.boardId}/tasks`, {
        //         headers: {
        //             "Access-Token": config.token
        //         },
        //         data: {
        //             id: id
        //         }
        //     });
        //     dispatch(actions.deleteTaskSuccess(id));
        //     dispatch(getTasks());
        // } catch (error) {
        //     swal("Task Insersion Error", error.message, "error");
        //     console.error("error in deleting task ", error);
        //     dispatch(actions.deleteTaskFailed(error));
        // }
    }
}


export {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}
