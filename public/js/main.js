const chatForm = document.getElementById('chat-form');
const userEmail = document.getElementById('mail');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const alias = document.getElementById('alias');
const edad = document.getElementById('edad');
const avatar = document.getElementById('avatar');
const msg = document.getElementById('texto');
const chatMessages = document.querySelector('.chat-messages');
const mensajesContainer = document.getElementById('mensajesContainer');


const socketIo = io();

//Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (userEmail.value && msg.value) {
    let data = {
      author: {
        email: userEmail.value,
        nombre: nombre.value,
        apellido: apellido.value,
        alias: alias.value,
        edad: edad.value,
        avatar: avatar.value,
      },
      time: Date.now(),
      text: msg.value,
    };

    console.log('EMITIENDO SOCKET', data);

  //Emit Message to the server
  socketIo.emit('newMessage', data);
  userEmail.value = '';
  nombre.value = '';
  apellido.value = '';
  (alias.value = ''), (edad.value = ''), (avatar.value = '');
  msg.value = '';
}
});

socketIo.on('receiveMessages', (mensajes) => {
  console.log(mensajes);
});

socketIo.on('newMessage', (mensaje) => {
  outputMessage(mensaje);
});

function outputMessage(message) {
  let p = document.createElement('p');
  p.innerHTML = `
  <p class="meta"><b><FONT COLOR="blue">${message.author.email}</FONT></b> <span> [<FONT COLOR="brown">${message.time}</FONT>]</span><span><I><FONT COLOR="green"> : ${message.text}</FONT></I></span><span><img src=${message.author.avatar} width="32" height="32"></span></p>`;
  mensajesContainer.appendChild(p);
}