const registerForm = document.getElementById('register');
const errorDiv = document.getElementById('error');

registerForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(registerForm);
  const body = JSON.stringify(Object.fromEntries(formData));
  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
    if (!res.ok) throw new Error(await res.text());
    // console.log(await res.text());
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.log(error);
    const errorMessage = document.createElement('span');
    errorMessage.innerText = error;
    errorMessage.style.color = 'red';
    errorDiv.appendChild(errorMessage);
  }
});
