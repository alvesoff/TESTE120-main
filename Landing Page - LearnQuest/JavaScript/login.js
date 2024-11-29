document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        // Salvando as informações do usuário após o login
        localStorage.setItem('loggedInUser', JSON.stringify({
            email: email,
            name: storedUser.name || "User", // Pode incluir nome, se fornecido
            score: storedUser.score || 0, // Inicializa a pontuação
        }));
        alert('Login successful!');
        // Redireciona para o jogo
        window.location.href = '/Landing Page - LearnQuest/Game1/index.html';
    } else {
        alert('Invalid email or password.');
    }
});
