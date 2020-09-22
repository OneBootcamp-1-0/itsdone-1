const tasksAPI = {
  getTasks: () => {
    return fetch('http://localhost:3000/tasks').then(res => res.json());
  },
  addTask: task => {
    return fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }).then(res => res.json());
  },
  updateTask: task => {
    return fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    }).then(res => res.json());
  }
};

export default taskskAPI;
