const baseURL = 'https://murmuring-brushlands-70389.herokuapp.com/tasks/';


const tasksAPI = {
  getTasks: () => {
    return fetch(baseURL).then(res => res.json());
  },
  addTask: task => {
    return fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }).then(res => res.json()).then(data => data.newTask);
  },
  updateTask: task => {
    return fetch(`${baseURL}${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }).then(res => res.json()).then(data => data.updatedTask);
  },
  deleteTask: taskId => {
    return fetch(`${baseURL}${taskId}`, {
      method: 'DELETE'
    }).then(res => res.json()).then(data => data.deletedTaskId)
  }
};

export default tasksAPI;
