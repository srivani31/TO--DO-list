const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <div class="task-actions">
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateCount();
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  tasks.push({ text, completed: false });
  taskInput.value = '';
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function updateCount() {
  const count = tasks.filter(task => !task.completed).length;
  taskCount.textContent = `${count} task${count !== 1 ? 's' : ''} left`;
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

renderTasks();
