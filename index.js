import { connect } from 'mongoose';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const PORT = 3000;
const MONGODB_URI =
  'mongodb+srv://ThisIsForSchool:lSaFPLvHIk2bPCCz@cluster0.mtqaf6e.mongodb.net/test?retryWrites=true&w=majority';

const app = express();
app.use(express.static(path.join(__dirname, '/src/public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://127.0.0.1:5500/'],
  },
});

try {
  const mongoConnect = async () => {
    await connect(MONGODB_URI);
  };

  mongoConnect();

  io.on('connection', (socket) => {
    console.log('yo mama');
    io.emit('newconnection', 'new user joined');
    socket.emit('message', 'Welcome to ');
    socket.on('disconnect', function () {
      io.emit('disconnect', 'user has disconnect');
      console.log('A client disconnected');
    });

    socket.on('newmessage', function (message) {
      console.log(message);
      io.emit('message', message);
    });
  });

  //   app.listen(PORT, () => console.log(`listening on port ${PORT}`));
} catch (err) {
  console.error(err);
}

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'src/index.html'));
// });

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`));
