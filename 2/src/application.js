import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

const render = (tasks) => {
  const list = document.getElementById('tasks');

  list.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = task.name;
    list.append(li);
  });
};

export default async () => {
  const response = await axios.get(routes.tasksPath());

  const state = {
    tasks: response.data.items,
  };

  render(state.tasks);

  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    await axios.post(routes.tasksPath(), data);

    state.tasks.unshift(data);

    render(state.tasks);

    form.reset();
  });
};