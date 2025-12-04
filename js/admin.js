function createUser() {
    const username = document.getElementById('username-input').value;
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    if (!username || !email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const usersList = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = usersList.some(user => user.username === username || user.email === email);

    if (userExists) {
        alert('Usuário ou email já existe.');
        return;
    }

    localStorage.setItem('users', JSON.stringify([
        ...usersList,
        { username, email, password }
    ]))

    console.log('Criando usuário:', { username, email, password });
    alert('Usuário criado com sucesso!');

    clearCreateUserForm();
    loadUsersList()
}

function clearCreateUserForm() {
    document.getElementById('username-input').value = '';
    document.getElementById('email-input').value = '';
    document.getElementById('password-input').value = '';
}

function loadUsersList() {
    console.log('Carregando lista de usuários...');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usersListBody = document.getElementById('users-list-body');

    usersListBody.innerHTML = '';

    if (users.length === 0) {
        usersListBody.innerHTML = `
            <tr>
                <td colspan="3">Nenhum usuário cadastrado.</td>
            </tr>
        `;
        return;
    }

    users.forEach((user, index) => {
        const userItem = document.createElement('tr');
        userItem.innerHTML = /* html */`
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button class="button button-theme-red" onclick="deleteUser('${user.username}')">Excluir</button>
            </td>
        `;
        usersListBody.appendChild(userItem);
    })
}

function deleteUser(username) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.username !== username);
    localStorage.setItem('users', JSON.stringify(users));

    loadUsersList();
}

function deleteAllUsers() {
    if (confirm('Tem certeza que deseja excluir todos os usuários?')) {
        localStorage.removeItem('users');
        loadUsersList();
    }
}

loadUsersList()