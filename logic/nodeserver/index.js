/*const io = require('socket.io')(3000, {
    cors: {
        origin: "*"
    }
})

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]
    });
});*/

const io = require('socket.io')(3000, {
    cors: {
        origin: '*'
    }
});

const users = {};

io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
        const cleanName = typeof name === 'string' ? name.trim() : '';
        if (!cleanName) return;

        users[socket.id] = cleanName;
        socket.broadcast.emit('user-joined', cleanName);
    });

    socket.on('send', (message) => {
        const senderName = users[socket.id];
        const cleanMessage = typeof message === 'string' ? message.trim() : '';
        if (!senderName || !cleanMessage) return;

        socket.broadcast.emit('receive', {
            message: cleanMessage,
            name: senderName
        });
    });

    socket.on('disconnect', () => {
        const leavingUser = users[socket.id];
        if (leavingUser) {
            socket.broadcast.emit('left', leavingUser);
            delete users[socket.id];
        }
    });
});

console.log('Socket.IO chat server running on http://localhost:3000');