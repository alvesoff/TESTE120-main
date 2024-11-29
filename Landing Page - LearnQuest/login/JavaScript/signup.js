document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Verificar se o e-mail já está cadastrado
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email) {
        alert('Email already registered!');
    } else {
        const user = { email: email, password: password };
        localStorage.setItem('user', JSON.stringify(user));
        alert('Account created successfully!');
        window.location.href = 'signin.html';  // Redirecionar para o login
    }
});
