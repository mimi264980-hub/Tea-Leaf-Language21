// Initialize todos from localStorage
let todos = getFromLocalStorage('taang_todos') || [];

function addTodo() {
    const input = document.getElementById('todo-input-field');
    const text = input.value.trim();
    
    if (!text) return;

    const newTodo = {
        id: Date.now(),
        text: text,
        date: new Date().toLocaleDateString(),
        completed: false
    };

    todos.push(newTodo);
    input.value = '';
    saveAndRenderTodos(todos);
}

function toggleTask(id) {
    todos = todos.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveAndRenderTodos(todos);
}

function deleteTask(id) {
    todos = todos.filter(t => t.id !== id);
    saveAndRenderTodos(todos);
}

function clearAllTodos() {
    if (confirm("တာဝန်အားလုံးကို ဖျက်ပစ်ရန် သေချာပါသလား?")) {
        todos = [];
        saveAndRenderTodos(todos);
    }
}

function saveNote() {
    const noteContent = document.getElementById('note-input').innerHTML;
    saveToLocalStorage('taang_rich_note', noteContent);
    alert('မှတ်စုကို သိမ်းဆည်းလိုက်ပါပြီ။');
}

// App Initialization
window.addEventListener('load', () => {
    // Load saved notes
    const savedNote = localStorage.getItem('taang_rich_note');
    if (savedNote) {
        document.getElementById('note-input').innerHTML = JSON.parse(savedNote);
    }
    
    // Initial render
    renderTodos(todos);
});
