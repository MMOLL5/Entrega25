const socket = io.connect('http://localhost:8080', { forceNew: true });

//socket.emit('askData');

function sendDatosLogin(e) {
    const input = document.getElementById('userName');
   console.log(input);
    socket.emit('new-login', input.value);
}

socket.on('logueo', function (data) {
    console.log('USUARIO LOGUEADO');
    //render(data);
});