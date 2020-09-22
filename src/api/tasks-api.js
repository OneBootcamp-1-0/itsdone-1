const baseURL = 'http://localhost:3000/tasks/';

const tasksAPI = {
  getTasks: () => {
    return fetch(baseURL).then(res => res.json());
  },
  addTask: task => {
    return fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }).then(res => res.json());
  },
  updateTask: task => {
    return fetch(`baseURL${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }).then(res => res.json());
  }
};

export default tasksAPI;
