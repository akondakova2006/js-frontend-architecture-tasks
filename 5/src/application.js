import uniqueId from 'lodash/uniqueId.js';

// BEGIN
// BEGIN
export default function run() {
  let currentList = 'General';

  const tasksContainer = document.querySelector('[data-container="tasks"]');
  const listsContainer = document.querySelector('[data-container="lists"]');

  const taskForm = document.querySelector('[data-container="new-task-form"]');
  const listForm = document.querySelector('[data-container="new-list-form"]');

  const taskInput = taskForm.querySelector('input[type="text"]');
  const listInput = listForm.querySelector('input[type="text"]');

  const state = {
    General: [],
  };

  const renderTasks = () => {
    tasksContainer.innerHTML = '';

    (state[currentList] || []).forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task;
      tasksContainer.append(li);
    });
  };

  const renderLists = () => {
    listsContainer.innerHTML = '';

    Object.keys(state).forEach((listName) => {
      const li = document.createElement('li');

      // активный список НЕ ссылка
      if (listName === currentList) {
        const b = document.createElement('b');
        b.textContent = listName;
        li.append(b);
      } else {
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = listName;

        a.addEventListener('click', (e) => {
          e.preventDefault();
          currentList = listName;

          renderLists();
          renderTasks();
        });

        li.append(a);
      }

      listsContainer.append(li);
    });
  };

  const addTask = (e) => {
    e.preventDefault();

    const value = taskInput.value.trim();
    if (!value) return;

    if (!state[currentList]) {
      state[currentList] = [];
    }

    state[currentList].push(value);

    taskInput.value = '';
    renderTasks();
  };

  const addList = (e) => {
    e.preventDefault();

    const value = listInput.value.trim();
    if (!value || state[value]) return;

    state[value] = [];

    listInput.value = '';
    renderLists();
  };

  taskForm.addEventListener('submit', addTask);
  listForm.addEventListener('submit', addList);

  renderLists();
  renderTasks();
}
// END
// END