document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const taskCounter = document.getElementById('task-counter');

    let tasks = [];

    function updateTaskCounter() {
        const remainingTasks = tasks.filter(task => !task.completed).length;
        taskCounter.textContent = `Tarefas restantes: ${remainingTasks}`;
    }

    function addTask(taskText) {
        const task = {
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.text;
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            taskItem.addEventListener('click', () => {
                task.completed = !task.completed;
                renderTasks();
            });

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.classList.add('remove-task');
            removeButton.addEventListener('click', (e) => {
                e.stopPropagation(); 
                tasks.splice(index, 1);
                renderTasks();
            });

            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
        });
        updateTaskCounter();
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    updateTaskCounter();
});
