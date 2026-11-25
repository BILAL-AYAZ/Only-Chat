/*const socket = io('http://localhost:3000');
let fname = "";
const form = document.querySelector("#send-container");
const messageInput = document.querySelector("#messageinp");
const messageContainer = document.querySelector(".container");
const nameInput = document.querySelector("#user-name");
const blurContent = document.querySelector(".blur")

socket.on('user-joined', fname => {
    append(`${fname} Joinend The Chat`, "right")
})
socket.on('receive', data => {
    append(`${fname}: ${data.message}`, 'left')
});

socket.on('left', fname => {
    append(`${fname}Left The Chat`, 'left')
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit('send', message);
    messageInput.value = ""
})
nameInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
        fname = nameInput.value;
        socket.emit('new-user-joined', fname);
        console.log(fname)
        nameInput.classList.add("hide");
        blurContent.classList.add("hide")
    }
})
var audio = new Audio('logic/tick.mp3.mp3')
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position === 'left') {
        audio.play();
    }
}*/

const socket = io('http://localhost:3000');

const form = document.querySelector('#send-container');
const messageInput = document.querySelector('#messageInp');
const messageContainer = document.querySelector('.container');
const nameInput = document.querySelector('#user-name');
const blurContent = document.querySelector('.blur');

const audio = new Audio('logic/tick.mp3.mp3');

let fname = '';

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;

    if (position === 'left') {
        audio.play().catch(() => {});
    }
};

nameInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
        evt.preventDefault();
        const enteredName = nameInput.value.trim();
        if (!enteredName) return;

        fname = enteredName;
        console.log(fname);
        socket.emit('new-user-joined', fname);
        nameInput.classList.add('hide');
        blurContent.classList.add('hide');
    }
});

socket.on('user-joined', (name) => {
    if (!name) return;
    append(`${name} Joined The Chat`, 'right');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message || !fname) return;

    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

socket.on('receive', (data) => {
    if (!data || !data.name || !data.message) return;
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', (name) => {
    if (!name) return;
    append(`${name} Left The Chat`, 'left');
});