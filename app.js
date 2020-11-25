// Define UI vars
let form = document.querySelector('#task-form');
let taskList = document.querySelector('.list-group');
let clearBtn = document.querySelector('.clear-task');
let filter = document.querySelector('#filter');
let taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Calling all event listeners
function loadEventListeners() {
    // DOM content in LS
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTask);
    // Filter task event
    filter.addEventListener('keyup', filterTask);
}

// Get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task) {
        taskList.style.textTransform = 'capitalize';
        taskInput.style.textTransform = 'capitalize';

        // Creating li element
        let li = document.createElement('li');
        // Add class
        li.className = 'list-group-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task))
        // Add delete icon
        let link = document.createElement('a');
        // Add class
        link.className = 'delete-item float-right'
        // Add style color
        link.style.color = 'coral'
        // Add icon in HTML
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // Append to link to li
        li.appendChild(link)

        // Append li to ul
        taskList.appendChild(li)
    })
}

// Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert("Please Enter Task");
    }

    taskList.style.textTransform = 'capitalize';
    taskInput.style.textTransform = 'capitalize';

    // Creating li element
    let li = document.createElement('li');
    // Add class
    li.className = 'list-group-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    // Add delete icon
    let link = document.createElement('a');
    // Add class
    link.className = 'delete-item float-right'
    // Add style color
    link.style.color = 'coral'
    // Add icon in HTML
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append to link to li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li)

    // Store in LS
    storeTaskInLocalStorage(taskInput.value)

    e.preventDefault();

    // Clear input 
    taskInput.value = '';

}

// Store task in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you Sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear task
function clearTask() {
    // taskList.innerHTML = '';

    // faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear task from LS
    clearTaskFromLocalStorage()
}

// Clear task from LS
function clearTaskFromLocalStorage() {
    localStorage.clear()
}

// Filter task
function filterTask(e) {
    let text = e.target.value;

    document.querySelectorAll('.list-group-item').forEach
        (function (task) {
            let item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        })
}