const adminUser = {
  username: "Iysamgk",
  password: "325550" // change this to your secret password
};

if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if (u === adminUser.username && p === adminUser.password) {
      localStorage.setItem('isAdmin', 'true');
      alert('Login successful!');
      window.location.href = 'admin.html';
    } else {
      alert('Incorrect login!');
    }
  });
}

function protectAdminPage() {
  if (!localStorage.getItem('isAdmin')) {
    alert('Access denied. Please login.');
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.removeItem('isAdmin');
  window.location.href = 'login.html';
}