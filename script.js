let todos = [];

function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        renderTodos();
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
    
    if (todoText) {
        todos.push({ text: todoText, completed: false });
        input.value = '';
        saveTodos();
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function editTodo(index) {
    const li = document.querySelector(`li[data-index="${index}"]`);
    li.classList.add('edit-mode');
    li.classList.remove('view-mode');
    const input = li.querySelector('.edit-mode input[type="text"]');
    input.value = todos[index].text;
    input.focus();
}

function updateTodo(index) {
    const li = document.querySelector(`li[data-index="${index}"]`);
    const input = li.querySelector('.edit-mode input[type="text"]');
    const newText = input.value.trim();
    if (newText) {
        todos[index].text = newText;
        saveTodos();
        renderTodos();
    }
}

function cancelEdit(index) {
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('view-mode');
        li.dataset.index = index;
        li.innerHTML = `
            <div class="view-mode">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
                <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <div class="todo-actions">
                    <button class="icon-button edit-button" onclick="editTodo(${index})"><i class="fas fa-edit"></i></button>
                    <button class="icon-button delete-button" onclick="deleteTodo(${index})"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div class="edit-mode">
                <input type="text" class="edit-input" value="${todo.text}">
                <button class="icon-button save-button" onclick="updateTodo(${index})"><i class="fas fa-check"></i></button>
                <button class="icon-button" onclick="cancelEdit(${index})"><i class="fas fa-times"></i></button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// Event listener for add button
document.getElementById('addButton').addEventListener('click', addTodo);

// Event listener for enter key in input field
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Load todos when the page loads
loadTodos();