import tasksAPI from '../api/tasksAPI.js';

const ADD_TASK = 'ADD_NEW_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const SET_TASKS = 'SET_TASKS';

const initialState = {
  tasks: []
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
    case UPDATE_TASK:
    case ADD_TASK:
      return { ...state, tasks: action.tasks }
    default:
      return state;
  }
};

export const actions = {
  addTask: tasks => ({ type: ADD_TASK, tasks }),
  setTasks: tasks => ({ type: SET_TASKS, tasks }),
  updateTask: tasks => ({ type: UPDATE_TASK, tasks })
};

export const operations = {
  requestTasks = () => {
    return dispatch => {
      tasksAPI
        .getTasks()
        .then(tasks => dispatch(actions.setTasks(tasks)));
    };
  },
  addTask = task => {
    return dispatch => {
      tasksAPI
        .addTask(task)
        .then(tasks => dispatch(actions.addTask(tasks)));
    };
  },
  addTask = task => {
    return dispatch => {
      tasksAPI
        .addTask(task)
        .then(tasks => dispatch(actions.addTask(tasks)));
    };
  },
  updateTask = task => {
    return dispatch => {
      tasksAPI
        .updateTask(task)
        .then(tasks => dispatch(actions.updateTask(tasks)));
    };
  }
};

export default tasksReducer;
