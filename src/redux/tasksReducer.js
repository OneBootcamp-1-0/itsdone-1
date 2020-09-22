import tasksAPI from '../api/tasks-api.js';

const ADD_TASK = 'ADD_NEW_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const SET_TASKS = 'SET_TASKS';

const initialState = {
  tasks: []
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS: {
      return { ...state, tasks: action.tasks };
    }
    case UPDATE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.updatedTask.id ? action.updatedTask : task)
      };
    }
    case ADD_TASK: {
      return { ...state, tasks: [...tasks, action.newTask] }
    }
    default: {
      return state;
    }
  }
};

// Action creators
export const actions = {
  addTask: newTask => ({ type: ADD_TASK, newTask }),
  setTasks: tasks => ({ type: SET_TASKS, tasks }),
  updateTask: updatedTask => ({ type: UPDATE_TASK, updatedTask })
};

// Thunks
export const requestTasks = () => {
  return dispatch => {
    tasksAPI
      .getTasks()
      .then(tasks => dispatch(actions.setTasks(tasks)));
  };
};

export const addTask = task => {
  return dispatch => {
    tasksAPI
      .addTask(task)
      .then(newTask => dispatch(actions.addTask(newTask)));
  };
};

export const updateTask = task => {
  return dispatch => {
    tasksAPI
      .updateTask(task)
      .then(updatedTask => dispatch(actions.updateTask(updatedTask)));
  };
};

export default tasksReducer;
