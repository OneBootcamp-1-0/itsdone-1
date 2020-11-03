import tasksAPI from '../api/tasksAPI.js';
import myWebSocket from '../ws/ws.js';

const ADD_TASK = 'ADD_NEW_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const SET_TASKS = 'SET_TASKS';
const DELETE_TASK = 'DELETE_TASK';
const UPDATE_ALL_TASKS = 'UPDATE_ALL_TASKS';

let ws = null;

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
    case DELETE_TASK:
      const newTasks = [...state.tasks];
      newTasks.splice(action.deletedTaskId, 1);
      return { ...state, tasks: newTasks.map((task, i) => ({ ...task, id: i })) }
    case UPDATE_ALL_TASKS:
      return { ...state, tasks: action.tasks };
    default:
      return state;
  }
};

export const actions = {
  addTask: newTask => ({ type: ADD_TASK, newTask }),
  setTasks: tasks => ({ type: SET_TASKS, tasks }),
  updateTask: updatedTask => ({ type: UPDATE_TASK, updatedTask }),
  deleteTask: deletedTaskId => ({ type: DELETE_TASK, deletedTaskId }),
  updateAllTasks: tasks => ({ type: UPDATE_ALL_TASKS, tasks }),
};

export const operations = {
  initWS() {
    return dispatch => {
      const CardsWebSocket = new myWebSocket();

      const onMessage = message => {
        const cards = JSON.parse(message.data);
        dispatch(actions.updateAllTasks(cards));
      };

      const onClose = () => {
        console.log('connection closed');
        dispatch(actions.updateAllTasks([]));
      };

      const onOpen = () => {
        ws = CardsWebSocket.ws;
      };

      CardsWebSocket.connect(WEBSOCKET_URL, onMessage, onOpen, onClose);
    }
  },
  requestTasks: () => {
    return dispatch => {
      tasksAPI
        .getTasks()
        .then(tasks => dispatch(actions.setTasks(tasks)));
    };
  },
  addTask: task => {
    return dispatch => {
      tasksAPI
        .addTask(task)
        .then(newTask => dispatch(actions.addTask(newTask)))
        .then(() => tasksAPI.updateTasksWS(ws, 'Update task'));
    };
  },
  updateTask: task => {
    return dispatch => {
      tasksAPI
        .updateTask(task)
        .then(updatedTask => dispatch(actions.updateTask(updatedTask)))
        .then(() => tasksAPI.updateTasksWS(ws, 'Update task'));
    };
  },
  deleteTask: taskId => {
    return dispatch => {
      tasksAPI
        .deleteTask(taskId)
        .then(deletedTaskId => dispatch(actions.deleteTask(deletedTaskId)))
        .then(() => tasksAPI.updateTasksWS(ws, 'Update task'));
    };
  }
};

export default tasksReducer;
