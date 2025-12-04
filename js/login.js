const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function signIn() {
    const emailInput = document.getElementById('email-input')
    const email = emailInput.value.trim()

    const passwordInput = document.getElementById('password-input')

    if (email && emailRegex.test(email)) {
        const usersList = JSON.parse(localStorage.getItem('users')) || []

        const user = usersList.find(user => user.email === email && user.password === passwordInput.value)
        if (!user) {
            alert('Email ou senha inválidos')
            return
        }

        window.location.href = 'posts.html'
    } else {
        alert('Por favor, insira um email válido')
    }
}

function goToRegister() {
    window.location.href = 'admin.html'
}