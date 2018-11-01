import React, {Component} from 'react';
import swal from 'sweetalert';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './../assets/js/script';
import './Tasks.css';
import './../assets/css/font-awesome.css';
import './../assets/css/style.css';
import 'jquery/dist/jquery.min';
// import 'popper.js/dist/popper.js';

//Actions
import {getTasks, createTask, deleteTask} from './../ducks/tasks/operations';
import {getGroups, createGroup, deleteGroup} from './../ducks/groups/operations';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            groups: [],
            new_group_name: '',
            new_task: ''
        }
        this.onAddGroup = this.onAddGroup.bind(this);
        this.showGroups = this.showGroups.bind(this);
        this.cancelAddGroup = this.cancelAddGroup.bind(this);
        this.addNewGroup = this.addNewGroup.bind(this);
        this.onNewGroupInputChange = this.onNewGroupInputChange.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.addCard = this.addCard.bind(this);
        this.cancelAddCard = this.cancelAddCard.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.onNewCardInputChange = this.onNewCardInputChange.bind(this);
        this.showTasks = this.showTasks.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.onAddGroupKeyUp = this.onAddGroupKeyUp.bind(this);
        this.onAddCardKeyUp = this.onAddCardKeyUp.bind(this);
        this.onAddCardBlur = this.onAddCardBlur.bind(this);
        this.onAddGroupBlur = this.onAddGroupBlur.bind(this);
    }

    componentDidMount() {
        this.props.getTasks();
        this.props.getGroups();
    }

    onAddGroup(e) {
        e.preventDefault();
        let list_section = document.querySelector('#list-section');
        let add_group_wrap = document.querySelector('.add-list-wrap');

        let add_group_input = document.querySelector('#list-section #new-group-name');

        add_group_wrap.style.display = 'none';
        list_section.style.display = 'block';
        add_group_input.focus();
    }

    addNewGroup(e) {
        e.preventDefault();
        if (this.state.new_group_name === '') {
            swal("Empty Fields", "Fill both Fields", "warning");
        } else {
            let list_section = document.querySelector('#list-section');
            let add_group_wrap = document.querySelector('.add-list-wrap');

            this.props.createGroup({name: this.state.new_group_name});
            this.setState({
                new_group_name: ''
            })
            list_section.style.display = 'none';
            add_group_wrap.style.display = 'block';
        }
    }

    cancelAddGroup(e) {
        e.preventDefault();

        let list_section = document.querySelector('#list-section');
        let add_group_wrap = document.querySelector('.add-list-wrap');

        list_section.style.display = 'none';
        add_group_wrap.style.display = 'block';
    }

    onNewGroupInputChange(e) {
        e.preventDefault();
        const {value, name} = e.target;
        if (name === 'new-group-name') {
            this.setState({
                new_group_name: value
            })
        }
    }

    deleteGroup(id, e) {
        e.preventDefault();
        this.props.deleteGroup({id: id});
    }

    addCard(group_id, e) {
        e.preventDefault();

        let add_card = document.querySelector(`#add-wrap${group_id}`);
        let add_card_info = document.querySelector(`#add-info${group_id}`);
        let card_text_area = document.querySelector(`#text-area${group_id}`)


        add_card.style.display = 'none';
        add_card_info.style.display = 'block';
        card_text_area.focus();
    }

    cancelAddCard(group_id, e) {
        e.preventDefault();

        let add_card = document.querySelector(`#add-wrap${group_id}`);
        let add_card_info = document.querySelector(`#add-info${group_id}`);

        add_card_info.style.display = 'none';
        add_card.style.display = 'block';
    }

    addNewCard(id, e) {
        e.preventDefault();
        if (this.state.new_task === '') {
            swal("Empty Field", "Empty task not accepted", "warning");
        } else {
            this.props.createTask({name: this.state.new_task, groupDto: {id}});
            this.setState({
                new_task: ''
            })
        }
    }

    onNewCardInputChange(e) {
        e.preventDefault();
        const {value, name} = e.target;
        if (name === 'new_task') {
            this.setState({
                new_task: value
            })
        }
    }

    deleteCard(id, e) {
        e.preventDefault();
        this.props.deleteTask({id: id});
    }

    showTasks(tasks, group_id) {
        if (tasks.length === 0) {
            return (
                <div className="card-options" hidden>
                    <a href=""><span className="fa fa-pencil"></span></a>
                    <a href=""><span className="fa fa-close"></span></a>
                </div>
            );
        } else {
            let group_tasks = tasks.filter((task) => {
                return task.groupDto.id === group_id;
            })
            if (group_tasks.length === 0) {
                return (
                    <div className="card-options" hidden>
                        <a href=""><span className="fa fa-pencil"></span></a>
                        <a href=""><span className="fa fa-close"></span></a>
                    </div>
                );
            } else {
                return group_tasks.map((task) => {
                    const {name = 'task'} = task;
                    return (
                        <li key={task.id}>
                            <span>{name}</span>
                            <div className="card-options">
                                <a href="" onClick={(e) => this.deleteCard(task.id, e)}>
                                    <span className="fa fa-close"></span>
                                </a>
                            </div>
                        </li>
                    );
                })
            }
        }
    }

    showGroups(groups, tasks) {
        const {data: grps = []} = groups;
        const {data: tsks = []} = tasks;

        if (grps.length === 0) {
            return (
                <div className="col-md-2" hidden></div>
            );
        } else {
            return grps.map((group) => {
                return (
                    <div className="col-md-2" key={group.id}>
                        <div className="list-section">
                            <a href="" className="close-list" onClick={(e) => this.deleteGroup(group.id, e)}>
                                <span className="fa fa-close"></span>
                            </a>
                            <h2>{group.name}</h2>


                            <div className="list-card-details">
                                <ul>

                                    {this.showTasks(tsks, group.id)}

                                </ul>
                            </div>

                            <div className="form-section">
                                <div className="list-add-controls addAnotherWrap" id={'add-wrap' + group.id}>
                                    <a href="" className="add-card addAnotherCard"
                                       onClick={(e) => this.addCard(group.id, e)}>
                                        <span className="fa fa-plus"></span> <span>Add another card</span>
                                    </a>
                                </div>

                                <div className="form-section hide close-contain addAnotherInfo"
                                     id={'add-info' + group.id}>
									<textarea
                                        placeholder="Enter a title for this card"
                                        name="new_task"
                                        id={'text-area' + group.id}
                                        onKeyDown={(e) => this.onAddCardKeyUp(group.id, e)}
                                        // onBlur={(e) => this.onAddCardBlur(group.id, e)}
                                        onChange={this.onNewCardInputChange}
                                        className="form-control"></textarea>
                                    <div className="list-add-controls">
                                        <input
                                            type="submit"
                                            value="Add List"
                                            onClick={(e) => this.addNewCard(group.id, e)}
                                            className="btn btn-success"/>
                                        <a href="" className="fa fa-close hideAnother"
                                           onClick={(e) => this.cancelAddCard(group.id, e)}></a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                );
            })
        }
    }

    onAddGroupKeyUp(e) {
        if (+e.keyCode === 13) {
            this.addNewGroup(e);
        }
    }

    onAddCardKeyUp(group_id, e) {
        if (+e.keyCode === 13) {
            this.addNewCard(group_id, e);
        }
    }

    onAddGroupBlur(e) {
        e.preventDefault();

        let list_section = document.querySelector('#list-section');
        let add_group_wrap = document.querySelector('.add-list-wrap');

        list_section.style.display = 'none';
        add_group_wrap.style.display = 'block';
    }

    onAddCardBlur(group_id, e) {
        e.preventDefault();

        console.log(e)

        let add_card = document.querySelector(`#add-wrap${group_id}`);
        let add_card_info = document.querySelector(`#add-info${group_id}`);

        add_card_info.style.display = 'none';
        add_card.style.display = 'block';
    }

    render() {
        let {tasks, groups, groupsFetching, tasksFetching} = this.props;
        if (groupsFetching || tasksFetching) {
            return (
                <div className="loader">
                    <svg viewBox="0 0 32 32" width="32" height="32">
                        <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                    </svg>
                </div>
            );
        }
        return (
            <div id="container-fluid">
                <div className="scroll-section">

                    <div className="row row-contain">

                        {this.showGroups(groups, tasks)}

                        {/* Add New Group Button */}
                        <div className="col-md-2">
                            <div className="add-list-wrap">
                                <a href="" id="add-list" onClick={this.onAddGroup}>
                                    <span className="fa fa-plus"></span> Add another list
                                </a>
                            </div>

                            <div className="list-section close-contain hide" id="list-section">
                                <div className="form-section">
                                    <input
                                        type="text"
                                        id="new-group-name"
                                        onKeyDown={this.onAddGroupKeyUp}
                                        // onBlur={this.onAddGroupBlur}
                                        onChange={this.onNewGroupInputChange}
                                        name="new-group-name"
                                        placeholder="Enter List Title"
                                        className="form-control"/>
                                    <div className="list-add-controls">
                                        <input type="submit" value="Add List" onClick={this.addNewGroup}
                                               className="btn btn-success"/>
                                        <a href="" className="fa fa-close hide-list"
                                           onClick={this.cancelAddGroup}></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* Add New Group End */}


                    </div>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {
        tasks: {tasks: {data: tasks}, tasks: {fetching: tasksFetching}, tasks: {error: tasksError}},
        groups: {groups: {data: groups}, groups: {fetching: groupsFetching}, groups: {error: groupsError}}
    } = state;
    return {
        tasks,
        tasksFetching,
        groups,
        groupsFetching,
        tasksError,
        groupsError
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTasks,
        getGroups,
        createGroup,
        deleteGroup,
        createTask,
        deleteTask
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);