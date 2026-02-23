function hapticFeedback() {
    const vibrationEnabled = document.getElementById('vibration-toggle').checked;
    if (vibrationEnabled && navigator.vibrate) {
        navigator.vibrate(40);
    }
}

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    const isShowing = modal.style.display === 'flex';
    modal.style.display = isShowing ? 'none' : 'flex';
    
    if (!isShowing) hapticFeedback();
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function saveAndRenderTodos(todos) {
    saveToLocalStorage('taang_todos', todos);
    renderTodos(todos);
}

function renderTodos(todosList) {
    const container = document.getElementById('todo-list-container');
    const searchField = document.getElementById('todo-search-field');
    const searchTerm = searchField ? searchField.value.toLowerCase() : "";
    
    const filteredTodos = todosList.filter(t => 
        t.text.toLowerCase().includes(searchTerm)
    );

    container.innerHTML = "";
    
    if (filteredTodos.length === 0) {
        container.innerHTML = `<p style="color:gray;">${todosList.length === 0 ? 'တာဝန်များ မရှိသေးပါ။' : 'ရှာဖွေမှုမတွေ့ပါ။'}</p>`;
        return;
    }

    filteredTodos.forEach(todo => {
        const div = createTodoElement(todo);
        container.appendChild(div);
    });
}

function createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.style.borderLeft = `6px solid ${todo.completed ? 'var(--tea-green)' : 'var(--gold)'}`;
    
    div.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:10px; flex:1;" onclick="toggleTask(${todo.id})">
                <span class="material-icons-round" style="color:${todo.completed ? 'var(--tea-green)' : '#ccc'}; cursor:pointer;">
                    ${todo.completed ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span style="text-decoration:${todo.completed ? 'line-through' : 'none'}; color:${todo.completed ? '#aaa' : '#333'};">
                    ${todo.text}
                </span>
            </div>
            <span class="material-icons-round" style="color:#ff4444; cursor:pointer;" onclick="deleteTask(${todo.id})">delete_outline</span>
        </div>
    `;
    return div;
}
