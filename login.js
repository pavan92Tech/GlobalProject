document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
  
    usernameError.textContent = '';
    passwordError.textContent = '';
  
    if (username === '') {
      usernameError.textContent = 'Please enter your username.';
      return;
    }
  
    if (password === '') {
      passwordError.textContent = 'Please enter your password.';
      return;
    }
  
    // Perform login logic here (e.g., send credentials to server for authentication)
    console.log('Username:', username);
    console.log('Password:', password);
  
    // Simulating login success
    alert('Login successful!');
    window.location.href = 'index.html';
  });
  
  document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
  });
  