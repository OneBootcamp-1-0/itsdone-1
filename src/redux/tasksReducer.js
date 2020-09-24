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
      return { ...state, tasks: action.tasks }
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.updatedTask.id ? action.updatedTask : task)
      }
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.newTask] }
    default:
      return state;
  }
};

export const actions = {
  addTask: newTask => ({ type: ADD_TASK, newTask }),
  setTasks: tasks => ({ type: SET_TASKS, tasks }),
  updateTask: updatedTask => ({ type: UPDATE_TASK, updatedTask })
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
        .then(newTask => dispatch(actions.addTask(newTask)));
    };
  },
  updateTask = task => {
    return dispatch => {
      tasksAPI
        .updateTask(task)
        .then(updatedTask => dispatch(actions.updateTask(updatedTask)));
    };
  }
};

export default tasksReducer;
