const socket = io.connect('http://localhost:8080', { forceNew: true });

socket.emit('askData');

function sendData(e) {
    const input = document.getElementById('title');
    const input1 = document.getElementById('price');
    const input2 = document.getElementById('thumbnail');
    const obj = {
        tit: input.value,
        pri: input1.value,
        thu: input2.value
    };
    socket.emit('new-message', obj);
}

function render(data) {
var html = data
    .map(function (elem, index) {
    if(elem.thu=='Foto'){    
        return `<div>            
                <tr><td> ${elem.tit} </td>
                <td>${elem.pri}</td>
                <td>${elem.thu}</td>
            </div>`;
    }else{
        return `<div>            
        <tr><td> ${elem.tit} </td>
        <td>${elem.pri}</td>
        <td><img src="${elem.thu}" width="32" height="32"></td>
    </div>`;
    }
    })
    .join(' ');

document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function (data) {
    console.log('RECIBI MENSAJE');
    render(data);
});