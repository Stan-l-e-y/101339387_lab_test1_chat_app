const username = document.getElementById('username');
const userCookie = JSON.parse(getCookie('user'));

username.value = userCookie.username ? userCookie.username : '';

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const roomsForm = document.getElementById('rooms');
const errorDiv = document.getElementById('error');

roomsForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(roomsForm);
  const { username, roomsList } = Object.fromEntries(formData);
  //   console.log(Object.fromEntries(formData));

  window.location.href = `/chat.html?room=${roomsList}&username=${username}`;
});
