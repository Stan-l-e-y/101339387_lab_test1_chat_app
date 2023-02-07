import { io } from 'socket.io-client';

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const chat = document.getElementById('chat');
const roomName = document.getElementById('roomName');
let roomParam = params.room ? params.room : 'Room';
roomName.innerHTML = roomParam.toUpperCase();
const username = params.username
  ? params.username
  : JSON.parse(getCookie('user')).username;

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  socket.emit('join-room', roomParam, (message) => {
    socket.emit('send-message', message, roomParam, username);
  });
});

socket.on('receive-message', (message, username) => {
  displayMessage(message, username);
});

chat.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(chat);
  const { messageInput } = Object.fromEntries(formData);
  //   console.log(messageInput);
  if (messageInput === '') return;
  displayMessage(messageInput, username);
  socket.emit('send-message', messageInput, roomParam, username);

  const messageIn = document.getElementById('messageInput');
  messageIn.value = '';
});

function displayMessage(message, username) {
  const div = document.createElement('div');
  div.textContent = `${username}: ${message}`;
  document.getElementById('message-container').append(div);
}

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
