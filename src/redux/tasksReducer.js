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
  return async dispatch => {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    dispatch(action.getTasks(tasks));
  };
};

export const addTask = task => {
  return async dispatch => {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    const newTask = await response.json();
    dispatch(action.addTask(newTask));
  };
};

export const updateTask = task => {
  return async dispatch => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    const updatedTask = await response.json();
    dispatch(action.updateTask(updatedTask));
  };
};

export default tasksReducer;
