(function() {
  const registrationForm = document.querySelector('#registration-form');

  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    const successful = await register(name, email, password);

    console.log(`SUCCESS: ${successful}`);
  });

})();

const register = async (name, email, password) => {

  data = {
    name,
    email,
    password
  };

  try {
    const successful = await fetch(
      'http://localhost:3000/api/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return successful.status === 200
  } catch(err) {
    console.error(err);
  }

}
