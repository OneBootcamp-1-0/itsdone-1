import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  tasks: tasksReducer
});

const store = createStore(rootReducer);

export default store;
