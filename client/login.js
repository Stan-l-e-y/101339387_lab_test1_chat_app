const loginForm = document.getElementById('login');
const errorDiv = document.getElementById('error');

loginForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const body = JSON.stringify(Object.fromEntries(formData));
  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
    if (!res.ok) throw new Error(await res.text());

    const { username, firstName, lastName } = await res.json();
    const maxAge = 900000;
    const expires = new Date(Date.now() + maxAge).toUTCString();
    document.cookie = `user=${JSON.stringify({
      username,
      firstName,
      lastName,
    })}; max-age=${maxAge}; expires=${expires}`;
    window.location.href = '/rooms.html';
  } catch (error) {
    console.log(error);
    const errorMessage = document.createElement('span');
    errorMessage.innerText = error;
    errorMessage.style.color = 'red';
    errorDiv.appendChild(errorMessage);
  }
});
