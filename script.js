const apiUrl = 'http://127.0.0.1:8000/'; // Replace this with your API endpoint

// Function to fetch tasks from the server
async function getTasks() {
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        displayTasks(response.data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

document.getElementById('displayTasks').addEventListener('click', function() {
    getTasks(); // Call getTasks to fetch tasks and then display them
});


// Function to display tasks in the UI
function displayTasks(tasks) {
    console.log(tasks);
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        const taskName = document.createElement('li');
        const taskDescription = document.createElement('li');
        const completed = document.createElement('li');
        const deleteButton = document.createElement('button');

        taskName.textContent = `Task Name: ${task.name}`;
        taskDescription.textContent = `Task Description: ${task.description}`;
        completed.textContent = `Completed: ${task.complete ? 'Yes' : 'No'}`;
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id)); // Attach click event listener

        li.appendChild(taskName);
        li.appendChild(taskDescription);
        li.appendChild(completed);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Function to delete a task by its ID
async function deleteTask(taskId) {
    try {
        await axios.delete(apiUrl + taskId);
        getTasks(); // Refresh task list after deleting a task
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Function to add a new task
async function addTask(event) {
    event.preventDefault(); // Prevent form submission
    const taskNameInput = document.getElementById('taskName');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const completedSelect = document.getElementById('completed');

    const title = taskNameInput.value.trim();
    const description = taskDescriptionInput.value.trim();
    const completed = completedSelect.value === 'true';

    if (title === '' || description === '') {
        alert('Please enter both task name and description');
        return;
    }
    const data = {
        name: title,
        description: description,
        complete: completed
    }

    try {
        console.log(data)
        await axios.post(apiUrl, data);
        taskNameInput.value = '';
        taskDescriptionInput.value = '';
        completedSelect.value = 'true'; // Reset completed select to default
        getTasks(); // Refresh task list after adding a task
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// Event listener for form submission
const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', addTask);

// Initial call to fetch tasks when the page loads
getTasks();


