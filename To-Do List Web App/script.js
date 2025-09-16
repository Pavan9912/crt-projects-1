// Get elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

// Add new task
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const task = { text: taskText, completed: false };
    tasks.push(task);
    saveTasks();
    addTaskToDOM(task);
    taskInput.value = '';
  }
});

// Function to add task to DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.textContent = task.text;
  if (task.completed) li.classList.add('completed');

  // Complete task on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    task.completed = !task.completed;
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent marking as complete
    taskList.removeChild(li);
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
