(function() {
  const registrationForm = document.querySelector('#registration-form');
  const loginForm = document.querySelector('#login-form');
  const logoutButton = document.querySelector('a#logout');

  logoutButton.addEventListener('click', () => {
    logout(); 
  });

  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    clearNotifications();

    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    const successful = await register(name, email, password);

    registrationForm.reset();

    if (!successful) return showNotification('ERROR: Could not register you. Please try again later.', 'error');

    return showNotification(`INFO: ${name}, you were registered successfully.`, 'info');
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    clearNotifications();

    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    const successful = await login(email, password);

    loginForm.reset();

    if (!successful) return showNotification('ERROR: Could not log you in. Your email or password is incorrect.', 'error');

    return showNotification(`INFO: You are logged in.`, 'info');
  });

})();

const login = async (email, password) => {

  data = {
    email,
    password
  };

  try {
    let response = await fetch(
      'http://localhost:3000/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    let result = await response.json(); 

    localStorage.setItem('token', result.token)

    return response.status === 200
  } catch(err) {
    showNotification(err, 'error');
  }

};

const logout = () => {
  localStorage.removeItem('token');
}

const register = async (name, email, password) => {

  data = {
    name,
    email,
    password
  };

  try {
    const response = await fetch(
      'http://localhost:3000/api/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.status === 200
  } catch(err) {
    showNotification(err, 'error');
  }

};

const showNotification = (message, type) => {
  notification = `
    <div class="notification ${type}">
      <p>${message}</p> 
    </div>
  `;

  const notifications = document.querySelector('.notifications');

  notifications.innerHTML += notification;
};

const clearNotifications = () => {
  const notifications = document.querySelector('.notifications');
  notifications.innerHTML = '';
}
