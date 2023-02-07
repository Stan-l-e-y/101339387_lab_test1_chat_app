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
    window.location.href = '/';
  } catch (error) {
    console.log(error);
    const errorMessage = document.createElement('span');
    errorMessage.innerText = error;
    errorMessage.style.color = 'red';
    errorDiv.appendChild(errorMessage);
  }
});
