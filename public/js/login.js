const loginFormHandler = async (event) => {
    event.preventDefault();

    const cardNo = document.querySelector('#cardNo-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (cardNo && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ cardNo, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
          }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const cardNo = document.querySelector('#cardNo-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && cardNo && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, cardNo, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to Sign Up');
      }
    }
  };

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);