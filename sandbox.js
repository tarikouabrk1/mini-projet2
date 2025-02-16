document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.querySelector('.add');
    const list = document.querySelector('.todos');
    const search = document.querySelector('.search input');

    // Charger les tâches depuis localStorage
    const loadTodos = () => {
        list.innerHTML = ''; // ⚠️ Vider la liste pour éviter la duplication
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => generateTemplate(todo));
    };

    // Sauvegarder les tâches dans localStorage
    const saveTodos = () => {
        const todos = Array.from(list.children).map(todo => todo.querySelector('span').textContent);
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Générer un élément de tâche
    const generateTemplate = (todo) => {
        const html = `
            <li class="list-group-item d-flex justify-content-between align-items-center" style="display: flex;">
                <span>${todo}</span>
                <i class="far fa-trash-alt delete"></i>
            </li>
        `;
        list.insertAdjacentHTML('beforeend', html);
    };

    // Ajouter une tâche
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todo = addForm.querySelector('input[name="add"]').value.trim();
        if (todo.length) {
            generateTemplate(todo);
            saveTodos(); // Sauvegarde après ajout
            addForm.reset();
        }
    });

    // Supprimer une tâche
    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            saveTodos(); // Sauvegarde après suppression
        }
    });

    // Filtrer les tâches
    const filterTodos = (term) => {
        Array.from(list.children).forEach((todo) => {
            const text = todo.querySelector('span').textContent.toLowerCase();
            const match = text.startsWith(term); // Changed from includes() to startsWith()
            todo.classList.toggle('hidden', !match);
        });
    };
    


    // Écouter la recherche
    search.addEventListener('keyup', () => {
        const term = search.value.trim().toLowerCase();
        filterTodos(term);
    });

    // Charger les tâches au démarrage
    loadTodos();
});


