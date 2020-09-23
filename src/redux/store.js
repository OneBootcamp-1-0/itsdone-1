import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import tasksReducer from './tasks_reducer.js';

const rootReducer = combineReducers({
  tasks: tasksReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
